import React, {ChangeEvent} from 'react';
import {Input} from "semantic-ui-react";
import { ITag } from '../../models/Tag';
import { runInAction } from 'mobx';

interface IProps {
    tags: any[]
    filteredData: Map<string,ITag>
}

const TagSearch: React.FC<IProps> = ({tags, filteredData}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        filteredData.clear()
    tags.forEach((tag:ITag) => {
        if (tag.tagText.toLowerCase().includes(event.target.value.toLowerCase())){
            runInAction(()=>{
                filteredData.set(tag.id, tag)
            })
        }
    })  
        if (event.target.value === ''){
            filteredData.clear();
        }
    }
    
    return (
        <Input
            placeholder='Search'
            onChange={(e) => handleChange(e)}
        />
    );
}

export default TagSearch;