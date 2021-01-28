import React from "react";
import Edit from "./EditExp";
import { Button, Card, Col, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BiPencil } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Route } from "react-router-dom";
import moment from "moment";
import "../styles/Experience.css";
class Experience extends React.Component {
  state = {
    showModal: false,
    selectedId: "",
    expId: "",
    exp: {},
    experience: [],
    loading: true,
    profile: JSON.parse(localStorage.getItem("logged")),
  };
  // re-order
  grid = 8;

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: this.grid * 2,
    margin: `0 0 ${this.grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.experience,
      result.source.index,
      result.destination.index
    );

    this.setState({
      experiences: items,
    });
  };
  getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: this.grid,
    width: 250,
  });

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  componentDidMount = async () => {
    this.setState(
      { logged: await JSON.parse(localStorage.getItem("logged")) },
      () => console.log(this.state.logged)
    );

    console.log(this.props.profile);
    await this.setState(
      { user: this.props.profile, username: this.props.profile.username },
      () => console.log(this.state.user)
    );
    await fetch(
      `${process.env.REACT_APP_BE_URL}experience/${this.state.username}`
    )
      .then((response) => response.json())
      .then((experience) => {
        console.table(experience);
        if (experience !== null) {
          this.setState({ experience: experience }, () =>
            console.log("EXP: ", this.state.experience)
          );
        } else console.log("No exp found");
      });
    this.setState({ loading: false });
  };
  componentDidUpdate = async (prevProps) => {
    if (prevProps.profile._id !== this.props.profile._id) {
      this.setState({ loading: true });
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}experience/${this.props.profile.username}`
      );
      let experience = await response.json();
      this.setState({ experience: experience }, () =>
        console.log(this.state.experience)
      );
      console.log("EXP: ", this.state.experience);
      await this.setState(
        {
          user: this.props.profile,
          username: this.props.profile.username,
          loading: false,
        },
        () => console.log(this.state.username)
      );
    }
  };
  toggleModal = (job) => {
    if (job === undefined) {
      this.setState(
        {
          selectedId: null,
          showModal: this.state.showModal === false ? true : false,
        },
        () => console.log(this.state)
      );
    } else {
      this.setState(
        {
          selectedId: job._id,
          showModal: !this.state.showModal,
        },
        () => console.log("Selected exp ID:", this.state.selectedId)
      );
    }
  };
  searchExp = async () => {
    await this.setState({ loading: true });
    await fetch(
      `${process.env.REACT_APP_BE_URL}experience/${this.state.profile.username}`
    )
      .then((response) => response.json())
      .then((experience) => {
        console.table(experience);
        if (experience !== null) {
          this.setState({ experience: experience }, () =>
            console.log("EXP: ", this.state.experience)
          );
        } else console.log("No exp found");
      });
    this.setState({ loading: false });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <div className="loader-wrap">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <Card className="bio cardProf">
            <Card.Body>
              <Row className="d-flex justify-content-between ml-1">
                <div id="expTitle" className="info">
                  Experience
                </div>

                <Route path={"/user/" + this.state.profile._id}>
                  <Button variant="white" onClick={() => this.toggleModal()}>
                    <IconContext.Provider
                      value={{
                        size: "24px",
                        className: "expIcons",
                        color: "#0A66CE",
                      }}
                    >
                      <BsPlus />
                    </IconContext.Provider>
                  </Button>
                </Route>
              </Row>
              {/* <Edit /> */}
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {this.state.experience.length > 1 ? (
                        this.state.experience.map((exp, index) => (
                          <Draggable
                            key={exp._id}
                            draggableId={exp._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Row noGutters>
                                  <div style={{ width: "48px" }}>
                                    <img
                                      src={exp.image && exp.image}
                                      style={{ width: "48px" }}
                                    />
                                  </div>
                                  <Col>
                                    <ul
                                      id={this.state.user._id}
                                      key={`exp${index}`}
                                      className="exp"
                                    >
                                      <Route
                                        path={"/user/" + this.state.logged._id}
                                      >
                                        <Button
                                          variant="white"
                                          className="editBtnExp"
                                          onClick={() => this.toggleModal(exp)}
                                        >
                                          <IconContext.Provider
                                            value={{
                                              size: "24px",
                                              className: "expIcons",
                                              color: "#0A66CE",
                                            }}
                                          >
                                            <BiPencil />
                                          </IconContext.Provider>
                                        </Button>
                                      </Route>
                                      <li className="expEntries">
                                        <div class="roleExp">{exp.role}</div>
                                      </li>
                                      <li className="expEntries">
                                        <div class="workplaceExp">
                                          {exp.company}
                                        </div>
                                      </li>
                                      <li className="expEntries">
                                        <div class="timeExp">
                                          {moment(exp.startDate).format(
                                            "MM/YYYY"
                                          )}{" "}
                                          -{" "}
                                          {exp.endDate
                                            ? moment(exp.endDate).format(
                                                "MM/YYYY"
                                              )
                                            : "Current"}
                                        </div>
                                        <div class="timeExp"></div>
                                      </li>

                                      <li className="expEntries">
                                        <div class="cityExp">{exp.area}</div>
                                      </li>
                                      <li className="expEntries">
                                        <div class="descExp">
                                          {exp.description}
                                        </div>
                                      </li>
                                    </ul>
                                  </Col>
                                </Row>
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <></>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Card.Body>
          </Card>
        )}
        <Route path={"/user/" + this.state.profile._id}>
          {" "}
          <Edit
            show={this.state.showModal}
            userId={this.state.user && this.state.user._id}
            expId={this.state.selectedId && this.state.selectedId}
            toggle={() => this.toggleModal()}
            refetch={() => this.searchExp()}
            color="#0A66CE"
          />
        </Route>
      </>
    );
  }
}
export default Experience;
