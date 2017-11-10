<%-- 
    Document   : showproduct
    Created on : Nov 2, 2017, 9:17:18 AM
    Author     : DatTTSE62330
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Product</title>
        <link rel="stylesheet" href="css/product.css"/>
        <script>
            window.history.forward();
        </script>
    </head>
    <body onload="getAllProduct()">
        <h1>Manage Products</h1>        
        <a href="logout">Log Out</a>
        
        <h2>
            Welcome, ${sessionScope.USERNAME}
        </h2>
                                
        <button onclick="openInsertModal()">Add New Product</button>        
        <br>
        <br>
        <form name="insert-form" 
              id="insert-modal" 
              class="insert-modal" 
              style="display:none"                             
              >            
            <h2 class="title">Insert New Product</h2>        
            <div class="row">
                <label>Product Id</label>
                <input type="text" name="txtProductId" value="" />
            </div>            
            <div class="row">
                <label>Product Name</label>
                <input type="text" name="txtProductName" value="" />
            </div>
            <div class="row">
                <label>Price</label>
                <input type="text" name="txtPrice" value="" />
            </div>
            <div class="row">
                <label>Quantity</label>
                <input type="number" name="txtQuantity" value="" min="0" step="1"/>
            </div>                 
            <br>
            <div class="row">
                <label></label>
                <input type="button" value="Add Product" onclick="insertNewProduct()"/>
                <input type="reset" value="Cancel" onclick="closeInsertModal()"/>
            </div>
        </form>        

        <br>                        
        <input type="text" id="searchInput" onkeyup="searchProduct()" placeholder="Search for names..">       
        <br>        
        <h2 id="no-product" style="display: none; color: red">There are no product</h2>
        <table border="1" id="productTable" style="display:none">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
            </thead>
            <tbody id="tbodyProduct">                
            </tbody>         
        </table>      
        
    </body>
    <script   
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>
    <script src="js/validation.js"></script>
    <script src="js/elemUtil.js"></script>
    <script src="js/product.js"></script>    
</html>
