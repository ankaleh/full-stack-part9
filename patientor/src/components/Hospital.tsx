import React from 'react'
import { Field } from "formik";

import { TextField } from "../AddPatientModal/FormField";

const Hospital: React.FC = () => {
    return (
        <div>
            
            <Field 
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
            />
            <Field 
                label="Discharge criteria"
                placeholder="Discharge criteria"
                name="discharge.criteria"
                component={TextField}
            />
        </div>
    )
}
export default Hospital;