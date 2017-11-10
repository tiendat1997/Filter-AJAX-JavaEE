// Create Input 
createInput = (type,value) => {
	var input = document.createElement("INPUT");		
	input.setAttribute("type",type);	
	input.setAttribute("value",value); 
	
	return input;
	
}

// Create Button
createButton = (name) => {
	let btn = document.createElement('button'); 
    btn.innerHTML = name;
	return btn;

}


// Create label Error 

createErrorLabel = (title) => {
	let label = document.createElement('label');
	label.innerHTML = title;
	label.setAttribute("class","error-validation");
	return label;
}