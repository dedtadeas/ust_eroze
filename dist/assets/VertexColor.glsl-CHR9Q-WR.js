import{n as e}from"./glsl-C2sn87h0.js";function t(t,n){n.hasVertexColors?(t.attributes.add(`color`,`vec4`),t.varyings.add(`vColor`,`vec4`),t.vertex.code.add(e`void forwardVertexColor() { vColor = color; }`),t.vertex.code.add(e`
      void forwardNormalizedVertexColor() { vColor = color * ${e.float(1/255)}; }
    `)):t.vertex.code.add(e`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)}export{t};