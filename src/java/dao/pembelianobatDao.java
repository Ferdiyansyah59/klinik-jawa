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
import model.pembelianobat;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
public class pembelianobatDao {
    private final Connection con;
    private PreparedStatement stm;
    private ResultSet res;
    private SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    
    final String getData = "SELECT pembelian_obat.*, obat.nama_obat FROM pembelian_obat, obat WHERE pembelian_obat.id_obat = obat.id_obat ORDER BY id_trans";
    final String postData = "INSERT INTO pembelian_obat (id_trans, id_supplier, no_faktur, tgl_faktur, id_obat, harga_beli, jumlah, keterangan, tgl_expired, id_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    final String putData = "UPDATE pembelian_obat SET  id_supplier=?, no_faktur=?, tgl_faktur=?, id_obat=?, harga_beli=?, jumlah=?, keterangan=?, tgl_expired=?, id_user=? WHERE id_trans=?";
    final String deleteData = "DELETE FROM pembelian_obat WHERE id_trans=?";
    final String getId = "SELECT*FROM pembelian_obat WHERE id_trans=?";
    public pembelianobatDao(){
        con = koneksi.getKoneksi();
    }
    
    public ArrayList<pembelianobat>getAllPembelianObat(){
        ArrayList<pembelianobat>listPembelian = new ArrayList();
        try{
            stm = con.prepareStatement(getData);
            res = stm.executeQuery();
            while(res.next()){
                pembelianobat awa = new pembelianobat();
                awa.setId_trans(res.getString("id_trans"));
                awa.setId_supplier(res.getString("id_supplier"));
                awa.setNo_faktur(res.getString("no_faktur"));
                awa.setTgl_faktur(res.getString("tgl_faktur"));
                awa.setId_obat(res.getString("id_obat"));
                awa.setHarga_beli(res.getString("harga_beli"));
                awa.setJumlah(res.getString("jumlah"));
                awa.setKeterangan(res.getString("keterangan"));
                awa.setTgl_expired(res.getString("tgl_expired"));
                awa.setId_user(res.getString("id_user"));
                awa.setWaktu(res.getString("waktu"));
                awa.setNama_obat(res.getString("nama_obat"));
                listPembelian.add(awa);
            }
        }catch(SQLException e){
            System.err.println("Eror di get " + e);
        }
        return listPembelian;
    }
    
    public pembelianobat getRecordById(String id_trans){
        pembelianobat awa = new pembelianobat();
        try{
            stm = con.prepareStatement(getId);
            stm.setString(1, id_trans);
            res = stm.executeQuery();
            if(res.next()){
                awa.setId_trans(res.getString("id_trans"));
                awa.setId_supplier(res.getString("id_supplier"));
                awa.setNo_faktur(res.getString("no_faktur"));
                awa.setTgl_faktur(res.getString("tgl_faktur"));
                awa.setId_obat(res.getString("id_obat"));
                awa.setHarga_beli(res.getString("harga_beli"));
                awa.setJumlah(res.getString("jumlah"));
                awa.setKeterangan(res.getString("keterangan"));
                awa.setTgl_expired(res.getString("tgl_expired"));
                awa.setId_user(res.getString("id_user"));
            }
        }catch(SQLException e){
            System.err.println("Eror di get Id "+e);
        }
        return awa;
    }
    
    public void simpanData(pembelianobat pem){
        try{
            stm = con.prepareStatement(postData);
            stm.setString(1, pem.getId_trans());
            stm.setString(2, pem.getId_supplier());
            stm.setString(3, pem.getNo_faktur());
            stm.setString(4, pem.getTgl_faktur());
            stm.setString(5, pem.getId_obat());
            stm.setString(6, pem.getHarga_beli());
            stm.setString(7, pem.getJumlah());
            stm.setString(8, pem.getKeterangan());
            stm.setString(9, pem.getTgl_expired());
            stm.setString(10, pem.getId_user());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di simpan "+e);
        }
    }
    
    public void editData(pembelianobat pem){
        try{
            stm = con.prepareStatement(putData);
            stm.setString(1, pem.getId_supplier());
            stm.setString(2, pem.getNo_faktur());
            stm.setString(3, pem.getTgl_faktur());
            stm.setString(4, pem.getId_obat());
            stm.setString(5, pem.getHarga_beli());
            stm.setString(6, pem.getJumlah());
            stm.setString(7, pem.getKeterangan());
            stm.setString(8, pem.getTgl_expired());
            stm.setString(9, pem.getId_user());
            stm.setString(10, pem.getId_trans());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di edit"+e);
        }
    }
    
    public void hapusData(String id_trans){
        try{
            stm = con.prepareStatement(deleteData);
            stm.setString(1, id_trans);
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di delete "+e);
        }
    }
    
    public static void main(String[] args) {
        pembelianobatDao pemdo = new pembelianobatDao();
        System.out.println(pemdo.getRecordById("T02"));
        pembelianobat awa = new pembelianobat();
        awa.setId_trans("T02");
        awa.setId_supplier("SP001");
        awa.setNo_faktur("009181931");
        awa.setTgl_faktur("2021-02-02");
        awa.setId_obat("OB02");
        awa.setHarga_beli("5000");
        awa.setJumlah("200");
        awa.setKeterangan("Lunas");
        awa.setTgl_expired("2030-01-01");
        awa.setId_user("ferdi");
//        pemdo.simpanData(awa);
    }
    
}
