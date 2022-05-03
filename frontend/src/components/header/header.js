import React from "react";

import { ReactComponent as Home } from "./../../image/home.svg";
import { ReactComponent as Explore } from "./../../image/explore.svg";
import './header.css'


const Header = () => {
    return (
        <nav>
            <div className='div-header'>
                <div>
                    <Home className='div-logo' />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                    <a href="/" className='div-lien'> <Explore className='div-logo' /> </a>
                    <a href="/" className='div-lien'> <Explore className='div-logo' /> </a>

                    <button className="button-header">Log out</button>
                </div>
            </div>
        </nav>
    )
}

export default Header;