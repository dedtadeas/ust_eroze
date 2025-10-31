import{n as e}from"./glsl-C2sn87h0.js";import{t}from"./FloatPassUniform-BEwJjV4q.js";import{t as n}from"./Texture2DPassUniform-Cd7cdF1a.js";import{t as r}from"./ShaderBuilder-C3C7fUwK.js";import{t as i}from"./HighlightCellGridScreenSpacePass.glsl-BA5GfPLV.js";import{t as a}from"./IntegerPassUniform-zyEEceJY.js";import{a as o,r as s,s as c}from"./HighlightDownsample.glsl-3CRIy9lA.js";import{t as l}from"./HighlightReadBitmap.glsl-DB3CoKpG.js";import{t as u}from"./Float2DrawUniform-BXYGUyM9.js";function d(){let s=new r;s.include(i);let{fragment:d}=s;return d.uniforms.add(new n(`blurInput`,e=>e.highlightBlurTexture),new u(`blurSize`,e=>e.blurSize),new c(`highlightTexture`,e=>e.highlightTexture),new n(`highlightOptionsTexture`,e=>e.highlightOptionsTexture),new a(`highlightLevel`,e=>e.highlightLevel),new t(`occludedIntensityFactor`,e=>e.occludedFactor)),d.constants.add(`inner`,`float`,1-(9-o)/9),s.include(l),d.main.add(e`vec2 highlightTextureSize = vec2(textureSize(highlightTexture,0));
vec2 uv = sUV;
vec2 center = texture(blurInput, uv).rg;
vec2 blurredHighlightValue = (vOutlinePossible == 0.0)
? center
: center * 0.204164
+ texture(blurInput, uv + blurSize * 1.407333).rg * 0.304005
+ texture(blurInput, uv - blurSize * 1.407333).rg * 0.304005
+ texture(blurInput, uv + blurSize * 3.294215).rg * 0.093913
+ texture(blurInput, uv - blurSize * 3.294215).rg * 0.093913;
float highlightIntensity = blurredHighlightValue.r;
float occlusionWeight = blurredHighlightValue.g;
if (highlightIntensity <= 0.01) {
discard;
}
vec4 fillColor    = texelFetch(highlightOptionsTexture, ivec2(highlightLevel, 0), 0);
vec4 outlineColor = texelFetch(highlightOptionsTexture, ivec2(highlightLevel, 1), 0);
uvec2 centerTexel = texelFetch(highlightTexture, ivec2(uv * highlightTextureSize), 0).rg;
uint centerBits = readLevelBits(centerTexel, highlightLevel);
bool centerFilled = (centerBits & 1u) == 1u;
bool centerOccluded = (centerBits & 3u) == 3u;
bool occluded = centerOccluded || (0.5 * highlightIntensity < occlusionWeight);
float occlusionFactor = occluded ? occludedIntensityFactor : 1.0;
float outlineFactor = centerFilled ? 1.0 : smoothstep(0.0, inner, highlightIntensity);
float fillFactor = centerFilled ? 1.0 : 0.0;
vec4 baseColor = mix(outlineColor, fillColor, fillFactor);
float intensity = baseColor.a * occlusionFactor * outlineFactor;
fragColor = vec4(baseColor.rgb, intensity);`),s}var f=Object.freeze(Object.defineProperty({__proto__:null,build:d},Symbol.toStringTag,{value:`Module`}));export{d as n,f as t};