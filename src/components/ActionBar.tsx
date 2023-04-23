import { useCallback, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Paper, Typography } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Form } from 'react-final-form';
import { Select, TextField } from 'mui-rff';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import { EDirection, ERotation, TActionBarProps, TVacuumPosition } from '../types';
import { DIRECTION_LOGIC, DIRECTION_LIST, CommonColors } from '../constants';
import { makeValidate } from 'mui-rff';
import * as Yup from 'yup';

const useStyles = createUseStyles({
    actionBase: {
        height: '800px',
        width: '100%',
        background: CommonColors.mild,
        position: 'relative',
        boxSizing: 'border-box',
        border: `1px solid ${CommonColors.text}`,
        color: CommonColors.text
    },
    formControl: {
        marginBottom: '0',
    },
    formWrapper: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 20px'
    }
  })

export const ActionBar = (props: TActionBarProps) => {
    const classes = useStyles();
    const { vacuumPosition, onChangeVacuumPosition, initialValues, roomHeight, roomWidth } = props;
    const [submittedValues, setSubmittedValues] = useState<TVacuumPosition | undefined>(undefined);

    const schema = Yup.object().shape({
        placeX: Yup.number().integer().required("X cannot be empty").min(0, 'X must not be less than 0').max(roomWidth - 1, `X must be less than ${roomWidth}`),
        placeY: Yup.number().integer().required("Y cannot be empty").min(0, 'Y must not be less than 0').max(roomHeight - 1, `X must be less than ${roomHeight}`),
        direction: Yup.string().required(),
    });

    const validate = makeValidate(schema as never);
    
    const onSubmit = (values: TVacuumPosition) => {
        const directionValues = {
            direction: !!values.direction ? values.direction : EDirection.none,
            placeX:  !!values.placeX ? +values.placeX : null,
            placeY:  !!values.placeY ? +values.placeY : null
        }
        setSubmittedValues(values);
        onChangeVacuumPosition(directionValues); 
    }

    const onMove = useCallback(() => {
        const currentDirection = vacuumPosition['direction'];
        if(currentDirection === 'north'){
            const nextPos = (vacuumPosition.placeX !== null) ? vacuumPosition.placeX - 1:null;
            if(nextPos !== null && nextPos >= 0){
                const newDirectionValues = {
                    ...vacuumPosition,
                    placeX: nextPos
                }
                onChangeVacuumPosition(newDirectionValues); 
            }
        }

        if(currentDirection === 'south'){
            const nextPos = (vacuumPosition.placeX !== null) ? vacuumPosition.placeX + 1:null;
            if(nextPos !== null && nextPos < roomHeight){
                const newDirectionValues = {
                    ...vacuumPosition,
                    placeX: nextPos
                }
                onChangeVacuumPosition(newDirectionValues); 
            }
        }

        if(currentDirection === 'west'){
            const nextPos = (vacuumPosition.placeY !== null) ? vacuumPosition.placeY - 1:null;
            if(nextPos !== null && nextPos >= 0){
                const newDirectionValues = {
                    ...vacuumPosition,
                    placeY: nextPos
                }
                onChangeVacuumPosition(newDirectionValues); 
            }
        }

        if(currentDirection === 'east'){
            const nextPos = (vacuumPosition.placeY !== null) ? vacuumPosition.placeY + 1:null;
            if(nextPos !== null && nextPos < roomWidth){
                const newDirectionValues = {
                    ...vacuumPosition,
                    placeY: nextPos
                }
                onChangeVacuumPosition(newDirectionValues); 
            }
        }
        
    }, [vacuumPosition, roomWidth, roomHeight, onChangeVacuumPosition]);

    const onDirectionChange = useCallback((rotation: ERotation) => {
        const config = DIRECTION_LOGIC[vacuumPosition.direction]
        if (!config) {
            return
        }
        const newDirection  = config[rotation]
        const newDirectionValues = {
            ...vacuumPosition,
            direction: newDirection
        }
        onChangeVacuumPosition(newDirectionValues); 
    }, [vacuumPosition, onChangeVacuumPosition]);

    return (
        <Paper className={classes.actionBase} variant="outlined">
            <Box
                py={3}
                sx={{
                    '& .MuiTextField-root': { 
                        mb: 2,
                        width: '100%',
                        flexDirection: 'column',
                        display: 'flex'
                    },
                    '& .MuiInputBase-root': {
                        color: CommonColors.text,
                        borderColor: CommonColors.text,

                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: CommonColors.text
                        },

                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: CommonColors.text
                        },
                        
                        '&.Mui-focused': {
                            color: CommonColors.text,
                            borderColor: CommonColors.text,

                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: CommonColors.text
                            },
                        },
                    },
                    
                    '& .MuiFormLabel-root': {
                        
                        '&.Mui-focused': {
                            color: CommonColors.text,
                            borderColor: CommonColors.text
                        },
                        color: CommonColors.text,
                        borderColor: CommonColors.text
                    },
                    
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Remote Control
                </Typography>
                <Form
                    onSubmit={onSubmit}
                    initialValues={submittedValues ? submittedValues : initialValues}
                    validate={validate}
                    render={(props) => {
                        const { handleSubmit, invalid, submitting, values } = props;
                        const allFieldsTouched = values ? !!values.direction && values.placeX && values.placeY : false;

                        return(
                            <form onSubmit={handleSubmit} noValidate={true}>
                                <div className={classes.formWrapper}>   
                                    <TextField
                                        required
                                        id="placeX"
                                        name="placeX"
                                        type="number"
                                        label="X Position"
                                        size="medium"
                                        InputProps={{ inputProps: { 
                                            min:0,
                                            max: (roomWidth - 1)
                                        }}}
                                    />
                                    <TextField
                                        required
                                        id="placeY"
                                        name="placeY"
                                        type="number"
                                        label="Y Position"
                                        size="medium"
                                        InputProps={{ inputProps: { 
                                            min:0,
                                            max: (roomWidth - 1)
                                        }}}
                                    />
                                    <FormControl className={classes.formControl} sx={{
                                        '& .MuiSelect-select':{
                                            textAlign: 'left'
                                        }
                                    }}>
                                        <Select
                                            required
                                            id="direction"
                                            name="direction"
                                            size="medium"
                                            label="Direction"
                                        >
                                            {DIRECTION_LIST.map((o, idx:number) => (
                                                <MenuItem value={o.value} key={idx}>
                                                    {o.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <Button
                                        variant='contained'
                                        type='submit'
                                        color="warning"
                                        disabled={invalid || submitting || !allFieldsTouched}
                                        sx={{ mt: '1rem', py:1 }}
                                    >
                                        Place Vacuum
                                    </Button>
                                </div>
                                
                            </form>    
                        )
                    }}
                />
            </Box>
            <Box
                py={4}
                mt={2}
                sx={{
                    '& .MuiTextField-root': { 
                        mb: 2,
                        width: '100%',
                        flexDirection: 'column',
                        display: 'flex'
                    }
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Vacuum Navigation
                </Typography>
                <div className={classes.formWrapper}> 
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={!submittedValues || (!!submittedValues && !submittedValues['direction'])}
                        sx={{ minWidth: '140px' }}
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
                        onClick={() => onDirectionChange(ERotation.left)}
                    >
                        Left
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{ minWidth: '140px', mt: '1rem' }}
                        disabled={!submittedValues || (!!submittedValues && !submittedValues['direction'])}
                        endIcon={<TurnRightIcon />}
                        onClick={() => onDirectionChange(ERotation.right)}
                    >
                        Right
                    </Button>
                </div>
            </Box>
        </Paper>
    )
}