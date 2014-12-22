---
layout: post
title: "My Thoughts on the Minecraft 1.8 Update"
modified:
categories: [blog, minecraft, mc1.8]
excerpt: Just my ramblings about the Minecraft 1.8 update and what it can mean to the modders.
comments: false
tags: [blog, Minecraft, mc1.8]
image:
  feature:
date: 2014-12-23T01:47:02+11:00
---

__Disclaimer:__ This is not guaranteed to be 100% accurate about the right-way to do things, this is just from personal experience.
{: .notice}

Well, I know I am not the most experienced person out there, but, usually when I look at exposing my own opinion, I don't entirely do it just on a whim.
Recently, for those who watch my [GitHub](https://github.com/cazzar/) you would have noticed that, I have currently been slowly working on a 1.8 update for JukeboxReloaded and CazzarCoreLib.

So, while working on these updates, I have managed to discover a few things with Minecraft 1.8's updates, and I have some speculations on how Mojang[^mojang] may be planning this, so-called modding API.

What is it for developers?
===============

There has been a lot of rumors about the Modding for 1.8 and the scale of the updates that may be needed. Some of which are outright fabrications, Yes, there is the factor that now, for a simple block that can face 1 of 4 directions, you need to have a minimum of 3 JSON files (assuming same model for each facing, just rotated)  but, if you want to change the texture, before, [RainWarrior's PR](https://github.com/MinecraftForge/MinecraftForge/pull/1518) to forge which allows internally baked models, it seemed like it could be an annoying prospect.

Now, for me, personally, the concept of the Block State system, was a nice way to work around the metadata issue when I was originally discussing it with friends who are also modders, but now, looking at it, having to pre-declare the block states, can get messy if you do it all manually[^get-off-your-ass] but, it can be automated, as Wuppy looked into doing for basic blocks.

Also, another annoying thing with the new system, which is just more of an inconvenience then anything else is the issue for, unless you manually hard-code the location of the block models and everything, Minecraft will not know how to render your block[^oneliner].

Where do I think this is going?
==================

Now, if you look at the changes Mojang have done so-far to Minecraft's internals over the last couple of major revisions, there has been quite the rework, firstly internally with UUIDs (which is just changing the string to reference in most cases) the Souns System getting a wrapper over it (since it is still accessible via some methods) which allowed modders to specify their sound files to be added in a nifty local way. While this is all well and good up to here[^personal] when you start getting to the Minecraft 1.8 changes, it isn't so great.

In some cases, such as the block models, it is nice to be able to define custom rendered blocks like they do in the 1.7 or lower ISpecialBlockRenderer classes just declaring them in JSON, it seems that Minecraft is moving towards a very declarative manner of coding. Some people even going to the point of saying it is a modding in a resource-pack sense, or even saying they are coding a plugin API not a modding API.

Final Thoughts
=========

Well, as you may have known this to be a few more things that I end up saying from time to time, even potentially being a run through for a nice (or even essential) Forge/FML feature that I think is not documented well enough (or doesn't get it's rightful attention) I may do more posts about this as well.  This is not a personally high priority to do, since I have university to attend to as well as my jobs elsewhere.


[^mojang]: Yes, they still are a company, just now owned by another.
[^get-off-your-ass]: And if you have a lot to do, I seriously suggest you learn the GSON APIs and create your own, or even write your own code for printing out the valid JSON instead.
[^oneliner]: Yes, it is a simple one line call on the client.
[^personal]: May I remind you that this is my opinion on this?
