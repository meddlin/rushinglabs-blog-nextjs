---
date: "2021-03-30"
title: "Document Like You Mean It"
---

_Document like you want to use it--**because you will**_


Documentation was the first problem jumping out at me on my first software engineering job. There wasn't really a lack of it. However, most of the team docs hadn't been updated in several years. So they were outdated for new hires, and forgotten by people who had memorized the chunks they needed. 

When I tried to raise this to team leaders the response was one of two...

- “We can have so much documentation we drown!”
- Or, “...but we can write so little we starve!”

But for each of these, if your documentation system is broken, why do you keep using it?
- _Are you still running Windows NT?_
- _Are you still peering over flat files or have you moved to SQL?_
- _If waterfall didn’t work for you, did you try any of the Agile-variants?_

The problem jumped out at me because I was making this transition from academics to “production”, yet how we found the answers to our problems seemed to be stuck in the “academics” flavor.

Hey, do you know how to [x]?—yes, now memorize that process.
Where did we write down [y]?—oh, that’s over here...so-and-so has a book on it.

## Why?

Because stuff will happen.

You'll find that one link, explaining _that one thing_, and it drives you to _write it down real quick_. You'll go on that two day debugging spree hunting a single elusive bug. Is there a proprietary language at use in your org? _Perfect._ Or did you finally gain understanding of that over-engineered monolith or the sprawling service-oriented system? _Even better._

Each of these situations still don't cover the dozens of cases of "logic creep". Those pesky areas where business logic causes software design to take the strangest turns. And the mud stays because the domain doesn't change.

This stuff happens. And no amount of Agile processes, flat structure, project managers, whiteboards, or collaboration will fix it. 

You have to just make notes and know.

## Dynamic Documentation

Good documentation can lead to a creation process that's much more than just transactional writing. Think of your audience: they're busy, they are frustrated, they feel lost, _they're busy_. This means if there is a way to communicate your point quicker, more succinctly, then _use it._ Documentation doesn't have to remain dry prose, and likely shouldn't, if you want it to provide value for years or decades.

- Draw a diagram
- Include screenshots
- Copy/paste code blocks
- Link to videos

- Tools: Make use of things like MDX
[https://mdxjs.com/getting-started/](https://mdxjs.com/getting-started/)

- Tools: GitHub adds support for automatically creating a table contents directly in `README.md` files [https://twitter.com/github/status/1376636651963842562](https://twitter.com/github/status/1376636651963842562)

- Tools: Draw.io has been invaluable for delivering complex ideas efficiently [Draw.io](https://app.diagrams.net/)

Incorporate all of these together to create documentation that will actually be read.

## Re-use your tools

- Practice of decorating comments with `TODO : ` a "commenting convention" (okay, bad name)

- This could also fall in line with a broader suggestion for following design principles: clear design -> clear communication -> makes for clear documentation

## Search is a lifeline

You will need search. It's inevitable. Treat it like a mandatory feature.

Stopping to think about the basics, this point can seem redundant or almost self-explanatory: as you document, your documents will grow, things get hard to find. However, the pain associated with this almost never seems self-explanatory.

<img src="https://meddlin-web.s3.us-east-2.amazonaws.com/post_document-like-its-your-job/maksym-kaharlytskyi-small-unsplash.jpg" />

## Make it quick

Documenting something--_anything_--should be a quick process. As pain free as possible. Think of how e-commerce sites attempt to remove friction from their design--it leads to completed sales. Documentation tools should follow a similar rule.

With the exception that incorporating more dynamic pieces in your documentation will increase authoring time


## Lasting thoughts?

Documenting isn't simply writing down the technical minutiae of the job. It's a field manual. A technical reference. A picture book of forensic adventures. It may even contain tales from [the Old Guard](https://randsinrepose.com/archives/the-old-guard/).

If your documentation is used by your team(s), incredible value will find its way onto the pages. The first step may be to start with the literal source code written.

> "Such a principle is not saying that code is the only documentation. Although I've often heard this said of Extreme Programming - I've never heard the leaders of the Extreme Programming movement say this. Usually there is a need for further documentation to act as a supplement to the code."

_From ["Code as Documentation"](https://martinfowler.com/bliki/CodeAsDocumentation.html) - Martin Fowler_

_It will become a water well your team can return to._



### Credits

- wall of drawers: Photo by <a href="https://unsplash.com/@jankolar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jan Antonin Kolar</a> on <a href="https://unsplash.com/s/photos/file-cabinet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>


- open file drawer: Photo by <a href="https://unsplash.com/@qwitka?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Maksym Kaharlytskyi</a> on <a href="https://unsplash.com/s/photos/file-cabinet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  