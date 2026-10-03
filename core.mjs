const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const textField = (value, max, label, required = false) => {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new Error(`${label}不符合要求。`);
  return value.trim();
};
export function validateProducts(products) {
  if (!Array.isArray(products) || products.length > 300) throw new Error('产品库存不符合要求。');
  const ids = new Set();
  return products.map(p => {
    if (!isObject(p)) throw new Error('产品信息不完整。');
    const id = textField(p.id, 100, '产品 ID', true);
    if (ids.has(id)) throw new Error('产品 ID 重复，请检查库存。');
    ids.add(id);
    if (!['blush', 'lip'].includes(p.category)) throw new Error('产品类别不符合要求。');
    if (p.archived !== undefined && typeof p.archived !== 'boolean') throw new Error('产品归档状态不符合要求。');
    return {id, category:p.category, ...Object.fromEntries(['brand','name','shade','tone','finish'].map(k => [k,textField(p[k] ?? '', 200, '产品字段')])), archived:p.archived ?? false};
  });
}
export function validateProductDraft(product) {
  if (!isObject(product) || !['blush','lip','unknown'].includes(product.category)) throw new Error('产品识别草稿格式不正确，请重试或手动录入。');
  return {category:product.category, ...Object.fromEntries(['brand','name','shade','tone','finish','uncertainty'].map(k => [k,textField(product[k], k === 'uncertainty' ? 1000 : 200, '产品识别字段')]))};
}
export function activeProducts(products) { return products.filter(p => p && !p.archived && ['blush','lip'].includes(p.category)); }
export function toneFamily(value) {
  const tone = String(value || '').toLowerCase();
  if (/暖|蜜桃|珊瑚|橘|杏|peach|coral|orange/.test(tone)) return 'warm';
  if (/冷|粉紫|玫瑰|莓|樱花|紫|mauve|berry|lavender/.test(tone)) return 'cool';
  if (/中性|裸|奶茶|豆沙|neutral|nude/.test(tone)) return 'neutral';
  return tone.trim();
}
export function ideaCandidates(products, seedId, anchor = '') {
  const stock = activeProducts(products);
  const seed = stock.find(p => p.id === seedId);
  if (!seed) return [];
  if (anchor && seed.id === anchor) return [seed.id];
  const family = toneFamily(seed.tone || seed.shade);
  const matches = stock.filter(p => p.category === seed.category && p.id !== seed.id && family && toneFamily(p.tone || p.shade) === family);
  return [seed.id, ...matches.map(p => p.id)];
}
export function candidates(products, anchor = '') {
  const active = activeProducts(products);
  if (anchor && !active.some(p => p.id === anchor)) return [];
  return active.filter(p => p.category === 'blush').flatMap(b =>
    active.filter(p => p.category === 'lip').filter(l => !anchor || b.id === anchor || l.id === anchor)
      .map(l => ({ blush: b.id, lip: l.id })));
}
export function validatePairings(rows, products, anchor = '') {
  if (!Array.isArray(rows) || rows.length > 2) throw new Error('推荐格式不正确，请重试。');
  const allowed = new Set(candidates(products, anchor).map(p => `${p.blush}|${p.lip}`));
  const seen = new Set();
  return rows.map(p => {
    if (!isObject(p) || typeof p.blush !== 'string' || typeof p.lip !== 'string') throw new Error('推荐产品信息不完整。');
    const key = `${p.blush}|${p.lip}`;
    if (!allowed.has(key) || seen.has(key)) throw new Error('推荐包含无效、重复或不符合条件的产品组合，请重试。');
    seen.add(key);
    return {blush:p.blush,lip:p.lip,...Object.fromEntries(['name', 'reason', 'method', 'difference'].map(k => [k,textField(p[k], k === 'name' ? 200 : 1600, '推荐内容', true)]))};
  });
}
export function validateAssistantResult(out, products, anchor = '', mode = 'assistant') {
  if (!isObject(out) || !['recommend','product','answer'].includes(out.intent)) throw new Error('AI 结果不完整。');
  const reply = textField(out.reply, 6000, 'AI 回答', true);
  const product = validateProductDraft(out.product);
  const pairings = validatePairings(out.pairings, products, anchor);
  if (out.intent === 'recommend' && !pairings.length) throw new Error('没有可用的推荐组合，请补全腮红和口红库存后重试。');
  if (out.intent !== 'recommend' && pairings.length) throw new Error('AI 结果类型与推荐内容不一致，请重试。');
  if (mode === 'extract' && out.intent !== 'product') throw new Error('产品识别未返回草稿，请重试或手动录入。');
  return {intent:out.intent,reply,product:out.intent==='product'?product:{category:'unknown',brand:'',name:'',shade:'',tone:'',finish:'',uncertainty:''},pairings};
}
export function localRecommend(products, pairings, uses, text, anchor = '', offset = 0) {
  const byId = Object.fromEntries(products.map(p => [p.id, p]));
  const target = /冷|清冷/.test(text) ? '冷' : /暖|蜜桃/.test(text) ? '暖' : '';
  const light = /通勤|清淡|自然|不要太浓/.test(text);
  const rows = candidates(products, anchor).map(p => {
    const b = byId[p.blush], l = byId[p.lip];
    const old = pairings.find(x => x.blush === p.blush && x.lip === p.lip);
    const feedback = old ? uses.filter(u => u.pairingId === old.id) : [];
    const score = (target ? [b,l].filter(x => toneFamily(x.tone || x.shade) === (target === '暖' ? 'warm' : 'cool')).length * 5 : 0)
      + (light ? [b,l].filter(x => /浅|柔|裸|豆沙/.test(x.shade)).length * 3 : 0)
      + (old?.regular ? 2 : 0) + feedback.reduce((n,u) => n + (u.feedback === '喜欢' ? 2 : u.feedback === '不适合' ? -3 : 0),0);
    return {...p, score, name: `${b.shade} × ${l.shade}`, blushToneLabel:b.tone||b.shade, lipToneLabel:l.tone||l.shade, reason: old ? '你的搭配库中已有这组色调思路，可以换用同色调的其他产品。' : `按已记录的色调组合：${b.shade}腮红与${l.shade}口红。`, method:'先少量叠加腮红，再薄涂口红，按实际上脸效果调整浓淡。', difference:'本地规则建议，未分析照片；图片颜色可能受光线影响。', source:old ? '已有搭配 · 本地规则' : '产品色调 · 本地规则'};
  }).sort((a,b) => b.score-a.score);
  if (!rows.length) return [];
  const seen = new Set(), ideas = [];
  for (const row of rows) {
    const key = `${toneFamily(row.blushToneLabel)}|${toneFamily(row.lipToneLabel)}`;
    if (!seen.has(key)) { seen.add(key); ideas.push(row); }
  }
  const start = offset % ideas.length;
  return [...ideas.slice(start),...ideas.slice(0,start)].slice(0,2);
}
export function duplicateProduct(products, p) {
  const norm = s => String(s||'').trim().toLowerCase().replace(/\s/g,'');
  return products.find(x => !x.archived && x.id !== p.id && x.category === p.category && (norm(p.shade)?['brand','shade'].every(k => norm(x[k]) === norm(p[k])):!norm(x.shade)&&['brand','name'].every(k=>norm(x[k])===norm(p[k]))));
}
