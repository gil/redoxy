# Redoxy
A NodeJS proxy cached with Redis - Redoxy


## About
Redoxy is a NodeJS proxy that caches responses on Redis, this means it's super fast! :)

## Why
Ok, you could use Varnish, and that's it, right? No. With Redoxy you can read the response body and then define if you want to cache it's content.

So basically Redoxy do not cache everything, it caches only what you tell it to. 

A good example of usage is those APIs that answers 200 status code for errors. Usually you do not want to cache errors, right? With Redoxy uyou can!


## Usage


## Filtering
