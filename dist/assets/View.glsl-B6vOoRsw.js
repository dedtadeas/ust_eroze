import{$l as e,Al as t,Jg as n,Ph as r,Wg as i,Wl as a,iu as o,np as s}from"./index-BqmCqmfp.js";import{n as c}from"./glsl-C2sn87h0.js";import{t as l}from"./Uniform-DXwqrKA1.js";import{t as u}from"./Float3DrawUniform-UsZpj3mh.js";import{t as d}from"./Float3BindUniform-BrSuqm5i.js";import{t as f}from"./FloatBindUniform-TDSkRzMc.js";import{t as p}from"./Matrix4BindUniform-BUS9JrUC.js";function m(e,t){v(e,t,new u(`slicePlaneOrigin`,(e,n)=>S(t,e,n)),new u(`slicePlaneBasis1`,(e,n)=>C(t,e,n,n.slicePlane?.basis1)),new u(`slicePlaneBasis2`,(e,n)=>C(t,e,n,n.slicePlane?.basis2)))}function h(e,t){_(e,t,new u(`slicePlaneOrigin`,(e,n)=>S(t,e,n)),new u(`slicePlaneBasis1`,(e,n)=>C(t,e,n,n.slicePlane?.basis1)),new u(`slicePlaneBasis2`,(e,n)=>C(t,e,n,n.slicePlane?.basis2)))}var g=c`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool sliceByPlane(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}
bool rejectBySlice(vec3 pos) {
return sliceByPlane(pos);
}`;function _(e,t,...n){t.hasSlicePlane?(e.uniforms.add(...n),e.code.add(g)):e.code.add(`bool rejectBySlice(vec3 pos) { return false; }`)}function v(e,t,...n){_(e,t,...n),t.hasSlicePlane?e.code.add(`
    void discardBySlice(vec3 pos) {
      if (sliceByPlane(pos)) {
        discard;
      }
    }

    vec4 applySliceOutline(vec4 color, vec3 pos) {
      SliceFactors factors = calculateSliceFactors(pos);

      factors.front /= 2.0 * fwidth(factors.front);
      factors.side0 /= 2.0 * fwidth(factors.side0);
      factors.side1 /= 2.0 * fwidth(factors.side1);
      factors.side2 /= 2.0 * fwidth(factors.side2);
      factors.side3 /= 2.0 * fwidth(factors.side3);

      // return after calling fwidth, to avoid aliasing caused by discontinuities in the input to fwidth
      if (sliceByFactors(factors)) {
        return color;
      }

      float outlineFactor = (1.0 - step(0.5, factors.front))
        * (1.0 - step(0.5, factors.side0))
        * (1.0 - step(0.5, factors.side1))
        * (1.0 - step(0.5, factors.side2))
        * (1.0 - step(0.5, factors.side3));

      return mix(color, vec4(vec3(0.0), color.a), outlineFactor * 0.3);
    }

    vec4 applySlice(vec4 color, vec3 pos) {
      return sliceEnabled() ? applySliceOutline(color, pos) : color;
    }
  `):e.code.add(c`void discardBySlice(vec3 pos) { }
vec4 applySlice(vec4 color, vec3 pos) { return color; }`)}function y(t,n,r){return t.instancedDoublePrecision?e(w,r.camera.viewInverseTransposeMatrix[3],r.camera.viewInverseTransposeMatrix[7],r.camera.viewInverseTransposeMatrix[11]):n.slicePlaneLocalOrigin}function b(e,t){return e==null?t.origin:a(T,t.origin,e)}function x(e,t,n){return e.hasSliceTranslatedView?t==null?n.camera.viewMatrix:r(D,n.camera.viewMatrix,t):null}function S(e,n,r){if(r.slicePlane==null)return i;let a=y(e,n,r),o=b(a,r.slicePlane),s=x(e,a,r);return s==null?o:t(T,o,s)}function C(e,n,r,s){if(s==null||r.slicePlane==null)return i;let c=y(e,n,r),l=b(c,r.slicePlane),u=x(e,c,r);return u==null?s:(o(E,s,l),t(T,l,u),t(E,E,u),a(E,E,T))}var w=n(),T=n(),E=n(),D=s(),O=class extends l{constructor(e,t,n){super(e,`mat4`,2,(r,i,a)=>r.setUniformMatrix4fv(e,t(i,a),n))}};function k(t,n){n.instancedDoublePrecision?t.constants.add(`cameraPosition`,`vec3`,i):t.uniforms.add(new u(`cameraPosition`,(t,n)=>e(M,n.camera.viewInverseTransposeMatrix[3]-t.origin[0],n.camera.viewInverseTransposeMatrix[7]-t.origin[1],n.camera.viewInverseTransposeMatrix[11]-t.origin[2])))}function A(t,n){if(!n.instancedDoublePrecision)return void t.uniforms.add(new p(`proj`,e=>e.camera.projectionMatrix),new O(`view`,(e,t)=>r(j,t.camera.viewMatrix,e.origin)),new u(`localOrigin`,e=>e.origin));let i=({camera:t})=>e(M,t.viewInverseTransposeMatrix[3],t.viewInverseTransposeMatrix[7],t.viewInverseTransposeMatrix[11]);t.uniforms.add(new p(`proj`,e=>e.camera.projectionMatrix),new p(`view`,e=>r(j,e.camera.viewMatrix,i(e))),new d(`localOrigin`,e=>i(e)))}var j=s(),M=n();function N(e){e.uniforms.add(new p(`viewNormal`,e=>e.camera.viewInverseTransposeMatrix))}function P(e){e.uniforms.add(new f(`pixelRatio`,e=>e.camera.pixelRatio/e.overlayStretch))}export{O as a,P as i,A as n,h as o,N as r,m as s,k as t};