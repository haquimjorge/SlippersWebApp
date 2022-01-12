import React from "react";
import AdminNav from "../../components/AdminNav";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import Container from "react-bootstrap/Container";

const AdminDashboard = () => {
  return (
    <Container fluid className="m-0 p-0">
      <Menu />
      <Container fluid="sm" className="admin-panel-dashboard-welcome p-3">
        <p className="text-center display-6">Admin Dashboard</p>
        <AdminNav />
      </Container>
      <Footer />
    </Container>
  );
};

export default AdminDashboard;
