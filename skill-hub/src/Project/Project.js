import "./Project.css";
import React, { useState } from 'react';
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

const Project = ({ imageUrl, title, description, positionName }) => {
  const imageURL = imageUrl ? imageUrl : img
  const [cvFiles, setCVFiles] = useState(null);
  const [expanded, setExpanded] = useState(false);
  //console.log(positionName);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    //console.log(positionName)
  };

  const handleDeleteProject = ()=>{

  }
  const handleCVFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCVFiles(file);
    }
  };

  return (
    <Card raised 
    sx={{
      maxWidth: 350,
      //maxHeight: 300,
      //margin: "0 auto",
      //padding: "0.1em",
    }}>
      <CardHeader className="project-name"
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={title}
      />
      <CardMedia
        component="img"
        height="150"
        src = {imageURL}
        alt="Project Image"
        sx={{  objectFit: "contain" }}
      />
      <CardContent className="project-description">
        <Typography variant="body2" color="text.secondary">
          {description} {/* Use the description prop */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color={"error"} />
        </IconButton>
        <DeleteOutlinedIcon onClick={handleDeleteProject}/>
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
          <Typography variant="body2" color="text.secondary">
            Positions:
            {positionName && positionName.length > 0 ? (
              <ul>
                {positionName.map((position, index) => (
                  <li key={index}>{position}</li>
                ))}
              </ul>
            ) : (
              <p>No positions available.</p>
            )}
          </Typography>
          <Typography paragraph>

            <div className="file-input-wrapper">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleCVFileChange(e)}
                className="custom-file-input"
              />

              {/* You can add other elements inside the wrapper as well */}
            </div>
          </Typography>
          <Typography paragraph>

          </Typography>
          <Typography>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Project;
