import React, { useEffect } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis } from '../types'
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { setPatient, setDiagnosisList } from "../state/reducer";
import EntryPage from './EntryPage';
import { State } from '../state/state'
import AddEntryForm, { EntryFormValues } from './AddEntryForm'
import {  Route, Link } from "react-router-dom";
/* interface PatientPageProps {
    patients: { [id: string]: Patient },
    diagnoses: { [code: string]: Diagnosis },
} */

//const PatientPage: React.FC<PatientPageProps> = (props) => {
//const PatientPage: React.FC<{patients: { [id: string]: Patient },
//diagnoses: { [code: string]: Diagnosis }}>
const PatientPage: React.FC<State> = (props) => {
    
    const [, dispatch] = useStateValue();
    const objectId = useParams<{id: string}>();
    //console.log(objectId.id)
    const id:string = objectId.id //string
    //console.log(Object.keys(props.patients))//tulostaa taulukollisen id:itä
    const patient: Patient = props.patients[id]; //hakee tilasta, jossa patientit ovat PublicPatienteja eli ilman ssn:ää
    //console.log(patient)
    const submitNewEntry = async (values: EntryFormValues) => { 
        try {
          const { data: addedPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${patient.id}/entries`,
            values
          );
          console.log(addedPatient)
          dispatch({ type: "FETCH_PATIENT", payload: addedPatient });
          //closeModal(); 
        } catch (e) {
          console.error(e.response.data);
          //setError(e.response.data.error);
        }
    };

    //console.log(diagnoses);
    //hae useEffectissä tarvittaessa palvelimelta:
    useEffect(() => {
        const fetchDiagnosisList = async () => {
            try {
              const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
                `${apiBaseUrl}/diagnoses`
              );
              dispatch(setDiagnosisList(diagnosisListFromApi));
            } catch (e) {
              console.error(e);
            }
          };
        fetchDiagnosisList();
        const fetchPatient = async () => {
            try {
                const { data: fetchedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(setPatient(fetchedPatient));
                //dispatch({ type: "FETCH_PATIENT", payload: fetchedPatient });
            } catch (e) {
                console.error(e);
            }
        }
        if (!patient || patient.ssn===undefined || patient.entries===undefined) {
            fetchPatient();
        } 
    }, [dispatch])

    /* const hardCodedPatient = {
        "id": "d2773336-f723-11e9-8f0b-362b9e155667",
        "name": "John McClane",
        "dateOfBirth": "1986-07-09",
        "ssn": "090786-122X",
        "gender": "male",
        "occupation": "New york city cop"
    }  */
    /* const gender = () => {
        if (hardCodedPatient.gender === 'male') {
            return 'mars'
        } else if (patient.gender === 'female') {
            return 'female'
        } else {
            return 'neuter'
        }
    }
    if (!hardCodedPatient) {
        return null
    }
    return (
        <>
            <h2>{hardCodedPatient.name} <Icon name={gender()}></Icon></h2> 
            
            <div>Ssn: {patient.ssn}</div>
            <div>Occupation: {patient.occupation}</div>
        </>
    ) */
    const gender = () => {
        if (patient.gender === 'male') {
            return 'mars'
        } else if (patient.gender === 'female') {
            return 'female'
        } else {
            return 'neuter'
        }
    }
    
    if (!patient || !patient.entries ) {
        return null
    }
    return (
        <div>
            <h2>{patient.name} <Icon name={gender()}></Icon></h2> 
            
            <div>Ssn: {patient.ssn}</div>
            <div>Occupation: {patient.occupation}</div>
            
            <div><h3>Entries: </h3> {patient.entries.map(entry => 
                <div key={entry.id}><EntryPage entry={entry}/></div>
                /* <div key={entry.id}><b>{entry.date}:</b> {entry.description}
                <div><i>Diagnosis codes</i>: {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)} 
                </div>
                </div> */)
            
            }</div>
            
            <Route path="/patients/:id/occupational-healthcare">
              <AddEntryForm onSubmit={submitNewEntry} values={{specialist: "",
                description: "",
                date: "",
                type: "OccupationalHealthcare",
                employerName: "",
                sickLeave: {
                    startDate: "",
                    endDate: "",
                }}}
             />
            </Route>
            <Route path="/patients/:id/hospital-entry">
              <AddEntryForm onSubmit={submitNewEntry} values={{specialist: "",
                description: "",
                date: "",
                type: "Hospital",
                discharge: {
                    date: "",
                    criteria: "",
                }}}
             />
            </Route>
            <Route path="/patients/:id/health-check">
              <AddEntryForm onSubmit={submitNewEntry} values=
              {{specialist: "",
                description: "",
                date: "",
                type: "HealthCheck",
                healthCheckRating: 0,
                }}
             />
            </Route>
            
            <Button as={Link} to={`/patients/${patient.id}/occupational-healthcare`}>Add Occupational Healthcare Entry</Button>
            <Button as={Link} to={`/patients/${patient.id}/hospital-entry`}>Add Hospital Entry</Button>
            <Button as={Link} to={`/patients/${patient.id}/health-check`}>Add Health Check Entry</Button>
           {/*  <AddEntryForm onSubmit={submitNewEntry} onCancel={onClose}/>
 */}
        </div>
    )


}
export default PatientPage; 