import React, {Fragment, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Input, Label, Icon} from 'semantic-ui-react';
import {runInAction} from "mobx";
import {toast} from 'react-toastify';


interface IProps {
    filteredData: Map<any, any>;
    dataArray: any
}


const DataSearch: React.FC<IProps> = ({filteredData, dataArray}) => {

    const [tagSearch, setTagSearch] = useState<string[]>([])
    
    const onClickDeleteHandler = (i: number) => {
        setTagSearch([...tagSearch].filter((tag, index) => index !== i))
    }
    
    const clearDatainputHandler = ()=>{
        setTagSearch([]);
        filteredData.clear();
    }

    const addTags = (event: any) => {
        if (event.target.value && event.key === 'Enter') {
            setTagSearch([...tagSearch, event.target.value])
            event.target.value = '';
        }

    }
    const handleFilter = (e:any) => {
        addTags(e)
        if (tagSearch.length === 0) {
            filteredData.clear()
        }
        filteredData.clear()
        tagSearch.forEach(tag => {
            if (filteredData.size !== 0) {
                dataArray = Array.from(filteredData.values())
                filteredData.clear()
            }
            dataArray.forEach((item: any) => {
                 Object.keys(item).some((key: string) => {
                    if (item[key] !== null) {
                        if (key === 'tags') {
                            Object.keys(item.tags).forEach(tagss => {
                                if (item.tags[tagss].tagText.toString().toLowerCase().startsWith(tag.toLowerCase())) {
                                    runInAction('dataFilter', () => {
                                        filteredData.set(item.id, item)
                                    })
                                }
                            })
                        }
                        if (item[key].toString().toLowerCase().startsWith(tag.toLowerCase())) {
                            runInAction('dataFilter', () => {
                                filteredData.set(item.id, item)
                            })
                        }
                    }
                })
            })
        })

        if (tagSearch.length > 0 && filteredData.size === 0) {
            toast.error('The Search gave no results, try to change the last search tag')
        }
    }


    return (
        <Fragment>
            <div>
                {tagSearch.map((tag, index) => (
                    <Label
                        key={index}
                        size='large'
                        style={{marginBottom: '5px'}}
                        onClick={() => onClickDeleteHandler(index)}
                        color='blue'
                        cursor='pointer'
                    >
                        {`${tag}`}
                        <Icon name='close'/>
                    </Label>))}
            </div>

            <Input
                style={{marginTop: '5px'}}
                onKeyDown={(e: any) => addTags(e)}
                onKeyUp={(e:any)=> handleFilter(e)}
                placeholder='Search'
            /><span 
            onClick={clearDatainputHandler}
            style={{color:'gray', cursor:'pointer'}}
            >Clear all tags</span>
            <div>
                <Button
                    style={{marginTop: '3px'}}
                    content='Search'
                    onClick={(e) => handleFilter(e)}
                    color='blue'
                />
            </div>
        </Fragment>
    );
}

export default observer(DataSearch);