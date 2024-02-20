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
import model.bayarlayanan;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
public class bayarlayananDao {
    private final Connection con;
    private PreparedStatement stm;
    private ResultSet res;
    private SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    
    final String getBayar = "SELECT bayar_layanan.*, layanan.des_layanan, detail_layanan.des_detail_layanan, detail_layanan.biaya_layanan, pasien.nama_pasien FROM bayar_layanan, layanan, detail_layanan, pasien WHERE bayar_layanan.id_pasien = pasien.id_pasien AND bayar_layanan.id_layanan = layanan.id_layanan AND bayar_layanan.id_detail_layanan = detail_layanan.id_detail_layanan AND bayar_layanan.id_layanan = detail_layanan.id_layanan  ORDER BY id_bayar_layanan";
    final String postBayar = "INSERT INTO bayar_layanan (id_bayar_layanan, id_layanan, id_detail_layanan, id_pasien, tgl_layanan, keterangan) VALUES (?, ?, ?, ?, ?, ?)";
    final String putBayar = "UPDATE bayar_layanan SET id_layanan=?, id_detail_layanan=?, id_pasien=?, tgl_layanan=?, keterangan=? WHERE id_bayar_layanan=?";
    final String deleteBayar = "DELETE FROM bayar_layanan WHERE id_bayar_layanan=?";
    final String getId = "SELECT*FROM bayar_layanan WHERE id_bayar_layanan=?";
    public bayarlayananDao(){
        con = koneksi.getKoneksi();
    }
    
    public ArrayList<bayarlayanan>getAllBayarLayanan(){
        ArrayList<bayarlayanan>listBayar = new ArrayList();
        try{
            stm = con.prepareStatement(getBayar);
            res = stm.executeQuery();
            while(res.next()){
                bayarlayanan awa = new bayarlayanan();
                awa.setId_bayar_layanan(res.getString("id_bayar_layanan"));
                awa.setId_layanan(res.getString("id_layanan"));
                awa.setId_detail_layanan(res.getString("id_detail_layanan"));
                awa.setId_pasien(res.getString("id_pasien"));
                awa.setTgl_layanan(res.getString("tgl_layanan"));
                awa.setKeterangan(res.getString("keterangan"));
                awa.setDes_layanan(res.getString("des_layanan"));
                awa.setDes_detail_layanan(res.getString("des_detail_layanan"));
                awa.setNama_pasien(res.getString("nama_pasien"));
                awa.setBiaya_layanan(res.getString("biaya_layanan"));
                
                listBayar.add(awa);
            }
        }catch(SQLException e){
            System.err.println("Eror di get "+e);
        }
        return listBayar;
    }
    
    public bayarlayanan getRecordById(String id_bayar_layanan){
        bayarlayanan awa = new bayarlayanan();
        try{
            stm = con.prepareStatement(getId);
            stm.setString(1, id_bayar_layanan);
            res = stm.executeQuery();
            if(res.next()){
                awa.setId_bayar_layanan(res.getString("id_bayar_layanan"));
                awa.setId_layanan(res.getString("id_layanan"));
                awa.setId_detail_layanan(res.getString("id_detail_layanan"));
                awa.setId_pasien(res.getString("id_pasien"));
                awa.setTgl_layanan(res.getString("tgl_layanan"));
                awa.setKeterangan(res.getString("keterangan"));
            }
        }catch(SQLException e){
            System.err.println("Eror di get id " + e);
        }
        return awa;
    }
    
    public void simpanData(bayarlayanan bar){
        try{
            stm = con.prepareStatement(postBayar);
            stm.setString(1, bar.getId_bayar_layanan());
            stm.setString(2, bar.getId_layanan());
            stm.setString(3, bar.getId_detail_layanan());
            stm.setString(4, bar.getId_pasien());
            stm.setString(5, bar.getTgl_layanan());
            stm.setString(6, bar.getKeterangan());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di simpan "+e);
        }
    }
    
    public void editData(bayarlayanan bar){
        try{
            stm = con.prepareStatement(putBayar);
            stm.setString(1, bar.getId_layanan());
            stm.setString(2, bar.getId_detail_layanan());
            stm.setString(3, bar.getId_pasien());
            stm.setString(4, bar.getTgl_layanan());
            stm.setString(5, bar.getKeterangan());
            stm.setString(6, bar.getId_bayar_layanan());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di edit "+e);
        }
    }
    
    public void hapusData(String id_bayar_layanan){
        try{
            stm = con.prepareStatement(deleteBayar);
            stm.setString(1, id_bayar_layanan);
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di delete "+e);
        }
    }
    
    public static void main(String[] args) {
        bayarlayananDao lay = new bayarlayananDao();
        System.out.println(lay.getAllBayarLayanan());
        bayarlayanan awa = new bayarlayanan();
        awa.setId_bayar_layanan("B003");
        awa.setId_layanan("L02");
        awa.setId_detail_layanan("DL001");
        awa.setId_pasien("P001");
        awa.setTgl_layanan("2020-06-06");
        awa.setKeterangan("Mantul tap");
        lay.simpanData(awa);
    }
}
