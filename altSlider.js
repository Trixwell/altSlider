$.fn.altSlider = function(items) {
    // default configuration
    var config = $.extend({}, {
        url: ''
    }, items);

    // initialize every element
    console.log('load config', config);

    this.each(function() {
        var self = this;
        
        $.ajax({
            url: config.url,
            type: 'post',
            dataType: 'json',
            success: function(res) {
              
                var viewside = $('<div />').addClass('viewside');
                var slider_list = $('<ul>').addClass('slider_list');

                for (var key in res) {
                           
                    var name = $('<p />').html(res[key].title).addClass('slider_name');
                    var time = $('<p />').html(res[key].create_time).addClass('slider_time');
                    var image_src = $('<img>').attr('src', res[key].img_src).addClass('slider_image');
                    var src = $('<a>').attr('href', res[key].src).addClass('slider_anchor');

                    var anchor = $(src).append(image_src).append(time).append(name);

                    var slider_elem = $('<li>').addClass('slider_elem');

                        $(self).append(viewside);
                        $(viewside).append(slider_list);
                        $(slider_list).append(slider_elem);
                        $(slider_elem).append(anchor);


                }
                var slideNow = 1;
                var slideCount = $('.slider_list').children().length

                function nextSlide() {
                    if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
                        $('#slidewrapper').css('transform', 'translate(0, 0)');
                        slideNow = 1;
                    } else {
                        translateWidth = -$('#viewport').width() * (slideNow);
                        $('#slidewrapper').css({
                            'transform': 'translate(' + translateWidth + 'px, 0)',
                            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                        });
                        slideNow++;
                    }
                }

                $(document).ready(function () {
                    setInterval(nextSlide, slideInterval);
                });

                $('.viewside').hover(function(){
                    clearInterval(switchInterval);
            },function() {
                    switchInterval = setInterval(nextSlide, slideInterval);
            });
            }
        });
    });



    return this;


};