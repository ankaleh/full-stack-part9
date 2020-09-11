import React from 'react'
//import { CoursePart } from '../index'

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartOne extends CoursePartFour {
    name: "Fundamentals";
    //description: string;
}
  
interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
} 
  
interface CoursePartThree extends CoursePartFour {
    name: "Deeper type usage";
    //description: string;
    exerciseSubmissionLink: string;
}
  
interface CoursePartFour extends CoursePartBase {
    description: string;
}

interface CoursePartFive extends CoursePartFour {
    name: "State handling";
}

interface PartProps {
    part: CoursePart
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFive;

const Part: React.FC<PartProps> = (props) => { //props = yksi osa ja jokaisella osalla on omat mahd. erilaiset kenttänsä
    
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const getPart = () => {
        switch (props.part.name) {
            case "Fundamentals":
                console.log({...props.part});
                return (
                    <div>
                        <li>Name: {props.part.name}</li>
                        <li>Exercise count: {props.part.exerciseCount}</li>
                        <li>Description: {props.part.description}</li>
                    </div>
                )//{...props.part}
            case "Using props to pass data":
                console.log({...props.part});
                return (
                    <div>
                        <li>Name: {props.part.name}</li>
                        <li>Exercise count: {props.part.exerciseCount}</li>
                        <li>Group project count: {props.part.groupProjectCount}</li>
                    </div>
                )//{...props.part}
            case "Deeper type usage":
                console.log({...props.part});
                return (
                    <div>
                        <li>Name: {props.part.name}</li>
                        <li>Exercise count: {props.part.exerciseCount}</li>
                        <li>Description: {props.part.description}</li>
                        <li>Exercise submission link: {props.part.exerciseSubmissionLink}</li>
                    </div>
                )//{...props.part}
            case "State handling":
                return (
                    <div>
                        <li>Name: {props.part.name}</li>
                        <li>Exercise count: {props.part.exerciseCount}</li>
                        <li>Description: {props.part.description}</li>
                    </div>
                )
            default:
                return assertNever(props.part);
        }
    }

    const part = getPart();

    return (
        <div>
            <div>{part}</div>
        </div>
    )

}

export default Part;