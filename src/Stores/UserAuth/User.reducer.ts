
import { AuthState, LOGIN, NEED_VERIFICATION, SIGN_UP } from "./User.types"

const initialState: AuthState = {
    user: null,
    authenticated: false,
    error: '',
    needVerification: false,
    isSignup:false,
    // isLogin:false
  }
  
  export default (state = initialState, action: any) => {
    
    switch(action.type) {

      // case Get_All_User:
      //   return{
      //     ...state,
      //     user:action.payload
      //   }

      case SIGN_UP:
        localStorage.setItem("Role",(action.payload.role));
        return {
          ...state,
          user: action.payload,
          isSignup : true
        }
  
      case NEED_VERIFICATION:
        return {
          ...state,
          needVerification: true,
        }
      
        case LOGIN:
          localStorage.setItem("UserName",(action.payload.userName));
          localStorage.setItem("UserId",(action.payload.id));
          return{
            ...state,
            user: action.payload,
            authenticated: true,
            // isLogin : true 
          }

      default: 
        return state;
    }
  }