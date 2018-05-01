$.fn.altSlider = function (userConfig) {
    let config = $.extend({}, {
        url: '',
        rawData: [],
        dynamicReload: false,
        displayScroll: true,
        display_elements_count: 3,
        move_right_steps: 1,
        auto_scroll: false
    }, userConfig);


    this.each(function () {
        let root_el = $('<div />').addClass('body');
        let slider = $('<div />')
            .addClass('alt-slider')
            .append(root_el);
        $(this).append(slider);
        let elements = [];
        let current_position = -1;

        let self = this;

        slider[0].addEventListener('wheel', function (e) {
            if (e.deltaY < 0) {
                self.moveLeft()
            } else {
                self.moveRight();
            }
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
                    if (callback) {
                        callback(res);
                    }
                }
            });
        };

        this.loadAJAX = function () {
            this.runAJAX(function (res) {
                self.handleData(res, true);
            });
        };

        this.moveScroll = function (is_left) {
            let left_side = scroll_bar.width();

            if (is_left) {
                left_side *= -1;
            }

            left_size_bar = current_position * left_side;
            $(this)
                .parent()
                .find('.scroll_bar')
                .css('left', left_size_bar);
        };

        this.display = function (res) {
            $(root_el).html('');
            res.forEach(function (el) {
                let item = $('<a />')
                    .addClass('item')
                    .attr('href', el.src)
                ;

                if (el.img_src) {
                    item.append(
                        $('<div />')
                            .addClass('img-block')
                            .append(
                                $('<img />')
                                    .attr('src', el.img_src)
                            )
                    );
                }

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

        this.moveRight = function () {
            if (current_position >= (elements.length - config.display_elements_count)) {
                current_position = elements.length - config.display_elements_count - 1;
            }

            current_position++;
            this
                .updateScreen()
                .moveScroll(false);
        };

        this.moveLeft = function () {
            if (current_position <= 0) {
                current_position = 1;
            }

            current_position--;
            this
                .updateScreen()
                .moveScroll(true);
        };

        this.handleData = function (res, is_move) {
            elements = res;
            let wrapper_width = $(slider).parent().find('.scroll_wrapper').width();
            let elem_width = Math.round(wrapper_width / (elements.length - config.display_elements_count + 1) + 1);
            $(scroll_bar).css('width', elem_width + 'px');

            if (is_move) {
                this.moveRight();
            }

            return this;
        };

        this.updateScreen = function () {
            this.display(elements.slice(current_position, current_position + config.display_elements_count));
            return this;
        };

        if (config.rawData.length > 0) {
            this.handleData(config.rawData, true);
        } else {
            this.loadAJAX();
        }

        if (config.dynamicReload) {
            setTimeout(function reload() {
                self.runAJAX(function (res) {
                    self
                        .handleData(res, false)
                        .updateScreen();
                    setTimeout(reload, config.dynamicReload);
                });
            }, config.dynamicReload);
        }

        if (config.auto_scroll) {
            setInterval(function() {
                self.moveRight();
            }, config.auto_scroll);
        }

    });

    return this;
};