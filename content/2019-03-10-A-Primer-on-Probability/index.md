---
title: "A Primer on Probability in Python"
category: "Data Science"
date: 2018-03-10
published: "false"
slug: "a-primer-on-probability-in-python"
tags:
    - python
    - statistics
    - set theory
    - probability
    - distributions
---

Before I started my micro-masters in statistics and data science from MIT, I sat down and wrote out all the <em>mathy</em> things I needed to improve on. My strategy was to look over the courses in the micro-masters sequence and analyze the concepts taught in each chapter. Then I crossed out anything I already felt comfortable with.

The remaining list was pretty long, but most of them fell into one of two categories: calculus or statistics.

While I was encouraged by how much high school and college math I still know, I was definitely behind on my prereqs. So I decided to put myself through a math mini-bootcamp. What I found is that math is **way** more fun when you use programming to figure things out.

So that's what I'm going to do here. Use programming to explore concepts in math that I'd like to learn. I'll start with the basics and move on to more complicated topics as I complete the micro-masters program.

Stop 1 in this journey is **probability theory**, something I found dramatically more complicated than my high school teachers had me believe. Let's dive in.

## Probability Theory

Probability is simply how likely it is that an event will occur.

> Probability theory underlies a huge portion of artificial intelligence, machine learning, and statistics. - Jeremy Kun

> Whenever we’re unsure about the outcome of an event, we can talk about the probabilities of certain outcomes—how likely they are. The analysis of events governed by probability is called statistics. - Khan Academy

Khan Academy puts it nicely when they say:

