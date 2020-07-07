import React, { useState } from "react";
import { Link } from "react-router-dom";


function NavBar() {
return(
    <nav className="nav">
    <ul>
       <Link to='/'><li>Bilbioteca de cards</li></Link>
       <Link to='/meus-cards'><li>Meus cards</li></Link>
       <Link to='/incluir-card'><li>Adicionar novo card</li></Link>
    </ul>
    </nav>
)
}

export default NavBar