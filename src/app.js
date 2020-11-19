import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import LoginComponent from "./login/login-component";


import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import AuthenticatedRoute from "./route/authenticated-route";
import RoleRoute from "./route/role-route";
import ProfileForm from "./commons/profile/profile-form";
import MedicationContainer from "./users/doctor/components/medication/medication-container";
import PatientsContainer from "./users/doctor/components/patient/patients-container";
import CaregiversContainer from "./users/doctor/components/caregiver/caregivers-container";
import MedicationPlansContainer from "./users/doctor/components/medication-plan/medication-plans-container";
import CaregiverPatientsContainer from "./users/caregiver/components/caregiver-patients-container";
import PatientMedicalInfo from "./users/patient/components/patient-medical-info";


class App extends React.Component {


    render() {
        return (
            <div className={styles.back}>
                <Router>
                    <div>
                    <NavigationBar />
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />

                        <AuthenticatedRoute
                            path='/login'
                            component={LoginComponent}
                        />

                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        {/*Profiles*/}
                        <RoleRoute
                            userRole="ROLE_doctor"
                            path='/doctor'
                            component={() => <ProfileForm path='/doctor'/>}
                        />

                        <RoleRoute
                            userRole="ROLE_patient"
                            path='/patient'
                            component={() => <ProfileForm path='/patient'/>}
                        />

                        <RoleRoute
                            userRole="ROLE_caregiver"
                            path='/caregiver'
                            component={() => <ProfileForm path='/caregiver'/>}
                        />


                        {/*Doctor functionalities*/}
                        <RoleRoute
                            userRole="ROLE_doctor"
                            path='/medications'
                            component={MedicationContainer}
                        />

                        <RoleRoute
                            userRole="ROLE_doctor"
                            path='/patients'
                            component={PatientsContainer}
                        />

                        <RoleRoute
                            userRole="ROLE_doctor"
                            path='/caregivers'
                            component={CaregiversContainer}
                        />

                        <RoleRoute
                            userRole="ROLE_doctor"
                            path='/medication_plans'
                            component={MedicationPlansContainer}
                        />


                        {/*Caregiver functionalities*/}
                        <RoleRoute
                            userRole="ROLE_caregiver"
                            path='/caregiver_patients'
                            component={CaregiverPatientsContainer}
                        />



                        <RoleRoute
                            userRole="ROLE_patient"
                            path='/medical_info'
                            component={() => <PatientMedicalInfo />}
                        />

                        <Route component={ErrorPage} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
