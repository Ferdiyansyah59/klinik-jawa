/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

/**
 *
 * @author ferdi
 */

import connection.koneksi;
import model.user;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import model.poli;
public class userDao {
    private final Connection con;
    private PreparedStatement stm;
    private ResultSet res;
    
    final String getID= "SELECT * from user order by id_user";
    final String postData= "INSERT INTO user (id_user, nama_user, password, role)VALUES(?,?,?,?)";
    final String UpdateData= "update user set nama_user=?, password=?, role=? where id_user=?";
    final String Delete = "delete from user where id_user=?";
    final String login = "SELECT*FROM user WHERE id_user=?";
    
    public userDao(){
        con = koneksi.getKoneksi();
    }
    public ArrayList<user>getUser(){
        ArrayList<user>listuser = new ArrayList();
        try{
            stm = con.prepareStatement(getID);
            res = stm.executeQuery();
            while(res.next()){
                user use = new user();
                use.setId_user(res.getString("id_user"));
                use.setNama_user(res.getString("nama_user"));
                use.setPassword(res.getString("password"));
                use.setRole(res.getString("role"));
                listuser.add(use);                
            }
        }catch(SQLException e){
            System.err.println("error di get"+e);
        }
           return listuser;
    }
    public void simpandatauser(user use){
       try{
           stm = con.prepareStatement(postData);
           stm.setString(1, use.getId_user());
           stm.setString(2, use.getNama_user());
           stm.setString(3, use.getPassword());
           stm.setString(4, use.getRole());
           stm.executeUpdate();
       }catch(SQLException e){
           System.err.println("Error di simpan layar" + e);
       }       
   }
    
    public user login(String id_user){
        user awa = new user();
        try{
            stm = con.prepareStatement(login);
            stm.setString(1, id_user);
            res = stm.executeQuery();
            while(res.next()){
                awa.setId_user(res.getString("id_user"));
                awa.setNama_user(res.getString("nama_user"));
                awa.setPassword(res.getString("password"));
                awa.setRole(res.getString("role"));
            }
        }catch(SQLException e){
            System.err.println("Eror di login "+e);
        }
        return awa;
    }
    
    public void edituser(user use){
       try{
           stm = con.prepareStatement(UpdateData);
           stm.setString(4, use.getId_user());
           stm.setString(1, use.getNama_user());
           stm.setString(2, use.getPassword());
           stm.setString(3, use.getRole());
           stm.executeUpdate();
       }catch(SQLException e){
            System.err.println("Eror di update detail" + e);
        }
   }
     public void hapuspoli (String id_user){
       try{
           stm = con.prepareStatement(Delete);
           stm.setString(1, id_user);
           stm.executeUpdate();
       }catch(SQLException e){
           System.err.println("error di hapus"+ e);
       }
   }
      public user getRecordById(String id_user){
        String query = "Select * from user where id_user = ?";
        user use = new user();
       try{
         stm = con.prepareStatement(query);
         stm.setString(1, id_user);
         res = stm.executeQuery();
         if(res.next()){
                use.setId_user(res.getString("id_user"));
                use.setNama_user(res.getString("nama_user"));
                use.setPassword(res.getString("password"));
                use.setRole(res.getString("role"));
            }
        }catch(SQLException e){
            System.err.println("Error di get record" + e);
        }
       return use;
    }
   
}
