import {useContext} from 'react';
import {GridRendererContext} from "./context/GridRenderer.context";

export interface SquareProps {
    color: string;
    hasRightBorder?: boolean;
    hasBottomBorder?: boolean;
}

export default function Square({color, hasRightBorder, hasBottomBorder}: SquareProps){
    const gridRendererContext = useContext(GridRendererContext)
    const borderColor = gridRendererContext.borderColor;

    return(
    <div>
        <style jsx>
            {`
                div {
                background-color: ${color};
                height: 100%;
                flex-grow: 1;
                border-top: 1px solid ${borderColor};
                border-left: 1px solid ${borderColor};
                ${hasRightBorder ? `border-right: 1px solid ${borderColor};` : ''}
                ${hasBottomBorder ? `border-bottom: 1px solid ${borderColor};` : ''}
                }
                }
            `}
        </style>
    </div>
    )
}

