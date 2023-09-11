import React from 'react' 
import SearchOffIcon from '@mui/icons-material/SearchOff';

const NoResult = () => {
  return (
    <div className='no-result'>
     <h1 className='header'>No Result Found  <SearchOffIcon fontSize='50px'/></h1> 
    </div>
  )
}

export default NoResult
