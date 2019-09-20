
import React, { Component } from 'react';

import Task from './Task';

class TaskBoard extends Component {
    state = {
        name: this.props.value.name,
        tasks: this.props.value.Tasks,
        index: this.props.value.index,
        functions: this.props.functions
    }

    add = () => {
        let t = {
            index: this.state.tasks.length,
            indexP: this.state.index,
            name: "TaskAdded",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel error quos, saepe ea quaerat quas. Corporis, praesentium, assumenda unde necessitatibus, minus ad dolorem molestias doloremque rem nisi illum ducimus? Id?"
        };

        let newtasks = this.state.tasks;
        newtasks.push(t);
        this.setState({
            tasks: newtasks
        });
    }

    render() {
        return (
            <div className="col-4">
                <div className="card shadow-sm p-3 mb-5 bg-white rounded taskBoard"  >
                    <div className="card-body">
                        <div className=" badge text-center shadow-sm bg-primary p-2 text-white rounded tituloTaskBoard">{this.state.name}</div>
                        <div>{this.state.tasks.map((e, i) => <Task value={e} key={e.name} functions={this.state.functions} />)}</div>
                        <button onClick={this.add} type="button" className="btn btn-primary float-right"> Add</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default TaskBoard;