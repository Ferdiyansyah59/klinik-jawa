package dao;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ferdi
 */
import connection.koneksi;
import model.dokter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;  
import java.util.ArrayList;
public class dokterDao {
    private final Connection con;
    private PreparedStatement stm;
    private ResultSet res;
    private SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    
    final String getDokter = "SELECT dokter.* , poli.nama_poli FROM dokter, poli WHERE dokter.id_poli = poli.id_poli ORDER BY id_dokter";
    final String postDokter = "INSERT INTO dokter (id_dokter, nama_dokter, tgl_lahir, id_poli, jenis_kelamin, alamat, no_hp, no_ktp, spesialis, password, email, no_npwp, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    final String deleteDokter = "DELETE FROM dokter WHERE id_dokter = ? ";
    final String putDokter = "UPDATE dokter SET nama_dokter=?, tgl_lahir=?, id_poli=?, jenis_kelamin=?, alamat=?, no_hp=?, no_ktp=?, spesialis=?, password=?, email=?, no_npwp=?, user_id=? WHERE id_dokter=?";
    final String getId = "SELECT*FROM dokter WHERE id_dokter=?";
    
    public dokterDao(){
        con = koneksi.getKoneksi();
    }
    
    public ArrayList<dokter>getAllDokter(){
        ArrayList<dokter>listDokter = new ArrayList();
        try{
            stm = con.prepareStatement(getDokter);
            res = stm.executeQuery();
            while(res.next()){
                dokter awa = new dokter();
                awa.setId_dokter(res.getString("id_dokter"));
                awa.setNama_dokter(res.getString("nama_dokter"));
                awa.setTgl_lahir(res.getString("tgl_lahir"));
                awa.setId_poli(res.getString("id_poli"));
                awa.setJenis_kelamin(res.getString("jenis_kelamin"));
                awa.setAlamat(res.getString("alamat"));
                awa.setNo_hp(res.getString("no_hp"));
                awa.setNo_ktp(res.getString("no_ktp"));
                awa.setSpesialis(res.getString("spesialis"));
                awa.setPassword(res.getString("password"));
                awa.setEmail(res.getString("email"));
                awa.setNo_npwp(res.getString("no_npwp"));
                awa.setUser_id(res.getString("user_id"));
                awa.setWaktu(res.getString("waktu"));
                awa.setNama_poli(res.getString("nama_poli"));
                listDokter.add(awa);
            }
        }catch(SQLException e){
            System.err.println("Eror di get"+e);
        }
        return listDokter;
    }
    
    public void simpanData(dokter dok){
        try{
            stm = con.prepareStatement(postDokter);
            stm.setString(1, dok.getId_dokter());
            stm.setString(2, dok.getNama_dokter());
            stm.setString(3, dok.getTgl_lahir());
            stm.setString(4, dok.getId_poli());
            stm.setString(5, dok.getJenis_kelamin());
            stm.setString(6, dok.getAlamat());
            stm.setString(7, dok.getNo_hp());
            stm.setString(8, dok.getNo_ktp());
            stm.setString(9, dok.getSpesialis());
            stm.setString(10, dok.getPassword());
            stm.setString(11, dok.getEmail());
            stm.setString(12, dok.getNo_npwp());
            stm.setString(13, dok.getUser_id());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di simpan " + e);
        }
    }
    
    public dokter getRecordById(String id_dokter){
        dokter awa = new dokter();
        try{
            stm = con.prepareStatement(getId);
            stm.setString(1, id_dokter);
            res = stm.executeQuery();
            if(res.next()){
                awa.setId_dokter(res.getString("id_dokter"));
                awa.setNama_dokter(res.getString("nama_dokter"));
                awa.setTgl_lahir(res.getString("tgl_lahir"));
                awa.setId_poli(res.getString("id_poli"));
                awa.setJenis_kelamin(res.getString("jenis_kelamin"));
                awa.setAlamat(res.getString("alamat"));
                awa.setNo_hp(res.getString("no_hp"));
                awa.setNo_ktp(res.getString("no_ktp"));
                awa.setSpesialis(res.getString("spesialis"));
                awa.setPassword(res.getString("password"));
                awa.setEmail(res.getString("email"));
                awa.setNo_npwp(res.getString("no_npwp"));
                awa.setUser_id(res.getString("user_id"));
            }
        }catch(SQLException e){
            System.err.println("Eror di get record "+e);
        }
        return awa;
    }
    
    public void editData(dokter dok){
        try{
            stm = con.prepareStatement(putDokter);
            stm.setString(1, dok.getNama_dokter());
            stm.setString(2, dok.getTgl_lahir());
            stm.setString(3, dok.getId_poli());
            stm.setString(4, dok.getJenis_kelamin());
            stm.setString(5, dok.getAlamat());
            stm.setString(6, dok.getNo_hp());
            stm.setString(7, dok.getNo_ktp());
            stm.setString(8, dok.getSpesialis());
            stm.setString(9, dok.getPassword());
            stm.setString(10, dok.getEmail());
            stm.setString(11, dok.getNo_npwp());
            stm.setString(12, dok.getUser_id());
            stm.setString(13, dok.getId_dokter());
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di edit "+e);
        }  
    }
    
    public void hapusData(String id_dokter){
        try{
            stm = con.prepareStatement(deleteDokter);
            stm.setString(1, id_dokter);
            stm.executeUpdate();
        }catch(SQLException e){
            System.err.println("Eror di hapus "  + e);
        }
    }
    
    public static void main(String[] args) {
//        Read
        dokterDao perdi = new dokterDao();
        System.out.println(perdi.getRecordById("D001"));
        
//        Buat masukin datanya
        dokter dok = new dokter();
        dok.setId_dokter("124");
        dok.setNama_dokter("Sumanto");
        dok.setTgl_lahir("1992-02-02");
        dok.setId_poli("P0");
        dok.setJenis_kelamin("L");
        dok.setAlamat("Jl jalan");
        dok.setNo_hp("089829829");
        dok.setNo_ktp("0090990909");
        dok.setSpesialis("Jantung");
        dok.setPassword("12345");
        dok.setEmail("email.mail.com");
        dok.setNo_npwp("090292");
        dok.setUser_id("Ferdi");
          
//        Simpan
//        perdi.simpanData(dok, "simpan");

//        edit
//         perdi.simpanData(dok, "edit");
        
//        Hapus
//        perdi.hapusData("124");
    }
}
