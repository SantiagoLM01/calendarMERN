import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { clearErrorMessage, onChecking, onLogin, onLogout, onRegister } from "../store/auth/authSlice"
import { onClearAllInformation } from "../store/calendar/calendarSlice"


export const useAuthStore = () => {

    const dispatch = useDispatch()
    const { status, user, errorMessage } = useSelector(state => state.auth)

    const startLogin = async (email, password) => {
        dispatch(onChecking())

        try {
            const { data } = await calendarApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (error) {
            dispatch(onLogout('Credenciales Incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 5000);
        }
    }

    const startRegister = async (name, email, password) => {
        dispatch(onChecking())

        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onRegister({ name: data.name, uid: data.uid }))
        } catch (error) {
            console.log(error)
            dispatch(onLogout(error.response.data?.msg || 'Todos Los Campos Son Obligatorios y la contraseña tiene que ser minimo de 6 caracteres'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 5000);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')
        if (!token) return dispatch(onLogout())

        try {
            const { data } = await calendarApi.get('/auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (error) {
            localStorage.clear();
            dispatch
            dispatch(onLogout())
        }
    }

    const startLogout = () => {
        dispatch(onClearAllInformation())
        dispatch(onLogout())
        localStorage.clear();

    }



    return {
        //Propiedades
        status,
        user,
        errorMessage,
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout

        //Metodos


    }
}