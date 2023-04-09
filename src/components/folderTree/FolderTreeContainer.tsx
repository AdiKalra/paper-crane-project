import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// CSS
import './FolderTreeContainer.css';

// Components
import FolderTree from './FolderTree';

function FolderTreeContainer() {

    const [tree, setTree] = useState([]);
  
    // Dummy data
    // id: 
    const updateFolderTree = () => {
      axios.get('http://localhost:8080/getFolderStructure')
           .then(response => {
              setTree(response.data);
           })
           .catch(error => {
              console.log(error);
            })
    };
  
    // Initialize the folder structure
    useEffect( () => {
      updateFolderTree();
  }, []);
  
    return (
      <div className="FolderTreeContainer">
        <FolderTree 
        // style wasn't here at first, due to TS complained, created null style
          style={null}
          tree={tree}
          updateFolderTree={updateFolderTree}
        />
      </div>
    );
  }

  FolderTreeContainer.propTypes = {
    style: PropTypes.object,
    tree: PropTypes.array,
    updateFolderTree: PropTypes.func
  };

export default FolderTreeContainer;