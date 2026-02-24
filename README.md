### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

1. `getElementById` grabs a single element by its unique `id` attribute. It returns one element. It is faster than querySelector method.
2. `getElementsByClassName` selects all elements that have a specific class name. It returns a HTMLCollection that automatically updates when the DOM changes.
3. `querySelector` finds the first element that matches any CSS selector and returns a single element. If the CSS selector is not found then it returns null.
4. `querySelectorAll` finds all elements matching a CSS selector and returns a nodelist of elements which acts like an array. It returns a nodelist even if no elements are found.

---

### 2. How do you create and insert a new element into the DOM?

I have to use `document.createElement()` to create a new element.I can set its content/attributes, and then insert it into the DOM using methods like `appendChild()`, `prepend()`, `insertBefore()` and other available methods.

```js
// 1. Creating a div element
const div = document.createElement("div");

// 2. Adding content and attributes
div.textContent = "Hello World!";
div.classList.add("bg-blue-300");

// 3. Inserting it into the DOM
document.getElementById("container").appendChild(div);
```

---

### 3. What is Event Bubbling? And how does it work?

Event Bubbling can be compared to a bubble rising to the surface of water. When an event starts at the target or most specific element and then flows upward through the DOM hierarchy to the least specific element (document or window).To prevent the event from propagating further we can use `event.stopPropagation()` inside any handler.

---

### 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation is a technique where instead of attaching an event listener to each individual child element, we can attach a single event listener to a common parent element and use `event.target` to determine which child was actually clicked. We can save memory and increase page speed using event delegation.

---

### 5. What is the difference between preventDefault() and stopPropagation() methods?

- `event.preventDefault()` stops the browser's default behaviour for an element. It doesn't prevent an event from bubbling up to the DOM.

- `event.stopPropagation()` stops an event from bubbling up to parent elements. It does not stop browser's default behaviour for the element.