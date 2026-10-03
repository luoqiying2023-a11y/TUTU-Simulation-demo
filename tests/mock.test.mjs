import test from 'node:test';
import assert from 'node:assert/strict';
import {seed,emptyState} from '../data.js';
import {mockAssist} from '../mock.mjs';

test('空档案先引导用户录入，文字草稿不猜色号',()=>{
  const state=emptyState();
  assert.match(mockAssist(state,{text:'今天想用粉紫色唇釉',mode:'assistant'}).reply,/先录入产品/);
  const draft=mockAssist(state,{text:'录入一支 MOIRA 粉紫色唇釉',mode:'assistant'});
  assert.equal(draft.intent,'product');
  assert.equal(draft.product.brand,'MOIRA');
  assert.equal(draft.product.shade,'');
  assert.deepEqual(state.products,[]);
});

test('手动建立产品、搭配和记忆后才可找回',()=>{
  const state=emptyState();
  state.products.push({id:'b1',category:'blush',brand:'SHEGLAM',name:'蜜瓜粉色腮红',shade:'',tone:'蜜瓜粉色'},
    {id:'l1',category:'lip',brand:'MOIRA',name:'粉紫色唇釉',shade:'',tone:'粉紫色'});
  state.pairings.push({id:'pair-1',blush:'b1',lip:'l1',name:'高冷粉紫'});
  const first=mockAssist(state,{text:'今天想用 MOIRA 粉紫色唇釉，走高冷风格怎么搭？',mode:'assistant',offset:0});
  assert.equal(first.focusProductId,'l1');
  assert.equal(first.pairings[0].lip,'l1');
  assert.match(first.reply,/已保存的搭配/);
  state.tasks.push({id:'prev',focusProductId:'l1',focusPairingId:'pair-1'});
  const memory=mockAssist(state,{text:'记住：这套搭黑色西装外套很好看',previousId:'prev',mode:'assistant'});
  assert.equal(memory.memory.pairingId,'pair-1');
  state.memories.push({id:'m1',...memory.memory});
  const answer=mockAssist(state,{text:'我有说过什么衣服适合这套搭配吗？',previousId:'prev',mode:'assistant'});
  assert.match(answer.reply,/黑色西装外套/);
});

test('演示推荐只展示已有两套搭配，点名产品筛到对应搭配',()=>{
  const state=seed();
  const result=mockAssist(state,{text:'今天想用 MOIRA 的粉紫色唇釉，走高冷风格怎么搭？',mode:'assistant',offset:0});
  assert.deepEqual(result.pairings.map(p=>p.id),['p2']);
  assert.equal(result.focusProductId,'l1');
});
