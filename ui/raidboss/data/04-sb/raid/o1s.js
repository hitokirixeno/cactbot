'use strict';

// O1S - Deltascape 1.0 Savage
[{
  zoneRegex: {
    en: /^Deltascape V1\.0 \(Savage\)$/,
    cn: /^欧米茄零式时空狭缝 \(德尔塔幻境1\)$/,
  },
  timelineNeedsFixing: true,
  timelineFile: 'o1s.txt',
  triggers: [
    {
      id: 'O1S Blaze',
      regex: Regexes.startsUsing({ id: '1EDD', source: 'Alte Roite', capture: false }),
      regexDe: Regexes.startsUsing({ id: '1EDD', source: 'Alte Roite', capture: false }),
      regexFr: Regexes.startsUsing({ id: '1EDD', source: 'Alte Roite', capture: false }),
      regexJa: Regexes.startsUsing({ id: '1EDD', source: 'アルテ・ロイテ', capture: false }),
      regexCn: Regexes.startsUsing({ id: '1EDD', source: '老者', capture: false }),
      regexKo: Regexes.startsUsing({ id: '1EDD', source: '알테 로이테', capture: false }),
      response: Responses.stack(),
    },
    {
      id: 'O1S Breath Wing',
      regex: Regexes.startsUsing({ id: '1ED6', source: 'Alte Roite', capture: false }),
      regexDe: Regexes.startsUsing({ id: '1ED6', source: 'Alte Roite', capture: false }),
      regexFr: Regexes.startsUsing({ id: '1ED6', source: 'Alte Roite', capture: false }),
      regexJa: Regexes.startsUsing({ id: '1ED6', source: 'アルテ・ロイテ', capture: false }),
      regexCn: Regexes.startsUsing({ id: '1ED6', source: '老者', capture: false }),
      regexKo: Regexes.startsUsing({ id: '1ED6', source: '알테 로이테', capture: false }),
      infoText: {
        en: 'Breath Wing: Be beside boss',
        de: 'Atemschwinge: Neben Boss gehen',
        cn: '站boss附近',
      },
      tts: {
        en: 'breath wing',
        de: 'atemschwinge',
        cn: '站boss附近',
      },
    },
    {
      id: 'O1S Clamp',
      regex: Regexes.startsUsing({ id: '1EDE', source: 'Alte Roite', capture: false }),
      regexDe: Regexes.startsUsing({ id: '1EDE', source: 'Alte Roite', capture: false }),
      regexFr: Regexes.startsUsing({ id: '1EDE', source: 'Alte Roite', capture: false }),
      regexJa: Regexes.startsUsing({ id: '1EDE', source: 'アルテ・ロイテ', capture: false }),
      regexCn: Regexes.startsUsing({ id: '1EDE', source: '老者', capture: false }),
      regexKo: Regexes.startsUsing({ id: '1EDE', source: '알테 로이테', capture: false }),
      response: Responses.awayFromFront(),
    },
    {
      id: 'O1S Downburst',
      regex: Regexes.startsUsing({ id: '1ED8', source: 'Alte Roite', capture: false }),
      regexDe: Regexes.startsUsing({ id: '1ED8', source: 'Alte Roite', capture: false }),
      regexFr: Regexes.startsUsing({ id: '1ED8', source: 'Alte Roite', capture: false }),
      regexJa: Regexes.startsUsing({ id: '1ED8', source: 'アルテ・ロイテ', capture: false }),
      regexCn: Regexes.startsUsing({ id: '1ED8', source: '老者', capture: false }),
      regexKo: Regexes.startsUsing({ id: '1ED8', source: '알테 로이테', capture: false }),
      response: Responses.knockback(),
    },
    {
      id: 'O1S Roar',
      regex: Regexes.startsUsing({ id: '1ED8', source: 'Alte Roite', capture: false }),
      regexDe: Regexes.startsUsing({ id: '1ED8', source: 'Alte Roite', capture: false }),
      regexFr: Regexes.startsUsing({ id: '1ED8', source: 'Alte Roite', capture: false }),
      regexJa: Regexes.startsUsing({ id: '1ED8', source: 'アルテ・ロイテ', capture: false }),
      regexCn: Regexes.startsUsing({ id: '1ED8', source: '老者', capture: false }),
      regexKo: Regexes.startsUsing({ id: '1ED8', source: '알테 로이테', capture: false }),
      condition: function(data) {
        return data.role == 'healer';
      },
      response: Responses.aoe(),
    },
    {
      id: 'O1S Charybdis',
      regex: Regexes.startsUsing({ id: '1ED4', source: 'Alte Roite', capture: false }),
      regexDe: Regexes.startsUsing({ id: '1ED4', source: 'Alte Roite', capture: false }),
      regexFr: Regexes.startsUsing({ id: '1ED4', source: 'Alte Roite', capture: false }),
      regexJa: Regexes.startsUsing({ id: '1ED4', source: 'アルテ・ロイテ', capture: false }),
      regexCn: Regexes.startsUsing({ id: '1ED4', source: '老者', capture: false }),
      regexKo: Regexes.startsUsing({ id: '1ED4', source: '알테 로이테', capture: false }),
      condition: function(data) {
        return data.role == 'healer';
      },
      response: Responses.aoe(),
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'missingTranslations': true,
      'replaceSync': {
        'Alte Roite': 'Alte Roite',
        'Wyrm Tail': 'Antiker Drachenschweif',
      },
      'replaceText': {
        'Blaze': 'Flamme',
        'Breath Wing': 'Atemschwinge',
        'Charybdis': 'Charybdis',
        'Clamp': 'Klammer',
        'Downburst': 'Fallböe',
        'Levinbolt': 'Keraunisches Feld',
        'Roar': 'Brüllen',
        'Teleport': 'Teleport',
        'Thin Ice': 'Glatteis',
        'Twin Bolt': 'Zwillingsschlag',
        'Wyrm Tail': 'Antiker Drachenschweif',
      },
    },
    {
      'locale': 'fr',
      'missingTranslations': true,
      'replaceSync': {
        'Alte Roite': 'Alte Roite',
        'Wyrm Tail': 'Queue du dragon ancestral',
      },
      'replaceText': {
        'Blaze': 'Fournaise',
        'Breath Wing': 'Aile déferlante',
        'Charybdis': 'Charybde',
        'Clamp': 'Pinçage',
        'Downburst': 'Rafale descendante',
        'Levinbolt': 'Fulguration',
        'Roar': 'Rugissement',
        'Teleport': 'Téléportation',
        'Thin Ice': 'Verglas',
        'Twin Bolt': 'Éclairs jumeaux',
        'Wyrm Tail': 'Queue du dragon ancestral',
      },
    },
    {
      'locale': 'ja',
      'missingTranslations': true,
      'replaceSync': {
        'Alte Roite': 'アルテ・ロイテ',
        'Wyrm Tail': '太古の龍尾',
      },
      'replaceText': {
        'Blaze': '火炎',
        'Breath Wing': 'ブレスウィング',
        'Charybdis': 'ミールストーム',
        'Clamp': 'クランプ',
        'Downburst': 'ダウンバースト',
        'Levinbolt': '稲妻',
        'Roar': '咆哮',
        'Teleport': 'テレポ',
        'Thin Ice': '氷床',
        'Twin Bolt': 'ツインボルト',
        'Wyrm Tail': '太古の龍尾',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Alte Roite': '老者',
        'Wyrm Tail': '太古龙尾',
      },
      'replaceText': {
        '(safe)': '(安全)',
        '(spread)': '(分散)',
        '(stack)': '(分摊)',
        'Blaze': '炎爆',
        'Breath Wing': '风息之翼',
        'Charybdis': '大漩涡',
        'Clamp': '压迫',
        'Classical': '经典',
        'Downburst': '下行突风',
        'Inner Fireballs': '内圈火球',
        'Levinbolt': '闪电',
        'Outer Fireballs': '外圈火球',
        'Roar': '咆啸',
        'Teleport': '传送',
        'Thin Ice': '冰面',
        'Twin Bolt': '双重落雷',
        'Wyrm Tail': '太古龙尾',
      },
    },
    {
      'locale': 'ko',
      'missingTranslations': true,
      'replaceSync': {
        'Alte Roite': '알테 로이테',
        'Wyrm Tail': '태고의 용 꼬리',
      },
      'replaceText': {
        'Blaze': '화염',
        'Breath Wing': '날개바람',
        'Charybdis': '대소용돌이',
        'Clamp': '압박',
        'Downburst': '하강 기류',
        'Levinbolt': '우레',
        'Roar': '포효',
        'Teleport': '텔레포',
        'Thin Ice': '얼음 바닥',
        'Twin Bolt': '이중 낙뢰',
        'Wyrm Tail': '태고의 용 꼬리',
      },
    },
  ],
}];
