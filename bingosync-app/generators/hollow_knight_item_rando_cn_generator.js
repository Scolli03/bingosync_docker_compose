// Create Math.seedrandom function and maybe some other stuff idk can't be bothered to understand this obfuscated crap
(function(j, i, g, m, k, n, o) { function q(b) { var e, f, a = this, c = b.length, d = 0, h = a.i = a.j = a.m = 0; a.S = []; a.c = []; for (c || (b = [c++]); d < g;) a.S[d] = d++; for (d = 0; d < g; d++) e = a.S[d], h = h + e + b[d % c] & g - 1, f = a.S[h], a.S[d] = f, a.S[h] = e; a.g = function(b) { var c = a.S, d = a.i + 1 & g - 1, e = c[d], f = a.j + e & g - 1, h = c[f]; c[d] = h; c[f] = e; for (var i = c[e + h & g - 1]; --b;) d = d + 1 & g - 1, e = c[d], f = f + e & g - 1, h = c[f], c[d] = h, c[f] = e, i = i * g + c[e + h & g - 1]; a.i = d; a.j = f; return i }; a.g(g) } function p(b, e, f, a, c) { f = []; c = typeof b; if (e && c == "object") for (a in b) if (a.indexOf("S") < 5) try { f.push(p(b[a], e - 1)) } catch (d) {} return f.length ? f : b + (c != "string" ? "\0" : "") } function l(b, e, f, a) { b += ""; for (a = f = 0; a < b.length; a++) { var c = e, d = a & g - 1, h = (f ^= e[a & g - 1] * 19) + b.charCodeAt(a); c[d] = h & g - 1 } b = ""; for (a in e) b += String.fromCharCode(e[a]); return b } i.seedrandom = function(b, e) { var f = [], a; b = l(p(e ? [b, j] : arguments.length ? b : [(new Date).getTime(), j, window], 3), f); a = new q(f); l(a.S, j); i.random = function() { for (var c = a.g(m), d = o, b = 0; c < k;) c = (c + b) * g, d *= g, b = a.g(1); for (; c >= n;) c /= 2, d /= 2, b >>>= 1; return (c + b) / d }; return b }; o = i.pow(g, m); k = i.pow(2, k); n = k * 2; l(i.random(), j) })([], Math, 256, 6, 52);

// Reduces fluff in bingoList object if there's a method to set defaults
function preprocessBingoList(bingoList) {
    for (const key of Object.keys(bingoList)) {
        bingoList[key].name = key;

        if (!bingoList[key].hasOwnProperty("Desc")) {
            bingoList[key].Desc = "#!#" + key + "#!#";
        }

        if (!bingoList[key].hasOwnProperty("Type")) {
            bingoList[key].Type = "Generic";
        }

        if (!bingoList[key].hasOwnProperty("Excludes")) {
            bingoList[key].Excludes = [];
        }

        if (!bingoList[key].hasOwnProperty("Prereqs")) {
            bingoList[key].Prereqs = [];
        }
    }
}

