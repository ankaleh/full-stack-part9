import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();


router.get('/', (_req, res) => {
    res.send(patientService.getAllPatients());

})

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        res.json(patientService.addPatient(newPatient))   
    } catch (e) {
        res.status(400).send(e.message);
    }
    
})

export default router;