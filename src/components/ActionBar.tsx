import { useCallback, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Paper, Typography } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Form } from 'react-final-form';
import { Select, TextField } from 'mui-rff';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import LoadingButton from '@mui/lab/LoadingButton';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { EDirection, ERotation, TActionBarProps, TVacuumPosition } from '../types';
import { DIRECTION_LOGIC, DIRECTION_LIST, CommonColors, INITIAL_VALUES, PLAYGROUND_WIDTH } from '../constants';
import { makeValidate } from 'mui-rff';
import * as Yup from 'yup';
import { FormApi } from 'final-form';
import { useSnackbar } from 'notistack';
import { ReportDialog } from './ReportDialog';

const useStyles = createUseStyles({
    actionBase: {
        height: `${PLAYGROUND_WIDTH}px`,
        width: '100%',
        background: CommonColors.mild,
        position: 'relative',
        boxSizing: 'border-box',
        border: `1px solid ${CommonColors.text}`,
        color: CommonColors.text,
        overflowY: 'scroll'
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
    const { vacuumPosition, onChangeVacuumPosition, onReachedEdge, initialValues, roomHeight, roomWidth } = props;
    const [submittedValues, setSubmittedValues] = useState<TVacuumPosition | undefined>(undefined);
    const [isMoving, setIsMoving] = useState<boolean>(false);
    const [reportDialogOpen, setReportDialogOpen] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();

    const schema = Yup.object().shape({
        placeX: Yup.number().integer().required("X is a required field").min(0, 'X must not be less than 0').max(roomWidth - 1, `X must be less than ${roomWidth}`),
        placeY: Yup.number().integer().required("Y is a required field").min(0, 'Y must not be less than 0').max(roomHeight - 1, `X must be less than ${roomHeight}`),
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

    const onReset = (form: FormApi<TVacuumPosition, Partial<TVacuumPosition>>) => {
        return () => {
          setSubmittedValues(undefined);
          form.reset();
          onChangeVacuumPosition(INITIAL_VALUES);
        };
      };

    const setErrorEdgeMessage = useCallback((errorMessage: string) => {
        enqueueSnackbar(errorMessage, {
            variant: 'error',
            autoHideDuration: 3000,
            anchorOrigin: {
                horizontal: 'right',
                vertical: 'bottom'
            }
        });
        onReachedEdge(true)
    }, [onReachedEdge, enqueueSnackbar])

    const setMovingState = useCallback((flag: boolean, time?: number) => {
        if(!!time){
            setTimeout(() => {
                setIsMoving(flag);
            }, time)
        }
        else{
            setIsMoving(flag);
        }
    }, [setIsMoving])

    const onMove = useCallback(() => {
        const currentDirection = vacuumPosition['direction'];
        if(currentDirection === 'north'){
            const nextPos = (vacuumPosition.placeY !== null) ? vacuumPosition.placeY + 1:null;
            if(nextPos !== null && nextPos < roomHeight){
                const newDirectionValues = {
                    ...vacuumPosition,
                    placeY: nextPos
                }

                setMovingState(true);
                onChangeVacuumPosition(newDirectionValues); 
            }
            else{
                setErrorEdgeMessage('End of the playground. Cannot move North, Please rotate in valid direction');
            }
        }

        if(currentDirection === 'south'){
            const nextPos = (vacuumPosition.placeY !== null) ? vacuumPosition.placeY - 1:null;
            if(nextPos !== null && nextPos >= 0){
                const newDirectionValues = {
                    ...vacuumPosition,
                    placeY: nextPos
                }
                setMovingState(true);
                onChangeVacuumPosition(newDirectionValues); 
            }
            else{
                setErrorEdgeMessage('End of the playground. Cannot move South, Please rotate in valid direction');
            }
        }

        if(currentDirection === 'west'){
            const nextPos = (vacuumPosition.placeX !== null) ? vacuumPosition.placeX - 1:null;
            if(nextPos !== null && nextPos >= 0){
                const newDirectionValues = {
                    ...vacuumPosition,
                    placeX: nextPos
                }
                setMovingState(true);
                onChangeVacuumPosition(newDirectionValues); 
            }
            else{
                setErrorEdgeMessage('End of the playground. Cannot move West, Please rotate in valid direction');
            }
        }

        if(currentDirection === 'east'){
            const nextPos = (vacuumPosition.placeX !== null) ? vacuumPosition.placeX + 1:null;
            if(nextPos !== null && nextPos < roomWidth){
                const newDirectionValues = {
                    ...vacuumPosition,
                    placeX: nextPos
                }
                setMovingState(true);
                onChangeVacuumPosition(newDirectionValues); 
            }
            else{
                setErrorEdgeMessage('End of the playground. Cannot move East, Please rotate in valid direction');
            }
        }

        setMovingState(false, 500);
    }, [vacuumPosition, roomWidth, roomHeight, setMovingState, onChangeVacuumPosition, setErrorEdgeMessage]);

    

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
                    pt={2}
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
                    <Typography variant="h6" gutterBottom>
                        Remote Control
                    </Typography>
                    <Form
                        onSubmit={onSubmit}
                        initialValues={submittedValues ? submittedValues : initialValues}
                        validate={validate}
                        render={(props) => {
                            const { handleSubmit, invalid, submitting, values, form } = props;
                            const allFieldsTouched = values ? !!values.direction && values.placeX && values.placeY : false;
                            const atleastOneModified = values ? !!values.direction || values.placeX || values.placeY : false;
                            
                            return(
                                <form onSubmit={handleSubmit} noValidate={true}>
                                    <div className={classes.formWrapper}>
                                        <Box 
                                            sx={{
                                                flexDirection: 'row',
                                                display: 'flex',
                                                gap: '16px'
                                            }}
                                        >
                                            <TextField
                                                required
                                                id="placeX"
                                                data-testid="placeX"
                                                name="placeX"
                                                type="number"
                                                label="X"
                                                size="medium"
                                                InputProps={{ inputProps: { 
                                                    min:0,
                                                    max: (roomWidth - 1)
                                                }}}
                                            />
                                            <TextField
                                                required
                                                id="placeY"
                                                data-testid="placeY"
                                                name="placeY"
                                                type="number"
                                                label="Y"
                                                size="medium"
                                                InputProps={{ inputProps: { 
                                                    min:0,
                                                    max: (roomWidth - 1)
                                                }}}
                                            />
                                        </Box>
                                        
                                        <FormControl className={classes.formControl} sx={{
                                            '& .MuiSelect-select':{
                                                textAlign: 'left'
                                            }
                                        }}>
                                            <Select
                                                required
                                                id="direction"
                                                data-testid="direction"
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
                                            color="primary"
                                            data-testid="btn-place"
                                            disabled={invalid || submitting || !allFieldsTouched}
                                            sx={{ mt: '1rem', py:1 }}
                                        >
                                            Place Vacuum
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color="secondary"
                                            data-testid="btn-reset"
                                            disabled={submitting || !atleastOneModified}
                                            sx={{ mt: '1rem', py:1 }}
                                            onClick={onReset(form)}
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                </form>    
                            )
                        }}
                    />
                </Box>
                <Box
                    pt={1}
                    mt={1}
                    sx={{
                        '& .MuiTextField-root': { 
                            mb: 2,
                            width: '100%',
                            flexDirection: 'column',
                            display: 'flex'
                        }
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Vacuum Navigation
                    </Typography>
                    <div className={classes.formWrapper}> 
                        <LoadingButton
                            data-testid="btn-move"
                            variant="contained"
                            color="primary"
                            disabled={!submittedValues || (!!submittedValues && !submittedValues['direction']) || isMoving}
                            loading={isMoving}
                            loadingIndicator="Moving…"
                            sx={{ minWidth: '140px' }}
                            onClick={() => onMove()}
                        >
                            Move
                        </LoadingButton>
                        <Button
                            data-testid="btn-turn-left"
                            variant="contained"
                            color="secondary"
                            sx={{ minWidth: '140px', mt: '1rem' }}
                            disabled={!submittedValues || (!!submittedValues && !submittedValues['direction']) || isMoving}
                            startIcon={<TurnLeftIcon />}
                            onClick={() => onDirectionChange(ERotation.left)}
                        >
                            Left
                        </Button>
                        <Button
                            data-testid="btn-turn-right"
                            variant="contained"
                            color="secondary"
                            sx={{ minWidth: '140px', mt: '1rem' }}
                            disabled={!submittedValues || (!!submittedValues && !submittedValues['direction']) || isMoving}
                            endIcon={<TurnRightIcon />}
                            onClick={() => onDirectionChange(ERotation.right)}
                        >
                            Right
                        </Button>

                        <Button
                            data-testid="btn-report"
                            variant="contained"
                            color="secondary"
                            sx={{ minWidth: '140px', mt: '1rem' }}
                            disabled={!submittedValues || (!!submittedValues && !submittedValues['direction']) || isMoving}
                            startIcon={<InsertDriveFileIcon />}
                            onClick={() => setReportDialogOpen(true)}
                        >
                            Report
                        </Button>
                    </div>
                </Box>
                <ReportDialog 
                    open={reportDialogOpen} 
                    vacuumData={vacuumPosition} 
                    handleClose={setReportDialogOpen} 
                />
            </Paper>
    )
}