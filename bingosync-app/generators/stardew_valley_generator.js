var bingoGenerator = require("./generators/generator_bases/simple_generator.js");

var bingoList = [{"name":"Sell 50 (parsnips)"},
{"name":"Sell 30 (green beans)"},
{"name":"Sell 30 (cauliflowers)"},
{"name":"Sell 100 (potatoes)"},
{"name":"Sell 50 (kale)"},
{"name":"Sell 50 (strawberries)"},
{"name":"Sell 300 (blueberries)"},
{"name":"Sell 100 (corn)"},
{"name":"Sell 150 (hops)"},
{"name":"Sell 100 (hot pepper)"},
{"name":"Sell 30 (melon)"},
{"name":"Sell 50 (radish)"},
{"name":"Sell 50 (tomato)"},
{"name":"Sell 100 (wheat)"},
{"name":"Sell 50 (amaranth)"},
{"name":"Sell 50 (artichoke)"},
{"name":"Sell 100 (bok choy)"},
{"name":"Sell 100 (cranberriws)"},
{"name":"Sell 50 (eggplants)"},
{"name":"Sell 50 (grapes)"},
{"name":"Sell 30 (pumpkin)"},
{"name":"Sell 30 (yam)"},
{"name":"Plant 30 Mixed Seeds"},
{"name":"Fill a chest with flowers"},
{"name":"Fill a chest with fish"},
{"name":"Have 50 gold spring crops"},
{"name":"Have 50 gold summer crops"},
{"name":"Have 50 gold fall crops"},
{"name":"Have 500 silver crops"},
{"name":"Sell 50k g in one day"},
{"name":"Buy one of each Pierre itens"},
{"name":"Buy one of each Joja itens"},
{"name":"Dont buy seeds from Pierre"},
{"name":"Buy only seeds from Pierre"},
{"name":"Dont upgrade more than 1 tool"},
{"name":"Dont upgrade more than 2 tools"},
{"name":"Dont reach the bottom of the mines"},
{"name":"Dont make a scarecrow"},
{"name":"Less than 2 chests"},
{"name":"Buy only the large pack"},
{"name":"Dont carry more than 3 tools"},
{"name":"Never move your furnitures"},
{"name":"Dont use the TV"},
{"name":"Place a Iridium Sprinkler"},
{"name":"Place 5 Quality Sprinklers"},
{"name":"Place 10 Basic Sprinklers"},
{"name":"Place 20 sprinklers in your farm"},
{"name":"Collect a flowered Honey"},
{"name":"Collect 10 honey"},
{"name":"Make 10 different pickles"},
{"name":"Make 30 pickles"},
{"name":"Make 10 different jellies"},
{"name":"Make 30 jelly"},
{"name":"Make 5 different wine"},
{"name":"Make 10 wine"},
{"name":"Make 5 different juice"},
{"name":"Make 10 Juice"},
{"name":"Make a Caviar"},
{"name":"Grow a Giant Crop"},
{"name":"Grow a Rare Seed"},
{"name":"Aquire a Deluxe Pack"},
{"name":"Aquire 8 shoes"},
{"name":"Aquire 15 Hats"},
{"name":"Buy a Plasma TV"},
{"name":"Buy a furniture from the Traveling Cart"},
{"name":"Build a Barn and fill it"},
{"name":"Build a Big Barn and buy a goat"},
{"name":"Build a Deluxe Barn"},
{"name":"Build a Coop and fill it"},
{"name":"Build a Big Coop and buy a duck"},
{"name":"Build a Deluxe Coop"},
{"name":"Build a Fish Pond and fill it"},
{"name":"Build a Mill"},
{"name":"Build a Shed"},
{"name":"Build a Silo and fill it"},
{"name":"Build a Stable"},
{"name":"Build a Well"},
{"name":"Build a Cabin"},
{"name":"Build a Shopping Bin"},
{"name":"Lose the Egg Festival"},
{"name":"Maximum points in Luau"},
{"name":"Win the Stardew Fair"},
{"name":"Skip a day"},
{"name":"Give Trash to someone"},
{"name":"Get Bread from a Trash Can"},
{"name":"Marry Alex/Haley"},
{"name":"Marry Elliott/Penny"},
{"name":"Marry Harvey/Maru"},
{"name":"Marry Sam/Leah"},
{"name":"Marry Sebastian/Abigail"},
{"name":"Marry Shane/Emily"},
{"name":"Find 5 lost books"},
{"name":"(Greenhorn)-Earn 15,000g"},
{"name":"(Cowpoke)-Earn 50,000g"},
{"name":"(Homesteader)-Earn 250,000g"},
{"name":"(A New Friend)-5-heart friend level with someone."},
{"name":"(Cliques)-5-heart friend level with 4 people."},
{"name":"(Networking)-Reach a 5-heart friend level with 10 people."},
{"name":"(Best Friends)-Reach a 10-heart friend level with someone"},
{"name":"(Cook)Cook 10 different recipes."},
{"name":"(Sous Chef)-Cook 25 different recipes."},
{"name":"(Moving Up)-Upgrade your house."},
{"name":"(Living Large)-Upgrade your house to the 2nd upgrade"},
{"name":"(D.I.Y.)-Craft 15 different items."},
{"name":"(Artisan)-Craft 30 different items."},
{"name":"(Fisherman)-Catch 10 different fish."},
{"name":"(Ol' Mariner)-Catch 24 different fish."},
{"name":"(Mother Catch)-Catch 100 fish."},
{"name":"(Gofer)-Complete 10 'Help Wanted' requests."},
{"name":"(The Bottom)-Reach the lowest level of the mines."},
{"name":"(Singular Talent)-Reach level 10 in a skill."},
{"name":"(Treasure Trove)-Donate 40 items to the museum."},
{"name":"Finish 2 bundles in (Crafts Room)"},
{"name":"Finish 3 bundles in (Crafts Room)"},
{"name":"Finish 4 bundles in (Crafts Room)"},
{"name":"Finish 1 bundles in (Pantry)"},
{"name":"Finish 2 bundles in (Pantry)"},
{"name":"Finish 3 bundles in (Pantry)"},
{"name":"Finish 1 bundles in (Fish Tank)"},
{"name":"Finish 2 bundles in (Fish Tank)"},
{"name":"Finish 3 bundles in (Fish Tank)"},
{"name":"Finish 1 bundles in (Boiler Room)"},
{"name":"Finish 2 bundles in (Boiler Room)"},
{"name":"Finish ALL bundles in (Boiler Room)"},
{"name":"Finish 1 bundles in (Bulletin Board)"},
{"name":"Finish 2 bundles in (Vault)"},
{"name":"Finish 3 bundles in (Vault)"},
{"name":"Finish ALL bundles in (Vault)"},
{"name":"Complete 1 room in the (CC)"},
{"name":"Complete 2 rooms in the (CC)"},
{"name":"Complete 10 bundles in the (CC)"},
{"name":"Donate 5 items to the museum"},
{"name":"Donate 10 items to the museum"},
{"name":"Donate 15 items to the museum"},
{"name":"Donate 20 items to the museum"},
{"name":"Donate 25 items to the museum"},
{"name":"Donate 30 items to the museum"},
{"name":"Donate 35 items to the museum"},
{"name":"Donate a (skeleton) to the museum"},
{"name":"Donate a (dwarf scroll) to the museum"},
{"name":"Donate a (foraged mineral) to the museum"},
{"name":"Donate 2 (gems) to the museum"},
{"name":"Donate 3 (gems) to the museum"},
{"name":"Donate 4 (gems) to the museum"},
{"name":"Donate 5 (gems) to the museum"},
{"name":"Upgrade a tool to Iron"},
{"name":"Upgrade 2 tools to Iron"},
{"name":"Upgrade 3 tools to Iron"},
{"name":"Upgrade a tool to Gold"},
{"name":"Upgrade a tool to Copper"},
{"name":"Upgrade 2 tools to Copper"},
{"name":"Upgrade 3 tools to Copper"},
{"name":"Upgrade 4 tools to Copper"},
{"name":"Upgrade all tools to Copper"},
{"name":"Break 10 Geodes"},
{"name":"Break 10 Frozen Geodes"},
{"name":"Break 10 Magma Geodes"},
{"name":"Break 10 Omni Geodes"},
{"name":"Catch 10 different (silver) quality fish"},
{"name":"Catch 15 different (silver) quality fish"},
{"name":"Catch 5 different (gold) quality fish"},
{"name":"Catch 10 different (gold) quality fish"},
{"name":"Catch 5 different (iridium) quality fish"},
{"name":"Catch 25 (normal) quality fish"},
{"name":"Catch 20 (silver) quality fish"},
{"name":"Catch 15 (gold) quality fish"},
{"name":"Catch 10 (iridium) quality fish"},
{"name":"Buy the Iridium Rod"},
{"name":"Build 10 crab traps"},
{"name":"Get 20 trash"},
{"name":"Get 40 trash"},
{"name":"Get 5 treasures while fishing"},
{"name":"Get 15 treasures while fishing"},
{"name":"Get 10 seaweed"},
{"name":"Get 10 green algae"},
{"name":"Get 10 white algae"},
{"name":"Get 200 sap"},
{"name":"Get 999 wood"},
{"name":"Get 500 wood"},
{"name":"Get 400 stone"},
{"name":"Get 200 stone"},
{"name":"Reach level 40 in the Mines"},
{"name":"Reach level 80 in the Mines"},
{"name":"Find the stairs in less than 10 stones"},
{"name":"Find the stairs in less than 10 monsters"},
{"name":"Find the stairs in the first stone you break"},
{"name":"Find the stairs in the first you kill"},
{"name":"Gather 100 copper"},
{"name":"Gather 75 copper"},
{"name":"Gather 75 iron"},
{"name":"Gather 50 iron"},
{"name":"Gather 50 gold"},
{"name":"Gather 25 gold"},
{"name":"Gather 25 iridium"},
{"name":"Gather 10 iridium"},
{"name":"Gather 5 of the same gem"},
{"name":"Complete a Monster Eradication Goal"},
{"name":"Complete 2 Monster Eradication Goal"},
{"name":"Aquire the Obsidian Edge"},
{"name":"Aquire 5 different swords"},
{"name":"Aquire 3 different hammers"},
{"name":"Aquire 3 different daggers"},
{"name":"Aquire 5 different rings"},
{"name":"Aquire 20 weapons in total"},
{"name":"Get exhausted in the mines"},
{"name":"Die in the mines"},
{"name":"Pass out in the mines"},
{"name":"1-hit KO a monster"},
{"name":"Deliver 2 crits in a row"},
{"name":"Get a (speed) buff"},
{"name":"Get a (attack) buff"},
{"name":"Get a (defense) buff"},
{"name":"Get a (luck) buff"},
{"name":"Get a (magnetic) buff"},
{"name":"Get a (foraging) buff"},
{"name":"Get a (mining) buff"},
{"name":"Get a (fishing) buff"},
{"name":"Get a (farming) buff"},
{"name":"Get 3 buffs active"},
{"name":"Grow one of each basic tree"},
{"name":"Chop 10 of every basic tree"},
{"name":"Grow a fruit tree"},
{"name":"Collect a fruit from a tree"},
{"name":"Have 10 tappers at once"},
{"name":"Get 30 tap products"},
{"name":"Have 15 oak resin"},
{"name":"Have 15 maple syrup"},
{"name":"Have 15 pine tar"},
{"name":"Have 35 tree seeds of 2 type"},
{"name":"Have 60 tree seeds in total"},
{"name":"Chop every tree from Cindersnap Forest"},
{"name":"Chop a tree with bombs"}];
