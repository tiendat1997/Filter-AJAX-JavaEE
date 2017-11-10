requiredLengthInput = (str, minLength, maxLength) => {}

requiredFieldValue = (str) => {
	console.log(str.length);
	if (str.length > 0) {
		console.log("True");
		return true; 
	}
	return false;
}

requiredFloatNumber = (num) => {
	if (isNaN(num)){
		return NaN;
	}
	return parseFloat(num);
}

requirePositiveFloatNumber = (num) => {
	var floatNumber = requiredFloatNumber(num);
	if (isNaN(floatNumber)){
		return false; 
	}
	if (floatNumber > 0) return true; 
	return false; 
	
}

requiredMinMaxNumber = (num, min, max) => {
	console.log(num);
	if (isNaN(num)) {
		window.alert("Not a number");		
	}	
	else {
		window.alert("Is a number");
	}
}

requiredIntNumber = (num) => {	
	return parseInt(num);
}

requiredPositiveIntNumber = (num) => {
	var intNumber = requiredIntNumber(num);
	if (isNaN(intNumber)) {
		return false; 
	}
	if (intNumber > 0 && num - intNumber === 0){
		return true;
	}
	return false; 
}


