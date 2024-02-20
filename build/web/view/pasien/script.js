$(document).ready(function(){
    let id_pasien, nama_pasien, tgl_lahir, jenis_kelamin, no_ktp, alamat, no_hp, goldar,password, user_id; 
    
    const getInputValue = () =>{
        id_pasien = $('#idpasien').val();
        nama_pasien = $('#namapasien').val();
        tgl_lahir = $('#tgllahir').val();
        jenis_kelamin = $("input[name='jenis_kelamin']:checked").val();
        no_ktp = $('#noktp').val();
        alamat = $('#alamat').val();
        no_hp = $('#nohp').val();
        gol_darah = $('#goldar').val();
        password = $('#pw').val();
    }
    
    const clearData = () => {
        $('#idpasien').val("");
        $('#namapasien').val("");
        $('#tgllahir').val("");
        $("input[name='jenis_kelamin']").prop('checked', false);
        $('#noktp').val("");
        $('#alamat').val("");
        $('#nohp').val("");
        $('#goldar').val("");
        $('#pw').val("");
    }
    
    const getData = () => {
        $.ajax({
            url: '/Klinik/pasienCtr',
            async: true,
            method: 'GET',
            dataType: 'JSON',
            success: (data)=>{
                console.log(data);
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_pasien+'</td>'+
                            '<td>'+data[i].nama_pasien+'</td>'+
                            '<td>'+data[i].tgl_lahir+'</td>'+
                            '<td>'+data[i].jenkel+'</td>'+
                            '<td>'+data[i].alamat+'</td>'+
                            '<td>'+data[i].no_hp+'</td>'+
                            '<td>'+data[i].gol_dar+'</td>'+
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
        $('#idpasien').prop("readonly", false);
        $('#idpasien').val("PS");
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
       
       if(key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
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
    
    $('#noktp, #nohp').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        if(key == 8 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
        }else{
            e.preventDefault();
        }
    })
    
    $('#btnSave').click(()=>{
        getInputValue();
        if(id_pasien == ""){
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
        }else{
            user_id = sessionStorage.getItem("nama");
            $.post('/Klinik/pasienCtr', {
                page: "tambah",
                id_pasien: id_pasien,
                nama_pasien: nama_pasien,
                tgl_lahir: tgl_lahir, 
                jenkel: jenis_kelamin,
                no_ktp: no_ktp,
                alamat: alamat,
                no_hp: no_hp,
                gol_dar: gol_darah,
                password: password,
                user: user_id

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
    
    $('#show-data').on('click','#btnEdit', function(){
        $('#myModal').fadeIn();
        $('#btnSave').hide();
        $('#btnSave-edit').show();
        $('#title-modal').html('EDIT DATA');
        $('#idpasien').prop("readonly", true);
        let baris = $(this).closest('tr');
        let id_pasien = baris.find('td:eq(0)').text();
        $.post('/Klinik/pasienCtr', {
            page: "tampil",
            id_pasien: id_pasien
        },(data)=>{
            console.log(data);
            $('#idpasien').val(data.id_pasien);
            $('#namapasien').val(data.nama_pasien);
            $('#tgllahir').val(data.tgl_lahir);
            if(data.jenkel == "L"){
                $('#laki').attr('checked', true);
            }else if(data.jenkel == "P"){
                $('#cewe').attr('checked', true);
            }
            $('#noktp').val(data.no_ktp);
            $('#alamat').val(data.alamat);
            $('#nohp').val(data.no_hp);
            $('#goldar').val(data.gol_dar); 
            $('#pw').val(data.password);
        })
    })
    
    $('#btnSave-edit').click(()=>{
        getInputValue();
        if(id_pasien == ""){
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
        }else{
            user_id = sessionStorage.getItem("nama");
            $.post('/Klinik/pasienCtr', {
                page: "edit",
                id_pasien: id_pasien,
                nama_pasien: nama_pasien,
                tgl_lahir: tgl_lahir, 
                jenkel: jenis_kelamin,
                no_ktp: no_ktp,
                alamat: alamat,
                no_hp: no_hp,
                gol_dar: gol_darah,
                password: password,
                user: user_id

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
    
    $('#show-data').on('click','#btnDel', function(){
        let baris = $(this).closest('tr');
        let id_pasien = baris.find('td:eq(0)').text();
        let nama_pasien = baris.find('td:eq(1)').text();
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Pasien '+id_pasien+" - " + nama_pasien +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/pasienCtr', {
                                    page: "hapus",
                                    id_pasien: id_pasien
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