import { Patient } from '../types';

import { useStateValue } from '../state';

import { useParams } from 'react-router-dom';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const Individual = () => {
    const [{ patients, diagnoses }] = useStateValue();

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
                <div key={entry.id}>
                    {entry.date}: <i>{entry.description}</i> <br />
                    {entry.diagnosisCodes?.map((code) => (
                        <li key={code}>
                            {code}:{' '}
                            {
                                Object.values(diagnoses).find(
                                    (d) => d.code === code
                                )?.name
                            }
                        </li>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Individual;
