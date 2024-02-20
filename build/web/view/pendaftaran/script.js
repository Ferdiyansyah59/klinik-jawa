$(document).ready(function(){
    let  no, no_antrian, id_pasien, id_dokter, id_poli, tgl_daftar, page, keterangan, user_id;
    
    const getInputValue = () =>{
        no_antrian = $('#noantri').val();
        id_pasien = $('#idpasien').val();
        id_poli = $('#idpoli').val();
        keterangan = $('#ket').val();
        id_dokter = $('#iddokter').val();
        user_id = sessionStorage.getItem("nama");   
    }
    
    const clearData = () =>{
        $('#noantri').val("");
        $('#idpasien').val("");
        $('#idpoli').val("");
        $('#ket').val("");
        $('#iddokter').val("");
    }
    
    $('#btnSave-antri').click(()=>{
        let tanggal = new Date().getDate();
        let bulan = new Date().getMonth()+1;
        let tahun = new Date().getFullYear();
        let today; 
        
        if(bulan < 10){
            today = tahun+"-0"+bulan+"-"+tanggal;
        }else{
            today = tahun+"-"+bulan+"-"+tanggal;
        }
        $.post('/Klinik/pendaftaranCtr',{
        page: "getTgl",
        }, (data)=>{   
            if(today == data.tgl){
                let antri = parseInt(data.noantri)+1;
                no = antri.toString();
            }else{
                no = '1';
            }
            $('#noantri').val(no);

        })
    })
    
    
    const getData = () =>{
        let tanggal = new Date().getDate();
        let bulan = new Date().getMonth()+1;
        let tahun = new Date().getFullYear();
        let today; 
        
        if(bulan < 10){
            today = tahun+"-0"+bulan+"-"+tanggal;
        }else{
            today = tahun+"-"+bulan+"-"+tanggal;
        }
        $.ajax({
            type: "GET",
            url: '/Klinik/pendaftaranCtr',
            data: {tgl_daftar: today},
            async: true,
            dataType: 'JSON',
            success: (data) =>{
                let html = '';
                let i;
                for(i=0; i<data.length; i++){
                    html += '<tr>'+
                            '<td>'+data[i].noantri+'</td>'+
                            '<td>'+data[i].idpasien+'</td>'+
                            '<td>'+data[i].namapasien+'</td>'+
                            '<td>'+data[i].idpoli+'</td>'+
                            '<td>'+data[i].namapoli+'</td>'+
                            '<td>'+data[i].tgl+'</td>'+
                            '<td>'+data[i].keterangan+'</td>'+
                            '<td>'+data[i].namadokter+'</td>'+
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
        $('#noantri').prop("readonly", true);
        $('#idpasien').val("PS");
        $('#idpoli').val("P");
        $('#iddokter').val("D");
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
    
    $('#btnSave').click(()=>{
        let tanggal = new Date().getDate();
        let bulan = new Date().getMonth()+1;
        let tahun = new Date().getFullYear();
        let today;
        if(bulan < 10){
            today = tahun+"-0"+bulan+"-"+tanggal;
        }else{
            today = tahun+"-"+bulan+"-"+tanggal;
        }
        getInputValue();   
        if(id_pasien == ""){
            $("#idpasien").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Pasien Harus diisi!',
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
           
            $.post('/Klinik/pendaftaranCtr', {
                page: "tambah",
                no_antri: no_antrian,
                id_pasien: id_pasien,
                id_poli: id_poli,
                tgl: today,
                keterangan: keterangan,
                user_id: user_id,
                id_dokter: id_dokter
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
                }
            })
        }   
    })
    
    $('#show-data').on('click','#btnEdit', function(){
        $('#myModal').fadeIn();
        $('#btnSave').hide();
        $('#btnSave-edit').show();
        $('#title-modal').html('EDIT DATA');
        $('#btnSave-antri').hide();
        $('#noantri').prop("readonly", true);
        let baris = $(this).closest('tr');
        let no_antrian = baris.find('td:eq(0)').text();
        let tgl_daftar = baris.find('td:eq(5)').text();
        $.post('/Klinik/pendaftaranCtr', {
           page: "tampil",
           no_antrian: no_antrian,
           tgl_daftar: tgl_daftar
        },(data)=>{
            $('#noantri').val(data.noantri);
            $('#idpasien').val(data.idpasien);
            $('#idpoli').val(data.idpoli);
            $('#ket').val(data.keterangan);
            $('#iddokter').val(data.id_dokter);
        });
    })
    
    $('#btnSave-edit').click(()=>{
        let tanggal = new Date().getDate();
        let bulan = new Date().getMonth()+1;
        let tahun = new Date().getFullYear();
        let today;
        if(bulan < 10){
            today = tahun+"-0"+bulan+"-"+tanggal;
        }else{
            today = tahun+"-"+bulan+"-"+tanggal;
        }
        getInputValue();   
        if(id_pasien == ""){
            $("#idpasien").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Pasien Harus diisi!',
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
           
            $.post('/Klinik/pendaftaranCtr', {
                page: "edit",
                no_antri: no_antrian,
                id_pasien: id_pasien,
                id_poli: id_poli,
                tgl: today,
                keterangan: keterangan,
                user_id: user_id,
                id_dokter: id_dokter
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
                }
            })
        }   
    })
    
    $('#show-data').on('click', '#btnDel', function(){
        let baris = $(this).closest('tr');
        let no_antrian = baris.find('td:eq(0)').text();
        let tgl_daftar = baris.find('td:eq(5)').text();
        let nama_pasien = baris.find('td:eq(2)').text();
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus Id Dokter '+no_antrian+" - " + nama_pasien +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: function(data, status){
                                $.post('/Klinik/pendaftaranCtr', {
                                    page: "hapus",
                                    no_antri: no_antrian,
                                    tgl_daftar: tgl_daftar
                                },
                                function(data, status){
                                   if(data === "Data Berhasil di Hapus!"){ 
                                   $.alert({
                                        title: 'Berhasil!',
                                        content: data,
                                        buttons: {
                                            ok: {
                                                btnClass: 'btn-red',
                                                action: function(){
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
    
   $('#btnData').click(()=>{
        $('#modalData').fadeIn();
        $.ajax({
            type: "GET",
            url: '/Klinik/pendaftaranCtr',
            async: true,
            data: {page: "data"},
            dataType: 'JSON',
            success: (data) =>{
                let html = '';
                let i;
                for(i=0; i<data.length; i++){
                    html += '<tr>'+
                            '<td>'+data[i].noantri+'</td>'+
                            '<td>'+data[i].idpasien+'</td>'+
                            '<td>'+data[i].namapasien+'</td>'+
                            '<td>'+data[i].idpoli+'</td>'+
                            '<td>'+data[i].namapoli+'</td>'+
                            '<td>'+data[i].tgl+'</td>'+
                            '<td>'+data[i].keterangan+'</td>'+
                            '<td>'+data[i].namadokter+'</td>'+
                            '</tr>'
                }
                $('#show-data-all').html(html);
            }
        })
    })
    
    $('#btnBatalData').click(()=>{
        $('#modalData').fadeOut();
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
                for(i=0; i<data.length; i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_pasien+'</td>'+
                            '<td>'+data[i].nama_pasien+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnPil-pasien'>Pilih</a>"+
                            '</td>'+
                            '</tr>';

                }
                $('#show-data-pasien').html(html);
            }
        })
    });
    
    $('#show-data-pasien').on('click','#btnPil-pasien', function(){
        let baris = $(this).closest('tr');
        let id_pasien = baris.find('td:eq(0)').text();
        let nama_pasien = baris.find('td:eq(1)').text();
        $('#modalPasien').fadeOut();
        $('#idpasien').val(id_pasien);
        $('#namapasien').val(nama_pasien);
    })
    
    $('#idpasien').keyup(()=>{
        id_pasien = $('#idpasien').val();
        $.post('/Klinik/pasienCtr', {
            page: "tampil",
            id_pasien: id_pasien
        },(data)=>{
            $('#namapasien').val(data.nama_pasien);
        })
    })

    $('#btnBatallookuppasien').click(function(){
        $('#modalPasien').fadeOut();
    });

    $('#lookupPoli').click(function(){
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
                for(i=0; i<data.length; i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_poli+'</td>'+
                            '<td>'+data[i].nama_poli+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnPil-poli'>Pilih</a>"+
                            '</td>'+
                            '</tr>';

                }
                $('#show-data-poli').html(html);
            }
        })
    });
    
    $('#show-data-poli').on('click','#btnPil-poli', function(){
        let baris = $(this).closest('tr');
        let id_poli = baris.find('td:eq(0)').text();
        let nama_poli = baris.find('td:eq(1)').text();
        $('#modalPoli').fadeOut();
        $('#idpoli').val(id_poli);
        $('#namapoli').val(nama_poli);
    })
    
    $('#idpoli').keyup(()=>{
        id_poli = $('#idpoli').val();
        $.post('/Klinik/poliCtr', {
            page: "tampil",
            id_poli: id_poli
        },(data)=>{
            $('#namapoli').val(data.nama_poli);
        })
    })

    $('#btnBatallookupPoli').click(function(){
        $('#modalPoli').fadeOut();
    });

    $('#lookupDokter').click(function(){
        $('#modalDokter').fadeIn();
        $.ajax({
            url: '/Klinik/dokterCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0; i<data.length; i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_dokter+'</td>'+
                            '<td>'+data[i].nama_dokter+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnPil-dokter'>Pilih</a>"+
                            '</td>'+
                            '</tr>';

                }
                $('#show-data-dokter').html(html);
            }
        })
    });
    
    $('#show-data-dokter').on('click','#btnPil-dokter', function(){
        let baris = $(this).closest('tr');
        let id_dokter = baris.find('td:eq(0)').text();
        let nama_dokter = baris.find('td:eq(1)').text();
        $('#modalDokter').fadeOut();
        $('#iddokter').val(id_dokter);
        $('#namadokter').val(nama_dokter);
    })
    
    $('#iddokter').keyup(()=>{
        id_dokter = $('#iddokter').val();
        $.post('/Klinik/dokterCtr', {
            page: "tampil",
            id_dokter: id_dokter
        },(data)=>{
            $('#namadokter').val(data.nama_dokter);
        })
    })

    $('#btnBatallookupDokter').click(function(){
        $('#modalDokter').fadeOut();
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
    
    $('#search-data').keyup(function(){
        search_table_data($(this).val());
    });
    
    function search_table_data(value){
        $('#show-data-all tr').each(function(){
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