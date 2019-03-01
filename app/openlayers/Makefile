all:
	npm run-script build

run:
	npm start

init:
	npm install

clean: 
	rm -rf *~ .*~ dist .cache

c: clean

deploy:
	rsync -av --delete dist/ sel:html/app/
	rm -f dist.tar.bz2
	tar cvf dist.tar dist
	bzip2 -9 dist.tar
	rsync -av dist.tar.bz2 sel:html/app/
	rm -f dist.tar

deploy.atv:
	rsync -avz --progress --delete dist/ atv:html/
	rm -f dist.tar.bz2
	tar cvf dist.tar dist
	bzip2 -9 dist.tar
	rsync -avz --progress dist.tar.bz2  atv:html/
	rm -f dist.tar


