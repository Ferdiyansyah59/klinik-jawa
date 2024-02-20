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
import model.bayarobat;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
public class bayarobatDao {
    private final Connection con;
    private PreparedStatement stm;
    private ResultSet res;
    private SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    
    final String getObat = "SELECT bayar_obat.*, pasien.nama_pasien FROM bayar_obat, pasien WHERE bayar_obat.id_pasien = pasien.id_pasien ORDER BY bayar_obat.id_pembayaran";
    final String getDetail = "SELECT detail_bayar_obat.*, obat.nama_obat FROM detail_bayar_obat, obat WHERE detail_bayar_obat.id_obat = obat.id_obat AND id_pembayaran=? ORDER BY detail_bayar_obat.id_pembayaran";
    final String postBayar = "INSERT INTO bayar_obat (id_pembayaran, tgl_pembayaran, id_pasien, id_resep, jenis_pembayaran, user_id) VALUES  (?, ?, ?, ?, ?, ?)";
    final String postDetail = "INSERT INTO detail_bayar_obat (id_pembayaran, id_obat, harga, jumlah) VALUES (?, ?, ?, ?)";
    final String putBayar = "UPDATE bayar_obat SET  tgl_pembayaran=?, id_pasien=?, id_resep=?, jenis_pembayaran=?, waktu=?, user_id=? WHERE id_pembayaran=?";
    final String putDetail = "UPDATE detail_bayar_obat SET id_obat=?, harga=?, jumlah=? WHERE id_pembayaran=? AND id_obat=?";
    final String deleteBayar = "DELETE FROM bayar_obat WHERE id_pembayaran=?";
    final String deleteDetail = "DELETE FROM detail_bayar_obat WHERE id_pembayaran=? AND id_obat=?";
    final String getIdBayar = "SELECT*FROM bayar_obat WHERE id_pembayaran=?";
    final String getIdDetail = "SELECT*FROM detail_bayar_obat WHERE id_pembayaran=? AND id_obat=?";
    public bayarobatDao(){
        con = koneksi.getKoneksi();
    }
    
    public ArrayList<bayarobat>getAllBayarObat(){
        ArrayList<bayarobat>listBayar = new ArrayList();       
        try{
            stm = con.prepareStatement(getObat);
            res = stm.executeQuery();
            while(res.next()){
                bayarobat awa = new bayarobat();
                awa.setId_pembayaran(res.getString("id_pembayaran"));
                awa.setTgl_pembayaran(res.getString("tgl_pembayaran"));
                awa.setId_pasien(res.getString("id_pasien"));
                awa.setId_resep(res.getString("id_resep"));
                awa.setJenis_pembayaran(res.getString("jenis_pembayaran"));
                awa.setWaktu(res.getString("waktu"));
                awa.setUser_id(res.getString("user_id"));   
                awa.setNama_pasien(res.getString("nama_pasien"));
                listBayar.add(awa);
            }
        }catch(SQLException e){
            System.err.println("Eror di get"+e);
        }
        return listBayar;
    }
    
    public ArrayList<bayarobat>getAllDetalBayarObar(String id_pembayaran){
        ArrayList<bayarobat>listBayar = new ArrayList();
        try{
            stm = con.prepareStatement(getDetail);
            stm.setString(1, id_pembayaran);
            res = stm.executeQuery();
            while(res.next()){
                bayarobat awa = new bayarobat();
                awa.setId_pembayaran(res.getString("id_pembayaran"));
                awa.setId_obat(res.getString("id_obat"));
                awa.setNama_obat(res.getString("nama_obat"));
                awa.setHarga(res.getString("harga"));
                awa.setJumlah(res.getString("jumlah"));
                listBayar.add(awa);
            }
        }catch(SQLException e){
            System.err.println("Eror di get detail "+e);
        }
        return listBayar;
    }
    
