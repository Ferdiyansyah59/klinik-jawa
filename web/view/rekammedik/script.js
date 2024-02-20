$(document).ready(function(){
    
    let id_pasien, tgl_daftar, id_poli, tek_darah, berat, tinggi, keluhan, tindakan, saran, id_dokter, id_resep, diagnosa, user_id;
    
    const getInputValue = () =>{
        id_pasien = $('#idpasien').val();
        tgl_daftar = $('#tgldaftar').val();
        id_poli = $('#idpoli').val();
        tek_darah = $('#tekdarah').val();
        berat = $('#berat').val();
        tinggi = $('#tinggi').val();
        keluhan = $('#keluhan').val();
        tindakan = $('#tindakan').val();
        saran = $('#saran').val();
        id_dokter = $('#iddokter').val();
        id_resep = $('#idresep').val();
        diagnosa = $('#diagnosa').val();
    }
    
    const clearData = () =>{
        $('#idpasien').val("");
        $('#tgldaftar').val("");
        $('#idpoli').val("");
        $('#tekdarah').val("");
        $('#berat').val("");
        $('#tinggi').val("");
        $('#keluhan').val("");
        $('#tindakan').val("");
        $('#saran').val("");
        $('#iddokter').val("");
        $('#idresep').val("");
        $('#diagnosa').val("");
        $('#namapasien').val("");
        $('#namapoli').val("");
        $('#namadokter').val("")
    }
    
    const getData = () =>{
        $.ajax({
            url: "/Klinik/rekammedikCtr",
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
                            '<td>'+data[i].tgl_lahir+'</td>'+
                            '<td>'+data[i].tgl_daftar+'</td>'+
                            '<td>'+data[i].nama_poli+'</td>'+
                            '<td>'+data[i].gol_darah+'</td>'+
                            '<td>'+data[i].tekanan+'</td>'+
                            '<td>'+data[i].berat+'</td>'+
                            '<td>'+data[i].tinggi+'</td>'+
                            '<td>'+data[i].keluhan+'</td>'+
                            '<td>'+data[i].tidakan+'</td>'+
                            '<td>'+data[i].saran+'</td>'+
                            '<td>'+data[i].nama_dokter+'</td>'+
                            '<td>'+data[i].diagnosa+'</td>'+
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
        $('#idpasien').prop("readonly", false);
        $('#idpasien').val("PS");
        $('#idpoli').val("P");
        $('#iddokter').val("D");
        $('#idresep').val("R");
    });
    
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
    
    $('#idpoli').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 2;
        if($('#idpoli').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#idpoli').val().length == 1){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    })
    
    $('#iddokter').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 4;
        if($('#iddokter').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#iddokter').val().length == 1){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    })
    
    $('#tekdarah').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        if(key == 8 || key == 191 ||key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
        }else{
            e.preventDefault();
        }
    })
    
    $('#berat ,#tinggi').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        if(key == 8  ||key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
        }else{
            e.preventDefault();
        }
    })
    
    $('#idresep').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 2;
        if($('#idresep').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#idresep').val().length == 1){
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
        if(id_pasien == "PS"){
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
    
            $.post('/Klinik/rekammedikCtr', {
                page: "tambah",
                id_pasien: id_pasien,
                tgl_daftar: tgl_daftar,
                id_poli: id_poli,
                tek_darah: tek_darah,
                berat: berat,
                tinggi: tinggi,
                keluhan: keluhan,
                tindakan: tindakan,
                saran: saran,
                id_dokter: id_dokter,
                id_resep: id_resep,
                diagnosa: diagnosa,
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
    })
    
    $('#show-data').on('click','#btnEdit', function(){
        $('#myModal').fadeIn();
        $('#btnSave').hide();
        $('#btnSave-edit').show();
        $('#title-modal').html('EDIT DATA');
        $('#idpasien').prop("readonly", true);
        let baris = $(this).closest('tr');
        let id = baris.find('td:eq(0)').text();
        $.post('/Klinik/rekammedikCtr', {
            page: "tampil",
            id_pasien: id
        },(data)=>{
            $('#idpasien').val(data.id_pasien);
            $('#tgldaftar').val(data.tgl_daftar);
            $('#idpoli').val(data.id_poli);
            $('#tekdarah').val(data.tekanan);
            $('#berat').val(data.berat);
            $('#tinggi').val(data.tinggi);
            $('#keluhan').val(data.keluhan);
            $('#tindakan').val(data.tidakan);
            $('#saran').val(data.saran);
            $('#iddokter').val(data.id_dokter);
            $('#idresep').val(data.id_resep);
            $('#diagnosa').val(data.diagnosa);
        })
    })
    
    $('#btnSave-edit').click(()=>{
        getInputValue();
        if(id_pasien == "PS"){
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
            $.post('/Klinik/rekammedikCtr', {
                page: "edit",
                id_pasien: id_pasien,
                tgl_daftar: tgl_daftar,
                id_poli: id_poli,
                tek_darah: tek_darah,
                berat: berat,
                tinggi: tinggi,
                keluhan: keluhan,
                tindakan: tindakan,
                saran: saran,
                id_dokter: id_dokter,
                id_resep: id_resep,
                diagnosa: diagnosa,
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
        let id = baris.find('td:eq(0)').text();
        let nama = baris.find('td:eq(1)').text();
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Pasien '+id+" - " + nama +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/rekammedikCtr', {
                                    page: "hapus",
                                    id_pasien: id,
                                },(data, status)=>{
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
        page=null;
        $.ajax({
            url: '/Klinik/pasienCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
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
       let nama = baris.find('td:eq(1)').text();
       $('#modalPasien').fadeOut();
       $('#idpasien').val(id);
       $('#namapasien').val(nama);
    });
    
    $('#idpasien').keyup(()=>{
        let id = $('#idpasien').val();
        $.post('/Klinik/pasienCtr', {
            page: "tampil",
            id_pasien: id
        },(data)=>{
            $('#namapasien').val(data.nama_pasien);
        })
    })

    $('#btnBatallookuppasien').click(function(){
        $('#modalPasien').fadeOut();
    });

    $('#lookupdokter').click(function(){
        $('#modalDokter').fadeIn();
        page=null;
        $.ajax({
            url: '/Klinik/dokterCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_dokter+'</td>'+
                            '<td>'+data[i].nama_dokter+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnPil-dokter'>Pilih</a>"+
                            '</td>'+
                            '</tr>';
                }
                $('#show-look-dokter').html(html);
            }
        })
    });
    
    $('#show-look-dokter').on('click','#btnPil-dokter', function(){
       let baris = $(this).closest('tr');
       let id = baris.find('td:eq(0)').text();
       let nama = baris.find('td:eq(1)').text();
       $('#modalDokter').fadeOut();
       $('#iddokter').val(id);
       $('#namadokter').val(nama);
    });
    
    $('#iddokter').keyup(()=>{
        let id = $('#iddokter').val();
        $.post('/Klinik/dokterCtr', {
            page: "tampil",
            id_dokter: id
        },(data)=>{
            $('#namadokter').val(data.nama_dokter);
        })
    })

    $('#btnBatallookupDokter').click(function(){
        $('#modalDokter').fadeOut();
    });
    
    $('#lookuppoli').click(function(){
        $('#modalPoli').fadeIn();
        page=null;
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
                                   +"id='btnPil-poli'>Pilih</a>"+
                            '</td>'+
                            '</tr>';
                }
                $('#show-look-poli').html(html);
            }
        })
    });
    
    $('#show-look-poli').on('click','#btnPil-poli', function(){
       let baris = $(this).closest('tr');
       let id = baris.find('td:eq(0)').text();
       let nama = baris.find('td:eq(1)').text();
       $('#modalPoli').fadeOut();
       $('#idpoli').val(id);
       $('#namapoli').val(nama);
    });
    
    $('#idpoli').keyup(()=>{
        let id = $('#idpoli').val();
        $.post('/Klinik/poliCtr', {
            page: "tampil",
            id_poli: id
        },(data)=>{
            $('#namapoli').val(data.nama_poli);
        })
    })

    $('#btnBatallookupPoli').click(function(){
        $('#modalPoli').fadeOut();
    });
    
    $('#lookupresep').click(function(){
        $('#modalResep').fadeIn();
        page=null;
        $.ajax({
            url: '/Klinik/resepCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_resep+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnPil-resep'>Pilih</a>"+
                            '</td>'+
                            '</tr>';
                }
                $('#show-look-resep').html(html);
            }
        })
    });
    
    $('#show-look-resep').on('click','#btnPil-resep', function(){
       let baris = $(this).closest('tr');
       let id = baris.find('td:eq(0)').text();
       let nama = baris.find('td:eq(1)').text();
       $('#modalResep').fadeOut();
       $('#idresep').val(id);
    });
    

    $('#btnBatallookupResep').click(function(){
        $('#modalResep').fadeOut();
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