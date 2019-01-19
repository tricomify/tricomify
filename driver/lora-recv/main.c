/** 
 * Time-stamp: <2019-01-20 05:05:52 hamada>
 *
 * Driver for LoRa Receiver by T. Hamada
 * Reference: The Linux Documentation Project,
 *            http://tldp.org/HOWTO/Serial-Programming-HOWTO/x115.html
 */

#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <termios.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <assert.h>

#define MODEMDEVICE "/dev/ttyUSB0"
#define BAUDRATE B57600
#define _POSIX_SOURCE 1
#define BUFSIZE 256

int main()
{
  int fd, c;
  struct termios oldtio, newtio;
  char buf[BUFSIZE-1];
  fd = open(MODEMDEVICE, O_RDWR | O_NOCTTY );

  if (fd <0) {
    perror(MODEMDEVICE);
    exit(-1);
  }

  tcgetattr(fd,&oldtio);
  bzero(&newtio, sizeof(newtio));
  newtio.c_cflag = BAUDRATE | CRTSCTS | CS8 | CLOCAL | CREAD;
  newtio.c_iflag = IGNPAR | ICRNL;
  newtio.c_oflag = 0;
  newtio.c_lflag = ICANON;
  newtio.c_cc[VINTR]    = 0;
  newtio.c_cc[VQUIT]    = 0;
  newtio.c_cc[VERASE]   = 0;
  newtio.c_cc[VKILL]    = 0;
  newtio.c_cc[VEOF]     = 4;
  newtio.c_cc[VTIME]    = 0;
  newtio.c_cc[VMIN]     = 1;
  newtio.c_cc[VSWTC]    = 0;
  newtio.c_cc[VSTART]   = 0;
  newtio.c_cc[VSTOP]    = 0;
  newtio.c_cc[VSUSP]    = 0;
  newtio.c_cc[VEOL]     = 0;
  newtio.c_cc[VREPRINT] = 0;
  newtio.c_cc[VDISCARD] = 0;
  newtio.c_cc[VWERASE]  = 0;
  newtio.c_cc[VLNEXT]   = 0;
  newtio.c_cc[VEOL2]    = 0;
  tcflush(fd, TCIFLUSH);
  tcsetattr(fd, TCSANOW, &newtio);

  while (1) {
    static char str[BUFSIZE-1];
    int len = read(fd, buf, BUFSIZE-1);
    if (BUFSIZE <= len) break;

    for (int i=0; i<len-1; i++) {
      str[i] = buf[i];
    }
    str[len-1] = 0;
    if (len>1) {
      printf("%s\n", str);
      fflush(stdout);
    }
  }

  tcsetattr(fd, TCSANOW, &oldtio);
}
