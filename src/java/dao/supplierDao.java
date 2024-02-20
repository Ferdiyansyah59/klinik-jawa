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
import model.supplier;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
public class supplierDao {
    private final Connection Koneksi;
    private PreparedStatement preStmt;
    private ResultSet rs;
    //private Object Koneksi;
    public supplierDao(){
        Koneksi=koneksi.getKoneksi();
    }  
    
    public ArrayList<supplier> getAllSuplier(){
        ArrayList<supplier> listSuplier = new ArrayList<>();
        try{
            String sqlAllSuplier = "SELECT * FROM supplier ORDER BY id_supplier";
            preStmt = Koneksi.prepareStatement(sqlAllSuplier);
            rs = preStmt.executeQuery();
            while(rs.next()){
                supplier suplier1 = new  supplier();
                suplier1.setId_supplier(rs.getString("id_supplier"));
                suplier1.setNama_suplier(rs.getString("nama_suplier"));
                suplier1.setAlamat(rs.getString("alamat"));
                suplier1.setNo_telepon(rs.getString("no_telepon"));
                suplier1.setEmail(rs.getString("email"));
                suplier1.setUser_id(rs.getString("user_id"));
                listSuplier.add(suplier1);
            }
        }catch(SQLException e){
            System.out.println("ada kesalahan 1 : " + e);
        }
        return listSuplier;
    }
    
    public supplier getRecordById(String id_supplier){
            supplier suplier1 = new supplier();
         String sqlAllSuplier = "SELECT * FROM supplier WHERE id_supplier = ?";
        try{
            preStmt = Koneksi.prepareStatement(sqlAllSuplier);
            preStmt.setString(1, id_supplier);
            rs = preStmt.executeQuery();
            if(rs.next()){
                suplier1.setId_supplier(rs.getString("id_supplier"));
                suplier1.setNama_suplier(rs.getString("nama_suplier"));
                suplier1.setAlamat(rs.getString("alamat"));
                suplier1.setNo_telepon(rs.getString("no_telepon"));
                suplier1.setEmail(rs.getString("email"));
                suplier1.setUser_id(rs.getString("user_id"));
            }
        }catch(SQLException e){
            System.out.println("ada kesalahan 1 : " + e);
        }
        return suplier1;
    }
    
    public void simpanData(supplier kar, String page){
        String sqlSimpan = null;
        if (page.equals("edit")){
            sqlSimpan = "update supplier set  nama_suplier=?, alamat=?, " +
                    "no_telepon=?, email=?, user_id=? WHERE id_supplier=?";
        }
        else if (page.equals("tambah")){
            sqlSimpan = "insert into supplier (nama_suplier, alamat, no_telepon, Email, user_id, id_supplier) " +
                    "values (?,?,?,?,?,?)";
        }
        try {
            preStmt = Koneksi.prepareStatement(sqlSimpan);
            preStmt.setString(1, kar.getNama_suplier());
            preStmt.setString(2, kar.getAlamat());
            preStmt.setString(3, kar.getNo_telepon());
            preStmt.setString(4, kar.getEmail());
            preStmt.setString(5, kar.getUser_id());
            preStmt.setString(6, kar.getId_supplier());
            preStmt.executeUpdate();
        }catch (SQLException se){
            System.out.println("ada kesalahan 2 : " + se);
        }
    }

    public void hapusData(String no){
        String sqlHapus = "DELETE FROM supplier WHERE id_supplier=?";
        try{
            preStmt = Koneksi.prepareStatement(sqlHapus);
            preStmt.setString(1, no);
            preStmt.executeUpdate();
        }
        catch(SQLException e){
            System.out.println("kesalahan hapus data: " + e);
        }
    }

    public static void main(String[] args) {
        supplierDao supdo = new supplierDao();
        System.out.println(supdo.getAllSuplier());
        supplier sup = new supplier();
        sup.setId_supplier("SP002");
        sup.setNama_suplier("Sumanto");
        sup.setAlamat("jkt");
        sup.setNo_telepon("0987656789");
        sup.setEmail("mail@mai");
        sup.setUser_id("bambang");
//        supdo.simpanData(sup, "tambah");
    }
}
