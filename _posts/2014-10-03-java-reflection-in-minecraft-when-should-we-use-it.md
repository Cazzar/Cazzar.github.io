---
layout: post
title: "Java Reflection in Minecraft When Should We Use It?"
modified:
categories: [tutorials, minecraft]
excerpt: Java reflection, where to use it, where we shouldn't use it and how to use it.
comments: true
tags: [tutorials, minecraft]
date: 2014-10-03T01:09:27+10:00
---

So, for those who know java at a higher level understanding than a few people, we would know about a concept in the higher level languages, such as Java, called reflection.

With this concept, excitingly for people, things such as private values are essentially a concept to others, but, it has a lot of caveats, such as it's lack of speed in a lot of stages, such as looking though a class to find a method of field

How it Should be Used
=====================
As was mentioned before, Java when it is searching a class for a field or a method, it is relatively slow as shown [here][cowtowncoder] within the system and in performance critical situations such as on frame render, or even on tick, it can be quite detrimental for the system, and the game for this to be happening.

So, knowing this bit of information, how should the reflection be used? Or, better yet, when should we use it?

### When Should Reflection be Used?

This is one of the easier questions to be answered here, when we should use it. The answer here is quite simple, understanding the more modern alternatives, such as FMLAT, we should only do reflection based interactions in circumstances where speed is not of the essence, such as __*as*__ FML's TickEvent or any of it's Sub-classes nor within your renders, especially when it is done on game frame

### How Should Reflection be Used?

When we are working with reflection, and we know that we are going to access this field or method commonly is to cache, at least the Object that ``Class.getDeclaredField`` or ``Class.getDeclaredMethod`` returns because, out of all that, the getDeclared... methods return the slowest.

Though, due to Security things that Java does in the back end when using reflection, it can cause it to be much slower than a direct call.

What is this FMLAT alternative I have mentioned
===============================================

As I have gone though, I have mentioned FMLAT a few times without touching on much of what it can do. I will not be going over it in depth here, as I may be touching on it later in another tutorial/discussion, but, those who have been around modding for a while, may have heard of FML's CoreMod system and some of the magic they can do with Access Transformers. For those who do not know about Access Transformers, is a method of at run time changing the java access level of fields or methods allowing for native java calls (which is recommended if the calls are on-frame or on-tick events)

With FMLAT it is essentially a *META-INF/MANIFEST.MF* entry inside your jar specifying the name of the __at.cfg__ file to use as your mod's Access Transformer without needing to be a coremod.

[cowtowncoder]: http://www.cowtowncoder.com/blog/archives/2007/02/entry_32.html
