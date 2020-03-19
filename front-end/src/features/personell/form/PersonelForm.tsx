// @ts-ignore
import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Grid, Segment} from 'semantic-ui-react';
import {PersonFormValues, IPersonFormValues} from '../../../app/models/personel'
import usersStore from "../../../app/stores/userStore";
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

const validate = combineValidators({
    fornavn: isRequired({message: 'First name is required'}),
    etternavn: isRequired({message: 'First name is required'}),
    kjonn: isRequired({message: 'Gender is required'}),
    brukerkonto: isRequired({message: 'Account name is required'}),
    arb_status: isRequired({message: 'Work status is required'}),
    telefon: isRequired({message: 'PhoneNr is required'}),
    epost: isRequired({message: 'Email is required'}),
    gateadresse: isRequired({message: 'Address is required'}),
    postnummerid: isRequired({message: 'Area code is required'}),
    fodselsdato: isRequired({message: 'Birth date is required'})
    

})


interface ProfileParams {
    id: string;
}

const PersonelForm: React.FC<RouteComponentProps<ProfileParams>> = ({match, history}) => {
    const userStore = useContext(usersStore);
    const {createUser, user: initialFormState, editUser, submitting, loadUser, clearUser} = userStore;

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
                opprettet: today,
            }
            createUser(newPerson);
        } else {
            editUser(person);
        }
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={person}
                        onSubmit={handleFinalFormSubmit}
                        render={({handleSubmit, invalid, pristine}) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field
                                    name='fornavn'
                                    placeholder='First Name'
                                    value={person.fornavn}
                                    component={TextInput}
                                />
                                <Field
                                    name='etternavn'
                                    placeholder='Last Name'
                                    value={person.etternavn}
                                    component={TextInput}
                                />
                                <Field
                                    name='kjonn'
                                    placeholder='Gender'
                                    value={person.kjonn}
                                    options={gender}
                                    component={SelectInput}
                                />
                                
                                <Field
                                    name='brukerkonto'
                                    placeholder='User Account Name'
                                    value={person.brukerkonto}
                                    component={TextInput}
                                />
                                <Field
                                name='arb_status'
                                placeholder='Work Status'
                                value={person.arb_status}
                                options={workStatus}
                                component={SelectInput}
                            />
                                <Field
                                    name='telefon'
                                    placeholder='Phone Number'
                                    value={person.telefon}
                                    component={TextInput}
                                />
                                <Field
                                    name='epost'
                                    placeholder='Email'
                                    value={person.epost}
                                    component={TextInput}
                                />
                                <Field
                                    name='gateadresse'
                                    placeholder='Address'
                                    value={person.gateadresse}
                                    component={TextInput}
                                />
                                <Field
                                    name='postnummerid'
                                    placeholder='Area code'
                                    value={person.postnummerid}
                                    component={TextInput}
                                />
                                <Field
                                    name='fodselsdato'
                                    placeholder='Birth Date'
                                    value={person.fodselsdato}
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