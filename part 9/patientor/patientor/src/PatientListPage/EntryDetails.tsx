import {
    Entry,
    HealthCheckEntry,
    HospitalEntry,
    OccupationalHealthcareEntry,
} from '../types';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

import FavoriteIcon from '@mui/icons-material/Favorite';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const style = {
    border: 'solid',
    borderWidth: 1,
    padding: 10,
};

const HospitalEntryDetail: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <div style={style}>
            {entry.date} <HealthAndSafetyIcon /> <br />
            <i>{entry.description}</i> <br />
            diagnosed by {entry.specialist}
        </div>
    );
};

const OccupationalEntryDetail: React.FC<{
    entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
    return (
        <div style={style}>
            {entry.date} <WorkIcon /> <i>{entry.employerName}</i> <br />
            <i>{entry.description}</i> <br />
            diagnosed by {entry.specialist}
        </div>
    );
};

const HealthCheckEntryDetail: React.FC<{
    entry: HealthCheckEntry;
}> = ({ entry }) => {
    return (
        <div style={style}>
            {entry.date} <LocalHospitalIcon /> <br />
            <i>{entry.description}</i> <br />
            {entry.healthCheckRating === 1 ? (
                <FavoriteIcon color='secondary' />
            ) : (
                <FavoriteIcon color='primary' />
            )}{' '}
            <br />
            diagnosed by {entry.specialist}
        </div>
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntryDetail entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntryDetail entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalEntryDetail entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
