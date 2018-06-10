import {urlLogin} from 'constants/urls';
import React from 'react';
import c from 'classnames';
import { NavLink } from 'react-router-dom';

import style from './style.scss';


class Home extends React.Component{
    constructor(){
        super();

    }
    render(){
        return <div className={style.home}>

            <div className="cnr-main">
                <div className={style.homeArea}>
                    <h1 className={style.title}>Аналитика групп ВКотакте</h1>
                    <div className={style.subtitle}>
                        <span>Инструмент для лучшего понимания своей целевой аудитории.</span>
                    </div>
                    <div className={style.goLogin}>
                        <NavLink className={style.goLoginButton} to={urlLogin}>Вход</NavLink>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default Home;