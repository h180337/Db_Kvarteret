// @ts-ignore
import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Grid, Segment} from 'semantic-ui-react';
import {PersonFormValues} from '../../../app/models/personel'
import {observer} from 'mobx-react-lite';
import {RouteComponentProps} from 'react-router-dom';
import {Field, Form as FinalForm} from 'react-final-form'
import TextInput from '../../../app/common/form/TextInput';
import SelectInput from '../../../app/common/form/SelectInput';
import {gender} from '../../../app/common/options/genderOptions';
import DateInput from '../../../app/common/form/DateInput';
import {v4 as uuid} from 'uuid';
import {combineValidators, isRequired} from 'revalidate';
import {workStatus} from '../../../app/common/options/workStatusOptions'
import { RootStoreContext } from '../../../app/stores/rootStore';
import Headers from '../../../app/common/header/Headers'

const validate = combineValidators({
    fornavn: isRequired({message: 'First name is required'}),
    etternavn: isRequired({message: 'First name is required'}),
    userName: isRequired({message: 'Account name is required'}),
    workstatus: isRequired({message: 'workstatus is required'})

})


interface ProfileParams {
    id: string;
}

const PersonelForm: React.FC<RouteComponentProps<ProfileParams>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {createUser, editUser, submitting, loadUser} = rootStore.userStore;

    const [person, setPerson] = useState(new PersonFormValues());
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadUser(match.params.id)
                .then((user) => {
                    setPerson(new PersonFormValues(user));
                }).finally(() => {
                setLoading(false);
            });
        }
    }, [loadUser, match.params.id]);

    const handleFinalFormSubmit = (value:any) => {
        let today = new Date().toISOString().slice(0, 10)
        const {...person} = value;
        if (!person.id) {
            let newPerson = {
                ...person,
                id: uuid(),
                created: today,
                password: 'Pa$$sw0rd'
            }
            createUser(newPerson);
        } else {
            console.log(person)
            editUser(person);
        }
    }

    return (
        <Grid>
            <Grid.Column width={16}>
                <Segment clearing>
                    <Headers 
                        iconName={match.params.id ? 'edit': 'add user'}
                        header={match.params.id ? 'Edit user info': 'Add a new user to the database'} 
                        subHeader='' 
                        headerSize='medium'/>
                    <Segment secondary/>
                    <FinalForm
                        validate={validate}
                        initialValues={person}
                        onSubmit={handleFinalFormSubmit}
                        render={({handleSubmit, invalid, pristine}) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <label>First Name<span style={{color: 'red'}}>*</span></label>
                                <Field
                                    name='fornavn'
                                    placeholder='First name'
                                    value={person.fornavn}
                                    component={TextInput}
                                />
                                <label>Last Name<span style={{color: 'red'}}>*</span></label>
                                <Field
                                    name='etternavn'
                                    placeholder='Last name'
                                    value={person.etternavn}
                                    component={TextInput}
                                />
                                <label>Username<span style={{color: 'red'}}>*</span></label>
                                <Field
                                    name='userName'
                                    placeholder='Account name'
                                    value={person.userName}
                                    component={TextInput}
                                />
                                <label>Workstatus<span style={{color: 'red'}}>*</span></label>
                                <Field
                                    name='workstatus'
                                    placeholder='Active/inactiv user'
                                    value={person.workstatus}
                                    options={workStatus}
                                    component={SelectInput}
                                />
                                <label>Email</label>
                                <Field
                                    name='email'
                                    placeholder='Email'
                                    value={person.email}
                                    component={TextInput}
                                />
                                <label>Gender</label>
                                <Field
                                    name='kjonn'
                                    placeholder='Gender'
                                    value={person.kjonn}
                                    options={gender}
                                    component={SelectInput}
                                />
                                
                                <label>Phonenumber</label>
                                <Field
                                    name='phoneNumber'
                                    placeholder='Phone Number'
                                    value={person.phoneNumber}
                                    component={TextInput}
                                />
                               
                                <label>Address</label>
                                <Field
                                    name='streetAddress'
                                    placeholder='Address'
                                    value={person.streetAddress}
                                    component={TextInput}
                                />
                                <label>Area code</label>
                                <Field
                                    name='areaCode'
                                    placeholder='Area code'
                                    value={person.areaCode}
                                    component={TextInput}
                                />
                                <label>Date of Birth</label>
                                <Field
                                    name='dateOfBirth'
                                    placeholder='Birth Date'
                                    value={person.dateOfBirth}
                                    component={DateInput}
                                    date={true}
                                />
                                <Button
                                    loading={submitting}
                                    positive
                                    disabled={loading || invalid || pristine}
                                    floated='right'
                                    type='submit'
                                    content='Submit'
                                    color='green'
                                    style={{marginTop: '10px'}}/>
                                <Button
                                    onClick={person.id ? () => {
                                        history.push(`/users/${person.id}`)
                                    } : () => {
                                        history.push(`/users`)
                                    }}
                                    disabled={loading}
                                    floated='right'
                                    content='Cancel'
                                    color='grey'
                                    style={{marginTop: '10px'}}/>
                            </Form>
                        )}
                    />

                </Segment>
            </Grid.Column>
        </Grid>
      
    );
}

export default observer(PersonelForm);