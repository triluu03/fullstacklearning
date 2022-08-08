import express from 'express';

import patientService from '../services/patientService';
import { EntryWithoutId } from '../types';

import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
    res.send(patientService.findById(req.params.id));
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error) {
        res.status(400);
    }
});

router.post('/:id/entries', (req, res) => {
    const id: string = req.params.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry: EntryWithoutId = req.body;

    res.send(patientService.addEntries(id, newEntry));
});

export default router;
