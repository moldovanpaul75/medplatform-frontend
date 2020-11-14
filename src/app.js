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
import MedicalRecordForm from "./users/patient/components/medical-record-form";
import MedicationContainer from "./users/doctor/medication/medication-container";
import PersonContainer from "./person/person-container";


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

                        <RoleRoute
                            role='ROLE_doctor'
                            path='/person'
                            component={PersonContainer}
                        />


                        <RoleRoute
                            role='ROLE_doctor'
                            path='/doctor'
                            component={() => <ProfileForm path='/doctor'/>}
                        />


                        <RoleRoute
                            role='ROLE_doctor'
                            path='/medications'
                            component={MedicationContainer}
                        />


                        <RoleRoute
                            role='ROLE_patient'
                            path='/patient'
                            component={() => <ProfileForm path='/patient'/>}
                        />

                        <RoleRoute
                            role='ROLE_patient'
                            path='/medical_record'
                            component={() => <MedicalRecordForm />}
                        />

                        <RoleRoute
                            role='ROLE_caregiver'
                            path='/caregiver'
                            component={() => <ProfileForm path='/caregiver'/>}
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
