import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TRIAL_ASSETS,TRIAL_COPY,TRIAL_AI_FLOW,TRIAL_VISUAL_FLOW,TRIAL_STORY_STEPS,TRIAL_CONVERSATION_RULES,TRIAL_VOICE_FLOW,createTrialState,trialTurn,
  confirmTrialProduct,chooseTrialProductWhite,confirmTrialPairing,planTrialUse,confirmTrialFeedback
} from '../trial.mjs';

const firstProduct = state => trialTurn(state,{text:TRIAL_COPY.productVoice,assetSlots:['nars_devilish_original'],conversationId:'A'});
const firstPair = state => trialTurn(state,{text:TRIAL_COPY.pairingInput,assetSlots:['coral_glow_original','mauve_majesty_original'],conversationId:'A'});

test('模拟试用档案起初只显示旧搭配，隐藏素材仍可用于固定样例',()=>{
  const state=createTrialState();
  assert.equal(state.profile,'trial');
  assert.deepEqual(state.products.map(p=>p.id),['b0','l0']);
  assert.deepEqual(state.pairings.map(p=>p.id),['p1']);
  assert.deepEqual(state.uses,[]);
  assert.deepEqual(state.memories,[]);
  assert.equal(state.pairings[0].regular,false);
  assert.deepEqual(state.pairings[0].photos,[]);
  assert.match(state.pairings[0].source,/灵感参考/);
  assert.equal(state.products[0].source,'灵感参考');
  assert.equal(state.products[0].sourceNote,TRIAL_COPY.swatchNote);
  assert.equal(TRIAL_ASSETS.nars_devilish_swatch.src,TRIAL_ASSETS.coral_glow_swatch.src);
  assert.equal(TRIAL_ASSETS.nars_devilish_swatch.illustrative,true);
  assert.match(TRIAL_COPY.swatchNote,/统一色调示意/);
});

test('NARS 语音文字生成可编辑草稿，确认后入库；重复确认不重复建档',()=>{
  const state=createTrialState(),turn=firstProduct(state);
  assert.equal(turn.kind,'product-draft');
  assert.equal(turn.aiFlow,'productRecognition');
  assert.equal(turn.conversationId,'A');
  assert.equal(turn.draft.brand,'NARS');
  assert.equal(turn.draft.tone,'蜜瓜色');
  assert.equal(turn.draft.finish,'粉状腮红');
  assert.match(turn.draft.candidateEvidence.finish,/待核对/);
  assert.deepEqual(state.products.map(p=>p.id),['b0','l0']);
  const saved=confirmTrialProduct(state,turn.draft,{finish:'粉状腮红'});
  assert.equal(saved.created,true);
  assert.equal(saved.product.finish,'粉状腮红');
  assert.equal(saved.product.swatchImage,TRIAL_ASSETS.coral_glow_swatch.src);
  assert.equal(saved.product.sourceNote,TRIAL_COPY.swatchNote);
  assert.deepEqual(saved.visualOptions.afterProductConfirm,['AI 生成白底图','稍后再说']);
  assert.equal(state.memories.length,1);
  assert.equal(state.memories[0].text,TRIAL_COPY.productVoice);
  assert.deepEqual(state.memories[0].productIds,[saved.product.id]);
  assert.match(state.memories[0].source,/用户确认/);
  const later=chooseTrialProductWhite(state,saved.product.id,'later');
  assert.equal(later.status,'deferred');
  assert.equal(later.laterEntry.page,'product-detail');
  assert.equal(saved.product.whiteImageSrc,undefined);
  const white=chooseTrialProductWhite(state,saved.product.id,'generate');
  assert.equal(white.status,'ready');
  assert.equal(white.src,TRIAL_ASSETS.nars_devilish_original.src);
  assert.equal(saved.product.whiteImageSource,'gallery-preview');
  assert.throws(()=>chooseTrialProductWhite(state,'missing','generate'),/先确认/);
  assert.equal(confirmTrialProduct(state,turn.draft).created,false);
  assert.equal(state.products.length,3);
  assert.equal(state.memories.length,1);
});

