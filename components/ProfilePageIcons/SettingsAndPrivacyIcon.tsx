import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const SettingsAndPrivacyIcon = (props: SvgProps) => (
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
      <Path d="M10.546 2.438a1.957 1.957 0 0 0 2.908 0L14.4 1.4a1.959 1.959 0 0 1 3.41 1.413l-.071 1.4a1.958 1.958 0 0 0 2.051 2.054l1.4-.071a1.96 1.96 0 0 1 1.41 3.41l-1.042.94a1.96 1.96 0 0 0 0 2.909l1.042.94a1.96 1.96 0 0 1-1.413 3.41l-1.4-.072a1.96 1.96 0 0 0-2.056 2.056l.071 1.4A1.96 1.96 0 0 1 14.4 22.6l-.941-1.04a1.96 1.96 0 0 0-2.908 0l-.945 1.04A1.96 1.96 0 0 1 6.2 21.192l.072-1.4a1.958 1.958 0 0 0-2.056-2.057l-1.4.072A1.958 1.958 0 0 1 1.4 14.4l1.041-.94a1.959 1.959 0 0 0 0-2.91L1.4 9.607A1.958 1.958 0 0 1 2.809 6.2l1.4.07a1.958 1.958 0 0 0 2.058-2.06L6.2 2.81A1.959 1.959 0 0 1 9.606 1.4l.94 1.038Z" />
      <Path d="M7.5 12.002a4.5 4.5 0 1 0 9 0 4.5 4.5 0 0 0-9 0Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SettingsAndPrivacyIcon
