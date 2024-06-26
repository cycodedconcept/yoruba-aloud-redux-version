import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catForm, getCatData, deleteCategory, updateCategory, createSubcategory } from '../features/categorySlice';
import Cards from './Cards';
import './pages.css';

const Category = () => {
  const dispatch = useDispatch();
  const { spinItem, error, getCategoryData, categoryStatus, deleteCategoryStatus, updateCategoryStatus, subCategoryStatus } = useSelector((state) => state.cat);
  const [showTable, setShowTable] = useState(true);
  const [formData, setFormData] = useState({ name: '', image: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [overall, setOverAll] = useState(true);

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
      [name]: files[0],
    }));
  };

  const createCategory = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('key');
    if (!token) {
      console.error('No token found');
      return;
    }
    const customHeaders = {
      'Content-Type': 'multipart/form-data',
    };
    dispatch(catForm({ formData, token, customHeaders })).then(() => {
      setFormData({ name: '', image: '' });
      dispatch(getCatData({ token, customHeaders }));
    });
  };

  const updateCategoryItem = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('key');
    if (!token) {
      console.error('No token found');
      return;
    }

    const updatedFormData = new FormData();
    updatedFormData.append('name', formData.name);
    if (formData.image) {
      updatedFormData.append('image', formData.image);
    }
    updatedFormData.append('category_id', currentCategoryId);

    const customHeaders = {
      'Content-Type': 'multipart/form-data',
    };
    dispatch(updateCategory({ formData: updatedFormData, category_id: currentCategoryId, token, customHeaders })).then(() => {
      setFormData({ name: '', image: '' });
      setIsModalOpen(false);
      dispatch(getCatData({ token, customHeaders }));
    });
  };

  const subCategory = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('key');
    if (!token) {
      console.log('No token found!');
      return;
    }

    const subcate = new FormData();
    subcate.append('name', formData.name);
    if (formData.image) {
      subcate.append('image', formData.image);
    }
    subcate.append('category_id', currentCategoryId);

    const customHeaders = {
      'Content-Type': 'multipart/form-data'
    };

    dispatch(createSubcategory({ formData: subcate, category_id: currentCategoryId, token, customHeaders })).then(() => {
      setFormData({ name: '', image: '' });
      dispatch(getCatData({ token, customHeaders }));
    });
  }

  const showModal = (id) => {
    setCurrentCategoryId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleDelete = (id) => {
    const token = localStorage.getItem('key');
    if (!token) {
      console.error('No token found');
      return;
    }
    const customHeaders = {
      'Content-Type': 'application/json',
    };
    console.log('Deleting category with token:', token, 'and category_id:', id);
    dispatch(deleteCategory({ id, token, customHeaders })).then(() => {
      dispatch(getCatData({ token, customHeaders }));
    });
  };

  const gotoDetails = (id) => {
    setCurrentCategoryId(id);
    setOverAll(false)
  }

  useEffect(() => {
    const token = localStorage.getItem('key');
    if (!token) {
      console.error('No token found');
      return;
    }
    const customHeaders = {
      'Content-Type': 'application/json',
    };

    if (categoryStatus === 'idle') {
      dispatch(getCatData({ token, customHeaders }));
    }
    if (deleteCategoryStatus === 'idle') {
      dispatch(deleteCategory({ token, customHeaders }));
    }
    
    if (updateCategoryStatus === 'idle') {
      dispatch(updateCategory({ token, customHeaders }));
    }

    if (subCategoryStatus === 'idle') {
      dispatch(createSubcategory({ token, customHeaders }));
    }
  }, [categoryStatus, deleteCategoryStatus, updateCategoryStatus, subCategoryStatus, dispatch]);

  const dataCat = getCategoryData.map((item) => (
    <div className="search-card" key={item.id}>
      <p>{item.name}</p>
      <img src={item.image} alt={item.name} onClick={() => gotoDetails(item.id)}/>
      <div className="text-right">
        <button className="update-button" onClick={() => showModal(item.id)}>Update</button>
        <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
      </div>
    </div>
  ));

  return (
    <>
    {overall ? (
      <>
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

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content2">
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
              <div className="modal-body">
                <form id="catForm" onSubmit={updateCategoryItem}>
                  <label className="font-mulish font-size-14 font-weight-600">Update Category Name</label>
                  <input
                    type="text"
                    id="cat"
                    className="input mb-3"
                    placeholder="Enter Categories Here"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <label className="font-mulish font-size-14 font-weight-600">Change Category Image</label>
                  <input
                    type="file"
                    name="image"
                    id="imcat"
                    className="input mb-3"
                    onChange={handleFileChange}
                  />

                  <button className="button button-blue font-weight-700" type="submit">
                    {spinItem ? (
                      <div className="spinner-border spinner-border-sm text-light" role="status">
                        <span className="sr-only"></span>
                      </div>
                    ) : (
                      'Update Category'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    ) : (
      <div className="sub-category-section">
        <form id="catForm" onSubmit={subCategory}>
          <label className="font-mulish font-size-14 font-weight-600">Subcategory Name</label>
          <input
            type="text"
            id="cat"
            className="input mb-3"
            placeholder="Enter Categories Here"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label className="font-mulish font-size-14 font-weight-600">Subcategory Image</label>
          <input
            type="file"
            name="image"
            id="imcat"
            className="input mb-3"
            onChange={handleFileChange}
          />

          <button className="button button-blue font-weight-700" type="submit">
            {spinItem ? (
              <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              'Create SubCategory'
            )}
          </button>
        </form>
      </div>
    )}
  </>
  );
};

export default Category;
