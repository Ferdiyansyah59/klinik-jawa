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
import dao.pendaftaranDao;
import model.pendaftaran;
import java.util.List;
/**
 *
 * @author ferdi
 */
@WebServlet(name = "pendaftaranCtr", urlPatterns = {"/pendaftaranCtr"})
public class pendaftaranCtr extends HttpServlet {

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
        pendaftaranDao daftar = new pendaftaranDao();
        Gson gson = new Gson();
        if(page == null){
            List<pendaftaran>listdaftar = daftar.getAllpendaftaranByTgl(request.getParameter("tgl_daftar"));
            String jsondaftar = gson.toJson(listdaftar);
            out.println(jsondaftar);
        }else if("data".equals(page)){
            List<pendaftaran>listdaftar = daftar.getAllpendaftaran();
            String jsondaftar = gson.toJson(listdaftar);
            out.println(jsondaftar);
        }else if("tambah".equals(page)){
            pendaftaran awa = new pendaftaran();
            awa.setNoantri(request.getParameter("no_antri"));
            awa.setIdpasien(request.getParameter("id_pasien"));
            awa.setIdpoli(request.getParameter("id_poli"));
            awa.setTgl(request.getParameter("tgl"));
            awa.setKeterangan(request.getParameter("keterangan"));
            awa.setUser_id(request.getParameter("user_id"));
            awa.setId_dokter(request.getParameter("id_dokter"));
            daftar.simpanData(awa, "tambah");
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil Disimpan!");
        }else if("tampil".equals(page)){
            String jsondaftar = gson.toJson(daftar.getRecordByNoantri(request.getParameter("no_antrian"), request.getParameter("tgl_daftar")));
            response.setContentType("application/json");
            out.println(jsondaftar);
        }else if("edit".equals(page)){
                pendaftaran awa = new pendaftaran();
                awa.setNoantri(request.getParameter("no_antri"));
                awa.setIdpasien(request.getParameter("id_pasien"));
                awa.setIdpoli(request.getParameter("id_poli"));
                awa.setTgl(request.getParameter("tgl"));
                awa.setKeterangan(request.getParameter("keterangan"));
                awa.setUser_id(request.getParameter("user_id"));
                awa.setId_dokter(request.getParameter("id_dokter"));
                daftar.simpanData(awa, page);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil DiEdit!");
        }else if("hapus".equals(page)){
            daftar.hapusData(request.getParameter("no_antri"),request.getParameter("tgl_daftar"));
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil di Hapus!");
        }
        else if("getTgl".equals(page)){
            String jsondaftar = gson.toJson(daftar.getTanggalPoli());
            response.setContentType("application/json");
            out.println(jsondaftar);
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
