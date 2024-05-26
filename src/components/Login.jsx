import React from 'react'
import { Welcome, Spec } from '../assets'

const Login = () => {
  return (
    <React.Fragment>
      <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 text-center" style={{ backgroundColor: '#2D85DE'}}>
              <div className="log-img">
                  <img src={ Welcome } alt=""/>
              </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6" style={{ backgroundImage: `url(${Spec})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center bottom'}}>

          </div>
      </div>
    </React.Fragment>
  )
}

export default Login
