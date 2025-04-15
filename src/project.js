import toDoItem from "./createToDo.js";

export default class Project {
    constructor(name){
        this._name = name;
        this._toDoList = [];
    } 

    set name(name){
        this._name = name;
    }

    get name() {
        return this._name;
    }

    deleteToDo(toDoItem) {
        const index = this.toDoList.findIndex((element) => {
            return element == toDoItem ;
       })
       return this.toDoList.splice(1, index, toDoItem); 
    }
    addToDo(name, date, prio, disc) {
        const toDo = new toDoItem(name, date, prio, disc);
        console.log(toDo);
        return this._toDoList.push(toDo);
    }
}
