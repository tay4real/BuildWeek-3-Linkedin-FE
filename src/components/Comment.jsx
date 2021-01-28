import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Comment.css";
import { Form } from "react-bootstrap";

class Comment extends React.Component {
  render() {
    return (
        <Form>
            <Form.Group className="comment-wrap">
                
                <Form.Control as='textarea' placeholder='Add a comment'/>
            </Form.Group>
        </Form>
    );
  }
}
export default Comment;
