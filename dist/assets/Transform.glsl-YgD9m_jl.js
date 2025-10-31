import{Jg as e,k_ as t,np as n}from"./index-BqmCqmfp.js";import{n as r,t as i}from"./glsl-C2sn87h0.js";import{t as a}from"./Uniform-DXwqrKA1.js";import{t as o}from"./NoParameters-CpAItLvD.js";import{t as s}from"./Float2BindUniform-BJ75NEvo.js";import{t as c}from"./FloatBindUniform-TDSkRzMc.js";function l(e){e.varyings.add(`linearDepth`,`float`,{invariant:!0})}function u(e,t){t&&l(e),e.vertex.code.add(r`
    void forwardLinearDepth(float _linearDepth) { ${i(t,`linearDepth = _linearDepth;`)} }
  `)}function d({code:e,uniforms:t},n){t.add(new c(`dpDummy`,()=>1)),e.add(r`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 hiD = hiA + hiB;
vec3 loD = loA + loB;
return  dpDummy * hiD + loD;
}`)}var f=class extends a{constructor(e,t,n){super(e,`mat3`,2,(r,i,a)=>r.setUniformMatrix3fv(e,t(i,a),n))}},p=class extends o{constructor(){super(...arguments),this.transformWorldFromViewTH=e(),this.transformWorldFromViewTL=e(),this.transformViewFromCameraRelativeRS=t(),this.transformProjFromView=n()}},m=class extends o{constructor(){super(...arguments),this.transformWorldFromModelRS=t(),this.transformWorldFromModelTH=e(),this.transformWorldFromModelTL=e()}};function h(e){e.vertex.uniforms.add(new s(`nearFar`,e=>e.camera.nearFar))}function g(e){e.vertex.code.add(r`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function _(e){g(e),e.vertex.code.add(r`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = calculateLinearDepth(nearFar,eye.z);
return proj * eye;
}`),e.vertex.code.add(r`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}export{f as a,p as i,h as n,d as o,m as r,u as s,_ as t};