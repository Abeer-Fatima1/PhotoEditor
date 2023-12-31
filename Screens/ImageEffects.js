import React from 'react';
import PropTypes from 'prop-types';
import { GLSL, Shaders, Node } from 'gl-react';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

const shaders = Shaders.create({
  Brannan: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      uniform sampler2D inputImageTexture5;
      uniform sampler2D inputImageTexture6;
      mat3 saturateMatrix = mat3(
                                1.105150,
                                -0.044850,
                                -0.046000,
                                -0.088050,
                                1.061950,
                                -0.089200,
                                -0.017100,
                                -0.017100,
                                1.132900);
      vec3 luma = vec3(.3, .59, .11);
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec2 lookup;
        lookup.y = 0.5;
        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture2, lookup).r;
        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture2, lookup).g;
        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture2, lookup).b;
        texel = saturateMatrix * texel;
        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        vec3 sampled;
        lookup.y = 0.5;
        lookup.x = texel.r;
        sampled.r = texture2D(inputImageTexture3, lookup).r;
        lookup.x = texel.g;
        sampled.g = texture2D(inputImageTexture3, lookup).g;
        lookup.x = texel.b;
        sampled.b = texture2D(inputImageTexture3, lookup).b;
        float value = smoothstep(0.0, 1.0, d);
        texel = mix(sampled, texel, value);
        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture4, lookup).r;
        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture4, lookup).g;
        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture4, lookup).b;
        lookup.x = dot(texel, luma);
        texel = mix(texture2D(inputImageTexture5, lookup).rgb, texel, .5);
        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture6, lookup).r;
        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture6, lookup).g;
        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture6, lookup).b;
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export const Brannan = ({ children: t }) =>
  (<Node
    shader={shaders.Brannan}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/brannanProcess.png')),
      inputImageTexture3: resolveAssetSource(require('../resources/brannanBlowout.png')),
      inputImageTexture4: resolveAssetSource(require('../resources/brannanContrast.png')),
      inputImageTexture5: resolveAssetSource(require('../resources/brannanLuma.png')),
      inputImageTexture6: resolveAssetSource(require('../resources/brannanScreen.png'))
    }}
  />);

Brannan.propTypes = {
  children: PropTypes.object.isRequired
};


const shaders1 = Shaders.create({
  Valencia: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      mat3 saturateMatrix = mat3(
                                1.1402,
                                -0.0598,
                                -0.061,
                                -0.1174,
                                1.0826,
                                -0.1186,
                                -0.0228,
                                -0.0228,
                                1.1772);
      vec3 lumaCoeffs = vec3(.3, .59, .11);
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .8333333)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .1666666)).b
                    );
        texel = saturateMatrix * texel;
        float luma = dot(lumaCoeffs, texel);
        texel = vec3(
                    texture2D(inputImageTexture3, vec2(luma, (1.0-texel.r))).r,
                    texture2D(inputImageTexture3, vec2(luma, (1.0-texel.g))).g,
                    texture2D(inputImageTexture3, vec2(luma, (1.0-texel.b))).b);
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export const Valencia = ({ children: t }) =>
  (<Node
    shader={shaders1.Valencia}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/valenciaMap.png')),
      inputImageTexture3: resolveAssetSource(require('../resources/valenciaGradientMap.png'))
    }}
  />);

Valencia.propTypes = {
  children: PropTypes.object.isRequired
};

const shaders2 = Shaders.create({
  Amaro: {
    frag: GLSL`
      precision highp float;
      varying highp vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      void main () {
        vec4 texel = texture2D(inputImageTexture, uv);
        vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;
        texel.r = texture2D(inputImageTexture3, vec2(bbTexel.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(bbTexel.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture3, vec2(bbTexel.b, (1.0-texel.b))).b;
        vec4 mapped;
        mapped.r = texture2D(inputImageTexture4, vec2(texel.r, .83333)).r;
        mapped.g = texture2D(inputImageTexture4, vec2(texel.g, .5)).g;
        mapped.b = texture2D(inputImageTexture4, vec2(texel.b, .16666)).b;
        mapped.a = 1.0;
        gl_FragColor = mapped;
      }`
  }
});

