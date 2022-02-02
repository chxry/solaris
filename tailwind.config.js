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
        "red": "#BF616A",
        "orange": "#D08770",
        "yellow": "#EBCB8B",
        "green": "#A3BE8C",
        "purple": "#B48EAD",
        "black": "#000"
      },
      fontFamily: {
        "display": ["Poppins", "sans-serif"],
        "body": ["Lato", "sans-serif"],
      },
      extend: {
        spacing: {
          "128": "32rem",
          "192": "48rem",
          "208": "52rem",
          "256": "64rem"
        },
      }
    },
    plugins: [],
  }
  