import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Input, Label, Button} from 'semantic-ui-react';
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
    
    const addTags =  (event: any) => {
        if (event.target.value && event.key === 'Enter'){
            setTagSearch([...tagSearch,event.target.value ])
            event.target.value = '';
        }
    }
    const handleFilter = () => {
        if (tagSearch.length === 0){
            filteredData.clear()
        }
        tagSearch.forEach(tag =>{
            filteredData.clear()
            console.log(tagSearch)
            dataArray.filter((item: any) => {
                return Object.keys(item).some((key: string) => {
                    if (item[key] !== null) {
                        if (item[key].toString().toLowerCase().includes(tag.toLowerCase())) {
                            runInAction('dataFilter', () => {
                                filteredData.set(item.id, item)
                            })
                        }
                    }
                })
            })
        })
    }
    
    
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

            <Input 
                onKeyUp={(e: any) => addTags(e)}
                placeholder='add tag to seach for'
            />
            <Button
            content='Search'
            onClick={() =>handleFilter()}
            color='blue'
            />
</div>
    );
}

export default observer(DataSearch);