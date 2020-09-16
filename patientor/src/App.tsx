import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { setPatientList, setDiagnosisList } from "./state/reducer"
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";

import PatientPage from "./components/PatientPage";

const App: React.FC = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();


  React.useEffect(() => {
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
  }, [dispatch])

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
        //dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
    
  }, [dispatch]);


  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            
            <Route path="/patients/:id">
              <PatientPage patients={patients} diagnoses={diagnoses}/>
            </Route>
            <Route path="/" render={() => <PatientListPage />} />
            
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
