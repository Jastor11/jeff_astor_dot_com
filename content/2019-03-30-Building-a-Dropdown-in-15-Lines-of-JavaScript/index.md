---
title: "Build a Dropdown in Vanilla JS"
category: "Web Development"
date: 2019-03-30
published: "true"
slug: "building-a-dropdown-menu-in-10-lines-of-javascript"
tags:
    - web development
    - javascript
    - dom
    - beginner
    - high school lesson
---

Designing website interfaces requires a delicate balance of show and tell. Users should see exactly what we want them to see, but their view shouldn't be cluttered with too many visuals.

A prime example of cluttering the user's visual space is [lingscars.com](https://www.lingscars.com/). Believe it or not, the site actually used to be more all over the place. They've toned it down quite a bit, but it's still easy to see how clouding the user's vision with excessive stimuli is bad for user experience. Apparently, lingscars is  still one of the biggest car dealers in the UK. Go figure.

One solution to the cluttering problem is to use dropdown menus. Users click or hover over an icon, and then multiple items appear near that icon. In this post, we'll go over the basics of building a dropdown menu using CSS and a little bit of vanilla JavaScript.

## Designing the Structure and Style

First, we'll need some HTML to represent our dropdown menu. Start up a new codepen and enter in the following HTML.

```html{numberLines: true}
<div class="dropdown closed">
  <h2 class="icon">Dropdown <span>∆</span></h2>
  <ul class="menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
    <li><a href="#">Item 4</a></li>    
  </ul>
</div>
```

And the corresponding CSS.

```css{numberLines: true}
body {
  margin: 0;
  font-family: Courier New;
  font-size: 20px;
}
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
a {
  text-decoration: none;
  color: black;
}
.dropdown {

}
```

Also feel free to just fork this codepen and work along with me.

<iframe height="565" style="width: 100%;" scrolling="no" title="Vanilla JS Dropdown Part I" src="//codepen.io/jastor11-the-decoder/embed/YMzzLL/?height=565&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/jastor11-the-decoder/pen/YMzzLL/'>Vanilla JS Dropdown Part I</a> by Jeff Astor
  (<a href='https://codepen.io/jastor11-the-decoder'>@jastor11-the-decoder</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

The HTML is a simple div with the class of dropdown and it contains an `<h2>` holding a `<span>` with a delta (∆) sign that will serve as the toggle icon. We also have a `<ul>` element that holds all of our `<li>` dropdown menu items.

We'll need to add some additional styles before this looks presentable. Update your CSS code to look like the following.

```css
/****
...other css before this
*****/
.dropdown {
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  margin: 30px;
  background: rgb(248, 248, 248);
  border: solid 1px rgb(222, 222, 222);
  width: 320px;
  cursor: pointer;
}
.icon {
  display: flex;
  justify-content: space-between;
  padding: 0 25px 0 10px;
}
.menu {
  height: 228px;
}
.menu li {
  font-size: 24px;
  text-transform: uppercase;
  padding: 14px 10px;
  border-top: solid 1px rgb(202, 202, 202);
}
```

We're adding some styles to the dropdown menu to move it away from the top left of the screen, add some background and border color, and set its width to 320px. We've also specified that anything that overflows the border should be hidden. The transition property makes sure that any animations happen over the course of 200ms, with a touch of easing to make it look nice.

We've also added some padding and spacing to the icon toggle, along with giving the menu an explicit height of 228px. This will come in handy in a second.

Your dropdown should now look like this.

<iframe height="565" style="width: 100%;" scrolling="no" title="Vanilla JS Dropdown Part II" src="//codepen.io/jastor11-the-decoder/embed/xexxjr/?height=565&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/jastor11-the-decoder/pen/xexxjr/'>Vanilla JS Dropdown Part II</a> by Jeff Astor
  (<a href='https://codepen.io/jastor11-the-decoder'>@jastor11-the-decoder</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Adding An Event Listener

Ok, we're ready to add some JavaScript. Notice how our dropdown div also has a class of closed? We'll take advantage of that by adding a single CSS rule and hooking it up to an event listener.

In your JavaScript section, add this:

```javascript{numberLines: true}
let dropdown = document.querySelector('.dropdown')

dropdown.addEventListener('click', (e) => {
  if (dropdown.classList.contains('closed')) {
    dropdown.classList.remove('closed')
  } else {
    dropdown.classList.add('closed')    
  }
})
```

What's happening here is that we're storing the `.dropdown` div in a variable called dropdown, and then attaching an event listener that waits for a click. When it is clicked, the callback function toggles the `.closed` class on the dropdown. Yet, when we click the icon, nothing happens. How do we fix that?

Here's the last chunk of CSS you should add to make this work.

```css
.dropdown.closed .menu {
  height: 0px;
}
.dropdown.closed .icon span {
  transform: rotate(180deg);
}
```

Right away we see our menu disappear. If the dropdown menu also has the class of `.closed`, then the `.menu` ul inside of it will have a height of `0px`. You'll also see the ∆ sign flip 180 degrees.

<iframe height="565" style="width: 100%;" scrolling="no" title="Vanilla JS Dropdown Part III" src="//codepen.io/jastor11-the-decoder/embed/NmWWEQ/?height=565&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/jastor11-the-decoder/pen/NmWWEQ/'>Vanilla JS Dropdown Part III</a> by Jeff Astor
  (<a href='https://codepen.io/jastor11-the-decoder'>@jastor11-the-decoder</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


What happens when we click on it now? As soon as the `.closed` class is toggled, our dropdown switches between opened and closed. And that's all there is to it!

Adding a few additional styles and changing the event listener can get you to something pretty fly.

<iframe height="565" style="width: 100%;" scrolling="no" title="Vanilla JS Dropdown with CSS Grid in almost exactly 100 LOC" src="//codepen.io/jastor11-the-decoder/embed/qwBWWG/?height=565&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/jastor11-the-decoder/pen/qwBWWG/'>Vanilla JS Dropdown with CSS Grid in almost exactly 100 LOC</a> by Jeff Astor
  (<a href='https://codepen.io/jastor11-the-decoder'>@jastor11-the-decoder</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Wrapping Up and Extensions

This is my take on building a dropdown from scratch, but there are so many ways to extend this activity. I added a hover-over event listener to mine and added a transition to the icon. See if you can get more creative with your layout and transitions.

+ What should the icon do when the dropdown is open?
+ How should each menu items look?
+ What event should open the dropdown?
+ In what fashion should the menu items appear/disappear?
+ What about menus inside of other menus? Oooohh.
