echo "Running Javascript through the Google Closure Compiler"
javascript=$(closure-compiler --compilation_level ADVANCED_OPTIMIZATIONS --externs=jquery-1.11.0-externs.js --js=src/main.js)

echo "Running CSS through clean-css"
css=$(cleancss src/main.css)

echo "Minifing HTML"
html=$(cat src/index.html)

echo "Concating HTML, Javascript and CSS"
output="$html<style>$css</style><script>$javascript</script>"

echo "Final output"
echo $output
