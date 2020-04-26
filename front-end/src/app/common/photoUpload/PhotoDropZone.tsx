import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Icon, Header } from 'semantic-ui-react'
import {observer} from "mobx-react-lite";
interface IProps {
    setFiles :(files: object[]) => void;
}

const dropzoneStyle = {
    border: 'dashed 3px',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as 'center',
    height: '200px'
}

const dropzoneActive = {
    borderColor: 'green'
}

const MyDropzone: React.FC<IProps> = ({setFiles}) => {
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((file:object) => Object.assign(file,{
            preview: URL.createObjectURL(file)
        })));
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} style={isDragActive ? {...dropzoneStyle, ...dropzoneActive} : dropzoneStyle}>
            <input {...getInputProps()} />
           <Icon name='upload' size='huge'/>
           <Header content='Drop image here'/>
        </div>
    )
}

export default observer(MyDropzone);