// @ts-ignore
import React, {FormEvent, useContext, useEffect, useState} from 'react';
import {Button, Form, Segment} from 'semantic-ui-react';
import {IPersonel} from '../../../app/models/personel'
import {v4 as uuid} from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    selectedUser: (IPersonel);
    createUserHandler: (person: IPersonel) => void;
    editUserHandler: (person: IPersonel) => void;
}

const PersonelForm: React.FC<IProps> = ({setEditMode, selectedUser, createUserHandler, editUserHandler }) => {

    /* if we have a user, populate the inputs with date from the user. if no user give back a blank input */
    const initializeForm = () => {
        if (selectedUser) {
            return selectedUser
        } else {
            return {
                id: '',
                fornavn: '',
                etternavn: '',
                brukerkonto: '',
                kjonn: '',
                epost: '',
                telefon: '',
                arb_status: '',
                fodselsdato: '',
                gateadresse: '',
                postnummerid: '',
                opprettet: ''
            }
        }
    }

    const [person, setPerson] = useState<IPersonel>(initializeForm);

    /* uses the event at current target to let react know that we are typing in the form inputs */
    const inputChangeHandler = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setPerson({...person, [name]: value})
    }
    
    // submit changes to the db
    const submitHandler = () =>{
        if (person.id.length === 0){
            let newPerson = {
                ...person,
                id: uuid()
            }
            createUserHandler(newPerson);
        }else {
            editUserHandler(person);
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={submitHandler}>
                <Form.Input
                    onChange={inputChangeHandler}
                    name='fornavn'
                    placeholder='First Name'
                    value={person.fornavn}/>
                <Form.Input
                    onChange={inputChangeHandler}
                    name='etternavn'
                    placeholder='Last Name'
                    value={person.etternavn}/>
                <Form.Input
                    onChange={inputChangeHandler}
                    name='kjonn'
                    placeholder='Gender'
                    value={person.kjonn}/>
                <Form.Input
                    onChange={inputChangeHandler}
                    name='brukerkonto'
                    placeholder='User Account Name'
                    value={person.brukerkonto}/>
                <Form.Input
                    onChange={inputChangeHandler}
                    name='telefon'
                    placeholder='Phone Number'
                    value={person.telefon}/>
                <Form.Input
                    onChange={inputChangeHandler}
                    name='epost'
                    placeholder='Email'
                    value={person.epost}/>
                <Form.Input
                    onChange={inputChangeHandler}
                    name='gateadresse'
                    placeholder='Address'
                    value={person.gateadresse}/>
                <Form.Input
                    onChange={inputChangeHandler}
                    name='postnummerid'
                    placeholder='Postnummer'
                    value={person.postnummerid}/>
                <Form.Input
                    onChange={inputChangeHandler}
                    name='fodselsdato'
                    type='date'
                    placeholder='Birth Date'
                    value={person.fodselsdato}/>
                <Button
                    positive
                    floated='right'
                    type='submit'
                    content='Submit'
                    color='green'
                    style={{marginTop: '10px'}}/>
                <Button
                    onClick={() => setEditMode(false)}
                    floated='right'
                    content='Cancel'
                    color='grey'
                    style={{marginTop: '10px'}}/>
            </Form>
        </Segment>
    );
}

export default PersonelForm;