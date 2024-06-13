import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoginFormData, submitForm } from '../features/loginSlice';
import { Welcome, Spec } from '../assets'
import './style.css'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, spinItem, error, success } = useSelector((state) => state.login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setLoginFormData({ field: name, value }));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = { email, password };
    dispatch(submitForm(formData));
  };
  useEffect(() => {
    if (success) {
      navigate('/dashboard');
    }
  }, [success, navigate]);

  return (
    <React.Fragment>
      <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 text-center top-form" style={{ backgroundColor: '#2D85DE'}}>
              <div className="log-img">
                  <img src={ Welcome } alt=""/>
              </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 bottom-form" style={{ backgroundImage: `url(${Spec})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center bottom'}}>
                <form className='form-sec' onSubmit={handleLogin}>
                    <h2 className='text-center mb-5'>Login</h2>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder='Enter email here' name='email' value={email} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                         <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder='Enter password here' name='password' value={password} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="log-btn">
                        {
                            spinItem ?(
                                <div className="spinner-border spinner-border-sm text-light" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            ): (
                                'Login'
                            )
                        }
                    </button>
                    {error && <p className="text-danger">Error: {error}</p>}
                    {success && <p className="text-success">Registration successful!</p>}
                </form>
          </div>
      </div>
    </React.Fragment>
  )
}

export default Login
