import React from 'react';

import LoginForm from './form';

import style from './style.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={style.container}>
                <LoginForm/>
            </div>
        );
    }
}

export default Login;
