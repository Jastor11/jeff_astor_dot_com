---
title: "How to Make Websites Interactive with JavaScript"
category: "Web Development"
date: 2019-03-26
published: "true"
slug: "make-websites-interactive-with-javascript-dom"
tags:
    - html
    - selectors
    - javascript
    - console
    - dom
    - beginner
    - high school lesson    
---

Remember that every page on the internet is an HTML **document**. We can add HTML tags to the page, and use CSS to style our HTML. However, almost every modern website allows you to *interact* with it via clicking and typing.

In this post, we'll walk through the essentials of website interaction by discussing the DOM, or Document Object Model. First, we'll examine how to access the DOM using JavaScript query selectors. Afterwards, the focus will shift to manipulating the DOM through event listeners, callbacks, and class list methods.

## Goals

By the end of this post, you should know/be able to:

* Access HTML elements on a website using **querySelector()**
* Change the class of a selected element
* Change the inner content of a selected element


## Sequence

1. The Console
2. querySelector
3. Event Listeners
4. Class List Methods
5. Content Properties


## Prerequisites

* You have mastered how to use id, class, and element selectors in your CSS.
* You understand that you can associate multiple classes with a single element by separating the class names with a space.
* You understand what purpose variables serve in JavaScript, and can write custom functions

## The Console

