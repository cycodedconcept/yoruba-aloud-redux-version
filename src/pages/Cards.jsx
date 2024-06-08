import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData, fetchTopThreeData } from '../features/dashboardSlice';
import './pages.css';

const Cards = () => {
  const dispatch = useDispatch();
  
  const { dashboardData, topThreeData, dashboardStatus, topThreeStatus, error, mode } = useSelector((state) => state.api);

  useEffect(() => {
    const token = localStorage.getItem('key');
    const customHeaders = {
      'Content-Type': 'application/json',
    };

    if (dashboardStatus === 'idle') {
      dispatch(fetchDashboardData({ token, customHeaders }));
    }

    if (topThreeStatus === 'idle') {
      dispatch(fetchTopThreeData({ token, customHeaders }));
    }
  }, [dashboardStatus, topThreeStatus, dispatch]);

  const cardItem = [
    {
      id: 0,
      lineicon: 'las la-clipboard-list',
      content: 'Total Categories',
      contentValue: dashboardData.total_number_of_categories,
    },
    {
      id: 1,
      lineicon: 'las la-layer-group',
      content: 'Learning Materials',
      contentValue: dashboardData.total_number_of_learningmaterial,
    },
    {
      id: 2,
      lineicon: 'las la-file-invoice',
      content: 'Total Subcategories',
      contentValue: dashboardData.total_number_of_subcategories,
    },
    {
      id: 3,
      lineicon: 'las la-check-square',
      content: 'Total Quiz',
      contentValue: dashboardData.total_number_of_quize,
    },
    {
      id: 4,
      lineicon: 'las la-user-graduate',
      content: 'Total Students',
      contentValue: dashboardData.total_number_of_students,
    },
    {
      id: 5,
      content: <button className="top-three">Top three Students</button>,
    },
  ];

  const cardDisplay = cardItem.map((item) => (
    <div className="card-single mb-3" key={item.id}>
      <div className="card-body">
        <span className={item.lineicon} style={{ color: '#b6cc00', fontSize: '32px' }}></span>
        <div>
          <h6>{item.content}</h6>
          <h5>{item.contentValue}</h5>
        </div>
      </div>
    </div>
  ));

  const topItem = topThreeData.map((item) => 
    <div className="student-card" key={item.id}>
      <p><span className="clent">Name</span>: <span className="swichItem">${item.name}</span></p>
      <p><span className="clent">Email</span>: <span className="swichItem">${item.email}</span></p>
      <p><span className="clent">Phone</span>: <span className="swichItem">${item.phone_number}</span></p>
      <p><span className="clent">Position</span>: <span className="swichItem">${item.position}</span></p>
      <p><span className="clent">Score</span>: <span className="swichItem">${item.total_score}</span></p>
    </div>
  )

  return (
    <React.Fragment>
      {dashboardStatus === 'failed' && <p>Error: {error}</p>}
      <div className="card-container">
        {dashboardStatus === 'succeeded' && (
          <div className="dash-cards">
            {cardDisplay}
          </div>
        )}
      </div>
      {topThreeStatus === 'failed' && <p>Error: {error}</p>}
      {mode ? (
        <div id="dash-modal" className="mymodal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Top three students</h2>
              <span className="close">&times;</span>
            </div>
            <div className="modal-body">
              { topItem }
            </div>
          </div>
        </div>
      ):('')
    }
    </React.Fragment>
  );
};

export default Cards;
