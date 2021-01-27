import React from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Home from "./components/Home";
import AppNavBar from "./components/AppNavBar";
import Footer from "./components/Footer";
import Profile from "./components/ProfileBody";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
<<<<<<< Updated upstream
import { useState } from "react";
=======
>>>>>>> Stashed changes
// import PostModal from "./components/PostModal";
import "bootstrap/dist/css/bootstrap.min.css";

function App(props) {
  const [user, setUser] = useState("");
  const [query, setQuery] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  const getAccount = (data) => {
    setUser(data);
    console.log("App.js has: ", user);
  };

  return (
    <Router>
      <Route path={["/user/:id", "/home"]}>
        {" "}
        <AppNavBar query={query} searchHandler={searchHandler} />{" "}
      </Route>
      <Route exact path={"/home"}>
        <Home title="Home page"/>{" "}
      </Route>
      <Route path={"/user/:id"}>
        <Profile logged={user} />
      </Route>
      <Route exact path={"/"}>
        <Login account={getAccount}/>{" "}
      </Route>
      <Route path={"/signup"}>
        <SignUp />
      </Route>
      <Route path={["/user/:id", "/home"]}>
        <Footer />
      </Route>
    </Router>
  );
}

export default App;
