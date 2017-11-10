package ajax.account;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.naming.NamingException;
import project.utils.DBUtils;

public class Tbl_AccountDAO implements Serializable{   
        
    public boolean checkLogin(String username, String password) throws NamingException, SQLException{
        Connection con = null; 
        PreparedStatement stm = null; 
        ResultSet rs = null; 
        boolean result = false; 
        
        try {
            con = DBUtils.makeConnection();
            if (con != null){
                String sql = "SELECT * "
                        + "FROM tbl_account "
                        + "WHERE username = ? AND password = ?"; 
                
                stm = con.prepareStatement(sql); 
                stm.setString(1, username);
                stm.setString(2, password);
                
                rs = stm.executeQuery();
                if (rs.next()) {
                    result = true; 
                }
                
            }
        } finally {
            if (rs != null) rs.close();
            if (stm != null) {
                stm.close();
            }
            if (con != null) {
                con.close();
            }
        }
        return result;
    }
}
