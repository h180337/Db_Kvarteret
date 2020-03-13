import React, {useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import {Container} from 'semantic-ui-react';
import {IPersonel} from '../models/personel'
import NavBar from '../../features/nav/NavBar';
import './styles.css'
import PesonellDashBoard from "../../features/personell/dashboard/PesonellDashBoard";


const App = () => {

    const [pesonell, setPersonell] = useState<IPersonel[]>([]);
    const [selectedUser, setSelectedUser] = useState<IPersonel | null>(null);
    const [editMode, setEditMode] = useState(false);
    
    const selectUserHandler = (id: string) => {
        setSelectedUser(pesonell.filter(a => a.id === id)[0]);
        setEditMode(false);
    }
    
    const openCreateFormHandler = () => {
        setSelectedUser(null);
        setEditMode(true);
    }
    
    const createUserHandler = (person: IPersonel) =>{
        setPersonell([...pesonell, person]);
        setSelectedUser(person);
        setEditMode(false);
    }
    
    const editUserHandler = (person: IPersonel)=>{
        setPersonell([...pesonell.filter(a => a.id !== person.id), person]);
        setSelectedUser(person);
        setEditMode(false);
    }

    useEffect(() => {
        axios.get<IPersonel[]>('http://localhost:5000/api/personel').then(response => {
            setPersonell(response.data);
        });
    }, []);

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
             />
           </Container>
        </Fragment>
    )
}

export default App;
