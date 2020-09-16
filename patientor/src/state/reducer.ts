import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "FETCH_PATIENT";
    payload: Patient;
  }
  | { 
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  };


export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return (
    { type: "SET_PATIENT_LIST", payload: patientListFromApi }
  );
};

export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): Action => {
  return (
    { type: "SET_DIAGNOSIS_LIST", payload: diagnosisListFromApi }
  );
};

export const setPatient = (patient: Patient): Action => {
  return (
    { type: "FETCH_PATIENT", payload: patient }
  );
};

export const setNewPatient = (patient: Patient): Action => {
  return (
    { type: "ADD_PATIENT", payload: patient}
  );
};

export const reducer = (state: State, action: Action): State => {
  console.log(state);
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
      case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
            ),
          ...state.diagnoses
          }
        };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "FETCH_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    default:
      return state;
  }
};
