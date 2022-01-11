import React, {useState} from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CategoryCreate from '../pages/admin/category/CategoryCreate'


const AdminNav = () => {
  const [key, setKey] = useState('home');
  return (
    <>
    
    <nav>
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
    </nav>
    {/* <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="dashboard" title="Dashboard">
        
      </Tab>
      <Tab eventKey="shoe" title="Shoe">
        
      </Tab>
      <Tab eventKey="shoes" title="Shoes">
        
      </Tab>
      <Tab eventKey="category" title="Category">
      <CategoryCreate/>
      </Tab>
      <Tab eventKey="subcategroy" title="SubCategory">
        
      </Tab>
      <Tab eventKey="coupons" title="Coupons">
        
      </Tab>
      <Tab eventKey="password" title="Password">
        
      </Tab>
    </Tabs> */}
    </>
  );
};

export default AdminNav;
