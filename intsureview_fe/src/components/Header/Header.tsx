import React from "react";
import "./Header.css";
import { HeaderProps } from "../../../types";

const Header: React.FC<HeaderProps> = ({ companyName }) => {
  return (
    <header className="header">
      <div className="companyName">{companyName}</div>
    </header>
  );
};

export default Header;
