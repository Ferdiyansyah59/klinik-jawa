$(document).ready(function(){
    let id_pembayaran, tgl_pembayaran, id_pasien, id_resep, jenis_pembayaran, waktu, user_id, id_obat, harga, jumlah, nama_pasien;
    
    const getInputValue = () =>{
        id_pembayaran = $('#idpembayaran').val();
        tgl_pembayaran = $('#tgl').val();
        id_pasien = $('#idpasien').val();
        nama_pasien = $('#namapasien').val();
        id_resep = $('#idresep').val();
        jenis_pembayaran = $('#jenis').val();
    }
    
    const clearData = () =>{
        id_pembayaran = $('#idpembayaran').val("");
        tgl_pembayaran = $('#tgl').val("");
        id_pasien = $('#idpasien').val("");
        nama_pasien = $('#namapasien').val("");
        id_resep = $('#idresep').val("");
        jenis_pembayaran = $('#jenis').val("");
    }
    
    const getData = () => {
        $.ajax({
            url: "/Klinik/bayarobatCtr",
            async: true,
            method: "GET",
            dataType: "JSON",
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_pembayaran+'</td>'+
                            '<td>'+data[i].tgl_pembayaran+'</td>'+
                            '<td>'+data[i].nama_pasien+'</td>'+
                            '<td>'+data[i].id_resep+'</td>'+
                            '<td>'+data[i].jenis_pembayaran+'</td>'+
                            '<td>'+data[i].user_id+'</td>'+
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
        $('#title-modal').html('EDIT DATA');
        $('#idpembayaran').prop("readonly", false);
        page = "tambahBayar";
        $('#idpembayaran').val("PO");
        $('#idpasien').val("PS");
        $('#idresep').val("R");
    });
    
    $('#idpembayaran').keydown((e)=>{
        let key = e.charCode || e.keyCode; 
        let maxChar = 9;
        if($('#idpembayaran').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 68 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#idpembayaran').val().length == 2){
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
    
    $('#idresep').keydown((e)=>{
        let key = e.charCode || e.keyCode; 
        let maxChar = 2;
        if($('#idresep').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 68 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
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
        if(id_pembayaran == "PO"){
            $("#idpembayaran").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Pembayaran Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idpembayaran").focus();
                            $("#idpembayaran").keypress(()=>{
                                 $("#idpembayaran").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            if(getAge() < 0){
                $.alert({
                    icon : 'far fa-times-circle',
                    title: 'Gagal',
                    type: 'red',
                    content: "Gagal tanggal belum terjadi!",
                    typeAnimated: true,
                    buttons: {
                        ok: {
                            btnClass: 'btn-red',
                            action: function(){  
                            }  
                        }          
                    }
                });
            }else if(getAge() >= 0){
                user_id = sessionStorage.getItem("nama");
                $.post('/Klinik/bayarobatCtr', {
                    page: "tambahBayar",
                    id_pembayaran: id_pembayaran,
                    tgl_pembayaran: tgl_pembayaran,
                    id_pasien: id_pasien,
                    id_resep: id_resep,
                    jenis_pembayaran: jenis_pembayaran,
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
        }
    })
    
    $('#show-data').on('click','#btnDet', function(){
        $('#modalDetail').fadeIn();
        page="detail";
        let baris = $(this).closest('tr');
        let id_pembayaran = baris.find('td:eq(0)').text();
        localStorage.setItem("id_pembayaran", id_pembayaran);
        $.ajax({
            url: '/Klinik/bayarobatCtr',
            method: 'GET',
            async: true,
            data: {page: page, id_pembayaran:id_pembayaran},
            dataType: 'JSON',
            success: (data)=>{
                console.log(data);
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_pembayaran+'</td>'+
                            '<td>'+data[i].id_obat+'</td>'+
                            '<td>'+data[i].nama_obat+'</td>'+
                            '<td>'+data[i].harga+'</td>'+
                            '<td>'+data[i].jumlah+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnEdit-detail'>Edit</a>"
                                   +"&nbsp;"
                                   +"<a class='btn btn-outline-danger btn-sm'"
                                   +"id='btnDel-detail'>Delete</a>"+
                            '</td>'+
                            '</tr>';
                }
                $('#show-detail').html(html);
            }
        })
    })
    
    const getDataDetail = () =>{
        let id_pembayaran = localStorage.getItem("id_pembayaran");
        page="detail";
        $.ajax({
            url: '/Klinik/bayarobatCtr',
            method: 'GET',
            async: true,
            data: {page: page, id_pembayaran:id_pembayaran},
            dataType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_pembayaran+'</td>'+
                            '<td>'+data[i].id_obat+'</td>'+
                            '<td>'+data[i].nama_obat+'</td>'+
                            '<td>'+data[i].harga+'</td>'+
                            '<td>'+data[i].jumlah+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnEdit-detail'>Edit</a>"
                                   +"&nbsp;"
                                   +"<a class='btn btn-outline-danger btn-sm'"
                                   +"id='btnDel-detail'>Delete</a>"+
                            '</td>'+
                            '</tr>';
                }
                $('#show-detail').html(html);
            }
        })
    }
   
    
    
    $('#show-data').on('click', '#btnEdit', function(){
        $('#myModal').fadeIn();
        $('#btnSave').hide();
        $('#btnSave-edit').show();
        $('#title-modal').html('EDIT DATA');
        $('#idpembayaran').prop("readonly", true);
        page= "tampilBayar";
        let baris = $(this).closest('tr');
        let id_pembayaran = baris.find('td:eq(0)').text();
        $.post('/Klinik/bayarobatCtr', {
            page: page,
            id_pembayaran: id_pembayaran
        },(data)=>{
            $('#idpembayaran').val(data.id_pembayaran);
            $('#tgl').val(data.tgl_pembayaran);
            $('#idpasien').val(data.id_pasien);
            $('#idresep').val(data.id_resep);
            $('#jenis').val(data.jenis_pembayaran);
        })
        page="editBayar";
    });
    
    $('#btnSave-edit').click(()=>{
        getInputValue();
        if(id_pembayaran == "PO"){
            $("#idpembayaran").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Pembayaran Harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idpembayaran").focus();
                            $("#idpembayaran").keypress(()=>{
                                 $("#idpembayaran").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            if(getAge() < 0){
                $.alert({
                    icon : 'far fa-times-circle',
                    title: 'Gagal',
                    type: 'red',
                    content: "Gagal tanggal belum terjadi!",
                    typeAnimated: true,
                    buttons: {
                        ok: {
                            btnClass: 'btn-red',
                            action: function(){  
                            }  
                        }          
                    }
                });
            }else if(getAge() >= 0){
                console.log(id_pasien);
                user_id = sessionStorage.getItem("nama");
                getInputValue();
                $.post('/Klinik/bayarobatCtr', {
                     page: "editBayar",
                     id_pembayaran: id_pembayaran,
                     tgl_pembayaran: tgl_pembayaran,
                     id_pasien: id_pasien,
                     id_resep: id_resep,
                     jenis_pembayaran: jenis_pembayaran,
                     user_id: user_id
                },(data)=>{
                    if(data == "Data Berhasil Diedit!"){
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
        }
    });
    
    $('#show-data').on('click','#btnDel', function(){
        page="hapusBayar";
        let baris = $(this).closest('tr');
        let id_pembayaran = baris.find('td:eq(0)').text();
        let nama_pasien = baris.find('td:eq(2)').text();
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Pembayaran '+id_pembayaran+" - " + nama_pasien +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/bayarobatCtr', {
                                    page: page,
                                    id_pembayaran: id_pembayaran,
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
        page= null;
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
                                   +"id='btnPil'>Pilih</a>"+
                            '</td>'+
                            '</tr>';
                }
                $('#show-look-pasien').html(html);
            }
        })
        page="tambah";
    });
    
    $('#show-look-pasien').on('click', '#btnPil', function(){
        let baris = $(this).closest('tr');
        let id_pasien = baris.find('td:eq(0)').text();
        let nama_pasien = baris.find('td:eq(1)').text();
        $('#modalPasien').fadeOut();
        $('#idpasien').val(id_pasien);
        $('#namapasien').val(nama_pasien);
    })
    
    $('#idpasien').keyup(()=>{
        let id_pasien = $('#idpasien').val();
        page="tampil";
        $.post('/Klinik/pasienCtr', {
            page: page,
            id_pasien: id_pasien
        }, (data)=>{
            $('#namapasien').val(data.nama_pasien);
        })
    });
    
    $('#lookup-resep').click(()=>{
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
        page="tambah";
    });
    
    $('#show-look-resep').on('click', '#btnPil-resep', function(){
        let baris = $(this).closest('tr');
        let id_resep = baris.find('td:eq(0)').text();
        $('#modalResep').fadeOut();
        $('#idresep').val(id_resep);
    })
    
    $('#btnBatallookup-resep').click(()=>{
        $('#modalResep').fadeOut();
    })

    $('#btnBatallookuppasien').click(function(){
        $('#modalPasien').fadeOut();
    });

    $('#btnBatallookupDetail').click(function(){
        $('#modalDetail').fadeOut(); 
    });
    
    const getInputValueDetail = () =>{
        id_pembayaran = $('#id-pembayaran').val();
        id_obat = $('#idobat').val();
        harga = $('#harga').val();
        jumlah = $('#jumlah').val();
    }
    
    const clearDataDetail = ()=>{
        id_pembayaran = $('#id-pembayaran').val("");
        id_obat = $('#idobat').val("");
        harga = $('#harga').val("");
        jumlah = $('#jumlah').val("");
    }

    $('#btnAddDetail').click(function(){
        $('#myModalDetail').fadeIn();
        $('#btnSaveDetail').show();
        $('#btnSaveDetail-edit').hide();
        $('#title-modal-detail').html('TAMBAH DATA');
        $('#idpembayaran').prop("readonly", false);
        $('#idobat').prop("readonly", false);
        $('#lookupobat').show();
        page="tambahDetail";
        $('#id-pembayaran').val(localStorage.getItem("id_pembayaran"));
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
            }else if(jumlah == ""){
                $("#jumlah").css("border-color","red");
                $.alert({
                    icon: 'fa fa-warning',
                    title: 'Gagal!',
                    content: 'Jumlah Obat Harus diisi!',
                    buttons: {
                        ok: {
                            btnClass: 'btn-red',
                            action: ()=>{
                                $("#jumlah").focus();
                                $("#jumlah").keypress(()=>{
                                     $("#jumlah").css("border-color","#808080");
                                })
                            }
                        }
                    }
                })
            }else{
                console.log(page);
                $.post('/Klinik/bayarobatCtr', {
                    page: "tambahDetail",
                    id_pembayaran: id_pembayaran,
                    id_obat: id_obat,
                    harga: harga,
                    jumlah:jumlah
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
                })
            } 
    })
    
    $('#show-detail').on('click','#btnEdit-detail', function(){
        $('#myModalDetail').fadeIn();
        $('#btnSaveDetail').hide();
        $('#btnSaveDetail-edit').show();
        $('#title-modal-detail').html('EDIT DATA');
        $('#idpembayaran').prop("readonly", true);
        $('#idobat').prop("readonly", true);
        $('#lookupobat').hide();
        page= "tampilDetail";
        let baris = $(this).closest('tr');
        let id_pembayaran = baris.find('td:eq(0)').text();
        let id_obat = baris.find('td:eq(1)').text();
        $.post('/Klinik/bayarobatCtr', {
            page: page,
            id_pembayaran: id_pembayaran,
            id_obat: id_obat
        },(data)=>{
            $('#id-pembayaran').val(data.id_pembayaran);
            $('#idobat').val(data.id_obat);
            $('#harga').val(data.harga);
            $('#jumlah').val(data.jumlah);
        })
        page="editDetail";
     });

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
            }else if(jumlah == ""){
                $("#jumlah").css("border-color","red");
                $.alert({
                    icon: 'fa fa-warning',
                    title: 'Gagal!',
                    content: 'Jumlah Obat Harus diisi!',
                    buttons: {
                        ok: {
                            btnClass: 'btn-red',
                            action: ()=>{
                                $("#jumlah").focus();
                                $("#jumlah").keypress(()=>{
                                     $("#jumlah").css("border-color","#808080");
                                })
                            }
                        }
                    }
                })
            }else{
                
                $.post('/Klinik/bayarobatCtr', {
                    page: "editDetail",
                    id_pembayaran: id_pembayaran,
                    id_obat: id_obat,
                    id_obat: id_obat,
                    harga: harga,
                    jumlah:jumlah
                },(data)=>{
                    if(data == "Data Detail Berhasil Diedit!"){
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
                })
            } 
    })
    
    $('#idobat').keyup(()=>{
        id_obat = $('#idobat').val();
        page = "tampil";
        $.post('/Klinik/obatCtr', {
            page: page,
            id_obat: id_obat
        },(data)=>{
            $('#nama-obat').val(data.nama_obat);
            $('#harga').val(data.harga_jual);
        });
        page= "tambahDetail";
    })
    

    $('#btnBatalDetail').click(function(){
        $('#myModalDetail').fadeOut();  
        clearDataDetail();
    });

    $('#lookupobat').click(function(){
        $('#modalObat').fadeIn();
        page=null;
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
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnPil-obat'>Pilih</a>"+
                            '</td>'+
                            '</tr>';
                }
                $('#show-look-obat').html(html);
            }
        })
        page="tambahDetail";
    });
    
    $('#show-detail').on('click','#btnDel-detail', function(){
        let baris = $(this).closest('tr');
        let id_pembayaran = baris.find('td:eq(0)').text();
        let nama_obat = baris.find('td:eq(2)').text();
        let id_obat = baris.find('td:eq(1)').text();
        page="hapusDetail";
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Pembayaran '+id_pembayaran+" - Obat " + nama_obat +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/bayarobatCtr', {
                                    page: page,
                                    id_pembayaran: id_pembayaran,
                                    id_obat: id_obat
                                },(data, status)=>{
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
    
    $('#show-look-obat').on('click', '#btnPil-obat', function(){
        let baris = $(this).closest('tr');
        let id_obat = baris.find('td:eq(0)').text();  
        let nama_obat = baris.find('td:eq(1)').text();
        let harga = baris.find('td:eq(2)').text();
        $('#modalObat').fadeOut();
        $('#idobat').val(id_obat);
        $('#nama-obat').val(nama_obat);
        $('#harga').val(harga);
    })

    $('#btnBatallookupobat').click(function(){
        $('#modalObat').fadeOut();
    });
    
    
    
    const getAge = () => {
        let date = $('#tgl').val();
        let today = new Date();
        let birthday = new Date(date);
        let year = 0;
        if(today.getMonth() < birthday.getMonth()){
            year = 1;
        }else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
            year = 1;
	}
	let age = today.getFullYear() - birthday.getFullYear() - year;
	return age;
    }
    
    
    
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
    
    $('#search-detail').keyup(function(){
        search_table_detail($(this).val());
    });
    
    function search_table_detail(value){
        $('#show-detail tr').each(function(){
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
    
    $('#search-pasien').keyup(function(){
        search_table_pasien($(this).val());
    });
    
    function search_table_pasien(value){
        $('#show-look-pasien tr').each(function(){
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
    
    
    $('#search-resep').keyup(function(){
        search_table_resep($(this).val());
    });
    
    function search_table_resep(value){
        $('#show-look-resep tr').each(function(){
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
    
    $('#search-obat').keyup(function(){
        search_table_obat($(this).val());
    });
    
    function search_table_obat(value){
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
    
    $('#logout').click(()=>{
        logout();
    });
    
    const logout = () => {
        location.href = '../../login.html';
        sessionStorage.clear();
        localStorage.setItem("status", false);
    }

});