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
import dao.resepDao;
import model.resep;
import java.util.List;
/**
 *
 * @author ferdi
 */
@WebServlet(name = "resepCtr", urlPatterns = {"/resepCtr"})
public class resepCtr extends HttpServlet {

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
        resepDao resdo = new resepDao();
        Gson gson = new Gson();
        if(page == null){
            List<resep>listResep = resdo.getAllResep();
            String jsonResep = gson.toJson(listResep);
            out.println(jsonResep);
        }else if("tambahResep".equals(page)){
            String id_resep = request.getParameter("id_resep");
            String id_dokter = request.getParameter("id_dokter");
            if(resdo.getRecordById(id_resep).getId_resep() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Resep: "+id_resep+" - "+id_dokter+" Sudah Terpakai!");
            }else{
                resep res = new resep();
                res.setId_resep(request.getParameter("id_resep"));
                res.setId_dokter(request.getParameter("id_dokter"));
                res.setTgl_resep(request.getParameter("tgl_resep"));
                res.setId_poli(request.getParameter("id_poli"));
                res.setUser_id(request.getParameter("user_id"));
                resdo.simpanResep(res);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil Disimpan!");
            }
        }else if("tampilResep".equals(page)){
            String jsonResep = gson.toJson(resdo.getRecordById(request.getParameter("id_resep")));
            response.setContentType("application/json");
            out.println(jsonResep);
        }else if("editResep".equals(page)){
            resep res = new resep();
            res.setId_resep(request.getParameter("id_resep"));
            res.setId_dokter(request.getParameter("id_dokter"));
            res.setTgl_resep(request.getParameter("tgl_resep"));
            res.setId_poli(request.getParameter("id_poli"));
            res.setUser_id(request.getParameter("user_id"));
            resdo.editResep(res);
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil DiEdit!");
        }else if("hapusResep".equals(page)){
            resdo.hapusResep(request.getParameter("id_resep"));
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil di Hapus!");
        }else if("detail".equals(page)){
            List<resep>listDetailresep = resdo.getAllDetail(request.getParameter("id_resep"));
            String jsonDetailresep = gson.toJson(listDetailresep);
            out.println(jsonDetailresep);
        }else if("tambahDetail".equals(page)){
            String id_resep = request.getParameter("id_resep");
            String id_obat = request.getParameter("id_obat");
            if(resdo.getRecordByIdDetail(id_resep, id_obat).getId_resep() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Resep: "+id_resep+" - "+id_obat+" Sudah Terpakai!");
            }else{
                resep detres = new resep();
                detres.setId_resep(request.getParameter("id_resep"));
                detres.setId_obat(request.getParameter("id_obat"));
                detres.setHarga(request.getParameter("harga"));
                detres.setJumlah(request.getParameter("jumlah"));
                detres.setKeterangan(request.getParameter("keterangan"));
                detres.setUser_id(request.getParameter("user_id"));
                resdo.simpanDetail(detres);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Detail Berhasil Disimpan!");
            }
        }else if("tampilDetail".equals(page)){
            String jsonDetailresep = gson.toJson(resdo.getRecordByIdDetail(request.getParameter("id_resep"), request.getParameter("id_obat")));
            response.setContentType("application/json");
            out.println(jsonDetailresep);
        }else if("editDetail".equals(page)){
            resep detres = new resep();
            detres.setId_resep(request.getParameter("id_resep"));
            detres.setId_obat(request.getParameter("id_obat"));
            detres.setHarga(request.getParameter("harga"));
            detres.setJumlah(request.getParameter("jumlah"));
            detres.setKeterangan(request.getParameter("keterangan"));
            detres.setUser_id(request.getParameter("user_id"));
            resdo.editDetail(detres);
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Detail Berhasil DiEdit!");
        }else if("hapusDetail".equals(page)){
            resdo.hapusDetail(request.getParameter("id_resep"), request.getParameter("id_obat"));
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Detail Berhasil di Hapus!");
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
