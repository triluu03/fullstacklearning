import { Patient } from '../types';

import { useStateValue } from '../state';

import { useParams } from 'react-router-dom';

const Individual = () => {
    const [{ patients }] = useStateValue();

    const { id } = useParams<{ id: string }>();
    const patient: Patient | undefined = Object.values(patients).find(
        (p) => p.id === id
    );

    if (!patient) {
        return null;
    }

    return (
        <div>
            <h2>{patient.name}</h2>
            ssh: {patient.ssn} <br />
            occupation: {patient.occupation} <br />
        </div>
    );
};

export default Individual;
