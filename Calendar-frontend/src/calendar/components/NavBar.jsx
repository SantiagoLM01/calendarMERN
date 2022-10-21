import { useSelector } from "react-redux"
import { useAuthStore } from "../../hooks/useAuthStore"

const NavBar = () => {

    const {user} = useSelector(state => state.auth)

    const {startLogout} = useAuthStore()

    const handleLogout = () => {
        startLogout()
    }

    return (

        <>

            <div className="navbar navbar-dark bg-dark mb-4 px-4 py-4">
                <span className="navbar-brand">
                    <i className="fas fa-calendar-alt">
                    </i> {user.name}
                </span>

                <button onClick={handleLogout} className="btn btn-outline-danger"><i className="fas fa-sign-out-alt"></i>  <span> Salir</span></button>
            </div>

        </>
    )
}

export default NavBar