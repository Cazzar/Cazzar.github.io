---
layout: post
title: A Simple Discord Setup Guide
date: 2015-12-30T20:28:48+11:00
modified:
categories: 
excerpt: A guide to setting up Discord from beginner, to regular user.
comments: true
tags: []
image:
  feature:
---

Recently, I have used [Discord] over TeamSpeak as a VoIP application for the past few days, which even though it is in its early stage of development, I find it quite nice.Though, due to it being so new, and to some being a new concept, that being, able to chat without the need of a desktop client, for the group I am using Discord which I have decided to write-up this, Firstly, so I can actually have some more content on here as well as helping introduce this system to others. Though the adoption rate seems quite quick.

On to the general tutorial on how I would normally set up [Discord].

<section id="table-of-contents" class="toc">
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section><!-- /#table-of-contents -->

## Getting there.

To begin we have need to get an invite to the [Discord] "server" which is essentially like a Steam group, which you need an invite URL to get, this will usually be in the form of `discord.gg/key`[^revoked] entering it into your browser, will bring you up to ![When invited](/images/discord/when-invited.png)
With this, if you only want to temporarily join the Discord server, you can assign yourself a name, and immediately join from that.

Though, due to the prospect of you being a regular to this [Discord] server, we are going to continue there.

## Basic User Interface


When you join a [Discord] server for your first time it shows you a UI with a few basic tutorial hints, and if you have not joined from a signed-in account, a prompt to claim your account. ![Basic UI](/images/discord/internal-tutorial.png) This here shows the tutorial, started up, with the "_voice control panel_" selected to start with.
I recommended for a first time user to follow the little orange interest points, clicking them to follow the tutorials provided by the [Discord] team. Which will help you get a basic idea on the for the UI and how it works.

### Claiming an account.


Up the top, an obvious banner appears that prompts you to claim your account and therefore claim your username. This enables you to in future log into Discord and re-connect to the server and instantly be reconnected to the chat and/or voice channels of the servers that you connect to.

![Claim Account](/images/discord/claim-account-details.png)
As shown here is what happens when you click the claim account. You can then fill out the email information, as well as your preferred password which will cause you to get the generic "Verify your email" prompt.

## Applications.
__Notice:__ An account is __required__ for usage of the applications.
{: .notice}

When you start actively using [Discord] it becomes a bit of a hassle if you want to use Push-To-Talk (I recommend doing so especially in noisy backgrounds, how to do this will be later in the tutorial.) Having the ability to use this app with a higher audio quality[^audio-qual] is a benefit, as well as the system wide push to talk creates a must-goto as a regular user.

![Download Apps](/images/discord/download-client.png)
 
As of the time of writing and the Linux client does not exist though it may have arrived when you are reading.
Regardless of availability. Next, is obviously downloading and installing of the relative client for your computer. Once installed, and logged in you get presented a familiar UI
 
### Settings
 
Now that we have the Desktop application and it is likely going to run in the background on a regular basis, it would be an idea to set up how the notifications display with your client, as well as some various other settings, just so it caters to your style.
 
First, if you followed the tutorial you would already know where the user settings is, though for references sake, here is an image;
 
![User Settings Location](/images/discord/user-settings-location.png)
 
Once we are in here, it would be best to go though the basic settings that I recommend with though, don't be afraid to look through the other tabs within the settings.

One thing that I recommended is within `voice` setting the `input mode` as `Push to Talk` since, especially within the noisier households, voice activation can cause an issue with sometimes randomly activate your microphone if you are not careful about the settings, so I recommend push to talk. If you do decide to use Push To Talk, you will also need to set up a shortcut to activate your microphone which is available next to the setting for selecting `Push to Talk`.

![Push to talk](/images/discord/settings-push-to-talk.png)

After that, there is also the option to change to a dark theme, which I use, though it has not been shown so far, though this option is visible though the `Appearance` option within. the settings.

![Dark theme example](/images/discord/dark-theme-example.png)  

Finally, the notification settings, which as of recent have moved into its own slightly hidden window which you access by clicking the 3 horizontal bars for the server name, and for this, I recommend setting the server notification settings to `only @mentions` so that, if you are on a busy server, or even begin using the mobile application, your phone won't go off constantly, which is annoying when you want to sleep and the server is happily chatting away.

Though, you can also change the channel specific settings below the global settings, which definitely helps especially within the case if you have a channel which you always want alerts for activity, but do not for others.

![Notification settings](/images/discord/settings-notification.png)

## General usage.

Now that we have gone through some of the setup, I would just like to touch on some of the general usage as of the time of writing:

#### Push to talk
When in-game this sometimes requires running [Discord] as an administrator, because of how games bind to polling the keyboard for input, I have heard the developers for discord are working on a solution for this issue, among many other things.

#### Channels.
There are 2 main types of channels in Discord, voice and text, these unlike in TeamSpeak do not link to others, where TeamSpeak had a server-specific chat and then channel specific chats, this is not the case. You are always in all the text channels you have access to in **all** servers you are a member of, though for voice channels, you can only be in one at a time without the ability to connect to multiple servers' voice channels as well.

#### Disconnecting
This itself, would seem self-explanatory though I have had cases, which initially surprised myself, when I started using [Discord]. The app will willingly minimize to your tray, which I don't mind too much, but when I only want to have my presence in the text channels, I have to explicitly disconnect, which that is found above the user options, to close the application fully right-click the tray icon and select close.

## An Unrelated note.

When there was a discussion on what the icon for Discord is, I weirdly noticed, it was like the current avatar for PinocchioP who is a vocaloid producer which you can find on (YouTube)[https://www.youtube.com/user/pinocchiopchannel] though this can probably be just me noticing similarities where they are not intended.

[Discord]: https://discordapp.com/
[^revoked]: Any of the keys here are invalid and therefore unusable.  
[^audio-qual]: I have had experience of better quality in the Desktop Application versus Google Chrome this might not occur for everyone else using [Discord].