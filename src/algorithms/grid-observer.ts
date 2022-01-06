import {Step, TransformingGrid} from "../types/transforming-grid";

export class GridObserver {
    /*
    The goal of the grid observer class is to return a transforming grid object at the end of the execution of
    a search algorithm.
     */
    private initialState: number[][];
    private steps: Step[];

    constructor() {
        this.initialState = [];
        this.steps = [];
    }

    public setInitialState(state: number[][]) {
        this.initialState = state;
    }

    public addStep(step: Step) {
        this.steps.push(step);
    }

    public getTransformingGrid(): TransformingGrid{
        return {
            initialState: this.initialState,
            steps: this.steps
        }
    }
}


