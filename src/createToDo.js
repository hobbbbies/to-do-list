export default function createToDo (proj) {
    class listItem {
        constructor(name, priority, dueDate, dest, disc) {
            this.name = name;
            this.priority = priority;
            this.dueDate = dueDate;
            this.dest = dest;
            this.dics = disc;
        }
    }

    function addToDo (project, listItem) {
        project[listItem.dest] = listItem;
    }
}