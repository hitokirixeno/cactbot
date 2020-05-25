'use strict';

// TODO: add post-anonymizing `validateNames` as well
// TODO: handle LogLine subFields properly.

// canAnonymize: boolean whether this line can be anonymized
// playerIds: map of indexes from a player id to the index of that player name
// isUnknown: needs more information, never seen this log
// optionalFields: a list of fields that are ok to not appear (or have invalid ids)
// firstUnknownField: fields at this index and beyond are cleared, when anonymizing
// globalInclude: include all of these lines in any split
// lastInclude: include the last line of this type in any split

// TODO: is the first byte of ids always flags, such that "..000000" is always empty?
const emptyIds = ['E0000000', '80000000'];

// TODO: build NetRegexes out of this, or somehow deduplicate.
const logDefinitions = {
  '00': {
    type: 'LogLine',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'code',
      3: 'name',
      4: 'line',
    },
    subFields: {
      code: {
        '0039': {
          type: 'message',
          canAnonymize: true,
        },
        '0038': {
          type: 'echo',
          canAnonymize: true,
        },
        '0044': {
          type: 'dialog',
          canAnonymize: true,
        },
        '0839': {
          type: 'message',
          canAnonymize: true,
        },
      },
    },
  },
  '01': {
    type: 'ChangeZone',
    lastInclude: true,
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
    },
    canAnonymize: true,
  },
  '02': {
    type: 'ChangePrimaryPlayer',
    lastInclude: true,
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
    },
    playerIds: {
      2: 3,
    },
    canAnonymize: true,
  },
  '03': {
    type: 'AddCombatant',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
      4: 'job',
      5: 'level',
      6: 'owner',
      8: 'world',
      9: 'npcNameId',
      10: 'npcBaseId',
      12: 'hp',
      17: 'x',
      18: 'y',
      19: 'z',
      20: 'heading',
    },
    playerIds: {
      2: 3,
      6: null,
    },
    canAnonymize: true,
  },
  '04': {
    type: 'RemoveCombatant',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
      4: 'job',
      5: 'level',
      6: 'owner',
      8: 'world',
      9: 'npcNameId',
      10: 'npcBaseId',
      12: 'hp',
      17: 'x',
      18: 'y',
      19: 'z',
      20: 'heading',
    },
    playerIds: {
      2: 3,
      6: null,
    },
    canAnonymize: true,
  },
  '05': {
    type: 'AddBuff',
    isUnknown: true,
  },
  '06': {
    type: 'RemoveBuff',
    isUnknown: true,
  },
  '07': {
    type: 'FlyingText',
    isUnknown: true,
  },
  '08': {
    type: 'OutgoingAbility',
    isUnknown: true,
  },
  '10': {
    type: 'IncomingAbility',
    isUnknown: true,
  },
  '11': {
    type: 'PartyList',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'partyCount',
      3: 'id0',
      4: 'id1',
      5: 'id2',
      6: 'id3',
      7: 'id4',
      8: 'id5',
      9: 'id6',
      10: 'id7',
      11: 'id8',
      12: 'id9',
      13: 'id10',
      14: 'id11',
      15: 'id12',
      16: 'id13',
      17: 'id14',
      18: 'id15',
      19: 'id16',
      20: 'id17',
      21: 'id18',
      22: 'id19',
      23: 'id20',
      24: 'id21',
      25: 'id22',
      26: 'id23',
    },
    playerIds: {
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null,
      12: null,
      13: null,
      14: null,
      15: null,
      16: null,
      17: null,
      18: null,
      19: null,
      20: null,
      21: null,
      22: null,
      23: null,
      24: null,
      25: null,
      26: null,
    },
    optionalFields: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
      16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
    canAnonymize: true,
  },
  '12': {
    type: 'PlayerStats',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'job',
      3: 'strength',
      4: 'dexterity',
      5: 'vitality',
      6: 'intelligence',
      7: 'mind',
      8: 'piety',
      9: 'attackPower',
      10: 'directHit',
      11: 'criticalHit',
      12: 'attackMagicPotency',
      13: 'healMagicPotency',
      14: 'determination',
      15: 'skillSpeed',
      16: 'spellSpeed',
      18: 'tenacity',
    },
    canAnonymize: true,
  },
  '13': {
    type: 'CombatantHP',
    isUnknown: true,
  },
  '20': {
    type: 'NetworkStartsCasting',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'sourceId',
      3: 'source',
      4: 'id',
      5: 'ability',
      6: 'targetId',
      7: 'target',
      8: 'castTime',
    },
    optionalFields: [6],
    playerIds: {
      2: 3,
      6: 7,
    },
    canAnonymize: true,
  },
  '21': {
    type: 'NetworkAbility',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'sourceId',
      3: 'source',
      4: 'id',
      5: 'ability',
      6: 'targetId',
      7: 'target',
      8: 'flags',
      40: 'x',
      41: 'y',
      42: 'z',
      43: 'heading',
    },
    playerIds: {
      2: 3,
      6: 7,
    },
    optionalFields: [6],
    firstUnknownField: 44,
    canAnonymize: true,
  },
  '22': {
    type: 'NetworkAOEAbility',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'sourceId',
      3: 'source',
      4: 'id',
      5: 'ability',
      6: 'targetId',
      7: 'target',
      8: 'flags',
      40: 'x',
      41: 'y',
      42: 'z',
      43: 'heading',
    },
    playerIds: {
      2: 3,
      6: 7,
    },
    optionalFields: [6],
    firstUnknownField: 44,
    canAnonymize: true,
  },
  '23': {
    type: 'NetworkCancelAbility',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
    },
    playerIds: {
      2: 3,
    },
    canAnonymize: true,
  },
  '24': {
    type: 'NetworkDoT',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
    },
    playerIds: {
      2: 3,
    },
    canAnonymize: true,
  },
  '25': {
    type: 'NetworkDeath',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'targetId',
      3: 'target',
      4: 'sourceId',
      5: 'source',
    },
    playerIds: {
      2: 3,
      4: 5,
    },
    canAnonymize: true,
  },
  '26': {
    type: 'NetworkBuff',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'effectId',
      3: 'effect',
      4: 'duration',
      5: 'sourceId',
      6: 'source',
      7: 'targetId',
      8: 'target',
      9: 'count',
    },
    playerIds: {
      5: 6,
      7: 8,
    },
    canAnonymize: true,
  },
  '27': {
    type: 'NetworkTargetIcon',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'targetId',
      3: 'target',
      6: 'id',
    },
    playerIds: {
      2: 3,
    },
    canAnonymize: true,
  },
  '28': {
    type: 'NetworkRaidMarker',
    isUnknown: true,
  },
  '29': {
    type: 'NetworkTargetMarker',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'type', // Add, Update, Delete
      3: 'data',
      4: 'sourceId', // ?
      5: 'targetId', // ?
    },
    playerIds: {
      4: null,
      5: null,
    },
  },
  '30': {
    type: 'NetworkBuffRemove',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'effectId',
      3: 'effect',
      5: 'sourceId',
      6: 'source',
      7: 'targetId',
      8: 'target',
      9: 'count',
    },
    playerIds: {
      5: 6,
      7: 8,
    },
    canAnonymize: true,
  },
  '31': {
    type: 'NetworkGauge',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'data0',
      4: 'data1',
      5: 'data2',
      6: 'data3',
    },
    playerIds: {
      2: null,
    },
    // Sometimes this last field looks like a player id.
    // For safety, anonymize all of the gauge data.
    firstUnknownField: 3,
    canAnonymize: true,
  },
  '32': {
    type: 'NetworkWorld',
  },
  '33': {
    type: 'Network6D',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'data0',
      3: 'data1',
      4: 'data2',
      5: 'data3',
      6: 'data4',
      7: 'data5',
    },
    canAnonymize: true,
  },
  '34': {
    type: 'NetworkNameToggle',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
      4: 'id',
      5: 'name',
    },
    playerIds: {
      2: 3,
      4: 5,
    },
    canAnonymize: true,
  },
  '35': {
    type: 'NetworkTether',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'sourceId',
      3: 'source',
      4: 'targetId',
      5: 'target',
      8: 'id',
    },
    playerIds: {
      2: 3,
      4: 5,
    },
    canAnonymize: true,
    firstUnknownField: 9,
  },
  '36': {
    type: 'LimitBreak',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'data0',
      3: 'data1',
    },
    canAnonymize: true,
  },
  '37': {
    type: 'NetworkEffectResult',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
    },
    playerIds: {
      2: 3,
    },
    firstUnknownField: 22,
    canAnonymize: true,
  },
  '38': {
    type: 'NetworkStatusEffects',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'targetId',
      3: 'target',
      5: 'hp',
      6: 'maxHp',
      11: 'x',
      12: 'y',
      13: 'z',
      14: 'heading',
      15: 'data0',
      16: 'data1',
      17: 'data2',
      18: 'data3',
      19: 'data4',
    },
    playerIds: {
      2: 3,
    },
    firstUnknownField: 20,
    canAnonymize: true,
  },
  '39': {
    type: 'NetworkUpdateHP',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
    },
    playerIds: {
      2: 3,
    },
    canAnonymize: true,
  },
  '249': {
    type: 'ParserInfo',
    globalInclude: true,
    canAnonymize: true,
  },
  '250': {
    type: 'ProcessInfo',
    globalInclude: true,
    canAnonymize: true,
  },
  '251': {
    type: 'Debug',
    globalInclude: true,
    canAnonymize: true,
  },
  '252': {
    type: 'PacketDump',
    canAnonymize: false,
  },
  '253': {
    type: 'Version',
    globalInclude: true,
    canAnonymize: true,
  },
  '254': {
    type: 'Error',
    canAnonymize: false,
  },
  '255': {
    type: 'Timer',
    isUnknown: true,
  },
};

