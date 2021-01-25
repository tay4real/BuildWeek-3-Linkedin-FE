import React from "react";
import Edit from "./EditExp";
import { Button, Card, Col, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BiPencil } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import Job from "../assets/job.png";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Route } from "react-router-dom";
import moment from "moment";
// import "../styles/Profile.css";
import "../styles/Experience.css";
class Experience extends React.Component {
  state = {
    showModal: false,
    experience: [],
    selectedId: null,
    // method: null,
    exp: {},
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
  searchExp = async () => {
    await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${this.props.profile._id}/experiences`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("token"),
          ContentType: "application/json",
        }),
      }
    )
      .then((response) => response.json())
      .then((experience) => {
        this.setState({ experience: experience });
      });
  };
  componentDidMount = () => {
    this.searchExp();
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.profile._id !== this.props.profile._id) {
      this.searchExp();
    }
  };
  toggleModal = (job) => {
    job !== undefined
      ? this.setState({
          selectedId: job._id,
          showModal: !this.state.showModal,
        })
      : this.setState({
          selectedId: null,
          showModal: !this.state.showModal,
        });
  };

  render() {
    return (
      <>
        <Card className="bio cardProf">
          <Card.Body>
            <Row className="d-flex justify-content-between ml-1">
              <div id="expTitle" className="info">
                Experience
              </div>

              <Route path="/user/me">
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
                    {this.state.experience.map((experience, index) => (
                      <Draggable
                        key={experience._id}
                        draggableId={experience._id}
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
                                  src={
                                    experience.image ? experience.image : Job
                                  }
                                  style={{ width: "48px" }}
                                />
                              </div>
                              <Col>
                                <ul
                                  id={experience._id}
                                  key={`exp${index}`}
                                  className="exp"
                                >
                                  <Route path="/user/me">
                                    <Button
                                      variant="white"
                                      className="editBtnExp"
                                      onClick={() =>
                                        this.toggleModal(experience)
                                      }
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
                                    <div class="roleExp">{experience.role}</div>
                                  </li>
                                  <li className="expEntries">
                                    <div class="workplaceExp">
                                      {experience.company}
                                    </div>
                                  </li>
                                  <li className="expEntries">
                                    <div class="timeExp">
                                      {moment(experience.startDate).format(
                                        "MM/YYYY"
                                      )}  -  {experience.endDate ? moment(experience.endDate).format(
                                        "MM/YYYY"
                                      ) : "Current"}
                                    </div>
                                    <div class="timeExp">
                                      
                                    </div>
                                  </li>

                                  <li className="expEntries">
                                    <div class="cityExp">{experience.area}</div>
                                  </li>
                                  <li className="expEntries">
                                    <div class="descExp">
                                      {experience.description}
                                    </div>
                                  </li>
                                </ul>
                              </Col>
                            </Row>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Card.Body>
        </Card>
        <Route path="/user/me">
          {" "}
          <Edit
            show={this.state.showModal}
            userId={this.props.profile._id}
            expId={this.state.selectedId}
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
