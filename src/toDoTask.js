export default class toDoTask {
    constructor(name, priority, dueDate, disc) {
        this._name = name;
        this._priority = priority;
        this._dueDate = dueDate;
        this._disc = disc;
    }

    get name(){
        return this._name;
    }

    get priority(){
        return this._priority
    }

    get dueDate() {
        return this._dueDate;
      }
      
    get disc() {
        return this._disc;
    }

    static fromJSON(obj) {
        return new toDoTask(obj._name, obj._priority, obj._dueDate, obj._disc);
    }
}