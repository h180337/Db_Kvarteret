import React, {useContext} from 'react';
import {Field, Form as FinalForm} from 'react-final-form';
import {Button, Form, Header} from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';
import {RootStoreContext} from '../../../app/stores/rootStore';
import {FORM_ERROR} from 'final-form';
import {combineValidators, isRequired} from 'revalidate';
import ErrorMesage from "../../../app/common/form/ErrorMesage";

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
})

const LoginForm = () => {


    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore

    return (
        <FinalForm
            validate={validate}
            onSubmit={(values) => login(values).catch(error => ({
                [FORM_ERROR]: error
            }))}
            render={(
                {
                    handleSubmit,
                    submitting,
                    form,
                    submitError,
                    invalid,
                    pristine,
                    dirtySinceLastSubmit
                }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header 
                        as='h2' 
                        content='Login to the database' 
                        color='teal' 
                        textAlign='center'/>
                    <Field
                        name='email'
                        component={TextInput}
                        placeholder='Email'
                    />
                    <Field
                        name='password'
                        component={TextInput}
                        placeholder='Password'
                        type='password'
                    />
                    {submitError && !dirtySinceLastSubmit && (<ErrorMesage error={submitError} text='Invalid email or password'/>)}
                    <br/>
                    <Button 
                        disabled={invalid && !dirtySinceLastSubmit || pristine} 
                        content='Login' 
                        loading={submitting}
                        color='teal'
                        fluid
                    />
                </Form>
            )}
        />
    );
}

export default LoginForm;