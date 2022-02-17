# www-os

a single file "spa". think you need react, svelte, vue, turbo, pjax, whatever? think again.

instead, copy [this one file](https://github.com/tycobbb/www-os/blob/main/os.js), it's not perfect, it certainly has some bugs, it's definitely missing features, into your project and modify it as you see fit. now your static site is "single page".

## installation

copy [this file](https://github.com/tycobbb/www-os/blob/main/os.js) into your project and load it like:

```html
<!-- page.html -->
<script type="module" src="os.js"></script>
```

## usage

create a template for your pages where all the page content is in an element with a consistent `id`, like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <script type="module" src="os/os.js"></script>
  </head>

  <body>
    <!-- the page content -->
    <div id="page">
      this is my home page
    </div>

    <!-- the persistent content -->
    <div id="persistent">
      this will stay where it is even if u go to another page
    </div>
  </body>
</html>
```

as long as the string on [this line](https://github.com/tycobbb/www-os/blob/62e25c6ee562ba905681bd3464f41d878236f34f/os.js#L4) 
matches the `id` of the element w/ your page content, you're good.

```js
const kId = {
  Page: "page",
}
```

every time you click a link, the contents of the `id="page"` element (in this example) will be replaced with whatever is in the 
new page's `page` element. everything else, like the `persistent` element, won't (e.g. you have put audio elements in there that 
live across multiple pages, or anything else).

similarly, everything outside the new page's `page` element is ignored, though this is a bug or few.

## todo

- [ ] the new page's `<title>` should be merged in
- [ ] you tell me
- [ ] or better yet, implement it
