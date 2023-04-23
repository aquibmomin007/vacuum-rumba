import { Box, Grid, Paper } from '@mui/material';
import classnames from 'classnames';
import React, { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { TVacuumPosition } from '../Pages/VacuumPage';

const useStyles = createUseStyles({
    
    playgroundBase: {
        height: '800px',
        width: '100%',
        background: '#a2cf6e',
        position: 'relative'
    },
    horizantalDivider: {
        width: '100%',
        height: '1px',
        background: 'grey',
        position: 'absolute',
        left: '0',
        right: '0'
    },
    verticalDivider: {
        width: '1px',
        height: '100%',
        background: 'grey',
        position: 'absolute',
        top: '0',
        bottom: '0'
    },
    playgroundBox: {
        background: 'rgba(164,255,164,0.6)',
        border: '1px solid grey',
        position: 'relative'
    },
    playgroundBoxText: {
        position: 'absolute',
        top: '5px',
        right: '5px'
    },
    vacuumBlock: {
        width: '156px',
        height: '156px',
        borderRadius: '50%',
        border: '5px solid #787F84',
        position: 'absolute',
        background: '#E6B703',
        boxSizing: 'border-box',

        '& .direction-bar': {
            '&.north': {
                top: '5px',
                left: '0',
                right: '0',
                width: '5px',
                height: '50px',
            },

            '&.south': {
                bottom: '5px',
                left: '0',
                right: '0',
                width: '5px',
                height: '50px',
            },

            '&.east': {
                top: '0',
                right: '5px',
                bottom: '0',
                height: '5px',
                width: '50px',
            },

            '&.west': {
                top: '0',
                left: '5px',
                bottom: '0',
                height: '5px',
                width: '50px',
            },

            background: '#787F84',
            position: 'absolute',
            margin: 'auto'
        }
    }
  })

type PlaygroundProps = {
    roomHeight: number;
    roomWidth: number;
    vacuumPosition: TVacuumPosition;
}

export const Playground = (props: PlaygroundProps) => {
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
            
            setVacuumX(156 * (currentXValue) + currentXValue);
            setVacuumY(160 * (currentYValue) + currentYValue);
        }
        else{
            setShowVacuum(false)
            setVacuumDirection(null)
            setVacuumX(null)
            setVacuumY(null)
        }
    }, [vacuumPosition])

    console.log({vacuumX, vacuumY})

    const plotBoxes = useCallback(() => {
        const wNum = new Array(roomWidth).fill(0);
        const hNum = new Array(roomHeight).fill(0);
        const divVal = 100/hNum.length;
        
        return hNum.map((item, i) => {
            return wNum.map((item, j) => {
                return (
                    <Grid 
                        item 
                        className={classes.playgroundBox}
                        sx={{
                            flex: `1 1 ${100/roomWidth}%`,
                            display: 'flex'
                        }}
                    >
                        <span className={classes.playgroundBoxText}>
                            {`( ${i}, ${j})`}
                        </span>
                    </Grid>
                )
            })
        })
    }, [roomWidth, roomHeight])

    console.log({vacuumDirection, a1: !!vacuumDirection})
    
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
                        <span className={`direction-bar ${vacuumDirection}`}></span>
                    </div>
                )}
            </Box>
        </Paper>
    )
}