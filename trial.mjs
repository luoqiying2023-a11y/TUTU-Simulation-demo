import {seed} from './data.js';

// All story-only assets stay here. Hidden fixtures are never placed in the
// visible product/pairing arrays until the user confirms a card.
export const TRIAL_ASSETS = Object.freeze({
  cutie_pie_original: {src:'./assets/products/cutie-pie.jpg', label:'Cutie pie 产品图', visibleAtStart:true},
  pk10_original: {src:'./assets/products/pk10.png', label:'PK10 产品图', visibleAtStart:true},
  cutie_pie_swatch: {src:'./assets/swatches/deep-peach-blush.png', label:'深蜜桃色调示意', visibleAtStart:true, illustrative:true},
  pk10_swatch: {src:'./assets/swatches/cool-pink-lip.png', label:'冷粉色调示意', visibleAtStart:true, illustrative:true},
  nars_devilish_original: {src:'./assets/products/nars-devilish.png', label:'NARS Devilish不乖 产品图', category:'blush'},
  coral_glow_original: {src:'./assets/products/coral-glow.jpg', label:'Coral glow 产品图', category:'blush'},
  mauve_majesty_original: {src:'./assets/products/mauve-majesty.jpg', label:'Mauve Majesty 产品图', category:'lip'},
  // NARS and Coral glow share one template illustration, not a precise
  // single-product swatch. The UI should keep this disclosure visible.
  nars_devilish_swatch: {src:'./assets/swatches/melon-blush.png', label:'蜜瓜色调示意', illustrative:true, sharedWith:'coral_glow_swatch'},
  coral_glow_swatch: {src:'./assets/swatches/melon-blush.png', label:'蜜瓜色调示意', illustrative:true, sharedWith:'nars_devilish_swatch'},
  mauve_majesty_swatch: {src:'./assets/swatches/mauve-lip.png', label:'粉紫色调示意', illustrative:true}
});

