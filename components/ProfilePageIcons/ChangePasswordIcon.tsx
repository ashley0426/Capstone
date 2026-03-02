import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const ChangePasswordIcon = (props: SvgProps) => (
  <Svg
    //xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <Path d="M22.19 1.81a3.638 3.638 0 0 0-5.169.035l-14.5 14.5L.75 23.25l6.905-1.77 14.5-14.5a3.639 3.639 0 0 0 .035-5.17ZM16.606 2.26l5.134 5.134M14.512 4.354l5.134 5.134M2.521 16.346l5.139 5.129" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ChangePasswordIcon
