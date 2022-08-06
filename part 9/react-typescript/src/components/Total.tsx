import { CourseContent } from './Content';

const Total = (props: CourseContent) => {
    return (
        <div>
            Number of exercises{' '}
            {props.courseParts.reduce(
                (carry, part) => carry + part.exerciseCount,
                0
            )}
        </div>
    );
};

export default Total;
