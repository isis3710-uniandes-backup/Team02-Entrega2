import React, { Component } from 'react';
import TaskBoard from "./TaskBoard";
import {withRouter} from "react-router-dom";


class Board extends Component {
    state = {
        TaskBoards: [],
        admin: '',
        associates: [],
        name: '',
        value1:''
    }

    componentDidMount() {
        //TODO solo traer el proyecto actual del usuario actual
        fetch("/proyects").then(async (resp) => {
            let t = await resp.json();
            console.log(t);
            this.setState({
                TaskBoards: t[0].TaskBoards,
                admin: t[0].AdminProyect,
                associates: t[0].Associates,
                name: t[0].ProyectName
            });
        })
    }

    add = () => {
        var url = "/proyects/"+this.state.admin + "/" + this.state.name + "/addTaskBoard";
        var data = {
          name: this.state.value1,
          index: this.state.TaskBoards.length+1,
          Tasks:[]
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
          .then(response => console.log("Success:", response));

          let newtaskBoards = this.state.TaskBoards;
          newtaskBoards.push(data);
          this.setState({
            TaskBoards: newtaskBoards
          });
      };
    
      onChangeValue = event => {
        this.setState({ value1: event.target.value });
      };
    
    

    remove = (indexBoard, indexTask) => {
        var url = "/proyects/"+this.state.admin + "/" + this.state.name + "/deletetask/" + indexBoard + "/" + indexTask;
    var data = {
      index: indexTask,
      indexP: indexBoard,
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
      .then(response => console.log("Success:", response));

        let newState = this.state.TaskBoards;
        let tasks = newState[indexBoard].Tasks;
        tasks.splice(indexTask, 1);

        for (let i = indexTask; i < tasks.length; i++) {
            tasks[i].index = indexTask;
        }

        this.setState({
            TaskBoards: newState
        });
    }

    render() {
        return (
            <div>
                <div className="text-center shadow-sm p-3 mb-5 bg-white rounded ">
                    HELLO:  {this.props.user}
                </div>
                <div className="container-fluid">
                    <div className="row">
                        {
                            this.state.TaskBoards.map((e, i) => <TaskBoard name = {this.state.name} admin = {this.state.admin} associates={this.state.associates} user={this.props.user} value={e} functions={[this.remove]} key={e.name} />)
                        }
                    </div>
                </div>
                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#modalTaskBoard">New board</button>
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
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
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
                      disabled={!( this.state.value1)}
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