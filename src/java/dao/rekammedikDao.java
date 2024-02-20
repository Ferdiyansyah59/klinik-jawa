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
import model.rekammedik;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
public class rekammedikDao {
    private final Connection Koneksi;
    private PreparedStatement preSmt;
    private ResultSet rs;
    // tanggal
    private final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    public rekammedikDao(){
        Koneksi = koneksi.getKoneksi();
    }
    
    public ArrayList<rekammedik> getAllRekamMedik(){
        ArrayList<rekammedik> listRekdik = new ArrayList<>();
        try{
            String sqlAllRekamMedik = "SELECT rekam_medik.*, pasien.tgl_lahir, pasien.nama_pasien, poli.nama_poli, pasien.gol_darah, dokter.nama_dokter FROM rekam_medik, pasien, poli, dokter WHERE rekam_medik.id_pasien = pasien.id_pasien AND rekam_medik.id_poli = poli.id_poli AND rekam_medik.id_dokter = dokter.id_dokter ORDER BY rekam_medik.id_pasien";
            preSmt = Koneksi.prepareStatement(sqlAllRekamMedik);
            rs = preSmt.executeQuery();
            while(rs.next()){
                rekammedik rmedik = new rekammedik();
                rmedik.setId_pasien(rs.getString("id_pasien"));
                rmedik.setTgl_daftar(rs.getString("tgl_daftar"));
                rmedik.setId_poli(rs.getString("id_poli"));
                rmedik.setTekanan(rs.getString("tek_darah"));
                rmedik.setBerat(rs.getString("berat"));
                rmedik.setTinggi(rs.getString("tinggi"));
                rmedik.setKeluhan(rs.getString("keluhan"));
                rmedik.setTidakan(rs.getString("tindakan"));
                rmedik.setSaran(rs.getString("saran"));
                rmedik.setId_dokter(rs.getString("id_dokter"));
                rmedik.setId_resep(rs.getString("id_resep"));
                rmedik.setDiagnosa(rs.getString("diagnosa"));
                rmedik.setWaktu(rs.getString("waktu"));
                rmedik.setUser_id(rs.getString("user_id"));
                rmedik.setGol_darah(rs.getString("gol_darah"));
                rmedik.setNama_poli(rs.getString("nama_poli"));
                rmedik.setNama_dokter(rs.getString("nama_dokter"));
                rmedik.setNama_pasien(rs.getString("nama_pasien"));
                rmedik.setTgl_lahir(rs.getString("tgl_lahir"));
                listRekdik.add(rmedik);
            }
        }
        catch(SQLException e){
            System.out.println("ada kesalahan 1 : " + e);
        }
        return listRekdik;
    }
    
    public rekammedik getRecordById(String id_pasien){
        String query = "SELECT*FROM rekam_medik WHERE id_pasien=?";
        rekammedik rmedik = new rekammedik();
        try{
            preSmt = Koneksi.prepareStatement(query);
            preSmt.setString(1, id_pasien);
            rs = preSmt.executeQuery();
            if(rs.next()){
                rmedik.setId_pasien(rs.getString("id_pasien"));
                rmedik.setTgl_daftar(rs.getString("tgl_daftar"));
                rmedik.setId_poli(rs.getString("id_poli"));
                rmedik.setTekanan(rs.getString("tek_darah"));
                rmedik.setBerat(rs.getString("berat"));
                rmedik.setTinggi(rs.getString("tinggi"));
                rmedik.setKeluhan(rs.getString("keluhan"));
                rmedik.setTidakan(rs.getString("tindakan"));
                rmedik.setSaran(rs.getString("saran"));
                rmedik.setId_dokter(rs.getString("id_dokter"));
                rmedik.setId_resep(rs.getString("id_resep"));
                rmedik.setDiagnosa(rs.getString("diagnosa"));
                rmedik.setWaktu(rs.getString("waktu"));
                rmedik.setUser_id(rs.getString("user_id"));
            }
        }
        catch(SQLException e){
            System.out.println("ada kesalahan getId : " + e);
        }
        return rmedik;
    }
    
    public void simpanData(rekammedik rmedik, String page){
            String sqlSimpan = null;
            if (page.equals("edit")){
                sqlSimpan = "update rekam_medik set  tgl_daftar=?, id_poli=?, tek_darah=?, berat=?, tinggi=?, keluhan=?, tindakan=?, saran=?, id_dokter=?, id_resep=?, diagnosa=? " +
                        ",user_id=? WHERE id_pasien=?";
            }
            else if (page.equals("tambah")){
                sqlSimpan = "insert into rekam_medik ( tgl_daftar, id_poli, tek_darah, berat, tinggi, keluhan, tindakan, saran, id_dokter, id_resep, diagnosa, user_id, id_pasien) " +
                        "values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
            }
            try {
                preSmt = Koneksi.prepareStatement(sqlSimpan);
                preSmt.setString(13, rmedik.getId_pasien());
                preSmt.setString(1, rmedik.getTgl_daftar());    
                preSmt.setString(2, rmedik.getId_poli());
                preSmt.setString(3, rmedik.getTekanan());
                preSmt.setString(4, rmedik.getBerat());
                preSmt.setString(5, rmedik.getTinggi());
                preSmt.setString(6, rmedik.getKeluhan());
                preSmt.setString(7, rmedik.getTidakan());
                preSmt.setString(8, rmedik.getSaran());
                preSmt.setString(9, rmedik.getId_dokter());
                preSmt.setString(10, rmedik.getId_resep());
                preSmt.setString(11, rmedik.getDiagnosa());
                preSmt.setString(12, rmedik.getUser_id());
                preSmt.executeUpdate();
            }
            catch (SQLException se){
                System.out.println("ada kesalahan 2: " + se);
            }
        }
        
    public void hapusData(String id_pasien){
        String sqlHapus = "DELETE FROM rekam_medik WHERE id_pasien=?";
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
        rekammedikDao rekdo = new rekammedikDao();
        rekammedik rmedik = new rekammedik();
        rmedik.setId_pasien("PS0003");
        rmedik.setTgl_daftar("2021-03-20");
        rmedik.setId_poli("P01");
        rmedik.setTekanan("100/80");
        rmedik.setBerat("50");
        rmedik.setTinggi("163");
        rmedik.setKeluhan("Pusing");
        rmedik.setTidakan("Tidur");
        rmedik.setSaran("banyak tidur");
        rmedik.setId_dokter("D0001");
        rmedik.setId_resep("R01");
        rmedik.setDiagnosa("Capek");
        rmedik.setUser_id("Bambang");
        rekdo.simpanData(rmedik, "edit");
    }
}
