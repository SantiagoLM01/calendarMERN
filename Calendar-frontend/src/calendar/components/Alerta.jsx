import React from 'react'

const Alerta = ({ error, msg }) => {
    return (
        <>
            {error ? <div className="alert alert-danger" role="alert">
                {msg}
            </div> : <div className="alert alert-success" role="alert">
                {msg}
            </div>}

        </>
    )
}

export default Alerta