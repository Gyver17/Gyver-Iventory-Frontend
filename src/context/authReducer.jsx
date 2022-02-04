const types = {
    authLogin: 'login',
    authLogout: 'logout',
    sessionClose: 'expireSession',
    clearSession: 'clearSession'
}

const initialState = {
    user: JSON.parse(localStorage.getItem("data")) || null,
    sessionExpired: false
};

const authReducer = (state, action) => {
    switch (action.type) {
        case types.authLogin:
            const data = action.payload
            return {
                ...state,
                user: data,
            }

        case types.authLogout:
            return {
                ...state,
                user: null,
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
                sessionExpired: false
            }

        default:
            return state;
    }
};

export { initialState, types };
export default authReducer;