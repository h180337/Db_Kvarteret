import React from 'react';
import { observer } from 'mobx-react-lite';
import {Button, Form, Grid, Segment} from "semantic-ui-react";
import Headers from "../../../app/common/header/Headers";
import {Field, Form as FinalForm} from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import {gender} from "../../../app/common/options/genderOptions";
import SelectInput from "../../../app/common/form/SelectInput";
import {workStatus} from "../../../app/common/options/workStatusOptions";
import DateInput from "../../../app/common/form/DateInput";
import {combineValidators, isRequired} from "revalidate";
import {v4 as uuid} from "uuid";
import { groupType } from '../../../app/common/options/groupTypeOptions';
import { semester } from '../../../app/common/options/semesterOptions';

interface IProp {
    close:any;
}

const validate = combineValidators({
    semester: isRequired({message: 'Semester is required'}),
    year: isRequired({message: 'Year is required'}),
    groupType: isRequired({message: 'Group type is required'}),
    groupName: isRequired({message: 'Group name is required'}),
    position: isRequired({message: 'Position is required'})
    
})

const handleFinalFormSubmit = (value:any) => {
   console.log(value)
}



const ProfileHistoryManagerForm:React.FC<IProp> = ({close}) => {
    return (
        <Grid>
            <Grid.Column>
                <Segment clearing >
                    <Headers
                        iconName={''}
                        header={'Add History'}
                        subHeader=''
                        headerSize='medium'/>
                    <Segment secondary/>
                    <FinalForm
                        validate={validate}
                        onSubmit={handleFinalFormSubmit}
                        render={({handleSubmit, invalid, pristine}) => (
                            <Form onSubmit={handleSubmit} loading={false}>
                                <Field
                                    name='semester'
                                    placeholder='Semester'
                                    options={semester}
                                    component={SelectInput}
                                />
                                <Field
                                    name='year'
                                    placeholder='Year'
                                    component={TextInput}
                                />
                                <Field
                                    name='groupType'
                                    placeholder='Group Type'
                                    options={groupType}
                                    component={SelectInput}
                                />

                                <Field
                                    name='groupName'
                                    placeholder='Group Name'
                                    component={TextInput}
                                />
                                <Field
                                    name='position'
                                    placeholder='Position'
                                    component={TextInput}
                                />
                               
                                <Button
                                    loading={false}
                                    positive
                                    disabled={false || invalid || pristine}
                                    floated='right'
                                    type='submit'
                                    content='Submit'
                                    color='green'
                                    style={{marginTop: '10px'}}/>
                                <Button
                                    onClick={() =>close()}
                                    disabled={false}
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

export default observer(ProfileHistoryManagerForm);