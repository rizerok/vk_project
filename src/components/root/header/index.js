import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './style.scss';


class RootHeader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={style.header}>
                <div className="cnr-main">
                    <nav className={style.navigation}>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/list">List(redirect)</NavLink>
                        <NavLink to="/users">User(api)</NavLink>
                        <NavLink to="/counter">Counter</NavLink>
                        <NavLink to="/notfound">Not exist</NavLink>
                    </nav>
                </div>
            </div>
            
        );
    }
}

export default RootHeader;