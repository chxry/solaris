module.exports = {
    content: ["./src/**/*.tsx"],
    theme: {
      colors: {
        "polar": {
          "0": "#2E3440",
          "1": "#3B4252",
          "2": "#434C5E",
          "3": "#4C566A",
        },
        "snow":{
          "0": "#D8DEE9",
          "1": "#E5E9F0",
          "2": "#ECEFF4",
        },
        "frost": {
          "0": "#8FBCBB",
          "1": "#88C0D0",
          "2": "#81A1C1",
          "3": "#5E81AC"
        },
        "black": "#000"
      },
      fontFamily: {
        "body": ["JetBrains Mono", "sans-serif"],
      },
      extend: {
        spacing: {
          "128": "32rem",
          "192": "48rem",
          "256": "64rem"
        }
      }
    },
    plugins: [],
  }
  