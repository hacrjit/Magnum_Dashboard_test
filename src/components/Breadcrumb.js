import React from "react";
// eslint-disable-next-line 
import { Link, useNavigate } from "react-router-dom";

const Breadcrumb = ({ heading, route }) => {
  const navigate = useNavigate();
  const pathArray = route.split(" > ");

  const handleLinkClick = (path) => {
    if (path === "/home") {
      navigate("/");
    } else {
      navigate(path);
    }
  };

  return (
    <div>
      <h5>
        <strong>{heading}</strong>
      </h5>
      <div className="breadcrumb">
        {pathArray.map((item, index) => {
          const isLast = index === pathArray.length - 1;
          const path = "/" + pathArray.slice(0, index + 1).join("/").toLowerCase();

          return (
            <span key={index}>
              {isLast ? (
                <span className="current" style={{ color: "#FFA83D" }}>
                  {item}
                </span>
              ) : (
                <>
                  <span
                    onClick={() => handleLinkClick(path)}
                    style={{ textDecoration: "none", color: "#555", cursor: "pointer" }}
                  >
                    {item}
                  </span>
                  &nbsp; &gt; &nbsp;
                </>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;