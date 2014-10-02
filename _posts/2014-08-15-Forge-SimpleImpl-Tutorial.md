---
layout:     post
title:      Forge SimpleImpl Tutorial (1.7.x)
excerpt:    "A tutorial on using the FML for Minecraft 1.7.x Netty implementation of SimpleNetworkWrapper"
date:       2014-08-15 21:43:42
categories: [tutorials, minecraft]
comments:   true
---

<section id="table-of-contents" class="toc">
  <header>
    <h3>Overview</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section><!-- /#table-of-contents -->

Forge Mod Loader or FML has multiple ways for handling packets, some are not recommended such as [this][netty_tutorial] and if you can load that page (Sometimes the MinecraftForge wiki is down) CPW has kindly left a large notice saying that that method **WILL** result in a memory leak. CPW there also suggested that we use the SimpleNetworkWrapper that has been out for a while.

### What is it?

FML's SimpleNetworkWrapper is a basic method of creating a message based system though it does have it's downsides such as not being able to have a common packet handler and therefore needing a packet handler for each message to be sent.

### Creating the Channel

To create a channel that your mod uses for the communication between your mod on the clients and the server you use the following snippet where SimpleNetworkWrapper is located at ```cpw.mods.fml.common.network.simpleimpl.SimpleNetworkWrapper```

{% highlight java %}
public static final SimpleNetworkWrapper INSTANCE = NetworkRegistry.INSTANCE.newSimpleChannel("modid_or_channel_name");
{% endhighlight %}

### Writing the Message

Writing a message for Netty is a relatively painless process that can be assisted in terms of IDE templates but you should understand what it is.

Each message _has_ to implement ```cpw.mods.fml.common.network.simpleimpl.IMessage``` so that the SimpleNetworkWrapper can know how to encode and decode your message.

There is also the secondary requirement for all messages, an ```IMessageHandler<REQ, REPLY>``` which is recommended to either have as an entirely separate class, or as an inner class of the ```IMessage``` to keep the code within the same place.

An example message can be shown as follows.

{% highlight java %}
import cpw.mods.fml.common.network.simpleimpl.*;
import io.netty.buffer.ByteBuf;

public class SampleMessage implements IMessage {
    /**
     * This is needed for netty to decode the message
     * because the message is not created via a custom
     * constructor but via new {Message}.fromBytes(buf)
     */
    public SampleMessage() {
    }

    /**
     * This is to read your bytes when receiving the packet.
     */
    @Override
    public void fromBytes(ByteBuf buf) {
    }

    /**
     * This is to write your bytes when sending the packet.
     */
    @Override
    public void toBytes(ByteBuf buf) {
    }

    /**
     * This is the handler for the class, allowing access to all
     * the functions and variables.
     */
    public static class Handler implements IMessageHandler<SampleMessage, IMessage> {
        /**
         * This gets called when the packet is read and received.
         */
        @Override
        public IMessage onMessage(SampleMessage message, MessageContext ctx) {
            return null;
        }
    }
}
{% endhighlight %}

As you can see, this is only a boilerplate class and effectively does nothing on sending and receiving the packet but can be easily expanded by adding parameters and the functionality to the ```fromBytes(ByteBuf)``` and ```toBytes(ByteBuf)``` functions.

### Adding Functionality

For this example we will make this ```IMessage``` send a random integer to the server and then reply back to the client with what the integer was.

So, for this example we will obviously need a field of what our random integer was and a method to generate it which we will be doing in the constructor using [java.util.Random][java.util.random] and stored in a variable called ```value```.

So, we end up changing a small part of the class to be:

{% highlight java %}
private int value;

public SampleMessage() {
    this.value = new Random().nextInt();
}
{% endhighlight %}

This does the generation of the value that we will send to the server, but this is not enough to send this packet to the server and then have it work, since we have not wrote and read it from the bytes sent to the server.

To do this, we need to add some functionality to the ```fromBytes(ByteBuf)``` and ```toBytes(ByteBuf)``` functions in our SampleMessage.

{% highlight java %}
@Override
public void fromBytes(ByteBuf buf) {
    this.value = buf.readInt();
}

@Override
public void toBytes(ByteBuf buf) {
    buf.writeInt(this.value);
}
{% endhighlight %}

Now that we have that done this, when we send the packet to the server it will know what we said the random number would be. All we now have to do is handle the packet and register it.

### Handling the packet

In the example in the [above](#writing-the-message) we use the Handler inner class to handle that specific message so what we will be doing is using it to add a new ```ChatComponentText``` to the player's chat so they can see the response (In 1.7.2 you do not need the ChatComponentText, just a string). 

{% highlight java %}
public static class Handler implements IMessageHandler<SampleMessage, IMessage> {
    @Override
    public IMessage onMessage(SampleMessage message, MessageContext ctx) {
        //get the player and add a chat message
        ctx.getServerHandler().playerEntity.addChatComponentMessage(new ChatComponentText("The number that was generated was: " + message.value));
        return null;
    }
}
{% endhighlight %}

Notice how, in the handler, we use message.value but not value in reference to the parent class? this is because the message is not handled in the same instance of the Handler as it was decoded, so it is recommended to make it a inner class so you avoid using the wrong parameter.

Right about now, we are returning null for the ```onMessage``` function, and what the return value for that is a reply message to send back to the client when received.

### Registration and Sending

To be able to send this Message we need to register the message back with the SimpleNetworkWrapper we created in [Creating the Channel](#creating-the-channel) by using the function

{% highlight java %}
INSTANCE.registerMessage(SampleMessage.Handler.class, SampleMessage.class, 0, Side.SERVER);
{% endhighlight %}

To explain the values of ```registerMessage``` it is firstly the _class_ of  the **handler** for the message, then the _class_ of the message itself, a *discriminator* (make it unique for all messages) and then the side the packet gets sent to.

Sending the message is as just as easy as running the sendToServer function on the client.

{% highlight java %}
INSTANCE.sendToServer(new SampleMessage());
{% endhighlight %}

[netty_tutorial]: http://www.minecraftforge.net/wiki/Tutorials/Packet_Handling
[java.util.random]: http://docs.oracle.com/javase/8/docs/api/java/util/Random.html
