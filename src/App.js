import React from 'react';
import Timer from "./Timer";
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {
    addTimer,
    setTimerInSkip,
    setTimerInStart,
    setTimerInStop,
    setCurrentPosition,
    setTimerPosition, setActiveMode
} from "./redux/reducer";
import Grid from "@material-ui/core/es/Grid/Grid";

let timerCount = 0;
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(3, 3),
        backgroundColor: '#f5f5f5',
        width: '100%',
        height: '100vh'
    },
    buttonAdd: {
        position: 'fixed',
        top: '24px',
        right: '50px',
        backgroundColor: '#fff',
        border: '1px solid gray',
        color: 'gray',
        '&:hover': {
            border: '1px solid black'
        }
    },

}));

let App = (props) => {
    const classes = useStyles();
    let TIMER = props.timers.map(el => <div key={el.timerCount}><Timer timerCount={el.timerCount}
                                                                       setCurrentPosition={props.setCurrentPosition}
                                                                       setTimerPosition={props.setTimerPosition}
                                                                       setActiveMode={props.setActiveMode}
                                                                       isStarted={el.isStarted}
                                                                       isActive={el.isActive}
                                                                       isSkipped={el.isSkipped}
                                                                       setTimerInStart={props.setTimerInStart}
                                                                       setTimerInStop={props.setTimerInStop}
                                                                       setTimerInSkip={props.setTimerInSkip}
                                                                       isNew={props.isNew}
                                                                       timerCoords={el.coords}
                                                                       currentCoords={props.currentCoords}/></div>);

    let addNewTimer = () => {
        props.addTimer(timerCount++)
    };

    let onMouseMoveHandler = (e) => {
        props.setCurrentPosition([e.pageX, e.pageY]);
        props.timers.forEach(el => {
            return (el.isActive === false) ? props.setTimerPosition([e.pageX, e.pageY]): null})
    };

    return (
        <div>
            <div className={classes.root} onMouseMove={onMouseMoveHandler}>
                <Grid container justify={'center'} spacing={3}>
                    <Grid container item xs={6}>
                        {TIMER}
                    </Grid>
                </Grid>
            </div>
            <Button onClick={addNewTimer} className={classes.buttonAdd} color={'primary'}>Add new Timer</Button>
        </div>
    )
};

let mstp = (state) => {
    return ({
            timers: state.timers,
            currentCoords: state.currentCoords,
            isNew: state.isNew
        }
    )
};


export default connect(mstp, {
    setTimerInStart,
    setActiveMode,
    setTimerInStop,
    setTimerInSkip,
    addTimer,
    setCurrentPosition,
    setTimerPosition
})(App);