export const TRIAL_COPY = Object.freeze({
  profileName:'模拟试用档案',
  profileDisclosure:'这份档案用固定素材演示 AI 看图、语音转文字、信息整理和图片生成流程，本提交版不接入真实 AI 服务。',
  swatchNote:'试色图为统一色调示意，具体颜色和质地以实际上脸为准。',
  ownSwatchNote:'试色图由你上传，颜色可能受拍摄光线和屏幕影响。',
  swatchPendingNote:'还未添加试色图，可以稍后在搭配页补上。',
  productVoice:'这是 NARS Devilish不乖 腮红，蜜瓜色，帮我记一下。',
  pairingInput:'我以前用这两件搭过，是Coral glow液体腮红和MOIRA粉紫色Mauve Majesty唇油，喜欢这组冷暖撞色，配深色衣服也好看',
  scenarioInput:'今天想用 MOIRA 这支粉紫色唇部产品，我记得它适合搭黑色衣服，腮红该怎么搭？',
  voiceReady:'说说今天的想法吧…',
  voiceListening:'我正在听…',
  voiceTranscribing:'正在转成文字…',
  voiceReview:'把想法发给 TUTU…',
  voiceHint:'可以修改文字后再发送',
  productDraft:'我结合照片和你的描述，整理出 NARS Devilish不乖 腮红：蜜瓜色，粉状质地待你核对。看看品牌、色调和质地，确认后我就记进产品库。',
  productSaved:'记好了，NARS Devilish不乖已加入产品库，你说的蜜瓜色也记下了。要现在整理成统一白底图，还是稍后去产品页处理？',
  productWhiteLater:'好，之后到产品页点「生成白底图」就行。想继续记录搭配，直接在这里发两张图吧。',
  productWhiteReady:'白底图已放进这件产品的图片位；原图仍然保留。',
  pairingDraft:'我整理出 Coral glow 液体腮红 × MOIRA Mauve Majesty 唇油，也记下你喜欢这组冷暖撞色、觉得它配深色衣服好看。请核对产品和原话；试色图可以现在生成、上传自己的，或稍后再补。',
  pairingDraftGeneric:'我先把两张图片整理成 Coral glow × MOIRA Mauve Majesty 搭配草稿。请核对两件产品，也可以补充你自己的使用心得。',
  pairingSwatchLater:'可以先保存文字和产品。之后到搭配页，仍能上传自己的试色，或选择 AI 生成试色图。',
  pairingSaved:'这套记好了。以后你想用粉紫色唇色，我会先想到你喜欢的这组冷暖撞色。',
  pairingSavedGeneric:'这套已经保存。以后想用这两件产品，我会从这张搭配卡找回。',
  savedRecommendation:'粉紫唇色今天想当主角呀。你保存过 Coral glow × MOIRA Mauve Majesty，还说这组“配深色衣服也好看”。腮红轻轻带一点，唇色留作重点，清冷感就拿捏住了。',
  savedRecommendationBlack:'粉紫唇色今天想当主角呀。你保存过 Coral glow × MOIRA Mauve Majesty，还说这组“配深色衣服也好看”。你今天提到的黑色衣服属于深色系；腮红轻轻带一点，唇色留作重点，清冷感就拿捏住了。',
  coolerFollowUp:'可以呀。Mauve Majesty 的粉紫色负责清冷感，Coral glow 只薄薄给脸颊一点气色。腮红少一点、唇色更清楚，整套就会更利落。你以前记下的是“适合深色衣服”这一类；先照镜子试试浓淡，清冷感稳稳的。',
  coolerFollowUpGeneric:'可以呀。Mauve Majesty 的粉紫色负责清冷感，Coral glow 只薄薄给脸颊一点气色。先少量上脸，再按今天的穿搭和光线调整浓淡。',
  alternateRecommendation:'想换个方向？你刚录入的 NARS Devilish不乖也可以和 MOIRA 试一试。腮红薄薄上一层，粉紫唇色负责清冷感。这是新建议，还没有你的实际使用记录。',
  plannedUse:'好，今天先选这套。化完妆或回家后，想聊聊上脸感受、今天的 OOTD，或补一张实拍，都可以回来告诉我。',
  feedbackDraft:'欢迎回来。把今天的上脸感受和 OOTD 核对一下，确认后我再记成实际使用。',
  feedbackSaved:'今天这套的使用感受记好了。下次想搭这身衣服，我们可以从这里找回来。',
  noSavedPairing:'我还没有找到你确认保存过的 MOIRA 唇颊搭配。先把两张产品图和搭配心得发给我，保存后就能在新对话里找回。',
  unknownImage:'这张图我暂时无法可靠识别。图片和你的描述会保留，请核对产品信息后再保存。',
  incompleteSample:'图片收到了，还差一张要搭配的产品图。你可以继续添加，或手动核对产品信息。',
  suggestions:Object.freeze({
    productDraft:['核对并保存产品'],
    productSaved:['继续记录一套搭配'],
    pairingDraft:['核对并保存这套'],
    pairingSaved:['试着问今天怎么搭'],
    recommendation:['想更清冷一点，这套可以吗？','我以前说过什么衣服？'],
    coolerFollowUp:['我以前说过什么衣服？','今天用这套'],
    alternate:['今天用这套','还是看看原来的搭配'],
    plannedUse:['我回来补充今天的感受'],
    feedbackSaved:['看看我的搭配记录']
  })
});

// These are UI data, not a navigation engine. The caller owns conversation IDs.
export const TRIAL_CONVERSATION_RULES = Object.freeze({
  stayOnConversationPage:'reuse-current-id',
  returnHomeThenStartFromHome:'create-new-id',
  openExistingFromHome:'reuse-selected-id',
  returnHomeEndsConversation:false
});

// The profile page carries the only disclosure about the scripted AI demo.
// In the chat, these are the user-facing processing states and choices.
export const TRIAL_AI_FLOW = Object.freeze({
  disclosureLocation:'profile-page',
  productRecognition:{
    stages:[
      {id:'understand',label:'正在理解照片和描述'},
      {id:'lookup',label:'正在核对产品信息',when:'必要时'},
      {id:'analyze',label:'正在整理色调与质地'},
      {id:'draft',label:'请核对产品草稿'}
    ],
    candidateFields:['brand','name','category','shade','tone','finish'],
    editableBeforeSave:true,
    confirmWrites:['product','product-memory']
  },
  pairingRecognition:{
    stages:[
      {id:'understand',label:'正在识别两件产品和搭配描述'},
      {id:'draft',label:'请核对搭配卡'}
    ],
    editableBeforeSave:true,
    confirmWrites:['products','pairing','original-words','past-use-if-stated']
  }
});

