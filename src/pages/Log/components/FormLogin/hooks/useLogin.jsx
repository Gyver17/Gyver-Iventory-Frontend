import { useState } from "react"
import { login } from "../../../../../api/log"

const useLogin = (navigate, dispatch, types) => {
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)

    const addSession = (data) => {
        dispatch({
            type: types.authLogin,
            payload: data
        })
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('permissions', JSON.stringify(data.permissions))
        localStorage.setItem('setting', JSON.stringify(data.setting))
    }

    const handleLogin = async (user) => {
        try {
            setLoading(true)
            const { queryData, success } = await login(user)
            if (success) {
                addSession(queryData);
                navigate('/')
            } else {
                setLoading(false)
                setMessage("Correo Electrónico o Contraseña Invalida")
            };

        } catch (error) {
            window.location.reload(true);
        }
    }

    return [
        handleLogin,
        message,
        loading
    ]
}

export default useLogin