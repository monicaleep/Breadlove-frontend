import React, {useState} from 'react'
import Form from 'react-validation/build/form'
import {Button, Typography} from '@material-ui/core'

// CSS
import '../css/components/ImageUpload.css'
import axios from 'axios'

const ImageUpload = ({handleUploadedImage}) => {

  const [selectedImage, setSelectedImage] = useState('');
  // *** State for image uploader ***
  const [previewSelection, setPreviewSelection] = useState('')
  const [loading, setLoading] = useState(false)


  // *** Functions for image uploader ***
    const handleImageChange = e => {
      //sets image state to file selected by user
      const imageFile = e.target.files[0]
      previewImageFile(imageFile)
    }

    // previews the selected image
    const previewImageFile = (imageFile) => {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.onloadend = () => {
        setPreviewSelection(reader.result)
      }
    }

    const handleSubmitImage = (e) => {
      e.preventDefault()
      if (!previewSelection) return
      uploadImage(previewSelection)
    }


    const uploadImage = async (image) => {
      setLoading(true)
      const url= 'https://api.cloudinary.com/v1_1/sfx818fetchapp/image/upload/'
      const preset = 'nl04th0n'
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', preset)
      try {
        const res = await axios.post(url, formData);
        setLoading(false)
        const imageUrl = res.data.secure_url;
        handleUploadedImage(imageUrl)
      } catch (err) {
        console.error('ERROR HAPPENING', err);
      }
  }

  return (
      <>
      <Typography> Step 1: Upload a picture of your creation! </Typography>
        <Form>
        <Button
           variant="contained"
           component="label"
           disabled={loading}
         >
           Select File
           <input
             type="file"
             hidden
             onChange={handleImageChange}
             value={selectedImage}
           />
         </Button>


        {previewSelection && (
          <img
          src={previewSelection}
          alt='preview'
          className='img-fluid rounded mx-0'
          />
          )}
          {previewSelection && (
          <Button variant='contained' type='button' onClick={handleSubmitImage} disabled={loading}>
            Upload Image
          </Button>
          )}

      </Form>
    </>
  )
}

export default ImageUpload
