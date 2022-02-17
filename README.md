# www-os

a single file "spa". think you need react, svelte, vue, turbo, pjax, whatever? maybe, but probably not.

instead, copy [this one file](https://github.com/tycobbb/www-os/blob/main/os.js), it's not perfect, it certainly has some bugs, it's definitely missing some features, into your project and modify it as you see fit. now your static site is "single page".

## installation

copy [this file](https://github.com/tycobbb/www-os/blob/main/os.js) into your project and load it like:

```html
<!-- page.html -->
<script type="module" src="os.js"></script>
```

## usage

create a template for your pages like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <script type="module" src="os/os.js"></script>
  </head>

  <body>
    <!-- the page body -->
    <div id="page">
    </div>

    <!-- a bunch of persistent elements -->
    <div id="persistent">
      this will never get replaced
    </div>
  </body>
</html>
```

as long as the string on [this line](https://github.com/tycobbb/www-os/blob/62e25c6ee562ba905681bd3464f41d878236f34f/os.js#L4) 
matches  the id of the element that should change, it will work.

every time you click a link, the contents of that element will get replaced with whatever is in the new page's matching element. everything
else, like that `persistent` element, won't (e.g. so you have have audio elements that span multiple pages, or anything else).
