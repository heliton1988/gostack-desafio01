const express = require('express');

// initiating the express
const server = express();

// adding plugin to use JSON in aplication
server.use(express.json());


// Global middleware
server.use((req, res, next) => {
  console.count('Total request: ');

  return next();
});

// middleware to verify if a project exist
function checkProjectExist(req, res, next) {
  if (!projects[req.params.id]) {
    return res.status(400).json({ error: 'Project does not exist!' });
  }

  return next();
}

const projects = [];

// route to list every project
server.get('/projects', (req, res) => {
  res.json(projects);
});

// route to create a new project
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({ 
    id,
    title,
    tasks: []
  });

  return res.json(projects);
});

// route to add one task in a specific project
server.post('/projects/:id/tasks', checkProjectExist,(req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].tasks.push(title);

  return res.json(projects);
});

// route to alter one project
server.put('/projects/:id', checkProjectExist,(req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].title = title;

  return res.json(projects);
});

// route to delete a specific project
server.delete('/projects/:id', checkProjectExist,(req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.send();
});

server.listen(3000);