export const Amaro = ({ children: t }) =>
  (<Node
    shader={shaders2.Amaro}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/blackboard1024.png')),
      inputImageTexture3: resolveAssetSource(require('../resources/overlayMap.png')),
      inputImageTexture4: resolveAssetSource(require('../resources/amaroMap.png'))
    }}
  />);

Amaro.propTypes = {
  children: PropTypes.object.isRequired
};

const shaders3 = Shaders.create({
  Earlybird: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      uniform sampler2D inputImageTexture5;
      uniform sampler2D inputImageTexture6;
      const mat3 saturate = mat3(
                                1.210300,
                                -0.089700,
                                -0.091000,
                                -0.176100,
                                1.123900,
                                -0.177400,
                                -0.034200,
                                -0.034200,
                                1.265800);
      const vec3 rgbPrime = vec3(0.25098, 0.14640522, 0.0);
      const vec3 desaturate = vec3(.3, .59, .11);
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec2 lookup;
        lookup.y = 0.5;
        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture2, lookup).r;
        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture2, lookup).g;
        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture2, lookup).b;
        float desaturatedColor;
        vec3 result;
        desaturatedColor = dot(desaturate, texel);
        lookup.x = desaturatedColor;
        result.r = texture2D(inputImageTexture3, lookup).r;
        lookup.x = desaturatedColor;
        result.g = texture2D(inputImageTexture3, lookup).g;
        lookup.x = desaturatedColor;
        result.b = texture2D(inputImageTexture3, lookup).b;
        texel = saturate * mix(texel, result, .5);
        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        vec3 sampled;
        lookup.y = .5;
        /*
        lookup.x = texel.r;
        sampled.r = texture2D(inputImageTexture4, lookup).r;
        lookup.x = texel.g;
        sampled.g = texture2D(inputImageTexture4, lookup).g;
        lookup.x = texel.b;
        sampled.b = texture2D(inputImageTexture4, lookup).b;
        float value = smoothstep(0.0, 1.25, pow(d, 1.35)/1.65);
        texel = mix(texel, sampled, value);
        */
        //---
        texel.r = texture2D(inputImageTexture4, vec2(d, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture4, vec2(d, (1.0-texel.g))).g;
        texel.b  = texture2D(inputImageTexture4, vec2(d, (1.0-texel.b))).b;
        float value = smoothstep(0.0, 1.25, pow(d, 1.35)/1.65);
        //---
        lookup.x = texel.r;
        sampled.r = texture2D(inputImageTexture5, lookup).r;
        lookup.x = texel.g;
        sampled.g = texture2D(inputImageTexture5, lookup).g;
        lookup.x = texel.b;
        sampled.b = texture2D(inputImageTexture5, lookup).b;
        texel = mix(sampled, texel, value);
        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture6, lookup).r;
        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture6, lookup).g;
        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture6, lookup).b;
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export const Earlybird = ({ children: t }) =>
  (<Node
    shader={shaders3.Earlybird}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/earlyBirdCurves.png')),
      inputImageTexture3: resolveAssetSource(require('../resources/earlybirdOverlayMap.png')),
      inputImageTexture4: resolveAssetSource(require('../resources/vignetteMap.png')),
      inputImageTexture5: resolveAssetSource(require('../resources/earlybirdBlowout.png')),
      inputImageTexture6: resolveAssetSource(require('../resources/earlybirdMap.png'))
    }}
  />);

Earlybird.propTypes = {
  children: PropTypes.object.isRequired
};

const shaders4 = Shaders.create({
  F1977: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .16666)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .83333)).b);
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export const F1977 = ({ children: t }) =>
  (<Node
    shader={shaders4.F1977}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/1977map.png'))
    }}
  />);

F1977.propTypes = {
  children: PropTypes.object.isRequired
};


