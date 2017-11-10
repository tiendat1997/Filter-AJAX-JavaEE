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
public class UpdateProductService {
    private final String success = "SUCCESS";
    private final String failure = "FAILURE";
    
    public String updateProduct(String productName, Float price, Integer quantity, String productId){
        String msg = failure; 
        
        
        try { 
            Tbl_ProductDAO dao = new Tbl_ProductDAO();
            boolean result = dao.updateAProduct(productName, price, quantity, productId);
            if (result) {
                msg = success; 
            }
            
        } catch (NamingException ex) {
            Logger.getLogger(UpdateProductService.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(UpdateProductService.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            
        }
                        
        return msg; 
    }    
    
}
