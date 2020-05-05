import React, {Fragment, useContext, useState} from 'react';
import {Header, Button} from "semantic-ui-react";
import {observer} from 'mobx-react-lite';
import {ITag} from '../../app/models/Tag';
import TagSearch from "../../app/common/searchFilter/TagSearch";
import {RootStoreContext} from "../../app/stores/rootStore";
import {v4 as uuid} from "uuid";


const TagController:React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadTags, tagsAsArray, loadingInitial, tagRegistry, createTag, filteredData, submitting} = rootStore.tagStore;
    const [input, setInput] = useState('')
    const onclickHandler = () =>{
        createTag({id: uuid(), tagText: input});
        setInput('');
    }
    
    return (
        <Fragment>
            <Header size='medium' content='Tag Controller'/>
            <Header  color='grey'size='tiny' content='Search for a tag, if it is not allready part of the database you can add it'/>
            <TagSearch tags={tagsAsArray} filteredData={filteredData} setInput={setInput}/>
            {Array.from(filteredData.values()).map((item:ITag) =>
                (<div key={item.id}>{item.tagText}</div>)
            )}
            {filteredData.size=== 0 &&  <Button
                color='green'
                content='Add new Tag'
                onClick={() => onclickHandler()}
                loading={submitting}
            />}
        </Fragment>
    );
}

export default observer(TagController);