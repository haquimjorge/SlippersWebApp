import React, {useState} from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CategoryCreate from '../pages/admin/category/CategoryCreate'
import AdminShoes from "./AdminShoes";
import AdminCategory from "../pages/admin/category/AdminCategories";
import AdminCategoryTab from "../pages/admin/category/AdminCategoryTab";


const AdminNav = () => {
  const [key, setKey] = useState('dashboard');
  return (
    <>
    
    {/* <nav>
      <ul className="nav flex-row">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/shoe" className="nav-link">
            Shoe
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/shoes" className="nav-link">
            Shoes
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/category" className="nav-link">
            Category
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/subcategory" className="nav-link">
            Sub Category
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/coupons" className="nav-link">
            Coupons
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/password" className="nav-link">
            Password
          </Link>
        </li>
      </ul>
    </nav> */}
     <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="dashboard" title="Dashboard">
        <p>estadisticas quizas</p>
      </Tab>
      <Tab eventKey="shoes" title="Shoes">
      <p>Here you can delete, edit and upload shoes. To edit, simply click on pencil icon. To delete, click "Delete" button (This action is permanent). To upload, go to "Upload Shoe" tab and fill the form.</p>
      <AdminShoes />
      </Tab>
      <Tab eventKey="category" title="Category">
      {/* <CategoryCreate /> */}
      <AdminCategoryTab/>
      </Tab>
      <Tab eventKey="subcategroy" title="SubCategory">
        <p>suibcategory</p>
      </Tab>
      <Tab eventKey="coupons" title="Coupons">
        <p>coupons</p>
      </Tab>
      <Tab eventKey="password" title="Password">
        <p>passwords</p>
      </Tab>
    </Tabs> 
    </>
  );
};

export default AdminNav;