> Probability of an event = (# of ways it can happen) / (total number of outcomes)

There is a more formal, mathematical way to look at probability, and that involves examining set theory. We'll take that approach in this post and branch out our understanding from there.

Let's start with some definitions.

## Events and Sample Space

An **event** occurs during the trials of a **random experiment**. The outcome of the event is known as a **random variable**, often abbreviated as RV.

An example of a random experiment is rolling die for a craps game or flipping a coin to see who gets to go first. The event is each actual trial, and the random variable would be rolling a 6, or the coin landing heads up.

When we're trying to determine the probability of an event, we need to know about how many different random variables can possibly result from any trial.

A **sample space** is the collection of every single possible outcome of a **random experiment**. In more formal mathematics the entire sample space, often called the **universal set**, is represented as an uppercase omega $Ω$.

## Sets and Probability Theory

In probability theory, a **set** is a collection of distinct objects.

Mathematically, we define a set using $𝑆$. If element $x$ belongs to the set, we say $𝑥$ is in $𝑆$ like so: $𝑥 ∈ 𝑆$ .

If we think of rolling a single die, then $Ω = { 1, 2, 3, 4, 5, 6 }$ and the sample space, $𝑆$ would be the same. No other value is possible when rolling a die, so the sample space shows every conceivable outcome of the random experiment.

<figure>
  <img src="https://storage.cloud.google.com/jeff-astor.appspot.com/event-in-sample-space.png"/>
  <figcaption>Taken from this slideplayer <a href="https://slideplayer.com/slide/10865356/">deck</a>.</figcaption>
</figure>

The Laplace definition for probability states:

> If all the singular events in the event space (here denoted by $𝑆$) are equally as likely, then:
>> $𝑃(𝐸) = \frac{\#𝐸}{\#𝑆}$.

Basically, the probability is the number of occurrences of the event divided by the number of total event occurrences in the sample space.

To understand this even better, let's look at another way of writing this. Again, if we say each outcome in $𝑆$ is equally likely, then the probability of observing one particular outcome is:

> 𝑃(each outcome) = 1 / ∣𝑆∣

where $∣𝑆∣$ is the **cardinality** of $𝑆$. In other words, the total number of different outcomes $𝑆$ can have. Thinking about the probability of $𝐸$:

> $𝑃(𝐸) = \frac{∣𝐸∣}{∣𝑆∣}$

And this takes us right back to the Khan Academy definition.

> P(A) = (# of ways A can happen) / (Total number of outcomes)

#### Example: Rolling Dice vs. Coin Flip

When we roll a single die, every number is equally likely to be rolled. There are 6 numbers total, so $P(E) = 1 / |S|$ for each number - exactly 1/6 or 0.166666.

When we flip a coin, only two events can occur - flipping a heads or flipping a tails. Each one is equally likely, so $P(E) = 1/2$ or 0.50. We obviously know this to be true, since coin flips are used so regularly to determine things by random chance.

## Kolmogorov's Axioms of Probability

If you're careful, you'll notice that the sum of all probabilities of the individual events in a sample space equals 1. For instance. Flipping heads has a probability of 0.5, and flipping tails has a probability of 0.5. The math here is a simple $0.50 + 0.50 = 1.00$.

For rolling a single die, there are 6 possible outcomes and each one has a probability of 1/6. The math here is also simple, $ \frac{1}{6} \cdot 6 = 1$.

That is the **second** of the three <a href="https://en.wikipedia.org/wiki/Probability_axioms">Axioms of Probability</a> that soviet mathematician <a href="https://en.wikipedia.org/wiki/Andrey_Kolmogorov">Andrey Kolmogorov</a> proposed in his probability theory. This can be shown mathematically as $P(\Omega) = 1$.

The **first** is that the probability of an event is a non-negative real number, from 0 to 1. For any event, $A$, we can say that $P(A) \geq 0$.

The **third** axiom is slightly less intuitive. It states that for a collection of <em>mutually exclusive</em> events, the probability of the union of 2 events is equal to the sum of the probabilities of the individual events happening.

The math for this is $P(A_1, A_2, \dots A_n) = \displaystyle\sum_{i=1}^n P(A_i)$.

Another way to think about this is that if $A \cap B = \emptyset $, then $P(A\cup B) = P(A) + P(B)$. A result of this axiom is the **addition law or probability** or the **sum rule**.

<!-- $P(A\cup B) = P(A) + P(B) \, \text{--} \, P(A \cap B) $ -->
$P(A\cup B) = P(A) + P(B) \, \text{\textemdash} \, P(A \cap B) $
<!-- $P(A\cup B) = P(A) + P(B) - P(A \cap B) $ -->

Essentially, the probability that $A$ or $B$ will happen is the sum of the probabilities that $A$ will happen and that $B$ will happen, minus the probability that $A$ and $B$ both happen. Again, this is assuming that the events are exclusive. That is often not the case.

<!-- ## Factorials, Permutations, and Combinations -->

<!-- ## Bernoulli and Binomial Distributions -->

## The Types of Probability

The probability of any **random variable** being the outcome of a particular event depends on the nature of the event. Probability is seen in 3 distinct forms: marginal, joint, and conditional.

**Marginal Probability**: If $A$ is an event, then the marginal probability is the probability of that event occurring - $P(A)$. Given a pair of fair dice, marginal probability would be having the dice sum up to 7: $$ P(7) = 16.7% $$.

**Joint Probability**: The probability of the intersection of two or more events. The join probability of two events - $A$ and $B$ - is written as $ P(A ∩ B) $. The intersection is equivalent to saying "The probability of event A and event B occurring."

Example: the probability that a card drawn from a pack is red and has the value 4 is P(red and 4) = 2/52 = 1/26. (There are 52 cards in a pack of traditional playing cards and the 2 red ones are the hearts and diamonds).

**Conditional Probability**:  When the outcome of event $A$ in one trial is somehow dependent on the outcome of event $B$ in a previous trial, we identify them as **dependent events**. Conditional probability - written as $P(A|B)$ - is the probability of $A$ occurring given that $B$ has already occurred.

Events in a sample space can be either **dependent** or **independent**.

### Independent Events

Consider following independent events:

+ Flip tails on a coin and have a 5 come up on a single die roll.
+ Pick a marble from a bag and flip heads on a coin

Events A and B are independent if $𝑃(𝐴∩𝐵) = 𝑃(𝐴)𝑃(𝐵)$, and   $𝑃(𝐴∪𝐵) = 𝑃(𝐴)+𝑃(𝐵) \, \text{\textemdash} \, 𝑃(𝐴∩𝐵)$.  If they are independent, then the probability of event $A$ occurring does not affect the probability of event $B$ occurring.

### Dependent Events

Let's say event $A$ is drawing a red or blue marble from the bag. In it, there are 3 red marbles and 2 blue ones.

<figure>
  <img style="border: none; min-width: 350px" src="https://www.mathsisfun.com/data/images/probability-marbles1.svg" />
</figure>

So the probability of getting a blue marble would initially be 2/5 and getting a red marble would be 3/5.

<figure>
  <img style="border: none; min-width: 350px" src="https://www.mathsisfun.com/data/images/probability-marbles-tree1.gif" />
</figure>

Every time we draw a marble, we record the color and place it in our pocket. With one less marble in the bag, the chances of drawing either a red or blue marble in the next trial have changed.

If we had a red marble in trial 1, the probability of getting a blue marble in trial 2 is 2/4. However, if we saw a blue marble in the first trial, the probability of seeing a blue in second trial becomes 1/4 etc.

The outcome of event $B$ in the second trial depends on the outcome of event $A$ in the first trial. Otherwise put, $P(B)$ is **conditional** on $P(A)$.

A **tree diagram** can be used to explain this for all possible events.

<figure>
  <img style="border: none" src="https://www.mathsisfun.com/data/images/probability-marbles-tree3.gif" />
</figure>

**Conditional Probability** is when the result of a trial can influence the results of upcoming trials.

Here are some more examples:

+ Determining if a user will like an audiobook based on their previous audiobook purchases.
+ Drawing a pair of aces in a hand of poker.

We define conditional probability (probability of $A$ **given** $B$) as:

<figure>
  <img style="border: none" src="https://cdn-images-1.medium.com/max/1600/1*93G__Er_HniqLkNeiGfPiA.png" />
</figure>

**$P(A|B)$**, the probability of the occurrence of event $A$ **given** that $B$ has just happened.

<figure>
  <img style="border: none" src="https://www.probabilitycourse.com/images/chapter1/conditional_b.png" />
</figure>

And this is our conditional probability formula. There are three theorems that are a result of this formula.

+ Theorem 1 - Product Rule
+ Theorem 2 - Chain Rule
+ Theorem 3 - Bayes Rule

We'll address the last two of these later on. For now, we'll only look at the **product rule**.

The **product rule** is useful when the conditional probability is easy to compute, but the probability of two events' intersections is not.

The intersection of events $A$ and $B$ can be given by

$ P(A \cap B) = P(B) P(A|B) = P(A) P(B|A)  $

Here’s how to derive the conditional probability equation shown above using the product rule:

Step 1: Write out the product rule:

+  $P(A \, and \, B) = P(B) * P(A|B)$    

Step 2: Divide both sides of the equation by $P(B)$:

+ $ \frac{P(A \, and \, B)}{P(B)} = \frac{P(B) * P(A|B)}{P(B)}$  

Step 3: Cancel $P(B)$ on the right side of the equation:

+ $ \frac{P(A \, and \, B)}{P(B)} = P(A|B)$

Step 4: Rewrite the equation:

+ $ P(A|B) = \frac{P(A \, and \, B)}{P(B)} $

In the situation that both of these events are independent of each other, then $P(A|B) = P(A)$ and $P(A \cap B) = P(A) P(B)$.

Here's some practice problems to practice using the equation.

### Practice Problems

1. Find the probability of drawing 2 consecutive aces from a shuffled deck of cards.

```python
prob_first_ace    = 1/52
prob_second_ace   = 1/51
prob_pair_of_aces = prob_first_ace * prob_second_ace
```

2. We roll a single die and flip a quarter. Find the probability of rolling a 6 and flipping a heads.

```python
prob_six   = 1/6
prob_heads = 1/2
prob_both  = prob_six * prob_heads
```

3. 18 of my 20 cousins like chocolate. I decide to send chocolate to 3 of my cousins by picking their names from a hat, and then putting the name back in before selecting another. What is the probability that no chocolate-hating cousins get a chocolate?

```python
prob_chocolate_lover = 18/20
n_trials = 3
prob_success = prob_chocolate_lover ** n_trials
```

## Partitioning and The Law of Total Probability

Ok, last thing for now. We'll save everything else for another post.

Let's talk about **the law of total probability**. In probability theory, the law (or formula) of total probability is a fundamental rule relating **marginal probabilities** to **conditional probabilities**. It expresses the total probability of an outcome that can occur through different distinct events.

### Partitioning an Event Space

A lot of probability theory involves deconstructing a complicated event into a bunch of simpler events, or decomposing complicated random variables into simpler ones like we saw in this simple problem above. Conditional probability is one way to do that, and it fits into this more general scheme of “decomposing” events and variables into components.

The usual way to break up a set into pieces is via a **partition**.

> A partition of a set $𝑋$ is a collection of subsets $𝑋_𝑖 ∈ 𝑋$ so that every element $𝑥 ∈ 𝑋$ occurs in exactly one of the $𝑋_i$.

The probability for $A$ can be written as sums of event $B$. The total probability rule is:

> = $\displaystyle\sum_{i=1}^m P(A|B_i) \cdot P(B_i)$

The best way to think about this is to look at a diagram of a partitioned sample space.

<figure>
  <img src="https://storage.cloud.google.com/jeff-astor.appspot.com/partition-total-probability.png" />
</figure>

Let's try our hand at a few examples to get a better grasp of what's going on here.

### Practice Problems

Say we have two bags of marbles. The first bag has 20 red marbles and 30 blue marbles. The second bag has 30 red marbles and 20 blue marbles. We run a simulation where we toss a coin and pick a marble from the first bag if it lands on heads. If it lands on tails, we pick a marble from the second bag.

+ **What is the probability of drawing a red marble?**

```python
"""
The probability of picking either bag is 0.5.

If we pick the first bag, the probability of drawing a red marble is 0.4. If we pick the second bag, the probability of drawing a red marble is 0.6         
"""

(0.5 * 4/10) + (0.5 * 6/10) # should be exactly 50%
```

Ok, another one with marbles. Say we have three bags with 100 marbles each. Bag 1 has 50 red and 50 blue marbles. Bag 2 has 45 red and 55 blue marbles. Bag 3 has 60 red and 40 blue marbles. You choose a bag at random and then pick a marble from the bag at random.

+ **What is the probability of drawing a red marble now?**

```python
"""
The probability of picking either bag is 1/3 or 0.33333.

If we pick the first bag, the probability of drawing a red marble is 0.50. With the second bag 0.45 and with the third 0.60.          
"""

(0.33333 * 0.5) + (0.33333 * 0.45) + (0.33333 * 0.6)
```

## Wrapping Up and Resources

There's a lot of really great content freely available on each of these subjects. Some GMAT prep websites have great probability practice problems if you want to test yourself further. I won't include them here, but feel free to Google around and sign up for the freebies.

+ Analytics Vidhya - 40 Questions on Probability for Data Scientists. Great practice problems with solutions provided. https://www.analyticsvidhya.com/blog/2017/04/40-questions-on-probability-for-all-aspiring-data-scientists/
+ Intro to Probability Slide Deck - Where most of the content for this article came from. https://slideplayer.com/slide/10865356/
+ Jeremy Kun - Set Theory: A Primer. https://jeremykun.com/2011/07/09/set-theory-a-primer/
+ Kolmogorov - https://en.wikipedia.org/wiki/Andrey_Kolmogorov
+ Probability Axioms - https://en.wikipedia.org/wiki/Probability_axioms
+ Jeremy Kun - Probability Theory: A Primer. https://jeremykun.com/2013/01/04/probability-theory-a-primer/
+ Jeremy Kun - Conditional Probability: A Primer. https://jeremykun.com/2013/03/28/conditional-partitioned-probability-a-primer/
+ Khan Academy - Probability. https://www.khanacademy.org/math/probability/probability-geometry
+ Math Hacks - The Airplane Probability Problem. https://medium.com/i-math/solving-an-advanced-probability-problem-with-virtually-no-math-5750707885f1
+ Setosa.io - Conditional Probability. http://setosa.io/conditional/
+ Multiple Probability Notes - http://home.avvanta.com/~math/mult_prob.html
+ DZone - Conditional Probability and Bayes Theorem. https://dzone.com/articles/conditional-probability-and-bayes-theorem
+ Sangakoo - Law of Total Probability.  https://www.sangakoo.com/en/unit/law-of-total-probability
