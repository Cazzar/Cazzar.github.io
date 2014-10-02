---
layout:     post
title:      "ForgeGradle and Java 8, A Hackers Guide"
date:       2014-09-01 19:51:56
excerpt:     "A small hack guide for getting ForgeGradle to compile for Java 8 and still allowing them to load in older environments"
categories: [tutorials, ForgeGradle]
---

For those who follow my [GitHub] account, you may know of the [ForgeGradle-Scripts] repository that I have been working on with the kind help of [Ntzrmtthihu777] where we have been compiling a series of scripts to facilitate a Minecraft modder's term in the idea of a plug-and-play type system for making a build script allowing but more of that in another post at a later date.

One of the scripts in this system is [7.retrolambda.gradle] which, using a few small hacks\* allow us to use some of the basic Java 8 constructs such as the Lambda, for example:
{% highlight java %}
collection.forEach(System.out::println)
{% endhighlight %}
Within the applications of java, this can allow for a much easier instance of inner-classes since it can implicitly override the [Runnable] class with just call like
{% highlight java %}
new Thread(() -> {
    for (int i = 0; i < 10; i++) {
        System.out.println("Running! " + i);
        Thread.sleep(1000);
    }
}).run();
{% endhighlight %}

As you can see, there is no need for even typing runnable as the Java compiler will automatically work out what is needed for these lambda functions and it will pass as a runnable to the Thread constructor.

So, how do we use this in ForgeGradle?
=======================================

To use this in ForgeGradle we would initially think that just setting:
{% highlight groovy %}
tasks.withType(JavaCompile) {
    sourceCompatibility = "1.8"
    targetCompatibility = "1.8"
}
{% endhighlight %}
Which, in any case outside of ForgeGradle is enough to say to Gradle anyway that we are targeting Java SE 8 byte code. Whereas in the case of FML, it has inner dependencies of ASM 4.0.1 and the earliest release to have Java 8 support in ASM is version 5.0.0.  

So, do we just add in the dependencies to look at ``mavenCentral()`` and then apply our own dependency of ``compile 'org.ow2.asm:asm-debug-all:5.0.3'``? Well, that is part of the solution, because another part of this hack, as I am calling it, also has a prioritization to the factor of compatibility, since when we end up running the ``gradle build`` and grabbing the generated jar files, it will not load in Minecraft, why? Well, to put it simply, ASM 4.0.1 as FML uses, does not understand it!

Getting it to work
------------------
After a lot of research I have found a nifty tool called [Retrolambda] and a gradle plugin for it, [Gradle-Retrolambda] after a bit of tinkering around with the plugin I have determined how to properly use this plugin when using ForgeGradle.

So, to get this working, with ForgeGradle, as explained in the [Gradle Retrolambda][Gradle-Retrolambda] github page, we need to add ``'me.tatarka:gradle-retrolambda:2.2.3'`` to the buildscript __classpath__ and then, after the ``apply plugin: 'forge'`` we need to add yet another plugin to be applied, ``retrolambda``.

There are some more. Advanced configuration that you can do when applying the plugin which is documented at the GitHub page and it also assumes the __*JAVA6_HOME*__, __*JAVA7_HOME*__ and __*JAVA8_HOME*__ environment variables exist (you only need __1__ of 6 OR 7) pointing towards a valid JDK install.


[Ntzrmtthihu777]: https://github.com/ntzrmtthihu777
[GitHub]: https://github.com/cazzar
[ForgeGradle-Scripts]: https://github.com/cazzar/ForgeGradle-Scripts
[7.retrolambda.gradle]: https://github.com/cazzar/ForgeGradle-Scripts/blob/master/gradle/7.retrolambda.gradle
[Runnable]: http://docs.oracle.com/javase/8/docs/api/java/lang/Runnable.html
[Retrolambda]: https://github.com/orfjackal/retrolambda
[Gradle-Retrolambda]: https://github.com/evant/gradle-retrolambda
