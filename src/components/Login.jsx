import React, {useState } from 'react'
import { Welcome, Spec } from '../assets'
import './style.css'

const Login = () => {
  const [spin, setSpin] = useState(false);

  return (
    <React.Fragment>
      <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 text-center top-form" style={{ backgroundColor: '#2D85DE'}}>
              <div className="log-img">
                  <img src={ Welcome } alt=""/>
              </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 bottom-form" style={{ backgroundImage: `url(${Spec})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center bottom'}}>
                <form className='form-sec'>
                    <h2 className='text-center mb-5'>Login</h2>

                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder='Enter email here'/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder='Enter password here'/>
                    </div>
                    <button type="submit" className="log-btn">
                        {
                            spin ?(
                                <div className="spinner-border spinner-border-sm text-light" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            ): (
                                'Login'
                            )
                        }
                    </button>
                </form>
          </div>
      </div>
    </React.Fragment>
  )
}

export default Login
