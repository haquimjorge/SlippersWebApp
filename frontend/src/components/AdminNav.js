import React, {useState} from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CategoryCreate from '../pages/admin/category/CategoryCreate'
import AdminShoes from "./AdminShoes";
import AdminCategory from "../pages/admin/category/AdminCategories";
import AdminCategoryTab from "../pages/admin/category/AdminCategoryTab";
import SubCategoryCreate from "../pages/admin/subcategory/SubCategoryCreate";
import AdminUsersTab from "./AdminUsersTab"


const AdminNav = () => {
  const [key, setKey] = useState('shoes');
  return (
    <>
     <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      {/* <Tab eventKey="shoes" title="Dashboard">
        <p>estadisticas quizas</p>
        <p>cantidad de zapatos uploaded</p>
        <p>cantidad de categorias y subcategorias</p>
        <p>cuentas admin</p>
        <p>cantidad de cuentas creadas</p>
        <p>cantidad de ventas realizadas (quizas un grafico)</p>
      </Tab> */}
      <Tab eventKey="shoes" title="Shoes" className="admin-tab-shoes">
      <p>Here you can delete, edit and upload shoes. To edit, simply click on pencil icon. To delete, click "Delete" button (This action is permanent). To upload, go to "Upload Shoe" tab and fill the form.</p>
      <AdminShoes />
      </Tab>
      <Tab eventKey="category" title="Categories">
      <AdminCategoryTab/>
      </Tab>
      <Tab eventKey="users" title="Users">
          <AdminUsersTab />
      </Tab>
    </Tabs> 
    </>
  );
};

export default AdminNav;
