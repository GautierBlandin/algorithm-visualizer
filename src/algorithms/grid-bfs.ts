/*
Goal: code the bfs algorithm on a grid.
Steps :
1. Represent the grid --> The grid is n*m matrix of number, each number represent a possible state.
 */

export enum GridBfsState {
    EMPTY= 0,
    BLOCKED = 1,
    START = 2,
    TARGET = 3
}


