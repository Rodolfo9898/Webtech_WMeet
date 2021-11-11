import { ObjectID } from "bson";

export class User {
    // this needs to be expandable to school who do not have enrollment numbers
    id: ObjectID;
    firstname: string;
    lastname: string;
    school: string;
    email: string;

    constructor(id: ObjectID, firstname:string, lastname:string, school:string, email:string){
        this.id = id, 
        this.firstname = firstname,
        this.lastname = lastname,
        this.school = school,
        this.email = email
    }
}