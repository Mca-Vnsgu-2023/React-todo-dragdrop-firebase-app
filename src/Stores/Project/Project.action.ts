import firebase, { db } from "../../Fire-config";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { AddProject, Get_All_Project, Get_By_Project, Get_By_ProjectId, Project_Delete, Project_Fail, Project_Success } from "./Project.types";

export const addproject = (data: AddProject, Uid: string) => {
  return async (dispatch: any) => {
    try {
      // const project = db.collection("project").add({
      //     projectName: data.projectName, 
      //     userId:userID,
      // })
      const id = db.collection("project").doc().id;
      const projectData = [{
        projectName: data.projectName,
        userId: Uid,
        projectId: id
      }]
      projectData.forEach(projectData => {
        db.collection("project").doc(id).set(projectData);
      });

      dispatch(GetAllProject(Uid))
      // dispatch({
      //   type: Project_Success,
      //   payload: projectData
      // });
    }
    catch (error) {
      dispatch({
        type: Project_Fail,
        payload: error
      });
      console.error(error)
    }
  }
}

export const GetAllProject = (Uid: string) => {
  return async (dispatch: any) => {
    try {
      let proData: any[] = [];
      const res = await db.collection("project").where("userId", "==", Uid)
      const query = await getDocs(res)
      query.forEach((doc) => {
        proData.push(doc.data())
      })
      // await db.collection("project").where("userId", "==", Uid)
      // .get()
      // .then(snap => {
      //     snap.forEach(doc => {
      //       proData.push(doc.data())
      //         // console.log("foreach",proData);
      //     });
      // });
      const projectData = proData

      dispatch({
        type: Get_By_Project,
        payload: projectData
      })
    }
    catch (error) {
      dispatch({
        type: Project_Fail,
        payload: error
      });
      console.error(error)
    }
  }
}

export const GetByIdProject = (ProjectId: string) => {
  return async (dispatch: any) => {
    try {
      let proData;
      await db.collection("project")
        .where("projectId", "==", ProjectId)
        .get()
        .then(snap => {
          snap.forEach(doc => {
            proData = doc.data()
          });
        });
      const projectData = proData
      dispatch({
        type: Get_By_ProjectId,
        payload: projectData
      })
    }
    catch (error) {
      dispatch({
        type: Project_Fail,
        payload: error
      });
      console.error(error)
    }
  }
}

export const UpdateProject = (ProjectId: string, data: AddProject, Uid: string) => {

  return async (dispatch: any) => {
    try {
      const docRef = doc(db, "project", ProjectId);
      const projectData = {
        projectName: data.projectName,
        userId: Uid,
        projectId: ProjectId
      }
      setDoc(docRef, projectData)
      // projectData.forEach(projectData => {
      //   db.collection("project").doc(ProjectId).set(projectData);
      // });

      dispatch(GetAllProject(Uid))
    }
    catch (error) {
      dispatch({
        type: Project_Fail,
        payload: error
      });
      console.error(error)
    }
  }
}

export const DeleteProject = (ProjectId: string) => {
  return async (dispatch: any) => {
    try {

      const docRef = doc(db, "project", ProjectId);
      deleteDoc(docRef)

      dispatch({
        type: Project_Delete,
        payload: { ProjectId }
      })
    }
    catch (error) {
      dispatch({
        type: Project_Fail,
        payload: error
      });
      console.error(error)
    }
  }
}

export const AllProject = () => {
  return async (dispatch: any) => {
    try {
      let proData: any[] = [];
      const res = await db.collection("project")
      const query = await getDocs(res)
      query.forEach((doc) => {
        proData.push(doc.data())
      })
      const projectData = proData
      dispatch({
        type: Get_All_Project,
        payload: projectData
      })
    }
    catch (error) {
      dispatch({
        type: Project_Fail,
        payload: error
      });
      console.error(error)
    }
  }
}