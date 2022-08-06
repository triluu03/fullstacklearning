export interface Course {
    name: string;
    exerciseCount: number;
}

export interface CourseContent {
    courseParts: Array<Course>;
}

const Content = (props: CourseContent) => {
    return (
        <div>
            {props.courseParts.map((part) => (
                <p key={part.name}>
                    {part.name} {part.exerciseCount}
                </p>
            ))}
        </div>
    );
};

export default Content;
