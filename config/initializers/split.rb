Split.configure do |config|
  config.allow_multiple_experiments = true
  config.redis = Redis.new
  config.experiments = {
    sign_up: {
      alternatives: ["Meet the app that revolutionized reading.", "Meet the app that has 18 million users."]
    }
  }
end
