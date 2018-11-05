$(function () {
    $('.dashboard').show();
    $('.add').hide();
    $('.remove').hide();
    $('.members').hide();
    $('.banned-members').hide();

    $('.dashboard-list').on('click', function () {
        $('.add-list').removeClass('is-active');
        $('.remove-list').removeClass('is-active');
        $('.members-list').removeClass('is-active');
        $('.banned-members-list').removeClass('is-active');
        $(this).addClass('is-active');
        $('.dashboard').show();
        $('.add').hide();
        $('.remove').hide();
        $('.members').hide();
        $('.banned-members').hide();
    });

    $('.add-list').on('click', function () {
        $('.dashboard-list').removeClass('is-active');
        $('.members-list').removeClass('is-active');
        $('.remove-list').removeClass('is-active');
        $('.banned-members-list').removeClass('is-active');
        $(this).addClass('is-active');
        $('.dashboard').hide();
        $('.add').show();
        $('.remove').hide();
        $('.members').hide();
        $('.banned-members').hide();
    });
    
    $('.remove-list').on('click', function () {
        $('.dashboard-list').removeClass('is-active');
        $('.members-list').removeClass('is-active');
        $('.add-list').removeClass('is-active');
        $('.banned-members-list').removeClass('is-active');
        $(this).addClass('is-active');
        $('.dashboard').hide();
        $('.add').hide();
        $('.remove').show();
        $('.members').hide();
        $('.banned-members').hide();
    });

    $('.members-list').on('click', function () {
        $('.dashboard-list').removeClass('is-active');
        $('.add-list').removeClass('is-active');
        $('.remove-list').removeClass('is-active');
        $('.banned-members-list').removeClass('is-active');
        $(this).addClass('is-active');
        $('.dashboard').hide();
        $('.add').hide();
        $('.remove').hide();
        $('.members').show();
        $('.banned-members').hide();
    });

    $('.banned-members-list').on('click', function () {
        $('.dashboard-list').removeClass('is-active');
        $('.add-list').removeClass('is-active');
        $('.remove-list').removeClass('is-active');
        $('.members-list').removeClass('is-active');
        $(this).addClass('is-active');
        $('.dashboard').hide();
        $('.add').hide();
        $('.remove').hide();
        $('.members').hide();
        $('.banned-members').show();
    });

})