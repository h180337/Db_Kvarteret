import React, { useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStoreContext} from "../../stores/rootStore";
import { Input} from 'semantic-ui-react';
import _ from 'lodash';
import {runInAction} from "mobx";

interface IProps {
    filteredData : Map<any,any>;
    dataArray : any
}

const DataSearch: React.FC<IProps> = ({filteredData, dataArray}) => {

    const filter = (e: any, filtered: Map<any,any>, data: any[]) => {
        let inputdata:string = e.target.value;
        handleFilter(inputdata, data, filtered)
    }

    const handleFilter = _.debounce((inputvalue, data, filtered) => {
        filteredData.clear()
         data.filter((item: any) => {
            return Object.keys(item).some((key:string) => {
                if (item[key] !== null){
                    if (item[key].toString().toLowerCase().includes(inputvalue.toLowerCase())) {
                        runInAction('dataFilter', () => {
                            filteredData.set(item.id, item)
                        })
                    }
                }
            })
        })
    }, 500)


    return (
        <div>
            <h2>Search</h2>
            <Input onChange={(e) =>
                filter(e, filteredData, dataArray)}/>
        </div>
    );
}

export default observer(DataSearch);