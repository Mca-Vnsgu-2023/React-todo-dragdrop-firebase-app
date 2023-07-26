
import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { RootState } from '../../../../Stores/ConfigureStore';
import { setError, signup } from '../../../../Stores/UserAuth/User.action';
import Header from '../../../Layout/Header';


const SignUp: FC = () => {
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: any = useDispatch();
  const { error } = useSelector((state: RootState) => state.UserReducer);

  // const initialState = {
  //   Username: '',
  //   Email: '',
  //   Password: ''
  // };

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
    }
  }, [error, dispatch]);

  const isSignUp = useSelector((state: RootState) => state.UserReducer.isSignup)

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (error) {
      dispatch(setError(''));
    }
    dispatch(signup({ userName, role, email, password }));
  }

  if (isSignUp) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <Header />
      <div className="col-lg-4 offset-md-4">
        <h2>SignUp</h2>
        <form onSubmit={submitHandler}>
          <input className="form-control" type="text" name="userName" placeholder="Enter Your Name" value={userName} onChange={(e) => setUserName(e.currentTarget.value)} />
          <br />
          <select className='form-control' name="role" value={role} onChange={(e) => setRole(e.currentTarget.value)}>
            <option value="" selected disabled hidden>Choose your Role...</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="ProjectAdmin">ProjectAdmin</option>
            <option value="Viewer">Viewer</option>
          </select>
          {/* <input className="form-control" type="text" name="role" placeholder="Enter Your role" value={role}  onChange={(e) => setRole(e.currentTarget.value)} /> */}
          <br />
          <input className="form-control" type="email" name="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
          <br />
          <input className="form-control" type="password" name="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
          <br />
          <button type="submit" className='btn btn-primary'>SignUp</button>
        </form>
        <Link to="/login" className="btn btn-link">Login</Link>
      </div>
    </div>
  )
}
export default SignUp;