import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ActionBar } from '../components/ActionBar';
import { Playground } from '../components/Playground';

const useStyles = createUseStyles({
    pageWrapper: {
        maxWidth: '1200px'
    }
  })

const PLAYGROUND_HEIGHT = 5;
const PLAYGROUND_WIDTH = 5;

export type TVacuumPosition = {
    placeX: number | null;
    placeY: number | null;
    direction: string;
}

const INITIAL_VALUES = {
    placeX: null,
    placeY: null,
    direction: ''
}

export const VacuumPage = () => {
    const classes = useStyles();
    const [currentPosition, setCurrentPosition] = useState<TVacuumPosition>(INITIAL_VALUES);
    console.log({currentPosition})
    return (
        <Grid 
            container 
            rowSpacing={2}
            columnSpacing={2}
            p={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            height={'100vh'}
            className={classes.pageWrapper}
        >
            <Grid sx={{
                    width: '800px'
                }} 
                item
            >
                <Playground
                    roomHeight={PLAYGROUND_HEIGHT} 
                    roomWidth={PLAYGROUND_WIDTH}
                    vacuumPosition={currentPosition}
                />
            </Grid>
            <Grid 
                sx={{
                    width: '300px'
                    }}  
                item
            >
                <ActionBar 
                    vacuumPosition={currentPosition}
                    roomHeight={PLAYGROUND_HEIGHT} 
                    roomWidth={PLAYGROUND_WIDTH}
                    setVacuumPosition={setCurrentPosition}
                    initialValues={INITIAL_VALUES}
                />
            </Grid>
        </Grid>
    )
}