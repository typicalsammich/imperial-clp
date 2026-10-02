const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export async function POST(request){
 const origin=request.headers.get('origin');const host=request.headers.get('host');
 if(origin){try{if(new URL(origin).host!==host)return Response.json({error:'This request could not be verified.'},{status:403});}catch{return Response.json({error:'This request could not be verified.'},{status:403});}}
 if(Number(request.headers.get('content-length')||0)>16000)return Response.json({error:'Please shorten your project description.'},{status:413});
 try{
  const raw=await request.text();if(raw.length>16000)return Response.json({error:'Please shorten your project description.'},{status:413});const data=JSON.parse(raw);
  if(data.website)return Response.json({ok:true});
  const limits={firstName:80,lastName:80,phone:30,email:160,service:100,location:150,description:4000};const clean={};for(const [key,max]of Object.entries(limits)){if(typeof data[key]!=='string'||!data[key].trim()||data[key].length>max)return Response.json({error:'Please complete all project fields.'},{status:400});clean[key]=data[key].trim();}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)||clean.phone.replace(/\D/g,'').length<10)return Response.json({error:'Please check your email and phone number.'},{status:400});
  const apiKey=process.env.RESEND_API_KEY,to=process.env.CONTACT_EMAIL,from=process.env.FROM_EMAIL;
  if(!apiKey||!to||!from)return Response.json({error:'Online requests are temporarily unavailable. Please call Diego at (951) 880-3103 or Isaiah at (951) 425-0490.'},{status:503});
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},signal:AbortSignal.timeout(10000),body:JSON.stringify({from,to,reply_to:clean.email,subject:`Estimate request: ${clean.firstName} ${clean.lastName}`.replace(/[\r\n]/g,' '),html:`<h2>Imperial Crown project inquiry</h2>${Object.entries(clean).map(([key,value])=>`<p><strong>${key}:</strong> ${escape(value).replace(/\n/g,'<br>')}</p>`).join('')}`})});
  if(!response.ok)return Response.json({error:'Your request could not be delivered. Please call Diego or Isaiah.'},{status:502});return Response.json({ok:true});
 }catch{return Response.json({error:'Your request could not be sent. Please try again or call us directly.'},{status:400});}
}
