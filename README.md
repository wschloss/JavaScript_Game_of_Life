# Conway's Game of Life in JavaScript

*Walter Schlosser*

===========

## Inspiration

I was reading a game developer's blog article about a cool 2D game called Galak-Z.  Check it out [here](http://www.ign.com/blogs/17bitgames/2015/02/27/galak-z-the-shift-from-linear-top-down-shooter-to-a-procedurally-generated-rogue-lite/)!  In the section 'Getting Procedural', he talks about randomly generating levels, and how they used the concept of cellular automata and [Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life) to generate caverns.  After changing the rules a bit, they give the game a seed (initial alive cell configuration) and let it evolve over many iterations, and then they have there map outline.  I, like many others, thought this way exceptionally awesome, and so I wanted to make a quick game of life implementation to play around.  As a plus, my JavaScript/JQuery was a little rusty so I got a chance to review some things.

=================

## Description

This implementation uses the traditional rules (taken from [wikipedia](http://en.wikipedia.org/wiki/Conway's_Game_of_Life)):

* Any live cell with fewer than two live neighbours dies, as if caused by under-population.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies, as if by overcrowding.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

You can click on cells to toggle there state (black is alive), and then enter a number of iterations to step through and click step to watch the evolution.  The clear button will set all cells to dead again.

###### I want to...

* Spiffy up the page so it looks nicer
* Add a select box and load button to load up some pre-existing interesting patterns you can read about on wikipedia.