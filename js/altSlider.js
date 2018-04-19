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

            if (e.deltaY < 0) {
                item_width *= -1;
            }

            this.scrollLeft = this.scrollLeft + item_width;
        });

        $.ajax({
            url: config.url,
            type: 'post',
            dataType: 'json',
            success: function (res) {
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