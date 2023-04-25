import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ActionBar } from '../components/ActionBar';
import { Playground } from '../components/Playground';
import { INITIAL_VALUES, PLAYGROUND_HORIZANTAL_BLOCK, PLAYGROUND_VERTICAL_BLOCK, PLAYGROUND_WIDTH} from '../constants';
import { TVacuumPosition } from '../types';

const useStyles = createUseStyles({
    gridWrapper: {
        maxWidth: '1200px'
    },
  })

export const VacuumPage = () => {
    const classes = useStyles();
    const [currentPosition, setCurrentPosition] = useState<TVacuumPosition>(INITIAL_VALUES);
    const [reachedEdge, setReachedEdge] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            if(reachedEdge){
                setReachedEdge(false)
            }
        }, 1000)
        
    }, [reachedEdge])
    
    return (
        <Grid 
            container 
            rowSpacing={2}
            p={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            height="auto"
            className={classes.gridWrapper}
        >
            <Grid sx={{
                    width: `${PLAYGROUND_WIDTH}px`
                }} 
                item
            >
                <Playground
                    roomHeight={PLAYGROUND_VERTICAL_BLOCK} 
                    roomWidth={PLAYGROUND_HORIZANTAL_BLOCK}
                    vacuumPosition={currentPosition}
                    isEdgeError={reachedEdge}
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
                    roomHeight={PLAYGROUND_VERTICAL_BLOCK} 
                    roomWidth={PLAYGROUND_HORIZANTAL_BLOCK}
                    onChangeVacuumPosition={setCurrentPosition}
                    initialValues={INITIAL_VALUES}
                    onReachedEdge={setReachedEdge}
                />
            </Grid>
        </Grid>
    )
}