import {Request} from "~/src/Utils/Facades/Request";


export default class UserController{

    static async login(data:{identifier:string, password:string}){
        return  await Request.call({url:'http://localhost:1337/api/auth/local',method:'POST',data})
    }

}