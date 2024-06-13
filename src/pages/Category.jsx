import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catForm, getCatData } from '../features/categorySlice';
import Cards from './Cards';
import './pages.css';

const Category = () => {
  const dispatch = useDispatch();
  const { spinItem, error, getCategoryData, categoryStatus } = useSelector((state) => state.cat);
  const [showTable, setShowTable] = useState(true);
  const [formData, setFormData] = useState({ name: '', image: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0], // Assuming you're dealing with single file upload
    }));
  };

  const createCategory = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('key');
    const customHeaders = {
      'Content-Type': 'multipart/form-data',
    };
    dispatch(catForm({ formData, token, customHeaders }));
  };

  useEffect(() => {
    const token = localStorage.getItem('key');
    const customHeaders = {
      'Content-Type': 'application/json',
    };

    if (categoryStatus === 'idle') {
      dispatch(getCatData({ token, customHeaders }));
    }

  }, [categoryStatus, dispatch]);

  const dataCat = getCategoryData.map((item) => 
    <div className="search-card" key={item.id}>
      <p>{item.name}</p>
      <img src={item.image} alt={item.image} />
      <div className="text-right">
        <button className="update-button">Update</button>
        <button className="delete-button">Delete</button>
      </div>
    </div>
  )

  return (
    <div>
      <Cards showFirstElement={showTable} />

      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-6">
          <h2 className="text-center mt-5">Add Categories</h2>
          <form id="catForm" onSubmit={createCategory}>
            <label className="font-mulish font-size-14 font-weight-600">Categories</label>
            <input
              type="text"
              id="cat"
              className="input mb-3"
              placeholder="Enter Categories Here"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label className="font-mulish font-size-14 font-weight-600">Category Images</label>
            <input
              type="file"
              name="image"
              id="imcat"
              className="input mb-3"
              placeholder="Enter Categories Here"
              onChange={handleFileChange}
            />

            <button className="button button-blue font-weight-700" type="submit">
              {spinItem ? (
                <div className="spinner-border spinner-border-sm text-light" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                'Create Category'
              )}
            </button>
          </form>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6">
          <div className="scroll-bg">
            <div className="scroll-div">
              <div className="scroll-object">
                {dataCat}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
