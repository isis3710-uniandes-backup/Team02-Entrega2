import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import image from '../../data/clock.png';

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
			<div>
			<div data-aos="flip-left" data-aos-duration="1000">
					<div className="col-4 justify-content-center centrar card p-3 mb-5">
					<div className="container-fluid justify-content-center">
					<h1 className="text-center mb4">Time Tasks</h1>
					<img src={image} alt = 'logo' className="rounded mx-auto d-block " height = '60%' width = '60%'></img>
						<h5 className="text-center mt-3">Login</h5>
					</div>
					<form className="">
						<div className="form-group">
							<label>Username</label>
							<input type="text" name="uName" className="form-control" id="userName" aria-describedby="emailHelp" placeholder="Enter your username" onChange={(evt) => this.setState({uname: evt.target.value})} required/>						
						</div>
						<div className="form-group">
							<label>Password</label>						
							<input type="password" name="uPass" className="form-control" id="userPass" placeholder="User's account password" onChange={(evt) => this.setState({upass: evt.target.value})} required/>
						</div>		
						<div className="row justify-content-center">
							<button type="button" onClick={this.clickLog} className="btn btn-primary m-3"> Log In </button>					
							<button type="button" onClick={this.clickSignIn} className="btn btn-secondary m-3">Sign In</button>
						</div>
					</form>
			</div>
			</div>

			<div data-aos="fade-up" data-aos-duration="1000">
				<div className = 'col-4 justify-content-center centrar card p-3 mb-5'>
					<div className="card-body">
						<h5 className="card-title text-center">⏱⏱ About us ⏱⏱</h5>
						<p className="card-text text-center"> We are here to manage your tasks for all the proyects you have. Manage every single task stage and assign them to your colleagues. Most importantly: record How much time takes you to do each task.</p>
					</div>
				</div>
			</div>

			<div data-aos="fade-up" data-aos-duration="1000">
				<div className = 'col-4 justify-content-center centrar card p-3 mb-5'>
					<div className="card-body">
						<h5 className="card-title text-center">⏱⏱Easter egg⏱⏱</h5>
						<p className="card-text text-center"> you have encouterd an easter egg</p>
					</div>
				</div>
			</div>

			</div>		
		);
	}
}

export default withRouter(Login);
