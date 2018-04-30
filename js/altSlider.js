$.fn.altSlider = function (userConfig) {
    let config = $.extend({}, {
        url: '',
        rawData: [],
        dynamicReload: false,
        displayScroll: true
    }, userConfig);


    this.each(function () {
        let root_el = $('<div />').addClass('body');
        let slider = $('<div />')
            .addClass('alt-slider')
            .append(root_el);
        $(this).append(slider);

        let self = this;

        slider[0].addEventListener('wheel', function (e) {
            let item_width = $(this).find('.item').width();
            let total_width = $(this).width();
            let wrapper_width = $(this).parent().find('.scroll_wrapper').width();
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

        if (!config.displayScroll) {
            $(scroll_wrapper).css('display', 'none');
        }

        this.runAJAX = function (callback) {
            $.ajax({
                url: config.url,
                type: 'post',
                dataType: 'json',
                success: function (res) {
                    self.handleData(res);
                    if (callback) {
                        callback();
                    }
                }
            });
        };

        this.handleData = function (res) {
            let wrapper_width = $(slider).parent().find('.scroll_wrapper').width();
            let elem_width = wrapper_width / res.length;

            $(scroll_bar).css('width', elem_width + 'px');
            $(root_el).html('');
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
                    $('<div/>')
                        .addClass('header_wrapper')
                        .html(el.header)
                );

                item.append(
                    $('<p />')
                        .addClass('time')
                        .html(el.create_time)
                );

                item.append(
                    $('<span />').html(el.title)
                );

                $(root_el).append(item);
            });

        };

        if (config.rawData.length > 0) {
            this.handleData(config.rawData);
        } else {
            this.runAJAX();
        }

        if (config.dynamicReload) {
            setTimeout(function reload() {
                self.runAJAX(function () {
                    setTimeout(reload, config.dynamicReload);
                });
            }, config.dynamicReload);
        }

    });

    return this;
};