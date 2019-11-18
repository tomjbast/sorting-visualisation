











## Sorting Visualisation

I wanted to start this small project to achieve a couple of things:

* Learn about some popular sorting algorithms
* Implement said algorithms (with no stack overflow etc "cheating")
* Develop a highly visual tool anyone could have a quick play with - [sort-visualisation.co.uk](sort-visualisation.co.uk)


## What it is

This is a simple front end application built using create-react-app that allows users to choose a sorting method, a number of data points and to start/stop the sort. The Github repo can be found [here](https://github.com/tomjbast/sorting-visualisation). I'd love any feedback and suggestions

It uses Buddy for continuous integration and is deployed from S3 while being delivered by CloudFront and AWS Route 53; the application website can be found [here](sort-visualisation.co.uk) 

## Process/Learnings

Before I went in I wanted to make sure I wasn't relying on external help too much so made the decision to avoid any copy/paste code or even looking at online solutions. 

Quick sort was by far the most difficult and was my first real exposure to recursive functions, however it didn't prove unbeatable and I got there in the end. 

Overall it was great to dig into sorting a little more and have some understanding of what goes on behind the simple .sort() functionality of javascript. Next steps would probably be to outsource the sorting of a large array to multiple nodes using quick sort to "get around" javascripts single threaded nature. 
