const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const reposiroty = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(reposiroty)

  return response.json(reposiroty)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).send();
  }

  const repository = {
    id,
    url,
    title,
    techs,
    likes: 0
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id)

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (!repository) {
    return response.status(400).send()
  }

  repositories[repositoryIndex] = repositories.splice(repositoryIndex,1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const reposiroty = repositories.find(reposiroty => reposiroty.id === id)

  if(!reposiroty) {
    return response.status(400).send();
  }

  reposiroty.likes +=1;

  return response.json(reposiroty)
});

module.exports = app;
