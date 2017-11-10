/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ajax.service;

import ajax.product.Tbl_ProductDAO;
import java.sql.SQLException;
import javax.naming.NamingException;

/**
 *
 * @author DatTTSE62330
 */
public class DeleteProductService {
    private final String success = "SUCCESS"; 
    private final String fail = "FAIL";
    
    public String doDelete(String productId) throws NamingException, SQLException{
        String msg = fail; 
        Tbl_ProductDAO dao = new Tbl_ProductDAO();
            boolean result = dao.deleteProduct(productId);
            if (result) {
                msg = success;                        
            }        
        return msg;
    }
}
