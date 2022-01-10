import {keyframes} from "styled-components";

export function generateColorChangeTransition(initialColor: string, finalColor: string) {
    return keyframes`
        0% {
            background-color: ${initialColor};
        }

      33% {
        border-radius: 100px;
        transform: scale(0.5);
      }

      66% {
        border-radius: 100px;
        transform: scale(1.5);
      }

        100% {
            background-color: ${finalColor};
        }
    `
}
