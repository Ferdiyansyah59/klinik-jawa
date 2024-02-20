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
import dao.karyawanDao;
import java.util.List;
import model.karyawan;
/**
 *
 * @author ferdi
 */
@WebServlet(name = "karyawanCtr", urlPatterns = {"/karyawanCtr"})
public class karyawanCtr extends HttpServlet {

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
        karyawanDao kardo = new karyawanDao();
        Gson gson = new Gson();
        
        if(page == null){
            List<karyawan>listKaryawan = kardo.getAllKaryawan();
            String jsonKaryawan = gson.toJson(listKaryawan);
            out.println(jsonKaryawan);
        }else if("tambah".equals(page)){
            String id_karyawan = request.getParameter("id_karyawan");
            String nama = request.getParameter("nama_karyawan");
            if(kardo.getRecordById(id_karyawan).getId_karyawan() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Karyawan: "+id_karyawan+" - "+nama+" Sudah Terpakai!");
            }else{
                karyawan kar = new karyawan();
                kar.setId_karyawan(request.getParameter("id_karyawan"));
                kar.setNama_karyawan(request.getParameter("nama_karyawan"));
                kar.setTgl_lahir(request.getParameter("tgl_lahir"));
                kar.setBidang_pekerjaan(request.getParameter("bidang_pekerjaan"));
                kar.setJenis_kelamin(request.getParameter("jenis_kelamin"));
                kar.setAlamat(request.getParameter("alamat"));
                kar.setNo_hp(request.getParameter("no_hp"));
                kar.setNo_ktp(request.getParameter("no_ktp"));
                kar.setEmail(request.getParameter("email"));
                kar.setNo_npwp(request.getParameter("no_npwp"));
                kar.setUser_id(request.getParameter("user_id"));
                kardo.simpanData(kar, "tambah");
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil Disimpan!");
            }
        }else if("tampil".equals(page)){
            String jsonKaryawan;
            jsonKaryawan = gson.toJson(kardo.getRecordById(request.getParameter("id_karyawan")));
            response.setContentType("application/json");
            out.println(jsonKaryawan);
        }else if("edit".equals(page)){
            karyawan kar = new karyawan();
            kar.setId_karyawan(request.getParameter("id_karyawan"));
            kar.setNama_karyawan(request.getParameter("nama_karyawan"));
            kar.setTgl_lahir(request.getParameter("tgl_lahir"));
            kar.setBidang_pekerjaan(request.getParameter("bidang_pekerjaan"));
            kar.setJenis_kelamin(request.getParameter("jenis_kelamin"));
            kar.setAlamat(request.getParameter("alamat"));
            kar.setNo_hp(request.getParameter("no_hp"));
            kar.setNo_ktp(request.getParameter("no_ktp"));
            kar.setEmail(request.getParameter("email"));
            kar.setNo_npwp(request.getParameter("no_npwp"));
            kar.setUser_id(request.getParameter("user_id"));
            kardo.simpanData(kar,"edit");
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil DiEdit!");
        }else if("hapus".equals(page)){
            kardo.hapusData(request.getParameter("id_karyawan"));
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
