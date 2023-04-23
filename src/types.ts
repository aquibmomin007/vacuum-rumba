
export type TPlaygroundProps = {
    roomHeight: number;
    roomWidth: number;
    vacuumPosition: TVacuumPosition;
}

export type TVacuumPosition = {
    placeX: number | null;
    placeY: number | null;
    direction: EDirection;
}


export type TActionBarProps = {
    vacuumPosition: TVacuumPosition;
    onChangeVacuumPosition: (v: TVacuumPosition) => void;
    initialValues: TVacuumPosition;
    roomHeight: number;
    roomWidth: number;
}

export type EDirectionLogic = Partial<Record<EDirection, {
    [key in ERotation]: EDirection
}>>

export enum EDirection {
    north = 'north',
    south = 'south',
    east = 'east',
    west = 'west',
    none = ''
}

export enum ERotation {
    left = 'left',
    right = 'right'
}