const fakePlayerNames = [
  'Tini Poutini',
  'Potato Chippy',
  'Baked Potato',
  'Au Gratin',
  'Papas Fritas',
  'Potato Latke',
  'Patatas Bravas',
  'Potato Casserole',
  'Tater Tot',
  'Hash Brown',
  'French Fry',
  'Mashed Potatoes',
  'Dum Aloo',
];

class ConsolePrinter {
  print(splitLine) {
    console.log(splitLine.join('|'));
  }

  warn(reason, splitLine) {
    if (typeof splitLine === 'undefined')
      console.error(reason);
    else
      console.error(reason + ': ' + splitLine.join('|'));
  }
}

class AnonymizingPrinter {
  constructor(printer, playerNames, logTypes) {
    this.printer = printer;
    // list of fake names to use
    if (playerNames)
      this.playerNames = [...playerNames];
    else
      this.playerNames = [...fakePlayerNames];
    // uppercase hex id -> name
    this.playerMap = {};
    // uppercase hex real player id -> uppercase hex fake player id
    this.anonMap = {};
    if (logTypes)
      this.logTypes = logTypes;
    else
      this.logTypes = logDefinitions;
    this.lastPlayerIdx = 0x10FF0000;

    this.fakeHash = '01234567012345670123456701234567';

    for (let id of emptyIds) {
      // Empty ids have already been anonymized (to themselves).
      this.anonMap[id] = id;
      // Empty ids have no name.
      this.playerMap[id] = '';
    }
  }

