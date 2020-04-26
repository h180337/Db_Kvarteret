// @ts-ignore
import React, { Fragment, useState, useEffect } from 'react';
import { Header, Grid, Image, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import MyDropzone from "./PhotoDropZone";
import PhotoUploadCropper from "./PhotoUploadCropper";

const PhotoUpload = () => {
    
    const [files, setFiles] = useState<any[]>([]);
    const [image, setImage] = useState<Blob | null>(null)
    
    useEffect(() =>{
        return () => {
            files.forEach(file =>{
                URL.revokeObjectURL(file.preview)
            })
        }
    })
    
    return(
        <Fragment>
            <Grid>
                <Grid.Column mobile={16} computer={4}>
                    <Header color='teal' sub content='Step 1 - Add Photo' />
                    <MyDropzone setFiles={setFiles}/>
                </Grid.Column>
                <Grid.Column mobile={16} computer={1} />
                <Grid.Column mobile={16} computer={4}>
                    <Header sub color='teal' content='Step 2 - Resize image' />
                    {files.length>0 &&
                    <PhotoUploadCropper setImage={setImage} imagePreview={files[0].preview}/>
                    }
                </Grid.Column>
                <Grid.Column mobile={16} computer={1} />
                <Grid.Column mobile={16} computer={4}>
                    <Header sub color='teal' content='Step 3 - Preview & Upload' />
                    {files.length>0 &&
                        <Fragment>
                            <div className='image-preview' style={{minHeight: '200px', overflow:'hidden'}}/>
                            <Button.Group mobile={16} computer={2}>
                                <Button positive icon='check' content='Upload'/>
                                <Button basic icon='cancel' content='cancel'/>
                            </Button.Group>
                        </Fragment>
                    }
                </Grid.Column>
            </Grid>
        </Fragment>
    )
};

export default observer(PhotoUpload);