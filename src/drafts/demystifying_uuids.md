---
layout: layouts/post.njk
tags: ['draft', 'uuid']
date: 2021-03-15
title: Demystifying UUIDs
commentIssueId: 0
---

If you are a developer you probably already encountered a UUID before: They are used in a lot of different systems to identify information. You might also know that UUID means "Universally Unique IDentifier" and that -as the name hints- they are unique and are generated without a centralized authority.

If you are like me you probably wondered before "How is it possible that these IDs are truly unique?". You might even have an answer to this question: Easy, they are very big numbers so it is very unlikely that two people generate the same one. But it is really a satisfying answer? How can we be _sure_ that it's not possible to generate the same number twice? Also why are they formated this way?

A few days ago I decided to find the answers to these questions and I'll share them with so you don't have to read all the boring documentations by yourself.

- What is a UUID?
- The anatomy of a UUID
- How are UUIDs created?
- How can they be really unique?

### Resources

- A general description https://en.wikipedia.org/wiki/Universally_unique_identifier
- An implementation example (To be checked) https://docs.oracle.com/javase/1.5.0/docs/api/java/util/UUID.html
- Specifications https://tools.ietf.org/html/rfc4122
- Try to find a free version of the standard https://www.iso.org/standard/2229.html
- A uuid decoder https://www.uuidtools.com/decode

### Anatomy of a UUID

The textual representation of a UUID is composed of 36 characters. These characters are grouped in 5 groups of different lengths separated by hyphens. The length of these groups is always `8-4-4-4-12`.

These characters represent the 16 octets (i.e. 128 bits) of the UUIDS. These 16 octets are represented as 32 hexadecimal digits plus the hyphens.

Here is an example:

    123e4567-e89b-12d3-a456-426614174000

#### Variant and version

The different groups of characters in the textual representation of a UUID have different meaning depending on the version and the variant which were used to generate the UUID. Before we look at the different versions and  variant let's see how to identify them.

This information is embed directly in the UUID, to identify them one need to check two of the hexadecimal digits of the textual representation. Let's take an example:

    123e4567-e89b-12d3-a456-426614174000
    xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx

To get the version you take the digit M. It can only take values between 1 and 5 to reference a specified version and its value describes directly the used version:

Hex Digit  | UUID Version
-----------|-------------
1          | version 1
2          | version 2
3          | version 3
4          | version 4
5          | version 5
6-f, 0     | version unknown (unspecified version)

To get the variant you take the digit N, then the variant is given by the number of leading zeros in its 4-bits binary representation

Binary Representation    | Hex Digit  | Variant
-------------------------|------------|--------
0xxx                     | 0-7        | reserved (NCS backward compatible)
10xx                     | 8-b        | DCE 1.1, ISO/IEC 11578:1996
110x                     | c-d        | reserved (Microsoft GUID)
1110                     | e          | reserved (future use)
1111                     | f          | unknown / invalid. Must end with "0"

One way to convert hexadecimal digit to binary in bash:

```
# Warning bc is case sensitive and digits >= A must be uppercase
echo "obase=2; ibase=16; C" | bc
```

Examples:

    6b818db4-ad21-401e-a821-a73793f0cf50
                  ↑    ↑
            Version 4
                     Variant DCE 1.1

    c1facb48-86a7-11eb-bacb-00224d83ea8d
                  ↑    ↑
            Version 1
                     Variant DCE 1.1


From https://tools.ietf.org/html/rfc4122#section-4.1.1

>  The variant field determines the layout of the UUID.  That is, the
>  interpretation of all other bits in the UUID depends on the setting
>  of the bits in the variant field.  As such, it could more accurately
>  be called a type field; we retain the original term for
>  compatibility.  The variant field consists of a variable number of
>  the most significant bits of octet 8 of the UUID.


From https://www.uuidtools.com/decode
> The version is straight forward to decode. If digit M is 1 then the UUID is version-1, if M is 3 then the UUID is version-3, etc. 

> The variant is slightly more complicated. To understand how the variant is encoding you must first understand how hexadecimals work.
> UUIDs are written in hexadecimal which means each digit can be a number from 0 to 9 or a letter from a to f. That is 16 possibilities for each digit. So each hexadecimal digit represents 4 bits. There are 32 hex digits in a UUID times 4 bits gives a total of 128 bits in a UUID.
> To determine the variant you look at the bits of the 17th hex digit in a UUID. For example, if the 4 binary digits begin "10" then the variant is "DCE 1.1, ISO/IEC 11578:1996". If the binary digits begin "110" then the UUID is a "Microsoft GUID". See the table below for full break down.
> Only the number of leading "1"s matters. The bits after first 0 in the 17th hex digit are considered part of the "contents" of the UUID. "Contents" is a combination of time and machine identifier for version-1 UUIDS, for version-4 UUIDs contents is random, and for version-3 and version-5 the contents is a hash of the namespace and name. 

The four-bit M and the 1 to 3 bit N fields code the format of the UUID itself.

The four bits of digit M are the UUID version, and the 1 to 3 most significant bits of digit N code the UUID variant. (See below.) In the example, M is 1, and N is a (10xx2), meaning that this is a version-1, variant-1 UUID; that is, a time-based DCE/RFC 4122 UUID.

The canonical 8-4-4-4-12 format string is based on the record layout for the 16 bytes of the UUID:[1] 

Name                                | Length (bytes)  | Length (hex digits)  | Contents
------------------------------------|-----------------|----------------------|---------
time_low                            | 4               | 8                    | integer giving the low 32 bits of the time
time_mid                            | 2               | 4                    | integer giving the middle 16 bits of the time
time_hi_and_version                 | 2               | 4                    | 4-bit "version" in the most significant bits, followed by the high 12 bits of the time
clock_seq_hi_and_res clock_seq_low  | 2               | 4                    | 1 to 3-bit "variant" in the most significant bits, followed by the 13 to 15-bit clock sequence
node                                | 6               | 12                   | the 48-bit node id


### MAC Address (Version 1)

```bash
# Generate uuid based on the system clock and the system's ethernet hardware address
uuigen -t
```

On my system (panda) that gives

```
2a9e9e1c-8695-11eb-bacb-00224d83ea8d
2b8a8ce6-8695-11eb-bacb-00224d83ea8d
2c087cc8-8695-11eb-bacb-00224d83ea8d
2c76dd58-8695-11eb-bacb-00224d83ea8d
```

If I look for my interface mac address:

```
ip route show default
# default via X.XX.XX.XXX dev enp1s0 proto static
cat /sys/class/net/enp1s0/address
# 00:22:4d:83:ea:8d
```

On my local computer tho I can't find the mac address in the same way. This is because `uuidgen` uses the `uuid_generate` function and `man uuid_generate` says:

> The uuid_generate function creates  a  new  universally  unique  identifier
> (UUID).   The  uuid will be generated based on high-quality randomness from
> /dev/urandom, if available.  If it is  not  available,  then  uuid_generate
> will  use  an  alternative algorithm which uses the current time, the local
> ethernet MAC address (if available), and  random  data  generated  using  a
> pseudo-random generator.

So my system probably uses `/dev/urandom` rather than the mac address.


### How to generate a uuid on linux

https://serverfault.com/q/103359/252351

```bash
uuidgen # has a dependency
cat /proc/sys/kernel/random/uuid
```

### Analysing the content of a uuid

```
uuidparse $(uuidgen)
uuidgen | hexdump -c
```

Getting the max address part, the timestamp, etc

### Understanding collision risk

<!-- vim: set spell: -->
