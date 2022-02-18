# www-os

a one-file "spa" for static sites. think you need react, svelte, vue, turbo, pjax, whatever? think again. 

copy [this one file](https://github.com/tycobbb/www-os/blob/main/os.js), it's not perfect, it certainly has some bugs, it's definitely missing features, into your project and modify it as you see fit. now your static site is "single page".

## installation

copy [this file](https://github.com/tycobbb/www-os/blob/main/os.js) into your project and load it like:

```html
<script type="module" src="os.js"></script>
```

## usage

create a template for your pages where all the page content is in an element with a consistent `id`, like:

```html
<head>
  <script type="module" src="os/os.js"></script>
</head>

<body>
  <!-- the page content -->
  <div id="page">this will change if click a link</div>
  
  <!-- the persistent content -->
  <div id="persistent">this will not</div>
</body>
```

as long as the string on [this line](https://github.com/tycobbb/www-os/blob/62e25c6ee562ba905681bd3464f41d878236f34f/os.js#L4) 
matches the `id` of the element w/ your page content, you're good.

```js
const kId = {
  Page: "page",
}
```

## how it works

every time you click a link, the contents of the element w/ the id `page` element (in our example) will be replaced with whatever is in the new page's `page` element. nothing else, like the `persistent` element, will change (e.g. you can put audio elements in there that live across multiple pages).

similarly, everything outside the new page's `page` element is ignored (though this is [a bug or a few](README.md#todos)).

## is this for me?

if you already know the answer, no need to read further.

do you want to avoid learning a bunch of complicated stuff that will make your life harder? that will make your site slower? harder to maintain?

do you need a piece of technology at all? does your site really need a backend? if it can be powered by a cms, the answer is no. could you isolate the part of the site that needs a backend into a much smaller service?

if answering any of these questions made you twink twice about technology decisions, then this library may be for you. 

## todos

- [ ] the new page's `<title>` should be merged in
- [ ] you [tell me](https://github.com/tycobbb/www-os/issues)
- [ ] or better yet, [implement it](https://github.com/tycobbb/www-os/compare)
