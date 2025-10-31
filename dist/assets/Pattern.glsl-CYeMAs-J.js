import{n as e,t}from"./glsl-C2sn87h0.js";import{t as n}from"./ShaderBuilder-C3C7fUwK.js";import{t as r}from"./Float4PassUniform-Bo_mhcMi.js";import{t as i}from"./FloatBindUniform-TDSkRzMc.js";import{n as a,s as o,t as s}from"./View.glsl-B6vOoRsw.js";import{t as c}from"./ObjectAndLayerIdColor.glsl-CrEuv_nr.js";import{t as l}from"./VisualVariables.glsl-xWfUXTFa.js";import{i as u}from"./AlphaCutoff-DTq90Si4.js";import{t as d}from"./TerrainDepthTest.glsl-neHlKy5u.js";import{t as f}from"./OutputColorHighlightOID.glsl-MUXZi3dC.js";import{t as p}from"./Transform.glsl-YgD9m_jl.js";import{t as m}from"./VertexColor.glsl-CHR9Q-WR.js";var h=.70710678118,g=h,_=.08715574274,v=10,y=1;function b(b){let S=new n,{vertex:C,fragment:w,attributes:T,varyings:E}=S,D=b.output===9;a(C,b),S.include(p),S.include(m,b),S.include(l,b),S.include(c,b),S.fragment.include(o,b),S.include(f,b),S.include(d,b),b.draped?C.uniforms.add(new i(`worldToScreenRatio`,e=>1/e.screenToPCSRatio)):T.add(`boundingRect`,`mat3`),T.add(`position`,`vec3`),T.add(`uvMapSpace`,`vec4`),b.hasVVColor&&T.add(`colorFeatureAttribute`,`float`),b.hasVertexColors||E.add(`vColor`,`vec4`),E.add(`vpos`,`vec3`,{invariant:!0}),E.add(`vuv`,`vec2`),C.uniforms.add(new r(`uColor`,e=>e.color));let O=b.style===3||b.style===4||b.style===5;return O&&C.code.add(e`
      const mat2 rotate45 = mat2(${e.float(h)}, ${e.float(-g)},
                                 ${e.float(g)}, ${e.float(h)});
    `),b.draped||(s(C,b),C.uniforms.add(new i(`worldToScreenPerDistanceRatio`,e=>1/e.camera.perScreenPixelRatio)),C.code.add(e`vec3 projectPointToLineSegment(vec3 center, vec3 halfVector, vec3 point) {
float projectedLength = dot(halfVector, point - center) / dot(halfVector, halfVector);
return center + halfVector * clamp(projectedLength, -1.0, 1.0);
}`),C.code.add(e`vec3 intersectRayPlane(vec3 rayDir, vec3 rayOrigin, vec3 planeNormal, vec3 planePoint) {
float d = dot(planeNormal, planePoint);
float t = (d - dot(planeNormal, rayOrigin)) / dot(planeNormal, rayDir);
return rayOrigin + t * rayDir;
}`),C.code.add(e`
      float boundingRectDistanceToCamera() {
        vec3 center = vec3(boundingRect[0][0], boundingRect[0][1], boundingRect[0][2]);
        vec3 halfU = vec3(boundingRect[1][0], boundingRect[1][1], boundingRect[1][2]);
        vec3 halfV = vec3(boundingRect[2][0], boundingRect[2][1], boundingRect[2][2]);
        vec3 n = normalize(cross(halfU, halfV));

        vec3 viewDir = - vec3(view[0][2], view[1][2], view[2][2]);

        float viewAngle = dot(viewDir, n);
        float minViewAngle = ${e.float(_)};

        if (abs(viewAngle) < minViewAngle) {
          // view direction is (almost) parallel to plane -> clamp it to min angle
          float normalComponent = sign(viewAngle) * minViewAngle - viewAngle;
          viewDir = normalize(viewDir + normalComponent * n);
        }

        // intersect view direction with infinite plane that contains bounding rect
        vec3 planeProjected = intersectRayPlane(viewDir, cameraPosition, n, center);

        // clip to bounds by projecting to u and v line segments individually
        vec3 uProjected = projectPointToLineSegment(center, halfU, planeProjected);
        vec3 vProjected = projectPointToLineSegment(center, halfV, planeProjected);

        // use to calculate the closest point to camera on bounding rect
        vec3 closestPoint = uProjected + vProjected - center;

        return length(closestPoint - cameraPosition);
      }
    `)),C.code.add(e`
    vec2 scaledUV() {
      vec2 uv = uvMapSpace.xy ${t(O,` * rotate45`)};
      vec2 uvCellOrigin = uvMapSpace.zw ${t(O,` * rotate45`)};

      ${t(!b.draped,e`float distanceToCamera = boundingRectDistanceToCamera();
               float worldToScreenRatio = worldToScreenPerDistanceRatio / distanceToCamera;`)}

      // Logarithmically discretize ratio to avoid jittering
      float step = 0.1;
      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);

      vec2 uvOffset = mod(uvCellOrigin * discreteWorldToScreenRatio, ${e.float(v)});
      return uvOffset + (uv * discreteWorldToScreenRatio);
    }
  `),C.main.add(e`
    vuv = scaledUV();
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardNormalizedVertexColor();
    forwardObjectAndLayerIdColor();
    ${b.hasVertexColors?`vColor *= uColor;`:b.hasVVColor?`vColor = uColor * interpolateVVColor(colorFeatureAttribute);`:`vColor = uColor;`}
    gl_Position = transformPosition(proj, view, vpos);
  `),w.include(u),b.draped&&w.uniforms.add(new i(`texelSize`,e=>1/e.camera.pixelRatio)),D||(w.code.add(e`
      const float lineWidth = ${e.float(y)};
      const float spacing = ${e.float(v)};
      const float spacingINV = ${e.float(1/v)};

      float coverage(float p, float txlSize) {
        p = mod(p, spacing);

        float halfTxlSize = txlSize / 2.0;

        float start = p - halfTxlSize;
        float end = p + halfTxlSize;

        float coverage = (ceil(end * spacingINV) - floor(start * spacingINV)) * lineWidth;
        coverage -= min(lineWidth, mod(start, spacing));
        coverage -= max(lineWidth - mod(end, spacing), 0.0);

        return coverage / txlSize;
      }
    `),b.draped||w.code.add(e`const int maxSamples = 5;
float sampleAA(float p) {
vec2 dxdy = abs(vec2(dFdx(p), dFdy(p)));
float fwidth = dxdy.x + dxdy.y;
ivec2 samples = 1 + ivec2(clamp(dxdy, 0.0, float(maxSamples - 1)));
vec2 invSamples = 1.0 / vec2(samples);
float accumulator = 0.0;
for (int j = 0; j < maxSamples; j++) {
if(j >= samples.y) {
break;
}
for (int i = 0; i < maxSamples; i++) {
if(i >= samples.x) {
break;
}
vec2 step = vec2(i,j) * invSamples - 0.5;
accumulator += coverage(p + step.x * dxdy.x + step.y * dxdy.y, fwidth);
}
}
accumulator /= float(samples.x * samples.y);
return accumulator;
}`)),w.main.add(e`
    discardBySlice(vpos);
    discardByTerrainDepth();
    vec4 color = vColor;
    ${t(!D,e`color.a *= ${x(b)};`)}
    outputColorHighlightOID(color, vpos, color.rgb);
  `),S}function x(t){function n(n){return t.draped?e`coverage(vuv.${n}, texelSize)`:e`sampleAA(vuv.${n})`}switch(t.style){case 3:case 0:return n(`y`);case 4:case 1:return n(`x`);case 5:case 2:return e`1.0 - (1.0 - ${n(`x`)}) * (1.0 - ${n(`y`)})`;default:return`0.0`}}var S=Object.freeze(Object.defineProperty({__proto__:null,build:b},Symbol.toStringTag,{value:`Module`}));export{b as n,S as t};