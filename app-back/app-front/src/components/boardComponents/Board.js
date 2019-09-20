import React, { Component } from 'react';
import TaskBoard from "./TaskBoard";

class Board extends Component {
    state = {
        TaskBoards: [{
            name: "To do",
            index:0,
            Tasks: [{
                index:0,
                indexP:0,
                name: "Task1",
                description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel error quos, saepe ea quaerat quas. Corporis, praesentium, assumenda unde necessitatibus, minus ad dolorem molestias doloremque rem nisi illum ducimus? Id?"
            },
            {
                index:1,
                indexP:0,
                name: "Task2",
                description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel error quos, saepe ea quaerat quas. Corporis, praesentium, assumenda unde necessitatibus, minus ad dolorem molestias doloremque rem nisi illum ducimus? Id?"
            }]
        }, {
            name: "Doing",
            index:1,
            Tasks: [{
                index:0,
                indexP:1,
                name: "Task1",
                description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel error quos, saepe ea quaerat quas. Corporis, praesentium, assumenda unde necessitatibus, minus ad dolorem molestias doloremque rem nisi illum ducimus? Id?"
            },
            {
                index:1,
                indexP:1,
                name: "Task2",
                description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel error quos, saepe ea quaerat quas. Corporis, praesentium, assumenda unde necessitatibus, minus ad dolorem molestias doloremque rem nisi illum ducimus? Id?"
            }]
        },
        {
            name: "Done",
            index:2,
            Tasks: [{
                index:0,
                indexP:2,
                name: "Task1",
                description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel error quos, saepe ea quaerat quas. Corporis, praesentium, assumenda unde necessitatibus, minus ad dolorem molestias doloremque rem nisi illum ducimus? Id?"
            }]
        }]
    }

    remove = (indexBoard, indexTask) => {
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
                <div class="text-center shadow-sm p-3 mb-5 bg-white rounded ">
                    My Kanban App
                </div>
                <div class="container-fluid">
                    <div class="row">
                        {this.state.TaskBoards.map((e, i) => <TaskBoard value={e} functions={[this.remove]} key={e.name} />)}
                    </div>
                </div>

            </div>
        );
    }
}

export default Board;