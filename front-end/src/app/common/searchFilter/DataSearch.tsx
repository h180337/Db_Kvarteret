import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Input, Label} from 'semantic-ui-react';
import _ from 'lodash';
import {runInAction} from "mobx";

interface IProps {
    filteredData : Map<any,any>;
    dataArray : any
}

const DataSearch: React.FC<IProps> = ({filteredData, dataArray}) => {

    const [tagSearch, setTagSearch] = useState<string[]>([])

    const onClickDeleteHandler = (i: number) => {
        setTagSearch([...tagSearch].filter((tag, index) => index !== i))
    }

    const filter = (e: any, filtered: Map<any, any>, data: any[]) => {
        let inputdata: string = e.target.value;
        handleFilter(inputdata, data, filtered)
    }

    const addTags = (event: any) => {
        setTagSearch([...tagSearch, event.target.value])
        event.target.value = '';
    }

    const handleFilter = _.debounce((inputvalue, data, filtered) => {
        filteredData.clear()
        data.filter((item: any) => {
            return Object.keys(item).some((key: string) => {
                if (item[key] !== null) {
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
            {tagSearch.map((tag, index) => (
                <Label
                    onClick={() => onClickDeleteHandler(index)}
                    key={index}
                    size='large'
                    color='green'
                    style={{marginBottom: '3px'}}
                >{tag}</Label>))}

            <Input onKeyUp={(e: any) => e.key === 'Enter' && addTags(e)}/>
        </div>
    );
}

export default observer(DataSearch);