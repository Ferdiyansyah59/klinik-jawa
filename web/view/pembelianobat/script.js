$(document).ready(()=>{
    
    let id_trans, id_supplier, no_faktur, tgl_faktur, id_obat, harga_beli, jumlah, keterangan, tgl_expired, id_user, waktu, nama_obat;
    
    const getInputValue = () => {
        id_trans = $('#idtrans').val();
        id_supplier = $('#idsupplier').val();
        no_faktur = $('#nofaktur').val();
        tgl_faktur = $('#tglfaktur').val();
        id_obat = $('#idobat').val();
        harga_beli = $('#harga').val();
        jumlah = $('#jumlah').val();
        keterangan = $('#keterangan').val();
        tgl_expired = $('#tglexp').val();
    }
    
    const clearData = () => {
        $('#idtrans').val("");
        $('#idsupplier').val("");
        $('#nofaktur').val("");
        $('#tglfaktur').val("");
        $('#idobat').val("");
        $('#harga').val("");
        $('#jumlah').val("");
        $('#keterangan').val("");
        $('#tglexp').val("");
    }
    
    const getData = () => {
        $.ajax({
            url: '/Klinik/pembelianobatCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_trans+'</td>'+
                            '<td>'+data[i].id_supplier+'</td>'+
                            '<td>'+data[i].no_faktur+'</td>'+
                            '<td>'+data[i].tgl_faktur+'</td>'+
                            '<td>'+data[i].id_obat+'</td>'+
                            '<td>'+data[i].nama_obat+'</td>'+
                            '<td>'+data[i].harga_beli+'</td>'+
                            '<td>'+data[i].jumlah+'</td>'+
                            '<td>'+data[i].keterangan+'</td>'+
                            '<td>'+data[i].tgl_expired+'</td>'+
                            '<td>'+data[i].id_user+'</td>'+
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
        $('#idtrans').prop("readonly", false);
        $('#idtrans').val("TR");
        $('#idsupplier').val("SP");
        $('#idobat').val("OB");
    });
    
    $('#idtrans').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 4;
        if($('#idtrans').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#idtrans').val().length == 2){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    })
    
    $('#idsupplier').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 4;
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
    })
    
     $('#idobat').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 3;
        if($('#idobat').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#idobat').val().length == 2){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    })
    
    $('#nofaktur, #harga, #jumlah').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        if(key == 8 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
            }else{
                e.preventDefault();
            }
    })
    
    $('#btnSave').click(()=>{
        getInputValue();
        if(id_trans == "TR"){
            $("#idtrans").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Transaksi harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idtrans").focus();
                            $("#idtrans").keypress(()=>{
                                 $("#idtrans").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            id_user = sessionStorage.getItem("nama");
            $.post('/Klinik/pembelianobatCtr',{
                page: "tambah",
                id_trans: id_trans,
                id_supplier: id_supplier,
                no_faktur: no_faktur,
                tgl_faktur: tgl_faktur,
                id_obat: id_obat,
                harga_beli: harga_beli,
                jumlah: jumlah,
                keterangan: keterangan,
                tgl_expired: tgl_expired,
                id_user: id_user
            },(data)=>{
                if(data == "Data Berhasil di Simpan!"){
                    console.log(data);
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
        $('#idtrans').prop("readonly", true);
        let baris = $(this).closest('tr');
        let id_trans = baris.find('td:eq(0)').text();
        $.post('/Klinik/pembelianobatCtr', {
            page: "tampil",
            id_trans: id_trans
        },(data)=>{
            $('#idtrans').val(data.id_trans);
            $('#idsupplier').val(data.id_supplier);
            $('#nofaktur').val(data.no_faktur);
            $('#tglfaktur').val(data.tgl_faktur);
            $('#idobat').val(data.id_obat);
            $('#harga').val(data.harga_beli);
            $('#jumlah').val(data.jumlah);
            $('#keterangan').val(data.keterangan);
            $('#tglexp').val(data.tgl_expired);
        })
        page="edit";
    });
    
    $('#btnSave-edit').click(()=>{
        getInputValue();
        if(id_trans == "TR"){
            $("#idtrans").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Transaksi harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idtrans").focus();
                            $("#idtrans").keypress(()=>{
                                 $("#idtrans").css("border-color","#808080");
                            })
                        }
                    }
                }
            })
        }else{
            id_user = sessionStorage.getItem("nama");
            $.post('/Klinik/pembelianobatCtr',{
                page: "edit",
                id_trans: id_trans,
                id_supplier: id_supplier,
                no_faktur: no_faktur,
                tgl_faktur: tgl_faktur,
                id_obat: id_obat,
                harga_beli: harga_beli,
                jumlah: jumlah,
                keterangan: keterangan,
                tgl_expired: tgl_expired,
                id_user: id_user
            },(data)=>{
                if(data == "Data Berhasil di Edit!"){
                    console.log(data);
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

    $('#btnBatal').click(()=>{
        $('#myModal').fadeOut();
        clearData();
    });

    $('#lookupObat').click(()=>{
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
    
    $('#show-look-obat').on('click', '#btnPil-obat', function(){
        let baris = $(this).closest('tr');
        let id_obat = baris.find('td:eq(0)').text();
        let nama = baris.find('td:eq(1)').text();
        $('#modalObat').fadeOut();
        $('#idobat').val(id_obat);
        $('#nama-obat').val(nama);
    })

    $('#btnBatallookupObat').click(()=>{
        $('#modalObat').fadeOut();
    });
    
    $('#idobat').keyup(()=>{
        getInputValue();
        $.post('/Klinik/obatCtr', {
            page:"tampil",
            id_obat: id_obat
        },(data)=>{
            $('#nama-obat').val(data.nama_obat);
        })
    })

    $('#lookupSupplier').click(()=>{
        $('#modalSupplier').fadeIn();
        page=null;
        $.ajax({
            url: '/Klinik/supplierCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_supplier+'</td>'+
                            '<td>'+data[i].nama_suplier+'</td>'+
                            '<td style="text-align:right;">'+
                                "<a class='btn btn-outline-success btn-sm'"
                                   +"id='btnPil-supplier'>Pilih</a>"+
                            '</td>'+
                            '</tr>';
                }
                $('#show-look-supplier').html(html);
            }
        })
    });
    
    $('#show-look-supplier').on('click', '#btnPil-supplier', function(){
        let baris = $(this).closest('tr');
        let id_sup = baris.find('td:eq(0)').text();
        $('#modalSupplier').fadeOut();
        $('#idsupplier').val(id_sup);
    });

    $('#btnBatallookupSupplier').click(()=>{
        $('#modalSupplier').fadeOut();
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

