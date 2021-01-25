import React from "react";
// import { useState } from "react";
import { Button, Modal, Form, Row, Col, ThemeProvider } from "react-bootstrap";
import "../App.css";
import "../styles/Profile.css";
class Edit extends React.Component {
  state = {
    showModal: false,
    experience: {},
    selectedFile: null,
    imgSubmitStatus: "secondary",
  };
  url = "https://striveschool-api.herokuapp.com/api/profile/";
  headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  };
  fetchExp = async () => {
    try {
      if (this.props.expId !== null) {
        const response = await fetch(
          `${this.url}${this.props.userId}/experiences/${this.props.expId}`,
          {
            method: "GET",
            headers: this.headers,
          }
        );
        const data = await response.json();
        if (response.ok) {
          this.setState({ experience: data });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  onChangeHandler = (e) => {
    this.setState({
      experience: {
        ...this.state.experience,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };
  submitData = async (str) => {
    const url =
      str === "POST"
        ? `${this.url}${this.props.userId}/experiences`
        : `${this.url}${this.props.userId}/experiences/${this.props.expId}`;
    const payload = JSON.stringify(this.state.experience);
    try {
      console.log(payload, str);
      const response = await fetch(url, {
        method: str,
        headers: this.headers,
        body: payload,
      });
      if (response.ok) {
        if (this.state.selectedFile !== null) {
          this.fileUploadHandler();
        } else {
          this.props.toggle();
          this.props.refetch();
        }
      } else {
        console.log("submit failed");
      }
      // this.fetchExp();
    } catch (e) {
      console.log(e);
    }
  };
  actionBtn = (str) => {
    str !== "DELETE"
      ? this.submitData(this.edit() ? "PUT" : "POST")
      : this.submitData("DELETE");
  };
  componentDidMount = () => {
    this.fetchExp();
  };
  componentDidUpdate(prevProps) {
    if (prevProps.expId !== this.props.expId) {
      if (this.edit()) {
        this.fetchExp();
      } else {
        this.setState({ experience: { empty: true } });
      }
    }
  }
  edit = () => {
    return this.props.expId !== null ? true : false;
  };
  fileSelectHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      imgSubmitStatus: "success",
    });
  };

  fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append("experience", this.state.selectedFile);
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${this.props.userId}/experiences/${this.props.expId}/picture`,
        {
          method: "POST",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          body: fd,
        }
      );
      if (response.ok) {
        this.props.toggle();
        this.props.refetch();
      } else {
        this.props.toggle();
        this.props.refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.props.toggle}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.edit() ? "Edit" : "Add"} Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Role * </Form.Label>
              <Form.Control
                required
                id="role"
                value={this.state.experience.role}
                type="text"
                size="sm"
                placeholder="Role"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company * </Form.Label>
              <Form.Control
                required
                id="company"
                value={this.state.experience.company}
                type="text"
                size="sm"
                placeholder="Company"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start date * </Form.Label>
                  <Form.Control
                    required
                    id="startDate"
                    value={this.state.experience.startDate}
                    type="date"
                    size="sm"
                    placeholder="Headline"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>End date (empty if current) </Form.Label>
                  <Form.Control
                    value={this.state.experience.endDate}
                    id="endDate"
                    type="date"
                    size="sm"
                    placeholder="Current Position"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Description * </Form.Label>
              <Form.Control
                required
                value={this.state.experience.description}
                id="description"
                as="textarea"
                size="sm"
                placeholder="Description"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Area * </Form.Label>
              <Form.Control
                required
                value={this.state.experience.area}
                id="area"
                type="text"
                size="sm"
                placeholder="Area"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {this.edit() && (
            <Button
              className="rounded-pill py-1 mr-auto"
              variant="danger"
              onClick={() => this.actionBtn("DELETE")}
            >
              DELETE
            </Button>
          )}
          {/* <Button
            className="rounded-pill py-1"
            variant="secondary"
            onClick={this.props.toggle}
          >
            Close
          </Button> */}
          <input
            style={{ display: "none" }}
            type="file"
            onChange={this.fileSelectHandler}
            ref={(fileInput) => (this.fileInput = fileInput)}
          />
          <Button
            className="rounded-pill py-1"
            variant={this.state.imgSubmitStatus}
            onClick={() => this.fileInput.click()}
          >
            {this.state.imgSubmitStatus === "secondary"
              ? "Choose an image"
              : "Ready to Upload"}
          </Button>
          <Button
            className="rounded-pill py-1"
            variant="primary"
            onClick={() => this.actionBtn(this.edit() ? "PUT" : "POST")}
          >
            {this.edit() ? "Save Changes" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default Edit;