export const TRIAL_VISUAL_FLOW = Object.freeze({
  productWhite:{
    afterProductConfirm:['AI 生成白底图','稍后再说'],
    laterEntry:{page:'product-detail',label:'生成白底图'},
    previewAssetSlot:'nars_devilish_original',
    retainOriginal:true
  },
  pairingSwatches:{
    emptyLabel:'添加试色图',
    choices:['AI 生成试色图','上传我的试色','稍后再说'],
    generatedAssetSlots:{blush:'coral_glow_swatch',lip:'mauve_majesty_swatch'},
    laterEntry:{page:'pairing-detail',choices:['AI 生成试色图','上传我的试色']},
    allowMixedSources:true
  }
});

export const TRIAL_STORY_STEPS = Object.freeze([
  {id:'A-product',conversation:'A',entry:'home-new',input:TRIAL_COPY.productVoice,assetSlots:['nars_devilish_original'],aiFlow:'productRecognition',expectedKind:'product-draft',confirm:'confirmTrialProduct'},
  {id:'A-product-white',conversation:'A',entry:'stay-in-conversation',actions:TRIAL_VISUAL_FLOW.productWhite.afterProductConfirm,optional:true,laterPage:'product-detail',confirm:'chooseTrialProductWhite'},
  {id:'A-pairing',conversation:'A',entry:'stay-in-conversation',input:TRIAL_COPY.pairingInput,assetSlots:['coral_glow_original','mauve_majesty_original'],aiFlow:'pairingRecognition',expectedKind:'pairing-draft',confirm:'confirmTrialPairing'},
  {id:'A-pairing-swatches',conversation:'A',entry:'stay-in-conversation',actions:TRIAL_VISUAL_FLOW.pairingSwatches.choices,optional:true,laterPage:'pairing-detail'},
  {id:'B-scenario',conversation:'B',entry:'return-home-then-new',input:TRIAL_COPY.scenarioInput,assetSlots:[],expectedKind:'recommendation'},
  {id:'B-decision',conversation:'B',entry:'stay-in-conversation',actions:['今天用这套','再想想'],confirm:'planTrialUse'},
  {id:'B-feedback',conversation:'B',entry:'open-existing-from-home',optional:true,confirm:'confirmTrialFeedback'}
]);

export const TRIAL_VOICE_FLOW = Object.freeze({
  cardId:'trial-voice-card', // one card swaps its content; no nested/new sheet
  order:['ready','listening','transcribing','review'],
  releaseSends:false,
  reviewEditable:true,
  states:Object.freeze({
    ready:{heading:TRIAL_COPY.voiceReady,primary:'按住说话',hint:'按住开始，松手进入文字核对'},
    listening:{heading:TRIAL_COPY.voiceListening,primary:'实时文字',hint:'松手结束并修改文字，上滑取消'},
    transcribing:{heading:TRIAL_COPY.voiceTranscribing,primary:'识别中',hint:'文字准备好后再决定是否发送'},
    review:{heading:TRIAL_COPY.voiceReview,primary:'发送内容',secondary:'重新语音描述',hint:TRIAL_COPY.voiceHint}
  })
});

const FIXTURE = Object.freeze({
  nars:{category:'blush',brand:'NARS',name:'Devilish不乖',shade:'Devilish不乖',tone:'蜜瓜色',finish:'粉状腮红',image:TRIAL_ASSETS.nars_devilish_original.src,swatchImage:TRIAL_ASSETS.nars_devilish_swatch.src},
  coral:{category:'blush',brand:'SHEGLAM',name:'Coral glow',shade:'Coral glow',tone:'蜜瓜粉色',finish:'液体腮红',image:TRIAL_ASSETS.coral_glow_original.src,swatchImage:TRIAL_ASSETS.coral_glow_swatch.src},
  mauve:{category:'lip',brand:'MOIRA',name:'Mauve Majesty',shade:'Mauve Majesty',tone:'粉紫色',finish:'亮面唇油',image:TRIAL_ASSETS.mauve_majesty_original.src,swatchImage:TRIAL_ASSETS.mauve_majesty_swatch.src}
});

