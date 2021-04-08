---
date: "2021-03-30"
title: "Document Like You Mean It"
---

_Document like you want to use it, **because you will**._

When I started working as a software engineer, documentation was the first major problem that jumped out at me. Or rather, the lack of it. Further, most of the team docs hadn't been updated in several years--decades for some of it. So docs were outdated for new hires, and forgotten by people who had memorized the chunks they needed. The rest was delegated to tribal knowledge.

We seemed focused on keeping systems running, but we continued to not look within our own expertise for answers to the problems we faced every week.

The response from team leaders was: _“We can have so much documentation we drown”_. The common retort was, _“...but we write so little we starve.”_ This same problem continued to pop up, at other organization too, albeit with a different look each time.

I fully realize documentation isn't a problem most people want to work on. I've even had some seasoned developers try to convince me they needn't pay attention because "_their code was their documentation_". There are dozens of activities we all perform to keep life moving along smoothly that we don't look forward to. But we do them anyway--not because we're secret masochists--but because the pain of not carrying out such activities urges us to.

Here are a few ideas for how I try to make this one bitter activity a little more fruitful.

## Why Document?

_**Why even attempt this?**_

Because stuff will happen.

You'll find that one link, explaining _that one thing_, and it drives you to _write it down real quick_. You'll go on that two day debugging spree hunting a single elusive bug. Is there a proprietary language at use in your org? _Perfect._ Or did you finally gain understanding of that over-engineered monolith or the sprawling service-oriented system? _Even better._

Each of these situations still do not cover the dozens of cases of what I like to call "logic creep". Those pesky areas where business logic forces software design to take the strangest turns. It's the reason the code only breaks on every 3rd Tuesday. Or, why C-level execs names were hard-coded in a nightly process. Why those exceptions were coded into those automations that don't make any mathematical, logical, or financial sense. This mud sticks around because the business domain is never precise.

This stuff happens. And no amount of Agile processes, flat structure, project managers, whiteboards, or collaboration will fix it. 

You have to just make notes and know.

## Dynamic Documentation

_**Documentation is often thought of as this dry, utilitarian writing process that is purely technical and nothing more.**_

Boring writing makes for burdensome reading.

Writing documentation can incorporate a creation process that's much more than simply recording steps in a process. Think of your audience: they're busy, they are frustrated, they feel lost..._they're busy_. This means if there is a way to communicate your point quicker, more succinctly, then _use it._ Documentation doesn't have to remain dry prose, and likely shouldn't, if you want it to provide value for years or decades.

- Draw a diagram
- Include screenshots
- Copy/paste code blocks
- Link to videos

- Tools: Make use of things like MDX
[https://mdxjs.com/getting-started/](https://mdxjs.com/getting-started/)

- Tools: GitHub adds support for automatically creating a table contents directly in `README.md` files [https://twitter.com/github/status/1376636651963842562](https://twitter.com/github/status/1376636651963842562)

- Tools: Draw.io has been invaluable for delivering complex ideas efficiently [Draw.io](https://app.diagrams.net/)

Keep in mind, each tool has a place and they come with their own drawbacks too. For example, if you're going to take the time to diagram a system or process it's wise to make sure this isn't something that will change quickly. Just because a tool has a particular draw back doesn't mean it shouldn't be used though.

Incorporate all of these together to create documentation that will actually be read.

## Re-use your tools

_**How to capture everything though?! Code bases grow, decisions are complex, and processes atrophy!**_

Simple, don't. Attempting to write down literally everything necessary for the job is burdensome, and will only create that drowning feeling mentioned earlier. Where it is prohibitively difficult to document something, instead create a process to make finding the appropriate information easier, more direct. Re-use the tools of your craft. Don't document and file away; place the information next to the work to be done.

However, doing this is highly subjective to the work being done _and the people doing it_. For example, while I'm coding sometimes I'll notice how something needs to change or could be better (`TODO`), or I'll decide a complex area needs a special (`NOTE`) comment. Admittedly, I'm able to do this because either I'm working alone, or there is enough autonomy given to the team for these comments to be left behind.

`TODO` search

<img src="https://meddlin-web.s3.us-east-2.amazonaws.com/post_document-like-its-your-job/todo-code-search.jpg" />

_Decorating comments with `TODO : ` to leave specific clues for how to improve the codebase._

`NOTE` search

<img src="https://meddlin-web.s3.us-east-2.amazonaws.com/post_document-like-its-your-job/note-code-search.jpg" />

_Decorating comments with `NOTE : ` to denote a larger, informative comment in the codebase. Arguably easier than searching for "`/*`"._

Arguably, the `TODO` items are ideally better left in a backlog of some sort, but that can be a slow process that breaks developers away from the task at-hand. Also, depending on team/organizational choices in tools and processes, creating backlog items may be cumbersome or locked behind permissions for project managers. It can also be time-consuming to provide a similar level of specificity to the work as just leaving the comment next to the code needing the extra care.

_A brief note on design patterns_

A broader case can be made for creating standardized documentation (and awareness) for the software design patterns common to your applications. A broader discussion can be had here, but the point is this: clear design -> clearly written documents -> clearer communication. This can make it easier (but not "easy") for more developers to have a wider perspective of the system they're working on.

## Search is a lifeline

You will need search. It's inevitable. Treat it like a mandatory feature.

Stopping to think about the basics, this point can seem redundant or almost self-explanatory: as you document, your documents will grow, things get hard to find. However, the pain associated with this almost never seems self-explanatory.

<img src="https://meddlin-web.s3.us-east-2.amazonaws.com/post_document-like-its-your-job/maksym-kaharlytskyi-small-unsplash.jpg" />

Think: search is now a major function of desktop OS's. Android and iOS both now have an app drawer-like functionality to search for apps. Same for cloud file storage, social networks, etc.

## Make it quick

Documenting something--_anything_--should be a quick process. As pain free as possible. Think of how e-commerce sites attempt to remove friction from their design--it leads to completed sales. Documentation tools should follow a similar rule.

With the exception that incorporating more dynamic pieces in your documentation will increase authoring time


## Lasting thoughts?

Documenting isn't simply writing down the technical minutiae of the job. It's a field manual. A technical reference. A picture book of forensic adventures. It may even contain tales from [the Old Guard](https://randsinrepose.com/archives/the-old-guard/).

It's imperative we treat it as such.

Money and time is hemorrhaged for massive, enterprise CMS systems (i.e. Sharepoint, Confluence), and even more so on integrations to other business systems (looking at you...JIRA, Slack, Azure DevOps). All of this working together is great. But they don't make up for a lack of documentation; their value is diminished.

If your documentation is used by your team(s), incredible value will find its way onto the pages. The first step may be to start with the literal source code written.

> "Such a principle is not saying that code is the only documentation. Although I've often heard this said of Extreme Programming - I've never heard the leaders of the Extreme Programming movement say this. Usually there is a need for further documentation to act as a supplement to the code."

_From ["Code as Documentation"](https://martinfowler.com/bliki/CodeAsDocumentation.html) - Martin Fowler_

_It will become a water well your team can return to._



### Credits

- wall of drawers: Photo by <a href="https://unsplash.com/@jankolar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jan Antonin Kolar</a> on <a href="https://unsplash.com/s/photos/file-cabinet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>


- open file drawer: Photo by <a href="https://unsplash.com/@qwitka?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Maksym Kaharlytskyi</a> on <a href="https://unsplash.com/s/photos/file-cabinet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  