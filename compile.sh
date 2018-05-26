#!/bin/bash

echo "Running Javascript through the Google Closure Compiler"
javascript=$(npx google-closure-compiler --compilation_level ADVANCED_OPTIMIZATIONS --externs=jquery-1.11.0-externs.js --js=src/main.js)

echo "Running CSS through clean-css"
css=$(npx cleancss src/main.css)

echo "Minifing HTML"
html=$(cat src/index.html)

echo "Concating HTML, Javascript and CSS"
output="$html<style>$css</style><script>$javascript</script>"

echo "Final output. ${#output} bytes"
echo $output | tee index.html

