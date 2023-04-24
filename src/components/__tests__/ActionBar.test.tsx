import { act, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { INITIAL_VALUES } from "../../constants"
import { EDirection, TVacuumPosition } from "../../types"
import { ActionBar } from "../ActionBar"

describe('ActionBar Component', () => {
    test('place vacuum', async () => {
        const mockChangeFn = jest.fn()
        const mockReachEndFn = jest.fn()

        act(() => {
            render(
                <ActionBar
                    vacuumPosition={INITIAL_VALUES}
                    roomHeight={5}
                    roomWidth={5}
                    onChangeVacuumPosition={mockChangeFn}
                    initialValues={INITIAL_VALUES}
                    onReachedEdge={mockReachEndFn}
                />
            )
        })

        const xPos = "1"
        const yPos = "2"

        const user = userEvent.setup()

        const btnPlace = screen.getByTestId("btn-place")
        expect(btnPlace).toBeDisabled()

        const placeXInput = screen.getByTestId("placeX").querySelector("input") as HTMLInputElement
        await user.type(placeXInput, xPos)

        const placeYInput = screen.getByTestId("placeY").querySelector("input") as HTMLInputElement
        await user.type(placeYInput, yPos)

        const selectDirection = screen.getByTestId("direction")
        await user.click(within(selectDirection).getByRole("button"))

        const listbox = within(screen.getByRole('presentation')).getByRole('listbox');
        const options = within(listbox).getAllByRole('option');
        await user.click(options[0])

        expect(btnPlace).not.toBeDisabled()

        await user.click(btnPlace)

        expect(mockChangeFn).toHaveBeenCalledWith({
            direction: EDirection.east,
            placeX: +xPos,
            placeY: +yPos
        })
    })

    test('reset', async () => {
        const mockChangeFn = jest.fn()
        const mockReachEndFn = jest.fn()

        act(() => {
            render(
                <ActionBar
                    vacuumPosition={INITIAL_VALUES}
                    roomHeight={5}
                    roomWidth={5}
                    onChangeVacuumPosition={mockChangeFn}
                    initialValues={INITIAL_VALUES}
                    onReachedEdge={mockReachEndFn}
                />
            )
        })

        const xPos = "1"
        const yPos = "2"

        const user = userEvent.setup()

        const btnPlace = screen.getByTestId("btn-place")
        expect(btnPlace).toBeDisabled()

        const placeXInput = screen.getByTestId("placeX").querySelector("input") as HTMLInputElement
        await user.type(placeXInput, xPos)

        const placeYInput = screen.getByTestId("placeY").querySelector("input") as HTMLInputElement
        await user.type(placeYInput, yPos)

        const selectDirection = screen.getByTestId("direction")
        await user.click(within(selectDirection).getByRole("button"))

        const listbox = within(screen.getByRole('presentation')).getByRole('listbox');
        const options = within(listbox).getAllByRole('option');
        await user.click(options[0])

        expect(btnPlace).not.toBeDisabled()

        const btnReset = screen.getByTestId("btn-reset")
        await user.click(btnReset)

        expect(mockChangeFn).toHaveBeenCalledWith(INITIAL_VALUES)

        expect(btnPlace).toBeDisabled()
    })

    test('move vacuum', async () => {
        const mockChangeFn = jest.fn()
        const mockReachEndFn = jest.fn()

        const { rerender } = render(
            <ActionBar
                vacuumPosition={INITIAL_VALUES}
                roomHeight={5}
                roomWidth={5}
                onChangeVacuumPosition={mockChangeFn}
                initialValues={INITIAL_VALUES}
                onReachedEdge={mockReachEndFn}
            />
        )

        const xPos = "1"
        const yPos = "2"

        const user = userEvent.setup()

        const btnPlace = screen.getByTestId("btn-place")
        expect(btnPlace).toBeDisabled()

        const placeXInput = screen.getByTestId("placeX").querySelector("input") as HTMLInputElement
        await user.type(placeXInput, xPos)

        const placeYInput = screen.getByTestId("placeY").querySelector("input") as HTMLInputElement
        await user.type(placeYInput, yPos)

        const selectDirection = screen.getByTestId("direction")
        await user.click(within(selectDirection).getByRole("button"))

        const listbox = within(screen.getByRole('presentation')).getByRole('listbox');
        const options = within(listbox).getAllByRole('option');
        
        await user.click(options[0])

        expect(btnPlace).not.toBeDisabled()

        await user.click(btnPlace)

        const placedPosition = {
            direction: EDirection.east,
            placeX: +xPos,
            placeY: +yPos
        }

        expect(mockChangeFn).toHaveBeenCalledWith(placedPosition)

        rerender(
            <ActionBar
                vacuumPosition={placedPosition}
                roomHeight={5}
                roomWidth={5}
                onChangeVacuumPosition={mockChangeFn}
                initialValues={INITIAL_VALUES}
                onReachedEdge={mockReachEndFn}
            />
        )

        const moveBtn = screen.getByTestId("btn-move")
        expect(moveBtn).not.toBeDisabled()
        await user.click(moveBtn)

        expect(mockChangeFn).toHaveBeenCalledWith({
            direction: EDirection.east,
            placeX: placedPosition.placeX + 1,
            placeY: placedPosition.placeY
        })
    })

    test('turn vacuum left', async () => {
        const mockChangeFn = jest.fn()
        const mockReachEndFn = jest.fn()

        const { rerender } = render(
            <ActionBar
                vacuumPosition={INITIAL_VALUES}
                roomHeight={5}
                roomWidth={5}
                onChangeVacuumPosition={mockChangeFn}
                initialValues={INITIAL_VALUES}
                onReachedEdge={mockReachEndFn}
            />
        )

        const xPos = "1"
        const yPos = "2"

        const user = userEvent.setup()

        const btnPlace = screen.getByTestId("btn-place")
        expect(btnPlace).toBeDisabled()

        const placeXInput = screen.getByTestId("placeX").querySelector("input") as HTMLInputElement
        await user.type(placeXInput, xPos)

        const placeYInput = screen.getByTestId("placeY").querySelector("input") as HTMLInputElement
        await user.type(placeYInput, yPos)

        const selectDirection = screen.getByTestId("direction")
        await user.click(within(selectDirection).getByRole("button"))

        const listbox = within(screen.getByRole('presentation')).getByRole('listbox');
        const options = within(listbox).getAllByRole('option');
        
        await user.click(options[0])

        expect(btnPlace).not.toBeDisabled()

        await user.click(btnPlace)

        const placedPosition = {
            direction: EDirection.east,
            placeX: +xPos,
            placeY: +yPos
        }

        expect(mockChangeFn).toHaveBeenCalledWith(placedPosition)

        rerender(
            <ActionBar
                vacuumPosition={placedPosition}
                roomHeight={5}
                roomWidth={5}
                onChangeVacuumPosition={mockChangeFn}
                initialValues={INITIAL_VALUES}
                onReachedEdge={mockReachEndFn}
            />
        )

        const turnLeftBtn = screen.getByTestId("btn-turn-left")
        expect(turnLeftBtn).not.toBeDisabled()
        await user.click(turnLeftBtn)

        expect(mockChangeFn).toHaveBeenCalledWith({
            direction: EDirection.north,
            placeX: placedPosition.placeX,
            placeY: placedPosition.placeY
        })
    })

    test('turn vacuum right', async () => {
        const mockChangeFn = jest.fn()
        const mockReachEndFn = jest.fn()

        const { rerender } = render(
            <ActionBar
                vacuumPosition={INITIAL_VALUES}
                roomHeight={5}
                roomWidth={5}
                onChangeVacuumPosition={mockChangeFn}
                initialValues={INITIAL_VALUES}
                onReachedEdge={mockReachEndFn}
            />
        )

        const xPos = "1"
        const yPos = "2"

        const user = userEvent.setup()

        const btnPlace = screen.getByTestId("btn-place")
        expect(btnPlace).toBeDisabled()

        const placeXInput = screen.getByTestId("placeX").querySelector("input") as HTMLInputElement
        await user.type(placeXInput, xPos)

        const placeYInput = screen.getByTestId("placeY").querySelector("input") as HTMLInputElement
        await user.type(placeYInput, yPos)

        const selectDirection = screen.getByTestId("direction")
        await user.click(within(selectDirection).getByRole("button"))

        const listbox = within(screen.getByRole('presentation')).getByRole('listbox');
        const options = within(listbox).getAllByRole('option');
        
        await user.click(options[0])

        expect(btnPlace).not.toBeDisabled()

        await user.click(btnPlace)

        const placedPosition = {
            direction: EDirection.east,
            placeX: +xPos,
            placeY: +yPos
        }

        expect(mockChangeFn).toHaveBeenCalledWith(placedPosition)

        rerender(
            <ActionBar
                vacuumPosition={placedPosition}
                roomHeight={5}
                roomWidth={5}
                onChangeVacuumPosition={mockChangeFn}
                initialValues={INITIAL_VALUES}
                onReachedEdge={mockReachEndFn}
            />
        )

        const turnRightBtn = screen.getByTestId("btn-turn-right")
        expect(turnRightBtn).not.toBeDisabled()
        await user.click(turnRightBtn)

        expect(mockChangeFn).toHaveBeenCalledWith({
            direction: EDirection.south,
            placeX: placedPosition.placeX,
            placeY: placedPosition.placeY
        })
    })

    test('report vacuum position', async () => {
        const mockChangeFn = jest.fn()
        const mockReachEndFn = jest.fn()

        const { rerender } = render(
            <ActionBar
                vacuumPosition={INITIAL_VALUES}
                roomHeight={5}
                roomWidth={5}
                onChangeVacuumPosition={mockChangeFn}
                initialValues={INITIAL_VALUES}
                onReachedEdge={mockReachEndFn}
            />
        )

        const xPos = "1"
        const yPos = "2"

        const user = userEvent.setup()

        const btnPlace = screen.getByTestId("btn-place")
        expect(btnPlace).toBeDisabled()

        const placeXInput = screen.getByTestId("placeX").querySelector("input") as HTMLInputElement
        await user.type(placeXInput, xPos)

        const placeYInput = screen.getByTestId("placeY").querySelector("input") as HTMLInputElement
        await user.type(placeYInput, yPos)

        const selectDirection = screen.getByTestId("direction")
        await user.click(within(selectDirection).getByRole("button"))

        const listbox = within(screen.getByRole('presentation')).getByRole('listbox');
        const options = within(listbox).getAllByRole('option');
        
        await user.click(options[0])

        expect(btnPlace).not.toBeDisabled()

        await user.click(btnPlace)

        const placedPosition = {
            direction: EDirection.east,
            placeX: +xPos,
            placeY: +yPos
        }

        expect(mockChangeFn).toHaveBeenCalledWith(placedPosition)

        rerender(
            <ActionBar
                vacuumPosition={placedPosition}
                roomHeight={5}
                roomWidth={5}
                onChangeVacuumPosition={mockChangeFn}
                initialValues={INITIAL_VALUES}
                onReachedEdge={mockReachEndFn}
            />
        )

        const turnRightBtn = screen.getByTestId("btn-turn-right")
        expect(turnRightBtn).not.toBeDisabled()
        await user.click(turnRightBtn)

        expect(mockChangeFn).toHaveBeenCalledWith({
            direction: EDirection.south,
            placeX: placedPosition.placeX,
            placeY: placedPosition.placeY
        })

        const reportBtn = screen.getByTestId("btn-report")
        expect(reportBtn).not.toBeDisabled()
        await user.click(reportBtn)

        expect(screen.getByTestId("report-dialog")).toBeInTheDocument()
        expect(screen.getByTestId("reportX").textContent).toEqual(`X: ${placedPosition.placeX}`)
        expect(screen.getByTestId("reportY").textContent).toEqual(`Y: ${placedPosition.placeY}`)
        expect(screen.getByTestId("reportDirection").textContent).toEqual(`Direction: ${placedPosition.direction.toUpperCase()}`)
    })
})