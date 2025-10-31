import{j_ as e,nd as t}from"./index-BqmCqmfp.js";import{h as n,o as r,s as i}from"./Emissions.glsl-DaTtsIIp.js";import{n as a,t as o}from"./glsl-C2sn87h0.js";import{t as s}from"./Float3PassUniform-Co8OqiAU.js";import{t as c}from"./FloatPassUniform-BEwJjV4q.js";import{t as l}from"./Texture2DDrawUniform-hiIQoiSn.js";import{t as u}from"./Texture2DPassUniform-Cd7cdF1a.js";import{t as d}from"./ShaderBuilder-C3C7fUwK.js";import{n as f}from"./MaterialUtil-DdudaLIK.js";import{t as p}from"./Float2PassUniform-D4VTGzqn.js";import{t as m}from"./Float4PassUniform-Bo_mhcMi.js";import{n as h,s as ee,t as g}from"./View.glsl-B6vOoRsw.js";import{a as _,i as te,t as v}from"./VisualVariables.glsl-xWfUXTFa.js";import{a as y,t as ne}from"./AlphaCutoff-DTq90Si4.js";import{t as re}from"./TerrainDepthTest.glsl-neHlKy5u.js";import{t as ie}from"./OutputColorHighlightOID.glsl-MUXZi3dC.js";import{r as ae}from"./VerticalOffset.glsl-DYy5IZ2H.js";import{t as oe}from"./Transform.glsl-YgD9m_jl.js";import{t as se}from"./VertexColor.glsl-CHR9Q-WR.js";import{a as b,d as x,i as S,l as C,n as w,o as T,r as E,s as D,t as O}from"./MixExternalColor.glsl-n6kVrPsi.js";import{a as k,i as A,n as j,o as M,r as N,t as P}from"./SnowCover.glsl-CxdL6slB.js";import{a as F,n as I,o as L,t as R}from"./ReadShadowMap.glsl-DONMmaDt.js";import{t as z}from"./Normals.glsl-BlytCSCC.js";function ce(n,i){let o=n.fragment,{hasVertexTangents:s,doubleSidedMode:c,hasNormalTexture:d,textureCoordinateType:f,bindType:m,hasNormalTextureTransform:h}=i;s?(n.attributes.add(`tangent`,`vec4`),n.varyings.add(`vTangent`,`vec4`),c===2?o.code.add(a`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):o.code.add(a`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):o.code.add(a`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),d&&f!==0&&(n.include(r,i),o.uniforms.add(m===1?new u(`normalTexture`,e=>e.textureNormal):new l(`normalTexture`,e=>e.textureNormal)),h&&(o.uniforms.add(new p(`scale`,e=>e.scale??t)),o.uniforms.add(new y(`normalTextureTransformMatrix`,t=>t.normalTextureTransformMatrix??e))),o.code.add(a`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),h&&o.code.add(a`mat3 normalRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),o.code.add(a`return tangentSpace * rawNormal;
}`))}function B(t,n){n.hasColorTextureTransform?(t.varyings.add(`colorUV`,`vec2`),t.vertex.uniforms.add(new y(`colorTextureTransformMatrix`,t=>t.colorTextureTransformMatrix??e)).code.add(a`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):t.vertex.code.add(a`void forwardColorUV(){}`)}function V(t,n){n.hasNormalTextureTransform&&n.textureCoordinateType!==0?(t.varyings.add(`normalUV`,`vec2`),t.vertex.uniforms.add(new y(`normalTextureTransformMatrix`,t=>t.normalTextureTransformMatrix??e)).code.add(a`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):t.vertex.code.add(a`void forwardNormalUV(){}`)}function H(t,n){n.hasEmissionTextureTransform&&n.textureCoordinateType!==0?(t.varyings.add(`emissiveUV`,`vec2`),t.vertex.uniforms.add(new y(`emissiveTextureTransformMatrix`,t=>t.emissiveTextureTransformMatrix??e)).code.add(a`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):t.vertex.code.add(a`void forwardEmissiveUV(){}`)}function U(t,n){n.hasOcclusionTextureTransform&&n.textureCoordinateType!==0?(t.varyings.add(`occlusionUV`,`vec2`),t.vertex.uniforms.add(new y(`occlusionTextureTransformMatrix`,t=>t.occlusionTextureTransformMatrix??e)).code.add(a`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):t.vertex.code.add(a`void forwardOcclusionUV(){}`)}function W(t,n){n.hasMetallicRoughnessTextureTransform&&n.textureCoordinateType!==0?(t.varyings.add(`metallicRoughnessUV`,`vec2`),t.vertex.uniforms.add(new y(`metallicRoughnessTextureTransformMatrix`,t=>t.metallicRoughnessTextureTransformMatrix??e)).code.add(a`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):t.vertex.code.add(a`void forwardMetallicRoughnessUV(){}`)}function G(e){let t=new d,{attributes:r,vertex:l,fragment:p,varyings:y}=t,{output:G,normalType:K,offsetBackfaces:q,spherical:le,snowCover:J,pbrMode:Y,textureAlphaPremultiplied:ue,instancedDoublePrecision:de,hasVertexColors:X,hasVertexTangents:Z,hasColorTexture:Q,hasNormalTexture:fe,hasNormalTextureTransform:pe,hasColorTextureTransform:me}=e;if(h(l,e),r.add(`position`,`vec3`),y.add(`vpos`,`vec3`,{invariant:!0}),t.include(v,e),t.include(b,e),t.include(ae,e),t.include(B,e),!n(G))return t.include(w,e),t;t.include(V,e),t.include(H,e),t.include(U,e),t.include(W,e),g(l,e),t.include(x,e),t.include(oe);let $=K===0||K===1;return $&&q&&t.include(D),t.include(ce,e),t.include(C,e),t.include(T,e),y.add(`vPositionLocal`,`vec3`),t.include(i,e),t.include(S,e),t.include(se,e),l.uniforms.add(new m(`externalColor`,e=>e.externalColor,{supportsNaN:!0})),y.add(`vcolorExt`,`vec4`),t.include(re,e),l.include(_),l.include(te),t.include(de?I:R,e),l.main.add(a`
    forwardNormalizedVertexColor();

    MaskedColor maskedColor =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColor.color;
    forwardColorMixMode(maskedColor.mask);

    vpos = getVertexInLocalOriginSpace();
    vPositionLocal = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    ${o($,`vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`)}
    vpos = addVerticalOffset(vpos, localOrigin);
    ${o(Z,`vTangent = dpTransformVertexTangent(tangent);`)}
    gl_Position = transformPosition(proj, view, vpos);
    ${o($&&q,`gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);`)}

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();

    if (opacityMixMode != ${a.int(f.ignore)} && vcolorExt.a < ${a.float(ne)}) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    }
    forwardLinearDepthToReadShadowMap();
  `),t.include(N,e),p.include(M,e),t.include(E,e),p.include(ee,e),t.include(ie,e),g(p,e),p.uniforms.add(l.uniforms.get(`localOrigin`),new s(`ambient`,e=>e.ambient),new s(`diffuse`,e=>e.diffuse),new c(`opacity`,e=>e.opacity),new c(`layerOpacity`,e=>e.layerOpacity)),Q&&p.uniforms.add(new u(`tex`,e=>e.texture)),t.include(j,e),p.include(F,e),p.include(O),t.include(z,e),p.include(P,e),A(p),k(p),L(p),p.main.add(a`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${Q?a`
            vec4 texColor = texture(tex, ${me?`colorUV`:`vuv0`});
            ${o(ue,`texColor.rgb /= texColor.a;`)}
            discardOrAdjustAlpha(texColor);`:a`vec4 texColor = vec4(1.0);`}
    shadingParams.viewDirection = normalize(vpos - cameraPosition);
    ${K===2?a`vec3 normal = screenDerivativeNormal(vPositionLocal);`:a`shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

    vec3 posWorld = vpos + localOrigin;

    float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
    float shadow = readShadow(additionalAmbientScale, vpos);

    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(${o(X,`vColor.rgb *`)} matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
    float opacity_ = layerOpacity * mixExternalOpacity(${o(X,`vColor.a * `)} opacity, texColor.a, vcolorExt.a, opacityMixMode);

    ${fe?`mat3 tangentSpace = computeTangentSpace(${Z?`normal`:`normal, vpos, vuv0`});\n            vec3 shadingNormal = computeTextureNormal(tangentSpace, ${pe?`normalUV`:`vuv0`});`:`vec3 shadingNormal = normal;`}
    vec3 normalGround = ${le?`normalize(posWorld);`:`vec3(0.0, 0.0, 1.0);`}

    ${o(J,a`
          float snow = getSnow(normal, normalGround);
          albedo = mix(albedo, vec3(1), snow);
          shadingNormal = mix(shadingNormal, normal, snow);
          ssao = mix(ssao, 1.0, snow);`)}

    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

    ${Y===1||Y===2?a`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${o(J,`mrr = applySnowToMRR(mrr, snow);`)}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, additionalAmbientIrradiance);`:a`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOID(finalColor, vpos, albedo ${o(J,`, snow`)});
  `),t}var K=Object.freeze(Object.defineProperty({__proto__:null,build:G},Symbol.toStringTag,{value:`Module`}));export{K as n,G as t};