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
            <div class="card bg-light task shadow-sm">
                <div class="card-body">
                    <div class="card-title border-bottom">{this.state.name}</div>
                    <div class="card-body">{this.state.des}</div>
                    <button onClick={() => {
                        this.state.functions[0](this.props.value.indexP, this.props.value.index);
                    }
                    } type="button" class="btn btn-outline-primary float-right">Remove</button>
                </div>
            </div>
        );
    }
}

export default Task;