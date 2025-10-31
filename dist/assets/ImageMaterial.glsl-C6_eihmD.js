import{n as e,t}from"./glsl-C2sn87h0.js";import{t as n}from"./FloatPassUniform-BEwJjV4q.js";import{t as r}from"./Texture2DPassUniform-Cd7cdF1a.js";import{t as i}from"./NoParameters-CpAItLvD.js";import{t as a}from"./ShaderBuilder-C3C7fUwK.js";import{n as o,s}from"./View.glsl-B6vOoRsw.js";import{t as c}from"./ObjectAndLayerIdColor.glsl-CrEuv_nr.js";import{i as l}from"./AlphaCutoff-DTq90Si4.js";import{t as u}from"./TerrainDepthTest.glsl-neHlKy5u.js";import{t as d}from"./OutputColorHighlightOID.glsl-MUXZi3dC.js";import{t as f}from"./Transform.glsl-YgD9m_jl.js";var p=class extends i{};function m(i){let p=new a,{vertex:m,fragment:h,varyings:g}=p,{output:_,perspectiveInterpolation:v}=i;return o(m,i),p.include(f),p.include(u,i),p.fragment.include(s,i),p.include(c,i),p.include(d,i),p.attributes.add(`position`,`vec3`),p.attributes.add(`uv0`,`vec2`),v&&p.attributes.add(`perspectiveDivide`,`float`),m.main.add(e`
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    vTexCoord = uv0;
    gl_Position = transformPosition(proj, view, vpos);
    ${t(v,`gl_Position *= perspectiveDivide;`)}`),g.add(`vpos`,`vec3`,{invariant:!0}),g.add(`vTexCoord`,`vec2`),h.include(l),h.uniforms.add(new n(`opacity`,e=>e.opacity),new r(`tex`,e=>e.glTexture)).main.add(e`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${t(_===10,`fragColor = vec4(0, 0, 0, 1); return;`)}
    vec4 finalColor = texture(tex, vTexCoord) * opacity;
    outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),p}var h=Object.freeze(Object.defineProperty({__proto__:null,ImageMaterialPassParameters:p,build:m},Symbol.toStringTag,{value:`Module`}));export{m as n,h as r,p as t};