  validateIds() {
    let success = true;

    // valid player ids
    let playerIds = Object.keys(this.anonMap);
    // made up anon ids
    let anonIds = Object.keys(this.playerMap);

    for (const anonId of anonIds) {
      if (emptyIds.includes(anonId))
        continue;
      if (playerIds.includes(anonId)) {
        this.printer.warn('player id collision ' + anonId);
        success = false;
      }
    }

    return success;
  }

  validateLine(splitLine) {
    let success = true;

    let playerIds = Object.keys(this.anonMap);

    for (let idx = 0; idx < splitLine.length; ++idx) {
      let field = splitLine[idx];
      if (emptyIds.includes(field))
        continue;
      if (playerIds.includes(field)) {
        this.printer.warn('uncaught player id ' + field + ', idx: ' + idx, splitLine);
        success = false;
      }
    }

    return success;
  }

  getNewPlayerName(decimalId) {
    if (this.playerNames.length > 0)
      return this.playerNames.shift();

    // Turn decimalId into a lowercase string of letters.
    let randomStr = decimalId.toString(26).split('').map((c) => {
      // shift [0-9] to [a-j]
      if (c.match(/\d/) !== null)
        return String.fromCharCode(parseInt(c) + 'a'.charCodeAt());
      // shift [a-p] to [k-z]
      return String.fromCharCode(c.charCodeAt() + 10);
    }).join('');
    return 'X\'' + randomStr + ' Tia';
  }

