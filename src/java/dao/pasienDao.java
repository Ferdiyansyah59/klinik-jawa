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
import model.pasien;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
public class pasienDao {
    private final Connection Koneksi;
    private PreparedStatement preSmt;
    private ResultSet rs;

    public pasienDao(){
        Koneksi = koneksi.getKoneksi();
    }
    
    public ArrayList<pasien> getAllPasien(){
        ArrayList<pasien> listPasien = new ArrayList<>();
        try{
            String sqlAllObat = "SELECT * FROM pasien ORDER BY id_pasien";
            preSmt = Koneksi.prepareStatement(sqlAllObat);
            rs = preSmt.executeQuery();
            while(rs.next()){
                pasien pasien = new pasien();
                pasien.setId_pasien(rs.getString("id_pasien"));
                pasien.setNama_pasien(rs.getString("nama_pasien"));
                pasien.setTgl_lahir(rs.getString("tgl_lahir"));
                pasien.setJenkel(rs.getString("jenis_kelamin"));
                pasien.setNo_ktp(rs.getString("no_ktp"));
                pasien.setAlamat(rs.getString("alamat"));
                pasien.setNo_hp(rs.getString("no_hp"));
                pasien.setGol_dar(rs.getString("gol_darah"));
                pasien.setPassword(rs.getString("password"));
                pasien.setUser_id(rs.getString("user_id"));
                pasien.setWaktu(rs.getString("waktu"));
                listPasien.add(pasien);
            }
        }
        catch(SQLException e){
            System.out.println("ada kesalahan 1 : " + e);
        }
        return listPasien;
    }
    
    public pasien getRecordById(String id_pasien){
        pasien pasien = new pasien();
        String query = "SELECT*FROM pasien WHERE id_pasien=?";
        try{
            preSmt = Koneksi.prepareStatement(query);
            preSmt.setString(1, id_pasien);
            rs = preSmt.executeQuery();
            if(rs.next()){
                pasien.setId_pasien(rs.getString("id_pasien"));
                pasien.setNama_pasien(rs.getString("nama_pasien"));
                pasien.setTgl_lahir(rs.getString("tgl_lahir"));
                pasien.setJenkel(rs.getString("jenis_kelamin"));
                pasien.setNo_ktp(rs.getString("no_ktp"));
                pasien.setAlamat(rs.getString("alamat"));
                pasien.setNo_hp(rs.getString("no_hp"));
                pasien.setGol_dar(rs.getString("gol_darah"));
                pasien.setPassword(rs.getString("password"));
                pasien.setUser_id(rs.getString("user_id"));
                pasien.setWaktu(rs.getString("waktu"));
            }
        }catch(SQLException e){
            System.err.println("Eror di get id "+e);
        }
        return pasien;
    }
    
    public void simpanData(pasien obt, String page){
            String sqlSimpan = null;
            if (page.equals("edit")){
                sqlSimpan = "update pasien set nama_pasien=?, tgl_lahir=?, jenis_kelamin=?, no_ktp=?, alamat=?, no_hp=?, gol_darah=?, " +
                        "password=?, user_id=? WHERE id_pasien=?";
            }
            else if (page.equals("tambah")){
                sqlSimpan = "insert into pasien (nama_pasien, tgl_lahir, jenis_kelamin, no_ktp, alamat, no_hp, gol_darah, password, user_id, id_pasien) " +
                        "values (?,?,?,?,?,?,?,?,?,?)";
            }
            try {
                preSmt = Koneksi.prepareStatement(sqlSimpan);
                preSmt.setString(10, obt.getId_pasien());
                preSmt.setString(1, obt.getNama_pasien());
                preSmt.setString(2, obt.getTgl_lahir());
                preSmt.setString(3, obt.getJenkel());
                preSmt.setString(4, obt.getNo_ktp());
                preSmt.setString(5, obt.getAlamat());
                preSmt.setString(6, obt.getNo_hp());
                preSmt.setString(7, obt.getGol_dar());
                preSmt.setString(8, obt.getPassword());
                preSmt.setString(9, obt.getUser_id());
                preSmt.executeUpdate();
            }
            catch (SQLException se){
                System.out.println("ada kesalahan 2: " + se);
            }
        }
    
        public void hapusData(String id_pasien){
            String sqlHapus = "DELETE FROM pasien WHERE id_pasien=?";
            try{
                preSmt = Koneksi.prepareStatement(sqlHapus);
                preSmt.setString(1, id_pasien);
                preSmt.executeUpdate();
            }
            catch(SQLException e){
                System.out.println("Salah disini hapus: " + e);
            }
        }
        
        public static void main(String[] args) {
            pasienDao pado = new pasienDao();
            System.out.println(pado.getAllPasien());
            pasien pas = new pasien();
            pas.setId_pasien("PS0003");
            pas.setNama_pasien("Aina");
            pas.setTgl_lahir("2003-09-30");
            pas.setJenkel("P");
            pas.setNo_ktp("999091019");
            pas.setAlamat("Jakarta");
            pas.setNo_hp("081298080873");
            pas.setGol_dar("O");
            pas.setPassword("aina");
            pas.setUser_id("ferdi");
//            pado.simpanData(pas, "tambah");
        }
        
        
}
