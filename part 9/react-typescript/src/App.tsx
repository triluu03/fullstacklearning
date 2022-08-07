import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

// new types
interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseWithDescription extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CourseWithDescription {
    type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject';
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseWithDescription {
    type: 'submission';
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseWithDescription {
    type: 'special';
    requirements: Array<string>;
}

export type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseSpecialPart;

const App = () => {
    const courseName = 'Half Stack application development';
    const courseParts: CoursePart[] = [
        {
            name: 'Fundamentals',
            exerciseCount: 10,
            description: 'This is the easy course part',
            type: 'normal',
        },
        {
            name: 'Advanced',
            exerciseCount: 7,
            description: 'This is the hard course part',
            type: 'normal',
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7,
            groupProjectCount: 3,
            type: 'groupProject',
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14,
            description: 'Confusing description',
            exerciseSubmissionLink:
                'https://fake-exercise-submit.made-up-url.dev',
            type: 'submission',
        },
        {
            name: 'Backend development',
            exerciseCount: 21,
            description: 'Typing the backend',
            requirements: ['nodejs', 'jest'],
            type: 'special',
        },
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts} />
        </div>
    );
};

export default App;
