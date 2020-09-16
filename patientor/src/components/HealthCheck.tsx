import React from 'react'
import { Field } from "formik";

import { NumberField } from "../AddPatientModal/FormField";


const HealthCheck: React.FC = () => {
    return (
        <div>
            
            <Field 
                label="Health check rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={4}
            />
            
        </div>
    )
}
export default HealthCheck;