import React, {Fragment, useEffect, useState, SyntheticEvent} from 'react';
import {Container} from 'semantic-ui-react';
import {IPersonel} from '../models/personel'
import NavBar from '../../features/nav/NavBar';
import './styles.css'
import PesonellDashBoard from "../../features/personell/dashboard/PesonellDashBoard";
import agent from '../api/agent'
import LoadingComponent from "./LoadingComponent";


const App = () => {

    const [pesonell, setPersonell] = useState<IPersonel[]>([]);
    const [selectedUser, setSelectedUser] = useState<IPersonel | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget] = useState('');
    
    const selectUserHandler = (id: string) => {
        setSelectedUser(pesonell.filter(a => a.id === id)[0]);
        setEditMode(false);
    }
    
    const openCreateFormHandler = () => {
        setSelectedUser(null);
        setEditMode(true);
    }
    
    const createUserHandler = (person: IPersonel) =>{
            setSubmitting(true);
            agent.Users.create(person).then(() =>{
                setPersonell([...pesonell, person]);
                setSelectedUser(person);
                setEditMode(false);  
            }).then(() =>{
                setSubmitting(false);
            })
    }
    
    const editUserHandler = (person: IPersonel)=>{
        setSubmitting(true);
        agent.Users.update(person).then(() => {
            setPersonell([...pesonell.filter(a => a.id !== person.id), person]);
            setSelectedUser(person);
            setEditMode(false);
        }).then(() =>{
            setSubmitting(false);
        })
    }
    
    const deletePersonHandler = (event: SyntheticEvent<HTMLButtonElement>,id: string)=>{
        setSubmitting(true);
        setTarget(event.currentTarget.name);
        agent.Users.delete(id).then(() =>{
            setPersonell([...pesonell.filter(a => a.id !== id)]);
        }).then(() =>{
            setSubmitting(false);
        });
    }

    useEffect(() => {
        agent.Users.list()
            .then(response => {
            let personell: IPersonel[] = [];
            response.forEach(person => {
                person.opprettet = person.opprettet.split('T')[0];
                person.fodselsdato = person.fodselsdato.split('T')[0];
                personell.push(person)
            })
            setPersonell(personell);
        }).then(() => {
            setLoading(false)
        })
    }, []);
        
        if (loading) return <LoadingComponent content='Loading Users...' inverted={true}/>

    return (
        <Fragment>
           <NavBar openCreateFormHandler={openCreateFormHandler}/>
           <Container style={{marginTop: '7em'}}>
             <PesonellDashBoard
                 setSelectedUser={setSelectedUser}
                 pesonell={pesonell}
                 selectUser={selectUserHandler}
                 selectedUser={selectedUser!}
                 editMode={editMode}
                 setEditMode={setEditMode}
                 createUserHandler={createUserHandler}
                 editUserHandler={editUserHandler}
                 deletePersonHandler={deletePersonHandler}
                 submitting={submitting}
                 target={target}
             />
           </Container>
        </Fragment>
    )
}

export default App;
