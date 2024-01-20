
# AB Testing challenge

## TLDR

I created a rails clone of the sandbox and used the [split gem](https://github.com/splitrb/split) to generate the

experiments for the ab testing and redis to store the data. The analytics-api I managed with a stimulus controller.

## Setup

```

bundle install

rails s

```

You can see the running app at `localhost:3000` and the experiments results at `localhost:3000/split`



## Description

Since the team's tech stack is Ruby on Rails I decided to create a clone of the given challenge in rails. Then I decided to

google for a gem that does would allow me to do AB testing. I used split because it seems to be maintained (last release was in November 2023),

it has a dashboard were users see the results of the experiments and non-technical staff could easily create new experiments there or directly in the code in `split.rb`.


### Acceptance criteria

**1. Visitor sees only one variation (assigned randomly) when they land on the page.**
In `split.rb` I created the experiment `sign_up` with the two texts given:
```
sign_up: {

alternatives: ["Meet the app that revolutionized reading.",
"Meet the app that has 18 million users."]

}
```
In the `home_controller` there are two functions:
- `index` starts the experiment and assigns randomly a text to `@sign_up_test`
- `signup` ends the experiment when the user clicks on the sign up button

In the view `index.html.erb` I render `@sign_up_test` so the user can see the text.

**2. The assigned variation doesn’t change after the page reloads.**
This is a standard behaviour of split.

**3.Track a pageview via the `analytics-api.js` method when a visitor lands on the page.**
I created a stimulus controller `analytics_api_controller.js` to takes care of this. I defined a pageview as a get request, so every time the user reloads the `connect()` function of the controller will call `trackPageview()` and print the URL, the text that was shown and user session.

**4.Track an event via the `analytics-api.js` method when a visitor clicks on the “Sign up” button.**
I created a function called `fire()` that will be called on a click event. So every time the user clicks on the button the `trackEvent` function will be called and print the URL, the text shown and the user session.

**5.Every single page view and click shall be tracked.**
This is done in the `analytics_api_controller.js`

**6.We want to determine a winning variation by comparing the CTR (click-through rate) of clicks on the “Sign up” button. The CTR of a page is "number of clicks" divided by "number of page views". As a user can only effectively convert aka signup once, the counts for the CTR computation need to be unique per user. So a single user clicking ten times and reloading the page 5 times should still be only counted as one converted user. Make sure this is possible with the data you send and explain on a high level how.**
The data I would send would be something similar to what is in the split dashboard:
- The number of participants
- The number participants that didn't finished the experiment (didn't click on the button)
- The number participants that completed the experiment (did click on the button)
With this data you can calculate the CTR = non-finished / completed
Split already takes into account if a user click 5 times and/or refreshes 10 times as one converted user

You could also do this by sending session ID and the number of page views that
every variant has and the see if the SIGN UP button has been clicked by checking if
there is an event named SIGN UP
