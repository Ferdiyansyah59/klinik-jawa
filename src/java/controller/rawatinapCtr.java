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
import dao.rawatinapDao;
import model.rawatinap;
import java.util.List;
/**
 *
 * @author ferdi
 */
@WebServlet(name = "rawatinapCtr", urlPatterns = {"/rawatinapCtr"})
public class rawatinapCtr extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");
        response.setContentType("application/json");
        String page = request.getParameter("page");
        PrintWriter out = response.getWriter();
        rawatinapDao rawat = new rawatinapDao();
        Gson gson = new Gson();
        if(page == null){
            List<rawatinap>listrawat = rawat.getAllrawatinap();
            String jsonrawat = gson.toJson(listrawat);
            out.println(jsonrawat);
        }else if("tambah".equals(page)){
            String id_rawat = request.getParameter("id_rawat");
            String nama_pasien = request.getParameter("nama_pasien");
            if(rawat.getRecordByIdrawat(id_rawat).getIdrawat() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id rawat : "+id_rawat+" - "+nama_pasien+" Sudah Terpakai!");
            }else{
                rawatinap awa = new rawatinap();
                awa.setIdrawat(request.getParameter("id_rawat"));
                awa.setIdpasien(request.getParameter("id_pasien"));
                awa.setIdkamar(request.getParameter("id_kamar"));
                awa.setTglcekin(request.getParameter("tglcekin"));
                awa.setTglcekout(request.getParameter("tglcekout"));
                awa.setKeterangan(request.getParameter("keterangan"));
                rawat.simpanData(awa, "tambah");
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil Disimpan!");
            }
        }else if("tampil".equals(page)){
            String jsonrawat = gson.toJson(rawat.getRecordByIdrawat(request.getParameter("id_rawat")));
            response.setContentType("application/json");
            out.println(jsonrawat);
        }else if("edit".equals(page)){
                rawatinap awa = new rawatinap();
                awa.setIdrawat(request.getParameter("id_rawat"));
                awa.setIdpasien(request.getParameter("id_pasien"));
                awa.setIdkamar(request.getParameter("id_kamar"));
                awa.setTglcekin(request.getParameter("tglcekin"));
                awa.setTglcekout(request.getParameter("tglcekout"));
                awa.setKeterangan(request.getParameter("keterangan"));
                rawat.simpanData(awa, "edit");
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil DiEdit!");
        }else if("hapus".equals(page)){
            rawat.hapusData(request.getParameter("id_rawat"));
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
