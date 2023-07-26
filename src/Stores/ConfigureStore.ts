import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk';
import ProjectReducer from './Project/Project.reducer';
import TodoReducer from './Todo/Todo.reducer';
import UserReducer from './UserAuth/User.reducer';

const  rootReducer = combineReducers({
    UserReducer,
    ProjectReducer,
    TodoReducer

})

export default function configureStore(initialState?: {}) {
    const middleware = [thunk]
    const enhancers = [];
    const windowIfDefined = typeof window === 'undefined' ? null : window as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
      enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }
  
    return createStore(rootReducer, compose(applyMiddleware(...middleware), ...enhancers))
  }

  export type RootState = ReturnType<typeof rootReducer>