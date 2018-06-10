import api from 'utils/api';

export const USER_SET = '@user/set';

const initialState = {
    isAuthorize: false,
    vk: {},
    site: {},
    group:{
        current: null,
        list:[

        ]
    }
};

export default function reducer(state = initialState,{type, payload}) {
    switch (type) {
        case USER_SET: {
            const {vkUser, siteUser, siteGroups, vkGroups} = payload;
            return {
                isAuthorize: true,
                vk: {...vkUser},
                site: {...siteUser},
                group: {
                    current: siteGroups.length ? siteGroups[0].vk_id : null,
                    list: siteGroups.map((s, i) => ({
                        site: {...s},
                        vk: {...vkGroups[i]}
                    }))
                }
            };
        }
        default:
            return state;
    }
}

export const setUser = (data) => dispatch => dispatch({
    type: USER_SET,
    payload: data
});

export const loginUser = (accessToken,userId) => dispatch => {
    return api.login(accessToken,userId)
        .then(result => {
            if(result){
                dispatch({
                    type: USER_SET,
                    payload: result
                });
                return result;
            }
        });
};