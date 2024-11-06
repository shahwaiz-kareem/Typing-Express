const paragraphs = [
  "Because promises can be resolved (or rejected) only once, this will work. The first time resolve or reject is called determines the outcome of the promise, and further calls caused by a request coming back after another request finished are ignored. To build an asynchronous loop, for the retries, we need to use a recursive function—a regular loop doesn’t allow us to stop and wait for an asynchronous action.",

  "Occasionally, there isn’t enough light for the crows’ mirror systems to transmit a signal or something is blocking the path of the signal. It is possible for a signal to be sent but never received. As it is, that will just cause the callback given to send to never be called, which will probably cause the program to stop without even noticing there is a problem.",

  "It would be nice if, after a given period of not getting a response, a request would time out and report failure. Often, transmission failures are random accidents, like a car’s head- light interfering with the light signals, and simply retrying the request may cause it to succeed. So while we’re at it, let’s make our request function automatically retry the sending of the request a few times before it gives up.",
];