  addNewPlayer() {
    this.lastPlayerIdx++;
    let playerName = this.getNewPlayerName(this.lastPlayerIdx);
    let playerId = this.lastPlayerIdx.toString(16).toUpperCase();
    this.playerMap[playerId] = playerName;
    return playerId;
  }

  print(splitLine) {
    // Improperly closed files can leave a blank line.
    if (splitLine.length <= 1) {
      this.printer.print(splitLine);
      return;
    }

    // Always replace the hash.
    if (splitLine[splitLine.length - 1].length === 32)
      splitLine[splitLine.length - 1] = this.fakeHash;
    else
      this.printer.warn('missing hash ' + splitLine.length, splitLine);

    let type = this.logTypes[splitLine[0]];
    if (!type || type.isUnknown) {
      this.printer.warn('unknown type', splitLine);
      return;
    }

    // Drop any lines that can't be handled.
    if (!type.canAnonymize)
      return;

    if (!type.playerIds) {
      this.printer.print(splitLine);
      return;
    }

    // Anonymize fields.
    for (let idIdx in type.playerIds) {
      idIdx = parseInt(idIdx);
      const nameIdx = type.playerIds[idIdx];

      // Check for ids that are out of range, possibly optional.
      // The last field is always the hash, so don't include that either.
      if (idIdx > splitLine.length - 2) {
        // Some ids are optional and may not exist, these are ok to skip.
        if (type.optionalFields && type.optionalFields.includes(idIdx))
          continue;

        this.printer.warn('unexpected missing field ' + idIdx, splitLine);
        continue;
      }

      // TODO: keep track of uppercase/lowercase??
      let playerId = splitLine[idIdx].toUpperCase();

      // Cutscenes get added combatant messages with ids such as 'FF000006' and no name.
      const isCutsceneId = playerId.substr(0, 2) === 'FF';

      // Handle weirdly shaped ids.
      if (playerId.length !== 8 || isCutsceneId) {
        const isOptional = type.optionalFields && type.optionalFields.includes(idIdx);
        // Also, sometimes ids are '0000' or '0'.  Treat these the same as implicitly optional.
        const isZero = parseInt(playerId) === 0;
        if (isOptional || isZero || isCutsceneId) {
          // If we have an invalid player id, it is fine if it has been marked optional or is zero.
          // However, in these cases, it should have an empty name (or no name field).
          // e.g. 21|2019-09-07T10:18:11.4390000-07:00|10FF007E|X'xzzrmk Tia|01|Key Item|793E69||
          if (typeof nameIdx === 'number' && splitLine[nameIdx] !== '')
            this.printer.warn('invalid id with valid name at index ' + idIdx, splitLine);
          continue;
        }

        this.printer.warn('expected id field at index ' + idIdx, splitLine);
        continue;
      }

      // Ignore monsters.
      if (playerId[0] === '4')
        continue;

      // Replace the id at this index with a fake player id.
      if (!this.anonMap[playerId])
        this.anonMap[playerId] = this.addNewPlayer();
      let fakePlayerId = this.anonMap[playerId];
      if (!fakePlayerId)
        this.printer.warn('internal error: missing player id', splitLine);
      if (typeof this.playerMap[fakePlayerId] === 'undefined')
        this.printer.warn('internal error: missing player name ' + fakePlayerId, splitLine);
      splitLine[idIdx] = fakePlayerId;

      // Replace the corresponding name, if there's a name mapping.
      if (typeof nameIdx === 'number')
        splitLine[nameIdx] = this.playerMap[fakePlayerId];
    }

    // For unknown fields, just clear them, as they may have ids.
    if (typeof type.firstUnknownField !== 'undefined') {
      for (let idx = type.firstUnknownField; idx < splitLine.length - 1; ++idx)
        splitLine[idx] = '';
    }

    this.printer.print(splitLine);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    logDefinitions: logDefinitions,
    ConsolePrinter: ConsolePrinter,
    AnonymizingPrinter: AnonymizingPrinter,
  };
}
