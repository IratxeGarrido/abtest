import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="analytics-api"
export default class extends Controller {
  static targets = ["link", "text"]
  connect() {
    this.trackPageview(window.location.href, this.textTarget.innerText, 'PageView')
  }

  fire() {
    this.trackEvent(window.location.href, this.linkTarget.innerText, this.textTarget.innerText)
  }
  /**
 * Tracks a pageview to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL is probably a good start though.
 */
trackPageview = (url, text, eventName, userId) => {
  // Create a JSON object, that would be transferred to the backend
  console.log(`--> Tracking Pageview:
  URL: ${url}
  Text: ${text}
  Event Name: ${eventName}
  User ID: ${userId}`);
};

/**
 * Tracks an event to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL and an event name are probably a good start though.
 */
trackEvent = (url, eventName, text, userId) => {
  console.log(`--> Tracking Event:
  URL: ${url}
  Text: ${text}
  Event Name: ${eventName}
  User ID: ${userId}`);
};

}
