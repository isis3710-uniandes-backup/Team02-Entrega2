import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LocarRouter from './components/Router';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

AOS.init();

const history = createBrowserHistory();

ReactDom.render(
	<Router history={history}>
		<LocarRouter />
	</Router>,
	document.getElementById('root')
);