const clean = value => String(value ?? '').trim();
const norm = value => clean(value).toLocaleLowerCase().replace(/\s+/g,'');
const nowValue = () => Date.now();
const localDay = stamp => {
  const date = new Date(stamp);
  const pad = number => String(number).padStart(2,'0');
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
};
const makeId = (state, base, idFactory) => {
  const taken = new Set([...(state.products||[]),...(state.pairings||[]),...(state.uses||[]),...(state.memories||[])].map(row=>row.id));
  const candidate = idFactory?.(base) || base;
  if(!taken.has(candidate)) return candidate;
  let suffix=2;
  while(taken.has(`${candidate}-${suffix}`)) suffix++;
  return `${candidate}-${suffix}`;
};
const findProduct = (state, template) => state.products.find(p => !p.archived && p.category===template.category && norm(p.brand)===norm(template.brand) && norm(p.shade||p.name)===norm(template.shade||template.name));
const findCoralPair = state => state.pairings.find(p => {
  const blush=state.products.find(row=>row.id===p.blush);
  const lip=state.products.find(row=>row.id===p.lip);
  return blush && lip && norm(blush.brand)==='sheglam' && norm(blush.shade||blush.name)==='coralglow' && norm(lip.brand)==='moira' && norm(lip.shade||lip.name)==='mauvemajesty';
});
const findHistory = (state,pairingId) => state.memories.find(m=>m.pairingId===pairingId && /深色衣服/.test(m.text));
const identifiedSlots = values => new Set((Array.isArray(values)?values:[]).map(value=>{
  if(TRIAL_ASSETS[value]) return value;
  const match=Object.entries(TRIAL_ASSETS).find(([,asset])=>asset.src===value);
  return match?.[0] || value;
}));
const selectedSwatch = (value,slot) => {
  if(!value)return {src:'',assetId:'',source:''};
  if(typeof value==='object'){
    if(value.kind==='upload'){
      const assetId=clean(value.assetId);
      if(!/^[A-Za-z0-9_-]{1,128}$/.test(assetId))throw new Error('请先上传可用的试色图片。');
      return {src:'',assetId,source:'user-upload'};
    }
    if(value.kind==='ai')value=value.assetSlot||slot;
  }
  const expected=TRIAL_ASSETS[slot].src;
  if(value===slot||value===expected)return {src:expected,assetId:'',source:'gallery-preview'};
  throw new Error('请选择这件产品对应的试色图。');
};
const swatchNoteFor = source => source==='user-upload'?TRIAL_COPY.ownSwatchNote:source==='gallery-preview'?TRIAL_COPY.swatchNote:TRIAL_COPY.swatchPendingNote;

export function createTrialState(){
  const original=seed();
  const state={...original,profile:'trial',scenarioFixtureId:'v05-trial-story',products:original.products.filter(p=>['b0','l0'].includes(p.id)).map(p=>({...p,source:'灵感参考',sourceNote:TRIAL_COPY.swatchNote})),pairings:original.pairings.filter(p=>p.id==='p1'),uses:[],memories:[],tasks:[],drafts:{},ui:{...original.ui}};
  // A reference pairing is visible, but is neither the user's regular look
  // nor evidence of their own past makeup or selfie.
  Object.assign(state.pairings[0],{regular:false,photos:[],source:'灵感参考 · 非个人使用记录'});
  return state;
}

function pairingDraft(text){
  return {fixtureId:'coral-mauve',blushProduct:{...FIXTURE.coral,swatchImage:''},lipProduct:{...FIXTURE.mauve,swatchImage:''},name:'蜜瓜粉色搭粉紫',mood:/深色衣服/.test(text)?'冷暖撞色 · 适合深色衣服':'冷暖撞色',memoryText:text,pastUse:/以前|用过|搭过/.test(text),liked:/喜欢|很好|好看/.test(text),swatches:{blush:'',lip:''},suggestedSwatches:{blush:{assetSlot:'coral_glow_swatch',...TRIAL_ASSETS.coral_glow_swatch},lip:{assetSlot:'mauve_majesty_swatch',...TRIAL_ASSETS.mauve_majesty_swatch}},swatchActions:TRIAL_VISUAL_FLOW.pairingSwatches.choices,assetSlots:['coral_glow_original','mauve_majesty_original'],imageNote:TRIAL_COPY.swatchNote};
}

function savedResult(state,pairing){
  const memory=findHistory(state,pairing.id);
  return {...pairing,pairingId:pairing.id,fromSaved:true,sourceLabel:'你保存过的搭配',historyQuote:memory?.text||'',historySource:memory?'你保存的原话':'',imageNote:TRIAL_COPY.swatchNote,method:'Coral glow 在面中轻轻带一点；Mauve Majesty 先薄涂，想更显色再叠一层。'};
}

