$(document).ready(function(){
    let id_kamar, nama_ruang, no_ruang, kelas, harga_perhari, des_kamar, kapasitas, terisi, status;
    
    const getInputValue = () =>{
        id_kamar = $('#idkamar').val();
        nama_ruang = $('#namaruang').val();
        no_ruang = $('#noruang').val();
        kelas = $('#kelas').val();
        harga_perhari = $('#harga').val();
        des_kamar = $('#deskripsi').val();
        kapasitas = $('#kapasitas').val();
        terisi = $('#terisi').val();
        status = $('#status').val();
    }
    
    const clearData = () =>{
        $('#idkamar').val("");
        $('#namaruang').val("");
        $('#noruang').val("");
        $('#kelas').val("");
        $('#harga').val("");
        $('#deskripsi').val("");
        $('#kapasitas').val("");
        $('#terisi').val("");
        $('#status').val("");
    }
    
    const getData = () =>{
        $.ajax({
            url: '/Klinik/kamarCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id+'</td>'+
                            '<td>'+data[i].namaruang+'</td>'+
                            '<td>'+data[i].no_kamar+'</td>'+
                            '<td>'+data[i].kelas+'</td>'+
                            '<td>'+data[i].harga+'</td>'+
                            '<td>'+data[i].Desk+'</td>'+
                            '<td>'+data[i].kapasitas+'</td>'+
                            '<td>'+data[i].isi+'</td>'+
                            '<td>'+data[i].status+'</td>'+
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
        $('#idkamar').prop("readonly", false);
        $('#idkamar').val("KM");
    });
    
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
    
    
    $('#noruang, #harga, #kapasitas, #terisi').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        if(key == 8 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
        }else{
            e.preventDefault();
        }
    })
    
    $('#btnSave').click(()=>{
        getInputValue();
        if(id_kamar == "KM"){
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
            $.post('/Klinik/kamarCtr', {
                page: "tambah",
                id_kamar: id_kamar,
                nama_ruang: nama_ruang,
                no_kamar: no_ruang,
                kelas: kelas,
                harga: harga_perhari,
                desk: des_kamar,
                kapasitas: kapasitas,
                isi: terisi,
                status: status
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
        $('#idkamar').prop("readonly", true);
        let baris = $(this).closest('tr');
        id_kamar = baris.find('td:eq(0)').text();
        $.post('/Klinik/kamarCtr', {
            page: "tampil",
            id_kamar: id_kamar
        },(data)=>{
            $('#idkamar').val(data.id);
            $('#namaruang').val(data.namaruang);
            $('#noruang').val(data.no_kamar);
            $('#kelas').val(data.kelas);
            $('#harga').val(data.harga);
            $('#deskripsi').val(data.Desk);
            $('#kapasitas').val(data.kapasitas);
            $('#terisi').val(data.isi);
            $('#status').val(data.status);
        })
    })
    
    $('#btnSave-edit').click(()=>{
        getInputValue();
        if(id_kamar == "KM"){
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
            $.post('/Klinik/kamarCtr', {
                page: "edit",
                id_kamar: id_kamar,
                nama_ruang: nama_ruang,
                no_kamar: no_ruang,
                kelas: kelas,
                harga: harga_perhari,
                desk: des_kamar,
                kapasitas: kapasitas,
                isi: terisi,
                status: status
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
        id_kamar = baris.find('td:eq(0)').text();
        nama_ruang = baris.find('td:eq(1)').text();
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Kamar '+id_kamar+" - " + nama_ruang +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/kamarCtr', {
                                    page: "hapus",
                                    id_kamar: id_kamar,
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