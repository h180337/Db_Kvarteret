import React from 'react';
import {Button, Form, Grid, Segment} from "semantic-ui-react";
import Headers from "../../app/common/header/Headers";
import {Field, Form as FinalForm} from "react-final-form";
import {semester} from "../../app/common/options/semesterOptions";
import SelectInput from "../../app/common/form/SelectInput";
import TextInput from "../../app/common/form/TextInput";
import {groupType} from "../../app/common/options/groupTypeOptions";
import {combineValidators, isRequired} from "revalidate";
import { observer } from 'mobx-react-lite';

interface IProps {
    close: any,
    createCourse: any,
    submitting: boolean
}

const AddNewCourse:React.FC<IProps> = ({close, createCourse, submitting}) => {
    
    const validate = combineValidators({
        navn: isRequired({message: 'Name is required'}),
        beskrivelse: isRequired({message: 'Description is required'}),
    })

    const handleFinalFormSubmit = (value:any) => {
        createCourse(value);
    }
    return (
        <Grid>
            <Grid.Column>
                <Segment clearing >
                    <Headers
                        iconName={''}
                        header={'Add a new course'}
                        subHeader=''
                        headerSize='medium'/>
                    <Segment secondary/>
                    <FinalForm
                        validate={validate}
                        onSubmit={handleFinalFormSubmit}
                        render={({handleSubmit, invalid, pristine}) => (
                            <Form onSubmit={handleSubmit} loading={submitting}>
                                <Field
                                    name='navn'
                                    placeholder='Name'
                                    options={semester}
                                    component={TextInput}
                                />
                                <Field
                                    name='beskrivelse'
                                    placeholder='Description'
                                    component={TextInput}
                                />
                               

                                <Button
                                    loading={submitting}
                                    positive
                                    disabled={submitting || invalid || pristine}
                                    floated='right'
                                    type='submit'
                                    content='Submit'
                                    color='green'
                                    style={{marginTop: '10px'}}/>
                                <Button
                                    onClick={() =>close()}
                                    disabled={submitting}
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

export default observer(AddNewCourse);