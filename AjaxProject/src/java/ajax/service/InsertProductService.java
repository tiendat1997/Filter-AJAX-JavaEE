/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ajax.service;

import ajax.product.Tbl_ProductDAO;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.NamingException;

/**
 *
 * @author DatTTSE62330
 */
public class InsertProductService {
    private final String success = "SUCCESS";
    private final String failure = "FAILURE";
    
    public String insertNewProduct(String productId, String productName, float price, int quantity){
        String result = success;
        try {
            Tbl_ProductDAO dao = new Tbl_ProductDAO();
            dao.insertAProduct(productId, productName, price, quantity);
        } catch (NamingException ex) {
            Logger.getLogger(InsertProductService.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            String msg = ex.getMessage(); 
            if (msg.contains("duplicate")){
                result = failure;
            }
//            result = failure;
            Logger.getLogger(InsertProductService.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            
        }   
        return result;
    }
}
