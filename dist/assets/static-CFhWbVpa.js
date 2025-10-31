import{Jo as e,Xo as t,Yo as n}from"./index-BqmCqmfp.js";
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var r=Symbol.for(``),i=e=>{if(e?.r===r)return e?._$litStatic$},a=e=>({_$litStatic$:e,r}),o=(e,...t)=>({_$litStatic$:t.reduce(((t,n,r)=>t+(e=>{if(e._$litStatic$!==void 0)return e._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${e}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+e[r+1]),e[0]),r}),s=new Map,c=(e=>(t,...n)=>{let r=n.length,a,o,c=[],l=[],u,d=0,f=!1;for(;d<r;){for(u=t[d];d<r&&(o=n[d],a=i(o))!==void 0;)u+=a+t[++d],f=!0;d!==r&&l.push(o),c.push(u),d++}if(d===r&&c.push(t[r]),f){let e=c.join(`$$lit$$`);(t=s.get(e))===void 0&&(c.raw=c,s.set(e,t=c)),n=l}return e(t,...n)})(t);export{a as n,c as r,o as t};