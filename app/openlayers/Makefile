HOST_DEPLOY=tricomify.io

all: build

build:
	./conv.js ./log/|tee pos.js
	npm run-script build

run:
	npm start

init:
	npm install

clean: 
	rm -rf *~ .*~ dist 
	rm -f pos.js

clean.hard: 
	rm -rf *~ .*~ dist .cache
	rm -f pos.js

c: clean

deploy: clean build
	rsync -avz --delete dist/ ${HOST_DEPLOY}:html/app/

backup:
	rm -f dist.tar.bz2
	tar cvf dist.tar dist
	bzip2 -9 dist.tar
	rsync -avz dist.tar.bz2 ${HOST_DEPLOY}:html/app/
	rm -f dist.tar.bz2

