import { url } from '../../../../../url'

const login = async (user) => {
    const response = await fetch(
        url + "login",
        {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        }
    );
    const { data, message } = await response.json()
    if(data){
        localStorage.setItem('data', JSON.stringify(data))
    }
    if (message === 'Succes') {
        return true
    } else {
        return false
    }
}

//module.exports = { login }

export {login}