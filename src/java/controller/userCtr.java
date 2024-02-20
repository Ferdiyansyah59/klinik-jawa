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
import model.user;
import dao.userDao;
import model.poli;
/**
 *
 * @author ferdi
 */
@WebServlet(name = "userCtr", urlPatterns = {"/userCtr"})
public class userCtr extends HttpServlet {

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
        userDao udo = new userDao();
        Gson gson = new Gson();
        if(page == null){
            List<user>listUser = udo.getUser();
            String jsonUser = gson.toJson(listUser);
            out.println(jsonUser);
        }else if("login".equals(page)){
            String jsonUser = gson.toJson(udo.login(request.getParameter("id_user")));
            response.setContentType("application/json");
            out.println(jsonUser);
        }else if("tambah".equals(page)){
            String id_user = request.getParameter("id_user");
            String nama = request.getParameter("nama_user");
            if(udo.getRecordById(id_user).getId_user() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id user:"+id_user+" - "+nama+" sudah Terpakai!");
            }else{
                user use = new user();
                use.setId_user(request.getParameter("id_user"));
                use.setNama_user(request.getParameter("nama_user"));
                use.setPassword(request.getParameter("password"));
                use.setRole(request.getParameter("role"));
                udo.simpandatauser(use);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil Disimpan!");
            }           
        }else if("tampil".equals(page)){
            String jsonDokter = gson.toJson(udo.getRecordById(request.getParameter("id_user")));
            response.setContentType("application/json");
            out.println(jsonDokter);
        }else if("edit".equals(page)){
            user use = new user();
            use.setId_user(request.getParameter("id_user"));
            use.setNama_user(request.getParameter("nama_user"));
            use.setPassword(request.getParameter("password"));
            use.setRole(request.getParameter("role"));
            udo.edituser(use);
            response.setContentType("text/html;charset=UTF-8"); 
            out.print("Data berhasil di edit!");
        }else if("hapus".equals(page)){
            udo.hapuspoli(request.getParameter("id_user"));
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data berhasil di hapus");
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
