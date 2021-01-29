import React from "react";
import {
  Col,
  Row,
  Alert,
  Card,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Bio from "./BioCard";
import Experience from "./Experience";
import Sidebar from "./Sidebar";
import EditPage from "./EditPage";
import "../styles/Profile.css";
import Placeholder from "../assets/linkedin-logo.png"
import { Route, withRouter } from "react-router-dom";
class Body extends React.Component {
  state = {
    profile: {},
    showAlert: null,
    err: false,
    errType: null,
    errMsg: "",
    loading: true,
    logged: ""
  };
  
  componentDidMount = async () => {
    this.setState({logged: await JSON.parse(localStorage.getItem('logged'))}, ()=> console.log(this.state.logged))
    let response = await fetch(
      process.env.REACT_APP_BE_URL + "profile/" + this.props.match.params.id
    );
    let profile = await response.json();
    this.setState({ profile: profile, loading: false });
  };

  componentDidUpdate = async (prevProps) => {
    console.log("UPDATED", prevProps.match.params.id, this.props.match.params.id )
    if (prevProps.match.params._id !== this.props.match.params._id) {
      let response = await fetch(
        process.env.REACT_APP_BE_URL + "profile/" + this.props.match.params.id
      );
      let profile = await response.json();
      this.setState({ profile: profile, loading: false });
    }
    
  };
  searchProfile = async(id) => {
    console.log("Refetching...")
    let response = await fetch(
      process.env.REACT_APP_BE_URL + "profile/" + id
    );
    let profile = await response.json();
    this.setState({ profile: profile, loading: false }, ()=> console.log(this.state.profile));
  }

  render() {
    return (
      <div className="bgBody">
        <div className="mainBody">
          {this.state.err && (
            <Alert variant="danger">{this.state.errMsg}</Alert>
          )}
          {this.state.loading && this.state.err !== true ? (
            <div className="loader-wrap">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          ) : Object.keys(this.state.profile).length !== 0 ? (
            <Row className="rowm">
              {/*<Col lg={3}></Col> */}
              <Col md={8} style={{ marginTop: "10vh" }}>
                <Card className="cardProf">
                  <Card.Img
                    className="cardImg"
                    variant="top"
                    src="https://coverfiles.alphacoders.com/372/37275.jpg"
                    style={{ objectFit: "cover" }}
                    alt="placeholder"
                  />
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <div style={{ marginTop: "-130px" }}>
                        <img
                          src={this.state.profile.image ? this.state.profile.image : Placeholder }
                          alt="placeholder"
                          height="160px"
                          width="160px"
                          style={{
                            borderRadius: "50%",
                            border: "4px solid white",
                            objectFit: "cover",
                          }}
                        ></img>
                      </div>
                    </div>

                    <Card.Text>
                      <Row>
                        <Col xs={12} lg={6}>
                          <h3 className="usrnTxt">
                            {this.state.profile.name +
                              " " +
                              this.state.profile.surname +
                              " "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 21 21"
                              data-supported-dps="21x21"
                              fill="currentColor"
                              class="mercado-match"
                              width="21"
                              height="21"
                              focusable="false"
                              style={{ color: "#C37D16" }}
                            >
                              <g>
                                <path
                                  class="background-mercado"
                                  d="M19.5 0h-18A1.5 1.5 0 000 1.5v18A1.5 1.5 0 001.5 21h18a1.5 1.5 0 001.5-1.5v-18A1.5 1.5 0 0019.5 0zM6 18H3V8h3zM4.5 6.25a1.75 1.75 0 110-3.5 1.75 1.75 0 110 3.5zM18 18h-3v-5.09c0-1.62-.74-2.44-1.84-2.44A2.31 2.31 0 0011 13v5H8V8h3v1.39a4.06 4.06 0 013.3-1.63c1.77 0 3.66.93 3.66 4z"
                                ></path>
                              </g>
                            </svg>
                          </h3>
                          <div className="roletext">
                            {this.state.profile.title}
                          </div>
                          <h6 className="areaTxt">{this.state.profile.area}</h6>
                        </Col>
                        <Col lg={6}>
                          <div className="btnBox">
                            <Route path={"/user/"+this.state.logged._id}>
                              {" "}
                              <DropdownButton
                                className="d-none d-lg-block"
                                id="dropdown-basic-button"
                                size="sm"
                                title="Add profile section"
                              >
                                <Dropdown.Item>Intro</Dropdown.Item>
                                <Dropdown.Item>About</Dropdown.Item>
                                <Dropdown.Item>Featured</Dropdown.Item>
                                <Dropdown.Item>Background</Dropdown.Item>
                                <Dropdown.Item>Skills</Dropdown.Item>
                                <Dropdown.Item>Accomplishments</Dropdown.Item>
                                <Dropdown.Item>
                                  Additional information
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  Supported languages
                                </Dropdown.Item>
                              </DropdownButton>
                              <button className="btnMore">More...</button>
                              <EditPage
                                profile={this.state.profile}
                                logged = {this.state.logged._id}
                                refetch={() =>
                                  this.searchProfile(this.state.profile._id)
                                }
                                color="#0A66CE"
                              />
                            </Route>
                          </div>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Bio
                  bio={this.state.profile.bio}
                  profile={this.state.profile}
                  refetch={() => this.searchProfile(this.state.profile._id)}
                />
                
                <Experience profile={this.state.profile} logged={this.state.logged._id} />
              </Col>
              <Col
                md={4}
                style={{ marginTop: "10vh" }}
                className="d-none d-md-block"
              >
                <Sidebar />
              </Col>
            </Row>
          ) : (
            this.setState({
              err: true,
              errType: "warning",
              errMsg: "We have encounter a problem, the profile is empty",
            })
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(Body);
