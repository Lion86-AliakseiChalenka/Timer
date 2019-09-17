const START = 'START';
const STOP = 'STOP';
const SKIP = 'SKIP';
const ADD_TIMER = 'ADDTIMER';
const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION';
const SET_TIMER_POSITION = 'SET_TIMER_POSITION';
const SET_ACTIVE_MODE = 'SET_ACTIVE_MODE';

export const setTimerInStart = (timerCount) => ({type: START, timerCount});
export const setTimerInStop = (timerCount) => ({type: STOP, timerCount});
export const setTimerInSkip = (bool, timerCount) => ({type: SKIP, bool, timerCount});
export const addTimer = (timerCount) => ({type: ADD_TIMER, timerCount});
export const setCurrentPosition = (currentCoords) => ({type: SET_CURRENT_POSITION, currentCoords});
export const setTimerPosition = (coords, timerCount) => ({type: SET_TIMER_POSITION, coords, timerCount});
export const setActiveMode = (bool, timerCount) => ({type: SET_ACTIVE_MODE, bool, timerCount});


let initialState = {
    timers: [],
    currentCoords: null,
    isNew: null
};


export let reducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case START:
            newState.timers.forEach(el => {
                    if (action.timerCount === el.timerCount)
                        newState.timers[action.timerCount].isStarted = true
                }
            );
            return {...newState, timers: [...newState.timers]};

        case STOP:
            newState.timers.map(el => {
                    if (action.timerCount === el.timerCount)
                        newState.timers[action.timerCount].isStarted = false
                }
            );
            return {...newState, timers: [...newState.timers]};


        case SKIP:
            newState.timers.map(el => {
                    if (action.timerCount === el.timerCount)
                        newState.timers[action.timerCount].isSkipped = action.bool
                }
            );
            return {...newState, timers: [...newState.timers]};

        case ADD_TIMER:
            return {
                ...state, timers: [...state.timers, {
                    timerCount: action.timerCount,
                    isStarted: false,
                    isSkipped: false,
                    coords: ['100px', '100px'],
                    isActive: null
                }],
                isNew: true
            };

        case SET_CURRENT_POSITION:
            return {...newState, currentCoords: action.currentCoords};

        case SET_ACTIVE_MODE:
            newState.timers.map(el => {
                    if (action.timerCount === el.timerCount)
                        newState.timers[action.timerCount].isActive = action.bool
                }
            );
            return {...newState, timers: [...newState.timers]};

        case SET_TIMER_POSITION:
            newState.timers.map(el => {
                    if (action.timerCount === el.timerCount)
                        newState.timers[action.timerCount].coords = action.coords
                }
            );
            return {...newState, timers: [...newState.timers]};

        default:
            return newState

    }

};