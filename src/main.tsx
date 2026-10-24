import React,{useState,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource/lilita-one';
import '@fontsource/ibm-plex-mono';
import './style.css';
import {generate} from '../electron/palette.mjs';

type Palette={base:string;accent:string;support:string};
type Key=keyof Palette;
declare global {interface Window {paletteApp?:{generate:(o:{base:string;angle:number;reduction:number})=>Promise<Palette>;copy:(hex:string)=>Promise<void>;window:(action:string)=>void}}}
const artwork=import.meta.glob('../assets/[!#]*.svg',{query:'?url',import:'default',eager:true}) as Record<string,string>;
const asset=(name:string)=>Object.entries(artwork).find(([key])=>key.endsWith('/'+name+'.svg'))?.[1];
function App(){
 const [palette,setPalette]=useState<Palette>({base:'#534d9e',accent:'#fdefa6',support:'#b3a4d3'});
 const [hex,setHex]=useState('#534d9e'),[screen,setScreen]=useState(false),[angle,setAngle]=useState(137.5),[reduction,setReduction]=useState(60);
 const [locks,setLocks]=useState<Record<Key,boolean>>({base:false,accent:false,support:false}),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);
 const [picker,setPicker]=useState<Key>('base'); const colorInput=useRef<HTMLInputElement>(null);
 const valid=(v:string)=>/^#?[\da-f]{6}$/i.test(v);
 const normalize=(v:string)=>'#'+v.replace('#','').toLowerCase();
 async function calculate(base=palette.base,a=angle,r=reduction){
  if(!valid(base)){setMessage('Please enter a six-digit hex colour.');return;}
  setBusy(true);
  try {const options={base:normalize(base),angle:a,reduction:r};const next=window.paletteApp?await window.paletteApp.generate(options):generate(options);setPalette(old=>({base:locks.base?old.base:next.base,accent:locks.accent?old.accent:next.accent,support:locks.support?old.support:next.support}));setHex(locks.base?palette.base:next.base);setScreen(true);setMessage('');} catch(e){setMessage(String(e));}finally{setBusy(false);}
 }
 function choose(key:Key){if(locks[key])return;setPicker(key);setTimeout(()=>colorInput.current?.click(),0);}
 function editColour(key:Key,value:string){if(locks[key])return;if(key==='base'){setHex(value);if(screen)void calculate(value);}else {setPalette(p=>({...p,[key]:value}));setMessage('');}}
 async function copy(key:Key){try{if(window.paletteApp)await window.paletteApp.copy(palette[key]);else await navigator.clipboard.writeText(palette[key]);setMessage(`${key[0].toUpperCase()+key.slice(1)} hex copied!`);}catch{setMessage('Could not copy the hex code.');}}
 function lock(key:Key){if(!locks[key]&&Object.values(locks).filter(Boolean).length===2){setMessage('You can lock up to two colours.');return;}setLocks(p=>({...p,[key]:!p[key]}));setMessage('');}
 return <main className="frame"><header><img className="title-art" src={asset('AAVANTI’S PALETTE GENERATOR')} alt="Aavanti’s Palette Generator"/>{window.paletteApp && <nav>{[['Expand Tab','maximize','Maximize or restore'],['Minimise Tab','minimize','Minimize'],['Close Tab','close','Close']].map(([art,action,label])=><button key={action} aria-label={label} onClick={()=>window.paletteApp?.window(action)}><img src={asset(art)} alt=""/></button>)}</nav>}</header>
 <section className={'panel '+(screen?'results':'landing')}>
 {!screen?<><h1 className="landing-heading">Select your colour!</h1><button className="landing-cat cat" style={{backgroundColor:hex==='#534d9e'?'#b3a4d3':valid(hex)?normalize(hex):'#b3a4d3'}} onClick={()=>choose('base')} aria-label="Pick base colour"/><div className="landing-input"><input aria-label="Base colour hex" value={hex} onChange={e=>setHex(e.target.value)} onKeyDown={e=>e.key==='Enter'&&void calculate(hex)} maxLength={7}/><button className="picker-hit" aria-label="Open colour picker" onClick={()=>choose('base')}>◉</button></div><p className="make-label">make my 3-colour palette!</p><button className="moon" disabled={busy} onClick={()=>void calculate(hex)} aria-label="Generate three-colour palette"><img src={asset('Enter Button')} alt=""/></button></>:<><h1 className="results-heading">Here&rsquo;s your palette!</h1><div className="colours">{(['base','accent','support'] as Key[]).map(key=><article key={key}><div className="colour-label">{key.toUpperCase()}<button className={'lock '+(locks[key]?'locked':'')} aria-label={`${locks[key]?'Unlock':'Lock'} ${key}`} aria-pressed={locks[key]} onClick={()=>lock(key)}><img src={asset(locks[key]?'Lock':'Unlock')} alt=""/></button></div><button className="cat" style={{backgroundColor:palette[key]}} aria-label={`Choose ${key} colour`} disabled={locks[key]} onClick={()=>choose(key)}/><button className="hex-output" title="Click to copy" onClick={()=>void copy(key)}>{palette[key]}</button><div className="adjustment">{key==='base'?<input aria-label="Change base hex" disabled={locks.base} value={hex} onChange={e=>setHex(e.target.value)} onBlur={()=>valid(hex)&&void calculate(hex)} onKeyDown={e=>e.key==='Enter'&&void calculate(hex)} maxLength={7}/>:key==='accent'?<label className="angle-input"><input type="number" aria-label="Golden angle in degrees" disabled={locks.accent} min="0" max="360" step="0.5" value={angle} onChange={e=>{const v=Number(e.target.value);setAngle(v);if(v>=0&&v<=360)void calculate(palette.base,v);}}/><span>°</span></label>:<input type="range" aria-label="Support saturation reduction" title={`${reduction}% saturation reduction`} disabled={locks.support} min="0" max="100" value={reduction} onChange={e=>{const v=Number(e.target.value);setReduction(v);void calculate(palette.base,angle,v);}}/>}</div></article>)}</div><p className="instruction">Change the base colour or adjust the golden angle/saturation.</p><div className="footer-tools"><button onClick={()=>{setScreen(false);setMessage('');}}>← Start again</button><span>Click a hex to copy · click a lock to toggle · click a cat to edit</span><button disabled={busy} onClick={()=>void calculate(hex)}>Regenerate ☾</button></div></>}
 <p className="message" role="status">{message}</p><input ref={colorInput} className="native-picker" type="color" aria-label="Colour picker" value={valid(palette[picker])?palette[picker]:'#534d9e'} onChange={e=>editColour(picker,e.target.value)}/>
 </section></main>;
}
createRoot(document.getElementById('root')!).render(<App/>);

