'use strict';

[{
  zoneRegex: {
    en: /^Thok Ast Thok \(Extreme\)$/,
    cn: /^罗波那歼殛战$/,
  },
  timelineFile: 'ravana-ex.txt',
  triggers: [
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'missingTranslations': true,
      'replaceSync': {
        'Dance to the song of ringing steel': 'Ein Tanz im Takt des singenden Stahls',
      },
      'replaceText': {
        '1st Double Prey': '1st Double Prey', // FIXME
        '2nd Double Prey': '2nd Double Prey', // FIXME
        'Atma-Linga': 'Atma-Linga',
        'Beetle Avatar': 'Käfer-Inkarnation',
        'Blades of Carnage and Liberation': 'Klingen des Gemetzels und der Befreiung',
        'Blinding Blade': 'Blendende Klinge',
        'Bloody Fuller': 'Blutrille',
        'Chandrahas': 'Chandrahas',
        'Dragonfly Avatar': 'Libellen-Inkarnation',
        'Final Liberation': 'Endgültige Befreiung',
        'Inner AOE': 'AoE innen',
        'Laughing Rose': 'Lachende Rose',
        '(?<! )Liberation': 'Befreiung',
        'Orbs': 'Orbs', // FIXME
        'Outer AOE': 'AoE außen',
        'Pillars of Heaven': 'Säulen des Himmels',
        'Prelude to Liberation': 'Auftakt zur Befreiung',
        'Scorpion Avatar': 'Skorpion-Inkarnation',
        'Surpanakha': 'Surpanakha',
        'Swift Liberation': 'Schnelle Befreiung',
        'Tapasya': 'Tapasya',
        'The Rose Of Conquest': 'Rose der Eroberung',
        'The Rose Of Conviction': 'Rose der Überzeugung',
        'The Rose Of Hate': 'Rose des Hasses',
        'The Seeing': 'Sehende',
        'Warlord Flame': 'Kriegsherren-Flamme',
        'Warlord Shell': 'Kriegsherren-Hülle',
      },
    },
    {
      'locale': 'fr',
      'missingTranslations': true,
      'replaceSync': {
        'Dance to the song of ringing steel': 'Dance to the song of ringing steel', // FIXME
      },
      'replaceText': {
        '1st Double Prey': '1st Double Prey', // FIXME
        '2nd Double Prey': '2nd Double Prey', // FIXME
        'Atma-Linga': 'Atma-Linga',
        'Beetle Avatar': 'Incarnation du scarabée',
        'Blades of Carnage and Liberation': 'Lames ardentes',
        'Blinding Blade': 'Lame aveuglante',
        'Bloody Fuller': 'Entaille sanglante',
        'Chandrahas': 'Chandrahas',
        'Dragonfly Avatar': 'Incarnation de la libellule',
        'Final Liberation': 'Libération rapide',
        'Inner AOE': 'Inner AOE', // FIXME
        'Laughing Rose': 'Rose rieuse',
        '(?<! )Liberation': 'Libération',
        'Orbs': 'Orbs', // FIXME
        'Outer AOE': 'Outer AOE', // FIXME
        'Pillars of Heaven': 'Piliers du ciel',
        'Prelude to Liberation': 'Prélude de la libération',
        'Scorpion Avatar': 'Incarnation du scorpion',
        'Surpanakha': 'Surpanakha',
        'Swift Liberation': 'Libération rapide',
        'Tapasya': 'Tapasya',
        'The Rose Of Conquest': 'Rose de la conquête',
        'The Rose Of Conviction': 'Rose de la conviction',
        'The Rose Of Hate': 'Rose de la célérité',
        'The Seeing': 'Élytre\(s\)',
        'Warlord Flame': 'Flamme du Maître des lames',
        'Warlord Shell': 'Bouclier du Maître des lames',
      },
    },
    {
      'locale': 'ja',
      'missingTranslations': true,
      'replaceSync': {
        'Ravana': 'ラーヴァナ',
      },
      'replaceText': {
        '1st Double Prey': '1st Double Prey', // FIXME
        '2nd Double Prey': '2nd Double Prey', // FIXME
        'Atma-Linga': 'アートマリンガ',
        'Beetle Avatar': '甲殻の化身',
        'Blades of Carnage and Liberation': '焔剣',
        'Blinding Blade': '武神閃',
        'Bloody Fuller': '神通力',
        'Chandrahas': 'チャンドラハース',
        'Dragonfly Avatar': '武辺の化身',
        'Final Liberation': '光焔【滅】',
        'Inner AOE': 'Inner AOE', // FIXME
        'Laughing Rose': '月気弾',
        '(?<! )Liberation': '光焔【破】',
        'Orbs': 'Orbs', // FIXME
        'Outer AOE': 'Outer AOE', // FIXME
        'Pillars of Heaven': '衝天撃',
        'Prelude to Liberation': '光焔【序】',
        'Scorpion Avatar': '光焔の化身',
        'Surpanakha': '徹甲散弾',
        'Swift Liberation': '光焔【急】',
        'Tapasya': '鬼武神',
        'The Rose Of Conquest': '闘気爆砕',
        'The Rose Of Conviction': '闘気弾',
        'The Rose Of Hate': '闘気砲',
        'The Seeing': '左翼防御/右翼防御/两翼防御',
        'Warlord Flame': '武神焔',
        'Warlord Shell': '武神甲',
      },
    },
    {
      'locale': 'cn',
      'missingTranslations': true,
      'replaceSync': {
        'Ravana': '罗波那',
      },
      'replaceText': {
        '1st Double Prey': '1st Double Prey', // FIXME
        '2nd Double Prey': '2nd Double Prey', // FIXME
        'Atma-Linga': '武神魂',
        'Beetle Avatar': '甲壳化身',
        'Blades of Carnage and Liberation': '焰剑',
        'Blinding Blade': '武神闪',
        'Bloody Fuller': '神通力',
        'Chandrahas': '明月之笑',
        'Dragonfly Avatar': '武毅化身',
        'Final Liberation': '光焰【灭】',
        'Inner AOE': 'Inner AOE', // FIXME
        'Laughing Rose': '月气弹',
        '(?<! )Liberation': '光焰【破】',
        'Orbs': 'Orbs', // FIXME
        'Outer AOE': 'Outer AOE', // FIXME
        'Pillars of Heaven': '冲天击',
        'Prelude to Liberation': '光焰【序】',
        'Scorpion Avatar': '光焰化身',
        'Surpanakha': '穿甲散弹',
        'Swift Liberation': '光焰【急】',
        'Tapasya': '鬼武神',
        'The Rose Of Conquest': '斗气爆碎',
        'The Rose Of Conviction': '斗气弹',
        'The Rose Of Hate': '斗气炮',
        'The Seeing': '左翼防御/右翼防御/两翼防御',
        'Warlord Flame': '武神焰',
        'Warlord Shell': '武神甲',
      },
    },
    {
      'locale': 'ko',
      'missingTranslations': true,
      'replaceSync': {
        'Ravana': '라바나',
      },
      'replaceText': {
        '1st Double Prey': '1st Double Prey', // FIXME
        '2nd Double Prey': '2nd Double Prey', // FIXME
        'Atma-Linga': '불멸혼',
        'Beetle Avatar': '갑각의 화신',
        'Blades of Carnage and Liberation': '불꽃검',
        'Blinding Blade': '무신섬',
        'Bloody Fuller': '신통력',
        'Chandrahas': '찬드라하스',
        'Dragonfly Avatar': '무도의 화신',
        'Final Liberation': '광염: 파멸',
        'Inner AOE': 'Inner AOE', // FIXME
        'Laughing Rose': '월기탄',
        '(?<! )Liberation': '광염: 전개',
        'Orbs': 'Orbs', // FIXME
        'Outer AOE': 'Outer AOE', // FIXME
        'Pillars of Heaven': '충천격',
        'Prelude to Liberation': '광염: 발단',
        'Scorpion Avatar': '광염의 화신',
        'Surpanakha': '관통산탄',
        'Swift Liberation': '광염: 절정',
        'Tapasya': '귀무신',
        'The Rose Of Conquest': '투기탄쇄',
        'The Rose Of Conviction': '투기탄',
        'The Rose Of Hate': '투기포',
        'The Seeing': '좌익 방어/우익 방어/양익 방어',
        'Warlord Flame': '돌연변이',
        'Warlord Shell': '무신갑',
      },
    },
  ],
}];
