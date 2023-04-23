import React, { Dispatch, FormEvent, SetStateAction, useCallback, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Typography,  } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { TVaccumPosition } from '../Pages/VaccumPage';
import { Form } from 'react-final-form';
import { Select, TextField } from 'mui-rff';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TurnRightIcon from '@mui/icons-material/TurnRight';

const useStyles = createUseStyles({
    actionBase: {
        height: '800px',
        width: '100%',
        background: '#a2cf6e',
        position: 'relative'
    },
    formControl: {
        margin: '10px',
        minWidth: '25ch',
    }
  })

type ActionBarProps = {
    vaccumPosition: TVaccumPosition;
    setVaccumPosition: Dispatch<SetStateAction<TVaccumPosition>>;
    initialValues: TVaccumPosition;
    roomHeight: number;
    roomWidth: number;
}

const DIRECTION_LIST = ['North', 'South', 'East', 'West'];
const DIRECTION_LOGIC: {[key:string]: {[key:string]: string}} = {
    'north': {
        'left': 'west',
        'right': 'east'
    },
    'south': {
        'left': 'east',
        'right': 'west'
    },
    'west': {
        'left': 'south',
        'right': 'north'
    },
    'east': {
        'left': 'north',
        'right': 'south'
    }
}

export const ActionBar = (props: ActionBarProps) => {
    const classes = useStyles();
    const { vaccumPosition, setVaccumPosition, initialValues, roomHeight, roomWidth } = props;
    const [errorPlaceValue, setErrorPlaceValue] = useState<string>('');
    const [submittedValues, setSubmittedValues] = useState<TVaccumPosition | undefined>(undefined);
    
    const onSubmit = (values: TVaccumPosition) => {
        const directionValues = {
            direction: !!values.direction ? (values.direction).toLowerCase():'',
            placeX:  !!values.placeX ? +values.placeX:null,
            placeY:  !!values.placeY ? +values.placeY:null
        }
        setSubmittedValues(values);
        setVaccumPosition(directionValues); 
    }

    const onMove = useCallback(() => {
        const currentDirection = vaccumPosition['direction'];
        if(currentDirection === 'north'){
            const nextPos = (vaccumPosition.placeX !== null) ? vaccumPosition.placeX - 1:null;
            console.log('north', {nextPos})
            if(nextPos !== null && nextPos >= 0){
                const newDirectionValues = {
                    ...vaccumPosition,
                    placeX: nextPos
                }
                setVaccumPosition(newDirectionValues); 
            }
        }

        if(currentDirection === 'south'){
            const nextPos = (vaccumPosition.placeX !== null) ? vaccumPosition.placeX + 1:null;
            console.log('south', {nextPos})
            if(nextPos !== null && nextPos < roomHeight){
                const newDirectionValues = {
                    ...vaccumPosition,
                    placeX: nextPos
                }
                setVaccumPosition(newDirectionValues); 
            }
        }

        if(currentDirection === 'west'){
            const nextPos = (vaccumPosition.placeY !== null) ? vaccumPosition.placeY - 1:null;
            console.log('west', {nextPos})
            if(nextPos !== null && nextPos >= 0){
                const newDirectionValues = {
                    ...vaccumPosition,
                    placeY: nextPos
                }
                setVaccumPosition(newDirectionValues); 
            }
        }

        if(currentDirection === 'east'){
            const nextPos = (vaccumPosition.placeY !== null) ? vaccumPosition.placeY + 1:null;
            console.log('east', {nextPos})
            if(nextPos !== null && nextPos < roomWidth){
                const newDirectionValues = {
                    ...vaccumPosition,
                    placeY: nextPos
                }
                setVaccumPosition(newDirectionValues); 
            }
        }
        
    }, [vaccumPosition]);

    const onDirectionChange = useCallback((direction: string) => {
        const newDirection  = DIRECTION_LOGIC[vaccumPosition['direction']][direction]
        const newDirectionValues = {
            ...vaccumPosition,
            direction: newDirection
        }
        setVaccumPosition(newDirectionValues); 
    }, [vaccumPosition]);

    return (
        <Paper className={classes.actionBase} variant="outlined">
            <Box
                py={3}
                sx={{
                    '& .MuiTextField-root': { m: 1,width: '25ch' },
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Remote Control
                </Typography>
                <Form
                    onSubmit={onSubmit}
                    initialValues={submittedValues ? submittedValues : initialValues}
                    render={(props) => {
                        const { handleSubmit, invalid, submitting, form} = props;
                        return(
                        <form onSubmit={handleSubmit} noValidate={true}>
                            <TextField
                                required
                                id="placeX"
                                name="placeX"
                                type="number"
                                label="X Position"
                            />
                            <TextField
                                required
                                id="placeY"
                                name="placeY"
                                type="number"
                                label="Y Position"
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="direction-label">Direction</InputLabel>
                                <Select
                                    id="direction"
                                    name="direction"
                                >
                                    {DIRECTION_LIST.map((o, idx:number) => (
                                        <MenuItem value={o} key={idx}>
                                        {o}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                variant='contained'
                                type='submit'
                                disabled={invalid || submitting}
                                sx={{ mt: '1rem' }}
                            >
                                Place Vaccum
                            </Button>
                        </form>
                    )}}
                />
            </Box>
            <Box
                py={4}
                sx={{
                    '& .MuiTextField-root': { m: 1,width: '25ch' },
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Vaccum Navigation
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    disabled={!submittedValues || (!!submittedValues && !submittedValues['direction'])}
                    sx={{ minWidth: '140px', mt: '1rem' }}
                    onClick={() => onMove()}
                >
                    Move
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    sx={{ minWidth: '140px', mt: '1rem' }}
                    disabled={!submittedValues || (!!submittedValues && !submittedValues['direction'])}
                    startIcon={<TurnLeftIcon />}
                    onClick={() => onDirectionChange('left')}
                >
                    Left
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    sx={{ minWidth: '140px', mt: '1rem' }}
                    disabled={!submittedValues || (!!submittedValues && !submittedValues['direction'])}
                    endIcon={<TurnRightIcon />}
                    onClick={() => onDirectionChange('right')}
                >
                    Right
                </Button>
            </Box>
        </Paper>
    )
}