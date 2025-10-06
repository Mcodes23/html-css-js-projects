# Frontend Mentor - Stats preview card component solution

This is a solution to the [Stats preview card component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/stats-preview-card-component-8JqbgoU62). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size

### Screenshot

![](./assets/screenshot.png)

### Links

- Live Site URL: https://mcodes23.github.io/html-css-js-projects/stats-preview-card-component/

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

One key thing I learned in this project is how to use the <picture> element to serve different images for different screen sizes, improving responsiveness and loading performance.

```html
<picture>
  <source
    media="(min-width: 650px)"
    srcset="./assets/image-header-desktop.jpg"
  />
  <img src="./assets/image-header-mobile.jpg" alt="header image" />
</picture>
```
