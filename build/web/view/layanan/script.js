$(document).ready(()=>{
    
    var id_layanan, id_layanan_detail, des_layanan, id_detail_layanan, des_detail_layanan, biaya_layanan, keterangan, page;
    
//    Mengambil value inputan 
    const getInputValue = () =>{
        id_layanan = $('#idlayanan').val();
        des_layanan = $('#deslayanan').val();
    }
//    Mengosongkan field
    const clearForm = () =>{
        id_layanan = $('#idlayanan').val("");
        des_layanan = $('#deslayanan').val("");
        id_detail_layanan = $('#iddetaillayanan').val("");
        des_detail_layanan = $('#desdetaillayanan').val("");
        biaya_layanan = $('#biayalayanan').val("");
        keterangan = $('#keterangan').val("");
    }
    
    
    
//    fungsi Menampilkan data
    const getData = () =>{
        $.ajax({
            type: "GET",
            url: '/Klinik/layananCtr',
            async: true,
            dataType: 'JSON',
            success: (data) =>{
                let html = '';
                let i;
                for(i=0; i<data.length; i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_layanan+'</td>'+
                            '<td>'+data[i].des_layanan+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnEdit'>Edit</a>"
                                   +"&nbsp;"
                                   +"<a class='btn btn-outline-danger btn-sm'"
                                   +"id='btnDel'>Delete</a>"
                                   +"&nbsp;"
                                   +"<a class='btn btn-outline-warning btn-sm'"
                                   +"id='btnDet'>Detail</a>"+
                            '</td>'+
                            '</tr>';

                }
                $('#show-data').html(html);
            }
        })
        
    }
    
    getData(); // Menampilkan Data Layanan

//    Membuka modal tambah layanan
    $('#btnAdd').click(()=>{
        $('#btnSave').html('Simpan');
        $('#title-modal').html('TAMBAH DATA');
        $('#idlayanan').prop("readonly", false);
        $('#myModal').fadeIn();
        page= "tambahLayanan";
        $('#idlayanan').val("L");
    });
    
//    Mengatur penulisan di filed id layanan
    $('#idlayanan').keydown((e)=>{   
        let maxChar = 2;
        let key = e.charCode || e.keyCode;
        if($("#idlayanan").val().length > maxChar){
            if(key == 8 || key == 9 || key == 37 || key == 39){
                
            }else{
               e.preventDefault(); 
            }
        }
        
        if (key == 76 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){ 
          if($('#idlayanan').val().length == 1){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
        }else {
          e.preventDefault();
        }   
    });
    
//    Proses simpan data layanan
    $('#btnSave').click(()=>{
        getInputValue();
        if(id_layanan == "L"){
            $("#idlayanan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Layanan Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idlayanan").focus();
                            $("#idlayanan").keypress(()=>{
                                 $("#idlayanan").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else if(des_layanan == ""){
            $("#deslayanan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'Deskripsi Layanan Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#deslayanan").focus();
                            $("#deslayanan").keypress(()=>{
                                 $("#deslayanan").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            console.log(id_layanan, id_layanan_detail, des_layanan);
            $.post('/Klinik/layananCtr', {
                page: page,
                id_layanan: id_layanan,
                des_layanan: des_layanan
            },(data, status)=>{
                    if(data === "Data Layanan Berhasil Disimpan!"){
                         $.alert({
                             icon : 'fas fa-check-circle',
                             title: 'Berhasil',
                             type: 'blue',
                             content: data,
                             typeAnimated: true,
                             buttons: {
                                 ok: {
                                     btnClass: 'btn-red',
                                     action: function(){
                                         $('#myModal').fadeOut();
                                         getData();
                                         clearForm();
                                     }  
                                 }          
                             }
                         });
                    }else if(data === "Data Layanan Berhasil Diedit!"){
                        $.alert({
                             icon : 'fas fa-check-circle',
                             title: 'Berhasil',
                             type: 'blue',
                             content: data,
                             typeAnimated: true,
                             buttons: {
                                 ok: {
                                     btnClass: 'btn-red',
                                     action: function(){
                                         $('#myModal').fadeOut();
                                         getData();
                                         clearForm();
                                     }  
                                 }          
                             }
                         });
                    }else{
                        $.alert({
                             icon : 'far fa-times-circle',
                             title: "Gagal!",
                             type: 'red',
                             content: data,
                             typeAnimated: true,
                             buttons: {
                                 ok: {
                                     btnClass: 'btn-red',
                                     action: function(){  
                                     }  
                                 }          
                             }
                         }); 
                    }
                }
            )
        } 
    });
    
//    Proses hapus data layanan
    $('#show-data').on('click', '#btnDel', function(){
        let baris = $( this).closest('tr');
        let id_layanan = baris.find("td:eq(0)").text();
        var des_layanan = baris.find("td:eq(1)").text();
        page = "hapusLayanan";
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Layanan '+id_layanan+" - " + des_layanan +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/layananCtr', {
                                    page: page,
                                    id_layanan: id_layanan
                                },
                                function(data, status){
                                   if(data === "Data Layanan Berhasil di Hapus!"){ 
                                   $.alert({
                                        title: 'Berhasil!',
                                        content: data,
                                        buttons: {
                                            ok: {
                                                btnClass: 'btn-red',
                                                action: ()=>{
                                                    getData();
                                                }
                                            }
                                        }
                                    }) 
                                }
                            }
                                    
                        )
                    }
                },
                No:{
                    btnClass: 'blue',
                    action: function(){
                        
                    }
                }
            }
       })
    })
    
    const getInputValueDetail = () => {
        let id_layananStorage = localStorage.getItem("id_layanan");
        $('#idlayananDetail').val(id_layananStorage);
        id_layanan_detail = $('#idlayananDetail').val();
        id_detail_layanan = $('#iddetaillayanan').val();
        des_detail_layanan = $('#desdetaillayanan').val();
        biaya_layanan = $('#biayalayanan').val();
        keterangan = $('#keterangan').val();
    }

    $('#btnBatal').click(()=>{
        $('#myModal').fadeOut();
        clearForm();
    });

    $('#detail').click(()=>{
        $('#modalDetail').fadeIn();    
    });

    

    $('#show-data').on('click', '#btnEdit', function(){
        page = "tampilLayanan";
        $('#myModal').fadeIn();
        $('#btnSave').html('EDIT');
        $('#title-modal').html('EDIT DATA');
        $('#idlayanan').prop("readonly", true);
        let baris = $(this).closest('tr');
        let id_layanan = baris.find('td:eq(0)').text();
        $.post('/Klinik/layananCtr', {
           page: page,
           id_layanan: id_layanan
        },(data)=>{
            $('#idlayanan').val(data.id_layanan);
            $('#deslayanan').val(data.des_layanan);
        });
        page = "editLayanan";    
    });
    
    $('#btnSave').click(()=>{
        getInputValue();
        $.post('/Klinik/layananCtr', {
            page: page,
            id_layanan: id_layanan,
            des_layanan: des_layanan
        }, (data)=>{})
        
    })
    
    $('#show-data').on('click', '#btnDet', function(){
        $('#modalDetail').fadeIn();
        page = "dataDetail";
        let baris = $(this).closest("tr");
        let id_layanan = baris.find("td:eq(0)").text();
        localStorage.setItem("id_layanan", id_layanan);
        $.ajax({
            type: "GET",
            url: '/Klinik/layananCtr',
            async: true,
            dataType: "JSON",
            data: {page: page, id_layanan: id_layanan},
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_detail_layanan+'</td>'+
                            '<td>'+data[i].des_detail_layanan+'</td>'+
                            '<td>'+data[i].biaya_layanan+'</td>'+
                            '<td>'+data[i].keterangan+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnEdit'>Edit</a>"
                                   +"&nbsp;"
                                   +"<a class='btn btn-outline-danger btn-sm'"
                                   +"id='btnDel'>Delete</a>"+
                            '</td>'+
                            '</tr>';
                }
                $("#show-detail").html(html);
            }
        })

    }) 
    
    const getDataDetail = () =>{
        page = "dataDetail";
        let id_layanan = localStorage.getItem("id_layanan");
        $.ajax({
            type: "GET",
            url: '/Klinik/layananCtr',
            async: true,
            dataType: "JSON",
            data: {page: page, id_layanan: id_layanan},
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_detail_layanan+'</td>'+
                            '<td>'+data[i].des_detail_layanan+'</td>'+
                            '<td>'+data[i].biaya_layanan+'</td>'+
                            '<td>'+data[i].keterangan+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnEdit'>Edit</a>"
                                   +"&nbsp;"
                                   +"<a class='btn btn-outline-danger btn-sm'"
                                   +"id='btnDel'>Delete</a>"+
                            '</td>'+
                            '</tr>';
                }
                $("#show-detail").html(html);
            }
        })
    }
    
    
    
    $('#btnBatallookupDetail').click(()=>{
        localStorage.clear("id_layanan");
        $('#modalDetail').fadeOut(); 
    });
   

    $('#btnAddDetail').click(()=>{
        $('#myModalDetail').fadeIn();
        getInputValueDetail();
        page= "tambahDetail";
        $('#iddetaillayanan').val("DL");
    });
    
    $('#iddetaillayanan').keydown(function(e){
       let key = e.charCode || e.keyCode; 
       let maxChar = "4";
       if($('#iddetaillayanan').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 76 || key == 68 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#iddetaillayanan').val().length == 2){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    });
    
    $('#biayalayanan').keydown((e)=>{
       let key = e.charCode || e.keyCode; 
       if(key >= 48 && key <= 57 || key == 8 || key == 9 || key == 37 || key == 39){
           
       }else{
           e.preventDefault();
       }
    });
    
    $('#btnSaveDetail').click(()=>{ 
       getInputValueDetail();
       if(id_detail_layanan == "DL"){
           $("#iddetaillayanan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Detail Layanan Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#iddetaillayanan").focus();
                            $("#iddetaillayanan").keypress(()=>{
                                 $("#iddetaillayanan").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
       }else if(des_detail_layanan == ""){
           $("#desdetaillayanan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'Deskripsi Detail Layanan Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#desdetaillayanan").focus();
                            $("#desdetaillayanan").keypress(()=>{
                                 $("#desdetaillayanan").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
       }else if(biaya_layanan == ""){
           $("#biayalayanan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'Biaya Layanan Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#biayalayanan").focus();
                            $("#biayalayanan").keypress(()=>{
                                 $("#biayalayanan").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
       }else if(keterangan == ""){
           $("#keterangan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'Keterangan Layanan Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#keterangan").focus();
                            $("#keterangan").keypress(()=>{
                                 $("#keterangan").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
       }else{
           $.post('/Klinik/layananCtr', {
                page: page,
                id_layanan: id_layanan_detail,
                id_detail_layanan: id_detail_layanan,
                des_detail_layanan: des_detail_layanan,
                biaya_layanan: biaya_layanan,
                keterangan: keterangan
            },(data, status)=>{
                if(data == "Data Detail Layanan Berhasil Disimpan!"){
                    $.alert({
                        icon : 'fas fa-check-circle',
                        title: 'Berhasil',
                        type: 'blue',
                        content: data,
                        typeAnimated: true,
                        buttons: {
                            ok: {
                                btnClass: 'btn-red',
                                action: function(){
                                    $('#myModalDetail').fadeOut();
                                    getDataDetail();
                                    clearForm();
                                }  
                            }          
                        }
                    });
                }else if(data == "Data Detail Layanan Berhasil Diedit!"){
                    $.alert({
                        icon : 'fas fa-check-circle',
                        title: 'Berhasil',
                        type: 'blue',
                        content: data,
                        typeAnimated: true,
                        buttons: {
                            ok: {
                                btnClass: 'btn-red',
                                action: function(){
                                    $('#myModalDetail').fadeOut();
                                    getDataDetail();
                                    clearForm();
                                }  
                            }          
                        }
                    });
                }else{
                    $.alert({
                        icon : 'far fa-times-circle',
                        title: "Gagal!",
                        type: 'red',
                        content: data,
                        typeAnimated: true,
                        buttons: {
                            ok: {
                                btnClass: 'btn-red',
                                action: function(){  
                                }  
                            }          
                        }
                    });
                }
            })
       }
       
    });
    
    $('#show-detail').on('click','#btnDel', function(){
       let baris = $(this).closest('tr');
       let id_layanan_detail = localStorage.getItem("id_layanan");
       let id_detail_layanan = baris.find("td:eq(0)").text();
       let des_detail_layanan = baris.find("td:eq(1)").text();
       page="hapusDetail";
       $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Detail Layanan '+id_detail_layanan+" - " + des_detail_layanan +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/layananCtr', {
                                    page: page,
                                    id_layanan: id_layanan_detail,
                                    id_detail_layanan: id_detail_layanan
                                },
                                function(data, status){
                                   if(data == "Data Detail Layanan Berhasil di Hapus!"){ 
                                   $.alert({
                                        title: 'Berhasil!',
                                        content: data,
                                        buttons: {
                                            ok: {
                                                btnClass: 'btn-red',
                                                action: ()=>{
                                                    getDataDetail();
                                                }
                                            }
                                        }
                                    }) 
                                }
                            }
                                    
                        )
                    }
                },
                No:{
                    btnClass: 'blue',
                    action: function(){
                        
                    }
                }
            }
       })
    });
    
    $('#show-detail').on('click', "#btnEdit", function(){
        $('#myModalDetail').fadeIn();
        $('#title-modal-detail').html("Edit Data");
        $('#iddetaillayanan').prop("readonly", true);
        $('#btnSaveDetail').html("Edit");
        let baris = $(this).closest('tr');
        let id_layanan_detail = localStorage.getItem("id_layanan");
        let id_detail_layanan = baris.find("td:eq(0)").text();
        page="tampilDetail";
        $.post('/Klinik/layananCtr', {
            page: page,
            id_layanan: id_layanan_detail,
            id_detail_layanan: id_detail_layanan,
        },(data)=>{
            $("#idlayanandetail").val(data.id_layanan);
            $('#iddetaillayanan').val(data.id_detail_layanan);
            $('#desdetaillayanan').val(data.des_detail_layanan);
            $("#biayalayanan").val(data.biaya_layanan);
            $("#keterangan").val(data.keterangan);
        })
        page="editDetail";
    })
    
    $('#btnSaveDetail').click(()=>{
        getInputValueDetail();
        $.post('/Klinik/layananCtr', {
            page: page,
            id_layanan: id_layanan_detail,
            id_detail_layanan: id_detail_layanan,
            des_detail_layanan: des_detail_layanan,
            biaya_layanan: biaya_layanan,
            keterangan: keterangan
        },(data)=>{})
    })

    $('#btnBatalDetail').click(()=>{  
        $('#myModalDetail').fadeOut();  
        clearForm();
    });
    

    
    $('#search').keyup(function(){
        search_table($(this).val());
    });
    
    function search_table(value){
        $('#show-data tr').each(function(){
            let found = 'false';
            $(this).each(function(){
                if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){  
                     found = 'true';  
                }  
            })
            if(found == 'true'){  
                $(this).show();  
            }  
            else{  
                $(this).hide();  
            } 
        })
    }
    
    $('#searchDetail').keyup(function(){
        search_table_detail($(this).val());
    });
    
    function search_table_detail(value){
        $('#show-detail tr').each(function(){
            let found = 'false';
            $(this).each(function(){
                if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){  
                     found = 'true';  
                }  
            })
            if(found == 'true'){  
                $(this).show();  
            }  
            else{  
                $(this).hide();  
            } 
        })
    }
    
    
    $('#logout').click(function(){
        window.location.replace("../../login.html");
        sessionStorage.clear();
        localStorage.setItem("status", false);
    });
    
       
});

