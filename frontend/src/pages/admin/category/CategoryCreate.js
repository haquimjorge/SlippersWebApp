import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createCategory,
  removeCategory,
  getCategories,
} from "../../../redux/actions/categoryActions";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((category) => setCategories(category.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name)
    setLoading(true);
    createCategory({ name })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created! `);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Are you sure you want to delete?")) {
      setLoading(true);
      removeCategory(slug)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <button className="btn btn-outline-primary">Upload</button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <AdminNav />
        </div>
        <div className="row">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create Category</h4>
          )}
          {categoryForm()}
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
          <hr />
          {categories.map((category) => (
            <div className="alert alert-secondary" key={category._id}>
              {category.name}{" "}
              <span
                onClick={() => handleRemove(category.slug)}
                className="btn btn-sm"
              >
                <Image
                  className="usuario"
                  src="../../assets/deletecross.png"
                  style={{ width: "2rem" }}
                ></Image>
              </span>
              <Link to={`/admin/category/${category.slug}`}>
                <span className="btn btn-sm">
                  <Image
                    className="usuario"
                    src="../../assets/editpencil.png"
                    style={{ width: "2rem" }}
                  ></Image>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
