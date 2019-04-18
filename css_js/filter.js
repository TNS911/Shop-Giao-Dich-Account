var page = 1;
var type = rank = frame = price = order = champ_str = skin_str = master_str = '';
$(document).ready(function() {
    $('.sl-sebox .swiper-slide').click(function() {
        type = $(this).attr('data-type');
        if (type == 'wheel') {
        	window.location.href = 'quay-so';
        } else {
	        if (type == 'lien-quan') {
	            frame = '';
	            $('.sl-col.col-md-6.col-xs-12.filter').show();
	            $('input.property-filter').hide();
	            $('select[data-filter="tim-theo-khung"]').closest('li').hide();
	            $('.swiper-slide[data-type!="lien-quan"]').removeClass('active');
	            $(this).addClass('active');
	        } else if (type == 'lien-minh-10k') {
	        	rank = frame = price = order = champ_str = skin_str = master_str = '';
	        	$('.sl-col.col-md-6.col-xs-12.filter').hide();
				$('.swiper-slide[data-type!="lien-minh-10k"]').removeClass('active');
	            $(this).addClass('active');
	        } else if (type == 'lien-minh-25k') {
	        	rank = frame = price = order = champ_str = skin_str = master_str = '';
	        	$('.sl-col.col-md-6.col-xs-12.filter').hide();
				$('.swiper-slide[data-type!="lien-minh-25k"]').removeClass('active');
	            $(this).addClass('active');
	        } else if (type == 'lien-minh-50k') {
	        	rank = frame = price = order = champ_str = skin_str = master_str = '';
	        	$('.sl-col.col-md-6.col-xs-12.filter').hide();
				$('.swiper-slide[data-type!="lien-minh-50k"]').removeClass('active');
	            $(this).addClass('active');
	        } else {
				$('.sl-col.col-md-6.col-xs-12.filter').show();
	            $('input.property-filter').show();
	            $('select[data-filter="tim-theo-khung"]').closest('li').show();
				$('.swiper-slide[data-type!=""]').removeClass('active');
	            $(this).addClass('active');
	        }
	        page = 1;
	        load_account_list();
        }

        return false;
    });
    $('.sl-sebt2').click(function () {
        type = rank = frame = price = order = champ_str = skin_str = master_str = '';
        page = 1;
        $('input.property-filter').show();
        $('select[data-filter="tim-theo-khung"]').closest('li').show();
        $('.swiper-slide[data-type=""]').addClass('active');
        $('.swiper-slide[data-type!=""]').removeClass('active');
        $('.sl-col.col-md-6.col-xs-12.filter').show();
        load_account_list();
    });

    $('.sl-sebt1.btn-filter').click(function() {
    	page = 1;
        rank = $('select[data-filter="tim-theo-rank"]').val();
        frame = $('select[data-filter="tim-theo-khung"]').val();
        price = $('select[data-filter="tim-theo-gia"]').val();
        order = $('select[data-filter="sap-xep-theo"]').val();
        load_account_list();
    });

    $('#list-account').on('click', '.sl-paging ul li.item a[href]', function() {
        page = $(this).attr('data-ci-pagination-page');
        load_account_list();
        return false;
    });
});

function load_account_list() {
    var data_post = {
        page: page,
        rank: rank,
        khung: frame,
        gia: price,
        sapxep: order,
        tuong: champ_str,
        trangphuc: skin_str,
        thongthao: master_str,
        loai: type
    };
    $('#list-account').empty();
    $('#loading').show();
    $.post('load/account_list', data_post, function(data) {
        if (data.url_filter) {
            history.pushState({}, null, data.url_filter);
        } else {
            history.pushState({}, null, location.pathname);
        }
        $('#list-account').html(data.html);
        $('#loading').hide();
    }, 'json');
}