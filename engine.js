class Engine{
    constructor(){
        Engine.createBin("controls", "keyset");        
        Engine.createButton("play", "controls", "Engine.play()");
        Engine.createButton("stop", "controls", "Engine.stop()");
        Engine.createButton("pause","controls", "Engine.pause()");
        Engine.createButton("previous", "controls", "Engine.previous()");
        Engine.createButton("next", "controls", "Engine.next()");
    }

    static createBin(idname, classname){
        let bin = document.createElement("div");
		bin.setAttribute("id", idname);
		bin.setAttribute("class", classname);
		document.body.appendChild(bin);
    }
    
    static createButton(idname, classname, action=""){
        let button = document.createElement("div");
		button.setAttribute("id", idname);
        button.classList.add(classname);
        if(action!=="") button.setAttribute("onclick", action);
		document.getElementById(classname).appendChild(button);
    }

    static play(){
        var len = document.getElementById("module").children.length;
        for(var i=0;i<len;i++){
            document.getElementById("module").children[i].style.animationPlayState = "running";
        }
        console.log("play module");
    }

    static stop(){
        console.log("stop module");
    }

    static pause(){
        var len = document.getElementById("module").children.length;
        for(var i=0;i<len;i++){
            document.getElementById("module").children[i].style.animationPlayState = "paused";
        }
        console.log("pause module");
    }

    static next(){
        console.log("next module");
    }

    static previous(){
        console.log("previous module");
    }
}