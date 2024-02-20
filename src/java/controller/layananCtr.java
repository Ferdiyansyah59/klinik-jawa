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
import model.layanan;
import dao.layananDao;

/**
 *
 * @author ferdi
 */
@WebServlet(name = "layanan", urlPatterns = {"/layananCtr"})
public class layananCtr extends HttpServlet {

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
        response.setContentType("application/json");
        String page = request.getParameter("page");
        PrintWriter out = response.getWriter();
        layananDao lay = new layananDao();
        Gson gson = new Gson();
        if(page == null){
            List<layanan>listLayanan = lay.getAllLayanan();
            String jsonLayanan = gson.toJson(listLayanan);
            out.println(jsonLayanan);
        }else if("tambahLayanan".equals(page)){
            String id_layanan = request.getParameter("id_layanan");
            String des_layanan = request.getParameter("des_layanan");
            if(lay.getRecordByIdLayanan(id_layanan).getId_layanan() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Layanan: "+id_layanan+" - "+des_layanan+" Sudah Terpakai!");
            }else{
                layanan awa = new layanan();
                awa.setId_layanan(request.getParameter("id_layanan"));
                awa.setDes_layanan(request.getParameter("des_layanan"));
                lay.simpanLayanan(awa);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Layanan Berhasil Disimpan!");
            }
        }else if("tambahDetail".equals(page)){
            String id_detail_layanan = request.getParameter("id_detail_layanan");
            String des_detail_layanan = request.getParameter("des_detail_layanan");
            String id_layanan = request.getParameter("id_layanan");
            if(lay.getRecordByIdDetail(id_layanan, id_detail_layanan).getId_layanan() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Layanan: "+id_detail_layanan+" - "+des_detail_layanan+" Sudah Terpakai!");
            }else{
                layanan awa = new layanan();
                awa.setId_layanan(request.getParameter("id_layanan"));
                awa.setId_detail_layanan(request.getParameter("id_detail_layanan"));
                awa.setDes_detail_layanan(request.getParameter("des_detail_layanan"));
                awa.setBiaya_layanan(request.getParameter("biaya_layanan"));
                awa.setKeterangan(request.getParameter("keterangan"));
                lay.simpanDetail(awa);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Detail Layanan Berhasil Disimpan!");
            }
        }else if("tampilLayanan".equals(page)){
            String jsonLayanan = gson.toJson(lay.getRecordByIdLayanan(request.getParameter("id_layanan")));
            response.setContentType("application/json");
            out.println(jsonLayanan);
        }else if("tampilDetail".equals(page)){
            String jsonLayanan = gson.toJson(lay.getRecordByIdDetail(request.getParameter("id_layanan"), request.getParameter("id_detail_layanan")));
            response.setContentType("application/json");
            out.println(jsonLayanan);
        }else if("editLayanan".equals(page)){
            layanan awa = new layanan();
            awa.setId_layanan(request.getParameter("id_layanan"));
            awa.setDes_layanan(request.getParameter("des_layanan"));
            lay.editLayanan(awa);
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Layanan Berhasil Diedit!");
        }else if("editDetail".equals(page)){
            layanan awa = new layanan();
            awa.setId_layanan(request.getParameter("id_layanan"));
            awa.setId_detail_layanan(request.getParameter("id_detail_layanan"));
            awa.setDes_detail_layanan(request.getParameter("des_detail_layanan"));
            awa.setBiaya_layanan(request.getParameter("biaya_layanan"));
            awa.setKeterangan(request.getParameter("keterangan"));
            lay.editDetail(awa);
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Detail Layanan Berhasil Diedit!");
        }else if("hapusLayanan".equals(page)){
            lay.hapusLayanan(request.getParameter("id_layanan"));
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Layanan Berhasil di Hapus!");
        }else if("hapusDetail".equals(page)){
            lay.hapusDetail(request.getParameter("id_layanan"), request.getParameter("id_detail_layanan"));
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Detail Layanan Berhasil di Hapus!");
        }else if("dataDetail".equals(page)){
            List<layanan>listLayanan = lay.getAllDetail(request.getParameter("id_layanan"));
            String jsonLayanan = gson.toJson(listLayanan);
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
