import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { generateColorChangeTransition } from "./color-transition-animation";

export interface SquareProps {
    state: React.MutableRefObject<number>;
    stateToColor: (state: number) => string;
    onClick?: () => void;
    onMouseDown?: () => void;
    onMouseEnter?: () => void;
}

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

export default function Square({
                                   state,
                                   stateToColor,
                                   onClick,
                                   onMouseDown,
                                   onMouseEnter,
                               }: SquareProps){
    const [backgroundColor, setBackgroundColor] = useState<string>(stateToColor(state.current));
    const [nextColor, setNextColor] = useState<string | undefined>(undefined);
    const [currentState, setCurrentState] = useState<number>(state.current);

    useEffect(() => {
        if(state.current !== currentState){
            if(nextColor) setBackgroundColor(nextColor);
            setNextColor(stateToColor(state.current))
        }
        setCurrentState(state.current);
    }, [state.current]);

    return(
        <SquareDiv
            color = {backgroundColor}
            nextColor = {nextColor}
            animationDurationMs={300}
            onMouseDown = {() => {if(onMouseDown){onMouseDown();}}}
            onMouseEnter = {() => { if(onMouseEnter) { onMouseEnter();}}}
            onClick = {onClick}
        />
    )
}
