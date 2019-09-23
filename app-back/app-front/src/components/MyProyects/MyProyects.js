import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import Proyect from './Proyect';

const axios = require('axios');

class MyProyects extends Component {

    state = {
        user: this.props.user,
        numAsociados: 0,
        projects: []
    }

    componentDidMount() {
        let url = "/proyects/" + this.state.user ;
        // Cuando ya sirva bien el login, se utilizará la variable URL para que encuentre los proyectos del usuario que se loggeo
        //console.log("url: " + url);
        fetch(url)
            .then(res => res.json())
            .then(res => {
                //console.log(res);
                this.setState({ projects: res });
                //console.log(this.state.projects)
            });
        //console.log("Usuario: " + this.state.user);
    }

    clickBoard = () => {
        this.props.history.push({
            pathname: '/board'
        });
    };
    
    addAsociate = () => {
        this.setState({ numAsociados: this.state.numAsociados + 1 });
        this.setState({ state: this.state });
    }

    sendPostProject = () => {
        this.renderFormData(() => {
            this.refreshProjects();
            document.getElementById("defaultForm-name").value = "";
            this.setState({ numAsociados: 0 });
            this.setState({ state: this.state });
        });

    }

    createProjectJSON(callback) {
        //console.log("ENTERS FUNCTION");
        let name = document.getElementById("defaultForm-name").value;
        //console.log("Nombre: " + name);
        let associates = [];
        for (let i = 0; i < this.state.numAsociados; i++) {
            associates.push(document.getElementById(i).value)
        }

        //console.log(associates);

        let project = {
            "ProyectName": name,
            "AdminProyect": this.state.user,
            "Associates": associates,
            "TaskBoards": []

        }
        callback(project);
    }

    renderFormData = (callback) => {
        this.createProjectJSON((project) => {
            axios.post('/proyects', project)
                .then(res => {
                    //console.log(res);
                    callback();
                });
        })
    }

    refreshProjects = () => {
        let url = `/proyects/${this.state.user}`;
        fetch(url) //Cambair para que no este quemado sicard
            .then(res => res.json())
            .then(res => {
                //console.log(res);
                this.setState({ projects: res });
                //console.log(this.state.projects)
                this.setState({ state: this.state });
            });

    }

    render() {
        //console.log(this.props)

        let arr = [];
        for (let i = 0; i < this.state.numAsociados; i++) {
            arr.push(i.toString());
        }

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <h1> {this.state.user}'s Projects </h1>
                </div>
                <div className="card-columns">
                    {this.state.projects.map((e, index) => <Proyect key={index} user={this.state.user} value={e} action={this.refreshProjects} proyect={this.props.proyectName} />)}
                </div>


                <div className="modal fade" id="modalLoginForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4 className="modal-title w-100 font-weight-bold">Create project</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body mx-3">
                                <div className="md-form mb-5">
                                    <i className="fas fa-envelope prefix grey-text"></i>
                                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-email">Name</label>
                                    <input type="text" id="defaultForm-name" className="form-control validate"></input>

                                </div>
                                <div className="md-form mb-4">
                                    <div className="row">
                                        <div className="col-10">
                                            <i className="fas fa-lock prefix grey-text"></i>
                                            <label data-error="wrong" data-success="right" htmlFor="defaultForm-pass">Associates</label>
                                        </div>
                                        <div className="col-2">
                                            <div className="text-right">
                                                <button className="btn-sm btn-warning" id="btn-add" onClick={this.addAsociate}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    {arr.map((value, index) => {
                                        return <div><input type="text" id={index} className="form-control validate"></input><br></br></div>
                                    })}

                                </div>
                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button className="btn btn-success" id="btn-create" onClick={this.sendPostProject} data-dismiss="modal" > Create</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="addProject" className="">
                    <button className="btn bg-primary btn-circle btn-xl" data-toggle="modal" data-target="#modalLoginForm"><h1 className="text-white">+</h1></button>
                </div>
            </div>
        )
    }
}
export default withRouter(MyProyects);