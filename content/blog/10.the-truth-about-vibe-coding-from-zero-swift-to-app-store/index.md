---
title: "The Truth About Vibe Coding: From Zero Swift to App Store"
date: 2025-04-22
feature: cover.png
description:
  - Recently, I challenged myself to build a complete iOS app, using a programming language I had never written a line of code in, and launch it on the App Store — all in just three days.
  - No preparation, no planning, no prior experience.  
  - Just pure Vibe Coding 🔥.
---

## How It All Started

Recently, I challenged myself to build a **complete iOS app**, using a programming language I had **never written a line of code in**, and launch it on the **App Store — all in just three days**.

No preparation, no planning, no prior experience.  
Just pure **Vibe Coding** 🔥.

In this article, I will share:

- How I built it,
- Whether AI can truly replace engineers,
- And how we, as developers, should prepare for the future.

---

## Choosing the Tools

To push myself outside my comfort zone, I picked **Swift** — a language completely different from what I usually work with (like Flutter or React Native).

The app idea was simple:  
An application that **transforms a child's drawing into an AI-generated artwork**.

For the AI part, I decided to use the **Gemini API**, because it supports **image-to-image generation** — you send a drawing, ask for modifications, and get a beautiful, AI-enhanced result.

I opened **Xcode**, **Cursor**, and **ChatGPT**...

And just started coding.

---

## Vibe Coding in Action

The first thing I did was ask ChatGPT to generate an initial **prompt** for Cursor.  
I pasted it in, crossed my fingers…

And yes, the app started taking shape!

Until… I hit the first real roadblock.  
When trying to process an image, the app crashed. No response from Gemini. No output.

I tried everything:

- Asking Cursor to fix the code,
- Switching models AI model in Cursor to Gemini itself,
- Share the docs link with the AI Agent
- Debugging blindly.
- Try to say: Pleaaase work!

After an hour and a half of dead ends, I realized:  
_"Enough playing around."_

I went back to the official documentation, read it carefully (like any Software Engineer would do), wrote the full server logic myself in Node.js to validate it would work and…

Boom! It worked flawlessly.

Once the logic was stable, I told Cursor:

> "Please translate this Node.js logic into Swift."

Within two hours, I had a fully working **MVP**:  
An app that converts kids' drawings into stunning AI-powered artworks.

---

## Pushing to Production

Now that the MVP was ready, I moved full speed ahead:

- Added multiple artistic styles,
- Improved the UI,
- Created a Cloud Function to hide the API key "(I know some basic security procedures, don't I?)",
- Built a Landing Page (or rather, let Cursor build it 😉).

Finally, I submitted the app to the App Store.

**Rejected!**! 😂

Apple sent me a list of required changes.  
Did I read it carefully?

Of course not.

I just fed it to Cursor and said:  
_"Fix these issues for me."_

Resubmitted.  
Rejected again!

(This time for missing a Terms & Conditions link.)

After fixing that manually and adding a few final tweaks,  
**the app was finally approved and went live!**

You can check it here:  [https://www.aidoodles.app/](https://www.aidoodles.app/)

---

## Can Anyone Build an App with AI?

After this experience, let's answer a few burning questions:

**Can anyone use AI to build production-grade apps?**  
**— Absolutely not.**

**Is Vibe Coding just a passing trend?**  
**— Definitely not.**

Vibe Coding is a **powerful tool** — but only in the right hands.

To succeed, you must already be a **skilled developer** who understands:

- When to rely on AI,
- When to intervene manually,
- How to validate and refine the output.

If you lack strong fundamentals, you will quickly hit walls you cannot overcome.

Most studies confirm it too:  
**Senior Developers** benefit from AI coding tools much more than **Juniors**.

If you do not understand the code that AI generates, you cannot trust it — no matter how good it looks at first glance.

---

## The Real Mindset for Vibe Coding

To properly apply Vibe Coding, you need to change your mindset:

- Treat the AI as a **very fast, very junior developer**.
- You are still the **senior engineer** — reviewing, steering, and making the critical decisions.

In practice:

- Never let AI write unchecked code without reviewing every line.
- If something looks suspicious or illogical, **trust your judgment** — not the AI.
- Understand all the code generated.  
  If you don't, don't approve it — no matter how well it "seems" to work.
- Use AI for speeding up routine work, not making fundamental system design decisions.
- Never use AI in a domain where you are not already an expert.

**You must always stay in the driver's seat.**

Otherwise, you are just rolling dice and hoping for the best — not engineering.

Until AI can genuinely replace a senior engineer's depth of understanding (which is still very far away), Vibe Coding should remain a **partnership**:

- **AI accelerates**,  
- **You validate and finalize**.

---

## Final Thoughts

The future belongs to the developers who master the art of **working with AI efficiently and intelligently**.

Those who learn to harness Vibe Coding will become the **9k Developers** companies will fight over.

- Speed without quality is useless.
- The best engineers move **fast**, but also **maintain high standards**.

---

**Thanks for reading.**  
Stay fast, stay sharp.
