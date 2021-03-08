# remark-link-card test

## bare links

bare links are converted to link cards.

http://example.com/

https://www.npmjs.com/package/remark-link-card

<http://example.com/>

<https://www.npmjs.com/package/remark-link-card>

## inline links

Inline links are **not** converted to link cards.

[example](http://example.com/) is inline link

[remark-link-card](https://www.npmjs.com/package/remark-link-card) is inline link

## multiple links in one line

If there are multiple links in one line, they will **not** be converted to link cards.

http://example.com/ http://example.com/ http://example.com/
