---
title: "Synthesized Statistics - Permutations and Combinations"
category: "Statistics"
date: 2019-11-19
published: "true"
slug: "synthesized-statistics-permutations-and-combinations"
tags:
    - python
    - statistics
    - probability
---

Statistics is tough for me. I'm only ok at math and I never intuitively understand something the first time I hear it. So when I sucked at MIT's intro to probability course, I took another one from Harvard and synthesized my knowledge of the two together into this series of blog posts. Most of the time, I try and convert the mathematics into code, and that gives me slightly better insight into how things work. Follow along and hopefully you'll learn something too.

## Prerequisite Math

Here's the part I both simultaneously love and hate. The math is cool because it just works, but if I can't conceptualize it visually, it takes me a long time to wrap my head around it.

The first thing I had to get comfy with are factorials, and they're by far the easiest math we deal with. We designate factorials by placing an exclamation point after the number. It end up looking like $ n! $.

## Turning Math Into Code

$$ n! $$ translates pretty evenly into this code block:

```python
def factorial(n):
    total = 1
    for i in range(n, 1, -1):
        total *= i 
    return total

factorial(3) # 6 because 3 * 2 * 1 is 6
factorial(4) # 24
factorial(5) # 120 
```

Recognize the pattern?

We are essentially counting down from n and multiplying each value by the previous total. Python's `range()` function takes three arguments, the starting value, the ending value, and the step. By ending at 1 and using a step of -1, we first multiply total by 3, and then by 2, and then by 1. 

If you want to get really terse, you could shorten this to something like this:

```python
def factorial(n):
    for i in range(n-1, 1, -1):
        n *= i
    return n
```

Personally, I like the first version better. However, there's two things here that both functions don't handle correctly.

First, the math defines the `factorial(0)` to be 1. Our function would return zero, so we'll need to account for that. Also, it's impossible to calculate factorials for a negative $ n $, so we should handle that more appropriately as well. Doing so might give you something close to this:

```python
def factorial(n):
    if n < 0:
        raise ValueError('factorial() not defined for negative values')
    if n == 0:
        return 1

    total = 1
    for i in range(n, 1, -1):
        total *= i 
    return total  
```

That's not quite as pretty, but it's functional. 

Fortunately, we can check our work by importing the math module and using the built in factorial function.

```python
import math

print(math.factorial(5))  # 120
print(math.factorial(4))  # 24
print(math.factorial(3))  # 6
print(math.factorial(2))  # 2
print(math.factorial(1))  # 1
print(math.factorial(0))  # 1
print(math.factorial(-1)) # error
```

You'll notice that the error printed is the same as the one used in our custom function. And you're right, I stole it. 

So why do we need to know all this mathy goodness?

## Getting Choosy

Unit 1 in Harvard's Intro to Probability course covers the math of counting. I enjoyed this section and found examples to be the best way to conceptualize the math. Let me preface this by saying that some forms of counting are easier than others. We'll start small and build up. 

The easiest kind of counting is done when we are looking to sample from a collection of items *with replacement*. A good example would be choosing a four digit passcode for your smart phone. You can pick 4 numbers, and you're welcome to use any of those numbers more than once. That's what *with replacement* refers to - being able to choose an item from a collection, replace it, and then choose it again.

If you were to count the total number of unique passcodes available, you would get $ 10^{4} $, or 10,000 possible choices. That's easy math. As a rule of thumb, when choosing $ k $ items from a collection of size $ n $ with replacement, the formula will always be $ n^{k} $. 

The next type of counting we'll learn is how to calculate the number of ways to choose groups of size $ k $ from $ n $ items in a particular order. 

This is essentially discussing the number of **permutations**. 
Here's a concrete example for when permutations come into play. We have a deck of 52 cards. How many possible ways can we deal 5 cards? 

One example would be the dealer placing down an Ace of spades and a 2 of diamonds on the flop. Then up comes a Queen of hearts, followed by a 7 of clubs, and finally a 10 of diamonds. That's just one possible outcome, and things start to get out of hand if we try to count every possible permutation by hand. 

The answer can instead be found by using the following formula:

$$ P_{k}^{n} = \dfrac{n!}{(n-k)!} $$

So now we know why we need factorials. 

Plug in 52 (the number of cards) for $ n $, and 5 (the group size) for $ k $. What value do you get?

$$ \dfrac{52!}{(52-5)!} $$

Using our previously defined function, we can calculate the answer as **311,875,200**. Memorize that number and you'll be *super* fun at cocktail parties.

If you think about it, what we're essentially doing is saying that at first we can choose any one of the 52 cards. The next time we deal a card, we can choose any one of the remaining 51 cards, then 50 cards, then 49, and finally 48.

That's why we divide $ 52! $ by $ 47! $. Neat, huh?

## Permutations vs. Combinations

Ok, so what if order doesn't matter? Well in that case, we're no longer dealing with permutations.

In general, combinations provide an answer to the question: "How many ways can we create a subset $ k $ out of $ n $ items?".

We write that out mathematically as $ (_{k}^{n}) $.

That looks kinda weird, right? We say this out loud like $ n $ choose $ k $. 

Calculating $ n $ choose $ k $ takes advantage of our previous knowledge about permutations, coupled with the fact that we don't need to know the order, so we divide that value by $ k! $. 

Doing so gives us this formula:

$$ \displaystyle\binom{n}{k} = \dfrac{P_{k}^{n}}{k!} = \dfrac{ \dfrac{n!}{(n-k)!}}{k!} = \dfrac{n!}{(n-k)!k!} $$

Ok, that makes sense. Now what if we wanted to figure out how many distinct 5-card hands we could deal to a given player? Well in this case, the order doesn't matter, so we're working with combinations.

So what is 52 choose 5?

$$ \dfrac{52!}{(52-5)!5!} $$ comes out to **2,598,960**.

> NOTE: $ k! $ here is simply the number of ways we can order $ k $ items. Dividing by this amount makes sense when the order of the items isn't taken into account.

With those two formulas, we're well equipped to take on most counting problems. Head over to the MIT or Harvard EdX course and see how you do with their practice problems.

## Wrapping Up

Here's some of the resources I use to think through problems in this category:

+ Harvard Intro to Probability Course - https://courses.edx.org/courses/course-v1:HarvardX+STAT110x+3T2019/course/
+ MITs Probability - The Science of Uncertainty and Data - https://www.edx.org/course/probability-the-science-of-uncertainty-and-data
+ Jeremy Kun - Probability Theory: A Primer. https://jeremykun.com/2013/01/04/probability-theory-a-primer/
+ Khan Academy - Probability. https://www.khanacademy.org/math/probability/probability-geometry

<!-- ## Two Real World Examples

Ok, let's think through two practice problems to get the hang of this.

Say I stole your iPhone and am trying to punch in the correct 4 numbers that unlock it. No biggee. I'll just have access to basically every digital interaction you've ever had. 

Should you be scared? Well, it depends on how likely it is that I'll get in (and probably how scandalous your text history is).

We can calculate the probability of me gaining access to your phone by determining the number of possible permutations a 4 digit passcode has.

As you hopefully recall, the formula is $ P_{k}^{n} = \dfrac{n!}{(n-k)!} $. Since we're operating in groups of 4, and there are 10 possible numbers to choose from, this means  -->

