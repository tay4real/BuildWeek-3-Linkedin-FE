import React from "react";
import { Button, Col, Row, Modal, Image, Form, Card } from "react-bootstrap";
import { FaCamera, FaVideo, FaStickyNote, FaPenSquare } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import { IconContext } from "react-icons";
import { withRouter } from "react-router-dom";
import "../styles/PostModal.css";

class PostModal extends React.Component {
  state = {
    showModal: false,
    me: {},
    postimage: null,
    imgSubmitStatus: "secondary",
    post: {
      text: "",
      username: "",
      profiles: "",
    },
  };

  addHashtag = () => {
    this.setState({ post: { text: this.state.post.text + " #" } });
  };

  onChangeHandler = (e) => {
    this.setState({
      post: {
        ...this.state.post,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };

  fileSelectHandler = (event) => {
    this.setState(
      {
        selectedFile: event.target.files[0],
        imgSubmitStatus: "success",
      },
      () => console.log(this.state.selectedFile)
    );
  };

  fileUploadHandler = async (postId) => {
    const fd = new FormData();
    fd.append("postimage", this.state.selectedFile);
    // console.log(fd);
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `post/image/${postId}`,
        {
          method: "POST",
          body: fd,
        }
      );

      if (response.ok) {
        console.log(await response.json());
        this.setState({ showModal: false }, () => this.props.refetch());
      } else {
        this.setState({ showModal: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  post = async () => {
    try {
      const postData = this.state.post;
      postData.username = this.props.me.username;
      postData.profiles = this.props.me._id;
      const response = await fetch(process.env.REACT_APP_BE_URL + `post`, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      console.log(this.props.me.username);
      console.log(response);
      console.log(JSON.stringify(postData));
      if (response.ok) {
        const data = await response.json();

        console.log(data);
        if (this.state.selectedFile !== null) {
          this.fileUploadHandler(data); // upload the file
        }

        this.setState({ showModal: false }, () => this.props.refetch());
      } else {
        throw new Error("Internal Server Error");
      }
    } catch (e) {
      console.log("There was a problem: ", e);
    }
  };

  render() {
    return (
      <>
        <Card className="bg-white p-4">
          <Button
            className="postButton"
            variant="outline-dark"
            onClick={() => this.setState({ showModal: true })}
          >
            <BiPencil /> Start a Post
          </Button>
        </Card>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a Post</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col>
                <Image
                  src={this.props.me.image}
                  roundedCircle
                  className="postModalImg"
                />
                <strong className="ml-5">
                  {this.props.me.name + " " + this.props.me.surname}
                </strong>
              </Col>
            </Row>
            <Form className="mt-2">
              <Form.Group>
                <Form.Control
                  as="textarea"
                  id="text"
                  rows={3}
                  value={this.state.post.text}
                  onChange={(e) => this.onChangeHandler(e)}
                />
              </Form.Group>
            </Form>
            <Row>
              <Col className="d-flex">
                <Button
                  variant="outline-primary"
                  className="HashButton"
                  onClick={this.addHashtag}
                >
                  Add hashtag
                </Button>
                <p className="ml-3 mt-2">Help the right people see your post</p>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.fileSelectHandler}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
            <span>
              {this.state.imgSubmitStatus === "secondary"
                ? "Choose a file"
                : "Good to go! Ready to submit"}
            </span>
            <IconContext.Provider
              value={{
                size: "30px",
                className: "mx-2",
                color:
                  this.state.imgSubmitStatus === "secondary"
                    ? "#777"
                    : "#28a745",
              }}
            >
              <FaCamera onClick={() => this.fileInput.click()} />
            </IconContext.Provider>
            <IconContext.Provider
              value={{
                size: "30px",
                className: "mx-2",
                color: "#777",
              }}
            >
              <FaVideo />
              <FaStickyNote />
              <FaPenSquare />
            </IconContext.Provider>
            <Button rounded-pill variant="primary" onClick={this.post}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(PostModal);
