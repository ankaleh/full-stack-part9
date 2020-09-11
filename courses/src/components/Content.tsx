import React from 'react'
import { CoursePart } from '../index'
//import { ContentProps } from '../index'
import Part from './Part'

interface ContentProps {
    parts: CoursePart[]//taulukko
  }
  
const Content: React.FC<ContentProps> = (props) => { 
//propsina on taulukollinen CoursePart-tyyppiä olevia olioita, ja yksi olio on esim.: 
      /* name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
      */

//use the new component Part in component Content:

    return (
        /* <div>
            <p>{props.parts.map(part => <li key={part.name}>{part.name} {part.exerciseCount}</li>)}</p>

        </div> */

        <div>
            {props.parts.map(part => <div key={part.name}> <b>Course part:</b><Part part={part} /> </div>)}
    
        </div>
    )



}

export default Content;