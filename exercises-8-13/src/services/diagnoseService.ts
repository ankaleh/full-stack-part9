import diagnoses_data from '../../data/diagnoses_data.json'
import { Diagnose } from '../types'

const data: Array<Diagnose> = diagnoses_data; //json-tiedosto tyypitetään taulukoksi, jossa on Diagnose-tyyppiä olevia olioita
const getAllDiagnoses = (): Array<Diagnose> => {
    return data;
}

export default { getAllDiagnoses };