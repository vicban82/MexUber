import React, { useState } from "react";
import { Button } from "../../../components/Dashboard/styles";
import { Link } from "react-router-dom";

const MainDashboard = () => {
  const [selectedIcon, setSelectedIcon] = useState("main");
  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };
  return (
    <div>
      <Button
        onClick={() => handleIconClick("home")}
        className={selectedIcon === "home" ? "active" : ""}
      >
        <Link to="/dashboard/home">Home</Link>
      </Button>
      <Button
        onClick={() => handleIconClick("option1")}
        className={selectedIcon === "option1" ? "active" : ""}
      >
        <Link to="/dashboard/option1">Option 1</Link>
      </Button>
      <Button
        onClick={() => handleIconClick("option2")}
        className={selectedIcon === "option2" ? "active" : ""}
      >
        <Link to="/dashboard/option2">Option 2</Link>
      </Button>
      <Button
        onClick={() => handleIconClick("option3")}
        className={selectedIcon === "option3" ? "active" : ""}
      >
        <Link to="/dashboard/option3">Option 3</Link>
      </Button>
    </div>
  );
};

export default MainDashboard;
