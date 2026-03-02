import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SmartLivingHouseIcon = (props: SvgProps) => (
    <Svg
        // xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        {...props}
    >
        <Path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.88 22.79v13.667a1.137 1.137 0 0 0 1.19 1.073h17.86a1.136 1.136 0 0 0 1.19-1.073V22.79"
        />
        <Path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6.143 26.493 20 12.665l13.857 13.828M16.563 28.62h6.322v8.913h-6.322V28.62ZM20 2.467v3.82M1.25 20.142h3.82M5.932 8.318l3.4 2.827M38.75 20.142h-3.82M34.068 8.318l-3.4 2.827"
        />
    </Svg>
)
export default SmartLivingHouseIcon
