import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateCategory,
  getCategory,
} from "../../../redux/actions/categoryActions";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import CategoryForm from "../../../components/CategoryForm";

const CategoryUpdate = ({ history }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  let { slug } = useParams();

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(slug).then((category) => setName(category.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name)
    setLoading(true);
    updateCategory(slug, { name })
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
        <div className="col-md-12">
          <AdminNav />
        </div>
        <div className="row">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update Category</h4>
          )}
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
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
