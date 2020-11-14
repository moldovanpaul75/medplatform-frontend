import React from 'react'
import {Form, FormGroup, Input, Label, Col} from "reactstrap";




class MedicalRecordForm extends React.Component {

    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);

        this.state = {
            isLoaded: false,
            errorStatus: 0,

            releaseDate: '',
            details: '',
        }
    }

    componentDidMount() {
        this.fetchMedicalRecord();
    }

    fetchMedicalRecord(){


    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.fetchMedicalRecord();
    }


    render() {
        return(
            <div>
                <div
                    style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                    <div className="container">
                        <h1>Medical record</h1>

                        <FormGroup id='releaseDate'>
                            <Label for='releaseDate'> Release date: </Label>
                            <Input id='releaseDate' disabled='disabled' defaultValue={this.state.releaseDate}/>
                        </FormGroup>



                    </div>
                </div>
            </div>
        )
    };
}

export default MedicalRecordForm
