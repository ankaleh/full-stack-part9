import React/* , { useEffect } */ from 'react';
import { Entry } from '../types';
import { useStateValue } from "../state";
import { Icon } from 'semantic-ui-react';


//const EntryPage: React.FC<Entry> = (props) => {
const EntryPage: React.FC<{entry: Entry}> = ({ entry }) => {
    const [{ diagnoses } ] = useStateValue();

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const getRatingIcon = (rating: number) => {
        if (rating===1) {
            return 'thumbs up';
        } else if (rating===2) {
            return 'eye';
        } else if (rating===4) {
            return 'thumbs down';
        } else {
            return 'like';
        }
    };

    const entryStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    switch (entry.type) {
        case "HealthCheck":
            return (
                <div style={entryStyle}>
                    <h3>Health Check Entry {entry.date}</h3>
                    <div><i>Specialist:</i> {entry.specialist}</div>
                    <div><i>Description:</i> {entry.description}</div>
                    <div><i>Diagnosis codes:</i> {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}</div>
                    <div>Health check rating: <Icon name={getRatingIcon(entry.healthCheckRating)}/> </div>
                </div>
            );

        case "Hospital":
            return (
                <div style={entryStyle}>
                    <h3>Hospital Entry {entry.date}</h3>
                    <div><i>Specialist:</i> {entry.specialist}</div>
                    <div><i>Description:</i> {entry.description}</div>
                    <div><i>Diagnosis codes:</i> {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}</div>
                    <h3><Icon name="hospital"/></h3>
                    <div>Discharge date: {entry.discharge.date}</div>
                    <div>Discharge criteria: {entry.discharge.criteria} </div>
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div style={entryStyle}>
                    <h3>Occupational Healthcare Entry  {entry.date}</h3>
                    <div><i>Specialist:</i> {entry.specialist}</div>
                    <div><i>Description:</i> {entry.description}</div>
                    <div><i>Diagnosis codes:</i> {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}</div>
                    <h3><Icon name="battery half"/></h3>
                    <div> Sick leave starts: {entry.sickLeave?.startDate} Sick leave ends: {entry.sickLeave?.endDate} </div>
                </div>
            );
        default:
            return assertNever(entry);
    }

};
export default EntryPage;