export async function loadFrame(url,signal){
 const response=await fetch(url,{signal,cache:'force-cache'});if(!response.ok)throw Error('Frame could not load');
 const blob=await response.blob();if(signal.aborted)throw Error('Aborted');
 if('createImageBitmap' in window)return createImageBitmap(blob);
 return new Promise((resolve,reject)=>{const img=new Image();const objectUrl=URL.createObjectURL(blob);img.onload=()=>{URL.revokeObjectURL(objectUrl);resolve(img);};img.onerror=()=>{URL.revokeObjectURL(objectUrl);reject(Error('Frame decode failed'));};img.src=objectUrl;});
}
