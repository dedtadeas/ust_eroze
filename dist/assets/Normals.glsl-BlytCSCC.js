import{vD as e}from"./index-BqmCqmfp.js";import{n as t}from"./glsl-C2sn87h0.js";function n(n,r){let i=n.fragment;switch(i.code.add(t`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),r.doubleSidedMode){case 0:i.code.add(t`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case 1:i.code.add(t`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case 2:i.code.add(t`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:e(r.doubleSidedMode);case 3:}}export{n as t};