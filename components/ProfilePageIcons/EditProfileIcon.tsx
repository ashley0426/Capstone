import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const EditProfilePageIcon = (props: SvgProps) => (
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
        <Path d="M22.63 14.868 15 22.5l-3.75.75.75-3.75 7.63-7.632a2.116 2.116 0 0 1 2.992 0l.008.01a2.115 2.115 0 0 1 0 2.99ZM3.375 4.875a4.125 4.125 0 1 0 8.25 0 4.125 4.125 0 0 0-8.25 0ZM13.338 13.919A6.729 6.729 0 0 0 .75 17.249" />
    </G>
    <Defs>
        <ClipPath id="a">
            <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
    </Defs>
    </Svg>
)
export default EditProfilePageIcon
