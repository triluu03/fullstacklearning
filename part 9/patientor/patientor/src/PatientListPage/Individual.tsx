import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

import { Patient } from '../types';

import { useStateValue } from '../state';

import { useParams } from 'react-router-dom';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Button } from '@material-ui/core';

import EntryDetails from './EntryDetails';
import { AddEntryModal } from '../AddPatientModal';
import { HealthCheckFormValues } from '../AddPatientModal/AddEntryForm';

const Individual = () => {
    const [{ patients }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const { id } = useParams<{ id: string }>();
    const patient: Patient | undefined = Object.values(patients).find(
        (p) => p.id === id
    );

    const submitNewEntry = async (values: HealthCheckFormValues) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { data: patient } = await axios.post(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch({
                type: 'ADD_PATIENT',
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                payload: patient,
            });
            closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || 'Unrecognized axios error');
                setError(
                    String(e?.response?.data?.error) ||
                        'Unrecognized axios error'
                );
            } else {
                console.error('Unknown error', e);
                setError('Unknown error');
            }
        }
    };

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
            <h3>Add new Entries</h3>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant='contained' onClick={() => openModal()}>
                Add New Entry
            </Button>
        </div>
    );
};

export default Individual;
