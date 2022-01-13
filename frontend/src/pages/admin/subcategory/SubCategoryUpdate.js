import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createCategory,
  removeCategory,
  getCategories,
} from "../../../redux/actions/categoryActions";
import {
  getSubCategories,
  getSubCategory,
  removeSubCategory,
  updateSubCategory,
  createSubCategory,
} from "../../../redux/actions/subCategoryActions";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import CategoryForm from "../../../components/CategoryForm";
import LocalSearch from "../../../components/LocalSearch";
import { useParams } from "react-router-dom";

const SubCategoryUpdate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [parent, setParent] = useState("");

  let { slug } = useParams();

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);

  const loadCategories = () =>
    getCategories().then((category) => setCategories(category.data));

  const loadSubCategory = () =>
    getSubCategory(slug).then((subcategory) => {
      setName(subcategory.data.name);
      setParent(subcategory.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name)
    setLoading(true);
    updateSubCategory(slug, { name, parent })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated! `);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-md-12">
          <AdminNav />
        </div> */}
        <div className="row">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update Sub-Category</h4>
          )}

          <div className="form-group">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option value="">Select a Category</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    selected={category._id === parent}
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategoryUpdate;
