import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import Proyect from './Proyect';

class MyProyects extends Component {

    state = {
        user : this.props.user,
        projects : []
    }

    componentDidMount(){
        //let url = "/proyects/" + this.state.user.userName ;
        // Cuando ya sirva bien el login, se utilizará la variable URL para que encuentre los proyectos del usuario que se loggeo
        //console.log("url: " + url);
        fetch("/proyects/sicard6")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({projects : res});
            console.log(this.state.projects)
        });
    }

    clickBoard = () => {
		this.props.history.push({
			pathname: '/board',
			correo: 'm.sicard10'
		});
    };
    
    render() {
        console.log(this.props)
        return (
            <div className = "container">
                <div className="row justify-content-center">
                    <h1> {this.state.user} Projects </h1>
                </div>
                <div className="card-deck">
                {this.state.projects.map(e => <Proyect value={e} />)}
                </div>
            </div>
        )
    }
}
export default withRouter(MyProyects);