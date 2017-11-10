/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ajax.service;

import ajax.product.Tbl_ProductDAO;
import ajax.product.Tbl_ProductDTO;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.NamingException;

/**
 *
 * @author DatTTSE62330
 */
public class GetProductService {

    public List<Tbl_ProductDTO> getProduct() throws NamingException, SQLException{
        
            Tbl_ProductDAO dao = new Tbl_ProductDAO();
            dao.getAllProduct();            
            List<Tbl_ProductDTO> list = dao.getListProduct();                        
            return list;                 
    }
}