const shaders6 = Shaders.create({
  Hudson: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      void main () {
        vec4 texel = texture2D(inputImageTexture, uv);
        vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;
        texel.r = texture2D(inputImageTexture3, vec2(bbTexel.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(bbTexel.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture3, vec2(bbTexel.b, (1.0-texel.b))).b;
        vec4 mapped;
        mapped.r = texture2D(inputImageTexture4, vec2(texel.r, .83333)).r;
        mapped.g = texture2D(inputImageTexture4, vec2(texel.g, .5)).g;
        mapped.b = texture2D(inputImageTexture4, vec2(texel.b, .16666)).b;
        mapped.a = 1.0;
        gl_FragColor = mapped;
      }`
  }
});

export const Hudson = ({ children: t }) =>
  (<Node
    shader={shaders6.Hudson}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/hudsonBackground.png')),
      inputImageTexture3: resolveAssetSource(require('../resources/overlayMap.png')),
      inputImageTexture4: resolveAssetSource(require('../resources/hudsonMap.png'))
    }}
  />);

Hudson.propTypes = {
  children: PropTypes.object.isRequired
};

const shaders7 = Shaders.create({
  Inkwell: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(dot(vec3(0.3, 0.6, 0.1), texel));
        texel = vec3(texture2D(inputImageTexture2, vec2(texel.r, .83333)).r);
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export const Inkwell = ({ children: t }) =>
  (<Node
    shader={shaders7.Inkwell}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/inkwellMap.png'))
    }}
  />);

Inkwell.propTypes = {
  children: PropTypes.object.isRequired
};


const shaders8 = Shaders.create({
  Lokofi: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec2 red = vec2(texel.r, 0.83333);
        vec2 green = vec2(texel.g, 0.5);
        vec2 blue = vec2(texel.b, 0.16666);
        texel.rgb = vec3(
              texture2D(inputImageTexture2, red).r,
              texture2D(inputImageTexture2, green).g,
              texture2D(inputImageTexture2, blue).b);
        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        texel.r = texture2D(inputImageTexture3, vec2(d, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(d, (1.0-texel.g))).g;
        texel.b  = texture2D(inputImageTexture3, vec2(d, (1.0-texel.b))).b;
        gl_FragColor = vec4(texel,1.0);
      }`
  }
});

export const Lokofi = ({ children: t }) =>
  (<Node
    shader={shaders8.Lokofi}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/lomoMap.png')),
      inputImageTexture3: resolveAssetSource(require('../resources/vignetteMap.png'))
    }}
  />);

Lokofi.propTypes = {
  children: PropTypes.object.isRequired
};


const shaders9 = Shaders.create({
  LordKelvin: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec2 lookup;
        lookup.y = .5;
        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture2, lookup).r;
        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture2, lookup).g;
        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture2, lookup).b;
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export const LordKelvin = ({ children: t }) =>
  (<Node
    shader={shaders9.LordKelvin}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/kelvinMap.png'))
    }}
  />);

LordKelvin.propTypes = {
  children: PropTypes.object.isRequired
};


const shaders10 = Shaders.create({
  Nashville: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .83333)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .16666)).b);
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export const Nashville = ({ children: t }) =>
  (<Node
    shader={shaders10.Nashville}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/nashvilleMap.png'))
    }}
  />);

Nashville.propTypes = {
  children: PropTypes.object.isRequired
};

