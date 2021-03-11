import React from 'react';

import {NavLink} from 'react-router-dom';


class Menu extends React.Component {

    render(){
            return (
                <ul>
                <li>
                <NavLink to={"/"}>
                    <a class="nav-link">Home</a>
                </NavLink>
                </li>
                <li>
                <NavLink to={"/country"}>
                    <a class="nav-link">Country</a>
                </NavLink>
                </li>
                </ul>
            )
        }
}

export default Menu;
