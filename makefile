test:
	stylus src
	coffee -c src/*.coffee	

minify:
	uglifycss src/*.css > min.css
	terser -m -c -o min.js src/*.js
	haml -q --remove-whitespace src/index.haml index.html

clean:
	rm src/*.css
	rm src/*.js

build: test minify clean