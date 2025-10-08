# Frontend Mentor - Four card feature section solution

This is a solution to the [Four card feature section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/four-card-feature-section-weK1eFYK). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size

### Screenshot

![](./images/Screenshot%20.png)

### Links

- Live Site URL: https://mcodes23.github.io/html-css-js-projects/four-card-feature/

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

While building this project, I deepened my understanding of CSS Grid layout, especially how to position elements precisely using grid-column and grid-row.

Here’s a code snippet that demonstrates the layout logic I implemented:

```html
<section class="grid-container">
  <div class="card left">
    <div class="text-content">
      <h3>Supervisor</h3>
      <p>Monitors activity to identify project roadblocks</p>
    </div>
    <div class="card-img">
      <img src="./images/icon-supervisor.svg" alt="lens image" />
    </div>
  </div>
  <div class="card top">
    <div class="text-content">
      <h3>Team Builder</h3>
      <p>
        Scans our talent network to create the optimal team for your project
      </p>
    </div>
    <div class="card-img">
      <img src="./images/icon-team-builder.svg" alt="home icon" />
    </div>
  </div>
  <div class="card bottom">
    <div class="text-content">
      <h3>Karma</h3>
      <p>Regularly evaluates our talent to ensure quality</p>
    </div>
    <div class="card-img">
      <img src="./images/icon-karma.svg" alt="bulb icon" />
    </div>
  </div>
  <div class="card right">
    <div class="text-content">
      <h3>Calculator</h3>
      <p>Uses data from past projects to provide better delivery estimates</p>
    </div>
    <div class="card-img">
      <img src="./images/icon-calculator.svg" alt="computer icon" />
    </div>
  </div>
</section>
```

```css
@media (min-width: 1024px) {
  .main-container {
    max-width: 1100px;
  }
  .header-section {
    width: 50%;
  }
  .header-section h1 {
    font-size: 2rem;
  }
  .header-section h2 {
    font-size: 2rem;
  }
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, auto);
    align-items: center;
    justify-items: center;
    gap: 2rem;
  }

  .left {
    grid-column: 1 / 2;
    grid-row: 2 / 4;
  }

  .top {
    grid-column: 2 / 3;
    grid-row: 2 / 2;
  }

  .bottom {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }

  .right {
    grid-column: 3 / 4;
    grid-row: 2 / 4;
  }
}
```
