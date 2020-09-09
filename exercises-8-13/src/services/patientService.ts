import patients_data from '../../data/patients_data.json';
import { Patient, NewPatient, PatientWithoutSsn } from '../types';
//import toNewPatient from '../utils';

const data: Array<Patient> = patients_data; //json-tiedosto tyypitetään taulukoksi, jossa on Patient-tyyppiä olevia olioita

const generateId = (length: number) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const getAllPatients = (): Pick<Patient, 'id' |'name' | 'dateOfBirth' | 'gender' | 'occupation'>[] => {
    return data.map( ({id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation,
    }));
}

const addPatient = (newPatient: NewPatient): PatientWithoutSsn => {
    const id = generateId(newPatient.name.length)
    const patientToAdd = {
        id: id,
        ...newPatient
    }
    data.push(patientToAdd);
    return patientToAdd; //palauttaa toki myös ssn:n!!!
}


export default { getAllPatients, addPatient };