import {applyMiddleware, legacy_createStore} from "redux";
import { postReducer } from "./PostsRedux/posts.reducer";
import thunk from "redux-thunk";

export const store = legacy_createStore(postReducer,applyMiddleware(thunk));