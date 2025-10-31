import{od as e}from"./index-BqmCqmfp.js";import{h as t}from"./Emissions.glsl-DaTtsIIp.js";import{n,t as r}from"./glsl-C2sn87h0.js";import{t as i}from"./Float3PassUniform-Co8OqiAU.js";import{t as a}from"./FloatPassUniform-BEwJjV4q.js";import{t as o}from"./ShaderBuilder-C3C7fUwK.js";import{t as s}from"./Float2PassUniform-D4VTGzqn.js";import{t as c}from"./Float4PassUniform-Bo_mhcMi.js";import{i as l,n as u,r as d,t as f}from"./FloatsPassUniform-BT-ZsPj-.js";import{n as p,r as m,s as h,t as g}from"./View.glsl-B6vOoRsw.js";import{t as _}from"./ObjectAndLayerIdColor.glsl-CrEuv_nr.js";import{i as v,n as y}from"./AlphaCutoff-DTq90Si4.js";import{t as b}from"./TerrainDepthTest.glsl-neHlKy5u.js";import{t as x}from"./OutputColorHighlightOID.glsl-MUXZi3dC.js";import{n as S,t as C}from"./Transform.glsl-YgD9m_jl.js";import{a as w,i as T,n as E,o as D,r as O,s as k,t as A}from"./SnowCover.glsl-CxdL6slB.js";import{o as j,t as M}from"./ReadShadowMap.glsl-DONMmaDt.js";import{t as N}from"./Normals.glsl-BlytCSCC.js";import{t as P}from"./NormalUtils.glsl-Bm0b8ykI.js";var F=8;function I(e,t){let{attributes:o,vertex:l}=e;o.add(`position`,`vec3`),o.add(`profileVertexAndNormal`,`vec4`),o.add(`profileAuxData`,`vec3`),o.add(`profileRight`,`vec2`),o.add(`profileUp`,`vec2`),l.code.add(n`bool isCapVertex() {
return profileAuxData.z == 1.0;
}`),l.uniforms.add(new s(`size`,e=>e.size));let{hasVVSize:d,hasVVColor:p,hasVVOpacity:m}=t;d?(o.add(`sizeFeatureAttribute`,`float`),l.uniforms.add(new i(`vvSizeMinSize`,e=>e.vvSize.minSize),new i(`vvSizeMaxSize`,e=>e.vvSize.maxSize),new i(`vvSizeOffset`,e=>e.vvSize.offset),new i(`vvSizeFactor`,e=>e.vvSize.factor),new i(`vvSizeFallback`,e=>e.vvSize.fallback)),l.code.add(n`vec2 getSize() {
float value = sizeFeatureAttribute;
if (isnan(value)) {
return vvSizeFallback.xz;
}
return size * clamp(vvSizeOffset + value * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).xz;
}`)):l.code.add(n`vec2 getSize(){
return size;
}`),m?(o.add(`opacityFeatureAttribute`,`float`),l.constants.add(`vvOpacityNumber`,`int`,F),l.uniforms.add(new f(`vvOpacityValues`,e=>e.vvOpacity.values,F),new f(`vvOpacityOpacities`,e=>e.vvOpacity.opacityValues,F),new a(`vvOpacityFallback`,e=>e.vvOpacity.fallback,{supportsNaN:!0})),l.code.add(n`
    vec4 applyOpacity(vec4 color) {
      // if we encounter NaN in the color it means the color is in the fallback case where the symbol color
      // is not defined and there is no valid color visual variable override. In this case just return a fully
      // transparent color
      if (isnan(color.r)) {
        return vec4(0);
      }

      float value = opacityFeatureAttribute;

      if (isnan(value)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${r(p,`color`,`vec4(color.rgb, vvOpacityFallback)`)};
      }

      if (value <= vvOpacityValues[0]) {
        return vec4(color.rgb, vvOpacityOpacities[0]);
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return vec4(color.rgb, mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f));
        }
      }

      return vec4( color.rgb, vvOpacityOpacities[vvOpacityNumber - 1]);
    }
    `)):l.code.add(n`vec4 applyOpacity(vec4 color){
return color;
}`),p?(o.add(`colorFeatureAttribute`,`float`),l.constants.add(`vvColorNumber`,`int`,8),l.uniforms.add(new f(`vvColorValues`,e=>e.vvColor.values,8),new u(`vvColorColors`,e=>e.vvColor.colors,8),new c(`vvColorFallback`,e=>e.vvColor.fallback)),l.code.add(n`vec4 getColor() {
float value = colorFeatureAttribute;
if (isnan(value)) {
return applyOpacity(vvColorFallback);
}
if (value <= vvColorValues[0]) {
return applyOpacity(vvColorColors[0]);
}
for (int i = 1; i < vvColorNumber; ++i) {
if (vvColorValues[i] >= value) {
float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
return applyOpacity(mix(vvColorColors[i-1], vvColorColors[i], f));
}
}
return applyOpacity(vvColorColors[vvColorNumber - 1]);
}`)):l.code.add(n`vec4 getColor(){
return applyOpacity(vec4(1, 1, 1, 1));
}`),l.code.add(n`vec3 decompressAxis(vec2 axis) {
float z = 1.0 - abs(axis.x) - abs(axis.y);
return normalize(vec3(axis + sign(axis) * min(z, 0.0), z));
}
vec3 calculateVPos() {
vec2 size = getSize();
vec3 origin = position;
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec2 profileVertex = profileVertexAndNormal.xy * size;`),l.code.add(n`if(isCapVertex()) {
float positionOffsetAlongProfilePlaneNormal = profileAuxData.x * size[0];
vec3 forward = cross(up, right);
vec3 offset = right * profileVertex.x + up * profileVertex.y + forward * positionOffsetAlongProfilePlaneNormal;
return origin + offset;
}
vec2 rotationRight = vec2(profileAuxData.x, profileAuxData.y);
float maxDistance = length(rotationRight);`),l.code.add(n`rotationRight = maxDistance > 0.0 ? normalize(rotationRight) : vec2(0, 0);
float rx = dot(profileVertex, rotationRight);
if (abs(rx) > maxDistance) {
vec2 rotationUp = vec2(-rotationRight.y, rotationRight.x);
float ry = dot(profileVertex, rotationUp);
profileVertex = rotationRight * maxDistance * sign(rx) + rotationUp * ry;
}
vec3 offset = right * profileVertex.x + up * profileVertex.y;
return origin + offset;
}`),l.code.add(n`vec3 localNormal() {
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec3 normal = right * profileVertexAndNormal.z + up * profileVertexAndNormal.w;
if(isCapVertex()) {
vec3 forward = cross(up, right);
normal += forward * profileAuxData.y;
}
return normal;
}`)}var L=class extends l{constructor(){super(...arguments),this.size=e(1,1)}};function R(e){let s=new o,{vertex:c,fragment:l,varyings:u}=s;p(c,e),u.add(`vpos`,`vec3`,{invariant:!0}),s.include(I,e);let{output:d,spherical:f,pbrMode:F,snowCover:L}=e;switch((t(d)||d===10)&&(s.include(C),s.include(M,e),s.include(_,e),s.include(b,e),u.add(`vnormal`,`vec3`),u.add(`vcolor`,`vec4`),c.main.add(n`vpos = calculateVPos();
vnormal = normalize(localNormal());
forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);
forwardObjectAndLayerIdColor();
vcolor = getColor();
forwardLinearDepthToReadShadowMap();`)),d){case 1:case 0:s.include(E,e),s.include(O,e),l.include(D,e),s.include(N,e),l.include(h,e),s.include(x,e),g(l,e),T(l),w(l),l.uniforms.add(c.uniforms.get(`localOrigin`),new i(`ambient`,e=>e.ambient),new i(`diffuse`,e=>e.diffuse),new a(`opacity`,e=>e.opacity)),l.include(v),l.include(A,e),j(l),l.main.add(n`
        discardBySlice(vpos);
        discardByTerrainDepth();

        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        shadingParams.normalView = vnormal;
        vec3 normal = shadingNormal(shadingParams);
        float ssao = evaluateAmbientOcclusionInverse();

        vec3 posWorld = vpos + localOrigin;
        vec3 normalGround = ${f?`normalize(posWorld);`:`vec3(0.0, 0.0, 1.0);`}

        vec3 albedo = vcolor.rgb * max(ambient, diffuse); // combine the old material parameters into a single one
        float combinedOpacity = vcolor.a * opacity;

        ${r(L,n`float snow = getSnow(normal, normalGround);
                 albedo = mix(albedo, vec3(1), snow);
                 ssao = mix(ssao, 1.0, snow);`)}

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        float shadow = readShadow(additionalAmbientScale, vpos);

        ${r(F===2,`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];\n           ${r(L,`mrr = applySnowToMRR(mrr, snow);`)}`)}

        vec3 shadedColor = ${F===2?`evaluateSceneLightingPBR(normal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, additionalAmbientIrradiance);`:`evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        vec4 finalColor = vec4(shadedColor, combinedOpacity);
        outputColorHighlightOID(finalColor, vpos, albedo ${r(L,`, snow`)});`);break;case 2:s.include(C),c.main.add(n`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),s.fragment.include(h,e),l.main.add(n`discardBySlice(vpos);`);break;case 4:case 5:case 6:case 7:s.include(C),S(s),u.add(`depth`,`float`),c.main.add(n`vpos = calculateVPos();
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);`),s.fragment.include(h,e),s.include(k,e),l.main.add(n`discardBySlice(vpos);
outputDepth(depth);`);break;case 10:s.fragment.include(h,e),l.main.add(n`discardBySlice(vpos);
outputObjectAndLayerIdColor();`);break;case 3:s.include(C),s.include(P,e),m(c),u.add(`vnormal`,`vec3`),c.main.add(n`vpos = calculateVPos();
vnormal = normalize((viewNormal * vec4(localNormal(), 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);`),s.fragment.include(h,e),l.main.add(n`discardBySlice(vpos);
vec3 normal = normalize(vnormal);
if (gl_FrontFacing == false) normal = -normal;
fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);`);break;case 9:s.include(C),s.include(P,e),u.add(`vnormal`,`vec3`),c.main.add(n`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),s.fragment.include(h,e),s.include(y,e),l.main.add(n`discardBySlice(vpos);
calculateOcclusionAndOutputHighlight();`)}return s}var z=Object.freeze(Object.defineProperty({__proto__:null,build:R},Symbol.toStringTag,{value:`Module`}));export{z as n,L as r,R as t};