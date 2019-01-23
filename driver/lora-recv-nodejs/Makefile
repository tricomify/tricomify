#Time-stamp: <2019-01-23 12:56:46 hamada>

TARGET=./main.js

all: run

run:
	node ${TARGET}

clean:
	rm -rf *~ .*~ ${TARGET} *.o

c: clean

check:
	$(eval devfile := $(shell ls /dev/ttyUSB* |head -1))
	sudo stty -F ${devfile}
	@echo 'Number of ttyUSB devices: ' $(shell ls /dev/ttyUSB* |wc -l)
	@ls -la ${devfile}

init:
	$(eval devfile := $(shell ls /dev/ttyUSB* |head -1))
	$(eval username := $(shell whoami))
	sudo chmod 666 ${devfile}
	sudo stty -F ${devfile}
	sudo usermod -a -G dialout $(username)
	groups ${username}
	ls -la ${devfile}

npm.list:
	npm list --depth 1

npm.install:
	npm install

