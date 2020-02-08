test:
	stylus src
	coffee -c src/*.coffee	

build: test
	uglifycss src/*.css > min.css
	uglifyjs -m -c -o min.js src/*.js
	haml -q --remove-whitespace src/index.haml index.html

clean:
	rm src/*.css
	rm src/*.js