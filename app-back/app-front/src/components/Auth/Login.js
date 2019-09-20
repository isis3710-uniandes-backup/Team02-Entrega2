import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Login extends Component {
	//TODO Login con back
	clickBack = () => {
		this.props.userf('Mateo');
		this.props.history.push({
			pathname: '/board',
			correo: 'm.sicard10'
		});
	};

	render() {
		return (
			<div>
				<button onClick={this.clickBack} className = "btn btn-primary"> hola </button>
			</div>
		);
	}
}

export default withRouter(Login);
