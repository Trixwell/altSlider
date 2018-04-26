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
            let wrapper_width = $(this).parent().find('.scroll_wrapper').width();
            let scroll_bar_width = $(this).find('.scroll_bar').width();
            let item_length = $(this).find('.item').length;
            let left_side = wrapper_width / item_length;
            let scrollbar_left_size = parseInt($(this).parent().find('.scroll_bar').css('left'));

            if (e.deltaY < 0) {
                item_width *= -1;
                left_side *= -1;
            }

            let left_size_bar = scrollbar_left_size + left_side;
            if (left_size_bar < 0) {
                left_size_bar = 0;
            }

            if (left_size_bar > (total_width - left_side)) {
                left_size_bar = total_width - left_side;
            }

            $(this).parent().find('.scroll_bar')
                .css('left', left_size_bar);

            this.scrollLeft = this.scrollLeft + item_width;
        });

        let scroll_wrapper = $('<div />')
            .addClass('scroll_wrapper');

        let scroll_bar = $('<div />')
            .addClass('scroll_bar');

        $(this).append(scroll_wrapper);
        scroll_wrapper.append(scroll_bar);

        $.ajax({
            url: config.url,
            type: 'post',
            dataType: 'json',
            success: function (res) {
                let wrapper_width = $(slider).parent().find('.scroll_wrapper').width();
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