Before we do anything serious, let's talk about every web programmer's best friend - the developer tools. Open up a new workspace in cloud 9 (you can also just start a new codepen if you don't want to go through all the setup). Make a new folder called javascript-reboot, cd into the directory, and create a new index.html and style.css file.

```bash
mkdir javascript-reboot
cd javascript-reboot
touch index.html style.css
```

Add the following code to your index.html file and preview it in your browser. Make sure to open the preview up in a new tab.

```html{numberLines: true}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="style.css" type="text/css" />
  </head>
  <body>
    <div id="wrapper">
      <div class="row">
        <div id="phone1" class="item phone active">📱</div>
        <div id="phone2" class="item phone">📱</div>
        <div id="phone3" class="item phone">📱</div>
      </div>
    </div>

    <script type="text/javascript">
      console.log("JavaScript is working!")
    </script>

  </body>
</html>
```

Then paste this code in your style.css file.

```css{numberLines: true}
/* The first several elements that are styled are really just for the purpose of having */
/* Border-box sizing, Default to a sans-serif font throughout */
*, *:before, *:after {-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; } html { font-family: sans-serif; }

/* Black background color */
body {
  background-color: black;
}
/* put everything inside a wrapper so  */
#wrapper {
  width: 800px;
  max-width: 90%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.2);
  margin-top: 0;
  min-height: 100vh;
}
.row {
  padding-top: 25px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
}
.item {
  border-radius: 10px;
  text-align: center;
  background-color: black;
  padding: 10px;
  margin: 20px;
  transition: 0.2s;
}
.phone {
  font-size: 100px;
}
.active {
  box-shadow: 0 0 35px white;
}
.hidden {
  display: none;
}
```

Preview the HTML file and open up the JavaScript console in your browser. To do that in chrome, click on the 3 dots in the top right corner of the browser, navigate to 'More Tools', and then click on 'Developer Tools'.

<figure>
  <img alt="chrome_dev_tools" src="https://developers.google.com/web/tools/chrome-devtools/images/inspect.png" />
  <figcaption>
    Taken from the chrome devtools documentation.
  </figcaption>
</figure>

In the new browser window that opens up, select the console tab and you should see our message, "JavaScript is working!" printed to the screen.

The console will be our primary feedback tool, and let us test out small JavaScript snippets in the browser.

## The Document Object Model (DOM)

We've talked a lot about using HTML and CSS together. Earlier, we also learned how to use JavaScript to draw shapes and make animations. But we haven't yet combined all three into a single project.

Whenever a web browser, like Chrome, renders an HTML file, it also creates JavaScript objects that store information about the file. If we type `document` into the console, we see a representation of entire web page stored in the `document` variable. The `document` variable also holds some **methods** (**functions** attached to **objects**) that allow us to query our HTML. We are treating the HTML document like an object, using methods to access and manipulate the data that the object stores.

## Querying the DOM

Let's get an element from the page and store it in a variable.  Then we'll console log that variable to make sure we got the element we were looking for. Edit the script in your HTML file to have the following code.

```html
<script type="text/javascript">
  console.log("JavaScript is working!")

  let firstPhone = document.querySelector('#phone1') // Get the phone using the same selector syntax we use for CSS selectors.
  console.log(firstPhone) // View the HTML for the phone in the console.
</script>
```

When you refresh the page, you'll notice that the `firstPhone` variable is storing a div. We grabbed that div using `document.querySelector('#phone1')`. The `querySelector` method allows us to *query* the document, or *ask a question*, about an element having the selector `#phone1`.

Using this method, we were able to capture the element with the attribute `id="phone1"` and print it to the console. Capture the remaining two phone divs in variables and console log them to confirm that you got them both.

Now, update the script with the following code. Before you refresh your page, what do you think will be printed in the browser? How many items will appear in the classList?

```js
console.log("JavaScript is working!")

let firstPhone = document.querySelector('#phone1')

console.log(firstPhone)
console.log(firstPhone.id)
console.log(firstPhone.classList)
```

Notice how we actually have access to a number of properties about the firstPhone div. The one we'll deal with most, is `firstPhone.classList`. It contains a list of all the classes assigned to that element. Using JavaScript, we'll update this classList by adding or removing values from it.

## Event Listeners

What's an event listener?

> An event listener is how we set up code that only runs when a certain event happens on a page - often an event which is driven by the user. One example is when you click on a button. What other event types might exist?

Event listeners can be attached to an element on the DOM like so:

```javascript
let firstPhone = document.querySelector('#phone1')

firstPhone.addEventListener('click', (e) => {
  console.log("first phone clicked!")
})
```

So what happened here? First, we used querySelector to grab the phone div from the HTML document. Then, created an event listener by passing two arguments to the `addEventListener` method. The first is the type of event we want to listen for (a click), and the second is a **callback** function that will run as soon as the event occurs.

### Pair Practice

1. Take the JavaScript that you've written so far.
2. Add a `<button>` to the HTML markup of the page.
3. Add an event listener to that button.
4. When the button is clicked, console.log the classLists of all three phones.

The activity you just completed is the core of building websites. Give the user a website to interact with, and change the site based on what the user does.

So what are the kinds of things we might want to do inside event listeners?

## Changing Styles Programmatically

One thing we can do is  modify the CSS styling of any element on the page. This is a clean strategy for creating animations and visual feedback. To do that, we're going to use the element's classList.

Look at the style.css file and examine the CSS code inside the `.active` selector. Notice how one of the phones on our screen is glowing? That's because only one phone div has been assigned the class of active.

What if our phone is blowing up too much, and we want to turn off notifications? Let's learn how to remove the active class. Inside our script, add the following code.

```javascript
let firstPhone = document.querySelector('#phone1')

firstPhone.addEventListener('click', (e) => {
  firstPhone.classList.remove('active')
  console.log("first phone clicked!")
})
```

When we click on the first phone, we see that it loses its glow! This is what happens when we manipulate the classList of a DOM element. But what if we're ready for our phone to start blowing up again? How we can add back the active class? Add this code below your previous snippet.

```javascript
let secondPhone = document.querySelector('#phone2')

secondPhone.addEventListener('click', (e) => {
  secondPhone.classList.add('active')
  console.log("second phone clicked!")
})
```

And now we can click on the second phone, and watch it glow. However, we aren't able to turn either phone on, and then off, and then on again, etc. Conditionals to the rescue.

```javascript
let thirdPhone = document.querySelector('#phone3')

thirdPhone.addEventListener('click', (e) => {

  if (thirdPhone.classList.contains('active')){
    thirdPhone.classList.remove('active')
  } else {
    thirdPhone.classList.add('active')    
  }

  console.log("third phone clicked!")
})
```

Now we have the desired effect. There is an easier way, however.

### Pair Practice

1. Go ahead and add on/off glow event listeners for the other two phones as well.
2. Working together, see if you can have one of the event listeners use classList.toggle. Read about it at this link: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle
3. Create your own class and have one of the event listeners toggle that class instead.


## Content Properties

Let's say we wanted to change the contents of a main `<h1>` element on our page. We could modify its contents with the following JavaScript.

```js
document.querySelector('h1').innerHTML = 'My phone is blowing up!'
```

The `.innerHTML` property of any element holds text and any other HTML elements nested inside that element. We're able to update it here by setting it equal to a new string. Go ahead and try it out yourself.

Play around with this codepen and complete the challenges below. Use the tools we've discussed here to modify this report card.

<iframe height="565" style="width: 100%;" scrolling="no" title="DOM Manipulation Report Card" src="//codepen.io/jastor11-the-decoder/embed/vPMKmE/?height=565&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/jastor11-the-decoder/pen/vPMKmE/'>DOM Manipulation Report Card</a> by Jeff Astor
  (<a href='https://codepen.io/jastor11-the-decoder'>@jastor11-the-decoder</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Wrapping Up and Resources

There is more to the DOM than can fit in a single post, but this is enough to get you tinkering with your own sites. If you want continued practice, I recommend my students take advantage of the following resources.

+ Khan Academy Course on Interactive Websites - https://www.khanacademy.org/computing/computer-programming/html-css-js
+ Codecademy Course on Building Interactive Websites (I think you need a pro account actually. Had my students do their 7 day free trial to take this course.) - https://www.codecademy.com/learn/build-interactive-websites
+ MDN: Introduction to the DOM - https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
+ The Odin Project: DOM Manipulation - https://www.theodinproject.com/courses/web-development-101/lessons/dom-manipulation
+ DOM Enlightenment (FOR FUTURE REFERENCE) - Full online book available for free on everything about the DOM. http://domenlightenment.com/
