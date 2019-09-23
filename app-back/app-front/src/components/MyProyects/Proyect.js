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
        axios.delete(`/proyects/${this.state.adminProyect}/${this.state.name}`);
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
        if (this.state.adminProyect === this.props.user) {
            return <button className="btn-sm mb-3 btn-outline-danger" onClick={this.handleClick}><i className="fas fa-trash prefix grey-text"></i></button>
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
                <div data-aos="flip-up" data-aos-duration="2000">

                    <div className="card bg-light task shadow-sm p-3 mb-5">
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
                        <button type="button" className="btn btn-outline-primary float-right" onClick={this.clickBoard}>Board <i class="far fa-clipboard"></i></button>

                    </div>
                </div>

            );
        }
    }
}


export default withRouter(Proyect);