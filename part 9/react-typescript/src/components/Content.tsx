import Part from './Part';
import { CoursePart } from '../App';

export interface Course {
    name: string;
    exerciseCount: number;
}

export interface CourseContent {
    courseParts: Array<CoursePart>;
}

const Content = (props: CourseContent) => {
    return (
        <div>
            {props.courseParts.map((part) => (
                <Part part={part} key={part.name} />
            ))}
        </div>
    );
};

export default Content;
