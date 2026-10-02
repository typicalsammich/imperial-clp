const fs=require('node:fs/promises'),sharp=require('sharp');
(async()=>{
 for(const url of ['https://socalplastering.com','https://socalplastering.com/cinematic/final-960.webp','https://socalplastering.com/cinematic/preparation-1672.webp','https://socalplastering.com/favicon.ico','https://www.socalplastering.com/favicon.ico']){
  const r=await fetch(url,{cache:'no-store'}),b=Buffer.from(await r.arrayBuffer());
  console.log({url:r.url,status:r.status,type:r.headers.get('content-type'),cache:r.headers.get('cache-control'),age:r.headers.get('age'),bytes:b.length,magic:b.subarray(0,8).toString('hex')});
  if(url==='https://socalplastering.com')console.log(b.toString().match(/<link[^>]*rel="[^"]*icon[^"]*"[^>]*>/g));
  if(url.endsWith('webp'))console.log(await sharp(b).metadata());
 }
})().catch(e=>{console.error(e);process.exitCode=1});
