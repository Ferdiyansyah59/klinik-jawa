$(document).ready(function(){
    $(window).scroll(function(){
        let wScroll = $(this).scrollTop();
        console.log(wScroll);
        if(wScroll >= 100){
            $('.header').css('margin-top','-35px');
            $('.header').css('transition','0.2s ease');
        }else if(wScroll <= 100){
            $('.header').css('margin-top','0px');
            $('.header').css('transition','0.2s ease');
        }
    })

    $('#klinik2').hover(function(){
        $('#klinik1').attr('src','../../img/klinik1.jpg');
        $('#title-desc').html('Gedung Klinik');
        $('#desc').html('2 Lantai dengan parkiran luas di depan gedung di tambah lagi suasana sekitar yang asri');
    });
    $('#klinik3').hover(function(){
        $('#klinik1').attr('src','../../img/klinik2.jpg');
        $('#title-desc').html('Ruang Rawat');
        $('#desc').html('Ruangan yang bersih, nyaman serta desain yang modern dilengkapi dengan aksesoris yang lengkap');
    });
    $('#klinik4').hover(function(){
        $('#klinik1').attr('src','../../img/klinik3.jpg');
        $('#title-desc').html('Ruang Checkup');
        $('#desc').html('Ruangan yang bersih, nyaman dan dilengkapi dengan peralatan yang modern');
    });


    $('.dokter1').hover(function(){
        $('.latar').css('height','190px');
        $('.desc-dokter').css('visibility','visible');
    }, function(){
        $('.latar').css('height','0px');
        $('.desc-dokter').css('visibility','hidden');
    })

    $('.dokter2').hover(function(){
        $('.latar2').css('height','190px');
        $('.desc-dokter2').css('visibility','visible');
    }, function(){
        $('.latar2').css('height','0px');
        $('.desc-dokter2').css('visibility','hidden');
    })

    $('.dokter3').hover(function(){
        $('.latar3').css('height','190px');
        $('.desc-dokter3').css('visibility','visible');
    }, function(){
        $('.latar3').css('height','0px');
        $('.desc-dokter3').css('visibility','hidden');
    })



    $('.nav-link').on('click',function(e){

        var tujuan = $(this).attr('href');
        var elemenTujuan = $(tujuan);

        $('body,html').animate({
            scrollTop: elemenTujuan.offset().top - 100
        }, 700, 'swing');
        e.preventDefault(e)

    });

})