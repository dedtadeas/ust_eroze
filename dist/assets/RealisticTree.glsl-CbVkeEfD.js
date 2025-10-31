import{h as e,s as t}from"./Emissions.glsl-DaTtsIIp.js";import{n,t as r}from"./glsl-C2sn87h0.js";import{t as i}from"./Float3PassUniform-Co8OqiAU.js";import{t as a}from"./FloatPassUniform-BEwJjV4q.js";import{t as o}from"./Texture2DPassUniform-Cd7cdF1a.js";import{t as s}from"./ShaderBuilder-C3C7fUwK.js";import{n as c}from"./MaterialUtil-DdudaLIK.js";import{t as l}from"./Float4PassUniform-Bo_mhcMi.js";import{n as u,s as d,t as f}from"./View.glsl-B6vOoRsw.js";import{a as p,i as m,t as h}from"./VisualVariables.glsl-xWfUXTFa.js";import{t as g}from"./AlphaCutoff-DTq90Si4.js";import{t as _}from"./TerrainDepthTest.glsl-neHlKy5u.js";import{t as v}from"./OutputColorHighlightOID.glsl-MUXZi3dC.js";import{r as y}from"./VerticalOffset.glsl-DYy5IZ2H.js";import{t as b}from"./Transform.glsl-YgD9m_jl.js";import{t as x}from"./VertexColor.glsl-CHR9Q-WR.js";import{a as S,d as C,i as w,n as T,o as E,r as D,s as O,t as k}from"./MixExternalColor.glsl-n6kVrPsi.js";import{a as A,i as j,n as ee,o as M,r as N,t as P}from"./SnowCover.glsl-CxdL6slB.js";import{a as F,c as I,n as L,o as R,t as z}from"./ReadShadowMap.glsl-DONMmaDt.js";function B(B){let V=new s,{attributes:H,vertex:U,fragment:W,varyings:G}=V,{output:K,offsetBackfaces:q,pbrMode:J,snowCover:Y,spherical:X}=B,Z=J===1||J===2;if(u(U,B),H.add(`position`,`vec3`),G.add(`vpos`,`vec3`,{invariant:!0}),V.include(h,B),V.include(S,B),V.include(y,B),V.include(_,B),!e(K))return V.include(T,B),V;f(V.vertex,B),V.include(C,B),V.include(b),q&&V.include(O),G.add(`vNormalWorld`,`vec3`),G.add(`localvpos`,`vec3`,{invariant:!0}),V.include(t,B),V.include(w,B),V.include(E,B),V.include(x,B),U.include(p),U.include(m),U.uniforms.add(new l(`externalColor`,e=>e.externalColor,{supportsNaN:!0})),G.add(`vcolorExt`,`vec4`),V.include(B.instancedDoublePrecision?L:z,B),U.main.add(n`
    forwardNormalizedVertexColor();

    MaskedColor maskedColorExt =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColorExt.color;
    forwardColorMixMode(maskedColorExt.mask);

    bool alphaCut = opacityMixMode != ${n.int(c.ignore)} && vcolorExt.a < ${n.float(g)};
    vpos = getVertexInLocalOriginSpace();

    localvpos = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
    vpos = addVerticalOffset(vpos, localOrigin);
    vec4 basePosition = transformPosition(proj, view, vpos);

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardLinearDepthToReadShadowMap();
    gl_Position = alphaCut ? vec4(1e38, 1e38, 1e38, 1.0) :
    ${r(q,`offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);`,`basePosition;`)}
  `);let{hasColorTexture:Q,hasColorTextureTransform:$}=B;return V.include(N,B),W.include(M,B),V.include(D,B),W.include(d,B),V.include(v,B),f(W,B),I(W),j(W),A(W),W.uniforms.add(U.uniforms.get(`localOrigin`),U.uniforms.get(`view`),new i(`ambient`,e=>e.ambient),new i(`diffuse`,e=>e.diffuse),new a(`opacity`,e=>e.opacity),new a(`layerOpacity`,e=>e.layerOpacity)),Q&&W.uniforms.add(new o(`tex`,e=>e.texture)),V.include(ee,B),W.include(F,B),W.include(k),W.include(P,B),R(W),W.main.add(n`
      discardBySlice(vpos);
      discardByTerrainDepth();
      vec4 texColor = ${Q?`texture(tex, ${$?`colorUV`:`vuv0`})`:` vec4(1.0)`};
      ${r(Q,`${r(B.textureAlphaPremultiplied,`texColor.rgb /= texColor.a;`)}\n        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = readShadow(additionalAmbientScale, vpos);
      vec3 matColor = max(ambient, diffuse);
      ${B.hasVertexColors?n`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, opacityMixMode);`:n`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, opacityMixMode);`}

      vec3 shadingNormal = normalize(vNormalWorld);
      vec3 groundNormal = ${X?`normalize(vpos + localOrigin)`:`vec3(0.0, 0.0, 1.0)`};

      ${r(Y,`vec3 faceNormal = screenDerivativeNormal(vpos);
         float snow = getRealisticTreeSnow(faceNormal, shadingNormal, groundNormal);
         albedo = mix(albedo, vec3(1), snow);`)}

      ${n`albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}

      ${Z?n`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${r(Y,`mrr = applySnowToMRR(mrr, snow);`)}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, groundNormal, mrr, additionalAmbientIrradiance);`:n`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOID(finalColor, vpos, albedo ${r(Y,`, 1.0`)});`),V}var V=Object.freeze(Object.defineProperty({__proto__:null,build:B},Symbol.toStringTag,{value:`Module`}));export{V as n,B as t};