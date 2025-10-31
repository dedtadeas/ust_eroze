import{n as e}from"./glsl-C2sn87h0.js";import{t}from"./Uniform-DXwqrKA1.js";import{t as n}from"./Texture2DBindUniform-CSngcuNV.js";import{t as r}from"./HighlightReadBitmap.glsl-DB3CoKpG.js";var i=class extends t{constructor(e,t,n){super(e,`mat3`,1,(r,i,a)=>r.setUniformMatrix3fv(e,t(i,a),n))}};function a(t){t.code.add(e`vec4 premultiplyAlpha(vec4 v) {
return vec4(v.rgb * v.a, v.a);
}
vec3 rgb2hsv(vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float rgb2v(vec3 c) {
return max(c.x, max(c.y, c.z));
}`)}var o=class extends t{constructor(e,t){super(e,`ivec2`,0,(n,r)=>n.setUniform2iv(e,t(r)))}},s=class extends t{constructor(e,t){super(e,`int`,0,(n,r)=>n.setUniform1i(e,t(r)))}},c=class extends t{constructor(e,t){super(e,`usampler2D`,0,(n,r)=>n.bindTexture(e,t(r)))}};function l(t,i){let{fragment:a}=t,{output:l,draped:u,hasHighlightMixTexture:d}=i;l===9?(a.uniforms.add(new s(`highlightLevel`,e=>e.highlightLevel??0),new o(`highlightMixOrigin`,e=>e.highlightMixOrigin)),t.outputs.add(`fragHighlight`,`uvec2`,0),t.include(r),d?a.uniforms.add(new c(`highlightMixTexture`,e=>e.highlightMixTexture)).code.add(e`uvec2 getAccumulatedHighlight() {
return texelFetch(highlightMixTexture, ivec2(gl_FragCoord.xy) - highlightMixOrigin, 0).rg;
}
void outputHighlight(bool occluded) {
if (highlightLevel == 0) {
uint bits = occluded ? 3u : 1u;
fragHighlight = uvec2(bits, 0);
} else {
int ll = (highlightLevel & 3) << 1;
int li = (highlightLevel >> 2) & 3;
uint bits;
if (occluded) {
bits = 3u << ll;
} else {
bits = 1u << ll;
}
uvec2 combinedHighlight = getAccumulatedHighlight();
combinedHighlight[li] |= bits;
fragHighlight = combinedHighlight;
}
}`):a.code.add(e`void outputHighlight(bool occluded) {
uint bits = occluded ? 3u : 1u;
fragHighlight = uvec2(bits, 0);
}`),u?a.code.add(e`bool isHighlightOccluded() {
return false;
}`):a.uniforms.add(new n(`depthTexture`,e=>e.mainDepth)).code.add(e`bool isHighlightOccluded() {
float sceneDepth = texelFetch(depthTexture, ivec2(gl_FragCoord.xy), 0).x;
return gl_FragCoord.z > sceneDepth + 5e-7;
}`),a.code.add(e`void calculateOcclusionAndOutputHighlight() {
outputHighlight(isHighlightOccluded());
}`)):a.code.add(e`void calculateOcclusionAndOutputHighlight() {}`)}var u=1/255.5;export{i as a,a as i,l as n,s as r,u as t};