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
import dao.kamarDao;
import model.kamar;
import java.util.List;

/**
 *
 * @author ferdi
 */
@WebServlet(name = "kamarCtr", urlPatterns = {"/kamarCtr"})
public class kamarCtr extends HttpServlet {

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
        kamarDao kad = new kamarDao();
        Gson gson = new Gson();
        if(page == null){
            List<kamar>listkamar = kad.getAllKamar();
            String jsonkamar = gson.toJson(listkamar);
            out.println(jsonkamar);
        }else if("tambah".equals(page)){
            String id = request.getParameter("id_kamar");
            String nama_ruang = request.getParameter("nama_ruang");
            if(kad.getRecordById(id).getId() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id : "+id+" - "+nama_ruang+" Sudah Terpakai!");
            }else{
                kamar awa = new kamar();
                awa.setId(request.getParameter("id_kamar"));
                awa.setNamaruang(request.getParameter("nama_ruang"));
                awa.setNo_kamar(request.getParameter("no_kamar"));
                awa.setKelas(request.getParameter("kelas"));
                awa.setHarga(request.getParameter("harga"));
                awa.setDesk(request.getParameter("desk"));
                awa.setKapasitas(request.getParameter("kapasitas"));
                awa.setIsi(request.getParameter("isi"));
                awa.setStatus(request.getParameter("status"));
                kad.simpanData(awa, "tambah");
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil Disimpan!");
            }
        }else if("tampil".equals(page)){
            String jsonkamar = gson.toJson(kad.getRecordById(request.getParameter("id_kamar")));
            response.setContentType("application/json");
            out.println(jsonkamar);
        }else if("edit".equals(page)){
                kamar awa = new kamar();
                awa.setId(request.getParameter("id_kamar"));
                awa.setNamaruang(request.getParameter("nama_ruang"));
                awa.setNo_kamar(request.getParameter("no_kamar"));
                awa.setKelas(request.getParameter("kelas"));
                awa.setHarga(request.getParameter("harga"));
                awa.setDesk(request.getParameter("desk"));
                awa.setKapasitas(request.getParameter("kapasitas"));
                awa.setIsi(request.getParameter("isi"));
                awa.setStatus(request.getParameter("status"));
                kad.simpanData(awa, "edit");
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil DiEdit!");
        }else if("hapus".equals(page)){
            kad.hapusData(request.getParameter("id_kamar"));
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
