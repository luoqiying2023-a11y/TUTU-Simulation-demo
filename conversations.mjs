export function ensureConversations(state){
  if(state.conversations)return state.conversations;
  state.conversations=[];
  for(const task of state.tasks||[]){
    let conversation=state.conversations.find(c=>c.legacyIds.includes(task.previousId));
    if(!conversation){conversation={id:task.id,title:task.text||'和涂涂聊聊',createdAt:task.createdAt,updatedAt:task.createdAt,messages:[],draft:{text:'',attachments:[]},legacyIds:[]};state.conversations.push(conversation);}
    conversation.legacyIds.push(task.id);
    conversation.messages.push({id:`${task.id}-user`,role:'user',text:task.text,attachments:(task.assetIds||[]).map(assetId=>({assetId})),createdAt:task.createdAt});
    if(task.reply)conversation.messages.push({id:`${task.id}-reply`,role:'assistant',text:task.reply,result:{kind:'answer'},createdAt:task.createdAt});
  }
  return state.conversations;
}
export function conversationForSend(state,existingId='',makeId=()=>crypto.randomUUID()){
  const rows=ensureConversations(state);
  if(existingId){const found=rows.find(c=>c.id===existingId);if(!found)throw new Error('这条对话已不存在，请从首页开始。');return found;}
  const stamp=Date.now();const row={id:makeId(),title:'和涂涂聊聊',createdAt:stamp,updatedAt:stamp,messages:[],draft:{text:'',attachments:[]},legacyIds:[]};rows.push(row);return row;
}
export function conversationStatus(c){
  if(c.messages.some(m=>m.processing))return '正在整理';
  if(c.draft?.text||c.draft?.attachments?.length||c.messages.some(m=>m.result?.draft&&!m.confirmed))return '未完成';
  return c.plannedUseId?'等待你的使用感受':'可继续聊';
}
