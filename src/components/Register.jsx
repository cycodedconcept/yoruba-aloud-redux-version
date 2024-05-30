import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRegisterFormData, submitForm } from '../features/registerSlice';
import { Welcome2, Spec } from '../assets'
import './style.css'

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, password, password_confirmation, spinItem, error, success } = useSelector((state) => state.form);

const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setRegisterFormData({ field: name, value }));
};

const handleRegister = (e) => {
    e.preventDefault();
    const formData = { name, email, password, password_confirmation };
    dispatch(submitForm(formData));
};

useEffect(() => {
    if (success) {
      navigate('/');
    }
}, [success, navigate]);

  return (
    <div>
      <React.Fragment>
      <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 text-center top-form" style={{ backgroundColor: '#2D85DE'}}>
              <div className="log-img">
                  <img src={ Welcome2 } alt=""/>
              </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 bottom-form" style={{ backgroundImage: `url(${Spec})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center bottom'}}>
                <form className='form-sec' onSubmit={handleRegister}>
                    <h2 className='text-center mb-5'>Login</h2>

                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" placeholder='Enter Fullname here' name="name" value={name} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder='Enter email here' name='email' value={email} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Enter Password</label>
                        <input type="password" className="form-control" placeholder='Enter password here' name='password' value={password} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" placeholder='Confirm password here' name='password_confirmation' value={password_confirmation} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="log-btn" onClick={ handleRegister }>
                        {
                            spinItem ? (
                                <div className="spinner-border spinner-border-sm text-light" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            ): (
                                'Sign Up'
                            )
                        }
                    </button>
                    {error && <p className="text-danger">Error: {error}</p>}
                    {success && <p className="text-success">Registration successful!</p>}
                </form>
          </div>
      </div>
    </React.Fragment>
    </div>
  )
}

export default Register
