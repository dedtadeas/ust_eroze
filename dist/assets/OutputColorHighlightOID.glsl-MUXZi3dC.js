import{h as e,t,u as n}from"./Emissions.glsl-DaTtsIIp.js";import{n as r,t as i}from"./glsl-C2sn87h0.js";import{i as a,n as o,t as s}from"./AlphaCutoff-DTq90Si4.js";function c(c,l){c.include(o,l),c.include(t,l),c.fragment.include(a);let{output:u,oitPass:d,discardInvisibleFragments:f,snowCover:p}=l,m=u===10,h=n(u),g=e(u)&&d===1,_=e(u)&&d!==1,v=0;(_||h||g)&&c.outputs.add(`fragColor`,`vec4`,v++),h&&c.outputs.add(`fragEmission`,`vec4`,v++),g&&c.outputs.add(`fragAlpha`,`float`,v++),c.fragment.code.add(r`
    void outputColorHighlightOID(vec4 finalColor, const in vec3 vWorldPosition, vec3 emissiveSymbolColor ${i(p,`, float snow`)}) {
      ${i(m,`finalColor.a = 1.0;`)}

      ${i(f,`if (finalColor.a < ${r.float(s)}) { discard; }`)}

      finalColor = applySlice(finalColor, vWorldPosition);
      ${i(g,r`fragColor = premultiplyAlpha(finalColor);
             fragAlpha = finalColor.a;`)}
      ${i(_,`fragColor = finalColor;`)}
      ${i(h,`fragEmission = ${i(p,`mix(finalColor.a * getEmissions(emissiveSymbolColor), vec4(0.0), snow);`,`finalColor.a * getEmissions(emissiveSymbolColor);`)}`)}
      calculateOcclusionAndOutputHighlight();
      ${i(m,`outputObjectAndLayerIdColor();`)}
    }
  `)}export{c as t};