import test from 'node:test';
import assert from 'node:assert/strict';
import {conversationForSend,ensureConversations,conversationStatus} from '../conversations.mjs';
test('首页新发送新建对话；打开已有对话继续保持 ID 和草稿',()=>{
 const state={tasks:[]};const a=conversationForSend(state,'',()=> 'A');a.draft.text='未发出的搭配';
 assert.equal(conversationStatus(a),'未完成');
 assert.equal(conversationForSend(state,'A'),a);
 assert.equal(conversationForSend(state,'A').draft.text,'未发出的搭配');
 const b=conversationForSend(state,'',()=> 'B');assert.notEqual(a.id,b.id);assert.equal(state.conversations.length,2);
 assert.throws(()=>conversationForSend(state,'missing'),/不存在/);
});
test('迁移 v03 连续任务时保留原话，并合并到原会话',()=>{
 const state={tasks:[{id:'one',text:'录入',reply:'草稿',createdAt:1},{id:'two',previousId:'one',text:'继续',reply:'收到',createdAt:2}]};
 const rows=ensureConversations(state);assert.equal(rows.length,1);assert.equal(rows[0].messages.length,4);assert.equal(rows[0].messages[2].text,'继续');assert.equal(ensureConversations(state),rows);
});
