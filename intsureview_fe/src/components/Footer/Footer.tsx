import React from "react";

import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="location">
        <h3>Location:</h3>
        <span>367 Park Lane, Los Angeles, CA 90543</span>
      </div>
      <div className="copyright">
        <p>©2023 Fur Sure, Inc. All Rights Reserved </p>
      </div>
    </footer>
  );
};

export default Footer;
