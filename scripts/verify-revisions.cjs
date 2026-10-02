const fs=require('node:fs/promises'),assert=require('node:assert/strict'),sharp=require('sharp');
(async()=>{
 const {frameState,frameNames,mobileDuration}=await import('../app/components/cinematic/timeline.mjs');
 assert.deepEqual(frameNames,['opening','preparation','craftsman','application','wet-detail','finished-detail','final']);
 for(const p of [.01,.27,.42,.57,.65,.71,.83,.96]){const [a,b,mix]=frameState(p);assert(a>=0&&b<7&&mix>=0&&mix<=1);}
 assert.equal(frameState(1)[0],6);assert.equal(frameState(0)[0],0);
 const film=await fs.readFile('public/cinematic/mobile-story-v2.mp4'),index=film.indexOf('mvhd');assert(index>0);assert.equal(film.readUInt32BE(index+20)/film.readUInt32BE(index+16),mobileDuration);
 const icon=await sharp('public/brand/crown-favicon-v2.png').metadata();assert.equal(icon.width,64);assert.equal(icon.height,64);
 const ico=await fs.readFile('public/brand/crown-favicon-v2.ico');assert.equal(ico.readUInt16LE(4),4);
 const url=process.env.TEST_URL||'http://localhost:3006';const homepage=await (await fetch(url)).text();assert(homepage.includes('/brand/crown-favicon-v2.png'));
 for(const path of ['/brand/crown-favicon-v2.png','/brand/crown-favicon-v2.ico','/cinematic/mobile-story-v2.mp4'])assert.equal((await fetch(url+path,{method:'HEAD'})).status,200);
 console.log('Shared seven-shot timeline, 32-second mobile film, versioned crown icon and media endpoints verified.');
})().catch(e=>{console.error(e);process.exitCode=1});
