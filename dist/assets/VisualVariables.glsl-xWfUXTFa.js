import{n as e}from"./glsl-C2sn87h0.js";import{t}from"./Float3PassUniform-Co8OqiAU.js";import{t as n}from"./Float4PassUniform-Bo_mhcMi.js";import{n as r,r as i,t as a}from"./FloatsPassUniform-BT-ZsPj-.js";import{a as o}from"./AlphaCutoff-DTq90Si4.js";function s(t){t.code.add(e`struct MaskedColor {
vec4 color;
bvec4 mask;
};`)}function c(t){t.include(s),t.code.add(e`
    MaskedColor createMaskedFromUInt8NaNColor(vec4 color) {
      return MaskedColor(color * ${e.float(1/254)}, equal(color, vec4(255)));
    }
  `)}function l(t){t.include(s),t.code.add(e`vec4 maskedColorSelectOrOne(MaskedColor color) {
return vec4(
color.mask.r ? 1.0 : color.color.r,
color.mask.g ? 1.0 : color.color.g,
color.mask.b ? 1.0 : color.color.b,
color.mask.a ? 1.0 : color.color.a
);
}
MaskedColor multiplyMaskedColors(MaskedColor color1, MaskedColor color2) {
vec4 masked1 = maskedColorSelectOrOne(color1);
vec4 masked2 = maskedColorSelectOrOne(color2);
return MaskedColor(masked1 * masked2, bvec4(ivec4(color1.mask) & ivec4(color2.mask)));
}`)}function u(t){t.include(s),t.code.add(e`MaskedColor createMaskedFromNaNColor(vec4 color) {
return MaskedColor(color, isnan(color));
}`)}function d(i,c){let{vertex:d,attributes:f}=i;c.hasVVInstancing&&(c.hasVVSize||c.hasVVColor)&&f.add(`instanceFeatureAttribute`,`vec4`),c.hasVVSize?(d.uniforms.add(new t(`vvSizeMinSize`,e=>e.vvSize.minSize)),d.uniforms.add(new t(`vvSizeMaxSize`,e=>e.vvSize.maxSize)),d.uniforms.add(new t(`vvSizeOffset`,e=>e.vvSize.offset)),d.uniforms.add(new t(`vvSizeFactor`,e=>e.vvSize.factor)),d.uniforms.add(new t(`vvSizeFallback`,e=>e.vvSize.fallback)),d.uniforms.add(new o(`vvSymbolRotationMatrix`,e=>e.vvSymbolRotationMatrix)),d.uniforms.add(new t(`vvSymbolAnchor`,e=>e.vvSymbolAnchor)),d.code.add(e`vec3 vvScale(vec4 _featureAttribute) {
if (isnan(_featureAttribute.x)) {
return vvSizeFallback;
}
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),d.code.add(e`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 scale = max(vvScale(_featureAttribute), eps);
        return vec4(vvSymbolRotationMatrix * _normal / scale, 1.0);
      }

      ${c.hasVVInstancing?e`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:``}
    `)):d.code.add(e`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),i.vertex.include(s),c.hasVVColor?(d.constants.add(`vvColorNumber`,`int`,8),d.uniforms.add(new a(`vvColorValues`,e=>e.vvColor.values,8),new r(`vvColorColors`,e=>e.vvColor.colors,8),new n(`vvColorFallback`,e=>e.vvColor.fallback,{supportsNaN:!0})),c.hasVVInstancing&&(i.vertex.include(l),i.vertex.include(u)),d.code.add(e`
      vec4 interpolateVVColor(float value) {
        if (isnan(value)) {
          return vvColorFallback;
        }

        if (value <= vvColorValues[0]) {
          return vvColorColors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (vvColorValues[i] >= value) {
            float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
            return mix(vvColorColors[i-1], vvColorColors[i], f);
          }
        }
        return vvColorColors[vvColorNumber - 1];
      }

      vec4 vvGetColor(vec4 featureAttribute) {
        return interpolateVVColor(featureAttribute.y);
      }

      ${c.hasVVInstancing?e`
            vec4 vvColor() {
              return vvGetColor(instanceFeatureAttribute);
            }

            MaskedColor applyVVColor(MaskedColor color) {
              return multiplyMaskedColors(color, createMaskedFromNaNColor(vvColor()));
            }
            `:e`
            vec4 vvColor() {
              return vec4(1.0);
            }

            MaskedColor applyVVColor(MaskedColor color) {
              return color;
            }
            `}
    `)):d.code.add(e`vec4 vvColor() {
return vec4(1.0);
}
MaskedColor applyVVColor(MaskedColor color) {
return color;
}`)}export{s as a,u as i,l as n,c as r,d as t};