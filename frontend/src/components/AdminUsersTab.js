import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Pencil from '../assets/pencil.png'
import Card from 'react-bootstrap/Card'
import {React, useEffect, useState} from "react";
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions';
import Button from 'react-bootstrap/Button'

// <Card className="d-flex flex-column col-12 col-md-6 col-xxl-4 col-xl-4 col-lg-6 col-sm-12 col-xs-12">
//   <Card.Img variant="top" className="admin-user-card-image" style={{ backgroundImage: `url(${user.image})` }}  />
//   <Card.Body>
//     <Card.Title>{user.name} {user.lastName}</Card.Title>
//     <Card.Text   style={user.emailVerified? {color:"green"} : {color:"red"}}  >
//       Email: {user.email}
//     </Card.Text>
//     <Card.Text>
//       Email: {user.email}
//     </Card.Text>
//     <Button variant="primary">Go somewhere</Button>
//   </Card.Body>
// </Card>

// style={user.rol==="Admin"? {fontWeight:"bold", color:"blue"} : {fontWeight:"light"}}

function AdminUsersTab(props){
    const {users, getUsers} = props
    console.log(users)

    useEffect(()=>{
        getUsers()
    },[])

    return(
        <Container fluid className="">
            <h3>Users</h3>
            <p>Here you can see the details of registered users.</p>
            <p className="text-center display-6">Total Registered Accounts: {users.length}</p>
            <p className="text-center display-6">Admin Accounts: {users.filter(e=> e.rol === "Admin").length}</p>
            <p className="text-center display-6">Guest Accounts: {users.filter(e=> e.rol === "Guest").length}</p>
            <div className="d-flex flex-wrap">

            
            {users.length && users.map(user => 

           <Container className="admin-user-card p-4 col-12 mb-4">

<Row>
    <Col className="admin-user-card-image" xs={3} style={{ backgroundImage: `url(${user.image})` }}></Col>
    <Col xs={9}>
        <div>
            <p className="text-white admin-user-name">{user.name} {user.lastName}</p>
            <p style={user.emailVerified? {color:"green"} : {color:"red"}} >{user.email} {user.emailVerified? "(verified✔)" : "(awaiting verification)"}</p>
            <p  style={user.rol==="Admin"? {fontWeight:"bold"} : {fontWeight:"light"}} className="text-white">Rol: {user.rol}</p>
            <p className="text-white">Gender: {user.gender? user.gender : "Not Informed"}</p>
        </div>


    </Col>

  </Row>




           </Container>
            
            
            )}
</div>
        </Container>
    )

}

const mapStateToProps = (state) => {
    return {
      users:state.userReducer.users
    };
  };
  
  const mapDispatchToProps = {
    getUsers: userActions.getUsers,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AdminUsersTab);