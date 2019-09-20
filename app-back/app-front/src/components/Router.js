import React, { Component } from 'react';
import {Switch, Route} from "react-router-dom";
import Board from "../components/boardComponents/Board";
import Login from "../components/Auth/Login";



class Router extends Component {

    state = {
        user: ""
    }

    handleAuth = (user) =>{
        this.setState({
            user: user
        })
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route
                        exact
                        path ="/"
                        render = { () => (
                            <Login userf = {this.handleAuth}/>
                        )}
                    />
                    <Route
                        path ="/board"
                        render = { () => (
                            <Board user = {this.state.user}/>
                        )}
                    />
                </Switch>

            </div>
        );
    }
}

export default Router;