# js-charMap
Character Map selector for UTF8 special characters.

Ultimately, styling is up to you, this only includes the most basic of styles for the demo.

The script is library agnostic (vanilla javascript), the decision was made to not minify or compile the script, as this should be done on build of your entire app. This allows for custom debugging and compiling procedures.

## Usage
1. Include the javascript file in your app.
```html
<script src="charMap.js"></script>
```

2. Include the css in your app or write your own
```html
<link rel="stylesheet" href="charMap.css" >
```

2. Initialise the character map
```html
<script>
charMap.init({
    target: "#character-map", // Element or Selector
    onLoad: function() {
        console.log("Character map loaded");
    },
    onClick: function(char){
        // User has clicked a character, so do what you need
        console.log("The character is; " + char);
    }
});
</script>
```


## Character requests
if you notice something missing from the character list, feel free to raise a pull request with updates, or fork it and make it even better :)
