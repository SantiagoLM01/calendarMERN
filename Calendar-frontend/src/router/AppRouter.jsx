import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../auth/pages/LoginPage"
import CalendarPage from "../calendar/pages/CalendarPage"
import { getEnvVariables } from "../helpers/getEnvVariables"
import { useAuthStore } from "../hooks/useAuthStore"

const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore()

    useEffect(() => {
        checkAuthToken()
    }, [])

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }






    return (
        <>

            <Routes>
                {(status === 'not-authenticated') ? (


                    <>

                        <Route path="/auth/*" element={<LoginPage></LoginPage>}></Route>
                        <Route path="/*" element={<Navigate to='/auth/login'></Navigate>}></Route>

                    </>
                ) : (<>
                    <Route path="/" element={<CalendarPage></CalendarPage>}></Route>
                    <Route path="/*" element={<Navigate to='/'></Navigate>}></Route>

                </>
                
                )
                }

            </Routes>


        </>


    )
}

export default AppRouter