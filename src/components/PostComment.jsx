import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Comment.css";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

class PostComment extends React.Component {
  state = {
    me: {},
    comments: {
      text: "",
    },
    showButton: false,
  };

  onChangeHandler = (e) => {
    if (e.currentTarget.value !== "") {
      this.setState({
        comments: {
          ...this.state.comments,
          [e.target.name]: e.currentTarget.value,
        },
        showButton: true,
      });
    } else {
      this.setState({
        comments: {
          ...this.state.comments,
          [e.target.name]: e.currentTarget.value,
        },
        showButton: false,
      });
    }
  };

  post = async () => {
    try {
      const postData = this.state.comments;
      postData.profileId = [this.props.me._id];
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `post/${this.props.post._id}/comments`,
        {
          method: "POST",
          body: JSON.stringify(postData),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );

      console.log(response);
      console.log(JSON.stringify(postData));
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        this.setState({ comments: "" }, () => this.props.refetch());
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
        <div className={this.props.className}>
          <Form className="pb-1">
            <InputGroup>
              <FormControl
                as="textarea"
                id={this.props.post._id}
                name="text"
                style={{ borderRadius: "20px" }}
                rows={1}
                placeholder="Add a comment"
                onChange={(e) => this.onChangeHandler(e)}
                value={this.state.comments.text}
              />
            </InputGroup>
          </Form>
          {this.state.showButton && (
            <Button variant="primary" onClick={this.post}>
              Post
            </Button>
          )}
        </div>
      </>
    );
  }
}
export default PostComment;
