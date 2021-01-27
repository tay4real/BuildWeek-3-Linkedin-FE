import React, { Component } from "react";
import { Row, Col, Form, Button, Container, Badge } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import FooterLogo from "../footer_logo.svg";
import "../styles/Login.css";
class Login extends Component {
  state = {
    user: [],
    hidden: true,
  };
  componentDidMount = async() => {
    let response = await fetch(process.env.REACT_APP_BE_URL + "profile");
      let profiles = await response.json()
      this.setState({profiles: profiles}, ()=> console.log(profiles))
  }
  sendData = async() => {
    await this.props.account(this.state.loggedWith._id); 
    
}
  submitData = async (e) => {
    e.preventDefault();
    console.log(this.state.user)
    try {
      await this.state.profiles.map((user)=> {
        if(this.state.user.username === user.email) {
          console.log("It's a match! ", user)
          this.setState({loggedWith: user})
          
        } else {
          console.log("No matches found")
        }
      })
      this.sendData()
      localStorage.setItem('logged', await JSON.stringify(this.state.loggedWith))
      let user = await JSON.parse(localStorage.getItem('logged'));
      console.log("Logged in with: ", user)       
    this.props.history.push(`/user/${this.state.loggedWith._id}`)
    } catch (error) {
      console.log(error);
    }
    
  };
  onChangeHandler = (e) => {
    this.setState({
      user: { ...this.state.user, [e.target.id]: e.currentTarget.value },
    });
  };
  handleLogin = (e) => {
    if (e.keyCode === 13) {
      this.props.submitData(this.state.user);
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
      <div className="loginDiv">
        <Container>
          <Col className="loginCol mt-5">
            {!this.props.dontShowLogo && (
              <img
                src={FooterLogo}
                className="mb-4 "
                alt="loginLogo"
                style={{ height: "30px" }}
              />
            )}
            <div className={this.props.dontShowLogo ? "" : "shadowBox"}>
              <div className="mb-3">
                {this.props.dontShowLogo ? (
                  <h1 className="wlcT">
                    Welcome to your professional community
                  </h1>
                ) : (
                  <h2>Sign in</h2>
                )}
                {this.props.dontShowLogo ? (
                  ""
                ) : (
                  <span>Stay updated on your professional world</span>
                )}
              </div>
              <Form onSubmit={(e)=> this.submitData(e)}>
                <Form.Group>
                  <Form.Control
                    required
                    id="username"
                    value={this.state.user.username}
                    type="text"
                    size="lg"
                    placeholder="Email or Phone"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group className="inputPwd">
                  <Form.Control
                    id="password"
                    value={this.state.user.password}
                    type={this.state.hidden ? "password" : "text"}
                    size="lg"
                    placeholder="Password"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />

                  <Badge
                    pill
                    className="inputToggle"
                    onClick={(e) => this.toggleShow(e)}
                  >
                    {this.state.hidden ? "show" : "hide"}
                  </Badge>
                </Form.Group>
                <Col className="loginCol">
                  <Button type="submit" className="loginBtn">
                    Sign in
                  </Button>
                </Col>
              </Form>
              <a className="forgetPwd">Forget your password?</a>
            </div>
            {this.props.dontShowLogo ? (
              ""
            ) : (
              <Row className="d-flex justify-content-around mt-5 mx-auto bg-transparent">
                New to LinkedIn?{" "}
                <Link className="ml-1" to="/signup">
                  Join now
                </Link>
              </Row>
            )}
          </Col>
        </Container>
      </div>
    );
  }
}
export default withRouter(Login);
