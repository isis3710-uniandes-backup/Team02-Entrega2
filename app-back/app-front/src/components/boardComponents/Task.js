import React, { Component } from 'react';

class Task extends Component {

    state = {
        name: this.props.value.name,
        des: this.props.value.description,
        index: this.props.value.index,
        indexP: this.props.value.indexP,
        functions: this.props.functions
    }

    render() {
        return (
            <div className="card bg-light task shadow-sm">
                <div className="card-body">
                    <div className="card-title border-bottom">{this.state.name}</div>
                    <div className="card-body">{this.state.des}</div>
                    <button onClick={() => {
                        this.state.functions[0](this.props.value.indexP, this.props.value.index);
                    }
                    } type="button" className="btn btn-outline-primary float-right">Remove</button>
                </div>
            </div>
        );
    }
}

export default Task;