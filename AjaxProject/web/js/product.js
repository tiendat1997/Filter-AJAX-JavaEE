
// Save the list 
$(document).ready(function(){
	var listProduct = null;  // For Searching

	var productTable = document.getElementById("productTable");
	var listProductFromServer = null; // For Global
});

getAllProduct = () => {
	$.ajax({
		url: "getProduct",
		method: "GET",
		cache: false,
		success: function(results){
			if (results != null) {							
				if (results == 'LOGOUT-ACCOUNT') {
					// alert("Account was logout");
					$(location).attr('href', 'http://localhost:8080/Project/');					
					return;
				}
				// Parse Json String to Object 
			    listProductFromServer = JSON.parse(results);		
			    listProduct = listProductFromServer;


			    console.log(listProduct);
			    if (listProduct != null){
			    	$("#productTable").css("display", "table");			    	
			    	// Show list of rows of table 
			    	showListProduct(productTable);
			    }			  
			    else {
			    	$('#no-product').css("display","block");
			    	listProduct = [];
			    }
			}
		}
	})
}
createARowOfProduct = (item, count) => {
	var row = document.createElement("TR"); 		
		var countCol = row.insertCell(0);
		countCol.innerHTML = count + 1;

		var productIdCol = row.insertCell(1);		
		productIdCol.innerHTML = item.productId;

		var productNameCol = row.insertCell(2);
		var inputName = createInput("text",item.productName);		
		productNameCol.appendChild(inputName);

		var priceCol = row.insertCell(3);
		var inputPrice = createInput("text", item.price);
		priceCol.appendChild(inputPrice);
		


		var quantityCol = row.insertCell(4);		
		var inputQuantity = createInput("number", item.quantity);
		inputQuantity.setAttribute("step", 1);
		quantityCol.appendChild(inputQuantity);


		// Delete
			var deleteCol = row.insertCell(5);
			var delBtn = createButton("Delete");
		

			// Event List
			delBtn.addEventListener("click", function(){
				// alert("List Product: " + item.productId);	
				
				var index = this.getAttribute("id");
				var row = this.parentNode.parentNode;				

				removeProduct(item.productId, row);
			});

			deleteCol.appendChild(delBtn);


		// Update
			var updateCol = row.insertCell(6);
			var updateBtn = createButton("Update");

			// Event List 
			updateBtn.addEventListener("click", function(){
				var currRow = this.parentNode.parentNode;
				updateProduct(currRow, item.productId);
			});
			updateCol.appendChild(updateBtn);
    return row; 
}


showListProduct = (table) => {
	$("#tbodyProduct").empty();
	

	if (listProduct.length == 0) {
		$('#no-product').css("display","block");
		$("#productTable").css("display","none");
		return;
	}

	$('#no-product').css("display","none");
	$("#productTable").css("display","table");

	let count=0;		
	for (let item of listProduct){			
		// console.log(item);				
		var row = createARowOfProduct(item, count);
		// Add row into table
	    table.tBodies[0].appendChild(row);	
	    count++;	
	}
}

searchProduct = () => {

	var input = document.getElementById('searchInput');
	var str = input.value; 

	if (str != null && str.length > 0) {
		
		listProduct = listProductFromServer.filter(function(item){			
			var name = item.productName.toUpperCase(); 			
			return (name.indexOf(str.toUpperCase()) > -1);
		})	
		
		showListProduct(productTable);
	}
	else {
		console.log("NUll --");
		listProduct = listProductFromServer; 
		showListProduct(productTable);		
	}

	
	
}



// Remove Function Ajax 

// Remove Product inside 'table' at 'row', which has "productId"
removeProduct = (productId, row) => {
	console.log(listProduct);

	$.ajax({
		url: "deleteProduct",
		data: {
			productId: productId
		},
		cache: false,
		success: function(results){						

			if (results === 'SUCCESS'){
				var removeIndex = listProduct.map(function(item){
					return item.productId;
				}).indexOf(productId);

				listProduct.splice(removeIndex, 1);
				console.log(listProduct);

				var productTable = document.getElementById("productTable");
				showListProduct(productTable);	
			}			
			else {
				alert("Delete Error");
			}

		},
		fail: function(){
			alert("Delete Error");
		}
	})	
}

