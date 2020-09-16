import React from 'react';
import { Field } from "formik";

import { TextField } from "../AddPatientModal/FormField";


const OccupationalHealthCheck: React.FC = () => {
    return (
        <div>
        <Field 
                label="Employer"
                placeholder="Employer"
                name="employerName"
                component={TextField}
            />
            <Field 
                label="Sick leave starts"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
            />
            <Field 
                label="Sick leave ends"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
            />
        </div>
    );
};

export default OccupationalHealthCheck;