const has = (text, pattern) => pattern.test(text);
const label = p => [p.brand, p.shade || p.name].filter(Boolean).join(' ');

export function findMentionedProduct(products, text, previousProductId = '') {
  const category = has(text,/腮红/) ? 'blush' : has(text,/唇釉|口红|唇油|唇膏/) ? 'lip' : '';
  const color = (text.match(/粉紫色|蜜瓜粉色|蜜瓜色|冷粉色|深蜜桃色/) || [''])[0];
  const candidates = products.filter(p=>!p.archived&&(!category||p.category===category));
  const ranked = candidates.map(p=>{
    const values=[p.brand,p.name,p.shade,p.tone].filter(Boolean);
    const score=values.reduce((n,value)=>n+(text.toLowerCase().includes(value.toLowerCase())?value.length:0),0)
      +(color&&`${p.name} ${p.shade} ${p.tone}`.includes(color)?20:0);
    return {p,score};
  }).sort((a,b)=>b.score-a.score);
  if(ranked[0]?.score>0)return ranked[0].p;
  return products.find(p=>p.id===previousProductId&&!p.archived);
}

export function savedRecommendations(state, text = '', anchor = '', offset = 0){
  const products=new Map(state.products.filter(p=>!p.archived).map(p=>[p.id,p]));
  const words=[...new Set((text.match(/深蜜桃|蜜瓜|冷粉|粉紫|樱花|高冷|清冷|温柔|通勤|暖|冷/g)||[]))];
  const rows=state.pairings.filter(p=>products.has(p.blush)&&products.has(p.lip)&&(!anchor||p.blush===anchor||p.lip===anchor));
  rows.sort((a,b)=>{
    const score=p=>words.reduce((sum,word)=>sum+(`${p.name} ${p.mood} ${p.blushToneLabel} ${p.lipToneLabel}`.includes(word)?1:0),0);
    return score(b)-score(a);
  });
  if(!rows.length)return [];
  const start=offset%rows.length;
  return [...rows.slice(start),...rows.slice(0,start)].slice(0,2).map(p=>({...p,source:p.source||'已保存的搭配'}));
}

export function mockAssist(state, task) {
  const text=task.text.trim();
  const previous=state.tasks.find(t=>t.id===task.previousId);
  const previousPairingId=task.contextPairingId||previous?.focusPairingId||'';
  const previousProductId=task.anchor||previous?.focusProductId||'';
  const current=findMentionedProduct(state.products,text,previousProductId);
  const focusProductId=current?.id||'';
  const pairing=state.pairings.find(p=>p.id===previousPairingId)
    ||state.pairings.find(p=>current&&(p.blush===current.id||p.lip===current.id));
  const focusPairingId=pairing?.id||'';

  if(has(text,/^(记住|记下|记录一下|帮我记住)[：:\s]?/)){
    const original=text.replace(/^(记住|记下|记录一下|帮我记住)[：:\s]?/,'').trim();
    if(!original)return {intent:'answer',reply:'请在“记住”后面写下你的原话。',pairings:[],focusProductId,focusPairingId};
    return {intent:'answer',reply:pairing?`已记下你对“${pairing.name}”说的原话：“${original}”`:'已记下你的原话。关联具体搭配后，就可以从那套搭配找回。',pairings:[],focusProductId,focusPairingId,
      memory:{text:original,pairingId:focusPairingId,productIds:focusPairingId?[pairing.blush,pairing.lip]:focusProductId?[focusProductId]:[]}};
  }

  if(has(text,/衣服|穿什么|西装|针织|说过什么/)){
    const memories=(state.memories||[]).filter(m=>m.pairingId===focusPairingId||m.productIds?.includes(focusProductId));
    const clothing=memories.find(m=>has(m.text,/衣服|穿|西装|针织|外套/));
    return {intent:'answer',reply:clothing?`你之前写过：“${clothing.text}”（来源：你主动录入的文字）`:'这个档案里还没有你主动记录过的衣服信息。可以在搭配详情点“记下衣服”，输入“记住：这套搭黑色西装外套很好看”。',pairings:[],focusProductId,focusPairingId};
  }

  if(has(text,/添加|录入|新买|买了/) && task.mode!=='recreate'){
    const category=has(text,/腮红/)?'blush':has(text,/口红|唇釉|唇油|唇膏/)?'lip':'';
    const brand=(text.match(/\b(?:NARS|MOIRA|SHEGLAM)\b/i)||[])[0] || (text.match(/品牌(?:是|叫|为)?\s*([A-Za-z][A-Za-z0-9-]{1,30})/i)||[])[1] || '';
    const color=(text.match(/粉紫色|蜜瓜粉色|蜜瓜色|冷粉色|深蜜桃色/)||[])[0]||'';
    return {intent:'product',reply:'我把你的文字整理成待确认草稿。请核对类别、色号、品牌和色调；看不准的内容可以留空。确认后才会进入产品库。',product:{category,brand,name:'',shade:'',tone:color,finish:'',uncertainty:'文字体验草稿：只读取本条文字，没有看图或识别品牌包装。'},pairings:[],focusProductId:''};
  }

  if(has(text,/高冷|搭配|怎么搭|想用|使用|推荐|组合|今天/) || task.mode==='recreate'){
    const anchor=current?.id||task.anchor||'';
    const rows=savedRecommendations(state,text,anchor,task.offset).map(row=>({...row,anchor}));
    const used=rows.find(row=>state.pairings.some(p=>p.blush===row.blush&&p.lip===row.lip&&state.uses.some(u=>u.pairingId===p.id)));
    if(used){rows.splice(rows.indexOf(used),1);rows.unshift(used);}
    const past=used&&state.pairings.find(p=>p.blush===used.blush&&p.lip===used.lip);
    return {intent:'recommend',reply:rows.length
      ?`${current?`找到了 ${label(current)}。`:''}${past?`你曾记录使用过“${past.name}”。`:'我从已保存的搭配中找到了符合色调的组合。'}每张卡片是一套独立搭配，可以查看或记录今天使用。`
      :state.products.length<2?'产品库里还没有一件腮红和一件口红。先录入产品，再记录一套搭配。':anchor?'这件产品暂时没有已保存的唇颊搭配。可以先在“唇颊搭配”中手动记录一套。':'档案里还没有已保存的唇颊搭配。请先记录一套。',pairings:rows,focusProductId:anchor,focusPairingId:past?.id||pairing?.id||''};
  }

  if(current)return {intent:'answer',reply:`找到了 ${label(current)}。${pairing?`它关联“${pairing.name}”。`:'还没有它的已保存搭配。'}你可以继续问搭配或以前说过的衣服。`,pairings:[],focusProductId,focusPairingId};
  return {intent:'answer',reply:'当前是文字体验档案。先发送“录入一件 NARS 蜜瓜粉色腮红”，确认入库；再录入一支唇釉，就能体验搭配和找回记忆。',pairings:[],focusProductId:'',focusPairingId:''};
}
