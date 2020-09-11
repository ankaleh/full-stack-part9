import { NewPatient, Gender } from '../src/types';

//parsers:
const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: '+ date)
    };
    return date;
}

const parseString = (text: any): string => {
    if (!text || !isString(text)) {
        throw new Error('Incorrect or missing input of name or occupation: '+ text)
    };
    return text;
}

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: '+ gender)
    }
    return gender;
}


//type guards:
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
}

const isDate = (date: string): boolean => { //parametri on tyyppiä date eikä any, koska ennen tänne tuloa on tarkastettu, että date on string
    return Boolean(Date.parse(date));
} 

const isString = (text: any): text is string => {
    return typeof text==='string' || text instanceof String;
} 

const toNewPatient = (object: any): NewPatient => {
    const newPatient = {
        dateOfBirth: parseDate(object.dateOfBirth),
        name: parseString(object.name),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation)
    }
    return newPatient;
}

export default toNewPatient;