import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Board from '../components/boardComponents/Board';
import Login from '../components/Auth/Login';
import MyProyects from '../components/MyProyects/MyProyects';
import SignIn from '../components/Auth/signIn';

class Router extends Component {
	state = {
		user: ''
	};

	handleAuth = user => {
		this.setState({
			user: user
		});
	};

	render() {
		return (
			<div className="container-fluid">
				<Switch>
					<Route
						exact
						path="/"
						render={() => <Login userf={this.handleAuth} />}
					/>
					<Route
						path="/signin"
						render={() => <SignIn/>}
					/>
					<Route path="/myproyects" 
                            render={() => <MyProyects user = {this.state.user}/>} />
					<Route
						path="/board"
						render={() => <Board user={this.state.user} />}
					/>
				</Switch>
			</div>
		);
	}
}

export default Router;
