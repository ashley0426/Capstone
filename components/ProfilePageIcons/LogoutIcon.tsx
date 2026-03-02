import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const LogoutIcon = (props: SvgProps) => (
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
      <Path d="M23.25 12.004H7.5M11.25 15.754l-3.75-3.75 3.75-3.75" />
      <Path d="M15.75 16.5V21a1.437 1.437 0 0 1-1.364 1.5H2.113A1.437 1.437 0 0 1 .75 21V3a1.436 1.436 0 0 1 1.363-1.5h12.273A1.437 1.437 0 0 1 15.75 3v4.5" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default LogoutIcon
