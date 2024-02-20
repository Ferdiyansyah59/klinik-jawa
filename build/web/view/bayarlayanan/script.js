$(document).ready(function(){
    let id_bayar_layanan, id_layanan, id_detail_layanan, id_pasien, tgl_layanan, keterangan, des_layanan, des_detail_layanan, nama_pasien;
    
    
    const getInputValue = () => {
        id_bayar_layanan = $('#idpembayaran').val();
        id_layanan = $('#idLayanan').val();
        id_detail_layanan = $('#iddetaillayanan').val();
        id_pasien = $('#idpasien').val();
        tgl_layanan = $('#tgl').val();
        keterangan = $('#keterangan').val();
    }
    
    const clearData = () => {
        id_bayar_layanan = $('#idpembayaran').val("");
        id_layanan = $('#idLayanan').val("");
        id_detail_layanan = $('#iddetaillayanan').val("");
        id_pasien = $('#idpasien').val("");
        tgl_layanan = $('#tgl').val("");
        $('#keterangan').val(""); 
        $('#deslayanan').val(""); 
        $('#desdetaillayanan').val(""); 
        $('#namapasien').val(""); 
    }
    
    const getData =  () => {
        $.ajax({
            url: "/Klinik/bayarlayananCtr",
            method: "GET",
            async: true,
            dataType: "JSON",
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_bayar_layanan+'</td>'+
                            '<td>'+data[i].id_layanan+'</td>'+
                            '<td>'+data[i].des_layanan+'</td>'+
                            '<td>'+data[i].des_detail_layanan+'</td>'+
                            '<td>'+data[i].biaya_layanan+'</td>'+
                            '<td>'+data[i].nama_pasien+'</td>'+
                            '<td>'+data[i].tgl_layanan+'</td>'+
                            '<td>'+data[i].keterangan+'</td>'+
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
        $('#btnSave-edit').hide();
        $('#btnSave').show();
        $('#title-modal').html('TAMBAH DATA');
        $('#idpembayaran').prop("readonly", false);
        $('#myModal').fadeIn();
        page="tambah";
        $('#idpembayaran').val('BL');
        $('#idLayanan').val('L');
        $('#iddetaillayanan').val('DL');
        $('#idpasien').val('PS');
    });
    
    $('#idpembayaran').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 4;
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
    
    $('#idLayanan').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 2;
        if($('#idLayanan').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 68 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#idLayanan').val().length == 1){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    })
    
    $('#iddetaillayanan').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 4;
        if($('#iddetaillayanan').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 68 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#iddetaillayanan').val().length == 2){
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
    
    $('#btnSave').click(()=>{
        getInputValue();
        if(id_bayar_layanan == "BL"){
            $("#idpembayaran").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Pembayaran harus diisi!',
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
        }else if(id_layanan == "L"){
            $("#idLayanan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Layanan harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idLayanan").focus();
                            $("#idLayanan").keypress(()=>{
                                 $("#idLayanan").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else if(id_detail_layanan == "DL"){
            $("#iddetaillayanan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Detail Layanan harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#iddetaillayanan").focus();
                            $("#iddetaillayanan").keypress(()=>{
                                 $("#iddetaillayanan").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else if(id_pasien == "PS"){
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
            if(getAge() < 0){
                $.alert({
                    icon: 'fa fa-warning',
                    title: 'Gagal!',
                    content: 'Tidak bisa Mengisi Masa Depan!',
                    buttons: {
                        ok: {
                            btnClass: 'btn-red',
                            action: ()=>{
                                $("#tgl").focus();
                                $("#tgl").keypress(()=>{
                                     $("#tgl").css("border-color","#808080");
                                })
                            }
                        }
                    }
                });
            }else if(getAge() >= 0){
                $.post('/Klinik/bayarlayananCtr', {
                    page: "tambah",
                    id_bayar_layanan: id_bayar_layanan,
                    id_layanan: id_layanan,
                    id_detail_layanan: id_detail_layanan,
                    id_pasien: id_pasien,
                    tgl_layanan: tgl_layanan,
                    keterangan: keterangan
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
                    }else if(data == "Data Berhasil Diedit!"){
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
    
    
    $('#show-data').on('click', '#btnEdit', function(){
        $('#myModal').fadeIn();
        $('#btnSave-edit').show();
        $('#btnSave').hide();
        $('#title-modal').html('EDIT DATA');
        $('#idpembayaran').prop("readonly", true);
        page="tampil";
        let baris = $(this).closest('tr');
        let id_bayar_layanan = baris.find('td:eq(0)').text();
        $.post('/Klinik/bayarlayananCtr', {
            page: page,
            id_bayar_layanan: id_bayar_layanan
        },(data)=>{
            $('#idpembayaran').val(data.id_bayar_layanan);
            $('#idLayanan').val(data.id_layanan);
            $('#iddetaillayanan').val(data.id_detail_layanan);
            $('#idpasien').val(data.id_pasien);
            $('#tgl').val(data.tgl_layanan);
            $('#keterangan').val(data.keterangan); 
        })
        page="edit";
    });
    
    $('#btnSave-edit').click(()=>{
        getInputValue();
        if(id_bayar_layanan == "BL"){
            $("#idpembayaran").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Pembayaran harus diisi!',
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
        }else if(id_layanan == "L"){
            $("#idLayanan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Layanan harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idLayanan").focus();
                            $("#idLayanan").keypress(()=>{
                                 $("#idLayanan").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else if(id_detail_layanan == "DL"){
            $("#iddetaillayanan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Detail Layanan harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#iddetaillayanan").focus();
                            $("#iddetaillayanan").keypress(()=>{
                                 $("#iddetaillayanan").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else if(id_pasien == "PS"){
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
            if(getAge() < 0){
                $.alert({
                    icon: 'fa fa-warning',
                    title: 'Gagal!',
                    content: 'Tidak bisa Mengisi Masa Depan!',
                    buttons: {
                        ok: {
                            btnClass: 'btn-red',
                            action: ()=>{
                                $("#tgl").focus();
                                $("#tgl").keypress(()=>{
                                     $("#tgl").css("border-color","#808080");
                                })
                            }
                        }
                    }
                });
            }else if(getAge() >= 0){
                $.post('/Klinik/bayarlayananCtr', {
                    page: "edit",
                    id_bayar_layanan: id_bayar_layanan,
                    id_layanan: id_layanan,
                    id_detail_layanan: id_detail_layanan,
                    id_pasien: id_pasien,
                    tgl_layanan: tgl_layanan,
                    keterangan: keterangan
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
    })
    
    
    
    $('#show-data').on('click','#btnDel', function(){
        page="hapus";
        let baris = $(this).closest('tr');
        let id_bayar_layanan = baris.find('td:eq(0)').text();
        let detail_layanan = baris.find('td:eq(3)').text();
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Pembayaran '+id_bayar_layanan+" - " + detail_layanan +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/bayarlayananCtr', {
                                    page: page,
                                    id_bayar_layanan: id_bayar_layanan,
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
    
    $('#idLayanan').keyup(()=>{
        id_layanan = $('#idLayanan').val();
        page="tampilLayanan";
        $.post('/Klinik/layananCtr', {
            page: page,
            id_layanan: id_layanan
        },(data)=>{
            $('#deslayanan').val(data.des_layanan);
        })
        page="tambah";
    })
    
    $('#lookupdetailLayanan').click(()=>{
        if($('#deslayanan').val() == ""){
            $("#idLayanan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'Isi ID Layanan terlebih dahulu!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idLayanan").focus();
                            $("#idLayanan").keypress(()=>{
                                 $("#idLayanan").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else if($('#deslayanan').val() !== ""){
            $('#modalDetail').fadeIn();
            let id_layanan = $('#idLayanan').val();
            page="dataDetail";
            $.ajax({
                url: '/Klinik/layananCtr',
                method: 'GET',
                async: true,
                data: {page: page, id_layanan: id_layanan},
                dataType: 'JSON',
                success: (data)=>{
                    let html = '';
                    let i;
                    for(i=0;i<data.length;i++){
                        html += '<tr>'+
                                '<td>'+data[i].id_detail_layanan+'</td>'+
                                '<td>'+data[i].des_detail_layanan+'</td>'+
                                '<td>'+data[i].biaya_layanan+'</td>'+
                                '<td style="text-align:right;">'+
                                    "<a class='btn btn-outline-success btn-sm'"
                                       +"id='btnPil-detail'>Edit</a>"+
                                '</td>'+
                                '</tr>';
                    }
                    $('#show-look-detail').html(html);
                }
            })
        }
        page="tambah";
    })
    
    $('#show-look-detail').on('click','#btnPil-detail', function(){
        let baris = $(this).closest('tr');
        let id_layanan = baris.find('td:eq(0)').text();
        let des_layanan = baris.find('td:eq(1)').text();
        $('#modalDetail').fadeOut();
        $('#iddetaillayanan').val(id_layanan);
        $('#desdetaillayanan').val(des_layanan);
    });
    
    $('#lookupLayanan').click(()=>{
        $('#modalLayanan').fadeIn();
        page=null;
        $.ajax({
            url: '/Klinik/layananCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_layanan+'</td>'+
                            '<td>'+data[i].des_layanan+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnPil-layanan'>Pilih</a>"+
                            '</td>'+
                            '</tr>';
                }
                $('#show-look-layanan').html(html);
            }
        })
    })
    
    $('#show-look-layanan').on('click','#btnPil-layanan', function(){
        let baris = $(this).closest('tr');
        let id_layanan = baris.find('td:eq(0)').text();
        let des_layanan = baris.find('td:eq(1)').text();
        $('#modalLayanan').fadeOut();
        $('#idLayanan').val(id_layanan);
        $('#deslayanan').val(des_layanan);
    })
    
    $('#lookuppasien').click(()=>{
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

    })
    
    $('#show-look-pasien').on('click','#btnPil-pasien', function(){
        let baris = $(this).closest('tr');
        let id_pasien = baris.find('td:eq(0)').text();
        let nama_pasien = baris.find('td:eq(1)').text();
        $('#modalPasien').fadeOut();
        $('#idpasien').val(id_pasien);
        $('#namapasien').val(nama_pasien);
    })
    
    $('#iddetaillayanan').keyup(()=>{
        page="tampilDetail";
        let id_detail_layanan = $('#iddetaillayanan').val();
        let id_layanan = $('#idLayanan').val();
        $.post('/Klinik/layananCtr', {
            page: page,
            id_layanan: id_layanan,
            id_detail_layanan: id_detail_layanan
        },(data)=>{
            $('#desdetaillayanan').val(data.des_detail_layanan);
        })
    })
    
    $('#btnBatallookupdetail').click(()=>{
        $('#modalDetail').fadeOut();
    })
    
    $('#idpasien').keyup(()=>{
        page="tampil";
        let id_pasien = $('#idpasien').val();
        $.post('/Klinik/pasienCtr', {
            page: page,
            id_pasien: id_pasien
        },(data)=>{
            $('#namapasien').val(data.nama_pasien);
        })
        page="tambah";
    })
    
    $('#btnBatallookupdetail').click(()=>{
        $('#modalDetail').fadeOut();
    })
    
    

    $('#btnBatal').click(function(){
        $('#myModal').fadeOut();
        clearData();    
    });


    $('#btnBatallookuppasien').click(function(){
        $('#modalPasien').fadeOut();
    });

    $('#btnBatallookuplayanan').click(function(){
        $('#modalLayanan').fadeOut();
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
    $('#logout').click(()=>{
        logout();
    });
    
    const logout = () => {
        location.href = '../../login.html';
        sessionStorage.clear();
        localStorage.setItem("status", false);
    }
});

