export default function render(ProjectList) {
    // Render projectList 
    const projListDOM = document.querySelector(".project-list");
    ProjectList.projList.forEach((proj) => {
        const listItem = document.createElement("li")
        const projButton = document.createElement("button");
        projButton.textContent = `${proj.name}`;
        
        listItem.append(projButton);
        projListDOM.append(listItem);
    });

    //Render Selected project's to do list
    const upcoming = document.querySelector(".upcoming-list");
    const remaining = document.querySelector(".remaining-list");
    let currProj = ProjectList.currProj.toDoList;
    currProj.forEach((toDoItem) => {
        const itemToAdd = document.createElement("div");
        itemToAdd.textContent = toDoItem.name;

        upcoming.append(itemToAdd);
    })
}