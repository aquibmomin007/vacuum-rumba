import { Box, Grid, Paper } from '@mui/material';
import classnames from 'classnames';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { CommonColors, PLAYGROUND_BOX_WIDTH } from '../constants';
import { TPlaygroundProps } from '../types';

const useStyles = createUseStyles({
    
    playgroundBase: {
        height: '800px',
        width: '100%',
        background: 'transparent',
        position: 'relative'
    },
    playgroundBox: {
        background: CommonColors.mild,
        border: `1px solid ${CommonColors.text}`,
        position: 'relative'
    },
    playgroundBoxText: {
        position: 'absolute',
        top: '3px',
        right: '3px',
        fontSize: '12px',
        color: CommonColors.text
    },
    compassLabel: {
        position: 'absolute',
        fontSize: '25px',
        fontWeight: 'bold',
        color: '#e8e5d4',
        width: '25px',
        height: '25px',
        textAlign: 'center',
        margin: 'auto',
        
        '&.north': {
            left: 0,
            right: 0,
            top: '-35px'
        },
        '&.south': {
            left: 0,
            right: 0,
            bottom: '-35px'
        },
        '&.east': {
            top: 0,
            bottom: 0,
            right: '-35px'
        },
        '&.west': {
            top: 0,
            bottom: 0,
            left: '-35px'
        }
    },
    vacuumBlock: {
        width: `${PLAYGROUND_BOX_WIDTH}px`,
        height: `${PLAYGROUND_BOX_WIDTH}px`,
        borderRadius: '50%',
        border: `5px solid ${CommonColors.dark}`,
        position: 'absolute',
        background: CommonColors.light,
        boxSizing: 'border-box',
        transition: 'left 1s linear, top 1s linear',
        

        '& .direction-bar': {
            background: CommonColors.dark,
            position: 'absolute',
            margin: 'auto',

            '& .circle': {
                width: '15px',
                height: '15px',
                background: CommonColors.dark,
                borderRadius: '50%',
                position: 'absolute',
            },

            '&.north': {
                top: '25px',
                left: '0',
                right: '0',
                width: '5px',
                height: '50px',

                '& .circle': {
                    left: '-5px',
                    top: '-20px',
                }
            },

            '&.south': {
                bottom: '25px',
                left: '0',
                right: '0',
                width: '5px',
                height: '50px',

                '& .circle': {
                    left: '-5px',
                    bottom: '-20px',
                }
            },

            '&.east': {
                top: '0',
                right: '25px',
                bottom: '0',
                height: '5px',
                width: '50px',

                '& .circle': {
                    right: '-20px',
                    top: '-5px',
                }
            },

            '&.west': {
                top: '0',
                left: '25px',
                bottom: '0',
                height: '5px',
                width: '50px',

                '& .circle': {
                    left: '-20px',
                    top: '-5px',
                }
            },

            
        }
    }
  })

export const Playground = (props: TPlaygroundProps) => {
    const { roomHeight, roomWidth, vacuumPosition } = props;
    const classes = useStyles();
    const [showVacuum, setShowVacuum ] = useState<boolean>(false);
    const [vacuumDirection, setVacuumDirection] = useState<null | string>(null);
    const [vacuumX, setVacuumX] = useState<null | number>(null);
    const [vacuumY, setVacuumY] = useState<null | number>(null);

    useEffect(() => {
        if((vacuumPosition['placeX'] !== null) && (vacuumPosition['placeY'] !== null) && (vacuumPosition['direction'] !== null)){
            setShowVacuum(true)
            setVacuumDirection(vacuumPosition['direction'].toLowerCase())
            const currentXValue = !!vacuumPosition['placeY'] ? vacuumPosition['placeY']:0;
            const currentYValue = !!vacuumPosition['placeX'] ? vacuumPosition['placeX']:0;
            
            setVacuumX(PLAYGROUND_BOX_WIDTH * (currentXValue));
            setVacuumY(PLAYGROUND_BOX_WIDTH * (currentYValue));
        }
        else{
            setShowVacuum(false)
            setVacuumDirection(null)
            setVacuumX(null)
            setVacuumY(null)
        }
    }, [vacuumPosition])

    const plotBoxes = useCallback(() => {
        const wNum = new Array(roomWidth).fill(0);
        const hNum = new Array(roomHeight).fill(0);
        
        return hNum.map((_i, i) => {
            return wNum.map((_j, j) => {
                return (
                    <Grid 
                        item
                        key={`(${i},${j})`}
                        className={classes.playgroundBox}
                        sx={{
                            flex: `1 1 ${100/roomWidth}%`,
                            display: 'flex'
                        }}
                    >
                        <span className={classes.playgroundBoxText}>
                            {`(${i},${j})`}
                        </span>
                    </Grid>
                )
            })
        })
    }, [roomWidth, roomHeight, classes])
    
    return (
        <Paper className={classes.playgroundBase} variant="outlined">
            <Box 
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignContent: 'stretch',
                    flexFlow: 'row wrap',
                    height: '100%'
                  }}
            >
                {plotBoxes()}
                {showVacuum && (
                    <div 
                        className={classes.vacuumBlock}
                        style={{
                            left: `${vacuumX}px`,
                            top: `${vacuumY}px`,
                        }}
                    >
                        <span className={`direction-bar ${vacuumDirection}`}>
                            <span className={`circle`}></span>
                        </span>
                    </div>
                )}
            </Box>
            <span className={classnames(classes.compassLabel, 'north')}>N</span>
            <span className={classnames(classes.compassLabel, 'south')}>S</span>
            <span className={classnames(classes.compassLabel, 'east')}>E</span>
            <span className={classnames(classes.compassLabel, 'west')}>W</span>
        </Paper>
    )
}