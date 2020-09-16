import React from 'react';
import { Field } from "formik";

import { TextField } from "../AddPatientModal/FormField";

const Basics: React.FC = () => {
    return (
        <div>
            <Field 
                label="Type"
                placeholder="Type"
                name="type"
                component={TextField}
            />
            <Field 
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
            />
            <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
            />
            <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
            />
            
        </div>
    );

};

export default Basics;