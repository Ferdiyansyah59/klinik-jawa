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
import model.pendaftaran;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
public class pendaftaranDao {
    private final Connection Koneksi;
    private PreparedStatement preStmt;
    private ResultSet rs;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date date = new Date();
//    private Object Koneksi;
    public pendaftaranDao(){
        Koneksi=koneksi.getKoneksi();
    }
    
    public ArrayList<pendaftaran> getAllpendaftaran(){
        ArrayList<pendaftaran> listpendaftaran=new ArrayList<>();
        try{
            String sqlAlldaftar="SELECT pendaftaran.*, pasien.nama_pasien, dokter.nama_dokter, poli.nama_poli FROM pasien, pendaftaran, dokter, poli WHERE pendaftaran.id_pasien = pasien.id_pasien AND pendaftaran.id_poli = poli.id_poli AND pendaftaran.id_dokter = dokter.id_dokter ORDER BY tgl_daftar DESC";
            preStmt = Koneksi.prepareStatement(sqlAlldaftar);
            rs = preStmt.executeQuery();
            while(rs.next()){
                pendaftaran daftar = new pendaftaran();
                daftar.setNoantri(rs.getString("no_antrian"));
                daftar.setNamapasien(rs.getString("nama_pasien"));
                daftar.setIdpasien(rs.getString("id_pasien"));
                daftar.setIdpoli(rs.getString("id_poli"));
                daftar.setNamapoli(rs.getString("nama_poli"));
                daftar.setTgl(rs.getString("tgl_daftar"));
                daftar.setKeterangan(rs.getString("keterangan"));
                daftar.setNamadokter(rs.getString("nama_dokter"));
                listpendaftaran.add(daftar);
            }  
        }catch(SQLException se){
            System.out.println("ada kesalahan 1 : " +se);
        }
        return listpendaftaran;
    }
    
    public ArrayList<pendaftaran> getAllpendaftaranByTgl(String tgl_daftar){
        ArrayList<pendaftaran> listpendaftaran=new ArrayList<>();
        try{
            String sqlAlldaftar="SELECT pendaftaran.*, pasien.nama_pasien, dokter.nama_dokter, poli.nama_poli FROM pasien, pendaftaran, dokter, poli WHERE pendaftaran.id_pasien = pasien.id_pasien AND pendaftaran.id_poli = poli.id_poli AND pendaftaran.id_dokter = dokter.id_dokter AND tgl_daftar=? ORDER BY no_antrian ASC";
            preStmt = Koneksi.prepareStatement(sqlAlldaftar);
            preStmt.setString(1, tgl_daftar);
            rs = preStmt.executeQuery();
            while(rs.next()){
                pendaftaran daftar = new pendaftaran();
                daftar.setNoantri(rs.getString("no_antrian"));
                daftar.setNamapasien(rs.getString("nama_pasien"));
                daftar.setIdpasien(rs.getString("id_pasien"));
                daftar.setIdpoli(rs.getString("id_poli"));
                daftar.setNamapoli(rs.getString("nama_poli"));
                daftar.setTgl(rs.getString("tgl_daftar"));
                daftar.setKeterangan(rs.getString("keterangan"));
                daftar.setNamadokter(rs.getString("nama_dokter"));
                listpendaftaran.add(daftar);
            }  
        }catch(SQLException se){
            System.out.println("ada kesalahan 1 : " +se);
        }
        return listpendaftaran;
    }
    
    public pendaftaran getRecordByNoantri(String no_antrian, String tgl_daftar){
        pendaftaran daftar = new pendaftaran();
        String query = "SELECT*FROM pendaftaran WHERE no_antrian=? AND tgl_daftar=?";
        try{
            preStmt = Koneksi.prepareStatement(query);
            preStmt.setString(1, no_antrian);
            preStmt.setString(2, tgl_daftar);
            rs = preStmt.executeQuery();
            if(rs.next()){
                daftar.setNoantri(rs.getString("no_antrian"));
                daftar.setIdpasien(rs.getString("id_pasien"));
                daftar.setIdpoli(rs.getString("id_poli"));
                daftar.setTgl(rs.getString("tgl_daftar"));
                daftar.setKeterangan(rs.getString("keterangan"));
                daftar.setId_dokter(rs.getString("id_dokter"));
            }  
        }catch(SQLException se){
            System.out.println("ada kesalahan 1 : " +se);
        }
        return daftar;
    }
    
    public pendaftaran getTanggalPoli(){
        pendaftaran daftar = new pendaftaran();
        String query = "SELECT tgl_daftar, no_antrian FROM pendaftaran ORDER BY no_antrian DESC LIMIT 1";
        try{
            preStmt = Koneksi.prepareStatement(query);
            rs = preStmt.executeQuery();
            if(rs.next()){
                daftar.setTgl(rs.getString("tgl_daftar"));
                daftar.setNoantri(rs.getString("no_antrian"));
            }
        }catch(SQLException e){
            System.err.println("Eror di getTanggal");
        }
        return daftar;
    }
    
    public void simpanData (pendaftaran daftar, String page){
        String sqlSimpan = null;
        if (page.equals("edit")){
            sqlSimpan = "UPDATE pendaftaran SET id_pasien=?, id_poli=?, "
                    + "keterangan=?, user_id=?,  id_dokter=? where no_antrian=? AND tgl_daftar=?";
        }
        else if (page.equals("tambah")){
            sqlSimpan = "INSERT INTO pendaftaran (id_pasien, id_poli, "
                    + "keterangan, user_id,  id_dokter, no_antrian , tgl_daftar) values (?,?,?,?,?,?,?)";
        }
        try{
            preStmt=Koneksi.prepareStatement(sqlSimpan);
            preStmt.setString(1, daftar.getIdpasien());
            preStmt.setString(2, daftar.getIdpoli());
            preStmt.setString(3, daftar.getKeterangan());
            preStmt.setString(4, daftar.getUser_id());
            preStmt.setString(5, daftar.getId_dokter());
            preStmt.setString(6, daftar.getNoantri());
            preStmt.setString(7, daftar.getTgl());
            preStmt.executeUpdate();
        }catch (SQLException se){
            System.out.println("Ada Kesalahan 2 : " + se);
        }
    }
    
    
    public void hapusData(String noantri, String tgl_daftar){
        String sqlHapus = "delete from pendaftaran where no_antrian=? AND tgl_daftar=? ";
        try{
            preStmt=Koneksi.prepareStatement(sqlHapus);
            preStmt.setString(1, noantri);
            preStmt.setString(2, tgl_daftar);
            preStmt.executeUpdate();
        }
        catch (SQLException se){
            System.out.println("Salah disini HAPUS: " + se);
        }
    }
    
    
    public static void main(String[] args) {
        pendaftaranDao pendo = new pendaftaranDao();
        System.out.println(pendo.getAllpendaftaran());
        pendaftaran awa = new pendaftaran();
        awa.setNoantri("1");
        awa.setIdpasien("PS0003");
        awa.setIdpoli("P01");
        awa.setTgl("2021-03-23");
        awa.setKeterangan("Menunggu Antrian");
        awa.setUser_id("bambang");
        awa.setId_dokter("D0003");
        pendo.simpanData(awa, "tambah");
    }
    
}
