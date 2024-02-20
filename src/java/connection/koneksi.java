/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package connection;

/**
 *
 * @author ferdi
 */
import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import java.sql.Connection;
import java.sql.SQLException;
public class koneksi {
    static Connection koneksi;
    public static Connection getKoneksi(){
        if( koneksi == null ){
            MysqlDataSource data = new MysqlDataSource();
            data.setDatabaseName("klinik");
            data.setUser("root");
            data.setPassword("");
            try{
                koneksi = data.getConnection();
                System.out.println("Koneksi Sukses");
            }catch(SQLException e){
                System.err.println("Koneksi Eror" + e);
            }
        }
        return koneksi;
    }
    public static void main(String[] args) {
        getKoneksi();
    }
}
