import React from "react";
import {
  Form,
  FormControl,
  Navbar,
  Nav,
  InputGroup,
  Col,
} from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import {
  FaLinkedin,
  FaSearch,
  FaHome,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { BsPeopleFill, BsGrid3X3Gap, BsCollectionPlay } from "react-icons/bs";
import { GiHandBag } from "react-icons/gi";
import { RiMessage2Fill } from "react-icons/ri";
import "../styles/AppNavBar.css";
class AppNavBar extends React.Component {
  render() {
    return (
      <Navbar bg="white" variant="light" className="py-0 fixed-top">
        <div className="navbarContent">
          <Navbar.Brand
            as={Link}
            to="/home"
            className="navbarBrand d-flex nowrap mr-2"
          >
            <IconContext.Provider
              value={{
                size: "38px",
                className: "linkedinIcon",
                color: "#0a66c2",
                title: "LinkedIn",
              }}
            >
              <FaLinkedin />
            </IconContext.Provider>
          </Navbar.Brand>
          <Form inline className="navSearch">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <IconContext.Provider
                    value={{
                      size: "15",
                      className: "SearchIcon",
                      color: "grey",
                      backgroundColor: "#60627c",
                    }}
                  >
                    <FaSearch />
                  </IconContext.Provider>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                value={this.props.query}
                type="text"
                placeholder="Search"
                className=""
                onChange={(e) => this.props.searchHandler(e)}
              />
            </InputGroup>
          </Form>
          <div className="ml-auto mr-0 d-flex row justify-content-end">
            <Nav.Link className="navLinkCol" as={Link} to="/Home">
              <Col className="navCol">
                <FaHome className="navIcon" />
                <span className="navIconText">Home</span>
              </Col>
            </Nav.Link>
            <Nav.Link className="navLinkCol">
              <Col className="navCol">
                <BsPeopleFill className="navIcon" />
                <span className="navIconText">My Network</span>
              </Col>
            </Nav.Link>
            <Nav.Link className="navLinkCol">
              <Col className="navCol">
                <GiHandBag className="navIcon" />{" "}
                <span className="navIconText">Jobs</span>
              </Col>
            </Nav.Link>
            <Nav.Link className="navLinkCol">
              <Col className="navCol">
                <RiMessage2Fill className="navIcon" />
                <span className="navIconText">Messaging</span>
              </Col>
            </Nav.Link>
            <Nav.Link className="navLinkCol">
              <Col className="navCol">
                <FaBell className="navIcon" />
                <span className="navIconText">Notifications</span>
              </Col>
            </Nav.Link>
            <Nav.Link className="navLinkCol" as={Link} to="/user/me">
              <Col className="navCol">
                <FaUserCircle className="navIcon" />
                <span className="navIconText">Me</span>
              </Col>
            </Nav.Link>
            <div class="vl"></div>
            <Nav.Link className="navLinkCol">
              <Col className="navCol">
                <BsGrid3X3Gap className="navIcon" />
                <span className="navIconText">Work</span>
              </Col>
            </Nav.Link>
            <Nav.Link className="navLinkCol">
              <Col className="navCol">
                <BsCollectionPlay className="navIcon" />
                <span className="navIconText">Learning</span>
              </Col>
            </Nav.Link>
          </div>
        </div>
      </Navbar>
    );
  }
}
export default withRouter(AppNavBar);
