import React, { Component } from 'react';
import TaskBoard from "./TaskBoard";
import {withRouter} from "react-router-dom";


class Board extends Component {
    state = {
        TaskBoards: []
    }

    componentDidMount() {
        fetch("/proyects").then(async (resp) => {
            let t = await resp.json();
            console.log(t);
            this.setState({
                TaskBoards: t[0].TaskBoards
            });
            console.log(this.props);
        })
    }

    remove = (indexBoard, indexTask) => {
        //TODO Remove from DB
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
                            this.state.TaskBoards.map((e, i) => <TaskBoard user={this.props.user} value={e} functions={[this.remove]} key={e.name} />)
                        }
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(Board);