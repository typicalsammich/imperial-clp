const sharp=require('sharp'),fs=require('node:fs/promises'),path=require('node:path');
const {spawn}=require('node:child_process'),{once}=require('node:events');
const root=path.resolve(__dirname,'..');
(async()=>{
 const {frameNames,frameState,cameraZoom,mobileDuration,smooth}=await import('../app/components/cinematic/timeline.mjs');
 const width=540,height=960,fps=24;
 const frames=await Promise.all(frameNames.map(async name=>sharp(path.join(root,'assets/masters',name+'.png')).removeAlpha().raw().toBuffer({resolveWithObject:true})));
 // Portrait camera targets keep the craftsman's hands and the window detail visible.
 // All shots and transition timing are shared with the desktop player.
 const focal=[.61,.61,.575,.69,.64,.64,.61];
 async function render(index,p){
  const {data,info}=frames[index];const zoom=cameraZoom(p);
  const cropHeight=Math.min(info.height,Math.round(info.height/zoom)),cropWidth=Math.round(cropHeight*width/height);
  const pan=index===0||index===6?.025*(smooth(p)-.5):0;
  const left=Math.max(0,Math.min(info.width-cropWidth,Math.round(info.width*(focal[index]+pan)-cropWidth/2)));
  return sharp(data,{raw:info}).extract({left,top:Math.round((info.height-cropHeight)/2),width:cropWidth,height:cropHeight}).resize(width,height).raw().toBuffer();
 }
 const out=path.join(root,'public/cinematic/mobile-story-v2.mp4');
 const encoder=spawn(require('ffmpeg-static'),['-y','-f','rawvideo','-pixel_format','rgb24','-video_size',`${width}x${height}`,'-framerate',String(fps),'-i','pipe:0','-c:v','libx264','-preset','slow','-crf','27','-pix_fmt','yuv420p','-movflags','+faststart','-an',out],{windowsHide:true});
 let log='';encoder.stderr.on('data',d=>{log=d.toString().slice(-2000);});encoder.on('error',e=>{console.error(e);process.exit(1);});
 const done=once(encoder,'close');
 const opening=await render(0,0);await sharp(opening,{raw:{width,height,channels:3}}).avif({quality:52,effort:7}).toFile(path.join(root,'public/cinematic/mobile-opening-v2.avif'));
 for(let n=0;n<mobileDuration*fps;n++){
  const p=n/(mobileDuration*fps-1),[a,b,mix]=frameState(p);let image=await render(a,p);
  if(a!==b&&mix>0){const second=await render(b,p);for(let i=0;i<image.length;i++)image[i]=Math.round(image[i]*(1-mix)+second[i]*mix);}
  if(!encoder.stdin.write(image))await once(encoder.stdin,'drain');
 }
 encoder.stdin.end();const [code]=await done;if(code!==0)throw Error(log);
 console.log(`Full seven-shot mobile cinematic encoded: ${mobileDuration}s, ${(await fs.stat(out)).size} bytes.`);
})().catch(e=>{console.error(e);process.exitCode=1});
