import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();


router.get('/', (_req, res) => {
    console.log('Palvelimelta haettiin diagnoosit!');
    res.send(diagnosisService.getAllDiagnosis());

});

export default router;