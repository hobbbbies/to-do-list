
export default function render(ProjectList) {
    /*
        All the dom elements we need for  rendering the popup modal
    */
    const addTaskBtn = document.querySelector("#add-task");
    const taskDialog = document.querySelector("#task-dialog");
    const taskForm = taskDialog.querySelector(".form")
    const submitTaskBtn =  taskDialog.querySelector(".submit-btn");

    const addProjButton = document.querySelector("#add-proj")
    const projectDialog = document.querySelector("#project-dialog");
    const projectForm = projectDialog.querySelector(".form")
    const submitProjButton = projectDialog.querySelector(".submit-btn");
    
    let currProj = ProjectList.currProj
    let currProjList = currProj.toDoList;

    /*
        Function to read form input from modals
            -Shared by both functions
    */
    const submitModal = (event, form) => {
        event.preventDefault();
        const formData = new FormData(form)
        const iterator = formData.entries();
        const arr = [];

        let i = 0;
        let key;
        while(!(key = iterator.next()).done){
            arr[i] = key.value[1];
            i++;
        }
        return arr;
    } 

    /* 
        Event listeners for both + buttons 
    */
    addProjButton.addEventListener('click', () => {
        projectDialog.showModal();
    })

    addTaskBtn.addEventListener('click', () => {
        taskDialog.showModal();
    });


    /* 
        Functions to implement submitModal function for both projects and tasks
    */
    submitProjButton.addEventListener('click', (event) =>{
        const name = submitModal(event, projectForm)[0];
        ProjectList.addProj(name);
        localStorage.setItem("myProjects", JSON.stringify(ProjectList));
        projectDialog.close();
        renderProjects();
    });
    
    submitTaskBtn.addEventListener('click', (event) =>{
        const arr = submitModal(event, taskForm);
        currProj.addToDo(arr[0], arr[1], arr[2], arr[3]);
        localStorage.setItem("myProjects", JSON.stringify(ProjectList));
        taskDialog.close();
        renderToDo();
     });
 

    /*
        Handles event listener for clicking on a new project
        Switches current project and renders display again for that projects tasks
    */
    const projButtonClick = (event) => {
        ProjectList.currProj = event.target.textContent;
        currProj = ProjectList.currProj
        currProjList = currProj.toDoList;

        renderToDo();
   }

    // Render projectList
    const renderProjects = () => {
        const projListDOM = document.querySelector(".project-list");
        projListDOM.textContent = "";
        ProjectList.projList.forEach((proj) => {
            const listItem = document.createElement("li")
            const projButton = document.createElement("button");
            projButton.classList.add("proj-button");
            projButton.classList.add("quicksand");
            projButton.textContent = `${proj.name}`;
    
            projButton.addEventListener('click', projButtonClick);
            
            listItem.append(projButton);
            projListDOM.append(listItem);
        });
    }
    
    //Render Selected project's to do list
    const renderToDo = () => {
        const upcoming = document.querySelector("#upcoming-list");
        const remaining = document.querySelector("#remaining-list");
        const missed = document.querySelector("#missed-list")
        const taskHeading = document.querySelector("#task-heading");
        taskHeading.textContent = `TO DO - ${currProj.name}`

        // Clears previous render
        upcoming.textContent = "";
        remaining.textContent = "";
        missed.textContent = "";

        // Displays every task in order of date
        currProjList.forEach((toDoItem) => {
            const boxToAdd = document.createElement("div");
            boxToAdd.classList.add("to-do-item-box");

            const completeBtn = document.createElement("a");
            const btnIcon = document.createElement("i");
            completeBtn.setAttribute("href", "#");
            btnIcon.classList.add("fa-solid", "fa-check");

            completeBtn.addEventListener('click', () => {
                currProj.deleteToDo(toDoItem);
                localStorage.setItem("myProjects", JSON.stringify(ProjectList))
                renderToDo();
            });

            completeBtn.append(btnIcon);

            const nameDiv = document.createElement("div");
            nameDiv.textContent = `Name: ${toDoItem.name}`;

            const priorityDiv = document.createElement("div");
            priorityDiv.textContent = `Priority: ${toDoItem.priority}`;

            const dueDateDiv = document.createElement("div");
            dueDateDiv.textContent = `Due Date: ${toDoItem.dueDate}`;

            const discDiv = document.createElement("div");
            discDiv.textContent = `Description: ${toDoItem.disc}`;

            const itemToAdd = document.createElement("div");
            itemToAdd.classList.add("to-do-item");
            itemToAdd.append(nameDiv, priorityDiv, dueDateDiv, discDiv);

            for(let i = 0; i < itemToAdd.childNodes.length; i++) {itemToAdd.childNodes[i].classList.add("to-do-field", "quicksand")};  
            
            const editBtn = document.createElement("a");
            const editIcon = document.createElement('i');
            editIcon.classList.add("fa-solid", "fa-pencil");
            editBtn.append(editIcon);

            editBtn.addEventListener('click', () => {
                currProj.deleteToDo(toDoItem);
                localStorage.setItem("myProjects", JSON.stringify(ProjectList))

                taskDialog.showModal();
            });

            boxToAdd.append(completeBtn, itemToAdd, editBtn);

            const itemDate = Date.parse(toDoItem.dueDate);
            const currentDate = new Date().getTime();
            const timeDiff = ((itemDate - currentDate) / 1000 / 60 / 60 / 24);

            /* 
                Checks if the task due date is within this week, or if its missed, and assings it to corresponding containerq
            */
            if((timeDiff <= 7 && timeDiff >= 0)) {
                upcoming.append(boxToAdd);
            }
            else if (timeDiff < 0){
                missed.append(boxToAdd);
                dueDateDiv.style.color = "red";
            }
            else {
                remaining.append(boxToAdd);
            }
        })
    }
    renderProjects();
    renderToDo();
    
}