    public bayarobat getRecordByIdBayar(String id_pembayaran){
        bayarobat awa = new bayarobat();
        try{
            stm = con.prepareStatement(getIdBayar);
            stm.setString(1, id_pembayaran);
            res = stm.executeQuery();
            if(res.next()){
                awa.setId_pembayaran(res.getString("id_pembayaran"));
                awa.setTgl_pembayaran(res.getString("tgl_pembayaran"));
                awa.setId_pasien(res.getString("id_pasien"));
                awa.setId_resep(res.getString("id_resep"));
                awa.setJenis_pembayaran(res.getString("jenis_pembayaran"));
                awa.setWaktu(res.getString("waktu"));
                awa.setUser_id(res.getString("user_id"));
            }
        }catch(SQLException e){
            System.err.println("Eror di get id bayar "+e);
        }
        return awa;
    }
    
    public bayarobat getRecordByIdDetail(String id_pembayaran, String id_obat){
        bayarobat awa = new bayarobat();
        try{
            stm = con.prepareStatement(getIdDetail);
            stm.setString(1, id_pembayaran);
            stm.setString(2, id_obat);
            res = stm.executeQuery();
            if(res.next()){
                awa.setId_pembayaran(res.getString("id_pembayaran"));
                awa.setId_obat(res.getString("id_obat"));
                awa.setHarga(res.getString("harga"));
                awa.setJumlah(res.getString("jumlah"));
            }
        }catch(SQLException e){
            System.err.println("Eror di get Id Detail");
        }
        return awa;
    }
    
    public void simpanDataBayar(bayarobat bot){
        try{
            stm = con.prepareStatement(postBayar);
            stm.setString(1, bot.getId_pembayaran());
            stm.setString(2, bot.getTgl_pembayaran());
            stm.setString(3, bot.getId_pasien());
            stm.setString(4, bot.getId_resep());
            stm.setString(5, bot.getJenis_pembayaran());
            stm.setString(6, bot.getUser_id());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di simpan bayar" + e);
        }
    }
    
    public void simpanDetail(bayarobat bot){
        try{
            stm = con.prepareStatement(postDetail);
            stm.setString(1, bot.getId_pembayaran());
            stm.setString(2, bot.getId_obat());
            stm.setString(3, bot.getHarga());
            stm.setString(4, bot.getJumlah());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di simpan detail" + e);
        }
    }
    
    public void editBayar(bayarobat bot){
        try{
            stm = con.prepareStatement(putBayar);
            stm.setString(1, bot.getTgl_pembayaran());
            stm.setString(2, bot.getId_pasien());
            stm.setString(3, bot.getId_resep());
            stm.setString(4, bot.getJenis_pembayaran());
            stm.setString(5, bot.getWaktu());
            stm.setString(6, bot.getUser_id());
             stm.setString(7, bot.getId_pembayaran());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di edit bayar " + e);
        }
    }
    
    public void editDetail(bayarobat bot){
        try{
            stm = con.prepareStatement(putDetail);
            stm.setString(1, bot.getId_obat());
            stm.setString(2, bot.getHarga());
            stm.setString(3, bot.getJumlah());
            stm.setString(4, bot.getId_pembayaran());
            stm.setString(5, bot.getId_obat());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di edit detail" + e);
        }
    }
    
    public void hapusBayar(String id_pembayaran){
        try{
            stm = con.prepareStatement(deleteBayar);
            stm.setString(1, id_pembayaran);
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di hapus bayar "  + e);
        }
    }
    
    public void hapusDetail(String id_pembayaran, String id_obat){
        try{
            stm = con.prepareStatement(deleteDetail);
            stm.setString(1, id_pembayaran);
            stm.setString(2, id_obat);
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di hapus detail "  + e);
        }
    }
    
    public static void main(String[] args) {
        bayarobatDao bardo = new bayarobatDao();
        System.out.println(bardo.getAllBayarObat());
        bayarobat awa = new bayarobat();
//        awa.setId_pembayaran("P0002");
//        awa.setId_obat("OB02");
//        awa.setHarga("100");
//        awa.setJumlah("10");
//        awa.setId_pembayaran("PO000002");
//        awa.setTgl_pembayaran("2021-03-18");
//        awa.setId_pasien("PS0001");
//        awa.setId_resep("R01");
//        awa.setJenis_pembayaran("Cash");
//        awa.setUser_id("Bambang");
        
//        bardo.hapusDetail("PO000002","OB02");
    }
    
}
