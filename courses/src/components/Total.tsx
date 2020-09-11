import React from 'react'
//import { Course } from '../index'
import { TotalProps } from '../index'

const Total: React.FC<TotalProps> = (props) => {


    return (
        <div>
            <p> Number of exercises{" "} </p>
            <p> {props.total}</p>

        </div>
    )



}

export default Total;