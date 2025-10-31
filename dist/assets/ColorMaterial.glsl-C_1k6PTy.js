import{n as e}from"./glsl-C2sn87h0.js";import{t}from"./ShaderBuilder-C3C7fUwK.js";import{t as n}from"./Float4PassUniform-Bo_mhcMi.js";import{n as r,s as i}from"./View.glsl-B6vOoRsw.js";import{t as a}from"./ObjectAndLayerIdColor.glsl-CrEuv_nr.js";import{t as o}from"./VisualVariables.glsl-xWfUXTFa.js";import{i as s}from"./AlphaCutoff-DTq90Si4.js";import{t as c}from"./TerrainDepthTest.glsl-neHlKy5u.js";import{t as l}from"./OutputColorHighlightOID.glsl-MUXZi3dC.js";import{t as u}from"./Transform.glsl-YgD9m_jl.js";import{t as d}from"./VertexColor.glsl-CHR9Q-WR.js";function f(f){let p=new t,{vertex:m,fragment:h,attributes:g,varyings:_}=p,{hasVVColor:v,hasVertexColors:y}=f;return r(m,f),p.include(u),p.include(d,f),p.include(o,f),p.include(a,f),h.include(i,f),p.include(l,f),p.include(c,f),g.add(`position`,`vec3`),v&&g.add(`colorFeatureAttribute`,`float`),y||_.add(`vColor`,`vec4`),_.add(`vpos`,`vec3`,{invariant:!0}),m.uniforms.add(new n(`uColor`,e=>e.color)),m.main.add(e`
      vpos = position;
      forwardNormalizedVertexColor();
      forwardObjectAndLayerIdColor();

      ${y?`vColor *= uColor;`:v?`vColor = uColor * interpolateVVColor(colorFeatureAttribute);`:`vColor = uColor;`}
      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
      gl_Position = transformPosition(proj, view, vpos);`),h.include(s),h.main.add(e`discardBySlice(vpos);
discardByTerrainDepth();
outputColorHighlightOID(vColor, vpos, vColor.rgb);`),p}var p=Object.freeze(Object.defineProperty({__proto__:null,build:f},Symbol.toStringTag,{value:`Module`}));export{p as n,f as t};