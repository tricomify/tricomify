# RoLa Receiver Box Data Format

## 生データの例 (カンマ区切り, 各データ最後には改行コードがある) 

```csv/rawdata.csv
5142517,344,200119,327,35708316,139754912,-8,35.13,100905,33,8,102,1,316,35708324,139754752,40
5166518,345,200119,351,35708384,139754864,-11,35.12,100907,18,8,103,2,29,1008,38
5172518,346,200119,357,35708404,139754816,-6,35.12,100906,33,8,104,1,346,35708324,139754736,35
5196519,347,200119,421,35708368,139754784,-7,35.11,100900,18,8,105,2,29,1008,38
5202520,348,200119,427,35708328,139754800,-6,35.11,100903,33,8,106,1,416,35708424,139754928,35
5226520,349,200119,451,35708176,139754928,-1,35.09,100906,18,8,107,2,29,1008,38
5232519,350,200119,457,35708104,139754976,0,35.10,100902,33,8,108,1,446,35708388,139754848,36
5256519,351,200119,521,35708156,139754912,4,35.09,100903,18,8,109,2,29,1008,38
5262520,352,200119,527,35708164,139754912,3,35.09,100903,33,8,110,1,516,35708332,139754864,48
5286520,353,200119,551,35708208,139754960,-5,35.08,100897,18,8,111,2,29,1008,38
5292521,354,200119,557,35708192,139755008,0,35.08,100899,33,8,112,1,546,35708584,139755136,65
5316521,355,200119,621,35708244,139754880,-2,35.07,100892,18,8,113,2,29,1008,38
5322520,356,200119,627,35708252,139754864,-4,35.07,100892,33,8,114,1,616,35708484,139755072,53
5346521,357,200119,651,35708248,139754800,-2,35.08,100892,18,8,115,2,29,1008,38
5352521,358,200119,657,35708248,139754800,-1,35.07,100891,33,8,116,1,646,3570838
```

## 生データの各カラム説明
|column| 呼称 | 説明 |
|--:|:------------|:------------|
| 1 | OBCTime     | OBC時刻(msec). 電源ONからの経過時刻. Arduinoのmillis()関数値 |
| 2 | RecvCounter | 受信機の受信回数カウンタ値 |
| 3 | GPSDATE     | 受信機GPS日付(ddmmyy, UTC) |
| 4 | GPSTIME     | 受信機GPS時刻(HHMMSS, UTC) |
| 5 | RX_LAT      | 受信機の緯度(10進､符号付き) |
| 6 | RX_LONG     | 受信機の経度(10進､符号付き) |
| 7 | RX_ALT      | 受信機の高度(m)(符号付き) |
| 8 | Temp(RX)    | 受信機基板温度(符号付き小数点以下2桁) |
| 9 | AirPressure(RX) | 受信機気圧(hPa, 100を乗じて整数化)(符号付き) |
|10 | DataSize   | 受信データサイズ. Byte表記 |
|11 | TX_ID      | 送信機ID |
|12 | TX_Counter | 送信機の送信カウンタ値(1byteループ) |
|13 | payload    | 送信ペイロードタイプ |
|14 | column N   | ペイロードタイプにより意味が異なる. 次項参照. |
|15 | column O   | ペイロードタイプにより意味が異なる. 次項参照. |
|16 | column P   | ペイロードタイプにより意味が異なる. 次項参照. |
|17 | column Q   | ペイロードタイプにより意味が異なる. 次項参照. |

### ペイロードが1の場合
|column| name | 概要 |
|--:|:-----------|:------------|
|14 | column N   | UTC時刻(HHMMSS) |
|15 | column O   | 送信機緯度(10進)(符号付き) |
|16 | column P   | 送信機経度(10進)(符号付き) |
|17 | column Q   | 送信機高度(m)(符号付き) |

### ペイロードが2の場合
|column| name | 概要 |
|--:|:-----------|:------------|
|14 | column N   | 送信機温度(現段階では小数点切り捨て)(符号付き)
|15 | column O   | 送信機気圧(現段階では小数点切り捨て)
|16 | column P   | 送信機電源電圧(10を掛けて整数化した値)
|17 | column Q   | N/A
