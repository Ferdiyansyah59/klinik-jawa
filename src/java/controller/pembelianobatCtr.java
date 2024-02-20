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
import model.pembelianobat;
import dao.pembelianobatDao;

/**
 *
 * @author ferdi
 */
@WebServlet(name = "pembelianobatCtr", urlPatterns = {"/pembelianobatCtr"})
public class pembelianobatCtr extends HttpServlet {

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
        pembelianobatDao pemdo = new pembelianobatDao();
        Gson gson = new Gson();
        if(page == null){
            List<pembelianobat>listBeli = pemdo.getAllPembelianObat();
            String jsonBeli = gson.toJson(listBeli);
            out.println(jsonBeli);
        }else if("tambah".equals(page)){
            String id_trans = request.getParameter("id_trans");
            if(pemdo.getRecordById(id_trans).getId_trans() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("ID Trans "+id_trans+" Sudah di Terpakai!");
            }else{
                pembelianobat awa = new pembelianobat();
                awa.setId_trans(request.getParameter("id_trans"));
                awa.setId_supplier(request.getParameter("id_supplier"));
                awa.setNo_faktur(request.getParameter("no_faktur"));
                awa.setTgl_faktur(request.getParameter("tgl_faktur"));
                awa.setId_obat(request.getParameter("id_obat"));
                awa.setHarga_beli(request.getParameter("harga_beli"));
                awa.setJumlah(request.getParameter("jumlah"));
                awa.setKeterangan(request.getParameter("keterangan"));
                awa.setTgl_expired(request.getParameter("tgl_expired"));
                awa.setId_user(request.getParameter("id_user"));
                pemdo.simpanData(awa);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil di Simpan!");
            }
        }else if("edit".equals(page)){
            pembelianobat awa = new pembelianobat();
            awa.setId_trans(request.getParameter("id_trans"));
            awa.setId_supplier(request.getParameter("id_supplier"));
            awa.setNo_faktur(request.getParameter("no_faktur"));
            awa.setTgl_faktur(request.getParameter("tgl_faktur"));
            awa.setId_obat(request.getParameter("id_obat"));
            awa.setHarga_beli(request.getParameter("harga_beli"));
            awa.setJumlah(request.getParameter("jumlah"));
            awa.setKeterangan(request.getParameter("keterangan"));
            awa.setTgl_expired(request.getParameter("tgl_expired"));
            awa.setId_user(request.getParameter("id_user"));
            pemdo.editData(awa);
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil di Edit!");
        }else if("tampil".equals(page)){
            String jsonObat = gson.toJson(pemdo.getRecordById(request.getParameter("id_trans")));
            response.setContentType("application/json");
            out.println(jsonObat);
        }else if("hapus".equals(page)){
            pemdo.hapusData(request.getParameter("id_trans"));
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
