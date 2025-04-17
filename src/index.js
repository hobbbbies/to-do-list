import ProjectList from "./projectList.js";
import Project from "./project.js"
import toDoTask from "./toDoTask.js";
import Render from "./render.js"
import storageAvailable from "./localStorage.js";

import "./styles.css";

let myProjects;
if (storageAvailable("localStorage")) {
    if(localStorage.getItem("myProjects")) {
        const projectLiteral = JSON.parse(localStorage.getItem("myProjects"));
        const revivedProjects = projectLiteral._projList.map((obj) => {
            const newProject = Project.fromJSON(obj);
            newProject.toDoList = newProject.toDoList.map(toDoTask.fromJSON);
            return newProject;
        });
        myProjects = new ProjectList(revivedProjects);        
    }
}

Render(myProjects);

