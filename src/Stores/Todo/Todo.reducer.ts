import { Get_All_Todos, Get_By_TodoId, Get_By_TodoTask, Todo_Delete, Todo_Success, Todo_Update } from "./Todo.types"

const defaultState = {
    List: [],
    todoname:'',
}
const TodoReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case Todo_Success: {
            return {
                ...state,
                List: action.payload
            }
        }
        case Get_By_TodoTask: {
            return {
                ...state,
                List: action.payload
            }
        }
        case Get_By_TodoId: {
            return {
                ...state,
                todoname: action.payload
            }
        }
        case Todo_Delete: {
            return {
                ...state,
                List: action.payload
            }
        }
        case Get_All_Todos: {
            return {
                ...state,
                List: action.payload
            }
        }

        default:
            return state
    }
}

export default TodoReducer