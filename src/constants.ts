import { EDirection, EDirectionLogic, ERotation } from "./types";

export const CommonColors = {
    white: '#ffffff',
    textLight: '#e8e5d4',
    text: '#405955',
    mild: '#c3d6d2',
    light: '#ef8c86',
    semiDark: '#508a7c',
    vacuumBg: '#8ebba7',
    dark: '#405955',
    errorBorder: '#e94c42'
} 

export const DIRECTION_LIST = [
    {
        value: EDirection.east,
        label: 'East'
    },
    {
        value: EDirection.west,
        label: 'West'
    },
    {
        value: EDirection.north,
        label: 'North'
    },
    {
        value: EDirection.south,
        label: 'South'
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