import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import image from '../../data/clock.png';

const axios = require('axios'); //Libreria axios

class signIn extends Component {

    /**
     * *Declaración del estado del componente:
     * *username: Nombre del nuevo usuario que se desea crear
     * *email: Dirección de correo asociada al nuevo usuario.
     * *password: Contraseña del usuario.
     */

    state = {userName:"", mail:"", password:""}

    //* Realiza el registro en la base de datos para el nuevo usuario.
    //* @param data - Objeto con los datos del nuevo usuario userName, mail, password.

    registerUser = (data) => {
        try { return axios.post("/users", data)}
        catch (error) {console.error(`Error realizando el post de los datos: ${error}`)}
    };

    clickRegister = async () => {

        //* Mirar si todos los datos del campo estan correctos.
        let empty = 0;
        for (const [key, value] of Object.entries(this.state)) {
            console.log(`Clave: ${key}, valor: ${value}`);
            if (value.length === 0) empty++;

        }

        if (empty > 0) {
            return alert(`There are ${empty} field in the form to complete, all field are required`);
        }

        //* Registrar el usuario
        this.registerUser(this.state).then(res => {
            this.props.history.push({ //Enviar de regreso al login
                pathname: '/' 
            });
            return alert(`The user ${this.state.userName} has been created succesfully`);
        });        
    };

    render() {
        return (
            <div data-aos="fade-up" data-aos-duration="1000">
            <div className="col-4 justify-content-center centrar card p-3 mb-5 shadow">
            	<h1 className="text-center mb4">Time Tasks</h1>
				<img src={image} alt = 'logo' className="rounded mx-auto d-block " height = '60%' width = '60%'></img>
                <h5 className="align-content-center mt-3"> Sign In </h5>
                <form>
					<div className="form-group">
						<label>User name</label>
						<input type="text" className="form-control" id="username" aria-describedby="User name" placeholder="Enter your user name" onChange={(evt) => this.setState({userName: evt.target.value})} required/>						
					</div>
					<div className="form-group">
						<label>User's Email</label>						
						<input type="email" className="form-control" id="useremail" placeholder="Enter your email address" onChange={(evt) => this.setState({mail: evt.target.value})} required/>
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
            </div>
        )
    }
}

export default withRouter(signIn);
