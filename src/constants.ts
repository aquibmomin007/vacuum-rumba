import { EDirection, EDirectionLogic, ERotation } from "./types";

export const CommonColors = {
    text: '#405955',
    mild: '#c3d6d2',
    light: '#f2c7b6',
    semiDark: '#508a7c',
    vacuumBg: '#508a7c',
    dark: '#405955',
} 

export const DIRECTION_LIST = [
    {
        value: EDirection.north,
        label: 'North'
    },
    {
        value: EDirection.south,
        label: 'South'
    },
    {
        value: EDirection.east,
        label: 'East'
    },
    {
        value: EDirection.west,
        label: 'West'
    }
];

export const DIRECTION_LOGIC: EDirectionLogic = {
    [EDirection.north]: {
        [ERotation.left]: EDirection.west,
        [ERotation.right]: EDirection.east
    },
    [EDirection.south]: {
        [ERotation.left]: EDirection.east,
        [ERotation.right]: EDirection.west
    },
    [EDirection.west]: {
        [ERotation.left]: EDirection.south,
        [ERotation.right]: EDirection.north
    },
    [EDirection.east]: {
        [ERotation.left]: EDirection.north,
        [ERotation.right]: EDirection.south
    }
}

export const PLAYGROUND_HEIGHT = 5;
export const PLAYGROUND_WIDTH = 5;
export const PLAYGROUND_BOX_WIDTH = 800/5;

export const INITIAL_VALUES = {
    placeX: null,
    placeY: null,
    direction: EDirection.none
}