function alternateResult(state){
  const blush=findProduct(state,FIXTURE.nars),lip=findProduct(state,FIXTURE.mauve);
  if(!blush||!lip)return null;
  return {id:'',pairingId:'',blush:blush.id,lip:lip.id,name:'蜜瓜色搭粉紫',mood:'清冷一点的新尝试',blushToneLabel:blush.tone||'蜜瓜色',lipToneLabel:lip.tone||'粉紫色',swatches:{blush:TRIAL_ASSETS.nars_devilish_swatch.src,lip:TRIAL_ASSETS.mauve_majesty_swatch.src},reason:'让唇色做主角，蜜瓜色腮红薄薄补一点气色。',method:'Devilish不乖少量上脸，Mauve Majesty 先薄涂；照镜子再调整浓淡。',source:'涂涂的新建议 · 还没有试过',sourceLabel:'涂涂的新建议',fromSaved:false,historyQuote:'',imageNote:TRIAL_COPY.swatchNote};
}

// Read-only scripted turn. It never adds products, pairings or history.
export function trialTurn(state,{text='',assetSlots=[],conversationId='',previousPairingId=''}={}){
  const input=clean(text),slots=identifiedSlots(assetSlots);
  const common={conversationId,suggestions:[]};
  if([...slots].some(slot=>!TRIAL_ASSETS[slot]))return {...common,kind:'answer',reply:TRIAL_COPY.unknownImage};
  const pairImages=slots.size===2 && slots.has('coral_glow_original') && slots.has('mauve_majesty_original');
  if(pairImages){
    const storyComplete=/以前|用过|搭过/.test(input)&&/喜欢/.test(input)&&/深色衣服/.test(input);
    return {...common,kind:'pairing-draft',reply:storyComplete?TRIAL_COPY.pairingDraft:TRIAL_COPY.pairingDraftGeneric,aiFlow:'pairingRecognition',draft:pairingDraft(input),suggestions:TRIAL_COPY.suggestions.pairingDraft};
  }
  if(slots.size && !(slots.size===1&&slots.has('nars_devilish_original')))return {...common,kind:'answer',reply:TRIAL_COPY.incompleteSample};
  if(slots.has('nars_devilish_original') || (/\bNARS\b/i.test(input)&&/Devilish|不乖/.test(input))){
    const hasPhoto=slots.has('nars_devilish_original');
    const hasTone=/蜜瓜色/.test(input);
    return {...common,kind:'product-draft',reply:hasPhoto&&hasTone?TRIAL_COPY.productDraft:'我先整理了一张 NARS Devilish不乖 腮红草稿。没有把握的图片、色调和质地先留空，请你核对后再保存。',aiFlow:'productRecognition',draft:{fixtureId:'nars-devilish',...FIXTURE.nars,image:hasPhoto?FIXTURE.nars.image:'',tone:hasTone?'蜜瓜色':'',finish:hasPhoto?FIXTURE.nars.finish:'',description:input,assetSlots:hasPhoto?['nars_devilish_original']:[],candidateEvidence:{brand:'照片与描述',name:'用户描述',tone:hasTone?'用户描述与图片':'待核对',finish:hasPhoto?'根据产品外观推测，待核对':'待核对'},imageNote:TRIAL_COPY.swatchNote},suggestions:TRIAL_COPY.suggestions.productDraft};
  }
  const planned=[...(state.uses||[])].reverse().find(u=>u.status==='planned');
  if(/我回来|今天用了|化完妆|回来补/.test(input) && planned){
    return {...common,kind:'feedback-draft',reply:TRIAL_COPY.feedbackDraft,draft:{useId:planned.id,note:input,feedback:/喜欢|好看|不错/.test(input)?'喜欢':'',ootd:(input.match(/黑色外套|黑色衣服|深色衣服/)||[])[0]||''},suggestions:['确认今天的使用感受']};
  }
  const saved=findCoralPair(state),isAlternate=/再想想|重新推荐|换一套|换个搭配/.test(input);
  if(isAlternate){
    const alt=saved && alternateResult(state);
    return alt?{...common,kind:'recommendation',reply:TRIAL_COPY.alternateRecommendation,results:[alt],suggestions:TRIAL_COPY.suggestions.alternate}:{...common,kind:'answer',reply:saved?'这套之外暂时没有可用的另一块腮红。':'先保存一套搭配，我再帮你换方向。'};
  }
  if(/说过.*衣服|以前.*衣服|记得.*衣服/.test(input) && !/怎么搭|搭配腮红/.test(input)){
    const memory=saved && findHistory(state,saved.id);
    return {...common,kind:'answer',reply:memory?`你保存这套时说过：“${memory.text}”我记到的是“深色衣服”这一类，还没有具体哪件单品。`:'目前没有你确认保存过的衣服心得。'};
  }
  if(saved && (!previousPairingId||previousPairingId===saved.id) && /更清冷|清冷一点|高冷一点|这套可以吗/.test(input)){
    return {...common,kind:'answer',reply:findHistory(state,saved.id)?TRIAL_COPY.coolerFollowUp:TRIAL_COPY.coolerFollowUpGeneric,focusPairingId:saved.id,suggestions:TRIAL_COPY.suggestions.coolerFollowUp};
  }
  if(/MOIRA|Mauve|粉紫色/.test(input) || (saved&&previousPairingId===saved.id&&/这套|怎么搭|搭配腮红|清冷/.test(input))){
    if(!saved)return {...common,kind:'answer',reply:TRIAL_COPY.noSavedPairing};
    const result=savedResult(state,saved);
    const memory=findHistory(state,saved.id);
    const reply=memory?(/黑色/.test(input)?TRIAL_COPY.savedRecommendationBlack:TRIAL_COPY.savedRecommendation):'我找到你保存的 Coral glow × MOIRA Mauve Majesty。今天可以把腮红薄薄晕开，让粉紫色唇部做重点。';
    return {...common,kind:'recommendation',reply,results:[result],suggestions:TRIAL_COPY.suggestions.recommendation};
  }
  return {...common,kind:'answer',reply:'你可以发产品图记录一件单品，或者发两张图保存一套搭配。我会先给你看草稿，确认后才记住。'};
}

