#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.resolve(__dirname, '../../data.js');
const text = fs.readFileSync(file, 'utf8');
const prefix = 'window.AI_DAILY_DATA = ';
if (!text.startsWith(prefix)) {
  console.error('❌ data.js format invalid');
  process.exit(1);
}
const data = eval(text.slice(prefix.length));
if (!Array.isArray(data) || data.length === 0) {
  console.error('❌ no entries');
  process.exit(1);
}
const latest = data[0];
const requiredTop = ['id','date','title','company','summary','dailyConclusion','dailyMainline','whyNow','signalLevel','riskTemperature','lastUpdatedAt','headlines','actions'];
const missingTop = requiredTop.filter(k => latest[k] == null || latest[k] === '');
if (missingTop.length) {
  console.error('❌ missing top fields:', missingTop.join(', '));
  process.exit(1);
}
if (!['S','A','B'].includes(latest.signalLevel)) {
  console.error('❌ invalid signalLevel:', latest.signalLevel);
  process.exit(1);
}
if (!['低','中','高'].includes(latest.riskTemperature)) {
  console.error('❌ invalid riskTemperature:', latest.riskTemperature);
  process.exit(1);
}
if (!Array.isArray(latest.headlines) || latest.headlines.length < 5) {
  console.error('❌ headlines < 5');
  process.exit(1);
}
for (let i = 0; i < 5; i++) {
  const h = latest.headlines[i] || {};
  const requiredHeadline = ['title','summary','insight','opportunity','sources','sourceMeta','lastVerifiedAt','whyNow','signalLevel'];
  const missing = requiredHeadline.filter(k => h[k] == null || h[k] === '' || (Array.isArray(h[k]) && h[k].length === 0));
  if (missing.length) {
    console.error(`❌ headline ${i+1} missing:`, missing.join(', '));
    process.exit(1);
  }
}
console.log('✅ v2 validation passed for latest entry:', latest.id);
