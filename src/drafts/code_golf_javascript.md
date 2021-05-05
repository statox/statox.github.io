---
layout: layouts/post.njk
tags: ['draft', 'javascript', 'codegolf']
date: 2021-05-05
title: Javascript codegolf tips
commentIssueId: 0
---

How to get better at codegolf challenges on Codingame

# Convert to a number with +

When an input is expected to be a number examples usually use the following code:

```javascript
n = parseInt(readline());
```

This is 10 characters just to parse a number from a string. Using the unary operator `+` on a string will cast it to a number.

```javascript
let s='12';
let n=+s;

typeof n; // 'number'

let t=+s[0]+s[1]; // t=3
```

Note that if you need to add a variable which is a number to a string representing a number you will need to add a whitespace before the `+` operator:

```javascript
let s='1';
let n=1;

n+s;    // string: '11'
n+ +s;  // number: 2
```

# Convert a list of string to a list of numbers

```javascript
l.map(Number)    # Good
l.map(c=>+c)     # Better
for(c of l)t+=+c # Top
```

# How to round a number
```javascript
let n = 53.73;
let rounded = n|0; // 53
```

# Split
```javascript
'1 2 3 4'.split` `
```

# Declaring stuff in for loop first statement
```javascript
for(i=0,a=1;i<10;i++)
```

# Codingame `readline` function

## Use a variable

Codingame provides a `readline()` function to get the inputs of a problem. This function will read one line of standard input and return it as a string without the new line character.

If you need to use `readline()` more than one it will be cheaper to store it in a variable first:

```javascript
// 27 bytes
n=readline()
m=readline()

// 24 bytes
r=readline
n=r()
m=r()
```

This is only 3 characters saved but the more calls to `readline()` you need to write the more characters you save.

## Abuse put code in the `readline` arguments

This is a trick that I don't fully understand yet but it is possible to put variables initialization in as the parameter of Codingame's `readline` function:

```javascript
// 28 bytes
r=readline
n=r()
m=r()
i=0

// 26 bytes
r=readline
n=r(m=r(i=0))
```

Once again in code golfing every byte count so even saving just a line break can sometimes make the difference.

# Variables declaration and initialization

## Get rid of explicit declaration statements

Code golf solutions are often very short and not complex enough to require switching between different scopes. So most of the time you can loose the `let`, `const` and others `var` from your code.

You should always have in mind the implications of not implicit scopes but that saves you a lot of characters.

```javascript
// 58 bytes
let n=10;
for(let i=0; i<n; i++) {
    console.log(i);
}

// 37 bytes
n=10
for(i=0;i<n;i++)console.log(i)
```

## Chained declarations

```javascript
a=b=1
a;  // 1
b;  // 1
```
