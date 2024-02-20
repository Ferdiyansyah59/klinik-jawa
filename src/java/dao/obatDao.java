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
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import model.obat;
public class obatDao {
        private final Connection Koneksi;
        private PreparedStatement preSmt;
        private ResultSet rs;

        public obatDao(){
            Koneksi = koneksi.getKoneksi();
        }
        
        public ArrayList<obat> getAllObat(){
            ArrayList<obat> listObat = new ArrayList<>();
            try{
                String sqlAllObat = "SELECT*FROM obat ORDER BY id_obat";
                preSmt = Koneksi.prepareStatement(sqlAllObat);
                rs = preSmt.executeQuery();
                while(rs.next()){
                    obat obat1 = new obat();
                    obat1.setId_obat(rs.getString("id_obat"));
                    obat1.setNama_obat(rs.getString("nama_obat"));
                    obat1.setSatuan(rs.getString("satuan"));
                    obat1.setStok(rs.getString("stok"));
                    obat1.setHarga_jual(rs.getString("harga_jual"));
                    obat1.setWaktu(rs.getString("waktu"));
                    obat1.setUser_id(rs.getString("user_id"));
                    listObat.add(obat1);
                }
            }
            catch(SQLException e){
                System.out.println("ada kesalahan 1 : " + e);
            }
            return listObat;
        }
        
        public void simpanData(obat obt){
            String  sqlSimpan = "insert into obat (id_obat, nama_obat, satuan, stok, harga_jual, user_id) values (?,?,?,?,?,?)";
            try {
                preSmt = Koneksi.prepareStatement(sqlSimpan);
                preSmt.setString(1, obt.getId_obat());
                preSmt.setString(2, obt.getNama_obat());
                preSmt.setString(3, obt.getSatuan());
                preSmt.setString(4, obt.getStok());
                preSmt.setString(5, obt.getHarga_jual());
                preSmt.setString(6, obt.getUser_id());
                preSmt.executeUpdate();
            }
            catch (SQLException se){
                System.out.println("ada kesalahan 2: " + se);
            }
        }
        
        public obat getRecordById(String id_obat){
            obat obat1 = new obat();
            String query = "SELECT*FROM obat WHERE id_obat=?";
            try{
                preSmt = Koneksi.prepareStatement(query);
                preSmt.setString(1, id_obat);
                rs = preSmt.executeQuery();
            if(rs.next()){
                obat1.setId_obat(rs.getString("id_obat"));
                obat1.setNama_obat(rs.getString("nama_obat"));
                obat1.setSatuan(rs.getString("satuan"));
                obat1.setStok(rs.getString("stok"));
                obat1.setHarga_jual(rs.getString("harga_jual"));
                obat1.setWaktu(rs.getString("waktu"));
                obat1.setUser_id(rs.getString("user_id"));
            }
        }catch(SQLException e){
            System.err.println("Eror di get record "+e);
        }
        return obat1;
        }
        
        public void editData(obat obt){
            String sqlSimpan = "update obat set nama_obat=?, satuan=?, stok=?, harga_jual=?, user_id=? WHERE id_obat=?";
            try {
                preSmt = Koneksi.prepareStatement(sqlSimpan);
                preSmt.setString(6, obt.getId_obat());
                preSmt.setString(1, obt.getNama_obat());
                preSmt.setString(2, obt.getSatuan());
                preSmt.setString(3, obt.getStok());
                preSmt.setString(4, obt.getHarga_jual());
                preSmt.setString(5, obt.getUser_id());
                preSmt.executeUpdate();
            }
            catch (SQLException se){
                System.out.println("ada kesalahan 2: " + se);
            }
        }
        
        public void hapusData(String Id_obat){
            String sqlHapus = "DELETE FROM obat WHERE id_obat=?";
            try{
                preSmt = Koneksi.prepareStatement(sqlHapus);
                preSmt.setString(1, Id_obat);
                preSmt.executeUpdate();
            }
            catch(SQLException e){
                System.out.println("Salah disini: " + e);
            }
        }
        
        public static void main(String[] args) {
            obatDao odo = new obatDao();
            System.out.println(odo.getAllObat());
            obat obt = new obat();
            obt.setId_obat("OB04");
            obt.setNama_obat("Kuat banget");
            obt.setSatuan("Pil");
            obt.setStok("0");
            obt.setHarga_jual("100000");
            obt.setUser_id("ferdi");
//            odo.editData(obt);
        }
        
}
