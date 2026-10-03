import test from 'node:test';
import assert from 'node:assert/strict';
import {seed, emptyState, ensureDemoSeeds} from '../data.js';

test('体验档案保留两套搭配和四件示例产品，不预置用户经历',()=>{
  const state=seed();
  assert.equal(state.schemaVersion,4);
  assert.equal(state.profile,'demo');
  assert.deepEqual(state.products.map(p=>p.id),['b0','b1','l0','l1']);
  assert.deepEqual(state.pairings.map(p=>p.id),['p1','p2']);
  for(const key of ['uses','memories','tasks'])assert.deepEqual(state[key],[]);
  assert.deepEqual(state.drafts,{});
});

test('旧演示档案补回缺失的示例内容，保留新增产品',()=>{
  const state=seed();state.products=[{id:'mine',category:'blush'}];state.pairings=[];
  assert.equal(ensureDemoSeeds(state),true);
  assert.equal(state.products.length,5);
  assert.equal(state.pairings.length,2);
});

test('个人档案与体验档案初始数据互相独立',()=>{
  const demo=seed(),personal=emptyState();
  demo.products.push({id:'p1'});
  assert.deepEqual(personal.products,[]);
  assert.equal(personal.profile,'personal');
});
