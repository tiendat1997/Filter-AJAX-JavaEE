package ajax.product;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.naming.NamingException;
import project.utils.DBUtils;

public class Tbl_ProductDAO implements Serializable{
    private List<Tbl_ProductDTO> listProduct; 

    public List<Tbl_ProductDTO> getListProduct() {
        return listProduct;
    }
    public void insertAProduct(String productId, String productName, float price, int quantity) throws NamingException, SQLException{
        Connection con = null; 
        PreparedStatement stm = null; 
        ResultSet rs = null; 
        
        try {
            con = DBUtils.makeConnection();
            if (con != null) {
                String sql = "INSERT INTO tbl_product(productId, productName, price, quantity) VALUES(?,?,?,?)";
                stm = con.prepareStatement(sql);
                stm.setString(1, productId);
                stm.setString(2, productName);
                stm.setFloat(3, price);
                stm.setInt(4, quantity);
                
                int row = stm.executeUpdate();                                
            }
        }finally {
            if (stm != null) stm.close();
            if (con != null) con.close();
            
        }
        
    }
    public boolean updateAProduct(String productName, Float price, Integer quantity, String productId) throws NamingException, SQLException{
        Connection con = null; 
        PreparedStatement stm = null; 
        ResultSet rs = null; 
        boolean result = false; 
        try {
            con = DBUtils.makeConnection(); 
            if (con != null) {
                String sql = "UPDATE tbl_product "
                        + "SET productName = ?, price = ?, quantity = ? "
                        + "WHERE productId = ?";
                stm = con.prepareStatement(sql); 
                stm.setString(1, productName);
                stm.setFloat(2, price);
                stm.setInt(3, quantity);
                stm.setString(4, productId);
                
                int row = stm.executeUpdate(); 
                if (row > 0) {
                    result = true; 
                }                                    
            }
        } finally {
            if (stm != null) stm.close();
            if (con != null) con.close();
        }
        return result;
    }
    
    public void getAllProduct() throws NamingException, SQLException{
        Connection con = null; 
        PreparedStatement stm = null; 
        ResultSet rs = null; 
        try {
            con = DBUtils.makeConnection(); 
            if(con != null) {
                String sql = "SELECT * "
                        + "FROM tbl_product "; 
                stm = con.prepareStatement(sql); 
                rs = stm.executeQuery(); 
                
                while (rs.next()){
                    String productId = rs.getString("productId");
                    String productName = rs.getString("productName"); 
                    int quantity = rs.getInt("quantity");
                    float price = rs.getFloat("price");
                    
                    Tbl_ProductDTO dto = new Tbl_ProductDTO(productId, productName, quantity, price); 
                    if (listProduct == null) {
                        listProduct = new ArrayList<>(); 
                    }
                    listProduct.add(dto);
                }                      
            }
        }finally {
            if (rs != null) rs.close();
            if (stm != null) stm.close();
            if (con != null) con.close();
        }
    }
    public boolean deleteProduct(String productId) throws NamingException, SQLException{
        Connection con = null; 
        PreparedStatement stm = null; 
        ResultSet rs = null; 
        boolean result = false; 
        try {
            con = DBUtils.makeConnection(); 
            if (con != null) {
                String sql = "DELETE FROM tbl_product "
                        + "WHERE productId = ?";                        
                stm = con.prepareStatement(sql); 
                stm.setString(1,productId);
                
                int row = stm.executeUpdate(); 
                if (row > 0) {
                    result = true; 
                }                
            }
        } finally {
            if (stm != null) stm.close();
            if (con != null) con.close();
        }
        return result;
    }
}
