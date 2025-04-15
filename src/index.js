import ProjectList from "./projectList.js";
import Render from "./render.js"
import "./styles.css";

const myProjects = new ProjectList();
myProjects.currProj.addToDo("Test", "Today", "High", "I don't even know bruh");

Render(myProjects);

