import React, { Component } from "react";
import { Row } from "react-bootstrap";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";
import vid1 from "../assets/vid1.png";
import vid2 from "../assets/vid2.png";
import vid3 from "../assets/vid3.png";
import Placeholder from "../assets/linkedin-logo.png";

class Sidebar extends Component {
  state = {
    users: [],
    selected: "me",
  };
  componentDidMount = () => {
    fetch(process.env.REACT_APP_BE_URL + "profile")
      .then((response) => response.json())
      .then((info) => {
        let logged = JSON.parse(localStorage.getItem("logged"));
        let filtered_users = info.filter((user) => user._id !== logged._id);
        this.setState({ users: filtered_users }, () =>
          console.log("Sidebar: ", this.state.users)
        );
      });
  };
  render() {
    return (
      <>
        <div className="ad-div">
          <img
            className="ad"
            src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
            alt="Advertise on LinkedIn"
            border={0}
          />
        </div>
        <div className="usersDiv">
          <p className="divTitle">People also viewed</p>
          {this.state.users &&
            this.state.users.slice(0, 6).map((user, index) => (
              <div className="userdiv2" key={`suggestUsers${index}`}>
                <Link to={`/user/${user._id}`}>
                  <Row>
                    <img
                      className="userimg"
                      src={user.image ? user.image : Placeholder}
                      alt="user"
                    ></img>
                    <div>
                      <h6 className="sugUsers" id={`suggestUsers${index}name`}>
                        {user.name}
                      </h6>
                      <small className="ranking">• 2nd</small>
                      <p className="usersp">{user.title}</p>
                      <hr className="hrside" />
                    </div>
                  </Row>
                </Link>
              </div>
            ))}
        </div>
        <div className="lrn-div">
          <svg
            style={{ color: "#0A66C2" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            data-supported-dps="14x14"
            fill="currentColor"
            class="mercado-match"
            width="14"
            height="14"
            focusable="false"
          >
            <g>
              <path
                class="background-mercado"
                d="M14 1v12a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1h12a1 1 0 011 1zM4 5H2v7h2zm.25-2A1.27 1.27 0 003 1.8 1.27 1.27 0 001.75 3 1.27 1.27 0 003 4.2 1.27 1.27 0 004.25 3zM12 8.29c0-2.2-.73-3.49-2.86-3.49A2.71 2.71 0 006.89 6V5H5v7h2V8.73A1.74 1.74 0 018.66 6.8C9.82 6.8 10 7.94 10 8.73V12h2z"
              ></path>
            </g>
          </svg>
          <h6 className="lrn-h6">LEARNING</h6>
          <h5 className="lrn-h5">Add new skills with these courses</h5>
          <div className="courses">
            <a target='blank' href="www.linkedin.com/learning/planning-a-career-in-user-experience/">
              {" "}
              <div className="course">
                <img className="vid-img" src={vid1}></img>

                <h4 className="vid-txt ">
                  Planning a Career in User Experience
                </h4>
                <small className="vid-sml">3,895</small>
              </div>
            </a>
            <a target='blank' href="www.linkedin.com/learning/learning-mongodb">
              {" "}
              <div className="course">
                <img className="vid-img" src={vid2}></img>

                <h4 className="vid-txt">Learning MongoDB</h4>
                <small className="vid-sml">4,985</small>
              </div>
            </a>
            <a target='blank' href='https://www.linkedin.com/learning/graphic-design-foundations-typography/welcome'>
              <div className="course">
                <img className="vid-img" src={vid3}></img>

                <h4 className="vid-txt">
                  Graphic Design Foundations: Typography
                </h4>
                <small className="vid-sml">12,464</small>
              </div>
              </a>
            </div>
         
        </div>
        <div className="ad-div">
          <img
            className="ad"
            src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
            alt="Advertise on LinkedIn"
            border={0}
          />
        </div>
      </>
    );
  }
}

export default Sidebar;
