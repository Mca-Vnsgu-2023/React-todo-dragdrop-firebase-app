import { db } from "../../Fire-config";
import { getFirestore, collection, setDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import {Get_All_Todos, Get_By_TodoId, Get_By_TodoTask, TodoItems, Todo_Delete, Todo_Fail, Todo_Success, Todo_Update } from "./Todo.types";

export const addTodo = (data: TodoItems,projectId:string) => {
    return async (dispatch: any) => {
      try {
        const id = db.collection("Todos").doc().id;
        const TodoData = [{
          TodoName: data.TodoName,
          Description:data.Description,
          Status:data.Status,
          projectId:projectId,
          TodoId:id
        }]
        TodoData.forEach(TodoData => {
          db.collection("Todos").doc(id).set(TodoData);
        });
  
        dispatch(GetTodoTask(projectId))
        // dispatch({
        //   type: Todo_Success,
        //   payload: TodoData
        // });
      }
      catch (error) {
        dispatch({
          type: Todo_Fail,
          payload: error
        });
        console.error(error)
      }
    }
  }

  export const GetTodoTask = (ProjectId: string) => {
    return async (dispatch: any) => {
      try {
        
        let todoData: any[] = [];
        const res= await db.collection("Todos").where("projectId", "==", ProjectId)
        const query=await getDocs(res)
        query.forEach((doc)=>{
          todoData.push(doc.data())
        })
        const TaskData = todoData
  
        dispatch({
          type: Get_By_TodoTask,
          payload: TaskData
        })
      }
      catch (error) {
        dispatch({
          type: Todo_Fail,
          payload: error
        });
        console.error(error)
      }
    }
  }

  export const GetByIdTodo = (Todoid: string) => {
   
    return async (dispatch: any) => {
      try {
        let todoData;
        await db.collection("Todos")
        .where("TodoId", "==", Todoid)
        .get()
        .then(snap => {
            snap.forEach(doc => {
              todoData=doc.data()
            });
        });
        const taskData = todoData
        dispatch({
          type: Get_By_TodoId,
          payload: taskData
        })
      }
      catch (error) {
        dispatch({
          type: Todo_Fail,
          payload: error
        });
        console.error(error)
      }
    }
  }

  export const UpdateTodo = (Todoid:string, data:TodoItems,projectId:string) => {
    return async (dispatch: any) => {
      try {
        const docRef = doc(db, "Todos", Todoid);
        const TodoData = {
          TodoName: data.TodoName,
          Description:data.Description,
          Status:data.Status,
          projectId:projectId,
          TodoId:Todoid
        }
        setDoc(docRef,TodoData)
        
        dispatch(GetTodoTask(projectId))
        // projectData.forEach(projectData => {
        //   db.collection("project").doc(ProjectId).set(projectData);
        // });
      }
      catch (error) {
        dispatch({
          type:Todo_Fail,
          payload: error
        });
        console.error(error)
      }
    }
  }

  export const DeleteTodo = (Todoid:string) => {

    return async (dispatch: any) => {
      try {
        const docRef = doc(db, "Todos", Todoid);
        deleteDoc(docRef)

        dispatch({
          type:Todo_Delete,
          payload:{Todoid}
        })
      }
      catch (error) {
        dispatch({
          type:Todo_Fail,
          payload: error
        });
        console.error(error)
      }
    }
  }

  export const AllTodos = () => {
    return async (dispatch: any) => {
      try {
        let TaskData: any[] = [];
        const res = await db.collection("Todos")
        const query = await getDocs(res)
        query.forEach((doc) => {
          TaskData.push(doc.data())
        })
        const TodoData = TaskData
        dispatch({
          type: Get_All_Todos,
          payload: TodoData
        })
      }
      catch (error) {
        dispatch({
          type: Todo_Fail,
          payload: error
        });
        console.error(error)
      }
    }
  }