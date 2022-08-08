import { Patient } from '../types';

import { useStateValue } from '../state';

import { useParams } from 'react-router-dom';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import EntryDetails from './EntryDetails';

const Individual = () => {
    const [{ patients }] = useStateValue();

    const { id } = useParams<{ id: string }>();
    const patient: Patient | undefined = Object.values(patients).find(
        (p) => p.id === id
    );

    if (!patient) {
        return null;
    }

    let genderIcon: JSX.Element;

    switch (patient.gender) {
        case 'male':
            genderIcon = <MaleIcon />;
            break;
        case 'female':
            genderIcon = <FemaleIcon />;
            break;
        default:
            genderIcon = <TransgenderIcon />;
            break;
    }

    return (
        <div>
            <h2>
                {patient.name} {genderIcon}
            </h2>
            ssh: {patient.ssn} <br />
            occupation: {patient.occupation} <br /> <br />
            <h3>entries</h3>
            {patient.entries.map((entry) => (
                <EntryDetails entry={entry} key={entry.id} />
            ))}
        </div>
    );
};

export default Individual;
