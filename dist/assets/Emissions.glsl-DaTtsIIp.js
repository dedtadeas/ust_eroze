import{Uw as e,db as t,pT as n,vD as r}from"./index-BqmCqmfp.js";import{n as i,t as a}from"./glsl-C2sn87h0.js";import{t as o}from"./Uniform-DXwqrKA1.js";import{t as s}from"./Float3DrawUniform-UsZpj3mh.js";import{t as c}from"./Float3PassUniform-Co8OqiAU.js";import{t as l}from"./FloatPassUniform-BEwJjV4q.js";import{t as u}from"./Texture2DDrawUniform-hiIQoiSn.js";import{t as d}from"./Texture2DPassUniform-Cd7cdF1a.js";import{t as f}from"./NoParameters-CpAItLvD.js";function p(e){return e===4||e===5||e===6||e===7||e===8}function m(e){return x(e)||e===3}function h(e){return e===9||e===10}function g(e){return _(e)||h(e)}function _(e){return e===0}function v(e){return _(e)||C(e)}function y(e){return v(e)||e===10}function b(e){return v(e)||h(e)}function x(e){return b(e)||S(e)}function S(e){return e===2}function C(e){return e===1}function w(e){return S(e)||p(e)}function T(e,t){switch(t.textureCoordinateType){case 1:e.attributes.add(`uv0`,`vec2`),e.varyings.add(`vuv0`,`vec2`),e.vertex.code.add(i`void forwardTextureCoordinates() { vuv0 = uv0; }`);return;case 2:e.attributes.add(`uv0`,`vec2`),e.attributes.add(`uvRegion`,`vec4`),e.varyings.add(`vuv0`,`vec2`),e.varyings.add(`vuvRegion`,`vec4`),e.vertex.code.add(i`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);return;default:r(t.textureCoordinateType);case 0:e.vertex.code.add(i`void forwardTextureCoordinates() {}`);return;case 3:return}}function E(e){e.fragment.code.add(i`vec4 textureAtlasLookup(sampler2D tex, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
return textureGrad(tex, uvAtlas, dUVdx, dUVdy);
}`)}function D(e,t){let{textureCoordinateType:n}=t;if(n===0||n===3)return;e.include(T,t);let r=n===2;r&&e.include(E),e.fragment.code.add(i`
    vec4 textureLookup(sampler2D tex, vec2 uv) {
      return ${r?`textureAtlasLookup(tex, uv, vuvRegion)`:`texture(tex, uv)`};
    }
  `)}function O(e){e.code.add(i`
    const float GAMMA = ${i.float(t)};
    const float INV_GAMMA = ${i.float(1/t)};

    vec4 delinearizeGamma(vec4 color) {
      return vec4(pow(color.rgb, vec3(INV_GAMMA)), color.a);
    }

    vec3 linearizeGamma(vec3 color) {
      return pow(color, vec3(GAMMA));
    }
  `)}var k=class extends o{constructor(e,t,n){super(e,`float`,2,(r,i,a)=>r.setUniform1f(e,t(i,a),n))}},A=class{constructor(e){this._material=e.material,this._techniques=e.techniques,this._output=e.output}dispose(){}get _stippleTextures(){return this._techniques.context?.stippleTextures}get _markerTextures(){return this._techniques.context?.markerTextures}getTechnique(e,t){return this._techniques.get(e,this._material.getConfiguration(this._output,t))}ensureResources(e){return 2}},j=class extends A{constructor(e){super(e),this._numLoading=0,this._disposed=!1,this._textures=e.textures,this.updateTexture(e.textureId),this._acquire(e.normalTextureId,e=>this._textureNormal=e),this._acquire(e.emissiveTextureId,e=>this._textureEmissive=e),this._acquire(e.occlusionTextureId,e=>this._textureOcclusion=e),this._acquire(e.metallicRoughnessTextureId,e=>this._textureMetallicRoughness=e)}dispose(){super.dispose(),this._texture=n(this._texture),this._textureNormal=n(this._textureNormal),this._textureEmissive=n(this._textureEmissive),this._textureOcclusion=n(this._textureOcclusion),this._textureMetallicRoughness=n(this._textureMetallicRoughness),this._disposed=!0}ensureResources(e){return this._numLoading===0?2:1}get textureBindParameters(){return new N(this._texture?.glTexture??null,this._textureNormal?.glTexture??null,this._textureEmissive?.glTexture??null,this._textureOcclusion?.glTexture??null,this._textureMetallicRoughness?.glTexture??null)}updateTexture(e){this._texture!=null&&e===this._texture.id||(this._texture=n(this._texture),this._acquire(e,e=>this._texture=e))}_acquire(t,r){if(t==null)return void r(null);let i=this._textures.acquire(t);if(e(i))return++this._numLoading,void i.then(e=>{if(this._disposed)return n(e),void r(null);r(e)}).finally(()=>--this._numLoading);r(i)}},M=class extends f{constructor(e=null){super(),this.textureEmissive=e}},N=class extends M{constructor(e,t,n,r,i,a,o){super(n),this.texture=e,this.textureNormal=t,this.textureOcclusion=r,this.textureMetallicRoughness=i,this.scale=a,this.normalTextureTransformMatrix=o}};function P(e,t){if(!v(t.output))return;e.fragment.include(O);let{emissionSource:n,hasEmissiveTextureTransform:r,bindType:o}=t,f=n===3||n===4||n===5;f&&(e.include(D,t),e.fragment.uniforms.add(o===1?new d(`texEmission`,e=>e.textureEmissive):new u(`texEmission`,e=>e.textureEmissive)));let p=n===2||f;p&&e.fragment.uniforms.add(o===1?new c(`emissiveBaseColor`,e=>e.emissiveBaseColor):new s(`emissiveBaseColor`,e=>e.emissiveBaseColor));let m=n!==0;m&&!(n===7||n===6||n===4||n===5)&&e.fragment.uniforms.add(o===1?new l(`emissiveStrength`,e=>e.emissiveStrength):new k(`emissiveStrength`,e=>e.emissiveStrength));let h=n===7,g=n===5,_=n===1||n===6||h;e.fragment.code.add(i`
    vec4 getEmissions(vec3 symbolColor) {
      vec4 emissions = ${p?g?`emissiveSource == 0 ? vec4(emissiveBaseColor, 1.0): vec4(linearizeGamma(symbolColor), 1.0)`:`vec4(emissiveBaseColor, 1.0)`:_?h?`emissiveSource == 0 ? vec4(0.0): vec4(linearizeGamma(symbolColor), 1.0)`:`vec4(linearizeGamma(symbolColor), 1.0)`:`vec4(0.0)`};
      ${a(f,`${a(g,`if(emissiveSource == 0) {\n              vec4 emissiveFromTex = textureLookup(texEmission, ${r?`emissiveUV`:`vuv0`});\n              emissions *= vec4(linearizeGamma(emissiveFromTex.rgb), emissiveFromTex.a);\n           }`,`vec4 emissiveFromTex = textureLookup(texEmission, ${r?`emissiveUV`:`vuv0`});\n           emissions *= vec4(linearizeGamma(emissiveFromTex.rgb), emissiveFromTex.a);`)}\n        emissions.w = emissions.rgb == vec3(0.0) ? 0.0: emissions.w;`)}
      ${a(m,`emissions.rgb *= emissiveStrength * ${i.float(1)};`)}
      return emissions;
    }
  `)}export{h as _,O as a,x as c,_ as d,y as f,m as g,v as h,A as i,S as l,p as m,N as n,D as o,w as p,j as r,T as s,P as t,C as u,g as v,b as y};