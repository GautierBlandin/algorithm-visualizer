import React, { useEffect, useState } from 'react';
import styled from "styled-components";

export interface SquareProps {
    state: number;
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
    state,
    stateToColor,
    onClick,
    onMouseDown,
    onMouseEnter
}: SquareProps){
    const [backgroundColor, setBackgroundColor] = useState<string>(stateToColor(state));

    useEffect(() => {
        setBackgroundColor(stateToColor(state));
    }, [state]);

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
