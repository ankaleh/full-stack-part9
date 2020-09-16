import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();


router.get('/', (_req, res) => {
    res.send(patientService.getAllPatients());

})

router.get('/:id', (req, res) => {
    
    const patient = patientService.getPatient(req.params.id);
        if (patient) {
            console.log('Palvelimelta haettu Patient: ', patient)
            res.json(patient);
        } else {
            res.status(404).json('Not found!');//not found; pitääkö lisätä myös bad request, jos väärän tyyppinen id?
        }
})

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        res.json(patientService.addPatient(newPatient))   
    } catch (e) {
        res.status(400).send(e.message);
    }
    
})

router.post('/:id/entries', (req, res) => {
    const patient = patientService.getPatient(req.params.id);
    if (!patient) {
        res.status(404).json('Not found!');//not found; pitääkö lisätä myös bad request, jos väärän tyyppinen id?
    } else {
        try {
            const newEntry = toNewEntry(req.body);
            res.json(patientService.addEntry(patient, newEntry))
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
})

export default router;