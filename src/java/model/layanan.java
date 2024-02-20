/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 *
 * @author ferdi
 */
public class layanan {
    private String id_layanan;
    private String des_layanan;
    private String id_detail_layanan; 
    private String des_detail_layanan;
    private String biaya_layanan;
    private String keterangan;

    public String getId_layanan() {
        return id_layanan;
    }

    public void setId_layanan(String id_layanan) {
        this.id_layanan = id_layanan;
    }

    public String getDes_layanan() {
        return des_layanan;
    }

    public void setDes_layanan(String des_layanan) {
        this.des_layanan = des_layanan;
    }

    public String getId_detail_layanan() {
        return id_detail_layanan;
    }

    public void setId_detail_layanan(String id_detail_layanan) {
        this.id_detail_layanan = id_detail_layanan;
    }

    public String getDes_detail_layanan() {
        return des_detail_layanan;
    }

    public void setDes_detail_layanan(String des_detail_layanan) {
        this.des_detail_layanan = des_detail_layanan;
    }

    public String getBiaya_layanan() {
        return biaya_layanan;
    }

    public void setBiaya_layanan(String biaya_layanan) {
        this.biaya_layanan = biaya_layanan;
    }

    public String getKeterangan() {
        return keterangan;
    }

    public void setKeterangan(String keterangan) {
        this.keterangan = keterangan;
    }
    
    
}
