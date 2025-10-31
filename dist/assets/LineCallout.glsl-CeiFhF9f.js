import{Ev as e,id as t,mt as n}from"./index-BqmCqmfp.js";import{n as r,t as i}from"./glsl-C2sn87h0.js";import{t as a}from"./FloatPassUniform-BEwJjV4q.js";import{t as o}from"./ShaderBuilder-C3C7fUwK.js";import{t as s}from"./Float2BindUniform-BJ75NEvo.js";import{t as c}from"./ReadDepth.glsl-DvJ8t0GM.js";import{t as l}from"./Float4BindUniform-CtMVDjau.js";import{t as u}from"./Texture2DBindUniform-CSngcuNV.js";import{t as d}from"./Float2PassUniform-D4VTGzqn.js";import{t as f}from"./Float4PassUniform-Bo_mhcMi.js";import{o as p}from"./View.glsl-B6vOoRsw.js";import{t as m}from"./ScreenSizePerspective.glsl-CRhKUJLC.js";import{n as h,r as g,t as _}from"./HUDVisibility.glsl-BkjA-IFP.js";function v(e){e.include(c),e.uniforms.add(new u(`geometryDepthTexture`,e=>e.geometryDepth?.attachment)),e.code.add(r`bool geometryDepthTest(vec2 pos, float elementDepth) {
float geometryDepth = linearDepthFromTexture(geometryDepthTexture, pos);
return (elementDepth < (geometryDepth - 1.0));
}`)}function y(t){let c=new o,{vertex:u,fragment:y}=c,{terrainDepthTest:x}=t;return u.include(h),c.include(g,t),c.vertex.include(p,t),c.attributes.add(`uv0`,`vec2`),u.uniforms.add(new l(`viewport`,e=>e.camera.fullViewport),new a(`lineSize`,(e,t)=>e.size>0?Math.max(1,e.size)*t.camera.pixelRatio:0),new s(`pixelToNDC`,t=>e(b,2/t.camera.fullViewport[2],2/t.camera.fullViewport[3])),new a(`borderSize`,(e,t)=>e.borderColor?t.camera.pixelRatio:0),new d(`screenOffset`,(t,n)=>e(b,t.horizontalScreenOffset*n.camera.pixelRatio,0))),c.varyings.add(`coverageSampling`,`vec4`),c.varyings.add(`lineSizes`,`vec2`),x&&c.varyings.add(`depth`,`float`),t.occlusionTestEnabled&&c.include(_),t.hasScreenSizePerspective&&m(u),u.main.add(r`
    ProjectHUDAux projectAux;
    vec4 endPoint = projectPositionHUD(projectAux);

    vec3 vpos = projectAux.posModel;
    if (rejectBySlice(vpos)) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    }
    ${i(t.occlusionTestEnabled,r`if (!testHUDVisibility(endPoint)) {
             gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
             return;
           }`)}

    ${t.hasScreenSizePerspective?r`vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);
               vec2 screenOffsetScaled = applyScreenSizePerspectiveScaleFactorVec2(screenOffset, perspectiveFactor);`:`vec2 screenOffsetScaled = screenOffset;`}
    // Add view dependent polygon offset to get exact same original starting point. This is mostly used to get the
    // correct depth value
    vec3 posView = (view * vec4(position, 1.0)).xyz;
    ${i(x,`depth = posView.z;`)}

    applyHUDViewDependentPolygonOffset(centerOffsetAndDistance.w, projectAux.absCosAngle, posView);
    vec4 startPoint = proj * vec4(posView, 1.0);

    // Apply screen offset to both start and end point
    vec2 screenOffsetNorm = screenOffsetScaled * 2.0 / viewport.zw;
    startPoint.xy += screenOffsetNorm * startPoint.w;
    endPoint.xy += screenOffsetNorm * endPoint.w;

    // Align start and end to pixel origin
    vec4 startAligned = alignToPixelOrigin(startPoint, viewport.zw);
    vec4 endAligned = alignToPixelOrigin(endPoint, viewport.zw);
    ${i(t.hudDepth,t.hudDepthAlignStart?`endAligned = vec4(endAligned.xy / endAligned.w * startAligned.w, startAligned.zw);`:`startAligned = vec4(startAligned.xy / startAligned.w * endAligned.w, endAligned.zw);`)}
    vec4 projectedPosition = mix(startAligned, endAligned, uv0.y);

    // The direction of the line in screen space
    vec2 screenSpaceDirection = normalize(endAligned.xy / endAligned.w - startAligned.xy / startAligned.w);
    vec2 perpendicularScreenSpaceDirection = vec2(screenSpaceDirection.y, -screenSpaceDirection.x);
    ${t.hasScreenSizePerspective?r`float lineSizeScaled = applyScreenSizePerspectiveScaleFactorFloat(lineSize, perspectiveFactor);
               float borderSizeScaled = applyScreenSizePerspectiveScaleFactorFloat(borderSize, perspectiveFactor);`:r`float lineSizeScaled = lineSize;
               float borderSizeScaled = borderSize;`}
    float halfPixelSize = lineSizeScaled * 0.5;

    // Compute full ndc offset, adding 1px padding for doing anti-aliasing and the border size
    float padding = 1.0 + borderSizeScaled;
    vec2 ndcOffset = (-halfPixelSize - padding + uv0.x * (lineSizeScaled + padding + padding)) * pixelToNDC;

    // Offset x/y from the center of the line in screen space
    projectedPosition.xy += perpendicularScreenSpaceDirection * ndcOffset * projectedPosition.w;

    // Compute a coverage varying which we can use in the fragment shader to determine
    // how much a pixel is actually covered by the line (i.e. to anti alias the line).
    // This works by computing two coordinates that can be linearly interpolated and then
    // subtracted to find out how far away from the line edge we are.
    float edgeDirection = (uv0.x * 2.0 - 1.0);

    float halfBorderSize = 0.5 * borderSizeScaled;
    float halfPixelSizeAndBorder = halfPixelSize + halfBorderSize;
    float outerEdgeCoverageSampler = edgeDirection * (halfPixelSizeAndBorder + halfBorderSize + 1.0);

    float isOneSided = float(lineSizeScaled < 2.0 && borderSize < 2.0);

    coverageSampling = vec4(
      // Edge coordinate
      outerEdgeCoverageSampler,

      // Border edge coordinate
      outerEdgeCoverageSampler - halfPixelSizeAndBorder * isOneSided,

      // Line offset
      halfPixelSize - 0.5,

      // Border offset
      halfBorderSize - 0.5 + halfPixelSizeAndBorder * (1.0 - isOneSided)
    );

    lineSizes = vec2(lineSizeScaled, borderSizeScaled);
    gl_Position = projectedPosition;`),y.uniforms.add(new f(`uColor`,e=>e.color??n),new f(`borderColor`,e=>e.borderColor??n)),x&&(y.include(v,t),y.uniforms.add(new s(`inverseViewport`,e=>e.inverseViewport))),y.main.add(r`
    ${i(x,`if( geometryDepthTest(gl_FragCoord.xy * inverseViewport, depth) ){ discard; }`)}

    vec2 coverage = min(1.0 - clamp(abs(coverageSampling.xy) - coverageSampling.zw, 0.0, 1.0), lineSizes);

    float borderAlpha = uColor.a * borderColor.a * coverage.y;
    float colorAlpha = uColor.a * coverage.x;

    float finalAlpha = mix(borderAlpha, 1.0, colorAlpha);
    ${i(!t.hudDepth,r`vec3 finalRgb = mix(borderColor.rgb * borderAlpha, uColor.rgb, colorAlpha);
           fragColor = vec4(finalRgb, finalAlpha);`)}`),c}var b=t(),x=Object.freeze(Object.defineProperty({__proto__:null,build:y},Symbol.toStringTag,{value:`Module`}));export{x as n,y as t};