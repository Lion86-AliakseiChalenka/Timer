import {reducer} from "./reducer";
import {createStore} from "redux";
export let store= createStore(reducer);
window.store = store;