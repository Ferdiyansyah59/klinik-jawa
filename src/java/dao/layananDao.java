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
import model.layanan;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
public class layananDao {
    private final Connection con;
    private PreparedStatement stm;
    private ResultSet res;
    private SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    
    final String getLayanan = "SELECT*FROM layanan ORDER BY id_layanan";
    final String getDetail = "SELECT*FROM detail_layanan WHERE id_layanan=?";
    final String postLayanan = "INSERT INTO layanan (id_layanan,des_layanan)VALUES(?,?)";
    final String postDetail = "INSERT INTO detail_layanan (id_layanan, id_detail_layanan, des_detail_layanan, biaya_layanan, keterangan) VALUES (?, ?, ?, ?, ?)";
    final String putLayanan = "UPDATE layanan SET des_layanan=? WHERE id_layanan=?";
    final String putDetail = "UPDATE detail_layanan SET  des_detail_layanan=?, biaya_layanan=?, keterangan=? WHERE id_layanan=? AND id_detail_layanan=?";
    final String deleteLayanan = "DELETE FROM layanan WHERE id_layanan=?";
    final String deleteDetail = "DELETE FROM detail_layanan WHERE id_layanan=? AND id_detail_layanan=?";
    final String getIdLayanan = "SELECT*FROM layanan WHERE id_layanan=?";
    final String getIdDetail = "SELECT*FROM detail_layanan WHERE id_layanan=? AND id_detail_layanan=?";
    public layananDao(){
        con = koneksi.getKoneksi();
    }
    
    public ArrayList<layanan>getAllLayanan(){
        ArrayList<layanan>listLayanan = new ArrayList();
        try{
            stm = con.prepareStatement(getLayanan);
            res = stm.executeQuery();
            while(res.next()){
                layanan awa = new layanan();
                awa.setId_layanan(res.getString("id_layanan"));
                awa.setDes_layanan(res.getString("des_layanan"));
                listLayanan.add(awa);
            }
        }catch(SQLException e){
            System.err.println("Eror di get " + e);
        }
        return listLayanan;
    }
    
    public ArrayList<layanan>getAllDetail(String id_layanan){
        ArrayList<layanan> listLayanan = new ArrayList();
        try{
            stm = con.prepareStatement(getDetail);
            stm.setString(1, id_layanan);
            res = stm.executeQuery();
            while(res.next()){
                layanan awa = new layanan();
                awa.setId_layanan(res.getString("id_layanan"));
                awa.setId_detail_layanan(res.getString("id_detail_layanan"));
                awa.setDes_detail_layanan(res.getString("des_detail_layanan"));
                awa.setBiaya_layanan(res.getString("biaya_layanan"));
                awa.setKeterangan(res.getString("keterangan"));
                listLayanan.add(awa);
            }
        }catch(SQLException e){
            System.err.println("Eror di get Detail");
        }
        return listLayanan;
    }
    
    public layanan getRecordByIdLayanan(String id_layanan){
        layanan awa = new layanan();
        try{
            stm = con.prepareStatement(getIdLayanan);
            stm.setString(1, id_layanan);
            res = stm.executeQuery();
            if(res.next()){
                awa.setId_layanan(res.getString("id_layanan"));
                awa.setDes_layanan(res.getString("des_layanan"));
            }
        }catch(SQLException e){
            System.err.println("Eror di get id layanan"+e);
        }
        return awa;
    }
    
    public layanan getRecordByIdDetail(String id_layanan, String id_detail_layanan){
        layanan awa = new layanan();
        try{
            stm = con.prepareStatement(getIdDetail);
            stm.setString(1, id_layanan);
            stm.setString(2, id_detail_layanan);
            res = stm.executeQuery();
            if(res.next()){
                awa.setId_layanan(res.getString("id_layanan"));
                awa.setId_detail_layanan(res.getString("id_detail_layanan"));
                awa.setDes_detail_layanan(res.getString("des_detail_layanan"));
                awa.setBiaya_layanan(res.getString("biaya_layanan"));
                awa.setKeterangan(res.getString("keterangan"));
            }
        }catch(SQLException e){
            System.err.println("Eror di get Id detail "+e);
        }
        return awa;
    }
    
    public void simpanLayanan(layanan lay){
        try{
            stm = con.prepareStatement(postLayanan);
            stm.setString(1, lay.getId_layanan());
            stm.setString(2, lay.getDes_layanan());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di simpan layanan "+e);
        }
    }
    
    public void simpanDetail(layanan lay){
        try{
            stm = con.prepareStatement(postDetail);
            stm.setString(1, lay.getId_layanan());
            stm.setString(2, lay.getId_detail_layanan());
            stm.setString(3, lay.getDes_detail_layanan());
            stm.setString(4, lay.getBiaya_layanan());
            stm.setString(5, lay.getKeterangan());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di simpan detail "+e);
        }
    }
    
    public void editLayanan(layanan lay){
        try{
            stm = con.prepareStatement(putLayanan);
            stm.setString(1, lay.getDes_layanan());
            stm.setString(2, lay.getId_layanan());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di edit layanan "+e);
        }
    }
    
    public void editDetail(layanan lay){
        try{
            stm = con.prepareStatement(putDetail);
            stm.setString(1, lay.getDes_detail_layanan());
            stm.setString(2, lay.getBiaya_layanan());
            stm.setString(3, lay.getKeterangan());
            stm.setString(4, lay.getId_layanan());
            stm.setString(5, lay.getId_detail_layanan());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di edit detail "+e);
        }
    }
    
    public void hapusLayanan(String id_layanan){
        try{
            stm = con.prepareStatement(deleteLayanan);
            stm.setString(1, id_layanan);
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di hapus layanan "+e);
        }
    }
    
    public void hapusDetail(String id_layanan, String id_detail_layanan){
        try{
            stm = con.prepareStatement(deleteDetail);
            stm.setString(1, id_layanan);
            stm.setString(2, id_detail_layanan);
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di hapus detail "+e);
        }
    }
    
    public static void main(String[] args) {
        layananDao laydo = new layananDao();
        System.out.println(laydo.getAllLayanan());
        layanan awa = new layanan();
        awa.setId_layanan("L02");
        awa.setDes_layanan("Sunat");
        laydo.hapusDetail("L01","LK019");
    }
    
}
