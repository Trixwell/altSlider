# altSlider
AltSlider is a customizable jQuery slider plugin. Features include:

* Handle data with AJAX
* Handle data without using AJAX request
* Dynamic reload of data (using AJAX)
* Auto scroll function
* Elastic configuration: turn of scrollbar or AJAX requests
* Flexible CSS stylization

## Usage

Load jQuery and AltSlider: `npm i alt-slide`

Your default project should insclude next files: html, css, js and json.

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
```html
$(function () {
    $(".block").altSlider(
        {
            url: 'index.json',
        }
    );
});
```
