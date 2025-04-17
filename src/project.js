import toDoItem from "./toDoTask.js";

export default class Project {
    constructor(name, toDoList = []){
        this._name = name;
        this._toDoList = toDoList;
    } 

    set name(name){
        this._name = name;
    }

    get name() {
        return this._name;
    }

    get toDoList() {
        return this._toDoList;
    }

    set toDoList(arr) {
        this._toDoList = arr;
    }

    deleteToDo(toDoItem) {
        const index = this._toDoList.findIndex((element) => {
            return element === toDoItem ;
       })
       this._toDoList.splice(index, 1); 
    }
    addToDo(name, priority, date, disc) {
        const toDo = new toDoItem(name, priority, date, disc);
        
        for(let i = 0; i < this._toDoList.length; i++) {
            if(toDo.dueDate <= this._toDoList[i].dueDate) {
                this._toDoList.splice(i, 0, toDo);
                return;
            }
        }

        // Triggers if it's the oldest date 
        this._toDoList.push(toDo);
    }

    static fromJSON(obj) {
        return new Project(obj._name, obj._toDoList);
    }
}
