const fs=require('node:fs/promises'),assert=require('node:assert/strict'),sharp=require('sharp');
(async()=>{
 const source=await fs.readFile('app/components/cinematic/MediaPreloader.js','utf8');
 const {loadFrame}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
 await assert.rejects(loadFrame('http://localhost:3006/cinematic/missing-test-frame.webp',new AbortController().signal),/Frame could not load/);
 const controller=new AbortController();controller.abort();
 await assert.rejects(loadFrame('http://localhost:3006/cinematic/opening-960.webp',controller.signal));
 global.window={createImageBitmap:true};global.createImageBitmap=async()=>{throw Error('Synthetic decode failure');};
 await assert.rejects(loadFrame('http://localhost:3006/cinematic/opening-960.webp',new AbortController().signal),/decode failure/);
 for(const name of ['opening','preparation','craftsman','application','wet-detail','finished-detail','final'])for(const width of [960,1280,1672]){const m=await sharp(`public/cinematic/${name}-${width}.webp`).metadata();assert.equal(m.width,width);}
 assert.equal((await sharp('public/brand/logo-hd.png').metadata()).hasAlpha,true);
 console.log('21 responsive frames, transparent logo, HTTP failure, abort and decode failure passed.');
})().catch(e=>{console.error(e);process.exitCode=1});
