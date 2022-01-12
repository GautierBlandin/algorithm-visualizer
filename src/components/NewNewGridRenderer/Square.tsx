import React, { useEffect, useState } from 'react';
import styled from "styled-components";

export interface SquareProps {
    stateRef: React.MutableRefObject<number>;
    stateToColor: (state: number) => string;
    onClick?: () => void;
    onMouseDown?: () => void;
    onMouseEnter?: () => void;
}

interface SquareDivProps {
    color: string;
}

const SquareDiv = styled.div<SquareDivProps>`
  flex-grow: 1;
  background-color: ${props => props.color};
  border-left: 1px solid black;
  &:last-child {
    border-right: 1px solid black;
  }
`

export default function Square({
    stateRef,
    stateToColor,
    onClick,
    onMouseDown,
    onMouseEnter
}: SquareProps){
    const [backgroundColor, setBackgroundColor] = useState<string>(stateToColor(stateRef.current));

    useEffect(() => {
        setBackgroundColor(stateToColor(stateRef.current));
    }, [stateRef.current]);

    return(
        <SquareDiv
            color = {backgroundColor}
            onMouseDown = {onMouseDown}
            onMouseEnter = {() => {console.log("mouse entered");
            if(onMouseEnter) onMouseEnter()}}
            onClick = {onClick}
        />
    )
}
