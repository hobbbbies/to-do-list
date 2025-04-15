export default class Projects {
   constructor () {
        this.projList = ["one", "two", "three"];
   }

   deletProj(project){
          console.log(this.projList);
          const index = this.projList.findIndex((element) => {
               element == project;
          })
          console.log(this.projList);
          return this.projList.splice(1, index, project);
   }
   addProj(project){
          return this.projList.push(project);
   }

}