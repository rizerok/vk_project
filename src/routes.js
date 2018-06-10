import {urlRoot, urlLogin, urlUser} from 'constants/urls';
import React from 'react';
import RootLayout from 'components/root/layout';
import Home from './components/home';
import Counter from './components/counter';
import List from './components/list';
import NotFound from './components/notfound';
import ListToUsers from './components/listtousers';
import Login from './components/login';
import User from 'components/user';
import withAuth from 'components/hocs/with-auth';

const routes = [
    { component: RootLayout,
        routes: [
            { path: urlRoot,
                exact: true,
                component: Home
            },
            {
                path: urlLogin,
                component: Login
            },
            {
                path: urlUser,
                component: withAuth(User),
            },
            { path: '/counter',
                component: Counter
            },
            { path: '/list',
                component: ListToUsers
            },
            { path: '/users',
                component: List
            },
            {
                path:'*',
                component:NotFound
            }
        ]
    }
];

export default routes;