test('两张样例图先生成搭配草稿，确认后才保存两件产品、原话和日期未知的过去使用',()=>{
  const state=createTrialState();
  confirmTrialProduct(state,firstProduct(state).draft);
  const turn=firstPair(state);
  assert.equal(turn.kind,'pairing-draft');
  assert.equal(turn.aiFlow,'pairingRecognition');
  assert.equal(turn.draft.memoryText,TRIAL_COPY.pairingInput);
  assert.deepEqual(turn.draft.swatches,{blush:'',lip:''});
  assert.deepEqual(turn.draft.swatchActions,['AI 生成试色图','上传我的试色','稍后再说']);
  assert.equal(turn.draft.suggestedSwatches.blush.src,TRIAL_ASSETS.coral_glow_swatch.src);
  assert.equal(turn.draft.suggestedSwatches.lip.src,TRIAL_ASSETS.mauve_majesty_swatch.src);
  assert.deepEqual(state.pairings.map(p=>p.id),['p1']);
  assert.equal(state.products.length,3);
  const saved=confirmTrialPairing(state,turn.draft,{swatches:{blush:'coral_glow_swatch',lip:'mauve_majesty_swatch'}});
  assert.equal(saved.created,true);
  assert.equal(state.products.length,5);
  assert.equal(state.pairings.length,2);
  assert.equal(saved.products[0].shade,'Coral glow');
  assert.equal(saved.products[1].shade,'Mauve Majesty');
  assert.deepEqual(saved.pairing.swatches,{blush:TRIAL_ASSETS.coral_glow_swatch.src,lip:TRIAL_ASSETS.mauve_majesty_swatch.src});
  assert.equal(saved.products[0].swatchImage,TRIAL_ASSETS.coral_glow_swatch.src);
  const pairMemory=state.memories.find(m=>m.pairingId===saved.pairing.id);
  assert.equal(pairMemory.text,TRIAL_COPY.pairingInput);
  assert.equal(state.uses[0].status,'used');
  assert.equal(state.uses[0].day,null);
  assert.equal(state.uses[0].dateKnown,false);
  assert.equal(confirmTrialPairing(state,turn.draft).created,false);
  assert.equal(state.products.length,5);
  assert.equal(state.pairings.length,2);
  assert.equal(state.memories.length,2);
  assert.equal(state.uses.length,1);
});

test('搭配卡不自动填试色；选错图库图先拒绝，稍后补图仍保存到同一搭配',()=>{
  const state=createTrialState(),draft=firstPair(state).draft;
  assert.throws(()=>confirmTrialPairing(state,draft,{swatches:{blush:'mauve_majesty_swatch'}}),/对应的试色图/);
  assert.equal(state.products.length,2);
  const first=confirmTrialPairing(state,draft);
  assert.deepEqual(first.pairing.swatches,{blush:'',lip:''});
  assert.equal(first.products[0].swatchImage,'');
  assert.match(first.visualFollowUp,/搭配页/);
  const second=confirmTrialPairing(state,draft,{swatches:{blush:TRIAL_ASSETS.coral_glow_swatch.src,lip:'mauve_majesty_swatch'}});
  assert.equal(second.created,false);
  assert.equal(second.pairing.id,first.pairing.id);
  assert.equal(second.pairing.swatches.blush,TRIAL_ASSETS.coral_glow_swatch.src);
  assert.equal(second.pairing.swatches.lip,TRIAL_ASSETS.mauve_majesty_swatch.src);
  assert.equal(second.visualFollowUp,'');
  assert.equal(state.pairings.length,2);
});

test('试色图可选 AI 图片、自己上传或稍后补，不把上传图片标成 AI',()=>{
  const state=createTrialState(),draft=firstPair(state).draft;
  const saved=confirmTrialPairing(state,draft,{swatches:{blush:{kind:'ai',assetSlot:'coral_glow_swatch'},lip:{kind:'upload',assetId:'my-lip-swatch-01'}}});
  assert.equal(saved.pairing.swatches.blush,TRIAL_ASSETS.coral_glow_swatch.src);
  assert.equal(saved.pairing.swatches.lip,'');
  assert.equal(saved.pairing.swatchAssetIds.lip,'my-lip-swatch-01');
  assert.equal(saved.pairing.swatchSources.blush,'gallery-preview');
  assert.equal(saved.pairing.swatchSources.lip,'user-upload');
  assert.equal(saved.products[1].swatchAssetId,'my-lip-swatch-01');
  assert.equal(saved.products[1].sourceNote,TRIAL_COPY.ownSwatchNote);
  assert.notEqual(saved.pairing.difference,TRIAL_COPY.swatchNote);
  assert.deepEqual(saved.visualOptions.laterEntry.choices,['AI 生成试色图','上传我的试色']);
  assert.throws(()=>confirmTrialPairing(state,draft,{swatches:{lip:{kind:'upload',assetId:'../bad'}}}),/可用的试色图片/);
});

