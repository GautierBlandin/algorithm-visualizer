export interface TransformingGrid{
    initialState: number[][];
    steps: Step[];
}

export interface Step{
    transformations: {
        newSquareState: number;
        row: number;
        col: number;
    }[];
}
