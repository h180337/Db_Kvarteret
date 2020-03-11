// @ts-ignore
import React, {Fragment} from 'react';
import {Container, Grid, List} from 'semantic-ui-react'
import {IPersonel} from '../../../app/models/personel'
import PersonellTable from "./PersonellTable";

interface IProps {
    pesonell: IPersonel[]
}

const PesonellDashBoard: React.FC<IProps> = ({pesonell}) => {
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={12}>
                    <PersonellTable pesonell={pesonell}/>
                </Grid.Column>
                <Grid.Column width={4}> <h2>Search Filter</h2></Grid.Column>
            </Grid>
            
        </Fragment>
    );
}

export default PesonellDashBoard;