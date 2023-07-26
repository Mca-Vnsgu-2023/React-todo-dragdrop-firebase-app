import { Get_All_Project, Get_By_Project, Get_By_ProjectId, Project_Delete, Project_Success } from "./Project.types"

const defaultState = {
    List: [],
    projectname: '',
    // Uid: 0
}

const ProjectReducer = (state = defaultState, action: any) => {
    switch (action.type) {

        case Project_Success:
            return {
                ...state,
                List: action.payload
            }
        case Get_By_Project:
            return {
                ...state,
                List: action.payload
            }
        case Get_By_ProjectId:
            return {
                ...state,
                projectname: action.payload
            }
        case Project_Delete:
            return {
                ...state,
                List: action.payload
            }
        case Get_All_Project:
            return{
                ...state,
                List:action.payload
            }
        default:
            return state
    }
}

export default ProjectReducer