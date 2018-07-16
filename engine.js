// *
// * MODULE CLASS
// *

class Module{
    constructor(title, source){
        this.title = title;
        this.source = source;
        console.log(this.title);
        Engine.loadData("./modules/"+this.source);
    }
}



// *
// * ENGINE CLASS
// *

class Engine{
    constructor(){
        Engine.lessonnumber = 0;
        Engine.createBin("controls", "keyset");        
        Engine.createButton("play", "controls");
        Engine.createButton("stop", "controls");
        Engine.createButton("pause","controls");
        Engine.createButton("previous", "controls");
        Engine.createButton("next", "controls");
        Engine.loadData("playlist.json");
    }

    // *
    // * DATA LOADING / RENDERING
    // *

    static loadData(link){
        var checkExtHTML = new RegExp('.html$');
        var checkExtJSON = new RegExp('.json$');
        var modulerequest = new XMLHttpRequest();
        modulerequest.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                if(checkExtHTML.exec(link)){
                    var ext = new DOMParser().parseFromString(this.responseText, 'text/html');
                    document.getElementById("module").innerHTML = ext.body.innerHTML;

                    //get scripts
                    for(var script of ext.getElementsByTagName("script")){
                        var scr = document.createElement("script");
                        scr.setAttribute("type", "text/javascript");
                        if(script.getAttribute("src")){
                            scr.setAttribute("src", script.getAttribute("src"));
                        }
                        scr.innerHTML = script.innerHTML;
                        document.body.appendChild(scr);
                        console.log("script reloaded.");
                    }
                }
                else if(checkExtJSON.exec(link)){
                    Engine.data = JSON.parse(this.responseText);
                    Engine.renderModule(Engine.data, 0);
                }
                
                //loaded video
                if(document.getElementById("module").getElementsByTagName("video").length > 0){
                    console.log("hi");
                    var vid = document.getElementById("video");
                    vid.onended = function(){
                        alert("Video finished.");
                    }
                }
            }
        }
        modulerequest.open("GET", link, true);
        modulerequest.send();
    }

    static renderModule(modulesData, i){
        new Module(modulesData[i].title, modulesData[i].src);
    }

    // *
    // * ELEMENT RENDERING
    // *

    static createBin(idname, classname){
        let bin = document.createElement("div");
		bin.setAttribute("id", idname);
		bin.setAttribute("class", classname);
		document.body.appendChild(bin);
    }
    
    static createButton(idname, classname){
        var action;
        let button = document.createElement("div");
        let icon = document.createElement("span");
		button.setAttribute("id", idname);
        button.classList.add(classname);
        switch(idname){
            case "play":
                action = "Engine.play()";
                icon.className = "fa fa-play";
            break;
            case "stop":
                action = "Engine.stop()";
                icon.className = "fa fa-stop";
            break;
            case "pause":
                action = "Engine.pause()";
                icon.className = "fa fa-pause";
            break;
            case "previous":
                action = "Engine.previous()";
                icon.className = "fa fa-backward";
            break;
            case "next":
                action = "Engine.next()";
                icon.className = "fa fa-forward";
            break;
            default:
                action = "";
            break;
        }
        button.setAttribute("onclick", action);
        document.getElementById(classname).appendChild(button);
        document.getElementById(idname).appendChild(icon); 
    }

    // *
    // * MODULE CONTROL BUTTONS
    // *

    static play(){
        var len = document.getElementById("module").children.length;
        if(document.getElementById("module").getElementsByTagName("video").length > 0){
            document.getElementById("video").play();
        }else{
            for(var i=0;i<len;i++){
                document.getElementById("module").children[i].style.animationPlayState = "running";
            }
            console.log("play module");
        }
    }

    static stop(){
        console.log("stop module");
    }

    static pause(){
        console.log("pause module");
        if(document.getElementById("module").getElementsByTagName("video").length > 0){
            document.getElementById("video").pause();
        }else{
            var len = document.getElementById("module").children.length;
            for(var i=0;i<len;i++){
                document.getElementById("module").children[i].style.animationPlayState = "paused";
            }
        }
    }

    static next(){
        console.log("next module");
        Engine.lessonnumber+1 > Engine.data.length-1 ? Engine.lessonnumber = Engine.data.length-1 : Engine.lessonnumber = Engine.lessonnumber+1;
        Engine.renderModule(Engine.data, Engine.lessonnumber);
    }

    static previous(){
        console.log("previous module");
        Engine.lessonnumber-1 < 0 ? Engine.lessonnumber = 0 : Engine.lessonnumber = Engine.lessonnumber-1;
        Engine.renderModule(Engine.data, Engine.lessonnumber);
    }
}