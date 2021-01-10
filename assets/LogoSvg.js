import * as React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

function LogoSvg(props) {
  return (
    <Svg xmlns='http://www.w3.org/2000/svg' viewBox='-10 -10 50 50' width={66} height={66} fill='url(#gradient)' {...props}>
      <Defs>
        <LinearGradient gradientTransform='rotate(25)' id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
          <Stop offset='0%' stopColor='#b6b6b6' />
          <Stop offset='100%' stopColor='#ddd' />
        </LinearGradient>
      </Defs>
      <Path d='M9.382 8.675h13.943v13.943L32 31.293V0H.707zm13.236 14.65H8.675V9.382L0 .707V32h31.293z' />
    </Svg>
  );
}

export default LogoSvg;
