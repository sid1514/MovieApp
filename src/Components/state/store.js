import { createStore } from "redux";
import { MoveiReducer } from "./reducer";

export const store=createStore(MoveiReducer)