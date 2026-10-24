export type Palette = {base:string;accent:string;support:string};
export function normalize(value:string):string;
export function toHsl(hex:string):[number,number,number];
export function fromHsl(h:number,s:number,l:number):string;
export function generate(options:{base:string;angle?:number;reduction?:number}):Palette;
