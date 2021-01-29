import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Comment.css";
import { Image } from "react-bootstrap";

class ReadComment extends React.Component {
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

  fetchProfile = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `profile/${this.props.profileId}`
      );

      if (response.ok) {
        const data = await response.json();

        console.log(data);
        this.setState({ me: data });
      } else {
        throw new Error("Internal Server Error");
      }
    } catch (e) {
      console.log("There was a problem: ", e);
    }
  };

  componentDidMount = async () => {
    this.fetchProfile();
    console.log(this.props.text);
  };

  render() {
    return (
      <div className="d-flex justify-content-between align-items-top px-3 my-2">
        <span>
          <Image
            src={this.state.me.image}
            className="postModalImg mr-3"
            style={{ objectFit: "cover" }}
            roundedCircle
          />
        </span>
        <div className="flex-grow-1 bg-light py-2 px-3 ">{this.props.text}</div>
      </div>
    );
  }
}
export default ReadComment;
