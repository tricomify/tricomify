/** 
 * Time-stamp: <2019-01-20 07:28:09 hamada>
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
#include <signal.h>

volatile sig_atomic_t isAbort = 0;
void handleAbort(int signal);


#define MODEMDEVICE "/dev/ttyUSB0"
#define BAUDRATE B57600
#define _POSIX_SOURCE 1
#define BUFSIZE 256

int csv2json(char* str, int len) {

  const char* keys[] = {
    "obc_time",    // OBCTime
    "recv_count",  // RecvCounter
    "date",        // DATE(ddmmyy) in UTC
    "time",        // TIME(HHMMSS) in UTC
    "rx_lat",      // RX_LAT
    "rx_long",     // RX_LONG
    "rx_alt",      // RX_ALT(m)
    "rx_temp",     // Temp(RX)
    "rx_airp",     // AirPressure(RX)
    "datasize",    // DataSize
    "tx_id",       // TX_ID
    "tx_count",    // TX_Counter
    "payload",     // payload
    "data_n",      // column N in Csv
    "data_o",      // column O in Csv
    "data_p",      // column P in Csv
    "data_q"};     // column Q in Csv
  int ikey = 0;
                      
  const char separator = ',';
  char _buf[BUFSIZE-1];
  int _bufp = 0;

  printf ("{");
  for (int i=0; i<len; i++){
    char c = str[i];

    if (separator == c || 0 == c) {
      printf ("\"");
      for (int ic = 0; ic < _bufp; ic++) {
        printf ("%c", _buf[ic]);
      }
      printf ("\", ");
      _bufp = 0;
    } else {
      if (0 == _bufp) {
        printf ("\"%s\": ", keys[ikey]);
        ikey++;
      }
      _buf[_bufp] = (char)c;
      _bufp += 1;
    }

  }
  printf ("}\n");
  fflush(stdout);
}

int main(int argc,char *argv[])
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

  if ( signal(SIGINT, handleAbort) == SIG_ERR ) {
    exit(1);
  }

  while (!isAbort) {
    static char str[BUFSIZE-1];
    int len = read(fd, buf, BUFSIZE-1);
    if (BUFSIZE <= len) break;

    for (int i=0; i<len-1; i++) {
      str[i] = buf[i];
    }
    str[len-1] = 0;
    if (len>1) {
      csv2json(str, len);
      if (0) {
        printf("%s\n", str);
        fflush(stdout);
      }
    }
  }

  fprintf (stderr, "Terminate %s\n", argv[0]);
  tcsetattr(fd, TCSANOW, &oldtio);
}


void handleAbort(int signal) {
  isAbort = 1;
  fprintf (stderr, "caught signal @ %s, %s [%d].\n", __func__, __FILE__, __LINE__);
}
