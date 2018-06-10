import {urlLogin} from 'constants/urls';
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const withAuth = (Component) => connect(
    ({user:{isAuthorize}}) => ({isAuthorize})
)(rest => {
    return <Route
        {...rest}
        render={props => {
            return rest.isAuthorize
                ? <Component {...props}/>
                : <Redirect to={{
                    pathname: urlLogin,
                    state: {from: props.location}
                }} />;
        }}/>;
});


export default withAuth;