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
          <a href={t} data-toggle="collapse" className="btn btn-primary">
            More:
          </a>
          <div className="collapse" id={v}>
          {//TODO completar el post y descomentar esto
          }
            <div className="card card-body">
            On charge:
              {/* {this.state.onCharge.map((e,i)=>(
                  <div key = {e}>{e}</div> 
              ))} */}
              Time spent:
              {/* {this.state.timeSpent.map((e,i)=>(
                  <div key = {e.UserName}>{e.UserName} = {e.timeSec}</div> 
              ))} */}
              <h3>Llevar tiempo:</h3>{this.state.user} => <Timer/>
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
            className="btn btn-outline-primary float-right"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}

export default Task;
