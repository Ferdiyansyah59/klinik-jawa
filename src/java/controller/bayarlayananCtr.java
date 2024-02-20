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
import java.util.List;
import model.bayarlayanan;
import dao.bayarlayananDao;


/**
 *
 * @author ferdi
 */
@WebServlet(name = "bayarlayananCtr", urlPatterns = {"/bayarlayananCtr"})
public class bayarlayananCtr extends HttpServlet {

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
        bayarlayananDao bardo = new bayarlayananDao();
        Gson gson = new Gson();
        if(page == null){
            List<bayarlayanan>listBayar = bardo.getAllBayarLayanan();
            String jsonBayar = gson.toJson(listBayar);
            out.println(jsonBayar);
        }else if("tambah".equals(page)){
            String id_bayar_layanan = request.getParameter("id_bayar_layanan");
            if(bardo.getRecordById(id_bayar_layanan).getId_bayar_layanan() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Pembayaran: "+id_bayar_layanan+" Sudah Terpakai!");
            }else{
                bayarlayanan awa = new bayarlayanan();
                awa.setId_bayar_layanan(request.getParameter("id_bayar_layanan"));
                awa.setId_layanan(request.getParameter("id_layanan"));
                awa.setId_detail_layanan(request.getParameter("id_detail_layanan"));
                awa.setId_pasien(request.getParameter("id_pasien"));
                awa.setTgl_layanan(request.getParameter("tgl_layanan"));
                awa.setKeterangan(request.getParameter("keterangan"));
                bardo.simpanData(awa);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil Disimpan!");
            }
        }else if("edit".equals(page)){
            bayarlayanan awa = new bayarlayanan();
            awa.setId_bayar_layanan(request.getParameter("id_bayar_layanan"));
            awa.setId_layanan(request.getParameter("id_layanan"));
            awa.setId_detail_layanan(request.getParameter("id_detail_layanan"));
            awa.setId_pasien(request.getParameter("id_pasien"));
            awa.setTgl_layanan(request.getParameter("tgl_layanan"));
            awa.setKeterangan(request.getParameter("keterangan"));
            bardo.editData(awa);
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil Diedit!");
        }else if("hapus".equals(page)){
            bardo.hapusData(request.getParameter("id_bayar_layanan"));
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil di Hapus!");
        }else if("tampil".equals(page)){
            String jsonLayanan = gson.toJson(bardo.getRecordById(request.getParameter("id_bayar_layanan")));
            response.setContentType("application/json");
            out.println(jsonLayanan);
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
