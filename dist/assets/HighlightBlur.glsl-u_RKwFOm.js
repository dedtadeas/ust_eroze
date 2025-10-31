import{id as e}from"./index-BqmCqmfp.js";import{n as t}from"./glsl-C2sn87h0.js";import{t as n}from"./Texture2DDrawUniform-hiIQoiSn.js";import{t as r}from"./NoParameters-CpAItLvD.js";import{t as i}from"./ShaderBuilder-C3C7fUwK.js";import{t as a}from"./HighlightCellGridScreenSpacePass.glsl-BA5GfPLV.js";import{t as o}from"./Float2DrawUniform-BXYGUyM9.js";var s=class extends r{constructor(){super(...arguments),this.blurSize=e()}};function c(){let e=new i;return e.include(a),e.outputs.add(`fragHighlight`,`vec2`,0),e.fragment.uniforms.add(new o(`blurSize`,e=>e.blurSize),new n(`blurInput`,e=>e.blurInput)).main.add(t`vec2 highlightTextureSize = vec2(textureSize(blurInput,0));
vec2 center = texture(blurInput, sUV).rg;
if (vOutlinePossible == 0.0) {
fragHighlight = center;
} else {
vec2 sum = center * 0.204164;
sum += texture(blurInput, sUV + blurSize * 1.407333).rg * 0.304005;
sum += texture(blurInput, sUV - blurSize * 1.407333).rg * 0.304005;
sum += texture(blurInput, sUV + blurSize * 3.294215).rg * 0.093913;
sum += texture(blurInput, sUV - blurSize * 3.294215).rg * 0.093913;
fragHighlight = sum;
}`),e}var l=Object.freeze(Object.defineProperty({__proto__:null,HighlightBlurDrawParameters:s,build:c},Symbol.toStringTag,{value:`Module`}));export{c as n,s as r,l as t};