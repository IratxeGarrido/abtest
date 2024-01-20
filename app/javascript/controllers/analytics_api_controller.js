import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="analytics-api"
export default class extends Controller {
  static targets = ["link", "text"]
  connect() {
    this.trackPageview(window.location.href, this.textTarget.innerText)
  }

  fire() {
    this.trackEvent(window.location.href, this.linkTarget.innerText, this.textTarget.innerText)
  }
  /**
 * Tracks a pageview to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL is probably a good start though.
 */
trackPageview = (url, text) => {
  console.log(`--> Tracking Pageview:
  URL: ${url}
  Text: ${text}
  Page View Counter
  Session ID / UserID`);
};

/**
 * Tracks an event to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL and an event name are probably a good start though.
 */
trackEvent = (url, eventName, text) => {
  console.log(`--> Tracking Event:
  URL: ${url}
  Text: ${text}
  Event Name: ${eventName}
  Session ID / UserID`);
};

}
