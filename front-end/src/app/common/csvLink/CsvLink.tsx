import React, {useContext, useEffect} from 'react';
import {CSVLink} from "react-csv";
import {observer} from 'mobx-react-lite';
import {Button} from "semantic-ui-react";
import {RootStoreContext} from "../../stores/rootStore";

interface IProp {
    dataArray: any [];
    filterData: any [];
}
const CsvLink:React.FC<IProp> = ({filterData, dataArray}) => {
    
    const rootStore = useContext(RootStoreContext);
    const {setCsvData, csvData} = rootStore.commonStore;
    
    useEffect(() => {
        filterData.length=== 0 ? setCsvData(dataArray) : setCsvData(filterData);
    }, [filterData, setCsvData, dataArray])
    

    return (
        <Button
            color='blue'
            as={CSVLink}
            data={filterData.length!==0 ? filterData : dataArray}
          
        > CSV DownLoad</Button>
    );
}

export default observer(CsvLink);