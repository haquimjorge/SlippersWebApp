import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import MainContacts from "../components/MainContacts";

const Contacts = () => {
  return (
    <>
      <div className="menu-contacts">
        <Menu />
        <MainContacts />
      </div>
      <Footer />
    </>
  );
};

export default Contacts;
