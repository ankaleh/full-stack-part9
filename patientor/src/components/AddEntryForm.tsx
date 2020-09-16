import React from 'react'
import { Button } from "semantic-ui-react";
import { Formik, Form } from "formik";

import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry, HospitalEntry, HealthCheckEntry } from "../types";
import { useStateValue } from "../state/state";
import OccupationalHealthCheck from './OccupationalHealthCheck';
import Basics from './Basics';
import Hospital from './Hospital';
import HealthCheck from './HealthCheck';


export type EntryFormValues =  Omit<OccupationalHealthcareEntry, 'id'>
| Omit<HospitalEntry, "id"> | Omit<HealthCheckEntry, "id">  ///koska id luodaan palvelimella

export interface Props {
    onSubmit: (values: EntryFormValues) => void;
    values: Omit<OccupationalHealthcareEntry, 'id'>
    | Omit<HospitalEntry, "id"> | Omit<HealthCheckEntry, "id">//onCancel: () => void;
}


const AddEntryForm: React.FC<Props> = ({ onSubmit, values/* onCancel */  }) => {
    const [{ diagnoses }] = useStateValue()
    
    
if (values.type==="OccupationalHealthcare") {
    return (
        <Formik
            initialValues={values}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {}; //errors on dictionary

                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.employerName) {
                    errors.employerName = requiredError;
                }

                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                    <h2>Occupational Healthcare Entry</h2>
                    <Basics/>
                    <DiagnosisSelection
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        diagnoses={Object.values(diagnoses)}
                    />
                    <OccupationalHealthCheck />
                    <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
                    Add
                    </Button>
            
                    </Form>
                );
            }}
        </Formik>
    );
}
else if (values.type==="Hospital") {
    return (
        <Formik
            initialValues={values}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {}; //errors on dictionary

                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                    
                }
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.discharge.criteria) {
                    errors["discharge.criteria"] = requiredError;
                }
                if (!values.discharge.date) {
                    errors.dischargedate = requiredError;
                }
                return errors;
            }}
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
                <Form className="form ui">
                    <h2>Hospital Entry</h2>
                    <Basics/>
                    <DiagnosisSelection
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        diagnoses={Object.values(diagnoses)}
                    />
                    <Hospital />
                    <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
                    Add
                    </Button>
                </Form>
            );
        }}
    
    </Formik>
      
    )
  }
  else {
    return (
        <Formik
      initialValues={values}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {}; //errors on dictionary

        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.type) {
            errors.type = requiredError;
        }
        if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <h2>Health Check Entry</h2>
            <Basics/>
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <HealthCheck />
            <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
                Add
            </Button>
            
            // ...
          </Form>
        );
      }}
    
    </Formik>
      

    )
  }
};

  export default AddEntryForm;