import { Grid } from '@mui/material';
import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ActionBar } from '../components/ActionBar';
import { Playground } from '../components/Playground';
import { INITIAL_VALUES, PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH } from '../constants';
import { TVacuumPosition } from '../types';

const useStyles = createUseStyles({
    gridWrapper: {
        maxWidth: '1200px'
    },
  })

export const VacuumPage = () => {
    const classes = useStyles();
    const [currentPosition, setCurrentPosition] = useState<TVacuumPosition>(INITIAL_VALUES);
    
    return (
        <Grid 
            container 
            rowSpacing={2}
            p={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            height={'100vh'}
            className={classes.gridWrapper}
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
                    width: '260px',
                    marginLeft: '40px'
                }}  
                item
            >
                <ActionBar 
                    vacuumPosition={currentPosition}
                    roomHeight={PLAYGROUND_HEIGHT} 
                    roomWidth={PLAYGROUND_WIDTH}
                    onChangeVacuumPosition={setCurrentPosition}
                    initialValues={INITIAL_VALUES}
                />
            </Grid>
        </Grid>
    )
}