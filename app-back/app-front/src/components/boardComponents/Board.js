import React, { Component } from 'react';
import TaskBoard from "./TaskBoard";
import {withRouter} from "react-router-dom";


class Board extends Component {
    state = {
        TaskBoards: [],
        admin: '',
        associates: [],
        name: ''
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

            </div>
        );
    }
}

export default withRouter(Board);