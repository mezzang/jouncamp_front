// src/routes/AboutRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AboutHome from "../pages/About/AboutHome";
import AboutContact from "../pages/About/AboutContact";
import AboutPrivacy from "../pages/About/AboutPrivacy";

function AboutRoutes() {
  return (
    <Routes>
      <Route index element={<AboutHome />} />
      <Route path="contact" element={<AboutContact />} />
      <Route path="privacy" element={<AboutPrivacy />} />
    </Routes>
  );
}

export default AboutRoutes;
