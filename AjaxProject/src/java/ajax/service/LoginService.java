/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ajax.service;

import ajax.account.Tbl_AccountDAO;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.NamingException;

/**
 *
 * @author DatTTSE62330
 */
public class LoginService {
    
    public boolean doLogin(String username, String password) throws NamingException, SQLException {
        
        Tbl_AccountDAO dao = new Tbl_AccountDAO();
        boolean result = dao.checkLogin(username, password);
        

        return result;
    }
}
