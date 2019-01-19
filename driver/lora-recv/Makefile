#Time-stamp: <2019-01-20 04:40:29 hamada>

all:
	gcc main.c -o run.x

clean:
	rm -rf *~ .*~ run.x *.o

c: clean

check:
	$(eval devfile := $(shell ls /dev/ttyUSB* |head -1))
	sudo stty -F ${devfile}

init:
	$(eval devfile := $(shell ls /dev/ttyUSB* |head -1))
	$(eval username := $(shell whoami))
	sudo stty -F ${devfile}
	sudo usermod -a -G dialout $(username)

