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
import model.kamar;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
public class kamarDao {
    private final Connection Koneksi;
    private PreparedStatement preStmt;
    private ResultSet rs;
//    private Object Koneksi;
    public kamarDao(){
        Koneksi=koneksi.getKoneksi();
    }
    
    public ArrayList<kamar> getAllKamar(){
        ArrayList<kamar> listKamar=new ArrayList<>();
        try{
            String sqlAllKamar="SELECT * FROM kamar ORDER BY id_kamar";
            preStmt = Koneksi.prepareStatement(sqlAllKamar);
            rs = preStmt.executeQuery();
            while(rs.next()){
                kamar kamar1 = new kamar();
                kamar1.setId(rs.getString("id_kamar"));
                kamar1.setNamaruang(rs.getString("nama_ruang"));
                kamar1.setNo_kamar(rs.getString("no_kamar"));
                kamar1.setKelas(rs.getString("kelas"));
                kamar1.setHarga(rs.getString("harga_perhari"));
                kamar1.setDesk(rs.getString("des_kamar"));
                kamar1.setKapasitas(rs.getString("kapasitas"));
                kamar1.setIsi(rs.getString("terisi"));
                kamar1.setStatus(rs.getString("status"));
                listKamar.add(kamar1);
            } 
        }catch(SQLException se){
            System.out.println("ada kesalahan 1 : " +se);
        }
        return listKamar;
    }
    
    public kamar getRecordById(String id_kamar){
        kamar kamar1 = new kamar();
        String query = "SELECT*FROM kamar WHERE id_kamar=?";
        try{
            String sqlAllKamar="SELECT * FROM kamar ORDER BY id_kamar";
            preStmt = Koneksi.prepareStatement(query);
            preStmt.setString(1, id_kamar);
            rs = preStmt.executeQuery();
            if(rs.next()){
                kamar1.setId(rs.getString("id_kamar"));
                kamar1.setNamaruang(rs.getString("nama_ruang"));
                kamar1.setNo_kamar(rs.getString("no_kamar"));
                kamar1.setKelas(rs.getString("kelas"));
                kamar1.setHarga(rs.getString("harga_perhari"));
                kamar1.setDesk(rs.getString("des_kamar"));
                kamar1.setKapasitas(rs.getString("kapasitas"));
                kamar1.setIsi(rs.getString("terisi"));
                kamar1.setStatus(rs.getString("status"));
            } 
        }catch(SQLException se){
            System.out.println("ada kesalahan 1 : " +se);
        }
        return kamar1;
    }
    
    public void simpanData (kamar kamar, String page){
        String sqlSimpan = null;
        if (page.equals("edit")){
            sqlSimpan = "UPDATE kamar SET nama_ruang=?, no_kamar=?, kelas=?, "
                    + "harga_perhari=?, des_kamar=?, kapasitas=?, terisi=?, status=? where id_kamar=?";
        }
        else if (page.equals("tambah")){
            sqlSimpan = "INSERT INTO kamar (nama_ruang, no_kamar, kelas, harga_perhari,"
                    + "des_kamar, kapasitas, terisi, status, id_kamar) values (?,?,?,?,?,?,?,?,?)";
        }
        try{
            preStmt=Koneksi.prepareStatement(sqlSimpan);
            preStmt.setString(1, kamar.getNamaruang());
            preStmt.setString(2, kamar.getNo_kamar());
            preStmt.setString(3, kamar.getKelas());
            preStmt.setString(4, kamar.getHarga());
            preStmt.setString(5, kamar.getDesk());
            preStmt.setString(6, kamar.getKapasitas());
            preStmt.setString(7, kamar.getIsi());
            preStmt.setString(8, kamar.getStatus());
            preStmt.setString(9, kamar.getId());
            preStmt.executeUpdate();
        }catch (SQLException se){
            System.out.println("Ada Kesalahan 2 : " + se);
        }
    }
    
    public void hapusData(String id){
        String sqlHapus = "delete from kamar where id_kamar= ? ";
        try{
            preStmt=Koneksi.prepareStatement(sqlHapus);
            preStmt.setString(1, id);
            preStmt.executeUpdate();
        }
        catch (SQLException se){
            System.out.println("Salah disini : " + se);
        }
    }
    
    public static void main(String[] args) {
        kamarDao kardo = new kamarDao();
        kamar kar = new kamar();
        kar.setId("KM122");
        kar.setNamaruang("PAPA");
        kar.setNo_kamar("12");
        kar.setKelas("VIP");
        kar.setHarga("1000");
        kar.setDesk("Mantap");
        kar.setKapasitas("1000");
        kar.setIsi("10");
        kar.setStatus("OK");
//        kardo.simpanData(kar, "edit");
    }
    
    
}
