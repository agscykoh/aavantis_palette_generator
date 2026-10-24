import {test} from 'node:test';
import assert from 'node:assert/strict';
import {generate,toHsl,normalize} from '../electron/palette.mjs';
test('golden angle rotates hue and support reduces saturation by 60 percent',()=>{const p=generate({base:'#008cbb'});const [h,s,l]=toHsl(p.base),[a]=toHsl(p.accent),[,ss,sl]=toHsl(p.support);assert.ok(Math.abs(((a-h+360)%360)-137.5)<1);assert.ok(Math.abs(ss-s*.4)<.015);assert.ok(Math.abs(sl-l)<.005);});
test('neutral and boundary colours remain valid',()=>{for(const base of ['#000000','#ffffff','#808080','#ff0000'])for(const reduction of [0,60,100]){const p=generate({base,reduction});assert.match(p.accent,/^#[0-9a-f]{6}$/);assert.match(p.support,/^#[0-9a-f]{6}$/);if(reduction===0)assert.equal(p.support,base);}});
test('rejects malformed inputs and out of range settings',()=>{for(const base of ['red','#123','1234567',null])assert.throws(()=>generate({base}));assert.throws(()=>generate({base:'#abcdef',angle:Infinity}));assert.throws(()=>generate({base:'#abcdef',reduction:101}));assert.equal(normalize('ABCDEF'),'#abcdef');});
