import React, {useContext, useState, useEffect} from 'react';
import {RouteComponentProps} from "react-router-dom";
import {RootStoreContext} from "../../../app/stores/rootStore";
import {GroupFormValues} from '../../../app/models/group';
import {v4 as uuid} from "uuid";
import {observer} from "mobx-react-lite";
import {Button, Form, Grid, Segment} from "semantic-ui-react";
import {Field, Form as FinalForm} from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import {combineValidators, isRequired} from "revalidate";
import SelectInput from '../../../app/common/form/SelectInput';
import { groupType } from '../../../app/common/options/groupTypeOptions';
import Headers from '../../../app/common/header/Headers'

interface GroupParams {
    id: string;
}

const validate = combineValidators({
    navn: isRequired({message: 'Name is required'}),
    beskrivelse: isRequired({message: 'description is required'}),
    groupType: isRequired({message: 'description is required'}),
    organisation: isRequired({message: 'organiasation is required'})
});

const GroupForm: React.FC<RouteComponentProps<GroupParams>> = ({match,history}) => {
    const rootStore = useContext(RootStoreContext);
    const {loadGroup, submitting, createGroup, editGroup} = rootStore.groupStore
    const { loadOrganisations, organiasationsRegistry} = rootStore.organiastionStore

    const [group, setGroup] = useState(new GroupFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadGroup(match.params.id)
                .then(group => {
                    setGroup(new GroupFormValues(group))
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [match.params.id, loadGroup]);
    
    useEffect(() =>{
        loadOrganisations()
    },[loadOrganisations])

    const organisationOptions = Array.from(organiasationsRegistry.values()).map((org, index) => ({
        key: org.name,
        text: org.name,
        value: org.id,

    }))

    const handleFinalFormSubmit = (value: any) => {
        let today = new Date().toISOString().slice(0, 10)
        const {...group} = value;
        if (!group.id) {
            let newgroup = {
                ...group,
                id: uuid(),
                opprettet: today,
                aktiv_til_og_med: today,
                aktiv: 'inactive'
            }
            createGroup(newgroup);
        } else {
            editGroup(group);
        }
    }
    
    return (
        <Grid>
            <Grid.Column width={16}>
                <Segment clearing>
                    <Headers
                        iconName={match.params.id ? 'edit': 'group'}
                        header={match.params.id ? 'Edit group info': 'Add a new group to the database'} 
                        subHeader='' 
                        headerSize='medium'/>
                    <Segment secondary/>
                    <FinalForm
                        validate={validate}
                        initialValues={group}
                        onSubmit={handleFinalFormSubmit}
                        render={({handleSubmit, invalid, pristine}) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <label>Group Name</label>
                                <Field
                                    name='navn'
                                    placeholder='Name'
                                    value={group.navn}
                                    component={TextInput}
                                />
                                <label>Description</label>
                                <Field
                                    name='beskrivelse'
                                    placeholder='Description'
                                    value={group.beskrivelse}
                                    component={TextAreaInput}
                                    rows={3}
                                />
                                <label>Group type</label>
                                <Field
                                    name='groupType'
                                    placeholder='groupType'
                                    value={group.groupType}
                                    component={SelectInput}
                                    options={groupType}
                                />
                                <label>Organisastion</label>
                                <Field
                                    name='organisation'
                                    placeholder='organisation'
                                    value={group.organiastionId}
                                    component={SelectInput}
                                    options={organisationOptions}
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
                                    onClick={group.id ? () => {
                                        history.push(`/group/${group.id}`)
                                    } : () => {
                                        history.push(`/group`)
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

export default observer(GroupForm);