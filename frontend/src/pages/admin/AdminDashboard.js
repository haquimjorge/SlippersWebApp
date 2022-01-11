import React from "react"
import AdminNav from "../../components/AdminNav"

const AdminDashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <AdminNav />
                </div>
                <div className="row">admin dashboard</div>
            </div>
        </div>
    )
}

export default AdminDashboard