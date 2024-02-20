$(document).ready(function(){
    let id_supplier, nama_supplier, alamat, no_telepon, email, user_id;
    
    const getInputValue = () =>{
        id_supplier = $('#idsupplier').val();
        nama_supplier = $('#namasupplier').val();
        alamat = $('#alamat').val();
        no_telepon = $('#nohp').val();
        email = $('#email').val();
        user_id = sessionStorage.getItem("nama");
    }
    
    const clearData = () =>{
        $('#idsupplier').val("");
        $('#namasupplier').val("");
        $('#alamat').val("");
        $('#nohp').val("");
        $('#email').val("");
    }
    
    const getData = () =>{
        $.ajax({
            url: '/Klinik/supplierCtr',
            method: 'GET',
            async: true,
            datType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0; i<data.length; i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_supplier+'</td>'+
                            '<td>'+data[i].nama_suplier+'</td>'+
                            '<td>'+data[i].alamat+'</td>'+
                            '<td>'+data[i].no_telepon+'</td>'+
                            '<td>'+data[i].email+'</td>'+
                            '<td>'+data[i].user_id+'</td>'+
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
        $('#idsupplier').prop("readonly", false);
        $('#idsupplier').val("SP");
    })
    
    $('#idsupplier').keydown(function(e){
       let key = e.charCode || e.keyCode; 
       let maxChar = "4";
       if($('#idsupplier').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#idsupplier').val().length == 2){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    });
    
    $('#btnSave').click(()=>{
        getInputValue();
        if(id_supplier == "SP"){
            $("#idsupplier").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Supplier Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idsupplier").focus();
                            $("#idsupplier").keypress(()=>{
                                 $("#idsupplier").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            $.post('/Klinik/supplierCtr', {
                page: "tambah",
                id_supplier: id_supplier,
                nama_supplier: nama_supplier,
                alamat: alamat,
                no_telepon: no_telepon,
                email: email,
                user_id: user_id
            }, (data)=>{
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
    
    $('#show-data').on('click','#btnEdit', function(){
        $('#myModal').fadeIn();
        $('#btnSave').hide();
        $('#btnSave-edit').show();
        $('#title-modal').html('EDIT DATA');
        $('#idsupplier').prop("readonly", true);
        let baris = $(this).closest('tr');
        let id_supplier = baris.find('td:eq(0)').text();
        $.post('/Klinik/supplierCtr', {
            page: "tampil",
            id_supplier: id_supplier
        },(data)=>{
            $('#idsupplier').val(data.id_supplier);
            $('#namasupplier').val(data.nama_suplier);
            $('#alamat').val(data.alamat);
            $('#nohp').val(data.no_telepon);
            $('#email').val(data.email);
        })
    })
    
    $('#btnSave-edit').click(()=>{
        getInputValue();
        $.post('/Klinik/supplierCtr', {
            page: "edit",
            id_supplier: id_supplier,
            nama_supplier: nama_supplier,
            alamat: alamat,
            no_telepon: no_telepon,
            email: email,
            user_id: user_id
        }, (data)=>{
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
    })
    
    $('#show-data').on('click','#btnDel', function(){
        let baris = $(this).closest('tr');
        let id_supplier = baris.find('td:eq(0)').text();
        let nama_supplier = baris.find('td:eq(1)').text();
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Layanan '+id_supplier+" - " + nama_supplier +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/supplierCtr', {
                                    page: "hapus",
                                    id_supplier: id_supplier
                                },
                                function(data, status){
                                   if(data === "Data Berhasil di Hapus!"){ 
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
    
    
    $('#logout').click(function(){
        window.location.replace("../../login.html");
        sessionStorage.clear();
        localStorage.setItem("status", false);
    });

});