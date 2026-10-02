const sharp=require('sharp'),fs=require('node:fs/promises'),path=require('node:path');const {spawnSync}=require('node:child_process');const ffmpeg=require('ffmpeg-static');
const root=path.resolve(__dirname,'..');
async function main(){
 const logo=path.join(root,'assets/masters/logo-restored.png');await sharp(logo).trim().resize({width:960,withoutEnlargement:true}).png({compressionLevel:9}).toFile(path.join(root,'public/brand/logo-hd.png'));
 const mobile=path.join(root,'assets/masters/mobile-work.png');
 const out=path.join(root,'public/cinematic');const args=['-y','-loop','1','-i',mobile,'-loop','1','-i',path.join(root,'assets/masters/mobile-final.png'),'-filter_complex',"[0:v]scale=540:960:force_original_aspect_ratio=increase,crop=540:960,zoompan=z='1.02+0.00015*on':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=240:s=540x960:fps=24,trim=duration=10,setpts=PTS-STARTPTS,format=yuv420p[a];[1:v]scale=540:960:force_original_aspect_ratio=increase,crop=540:960,zoompan=z='1.056-0.00013*on':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=240:s=540x960:fps=24,trim=duration=10,setpts=PTS-STARTPTS,format=yuv420p[b];[a][b]xfade=transition=fade:duration=1.5:offset=8.5[v]",'-map','[v]','-t','18.5','-c:v','libx264','-preset','slow','-crf','28','-pix_fmt','yuv420p','-movflags','+faststart','-an',path.join(out,'mobile.mp4')];
 const result=spawnSync(ffmpeg,args,{stdio:'pipe'});if(result.status!==0)throw Error(result.stderr.toString());console.log('Transparent logo and portrait cinematic encoded.');
}
main().catch(e=>{console.error(e);process.exitCode=1});



