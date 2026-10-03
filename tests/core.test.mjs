import test from 'node:test';
import assert from 'node:assert/strict';
import { candidates, localRecommend, validatePairings, validateProducts, validateProductDraft, validateAssistantResult, duplicateProduct } from '../core.mjs';

const product = (id, category, overrides={}) => ({id,category,brand:'Brand',name:id,shade:'浅豆沙',tone:'中性',finish:'柔雾',...overrides});
const stock = [product('b1','blush'),product('b2','blush'),product('l1','lip'),product('l2','lip')];
const pairing = (blush='b1',lip='l1',extra={}) => ({blush,lip,name:'日常组合',reason:'以柔和色调呼应',method:'少量叠加',difference:'备选更清淡',...extra});
const draft = {category:'unknown',brand:'',name:'',shade:'',tone:'',finish:'',uncertainty:''};

test('缺少任一品类时不给出虚构组合',()=>{
  for(const products of [[],stock.filter(p=>p.category==='blush'),stock.filter(p=>p.category==='lip')]){
    assert.deepEqual(candidates(products),[]);
    assert.deepEqual(localRecommend(products,[],[],'通勤'),[]);
  }
});
test('只一套合法组合时只返回一套，不复制备选',()=>{
  const result=localRecommend([stock[0],stock[2]],[],[],'日常');
  assert.equal(result.length,1);
  assert.equal(result[0].blush,'b1');
  assert.equal(result[0].lip,'l1');
});
test('锚定腮红或口红在换一组后仍被保留；归档锚点不产生结果',()=>{
  for(const anchor of ['b2','l2'])for(const offset of [0,1,7]){
    const result=localRecommend(stock,[],[],'清冷',anchor,offset);
    assert.equal(result.length,1);
    assert.ok(result.every(p=>p.blush===anchor||p.lip===anchor));
  }
  assert.deepEqual(candidates(stock,'invented'),[]);
  assert.deepEqual(candidates(stock.map(p=>({...p,archived:p.id==='b2'})),'b2'),[]);
});
test('已有喜欢反馈影响排序且规则建议标明来源',()=>{
  const pairs=[{id:'old',blush:'b2',lip:'l2',regular:true}];
  const result=localRecommend(stock,pairs,[{pairingId:'old',feedback:'喜欢'}],'日常');
  assert.equal(result[0].blush,'b2');
  assert.equal(result[0].lip,'l2');
  assert.match(result[0].source,/本地规则/);
  assert.match(result[0].difference,/未分析照片/);
});
test('推荐拒绝非法 ID、品类错位、归档、重复和未保留锚点',()=>{
  for(const rows of [[pairing('ghost')],[pairing('l1','b1')],[pairing(),pairing()]])assert.throws(()=>validatePairings(rows,stock));
  assert.throws(()=>validatePairings([pairing()],stock.map(p=>({...p,archived:p.id==='b1'}))));
  assert.throws(()=>validatePairings([pairing()],stock,'b2'));
  assert.deepEqual(validatePairings([pairing('b2')],stock,'b2'),[pairing('b2')]);
});
test('推荐字段拒绝空白、null、超长与多于两套',()=>{
  for(const rows of [null,[null],[pairing('b1','l1',{reason:'  '})],[pairing('b1','l1',{method:42})],[pairing('b1','l1',{name:'x'.repeat(201)})],[pairing(),pairing('b2'),pairing('b2','l2')]])assert.throws(()=>validatePairings(rows,stock));
});
test('库存输入不能静默丢弃非法、重复或有歧义的状态',()=>{
  for(const products of [[null],[product('x','eye')],[stock[0],stock[0]],[product('b','blush',{archived:'false'})],[product('b','blush',{name:{text:'name'}})]])assert.throws(()=>validateProducts(products));
  const clean=validateProducts([{...stock[0],internal:'not sent'}]);
  assert.equal(clean[0].archived,false);
  assert.equal(clean[0].internal,undefined);
});
test('产品草稿允许未知值但不允许无效类型与过长字段',()=>{
  assert.deepEqual(validateProductDraft(draft),draft);
  for(const p of [null,{...draft,category:'eye'},{...draft,shade:[]},{...draft,brand:'x'.repeat(201)}])assert.throws(()=>validateProductDraft(p));
  assert.equal(validateProductDraft({...draft,untrusted:'ignored'}).untrusted,undefined);
});
test('AI 结果意图与内容保持一致，不把空推荐当成功',()=>{
  const result={intent:'recommend',reply:'推荐这组',product:draft,pairings:[pairing()]};
  assert.deepEqual(validateAssistantResult(result,stock),result);
  assert.throws(()=>validateAssistantResult({...result,pairings:[]},stock));
  assert.throws(()=>validateAssistantResult({...result,intent:'answer'},stock));
  assert.throws(()=>validateAssistantResult(result,stock,'','extract'));
  assert.throws(()=>validateAssistantResult({...result,intent:'answer',pairings:[]},stock,'','extract'),/产品识别未返回草稿/);
  assert.throws(()=>validateAssistantResult({...result,product:null},stock));
});
test('重复产品识别忽略大小写空白，编辑自身及归档项不误报',()=>{
  const p=product('existing','lip',{brand:'SHEGLAM',name:'Lip Cream',shade:' PK 10 '});
  const input={...p,id:'new',brand:'sheglam ',name:'lipcream',shade:'pk10'};
  assert.equal(duplicateProduct([p],input)?.id,'existing');
  assert.equal(duplicateProduct([p],{...input,id:'existing'}),undefined);
  assert.equal(duplicateProduct([{...p,archived:true}],input),undefined);
  assert.equal(duplicateProduct([p],{...input,category:'blush'}),undefined);
});
