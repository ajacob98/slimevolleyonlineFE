export class Config{
    static env;
    static url;
    static initialize(){
        if(window.location.href.includes("localhost")){
            Config.env="local"
            Config.url="localhost"
        }
        else{
            Config.env="prod"
            Config.url="www.slimevolleyonline.com"
        }
            
    }
}