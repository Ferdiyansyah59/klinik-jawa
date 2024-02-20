/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import dao.rekammedikDao;
import model.rekammedik;
import java.util.List;
/**
 *
 * @author ferdi
 */
@WebServlet(name = "rekammedikCtr", urlPatterns = {"/rekammedikCtr"})
public class rekammedikCtr extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        String page = request.getParameter("page");
        PrintWriter out = response.getWriter();
        rekammedikDao rekdo = new rekammedikDao();
        Gson gson = new Gson();
        if(page == null){
            List<rekammedik>listRekammedik = rekdo.getAllRekamMedik();
            String jsonRekammedik = gson.toJson(listRekammedik);
            out.println(jsonRekammedik);
        }else if("tambah".equals(page)){
            String id_pasien = request.getParameter("id_pasien");
            String tgl_daftar = request.getParameter("tgl_daftar");
            if(rekdo.getRecordById(id_pasien).getId_pasien() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Pasien: "+id_pasien+" - "+tgl_daftar+" Sudah Terpakai!");
            }else{
                rekammedik rmedik = new rekammedik();
                rmedik.setId_pasien(request.getParameter("id_pasien"));
                rmedik.setTgl_daftar(request.getParameter("tgl_daftar"));
                rmedik.setId_poli(request.getParameter("id_poli"));
                rmedik.setTekanan(request.getParameter("tek_darah"));
                rmedik.setBerat(request.getParameter("berat"));
                rmedik.setTinggi(request.getParameter("tinggi"));
                rmedik.setKeluhan(request.getParameter("keluhan"));
                rmedik.setTidakan(request.getParameter("tindakan"));
                rmedik.setSaran(request.getParameter("saran"));
                rmedik.setId_dokter(request.getParameter("id_dokter"));
                rmedik.setId_resep(request.getParameter("id_resep"));
                rmedik.setDiagnosa(request.getParameter("diagnosa"));
                rmedik.setUser_id(request.getParameter("user_id"));
                rekdo.simpanData(rmedik, "tambah");
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil Disimpan!");
            }
        }else if("tampil".equals(page)){
            String jsonRekammedik = gson.toJson(rekdo.getRecordById(request.getParameter("id_pasien")));
            response.setContentType("application/json");
            out.println(jsonRekammedik);
        }else if("edit".equals(page)){
            rekammedik rmedik = new rekammedik();
            rmedik.setId_pasien(request.getParameter("id_pasien"));
            rmedik.setTgl_daftar(request.getParameter("tgl_daftar"));
            rmedik.setId_poli(request.getParameter("id_poli"));
            rmedik.setTekanan(request.getParameter("tek_darah"));
            rmedik.setBerat(request.getParameter("berat"));
            rmedik.setTinggi(request.getParameter("tinggi"));
            rmedik.setKeluhan(request.getParameter("keluhan"));
            rmedik.setTidakan(request.getParameter("tindakan"));
            rmedik.setSaran(request.getParameter("saran"));
            rmedik.setId_dokter(request.getParameter("id_dokter"));
            rmedik.setId_resep(request.getParameter("id_resep"));
            rmedik.setDiagnosa(request.getParameter("diagnosa"));
            rmedik.setUser_id(request.getParameter("user_id"));
            rekdo.simpanData(rmedik, "edit");
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil DiEdit!");
        }else if("hapus".equals(page)){
            rekdo.hapusData(request.getParameter("id_pasien"));
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil di Hapus!");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
