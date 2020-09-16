//import patients_data from '../../data/patients_data.json';
import patients_data from '../../data/patientsInTsFormat';
import { Patient, NewPatient, PublicPatient } from '../types';
import {toNewPatient } from '../utils';

const data: Array<Patient> = patients_data.map(obj => {
    const object = toNewPatient(obj) as Patient
    object.id = obj.id
    return object
}); //json-tiedosto tyypitetään taulukoksi, jossa on Patient-tyyppiä olevia olioita

export const generateId = (length: number) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
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

const getPatient = (id: string): Patient | undefined => {
    return data.find(p => p.id===id);
}

const addPatient = (newPatient: NewPatient): PublicPatient => {
    const id = generateId(newPatient.name.length)
    const patientToAdd = {
        id: id,
        ...newPatient
    }
    console.log('Uusi Patient: ', patientToAdd);
    data.push(patientToAdd);
    return patientToAdd; 
}

const addEntry = (patient: Patient, newEntry: any): Patient | undefined => {
    const id = generateId(newEntry.specialist.length);
    const entryToAdd = {
        id: id,
        ...newEntry,
    }
    patient.entries.push(entryToAdd);
    return patient;
}

export default { getAllPatients, addPatient, getPatient, addEntry };