test('新会话仅找回已确认的搭配；历史是深色衣服，黑色只来自今天的提问',()=>{
  const state=createTrialState();
  const before=trialTurn(state,{text:TRIAL_COPY.scenarioInput,conversationId:'B'});
  assert.equal(before.kind,'answer');
  assert.match(before.reply,/没有找到/);
  confirmTrialPairing(state,firstPair(state).draft);
  const after=trialTurn(state,{text:TRIAL_COPY.scenarioInput,conversationId:'B'});
  assert.equal(after.kind,'recommendation');
  assert.equal(after.conversationId,'B');
  assert.equal(after.results.length,1);
  assert.equal(after.results[0].fromSaved,true);
  assert.equal(after.results[0].historyQuote,TRIAL_COPY.pairingInput);
  assert.match(after.reply,/你今天提到的黑色衣服/);
  assert.doesNotMatch(after.reply,/你以前.*黑色衣服|你之前.*黑色衣服/);
  const general=trialTurn(state,{text:'今天想用 MOIRA，怎么搭？',conversationId:'B'});
  assert.doesNotMatch(general.reply,/你今天提到的黑色衣服/);
  const cooler=trialTurn(state,{text:'想更清冷一点，这套可以吗？',conversationId:'B',previousPairingId:after.results[0].id});
  assert.equal(cooler.kind,'answer');
  assert.notEqual(cooler.reply,after.reply);
  assert.match(cooler.reply,/腮红少一点/);
  assert.equal(cooler.focusPairingId,after.results[0].id);
  assert.equal(cooler.results,undefined);
  assert.doesNotMatch(cooler.reply,/以前.*黑色衣服/);
  const wrongContext=trialTurn(state,{text:'这套可以吗？怎么搭？',conversationId:'A',previousPairingId:'p1'});
  assert.equal(wrongContext.kind,'answer');
  assert.doesNotMatch(wrongContext.reply,/Coral glow/);
  assert.equal(wrongContext.results,undefined);
});

test('固定故事与语音状态声明会话边界，同一张卡片切换状态且松手不发送',()=>{
  assert.deepEqual(TRIAL_STORY_STEPS.slice(0,4).map(step=>step.conversation),['A','A','A','A']);
  assert.equal(TRIAL_STORY_STEPS[2].entry,'stay-in-conversation');
  assert.equal(TRIAL_STORY_STEPS[4].conversation,'B');
  assert.equal(TRIAL_STORY_STEPS[4].entry,'return-home-then-new');
  assert.equal(TRIAL_STORY_STEPS.at(-1).entry,'open-existing-from-home');
  assert.equal(TRIAL_CONVERSATION_RULES.returnHomeThenStartFromHome,'create-new-id');
  assert.equal(TRIAL_CONVERSATION_RULES.openExistingFromHome,'reuse-selected-id');
  assert.equal(TRIAL_CONVERSATION_RULES.returnHomeEndsConversation,false);
  assert.deepEqual(TRIAL_VOICE_FLOW.order,['ready','listening','transcribing','review']);
  assert.equal(TRIAL_VOICE_FLOW.cardId,'trial-voice-card');
  assert.equal(TRIAL_VOICE_FLOW.releaseSends,false);
  assert.equal(TRIAL_VOICE_FLOW.reviewEditable,true);
  assert.equal(TRIAL_VOICE_FLOW.states.review.primary,'发送内容');
  assert.equal(TRIAL_AI_FLOW.disclosureLocation,'profile-page');
  assert.deepEqual(TRIAL_AI_FLOW.productRecognition.confirmWrites,['product','product-memory']);
  assert.equal(TRIAL_AI_FLOW.productRecognition.stages[1].when,'必要时');
  assert.equal(TRIAL_VISUAL_FLOW.productWhite.laterEntry.page,'product-detail');
  assert.equal(TRIAL_VISUAL_FLOW.pairingSwatches.laterEntry.page,'pairing-detail');
  assert.match(TRIAL_COPY.profileDisclosure,/不接入真实 AI 服务/);
  for(const [key,value] of Object.entries(TRIAL_COPY)){
    if(typeof value==='string'&&!['profileName','profileDisclosure'].includes(key)){
      assert.doesNotMatch(value,/模拟|样例|未接通|演示模式/,key);
    }
  }
});

