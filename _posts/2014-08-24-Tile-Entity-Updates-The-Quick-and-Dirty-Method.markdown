---
layout:     post
title:      "Tile Entity Updates, The Quick and Dirty Method"
date:       2014-08-24 23:13:52
exerpt:     "A quick and dirty hack to allow"
categories: [minecraft, tutorials]
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

Minecraft has the idea of Tile Entities on the client AND also the server, and they usually need to be kept in sync for the client to reliably predict what the server will do under certain circumstances such as GUIs.

### Why do we need them?
There are many reasons for needing the tile entity syncing, such as; Client-Server Prediction and Client-Only logic that depends on server based variables

### How do we do it?
As the title suggests, this is a quick bit of code that will allow for you to sync up your tile entites and all we need to do is add 2 simple functions to our ```TileEntity``` classes.

#### Sending
Firstly we need a ```getDescriptionPacket()``` function which we will set the contents of the packet to be the NBT that we save to disk when the Tile is saved so we would add the code.

{% highlight java %}
@Override
public Packet getDescriptionPacket() {
    NBTTagCompound tag = new NBTTagCompound();
    writeToNBT(tag);
    return new S35PacketUpdateTileEntity(xCoord, yCoord, zCoord, 0, tag);
}
{% endhighlight %}

Where the needed imports (for Minecraft 1.7.10) are:
{% highlight java %}
import net.minecraft.nbt.NBTTagCompound;
import net.minecraft.network.NetworkManager;
import net.minecraft.network.Packet;
import net.minecraft.network.play.server.S35PacketUpdateTileEntity;
{% endhighlight %}

#### Recieving
Now, that we can send the packet (theoretically, it isnt doing anything, _yet_) we need to set up the logic to recieve the packet, also known as ```onDataPacket(NetworkManager, S35PacketUpdateTileEntity)```

{% highlight java %}
@Override
public void onDataPacket(NetworkManager net, S35PacketUpdateTileEntity pkt) {
    readFromNBT(pkt.func_148857_g());
}
{% endhighlight %}
__NOTE:__ func_148857_g may be called getNbtCompound in newer versions.

### Now what?
Now that we have the basic logic, there is one final thing we need to know before all this code will do anything effectively in our code base.

We need to add a notification to the Minecraft Server that the tile has changed and needs an update and to do this, we invoke the ```world.markBlockForUpdate(x, y, z)``` function with the co-ordinates of the Tile Entity in the world.

#### Quick Tip
I tend to add a small helper function to my base tile entities that calls the mark for update function properly by using
{% highlight java %}
public void markForUpdate() {
    worldObj.markForUpdate(xCoord, yCoord, zCoord);
}
{% endhighlight %}

This allows for quick and simple updating without having to remember to call the right params for a little more JVM overhead (terms of picoseconds).

#### Other Notes
You may have realised that this is described as a quick and dirty hack for syncing your minecraft tile entities, there are multiple places such as heavy updating and large amounts of infomration where it would be much more efficant to use a different, more advanced apporoach other than ```S35PacketUpdateTileEntity```
