const sharp=require('sharp'),fs=require('node:fs/promises');
(async()=>{
 const crown=await sharp('public/icon.png').trim().png().toBuffer();
 const pngs=[];for(const size of [16,32,48,64])pngs.push(await sharp(crown).resize(size-2,size-2,{fit:'contain',background:'#102331'}).extend({top:1,bottom:1,left:1,right:1,background:'#102331'}).png().toBuffer());
 const header=Buffer.alloc(6+16*pngs.length);header.writeUInt16LE(1,2);header.writeUInt16LE(pngs.length,4);let offset=header.length;
 pngs.forEach((png,i)=>{const size=[16,32,48,64][i],start=6+i*16;header[start]=size;header[start+1]=size;header.writeUInt16LE(1,start+4);header.writeUInt16LE(32,start+6);header.writeUInt32LE(png.length,start+8);header.writeUInt32LE(offset,start+12);offset+=png.length;});
 const ico=Buffer.concat([header,...pngs]);await fs.writeFile('public/brand/crown-favicon-v2.ico',ico);await fs.writeFile('public/favicon.ico',ico);await fs.writeFile('public/brand/crown-favicon-v2.png',pngs[3]);
 await sharp(crown).resize(164,164,{fit:'contain',background:'#102331'}).extend({top:8,bottom:8,left:8,right:8,background:'#102331'}).png().toFile('public/brand/crown-touch-icon-v2.png');console.log('Versioned multi-size crown favicon prepared.');
})().catch(e=>{console.error(e);process.exitCode=1});
