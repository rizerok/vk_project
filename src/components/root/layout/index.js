import React from 'react';
import { renderRoutes } from 'react-router-config';

import style from './style.scss';

import RootHeader from '../header';

class RootLayout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={style.container}>
                {renderRoutes(this.props.route.routes)}
            </div>
        );
    }
}

export default RootLayout;