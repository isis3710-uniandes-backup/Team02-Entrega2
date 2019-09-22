import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
const axios = require('axios');



class Proyect extends Component {
    state = {
        name: this.props.value.ProyectName,
        adminProyect: this.props.value.AdminProyect,
        associates: this.props.value.Associates,
        taskBoards: this.props.value.TaskBoards,
        existe: this.props.value.existe
    }

    handleClick = () => {
        axios.delete('/proyects/sicard6/' + this.state.name);
        this.props.action();
        this.setState({ existe: false });
        this.setState({ state: this.state });
    }

    clickBoard = () => {
        this.props.proyect(this.props.user, this.state.name, this.state.adminProyect);
        this.props.history.push({
            pathname: '/board',
        });
    }

    checkDelete = () => {
        if(this.state.adminProyect === this.props.user){
            return <button className="btn-sm btn-danger" onClick={this.handleClick}>Delete</button>
        }
    }

    render() {
        if (this.state.existe === false) {
            return (
                <div></div>
            )
        }
        else {
            return (
                <div className="card bg-light task shadow-sm">
                    <div className="card-body">

                        <div className="card-title border-bottom text-primary row">
                            <div className="col-6">
                                <h4>{this.state.name}</h4>
                            </div>
                            <div className="col-6" align="right">
                                {this.checkDelete()}
                            </div>
                        </div>
                        <div className="card-body">
                            <p> Project Administrator: {this.state.adminProyect} </p>
                        </div>
                        <button type="button" className="btn btn-outline-primary float-right" onClick={this.clickBoard}>Board</button>
                    </div>
                </div>
            );
        }
    }
}


export default withRouter(Proyect);