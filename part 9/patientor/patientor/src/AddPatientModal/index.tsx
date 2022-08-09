import React from 'react';
import { Dialog, DialogTitle, DialogContent, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import AddPatientForm, { PatientFormValues } from './AddPatientForm';
import AddEntryForm, { HealthCheckFormValues } from './AddEntryForm';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: PatientFormValues) => void;
    error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new patient</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity='error'>{`Error: ${error}`}</Alert>}
            <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
        </DialogContent>
    </Dialog>
);

interface EntryProps {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HealthCheckFormValues) => void;
    error?: string;
}

export const AddEntryModal = ({
    modalOpen,
    onClose,
    onSubmit,
    error,
}: EntryProps) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new entry</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity='error'>{`Error: ${error}`}</Alert>}
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </DialogContent>
    </Dialog>
);

export default AddPatientModal;
