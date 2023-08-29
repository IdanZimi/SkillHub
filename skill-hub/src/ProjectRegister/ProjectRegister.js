
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


export default function ProjectRegister({ isOpen, onClose }) {
  const [open, setOpen] = React.useState(false);
  const [projectName, setProjectName] = useState('');
  const [positionInput, setPositionInput] = useState('');
  const [positionName, setPositionName] = useState([]);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

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
    const newProject = {
      image: imageFile ? URL.createObjectURL(imageFile): '../static/images/projectImage.jpg',
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
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
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
          <ul>
            {positionName.map((position, index) => (
              <li key={index}>{position}</li>
            ))}
          </ul>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <IconButton color="primary" onClick={handleAddCircleClick}>
            <Icon>add_circle</Icon>
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
