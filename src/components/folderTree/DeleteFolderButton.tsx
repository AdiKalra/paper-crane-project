import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Icons
import DeleteFolderIcon from './Icons/Deletefolder.svg';

const deleteFolder = {
    width: '25px',
    height: '25px'
};

const DeleteFolderButton = ( {name, folderPath, updateFolderTree}) =>
{
    const handleClick = () => {
        if(window.confirm(`Are you sure you want to delete the "${name}" folder and ALL of it's contents?`)) {
            const formData = new FormData();

            formData.append("folderPath", folderPath);
    
            axios.delete("http://localhost:8080/deleteFolder", { data: formData })
                 .then(response => {
                    console.log(response.data);
                    updateFolderTree();
                 })
                 .catch(error => {
                    console.log(error);
                 })
        }
    }

    return (
        <img style={deleteFolder} src={DeleteFolderIcon} alt="Delete Folder Button" onClick={handleClick}/>
    )
};

DeleteFolderButton.propTypes = {
    name: PropTypes.string.isRequired,
    folderPath: PropTypes.string.isRequired,
    updateFolderTree: PropTypes.func.isRequired,
  };

export default DeleteFolderButton;