const types = {
    authLogin: 'login',
    authLogout: 'logout'
}

const initialState = {
    user: JSON.parse(localStorage.getItem("data")) || null
};

const authReducer = (state, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                user: action.payload
            }

        case types.authLogout:
            return{
                user: null
            }
        
        default:
            return state;
    }
};

export { initialState, types };
export default authReducer;