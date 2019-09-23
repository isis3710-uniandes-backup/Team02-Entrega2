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
    proyectName: this.props.name,
    numOncharge: 0
  };

  add = () => {

    let url =
      "/proyects/" +
      this.state.admin +
      "/" +
      this.state.proyectName +
      "/addTask/" +
      this.state.index;
      let onCharge = [];
        for (let i = 0; i < this.state.numOncharge; i++) {
            onCharge.push(document.getElementById(i).value)
        }

    let data = {
      index: this.state.tasks.length,
      indexP: this.state.index,
      name: this.state.value1,
      description: this.state.value2,
      onCharge: onCharge,
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
      .catch(error => console.error("Error:", error));

    let t = {
      index: this.state.tasks.length,
      indexP: this.state.index,
      name: this.state.value1,
      description: this.state.value2,
      onCharge: onCharge,
      timeSpent: []
    };

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

  addOnCharge = (e) => {
    e.preventDefault();
    this.setState({ numOncharge: this.state.numOncharge + 1 });
    this.setState({ state: this.state });
  };

  deleteOnCharge = (e) =>{
    e.preventDefault();
    this.setState({ numOncharge: this.state.numOncharge - 1 });
    this.setState({ state: this.state });
  }
  

  render() {
    let t = "#mod" + this.state.index;
    let v = "mod" + this.state.index;
    let arr = [];
    for (let i = 0; i < this.state.numOncharge; i++) {
      arr.push(i.toString());
    }
    return (
      
      <div className="col-4">
        <div className="card shadow-sm p-3 mb-5 bg-white rounded taskBoard">
          <div className="card-body">
            <div className=" badge text-center shadow-sm bg-primary p-2 text-white rounded tituloTaskBoard">
              {this.state.name}
            </div>
            <div>
              {this.state.tasks.map((e, i) => (
                <div data-aos="zoom-in">
                <Task
                  user={this.props.user}
                  value={e}
                  key={e.name}
                  functions={this.state.functions}
                />
                </div>
                
              ))}
            </div>
            <button
              data-toggle="modal"
              data-target={t}
              type="button"
              className="btn btn-success float-right m-1"
            >
              <i className="fas fa-plus prefix grey-text"></i>
            </button>

            <button
              onClick={() => {
                this.state.functions[1](this.state.index, this.state.name);
              }}
              type="button"
              className="btn btn-danger float-right m-1"
            >
              <i className="fas fa-trash prefix grey-text"></i>
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
                        <div className="md-form mb-4">
                          <div className="row">
                            <div className="col-9">
                              <i className="fas fa-lock prefix grey-text"></i>
                              <label
                                data-error="wrong"
                                data-success="right"
                                htmlFor="defaultForm-pass"
                              >
                              </label>
                            </div>
                            <div className="col-3">
                              <div className="text-right">
                                <button
                                  className="btn btn-primary m-1"
                                  id="add"
                                  onClick={this.addOnCharge}
                                  >
                                  Add
                                </button>
                                <button
                                  className="btn btn-outline-danger m-1"
                                  id="deleteOnCharge"
                                  onClick={this.deleteOnCharge}
                                  >
                                  remove
                                </button>
                              </div>
                            </div>
                          </div>
                          <br></br>
                          {arr.map((value, index) => {
                            return (
                              <select key={value} id={index} onChange={this.onChangeValue3}>
                          <option value=" ">---</option>
                          <option value={this.state.admin}>
                            {this.state.admin}
                          </option>
                          {this.state.associates.map((e, i) => (
                            <option value={e} key={i}>
                              {e}
                            </option>
                          ))}
                        </select>
                            );
                          })}
                        </div>
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
                      disabled={
                        !(
                          this.state.value2 &&
                          this.state.value1 &&
                          this.state.value3
                        )
                      }
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
