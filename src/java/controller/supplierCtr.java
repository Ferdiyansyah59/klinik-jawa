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
import dao.supplierDao;
import model.supplier;
import java.util.List;
/**
 *
 * @author ferdi
 */
@WebServlet(name = "supplierCtr", urlPatterns = {"/supplierCtr"})
public class supplierCtr extends HttpServlet {

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
        supplierDao supdo = new supplierDao();
        Gson gson = new Gson();
        
        if(page == null){
            List<supplier>listSupplier = supdo.getAllSuplier();
            String jsonSupplier = gson.toJson(listSupplier);
            out.println(jsonSupplier);
        }else if("tambah".equals(page)){
            String id_supplier = request.getParameter("id_supplier");
            String nama = request.getParameter("nama_supplier");
            if(supdo.getRecordById(id_supplier).getId_supplier()!= null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Supplier: "+id_supplier+" - "+nama+" Sudah Terpakai!");
            }else{
                supplier sup = new supplier();
                sup.setId_supplier(request.getParameter("id_supplier"));
                sup.setNama_suplier(request.getParameter("nama_supplier"));
                sup.setAlamat(request.getParameter("alamat"));
                sup.setNo_telepon(request.getParameter("no_telepon"));
                sup.setEmail(request.getParameter("email"));
                sup.setUser_id(request.getParameter("user_id"));
                supdo.simpanData(sup, "tambah");
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil Disimpan!");
            }
        }else if("tampil".equals(page)){
            String jsonSupplier = gson.toJson(supdo.getRecordById(request.getParameter("id_supplier")));
            response.setContentType("application/json");
            out.println(jsonSupplier);
        }else if("edit".equals(page)){
           supplier sup = new supplier();
            sup.setId_supplier(request.getParameter("id_supplier"));
            sup.setNama_suplier(request.getParameter("nama_supplier"));
            sup.setAlamat(request.getParameter("alamat"));
            sup.setNo_telepon(request.getParameter("no_telepon"));
            sup.setEmail(request.getParameter("email"));
            sup.setUser_id(request.getParameter("user_id"));
            supdo.simpanData(sup, "edit");
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil DiEdit!");
        }else if("hapus".equals(page)){
            supdo.hapusData(request.getParameter("id_supplier"));
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
