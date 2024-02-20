$(document).ready(function(){
    
    let id_dokter, nama_dokter, tgl_lahir, id_poli,laki, perempuan, jenis_kelamin, alamat, no_hp, no_ktp, spesialis, password, email, no_npwp, user_id, waktu, nama_poli, page;
    
    const getInputValue = () => {
        id_dokter = $('#id').val();
        nama_dokter = $('#namadokter').val();
        tgl_lahir = $('#tgllahir').val();
        id_poli = $('#idpoli').val();
        nama_poli = $('#namapolid').val();
        jenis_kelamin = $("input[name='gender']:checked").val();
        alamat = $('#alamat').val();
        no_hp = $('#nohp').val();
        no_ktp = $('#noktp').val();
        spesialis = $('#spesialis').val();
        email = $('#email').val();
        password = $('#password').val();
        no_npwp = $('#nonpwp').val();
    }
    
    const clearForm = () => {
        id_dokter = $('#id').val("");
        nama_dokter = $('#namadokter').val("");
        tgl_lahir = $('#tgllahir').val("");
        id_poli = $('#idpoli').val("");
        nama_poli = $('#namapolid').val("");
        jenis_kelamin = $("input[name='gender']").prop('checked', false);
        alamat = $('#alamat').val("");
        no_hp = $('#nohp').val("");
        no_ktp = $('#noktp').val("");
        spesialis = $('#spesialis').val("");
        email = $('#email').val("");
        password = $('#password').val("");
        no_npwp = $('#nonpwp').val("");
    }
        
    const getData = () => {
        $.ajax({
            url: '/Klinik/dokterCtr',
            method: 'GET',
            async: true,
            dataType: 'JSON',
            success: (data) => {
                let html = '';
                let i;
                for(i=0;i<data.length;i++){
                    html += '<tr>'+
                            '<td>'+data[i].id_dokter+'</td>'+
                            '<td>'+data[i].nama_dokter+'</td>'+
                            '<td>'+data[i].tgl_lahir+'</td>'+
                            '<td>'+data[i].nama_poli+'</td>'+
                            '<td>'+data[i].jenis_kelamin+'</td>'+
                            '<td>'+data[i].alamat+'</td>'+
                            '<td>'+data[i].no_hp+'</td>'+
                            '<td>'+data[i].spesialis+'</td>'+
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
    
    
    
    
    $('#id').keydown(function(e){
        let maxChar = 4;
        let key = e.charCode || e.keyCode;
        if($("#id").val().length > maxChar){
            if(key == 8 || key == 9 || key == 37 || key == 39){
                
            }else{
               e.preventDefault(); 
            }
        }
        
        if (key == 68 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){ 
          if($('#id').val().length == 1){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
        }else {
          e.preventDefault();
        }   
    })
    
    $('#idpoli').keydown((e)=>{
        let maxChar = 2;
        let key = e.charCode || e.keyCode;
        if($("#idpoli").val().length > maxChar){
            if(key == 8 || key == 9 || key == 37 || key == 39){
                
            }else{
               e.preventDefault(); 
            }
        }
        
        if (key == 80 || key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){ 
          if($('#idpoli').val().length == 1){
              if(key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){
                  
              }else{
                  e.preventDefault();
              }
          }
        }else {
          e.preventDefault();
        }   
    })
    
    $('#idpoli').keyup(()=>{
       page= "tampil";
       let id_poli = $('#idpoli').val();
       $.post('/Klinik/poliCtr', {
          page: page,
          id_poli: id_poli
       },(data)=>{
           $('#namapoli').val(data.nama_poli);
           page="tambah";
       });
    });
    
    $('#nohp, #noktp, #nonpwp').keydown(function(e){
        
        let key = e.charCode || e.keyCode;
        if (key == 8 || key == 20 || key == 9 || key == 37 || key == 39 || key >= 48 && key <= 57){ 
        }else {
          e.preventDefault();
        } 
    });
    
    $('#btnAdd').click(()=>{
        $('#myModal').fadeIn();
        $('#btnSave').show();
        $('#btnSave-edit').hide();
        $('#title-modal').html('TAMBAH DATA');
        $('#id').prop("readonly", false);
        $('#id').val("D");
        $('#idpoli').val("P");
        page = "tambah";
    });
    
    $('#btnSave').click(()=>{
        getInputValue();
        if(id_dokter === "D"){
            $("#id").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Dokter Harus diisi!',
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
               let user_id = sessionStorage.getItem('nama');
                $.post('/Klinik/dokterCtr', {
                    page: "tambah",
                    id_dokter: id_dokter,
                    nama_dokter: nama_dokter,
                    tgl_lahir: tgl_lahir,
                    id_poli: id_poli,
                    jenis_kelamin: jenis_kelamin,
                    alamat: alamat,
                    no_hp: no_hp,
                    no_ktp: no_ktp,
                    spesialis: spesialis,
                    password: password,
                    email: email,
                    no_npwp: no_npwp,
                    user_id: user_id
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
                                        clearForm();
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
        $('#id').prop("readonly", true);
        page= "tampil";
        let baris = $(this).closest('tr');
        let id_dokter = baris.find('td:eq(0)').text();
        $.post('/Klinik/dokterCtr', {
            page: page,
            id_dokter: id_dokter
        },(data)=>{
            $('#id').val(data.id_dokter);
            $('#namadokter').val(data.nama_dokter);
            $('#tgllahir').val(data.tgl_lahir);
            $('#idpoli').val(data.id_poli);
            if(data.jenis_kelamin == "L"){
                $('#laki').prop("checked", true);
            }else{
                $("#perempuan").prop("checked", true);
            }
            
            $('#alamat').val(data.alamat);
            $('#nohp').val(data.no_hp);
            $('#noktp').val(data.no_ktp);
            $('#spesialis').val(data.spesialis);
            $('#email').val(data.email);
            $('#password').val(data.password);
            $('#nonpwp').val(data.no_npwp);
        })
        page="edit";
    });
    
    $('#btnSave-edit').click(()=>{
        getInputValue();
        console.log(page);
        if(id_dokter === "D"){
            $("#id").css("border-color","red");
            $.alert({
                icon: 'fa fa-warning',
                title: 'Gagal!',
                content: 'ID Dokter Harus diisi!',
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
               let user_id = sessionStorage.getItem('nama');
                $.post('/Klinik/dokterCtr', {
                    page: "edit",
                    id_dokter: id_dokter,
                    nama_dokter: nama_dokter,
                    tgl_lahir: tgl_lahir,
                    id_poli: id_poli,
                    jenis_kelamin: jenis_kelamin,
                    alamat: alamat,
                    no_hp: no_hp,
                    no_ktp: no_ktp,
                    spesialis: spesialis,
                    password: password,
                    email: email,
                    no_npwp: no_npwp,
                    user_id: user_id
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
                                        clearForm();
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
    
    
    $('#tabeldokter tbody').on('click','#btnDel', function(){
       const baris = $(this).closest('tr');
       const iddokter = baris.find("td:eq(0)").text();
       console.log(iddokter);
       const namadokter = baris.find("td:eq(1)").text();
       page="hapus";
       $.confirm({
            title: 'Warning!',
            content: 'Apakah anda yakin ingin menghapus Id Dokter '+iddokter+" - " + namadokter +" ?",
            buttons: {
                yes: {
                    btnClass: 'btn-red',
                    action: function(data, status){
                                $.post('/Klinik/dokterCtr', {
                                    page: page,
                                    id_dokter: iddokter
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
    });

    

    $('#btnBatal').click(()=>{
        $('#myModal').fadeOut();
        clearForm();
    });
    
    $('#lookuppoli').click(() => {
        page=null;
        $('#modalPoli').fadeIn();
        $.ajax({
            url: '/Klinik/poliCtr',
            method: "GET",
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
                                   +"id='btnPilih'>Pilih</a>"+
                            '</td>'+
                            '</tr>';
                }
                $('#show-look').html(html);
            }
        })
    });
    
    $('#show-look').on('click', '#btnPilih', function(){
        let baris = $(this).closest('tr');
        let id_poli = baris.find('td:eq(0)').text();
        let nama_poli = baris.find('td:eq(1)').text();
        $('#modalPoli').fadeOut();
        $('#idpoli').val(id_poli);
        $('#namapoli').val(nama_poli);
    })
    
    $('#btnBatallookupPoli').click(() => {
        $('#modalPoli').fadeOut();
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
    
    $('#searchLook').keyup(function(){
        search_table_look($(this).val());
    });
    
    function search_table_look(value){
        $('#show-look tr').each(function(){
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