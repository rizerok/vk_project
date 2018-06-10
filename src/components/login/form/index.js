import {urlUser} from 'constants/urls';
import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {createVkApiUrl} from 'functions/vk-url-creator';
import {
    oauthUrl,
    client_id,
    display,
    redirect_uri,
    scope,
    response_type,
    v
} from 'constants/vk';

import {loginUser} from 'modules/user';

import style from './style.scss';

class LoginForm extends React.Component{
    constructor(){
        super();
        this.login = this.login.bind(this);
        this.accessTokenChange = this.accessTokenChange.bind(this);
        this.userIdChange = this.userIdChange.bind(this);
        const lastAccessToken = typeof localStorage !== 'undefined' && localStorage.getItem('accessToken');
        const lastUserId = typeof localStorage !== 'undefined' && localStorage.getItem('userId');
        this.state = {
            accessToken: lastAccessToken || '',
            userId: lastUserId || ''
        };
    }
    login(){
        this.props.loginUser(this.state.accessToken, this.state.userId)
            .then(res => {
                this.props.history.replace(urlUser);
            });
    }
    accessTokenChange(e){
        localStorage.setItem('accessToken', e.target.value);
        this.setState({
            accessToken: e.target.value
        });
    }
    userIdChange(e){
        localStorage.setItem('userId', e.target.value);
        this.setState({
            userId: e.target.value
        });
    }
    render(){
        return <div className={style.container}>
            <div className={style.form}>
                <div className={style.formRow}>
                    <a
                       className={style.formButton}
                       target="_blank"
                       href={createVkApiUrl(oauthUrl, {
                           client_id,
                           display,
                           redirect_uri,
                           scope,
                           response_type,
                           v
                       })}
                    >Get Token</a>
                </div>
                <div className={style.formRow}>
                    <input
                        className={style.input}
                        type="text" placeholder="Enter token"
                        onChange={this.accessTokenChange}
                        value={this.state.accessToken}
                    />
                </div>
                <div className={style.formRow}>
                    <input
                        className={style.input}
                        type="text" placeholder="Enter User Id"
                        onChange={this.userIdChange}
                        value={this.state.userId}
                    />
                </div>
                <div className={style.formRow}>
                    <button
                        className={style.formButton}
                        onClick={this.login}
                    >SIGN IN</button>
                </div>
                <div className={style.formRow}>
                    <Link to={urlUser}>Go to User Zone</Link>
                </div>
            </div>
        </div>;
    }
}

const mapDispatchToProps = {loginUser};

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));