export function confirmTrialProduct(state,draft,values={},idFactory){
  if(draft?.fixtureId!=='nars-devilish')throw new Error('找不到可确认的 NARS 产品草稿。');
  const product={...FIXTURE.nars,...draft,...values};
  for(const key of ['brand','name','shade','tone'])if(!clean(product[key]))throw new Error('请先核对品牌、名称、色号和颜色。');
  const existing=findProduct(state,product);
  const confirmed=existing||{id:makeId(state,'trial-nars-devilish',idFactory),category:'blush',brand:clean(product.brand),name:clean(product.name),shade:clean(product.shade),tone:clean(product.tone),finish:clean(product.finish),image:product.image,swatchImage:TRIAL_ASSETS.nars_devilish_swatch.src,description:clean(product.description),source:'用户确认录入',sourceNote:TRIAL_COPY.swatchNote,demo:true,createdAt:nowValue()};
  if(!existing)state.products.push(confirmed);
  const originalWords=clean(product.description);
  if(originalWords&&!state.memories.some(m=>m.productIds?.includes(confirmed.id)&&m.text===originalWords)){
    state.memories.push({id:makeId(state,'trial-product-memory',idFactory),type:'USER_FACT',productIds:[confirmed.id],text:originalWords,source:'用户确认的产品描述',createdAt:nowValue()});
  }
  return {product:confirmed,created:!existing,reply:TRIAL_COPY.productSaved,visualOptions:TRIAL_VISUAL_FLOW.productWhite,suggestions:TRIAL_COPY.suggestions.productSaved};
}

export function chooseTrialProductWhite(state,productId,choice){
  const product=state.products.find(row=>row.id===productId && !row.archived);
  if(!product)throw new Error('请先确认并保存这件产品。');
  if(choice==='later')return {status:'deferred',reply:TRIAL_COPY.productWhiteLater,laterEntry:TRIAL_VISUAL_FLOW.productWhite.laterEntry};
  if(choice!=='generate')throw new Error('请选择生成白底图或稍后再说。');
  if(norm(product.brand)!=='nars'||norm(product.shade||product.name)!=='devilish不乖')throw new Error('这件产品暂时没有可用的白底图。');
  // The profile-page disclosure covers this fixed gallery preview; no API
  // generation is claimed in persisted provenance.
  const src=TRIAL_ASSETS[TRIAL_VISUAL_FLOW.productWhite.previewAssetSlot].src;
  product.whiteImageSrc=src;
  product.whiteImageSource='gallery-preview';
  return {status:'ready',src,reply:TRIAL_COPY.productWhiteReady,laterEntry:TRIAL_VISUAL_FLOW.productWhite.laterEntry};
}

