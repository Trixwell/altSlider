# ![](https://github.com/Trixwell/altSlider/blob/master/gif/alt.gif) 
AltSlider is a customizable jQuery slider plugin. Features include:

* Handle data with AJAX
* Handle data without using AJAX request
* Dynamic reload of data (using AJAX)
* Auto scroll function
* Elastic configuration: turn of scrollbar or AJAX requests
* Vertical and horizontal scrollbar
* Flexible CSS stylization


## Usage

Load jQuery and AltSlider: `npm i alt-slide`

Mention this scripts in your HTML file:

```html
<script src="node_modules/alt-slider/js/altSlider.js"></script>
<script src="node_modules/jquery/dist/jquery.js"></script>
```

Mention this stylesheet in your HTML file:

```html
<link rel="stylesheet" href="node_modules/alt-slider/css/altSlider.css">
```

At first your default JS file should look this way:
```js
$(function () {
    $(".block").altSlider(
        {
            url: 'your-json-file.json'
        }
    );
});
```
![](https://github.com/Trixwell/altSlider/blob/master/gif/expml.gif)

For dynamic reload add **dynamicReload** property in your JS file where it's attribute is milliseconds trough which your slider data will reload.
```js
$(function () {
    $(".block").altSlider(
        {
            url: '/try-it/dynamic-reload/test.json',
            dynamicReload: 3000
        }
    );
});
```

For auto scroll add **auto_scroll** property in your JS file where it's attribute is milliseconds through which your slider will scroll.

```js
$(function () {
    $(".block").altSlider(
        {
            url: '/try-it/auto-scroll/auto-scroll.json',
            auto_scroll: 1000
        }
    );
});
```

![](https://github.com/Trixwell/altSlider/blob/master/gif/auto-scroll-new.gif)

For turning of scrollbar add **displayScroll** property in your JS file where it's boolean attribute (false) means that you don't want to use scrollbar.

```js
$(function () {
    $(".block").altSlider(
        {
            url: '/try-it/no-scroll/test.json',
            displayScroll: false
        }
    );
});
```

![](https://github.com/Trixwell/altSlider/blob/master/gif/no-scroll.gif)


For turning on **customizable vertical scrollbar mode**  in your JS file mention boolean attribute (true) which means that your scrollbar is vertical. Add your CSS file for stylization. **_All features for horizontal scroll also work for vertical._**

```js
$(function () {
    $(".block").altSlider(
        {
            url: '/try-it/vertical-scroll/vertical-scroll.json',
             is_vertical: true
        }
    );
});
```

For handling data without using AJAX requests, add it in your JS file with **rawData** property.


```js
$(function () {
    $(".block").altSlider(
        {
            rawData:
                [
                    {
                        "title": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi at corporis dignissimos error, facilis ipsum iste iusto, labore minima, nihil obcaecati placeat possimus quasi qui rem saepe soluta voluptates.",
                        "body": "Test body 1",
                        "create_time": "2018-01-01 00:00:01",
                        "img_src": "http://s5.uploads.ru/t/0hYTP.jpg",
                        "src": "https://google.com"
                    },
                    {
                        "title": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi at corporis dignissimos error, facilis ipsum iste iusto, labore minima, nihil obcaecati placeat possimus quasi qui rem saepe soluta voluptates.",
                        "body": "Test body 2",
                        "create_time": "2018-02-02 00:23:01",
                        "img_src": "http://sa.uploads.ru/t/xqseC.jpg",
                        "src": "https://google.com"
                    },
                    {
                        "title": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi at corporis dignissimos error, facilis ipsum iste iusto, labore minima, nihil obcaecati placeat possimus quasi qui rem saepe soluta voluptates.",
                        "body": "Test body 3",
                        "create_time": "2018-03-02 00:23:01",
                        "img_src": "http://s3.uploads.ru/t/ecM5L.jpg",
                        "src": "https://google.com"
                    }
                ]
            }
    );
});

```

## Rawdata format and server responce data format

Format of data for url file must include array of data with next properties, which are optional.

```js
[
  {
    "title": "A five-year study of Thwaites Glacier will be one of the biggest projects ever in Antarctica.",
    "body": "Test body 1",
    "create_time": "2018-02-02 00:23:01",
    "header": "UK-US initiative to study mighty Thwaites Glacier",
    "img_src": "images/2.jpg",
     "src": "https://google.com"
  }
]
```
* "header" is a header of your item block.
* "body" is a subheader.
* "title" is a paragraph with short description.
* "create_time" is a date with info when your paragraph was posted.
* "img_src" is a link to image.
* "src" is an external link.

![](https://github.com/Trixwell/altSlider/blob/master/gif/exmpl2.gif)

## License

GPL 3
https://opensource.org/licenses/GPL-3.0
