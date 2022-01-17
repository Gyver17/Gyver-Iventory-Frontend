import { url } from '../../../../../url'

const login = async (user) => {
    try {
        const reqUser = await fetch(
            url + "log",
            {
                method: "POST",
                mode: 'cors',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            }
        );
        const { data } = await reqUser.json()

        if (data) {
            return { data }
        } else {
            return { message: 'Correo Electrónico o Contraseña Incorrecta' }
        }
    } catch (error) {
        console.log(error)
    }

}

export { login }