import{n as e,t}from"./glsl-C2sn87h0.js";import{t as n}from"./Texture2DPassUniform-Cd7cdF1a.js";import{t as r}from"./ShaderBuilder-C3C7fUwK.js";import{t as i}from"./Float2BindUniform-BJ75NEvo.js";import{t as a}from"./Float4BindUniform-CtMVDjau.js";import{t as o}from"./Float4PassUniform-Bo_mhcMi.js";import{t as s}from"./FloatBindUniform-TDSkRzMc.js";import{t as c}from"./Matrix4BindUniform-BUS9JrUC.js";import{i as l,n as u,r as d,s as f}from"./View.glsl-B6vOoRsw.js";import{i as p,n as m}from"./AlphaCutoff-DTq90Si4.js";import{a as h,i as g,n as _,o as v,r as y,s as b,t as x}from"./MarkerSizing.glsl-uoP35BjE.js";import{t as S}from"./TerrainDepthTest.glsl-neHlKy5u.js";import{t as C}from"./OutputColorHighlightOID.glsl-MUXZi3dC.js";function w(g){let _=new r,{space:y,anchor:w,hasTip:T,hasScreenSizePerspective:E}=g,D=y===2,O=y===1;_.include(b,g),_.include(x,g),_.include(S,g);let{vertex:k,fragment:A,varyings:j}=_;u(k,g),_.attributes.add(`position`,`vec3`),_.attributes.add(`previousDelta`,`vec4`),_.attributes.add(`uv0`,`vec2`),j.add(`vColor`,`vec4`),j.add(`vpos`,`vec3`,{invariant:!0}),j.add(`vUV`,`vec2`),j.add(`vSize`,`float`),T&&j.add(`vLineWidth`,`float`),k.uniforms.add(new i(`nearFar`,({camera:e})=>e.nearFar),new a(`viewport`,({camera:e})=>e.fullViewport)).code.add(e`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),k.code.add(e`void clip(vec4 pos, inout vec4 prev) {
float vnp = nearFar[0] * 0.99;
if (prev.z > -nearFar[0]) {
float interpolation = (-vnp - pos.z) / (prev.z - pos.z);
prev = mix(pos, prev, interpolation);
}
}`),D?(_.attributes.add(`normal`,`vec3`),d(k),k.constants.add(`tiltThreshold`,`float`,.7),k.code.add(e`vec3 perpendicular(vec3 v) {
vec3 n = (viewNormal * vec4(normal.xyz, 1.0)).xyz;
vec3 n2 = cross(v, n);
vec3 forward = vec3(0.0, 0.0, 1.0);
float tiltDot = dot(forward, n);
return abs(tiltDot) < tiltThreshold ? n : n2;
}`)):k.code.add(e`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}`);let M=D?`vec3`:`vec2`;return k.code.add(e`
      ${M} normalizedSegment(${M} pos, ${M} prev) {
        ${M} segment = pos - prev;
        float segmentLen = length(segment);

        // normalize or zero if too short
        return (segmentLen > 0.001) ? segment / segmentLen : ${D?`vec3(0.0, 0.0, 0.0)`:`vec2(0.0, 0.0)`};
      }

      ${M} displace(${M} pos, ${M} prev, float displacementLen) {
        ${M} segment = normalizedSegment(pos, prev);

        ${M} displacementDirU = perpendicular(segment);
        ${M} displacementDirV = segment;

        ${w===1?`pos -= 0.5 * displacementLen * displacementDirV;`:``}

        return pos + displacementLen * (uv0.x * displacementDirU + uv0.y * displacementDirV);
      }
    `),O&&(k.uniforms.add(new c(`inverseProjectionMatrix`,({camera:e})=>e.inverseProjectionMatrix)),k.code.add(e`vec3 inverseProject(vec4 posScreen) {
posScreen.xy = (posScreen.xy / viewport.zw) * posScreen.w;
return (inverseProjectionMatrix * posScreen).xyz;
}`),k.code.add(e`bool rayIntersectPlane(vec3 rayDir, vec3 planeOrigin, vec3 planeNormal, out vec3 intersection) {
float cos = dot(rayDir, planeNormal);
float t = dot(planeOrigin, planeNormal) / cos;
intersection = t * rayDir;
return abs(cos) > 0.001 && t > 0.0;
}`),k.uniforms.add(new s(`perScreenPixelRatio`,({camera:e})=>e.perScreenPixelRatio)),k.code.add(e`
      vec4 toFront(vec4 displacedPosScreen, vec3 posLeft, vec3 posRight, vec3 prev, float lineWidth) {
        // Project displaced position back to camera space
        vec3 displacedPos = inverseProject(displacedPosScreen);

        // Calculate the plane that we want the marker to lie in. Note that this will always be an approximation since ribbon lines are generally
        // not planar and we do not know the actual position of the displaced prev vertices (they are offset in screen space, too).
        vec3 planeNormal = normalize(cross(posLeft - posRight, posLeft - prev));
        vec3 planeOrigin = posLeft;

        ${t(g.hasCap,`if(prev.z > posLeft.z) {
                vec2 diff = posLeft.xy - posRight.xy;
                planeOrigin.xy += perpendicular(diff) / 2.0;
             }`)};

        // Move the plane towards the camera by a margin dependent on the line width (approximated in world space). This tolerance corrects for the
        // non-planarity in most cases, but sharp joins can place the prev vertices at arbitrary positions so markers can still clip.
        float offset = lineWidth * perScreenPixelRatio;
        planeOrigin *= (1.0 - offset);

        // Intersect camera ray with the plane and make sure it is within clip space
        vec3 rayDir = normalize(displacedPos);
        vec3 intersection;
        if (rayIntersectPlane(rayDir, planeOrigin, planeNormal, intersection) && intersection.z < -nearFar[0] && intersection.z > -nearFar[1]) {
          return vec4(intersection.xyz, 1.0);
        }

        // Fallback: use depth of pos or prev, whichever is closer to the camera
        float minDepth = planeOrigin.z > prev.z ? length(planeOrigin) : length(prev);
        displacedPos *= minDepth / length(displacedPos);
        return vec4(displacedPos.xyz, 1.0);
      }
  `)),l(k),_.include(v),k.main.add(e`
    // Check for special value of uv0.y which is used by the Renderer when graphics
    // are removed before the VBO is recompacted. If this is the case, then we just
    // project outside of clip space.
    if (uv0.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(position + previousDelta.xyz * previousDelta.w, 1.0);

      float lineWidth = getLineWidth(${t(E,`pos.xyz`)});
      float screenMarkerSize = getScreenMarkerSize(lineWidth);

      clip(pos, prev);

      ${D?e`${t(g.hideOnShortSegments,e`
                if (areWorldMarkersHidden(pos.xyz, prev.xyz)) {
                  // Project out of clip space
                  gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
                  return;
                }`)}
            pos.xyz = displace(pos.xyz, prev.xyz, getWorldMarkerSize(pos.xyz));
            vec4 displacedPosScreen = projectAndScale(pos);`:e`
            vec4 posScreen = projectAndScale(pos);
            vec4 prevScreen = projectAndScale(prev);
            vec4 displacedPosScreen = posScreen;

            displacedPosScreen.xy = displace(posScreen.xy, prevScreen.xy, screenMarkerSize);
            ${t(O,e`
                vec2 displacementDirU = perpendicular(normalizedSegment(posScreen.xy, prevScreen.xy));

                // We need three points of the ribbon line in camera space to calculate the plane it lies in
                // Note that we approximate the third point, since we have no information about the join around prev
                vec3 lineRight = inverseProject(posScreen + lineWidth * vec4(displacementDirU.xy, 0.0, 0.0));
                vec3 lineLeft = pos.xyz + (pos.xyz - lineRight);

                pos = toFront(displacedPosScreen, lineLeft, lineRight, prev.xyz, lineWidth);
                displacedPosScreen = projectAndScale(pos);`)}`}
      forwardViewPosDepth(pos.xyz);
      // Convert back into NDC
      displacedPosScreen.xy = (displacedPosScreen.xy / viewport.zw) * displacedPosScreen.w;

      // Convert texture coordinate into [0,1]
      vUV = (uv0 + 1.0) / 2.0;
      ${t(!D,`vUV = noPerspectiveWrite(vUV, displacedPosScreen.w);`)}
      ${t(T,`vLineWidth = noPerspectiveWrite(lineWidth, displacedPosScreen.w);`)}

      vSize = screenMarkerSize;
      vColor = getColor();

      // Use camera space for slicing
      vpos = pos.xyz;

      gl_Position = displacedPosScreen;
    }`),A.include(f,g),_.include(C,g),A.include(p),A.uniforms.add(new o(`intrinsicColor`,({color:e})=>e),new n(`tex`,({markerTexture:e})=>e)).constants.add(`texelSize`,`float`,1/64).code.add(e`float markerAlpha(vec2 samplePos) {
samplePos += vec2(0.5, -0.5) * texelSize;
float sdf = texture(tex, samplePos).r;
float pixelDistance = sdf * vSize;
pixelDistance -= 0.5;
return clamp(0.5 - pixelDistance, 0.0, 1.0);
}`),T&&(_.include(h),A.constants.add(`relativeMarkerSize`,`float`,32/64).constants.add(`relativeTipLineWidth`,`float`,.25).code.add(e`
    float tipAlpha(vec2 samplePos) {
      // Convert coordinates s.t. they are in pixels and relative to the tip of an arrow marker
      samplePos -= vec2(0.5, 0.5 + 0.5 * relativeMarkerSize);
      samplePos *= vSize;

      float halfMarkerSize = 0.5 * relativeMarkerSize * vSize;
      float halfTipLineWidth = 0.5 * max(1.0, relativeTipLineWidth * noPerspectiveRead(vLineWidth));

      ${t(D,`halfTipLineWidth *= fwidth(samplePos.y);`)}

      float distance = max(abs(samplePos.x) - halfMarkerSize, abs(samplePos.y) - halfTipLineWidth);
      return clamp(0.5 - distance, 0.0, 1.0);
    }
  `)),_.include(m,g),_.include(h),A.main.add(e`
    discardBySlice(vpos);
    discardByTerrainDepth();

    vec4 finalColor = intrinsicColor * vColor;

    // Cancel out perspective correct interpolation if in screen space or draped
    vec2 samplePos = ${t(!D,`noPerspectiveRead(vUV)`,`vUV`)};
    finalColor.a *= ${T?`max(markerAlpha(samplePos), tipAlpha(samplePos))`:`markerAlpha(samplePos)`};
    outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),_}var T=Object.freeze(Object.defineProperty({__proto__:null,build:w},Symbol.toStringTag,{value:`Module`}));export{T as n,w as t};