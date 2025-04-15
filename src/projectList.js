import Project from "./project.js"

export default class ProjectList {
   constructor () {
        this._projList = [new Project("Default")];
        this._currProj = this._projList[0];
     }

     set currProj(name){
          this._currProj = this.retrieveProj(name);
     }
     get currProj(){
          return this._currProj;
     }
     get projList(){
          return this._projList;
     }

     retrieveProj(name){
          const proj = this._projList.find((element) => {
               return element.name == name;
          })
          return proj;
     }
     deletProj(proj){
          const index = this._projList.findIndex((element) => {
               return element == proj ;
          })

          return this._projList.splice(1, index, proj); 
     }
     addProj(name){
          const newProj = new Project(name);
          return this._projList.push(newProj);
    x}

}