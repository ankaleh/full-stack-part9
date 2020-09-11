import React from 'react'
//import { HeaderProps } from '../index'

interface HeaderProps {
        name: string;
} 

const Header: React.FC<HeaderProps> = (props) => {

    
    return (
        <div>
            <h2>Course name: {props.name}</h2>

        </div>
    )



}

export default Header;