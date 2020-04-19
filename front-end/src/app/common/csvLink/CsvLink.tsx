import React, {useContext, useEffect} from 'react';
import {CSVLink} from "react-csv";
import {observer} from 'mobx-react-lite';
import {Button} from "semantic-ui-react";
import {RootStoreContext} from "../../stores/rootStore";

interface IProp {
    headers : any [];
    dataArray: any [];
    filterData: any [];
}
const CsvLink:React.FC<IProp> = ({headers, filterData, dataArray}) => {
    
    const rootStore = useContext(RootStoreContext);
    const {csvData} = rootStore.commonStore
    
    return (
        <Button
            style={{marginTop: '10px'}}
            color='blue'
            as={CSVLink}
            data={csvData}
            headers={headers}
        > CSV DownLoad</Button>
    );
}

export default observer(CsvLink);