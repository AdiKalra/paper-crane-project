import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Icons
import AddFolderIcon from './Icons/Addfolder.svg';

const addFolder = {
    width: '25px',
    height: '25px'
};

const AddFolderButton = ( {folderPath, updateFolderTree}) =>
{
    const handleClick = () => {
        const formData = new FormData();
        formData.append("folderPath", folderPath);

        axios.post("http://localhost:8080/createFolder", formData)
             .then(response => {
                console.log(response.data);
                updateFolderTree();
             })
             .catch(error => {
                console.log(error);
             })
    }

    return (
        <img style={addFolder} src={AddFolderIcon} alt="Add Folder Button" onClick={handleClick}/>
    )
};

AddFolderButton.propTypes = {
    folderPath: PropTypes.string.isRequired,
    updateFolderTree: PropTypes.func.isRequired
  };

export default AddFolderButton;