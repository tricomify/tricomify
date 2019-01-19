"use strict";

const moji = require('moji');
const macZenkakuDash = String.fromCharCode(8213);
const macZenkakuHyphen = String.fromCharCode(8208);
const macZenkakuChouon = String.fromCharCode(12540);
const macZenkakuMinus = String.fromCharCode(8722);
const macZenkakuHalfMinus = String.fromCharCode(8208);
const macZenkakuTilda = String.fromCharCode(12316);
const macZenkakuHankaku = str => (str.replace(/`${macZenkakuDash}`/g, /-/).replace(/`${macZenkakuHyphen}`/g, /-/).replace(/`${macZenkakuChouon}`/g, /-/)
                                  .replace(/`${macZenkakuMinus}`/g, /-/).replace(/`${macZenkakuHalfMinus}`/g, /-/).replace(/`${macZenkakuTilda}`/g, /-/));
const removeSpaceZenkaku = str => (str.replace(/　/g, ''));
const removeSpace = str => (removeSpaceZenkaku(str.replace(/ /g, '')));
const removeHyphen = str => (str.replace(/-/g, ''));
const convZenkakuHankaku = str => (moji(str).convert('ZK', 'HK').convert('ZE', 'HE').toString());
exports.convZenkakuHankakuAddress = str => (removeSpace(convZenkakuHankaku(macZenkakuHankaku(str))));


exports.prefecture_kanji = {
    "Aichi":      '愛知県',  // tested
    "Akita":      '秋田県',  // tested
    "Aomori":     '青森県',  // tested
    "Chiba":      '千葉県',  // tested
    "Ehime":      '愛媛県',  // tested
    "Fukui":      '福井県',  // tested
    "Fukuoka":    '福岡県',  // tested
    "Fukushima":  '福島県',  // tested
    "Gifu":       '岐阜県',  // tested
    "Gunma":      '群馬県',  // tested
    "Hiroshima":  '広島県',  // tested
    "Hokkaidō":   '北海道',  // tested
    "Hyōgo":      '兵庫県',  // tested
    "Ibaraki":    '茨城県',  // tested
    "Ishikawa":   '石川県',  // tested
    "Iwate":      '岩手県',  // tested
    "Kagawa":     '香川県',  // tested
    "Kagoshima":  '鹿児島県',// tested
    "Kanagawa":   '神奈川県',// tested
    "Kōchi":      '高知県',  // tested
    "Kumamoto":   '熊本県',  // tested
    "Kyōto":      '京都府',  // tested
    "Mie":        '三重県',  // tested
    "Miyagi":     '宮城県',  // tested
    "Miyazaki":   '宮崎県',  // tested
    "Nagano":     '長野県',  // tested
    "Nagasaki":   '長崎県',  // tested
    "Nara":       '奈良県',  // tested
    "Niigata":    '新潟県',  // tested
    "Ōita":       '大分県',  // tested
    "Okayama":    '岡山県',  // tested
    "Okinawa":    '沖縄県',  // tested
    "Ōsaka":      '大阪府',  // tested
    "Saga":       '佐賀県',  // tested
    "Saitama":    '埼玉県',  // tested
    "Shimane":    '島根県',  // tested
    "Shizuoka":   '静岡県',  // tested
    "Shiga": '     滋賀県',  // tested
    "Tochigi":    '栃木県',  // tested
    "Tokushima":  '徳島県',  // tested
    "Tōkyō":      '東京都',  // tested
    "Tottori":    '鳥取県',  // tested
    "Toyama":     '富山県',  // tested
    "Yamagata":   '山形県',  // tested
    "Yamaguchi":  '山口県',  // tested
    "Yamanashi":  '山梨県',  // tested
    "Wakayama":   '和歌山県',// tested
}

