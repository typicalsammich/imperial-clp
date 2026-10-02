export const frameNames=['opening','preparation','craftsman','application','wet-detail','finished-detail','final'];
export const mobileDuration=30;
export const clamp=x=>Math.max(0,Math.min(1,x));
export const smooth=x=>x*x*(3-2*x);
export function frameState(p){
 if(p<.20)return [0,0,0];if(p<.34)return [0,1,smooth((p-.20)/.14)];
 if(p<.42)return [1,1,0];if(p<.50)return [1,2,smooth((p-.42)/.08)];
 if(p<.56)return [2,2,0];if(p<.61)return [2,3,smooth((p-.56)/.05)];
 if(p<.66)return [3,4,smooth((p-.61)/.05)];if(p<.70)return [4,4,0];
 if(p<.78)return [4,5,smooth((p-.70)/.08)];if(p<.86)return [5,5,0];
 if(p<.93)return [5,6,smooth((p-.86)/.07)];return [6,6,0];
}
export const cameraZoom=p=>p<.58?1+.24*smooth(p/.58):p<.86?1.24:1.24-.24*smooth((p-.86)/.14);
