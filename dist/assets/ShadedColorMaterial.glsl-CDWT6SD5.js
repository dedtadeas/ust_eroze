import{_t as e}from"./index-BqmCqmfp.js";import{n as t,t as n}from"./glsl-C2sn87h0.js";import{t as r}from"./Float3PassUniform-Co8OqiAU.js";import{t as i}from"./FloatPassUniform-BEwJjV4q.js";import{t as a}from"./ShaderBuilder-C3C7fUwK.js";import{t as o}from"./Float4PassUniform-Bo_mhcMi.js";import{t as s}from"./FloatBindUniform-TDSkRzMc.js";import{n as c,r as l,s as u,t as d}from"./View.glsl-B6vOoRsw.js";import{i as f}from"./AlphaCutoff-DTq90Si4.js";import{t as p}from"./TerrainDepthTest.glsl-neHlKy5u.js";import{t as m}from"./OutputColorHighlightOID.glsl-MUXZi3dC.js";import{t as h}from"./Transform.glsl-YgD9m_jl.js";function g(e,n){if(!n.screenSizeEnabled)return;let r=e.vertex;d(r,n),r.uniforms.add(new s(`perScreenPixelRatio`,e=>e.camera.perScreenPixelRatio),new i(`screenSizeScale`,e=>e.screenSizeScale)).code.add(t`float computeRenderPixelSizeAt( vec3 pWorld ){
vec3 viewForward = - vec3(view[0][2], view[1][2], view[2][2]);
float viewDirectionDistance = abs(dot(viewForward, pWorld - cameraPosition));
return viewDirectionDistance * perScreenPixelRatio;
}
vec3 screenSizeScaling(vec3 position, vec3 anchor){
return position * screenSizeScale * computeRenderPixelSizeAt(anchor) + anchor;
}`)}function _(e){let i=new a;i.include(h),i.include(g,e),i.fragment.include(u,e),i.include(m,e),i.include(p,e);let{vertex:s,fragment:d}=i;return d.include(f),c(s,e),d.uniforms.add(new o(`uColor`,e=>e.color)),i.attributes.add(`position`,`vec3`),i.varyings.add(`vWorldPosition`,`vec3`),e.screenSizeEnabled&&i.attributes.add(`offset`,`vec3`),e.shadingEnabled&&(l(s),i.attributes.add(`normal`,`vec3`),i.varyings.add(`vViewNormal`,`vec3`),d.uniforms.add(new r(`shadingDirection`,e=>e.shadingDirection)),d.uniforms.add(new o(`shadedColor`,e=>v(e.shadingTint,e.color)))),s.main.add(t`
    vWorldPosition = ${e.screenSizeEnabled?t`screenSizeScaling(offset, position)`:t`position`};
    ${n(e.shadingEnabled,t`vec3 worldNormal = normal;
           vViewNormal = (viewNormal * vec4(worldNormal, 1)).xyz;`)}
    forwardViewPosDepth((view * vec4(vWorldPosition, 1.0)).xyz);
    gl_Position = transformPosition(proj, view, vWorldPosition);
  `),d.main.add(t`
      discardBySlice(vWorldPosition);
      discardByTerrainDepth();
      ${e.shadingEnabled?t`vec3 viewNormalNorm = normalize(vViewNormal);
             float shadingFactor = 1.0 - clamp(-dot(viewNormalNorm, shadingDirection), 0.0, 1.0);
             vec4 finalColor = mix(uColor, shadedColor, shadingFactor);`:t`vec4 finalColor = uColor;`}
      outputColorHighlightOID(finalColor, vWorldPosition, finalColor.rgb);`),i}function v(e,t){let n=1-e[3],r=e[3]+t[3]*n;return r===0?(y[3]=r,y):(y[0]=(e[0]*e[3]+t[0]*t[3]*n)/r,y[1]=(e[1]*e[3]+t[1]*t[3]*n)/r,y[2]=(e[2]*e[3]+t[2]*t[3]*n)/r,y[3]=t[3],y)}var y=e(),b=Object.freeze(Object.defineProperty({__proto__:null,build:_},Symbol.toStringTag,{value:`Module`}));export{_ as n,b as t};