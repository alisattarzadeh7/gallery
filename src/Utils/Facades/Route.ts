import RouteBuilder from "~/src/Utils/Builders/RouteBuilder";

const Route = {
    Home:new RouteBuilder('/',{name:'home'}),
    Image:new RouteBuilder<{id:string}>('/Image/[id]',{name:'image'}),
    Login:new RouteBuilder<{id:string}>('/session/login',{name:'login'}),
}


export default Route