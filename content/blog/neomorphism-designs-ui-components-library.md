---
title: Neomorphism designs, UI components library
date: 2020-01-25T21:00:00.000Z
slug: neomorphism-designs-ui-components-library
---

Every while a new design trend arise and became the dominator of the shape of the period. Recently, the neomorphic design style becoming very [trending](https://dribbble.com/tags/neomorphism) and is gaining more and more popularity.

## The Neomorphism Design

You can form this effect, by adding two shadows to your flat-designed elements, one is a light shadow from the top left of the element, and the other is a dark shadow towards the bottom right. the combination of both creates the effect of the elements pushing themselves through your display.

You can read more about how to apply this technic in-depth here: [Design trends: Neomorphic design](https://medium.com/@s.jagoori/design-trends-neumorphism-59a9ba9d9284).


![Neomorphism design components](https://thepracticaldev.s3.amazonaws.com/i/nbe6xriuh9t2qlc7kkhd.png)

The first time I saw this design concept, I immediately loved it. I started to apply it to some basic web components; buttons, inputs, etc..

Then I had an idea, why not create a full set of UI components based on this concept.

I reviewed the most famous frameworks and components libraries structure and concepts, to design the structure I will follow. In the end, I summed up to:

* Each component will have five sizes (xs, sm, md, lg, xl).
* Components size will depend on its font-size only; when change the component's `font-size` property, its width, height, margin, and padding will be changed respectively because they all are in `em` unit.
* The grid will have also five media breaking points (xs, sm, md, lg, xl).
* Shadows depth will have five levels, in addition to two shadows style emboss and deboss.
* Classes naming conventions will be a modified version of [SUIT naming convention](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)
* The components are written in [Stylus](http://stylus-lang.com/) because it's the best 🤪🤪.

After TWO days of hard work 🤓🤓, and lots of potions coffee. I want to introduce [Neomorphism, UI components library](https://ismail9k.com/neomorphism). (creative name, right? 🤷‍♂️🤷‍♂️)

{% github ismail9k/neomorphism no-readme %}

## Final words

This project very far from completion, it still work-in-progress. I plan to include more components, and support dark-theme too, and maybe in the future expose it as React/Vuejs components. I just wanted to share it as early as possible, to gather feedback, and maybe to force myself, to dedicate more time to work on it 😭😭. Thank you for reading.
