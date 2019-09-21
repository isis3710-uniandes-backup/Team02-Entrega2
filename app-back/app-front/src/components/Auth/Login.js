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

	render() {
		return (
			<div>
				<button onClick={this.clickLog} className = "btn btn-primary"> hola </button>
			</div>
		);
	}
}

export default withRouter(Login);
