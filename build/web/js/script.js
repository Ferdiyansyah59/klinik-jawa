(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);


$(document).ready(()=>{
    let id_user, nama, password, role;
    
    
    const getSession = () => {
        nama = sessionStorage.getItem("nama");
        role = sessionStorage.getItem("role");
    }
    
    const getRole = () => {
        getSession();
        $('#nama').html(nama);
        if(role === "apotek"){
            $('#side1').hide();
            $('#side2').hide();
            $('#side3').hide();
            $('#user    ').hide();
        }else if(role === "loket"){
            $('#rekammedik').hide();
            $('#side1').hide();
            $('#side4').hide();
            $('#side5').hide();
            $('#user').hide();
            $('#supplier').hide();
        }else if(role === "laboratorium"){
            $('#side1').hide();
            $('#side2').hide();
            $('#side4').hide();
            $('#side5').hide();
            $('#user').hide();
            $('#supplier').hide();
            $('#pasienMenu').hide();
            $('#pendaftaran').hide();
        }else if(role === "resepsionis"){
            $('#karyawan-umum').hide();
            $('#detailLayanan').hide();
            $('#side5').hide();
            $('#rekammedik').hide();
            $('#user').hide();
            $('#supplier').hide();
            $('#side4').hide();
        }else if(role === "dokter"){
            $('#side1').hide();
            $('#side2').hide();
            $('#side5').hide();
            $('#user').hide();
            $('#supplier').hide();
            $('#pendaftaran').hide();
        }else if(role === "kasir"){
            $('#side1').hide();
            $('#side2').hide();
            $('#side3').hide();
            $('#side4').hide();
            $('#pembelianobat').hide();
            $('#user').hide();
            $('#supplier').hide();
        }
        
    }
    getRole();
    
     
    
});

