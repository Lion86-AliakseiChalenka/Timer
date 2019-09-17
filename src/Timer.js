import React, {useEffect, useState, useRef} from 'react';
import Paper from "@material-ui/core/es/Paper/Paper";
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/es/Button/Button";
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from "@material-ui/core/es/Grid/Grid";
import {SecInTimerConverter, timerInSecConverter} from "./Converters";

let Timer;
Timer = ({
             setCurrentPosition,
             setTimerPosition,
             currentCoords,
             timerCoords,
             isStarted,
             isSkipped,
             setTimerInSkip,
             setTimerInStart,
             setTimerInStop,
             timerCount,
             isNew,
             setActiveMode,
             isActive
         }) => {
    const inputTimer = useRef(null);

    let [countSec, setCountSec] = useState('00:05:00');

    let onStartStopHandler = (e) => {
        e.stopPropagation();
        if (!isStarted) {
            setTimerInStart(timerCount)
        }
        else {
            setTimerInStop(timerCount)
        }
    };
    let cancelPropogationHandler = (e) => {
        e.stopPropagation()
    };
    let onSkipHandler = (e) => {
        e.stopPropagation();
        setTimerInSkip(true, timerCount)

    };
    let onMouseUpHandler = () => {
        setActiveMode(false, timerCount);
        setTimerPosition(currentCoords, timerCount)
    };
    let onMouseDownHandler = () => {
        setActiveMode(true, timerCount)
    };


    useEffect(() => {
        if (isStarted === true) {
            let stopInterval = setInterval(() => {
                setCountSec(SecInTimerConverter(timerInSecConverter(inputTimer.current.childNodes[1].childNodes[0].value) - 1))
            }, 1000);
            return () => clearInterval(stopInterval)
        }
    });
    useEffect(() => {
        if (isSkipped) {
            setCountSec('00:05:00');
            setTimerInSkip(false, timerCount)
        }
    });

    const useStyles = makeStyles(theme => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        paper: {
            position: 'absolute',
            top: (isNew && isActive === null && timerCoords[1])
            || (isActive === true && `${currentCoords[1] - 20}px`)
            || (isActive === false && `${timerCoords[1] - 20}px`),
            left: (isNew && isActive === null && timerCoords[0])
            || (isActive === true && `${currentCoords[0] - 20}px`)
            || (isActive === false && `${timerCoords[0] - 20}px`),
            padding: theme.spacing(2),
            width: 'max-content',
            margin: '10px',
            backgroundColor: isStarted ? '#FFE4E1' : '#fff'
        },
        button: {
            width: '60px'
        }
    }));
    const classes = useStyles();

    return (
        <Grid item>
            <Paper onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler}
                   className={classes.paper}>
                <form className={classes.container} noValidate>
                    <TextField
                        id="time"
                        label={`Timer ${timerCount + 1}`}
                        type="time"
                        ref={inputTimer}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 1,
                        }}
                        value={countSec}
                    />
                </form>
                <ButtonGroup size="small">
                    {isStarted
                        ?
                        <Button className={classes.button} onMouseDown={onStartStopHandler}
                                onMouseUp={cancelPropogationHandler}>
                            Stop
                        </Button>
                        :
                        <Button className={classes.button} onMouseDown={onStartStopHandler}
                                onMouseUp={cancelPropogationHandler}>
                            Start
                        </Button>}
                    <Button onMouseDown={onSkipHandler} onMouseUp={cancelPropogationHandler}>
                        Skip
                    </Button>
                </ButtonGroup>
            </Paper>
        </Grid>
    )
};


export default Timer;
