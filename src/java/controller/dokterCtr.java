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
import dao.dokterDao;
import model.dokter;
import java.util.List;

/**
 *
 * @author ferdi
 */
@WebServlet(name = "dokterCtr", urlPatterns = {"/dokterCtr"})
public class dokterCtr extends HttpServlet {

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
        dokterDao dokdo = new dokterDao();
        Gson gson = new Gson();
        if(page == null){
            List<dokter>listDokter = dokdo.getAllDokter();
            String jsonDokter = gson.toJson(listDokter);
            out.println(jsonDokter);
        }else if("tambah".equals(page)){
            String id_dokter = request.getParameter("id_dokter");
            String nama = request.getParameter("nama_dokter");
            if(dokdo.getRecordById(id_dokter).getId_dokter() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Dokter: "+id_dokter+" - "+nama+" Sudah Terpakai!");
            }else{
                dokter awa = new dokter();
                awa.setId_dokter(request.getParameter("id_dokter"));
                awa.setNama_dokter(request.getParameter("nama_dokter"));
                awa.setTgl_lahir(request.getParameter("tgl_lahir"));
                awa.setId_poli(request.getParameter("id_poli"));
                awa.setJenis_kelamin(request.getParameter("jenis_kelamin"));
                awa.setAlamat(request.getParameter("alamat"));
                awa.setNo_hp(request.getParameter("no_hp"));
                awa.setNo_ktp(request.getParameter("no_ktp"));
                awa.setSpesialis(request.getParameter("spesialis"));
                awa.setPassword(request.getParameter("password"));
                awa.setEmail(request.getParameter("email"));
                awa.setNo_npwp(request.getParameter("no_npwp"));
                awa.setUser_id(request.getParameter("user_id"));
                dokdo.simpanData(awa);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil Disimpan!");
            }
        }else if("tampil".equals(page)){
            String jsonDokter = gson.toJson(dokdo.getRecordById(request.getParameter("id_dokter")));
            response.setContentType("application/json");
            out.println(jsonDokter);
        }else if("edit".equals(page)){
            dokter awa = new dokter();
            awa.setId_dokter(request.getParameter("id_dokter"));
            awa.setNama_dokter(request.getParameter("nama_dokter"));
            awa.setTgl_lahir(request.getParameter("tgl_lahir"));
            awa.setId_poli(request.getParameter("id_poli"));
            awa.setJenis_kelamin(request.getParameter("jenis_kelamin"));
            awa.setAlamat(request.getParameter("alamat"));
            awa.setNo_hp(request.getParameter("no_hp"));
            awa.setNo_ktp(request.getParameter("no_ktp"));
            awa.setSpesialis(request.getParameter("spesialis"));
            awa.setPassword(request.getParameter("password"));
            awa.setEmail(request.getParameter("email"));
            awa.setNo_npwp(request.getParameter("no_npwp"));
            awa.setUser_id(request.getParameter("user_id"));
            dokdo.editData(awa);
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil DiEdit!");
        }else if("hapus".equals(page)){
            dokdo.hapusData(request.getParameter("id_dokter"));
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
