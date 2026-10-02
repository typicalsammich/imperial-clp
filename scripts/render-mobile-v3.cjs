const sharp=require('sharp'),fs=require('node:fs/promises'),path=require('node:path');
const {createCanvas,loadImage}=require('@napi-rs/canvas'),{spawn}=require('node:child_process'),{once}=require('node:events');
const root=path.resolve(__dirname,'..');
(async()=>{
 const {frameNames,frameState,cameraZoom,mobileDuration}=await import('../app/components/cinematic/timeline.mjs');
 const width=540,height=960,fps=60,canvas=createCanvas(width,height),ctx=canvas.getContext('2d');
 const frames=await Promise.all(frameNames.map(name=>loadImage(path.join(root,'assets/masters',name+'.png'))));
 const focal=[.61,.61,.575,.69,.64,.64,.61];
 function render(p){const [a,b,mix]=frameState(p),focus=focal[a]*(1-mix)+focal[b]*mix,zoom=cameraZoom(p);ctx.globalAlpha=1;ctx.fillStyle='#101a23';ctx.fillRect(0,0,width,height);for(const [index,alpha] of [[a,1],[b,mix]]){if(alpha===0)continue;const img=frames[index],scale=Math.max(width/img.width,height/img.height)*zoom;ctx.globalAlpha=alpha;ctx.drawImage(img,width/2-img.width*scale*focus,(height-img.height*scale)/2,img.width*scale,img.height*scale);}ctx.globalAlpha=1;return Buffer.from(ctx.getImageData(0,0,width,height).data.buffer);}
 const out=path.join(root,'public/cinematic/v3/mobile-story-v3.mp4');
 const encoder=spawn(require('ffmpeg-static'),['-y','-f','rawvideo','-pixel_format','rgba','-video_size',`${width}x${height}`,'-framerate',String(fps),'-i','pipe:0','-c:v','libx264','-preset','slow','-crf','27','-pix_fmt','yuv420p','-movflags','+faststart','-an',out],{windowsHide:true});
 let log='';encoder.stderr.on('data',d=>log=d.toString().slice(-2000));const done=once(encoder,'close');
 await sharp(render(0),{raw:{width,height,channels:4}}).avif({quality:52,effort:7}).toFile(path.join(root,'public/cinematic/v3/mobile-opening-v3.avif'));
 for(let n=0;n<mobileDuration*fps;n++){if(!encoder.stdin.write(render(n/(mobileDuration*fps-1))))await once(encoder.stdin,'drain');}
 encoder.stdin.end();const [code]=await done;if(code!==0)throw Error(log);
 const low=spawn(require('ffmpeg-static'),['-y','-i',out,'-vf','fps=30','-c:v','libx264','-preset','slow','-crf','29','-pix_fmt','yuv420p','-movflags','+faststart','-an',path.join(root,'public/cinematic/v3/mobile-story-low-v3.mp4')],{windowsHide:true,stdio:'ignore'});if((await once(low,'close'))[0]!==0)throw Error('Low-bandwidth encode failed');
 console.log(`Subpixel portrait film: ${mobileDuration}s / ${fps}fps / ${(await fs.stat(out)).size} bytes.`);
})().catch(e=>{console.error(e);process.exitCode=1});
