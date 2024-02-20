$(document).ready(function(){
    
    let id_resep, id_dokter, tgl_resep, id_poli, user_id, id_obat, harga, jumlah, keterangan;
    
    const getInputValue = () =>{
        id_resep = $('#idresep').val();
        id_dokter = $('#iddokter').val();
        tgl_resep = $('#tgl').val();
        id_poli = $('#idpoli').val();
        user_id = sessionStorage.getItem("nama");
    }
    
    const clearData = () =>{
        $('#idresep').val("");
        $('#iddokter').val("");
        $('#tgl').val("");
        $('#idpoli').val("");
        $('#namadokter').val("");
        $('#namapoli').val("");
    }
    
    const getInputValueDetail = () =>{
        id_resep = localStorage.getItem("id_resep");
        id_obat = $('#idobat').val();
        harga = $('#harga').val();
        jumlah = $('#jumlah').val();
        keterangan = $('#keterangan').val();
        user_id = sessionStorage.getItem("nama");
    }
    
    const clearDataDetail = () =>{
        $('#idresep').val("");
        $('#idobat').val("");
        $('#harga').val("");
        $('#jumlah').val("");
        $('#keterangan').val("");
    }
    
    const getData = () => {
        $.ajax({
            type: "GET",
            url: '/Klinik/resepCtr',
            async: true,
            dataType: 'JSON',
            success: (data) =>{
                let html = '';
                let i;
                for(i=0; i<data.length; i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_resep+'</td>'+
                            '<td>'+data[i].nama_dokter+'</td>'+
                            '<td>'+data[i].tgl_resep+'</td>'+
                            '<td>'+data[i].nama_poli+'</td>'+
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
    
    getData();
    

    $('#btnAdd').click(function(){
        $('#myModal').fadeIn();
        $('#btnSave').show();
        $('#btnSave-edit').hide();
        $('#title-modal').html('TAMBAH DATA');
        $('#idresep').prop("readonly", false);
        $('#idresep').val("R");
        $('#iddokter').val("D");
        $('#idpoli').val("P");
    });
    
    $('#idresep').keydown(function(e){
       let key = e.charCode || e.keyCode; 
       let maxChar = "2";
       if($('#idresep').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 76 || key == 68 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#idresep').val().length == 1){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    });
    
    $('#iddokter').keydown(function(e){
       let key = e.charCode || e.keyCode; 
       let maxChar = "4";
       if($('#iddokter').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 76 || key == 68 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#iddokter').val().length == 1){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    });
    
    $('#idpoli').keydown(function(e){
       let key = e.charCode || e.keyCode; 
       let maxChar = "2";
       if($('#idpoli').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 76 || key == 68 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#idpoli').val().length == 1){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    }); 
    
    $('#jumlah').keydown((e)=>{
        let key = e.charCode || e.keyCode; 
        if(key == "8" || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
        }else{
            e.preventDefault();
        }
    })
    
    
    
    $('#btnSave').click(()=>{
        getInputValue();
        if(id_resep == "R"){
            $("#idresep").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'Deskripsi Layanan Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idresep").focus();
                            $("#idresep").keypress(()=>{
                                 $("#idresep").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            $.post('/Klinik/resepCtr', {
               page: "tambahResep",
               id_resep: id_resep,
               id_dokter: id_dokter,
               tgl_resep: tgl_resep,
               id_poli: id_poli,
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
            });
        }
    })
    
    $('#show-data').on('click','#btnEdit', function(){
        $('#myModal').fadeIn();
        $('#btnSave').hide();
        $('#btnSave-edit').show();
        $('#title-modal').html('EDIT DATA');
        $('#idresep').prop("readonly", true);
        let baris = $(this).closest('tr');
        let id = baris.find('td:eq(0)').text();
        $.post('/Klinik/resepCtr', {
            page: "tampilResep",
            id_resep: id
        },(data)=>{
            $('#idresep').val(data.id_resep);
            $('#iddokter').val(data.id_dokter);
            $('#tgl').val(data.tgl_resep);
            $('#idpoli').val(data.id_poli);
        })
        
    })
    
    $('#btnSave-edit').click(()=>{
        getInputValue();
        if(id_resep == "R"){
            $("#idresep").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Obat Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idresep").focus();
                            $("#idresep").keypress(()=>{
                                 $("#idresep").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            
            $.post('/Klinik/resepCtr', {
               page: "editResep",
               id_resep: id_resep,
               id_dokter: id_dokter,
               tgl_resep: tgl_resep,
               id_poli: id_poli,
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
            });
        }
    })
    
    $('#show-data').on('click','#btnDel', function(){
        let baris = $(this).closest('tr');
        let id = baris.find('td:eq(0)').text();
        let nama = baris.find('td:eq(1)').text();
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Resep '+id+" - Dokter " + nama +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/resepCtr', {
                                    page: "hapusResep",
                                    id_resep: id
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
    });


    $('#show-data').on('click','#btnDet', function(){
        $('#modalDetail').fadeIn();    
        let baris = $(this).closest('tr');
        let id_resep = baris.find('td:eq(0)').text();
        localStorage.setItem("id_resep", id_resep);
        $.ajax({
            type: "GET",
            url: '/Klinik/resepCtr',
            async: true,
            data: {page:"detail", id_resep: id_resep},
            dataType: 'JSON',
            success: (data) =>{
                let html = '';
                let i;
                for(i=0; i<data.length; i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_obat+'</td>'+
                            '<td>'+data[i].nama_obat+'</td>'+
                            '<td>'+data[i].harga+'</td>'+
                            '<td>'+data[i].jumlah+'</td>'+
                            '<td>'+data[i].keterangan+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnEdit-detail'>Edit</a>"
                                   +"&nbsp;"
                                   +"<a class='btn btn-outline-danger btn-sm'"
                                   +"id='btnDel-detail'>Delete</a>"+
                            '</td>'+
                            '</tr>';

                }
                $('#show-data-detail').html(html);
            }
        })
    });
    
    const getDataDetail = () =>{
        id_resep = localStorage.getItem("id_resep");
        $.ajax({
            type: "GET",
            url: '/Klinik/resepCtr',
            async: true,
            data: {page:"detail", id_resep: id_resep},
            dataType: 'JSON',
            success: (data) =>{
                let html = '';
                let i;
                for(i=0; i<data.length; i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_obat+'</td>'+
                            '<td>'+data[i].nama_obat+'</td>'+
                            '<td>'+data[i].harga+'</td>'+
                            '<td>'+data[i].jumlah+'</td>'+
                            '<td>'+data[i].keterangan+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnEdit-detail'>Edit</a>"
                                   +"&nbsp;"
                                   +"<a class='btn btn-outline-danger btn-sm'"
                                   +"id='btnDel-detail'>Delete</a>"+
                            '</td>'+
                            '</tr>';

                }
                $('#show-data-detail').html(html);
            }
        })
    }
    
    
    $('#btnBatallookupDetail').click(function(){
        $('#modalDetail').fadeOut(); 
        localStorage.clear("id_resep");
    });

    $('#btnAddDetail').click(function(){
        $('#myModalDetail').fadeIn();
        $('#btnSaveDetail').show();
        $('#btnSaveDetail-edit').hide();
        $('#lookupObat').show();
        $('#title-modal-detail').html('EDIT DATA');
        $('#idobat').prop("readonly", true);
        $('#idobat').val("OB");
    });
    
    $('#btnSaveDetail').click(()=>{
        getInputValueDetail();
        if(id_obat == "OB"){
            $("#idobat").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Obat Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idobat").focus();
                            $("#idobat").keypress(()=>{
                                 $("#idobat").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            $.post('/Klinik/resepCtr', {
               page: "tambahDetail",
               id_resep: id_resep,
               id_obat: id_obat,
               harga: harga,
               jumlah: jumlah,
               keterangan: keterangan,
               user_id: user_id
            },(data)=>{
                if(data == "Data Detail Berhasil Disimpan!"){
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
                                    clearDataDetail();
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
            });
        }
    });
    
    $('#show-data-detail').on('click','#btnEdit-detail', function(){
        $('#myModalDetail').fadeIn();
        $('#btnSaveDetail').hide();
        $('#btnSaveDetail-edit').show();
        $('#lookupObat').hide();
        $('#title-modal-detail').html('EDIT DATA');
        $('#idobat').prop("readonly", true);
        let baris = $(this).closest('tr');
        let id_obat = baris.find('td:eq(0)').text();
        let id_resep = localStorage.getItem("id_resep");
        $.post('/Klinik/resepCtr', {
            page: "tampilDetail",
            id_obat: id_obat,
            id_resep: id_resep
        },(data)=>{
            $('#idobat').val(data.id_obat);
            $('#harga').val(data.harga);
            $('#jumlah').val(data.jumlah);
            $('#keterangan').val(data.keterangan);
        })
        $.post("/Klinik/obatCtr",{
            page:"tampil",
            id_obat: id_obat
        },(data)=>{
            $('#namaobat').val(data.nama_obat)
        })
    })
    
    $('#btnSaveDetail-edit').click(()=>{
        getInputValueDetail();
        if(id_obat == "OB"){
            $("#idobat").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Obat Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idobat").focus();
                            $("#idobat").keypress(()=>{
                                 $("#idobat").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            $.post('/Klinik/resepCtr', {
               page: "editDetail",
               id_resep: id_resep,
               id_obat: id_obat,
               harga: harga,
               jumlah: jumlah,
               keterangan: keterangan,
               user_id: user_id
            },(data)=>{
                if(data == "Data Detail Berhasil DiEdit!"){
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
                                    clearDataDetail();
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
            });
        }
    })
    
    $('#show-data-detail').on('click','#btnDel-detail', function(){
        let baris = $( this).closest('tr');
        id_resep = localStorage.getItem("id_resep");
        let id = baris.find("td:eq(0)").text();
        var nama = baris.find("td:eq(1)").text();
        page = "hapusLayanan";
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Detail Obat '+id+" - " + nama +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{   
                                $.post('/Klinik/resepCtr', {
                                    page: "hapusDetail",
                                    id_resep: id_resep,
                                    id_obat: id
                                },
                                function(data, status){
                                   if(data === "Data Detail Berhasil di Hapus!"){ 
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
    })

    $('#btnBatalDetail').click(function(){
        $('#myModalDetail').fadeOut();  
    });


    $('#lookupDokter').click(function(){
        $('#modalDokter').fadeIn();
        page=null;
        $.ajax({
            type: "GET",
            url: '/Klinik/dokterCtr',
            async: true,
            dataType: 'JSON',
            success: (data) =>{
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
                $('#show-look-dokter').html(html);
            }
        })
    });
    
    $('#show-look-dokter').on('click','#btnPil-dokter', function(){
        let baris = $(this).closest('tr');
        let id= baris.find('td:eq(0)').text();
        let nama = baris.find('td:eq(1)').text();
        $('#modalDokter').fadeOut();
        $('#iddokter').val(id);
        $('#namadokter').val(nama);
    })
    
    $('#iddokter').keyup(()=>{
        let id = $('#iddokter').val();
        $.post('/Klinik/dokterCtr', {
           page: "tampil",
           id_dokter: id
        },(data)=>{
            $('#namadokter').val(data.nama_dokter);
        });
    })

    $('#btnBatallookupDokter').click(function(){
        $('#modalDokter').fadeOut();
    });

    $('#lookupPoli').click(function(){
        $('#modalPoli').fadeIn();
        page=null;
        $.ajax({
            type: "GET",
            url: '/Klinik/poliCtr',
            async: true,
            dataType: 'JSON',
            success: (data) =>{
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
                $('#show-look-poli').html(html);
            }
        })
    });
    
    $('#show-look-poli').on('click','#btnPil-poli', function(){
        let baris = $(this).closest('tr');
        let id= baris.find('td:eq(0)').text();
        let nama = baris.find('td:eq(1)').text();
        $('#modalPoli').fadeOut();
        $('#idpoli').val(id);
        $('#namapoli').val(nama);
    })
    
    $('#idpoli').keyup(()=>{
        let id = $('#idpoli').val();
        $.post('/Klinik/poliCtr', {
           page: "tampil",
           id_poli: id
        },(data)=>{
            $('#namapoli').val(data.nama_poli);
        });
    })

    $('#btnBatallookupPoli').click(function(){
        $('#modalPoli').fadeOut();
    });

    $('#lookupObat').click(function(){
        $('#modalObat').fadeIn();
        page=null;
        $.ajax({
            type: "GET",
            url: '/Klinik/obatCtr',
            async: true,
            dataType: 'JSON',
            success: (data) =>{
                let html = '';
                let i;
                for(i=0; i<data.length; i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_obat+'</td>'+
                            '<td>'+data[i].nama_obat+'</td>'+
                            '<td>'+data[i].harga_jual+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnPil-obat'>Pilih</a>"+
                            '</td>'+
                            '</tr>';

                }
                $('#show-look-obat').html(html);
            }
        })
    });
    
    $('#show-look-obat').on('click','#btnPil-obat', function(){
        let baris = $(this).closest('tr');
        let id= baris.find('td:eq(0)').text();
        let nama = baris.find('td:eq(1)').text();
        let harga = baris.find('td:eq(2)').text();
        $('#modalObat').fadeOut();
        $('#idobat').val(id);
        $('#namaobat').val(nama);
        $('#harga').val(harga);
    })
    
    $('#idobat').keyup(()=>{
        let id = $('#idobat').val();
        $.post('/Klinik/obatCtr', {
           page: "tampil",
           id_obat: id
        },(data)=>{
            $('#idobat').val(data.id_obat);
            $('#namaobat').val(data.nama_obat);
            $('#harga').val(data.harga);
        });
    })

    $('#btnBatallookupObat').click(function(){
        $('#modalObat').fadeOut();
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
        $('#show-data-detail tr').each(function(){
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
    
    $('#searchObat').keyup(function(){
        search_tableObat($(this).val());
    });
    
    function search_tableObat(value){
        $('#show-look-obat tr').each(function(){
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