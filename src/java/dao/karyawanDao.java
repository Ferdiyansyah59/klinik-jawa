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
import model.karyawan;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
public class karyawanDao {
    private final Connection Koneksi;
    private PreparedStatement preSmt;
    private ResultSet rs;
    public karyawanDao(){
        Koneksi=koneksi.getKoneksi();
    }
    
    public ArrayList<karyawan> getAllKaryawan(){
        ArrayList<karyawan> listKaryawan = new ArrayList<>();
        try{
            String sqlAllKaryawan = "SELECT * FROM karyawan ORDER BY id_karyawan";
            preSmt = Koneksi.prepareStatement(sqlAllKaryawan);
            rs = preSmt.executeQuery();
            while(rs.next()){
                karyawan karyawan = new karyawan();
                karyawan.setId_karyawan(rs.getString("id_karyawan"));
                karyawan.setNama_karyawan(rs.getString("nama_karyawan"));
                karyawan.setTgl_lahir(rs.getString("tgl_lahir"));
                karyawan.setBidang_pekerjaan(rs.getString("bidang_pekerjaan"));
                karyawan.setJenis_kelamin(rs.getString("jenis_kelamin"));
                karyawan.setAlamat(rs.getString("alamat"));
                karyawan.setNo_hp(rs.getString("no_hp"));
                karyawan.setNo_ktp(rs.getString("no_ktp"));
                karyawan.setEmail(rs.getString("email"));
                karyawan.setNo_npwp(rs.getString("no_npwp"));
                karyawan.setUser_id(rs.getString("user_id"));
                listKaryawan.add(karyawan);
            }
        }
        catch(SQLException e){
            System.out.println("ada kesalahan 1 : " + e);
        }
        return listKaryawan;
    }
    
    public karyawan getRecordById(String id_karyawan){
        karyawan karyawan = new karyawan();
        String query = "SELECT*FROM karyawan WHERE id_karyawan=?";
        try{
            preSmt = Koneksi.prepareStatement(query);
            preSmt.setString(1, id_karyawan);
            rs = preSmt.executeQuery();
            if(rs.next()){
                karyawan.setId_karyawan(rs.getString("id_karyawan"));
                karyawan.setNama_karyawan(rs.getString("nama_karyawan"));
                karyawan.setTgl_lahir(rs.getString("tgl_lahir"));
                karyawan.setBidang_pekerjaan(rs.getString("bidang_pekerjaan"));
                karyawan.setJenis_kelamin(rs.getString("jenis_kelamin"));
                karyawan.setAlamat(rs.getString("alamat"));
                karyawan.setNo_hp(rs.getString("no_hp"));
                karyawan.setNo_ktp(rs.getString("no_ktp"));
                karyawan.setEmail(rs.getString("email"));
                karyawan.setNo_npwp(rs.getString("no_npwp"));
                karyawan.setUser_id(rs.getString("user_id"));
            }
        }
        catch(SQLException e){
            System.out.println("ada kesalahan 1 : " + e);
        }
        return karyawan;
    }
        
    public void simpanData(karyawan kar, String page){
            String sqlSimpan = null;
            if (page.equals("edit")){
                sqlSimpan = "update karyawan set nama_karyawan=?, tgl_lahir=?, " +
                        "bidang_pekerjaan=?, jenis_kelamin=?, alamat=?,no_hp=?, no_ktp=?, email=?, no_npwp=?, user_id=? where id_karyawan=?";
            }
            else if (page.equals("tambah")){
                sqlSimpan = "insert into karyawan (nama_karyawan, tgl_lahir, bidang_pekerjaan, jenis_kelamin, alamat, no_hp, no_ktp, email, no_npwp, user_id, id_karyawan) " +
                        "values (?,?,?,?,?,?,?,?,?,?,?)";
            }
            try {
                preSmt = Koneksi.prepareStatement(sqlSimpan);
                preSmt.setString(11, kar.getId_karyawan());
                preSmt.setString(1, kar.getNama_karyawan());
                preSmt.setString(2, kar.getTgl_lahir());
                preSmt.setString(3, kar.getBidang_pekerjaan());
                preSmt.setString(4, kar.getJenis_kelamin());
                preSmt.setString(5, kar.getAlamat());
                preSmt.setString(6, kar.getNo_hp());
                preSmt.setString(7, kar.getNo_ktp());
                preSmt.setString(8, kar.getEmail());
                preSmt.setString(9, kar.getNo_npwp());
                preSmt.setString(10, kar.getUser_id());
                preSmt.executeUpdate();
            }
            catch (SQLException se){
                System.out.println("ada kesalahan 2 : " + se);
            }
        }
    
    public void hapusData(String Id_karyawan){
        String sqlHapus = "DELETE FROM karyawan WHERE id_karyawan=?";
        try{
            preSmt = Koneksi.prepareStatement(sqlHapus);
            preSmt.setString(1, Id_karyawan);
            preSmt.executeUpdate();
        }
        catch(SQLException e){
            System.out.println("salah disini: " + e);
        }
    }
    
    public static void main(String[] args) {
        karyawanDao kardo = new karyawanDao();
        karyawan kar = new karyawan();
        kar.setId_karyawan("KR003");
        kar.setNama_karyawan("Bambang Susanto");
        kar.setTgl_lahir("2000-01-01");
        kar.setBidang_pekerjaan("OB");
        kar.setJenis_kelamin("L");
        kar.setAlamat("JAKARTA");
        kar.setNo_hp("24242424");
        kar.setNo_ktp("32323223");
        kar.setEmail("MAIL@MAIL");
        kar.setNo_npwp("1244124124");
        kar.setUser_id("FERDI");
//        kardo.simpanData(kar, "edit");
    }
    
}
