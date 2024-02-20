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
import model.poli;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
public class polDao {
    
   private final Connection con;
   private PreparedStatement stm;
   private ResultSet res;
   
   final String getID= "SELECT * from poli order by id_poli";
   final String postData= "INSERT INTO poli(id_poli, nama_poli)values (?, ?)";
   final String UpdateData="update poli set nama_poli=? where id_poli = ?";
   final String DeleteData="delete from poli where id_poli=?";
   
   public polDao(){
       con = koneksi.getKoneksi();
   }
   public ArrayList<poli>getPoli(){
       ArrayList<poli>listpoli = new ArrayList();
       try{
           stm = con.prepareStatement(getID);
           res = stm.executeQuery();
           while(res.next()){
               poli pol = new poli();
               pol.setId_poli(res.getString("id_poli"));
               pol.setNama_poli(res.getString("nama_poli"));
               listpoli.add(pol);
           }
       }catch(SQLException e){
           System.err.println("Error di get"+e);
       }
       return listpoli;
   }
   public void simpandatapoli(poli pol){
       try{
           stm = con.prepareStatement(postData);
           stm.setString(1,pol.getId_poli());
           stm.setString(2, pol.getNama_poli());
           stm.executeUpdate();
       }catch(SQLException e){
           System.err.println("Error di simpan layar" + e);
       }       
   }
    
   public void editpoli(poli pol){
       try{
           stm = con.prepareStatement(UpdateData);
           stm.setString(2,pol.getId_poli());
           stm.setString(1, pol.getNama_poli());
           stm.executeUpdate();
       }catch(SQLException e){
            System.err.println("Eror di update detail" + e);
        }
   }
   
   public void hapuspoli (String id_poli){
       try{
           stm = con.prepareStatement(DeleteData);
           stm.setString(1, id_poli);
           stm.executeUpdate();
       }catch(SQLException e){
           System.err.println("error di hapus"+ e);
       }
   }
   public poli getRecordById(String id_poli){
        String query = "Select * from poli where id_poli = ?";
        poli pol = new poli();
       try{
         stm = con.prepareStatement(query);
         stm.setString(1, id_poli);
         res = stm.executeQuery();
         if(res.next()){
             pol.setId_poli(res.getString("id_poli"));
             pol.setNama_poli(res.getString("nama_poli"));
            }
        }catch(SQLException e){
            System.err.println("Error di get record" + e);
        }
       return pol;
   }
   
}
