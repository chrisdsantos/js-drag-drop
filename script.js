// ***********************************************************************
// JS MatchGame
// Author: Christopher Santos
//
// Vanilla JavaScript drag and drop module. Displays items from JSON file.
// ***********************************************************************

class MatchGame{
	constructor(){
		const items = document.createElement("div");
		items.setAttribute("id", "items");
		items.setAttribute("class", "container");
		document.body.appendChild(items);

		const bin = document.createElement("div");
		bin.setAttribute("id", "bin");
		bin.setAttribute("class", "container");
		document.body.appendChild(bin);

		const submit = document.createElement("button");
		submit.setAttribute("type", "button");
		submit.setAttribute("onclick", "MatchGame.checkAnswer()");
		submit.appendChild(document.createTextNode("submit"));
		document.body.appendChild(submit);

		MatchGame.loadData("items.json");
	}

	static reset(){

	}

	static checkAnswer(){
		for(var i=0;i<MatchGame.data.length;i++){
			if(document.getElementById(MatchGame.data[i].match).children.length === 1){
				document.getElementById(MatchGame.data[i].match).firstChild.id == MatchGame.data[i].label ? console.log(i+": yes") : console.log(i+": no");
			}
		}
	}

	static loadData(link){
        var modulerequest = new XMLHttpRequest();
        modulerequest.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
				MatchGame.data = JSON.parse(this.responseText);
				MatchGame.renderItems(MatchGame.data);
            }
        }
        modulerequest.open("GET", link, true);
        modulerequest.send();
    }

    static renderItems(itemsData){
    	for(var i=0;i<itemsData.length;i++){
			new Draggable(itemsData[i].label, itemsData[i].label);
			new DropBin(itemsData[i].match, itemsData[i].match);
    	}
    }
}

// *
// * DROPBIN CLASS
// *

class DropBin{
	constructor(id, label, isanswer=false){
		//create div and text
		var newDiv = document.createElement("div");
		
		// if(label != ""){
		// 	var newContent = document.createTextNode(label);
		// 	//append text to div
		// 	newDiv.appendChild(newContent);
		// }
		
		//set attributes
		newDiv.setAttribute("class", "dropbin");
		newDiv.setAttribute("id", id);
		newDiv.setAttribute("ondrop", "DropBin.drop(event)");
		newDiv.setAttribute("ondragover", "DropBin.allowDrop(event)");

		//append div to document
		isanswer ? document.getElementById("items").appendChild(newDiv) : document.getElementById("bin").appendChild(newDiv);
	}

	static allowDrop(e){
		e.preventDefault();
	}

	static drop(e){
		if(e.target.children.length == 0 && e.target.className != "draggable"){
			e.preventDefault();
			e.target.appendChild(document.getElementById(e.dataTransfer.getData("text")));
		}
	}
}

// *
// * DRAGGABLE CLASS
// *

class Draggable{
	constructor(id, label){
		//create div and text
		var newDiv = document.createElement("div");
		var newContent = document.createTextNode(label);
		
		//append text to div
		newDiv.appendChild(newContent);
		
		//set attributes
		newDiv.setAttribute("class", "draggable");
		newDiv.setAttribute("id", id);
		newDiv.setAttribute("draggable", "true");
		newDiv.setAttribute("ondragstart", "Draggable.drag(event)");

		//create dropbin
		new DropBin(id+"bin", "", true);

		//append div to document
		document.getElementById(id+"bin").appendChild(newDiv);
	}

	static drag(e){
		e.dataTransfer.setData("text", e.target.id);
	}
}