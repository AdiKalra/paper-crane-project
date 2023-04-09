import trainingImg from '../assets/training.jpeg';

// Each video has two types project & emp OR project & client
// that means admins can set up a video for only client in a project, or only for employees
// who are working on the project
export const projectsVideoData = [
  {
    title: 'Demo front-end and design for project1',
    projectId: 1,
    link: 'https://youtube.com/#1',
    cover: trainingImg,
    type: ['project', 'emp'],
    visible: true,
    description: 'This video is for project1',
  },
  {
    title: 'Demo web application for project2',
    projectId: 2,
    link: 'https://youtube.com/#2',
    cover: trainingImg,
    type: ['project', 'client'],
    visible: true,
    description: 'This video is for project2',
  },
  {
    title: 'Demo web application and design for project3',
    projectId: 3,
    link: 'https://youtube.com/#3',
    cover: trainingImg,
    type: ['project', 'client'],
    visible: true,
    description: 'This video is for project3',
  },
  {
    title: 'Demo front-end and design for project4',
    projectId: 4,
    link: 'https://youtube.com/#4',
    cover: trainingImg,
    type: ['project', 'emp'],
    visible: true,
    description: 'This video is for project4',
  },
];
