import React, {useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import {Header, Icon, List, Container, Grid} from 'semantic-ui-react';
import {IPersonel} from '../models/personel'
import NavBar from '../../features/nav/NavBar';
import './styles.css'
import PesonellDashBoard from "../../features/personell/dashboard/PesonellDashBoard";


const App = () => {

    const [pesonell, setPersonell] = useState<IPersonel[]>([]);

    useEffect(() => {
        axios.get<IPersonel[]>('http://localhost:5000/api/personel').then(response => {
            setPersonell(response.data);
        });
    }, []);

    return (
        <Fragment>
           <NavBar/>
           <Container style={{marginTop: '7em'}}>
             <PesonellDashBoard pesonell={pesonell}/>
           </Container>
        </Fragment>
    )
}

export default App;
