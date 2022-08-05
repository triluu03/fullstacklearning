import patientsData from '../../data/patients.json';

import { Patient, NonSsnPatient } from '../types';

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

export default { getPatients };
