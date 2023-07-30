---
title: "Tailwind CSS: An Unpopular Opinion on Why It's Not My Cup of Tea"
date: 2023-07-30T00:00:00.000Z
slug: tailwind-css-an-unpopular-opinion-on-why-it-s-not-my-cup-of-tea
---

Like everything, there are people who support and oppose certain things. For example, sushi may be someone's favorite food, while others can't stand its smell.

Tailwind is no exception; some developers love using it, while others do not. Although it is well-supported by a large community, I personally prefer not to use it in my upcoming projects. In this article, I will represent the "NO" camp and share my thoughts on why.

<!--more-->

## TLDR;

Despite Tailwind CSS's popularity, it has issues like complex maintainability, reduced readability, overuse of utility classes, and limited customizability. It complicates version control, disrupts traditional coding separation, and could make projects overly dependent on it. As CSS continues to evolve and become more efficient, the value of utility-based CSS frameworks like Tailwind could diminish.

## Maintainability

First, my concerns about Tailwind CSS are related to maintainability. Tailwind encourages the use of utility classes directly in your markup, which can lead to an incredibly cluttered HTML structure. Although utility classes can be very powerful, they can create a spaghetti-like effect when used extensively. This can create significant readability and maintainability issues, especially with more extensive projects.

Essentially, this approach makes your markup include the presentation layer again, resulting in a messy and unstructured codebase. This means you have redundant CSS that you never want to change, and you have to endlessly tweak the markup to get things looking right. You may be building a library of components, but it will just result in endlessly repeated markup.

Furthermore, Tailwind's approach can significantly increase the size of the codebase, impacting the load time of web pages. Although we have PurgeCSS, which can remove unused styles, it has its own challenges. Implementing it effectively can be a complex task and can create additional maintenance burdens.

## Readability

Reading a series of classes sequentially can be a tedious task, especially when there are multiple media queries containing different values. It can be difficult to determine which value applies to which screen. This is especially true when multiple developers are contributing to the codebase and do not follow a consistent order when sorting the classes.

