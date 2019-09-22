import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const url = "http://localhost:3001";

class signIn extends Component {

    /**
     * *Declaración del estado del componente:
     * *username: Nombre del nuevo usuario que se desea crear
     * *email: Dirección de correo asociada al nuevo usuario.
     * *password: Contraseña del usuario.
     */

    state = {username:"", email:"", password:""}

    //* Realiza el registro en la base de datos para el nuevo usuario

    clickRegister = () => {
        console.log(`Username: ${this.state.username}, email: ${this.state.email}, pass: ${this.state.password}`);
        
        //* Realizar el llamado al backend.
        
        let details = { //Detalles y cuerpo de la petición
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName: this.state.username, mail: this.state.email, password: this.state.password})
        };

        fetch(url + "/users", details).then(res => res.json()).then(data => {
            console.log(`Petición realizada, mensaje de respuesta: ${data}`)
            //alert("Petición realizada") //TODO Verificar el funcionamiento de esto mañana
        });

        this.props.history.push({ //Enviar de regreso al login
			pathname: '/' 
		})
    };

    render() {
        return (
            <div className="col-4 centrar">
                <h5 className="align-content-center"> Sign In </h5>
                <form>
					<div className="form-group">
						<label>User name</label>
						<input type="text" className="form-control" id="username" aria-describedby="User name" placeholder="Enter your user name" onChange={(evt) => this.setState({username: evt.target.value})} required/>						
					</div>
					<div className="form-group">
						<label>User's Email</label>						
						<input type="email" className="form-control" id="useremail" placeholder="Enter your email address" onChange={(evt) => this.setState({email: evt.target.value})} required/>
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
        )
    }
}

export default withRouter(signIn);
