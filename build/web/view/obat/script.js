$(document).ready(function(){
    
    let id_obat, nama_obat, satuan, stok, harga_jual, user_id;
    
    const getInputValue = () =>{
        id_obat = $('#id').val();
        nama_obat = $('#namaobat').val();
        stok = "0";
        satuan = $('#satuan').val();
        harga_jual = $('#hargajual').val();
    }
    
    const clearData = () => {
        $('#id').val("");
        $('#namaobat').val("");
        $('#satuan').val("");
        $('#hargajual').val("");
    }
    
    const getData = () => {
        $.ajax({
            url: '/Klinik/obatCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_obat+'</td>'+
                            '<td>'+data[i].nama_obat+'</td>'+
                            '<td>'+data[i].harga_jual+'</td>'+
                            '<td>'+data[i].stok+'</td>'+
                            '<td>'+data[i].satuan+'</td>'+
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
    
    $('#id').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 3;
        if($('#id').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if( key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#id').val().length == 2){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    })

    $('#btnAdd').click(function(){
        $('#myModal').fadeIn();
        $('#btnSave').show();
        $('#btnSave-edit').hide();
        $('#title-modal').html('TAMBAH DATA');
        $('#id').prop("readonly", false);
        page="tambah";
        $('#id').val("OB");
    });
    
    $('#btnSave').click(()=>{
        getInputValue();
        if(id_obat == "OB"){
            $("#id").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Obat harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#id").focus();
                            $("#id").keypress(()=>{
                                 $("#id").css("border-color","#808080");
                            })
                        }
                    }
                }
            })  
        }else if(nama_obat == ""){
            $("#namaobat").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Obat harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#namaobat").focus();
                            $("#namaobat").keypress(()=>{
                                 $("#namaobat").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else if(satuan == ""){
            $("#satuan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Obat harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#satuan").focus();
                            $("#satuan").keypress(()=>{
                                 $("#satuan").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            user_id = sessionStorage.getItem("nama");
            $.post('/Klinik/obatCtr', {
                page: "tambah",
                id_obat: id_obat,
                nama_obat: nama_obat,
                satuan: satuan,
                stok: stok,
                harga_jual: harga_jual,
                user_id: user_id
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
    });
    
    $('#show-data').on('click','#btnDel', function(){
        let baris = $(this).closest('tr');
        let id_obat = baris.find('td:eq(0)').text();
        let nama_obat = baris.find('td:eq(1)').text();
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Obat '+id_obat+" - " + nama_obat +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/obatCtr', {
                                    page: "hapus",
                                    id_obat: id_obat,
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
    
    $('#show-data').on('click','#btnEdit', function(){
        $('#myModal').fadeIn();
        $('#btnSave').hide();
        $('#btnSave-edit').show();
        $('#title-modal').html('EDIT DATA');
        $('#id').prop("readonly", true);
        let baris = $(this).closest('tr');
        let id_obat = baris.find('td:eq(0)').text();
        $.post('/Klinik/obatCtr', {
            page: "tampil",
            id_obat: id_obat
        },(data)=>{
            $('#id').val(data.id_obat);
            $('#namaobat').val(data.nama_obat);
            $('#satuan').val(data.satuan);
            $('#hargajual').val(data.harga_jual);
        })
        page="edit";
    })
    
    $('#btnSave-edit').click(()=>{
        getInputValue();
        if(id_obat == "OB"){
            $("#id").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Obat harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#id").focus();
                            $("#id").keypress(()=>{
                                 $("#id").css("border-color","#808080");
                            })
                        }
                    }
                }
            })  
        }else if(nama_obat == ""){
            $("#namaobat").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Obat harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#namaobat").focus();
                            $("#namaobat").keypress(()=>{
                                 $("#namaobat").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else if(satuan == ""){
            $("#satuan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Obat harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#satuan").focus();
                            $("#satuan").keypress(()=>{
                                 $("#satuan").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            user_id = sessionStorage.getItem("nama");
            $.post('/Klinik/obatCtr', {
                page: "edit",
                id_obat: id_obat,
                nama_obat: nama_obat,
                satuan: satuan,
                stok: stok,
                harga_jual: harga_jual,
                user_id: user_id
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
                }
            })
        }
    })

    $('#btnBatal').click(function(){
        $('#myModal').fadeOut();
    });
    
    
    $('#search-obat').keyup(function(){
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