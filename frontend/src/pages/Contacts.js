import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MainContacts from "../components/MainContacts";

const Contacts = () => {
  return (
    <>
      <div className="menu-contacts">
        <Navbar />
        <MainContacts />
      </div>
      <Footer />
    </>
  );
};

export default Contacts;
