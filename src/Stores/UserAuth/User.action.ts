import firebase, { db } from "../../Fire-config";
import { getAuth } from "firebase/auth";
import { Get_All_User, LOGIN, NEED_VERIFICATION, SET_ERROR, SignInData, SignUpData, SIGN_UP, User } from "./User.types";

export const signup = (data: SignUpData) => {
  return async (dispatch: any) => {
    try {
      const res = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
      if (res.user) {
        const userData: User = {
          userName: data.userName,
          role: data.role,
          email: data.email,
          id: res.user.uid
        };
        await firebase.firestore().collection('/users').doc(res.user.uid).set(userData);
        await res.user.updateProfile({ displayName: data.userName })
        await res.user.sendEmailVerification();
        dispatch({
          type: NEED_VERIFICATION
        });
        dispatch({
          type: SIGN_UP,
          payload: userData
        });
      }
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error
      });
      console.error(error)
    }
  }
}

export const signin = (data: SignInData) => {
  return async (dispatch: any) => {
    try {
      const res = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      let UserData
      await db.collection("users").where("email", "==", data.email).get()
        .then(snap => {
          snap.forEach(doc => {
            UserData = doc.data()
          });
        });
      if (res) {
        dispatch({
          type: LOGIN,
          payload: UserData
        });
      }
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error
      });
      console.error(error)
    }
  }
}

// export const GetAllUser=()=>{
//   return async (dispatch:any)=>{
//     try{
//      let userData
//       const res=await db.collection("users")
//       .get()
//       .then(QuerySnapshot => {
//         QuerySnapshot.forEach(element => {
//           userData =element.data()
//         });
//     });
//     const userList = userData
//       console.log("userList",userList)
//       dispatch({
//         type: Get_All_User,
//         payload: userList
//       })
//     }
//     catch (error) {
//       dispatch({
//         type: SET_ERROR,
//         payload: error
//       });
//       console.error(error)
//     }
//   }
// }

export const setError = (msg: string) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_ERROR,
      payload: msg
    });
  }
}