import patientsData from '../../data/patients.json';

import { Patient, NonSsnPatient, NewPatient } from '../types';

import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData as Array<Patient>;

const getPatients = (): Array<NonSsnPatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
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

export default { getPatients, addPatient };
