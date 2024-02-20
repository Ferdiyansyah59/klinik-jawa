$(document).ready(function(){
    
    let id_rawat, id_pasien, id_kamar, tgl_cekin, tgl_cekout, keterangan;
    
    const getInputValue = () =>{
        id_rawat = $('#idrawat').val();
        id_pasien = $('#idpasien').val();
        id_kamar = $('#idkamar').val();
        tgl_cekin = $('#tglcekin').val();
        tgl_cekout = $('#tglcekout').val();
        keterangan = $('#keterangan').val();
    }
    
    const clearData = () =>{
        $('#idrawat').val("");
        $('#idpasien').val("");
        $('#idkamar').val("");
        $('#tglcekin').val("");
        $('#tglcekout').val("");
        $('#keterangan').val("");
        $('#namapasien').val("");
        $('#namaruang').val("");
    }
    
    const getData = () =>{
        $.ajax({
            url: '/Klinik/rawatinapCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].idrawat+'</td>'+
                            '<td>'+data[i].namapasien+'</td>'+
                            '<td>'+data[i].idkamar+'</td>'+
                            '<td>'+data[i].namaruang+'</td>'+
                            '<td>'+data[i].tglcekin+'</td>'+
                            '<td>'+data[i].tglcekout+'</td>'+
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
                $('#show-data').html(html);
            }
        })
    }
    
    getData();
    
    $('#btnAdd').click(()=>{
        $('#myModal').fadeIn();
        $('#btnSave').show();
        $('#btnSave-edit').hide();
        $('#title-modal').html('TAMBAH DATA');
        $('#idrawat').prop("readonly", false);
        $('#idrawat').val("RI");
        $('#idpasien').val("PS");
        $('#idkamar').val('KM');
    });
    
    $('#idrawat').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 7;
        if($('#idrawat').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 68 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#idrawat').val().length == 2){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    })
    
    $('#idpasien').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 5;
        if($('#idpasien').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 68 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#idpasien').val().length == 2){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    })
    
    $('#idkamar').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 4;
        if($('#idkamar').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 68 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#idkamar').val().length == 2){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    })
    
    $('#btnSave').click(()=>{
        getInputValue();
        if(id_rawat == "RI"){
            $("#idrawat").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Rawat harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idrawat").focus();
                            $("#idrawat").keypress(()=>{
                                 $("#idrawat").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else if(id_pasien == "PS"){
            $("#idpasien").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Pasien harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idpasien").focus();
                            $("#idpasien").keypress(()=>{
                                 $("#idpasien").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else if(id_kamar == "KR"){
            $("#idkamar").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Kamar harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idkamar").focus();
                            $("#idkamar").keypress(()=>{
                                 $("#idkamar").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            $.post('/Klinik/rawatinapCtr', {
                page: "tambah",
                id_rawat: id_rawat,
                id_pasien: id_pasien,
                id_kamar: id_kamar,
                tglcekin: tgl_cekin,
                tglcekout: tgl_cekout,
                keterangan: keterangan
            },(data)=>{
                if(data == "Data Berhasil Disimpan!"){
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
                                    clearData();
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
    })
    
    $("#show-data").on('click', '#btnEdit', function(){
        $('#myModal').fadeIn();
        $('#btnSave').hide();
        $('#btnSave-edit').show();
        $('#title-modal').html('EDIT DATA');
        $('#idrawat').prop("readonly", true);
        let baris = $(this).closest('tr');
        let id_rawat = baris.find('td:eq(0)').text();
        $.post('/Klinik/rawatinapCtr', {
            page: "tampil",
            id_rawat: id_rawat
        },(data)=>{
            $('#idrawat').val(data.idrawat);
            $('#idpasien').val(data.idpasien);
            $('#idkamar').val(data.idkamar);
            $('#tglcekin').val(data.tglcekin);
            $('#tglcekout').val(data.tglcekout);
            $('#keterangan').val(data.keterangan);
        })
    })
    
    $('#btnSave-edit').click(()=>{
        getInputValue();
        if(id_rawat == "RI"){
            $("#idrawat").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Layanan harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idrawat").focus();
                            $("#idrawat").keypress(()=>{
                                 $("#idrawat").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else if(id_pasien == "PS"){
            $("#idpasien").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Layanan harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idpasien").focus();
                            $("#idpasien").keypress(()=>{
                                 $("#idpasien").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else if(id_kamar == "KR"){
            $("#idkamar").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Layanan harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idkamar").focus();
                            $("#idkamar").keypress(()=>{
                                 $("#idkamar").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            $.post('/Klinik/rawatinapCtr', {
                page: "edit",
                id_rawat: id_rawat,
                id_pasien: id_pasien,
                id_kamar: id_kamar,
                tglcekin: tgl_cekin,
                tglcekout: tgl_cekout,
                keterangan: keterangan
            },(data)=>{
                if(data == "Data Berhasil DiEdit!"){
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
                                    clearData();
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
    })
    
    $('#show-data').on('click', '#btnDel', function(){
        let baris = $(this).closest('tr');
        let id_rawat = baris.find('td:eq(0)').text();
        let nama_pasien = baris.find('td:eq(1)').text();
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Rawat '+id_rawat+" - " + nama_pasien +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/rawatinapCtr', {
                                    page: "hapus",
                                    id_rawat: id_rawat,
                                },
                                function(data, status){
                                   if(data == "Data Berhasil di Hapus!"){ 
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
    

    $('#btnBatal').click(function(){
        $('#myModal').fadeOut();
        clearData();
    });

    $('#lookuppasien').click(function(){
        $('#modalPasien').fadeIn();
        $.ajax({
            url: "/Klinik/pasienCtr",
            method: "GET",
            async: true,
            dataType: "JSON",
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_pasien+'</td>'+
                            '<td>'+data[i].nama_pasien+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnPil-pasien'>Pilih</a>"+
                                   
                            '</td>'+
                            '</tr>';
                }
                $('#show-look-pasien').html(html);
            }
        })
    });
    
    $('#show-look-pasien').on('click','#btnPil-pasien', function(){
        let baris = $(this).closest('tr');
        let id = baris.find('td:eq(0)').text();
        let nama_pasien = baris.find('td:eq(1)').text();
        $('#modalPasien').fadeOut();
        $('#idpasien').val(id);
        $('#namapasien').val(nama_pasien);
    })
    
    $('#idpasien').keyup(()=>{
        id_pasien = $('#idpasien').val();
        $.post('/Klinik/pasienCtr',{
            page: "tampil",
            id_pasien: id_pasien
        },(data)=>{
            $('#namapasien').val(data.nama_pasien);
        })
    })

    $('#btnBatallookuppasien').click(function(){
        $('#modalPasien').fadeOut();
    });
    $('#lookupKamar').click(function(){
        $('#modalKamar').fadeIn();
        $.ajax({
            url: "/Klinik/kamarCtr",
            method: "GET",
            async: true,
            dataType: "JSON",
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id+'</td>'+
                            '<td>'+data[i].namaruang+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnPil-kamar'>Pilih</a>"+
                                   
                            '</td>'+
                            '</tr>';
                }
                $('#show-look-kamar').html(html);
            }
        })
    });
    
    $('#show-look-kamar').on('click','#btnPil-kamar', function(){
        let baris = $(this).closest('tr');
        let id = baris.find('td:eq(0)').text();
        let nama = baris.find('td:eq(1)').text();
        $('#modalKamar').fadeOut();
        $('#idkamar').val(id);
        $('#namaruang').val(nama);
    })

    $('#btnBatallookupKamar').click(function(){
        $('#modalKamar').fadeOut();
    });
    
    $('#idkamar').keyup(()=>{
        let id = $('#idkamar').val();
        $.post('/Klinik/kamarCtr',{
            page: "tampil",
            id_kamar: id
        },(data)=>{
            $('#namaruang').val(data.namaruang);
        })
    })

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
    $('#logout').click(()=>{
        logout();
    });
    
    const logout = () => {
        location.href = '../../login.html';
        sessionStorage.clear();
        localStorage.setItem("status", false);
    }
    
    
});