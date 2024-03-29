import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';
import { request } from '../httpRequest';
import { ColorRing } from 'react-loader-spinner'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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
const isValidPhoneNumber = (phoneNumber) => {
  // Allow digits, spaces, and hyphens, and check if there are at least 10 digits.
  const phoneRegex = /^[\d\s-]{10,}$/;
  // Test the input phone number against the regex pattern.
  return phoneRegex.test(phoneNumber);
};

const isValidEmail = (email) => {
  // Define a regular expression pattern for a valid email address.
  const emailRegex = (/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/);

  // Test the input email against the regex pattern.
  return emailRegex.test(email);
};

const Apply = ({ isOpen, onClose, title, uid, userName, selectedSkills, projectId }) => {
  const [emailAddressInput, setEmailAddressInput] = useState('');
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [finishedApply, setfinishedApply] = useState(true)
  const [applyIsValid, setApplyIsValid] = useState(true)
  const [showAlert, setShowAlert] = useState(false);


  const handleEmailAddressChange = (e) => {
    setEmailAddressInput(e.target.value)
  }

  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value;
    setPhoneNumberInput(e.target.value);
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setResumeFile(selectedFile);
    }
  };

  const handleDelete = () => {
    setResumeFile(null);
  };

  const handleDiscard = () => {
    isOpen = false;
    setEmailAddressInput('');
    setPhoneNumberInput('');
    setResumeFile(null);
    onClose(false);
  }
  const checkApplyIsValid = () => {
    if (isValidEmail(emailAddressInput) && isValidPhoneNumber(phoneNumberInput) && (resumeFile != null)) {
      return true
    }
    return false
  }
  const handleApply = async () => {
    if (checkApplyIsValid()) {
      setShowAlert(false)
      setfinishedApply(false)
      uploadResumeToStorage();
    }
    else {
      setShowAlert(true)
    }
  }

  const submitApplyToDB = async (url) => {
    const apply = {
      uid: uid,
      userName: userName,
      pid: projectId,
      ptitle: title,
      selectedSkills: selectedSkills,
      email: emailAddressInput,
      phone: phoneNumberInput,
      resumeURL: url
    }
    await request.sendApplyToDB(apply)
    setfinishedApply(true)
    onClose(true)
  }

  const uploadResumeToStorage = () => {
    const storageRef = ref(storage, `${resumeFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, resumeFile);
    uploadTask.on(
      "state_changed", null,
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          submitApplyToDB(url)
        });
      }
    );
  }


  return (
    <Dialog open={isOpen}>
      <DialogTitle>Apply to {title}</DialogTitle>
      <DialogContent>
        <TextField className='email-text'
          type="text"
          placeholder="Enter email address"
          value={emailAddressInput}
          onChange={handleEmailAddressChange}
          margin="dense"
          id="name"
          label="Enter email address"
          fullWidth
          variant="outlined"
          error={
            emailAddressInput.trim() !== '' && !isValidEmail(emailAddressInput)
          }
          helperText={
            emailAddressInput.trim() !== '' && !isValidEmail(emailAddressInput)
              ? 'Invalid email address'
              : ''
          }
        />
        <TextField className='phone-number'
          type="text"
          placeholder="Enter phone number"
          value={phoneNumberInput}
          onChange={handlePhoneNumberChange}
          margin="dense"
          id="name"
          label="Enter phone number"
          fullWidth
          variant="outlined"
          error={
            phoneNumberInput.trim() !== '' && !isValidPhoneNumber(phoneNumberInput)
          }
          helperText={
            phoneNumberInput.trim() !== '' && !isValidPhoneNumber(phoneNumberInput)
              ? 'Invalid phone number'
              : ''
          }
        />
        {showAlert && (
          <Alert severity="error" sx={{ marginTop: 1 }} onClose={() => setShowAlert(false)}>
            <AlertTitle>Error</AlertTitle>
            Please fill all fields correctly!
          </Alert>
        )}
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={() => document.getElementById('fileInput').click()} variant="contained">Upload Resume
            <VisuallyHiddenInput id="fileInput" type="file" accept=".pdf, .doc, .docx" onChange={handleFileChange} />
          </Button>
        </DialogActions>
        {resumeFile ? (
          <Stack direction="row" flexWrap="wrap" marginTop={1} >
            <Chip label={resumeFile.name} color="primary" variant="outlined" marginTop={2} onDelete={() => handleDelete(resumeFile)} />
          </Stack>
        ) : (
          <p>No selected file.</p>
        )}
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <Button variant="outlined" spacing={1} style={{ fontWeight: 'bold' }} onClick={handleDiscard}>Discard</Button>
          {finishedApply ?
            <Button variant="contained" onClick={handleApply} >Save</Button> :
            <ColorRing
              visible={true}
              height="60"
              width="60"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue']}
            />}
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default Apply
