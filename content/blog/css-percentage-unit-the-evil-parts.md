---
title: CSS percentage unit, the evil parts
date: 2018-04-27T21:00:00.000Z
slug: css-percentage-unit-the-evil-parts
tags: CSS, Transform, Evil Parts, centering
---

CSS has dozens of [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length) units, but the **percentage** unit is one of my favorites. However, it can be very evil and troublesome sometimes.

It should be one of the easiest CSS concepts to understand, the **percentage** CSS data type represents a percentage value, a **percentage** is a ratio expressed as a fraction of 100, so it has to do some calculations to get the final computed(absolute) value.

Until now it seems straightforward, the most tricky part is that every **percentage** value has to be relative to some absolute value of an element. It is often relative to an element’s parent node, but sometimes it will be relative to the element itself (as I will explain later). In addition, we have to know exactly which property value it will refer to (with, height or font-size).

## TL;DR
When you use it with some CSS properties it’ll be relative to the **parent element’s width**. Some of these properties include: left, right, margin, padding, (even top and bottom margin/padding will be relative to the parent’s width).

And sometimes it’ll be relative to the **parent element’s height**. Like when it’s used for top or bottom properties, as expected.

When you use it with the **transform** property it’ll be relative to the **element itself**, either its width or its height.

---

We will go through several steps of creating this carousel(slider) to get familiar with the CSS percentage unit.

![carousal (final)](/img/css-percentage-unit-the-evil-parts/carousel_final.png)

Note that we will not be going over a detailed explanation on how to exactly create this carousel in terms of styling, or how to make it interactive. We will only focus on how to work with percentages in align controllers and set slides’ width and height.

