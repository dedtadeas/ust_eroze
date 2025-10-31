import{n as e}from"./glsl-C2sn87h0.js";import{t}from"./ShaderBuilder-C3C7fUwK.js";import{t as n}from"./Float4PassUniform-Bo_mhcMi.js";import{n as r,s as i}from"./View.glsl-B6vOoRsw.js";import{t as a}from"./OutputColorHighlightOID.glsl-MUXZi3dC.js";import{t as o}from"./Transform.glsl-YgD9m_jl.js";import{t as s}from"./VertexColor.glsl-CHR9Q-WR.js";function c(c){let l=new t,{vertex:u,fragment:d,varyings:f}=l;return l.fragment.include(i,c),l.include(o),l.include(s,c),l.include(a,c),r(u,c),l.attributes.add(`position`,`vec3`),f.add(`vpos`,`vec3`,{invariant:!0}),u.main.add(e`vpos = position;
forwardNormalizedVertexColor();
gl_Position = transformPosition(proj, view, vpos);`),c.hasVertexColors||d.uniforms.add(new n(`constantColor`,e=>e.color)),d.main.add(e`
    discardBySlice(vpos);
    vec4 color = ${c.hasVertexColors?`vColor`:`constantColor`};
    outputColorHighlightOID(color, vpos, color.rgb);
  `),l}var l=Object.freeze(Object.defineProperty({__proto__:null,build:c},Symbol.toStringTag,{value:`Module`}));export{l as n,c as t};