import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Components
import DeleteFileButton from './DeleteFileButton';
import DownloadButton from './DownloadButton';

// Icons
import EditIcon from './Icons/Edit.svg';
import fileIcon from './Icons/file.svg';


const IconStyle = {
    width: '20px',
    height: '20px'
};

function File( {name, folderPath, updateFolderTree} ) {
    const [isHovered, setIsHovered] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Enter') {
            setEditingName(false);

            const formData = new FormData();
            formData.append("filePath", folderPath + "/" + name);
            formData.append("newName", newName);

            axios.put('/renameFile', formData)
                 .then(response => {
                    console.log(response.data);
                 })
                 .catch(error => {
                    console.log(error);
                 })
            
            updateFolderTree();
        } else if (event.key === 'Escape') {
            setEditingName(false);
        }
    }, [name, folderPath, updateFolderTree, newName]);

    useEffect( () => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleEditClick = () => {
        setEditingName(true);
    }

    return <div
        onMouseEnter={() => {setIsHovered(true)}}
        onMouseLeave={() => {setIsHovered(false)}}
    >
        &nbsp;&nbsp;&nbsp;
        <img style={IconStyle} src={fileIcon} alt="file icon"/>
        {editingName ? (
                <input type="text" value={newName} onChange={handleNameChange} onKeyDown={handleKeyDown} />
            ) : (
            <span>{name}</span>
            )}
            { isHovered && 
            <>
                <DeleteFileButton
                    name={name}
                    folderPath={folderPath}
                    updateFolderTree={updateFolderTree}
                />
                <img style={IconStyle} src={EditIcon} alt="Edit Icon" onClick={handleEditClick}/>
                <DownloadButton name={name} folderPath={folderPath} />
            </>
            }
    </div>;
}

File.propTypes = {
    name: PropTypes.string.isRequired,
    folderPath: PropTypes.string.isRequired,
    updateFolderTree: PropTypes.func.isRequired,
};


export default File;