export function confirmTrialPairing(state,draft,values={},idFactory){
  if(draft?.fixtureId!=='coral-mauve')throw new Error('找不到可确认的搭配草稿。');
  const rawSwatches=values.swatches??draft.swatches??{};
  const choices={blush:selectedSwatch(rawSwatches.blush,'coral_glow_swatch'),lip:selectedSwatch(rawSwatches.lip,'mauve_majesty_swatch')};
  const swatches={blush:choices.blush.src,lip:choices.lip.src};
  const swatchAssetIds={blush:choices.blush.assetId,lip:choices.lip.assetId};
  const swatchSources={blush:choices.blush.source,lip:choices.lip.source};
  const blushTemplate={...FIXTURE.coral,...draft.blushProduct,...values.products?.blush,swatchImage:swatches.blush,swatchAssetId:swatchAssetIds.blush};
  const lipTemplate={...FIXTURE.mauve,...draft.lipProduct,...values.products?.lip,swatchImage:swatches.lip,swatchAssetId:swatchAssetIds.lip};
  const memoryText=clean(values.memoryText??draft.memoryText);
  if(!memoryText)throw new Error('请先核对这套搭配的使用心得。');
  for(const template of [blushTemplate,lipTemplate])if(!clean(template.brand)||!clean(template.shade||template.name))throw new Error('请先核对两件产品。');
  const saveProduct=(template,base)=>{
    const existing=findProduct(state,template);
    if(existing)return existing;
    const source=template.category==='blush'?swatchSources.blush:swatchSources.lip;
    const row={id:makeId(state,base,idFactory),category:template.category,brand:clean(template.brand),name:clean(template.name),shade:clean(template.shade),tone:clean(template.tone),finish:clean(template.finish),image:template.image,swatchImage:template.swatchImage,swatchAssetId:template.swatchAssetId,source:'用户确认录入',sourceNote:swatchNoteFor(source),demo:true,createdAt:nowValue()};
    state.products.push(row);
    return row;
  };
  const blush=saveProduct(blushTemplate,'trial-coral-glow');
  const lip=saveProduct(lipTemplate,'trial-mauve-majesty');
  let pairing=state.pairings.find(row=>row.blush===blush.id&&row.lip===lip.id);
  const created=!pairing;
  if(!pairing){
    pairing={id:makeId(state,'trial-coral-mauve',idFactory),blush:blush.id,lip:lip.id,name:clean(values.name??draft.name)||'蜜瓜粉色搭粉紫',mood:clean(values.mood??draft.mood),regular:false,blushToneLabel:blush.tone,lipToneLabel:lip.tone,swatches,swatchAssetIds,swatchSources,reason:/喜欢/.test(memoryText)&&/深色衣服/.test(memoryText)?'你记录过喜欢这组冷暖撞色，也觉得它配深色衣服好看。':'来自你确认保存的搭配，建议按实际上脸效果调整浓淡。',method:'Coral glow 少量晕开，Mauve Majesty 先薄涂，再按上脸效果调整。',source:'用户确认的搭配',difference:swatchSources.blush===swatchSources.lip?swatchNoteFor(swatchSources.blush):'试色图来源不同；具体颜色和质地以实际上脸为准。',photos:[],createdAt:nowValue(),demo:true};
    state.pairings.push(pairing);
  }else if(values.swatches||swatches.blush||swatches.lip||swatchAssetIds.blush||swatchAssetIds.lip){
    pairing.swatches=swatches;
    pairing.swatchAssetIds=swatchAssetIds;
    pairing.swatchSources=swatchSources;
    pairing.difference=swatchSources.blush===swatchSources.lip?swatchNoteFor(swatchSources.blush):'试色图来源不同；具体颜色和质地以实际上脸为准。';
    if(swatches.blush&&!blush.swatchImage)blush.swatchImage=swatches.blush;
    if(swatches.lip&&!lip.swatchImage)lip.swatchImage=swatches.lip;
    if(swatchAssetIds.blush&&!blush.swatchAssetId)blush.swatchAssetId=swatchAssetIds.blush;
    if(swatchAssetIds.lip&&!lip.swatchAssetId)lip.swatchAssetId=swatchAssetIds.lip;
    if(swatchSources.blush)blush.sourceNote=swatchNoteFor(swatchSources.blush);
    if(swatchSources.lip)lip.sourceNote=swatchNoteFor(swatchSources.lip);
  }
  const existingMemory=state.memories.find(m=>m.pairingId===pairing.id&&m.text===memoryText);
  if(!existingMemory)state.memories.push({id:makeId(state,'trial-pair-memory',idFactory),type:'USER_FACT',pairingId:pairing.id,productIds:[blush.id,lip.id],text:memoryText,source:'用户确认的原话',createdAt:nowValue()});
  const pastUse=/以前|用过|搭过/.test(memoryText);
  if(pastUse && !state.uses.some(u=>u.pairingId===pairing.id&&u.source==='用户确认的过去使用')){
    state.uses.push({id:makeId(state,'trial-past-use',idFactory),pairingId:pairing.id,blushId:blush.id,lipId:lip.id,status:'used',day:null,usedAt:null,dateKnown:false,feedback:/喜欢/.test(memoryText)?'喜欢':'',note:memoryText,ootd:/深色衣服/.test(memoryText)?'深色衣服':'',source:'用户确认的过去使用'});
  }
  return {pairing,products:[blush,lip],created,reply:/喜欢/.test(memoryText)?TRIAL_COPY.pairingSaved:TRIAL_COPY.pairingSavedGeneric,visualFollowUp:(!swatches.blush&&!swatches.lip&&!swatchAssetIds.blush&&!swatchAssetIds.lip)?TRIAL_COPY.pairingSwatchLater:'',visualOptions:TRIAL_VISUAL_FLOW.pairingSwatches,suggestions:TRIAL_COPY.suggestions.pairingSaved};
}

