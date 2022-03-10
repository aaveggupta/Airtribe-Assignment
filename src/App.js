import React, { useEffect } from "react";

import "./App.css";
import CardList from "./Components/CardList/CardList";
import StatusList from "./Components/StatusList/StatusList";
import useDataLayer from "./Helpers/StateProvider";

const App = () => {
  const [{ statusList }, dispatch] = useDataLayer();

  useEffect(() => {
    const statusList = localStorage.getItem("statusList");
    statusList &&
      dispatch({
        type: "SET_STATUSLIST",
        statusList: JSON.parse(statusList),
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("statusList", JSON.stringify(statusList));
  });

  return (
    <div className="app">
      <div className="app__top">
        <h1>AirTribe Assignment</h1>
        <h4>
          Made with ❤️ by{" "}
          <a href="https://drive.google.com/file/d/1Rpf-3bYmnYcteEDAmiSblUf696VWcZf9/view?usp=sharing">
            Aaveg Gupta
          </a>
        </h4>
      </div>
      <hr />
      <StatusList />
    </div>
  );
};

export default App;
