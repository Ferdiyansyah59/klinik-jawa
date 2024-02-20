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
import model.rawatinap;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
public class rawatinapDao {
    private final Connection Koneksi;
    private PreparedStatement preStmt;
    private ResultSet rs;
    private final SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
//    private Object Koneksi;
    public rawatinapDao(){
        Koneksi=koneksi.getKoneksi();
    }
            
   public ArrayList<rawatinap>getAllrawatinap(){
        ArrayList<rawatinap> listrawatinap=new ArrayList<>();
        try{
            String sqlAllrawatinap=" SELECT rawat_inap.*, pasien.nama_pasien, kamar.nama_ruang FROM rawat_inap,kamar, pasien WHERE rawat_inap.id_pasien=pasien.id_pasien AND rawat_inap.id_kamar = kamar.id_kamar ORDER BY id_rawat;";
            preStmt = Koneksi.prepareStatement(sqlAllrawatinap);
            rs = preStmt.executeQuery();
            while(rs.next()){
                rawatinap rawat = new rawatinap();
                rawat.setIdrawat(rs.getString("id_rawat"));
                rawat.setNamapasien(rs.getString("nama_pasien"));
                rawat.setIdkamar(rs.getString("id_kamar"));
                rawat.setNamaruang(rs.getString("nama_ruang"));
                rawat.setTglcekin(rs.getString("tgl_cekin"));
                rawat.setTglcekout(rs.getString("tgl_cekout"));
                rawat.setKeterangan(rs.getString("keterangan"));
                rawat.setNamapasien(rs.getString("nama_pasien"));
                listrawatinap.add(rawat);
            }
        }catch(SQLException se){
            System.out.println("ada kesalahan 1 : " +se);
        }
        return listrawatinap;
    }
   
   public rawatinap getRecordByIdrawat(String id_rawat){
       rawatinap rawat = new rawatinap();
       String query = "SELECT*FROM rawat_inap WHERE id_rawat=?";
       try{
            preStmt = Koneksi.prepareStatement(query);
            preStmt.setString(1, id_rawat);
            rs = preStmt.executeQuery();
            if(rs.next()){
                rawat.setIdrawat(rs.getString("id_rawat"));
                rawat.setIdpasien(rs.getString("id_pasien"));
                rawat.setIdkamar(rs.getString("id_kamar"));
                rawat.setTglcekin(rs.getString("tgl_cekin"));
                rawat.setTglcekout(rs.getString("tgl_cekout"));
                rawat.setKeterangan(rs.getString("keterangan"));
            }
        }catch(SQLException se){
            System.out.println("ada kesalahan get id : " +se);
        }
       return rawat;
   }
   
   public void simpanData (rawatinap rawat, String page){
        String sqlSimpan = null;
        if (page.equals("edit")){
            sqlSimpan = "UPDATE rawat_inap SET id_pasien=?, id_kamar=?, "
                    + "tgl_cekin=?, tgl_cekout=?, keterangan=? where id_rawat=?";
        }
        else if (page.equals("tambah")){
            sqlSimpan = "INSERT INTO rawat_inap (id_pasien, id_kamar,"
                    + "tgl_cekin, tgl_cekout, keterangan, id_rawat) values (?,?,?,?,?,?)";
        }
        try{
            preStmt=Koneksi.prepareStatement(sqlSimpan);
            preStmt.setString(1, rawat.getIdpasien());
            preStmt.setString(2, rawat.getIdkamar());
            preStmt.setString(3, rawat.getTglcekin());
            preStmt.setString(4, rawat.getTglcekout());
            preStmt.setString(5, rawat.getKeterangan());
            preStmt.setString(6, rawat.getIdrawat());
            preStmt.executeUpdate();
        }catch (SQLException se){
            System.out.println("Ada Kesalahan 2 : " + se);
        }
    }
    
   public void hapusData(String idrawat){
        String sqlHapus = "delete from rawat_inap where id_rawat = ? ";
        try{
            preStmt=Koneksi.prepareStatement(sqlHapus);
            preStmt.setString(1, idrawat);
            preStmt.executeUpdate();
        }catch (SQLException se){
            System.out.println("Salah disini : " + se);
        }
    }
   
    public static void main(String[] args) {
        rawatinapDao rado = new rawatinapDao();
        System.out.println(rado.getRecordByIdrawat("RI00002"));
//        rawatinap rawat = new rawatinap();
//        rawat.setIdrawat("RI01");
//        rawat.setIdpasien("PS0001");
//        rawat.setIdkamar("KM01");
//        rawat.setNamaruang("Raflesia arnoldi");
//        rawat.setTglcekin("1875-01-01");
//        rawat.setTglcekout("2021-02-24");
//        rawat.setKeterangan("Mantap Slur");
//        
//        rado.hapusData("RI01");
    }
   
}
