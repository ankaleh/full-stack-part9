import diagnoses_data from '../../data/diagnoses_data.json';
import { Diagnosis } from '../types';

const data: Array<Diagnosis> = diagnoses_data; //json-tiedosto tyypitetään taulukoksi, jossa on Diagnose-tyyppiä olevia olioita
const getAllDiagnosis = (): Array<Diagnosis> => {
    return data;
};

export default { getAllDiagnosis };