package controller;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import dao.pasienDao;
import model.pasien;
import java.util.List;

/**
 *
 * @author ferdi
 */
@WebServlet(urlPatterns = {"/pasienCtr"})
public class pasienCtr extends HttpServlet {

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
        pasienDao pasdo = new pasienDao();
        Gson gson = new Gson();
        
        if(page == null){
            List<pasien>listPasien = pasdo.getAllPasien();
            String jsonPasien = gson.toJson(listPasien);
            out.println(jsonPasien);
        }else if("tambah".equals(page)){
            String id_pasien = request.getParameter("id_pasien");
            String nama = request.getParameter("nama_pasien");
            if(pasdo.getRecordById(id_pasien).getId_pasien()!= null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Pasien: "+id_pasien+" - "+nama+" Sudah Terpakai!");
            }else{
                pasien pas = new pasien();
                pas.setId_pasien(request.getParameter("id_pasien"));
                pas.setNama_pasien(request.getParameter("nama_pasien"));
                pas.setTgl_lahir(request.getParameter("tgl_lahir"));
                pas.setJenkel(request.getParameter("jenkel"));
                pas.setNo_ktp(request.getParameter("no_ktp"));
                pas.setAlamat(request.getParameter("alamat"));
                pas.setNo_hp(request.getParameter("no_hp"));
                pas.setGol_dar(request.getParameter("gol_dar"));
                pas.setPassword(request.getParameter("password"));
                pas.setUser_id(request.getParameter("user"));
                pasdo.simpanData(pas, "tambah");
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil Disimpan!");
            }
        }else if("tampil".equals(page)){
            String jsonPasien = gson.toJson(pasdo.getRecordById(request.getParameter("id_pasien")));
            response.setContentType("application/json");
            out.println(jsonPasien);
        }else if("edit".equals(page)){
                pasien pas = new pasien();
                pas.setId_pasien(request.getParameter("id_pasien"));
                pas.setNama_pasien(request.getParameter("nama_pasien"));
                pas.setTgl_lahir(request.getParameter("tgl_lahir"));
                pas.setJenkel(request.getParameter("jenkel"));
                pas.setNo_ktp(request.getParameter("no_ktp"));
                pas.setAlamat(request.getParameter("alamat"));
                pas.setNo_hp(request.getParameter("no_hp"));
                pas.setGol_dar(request.getParameter("gol_dar"));
                pas.setPassword(request.getParameter("password"));
                pas.setUser_id(request.getParameter("user"));
                pasdo.simpanData(pas, "edit");
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil DiEdit!");
        }else if("hapus".equals(page)){
            pasdo.hapusData(request.getParameter("id_pasien"));
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
