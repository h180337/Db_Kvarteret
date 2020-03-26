import React, {useContext, useState, useEffect} from 'react';
import {RouteComponentProps} from "react-router-dom";
import {RootStoreContext} from "../../../app/stores/rootStore";
import { OrganisationFormValues } from '../../../app/models/organisations';
import {v4 as uuid} from "uuid";
import {Button, Form, Grid, Segment} from "semantic-ui-react";
import {Field, Form as FinalForm} from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import {gender} from "../../../app/common/options/genderOptions";
import SelectInput from "../../../app/common/form/SelectInput";
import {workStatus} from "../../../app/common/options/workStatusOptions";
import DateInput from "../../../app/common/form/DateInput";
import {combineValidators, isRequired} from "revalidate";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { observer } from 'mobx-react-lite';

const validate = combineValidators({
    name: isRequired({message: 'Name is required'}),
    description: isRequired({message: 'description is required'})
});

interface OrganiasationParams {
    id: string;
}

const OrganisationForm: React.FC<RouteComponentProps<OrganiasationParams>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {loadOrg, submitting} = rootStore.organiastionStore;
    
    const [organisation, setOrganiastion] = useState(new OrganisationFormValues());
    const [loading, setLoading] = useState(false)
    
    useEffect(() =>{
        if (match.params.id){
            setLoading(true);
            loadOrg(match.params.id)
                .then(org =>{
                    setOrganiastion(new OrganisationFormValues(org))
                })
                .finally(() =>{
                    setLoading(false);
                });
        }
    }, [match.params.id, loadOrg] );
    

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={organisation}
                        onSubmit={()=>{}}
                        render={({handleSubmit, invalid, pristine}) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field
                                    name='name'
                                    placeholder='Name'
                                    value={organisation.name}
                                    component={TextInput}
                                />
                                <Field
                                    name='description'
                                    placeholder='Description'
                                    value={organisation.description}
                                    component={TextAreaInput}
                                    rows={3}
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
                                    onClick={organisation.id ? () => {
                                        history.push(`/organisation/${organisation.id}`)
                                    } : () => {
                                        history.push(`/organisation`)
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

export default observer(OrganisationForm);