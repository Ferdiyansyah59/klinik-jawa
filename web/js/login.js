$(document).ready(()=>{
   let id_user, nama_user, password, role;
   const page = "login";
   
   const getValue = () => {
       id_user = $('#form-username-login').val();
       password = $('#form-password-login').val();
   }
   
   
   const getUser = () => {
       getValue();
       $.post('/Klinik/userCtr', {
           page: page,
           id_user: id_user
       }, (data)=>{
           const id_userData = data.id_user;
           const passwordData = data.password;
           const namaData = data.nama_user;
           const roleData = data.role;
           if(id_user === id_userData && password === passwordData){
               sessionStorage.setItem('nama', namaData);
               sessionStorage.setItem('role', roleData);
               localStorage.setItem("status", "true");
               location.href = 'index.html';
           }else{
               $.alert({
                    icon: 'fa fa-warning',
                    title: 'Login Gagal!',
                    content: 'User ID atau Password salah!',
                    buttons: {
                        ok: {
                            btnClass: 'btn-red',
                            action: ()=>{
                            }
                        }
                    }
                })
           }
           
       })
   }
   
   $('#btnAut').click((data)=>{
       getUser();
   })
});