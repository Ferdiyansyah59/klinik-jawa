$(document).ready(function(){
    
    let id_karyawan, nama_karyawan, tgl_lahir, bidang_pekerjaan, jenis_kelamin, alamat, no_hp, no_ktp, email, no_npwp, user_id;
    
    const getInputValue = () => {
        id_karyawan = $('#idkaryawan').val();
        nama_karyawan = $('#namakaryawan').val();
        tgl_lahir = $('#tgllahir').val();
        bidang_pekerjaan = $('#bidang').val();
        jenis_kelamin = $("input[name='gender']:checked").val();
        alamat = $('#alamat').val();
        no_hp = $('#nohp').val();
        no_ktp = $('#noktp').val();
        email = $('#email').val();
        no_npwp = $('#nonpwp').val();
    }
    
    const clearData = () => {
        $('#idkaryawan').val("");
        $('#namakaryawan').val("");
        $('#tgllahir').val("");
        $('#bidang').val("");
        jenis_kelamin = $("input[name='gender']").prop('checked', false);
        $('#alamat').val("");
        $('#nohp').val("");
        $('#noktp').val("");
        $('#email').val("");
        $('#nonpwp').val("");
    }
    
    const getData = () => {
        $.ajax({
            url: '/Klinik/karyawanCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
            success: (data)=>{
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_karyawan+'</td>'+
                            '<td>'+data[i].nama_karyawan+'</td>'+
                            '<td>'+data[i].tgl_lahir+'</td>'+
                            '<td>'+data[i].bidang_pekerjaan+'</td>'+
                            '<td>'+data[i].jenis_kelamin+'</td>'+
                            '<td>'+data[i].alamat+'</td>'+
                            '<td>'+data[i].no_hp+'</td>'+
                            '<td>'+data[i].email+'</td>'+
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
        $('#no').prop("readonly", false);
        $('#idkaryawan').val("KR");
    });
    
    $('#idkaryawan').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        let maxChar = 4;
        if($('#idkaryawan').val().length > maxChar){
           if(key == 8 || key == 9 || key == 37 || key == 39){
               
           }else{
               e.preventDefault();
           }
       }
       
       if(key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
           if($('#idkaryawan').val().length == 2){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
       }else{
           e.preventDefault();
       }
    })
    
    $('#nohp, #noktp, #nonpwp').keydown((e)=>{
        let key = e.charCode || e.keyCode;
        if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
        }else{
            e.preventDefault();
        }
    })
    
    
    $('#btnSave').click(()=>{
        getInputValue();
        if( id_karyawan == "KR"){
            $("#idkaryawan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Karyawan harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idkaryawan").focus();
                            $("#idkaryawan").keypress(()=>{
                                 $("#idkaryawan").css("border-color","#808080");
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
                content: "Maaf Anda Belum Lahir",
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
           else if(getAge() < 17){
               $.alert({
                icon : 'far fa-times-circle',
                title: 'Gagal',
                type: 'red',
                content: "Minimal usia adalah 17 tahun, usia anda "+ getAge() + " Tahun",
                typeAnimated: true,
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: function(){  
                        }  
                    }          
                }
            });
           }else{
               user_id = sessionStorage.getItem("nama");
           
               $.post('/Klinik/karyawanCtr', {
                   page: "tambah",
                   id_karyawan: id_karyawan,
                   nama_karyawan: nama_karyawan,
                   tgl_lahir: tgl_lahir,
                   bidang_pekerjaan: bidang_pekerjaan,
                   jenis_kelamin: jenis_kelamin,
                   alamat: alamat,
                   no_hp: no_hp,
                   no_ktp: no_ktp,
                   email: email,
                   no_npwp: no_npwp,
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
    
    $('#show-data').on('click','#btnEdit', function(){
        $('#myModal').fadeIn();
        $('#btnSave').hide();
        $('#btnSave-edit').show();
        $('#title-modal').html('EDIT DATA');
        $('#no').prop("readonly", true);
        let baris = $(this).closest('tr');
        let id_karyawan = baris.find('td:eq(0)').text();
        $.post('/Klinik/karyawanCtr', {
            page: "tampil",
            id_karyawan: id_karyawan
        },(data)=>{
            $('#idkaryawan').val(data.id_karyawan);
            $('#namakaryawan').val(data.nama_karyawan);
            $('#tgllahir').val(data.tgl_lahir);
            $('#bidang').val(data.bidang_pekerjaan);
            if(data.jenis_kelamin == "L"){
                $('#laki').prop("checked", true);
            }else if(data.jenis_kelamin == "P"){
                $("#perempuan").prop("checked", true);
            }
            $('#alamat').val(data.alamat);
            $('#nohp').val(data.no_hp);
            $('#noktp').val(data.no_ktp);
            $('#email').val(data.email);
            $('#nonpwp').val(data.no_npwp);
        })
        page: "edit";
    })
    
    $('#btnSave-edit').click(()=>{
        getInputValue();
        if( id_karyawan == "KR"){
            $("#idkaryawan").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Karyawan harus diisi!',
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: ()=>{
                            $("#idkaryawan").focus();
                            $("#idkaryawan").keypress(()=>{
                                 $("#idkaryawan").css("border-color","#808080");
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
                content: "Maaf Anda Belum Lahir",
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
           else if(getAge() < 17){
               $.alert({
                icon : 'far fa-times-circle',
                title: 'Gagal',
                type: 'red',
                content: "Minimal usia adalah 17 tahun, usia anda "+ getAge() + " Tahun",
                typeAnimated: true,
                buttons: {
                    ok: {
                        btnClass: 'btn-red',
                        action: function(){  
                        }  
                    }          
                }
            });
           }else{
               user_id = sessionStorage.getItem("nama");
               console.log(id_karyawan, nama_karyawan, tgl_lahir, bidang_pekerjaan, jenis_kelamin, alamat, no_hp, no_ktp, email, no_npwp, user_id)
               $.post('/Klinik/karyawanCtr', {
                   page: "edit",
                   id_karyawan: id_karyawan,
                   nama_karyawan: nama_karyawan,
                   tgl_lahir: tgl_lahir,
                   bidang_pekerjaan: bidang_pekerjaan,
                   jenis_kelamin: jenis_kelamin,
                   alamat: alamat,  
                   no_hp: no_hp,
                   no_ktp: no_ktp,
                   email: email,
                   no_npwp: no_npwp,
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
        }
    })
    
    $('#show-data').on('click','#btnDel', function(){
        let baris = $(this).closest('tr');
        let id_karyawan = baris.find('td:eq(0)').text();
        let nama_karyawan = baris.find('td:eq(1)').text();
        $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus ID Pembayaran '+id_karyawan+" - " + nama_karyawan +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: (data, status)=>{
                                $.post('/Klinik/karyawanCtr', {
                                    page: "hapus",
                                    id_karyawan: id_karyawan,
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
    
    const getAge = () => {
        let date = $('#tgllahir').val();
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
    
    $('#searchDokter').keyup(function(){
        search_table($(this).val());
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