import { CoursePart } from '../App';

interface PartProps {
    part: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = (props: PartProps): JSX.Element => {
    const part = props.part;
    switch (part.type) {
        case 'normal':
            return (
                <div>
                    <b>{part.name}</b> <br />
                    <i>{part.description}</i> <br /> <br />
                </div>
            );
        case 'groupProject':
            return (
                <div>
                    <b>{part.name}</b> <br />
                    group project exercises {part.exerciseCount} <br /> <br />
                </div>
            );
        case 'submission':
            return (
                <div>
                    <b>{part.name}</b> <br />
                    <i>{part.description}</i> <br />
                    submit to {part.exerciseSubmissionLink} <br /> <br />
                </div>
            );
        case 'special':
            return (
                <div>
                    <b>{part.name}</b> <br />
                    <i>{part.description}</i> <br />
                    required skills: {part.requirements.join(', ')} <br />{' '}
                    <br />
                </div>
            );
        default:
            return assertNever(part);
    }
};

export default Part;
