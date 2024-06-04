import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dashboardItem } from '../features/dashboardSlice';
import './pages.css'

const Cards = () => {
  const dispatch = useDispatch();
  const { error, success, data } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (success === 'idle') {
      const token = localStorage.getItem("key");
      const customHeaders = {
        'Content-Type': 'application/json'
      }
      dispatch(dashboardItem({token, customHeaders}));
    }
  }, [success, dispatch]);
  return (
    <React.Fragment>
      {success === 'failed' && <p>Error: {error}</p>}
      <div className="card-container">
        {success === 'succeeded' &&
          console.log(data.total_number_of_learningmaterial)}
      </div>
    </React.Fragment>
  )
}

export default Cards
