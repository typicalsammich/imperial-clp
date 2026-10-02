export function detectCapabilities(){
 const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const constrained=Boolean(connection?.saveData||/2g/.test(connection?.effectiveType||'')||(navigator.deviceMemory&&navigator.deviceMemory<4));
 const desktop=innerWidth>=1000&&matchMedia('(pointer:fine) and (hover:hover)').matches;
 const mode=reduced?'static':desktop?'desktop':'mobile';
 const quality=innerWidth*devicePixelRatio>=1800&&!constrained?'high':!constrained&&innerWidth>=1200?'medium':'low';
 return {mode,quality,constrained};
}
