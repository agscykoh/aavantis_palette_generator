const normalize = value => {
  if (typeof value !== 'string' || !/^#?[0-9a-f]{6}$/i.test(value)) throw new Error('Enter a six-digit hex colour.');
  return '#' + value.replace('#','').toLowerCase();
};
function toHsl(hex) {
 const [r,g,b]=normalize(hex).slice(1).match(/../g).map(x=>parseInt(x,16)/255);
 const max=Math.max(r,g,b), min=Math.min(r,g,b), d=max-min, l=(max+min)/2;
 let h=0; if(d) { if(max===r) h=((g-b)/d)%6; else if(max===g) h=(b-r)/d+2; else h=(r-g)/d+4; h=(h*60+360)%360; }
 return [h,d===0?0:d/(1-Math.abs(2*l-1)),l];
}
function fromHsl(h,s,l) {
 h=((h%360)+360)%360; const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;
 const rgb=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];
 return '#'+rgb.map(v=>Math.round((v+m)*255).toString(16).padStart(2,'0')).join('');
}
function generate({base,angle=137.5,reduction=60}) {
 base=normalize(base); if(!Number.isFinite(angle)||angle<0||angle>360||!Number.isFinite(reduction)||reduction<0||reduction>100) throw new Error('Invalid palette settings.');
 const [h,s,l]=toHsl(base);
 return {base,accent:fromHsl(h+angle,s,l),support:fromHsl(h,s*(1-reduction/100),l)};
}
export {normalize,toHsl,fromHsl,generate};
