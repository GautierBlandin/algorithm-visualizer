import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import {generateColorChangeTransition} from "./color-transition-animation";

interface SquareDivProps {
    color: string;
    nextColor: string | undefined;
    animationDurationMs: number;
}

const SquareDiv = styled.div<SquareDivProps>`
  flex-grow: 1;
  background-color: ${props => props.color};
  border-left: 1px solid black;
  animation: ${({color, nextColor}) => {if (nextColor && (nextColor !== color)){
    return generateColorChangeTransition(color, nextColor)
  } else {
    return 'none'
  }
  }} ${({animationDurationMs}) => animationDurationMs}ms both;
  &:last-child {
    border-right: 1px solid black;
  }
`

export interface SquareProps {
    state: number;
    stateToColor: (state: number) => string;
    onClick?: () => void;
    onMouseDown?: () => void;
    onMouseEnter?: () => void;
}

export default function Square({
    state,
    stateToColor,
    onClick,
    onMouseDown,
    onMouseEnter,
}: SquareProps){
    const [backgroundColor, setBackgroundColor] = useState<string>(stateToColor(state));
    const [nextColor, setNextColor] = useState<string | undefined>(undefined);
    const [currentState, setCurrentState] = useState<number>(state);

    useEffect(() => {
        if(state !== currentState){
            if(nextColor) setBackgroundColor(nextColor);
            setNextColor(stateToColor(state))
        }
        setCurrentState(state);
    }, [state]);

    return(
        <SquareDiv // Styled component
            color = {backgroundColor}
            nextColor = {nextColor}
            animationDurationMs={300}
            onMouseDown = {() => {if(onMouseDown){onMouseDown();}}}
            onMouseEnter = {() => {if(onMouseEnter) {onMouseEnter(); }}}
            onClick = {onClick}
        />
    )
}
