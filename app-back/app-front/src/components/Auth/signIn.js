import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
const axios = require('axios'); //Libreria axios

class signIn extends Component {

    /**
     * *Declaración del estado del componente:
     * *username: Nombre del nuevo usuario que se desea crear
     * *email: Dirección de correo asociada al nuevo usuario.
     * *password: Contraseña del usuario.
     */

    state = {username:"", email:"", password:""}

    //* Realiza el registro en la base de datos para el nuevo usuario.
    //* @param data - Objeto con los datos del nuevo usuario userName, mail, password.

    registerUser = (data) => {
        console.log(`Register data ${data}`);
        try { return axios.post("/users", data)}
        catch (error) {console.error(`Error realizando el post de los datos: ${error}`)}
    };

    clickRegister = async () => {
        console.log(`Username: ${this.state.username}, email: ${this.state.email}, pass: ${this.state.password}`);
        //* Registrar el usuario
        this.registerUser(this.state).then(res => {
            console.log("El usuario ha sido registrado satisfactoriamente");
            this.props.history.push({ //Enviar de regreso al login
                pathname: '/' 
            });
        });        
    };

    render() {
        return (
            <div className="col-4 centrar">
                <h5 className="align-content-center"> Sign In </h5>
                <form>
					<div className="form-group">
						<label>User name</label>
						<input type="text" className="form-control" id="username" aria-describedby="User name" placeholder="Enter your user name" onChange={(evt) => this.setState({username: evt.target.value})} required/>						
					</div>
					<div className="form-group">
						<label>User's Email</label>						
						<input type="email" className="form-control" id="useremail" placeholder="Enter your email address" onChange={(evt) => this.setState({email: evt.target.value})} required/>
					</div>
                    <div className="form-group">
						<label>Password</label>						
						<input type="password" className="form-control" id="password" placeholder="Enter a safe password" onChange={(evt) => this.setState({password: evt.target.value})} required/>
					</div>		
					<div className="row button-row">
						<button type="button" onClick={this.clickRegister} className="btn btn-success logButtonSpace"> Register </button>					
					</div>
				</form>
            </div>
        )
    }
}

export default withRouter(signIn);
