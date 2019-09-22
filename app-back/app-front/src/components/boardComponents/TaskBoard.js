import React, { Component } from "react";

import Task from "./Task";

class TaskBoard extends Component {
  state = {
    value1: "",
    value2: "",
    value3: this.props.user,
    name: this.props.value.name,
    tasks: this.props.value.Tasks,
    index: this.props.value.index,
    functions: this.props.functions,
    admin: this.props.admin,
    associates: this.props.associates,
    proyectName: this.props.name
  };

  add = () => {
    var url = "/proyects/"+this.state.admin + "/" + this.state.proyectName + "/addTask/" + this.state.index;
    console.log(url);
    var data = {
      index: 0,
      indexP: this.state.index,
      name: this.state.value1,
      description: this.state.value2,
      onCharge: [this.state.value3],
      timeSpent: []
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

    let t = {
      index: this.state.tasks.length,
      indexP: this.state.index,
      name: this.state.value1,
      description: this.state.value2,
      onCharge:[this.state.value3]
    };
    console.log(t.onCharge);
    let newtasks = this.state.tasks;
    newtasks.push(t);
    this.setState({
      tasks: newtasks
    });
  };

  onChangeValue = event => {
    this.setState({ value1: event.target.value });
  };


  onChangeValue2 = event => {
    this.setState({ value2: event.target.value });
  };

  onChangeValue3 = event => {
    this.setState({ value3: event.target.value });
  };

  render() {
    let t = "#mod" + this.state.index;
    let v = "mod" + this.state.index;
    return (
      <div className="col-4">
        <div className="card shadow-sm p-3 mb-5 bg-white rounded taskBoard">
          <div className="card-body">
            <div className=" badge text-center shadow-sm bg-primary p-2 text-white rounded tituloTaskBoard">
              {this.state.name}
            </div>
            <div>
              {this.state.tasks.map((e, i) => (
                <Task
                  user={this.props.user}
                  value={e}
                  key={e.name}
                  functions={this.state.functions}
                />
              ))}
            </div>
            <button
              data-toggle="modal"
              data-target={t}
              type="button"
              className="btn btn-primary float-right"
            >
              {" "}
              Add
            </button>
            <div
              className="modal fade"
              id={v}
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Create task
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
                      <div className="form-group">
                        <label
                          htmlFor="message-text"
                          className="col-form-label"
                        >
                          Description:
                        </label>
                        <textarea
                          className="form-control"
                          id="message-text"
                          value={this.state.value2}
                          onChange={this.onChangeValue2}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="message-text"
                          className="col-form-label"
                        >
                          On charge:
                        </label>
                        <select id="empid" 
                          onChange={this.onChangeValue3}>
                            <option value = " ">---</option>
                          <option value = {this.state.admin}>{this.state.admin}</option>
                          {this.state.associates.map((e,i)=>(
                            <option value={e} key={e}>{e}</option>
                          ))}
                        </select>
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
                      disabled={!(this.state.value2 && this.state.value1 && this.state.value3)}
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
        </div>
      </div>
    );
  }
}

export default TaskBoard;
