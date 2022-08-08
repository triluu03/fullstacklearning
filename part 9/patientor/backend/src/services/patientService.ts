import patientsData from '../../data/patients';

import { Patient, NewPatient, PublicPatient, EntryWithoutId } from '../types';

import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData;

const getPatients = (): Array<PublicPatient> => {
    return patients.map(
        ({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
            id,
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation,
            entries,
        })
    );
};

const findById = (id: string): Patient | undefined => {
    return patients.find((p) => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
    const newPatient = {
        ...entry,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuid(),
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntries = (id: string, entry: EntryWithoutId): Patient | undefined => {
    const patient = patients.find((p) => p.id === id);
    const newEntry = { ...entry, id: uuid() };
    patient?.entries.push(newEntry);

    patients.map((p) => (p.id === id ? patient : p));
    return patient;
};

export default { getPatients, addPatient, findById, addEntries };
