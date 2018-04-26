$.fn.altSlider = function (userConfig) {
    let config = $.extend({}, {
        url: ''
    }, userConfig);

    this.each(function () {
        let root_el = $('<div />').addClass('body');
        let slider = $('<div />')
            .addClass('alt-slider')
            .append(root_el);
        $(this).append(slider);

        slider[0].addEventListener('wheel', function (e) {
            let item_width = $(this).find('.item').width();
            let total_width = $(this).width();
            let wrapper_width = $(this).find('.scroll_wrapper').width();
            let scroll_bar_width = $(this).find('.scroll_bar').width();
            let item_length = $(this).find('.item').length;


            console.log(item_width / total_width);

            if (e.deltaY < 0) {
                item_width *= -1;
            }

            let scroll_bar_left = $(this).find('.scroll_bar').css('left', '');

            this.scrollLeft = this.scrollLeft + item_width;
        });


        // SCROLLBAR CUSTOMIZATION

        let scroll_wrapper = $('<div />')
            .addClass('scroll_wrapper');

        let scroll_bar = $('<div />')
            .addClass('scroll_bar');

        slider.append(scroll_wrapper);
        scroll_wrapper.append(scroll_bar);






        ///////////////////////////////////////
        $.ajax({
            url: config.url,
            type: 'post',
            dataType: 'json',
            success: function (res) {
                let wrapper_width = $(slider).find('.scroll_wrapper').width();
                let elem_width = wrapper_width / res.length;
                $(scroll_bar).css('width', elem_width + 'px');

                res.forEach(function (el) {
                    let item = $('<a />')
                        .addClass('item')
                        .attr('href', el.src)
                    ;

                    item.append(
                        $('<div />')
                            .addClass('img-block')
                            .append(
                                $('<img />')
                                    .attr('src', el.img_src)
                            )
                    );
                    item.append(
                        $('<span />').html(el.title)
                    );

                    $(root_el).append(item);
                });
            }
        });
    });

    return this;
};