import React, { Component } from "react";
import {
  Container,
  Button,
  Image,
  Row,
  Col,
  Card,
  Alert,
  Form,
} from "react-bootstrap";
import { BiLike, BiCommentDetail, BiShare, BiSend } from "react-icons/bi";
import EditPost from "./EditPost";
import PostModal from "./PostModal";
import RSidebar from "./RSidebar";
import Sidebar from "./Sidebar";
import Comment from './Comment'
import "../styles/Home.css";
export default class Home extends Component {
  state = {
    posts: [],
    me: {},
    showAlert: null,
    err: false,
    errType: null,
    errMsg: "",
    loading: true,
    logged: "",
  };

  fetchPost = async () => {
    try {
      let response = await fetch(process.env.REACT_APP_BE_URL + "post");
      if (response.ok) {
        let postResponse = await response.json();
        const posts = postResponse.posts;
        console.log(posts);

        this.setState({ posts: posts.reverse(), loading: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        err: true,
        errType: "danger",
        errMsg: error.messasge,
      });
    }
  };

  fetchMe = async () => {
    try {
      this.setState(
        { me: await JSON.parse(localStorage.getItem("logged")) },
        () => console.log(this.state.me)
      );
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchPost();
    this.fetchMe();
  }

  render() {
    return (
      <div className="homeDiv">
        <Container className="HomeCont">
          {this.state.err && (
            <Alert variant="danger">{this.state.errMsg}</Alert>
          )}
          {this.state.loading && this.state.err !== true ? (
            <div
              style={{ position: "relative", top: "8vh", left: "25vw" }}
              className="lds-facebook"
            ></div>
          ) : Object.keys(this.state.posts).length !== 0 ? (
            <Row>
              <Col className="d-none d-lg-block" lg={3}>
                <RSidebar me={this.state.me} />
              </Col>
              <Col lg={6} md={9}>
                <PostModal
                  refetch={() => this.fetchPost()}
                  me={this.state.me}
                />
                {this.state.posts.map((post) => (
                 <> <Card className="w-100 my-4" key={`feed${post._id}`}>
                    <Card.Header className="d-flex justify-content-between px-3">
                      <div>
                        <Image
                          src={post.profiles[0].image}
                          className="postModalImg mr-3"
                          style={{objectFit: 'cover'}}
                          roundedCircle
                        />
                        {post.profiles[0].name + " " + post.profiles[0].surname}
                      </div>
                      <EditPost post={post} refetch={() => this.fetchPost()} />
                    </Card.Header>
                    <Card.Text className="p-3">{post.text}</Card.Text>
                    {post.postimageUrl && (
                      <Card.Img
                        src={post.postimageUrl}
                        alt="PostImage"
                        className="postImage"
                        
                      />
                    )}
                    
                    <Card.Footer className="HomeModal bg-white">
                      <Button variant="outline-dark mx-1">
                        <BiLike /> Like
                      </Button>
                      <Button variant="outline-dark mx-1" onClick={()=> this.setState({newComment: true})}>
                        <BiCommentDetail /> Comment
                      </Button>
                      
                      <Button variant="outline-dark mx-1">
                        <BiShare /> Share
                      </Button>
                      <Button variant="outline-dark mx-1">
                        <BiSend /> Send
                      </Button>
                    </Card.Footer>
                    
                  </Card>
                  <Comment/></>
                ))}
              </Col>
              <Col className="d-none d-md-block" md={3}>
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
        </Container>
      </div>
    );
  }
}
