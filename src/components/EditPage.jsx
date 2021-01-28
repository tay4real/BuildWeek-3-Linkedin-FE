import React from "react";
import { Image, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import { MdClose} from "react-icons/md";
import { IconContext } from "react-icons";
import { FaUpload } from "react-icons/fa"
import {AiOutlinePlus} from "react-icons/ai"
import CameraLogo from '../assets/missing-propic.jpg'
import "../styles/EditPage.css";

class EditPage extends React.Component {
  state = {
    logged: this.props.logged,
    profile: {},
    showModal: false,
    confirmDialog: false,
    selectedFile: null,
    imgSubmitStatus: "secondary",
  };
  
  componentDidMount = async()=> {
    let user = await JSON.parse(localStorage.getItem('logged'));
    this.setState({logged: user._id}, ()=> "Modal mounted with ", this.state.logged)
    try {
      const pFetch = await fetch(
        process.env.REACT_APP_BE_URL + "profile/" + this.state.logged,
      );
      const pResponse = await pFetch.json();
      this.setState({ profile: pResponse });
    } catch (error) {
      console.log(error);
    }
  }
  onChangeHandler = (e) => {
    this.setState({
      profile: {
        ...this.state.profile,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };

  editPage = async () => {
    const url = process.env.REACT_APP_BE_URL + "profile/" + this.state.logged
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(this.state.profile),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        this.state.selectedFile !== null
          ? this.fileUploadHandler()
          : this.setState({ showModal: false }, () => this.props.refetch());
      } else {
        this.setState({ showModal: false });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const pFetch = await fetch(
        process.env.REACT_APP_BE_URL + "profile/" + this.state.logged,
      );
      const pResponse = await pFetch.json();
      this.setState({ profile: pResponse });
      this.setState({ showModal: false });
    } catch(error) {
      console.log(error)
    }
  };
  handleCloseModal = async () => {
    (await JSON.stringify(this.props.profile)) !==
    JSON.stringify(this.state.profile)
      ? this.setState({ confirmDialog: true })
      : this.setState({ showModal: false });
  };
  fileSelectHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      imgSubmitStatus: "success",
    }, ()=> console.log(this.state.selectedFile));
  };

  fileUploadHandler = async () => { 
    const fd = new FormData();
    fd.append("image", this.state.selectedFile); //do not await 
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "profile/" + this.state.logged +"/propic",
        {
          method: "POST",
          body: fd,
          //redirect: 'follow' 
        }
      );
      if (response.ok) {
        console.log(await response.json())
        this.setState({ showModal: false }, () => this.props.refetch());
      } else {
        console.log(await response.json())
        this.setState({ showModal: false });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <>
        <div
          onClick={() => this.setState({ showModal: true })}
          className="JumbBiPencilDiv"
          style={{ backgroundColor: "transparent" }}
        >
          <IconContext.Provider
            value={{
              size: "25px",
              className: "JumbBiPencil",
            }}
          >
            <BiPencil />
          </IconContext.Provider>
        </div>
        <Modal
          className="editProfileModal"
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header>
            <Modal.Title>Edit Intro</Modal.Title>
            <IconContext.Provider
              value={{
                size: "28px",
                color: "grey",
                className: "closeModal",
              }}
            >
              <MdClose onClick={() => this.handleCloseModal()} />
            </IconContext.Provider>
          </Modal.Header>
          <Modal.Body>
            <Image
              src={this.state.profile.image ? this.state.profile.image : CameraLogo}
              roundedCircle
              className="editImage"
            />
            <Button
                variant={this.state.imgSubmitStatus}
                onClick={() => this.fileInput.click()}
                className="py-1 upload"
              >
                {this.state.imgSubmitStatus === "secondary"
                  ? <AiOutlinePlus/>
                  : <FaUpload/>}
              </Button>
            {/* <input type="file" onChange={this.fileSelectHandler}></input>
            <button onClick={this.fileUploadHandler}>Upload Image</button> */}
            <Form>
              <Row className="mt-4">
                <Col>
                  <Form.Group>
                    <Form.Label>First Name*</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.profile.name}
                      id="name"
                      size="sm"
                      onChange={(e) => this.onChangeHandler(e)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Last Name*</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.profile.surname}
                      id="surname"
                      size="sm"
                      onChange={(e) => this.onChangeHandler(e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Form.Group>
                <Form.Label>Headline</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={this.state.profile.bio}
                  id="bio"
                  size="sm"
                  onChange={(e) => this.onChangeHandler(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Current Position</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.profile.title}
                  id="title"
                  size="sm"
                  onChange={(e) => this.onChangeHandler(e)}
                />
              </Form.Group>
              <hr />
              <Form.Group>
                <Form.Label>Country/Region</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.profile.area}
                  id="area"
                  size="sm"
                  onChange={(e) => this.onChangeHandler(e)}
                />
              </Form.Group>
            </Form>
            <Modal.Footer>
              <input
                style={{ display: "none" }}
                type="file"
                onChange={this.fileSelectHandler}
                ref={(fileInput) => (this.fileInput = fileInput)}
              />
              
              <Button
                className="rounded-pill py-1"
                variant="primary"
                onClick={() => this.editPage()}
              >
                {this.state.imgSubmitStatus === "secondary"
                  ? "Save"
                  : "Submit changes"}
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
        <Modal
          className="confirmDialog"
          show={this.state.confirmDialog}
          onHide={() => this.setState({ confirmDialog: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Discard Changes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to discard changes you made?
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="rounded-pill py-1"
              variant="outline-primary"
              onClick={() => this.setState({ confirmDialog: false })}
            >
              Cancel
            </Button>
            <Button
              className="rounded-pill py-1"
              variant="primary"
              onClick={() => {
                this.setState({ confirmDialog: false, showModal: false });
              }}
            >
              Discard
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default EditPage;
