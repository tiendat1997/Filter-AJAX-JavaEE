/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package project.utils;

import java.io.Serializable;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * resource: https://stackoverflow.com/questions/40503201/decode-md5-ecnrytion-in-java
 */
public class HashingUtils implements Serializable{
   
    public static boolean matching(String origin, String compare){
        String md5 = null; 
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(compare.getBytes());
            byte[] digest = md.digest(); 
            md5 = new BigInteger(digest).toString(16);
            
            return md5.equals(origin);
            
        } catch (NoSuchAlgorithmException ex) {
            return false;
        }                                
    }
    
    public static String hashing(String password){
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(password.getBytes());
            
            byte[] digest = md.digest(); 
            String md5 = new BigInteger(digest).toString(16);
            
            return md5;
        } catch (NoSuchAlgorithmException ex) {
            return "";
        }                
    }
   
}
