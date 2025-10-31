import{Ev as e,id as t,kv as n,mt as r,rC as i,vt as a}from"./index-BqmCqmfp.js";import{n as o,t as s}from"./glsl-C2sn87h0.js";import{t as c}from"./Uniform-DXwqrKA1.js";import{t as l}from"./FloatPassUniform-BEwJjV4q.js";import{t as u}from"./Texture2DPassUniform-Cd7cdF1a.js";import{t as d}from"./ShaderBuilder-C3C7fUwK.js";import{t as f}from"./Float4BindUniform-CtMVDjau.js";import{t as p}from"./Texture2DBindUniform-CSngcuNV.js";import{t as m}from"./Float2PassUniform-D4VTGzqn.js";import{t as h}from"./Float4PassUniform-Bo_mhcMi.js";import{t as g}from"./FloatBindUniform-TDSkRzMc.js";import{i as _,o as v}from"./View.glsl-B6vOoRsw.js";import{t as y}from"./ObjectAndLayerIdColor.glsl-CrEuv_nr.js";import{t as b}from"./VisualVariables.glsl-xWfUXTFa.js";import{i as x,n as S,t as C}from"./AlphaCutoff-DTq90Si4.js";import{n as ee,r as te,t as w}from"./ScreenSizePerspective.glsl-CRhKUJLC.js";import{t as T}from"./TerrainDepthTest.glsl-neHlKy5u.js";import{n as E,r as D,t as O}from"./HUDVisibility.glsl-BkjA-IFP.js";function k(e,t){let{vertex:n,fragment:r}=e;e.include(T,t),n.include(E),n.main.add(o`vec4 posProjCenter;
if (dot(position, position) > 0.0) {
ProjectHUDAux projectAux;
vec4 posProj = projectPositionHUD(projectAux);
posProjCenter = alignToPixelCenter(posProj, viewport.zw);
forwardViewPosDepth(projectAux.posView);
vec3 vpos = projectAux.posModel;
if (rejectBySlice(vpos)) {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
} else {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
gl_Position = posProjCenter;
gl_PointSize = 1.0;`),r.main.add(o`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}var A=class extends c{constructor(e,t,n){super(e,`vec4`,2,(r,i,a)=>r.setUniform4fv(e,t(i,a),n))}};function j(t){let n=new d,{signedDistanceFieldEnabled:c,occlusionTestEnabled:T,horizonCullingEnabled:j,pixelSnappingEnabled:P,hasScreenSizePerspective:I,debugDrawLabelBorder:R,hasVVSize:z,hasVVColor:B,hasRotation:V,occludedFragmentFade:H,sampleSignedDistanceFieldTexelCenter:U}=t;n.include(D,t),n.vertex.include(v,t);let{occlusionPass:W,output:G,oitPass:K}=t;if(W)return n.include(k,t),n;let{vertex:q,fragment:J}=n;n.include(ee),n.include(b,t),n.include(y,t),T&&n.include(O),J.include(x),n.varyings.add(`vcolor`,`vec4`),n.varyings.add(`vtc`,`vec2`),n.varyings.add(`vsize`,`vec2`);let Y=G===9,X=Y&&T;X&&n.varyings.add(`voccluded`,`float`),q.uniforms.add(new f(`viewport`,e=>e.camera.fullViewport),new m(`screenOffset`,(t,n)=>e(F,2*t.screenOffset[0]*n.camera.pixelRatio,2*t.screenOffset[1]*n.camera.pixelRatio)),new m(`anchorPosition`,e=>N(e)),new h(`materialColor`,e=>e.color),new l(`materialRotation`,e=>e.rotation),new u(`tex`,e=>e.texture)),_(q),c&&(q.uniforms.add(new h(`outlineColor`,e=>e.outlineColor)),J.uniforms.add(new h(`outlineColor`,e=>M(e)?e.outlineColor:r),new l(`outlineSize`,e=>M(e)?e.outlineSize:0))),j&&q.uniforms.add(new A(`pointDistanceSphere`,(e,t)=>{let n=t.camera.eye,r=e.origin;return a(r[0]-n[0],r[1]-n[1],r[2]-n[2],i.radius)})),P&&q.include(E),I&&(te(q),w(q)),R&&n.varyings.add(`debugBorderCoords`,`vec4`),n.attributes.add(`uv0`,`vec2`),n.attributes.add(`uvi`,`vec4`),n.attributes.add(`color`,`vec4`),n.attributes.add(`size`,`vec2`),n.attributes.add(`rotation`,`float`),(z||B)&&n.attributes.add(`featureAttribute`,`vec4`),q.code.add(j?o`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:o`bool behindHorizon(vec3 posModel) { return false; }`),q.main.add(o`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    if (behindHorizon(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    vec2 inputSize;
    ${s(I,o`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,o`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${s(z,o`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${s(T,o`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${s(R,`debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);`)}
      return;
    }`)}
    ${s(X,o`voccluded = visible ? 0.0 : 1.0;`)}
  `);let Z=o`
      vec2 uv = mix(uvi.xy, uvi.zw, bvec2(uv0));
      vec2 texSize = vec2(textureSize(tex, 0));
      uv = mix(vec2(1.0), uv / texSize, lessThan(uv, vec2(${L})));
      quadOffset.xy = (uv0 - anchorPosition) * 2.0 * combinedSize;

      ${s(V,o`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,ne=P?c?o`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:o`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:o`posProj += quadOffset;`;q.main.add(o`
    ${Z}
    ${B?`vcolor = interpolateVVColor(featureAttribute.y) * materialColor;`:`vcolor = color / 255.0 * materialColor;`}

    ${s(G===10,o`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${o.float(C)};
    ${s(c,`alphaDiscard = alphaDiscard && outlineColor.a < ${o.float(C)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${ne}
      gl_Position = posProj;
    }

    vtc = uv;

    ${s(R,o`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),J.uniforms.add(new u(`tex`,e=>e.texture)),H&&!Y&&J.uniforms.add(new p(`depthMap`,e=>e.mainDepth),new g(`occludedOpacity`,e=>e.hudOccludedFragmentOpacity));let Q=R?o`(isBorder > 0.0 ? 0.0 : ${o.float(C)})`:o.float(C),$=o`
    ${s(R,o`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${s(U,o`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${c?o`
      vec4 fillPixelColor = vcolor;

      // Get distance in output units (i.e. pixels)

      float sdf = texture(tex, samplePos).r;
      float pixelDistance = sdf * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - pixelDistance, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(pixelDistance) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${Q} ||
          fillPixelColor.a + outlinePixelColor.a < ${o.float(C)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${s(!Y,o`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${Q}) {
          discard;
        }

        ${s(!Y,o`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-pixelDistance/vsize.x*2.0, 0.0, 1.0), clamp(pixelDistance/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:o`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${Q}) {
            discard;
          }
          ${s(!Y,o`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${s(H&&!Y,o`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${s(!Y&&R,o`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(G){case 0:case 1:n.outputs.add(`fragColor`,`vec4`,0),G===1&&n.outputs.add(`fragEmission`,`vec4`,1),K===1&&n.outputs.add(`fragAlpha`,`float`,G===1?2:1),J.main.add(o`
        ${$}
        ${s(K===2,o`fragColor.rgb /= fragColor.a;`)}
        ${s(G===1,o`fragEmission = vec4(0.0);`)}
        ${s(K===1,o`fragAlpha = fragColor.a;`)}`);break;case 10:J.main.add(o`
        ${$}
        outputObjectAndLayerIdColor();`);break;case 9:n.include(S,t),J.main.add(o`
        ${$}
        outputHighlight(${s(X,o`voccluded == 1.0`,o`false`)});`)}return n}function M(e){return e.outlineColor[3]>0&&e.outlineSize>0}function N(e){return e.textureIsSignedDistanceField?P(e.anchorPosition,e.distanceFieldBoundingBox,F):n(F,e.anchorPosition),F}function P(t,n,r){e(r,t[0]*(n[2]-n[0])+n[0],t[1]*(n[3]-n[1])+n[1])}var F=t(),I=32e3,L=o.float(I),R=Object.freeze(Object.defineProperty({__proto__:null,build:j,calculateAnchorPosition:N,fullUV:I},Symbol.toStringTag,{value:`Module`}));export{I as i,j as n,R as r,N as t};