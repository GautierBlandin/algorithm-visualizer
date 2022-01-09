import React from 'react';

export interface SingleSquareProps {
    color: string;
    borderColor: string;
    onClick?: () => void;
    size: number;
}

export default function SingleSquare({color, onClick, size, borderColor}: SingleSquareProps){
    return(
    <div onClick={onClick} className={'square'}>
        <style jsx>
            {`
                .square {
                background-color: ${color};
                height: ${size}px;
                width: ${size}px;
                ${borderColor ? `border: 1px solid ${borderColor};`: ''}
                ${onClick? `cursor: pointer;` : ''}
                }
            `}
        </style>
    </div>
    )

}
