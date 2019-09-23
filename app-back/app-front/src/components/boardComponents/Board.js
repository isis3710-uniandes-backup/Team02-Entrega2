import React, { Component } from "react";
import TaskBoard from "./TaskBoard";
import { withRouter } from "react-router-dom";

class Board extends Component {
  state = {
    TaskBoards: [],
    admin: "",
    associates: [],
    name: "",
    value1: ""
  };

  componentDidMount() {
    //TODO solo traer el proyecto actual del usuario actual

    // fetch("/proyects").then(async resp => {
    //   let t = await resp.json();
    //   console.log(t);
    //   this.setState({
    //     TaskBoards: t[0].TaskBoards,
    //     admin: t[0].AdminProyect,
    //     associates: t[0].Associates,
    //     name: t[0].ProyectName
    //   });
    // });
        fetch(`/proyects/${this.props.adminProyect}/${this.props.proyectName}`).then(async (resp) => {
            let t = await resp.json();
            if(!(t===undefined)){
                this.setState({
                    TaskBoards: t[0].TaskBoards,
                    admin: t[0].AdminProyect,
                    associates: t[0].Associates,
                    name: t[0].ProyectName
                });
            }
            }
        )
  }
  add = () => {
    let url =
      "/proyects/" + this.state.admin + "/" + this.state.name + "/addTaskBoard";
    let data = {
      name: this.state.value1,
      index: this.state.TaskBoards.length,
      Tasks: []
    };
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))

    let newtaskBoards = this.state.TaskBoards;
    newtaskBoards.push(data);
    this.setState({
      TaskBoards: newtaskBoards
    });
  };

  onChangeValue = event => {
    this.setState({ value1: event.target.value });
  };

  submitTime = (indexBoard, indexTask, tiempo) => {
    let url =
      "/proyects/" +
      this.state.admin +
      "/" +
      this.state.name +
      "/" +
      indexBoard +
      "/" +
      indexTask +
      "/addTime";
    let data = {
      UserName: this.props.user,
      timeSec: tiempo
    };
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error));
  };

  remove2 = (indexBoard, name) => {
    let url =
      "/proyects/" +
      this.state.admin +
      "/" +
      this.state.name +
      "/DeleteTaskBoard/" +
      name;
    let data = {
      index: indexBoard
    };
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error));

    let newState = this.state.TaskBoards;
    let boards = newState;
    boards.splice(indexBoard, 1);
    for (let i = 0; i < boards.length; i++) {
      boards[i].index = indexBoard;
    }
    this.setState({
      TaskBoards: newState
    });
  };

  remove = (indexBoard, indexTask) => {
    var url =
      "/proyects/" +
      this.state.admin +
      "/" +
      this.state.name +
      "/deletetask/" +
      indexBoard +
      "/" +
      indexTask;
    var data = {
      index: indexTask,
      indexP: indexBoard
    };

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error));

    let newState = this.state.TaskBoards;
    let tasks = newState[indexBoard].Tasks;
    tasks.splice(indexTask, 1);

    for (let i = indexTask; i < tasks.length; i++) {
      tasks[i].index = indexTask;
    }

    this.setState({
      TaskBoards: newState
    });
  };

  render() {
    return (
      <div>
        <div className="text-center shadow p-3 mb-5 rounded bg-primary text-white">
          <h1>Project: {this.state.name}</h1>
        </div>
        <div className="container-fluid">
          <div className="row">
            {this.state.TaskBoards.map((e, i) => (
              <TaskBoard
                name={this.state.name}
                admin={this.state.admin}
                associates={this.state.associates}
                user={this.props.user}
                value={e}
                functions={[this.remove, this.remove2, this.submitTime]}
                key={e.name}
              />
            ))}
          </div>
        </div>
        <div className="text-right">
        <button
          id="addTaskBoard"
          type="button"
          className="btn bg-success btn-circle btn-xl"
          data-toggle="modal"
          data-target="#modalTaskBoard"
        >
          <h1 className="text-white"><i className="fas fa-plus prefix grey-text"></i></h1>
        </button>
        </div>
        <div
          className="modal fade"
          id="modalTaskBoard"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Create task board
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      value={this.state.value1}
                      onChange={this.onChangeValue}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={!this.state.value1}
                  type="button"
                  onClick={this.add}
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Board);
