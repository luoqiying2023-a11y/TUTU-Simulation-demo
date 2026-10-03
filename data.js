// 演示档案固定保留两套搭配和四件产品；试用者添加的内容可单独清空。
const base = profile => ({
  schemaVersion: 4, profile, products: [], pairings: [], uses: [], memories: [], tasks: [], drafts: {},
  ui: {category:'blush',filter:'all',expanded:'',scroll:{}}
});

export function seed(){
  const reference=file=>`用户提供 ${file} · Demo 体验资料，非本人库存`;
  const state=base('demo');
  state.products=[
    {id:'b0',category:'blush',brand:'SHEGLAM',name:'Cutie pie',shade:'Cutie pie',tone:'深蜜桃色',finish:'液体腮红',image:'./assets/products/cutie-pie.jpg',swatchImage:'./assets/swatches/deep-peach-blush.png',source:reference('cutie pie.jpg'),demo:true},
    {id:'b1',category:'blush',brand:'SHEGLAM',name:'Coral glow',shade:'Coral glow',tone:'蜜瓜粉色',finish:'液体腮红',image:'./assets/products/coral-glow.jpg',swatchImage:'./assets/swatches/melon-blush.png',source:reference('Coral glow.jpg'),demo:true},
    {id:'l0',category:'lip',brand:'黑兔',name:'PK10',shade:'PK10',tone:'冷粉色樱花色',finish:'哑光唇釉',image:'./assets/products/pk10.png',swatchImage:'./assets/swatches/cool-pink-lip.png',source:reference('PK10.PNG'),demo:true},
    {id:'l1',category:'lip',brand:'Moira',name:'Mauve Majesty',shade:'Mauve Majesty',tone:'粉紫色',finish:'亮面唇油',image:'./assets/products/mauve-majesty.jpg',swatchImage:'./assets/swatches/mauve-lip.png',source:reference('Mauve Majesty.jpg'),demo:true}
  ];
  state.pairings=[
    {id:'p1',blush:'b0',lip:'l0',name:'深蜜桃搭冷粉',mood:'温柔清冷韩系',regular:true,blushToneLabel:'深蜜桃色',lipToneLabel:'冷粉色樱花色',swatches:{blush:'./assets/swatches/deep-peach-blush.png',lip:'./assets/swatches/cool-pink-lip.png'},reason:'深蜜桃腮红补充气色，冷粉唇色压住暖感，整体温柔但不甜腻。',method:'Cutie pie 少量晕开，PK10 从唇心薄涂，再依上脸效果调整浓淡。',source:reference('深蜜桃色腮红.png + 冷粉口红.png'),difference:'试色图为统一模板效果，颜色、质地与个人上脸效果需以实际使用为准。',photos:[{id:'look-01',src:'./assets/selfies/look-01.png',label:'我的实拍'}]},
    {id:'p2',blush:'b1',lip:'l1',name:'蜜瓜粉色搭粉紫',mood:'冷暖撞色·适合深色衣服',regular:false,blushToneLabel:'蜜瓜粉色',lipToneLabel:'粉紫色',swatches:{blush:'./assets/swatches/melon-blush.png',lip:'./assets/swatches/mauve-lip.png'},reason:'蜜瓜粉腮红与粉紫唇色形成轻微冷暖撞色，配深色衣服时更有层次。',method:'Coral glow 薄扫面中，Mauve Majesty 少量叠涂，保留唇部亮泽。',source:reference('蜜瓜色腮红.PNG + 粉紫色口红.PNG'),difference:'试色图为统一模板效果，不代表真实肤色与光线。',photos:[]}
  ].map(p=>({...p,createdAt:Date.now(),demo:true}));
  state.demoSeedsMigrated=true;
  return state;
}

export const emptyState=()=>base('personal');

export function ensureDemoSeeds(state){
  if(state.profile!=='demo')return false;
  const original=seed();let changed=false;
  state.products||=[];state.pairings||=[];
  for(const p of original.products)if(!state.products.some(x=>x.id===p.id)){state.products.push(p);changed=true;}
  for(const p of original.pairings)if(!state.pairings.some(x=>x.id===p.id)){state.pairings.push(p);changed=true;}
  return changed;
}
