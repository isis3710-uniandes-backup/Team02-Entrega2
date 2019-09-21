import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';


class MyProyects extends Component {

    clickBoard = () => {
		this.props.history.push({
			pathname: '/board',
			correo: 'm.sicard10'
		});
    };
    
    render() {
        console.log(this.props)
        return (
            <div>
                <button onClick={this.clickBoard} className = "btn btn-primary"> MyProyects </button>
            </div>
        )
    }
}
export default withRouter(MyProyects);