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
import dao.polDao;
import model.poli;
import java.util.List;

/**
 *
 * @author ferdi
 */
@WebServlet(name = "poliCtr", urlPatterns = {"/poliCtr"})
public class poliCtr extends HttpServlet {

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
        polDao polda = new polDao();
        Gson gson = new Gson();
        
        if(page == null){
            List<poli>listPoli = polda.getPoli();
            String jsonPoli = gson.toJson(listPoli);
            out.println(jsonPoli);
        }else if("tambah".equals(page)){
            String id_poli = request.getParameter("id_poli");
            String nama = request.getParameter("nama_poli");
            if(polda.getRecordById(id_poli).getId_poli() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Poli: "+id_poli+" - "+nama+" sudah Terpakai!");
            }else{
                poli pol = new poli();
                pol.setId_poli(request.getParameter("id_poli"));
                pol.setNama_poli(request.getParameter("nama_poli"));
                polda.simpandatapoli(pol);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil Disimpan!");
            }           
        }else if("tampil".equals(page)){
            String jsonDokter = gson.toJson(polda.getRecordById(request.getParameter("id_poli")));
            response.setContentType("application/json");
            out.println(jsonDokter);
        }else if("edit".equals(page)){
            poli pol = new poli();
            pol.setId_poli(request.getParameter("id_poli"));
            pol.setNama_poli(request.getParameter("nama_poli"));
            polda.editpoli(pol);
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil di Edit!");
        }else if("hapus".equals(page)){
            polda.hapuspoli(request.getParameter("id_poli"));
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
