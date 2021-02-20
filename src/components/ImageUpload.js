import React, { useState } from "react";
import { Button, Typography, Backdrop, CircularProgress } from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles'
// CSS
import "../css/components/ImageUpload.css";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  block: {
    display: "block",
  },
  imagePreview:{
    display: "block",
    height: '300px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));



const ImageUpload = ({ handleUploadedImage }) => {
  const classes = useStyles()
  const [selectedImage, setSelectedImage] = useState("");
  // *** State for image uploader ***
  const [previewSelection, setPreviewSelection] = useState("");
  const [loading, setLoading] = useState(false);

  // *** Functions for image uploader ***
  const handleImageChange = (e) => {
    //sets image state to file selected by user
    const imageFile = e.target.files[0];
    previewImageFile(imageFile);
  };

  // previews the selected image
  const previewImageFile = (imageFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => {
      setPreviewSelection(reader.result);
    };
  };

  const handleSubmitImage = (e) => {
    e.preventDefault();
    if (!previewSelection) return;
    uploadImage(previewSelection);
  };

  const uploadImage = async (image) => {
    setLoading(true);
    const url = "https://api.cloudinary.com/v1_1/sfx818fetchapp/image/upload/";
    const preset = "nl04th0n";
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    try {
      const res = await axios.post(url, formData);
      setLoading(false);
      const imageUrl = res.data.secure_url;
      handleUploadedImage(imageUrl);
    } catch (err) {
      console.error("ERROR HAPPENING", err);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant={'h4'} className={classes.block}> Step 1: Upload a picture of your creation! </Typography>
      <form className={classes.root}>
        <Button  variant="contained" component="label" disabled={loading}>
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
            alt="preview"

            className={classes.imagePreview}
          />
        )}
        {previewSelection && (
          <Button
            className={classes.block}
            variant="contained"
            type="button"
            onClick={handleSubmitImage}
            disabled={loading}
          >
            Upload Image
          </Button>

        )}
        {loading && (<Backdrop className={classes.backdrop} open={loading} >
<CircularProgress color="inherit" />
</Backdrop>)}
      </form>
    </div>
  );
};

export default ImageUpload;
