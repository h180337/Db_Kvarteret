import React, {Fragment, useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Input} from 'semantic-ui-react';
import {runInAction} from "mobx";
import {RootStoreContext} from "../../stores/rootStore";
import styled from 'styled-components'


interface IProps {
    filteredData: Map<any, any>;
    dataArray: any
}

const SearchLable = styled.label
    `
          background: blue;
          border-radius: 3px;
          padding: 7px;
          border: none;
          color: white;
          margin-right: 3px;
         
        `
const SelectableTile = styled(SearchLable)`
    &:hover{
        cursor:pointer;
        background: red;
    }
`

const TheX = styled.div
    `
  position: relative;
    display: inline-block;
    padding-top: 10px;
    color: black;
    border-radius: 1px;
    margin-top: 5px;

    `
;

const TheXPosition = styled(TheX)`
    position: relative;
    display: inline-block;
    padding: 0;
    float: right;
    color: white;
    top: -17px;
    right: 10px;
`

const DataSearch: React.FC<IProps> = ({filteredData, dataArray}) => {


    const rootStore = useContext(RootStoreContext);

    const [tagSearch, setTagSearch] = useState<string[]>([])
    const [showX, setX] = useState(false)
    const onClickDeleteHandler = (i: number) => {
        setTagSearch([...tagSearch].filter((tag, index) => index !== i))
    }

    const addTags = (event: any) => {
        if (event.target.value && event.key === 'Enter') {
            setTagSearch([...tagSearch, event.target.value])
            event.target.value = '';
        }
    }
    const handleFilter = () => {
        if (tagSearch.length === 0) {
            filteredData.clear()
        }
        tagSearch.forEach(tag => {
            filteredData.clear()
            dataArray.filter((item: any) => {
                
                return Object.keys(item).some((key: string) => {
                    if (item[key] !== null) {
                        if (key === 'tags'){
                            Object.keys(item.tags).forEach(tagss =>{
                                if (item.tags[tagss].tagText.toString().toLowerCase().includes(tag.toLowerCase())){
                                    runInAction('dataFilter', () =>{
                                        filteredData.set(item.id, item)
                                    })
                                }
                            })  
                        }
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
        <Fragment>
            <h3>Search</h3>
            <div>
            {tagSearch.map((tag, index) => (
                <TheX key={index}>
                    <SelectableTile
                        onClick={() => onClickDeleteHandler(index)}
                        key={index}
                    >{`${tag}`}</SelectableTile>
                    <TheXPosition>x</TheXPosition>
                </TheX>))}
            </div>

            <Input
                style={{marginTop: '10px'}}
                onKeyUp={(e: any) => addTags(e)}
                placeholder='add tag to seach for'
            />
            <Button
                content='Search'
                onClick={() => handleFilter()}
                color='blue'
            />

        </Fragment>
    );
}

export default observer(DataSearch);