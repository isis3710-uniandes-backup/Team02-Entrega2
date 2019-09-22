import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

//* Variables de URL
const url = "http://localhost:3001";

class Login extends Component {
	//TODO Login con back
	//TODO Verificar la información con el backend y verificar que sea veridica.
	//TODO Actualizar el nombre de usuario con el obtenido.		

	/**
	 * * Las variables del estado son: uemail - Correo del usuario y upass - Contraseña digitada.
	 */
	state = {
		uemail: "",
		upass: ""
	}	
	
	clickLog = (event) => {
		//* Actualizar el componente sin dar refresh		
		event.preventDefault();
		console.log(`El Email ingresado fue: ${this.state.uemail} y el pass fue: ${this.state.upass}`);

		//* Llamar al backend: Peticion traer los datos de inicio de sesión.

		fetch(url + `/users/${this.state.uemail}/${this.state.upass}`).then((res) => res.json()).then((data) => {
			if (data.length === 0) return alert("The email and password doesn't match with any registered user, check the credentials");
			let user_data = data[0]; //* El backend retorna el objeto sobre un arreglo.
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
						<label>User's Email</label>
						<input type="email" name="uEmail" className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter your user's email" onChange={(evt) => this.setState({uemail: evt.target.value})} required/>						
					</div>
					<div className="form-group">
						<label>Password</label>						
						<input type="password" name="uPass" className="form-control" id="userPass" placeholder="User's account password" onChange={(evt) => this.setState({upass: evt.target.value})} required/>
					</div>		
					<div className="row button-row">
						<button type="button" onClick={this.clickLog} className="btn btn-success logButtonSpace"> Log In </button>					
						<button type="button" onClick={this.clickSignIn} className="btn btn-secondary">Sign In</button>
					</div>
				</form>
			</div>		
		);
	}
}

export default withRouter(Login);
