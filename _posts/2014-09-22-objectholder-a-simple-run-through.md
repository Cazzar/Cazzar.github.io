---
layout: post
title: "FML ObjectHolder, a Simple Run Through"
categories: [tutorials, fml]
excerpt: We go over how the FML ObjectHolder annotation works.
tags: [tutorials, fml]
date: 2014-09-22T19:10:46+10:00
comments: true
---

Forge Mod Loader has an interesting addition that can be used in the placement of fields in relation to the instances of the Minecraft Items, including the modded items within it's own system.

This system is used within Minecraft when FML is added to manage both the ``net.minecraft.init.Blocks`` and the ``net.minecraft.init.Items`` registries but, we can also use the ``@ObjectHolder(value)`` to our advantage to automatically provide both our own items, and potentially even modded items if they exist without the need for their APIs just to grab blocks and item instances though we may not be able to interact directly with them, it can be useful. And we do not even need to register, it is done automatically!


Why Use This?
=============

When exploring this feature in FML it came to me of the power that could be used to just pull *__any__* object out of the registries and then use that in our systems[^minecraft].

How Do We Use This?
===================

Currently ObjectHolder is a very easy class to use, so there is not too much to document about other than when using ``@cpw.mods.fml.common.registry.GameRegistry.ObjectHolder`` is just to document on what the value() is all about. 

Currently, there are only 3 different usages for the annotation but, for every field, they HAVE to be ``public static final``.

### Class Level
When we assign a value to the class level annotation it becomes the __owner modid__ for the class, and each field is the __block or item name__ that is being looked for.

### Field level
Like when we apply this annotation to the class level, we have to specify a value, for this, it needs to be a *fully qualified*[^itemname] reference to the block.

For example, the value if we want to get the Jukebox block from my mod [Jukebox-Reloaded] we would have a ``value()`` for the annotation to be, ``jukeboxreloaded:jukebox``

For example, the annotation could be
{% highlight java %}
@GameRegistry.ObjectHolder("jukeboxreloaded:jukebox")
public static final Block jukebox = null;
{% endhighlight %}

__Pro-tip:__ The initialization of the field is done so the java compiler does not complain, but it is set by FML in the run-time.
{: .notice}

### Class and Field level

FML is smart to the point, maybe the user does not *want* to code the names of the blocks or items, to be the same names?

Well in this case, we can have the class level annotation defining the modid as previously discussed, but also having the __field__ level annotation, show the *identifier* for the block.

{% highlight java %}
import cpw.mods.fml.common.registry.GameRegistry;

@GameRegistry.ObjectHolder("jukeboxreloaded")
public class JukeboxReloadedBlocks {
	@GameRegistry.ObjectHolder("jukebox")
	public static final Block someOtherName = null;
}
{% endhighlight %}

As you can see here, it can be hugely dynamic, and it even keeps up to date for any aliases[^alias-tut] that are placed on any blocks or items in the GameRegistry for Minecraft

How Can This be Useful?
=======================

Most mod APIs supply a method of linking to their Blocks and items, but it is commonly said, in the JVM, reflection is relatively slow, and many proprietary mods, provide a reflection based API. But here, we can drop those APIs if we are using __just__ the blocks.

[^minecraft]: Though, it is possible using the FML system, it is not recommended that you use the ``@OjbectHolder`` annotation to look up vanilla blocks or items, since they are easily accessible from the respective classes in ``net.minecraft.init``
[^itemname]: in the format of *modid:name*
[^alias-tut]: To be covered in a later date (once I work this out).

[Jukebox-Reloaded]: /mods/Jukebox-Reloaded/