export function planTrialUse(state,recommendation,{day,now=nowValue(),idFactory}={}){
  const blush=state.products.find(p=>p.id===recommendation?.blush),lip=state.products.find(p=>p.id===recommendation?.lip);
  if(!blush||!lip||blush.category!=='blush'||lip.category!=='lip')throw new Error('这套搭配的产品尚未确认。');
  const pairing=state.pairings.find(p=>(p.id===recommendation.pairingId||p.id===recommendation.id)&&p.blush===blush.id&&p.lip===lip.id);
  const useDay=day||localDay(now);
  const existing=state.uses.find(u=>u.status==='planned'&&u.day===useDay&&u.blushId===blush.id&&u.lipId===lip.id);
  if(existing)return {use:existing,created:false,reply:TRIAL_COPY.plannedUse,suggestions:TRIAL_COPY.suggestions.plannedUse};
  const use={id:makeId(state,'trial-planned-use',idFactory),pairingId:pairing?.id||'',blushId:blush.id,lipId:lip.id,suggestedPairingName:pairing?'':clean(recommendation.name),status:'planned',day:useDay,plannedAt:now,usedAt:null,feedback:'',note:'',ootd:'',photoAssetIds:[],source:pairing?'已保存搭配的今日计划':'新建议的今日计划'};
  state.uses.push(use);
  return {use,created:true,reply:TRIAL_COPY.plannedUse,suggestions:TRIAL_COPY.suggestions.plannedUse};
}

export function confirmTrialFeedback(state,useId,values={}, {now=nowValue(),idFactory}={}){
  const use=state.uses.find(row=>row.id===useId);
  if(!use||use.status!=='planned')throw new Error('请先选择今天计划使用的搭配。');
  const note=clean(values.note),feedback=clean(values.feedback),ootd=clean(values.ootd);
  const photoAssetIds=Array.isArray(values.photoAssetIds)?values.photoAssetIds.filter(Boolean):[];
  if(!note&&!feedback&&!ootd&&!photoAssetIds.length)throw new Error('请先补充今天的实际使用感受或照片。');
  Object.assign(use,{status:'used',usedAt:now,dateKnown:true,feedback,note,ootd,photoAssetIds});
  const pairing=state.pairings.find(p=>p.id===use.pairingId);
  if(pairing){pairing.photos||=[];for(const id of photoAssetIds)if(!pairing.photos.some(photo=>photo.id===id))pairing.photos.push({id,label:'我的实拍',useId:use.id});}
  if(note||ootd){
    state.memories.push({id:makeId(state,'trial-feedback-memory',idFactory),type:'USER_FACT',pairingId:use.pairingId||'',productIds:[use.blushId,use.lipId],text:[note,ootd&&`今天的 OOTD：${ootd}`].filter(Boolean).join('；'),source:'用户确认的今日反馈',createdAt:now,useId:use.id});
  }
  return {use,reply:TRIAL_COPY.feedbackSaved,suggestions:TRIAL_COPY.suggestions.feedbackSaved};
}
