import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const TrampolineIcon = (props: SvgProps) => (
    <Svg
        // xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        {...props}
    >
        <Path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.5}
            strokeWidth={1.5}
            d="M30.603 24.555c3.167.957 5.142 2.333 5.142 3.867 0 2.886-7.05 5.228-15.745 5.228S4.255 31.308 4.255 28.422c0-1.312 1.455-2.51 3.855-3.429M4.255 28.422v6.213M20 33.65v5.093M35.745 28.422V34M22.733 3.958a2.702 2.702 0 1 0 5.404 0 2.702 2.702 0 0 0-5.404 0Z"
        />
        <Path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.5}
            strokeWidth={1.5}
            d="M33.468 9.142a2.21 2.21 0 0 0-3.123.041 6.833 6.833 0 0 1-6.81 1.35 6.833 6.833 0 0 1-4.968-4.85 2.209 2.209 0 0 0-4.334.85c.619 2.744 2.3 5.13 4.677 6.634l-1.167 3.923a2.123 2.123 0 0 0-.578.388l-4.292 4.105a2.21 2.21 0 0 0 3.052 3.195l4.292-4.101c.093-.093.178-.193.255-.3l.251.075c.006.13.022.261.05.39l1.355 5.78a2.21 2.21 0 0 0 4.302-1.009l-1.355-5.78a2.182 2.182 0 0 0-.273-.641l1.166-3.924a10.597 10.597 0 0 0 7.544-3 2.205 2.205 0 0 0-.044-3.126Z"
        />
    </Svg>
)
export default TrampolineIcon
