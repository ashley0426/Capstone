import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const PlaneIcon = (props: SvgProps) => (
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
            strokeWidth={1.5}
            d="M35.067 23.32 9.762 10.988 9.75 6.099 5.755 3.885a2.188 2.188 0 0 0-3.15 1.832l-.588 10.422a4.376 4.376 0 0 0 2.417 4.156l7.198 3.58-8.875 6.683c-1.291.98-1.105 2.975.344 3.7l3.742 1.854c.58.288 1.258.304 1.85.044l14.682-6.46L30.22 33.1c3.763 1.87 8.14-1.036 7.877-5.23a5.46 5.46 0 0 0-3.02-4.548h-.01Z"
        />
        <Path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m28.5 20.118-1.79-9.784a2.188 2.188 0 0 0-1.176-1.56l-3.685-1.827c-1.453-.716-3.154.34-3.155 1.961v6.432"
        />
    </Svg>
)
export default PlaneIcon
