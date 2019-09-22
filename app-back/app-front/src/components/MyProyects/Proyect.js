import React, { Component } from 'react';

class Proyect extends Component {
    state = {
        name: this.props.value.ProyectName,
        adminProyect: this.props.value.AdminProyect,
        associates: this.props.value.Associates,
        taskBoards: this.props.value.TaskBoards
    }

    handleClick = () => {

    }

    render() {
        return (
            <div className="card bg-light task shadow-sm">
                <div className="card-body">
                    <div className="card-title border-bottom text-primary">
                        <h4>{this.state.name}</h4>
                    </div>
                    <div className="card-body">
                        <p> Project Administrator: {this.state.adminProyect} </p>
                    </div>
                    <button onClick={this.handleClick} type="button" className="btn btn-outline-primary float-right">Tasks</button>
                </div>
            </div>
        );
    }
}

export default Proyect;