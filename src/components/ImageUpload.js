import React, {useState} from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
// Common componenets
import FormGroup from './common/FormGroup'
// CSS
import '../css/components/ImageUpload.css'


const ImageUpload = ({handler, preview, imageSubmit, previewState}) => {

  const [selectedImage, setSelectedImage] = useState('');

  return (
    <>
        <Form>
        <FormGroup text='Upload a photo of your creation!'>
          <Input
            className='choose-file'
            type="file"
            name="image"
            onChange={handler.bind(this)}
            value={selectedImage}
            />
        </FormGroup>
        <div className='d-flex flex-column align-items-center'>
        {preview && (

          <img
          src={previewState}
          alt=''
          className='img-fluid rounded mx-0'
          />

          )}
          {previewState && (
          <button className='btn btn-primary btn-sm mt-1' type='button' onClick={imageSubmit.bind(this)}>
            Upload Image
          </button>
          )}
          </div>
      </Form>
    </>
  )
}

export default ImageUpload
