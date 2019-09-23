import React, { Component } from "react";
import Timer from "./Timer";

class Task extends Component {
  state = {
    name: this.props.value.name,
    des: this.props.value.description,
    index: this.props.value.index,
    indexP: this.props.value.indexP,
    functions: this.props.functions,
    onCharge: this.props.value.onCharge,
    timeSpent: this.props.value.timeSpent,
    user:this.props.user
  };

  render() {
      let t = "#moreInfo" + this.state.indexP + "-" + this.state.index;
      let v = "moreInfo" + this.state.indexP + "-" + this.state.index;
    return (
      <div className="card bg-light task shadow-sm">
        <div className="card-body">
          <div className="card-title border-bottom">{this.state.name}</div>
          <div className="card-body">{this.state.des}</div>
          <a href={t} data-toggle="collapse" className="btn-lg btn-block btn-secondary mb-2 dropdown-toggle">
            More
          </a>
          <div className="collapse" id={v} >
            <div className="card card-body">
              <ul className = 'list-group m-1'>
            <li className="list-group-item list-group-item-info" >assigned to this task</li>
              {this.state.onCharge.map((e,i)=>(
                  <li className = 'list-group-item' key = {e}>{e}</li> 
              ))}
              </ul>
              <ul className = 'list-group m-1'>
              <li className="list-group-item list-group-item-info" >Time spent:</li>
              {this.state.timeSpent.map((e,i)=>(
                  <li className="list-group-item" key = {e.UserName}>{e.UserName} :  {Math.floor(((e.timeSec/1000)/60)/60)}:{Math.floor((e.timeSec/1000)/60)}:{Math.floor((e.timeSec/1000)%60)}</li> 
              ))}
              <h4 className ='mt-2'>Start your task time, {this.state.user}!</h4> < Timer index = {this.state.index} indexP = {this.state.indexP} functions={this.state.functions} />
              </ul>
            </div>
          </div>
          <button
            onClick={() => {
              this.state.functions[0](
                this.props.value.indexP,
                this.props.value.index
              );
            }}
            type="button"
            className="btn btn-outline-primary float-right mt-2"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}

export default Task;