test('再想想给未保存的 NARS × MOIRA，新建议可计划但不冒充实际使用',()=>{
  const state=createTrialState();
  const nars=confirmTrialProduct(state,firstProduct(state).draft).product;
  const saved=confirmTrialPairing(state,firstPair(state).draft);
  const alt=trialTurn(state,{text:'再想想',conversationId:'B',previousPairingId:saved.pairing.id});
  assert.equal(alt.kind,'recommendation');
  assert.equal(alt.results[0].fromSaved,false);
  assert.equal(alt.results[0].blush,nars.id);
  assert.equal(alt.results[0].lip,saved.products[1].id);
  assert.equal(alt.results[0].historyQuote,'');
  assert.equal(state.pairings.length,2);
  const planned=planTrialUse(state,alt.results[0],{day:'2026-09-27',now:123456});
  assert.equal(planned.use.status,'planned');
  assert.equal(planned.use.usedAt,null);
  assert.equal(planned.use.pairingId,'');
  assert.equal(state.pairings.length,2);
  assert.equal(planTrialUse(state,alt.results[0],{day:'2026-09-27'}).created,false);
  assert.equal(state.uses.filter(u=>u.status==='planned').length,1);
  const pending=trialTurn(state,{text:'我回来啦，今天用了这套，挺喜欢的，配黑色外套也好看。',conversationId:'B'});
  assert.equal(pending.kind,'feedback-draft');
  assert.equal(pending.draft.useId,planned.use.id);
  assert.equal(planned.use.status,'planned');
  assert.throws(()=>confirmTrialFeedback(state,planned.use.id,{}),/补充/);
  const actual=confirmTrialFeedback(state,planned.use.id,{note:pending.draft.note,feedback:'喜欢',ootd:pending.draft.ootd,photoAssetIds:['my-ootd-photo']},{now:234567});
  assert.equal(actual.use.status,'used');
  assert.equal(actual.use.usedAt,234567);
  assert.equal(actual.use.ootd,'黑色外套');
  assert.deepEqual(actual.use.photoAssetIds,['my-ootd-photo']);
  assert.equal(state.memories.at(-1).source,'用户确认的今日反馈');
});

test('不认识的图片不冒充样例；没有说过使用心得就不造历史',()=>{
  const state=createTrialState();
  const unknown=trialTurn(state,{text:'帮我看看这是什么',assetSlots:['unrecognized-image']});
  assert.equal(unknown.kind,'answer');
  assert.match(unknown.reply,/无法可靠识别/);
  const unknownWithName=trialTurn(state,{text:TRIAL_COPY.productVoice,assetSlots:['unrecognized-image']});
  assert.equal(unknownWithName.kind,'answer');
  const incomplete=trialTurn(state,{text:'这是 Coral glow',assetSlots:['coral_glow_original']});
  assert.match(incomplete.reply,/还差一张/);
  const generic=trialTurn(state,{text:'帮我把这两件产品记成一套',assetSlots:['coral_glow_original','mauve_majesty_original']});
  assert.equal(generic.kind,'pairing-draft');
  assert.equal(generic.draft.pastUse,false);
  assert.doesNotMatch(generic.reply,/你说以前用过/);
  confirmTrialPairing(state,generic.draft);
  assert.equal(state.uses.length,0);
  assert.equal(state.memories.length,1);
  assert.doesNotMatch(state.pairings[1].reason,/你记录过喜欢/);
});

test('已保存搭配的反馈实拍同步到搭配详情',()=>{
  const state=createTrialState();
  const saved=confirmTrialPairing(state,firstPair(state).draft);
  const recommendation=trialTurn(state,{text:TRIAL_COPY.scenarioInput}).results[0];
  const planned=planTrialUse(state,recommendation);
  confirmTrialFeedback(state,planned.use.id,{note:'喜欢',photoAssetIds:['my-photo']});
  assert.deepEqual(saved.pairing.photos.map(p=>p.id),['my-photo']);
});
