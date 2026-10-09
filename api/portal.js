const crypto = require('crypto');
const CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTaBuHeJUyB_Y7l4jnncbEPG9QOs8vQ3aNQL9x9-t_A_WxhQdCI9BGG1AsgdKN307cQNGZe63P_E3hx/pub?output=csv';
function parseCsv(text) {
  const rows=[]; let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++) { const c=text[i];
    if(c==='"') { if(quoted && text[i+1]==='"'){cell+='"';i++;}else quoted=!quoted; }
    else if(c===','&&!quoted){row.push(cell);cell='';}
    else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(Boolean))rows.push(row);row=[];cell='';}
    else cell+=c;
  } row.push(cell);if(row.some(Boolean))rows.push(row);return rows;
}
function sign(value) { return crypto.createHmac('sha256',process.env.SESSION_SECRET).update(value).digest('base64url'); }
function token(session) { const value=Buffer.from(JSON.stringify(session)).toString('base64url');return value+'.'+sign(value); }
function readSession(req) {
  try { const cookie=/(?:^|;\s*)portal_session=([^;]+)/.exec(req.headers.cookie||'')?.[1];if(!cookie)return null;
    const [value,signature]=cookie.split('.');const expected=Buffer.from(sign(value)),actual=Buffer.from(signature||'');
    if(actual.length!==expected.length||!crypto.timingSafeEqual(actual,expected))return null;
    const s=JSON.parse(Buffer.from(value,'base64url').toString());return s.exp>Date.now()?s:null;
  } catch{return null;}
}
function cookie(res,value,clear=false){res.setHeader('Set-Cookie',`portal_session=${value}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${clear?0:28800}`);}
async function log(session,action) {
  const r=await fetch(process.env.GOOGLE_SCRIPT_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:process.env.GOOGLE_SCRIPT_SECRET,session,action}),signal:AbortSignal.timeout(20000)});
  if(!r.ok)throw Error('Google Sheets unavailable');const result=await r.json();
  if(!result.ok){if(result.expired)return false;throw Error('Google Sheets rejected update');}return true;
}
module.exports=async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  const reply=(code,value)=>res.status(code).json(value);
  const action=req.query.action;
  if(!['login','logout','session','heartbeat'].includes(action))return reply(404,{error:'ไม่พบข้อมูล'});
  if(req.method!==(action==='session'?'GET':'POST'))return reply(405,{error:'คำขอไม่ถูกต้อง'});
  if(req.method==='POST'){try{if(new URL(req.headers.origin).host!==req.headers.host)return reply(403,{error:'คำขอไม่ถูกต้อง'});}catch{return reply(403,{error:'คำขอไม่ถูกต้อง'});}}
  if(!process.env.GOOGLE_SCRIPT_URL||!process.env.GOOGLE_SCRIPT_SECRET||!process.env.SESSION_SECRET)return reply(503,{error:'กรุณาตั้งค่า Environment Variables บน Vercel'});
  try {
    if(action==='login') {
      const code=req.body?.code;if(typeof code!=='string'||!code.trim()||code.length>50)return reply(400,{error:'กรุณากรอกรหัสพนักงาน'});
      const r=await fetch(CSV,{signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('Directory unavailable');
      const rows=parseCsv(await r.text()),headers=rows.shift().map(h=>h.replace(/^\uFEFF/,'').trim());
      const c=headers.indexOf('รหัสพนักงาน'),n=headers.indexOf('ชื่อ-นามสกุล ภาษาไทย'),t=headers.indexOf('คำนำหน้า');
      if(c<0||n<0)throw Error('Missing columns');const employee=rows.find(row=>row[c]?.trim()===code.trim());
      if(!employee||!employee[n]?.trim())return reply(401,{error:'ไม่พบรหัสพนักงานนี้ กรุณาตรวจสอบอีกครั้ง'});
      const old=readSession(req);if(old)await log({...old,logoutAt:new Date().toISOString(),logoutReason:'เข้าสู่ระบบใหม่'},'logout');
      const user={code:code.trim(),name:[employee[t]?.trim(),employee[n].trim()].filter(Boolean).join(' ')};
      const s={id:crypto.randomUUID(),...user,loginAt:new Date().toISOString(),exp:Date.now()+28800000};
      await log(s,'login');cookie(res,token(s));return reply(200,{user,logging:{configured:true,pending:0}});
    }
    const s=readSession(req);
    if(!s)return action==='session'?reply(200,{user:null,logging:{configured:true,pending:0}}):reply(401,{error:'กรุณาเข้าสู่ระบบ'});
    if(action==='logout'){await log({...s,logoutAt:new Date().toISOString(),logoutReason:'ออกจากระบบ'},'logout');cookie(res,'',true);return reply(200,{ok:true});}
    if(!await log(s,'heartbeat')){cookie(res,'',true);return action==='session'?reply(200,{user:null,logging:{configured:true,pending:0}}):reply(401,{error:'การเชื่อมต่อหมดเวลา กรุณาเข้าสู่ระบบอีกครั้ง'});}
    return reply(200,{user:{code:s.code,name:s.name},logging:{configured:true,pending:0}});
  } catch {return reply(503,{error:'เชื่อมต่อชีตไม่สำเร็จ กรุณาลองอีกครั้ง ระบบยังไม่ยืนยันการเข้า–ออก'});}
};
module.exports.parseCsv=parseCsv;
