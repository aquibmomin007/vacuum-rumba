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
        color: CommonColors.textLight,
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
        background: CommonColors.vacuumBg,
        boxSizing: 'border-box',
        transition: 'left 0.5s linear, top 0.5s linear',
        
        '&.vacuum-shake': {
            'animation': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
            'transform': 'translate3d(0, 0, 0)',
            'backfaceVisibility': 'hidden',
            'perspective': '1000px',
            border: `5px solid ${CommonColors.errorBorder}`,

            '& .direction-bar': {
                background: CommonColors.errorBorder,
                '& .circle': {
                    background: CommonColors.errorBorder,
                },
            }
        },

        '& .direction-bar': {
            background: CommonColors.dark,
            position: 'absolute',
            margin: 'auto',
            borderRadius: '5px',

            '& .circle': {
                width: '12px',
                height: '12px',
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
                    left: '-4px',
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
                    left: '-4px',
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
                    top: '-4px',
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
                    top: '-4px',
                }
            }
        }
    }
  })

export const Playground = (props: TPlaygroundProps) => {
    const { roomHeight, roomWidth, vacuumPosition, isEdgeError } = props;
    const classes = useStyles();
    const [showVacuum, setShowVacuum ] = useState<boolean>(false);
    const [vacuumDirection, setVacuumDirection] = useState<null | string>(null);
    const [vacuumX, setVacuumX] = useState<null | number>(null);
    const [vacuumY, setVacuumY] = useState<null | number>(null);

    useEffect(() => {
        if((vacuumPosition['placeX'] !== null) && (vacuumPosition['placeY'] !== null) && (vacuumPosition['direction'] !== null)){
            setShowVacuum(true)
            setVacuumDirection(vacuumPosition['direction'].toLowerCase())
            const currentXValue = vacuumPosition['placeX'] !== null ? (vacuumPosition['placeX']):0;
            const currentYValue = vacuumPosition['placeY'] !== null ? (roomHeight - vacuumPosition['placeY'] - 1):0;
            setVacuumX(PLAYGROUND_BOX_WIDTH * (currentXValue));
            setVacuumY(PLAYGROUND_BOX_WIDTH * (currentYValue));
        }
        else{
            setShowVacuum(false)
            setVacuumDirection(null)
            setVacuumX(null)
            setVacuumY(null)
        }
    }, [vacuumPosition, roomWidth, roomHeight])

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
                    flexDirection: 'column-reverse',
                    height: '100%'
                  }}
            >
                {plotBoxes()}
                {showVacuum && (
                    <div 
                        className={classnames(classes.vacuumBlock, { 'vacuum-shake':isEdgeError })}
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