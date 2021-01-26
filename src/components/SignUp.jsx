import React, { Component } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FooterLogo from "../footer_logo.svg";
import "../styles/SignUp.css";
export default class SignUp extends Component {
  state = {
    user: [],
    hidden: true,
  };
  url = "https://striveschool-api.herokuapp.com/api/account/register";
  header = {
    ContentType: "application/json",
  };
  addUser = async () => {
    console.log(this.state.user)
    try {let newUser = await fetch(process.env.REACT_APP_BE_URL + "profile", {
      method: "POST", 
      body: JSON.stringify(this.state.user),
      headers: {
        "Content-type": "application/json"
      }
    })
    console.log(newUser)
    if (newUser.statusText === "Internal Server Error") {
      console.log("There is a problem with your application.")
    } else if (newUser.statusText === "Created") {
      let user = await newUser.json()
      this.props.history.push(`/user/${user._id}`)
    }
    } catch(error) {
      console.log(error)
    }
    
    
  };
  onChangeUserName = (e) => {
    this.setState({
      user: { ...this.state.user, [e.target.id]: e.currentTarget.value.toLowerCase() },
    });
  }
  onChangeHandler = (e) => {
    this.setState({
      user: { ...this.state.user, [e.target.id]: e.currentTarget.value },
    });
  };
  handleLogin = (e) => {
    if (e.keyCode === 13) {
      this.addUser(this.state.user);
    } else {
      this.setState({
        user: { ...this.state.user, [e.target.id]: e.currentTarget.value },
      });
    }
  };
  toggleShow = (e) => {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  };
  render() {
    return (
      <div className="signupDiv">
        <Container className="d-flex flex-column justify-content-center align-content-center">
          <Col className="d-flex justify-content-center mx-auto mt-4 flex-column text-center">
            <img
              src={FooterLogo}
              className="mb-4"
              alt="logo"
              style={{ height: "30px" }}
            />
            <h3>Make the most of your professional life</h3>
          </Col>
          <Col className="signupCol mt-5 signupBox">
            <div className="bg-white d-flex flex-column ">
              <Form>
                <Form.Row className='center-form'>
                <Form.Group className="mr-5">
                  <Form.Label>Name </Form.Label>
                  <Form.Control 
                    required
                    id="name"
                    value={this.state.user.name}
                    placeholder="Name"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group className="">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control 
                    required
                    id="surname"
                    value={this.state.user.surname}
                    placeholder="Surname"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                </Form.Row>
                <Form.Row className='center-form'>
                <Form.Group className="mr-5" >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    id="email"
                    value={this.state.user.email}
                    type="text"
                    placeholder="Email"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group  >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    id="username"
                    value={this.state.user.username}
                    type="text"
                    placeholder="username"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeUserName(e)}
                  />
                </Form.Group>
                </Form.Row> 
                <Form.Row className='center-form'>
                <Form.Group className="w-75">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control 
                    required
                    id="bio"
                    as='textarea'
                    rows={6}
                    value={this.state.user.bio}
                    placeholder="Write something about you..."
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                </Form.Row>
                <Form.Row className='center-form'>
                <Form.Group className="w-75">
                  <Form.Label>Current title</Form.Label>
                  <Form.Control 
                    required
                    id="title"
                    rows={6}
                    value={this.state.user.title}
                    placeholder="What are you currently doing?"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                </Form.Row>
              </Form>
              <span>
                By clicking Agree & Join, you agree to the LinkedIn{" "}
                <a>User Agreement</a>, <a>Privacy Policy</a>, and{" "}
                <a>Cookie Policy</a>.
              </span>
              <Col className="signupCol px-0">
                {/* <Button className="signupBtn" > */}
                <Button className="signupBtn" onClick={() => this.addUser()}>Agree & Join</Button>
              </Col>
            </div>
            <Row className="d-flex justify-content-around mt-4 mx-auto ">
              Already on LinkedIn?{" "}
              <Link className="ml-1" to="/login">
                {" "}
                Sign in
              </Link>
            </Row>
          </Col>
        </Container>
      </div>
    );
  }
}
