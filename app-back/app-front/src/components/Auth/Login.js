import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
const axios = require('axios'); //Libreria axios

class Login extends Component {
	
	/**
	 * * Las variables del estado son: uname - Nombre de usuario y upass - Contraseña digitada.
	 */

	state = {
		uname: "",
		upass: ""
	}	
	
	getLogData = (user, pass) => {
		try { return axios.get(`/users/${user}/${pass}`); }
		catch (error) {console.error(`Error fatal trayendo los datos del login: ${error}`)}
	};

	clickLog = async (event) => {
		//* Actualizar el componente sin dar refresh		
		event.preventDefault();

		if (this.state.uname.length === 0) return alert("Please enter your username");
		if (this.state.upass.length === 0) return alert("Please enter your password");

		//* Llamar al backend: Peticion traer los datos de inicio de sesión.
		//* Llamada al backend con axios.

		this.getLogData(this.state.uname, this.state.upass).then(res => {
			let data = res.data;
			if (data.length === 0) return alert("The email and password doesn't match with any registered user, check the credentials");

			//* Actualizar el nombre de usuario con el estado padre.
			let user_data = data[0]; //Datos del usuario.
			this.props.userf(user_data.userName); //* El atributo userName contiene el nombre del usuario, cambiar el nombre del usuario en la app.
			this.props.history.push ({ //* Actualizar la vista.
				pathname: '/myproyects',
				correo: user_data.mail
			});
		});		
	};

	clickSignIn = () =>{
		this.props.history.push({
			pathname: '/signin'
		})
	}

	render() {
		return (
			<div className="col-4 justify-content-center centrar">
				<div className="container-fluid justify-content-center">
					<h5 className="loginTitle">Login</h5>
				</div>
				<form className="titleFormSpace">
					<div className="form-group">
						<label>Username</label>
						<input type="text" name="uName" className="form-control" id="userName" aria-describedby="emailHelp" placeholder="Enter your username" onChange={(evt) => this.setState({uname: evt.target.value})} required/>						
					</div>
					<div className="form-group">
						<label>Password</label>						
						<input type="password" name="uPass" className="form-control" id="userPass" placeholder="User's account password" onChange={(evt) => this.setState({upass: evt.target.value})} required/>
					</div>		
					<div className="row button-row">
						<button type="button" onClick={this.clickLog} className="btn btn-primary logButtonSpace"> Log In </button>					
						<button type="button" onClick={this.clickSignIn} className="btn btn-secondary">Sign In</button>
					</div>
				</form>
			</div>		
		);
	}
}

export default withRouter(Login);
