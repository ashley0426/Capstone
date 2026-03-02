import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const DealIcon = (props: SvgProps) => (
    <Svg
        // xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        {...props}
    >
        <G
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.5}
            strokeWidth={1.5}
            clipPath="url(#a)"
        >
            <Path d="m26.25 19.6-3.867-3.867a2.15 2.15 0 0 0-3.333 0c-1.8 1.8 2.317 8.684.517 10.467a2.233 2.233 0 0 1-3.334 0L12.5 22.35M23.5 16.85l2.067-2.067M13.183 27.167 15.25 25.1M28 9.083a2.4 2.4 0 1 0 4.8 0 2.4 2.4 0 0 0-4.8 0Z" />
            <Path d="M36.167 1.25H20.55a2.617 2.617 0 0 0-1.883.817L2 19.85a2.549 2.549 0 0 0 .183 3.683L18.85 38.117a2.583 2.583 0 0 0 3.583-.184L38.05 21.267c.45-.472.7-1.099.7-1.75v-15.7a2.565 2.565 0 0 0-2.583-2.567Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h40v40H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default DealIcon
