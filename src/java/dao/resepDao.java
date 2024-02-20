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
import model.resep;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
public class resepDao {
    private final Connection con;
    private PreparedStatement stm;
    private ResultSet res;
    
    final String getData = "SELECT resep.*, dokter.nama_dokter, poli.nama_poli FROM resep, dokter, poli WHERE resep.id_dokter = dokter.id_dokter AND resep.id_poli = poli.id_poli ORDER BY resep.id_resep";
    final String getDetail = "SELECT detail_resep.*, obat.nama_obat FROM detail_resep, obat WHERE detail_resep.id_obat = obat.id_obat AND id_resep=?";
    final String postResep = "INSERT INTO resep (id_resep, id_dokter, tgl_resep, id_poli, user_id) VALUES (?,?,?,?,?)";
    final String postDetail = "INSERT INTO detail_resep (id_resep, id_obat, harga, jumlah, keterangan, user_id)VALUES(?,?,?,?,?,?)";
    final String putResep = "UPDATE resep SET id_dokter=?, tgl_resep=?, id_poli=?, user_id=?, waktu=? WHERE id_resep=?";
    final String putDetail = "UPDATE detail_resep SET harga=?, jumlah=?, keterangan=?, user_id=? WHERE id_resep=? AND id_obat=?";
    final String deleteResep = "DELETE FROM resep WHERE id_resep=?";
    final String deleteDetail = "DELETE FROM detail_resep WHERE id_resep=? AND id_obat=?";
    final String getIdResep = "SELECT*FROM resep WHERE id_resep=?";
    final String getIdDetail = "SELECT*FROM detail_resep WHERE id_resep=? AND id_obat=?";
    
    public resepDao(){
        con = koneksi.getKoneksi();
    }
    
    public ArrayList<resep>getAllResep(){
        ArrayList<resep>listResep = new ArrayList();
        try{
            stm = con.prepareStatement(getData);
            res = stm.executeQuery();
            while(res.next()){
                resep awa = new resep();
                awa.setId_resep(res.getString("id_resep"));
                awa.setId_dokter(res.getString("id_dokter"));
                awa.setId_resep(res.getString("id_resep"));
                awa.setTgl_resep(res.getString("tgl_resep"));
                awa.setId_poli(res.getString("id_poli"));
                awa.setUser_id(res.getString("user_id"));
                awa.setWaktu(res.getString("waktu"));
                awa.setNama_dokter(res.getString("nama_dokter"));
                awa.setNama_poli(res.getString("nama_poli"));
                listResep.add(awa);
            }
        }catch(SQLException e){
            System.err.println("Kesalahan di get "+e);
        }
        return listResep;
    }
    
    public ArrayList<resep>getAllDetail(String id_resep){
        ArrayList<resep>listResep = new ArrayList();
        try{
            stm = con.prepareStatement(getDetail);
            stm.setString(1, id_resep);
            res = stm.executeQuery();
            while(res.next()){
                resep awa = new resep();
                awa.setId_obat(res.getString("id_obat"));
                awa.setNama_obat(res.getString("nama_obat"));
                awa.setHarga(res.getString("harga"));
                awa.setJumlah(res.getString("jumlah"));
                awa.setKeterangan(res.getString("keterangan"));
                listResep.add(awa);
            }
        }catch(SQLException e){
            System.err.println("Kesalahan di get "+e);
        }
        return listResep;
    }
    
    public resep getRecordById(String id_resep){
        resep awa = new resep();
        try{
            stm = con.prepareStatement(getIdResep);
            stm.setString(1, id_resep);
            res = stm.executeQuery();
            if(res.next()){
                awa.setId_resep(res.getString("id_resep"));
                awa.setId_dokter(res.getString("id_dokter"));
                awa.setTgl_resep(res.getString("tgl_resep"));
                awa.setId_resep(res.getString("id_resep"));
                awa.setId_poli(res.getString("id_poli"));
                awa.setUser_id(res.getString("user_id"));
                awa.setWaktu(res.getString("waktu"));
            }
        }catch(SQLException e){
            System.err.println("Eror di get id resep "+e);
        }
        return awa;
    }
    
    public resep getRecordByIdDetail(String id_resep, String id_obat){
        resep awa = new resep();
        try{
            stm = con.prepareStatement(getIdDetail);
            stm.setString(1, id_resep);
            stm.setString(2, id_obat);
            res = stm.executeQuery();
            if(res.next()){
                awa.setId_obat(res.getString("id_obat"));   
                awa.setHarga(res.getString("harga"));
                awa.setJumlah(res.getString("jumlah"));
                awa.setKeterangan(res.getString("keterangan"));
            }
        }catch(SQLException e){
            System.err.println("Eror di get id resep "+e);
        }
        return awa;
    }
    
    public void  simpanResep(resep awa){
        try{
            stm = con.prepareStatement(postResep);
            stm.setString(1, awa.getId_resep());
            stm.setString(2, awa.getId_dokter());
            stm.setString(3, awa.getTgl_resep());
            stm.setString(4, awa.getId_poli());
            stm.setString(5, awa.getUser_id());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di simpan resep "+e);
        }
    }
    
    public void simpanDetail(resep awa){
        try{
            stm = con.prepareStatement(postDetail);
            stm.setString(1, awa.getId_resep());
            stm.setString(2, awa.getId_obat());
            stm.setString(3, awa.getHarga());
            stm.setString(4, awa.getJumlah());
            stm.setString(5, awa.getKeterangan());
            stm.setString(6, awa.getUser_id());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di simpan detail "+e);
        }
    }
    
    public void editResep(resep awa){
        try{
            stm = con.prepareStatement(putResep);
            stm.setString(1, awa.getId_dokter());
            stm.setString(2, awa.getTgl_resep());
            stm.setString(3, awa.getId_poli());
            stm.setString(4, awa.getUser_id());
            stm.setString(5, awa.getWaktu());
            stm.setString(6, awa.getId_resep());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di edit resep "+e);
        }
    }
    
    public void editDetail(resep awa){
        try{
            stm = con.prepareStatement(putDetail);
            stm.setString(1, awa.getHarga());
            stm.setString(2, awa.getJumlah());
            stm.setString(3, awa.getKeterangan());
            stm.setString(4, awa.getUser_id());
            stm.setString(5, awa.getId_resep());   
            stm.setString(6, awa.getId_obat());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di edit detail "+e);
        }
    }
    
    public void hapusResep(String id_resep){
        try{
            stm = con.prepareStatement(deleteResep);
            stm.setString(1, id_resep);
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di hapus Resep "+e);
        }
    }
    
    public void hapusDetail(String id_resep, String id_obat){
        try{
            stm = con.prepareStatement(deleteDetail);
            stm.setString(1, id_resep);
            stm.setString(2, id_obat);
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di hapus Detail "+e);
        }
    }
    
    public static void main(String[] args) {
        resepDao resdo = new resepDao();
        System.out.println(resdo.getAllResep());
        resep detres = new resep();
        detres.setId_resep("R01");
        detres.setId_obat("OB04");
        detres.setHarga("10000");
        detres.setJumlah("12");
        detres.setKeterangan("lUNAS");
        detres.setUser_id("BAMBANG");
//        resdo.simpanDetail(detres);
    }
}
