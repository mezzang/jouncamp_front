import React from "react";

function Breadcrumbs({ title, description }) {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Breadcrumbs;