It would be helpful to have a tool that enforces class order, such as the [**stylelint-order**](https://github.com/hudochenkov/stylelint-order) plugin for CSS.

![snippet-of-newly-created-nextjs-project](/img/tailwind-css-an-unpopular-opinion-on-why-it-s-not-my-cup-of-tea/snippet-of-newly-created-nextjs.png)

<center><small>A screenshot from a newly created Nextjs project</small></center>

Additionally, if you use a well-structured markup and follow one of the CSS naming conventions like [SUIT](https://suitcss.github.io/), [BEM](https://getbem.com/), or others, you can easily understand the HTML markup you are reading. Considering the given example below, there is a list with several items, and the `.card__title` is a child of the `.card` component.

While of used a bunch of styling classes that do not have any semantic meaning. It would be hard decrypting the meaning of this puzzle!

```html
<div class="list">
  <div class="list__item">
    ...
  </div>
  <div class="list__item">
    <div class="card">
      <h2 class="card__title">Awesome</h2>
    </div>
  </div>
  <div class="list__item">
    ...
  </div>
</div>
```

## Separation of Concerns

Next is the age-old principle of separation of concerns. Tailwind muddles the boundary between styling and markup. Traditionally, we separate HTML (structure), CSS (presentation), and JavaScript (behavior) to create more manageable, understandable codebases. But with Tailwind, the HTML gets polluted with styling information, which not only makes the HTML harder to read but also breaks this principle.

To be clear, there's nothing wrong with bending or breaking principles if it serves your specific use case better, we have now CSS-in-JS and HTML-in-JS. but this doesn't seem to be a popular opinion when using Tailwind CSS. This departure from the conventional methodology can be a point of friction for developers who prefer keeping things separated.

## Utility Classes

Utility classes are useful for web design, but Tailwind overuses them. Utility classes should be helper classes used in specific and limited situations where they are needed, not the default dominant approach. For me I would consider using Tailwind if it were presented as a set of utility classes that can be added on top of a perfectly working app. Similar to the [Underscore.js](https://underscorejs.org/) library, which provides functions that can be used to make things easier and faster.

## Cascading and Modifiers

Tailwind make it difficult to take advantage of one of the main benefits of Cascading Style Sheets (CSS), which is its ability to cascade.

For example, imagine you have a navbar that changes its style when scrolling. With CSS, you can simply add the class `.navbar--scrolling`, which will change the style of the navbar and its children.

However, achieving the same effect using Tailwind requires conditionally adding/removing classes for both the navbar and each of its children.

Tailwind does not make it easy to switch between multiple themes. If you want to implement different color schemes or themes, you have to define classes for each theme. This can be a tedious and time-consuming process, especially for larger projects with many themes.

## Tailwind’s @Apply

According to Tailwind documentation, if there are too many classes or reusable classes, it is recommended to use @apply. 

Creating reusable classes is the best way to solve the mentioned above problems with Tailwind. However, could we achieve the same functionality with better readability by simply using plain CSS or preprocessors?

```css
.btn-primary {
  @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
}
```

I aware that Tailwind can create a similar layout by using even spacing values and font sizes, so developers don't have to memorize padding, margins, etc. values for the entire website. However, This would be a valid point if we didn't already have CSS variables or preprocessors that solved this issue before Tailwind was created.

## Limited Customizability

Another point to consider when discussing Tailwind CSS is its limitation on customizability. While Tailwind prides itself on being highly customizable, the truth is that this flexibility is largely confined to the configuration file. Yes, you can customize your color palette, typography, and spacing scales, but any custom styles outside of these presets involve manually writing CSS. This could negate the utility-first approach, especially if you're working on a design-heavy project that requires unique, non-reusable styles.

## Learning Curve

Despite being touted as a simpler alternative to traditional CSS, Tailwind comes with its own learning curve. You need to familiarize yourself with its utility classes and syntax, which can take time and effort. Moreover, since it's a low-level utility-first framework, there can be a steep learning curve for developers who are more accustomed to semantic CSS.

Also, its extensive list of utility classes can be overwhelming for beginners. While it offers flexibility, it also demands that you know what you're doing. Hence, mistakes can be costly in terms of time and effort.

Moreover, if you or your team have already invested a lot in learning and getting proficient with CSS, adding Tailwind to the stack might seem like unnecessary overhead.

## Increased Complexity in Version Control

When multiple developers are working on a project, conflicts are bound to arise. With Tailwind's approach of putting styling within HTML tags, it increases the complexity of managing these conflicts. The HTML structure could potentially change every time there's a visual change. Compare this to traditional CSS where markup and styles are separate; conflicts tend to be less complicated and more manageable.

## Misleading for Newcomers

Many newer web developers have turned to using Tailwind as their go-to CSS framework, which has become a popular trend in the web development community. However, many individuals endorse it without fully understanding the underlying principles of CSS, such as cascading and specificity.

Although this cannot be directly considered a problem with Tailwind, it should be mentioned.

## Dependency and Future Proofing

Lastly, the use of Tailwind CSS makes a project heavily dependent on it. If Tailwind becomes deprecated or the community moves to a new favorite, transitioning could be a complex and time-consuming process. While no library or framework can guarantee perpetual support, the risk associated with this kind of tight coupling is something to consider.

## Final thoughts

It's also important to remember that CSS, as a language, continues to evolve and adapt. CSS Houdini is on the horizon, with the potential to make many of the arguments for Tailwind redundant. The premise of utility-based CSS loses ground when CSS itself becomes more powerful and efficient.

I don't discourage anyone from using Tailwind if it suits their needs, it's worth noting that every solution has its pros and cons. While Tailwind may provide solutions for some developers and offer a different development experience, there are also challenges you may face. In this overview, I've aimed to provide you with an idea of these challenges so that you can be prepared and choose your tools wisely.