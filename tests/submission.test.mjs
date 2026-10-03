import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,access} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
test('发布入口和全部浏览器模块可通过相对路径加载',async()=>{
  const html=await readFile(new URL('index.html',root),'utf8');
  assert.match(html,/script.src='\.\/app.js'/);
  for(const name of await readdir(root)){
    if(!/\.(js|mjs)$/.test(name))continue;
    const code=await readFile(new URL(name,root),'utf8');
    for(const m of code.matchAll(/from\s+['"]([^'"]+)['"]/g)){
      assert.ok(m[1].startsWith('./'),`${name}: ${m[1]}`);
      await access(new URL(m[1],root));
    }
    assert.doesNotMatch(code,/fetch\s*\(|\/api\/|getUserMedia|MediaRecorder/);
  }
});
test('故事和样式引用的静态素材全部存在',async()=>{
  for(const name of ['trial.mjs','data.js','style.css','v05.css']){
    const code=await readFile(new URL(name,root),'utf8');
    for(const m of code.matchAll(/(?:\.\/)?assets\/[\w/.-]+/g))await access(new URL(m[0],root));
  }
});
test('提交版不包含 AI 服务和环境配置',async()=>{
  const files=await readdir(root);
  for(const name of ['server.mjs','bailian.mjs','v05-ai.mjs','.env','.env.example'])assert.ok(!files.includes(name));
  assert.ok(files.includes('.nojekyll'));
});
