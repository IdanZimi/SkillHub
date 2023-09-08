import "./Project.css";
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import img from '../static/images/projectImage.jpg'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Dialog, DialogTitle } from "@mui/material";
import Apply from "./Apply";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { showNotification } from "../utils/utils";
import backgroundImage from '../static/images/backgroundCard.jpg';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Project = ({ imageUrl, title, description, positionName, id }) => {
  const imageURL = imageUrl ? imageUrl : img
  const [cvFiles, setCVFiles] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedChips, setSelectedChips] = useState([]);
  const [positionChips, setPositionChips] = useState([])
  const [showAlert, setShowAlert] = useState(false);
  const [uid, setuid] = useState('')

  useEffect(() => {
    setuid(localStorage.getItem('uid'))
  }, [])

  useEffect(() => {
    // Create an array of chip objects with the initial "outlined" variant
    const positionChips = positionName.map((name) => ({
      label: name,
      variant: 'outlined',
    }));

    setPositionChips(positionChips);
    setSelectedChips([])
  }, [positionName]);

  const handleChipClick = (label) => {
    setSelectedChips((prevSelectedChips) => {
      const existingChip = prevSelectedChips.find((chip) => chip.label === label);

      if (existingChip) {
        positionChips.find((chip) => chip.label === existingChip.label).variant = 'outlined'
        const filteredChips = prevSelectedChips.filter((chip) => chip.label !== label);
        return filteredChips
      } else {
        positionChips.find((chip) => chip.label === label).variant = 'filled'
        setShowAlert(false)
        const newSelectedChips = [...prevSelectedChips, { label, variant: 'filled' }];
        console.log(newSelectedChips)
        return newSelectedChips
      }
    });
  };


  const [isLike, setIsLike] = useState(false);
  //console.log(positionName);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    //console.log(positionName)
  };

  const handleDeleteProject = () => {

  }
  const handleCVFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCVFiles(file);
    }
  };
  const onClose = () =>{
    setIsApplyOpen(false)
    showNotification("info", "Success!", `Congratulations! Apply has been sent to the project admin`)
  }

  const handleApplyClick = (e) => {
    console.log(selectedChips.length)
    if (selectedChips.length === 0) {
      console.log("length is " + selectedChips.length)
      setShowAlert(true);
      return; // Exit the function
    }
    setIsApplyOpen(true);
  }

  const handleIsLikeClick = () => {
    setIsLike(!isLike); // Toggle favorite status
  };
  return (
    <Card raised className="project-body"
    sx={{
      maxWidth: 350,
//      backgroundImage: '..\static\images\backgroundCard.jpg',
      // maxHeight: 350,
      // margin: "0 auto",
      //overflow: 'hidden',
      // maxHeight: expanded ? 'none' : '20rem',
      padding: "0.1em"
    }}>  

      <CardHeader className="project-name"
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          </Avatar>
        }
        title={title}
      />
      <CardMedia
        component="img"
        height="150"
        src={imageURL}
        alt="Project Image"
        sx={{ objectFit: "contain" }}
      />
      <CardContent className="project-description">
        <Typography variant="h6">
          {description} {/* Use the description prop */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleIsLikeClick}>
          <FavoriteIcon color={isLike ? "error" : "inherit"} />
        </IconButton>
        <DeleteOutlinedIcon onClick={handleDeleteProject} />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h7" color="text" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
            Suggested positions
            {positionName && positionName.length > 0 ? (
              <Stack direction="row" flexWrap="wrap" marginTop={1} gap={1}>
                {positionChips.map((position, index) => (
                  <Chip key={index} label={position.label} color="primary" variant={position.variant} onClick={() => handleChipClick(position.label)} marginTop={2} />
                ))}
              </Stack>
            ) : (
              <p>No positions available.</p>
            )}
          </Typography>
          {showAlert && ( // Conditionally render the alert based on showAlert state
            <Alert severity="error" sx={{ marginTop: 1 }} onClose={() => setShowAlert(false)}>
              <AlertTitle>Error</AlertTitle>
              Please pick at least 1 skill
            </Alert>
          )}
          <Typography paragraph style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Chip className="apply-btn" label="Apply" color="primary" onClick={handleApplyClick} style={{ margin: '1rem 0' }} />
            {isApplyOpen && (
              <Apply
                uid={uid}
                userName={localStorage.getItem("name")}
                selectedSkills={selectedChips.map((chip)=>{return chip.label})}
                projectId={id}
                isOpen={isApplyOpen}
                title={title}
                onClose={onClose} />
            )}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Project;
