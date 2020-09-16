import { NewPatient, Gender, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, NewEntry } from '../src/types';

const getType = (param: Entry): string => {
    return (param as Entry).type;
}

//parsers:
const parseEntry = (entry: any): Omit<Entry, 'id'> => {
    if (!isEntry(entry)) {
        throw new Error('Incorrect entry. Some fields missing: ' + entry)
    }
    const type = getType(entry);
    if (type==="Hospital") {
        if (!isHospitalEntry(entry)) {
            throw new Error('Incorrect entry: ' + entry);
        }
    }
    else if (type==="OccupationalHealthcare") {
        if (!isOccupationalHealthcareEntry(entry)) {
            throw new Error('Incorrect entry: ' + entry);
        }
    }
    else if (type==="HealthCheck") {
        if (!isHealthCheckEntry(entry)) {
            throw new Error('Incorrect entry: ' + entry);
        }
    }
    else {
        throw new Error('Incorrect entry type: ' + entry)
    }
    return entry;
}

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: '+ date) //päästää läpi myös esim. fg-56-09
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

const parseEntries = (entries: Entry[]): Entry[] => {
    if (entries) {
        entries.forEach(entry => {
            if (!isEntry(entry)) {
                throw new Error('Incorrect or missing entry: '+ entry)
            } 
        })
        return entries;
    }

    return [];
}

//type guards:
const isEntry = (param: any): param is Entry => { //tarkistaa, että objektille on määritetty tyyppi ja että sillä on kaikki BaseEntryn edellyttämät kentät
    if ((param as Entry).type && (param as Entry).date && (param as Entry).description && (param as Entry).specialist) {
        return true;
    }
    return false;
}

const isHospitalEntry = (param: Entry): param is HospitalEntry => {
    if ((param as HospitalEntry).discharge) {
        return true;
    }
    return false;
}

const isOccupationalHealthcareEntry = (param: Entry): param is OccupationalHealthcareEntry => {
    if ((param as OccupationalHealthcareEntry).employerName) {
        return true;
    }
    return false;
}

const isHealthCheckEntry = (param: Entry): param is HealthCheckEntry => {
    if ((param as HealthCheckEntry).healthCheckRating) {
        return true;
    }
    return false;
}

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
}

const isDate = (date: string): boolean => { //parametri on tyyppiä date eikä any, koska ennen tänne tuloa on tarkastettu, että date on string
    return Boolean(Date.parse(date));
} 

const isString = (text: any): text is string => {
    return typeof text==='string' || text instanceof String;
} 

export const toNewPatient = (object: any): NewPatient => {
    const newPatient = {
        dateOfBirth: parseDate(object.dateOfBirth),
        name: parseString(object.name),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: parseEntries(object.entries),
    }
    return newPatient;
}

export const toNewEntry = (object: any): NewEntry => {
    const entry = parseEntry(object);
    const newEntry = {
        ...entry,
    }
    console.log('NewEntry: ', newEntry)
    return newEntry;
}
