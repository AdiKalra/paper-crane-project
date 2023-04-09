/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';

import './projectrow.css';

interface ProjectRowPropType {
  id: Number;
  title: string;
  description: string;
  estimatedHours: number;
  currentWorkedHours: number;
}
export default function ProjectRow({
  id,
  title,
  description,
  estimatedHours,
  currentWorkedHours,
}: ProjectRowPropType) {
  const getProgress = () => {
    const progress = Math.floor((currentWorkedHours / estimatedHours) * 100);
    return progress;
  };
  return (
    <div className='row'>
      <Link to={`/admin/project/${id}`}>{title}</Link>
      <p>{description}</p>
      <div className='progressbar'>
        <CircularProgressbar value={getProgress()} text={`${getProgress()}%`} />
      </div>
    </div>
  );
}
