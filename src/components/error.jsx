import React from "react";
import '../styles/error.css'

function Error({message}) {
    return(
        <span className="message"> {message} </span>
    )
}

export default Error