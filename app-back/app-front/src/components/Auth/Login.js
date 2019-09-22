import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Login extends Component {
	//TODO Login con back
	clickLog = () => {
		this.props.userf('Mateo');
		this.props.history.push({
			pathname: '/myproyects',
			correo: 'm.sicard10'
		});
	};

	clickSignIn = () =>{
		this.props.history.push({
			pathname: '/signin'
		})
	}

	render() {
		return (
			<div className="col-4 justify-content-center">
				<div className="container-fluid justify-content-center">
					<h5 className="loginTitle">Login</h5>
				</div>
				<form className="titleFormSpace">
					<div className="form-group">
						<label for="userEmail">User's Email</label>
						<input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter your user's email"/>						
					</div>
					<div className="form-group">
						<label for="userPass">Password</label>
						<input type="password" className="form-control" id="userPass" placeholder="User's account password"/>
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
