import{Al as e,Ev as t,Jg as n,Ol as r,Pt as i,Ul as a,Wl as o,_t as s,eu as c,id as l,iu as u,nu as d,ob as f,ru as p}from"./index-BqmCqmfp.js";import{m,y as h}from"./plane-CTjDePZl.js";import{c as g,p as _,r as v}from"./sphere-CicnK0Bn.js";import{n as y}from"./glsl-C2sn87h0.js";import{t as b}from"./Float3PassUniform-Co8OqiAU.js";import{t as x}from"./FloatPassUniform-BEwJjV4q.js";import{c as S}from"./lineSegment-uFalXigL.js";import{t as C}from"./ShaderBuilder-C3C7fUwK.js";import{t as w}from"./ScreenSpacePass.glsl-Br3vxYsG.js";import{t as T}from"./Laserline.glsl-BEu4tx-q.js";import{t as E}from"./Float2PassUniform-D4VTGzqn.js";import{t as D}from"./Float3BindUniform-BrSuqm5i.js";import{t as O}from"./Float4PassUniform-Bo_mhcMi.js";import{t as k}from"./FloatBindUniform-TDSkRzMc.js";var A=f(6);function j(t){let n=new C;n.include(w),n.include(T,t);let a=n.fragment;if(t.lineVerticalPlaneEnabled||t.heightManifoldEnabled)if(a.uniforms.add(new x(`maxPixelDistance`,(e,n)=>t.heightManifoldEnabled?2*n.camera.computeScreenPixelSizeAt(e.heightManifoldTarget):2*n.camera.computeScreenPixelSizeAt(e.lineVerticalPlaneSegment.origin))),a.code.add(y`float planeDistancePixels(vec4 plane, vec3 pos) {
float dist = dot(plane.xyz, pos) + plane.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`),t.spherical){let t=(t,n,r)=>e(t,n.heightManifoldTarget,r.camera.viewMatrix),n=(t,n)=>e(t,[0,0,0],n.camera.viewMatrix);a.uniforms.add(new O(`heightManifoldOrigin`,(e,i)=>(t(z,e,i),n(H,i),o(H,H,z),r(B,H),B[3]=d(H),B)),new D(`globalOrigin`,e=>n(z,e)),new x(`cosSphericalAngleThreshold`,(e,t)=>1-Math.max(2,c(t.camera.eye,e.heightManifoldTarget)*t.camera.perRenderPixelRatio)/d(e.heightManifoldTarget))),a.code.add(y`float globeDistancePixels(float posInGlobalOriginLength) {
float dist = abs(posInGlobalOriginLength - heightManifoldOrigin.w);
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}
float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
vec3 posInGlobalOriginNorm = normalize(globalOrigin - pos);
float cosAngle = dot(posInGlobalOriginNorm, heightManifoldOrigin.xyz);
vec3 posInGlobalOrigin = globalOrigin - pos;
float posInGlobalOriginLength = length(posInGlobalOrigin);
float sphericalDistance = globeDistancePixels(posInGlobalOriginLength);
float planarDistance = planeDistancePixels(heightPlane, pos);
return cosAngle < cosSphericalAngleThreshold ? sphericalDistance : planarDistance;
}`)}else a.code.add(y`float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
return planeDistancePixels(heightPlane, pos);
}`);if(t.pointDistanceEnabled&&(a.uniforms.add(new x(`maxPixelDistance`,(e,t)=>2*t.camera.computeScreenPixelSizeAt(e.pointDistanceTarget))),a.code.add(y`float sphereDistancePixels(vec4 sphere, vec3 pos) {
float dist = distance(sphere.xyz, pos) - sphere.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`)),t.intersectsLineEnabled&&a.uniforms.add(new k(`perScreenPixelRatio`,e=>e.camera.perScreenPixelRatio)).code.add(y`float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {
float dist = length(cross(dir, pos - start)) / (length(pos) * perScreenPixelRatio);
return abs(dist) - radius;
}`),(t.lineVerticalPlaneEnabled||t.intersectsLineEnabled)&&a.code.add(y`bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {
vec3 dir = end - start;
float t2 = dot(dir, pos - start);
float l2 = dot(dir, dir);
return t2 >= 0.0 && t2 <= l2;
}`),a.main.add(y`vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
fragColor = vec4(0.0);
return;
}
vec4 color = vec4(0.0);`),t.heightManifoldEnabled){a.uniforms.add(new E(`angleCutoff`,e=>M(e)),new O(`heightPlane`,(e,t)=>L(e.heightManifoldTarget,e.renderCoordsHelper.worldUpAtPosition(e.heightManifoldTarget,z),t.camera.viewMatrix)));let e=t.spherical?y`normalize(globalOrigin - pos)`:y`heightPlane.xyz`;a.main.add(y`
      vec2 angleCutoffAdjusted = angleCutoff - angleCutoffAdjust;
      // Fade out laserlines on flat surfaces
      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoffAdjusted.x, angleCutoffAdjusted.y, abs(dot(normal, ${e})));
      vec4 heightManifoldColor = laserlineProfile(heightManifoldDistancePixels(heightPlane, pos));
      color = max(color, heightManifoldColor * heightManifoldAlpha);`)}return t.pointDistanceEnabled&&(a.uniforms.add(new E(`angleCutoff`,e=>M(e)),new O(`pointDistanceSphere`,(e,t)=>v(N(e,t)))),a.main.add(y`float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);
vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);
float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));
color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);`)),t.lineVerticalPlaneEnabled&&(a.uniforms.add(new E(`angleCutoff`,e=>M(e)),new O(`lineVerticalPlane`,(e,t)=>P(e,t)),new b(`lineVerticalStart`,(e,t)=>F(e,t)),new b(`lineVerticalEnd`,(e,t)=>I(e,t))),a.main.add(y`if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {
float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);
vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);
float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));
color = max(color, lineVerticalColor * lineVerticalAlpha);
}`)),t.intersectsLineEnabled&&(a.uniforms.add(new E(`angleCutoff`,e=>M(e)),new b(`intersectsLineStart`,(t,n)=>e(z,t.lineStartWorld,n.camera.viewMatrix)),new b(`intersectsLineEnd`,(t,n)=>e(z,t.lineEndWorld,n.camera.viewMatrix)),new b(`intersectsLineDirection`,(e,t)=>(p(B,e.intersectsLineSegment.vector),B[3]=0,r(z,i(B,B,t.camera.viewMatrix)))),new x(`intersectsLineRadius`,e=>e.intersectsLineRadius)),a.main.add(y`if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {
float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);
vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);
float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));
color = max(color, intersectsLineColor * intersectsLineAlpha);
}`)),a.main.add(y`fragColor = laserlineOutput(color * depthDiscontinuityAlpha);`),n}function M(e){return t(R,Math.cos(e.angleCutoff),Math.cos(Math.max(0,e.angleCutoff-f(2))))}function N(t,n){let r=e(G,t.pointDistanceOrigin,n.camera.viewMatrix),i=c(t.pointDistanceOrigin,t.pointDistanceTarget);return _(K,r,i)}function P(e,t){let n=S(e.lineVerticalPlaneSegment,.5,z),i=e.renderCoordsHelper.worldUpAtPosition(n,V),o=r(H,e.lineVerticalPlaneSegment.vector),s=a(z,i,o);return r(s,s),L(e.lineVerticalPlaneSegment.origin,s,t.camera.viewMatrix)}function F(t,n){let r=p(z,t.lineVerticalPlaneSegment.origin);return t.renderCoordsHelper.setAltitude(r,0),e(r,r,n.camera.viewMatrix)}function I(t,n){let r=u(z,t.lineVerticalPlaneSegment.origin,t.lineVerticalPlaneSegment.vector);return t.renderCoordsHelper.setAltitude(r,0),e(r,r,n.camera.viewMatrix)}function L(t,n,r){return e(U,t,r),p(B,n),B[3]=0,i(B,B,r),m(U,B,W)}var R=l(),z=n(),B=s(),V=n(),H=n(),U=n(),W=h(),G=n(),K=g(),q=Object.freeze(Object.defineProperty({__proto__:null,build:j,defaultAngleCutoff:A},Symbol.toStringTag,{value:`Module`}));export{q as n,A as r,j as t};