bingoGenerator = function(bingoList, opts) {
    // Make sure everything exists that should
    preprocessBingoList(bingoList);

    // Separate goals into currently choosable / unchoosable
    var choosable = [];
    var unchoosable = [];

    for (const key of Object.keys(bingoList)) {
        if (bingoList[key].Prereqs.length > 0) {
            unchoosable.push(key);
        } else {
            choosable.push(key);
        }
    }

    // Create counts for all types
    var types = { };
    for (const key of Object.keys(bingoTypes)) {
        types[key] = bingoTypes[key].Max;
    }

    // Seed the random
    Math.seedrandom(opts.seed || Math.ceil(999999 * Math.random()).toString());

    var chosenGoals = [];
    for (var i = 0; i < 25; i++) {
        // Get a random goal, add to chosen
        var index = Math.floor(Math.random() * choosable.length);
        var goal = bingoList[choosable[index]];
        chosenGoals.push({ "name": goal.Desc });

        // Remove chosen goal from choosable list
        choosable.splice(index, 1);

        // Increment type counter, remove other goals of type if relevant
        types[goal.Type]--;
        if (types[goal.Type] <= 0) {
            for (var j = 0; j < choosable.length; j++) {
                if (bingoList[choosable[j]].Type === goal.Type) {
                    choosable.splice(j, 1);
                    j--;
                }
            }

            // Gotta check both arrays
            // Pretty dumb code duplication but at this point I'm not gonna bother changing the design
            for (var j = 0; j < unchoosable.length; j++) {
                if (unchoosable[j].Type === goal.Type) {
                    unchoosable.splice(j, 1);
                    j--;
                }
            }
        }

        // Remove excluded goals if relevant
        for (var j = 0; j < goal.Excludes.length; j++) {
            for (var k = 0; k < choosable.length; k++) {
                if (choosable[k] == goal.Excludes[j]) {
                    choosable.splice(k, 1);
                    k--;
                }
            }

            for (var k = 0; k < unchoosable.length; k++) {
                if (unchoosable[k] == goal.Excludes[j]) {
                    unchoosable.splice(k, 1);
                    k--;
                }
            }
        }

        // Check for newly choosable goals
        for (var j = 0; j < unchoosable.length; j++) {
            for (var k = 0; k < bingoList[unchoosable[j]].Prereqs.length; k++) {
                if (bingoList[unchoosable[j]].Prereqs[k] === goal.name) {
                    choosable.push(unchoosable[j]);
                    unchoosable.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
    }

    return chosenGoals;
}

var bingoList = {
//Sorted alphabetically and grouped

//Bosses. Dream versions grouped instead of alphabetical

  "BVessel":{
      "Desc":"????????????",
      "Excludes": ["LostKin"]
  },

  "LostKin":{
      "Desc":"????????????",
      "Excludes": ["BVessel"]
  },

  "CG1":{
      "Desc": "?????????1",
      "Excludes": ["CG2"]
  },

  "CG2": {
      "Desc":"?????????2",
      "Excludes": ["CG1"]
  },

  "Collector":{
      "Desc": "?????????"
  },

  "DDefender":{
      "Desc":"??????",
      "Excludes": ["WhiteDefender"]
  },

  "WhiteDefender":{
    "Desc":"?????????",
    "Type": "Tiebreaker",
    "Excludes": ["DDefender"]
  },


  "FChamp": {
      "Desc": "????????????"
  },

  "FKnight_BMawlek": {
      "Desc": "?????????+?????????"
  },

  "Flukemarm":{
      "Desc": "????????????"
  },

  /* Disabled but not forgotten my king PepeHands

  "GPZote":{
      "Desc": "Grey Prince Zote",
      "Type": "Tiebreaker"
  },

  */

  "HiveKnight":{
      "Desc": "????????????",
      "Excludes": [ "HiveMask" ]
  },

  "Hornet2": {
      "Desc": "?????????2"
  },

  "MLords":{
      "Desc": "?????????"
  },

  "Nosk":{
      "Desc": "?????????"
  },

  "PaleLurker":{
      "Desc":"???????????????"
  },

  "Radiant": { // Under I know you're reading this and I hope it fills you with joy
      "Desc": "??????????????????",
      "Excludes": ["Godhome", "Ordeal20"]
  },

  "SoulMaster": {
      "Desc": "????????????",
      "Excludes": ["SoulTyrant"]
  },

  "SoulTyrant": {
      "Desc": "????????????",
      "Excludes": [ "SoulMaster" ]
  },

  "TLord":{
      "Desc": "????????????",
      "Excludes": [ "WhiteLady", "ClothQuest" ]
  },

  "TMGrimm":{
      "Desc":"??????"
  },

  "NKGrimm":{
      "Desc": "???????????? ??????",
      "Type": "Tiebreaker",
      "Excludes": [ "CarefreeMelody" ]
  },

  "Uumuu":{
      "Desc": "??????"
  },

  "WK":{
      "Desc": "??????"
  },

  "VK_MMC":{
      "Desc":"??????????????? + ?????????????????????"
  },




  //Dream Warriors


  "Galien":{
      "Desc":"?????????"
  },

  "Gorb":{
      "Desc":"??????"
  },

  "Hu":{
      "Desc":"?????????"
  },

  "Marmu":{
    "Desc":"?????????"
  },

  "Markoth":{
      "Desc":"?????????"
  },

  "NoEyes":{
    "Desc":"??????"
  },

  "Xero":{
      "Desc":"??????"
  },




  //Enemies

  "2Warriors":{
      "Desc":"2??????",
      "Excludes":[ "SSoulCheck" ]
  },

  "Aluba":{
      "Desc":"1??????"
  },

  "Aluba2":{
      "Desc":"2????????????"
  },

  "Colo1":{
      "Desc":"????????? 1",
      "Excludes":[ "ColoZote" ]
  },

  "ColoZote":{
      "Desc":"?????????????????????",
      "Excludes":["Colo1" ]
  },


  "CrystalCrawler":{
      "Desc":"?????????????????????"
  },

  "Devout":{
      "Desc":"???6?????????"
  },

  "Durandoo":{
      "Desc":"1?????????????????????????????????"
  },

  "GHopper":{
      "Desc":"1?????????"
  },

  "GHusk":{
      "Desc":"?????????"
  },

  "Kingsmould":{
    "Desc":"1????????????"
  },

  "Maggots":{
      "Desc":"???2????????????"
  },

  "Millibelle":{
      "Desc":"????????????",
      "Excludes":[ "Bank" ]
  },

  "Mimics":{
      "Desc":"???4??????"
  },

  "Myla":{
      "Desc":"?????????"
  },




  //Items. Different types (Dreamers/Skills/Keys/etc) grouped together

  "Herrah":{
      "Desc":"????????????"
  },

  "Lurien":{
      "Desc":"??????????????????"
  },

  "Monomon":{
      "Desc":"???????????????"
  },


  "DeepStag":{
      "Desc":"???????????????",
      "Excludes":[ "Midwife", "VisitDistantHive" ]
  },

  "GardenStag":{
      "Desc":"???????????????"
  },

  "HiddenStag":{
      "Desc":"?????????????????????",
      "Excludes":[ "WPShadeSkip" ]
  },

  "KingStag":{
      "Desc":"?????????????????????"
  },

  "QueensStag":{
      "Desc":"?????????????????????"
  },



  "5Charms":{
    "Desc": "5+??????",
  },

  "5CharmsEquipped":{
    "Desc": "????????????5?????????",
  },


  "CarefreeMelody":{
    "Desc": "????????????",
    "Excludes": [ "NKGrimm" ]
  },

  "CompassSwarm":{
      "Desc":"????????????poppy"
  },

  "DWielderShield":{
      "Desc":"???????????????"
  },

  "FCharms":{
      "Desc":"2??????"
  },

  "FlukenestFury":{
      "Desc":"???????????????"
  },

  "GrubsongElegy":{
      "Desc":"???????????????"
  },

  "GWombWeavers":{
      "Desc":"??????????????????"
  },

  "HeavyBlowSteady":{
      "Desc":"???????????????????????????"
  },

  "HivebloodShadow":{
      "Desc":"?????????????????????"
  },

  "LifebloodCharms":{
      "Desc":"2????????????"
  },

  "Longnail":{
      "Desc":"???????????????"
  },

  "QSlashGlory":{
      "Desc":"???????????????"
  },

  "QuickDeepFocus":{
      "Desc":"???????????????"
  },

  "ShamanStoneTwister":{
      "Desc":"???????????????"
  },

  "SprintmasterDashmaster":{
      "Desc":"????????????????????????"
  },

  "SoulTools":{
      "Desc":"???????????????"
  },

  "UnnShell":{
      "Desc":"????????????????????????"
  },

  "LoveKey":{
      "Desc": "?????????"
  },



  "CHeart":{
      "Desc":"??????",
      "Excludes": [ "CrossroadsCanyonGrubs", "GWombSkip", "CHeartSkip", "TearCheck" ]
  },

  "DDark":{
      "Desc":"??????",
      "Excludes":[ "SSoul", "Shriek" ]
  },

  "DNail":{
      "Desc":"??????"
  },

  "DGate":{
      "Desc":"??????"
  },

  "Dive":{
      "Desc":"??????",
      "Excludes":[ "3Floors" ]
  },

  "MantisClaw":{
      "Desc":"??????",
      "Excludes":[ "SanctuarySkip", "WPShadeSkip", "VillageJournal", "CHeartSkip" ]
  },

  "NailArts":{
      "Desc":"2??????"
  },

  "SCloak":{
      "Desc":"??????"
  },

  "Shriek":{
      "Desc":"??????",
      "Excludes":[ "SSoul", "DDark" ]
  },

  "SSoul":{
      "Desc":"??????",
      "Excludes": [ "Shriek", "DDark" ]
  },

  "Tear":{
      "Desc":"??????",
      "Excludes": [ "UnnSkip", "LoveKeySkip" ]
  },

  "VSpirit":{
      "Desc":"??????"
  },

  "Wings":{
      "Desc":"?????????"
  },

  "Wraiths":{
      "Desc":"??????"
  },



  "15Grub":{
      "Desc":"15???"
  },

  "2Ore":{
      "Desc":"2??????",
      "Excludes":[ "Nail3" ]
  },

  "2Keys":{
      "Desc":"2????????????"
  },

  "3Maps":{
      "Desc":"3??????????????????????????????????????????"
  },

  "CollectorMap":{
      "Desc":"???????????????"
  },

  "Egg":{
      "Desc":"1??????"
  },

  "Godtuner":{
      "Desc":"???????????????"
  },

  "Idols":{
      "Desc":"3????????????"
  },

  "Journals":{
      "Desc":"5??????"
  },

  "Lantern":{
      "Desc":"???",
      "Excludes":[ "JoniDarkRoom" ]
  },

  "Mask1":{
      "Desc":"1??????"
  },

  "Notches":{
      "Desc":"3???"
  },

  "RancidEggs":{
      "Desc":"4??????"
  },

  "Seals":{
      "Desc":"5??????"
  },

  "SoulVessel":{
      "Desc":"1??????"
  },

  "TramPass":{
      "Desc":"?????????",
      "Excludes":[ "PinsAll" ]
  },

  "WorldSense":{
      "Desc":"????????????"
  },



  //Checks (Grubs are grouped)


  "Cornifer3":{
      "Desc":"3????????????????????????"
  },

  "Dreamers":{
      "Desc":"???2??????",
      "Excludes":[ "Uumuu", "WK", "VisitDistantHive" ]
  },

  "GreenpathRoot":{
      "Desc":"?????????"
  },

  "HallownestCrown":{
      "Desc":"????????????"
  },

  "Fountain":{
      "Desc":"?????????3000",
      "Excludes":[ "3000", "4000" ]
  },

  "GWombSkip":{
      "Desc":"?????????",
      "Excludes":[ "CHeart" ]
  },

  "HiveMask":{
      "Desc":"???????????????",
      "Excludes":[ "HiveKnight" ]
  },

  "JoniDarkRoom":{
      "Desc":"?????????",
      "Excludes":[ "Lantern" ]
  },

  "KEdgeRoot":{
      "Desc":"?????????"
  },

  "LoveKeySkip":{
      "Desc":"????????????",
      "Excludes":[ "Tear" ]
  },

  "Nailmasters":{
      "Desc":"???2??????"
  },

  "SanctuarySkip":{
      "Desc":"????????????????????????",
      "Excludes":[ "MantisClaw" ]
  },

  "Sheo":{
      "Desc":"?????????????????????"
  },

  "Shops":{
      "Desc":"??????4??????",
      "Excludes":[ "Cloth" ]
  },

  "StagVessel":{
      "Desc":"????????????????????????"
  },

  "SSoulCheck":{
      "Desc":"?????????",
      "Excludes":[ "2Warriors" ]
  },

  "TearCheck":{
      "Desc":"?????????",
      "Excludes":[ "CHeart" ]
  },

  "Trees4":{
      "Desc":"???4??????"
  },

  "UnnSkip":{
      "Desc":"?????????",
      "Excludes":[ "Tear" ]
  },

  "VillageJournal":{
      "Desc":"??????????????????",
      "Excludes":[ "MantisClaw" ]
  },

  "VoidHeart":{
      "Desc":"?????????"
  },


  "CoTGrubs":{
      "Desc":"??????5???"
  },

  "CrossroadsCanyonGrubs":{
      "Desc":"?????????5???+??????1???",
      "Excludes":[ "CHeart" ]
  },

  "DeepnestGrubs":{
      "Desc":"??????5???"
  },

  "FunGreenGrub":{
      "Desc":"??????4???+??????2???"
  },

  "PeaksGrub":{
      "Desc":"??????7???"
  },

  "QueenGrub":{
      "Desc":"??????3???"
  },

  "WaterGrub":{
      "Desc": "?????????3???"
  },




  //Misc.

  "3Floors":{
      "Desc":"??????3??????",
      "Excludes":[ "Dive" ]
  },

  "420Rock":{
      "Desc":"??????420"
  },

  "500Essence":{
      "Desc":"500??????"
  },

  "3000":{
      "Desc":"???3000",
      "Excludes":[ "Fountain", "4000" ]
  },

  "4000":{
      "Desc":"???4000",
      "Excludes":[ "Fountain", "3000", "5000" ]
  },

  "5000":{
      "Desc":"???5000",
      "Excludes":[ "4000" ]
  },

  "Bank":{
      "Desc":"???1500",
      "Excludes":[ "Millibelle" ]
  },

  "Bardoon":{
      "Desc":"????????????"
  },

  "BrettaSly":{
      "Desc":"?????????+??????"
  },

  "Brumm":{
    "Desc":"?????????????????????"
  },

  "Cloth":{
      "Desc":"????????????",
      "Excludes":[ "Shops" ]
  },

  "ClothQuest":{
      "Desc":"????????????",
      "Excludes":[ "TLord", "WhiteLady" ]
  },

  "CrestElevator":{
      "Desc":"??????????????????+??????2??????"
  },

  "DamnItGrimmchild":{ //https://clips.twitch.tv/LivelySpookyBibimbapTakeNRG
      "Desc":"??????????????????3??????"
  },

  "DeepnestZote":{
      "Desc":"???????????????"
  },

  "DefenderSign":{
    "Desc":"????????????"
  },

  "DirtmouthElevator":{
      "Desc":"???????????????"
  },

  "ElderFlower":{
      "Desc":"???????????????"
  },

  "Emilitia":{
      "Desc":"??????????????????"
  },

  "FlukeHermit":{
      "Desc":"??????????????????"
  },

  "Godhome":{
      "Desc":"?????????",
      "Excludes":[ "Ordeal20", "Radiant" ]
  },

  "GoamGarpede":{
      "Desc":"?????????????????????+???????????????????????????"
  },

  "Jiji":{
      "Desc":"????????????"
  },

  "Hazard":{
      "Desc":"???1????????????????????????"
  },

  "HopperHell":{
      "Desc":"??????????????????????????????"
  },

  "Lemm":{
      "Desc":"???????????????????????????"
  },

  "LegEater":{
      "Desc":"???????????????"
  },

 "Lifeblood":{
      "Desc":"10??????"
  },

  "LifebloodRoom":{
      "Desc":"??????????????????????????????"
  },

  "LoreBasin":{
    "Desc":"????????????"
  },

  "LoreArchives":{
    "Desc":"??????????????????3???"
  },

  "LoreCliffs":{
    "Desc":"??????????????????"
  },

  "LoreGreenpath":{
    "Desc":"?????????3???"
  },

  "LoreKEdge":{
    "Desc":"???????????????????????????"
  },

  "LorePilgrims":{
    "Desc":"??????????????????2????????????????????????????????????"
  },

  "LoreSanctum":{
    "Desc":"?????????2???"
  },

  "LoreVillage":{
    "Desc":"????????????2???"
  },

  "Lumafly":{
      "Desc":"???????????????"
  },

  "MaskMaker":{
      "Desc":"???????????????"
  },

  "Midwife":{
      "Desc":"???????????????",
      "Excludes":[ "DeepStag", "VisitDistantHive" ]
  },

  "MossProphet":{
      "Desc":"??????????????????"
  },

  "MrMushroom1":{
      "Desc":"??????????????????(???????????????)"
  },

  "Nail2":{
      "Desc":"2???"
  },

  "Nail3":{
      "Desc":"3???",
      "Excludes":[ "2Ore" ]
  },

  "Ordeal20":{
      "Desc":"????????????",
      "Type": "Tiebreaker",
      "Excludes":[ "Godhome", "Radiant" ]
  },

  "Overcharm":{
      "Desc":"?????????????????????"
  },

  "PoP":{
      "Desc":"????????????",
      "Type": "Tiebreaker",
  },

  "Pins":{
      "Desc":"???6??????",
      "Excludes":[ "PinsAll" ]
  },

  "PinsAll":{
      "Desc":"???8??????",
      "Excludes":[ "Pins", "TramPass" ]
  },

  "Revek":{
      "Desc":"???????????????3?????????",
      "Excludes":[ "ShrineOfBelievers" ]
  },

  "Salubra":{
      "Desc":"????????????"
  },

  "ShadeGates":{
      "Desc":"???2??????"
  },

  "Springs":{
      "Desc":"4??????"
  },

  "SpringSplash":{
      "Desc":"???????????????npc"
  },

  "ShrineOfBelievers":{
      "Desc":"???????????????",
      "Excludes":[ "Revek" ]
  },

  "Telescope":{
      "Desc":"?????????????????????"
  },

  "Tendrils":{
      "Desc":"??????????????????"
  },

  "Tiso":{
    "Desc": "??????????????????"
  },

  "Tuk":{
      "Desc":"???????????????"
  },

  "VisitDistantHive":{
      "Desc":"??????????????????",
      "Excludes": [ "TramPass", "DeepStag", "Midwife" ]

  },

  "VisitLakes":{
      "Desc":"?????????????????????"
  },

  "VisitMounds":{
      "Desc":"??????????????????????????????vm??????????????????????????????"
  },

  "VisitSanctumWaterways":{
      "Desc":"?????????????????????"
  },

  "VisitTower":{
      "Desc":"????????????????????????????????????"
  },

  "WhiteLady":{
      "Desc":"??????????????????",
      "Excludes":[ "TLord", "ClothQuest" ]
  },

  "Willow":{
    "Desc": "????????????????????????"
  },

  "WPShadeSkip":{
      "Desc":"????????????????????????",
      "Excludes":[ "HiddenStag", "Wings" ]
  }

};

var bingoTypes = {

    "Generic":{
        "Max":Number.MAX_SAFE_INTEGER
    },

    "Tiebreaker":{
        "Max":1
    }

};
