$(document).ready(function(){
    let id_poli, nama_poli;
    
    const getInputValue = () =>{
        id_poli = $('#id').val();
        nama_poli = $('#namapoli').val();
    }
    
    const clearData = () =>{
        $('#id').val("");
        $('#namapoli').val("");
    }
    
    const getData = () => {
        $.ajax({
            url: '/Klinik/poliCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_poli+'</td>'+
                            '<td>'+data[i].nama_poli+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnEdit'>Edit</a>"
                                   +"&nbsp;"
                                   +"<a class='btn btn-outline-danger b tn-sm'"
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
       page="tambah";
       $('#id').val("P");
       $('#myModal').fadeIn();
       $('#id').prop("readonly", false);
    });
    
    $('#id').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 2;
        if($('#id').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#id').val().length == 1){
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
        if(id_poli == "P"){
            $("#id").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Poli Harus diisi!',
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
        }else if(nama_poli == ""){
            $("#namapoli").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'Nama Poli Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#namapoli").focus();
                            $("#namapoli").keypress(()=>{
                                 $("#namapoli").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            $.post('/Klinik/poliCtr', {
                page: page,
                id_poli: id_poli,
                nama_poli: nama_poli
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
                }else if(data == "Data Berhasil di Edit!"){
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
        page = "hapus";
        let baris = $(this).closest('tr');
        let id_poli = baris.find('td:eq(0)').text();
        let nama_poli = baris.find('td:eq(1)').text();
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Poli '+id_poli+" - " + nama_poli +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/poliCtr', {
                                    page: page,
                                    id_poli: id_poli,
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
    });
    
    $('#show-data').on('click','#btnEdit', function(){
        $('#myModal').fadeIn();
        $('#btnSave').html('EDIT');
        $('#title-modal').html('EDIT DATA');
        $('#id').prop("readonly", true);
        page = "tampil";
        let baris = $(this).closest('tr');
        let id_poli = baris.find('td:eq(0)').text();
        $.post('/Klinik/poliCtr', {
            page: page,
            id_poli: id_poli
        },(data)=>{
            $('#id').val(data.id_poli);
            $('#namapoli').val(data.nama_poli);
        })
        page="edit";
    })
    
    $('#btnSave').click(()=>{
        getInputValue();
        $.post('/Klinik/poliCtr', {
            page: page,
            id_poli: id_poli,
            nama_poli: nama_poli
        },(data)=>{})
    })
    

    $('#btnBatal').click(function(){
        $('#myModal').fadeOut();
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