// Update Product 
updateProduct = (row, productId) => {

		// Take all Input in form 
		var inputName = row.cells[2].childNodes[0];					
		var inputPrice = row.cells[3].childNodes[0]; 
		var inputQuantity = row.cells[4].childNodes[0];


		// Take the value and validation 
		var productName = inputName.value;
		var result = requiredFieldValue(productName);
		if (!result) {
			window.alert("Required Non-empty field !!!");
			inputName.focus();
			return; 
		}		

		var price = inputPrice.value; 
		var resultPrice = requiredFloatNumber(price);
		// isNaN is function indicate the value of NaN not-a-number
		if (isNaN(resultPrice)){
			window.alert("Required a Float Number");
			inputPrice.value = '';
			inputPrice.focus(); 
			return;
		}
		resultPrice = requirePositiveFloatNumber(price); 
		if (!resultPrice) {
			window.alert("Required a Greater than 0 number");
			inputPrice.value = ''; 
			inputPrice.focus();
			return;
		}

		var quantity = inputQuantity.value; 
		var resultQuantity = requiredPositiveIntNumber(quantity);
		if (!resultQuantity){
			window.alert("Required a Positive Interger Number"); 
			inputQuantity.value = ''; 
			inputQuantity.focus();
			return; 
		}
		quantity = parseInt(quantity);
		inputQuantity.value = quantity;

	
		$.ajax({
			url: "updateProduct",
			cache: false,			
			data: {
				txtProductId: productId,
				txtProductName: productName,
				txtPrice: price,
				txtQuantity: quantity							
			},
			success: function(results){
				if (results != null){
					alert(results);
				}
			},
			fail: function(){
				window.alert("Cannot update");
			}
		})
}



// Add New Product 
var addNewSubmited = true; 

openInsertModal = () => {
	var form = $('#insert-modal'); 
	form.css("display","block");
	addNewSubmited = false; 
}

closeInsertModal = () => {
	
	var form = document.forms["insert-form"];	
	

    var listError = document.getElementsByClassName("error-validation");	
	if (listError.length > 0)	{
		clearAllLabelError(listError, form);
	}

	form.style.display = "none";
}

clearAllLabelError = (listError, form) => {

	console.log(form);
	console.log(listError);
	while (listError.length > 0){
		form.removeChild(listError[0]);
	}
	
	// form.removeChild(listError[0]);		
}


insertNewProduct = () => {

	// empty list situation -> display table is none 
	
	var form = document.forms["insert-form"];	


	var listError = document.getElementsByClassName("error-validation");	
	if (listError.length > 0)	{
		clearAllLabelError(listError, form);
	}

	var listRow = form.getElementsByClassName("row");	

	
	var productIdCol = listRow[0].getElementsByTagName("input")[0];
	var productNameCol = listRow[1].getElementsByTagName("input")[0];
	var priceCol = listRow[2].getElementsByTagName("input")[0];
	var quantityCol = listRow[3].getElementsByTagName("input")[0];


	// Validation 
	var result = true; 

	var productId = productIdCol.value; 
	console.log("PRODUCT ID: ");
	console.log(productId);

	if (!requiredFieldValue(productId)){
		let label = createErrorLabel("Required non-empty field productId");
		form.insertBefore(label, listRow[0]);
		result = false; 
	}


	var productName = productNameCol.value; 
	if (!requiredFieldValue(productName)) {
		let label = createErrorLabel("Required non-empty field product Name");
		form.insertBefore(label, listRow[1]);
		result = false; 
	}


	var price = priceCol.value; 
		var resultPrice = requirePositiveFloatNumber(price);
		// isNaN is function indicate the value of NaN not-a-number
		if (!resultPrice){
			
			let label = createErrorLabel("Require Float number and greater than 0");			

			form.insertBefore(label, listRow[2]);
			priceCol.value = '';						
			result = false; 
		}


    var quantity = quantityCol.value; 
    var resultQuantity = requiredPositiveIntNumber(quantity);
    if (!resultQuantity) {
    	let label = createErrorLabel("Require Integer and greater than 0");
    	form.insertBefore(label, listRow[3]);
    	quantityCol.value = ''; 
    	result = false; 
    } else {
    	quantity = parseInt(quantity);
    	quantityCol.value = quantity;     	
    }

    // NO ERRORS FOUNDED 
    if (result) {
    	$.ajax({
    		url: 'insertProduct',
    		cache: false,    		
    		data: {
    			productId: productId,
    			productName: productName,
    			price: price,
    			quantity: quantity
    		},
    		success: function(results){
    			if (results != null) {
    				if (results === "SUCCESS"){    					
    				
    					var item = {
    						productId: productId,
    						productName: productName,
    						price: price,
    						quantity: quantity
    					}

    					if (listProduct != null) listProduct.push(item);
    					else {
    						getAllProduct();
    					}


    					var productTable = document.getElementById("productTable");
    					showListProduct(productTable);


    					// Clear all field 
    					productIdCol.value = ''; 
    					productNameCol.value = '';
    					priceCol.value = '';
    					quantityCol.value = '';

    					// Close Modal 
    					closeInsertModal();

    				}
    				else {
    					let label = createErrorLabel("Product ID is already existed");    					
						form.insertBefore(label, listRow[0]);
						productIdCol.value = '';
						productIdCol.focus();
    					// window.alert("FAILURE DUPLICATE");

    				}
    			}
    		}    
    	})
    }


}








