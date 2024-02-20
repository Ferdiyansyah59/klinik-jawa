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
import dao.obatDao;
import model.dokter;
import java.util.List;
import model.obat;

/**
 *
 * @author ferdi
 */
@WebServlet(name = "obatCtr", urlPatterns = {"/obatCtr"})
public class obatCtr extends HttpServlet {

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
        obatDao obatdo = new obatDao();
        Gson gson = new Gson();
        if(page == null){
            List<obat>listObat = obatdo.getAllObat();
            String jsonObat = gson.toJson(listObat);
            out.println(jsonObat);
        }else if("tambah".equals(page)){
            String id_obat = request.getParameter("id_obat");
            String nama = request.getParameter("nama_obat");
            if(obatdo.getRecordById(id_obat).getId_obat() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Dokter: "+id_obat+" - "+nama+" Sudah Terpakai!");
            }else{
                obat obt = new obat();
                obt.setId_obat(request.getParameter("id_obat"));
                obt.setNama_obat(request.getParameter("nama_obat"));
                obt.setSatuan(request.getParameter("satuan"));
                obt.setStok(request.getParameter("stok"));
                obt.setHarga_jual(request.getParameter("harga_jual"));
                obt.setUser_id(request.getParameter("user_id"));
                obatdo.simpanData(obt);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil Disimpan!");
            }
        }else if("tampil".equals(page)){
            String jsonObat = gson.toJson(obatdo.getRecordById(request.getParameter("id_obat")));
            response.setContentType("application/json");
            out.println(jsonObat);
        }else if("edit".equals(page)){
           obat obt = new obat();
                obt.setId_obat(request.getParameter("id_obat"));
                obt.setNama_obat(request.getParameter("nama_obat"));
                obt.setSatuan(request.getParameter("satuan"));
                obt.setStok(request.getParameter("stok"));
                obt.setHarga_jual(request.getParameter("harga_jual"));
                obt.setUser_id(request.getParameter("user_id"));
                obatdo.editData(obt);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil DiEdit!");
        }else if("hapus".equals(page)){
            obatdo.hapusData(request.getParameter("id_obat"));
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
