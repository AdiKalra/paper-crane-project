import React, { useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Icons
import AddFileIcon from './Icons/Addfile.svg';

const addFile = {
    width: '25px',
    height: '25px'
};

const FileInput = ( {folderPath, updateFolderTree} ) =>
{
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = async (event) =>
    {
        const file = event.target.files[0];

        const formData = new FormData();

        formData.append("file", file);
        formData.append("folderPath", folderPath)

        axios.post('http://localhost:8080/uploadFile', formData)
             .then(response => {
                console.log(response.data);
                updateFolderTree(response.data);
             })
             .catch(error => {
                console.log(error);
                
                // If the file already exists warn the user before overwriting the file
                if (error.response.status === 409)
                {
                    let overwrite = window.confirm("A file with the same name already exists. Do you want to continue?");
                    if (overwrite) {
                        formData.append("overwrite", "true");
                        axios.post('/uploadFile', formData)
                             .then(response => {
                                console.log(response.data);
                                updateFolderTree(response.data);
                             })
                             .catch(error => {
                                console.log("inside the overwrite");
                                console.log(error);
                             })
                    }
                }
             });
    }

    return (
        <span>
            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleChange}
            />
            <img style={addFile} src={AddFileIcon} alt="Add File Button" onMouseDown={handleClick}/>
            
        </span>
    );
};

FileInput.propTypes = {
    folderPath: PropTypes.string.isRequired,
    updateFolderTree: PropTypes.func.isRequired,
  };

export default FileInput;