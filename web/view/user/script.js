$(document).ready(function(){
    let id_user, nama_user, password, role;
    
    const getInputValue = () =>{
        id_user = $('#iduser').val();
        nama_user = $('#namauser').val();
        password = $('#password').val();
        role = $('#role').val();
    }
    
    const clearData = () =>{
        $('#iduser').val("");
        $('#namauser').val("");
        $('#password').val("");
        $('#role').val("");
    }
    
    const getData = ()=>{
        $.ajax({
            url: '/Klinik/userCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                                '<td>'+data[i].id_user+'</td>'+
                                '<td>'+data[i].nama_user+'</td>'+
                                '<td>'+data[i].role+'</td>'+
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
    
    
    $('#btnAdd').click(function(){
        $('#myModal').fadeIn();
        $('#btnSave').show();
        $('#btnSave-edit').hide();
        $('#title-modal').html('TAMBAH DATA');
        $('#iduser').prop("readonly", false);
        $('#iduser').val("K");
    });
    
    $('#iduser').keydown(function(e){
       let key = e.charCode || e.keyCode; 
       let maxChar = "3";
       if($('#iduser').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 76 || key == 68 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#iduser').val().length == 1){
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
        if(id_user == "K"){
            $("#iduser").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID User Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#iduser").focus();
                            $("#iduser").keypress(()=>{
                                 $("#iduser").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            $.post('/Klinik/userCtr',{
                page: "tambah",
                id_user: id_user,
                nama_user: nama_user,
                password: password,
                role: role
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
        $('#iduser').prop("readonly", true);
       let baris = $(this).closest('tr');
       let id_user = baris.find('td:eq(0)').text();
       $.post('/Klinik/userCtr',{
           page: "tampil",
           id_user: id_user
       },(data)=>{
           $('#iduser').val(data.id_user);
            $('#namauser').val(data.nama_user);
            $('#password').val(data.password);
            $('#role').val(data.role);
       })
    });
    
    $('#btnSave-edit').click(()=>{
        getInputValue();
        $.post('/Klinik/userCtr',{
            page: "edit",
            id_user: id_user,
            nama_user: nama_user,
            password: password,
            role: role
        },(data)=>{
            if(data == "Data berhasil di edit!"){
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
        let id_user = baris.find('td:eq(0)').text();
        let nama_user = baris.find('td:eq(1)').text();
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID User '+id_user+" - " + nama_user +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/userCtr', {
                                    page: "hapus",
                                    id_user: id_user
                                },
                                function(data, status){
                                   if(data === "Data berhasil di hapus"){ 
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