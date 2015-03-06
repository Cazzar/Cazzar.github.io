---
layout: post
title: "FML SimpleImpl and Bukkit"
modified:
categories: tutorials fml bukkit
excerpt: A discussion on FML's SimpleImpl for 1.7+ and how it is encoded.
comments: true
tags: [fml, bukkit, forge, networking, simpleimpl]
image:
  feature:
date: 2015-03-01T21:34:53+11:00
---

So, recently I have been looking at how Vanilla Minecraft's networking can interact with other things such as bukkit, so I ended up writing a small bukkit plugin and running a bukkit 1.7.10 server to see what the outcomes of the byte packet using a dummy packet.

When you look at the raw data, when knowing how it is sent and all details, the data is fairly simple. Given that one thing requiring the registration with FML's Simple Network Handler, which I have explained in other tutorials it turns out to be fairly straight forward.

#The general layout.

Firstly, what you will see at byte 0 (the first byte) is, when you have looked through the data packets, is the discriminator, what this is, is the internal id for the FML packet, if you were writing to the server, this is required to be sent to the client, unless they are being intercepted before that is even being read.

#And, well the rest of the data.
Well, you could probably guess that, the rest of the data is, what you would expect, the data sent via the serialization to the byte stream.

This, I cannot explain much more than it is what was written to the data, since, it is developer controlled, but it should be relatively predictable by the conditions for the FML packet
