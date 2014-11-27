---
layout: post
title: "Optional Annotations, the Usages"
modified:
categories: [tutorials, fml] 
excerpt: FML's @Optional annotation set, how it works and some of the idea's behind it.
tags: [fml, tutorials, minecraft, Optional]
comments: true
date: 2014-09-25T12:51:07+10:00
---

Forge Mod Loader has a heavy annotation based system, and when looking to do optional mod dependency, it can be a relatively tricky thing, enabling certain features __only__ when the mod we want 
to add it for is loaded, for example having support for the great[^opinion] Open Source computer mod, [OpenComputers]!

__Notice:__ OpenComputer's API will be heavily used throughout this tutorial/reference
{: .notice}


The Applications
================

Let's say we have this idea for a nice technology mod and we then want to add the functionality of implementing some Interface only when a mod is loaded, and maybe strip out some of it's functions within itself if the mod is not loaded.

For this, as you have guessed there is the ``@Optional.Method`` or the ``@Optional.Interface``/``@Optional.InterfaceList`` to help solve our issues. Though, I have not used it in the case of Scala, I will be able to explain, what I understand of it to you.


@Optional.Method
================

Using this, is relatively simple understanding that you know some of it's constraints which are as follows:

 1. References to the function __*will not*__ be stripped if the function is.
 2. The function and it's existence will not be true unless the Forge Mod Loader has loaded that mod as well as yours

Understanding these constraints within the system, we can work around the first one using FML's ``Loader.isModLoaded(modname)`` wrapping those around various function references, tough looking at that type of code can be quite messy.

An example of the annotation used with ``@Optional.Method`` can be as follows[^ocref]:

{% highlight java %}
@Optional.Method(modid = "OpenComputers")
@Callback
public Object[] fancyFunction(Context context, Arguments args) {
    doSomethingFancy();
    return null;
}
{% endhighlight %}

Most of this method (the parameters and return type) can be ignored safely due to the factor of the API we are using in this system.

But, to explain how the ``@Optional.Method(modid = "OpenComputers")`` annotation is working, as you can see, we are passing the modid *constant*[^annotations] to the annotation, and what this does, when the class is loading, the method is stripped out via magic&trade;[^asm].

@Optional.Interface and @Optional.InterfaceList
===============================================

For this, we are combining the explanation of the two Interface bases annotations to explain them simply, since ``InterfaceList`` is just an array of ``Interface``.

With ``@Optional.Interface`` it comes with the same caveats as ``@Optional.Method`` but, in a slightly different way.

 1. Casting of the instances of the class to that said interface __*will*__ cause a ``ClassCastException`` at run time (if the class is in the class path) or even a ``ClassNotFoundExeption``
 2. The interface and all references (optional) will be stripped from the class.

Yet again, this can be worked around with the ``Loader.isModLoaded(modname)`` function.

One example, of the annotation can be seen as follows[^ocref]:

{% highlight java %}
@Optional.Interface(iface = "li.cil.oc.api.network.SimpleComponent", modid = "OpenComputers")
public class TileFancy extends TileEntity implements IInventory, SimpleComponent {}
{% endhighlight %}

As you can see we are yet passing the modid of the mod that implements the interface we remove, though because of how Java annotations work (We cannot annotate a single implements) we have to specify the full canonical name of the class we want in the ``iface`` parameter. Where this interface supplied (in this case, SimpleComponent) is removed by magic&trade;[^asm].

Using the ``InterfaceList`` annotation is simple enough after understanding the ``Interface`` basics.

When Using the ``InterfaceList`` we can simply wrap the ``@Optional.Interface(...)`` with this annotation and an array declaration like[^ocref]:

{% highlight java %}
@Optional.InterfaceList({
    @Optional.Interface(iface = "li.cil.oc.api.network.SimpleComponent", modid = "OpenComputers"),
    ...
})
{% endhighlight %}

Comments
========

This can be useful when using external APIs, allowing you to exclude unneeded API files when possible, dropping them if the mod is not there. But due to time constraints on when I was writing this, if there is anything unclear comment below (the comments should work) and I shall clarify more for you.

[OpenComputers]: http://oc.cil.li
[^opinion]: This is my blog, so I can have __my__ own opinion
[^ocref]: Remember, we are referencing OpenComputers here.
[^asm]: Actually, it is ASM.
[^annotations]: We cannot use dynamic values due to a restriction on the Java Language.
