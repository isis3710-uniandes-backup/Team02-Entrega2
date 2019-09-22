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
        //let url = "/proyects/" + this.state.user.userName ;
        // Cuando ya sirva bien el login, se utilizará la variable URL para que encuentre los proyectos del usuario que se loggeo
        //console.log("url: " + url);
        fetch("/proyects/sicard6")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ projects: res });
                console.log(this.state.projects)
            });
        console.log("Usuario: " + this.state.user);
    }

    clickBoard = () => {
        this.props.history.push({
            pathname: '/board',
            correo: 'm.sicard10'
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
        console.log("ENTERS FUNCTION");
        let name = document.getElementById("defaultForm-name").value;
        console.log("Nombre: " + name);
        let associates = [];
        for (let i = 0; i < this.state.numAsociados; i++) {
            associates.push(document.getElementById(i).value)
        }

        console.log(associates);

        let project = {
            "ProyectName": name,
            "AdminProyect": "sicard6",
            "Associates": associates,
            "TaskBoards": []

        }
        callback(project);
    }

    renderFormData = (callback) => {
        this.createProjectJSON((project) => {
            axios.post('/proyects', project)
                .then(res => {
                    console.log(res);
                    callback();
                });
        })
    }

    refreshProjects = () => {
        fetch("/proyects/sicard6") //Cambair para que no este quemado sicard
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ projects: res });
                console.log(this.state.projects)
                this.setState({ state: this.state });
            });

    }

    render() {
        console.log(this.props)

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
                    {this.state.projects.map(e => <Proyect value={e} action={this.refreshProjects} />)}
                </div>


                <div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header text-center">
                                <h4 class="modal-title w-100 font-weight-bold">Create project</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body mx-3">
                                <div class="md-form mb-5">
                                    <i class="fas fa-envelope prefix grey-text"></i>
                                    <label data-error="wrong" data-success="right" for="defaultForm-email">Name</label>
                                    <input type="text" id="defaultForm-name" class="form-control validate"></input>

                                </div>
                                <div class="md-form mb-4">
                                    <i class="fas fa-lock prefix grey-text"></i>

                                    <label data-error="wrong" data-success="right" for="defaultForm-pass">Associates</label>
                                    <div className="text-right">
                                        <button className="btn-sm btn-warning" id="btn-add" onClick={this.addAsociate}>Add</button>
                                    </div>

                                    {arr.map((value, index) => {
                                        return <div><input type="text" id={index} class="form-control validate"></input><br></br></div>
                                    })}

                                </div>
                            </div>
                            <div class="modal-footer d-flex justify-content-center">
                                <button class="btn btn-success" id="btn-create" onClick={this.sendPostProject} data-dismiss="modal" > Create</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="addProject" className="">
                    <a href="" className="btn bg-primary btn-circle btn-xl" data-toggle="modal" data-target="#modalLoginForm"><h1 className="text-white">+</h1></a>
                </div>
            </div >
        )
    }
}
export default withRouter(MyProyects);