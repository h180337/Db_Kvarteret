
import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {observer} from "mobx-react-lite";

interface IProps {
    setImage: (file: Blob) => void;
    imagePreview: string;
}

const PhotoUploadCropper: React.FC<IProps> = ({setImage, imagePreview}) => {
    const cropper = useRef<Cropper>(null)
    
    const cropImage = () =>{
        if (cropper.current && typeof cropper.current.getCroppedCanvas() === 'undefined'){
            return;
        }
        cropper && cropper.current && cropper.current.getCroppedCanvas().toBlob((blob:any) =>
        {
            setImage(blob)
        }, 'image/jpeg')
    }
    
    return (
        <Cropper
            ref={cropper}
            src={imagePreview}
            style={{height: 200, width: '100%'}}
            // Cropper.js options
            aspectRatio={1 / 1}
            preview='.image-preview'
            guides={false}
            viewMode={1}
            dragMode='move'
            scalable={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
            crop={cropImage}
            />
    );
}

export default observer(PhotoUploadCropper);