export const Todo_Success="Todo_Success"

export const Todo_Fail="Todo_Fail"

export const Get_By_TodoTask="Get_By_TodoTask"

export const Get_All_Todos="Get_All_Todos"

export const Get_By_TodoId="Get_By_TodoId"

export const Todo_Update="Todo_Update"

export const Todo_Delete="Todo_Delete"

export interface TodoItems{
    TodoName: string,
    Description: string,
    Status:string,
    projectId: string
}