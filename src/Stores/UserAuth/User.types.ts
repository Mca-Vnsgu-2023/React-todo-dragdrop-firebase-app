export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';
export const LOGIN = 'LOGIN';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SET_SUCCESS = 'SET_SUCCESS';
export const Get_All_User ='Get_All_User';
// export const SET_MESSAGE = "SET_MESSAGE";


export interface User{
    userName:string;
    role:string;
    email:string;
    id:string;
}
export interface AuthState {
    user: User | null;
    authenticated: boolean;
    error: string;
    needVerification: boolean;
    isSignup:boolean
  }
  
  export interface SignUpData {
    userName: string;
    role: string;
    email: string;
    password: string;
  }
  
  export interface SignInData {
    email: string;
    password: string;
  }