Creating the carousel in detail would require lots of maths and digging into JavaScript, which would require an article of its own; so for the sake of brevity, I will not be digging into either of these and will start from this basic-styled [**tutorial pen**](https://codepen.io/Abdelrahman3D/pen/pVgPZM).

![carousal (start)](/img/css-percentage-unit-the-evil-parts/carousel_01.png)

## General guides

I use [BEM](http://getbem.com/) convention in naming classes; so every element has the same [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) weight and can over-write its properties easily.

We are working with border-box [box-model](https://css-tricks.com/box-sizing/) because it’s more intuitive, as
the visible width of an element’s box = width + padding + border, and
the visible height of an element’s box = height + padding + border.

I use class names with a bold italic font, like ***.slider***, to point to the element that I’m currently working with.

You can see there are vertical and horizontal guidelines in the pen, perfectly center-aligned. To hide guides, simply remove *.slider — guides* class from ***.slider*** container.

![guides code](/img/css-percentage-unit-the-evil-parts/snippet_01.png)

At the bottom of the pen in the CSS section, you will find each tutorial step code commented. Un-comment it to see the results step by step as we go along with this tutorial.

---

## Step 1: Set slides with and height

We gave a ***.slider__slide*** a width of *25%*, this will make the element’s content area exactly equal to the quarter width of its parent (***.slider__track***), but only if its parent has an explicit width.

```css
/* step 1.1 */
.slider__track {
  width: 600px;
}
.slider__slide {
  width: 25%;
}

/*
  .slider__track width = 600px
  .slider__slide width = 0.25 * 600 = 150px
*/
```

We gave a ***.slider__slide*** a height of 100%, this will make the element’s height exactly equal to the height of its parent (***.slider__track***).

```css
/* step 1.1 */
.slider__track {
  width: 600px;
  height: 150px; 
}
.slider__slide {
  width: 25%;
  height: 100%;  
}

/*
  .slider__track height = 150px
  .slider__slide height = 1 * 150px = 150px
*/
```

You will notice that the slides get off the guides, I’m sure that front-end developers of any level have faced a similar issue to what I’ve just described. When you think working with CSS percentage is very simple (and it should be), you face this strange behavior that drives you crazy.

![slider 1.2](/img/css-percentage-unit-the-evil-parts/carousel_02.png)

If you investigate this problem more, you will find that ***.slider__slide*** height is equal to its parent as we expected, but because it has margin top and bottom of 20px it gets off the grid (I put that margin on purpose 😈😈).

We have to be very careful when setting the element width/height to 100% while it has a margin because this will move it outside the parent.

> note here: if you used the default browser box model (content-box), adding padding or border will move the element outside the parent too.
There are many ways to fix this, and I believe you’ve already thought of some, one of them is to remove that little evil margin, or we can simply subtract the top and bottom margins form the height.

```css
/* step 1.3 */
.slider__slide {
  width: 25%;
  height: calc(100% - (20px + 20px));  
}
```

🎉🎉 You have done it!

![slider 1.3](/img/css-percentage-unit-the-evil-parts/carousel_03.png)

## Step 2: Align slider indicators

We will start by aligning ***.slider__nav*** to the center-bottom of the slider. We will give it an absolute position, relative to ***.slider*** with left _50%_ of the slider width, and see the output.


```css
/* step 2.1 */
.slider {
  position: relative;
}
.slider__nav {
  position: absolute;
  /* relative to the parent's (.slide) width */
  left: 50%; 
}
```

![slider 2.1](/img/css-percentage-unit-the-evil-parts/carousel_04.png)

As we can see, we’ve aligned the left of ***.slider__nav*** to the center of ***.slider***, but we actually want to align the center of ***.slider__nav*** to the center of ***.slider***.

Unfortunately, there’s no center property in CSS so, we have to make a trick to force ***.slider__nav*** to shift back to the center.

We need to tell ***.slider__nav*** to move to the right half of its width (_50%_ from width), we can use a margin with a negative value for this.

If we added margin-left: _-50%_ to ***.slider__nav*** itself, we would find it will go back to its starting place, because the percentage value will be relative to .slider width not ***.slider__nav*** width.

The trick here is to select the first ***.slider__nav*** child, add _margin-left: -50%_ to it then the percentage will be relative to ***.slider__nav*** itself.

```css
/* step 2.2 */
.slider__nav-indicator:first-child {
  /* relative to the parent's (.slider_nav) width */
  margin-left: -50%; 
}
```

👌👌 And now it’s perfectly centered

![slider 2.2](/img/css-percentage-unit-the-evil-parts/carousel_05.png)

Don’t rush it though, we still have two arrows to align…

## Step 3: Align slider controller next button

We will align ***.slider__next*** arrow to the right middle of the ***.slider***.

Let’s try the trick that we’ve just learned, but now we will use it to center align the element vertically.

```css
/* step 3.1 */
.slider__next {
  position: absolute;
  right: 0;
  /* relative to the parent's (.slider) height */
  top: 50%;
}

.slider__next > *:first-child {
  /* gotcha! */
  margin-top: -50%; 
}
```

![slider 3.1](/img/css-percentage-unit-the-evil-parts/carousel_06.png)

Oops! It didn’t work this time, can you guess why?

It seems like this technique worked perfectly in horizontal alignment but not as much for vertical alignment. That’s why CSS can sometimes be so evil.

To know why, we will check every percentage value and determine which element and property it’s relative to.

_top_ property is relative to ***.slider***’s height which is exactly what we want, while margin-top is relative to ***.slider__next***’s element and again it’s what we want, but it’s relative to its width, not its height.

This would work perfectly if the ***.slider__next*** height was same as the width, but how we can fix this?

![spiderman meme](/img/css-percentage-unit-the-evil-parts/spiderman.jpeg)
<center>*source: https://memegenerator.net*</center>

### I introduce to you the ultimate solution, say welcome to the superhero transform.

The *transform* property is very powerful as it can be relative to the width or height of the element itself, so there’s no need for the trick where we select the first-child element. It can work perfectly for both vertical and horizontal alignment, without mention, it’s better in performance too.

In fact, there are sometimes when there’s no child element in the parent container, so again, the first child trick won’t work at all.

This why I called it **the ultimate solution**. Because it will work in every situation.

Replacing the previous code with this snippet.

```css
/* step 3.2 */
.slider__next {
  position: absolute;
  right: 0;
  /* relative to the parent's (.slider) height */
  top: 50%;
  /* relative to the element's height */
  transform: translateY(-50%);
}

/* .slider__next > *:first-child {
  margin-top: -50%; 
} */
```

![slider 3.2a](/img/css-percentage-unit-the-evil-parts/carousel_07.png)

There’s still a little problem here. When hovering over the next arrow, it will be misplaced.

![slider 3.2b](/img/css-percentage-unit-the-evil-parts/carousel_08.png)

So we have to add translateX to ***.slider__next:hover*** state too.

## Step 4: Align slider controller prev button

The final step is to align ***.slider__prev***, it will be exactly as ***.slider__next*** except it will be on the left.

```css
/* step 3.2 */
.slider__prev,
.slider__next {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.slider__prev {
  left: 0;
}

.slider__next {
  right: 0;
}

.slider__prev:hover {
  transform: translateX(-10px) translateY(-50%);
}

.slider__next:hover {
  transform: translateX(10px) translateY(-50%);
}
```

🎉🎉 Congratulations! You have become a true CSS spider.

![slide 4.1](/img/css-percentage-unit-the-evil-parts/carousel_09.png)

## Conclusion

I hope this example helps you get a better understanding of how CSS percentage unit works and when it will be relative to the element itself and which property it will be relative to.

I also hinted at very important topics like CSS Specificity, Box-modal, and BEM naming conventions.

The **percentage** unit is very powerful if you know exactly how to manipulate it in your favor.

Thank you for reading, Happy coding!

## References

* https://www.w3.org/Style/Examples/007/center.en.html
* https://www.impressivewebs.com/vertical-percentages-css
* https://developer.mozilla.org/en-US/docs/Web/CSS/length