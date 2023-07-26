import React, { FC, useState, FormEvent, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { RootState } from '../../../../Stores/ConfigureStore';
import { setError, signin } from '../../../../Stores/UserAuth/User.action';
import Header from '../../../Layout/Header';


const SignIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: any = useDispatch();
  const { error } = useSelector((state: RootState) => state.UserReducer);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
    }
  }, [error, dispatch]);

  const isLogin = useSelector((state: RootState) => state.UserReducer.authenticated)

  const user= useSelector((state:RootState)=> state.UserReducer.user)

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (error) {
      dispatch(setError(''));
    }
    dispatch(signin({ email, password }));
  }

  if(isLogin && user.role == "User" && isLogin){
    return <Navigate to="/dashboard" />
  }

  if (isLogin && user.role=="Admin") {
    return <Navigate to="/Admindashboard" />
  }
  
  if(isLogin && user.role == "ProjectAdmin"){
    return <Navigate to="/Projectdashboard" />
  }

  if(isLogin && user.role == "Viewer"){
    return <Navigate to="/Viewerdashboard" />
  }


  return (
    <div>
      <Header/>
      <div className="col-lg-4 offset-md-4">
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <input className="form-control" type="email" name="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
          <br />
          <input className="form-control" type="password" name="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
          <br />
          <button type="submit" className='btn btn-primary'>Login</button>
        </form>
        <Link to="/signup" className="btn btn-link">SignUp</Link>
      </div>
    </div>
  )
}
export default SignIn;



