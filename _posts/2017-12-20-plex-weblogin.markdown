---
layout: post
title: Plex login method used by PlexAmp
date: 2017-12-20T02:19:00+11:00
modified:
categories: plex
excerpt: A breakdown of the plex login method used by PlexAmp
comments: true
tags: []
image:
  feature:
---

Just a quick writeup on a new authentication method for plex
This is similar to the plex pin/token based authenication.

Plexamp currently logs you in by making you load up your web browser, and then polls the apiv2 method of the pin

## Step 1 ##

First we need to do a HTTP post to `https://plex.tv/api/v2/pins?strong=true`

Required headers:

| Identifier               | Value                  |
|--------------------------|------------------------|
| X-Plex-Client-Identifier | Your Client Identifier |
| Accept                   | MIME type              |

Example:

```bash
curl -H "X-Plex-Client-Identifier: TestClient" -H "Accept: \"application/json\"" -X POST "https://plex.tv/api/v2/pins?strong=true"
```

### Return example ###

```json
{
    "id": 123123123,
    "code": "examplecode",
    "clientIdentifier": "TestClient",
    "location": {
        "code": "AU",
        "country": "Australia",
        "city": "Melbourne",
        "subdivisions": "Victoria",
        "coordinates": "-1.23, 1.23"
    },
    "expiresIn": 1799,
    "createdAt": "2017-12-19T14:20:49.306Z",
    "expiresAt": "2017-12-19T14:50:49.304Z",
    "authToken": null
}
```

## Step 2 ##

Once we have the token, if we direct the client to load up: `https://app.plex.tv/auth#?clientID=TestClient&code=examplecode&context%5Bdevice%5D%5Bproduct%5D=ExampleProduct&context%5Bdevice%5D%5Bplatform%5D=Windows_NT&context%5Bdevice%5D%5BplatformVersion%5D=10.0.16299&context%5Bdevice%5D%5Bversion%5D=1.0.0`

Breakdown of the HTTP Query

| Key | Value | Example |
|-----|-------|---------|
| clientID | The X-Plex-Client-Identifier you provided before | TestClient |
| code | the Code from the return of `Step 1` | examplecode |
| context[device][product] | The name of the product given | Test |
| context[device][platform] | The platform for the device | Windows_NT |
| context[device][platformVersion] | The version of the platform above | 10.0.16299 |
| context[device][version] | The version of the product given | 1.0.0 |

## Step 3 ##

When we now poll `https://plex.tv/api/v2/pins/{pin}` this will then give us back a similar example as above in `Step 1` but assuming `Step 2` was done, `authToken` will not be null.

Example cURL request:

```bash
curl -H "X-Plex-Client-Identifier: TestClient" -H "Accept: \"application/json\"" "https://plex.tv/api/v2/pins/123123123"
```

### Return Example ###

```json
{
    "id": 123123123,
    "code": "examplecode",
    "clientIdentifier": "TestClient",
    "location": {
        "code": "AU",
        "country": "Australia",
        "city": "Melbourne",
        "subdivisions": "Victoria",
        "coordinates": "-1.23, 1.23"
    },
    "expiresIn": 1799,
    "createdAt": "2017-12-19T14:20:49.306Z",
    "expiresAt": "2017-12-19T14:50:49.304Z",
    "authToken": "thisisourauthtoken"
}
```

the authToken that is returned can now be used as your `"X-Plex-Token"` header.
