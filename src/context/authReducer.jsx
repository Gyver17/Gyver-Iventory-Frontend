const types = {
    authLogin: 'login',
    authLogout: 'logout',
    sessionClose: 'expireSession',
    clearSession: 'clearSession'
}

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    permissions: JSON.parse(localStorage.getItem('permissions')) || null,
    setting: JSON.parse(localStorage.getItem('setting')) || null,
    sessionExpired: false
};

const authReducer = (state, action) => {
    switch (action.type) {
        case types.authLogin:
            const data = action.payload
            return {
                ...state,
                user: data.user,
                permissions: data.permissions,
                setting: data.setting
            }

        case types.authLogout:
            return {
                ...state,
                user: null,
                permissions: null,
                setting: null,
            }

        case types.sessionClose:
            return {
                ...state,
                sessionExpired: true,
            }
        case types.clearSession:
            return {
                ...state,
                user: null,
                permissions: null,
                setting: null,
                sessionExpired: false
            }

        default:
            return state;
    }
};

export { initialState, types };
export default authReducer;