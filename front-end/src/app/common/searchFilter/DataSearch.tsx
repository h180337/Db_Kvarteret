import React, { useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {RootStoreContext} from "../../stores/rootStore";
import { Input} from 'semantic-ui-react';
import _ from 'lodash';
import {runInAction} from "mobx";

const DataSearch: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {filteredData, usersAsArray} = rootStore.userStore

    const filter = (e: any, filtered: any, data: any) => {
        let inputdata = e.target.value;
        handleFilter(inputdata, data, filtered)
    }

    const handleFilter = _.debounce((inputvalue, data, filtered) => {
        filteredData.clear()
         data.filter((item: any) => {
            return Object.keys(item).some((key) => {
                if (item[key].toString().toLowerCase().includes(inputvalue.toLowerCase())) {
                    runInAction('dataFilter', () => {
                        filteredData.set(item.id, item)
                    })
                }
            })
        })
    }, 500)


    return (
        <div>
            <h2>Search</h2>
            <Input onChange={(e) =>
                filter(e, filteredData, usersAsArray)}/>
        </div>
    );
}

export default observer(DataSearch);