const shaders11 = Shaders.create({
  Normal: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export const Normal = ({ children: t }) =>
  (<Node
    shader={shaders11.Normal}
    uniforms={{
      inputImageTexture: t
    }}
  />);

Normal.propTypes = {
  children: PropTypes.object.isRequired
};

const shaders12 = Shaders.create({
  Rise: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      void main () {
        vec4 texel = texture2D(inputImageTexture, uv);
        vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;
        texel.r = texture2D(inputImageTexture3, vec2(bbTexel.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(bbTexel.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture3, vec2(bbTexel.b, (1.0-texel.b))).b;
        vec4 mapped;
        mapped.r = texture2D(inputImageTexture4, vec2(texel.r, .83333)).r;
        mapped.g = texture2D(inputImageTexture4, vec2(texel.g, .5)).g;
        mapped.b = texture2D(inputImageTexture4, vec2(texel.b, .16666)).b;
        mapped.a = 1.0;
        gl_FragColor = mapped;
      }`
  }
});

export const Rise = ({ children: t }) =>
  (<Node
    shader={shaders12.Rise}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/blackboard1024.png')),
      inputImageTexture3: resolveAssetSource(require('../resources/overlayMap.png')),
      inputImageTexture4: resolveAssetSource(require('../resources/riseMap.png'))
    }}
  />);

Rise.propTypes = {
  children: PropTypes.object.isRequired
};


const shaders13 = Shaders.create({
  Sierra: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      void main () {
        vec4 texel = texture2D(inputImageTexture, uv);
        vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;
        texel.r = texture2D(inputImageTexture3, vec2(bbTexel.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(bbTexel.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture3, vec2(bbTexel.b, (1.0-texel.b))).b;
        vec4 mapped;
        mapped.r = texture2D(inputImageTexture4, vec2(texel.r, .83333)).r;
        mapped.g = texture2D(inputImageTexture4, vec2(texel.g, .5)).g;
        mapped.b = texture2D(inputImageTexture4, vec2(texel.b, .16666)).b;
        mapped.a = 1.0;
        gl_FragColor = mapped;
      }`
  }
});

export const Sierra = ({ children: t }) =>
  (<Node
    shader={shaders13.Sierra}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/sierraVignette.png')),
      inputImageTexture3: resolveAssetSource(require('../resources/overlayMap.png')),
      inputImageTexture4: resolveAssetSource(require('../resources/sierraMap.png'))
    }}
  />);

Sierra.propTypes = {
  children: PropTypes.object.isRequired
};



const shaders14 = Shaders.create({
  Sutro: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      uniform sampler2D inputImageTexture5;
      uniform sampler2D inputImageTexture6;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        texel.r = texture2D(inputImageTexture2, vec2(d, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture2, vec2(d, (1.0-texel.g))).g;
        texel.b  = texture2D(inputImageTexture2, vec2(d, (1.0-texel.b))).b;
        vec3 rgbPrime = vec3(0.1019, 0.0, 0.0);
        float m = dot(vec3(.3, .59, .11), texel.rgb) - 0.03058;
        texel = mix(texel, rgbPrime + m, 0.32);
        vec3 metal = texture2D(inputImageTexture3, uv).rgb;
        texel.r = texture2D(inputImageTexture4, vec2(metal.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture4, vec2(metal.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture4, vec2(metal.b, (1.0-texel.b))).b;
        texel = texel * texture2D(inputImageTexture5, uv).rgb;
        texel.r = texture2D(inputImageTexture6, vec2(texel.r, .83333)).r;
        texel.g = texture2D(inputImageTexture6, vec2(texel.g, .5)).g;
        texel.b = texture2D(inputImageTexture6, vec2(texel.b, .16666)).b;
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export const Sutro = ({ children: t }) =>
  (<Node
    shader={shaders14.Sutro}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/vignetteMap.png')),
      inputImageTexture3: resolveAssetSource(require('../resources/sutroMetal.png')),
      inputImageTexture4: resolveAssetSource(require('../resources/softLight.png')),
      inputImageTexture5: resolveAssetSource(require('../resources/sutroEdgeBurn.png')),
      inputImageTexture6: resolveAssetSource(require('../resources/sutroCurves.png'))
    }}
  />);

Sutro.propTypes = {
  children: PropTypes.object.isRequired
};


const shaders15 = Shaders.create({
  Toaster: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      uniform sampler2D inputImageTexture5;
      uniform sampler2D inputImageTexture6;
      void main () {
        lowp vec3 texel;
        mediump vec2 lookup;
        vec2 blue;
        vec2 green;
        vec2 red;
        lowp vec4 tmpvar_1;
        tmpvar_1 = texture2D (inputImageTexture, uv);
        texel = tmpvar_1.xyz;
        lowp vec4 tmpvar_2;
        tmpvar_2 = texture2D (inputImageTexture2, uv);
        lowp vec2 tmpvar_3;
        tmpvar_3.x = tmpvar_2.x;
        tmpvar_3.y = tmpvar_1.x;
        texel.x = texture2D (inputImageTexture3, tmpvar_3).x;
        lowp vec2 tmpvar_4;
        tmpvar_4.x = tmpvar_2.y;
        tmpvar_4.y = tmpvar_1.y;
        texel.y = texture2D (inputImageTexture3, tmpvar_4).y;
        lowp vec2 tmpvar_5;
        tmpvar_5.x = tmpvar_2.z;
        tmpvar_5.y = tmpvar_1.z;
        texel.z = texture2D (inputImageTexture3, tmpvar_5).z;
        red.x = texel.x;
        red.y = 0.16666;
        green.x = texel.y;
        green.y = 0.5;
        blue.x = texel.z;
        blue.y = 0.833333;
        texel.x = texture2D (inputImageTexture4, red).x;
        texel.y = texture2D (inputImageTexture4, green).y;
        texel.z = texture2D (inputImageTexture4, blue).z;
        mediump vec2 tmpvar_6;
        tmpvar_6 = ((2.0 * uv) - 1.0);
        mediump vec2 tmpvar_7;
        tmpvar_7.x = dot (tmpvar_6, tmpvar_6);
        tmpvar_7.y = texel.x;
        lookup = tmpvar_7;
        texel.x = texture2D (inputImageTexture5, tmpvar_7).x;
        lookup.y = texel.y;
        texel.y = texture2D (inputImageTexture5, lookup).y;
        lookup.y = texel.z;
        texel.z = texture2D (inputImageTexture5, lookup).z;
        red.x = texel.x;
        green.x = texel.y;
        blue.x = texel.z;
        texel.x = texture2D (inputImageTexture6, red).x;
        texel.y = texture2D (inputImageTexture6, green).y;
        texel.z = texture2D (inputImageTexture6, blue).z;
        lowp vec4 tmpvar_8;
        tmpvar_8.w = 1.0;
        tmpvar_8.xyz = texel;
        gl_FragColor = tmpvar_8;
      }`
  }
});

export const Toaster = ({ children: t }) =>
  (<Node
    shader={shaders15.Toaster}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/toasterMetal.png')),
      inputImageTexture3: resolveAssetSource(require('../resources/toasterSoftLight.png')),
      inputImageTexture4: resolveAssetSource(require('../resources/toasterCurves.png')),
      inputImageTexture5: resolveAssetSource(require('../resources/toasterOverlayMapWarm.png')),
      inputImageTexture6: resolveAssetSource(require('../resources/toasterColorShift.png'))
    }}
  />);

Toaster.propTypes = {
  children: PropTypes.object.isRequired
};



const shaders16 = Shaders.create({
  Walden: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .83333)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .16666)).b);
        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        texel.r = texture2D(inputImageTexture3, vec2(d, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(d, (1.0-texel.g))).g;
        texel.b  = texture2D(inputImageTexture3, vec2(d, (1.0-texel.b))).b;
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export const Walden = ({ children: t }) =>
  (<Node
    shader={shaders16.Walden}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/waldenMap.png')),
      inputImageTexture3: resolveAssetSource(require('../resources/vignetteMap.png'))
    }}
  />);

Walden.propTypes = {
  children: PropTypes.object.isRequired
};


const shaders17 = Shaders.create({
  XproII: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        texel.r = texture2D(inputImageTexture3, vec2(d, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(d, (1.0-texel.g))).g;
        texel.b  = texture2D(inputImageTexture3, vec2(d, (1.0-texel.b))).b;
        texel.r = texture2D(inputImageTexture2, vec2(texel.r, .83333)).r;
        texel.g = texture2D(inputImageTexture2, vec2(texel.g, .5)).g;
        texel.b = texture2D(inputImageTexture2, vec2(texel.b, .16666)).b;
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export const XproII = ({ children: t }) =>
  (<Node
    shader={shaders17.XproII}
    uniforms={{
      inputImageTexture: t,
      inputImageTexture2: resolveAssetSource(require('../resources/xproMap.png')),
      inputImageTexture3: resolveAssetSource(require('../resources/vignetteMap.png'))
    }}
  />);

XproII.propTypes = {
  children: PropTypes.object.isRequired
};









