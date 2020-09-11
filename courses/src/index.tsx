import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

// new types
export interface CoursePartBase {
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

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFive;

export interface HeaderProps {
  name: string;
}

export interface ContentProps {
  parts: CoursePart[]//{name: string; exerciseCount: number;}[];
}

export interface TotalProps {
  total: number;
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "State handling",
      exerciseCount: 12,
      description: "Wow!",
    }
  ];

  const sum = courseParts.map(p => p.exerciseCount)
    .reduce((sum, e) => {
    return sum+e
  }, 0);

  //type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;
  
    return (
      <div>
        <Header name={courseName} />
        <Content parts={courseParts}/> 
        <Total total={sum}/>
        
      </div>
    )
  };

ReactDOM.render(<App />, document.getElementById("root"));