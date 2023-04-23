import React from 'react';
import { render, screen } from "@testing-library/react"
import { INITIAL_VALUES } from "../../constants"
import { EDirection, TVacuumPosition } from "../../types"
import { ActionBar } from "../ActionBar"

const mockPosition: TVacuumPosition = {
    placeX: 1,
    placeY: 1,
    direction: EDirection.south
}

describe('ActionBar Component', () => {
    test('render component', () => {
        const mockChangeFn = jest.fn()
        render(
            <ActionBar
                vacuumPosition={mockPosition}
                roomHeight={5}
                roomWidth={5}
                onChangeVacuumPosition={mockChangeFn}
                initialValues={INITIAL_VALUES} 
            />
        )
    })
})