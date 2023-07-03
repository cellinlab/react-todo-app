import React from "react";
import { Toaster } from "react-hot-toast";

import AppHeader from "@/components/AppHeader";
import AppContent from "@/components/AppContent";

import "./index.scss";

const Home = () => {
  return (
    <>
      <div className="container">
        <p className="title">TODO List</p>
        <div className="app-wrapper">
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </>
  );
};

export default Home;
