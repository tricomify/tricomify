#Time-stamp: <2019-01-20 07:08:55 hamada>

TARGET = run.x
OUTPUT = ./rola.log

all:
	gcc main.c -o ${TARGET}

run:
	./${TARGET} |tee -a ${OUTPUT}

clean:
	rm -rf *~ .*~ ${TARGET} *.o

c: clean

check:
	$(eval devfile := $(shell ls /dev/ttyUSB* |head -1))
	sudo stty -F ${devfile}
	@echo 'Number of ttyUSB devices: ' $(shell ls /dev/ttyUSB* |wc -l)

init:
	$(eval devfile := $(shell ls /dev/ttyUSB* |head -1))
	$(eval username := $(shell whoami))
	sudo chmod 666 ${devfile}
	sudo stty -F ${devfile}
	sudo usermod -a -G dialout $(username)
	groups ${username}
	ls -la ${devfile}


