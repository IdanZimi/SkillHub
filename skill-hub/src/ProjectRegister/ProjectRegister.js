
import React, { useState } from 'react';
// import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import CloseRounded from '@mui/icons-material/CloseRounded';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { styled } from '@mui/material';


const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function ProjectRegister({ isOpen, onClose }) {
  const [open, setOpen] = React.useState(false);
  const [projectName, setProjectName] = useState('');
  const [positionInput, setPositionInput] = useState('');
  const [positionName, setPositionName] = useState([]);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handlePositionNameChange = (e) => {
    setPositionInput(e.target.value);
  };
  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImageFile(selectedImage);
    }
  };

  const handleDeleteImage = () =>{
    setImageFile(null);
  }

  //   const handleClose = () => {
  //     setOpen(false);
  //  };
  const handleAddCircleClick = () => {
    if (positionInput.trim() !== '') {
      setPositionName([...positionName, positionInput]);
      setPositionInput('');
    }
    console.log(positionName)
  };

  // React.useEffect(() => {
  //   console.log(positionName);
  // }, [positionName]);

  const handleSubmit = () => {
    //debugger;
    // Check if projectName and projectDescription are empty
    if (!projectName.trim() || !description.trim()) {
        setShowAlert(true);
      return; // Exit the function
    }

    const newProject = {
      uid: localStorage.getItem("uid"),
      image: imageFile ? URL.createObjectURL(imageFile): '',
      title: projectName,
      description: description,
      positionName: positionName,
    };
    onClose(newProject);
  };

  const handleClose = () => {
    setProjectName('');
    setDescription('');
    setOpen(false);
    onClose();
  };

 
    const handleDelete = (positionIndex) => {
      const updatedPositions = positionName.filter((_, index) => index !== positionIndex);
      setPositionName(updatedPositions);
    };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField className='project-name-text'
            type="text"
            placeholder="Enter Project Name"
            value={projectName}
            onChange={handleProjectNameChange}
            margin="dense"
            id="name"
            label="Enter Project Name"
            fullWidth
            variant="standard"
          />
          <TextField
            placeholder="Project Description"
            value={description}
            onChange={handleDescriptionChange}
            autoFocus
            margin="dense"
            id="name"
            label="Enter Project Description"
            type="email"
            fullWidth
            variant="standard"
          />
<DialogActions style={{ justifyContent: 'center' }}>
        <Button onClick={() => document.getElementById('fileInput').click()} variant="contained">Upload Image
        <VisuallyHiddenInput id="fileInput"  type="file" onChange={handleImageChange} />   
         </Button>
        </DialogActions>
        {imageFile ? (
  <Stack direction="row" flexWrap="wrap" marginTop={1} >
    <Chip label={imageFile.name} color="primary" variant="outlined" marginTop={2} onDelete={() => handleDeleteImage(imageFile)} />
  </Stack>
) : (
  <p>No selected file.</p>
)}
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <TextField className='project-name-text'
            type="text"
            placeholder="Position Needed"
            value={positionInput}
            onChange={handlePositionNameChange}
            margin="dense"
            id="name"
            // label="Enter Positions Required"
            fullWidth
            variant="standard"
          />
                   <IconButton color="primary" onClick={handleAddCircleClick}>
            <Icon>add_circle</Icon>
          </IconButton>
          </div>
       <Stack direction="row" spacing={1}>
            {positionName.map((position, index) => (
              <Chip key={index} label={position} onDelete={() => handleDelete(index)} />
              
            ))}
            </Stack>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          {showAlert && ( // Conditionally render the alert based on showAlert state
            <Alert severity="error" sx={{marginTop:1}} onClose={() => setShowAlert(false) }>
              <AlertTitle>Error</AlertTitle>
              Please enter a project name and description.
            </Alert>
          )}
 
        </DialogContent>
        <DialogActions>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
