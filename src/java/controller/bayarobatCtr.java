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
import dao.bayarobatDao;
import model.bayarobat;
import java.util.List;
/**
 *
 * @author ferdi
 */
@WebServlet(name = "bayarobatCtr", urlPatterns = {"/bayarobatCtr"})
public class bayarobatCtr extends HttpServlet {

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
        Gson gson = new Gson();
        bayarobatDao bardo = new bayarobatDao();
        if(page == null){
            List<bayarobat>listBayar = bardo.getAllBayarObat();
            String jsonBayar = gson.toJson(listBayar);
            out.println(jsonBayar);
        }else if("tambahBayar".equals(page)){
            String id_pembayaran = request.getParameter("id_pembayaran");
            if(bardo.getRecordByIdBayar(id_pembayaran).getId_pembayaran() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Pembayaran "+id_pembayaran+" Sudah Terpakai");
            }else{
                bayarobat awa = new bayarobat();
                awa.setId_pembayaran(request.getParameter("id_pembayaran"));
                awa.setTgl_pembayaran(request.getParameter("tgl_pembayaran"));
                awa.setId_pasien(request.getParameter("id_pasien"));
                awa.setId_resep(request.getParameter("id_resep"));
                awa.setJenis_pembayaran(request.getParameter("jenis_pembayaran"));
                awa.setUser_id(request.getParameter("user_id"));
                bardo.simpanDataBayar(awa);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Berhasil Disimpan!");
            }
        }else if("tambahDetail".equals(page)){
            String id_pembayaran = request.getParameter("id_pembayaran");
            String id_obat = request.getParameter("id_obat");
            if(bardo.getRecordByIdDetail(id_pembayaran, id_obat).getId_pembayaran() != null){
                response.setContentType("text/html;charset=UTF-8");
                out.print("Id Pembayaran "+id_pembayaran+" Sudah Terpakai");
            }else{
                bayarobat awa = new bayarobat();
                awa.setId_pembayaran(request.getParameter("id_pembayaran"));
                awa.setId_obat(request.getParameter("id_obat"));
                awa.setHarga(request.getParameter("harga"));
                awa.setJumlah(request.getParameter("jumlah"));
                bardo.simpanDetail(awa);
                response.setContentType("text/html;charset=UTF-8");
                out.print("Data Detail Berhasil Disimpan!");
            }
        }else if("tampilBayar".equals(page)){
            String jsonBayar = gson.toJson(bardo.getRecordByIdBayar(request.getParameter("id_pembayaran")));
            response.setContentType("application/json");
            out.println(jsonBayar);
        }else if("tampilDetail".equals(page)){
            String jsonBayar = gson.toJson(bardo.getRecordByIdDetail(request.getParameter("id_pembayaran"), request.getParameter("id_obat")));
            response.setContentType("application/json");
            out.println(jsonBayar);
        }else if("editBayar".equals(page)){
            bayarobat awa = new bayarobat();
            awa.setId_pembayaran(request.getParameter("id_pembayaran"));
            awa.setTgl_pembayaran(request.getParameter("tgl_pembayaran"));
            awa.setId_pasien(request.getParameter("id_pasien"));
            awa.setId_resep(request.getParameter("id_resep"));
            awa.setJenis_pembayaran(request.getParameter("jenis_pembayaran"));
            awa.setUser_id(request.getParameter("user_id"));
            bardo.editBayar(awa);
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil Diedit!");
        }else if("editDetail".equals(page)){
            bayarobat awa = new bayarobat();
            awa.setId_obat(request.getParameter("id_obat"));  
            awa.setHarga(request.getParameter("harga"));
            awa.setJumlah(request.getParameter("jumlah"));
            awa.setId_pembayaran(request.getParameter("id_pembayaran"));
            awa.setId_obat(request.getParameter("id_obat"));    
            bardo.editDetail(awa);
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Detail Berhasil Diedit!");
        }else if("hapusBayar".equals(page)){
            bardo.hapusBayar(request.getParameter("id_pembayaran"));
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Berhasil di Hapus!");
        }else if("hapusDetail".equals(page)){
            bardo.hapusDetail(request.getParameter("id_pembayaran"), request.getParameter("id_obat"));
            response.setContentType("text/html;charset=UTF-8");
            out.print("Data Detail Berhasil di Hapus!");
        }else if("detail".equals(page)){
            List<bayarobat>listBayar = bardo.getAllDetalBayarObar(request.getParameter("id_pembayaran"));
            String jsonBayar = gson.toJson(listBayar);
            out.println(jsonBayar);
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
