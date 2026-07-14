# Asset catalog — Theme_Sorter_Shadowless

Dev-only reference (not shipped, not loaded by the game). A visual index of every
distinct sprite on the 24 shadowless 16x16 theme sheets in
`game/assets/1_Interiors/16x16/Theme_Sorter_Shadowless/*.png`, plus the two
shadowless 16x16 sheets of the Modern Office pack
(`game/assets/3_Modern_Office_Shadowless/Modern_Office_Shadowless_16x16.png` and
`game/assets/1_Room_Builder_Office/Room_Builder_Office_16x16.png`) — the pack
folders are gitignored the same way (see `game/CLAUDE.md`'s "Asset tooling"
section), so a future porting session can find a sprite by description instead
of opening a viewer and browsing sheets pixel-by-pixel.

Coordinates are in **original sheet pixels**, accurate to roughly ±2px (sprites
mostly align to the pack's 16px grid). Bounding boxes are generous — exact
trimming happens at port time. To pull a sprite out as a `sprites.js`-ready grid,
run:

```bash
node tools/png-to-grid.js "assets/1_Interiors/16x16/Theme_Sorter_Shadowless/<Sheet>.png" --x=<n> --y=<n> --w=<n> --h=<n> --name=<SPRITE_NAME>
```

(paths above are relative to `game/`; add `--frames=N --gap=G` for animation
strips, `--out=path.js` to write a file instead of stdout — see
`tools/png-to-grid.js` usage banner for the full option list.)

## Ported so far

Sprites already hand-ported into `game/js/sprites.js` (search the file for
"hand-ported" / "ported from" to find the exact grid constants):

| Sprite | Source sheet | Notes |
| --- | --- | --- |
| Cat (12-frame tail-sweep) | `3_Animated_objects/16x16/animated_cat.png` | not in the 24 theme sheets |
| Floor tiles (lobby) | Modern Interiors "Room Builder" floor sheet | not in the 24 theme sheets |
| Walls, north door | `6_Home_Designs/Generic_Home_1` | not in the 24 theme sheets |
| Coffee mug (6-frame steam strip) | `3_Animated_objects/16x16/animated_coffee.png` | not in the 24 theme sheets |
| Desk telephone | `1_Generic_Shadowless.png` | navy/gray set (`PHONE_GRID`, `deskPhone`; also reused by `contactDesk`) |
| Small desk printer, red control panel (16x32 @ 0,224, trimmed to a 17-tall body) | `Modern_Office_Shadowless_16x16.png` | `DESKPRINTER_GRID` / `PAL_DESKPRINTER`, seated on `contactDesk` — the contact room's merged email+phone "direct line" (replaced the earlier cycling phone-book candidates) |
| Potted palm (32x48) | `1_Generic_Shadowless.png` | lobby corner |
| Potted plant + bush | `1_Generic_Shadowless.png` | single-tile + 2-tile |
| Office desk station (17x38) | `1_Generic_Shadowless.png` | dark monitor on white desk |
| Framed world map (32x32) | `2_LivingRoom_Shadowless.png` | wall art |
| Fire extinguisher (16x32) | `13_Conference_Hall_Shadowless.png` | |
| Whiteboard / mounted dashboard, pie chart + line graph (30x23 @ 145,231) | `Modern_Office_Shadowless_16x16.png` | `WHITEBOARD_CHART_GRID`, `whiteboard` painter, wallMounted — superseded the earlier `13_Conference_Hall_Shadowless.png` projector-screen crop |
| Water cooler, round bottle on dark dispenser stand (13x30 @ 193,248) | `Modern_Office_Shadowless_16x16.png` | `WATER_COOLER_GRID`, `waterCooler` painter, bottom-anchored — superseded the earlier `13_Conference_Hall_Shadowless.png` crop |
| Retro CRT exhibit PC | `5_Classroom_and_library_Shadowless.png` | projects-room desk |
| Library bookshelf (47x39) | `5_Classroom_and_library_Shadowless.png` | warm red-brown variant |
| Open-book display stand (17x29) | `5_Classroom_and_library_Shadowless.png` | `lectern` painter |
| Wooden stool | `14_Basement_Shadowless.png` | in front of computer desks |
| Reception counter (U-shape, 96x37 stretched) | `19_Hospital_Shadowless.png` | central U only, recolored to whites |
| Cubicle partition (rail @ 13,420 → procedural bands/posts) | `Modern_Office_Shadowless_16x16.png` | `PAL_PARTITION`, `cubicle`/`cubicleSide` painters |
| Office desk, tan (42x23 @ 114,457) + gray checkered (@ 162,457) | `Modern_Office_Shadowless_16x16.png` | `DESK_TAN_GRID` / `DESK_GRAY_GRID` (tan also reused as the contact room's `contactDesk` surface) |
| Monitor + keyboard + mouse set (16x22 @ 224,450) | `Modern_Office_Shadowless_16x16.png` | `MONSET_GRID`, screen recolored per company |
| Dual-monitor arm rig (17x22 @ 160,560) | `Modern_Office_Shadowless_16x16.png` | `DUALRIG_GRID`, screen recolored per company |
| Office swivel chair, back view (17x21 @ 0,137) | `Modern_Office_Shadowless_16x16.png` | `OFFICE_CHAIR_GRID`, `officeChair` painter |
| Paper pile (14x3, bottom rows of doc tray @ 0,238) | `Modern_Office_Shadowless_16x16.png` | `PAPERS_GRID` — superseded by `deskItem` on the desks below, still used elsewhere |
| Desktop clutter, per experience desk (IT-support-desk-assemblage row): quantu (36x26 @ 118,417), neu-ta (42x23 @ 160,418), infosys (36x23 @ 164,481), danske-se (46x24 @ 208,449), danske-app (36x23 @ 164,513) — infosys and danske-app both have their ported "seated person figure"/photo-frame element blanked out (cols 24-35 across rows 5-16 of the grid) to drop the framed-photo prop while keeping the filing unit/monitor/tower | `Modern_Office_Shadowless_16x16.png` | `DESK_ITEMS` map, `cubicle`'s `deskItem` obj key — replaces the generic monitor rig + papers on that desk |
| Resume copier / desktop printer-scanner unit (28x25 @ 130,297) | `Modern_Office_Shadowless_16x16.png` | `COPIER_GRID`, `copier` painter — lobby north-wall resume viewer, drawn sitting on the tan office desk (`DESK_TAN_GRID`) used as a table (à la `contactDesk`); opens the `resume`-mode dialog: the resume rendered as a paper sheet (text from `def.sheet` in data.js) + download |
| Server rack — double-door cabinet (32x34 @ 128,330) | `18_Jail_Shadowless.png` | `SERVER_RACK_JAIL_GRID` / `PAL_SERVER_RACK_JAIL`, `serverRack` painter — contact room, drawn ~1.6x via `drawGridScaled` (crisp nearest-neighbor), bottom-anchored & centered on its rect |
| Receptionist walk cycle, 4-dir `[idle,walk1..6]` (Character_Generator composite: Body_02 + Eyes_01 + Outfit_06_01 + Hairstyle_01_01, walk row y=64) | `2_Characters/Character_Generator` layer sheets | `RECEPTIONIST_WALK` / `PAL_RECEPTIONIST_WALK`, generated by `tools/composite.js`; drawn inline by game.js for the feedback greeter (her desk idle stays `RECEPTIONIST_FRAMES`) |

## After porting a sprite

Add it to the table above (sheet + coords if recoverable + the `sprites.js`
constant/painter name) so this stays a living record of what's already spoken for.

---

### 1_Generic_Shadowless.png
256x1248px

- white wardrobe/cabinet with mirrored door, cream | x=0 y=0 w=48 h=64
- tall narrow slatted shelf unit, cream/grey stripes | x=48 y=0 w=32 h=48
- retro CRT computer monitor on stand, dark screen | x=96 y=0 w=32 h=48
- cream striped panel, wood frame (blind/shutter) | x=128 y=0 w=48 h=32
- plain cream striped panel, no frame | x=176 y=0 w=32 h=32
- tall wood-framed cabinet, cream/grey horizontal slats | x=208 y=0 w=48 h=144
- placeholder UI icons: image-swap / left-arrow / right-arrow, 16px each | x=144 y=48 w=48 h=16
- blank flat-screen TV, black, 2 color variants side by side | x=64 y=64 w=32 h=32
- small wood crate/drawer, orange | x=96 y=64 w=16 h=16
- small wood crate/drawer variant, orange | x=112 y=48 w=16 h=16
- striped fabric rug swatch, red/yellow/blue bands | x=208 y=64 w=32 h=16
- square ottoman/pouf, brown leather, wood legs | x=16 y=80 w=48 h=48
- rectangular ottoman, brown leather, wood legs | x=64 y=80 w=32 h=48
- round wood stool, small | x=96 y=80 w=16 h=16
- pill-shaped ottoman bench, brown leather, wood legs | x=96 y=112 w=48 h=16
- square ottoman/pouf, tan leather, wood legs | x=16 y=128 w=48 h=48
- rectangular ottoman, tan leather, wood legs | x=64 y=128 w=32 h=48
- small wall decor tile, thin frame | x=112 y=112 w=16 h=8
- double window, 4-pane, brown frame | x=128 y=112 w=32 h=32
- dark cabinet, dotted-pattern door | x=0 y=176 w=16 h=32
- dark cabinet variant, blue accent | x=16 y=176 w=16 h=32
- wood stool, round seat | x=32 y=176 w=16 h=16
- wood dining chair, round back, facing down | x=48 y=176 w=16 h=32
- wood dining chairs, facing-left/facing-right pair | x=64 y=176 w=32 h=32
- pink tufted loveseat sofa, 2-seat | x=96 y=176 w=64 h=32
- framed landscape painting, green, wood frame | x=0 y=224 w=32 h=16
- framed sunset/fire painting, red-orange | x=48 y=224 w=32 h=16
- framed landscape painting, blue/teal | x=96 y=224 w=32 h=16
- flat-screen TV, grey frame, on stand | x=128 y=208 w=48 h=32
- wood bench, dark grey striped seat | x=0 y=256 w=48 h=16
- wood bench, red/brown striped seat | x=48 y=256 w=48 h=16
- single bed, wood posts, cream bedding, top view | x=72 y=256 w=64 h=48
- grey upholstered armchair | x=48 y=288 w=32 h=32
- wooden staircase with railing, ascending | x=192 y=256 w=64 h=80
- tartan/plaid rug swatch, red/yellow checkered | x=128 y=256 w=48 h=32
- tartan/plaid rug swatch, blue/white checkered | x=128 y=288 w=48 h=32
- round stool/pouf, 6 color variants, 2 rows of 3, 16px apart | x=0 y=288 w=48 h=32
- wood bed footboard, cream, orange posts | x=192 y=288 w=48 h=16
- 3-drawer dresser, wood, 3 color variants (orange/red/tan) side by side | x=192 y=336 w=48 h=32
- striped curtain/blind panel, 3 color variants (cream/pink/tan) | x=128 y=336 w=80 h=32
- window with vertical blinds, grey/white | x=16 y=344 w=32 h=16
- small 1-drawer nightstand, orange wood | x=16 y=368 w=32 h=32
- small 1-drawer nightstand, tan wood variant | x=16 y=400 w=32 h=32
- small 1-drawer nightstand, beige wood variant | x=16 y=432 w=32 h=32
- ornate rug, dark red/gold pattern, 2 tiles | x=192 y=344 w=32 h=32
- ornate carpet runner, brown/tan pattern, large | x=224 y=344 w=80 h=64
- ornate rug, purple/gold pattern, large | x=192 y=336 w=64 h=48
- rug swatch, 4 stacked color variants (red/blue/green combos) | x=192 y=376 w=64 h=96
- purple mosaic wall tapestry, vertical | x=176 y=376 w=32 h=80
- potted palm plant | x=208 y=400 w=32 h=32
- potted round bush plant, 2 color variants | x=208 y=456 w=48 h=32
- wall mirror, blue-tinted glass, wood frame | x=144 y=464 w=32 h=32
- small ornate gold-framed mirror | x=176 y=464 w=16 h=32
- small plain-framed wall mirror | x=192 y=464 w=16 h=32
- small rug, dark green pattern, 2 variants | x=144 y=496 w=48 h=32
- tall narrow mirror/window panel | x=208 y=496 w=16 h=48
- large wall-mounted cabinet unit, orange drawers, cream paneling | x=0 y=456 w=144 h=80
- sliding glass-door cabinet, grey-tinted, 3 panels | x=0 y=528 w=80 h=32
- pink sheer curtain panel | x=80 y=512 w=32 h=48
- wall switch/intercom panel, 2 variants | x=112 y=520 w=32 h=16
- white floating wall shelf/ledge | x=112 y=536 w=32 h=8
- small tufted ottoman footstool, 2 color variants, wood legs | x=176 y=536 w=64 h=16
- wood storage crate/dresser, 4 color variants (dark brown/brown/tan/red-brown) | x=0 y=568 w=176 h=32
- wood storage crate/dresser, 4 color variants, second row | x=0 y=608 w=176 h=32
- wood plank panel, mixed color segments | x=176 y=608 w=64 h=16
- rotary desk phone, 4 color variants (black/blue/grey/light-blue) | x=176 y=632 w=80 h=16
- rotary desk phone, 4 color variants (white/red/pink/white) | x=176 y=664 w=80 h=16
- single door, 3 wood color variants (tan/orange/dark-red) | x=0 y=640 w=48 h=32
- 3-door wardrobe, wood, matching color variants | x=48 y=640 w=48 h=32
- small wall vent/radiator grille | x=100 y=640 w=16 h=16
- single door with glass window, 3 color variants | x=0 y=672 w=48 h=32
- 3-panel glass-front wardrobe door | x=48 y=672 w=48 h=32
- rectangular rug, green border, tan center | x=0 y=704 w=48 h=32
- small dark picture frame, blank, 2 variants | x=48 y=704 w=16 h=48
- rectangular rug, blue border, tan center | x=0 y=735 w=48 h=32
- double window with curtain-rod top, wood frame, 5 color variants evenly spaced | x=104 y=696 w=160 h=32
- open draped curtain, red/pink | x=88 y=720 w=32 h=32
- open draped curtain, blue/grey | x=136 y=720 w=32 h=32
- open draped curtain, tan/brown | x=184 y=720 w=32 h=32
- 4-pane window, orange frame | x=232 y=696 w=16 h=16
- 4-pane window, dark frame | x=224 y=752 w=16 h=16
- curtain rod with tassels, 3 segments | x=0 y=776 w=64 h=16
- draped curtain, sheer center, tan/gold outer, 3 color variants | x=80 y=768 w=96 h=32
- wood bar stool with back, 4 color variants, 2 rows | x=64 y=800 w=64 h=32
- dining chair, tall back, 6 color variants, row 1 | x=144 y=800 w=224 h=32
- wardrobe with mirror panel, wood, striped, 2 color groups | x=0 y=832 w=144 h=32
- dining chair, tall back, 6 more color variants, row 2 | x=144 y=832 w=224 h=32
- glass-front display cabinet on legs, silver frame, 3 variants | x=64 y=864 w=96 h=32
- wood ladder, tall, leaning | x=168 y=864 w=32 h=64
- metal escalator/industrial staircase | x=208 y=864 w=48 h=80
- hand tool icons: hammer, nails, wrench, screwdriver | x=0 y=872 w=64 h=16
- small yellow light bulb/ball icon | x=16 y=888 w=16 h=16
- wood storage crate with drawer, 3 color variants (tan/beige/blue) | x=0 y=900 w=96 h=32
- potted bush plant, 3 size/color variants | x=96 y=900 w=48 h=32
- floor/wall trim strip, mixed color segments | x=0 y=944 w=256 h=16
- modular sofa/bed fabric color-swatch grid, many colors (blue/lavender/teal/purple/gold/brown) | x=0 y=944 w=192 h=112
- small lamp finial/topper, 3 color variants | x=208 y=984 w=48 h=16
- round pouf/stool, wood or metal base, 3 rows x 3 color variants | x=64 y=1008 w=48 h=80
- small 3-drawer dresser, wood, 3 color variants | x=112 y=1008 w=48 h=32
- glass-top table, white legs | x=160 y=1024 w=48 h=32
- wall outlet/switch icon, 2 variants | x=208 y=1024 w=16 h=32
- potted tree/bush, 2 size variants | x=224 y=1008 w=32 h=48
- toilet, 3 color variants (blue/purple/white) | x=176 y=1080 w=48 h=32
- small oval mirror, wood frame, 2 color variants | x=224 y=1056 w=32 h=32
- small round soap/decor item, 2 color variants | x=224 y=1088 w=32 h=16
- bathroom vanity cabinet with mirror, grey/tan, wide+narrow variants | x=0 y=1064 w=112 h=48
- bathroom sink with mirror cabinet, wood base | x=176 y=1104 w=32 h=32
- small green bottle/plant decor | x=208 y=1120 w=16 h=32
- kitchen cabinet with drawers, yellow/tan wood, wide+narrow variants | x=0 y=1112 w=112 h=48
- wood/tile floor swatch, brown border, multiple color variants stacked | x=128 y=1064 w=48 h=160
- bathroom sink with mirror cabinet, red accent | x=176 y=1160 w=32 h=32
- small red bottle decor | x=208 y=1160 w=16 h=32
- bathroom/kitchen cabinet, brown wood, wide+narrow variants | x=0 y=1152 w=112 h=48
- blank placeholder tile, white/checkered | x=224 y=1104 w=32 h=16

### 2_LivingRoom_Shadowless.png
256x720px

- purple wardrobe, double door, gold trim | x=0 y=0 w=32 h=48
- purple tufted bench/loveseat, long, gold trim | x=32 y=0 w=48 h=32
- purple ottoman/pouf, 3 shape variants (square, oval, tall boxy) | x=80 y=0 w=48 h=32
- purple armchair, rounded back, no arms visible | x=64 y=32 w=32 h=32
- purple boxy armchair/loveseat, gold trim | x=96 y=32 w=48 h=32
- purple square bed headboard/large cushioned panel | x=144 y=32 w=48 h=48
- small purple stool/footrest | x=32 y=32 w=16 h=32
- topiary tree in pot, round trimmed, 2 color variants, 16px apart | x=192 y=0 w=32 h=32
- potted palm tree | x=224 y=0 w=16 h=32
- string/fairy lights, hanging dashed loop | x=192 y=48 w=16 h=16
- small potted fern, on stand | x=0 y=64 w=16 h=32
- dresser with oval mirror, tan wood, 2 color variants, 48px apart, facing down | x=16 y=64 w=48 h=48
- stacked laundry baskets/folded towels | x=0 y=96 w=16 h=48
- large wardrobe, dark wood, mirrored double doors | x=112 y=64 w=48 h=48
- narrow cabinet, glass/mirror panel doors | x=176 y=64 w=32 h=48
- wood cabinet, mirror double doors, 2 color variants, 48px apart | x=224 y=64 w=48 h=48
- floor lamp, round white shade, thin pole | x=0 y=112 w=16 h=32
- decorative floor rug, diamond pattern | x=0 y=144 w=16 h=16
- cream tufted couch/sofa, pillows on ends, 2 color variants, 48px apart | x=16 y=112 w=64 h=48
- wood cabinet, dark double door, mirror, 2 color variants, 48px apart | x=112 y=112 w=48 h=48
- side table with lamp and potted plant on top | x=192 y=112 w=48 h=32
- dome table lamp, red shade | x=224 y=112 w=32 h=32
- fruit basket, 3 color variants (green, orange, purple), 32px apart | x=0 y=160 w=32 h=32
- vanity table with mirror, pillow, papers on top | x=48 y=160 w=48 h=32
- long console table, wood, cluttered top | x=96 y=160 w=64 h=32
- table lamp, dome shade, 2 colors (red, blue), 32px apart, on stand | x=176 y=160 w=64 h=32
- barrel/drum lampshade table lamp, tan, 2 variants | x=224 y=160 w=32 h=32
- fruit basket, 3 color variants (green, orange, purple), repeat row, 32px apart | x=0 y=192 w=32 h=32
- wood console table, plain, 2 variants side by side | x=48 y=192 w=64 h=32
- tall standing mirror on wood frame stand | x=112 y=192 w=16 h=32
- floor lamp, round shade, thin tripod stand | x=112 y=224 w=16 h=32
- draped cloth/blanket over wood table edge | x=128 y=192 w=32 h=32
- barrel drum lamp, tall floor standing, tripod legs, 2 color variants | x=192 y=192 w=64 h=48
- side/end tables, wood, 3 in a row | x=0 y=224 w=48 h=32
- laundry items on table (basket, folded cloth, fruit bowl) | x=48 y=224 w=48 h=32
- table lamp, dome shade, on side table | x=96 y=224 w=32 h=32
- floor lamp, tall barrel shade, tripod, 2 more color variants | x=192 y=240 w=64 h=48
- round area rug/mat, light gray, 2 color variants | x=224 y=240 w=32 h=16
- low cabinet with mirror top, wood | x=0 y=256 w=32 h=32
- drawer cabinet, 2-drawer, wood | x=0 y=272 w=32 h=32
- console table plain, 2 variants side by side | x=48 y=256 w=64 h=32
- small drawer nightstand, single | x=112 y=256 w=16 h=16
- folded cloth/mat pile | x=128 y=256 w=32 h=16
- large dark wood wardrobe, double door | x=160 y=256 w=48 h=48
- dresser with mirror, small drawer variant | x=112 y=272 w=48 h=32
- hanging dried garlic/herb bundle | x=176 y=288 w=16 h=32
- wood chest/cabinet with mirror top, 2 color variants | x=192 y=288 w=64 h=48
- dark wood chest of drawers, tall | x=0 y=304 w=32 h=48
- large wardrobe, wood, double door with mirrors | x=32 y=304 w=48 h=48
- draped cloth over table/bench, angled | x=80 y=304 w=32 h=32
- socks/clothing pile, tossed | x=112 y=304 w=32 h=16
- fruit/vegetable basket on floor | x=112 y=336 w=32 h=32
- hanging dried garlic/herb bundle, second | x=144 y=336 w=32 h=32
- wood dining chair, ladder back, 2 color variants, 32px apart, facing right | x=192 y=336 w=32 h=32
- window with venetian blinds | x=224 y=320 w=32 h=48
- tossed clothing/blanket pile, floor | x=112 y=352 w=32 h=16
- potted plant, tall leafy, small pot | x=192 y=368 w=16 h=32
- clay/ceramic pot, round-bellied, 3 color variants (brown, brown-blue, gray-glass), 32px apart | x=0 y=384 w=96 h=32
- standing mirror, wood frame, on easel stand, 2 size/position variants | x=144 y=368 w=16 h=48
- world map wall art, framed | x=176 y=400 w=32 h=16
- globe on wood stand | x=224 y=384 w=16 h=32
- bush/topiary plant in terracotta pot, 2 color variants, 48px apart | x=224 y=352 w=32 h=48
- brick fireplace with chimney flue and lit fire | x=64 y=400 w=48 h=48
- wall picture frame, spooky/mask motif, 2 variants | x=0 y=432 w=32 h=16
- wall picture frame, scenic landscape | x=32 y=432 w=16 h=16
- wall picture frame, framed scenic photo, 2 more variants | x=0 y=448 w=16 h=32
- 3-seat sofa, tufted, 3 color variants (blue-gray, light gray, tan/brown), 96px apart, facing down | x=0 y=464 w=288 h=32
- loveseat/2-seat sofa, matching 3 color variants | x=0 y=496 w=192 h=32
- ottoman/footrest, matching sofa colors, 2 variants | x=192 y=496 w=32 h=32
- wingback armchair, tall back, front+side view pair, 4 color variants (gray, blue-gray, lilac, brown), 32 rows apart | x=0 y=528 w=64 h=256
- grocery/pantry shelf unit stocked with goods, 3 columns per set, 2 row variants | x=160 y=400 w=96 h=96
- throw pillow, decorative, scattered, 4-5 color variants (blue, yellow-gold, gray) | x=224 y=464 w=64 h=96
- chest/dresser base with pedestal lamp on top, 3 color variants (brown, olive, gray-blue), paired empty-stand + assembled forms | x=176 y=608 w=96 h=112

### 3_Bathroom_Shadowless.png
256x896px

- hanging flower plant baskets, 2 color variants, 16px apart | x=0 y=16 w=32 h=32
- folded towel/tissue stack, 3 color variants, stacked 16px apart | x=48 y=0 w=16 h=48
- bathtub with wood side panel, closed, facing down | x=64 y=0 w=48 h=48
- pedestal toilet, top-down view, 4 color variants, 16px apart, facing down | x=112 y=0 w=64 h=32
- small soap bottle/dispenser, white | x=176 y=8 w=16 h=16
- small towel hook, gray | x=176 y=32 w=16 h=16
- washing machine, front-load, round window | x=192 y=0 w=32 h=48
- wicker laundry basket with folded towel | x=224 y=0 w=32 h=24
- wicker basket with green plant, variant | x=224 y=24 w=32 h=24
- walk-in shower stall, overhead showerhead, wood panel, facing down | x=64 y=48 w=48 h=56
- pedestal sink, top-down view, 5 color variants, 16px apart, facing down | x=112 y=48 w=80 h=32
- blank wall panel/sign, white | x=192 y=48 w=32 h=32
- wicker basket with green pet/plant, variant | x=224 y=48 w=32 h=32
- rectangular wall mirror, wood frame, diagonal shine, 2 identical, 32px apart | x=192 y=80 w=64 h=32
- water heater tank, white, cylindrical, with round vent cap | x=0 y=64 w=32 h=48
- small wall mirror, plain frame | x=192 y=104 w=32 h=32
- bathroom vanity sink cabinet with mirror, 2 color variants (orange, tan wood), 16px apart | x=112 y=96 w=64 h=32
- bathroom vanity sink cabinet with mirror, orange wood, single | x=176 y=112 w=32 h=32
- small wall mirror, plain frame, variant | x=224 y=112 w=32 h=32
- compact sink with drawer cabinet, orange wood | x=0 y=128 w=32 h=32
- standing floor mirror, oval, wood frame, 3 identical, 32px apart | x=32 y=128 w=32 h=64
- small wall mirror, diagonal shine, 2 variants stacked | x=128 y=128 w=16 h=64
- plunger, 2 color variants (green, red), 16px apart, handle up | x=144 y=128 w=32 h=32
- rubber duck toy, 2 color variants, stacked | x=144 y=160 w=16 h=32
- wall shelf with colorful shampoo/soap bottles, multicolor | x=176 y=144 w=48 h=32
- wall shelf with cleaning caddy, baskets and red items | x=192 y=160 w=48 h=32
- wall cabinet, empty, light blue, tall | x=224 y=144 w=32 h=48
- bucket, 4 color variants (yellow, blue, white, light-blue), 16px apart | x=128 y=192 w=64 h=32
- mop and bucket set, blue | x=192 y=192 w=48 h=32
- wide low storage bench, tan wood, 2 color variants stacked | x=0 y=160 w=64 h=64
- small side end table with drawer, wood, 3 color/position variants | x=16 y=176 w=32 h=80
- shower stall units with curtain door, 3 color variants (yellow, white, red), row of stalls with cabinet below | x=16 y=256 w=96 h=80
- decorative pedestal ornament (vase-like), 3 identical, 32px apart | x=152 y=299 w=24 h=16
- small note/label icon | x=240 y=299 w=16 h=16
- square floor drain mat, wood-tone checkered | x=144 y=319 w=32 h=32
- square wall mirror panel, angled shine | x=176 y=319 w=32 h=32
- square floor drain/vent, dark gray | x=208 y=319 w=32 h=32
- small rectangular wall mirror, wood frame, 2 count | x=16 y=371 w=64 h=16
- bathroom vanity long counter (no sink), tan wood | x=0 y=375 w=32 h=40
- vanity sink cabinet with color-coded soap bottle, 3 color variants (green, yellow, pink), 32px apart | x=32 y=375 w=96 h=40
- toilet, top-down view, revamped palette, 6 color variants, 16px apart, facing down | x=128 y=375 w=96 h=32
- small wall mirror, revamped palette, 2 stacked | x=224 y=375 w=32 h=40
- toilet, front elevation view, revamped palette, 6 color variants, 16px apart | x=128 y=419 w=96 h=36
- rug/mat pattern swatch, striped multicolor, 2 variants | x=0 y=455 w=64 h=16
- rug/mat pattern swatch, checkered gold/gray and tan/gray, 2 variants | x=64 y=455 w=64 h=16
- vanity sink cabinet with soap/sponge combo, revamped palette pairs | x=128 y=475 w=64 h=20
- rubber duck toy, revamped palette, 2 color variants | x=208 y=475 w=32 h=12
- storage cart with baskets and cleaning bottles, multicolor | x=192 y=487 w=64 h=28
- plunger, revamped palette, 2 color variants (green, red), 16px apart | x=164 y=503 w=32 h=20
- small waste bin/canister, multicolor round variants, row | x=232 y=487 w=24 h=32
- wicker basket with plant, 2 color variants, revamped placement | x=0 y=519 w=64 h=12
- shower cubicle with frosted glass door, gray, 3-door row plus single stall | x=12 y=594 w=132 h=46
- tall storage locker cabinet, teal, pattern variants, 2 rows of 6, 16px apart | x=160 y=602 w=96 h=52
- trash bin/basket, striped pattern, multiple color variants (orange, green, tan) | x=64 y=640 w=80 h=34
- small waste bin, striped pattern, pink and blue variants | x=64 y=670 w=80 h=24
- pedestal sink, front elevation view, white/gray | x=0 y=670 w=32 h=56
- wall rack with spray bottles/cleaning supplies, multicolor | x=36 y=670 w=28 h=44
- cracked/damaged bathroom wall tile panel, gray | x=64 y=690 w=48 h=28
- broken/cracked mirror, wood frame, 2 variants | x=128 y=678 w=32 h=16
- tall storage locker cabinet, light purple, pattern variants, 3 count | x=160 y=670 w=48 h=48
- pile of small rocks/soap bar cluster | x=208 y=658 w=32 h=36
- small glass bottle/flask, clear | x=232 y=694 w=18 h=20
- wall vent grille panel, 3 color variants, stacked vertically | x=224 y=722 w=32 h=92
- damaged fixture icon (broken pipe fragment, red-X marker) | x=110 y=718 w=34 h=16
- linen shelf with folded blue towels, 3 tiers | x=148 y=722 w=28 h=36
- shelf with cleaning caddy items, basket and spray bottle | x=176 y=722 w=28 h=36
- toilet, top-down view, 7 color variants, 16px apart, facing down | x=0 y=738 w=112 h=40
- toilet, front view with open lid, 6 color variants, 16px apart | x=0 y=782 w=112 h=32
- toilet, front elevation view (tank + bowl), 7 color variants, 16px apart, facing front | x=0 y=834 w=112 h=40
- ornate pedestal water fountain/urn, gray stone | x=200 y=774 w=20 h=50

### 4_Bedroom_Shadowless.png
256x1712px

- teddy bear plush, 3 pose/ribbon-color variants, 32px apart, sitting, facing forward | x=0 y=32 w=32 h=32
- white polar bear plush with red ribbon | x=80 y=64 w=16 h=32
- circular gauge/meter dial, 4 rim color variants (red/orange/blue/green), 16px apart | x=0 y=64 w=16 h=16
- square area rug, light purple checkered | x=0 y=96 w=32 h=32
- round area rug, light purple checkered | x=48 y=96 w=48 h=48
- small app/gadget icon tiles, 2x2 grid | x=16 y=128 w=32 h=32
- blue spiral notebook/diary, closed | x=0 y=176 w=16 h=16
- skateboard, black deck, gray wheels, angled | x=32 y=176 w=32 h=16
- blue closed umbrella | x=128 y=160 w=16 h=32
- back-facing dining chair, left/right orientation, 3 color variants (light-blue/red/yellow), 32px apart | x=0 y=192 w=32 h=32
- front-facing dining chair, left/right orientation, 3 color variants (light-blue/red/yellow), 32px apart | x=80 y=192 w=32 h=32
- wood square dining table, plain top, plus toy-block topper variant, 3 rows 32px apart | x=48 y=192 w=32 h=32
- Hello Kitty framed picture, pink | x=0 y=288 w=16 h=16
- red car framed picture | x=32 y=288 w=16 h=16
- portrait framed picture (person) | x=64 y=288 w=16 h=16
- sparkle/star particle effect cluster | x=96 y=288 w=16 h=16
- Hello Kitty pillow/cushion, pink | x=0 y=320 w=16 h=16
- red car pillow/cushion | x=32 y=320 w=16 h=16
- dotted path/route marker icons, multi-color pins | x=64 y=320 w=16 h=16
- round bean-bag cushion, pink checkered | x=0 y=352 w=32 h=32
- round bean-bag cushion, brown checkered | x=32 y=352 w=32 h=32
- elephant plush, white/gray | x=96 y=352 w=16 h=16
- wardrobe, brown/tan wood, doors closed with clothes visible through crack, 3 color variants, 64px apart | x=144 y=0 w=32 h=64
- dresser/drawer cabinet, 4-panel top, 4 color variants (orange, yellow-tan, beige, red-brown), stacked | x=192 y=0 w=64 h=64
- dresser/drawer cabinet, 3-row, red/orange/brown wood | x=192 y=160 w=48 h=64
- wall-mounted flat-screen TV/monitor, dark gray, 2 size variants | x=144 y=192 w=32 h=32
- bookshelf/cabinet, angled open, items on shelves, 2 color variants (gray, red/brown) | x=144 y=256 w=32 h=64
- wall shelf unit with colored panel accents, 4 color variants (green/orange/light-blue/mixed), 32px apart | x=192 y=192 w=48 h=32
- single bed, striped blanket, 4 color variants (yellow-green/blue/light-blue/green), facing down, 32px apart, 2 pillow-style rows | x=128 y=336 w=128 h=96
- baby crib, 3 wood color variants (light-tan/orange/dark-red-brown), side by side | x=0 y=384 w=96 h=48
- toddler/baby character sprite, 4 hair/outfit variants, sitting | x=0 y=432 w=128 h=32
- hanging star mobile toy | x=112 y=384 w=16 h=32
- circular toy train track, tan oval | x=160 y=432 w=96 h=48
- toy train engine, green/black, on track | x=192 y=448 w=48 h=16
- toy train car, red, single | x=0 y=480 w=32 h=16
- toy train, 3-car set (blue/yellow/green) | x=48 y=480 w=96 h=16
- wire hanging mobile/chandelier toy, small | x=112 y=464 w=16 h=16
- small 2-drawer nightstand cabinet, 3 wood color variants, stacked 32px apart | x=0 y=496 w=64 h=96
- wood dresser with 3 collectible figurine statues on top (green/blonde/teal hair) | x=48 y=496 w=64 h=48
- small robot toy figurine, 2 color variants (red/blue) | x=48 y=544 w=32 h=32
- standing figurine/doll on gray pedestal, 4 hair-color variants | x=112 y=496 w=32 h=96
- single bed, side view, wood frame, headboard left/right (2 orientations), 2 pillow color variants, 32px apart | x=192 y=608 w=192 h=96
- bed frame vertical corner post, 9+ color variants (teal/olive/purple/blue-gray/sage/lavender), stacked column 16px apart | x=0 y=608 w=32 h=192
- folded blanket/towel stack, tan and pink color variants | x=200 y=608 w=32 h=96
- bed footboard frame corner piece (L-shaped), 2 color variants (gray, brown) | x=48 y=670 w=96 h=32
- bed headboard scroll/rail piece, 9 color variants, stacked column 32px apart | x=0 y=800 w=32 h=288
- diagonal pillow/blanket corner accent, pattern variants (starry-blue/pink/cloud-blue/purple-gold/green) | x=64 y=800 w=144 h=288
- blanket color swatch tile (flat rectangle), many color/pattern variants (solid, starry, cloud, diamond), grid | x=48 y=1088 w=240 h=176
- blanket swatch tile, small square, pattern variants (starry-blue/pink/green/cloud-blue/diamond/tan/purple-gold), grid — same swatch-tile family as the row above, positioned within the same grid area | x=48 y=1088 w=128 h=192
- small wardrobe with side shelf, tan/brown wood | x=0 y=1008 w=32 h=32
- small plush toy figurine, 6-7 variants (teddy bears, elephants), 64px apart | x=0 y=1040 w=240 h=32
- small character/NPC sprite, hat color variants, sitting | x=0 y=1072 w=192 h=32
- plush toy/small character variant row (elephants, dogs, farmer hat) | x=16 y=1104 w=224 h=32
- rug swatch, 3 colors (sage green/orange/light-gray), square and round variants | x=112 y=1056 w=144 h=80
- bedside table with vase/lamp topper, 3 color variants | x=0 y=1136 w=48 h=32
- framed wall art, dark frame, 3 variants | x=64 y=1136 w=48 h=16
- basket/planter on stand, 3 color variants | x=0 y=1168 w=48 h=32
- low wood bench/table, small | x=64 y=1168 w=32 h=16
- small mirror, blue-tinted glass | x=96 y=1168 w=16 h=16
- small 2-drawer dresser, 2 color variants (orange, gray), 2 rows | x=128 y=1136 w=32 h=64
- full-length floor mirror, gray frame, wide variant x2 | x=0 y=1200 w=96 h=32
- wall switch/outlet plate, blue, 2 variants stacked | x=48 y=1200 w=16 h=32
- full-length floor mirror, tall narrow variant | x=0 y=1248 w=48 h=32
- wall map poster, colorful, framed | x=64 y=1248 w=64 h=48
- toy train set, multi-color cars, 2 variants | x=0 y=1296 w=64 h=16
- rainbow/arc toy, small, 3 variants | x=64 y=1296 w=48 h=16
- night sky/celestial banner strip, 2 variants (starry, plain gradient) | x=0 y=1312 w=64 h=16
- chest of drawers, 4-drawer and 2-drawer sizes, 2 color variants (gray, tan) | x=0 y=1328 w=112 h=64
- collectible bust/trophy icon, ~15 color/material variants, grid | x=160 y=1136 w=48 h=112
- polka-dot patterned rug swatch, pink/tan/brown, square and round variants | x=208 y=1136 w=48 h=160
- hanging ornament/gem charm, blue, multiple variants | x=244 y=1136 w=16 h=160
- string light garland, 2 variants (white sparkle, gold star) | x=130 y=1240 w=64 h=32
- small stool/ottoman, dark gray, 2 variants | x=120 y=1296 w=16 h=24
- small potion/plant bottle icon, multiple variants | x=148 y=1300 w=96 h=16
- potion bottle, 5 color variants (red/green/blue-gray/gray/red-cracked) | x=115 y=1330 w=80 h=24
- potion bottle, 3 color variants (green/red/blue), tall | x=144 y=1344 w=48 h=48
- small game controller/trophy icon, 4 color variants | x=195 y=1376 w=64 h=16
- dollhouse/birdhouse structure with tiny robot figure, 3 roof color variants (red/green/gold), stacked 32px apart | x=144 y=1392 w=48 h=96
- small dark button/plug icon, 3 variants | x=198 y=1448 w=48 h=16
- bunk bed (two-tier), solid color variants (blue/green/teal/yellow/light-gray/purple), grid 48px apart | x=0 y=1376 w=144 h=96
- bunk bed (two-tier), patterned blanket variants (starry-blue/green/purple-gold/pink/tan/cloud-blue/gray-diamond), grid 48px apart | x=0 y=1472 w=192 h=96
- character head portrait icon, 3 hair-color variants (blonde/brown/blue) | x=128 y=1488 w=16 h=48
- character lying/sleeping sprite in pajamas, multiple color variants, grid | x=160 y=1488 w=64 h=80
- small robot/figurine statue on pedestal, 3 hair-color variants | x=96 y=1536 w=48 h=32
- wardrobe/armoire, wide (3-door) and medium (2-door) variants, wood texture, 3 color schemes (tan-gray/orange/brown), grid | x=0 y=1568 w=128 h=112
- tall cabinet, 2-door, light lilac, plain | x=128 y=1568 w=32 h=32
- bookshelf cabinet, 2-door with visible shelf contents, tan wood | x=128 y=1664 w=32 h=32

### 5_Classroom_and_library_Shadowless.png
256x544px

- Wooden chair, green cushion back, facing right | x=0 y=0 w=16 h=32
- School desk row (4-seat bench) with open book, pencil case, ruler, and folder on top, brown wood | x=16 y=8 w=64 h=32
- Small wood lectern/stand with large open red book and ink bottle | x=80 y=8 w=32 h=32
- Green two-sided folding writing-board desk with pink open book on top, 2 color variants, ~48px apart | x=112 y=8 w=32 h=32
- Green two-sided folding writing-board desk with pink open book on top, variant B | x=160 y=8 w=32 h=32
- Wall map, framed, blue/green world map poster | x=208 y=0 w=48 h=32
- Globe on wooden stand, blue/green sphere | x=240 y=0 w=16 h=48
- Small green chair, low-back, facing left | x=0 y=48 w=16 h=32
- Round wooden stool | x=16 y=48 w=16 h=32
- Student desk, 3 wood-tone variants, 16px apart, facing right | x=32 y=48 w=48 h=32
- Rounded-corner student desk, light wood | x=80 y=48 w=32 h=32
- Open book on small desk stand, brown wood, variant A | x=120 y=56 w=32 h=32
- Green plain writing-board desk (no book), variant | x=160 y=56 w=32 h=32
- Colorful classroom reward chart/grid poster, framed | x=208 y=56 w=48 h=32
- Blue pencil/marker cup | x=0 y=80 w=16 h=16
- Red marker/pen standing upright | x=16 y=80 w=16 h=16
- Student desk (rear view), 4 wood-tone variants, 16px apart | x=32 y=76 w=80 h=24
- Corkboard/bulletin board with pinned papers, wood frame | x=0 y=92 w=48 h=20
- Open book on small desk stand, brown wood, variant B | x=120 y=84 w=32 h=28
- Green plain writing-board desk (no book), variant B | x=168 y=84 w=32 h=28
- Small green chalkboard on stand, blank | x=208 y=84 w=32 h=28
- Wooden step ladder, tall, 2 variants, 16px apart | x=0 y=112 w=32 h=24
- Wooden step ladder, short, 2 variants, 16px apart | x=32 y=118 w=32 h=24
- Classroom supply cubby/shelf with colorful books and toys, 6 color variants, ~32px apart | x=64 y=112 w=192 h=40
- Photocopier/printer machine, gray, 2 standalone variants | x=0 y=164 w=32 h=28
- Photocopier/printer machine, gray, row of 4, 16px apart | x=48 y=168 w=64 h=28
- Photocopier/printer machine, gray, single standalone | x=112 y=168 w=32 h=28
- Loose paper/document sheet, small | x=144 y=172 w=16 h=16
- NPC character, orange hair, standing at small desk with computer monitor | x=160 y=156 w=16 h=48
- L-shaped reception/library counter desk with NPC characters (orange-hair librarian, purple-hair patron), monitor, and papers | x=184 y=156 w=64 h=48
- Small gray office locker/cabinet, 2 variants | x=192 y=208 w=32 h=24
- Library bookshelf, warm red-brown, low open shelves with colorful books, 3 color variants, 48px apart vertically (already ported — `PAL_BOOKSHELF`) | x=0 y=208 w=48 h=40
- Bookshelf narrow end-panel/divider, brown, 3 variants, 48px apart | x=48 y=208 w=16 h=40
- Small library bookshelf unit, brown, 2 across per row x 3 rows | x=64 y=208 w=64 h=40
- Chalk eraser tray, small | x=216 y=208 w=16 h=16
- CRT computer monitor on desk stand, gray, 3 color variants, 48px apart | x=128 y=216 w=32 h=32
- Filing cabinet, gray, 2-drawer, 3 color variants, 48px apart | x=160 y=216 w=32 h=32
- Open-book display stand, wood, 3 height/color variants (already ported — `PAL_BOOKSTAND`) | x=232 y=236 w=16 h=32
- Blackboard, black surface, wood frame, on stand, 3 variants, 48px apart | x=192 y=244 w=32 h=24
- Thin hanging wall pointer/stick near map | x=248 y=64 w=16 h=32
- Book/paper stack, colorful, with red ribbon bookmark | x=192 y=328 w=32 h=32
- Diagonal stacked book pair, green/blue covers | x=224 y=328 w=32 h=24
- Standing reading lectern/altar with hanging red ribbon bookmark, wood | x=232 y=336 w=16 h=48
- Open book on flat wide stand | x=224 y=376 w=32 h=24
- Flat cushion/mat, tan | x=224 y=424 w=32 h=16
- Large library bookcase, wood, wide multi-module row, 3 color variants (reddish-brown/tan/golden), 64px apart vertically | x=0 y=356 w=192 h=53
- Narrow single-module library bookcase (tall), 3 color variants, 64px apart, flanking the wide bookcase | x=196 y=350 w=56 h=64

### 6_Music_and_sport_Shadowless.png
256x768px

- musical note icon, small | x=64 y=0 w=16 h=16
- stacked guitar amplifier speakers, black | x=96 y=0 w=32 h=48
- upright piano, 3 wood-tone variants (gold/orange-brown/tan), 32px apart, closed lid | x=0 y=16 w=32 h=48
- acoustic guitar, 3 wood-tone variants, 16px apart, facing down | x=112 y=48 w=48 h=32
- electric guitar, blue/red/yellow variants, 16px apart, facing down | x=160 y=48 w=48 h=32
- piano stool/bench, 3 color variants (gray/gray/red) | x=0 y=64 w=32 h=16
- sports equipment tool (hand pump/wrench-shaped), 3 color variants, 64px apart, vertical | x=240 y=88 w=16 h=48
- ornate upright piano, gold body, maroon/maroon/purple top trim, repeated across 3 rows, closed lid | x=0 y=96 w=96 h=96
- acoustic guitar, 3 wood-tone variants (2nd row), 16px apart, facing down | x=112 y=96 w=48 h=32
- electric guitar, blue/red/yellow variants (2nd row), 16px apart, facing down | x=160 y=96 w=48 h=32
- basketball hoop backboard, white and red, facing front | x=112 y=136 w=16 h=32
- basketball, orange, 2 size variants | x=128 y=136 w=32 h=16
- soccer ball, black and white pattern, large | x=160 y=136 w=32 h=32
- small ball, yellow-orange | x=192 y=136 w=16 h=16
- globe/earth-themed ball, blue and green | x=192 y=136 w=32 h=32
- small white ball (golf/baseball) | x=208 y=136 w=16 h=16
- baseball bat, brown wood, vertical | x=224 y=136 w=16 h=48
- globe ball, blue/green, larger variant | x=128 y=160 w=32 h=32
- small ball variants (grey/orange/teal), 16px apart | x=160 y=160 w=48 h=16
- microphone stand, 5 style variants (boom/straight), 16px apart, gray | x=96 y=240 w=96 h=32
- floor tom drum, white with red trim | x=96 y=176 w=32 h=32
- snare drum, tan top, red/blue design, with drumstick | x=128 y=176 w=32 h=32
- small hand drum with mallet, tan top | x=160 y=176 w=32 h=32
- bass drum, red, with drumstick, large | x=192 y=176 w=32 h=32
- bongo drum pair, wood-colored | x=224 y=176 w=48 h=32
- floor tom / snare drum variants, smaller 2nd row | x=96 y=208 w=96 h=32
- gothic harp, 4 color variants (brown/tan/cream/gold), 40px apart, vertical | x=208 y=0 w=48 h=40
- grand piano, open lid, wood-grain, 3 color variants, with/without sheet music (2 states) | x=0 y=192 w=96 h=80
- piano bench, 3 color variants (gray/gray/red), matches grand piano | x=0 y=272 w=32 h=16
- synth/mixer keyboard board, gray/red/blue variants, tabletop | x=96 y=272 w=32 h=16
- small trophy icon, blue background | x=224 y=232 w=16 h=16
- achievement badge icons: running figure w/ lightning (2 variants), trophy, bowling, blue/gray background, 16px apart | x=192 y=272 w=64 h=16
- full drum kit with cymbals, brown/blue variants, facing front | x=0 y=288 w=96 h=32
- full drum kit with cymbals, red drums, facing front | x=96 y=288 w=48 h=32
- sports achievement icons: martial-arts pose (2), boxing pose (2), net/ladder icon (2), bomb icon, 16px apart | x=144 y=288 w=112 h=32
- medal icons: silver/gold/bronze-ribbon medal + blank certificate, 16px apart | x=0 y=320 w=96 h=32
- trophy bust icon (gold/silver head on pedestal), grid of repeated variants | x=96 y=320 w=96 h=80
- tall trophy cup, silver, 2 variants stacked | x=192 y=320 w=16 h=32
- gem orb icon, red/gray/blue variants, 16px apart, 2 rows | x=208 y=320 w=48 h=32
- ribbon banner icon, purple and red, 2 rows | x=0 y=352 w=48 h=64
- medal icons: gold/silver ribbon medals, 16px apart | x=48 y=360 w=48 h=32
- blank plaque/sign, light blue, 2 variants | x=96 y=400 w=32 h=16
- trophy with certificate display and 2 statue figures | x=48 y=392 w=48 h=48
- hanging medal pendant on rack, gold/silver | x=144 y=408 w=48 h=16
- green gem orb, 2 variants, 2 rows | x=224 y=392 w=48 h=16
- podium winners scene, gold/silver/bronze figures | x=0 y=416 w=48 h=32
- trio trophy bust icon, gold/silver/gold heads, small | x=0 y=452 w=48 h=32
- statue figure pair on plinth holding item, gold/silver, 2 variants | x=64 y=460 w=96 h=48
- mixer/keyboard board, tabletop (no legs), blue/red/gray variants, repeated rows | x=0 y=488 w=32 h=144
- keyboard synthesizer on floor stand, blue/red/gray variants, with optional speaker cabinet, repeated grid | x=32 y=488 w=96 h=144
- drum kit with cymbals, white/blue, facing front | x=128 y=488 w=48 h=32
- upright piano, wood/red-top variant, wide body, repeated rows | x=176 y=488 w=64 h=96
- small conga/hand drum, tan, 2 variants | x=240 y=488 w=16 h=48
- electric guitar, red/teal/silver-white variants, 2 poses each, hanging | x=96 y=504 w=32 h=96
- drum kit with cymbals, tan cymbals, red/tan drums | x=128 y=520 w=48 h=32
- drum kit with cymbals, red accents | x=128 y=552 w=48 h=32
- small practice drum on stand with drumstick, red | x=96 y=616 w=16 h=32
- stacked guitar amp speaker cabinet, black, large | x=0 y=624 w=32 h=32
- harp, brown wood-tone, 2 variants | x=128 y=612 w=48 h=32
- small tom drums, green/red/blue trim, 3 variants | x=192 y=612 w=32 h=16
- blue triangle percussion instrument | x=200 y=600 w=16 h=8
- basketball, orange, 2 variants + globe ball | x=192 y=628 w=48 h=16
- harp, gold/dark-orange tone, 2 variants | x=128 y=644 w=48 h=32
- basketball hoop backboard, gray with blue rim, small | x=200 y=652 w=24 h=16
- baseball bat, brown, vertical, 2 variants | x=224 y=644 w=16 h=32
- small white ball | x=245 y=660 w=8 h=8
- small stool/ottoman, gray/tan/blue variants, 2 rows | x=0 y=680 w=32 h=32
- acoustic guitar, standing upright, 3 wood-tone variants, 16px apart | x=192 y=688 w=96 h=64
- small hand drum, red | x=0 y=712 w=16 h=16
- grand piano, open lid, 3 wood-tone variants, 2 stacked rows (bottom row runs to the sheet's lower edge) | x=32 y=744 w=96 h=24

### 7_Art_Shadowless.png
256x112px

- cluttered stack of silver jugs with a brown woven vase mixed in | x=16 y=0 w=48 h=32
- cluttered stack of 3 silver jugs with blue rims | x=64 y=0 w=32 h=32
- paint bucket with lid, 3 color variants (blue/red/blue), 16px apart | x=96 y=0 w=48 h=16
- cluttered stack of silver jugs with yellow/green/blue lids | x=160 y=0 w=32 h=32
- cluttered stack of silver jugs with blue/red/green lids | x=192 y=0 w=32 h=32
- small cut-flower sprig prop, 3 color variants (pink/white/mixed), scattered | x=144 y=16 w=48 h=16
- potted bush/tree, green foliage in gray pot | x=224 y=0 w=32 h=32
- ceramic pot/urn, 6 color-pattern variants (plain brown, brown w/ yellow trim, blue-striped, brown w/ dark handle, teal globe pattern, blue globe pattern), 16px apart, facing front | x=0 y=32 w=96 h=16
- paint bucket with lid, 3 color variants (blue/orange/green), 16px apart | x=96 y=32 w=48 h=16
- wooden easel with blank canvas | x=144 y=32 w=16 h=32
- wooden easel with purple monster-face painting | x=160 y=32 w=16 h=32
- wooden easel with dark green monster-face painting | x=176 y=32 w=16 h=32
- wooden easel with blue map/scribble painting | x=192 y=32 w=16 h=32
- wooden easel with orange abstract figure painting | x=208 y=32 w=16 h=32
- wooden easel with red/orange abstract painting | x=224 y=32 w=16 h=32
- wooden easel with blue checkered/landscape painting | x=240 y=32 w=16 h=32
- silver jug with blue rim, 2 color variants | x=0 y=64 w=32 h=32
- wooden bench, orange/red planks, facing down | x=32 y=80 w=32 h=24
- wooden bench, tan planks, facing down | x=64 y=80 w=32 h=24
- round tan stool/ottoman, 3 color-shade variants, 16px apart | x=96 y=80 w=48 h=16
- paintbrush with 2 paint containers set, 3 color variants, 48px apart | x=32 y=96 w=48 h=16
- wooden artist palette with paint blobs | x=128 y=96 w=16 h=16
- stacked round pedestal/plant-stand, tan wood, 3 tiers | x=144 y=64 w=16 h=48
- framed painting, purple monster face | x=160 y=64 w=16 h=32
- framed painting, dark green monster face | x=176 y=64 w=16 h=32
- framed painting, blue map/scribble | x=192 y=64 w=16 h=32
- framed painting, orange abstract figure | x=208 y=64 w=16 h=32
- framed painting, red/orange abstract | x=224 y=64 w=16 h=32
- framed painting, blue checkered/landscape | x=240 y=64 w=16 h=32
- round tan stool/ottoman, 3 color-shade variants, 16px apart (cut off at sheet bottom) | x=192 y=96 w=48 h=16

### 8_Gym_Shadowless.png
256x528px

- grey checkerboard floor tile swatch | x=0 y=0 w=48 h=48
- dark grey solid floor/wall tile swatch | x=48 y=0 w=48 h=48
- maroon checkerboard floor tile swatch | x=0 y=48 w=48 h=48
- maroon solid floor/wall tile swatch | x=48 y=48 w=48 h=48
- blue checkerboard floor tile swatch | x=0 y=96 w=48 h=48
- blue solid floor/wall tile swatch | x=48 y=96 w=48 h=48
- dark grey diagonal-checker floor tile swatch | x=0 y=144 w=48 h=48
- light diagonal-stripe glass/mirror pane, large | x=48 y=144 w=48 h=32
- light diagonal-stripe glass/mirror pane, small | x=48 y=176 w=32 h=32
- weight rack bench, light grey, low profile, facing front | x=0 y=224 w=48 h=16
- weight rack bench, dark grey variant, facing front | x=48 y=224 w=48 h=16
- weighted post stand on tripod base, 4 color variants (maroon, dark green, blue, red), 64px apart, facing front | x=96 y=0 w=16 h=48
- exercise ball, alternating blue/red color variants, 8 instances, 32px apart | x=128 y=0 w=16 h=16
- long horizontal barbell with end plates, grey, 6 repeated rows, 32px apart, facing front | x=144 y=0 w=64 h=16
- leg press / squat machine, grey frame, black seat, facing front | x=176 y=16 w=32 h=48
- cable pulley machine, grey frame, facing front | x=208 y=16 w=32 h=48
- barbell with small colored disc plates (blue and red), 2 rows | x=176 y=64 w=48 h=16
- stack of black tires/weight plates, round | x=224 y=64 w=32 h=32
- boombox/radio, grey, with antenna, 2 variants | x=208 y=96 w=16 h=32
- small dumbbell head icon, 2 variants | x=176 y=96 w=32 h=32
- round black kettlebell weight, repeated 2 per row across 4 rows | x=240 y=0 w=16 h=16
- tall tire/weight plate stack, dark grey | x=224 y=96 w=32 h=32
- standing locker/vertical equipment unit, grey with vent stripes, facing front | x=176 y=176 w=32 h=48
- robotic weight-machine post, grey with blue accent, facing front | x=224 y=176 w=32 h=48
- small screw/hex-head tool icon, 3 color variants (tan, red, silver), 32px apart | x=96 y=192 w=16 h=32
- kidney-bean shaped weight/dumbbell head, 3 color variants (blue, red, maroon), 32px apart | x=128 y=192 w=16 h=32
- squat rack with vertical barbell, grey frame, blue bar, facing front | x=160 y=208 w=48 h=48
- standing lamp/orb on pole, blue top, facing front | x=224 y=224 w=16 h=32
- standing orb on pole, red top, facing front | x=224 y=256 w=16 h=32
- wall-mounted TV/monitor screen, grey frame | x=240 y=224 w=48 h=32
- pull-up bar / gymnastic rings apparatus, grey frame, facing front | x=272 y=224 w=48 h=48
- squat rack with vertical barbell, blue bar, variant 2, facing front | x=160 y=256 w=48 h=48
- glass/mirror window panel set, blue-tinted, 4-pane large | x=48 y=336 w=64 h=32
- glass/mirror window panel, blue-tinted, small pair | x=48 y=368 w=32 h=48
- exercise ball, 4 color variants (red, blue, green, grey), grid arrangement, 32px apart | x=0 y=336 w=32 h=96
- weight bench rack, light grey plain, wide, facing front | x=144 y=336 w=48 h=16
- weight bench rack, dark grey with peg weights, facing front | x=192 y=336 w=48 h=16
- weight bench rack, light grey plain, variant 2, facing front | x=144 y=368 w=48 h=16
- weight bench rack, dark grey with peg weights, variant 2, facing front | x=192 y=368 w=48 h=16
- weight bench rack, darker grey with peg weights, variant 3, facing front | x=240 y=368 w=48 h=16
- small barbell/dumbbell icon, 4 size variants, 16px apart, facing front | x=128 y=400 w=32 h=16
- round weight plate/donut stack icon, small | x=176 y=416 w=16 h=16
- weight plate/tire stack, dark grey, round, 2 size variants | x=192 y=400 w=64 h=32
- floor tile swatch, green checkerboard, 2 variants | x=0 y=432 w=48 h=32
- floor tile swatch, dark grey checkerboard | x=48 y=432 w=32 h=32
- floor tile swatch, tan/gold checkerboard, 2 variants | x=80 y=432 w=32 h=48
- floor tile swatch, dark grey checkerboard, large grid set | x=112 y=432 w=112 h=48
- standing locker/vending unit, grey plain, facing front | x=0 y=496 w=32 h=48
- weight bench rack, light grey, wide, facing front (variant) | x=32 y=496 w=48 h=16
- robot kiosk unit, grey body with round head/screen, facing front | x=96 y=496 w=32 h=48
- robot kiosk unit, blue-green console with screen, facing front | x=144 y=496 w=32 h=48
- robot kiosk/ATM unit, blue console with screen, facing front, tall | x=192 y=480 w=32 h=48
- small barbell icon, tiny, 2 color variants (blue/green, red/pink) | x=224 y=464 w=16 h=32
- kettlebell with face (red eyes), 4-instance grid, 16px apart | x=240 y=384 w=16 h=32
- tall weight canister/tower, grey, plain and red-banded variants | x=240 y=432 w=16 h=64
- tall weight canister/tower, gold-banded variant | x=256... — cropped at sheet's right edge, likely a partial/edge sprite, coordinates unreliable | x=224 y=432 w=16 h=64

### 9_Fishing_Shadowless.png
256x432px

- backpack, blue, front view | x=16 y=0 w=32 h=32
- backpack, tan/olive, front view | x=48 y=0 w=32 h=32
- backpack, red, front view | x=160 y=0 w=32 h=32
- small cooler box with "HQ" logo, 4 color variants (blue/yellow/green/red), 16px apart | x=48 y=16 w=16 h=16
- fishing rod with line and bobber, 3 color variants (blue/tan/red), 32px apart, facing down | x=112 y=16 w=32 h=48
- wooden fishing rod rack holding 3 rods, horizontal | x=208 y=16 w=48 h=32
- white bucket | x=240 y=16 w=16 h=16
- backpack/tackle bag, 3 color variants (silver, green, yellow), stacked pair style | x=0 y=48 w=112 h=32
- fold-out tackle tray, open, 2 color variants (orange/blue-gray) | x=128 y=48 w=64 h=32
- fishing chair, orange/tan cushion, folded legs | x=192 y=64 w=48 h=48
- landing net, 3 color variants (gray/blue/green handle), facing down | x=240 y=48 w=48 h=64
- sunglasses pair, 2 color variants, small prop | x=288... — near sheet's right edge, coordinates unreliable, likely x≈224 y=64 w=16 h=16
- large tackle box, double-decker drawers, color variants (blue-top/white, yellow-top/white, green-top/white), stacked vertically ~64px apart | x=64 y=64 w=64 h=96
- framed ocean sunset painting | x=64 y=128 w=48 h=32
- gray stone/rock pile props, 2 sizes | x=128 y=112 w=48 h=64
- small metal drawer/nightstand, closed, 2 color variants | x=192 y=112 w=32 h=48
- muddy puddle/dirt patch, brown | x=16 y=152 w=48 h=16
- fish on plate, cooked, brown/gold | x=64 y=152 w=48 h=16
- small metal cabinet, open, with contents | x=224 y=136 w=32 h=32
- scissors/fillet knife with fish scraps | x=192 y=152 w=48 h=16
- decorative shell/scale clusters, small props (2 variants) | x=224 y=160... — right-edge crop, coordinates approximate | x=224 y=160 w=32 h=32
- fish scale/weighing station, small table with fish | x=176 y=168 w=32 h=32
- cyan/light-blue cooler box, tall, front view | x=0 y=160 w=32 h=32
- tan/beige cooler box, tall, with handle | x=0 y=176 w=32 h=32
- red cooler box, tall, front view | x=0 y=192 w=32 h=32
- fish cleaning/gutting station, long metal counter with fish contents, 3 variants | x=0 y=208 w=96 h=32
- fish platter, whole fish garnished | x=112 y=208 w=32 h=16
- metal display case/stand, gray, tall | x=224 y=176 w=32 h=48
- hanging fish drying rack, wooden frame, 2 variants with fish hanging | x=80 y=192 w=32 h=48
- rolling cart/trolley, green cooler mounted, wheels | x=224 y=224 w=32 h=48
- rolling cart/trolley, empty frame, wheels — right-edge crop, coordinates approximate | x=224 y=224 w=16 h=48
- robotic/dispenser vending unit, 2 color variants (small gray with green/gray panel) | x=224 y=192 w=32 h=16
- wooden bait/lure display rack, tall, with rods and colored lures | x=128 y=192 w=48 h=48
- wooden bait/lure display rack, empty shelf variant | x=192 y=192 w=48 h=48
- wooden bait/lure display rack, tall, second variant with rods and lures | x=128 y=240 w=48 h=48
- standing beach umbrella alone, 3 color variants (green/blue/light-blue), 96px apart | x=0 y=272 w=32 h=48
- beach umbrella and lounge chair combo, 8 color combinations (umbrella green/blue/light-blue x chair blue/orange/yellow), arranged in 2 rows of 4, ~48px apart | x=0 y=336 w=192 h=64
- small ice chest with grass/moss growth | x=0 y=400 w=32 h=32
- framed clownfish picture, orange/red fish | x=48 y=400 w=32 h=32
- framed blue tropical fish picture | x=80 y=400 w=32 h=32

### 10_Birthday_party_Shadowless.png
192x112px

- wrapped gift box, red paper, yellow bow, front-facing | x=16 y=0 w=16 h=16
- wrapped gift box, blue paper, yellow bow, front-facing | x=16 y=16 w=16 h=16
- birthday cake, light blue/white icing, lit candles, gem toppers | x=32 y=0 w=32 h=32
- birthday cake, dark red/chocolate icing, holly/berry topper | x=64 y=0 w=32 h=32
- party balloon, 4 color variants (lavender, pink, blue, red), 16px apart, string hanging down | x=96 y=0 w=16 h=32
- wrapped gift box, red paper with gold checkered ribbon pattern | x=160 y=0 w=16 h=32
- wrapped gift box, blue paper with gold checkered ribbon pattern | x=176 y=0 w=16 h=32
- sparkling/champagne bottle, blue label, 2 variants, 16px apart | x=48 y=16 w=16 h=16
- gift-wrap ribbon roll, striped gold pattern | x=80 y=16 w=16 h=16
- bunting banner, colorful triangle flags strung, short span | x=128 y=16 w=32 h=16
- party dip bowl with cream/frosting topping | x=48 y=32 w=16 h=16
- sparkler candle stick, yellow lit tip | x=64 y=32 w=16 h=16
- cake stand plate stack, plain white, 3 layers | x=96 y=32 w=16 h=16
- cake stand plate stack, white with fruit/berry topping | x=112 y=32 w=16 h=16
- small round plate/cookie, plain white | x=128 y=32 w=16 h=16
- confetti scatter, small multicolor sprinkle particles | x=144 y=32 w=32 h=32
- wrapped gift box, red with gold checkered ribbon, variant 2 | x=160 y=48 w=16 h=16
- wrapped gift box, blue with gold checkered ribbon, variant 2 | x=176 y=48 w=16 h=16
- party horn/noisemaker, yellow, angled | x=80 y=48 w=16 h=16
- birthday cake, round, white icing with rainbow sprinkles, single candle | x=0 y=48 w=32 h=32
- cake on wooden cutting board with serving knife | x=48 y=64 w=32 h=16
- gift-wrap fabric swatch, small pattern, 2 color variants, 16px apart | x=96 y=64 w=16 h=16
- bunting banner, colorful triangle flags strung, wide span, variant 1 | x=0 y=80 w=48 h=16
- bunting banner, colorful triangle flags strung, wide span, variant 2 | x=48 y=80 w=48 h=16
- party balloon, glossy, 4 color variants (gold, blue, red, green), 16px apart, long string | x=0 y=64 w=16 h=48
- confetti scatter, tall vertical spread of multicolor particles | x=64 y=64 w=16 h=48
- layered dessert/cupcake with fruit topping on plate, 3 flavor variants, 16px apart | x=80 y=64 w=16 h=16
- dessert on footed stand, matches cupcake variants above, 16px apart | x=80 y=80 w=16 h=32
- plate stack, tilted/toppled, white, 2 variants | x=128 y=64 w=16 h=32

### 11_Halloween_Shadowless.png
256x976px

- Halloween garland (bats, cobwebs, jack-o-lantern lights), hanging decoration | x=0 y=0 w=64 h=16
- Jack-o-lantern pumpkin, small, single carved face, orange | x=64 y=0 w=16 h=16
- Jack-o-lantern pumpkins, medium size, carved-face variants in a row, ~32px apart | x=96 y=0 w=96 h=32
- Jack-o-lantern pumpkin cluster (2-3 grouped pumpkins), 2 variants | x=192 y=0 w=64 h=32
- Cobweb lace border decoration, 2 color variants | x=0 y=32 w=64 h=16
- Small black spider decoration, 2 identical, 16px apart | x=64 y=32 w=32 h=16
- Jack-o-lantern pumpkins, alternate carve style, size variants row (7), including a paired cluster | x=96 y=32 w=160 h=32
- Hanging spider on web thread, black | x=0 y=48 w=16 h=48
- Decorative gift crate, teal & gold trim, jack-o-lantern motif, stacked pair | x=32 y=64 w=96 h=48
- Wooden crate, dark red-brown, plain, stacked pair | x=144 y=64 w=64 h=48
- Decorative gift crate, teal & gold trim variant, stacked pair | x=224 y=64 w=32 h=48
- Gray tombstone, white cross, standing, 2 identical, 32px apart | x=192 y=64 w=64 h=48
- Skull and crossed bones, white | x=0 y=112 w=32 h=16
- Black cauldron, empty, iron | x=32 y=112 w=48 h=48
- Vine garland with red berries, corner-shaped piece | x=80 y=112 w=96 h=32
- Vine garland with red berries, straight/arch piece | x=176 y=112 w=80 h=32
- Gray tombstone, white cross, standing, single | x=112 y=144 w=32 h=48
- Wooden treasure chest, closed, brown | x=224 y=112 w=48 h=48
- Wooden treasure chest, open, showing gold coins | x=224 y=112 w=48 h=48
- Small brown keg/urn | x=272... — right-edge crop, coordinates approximate | x=224 y=112 w=16 h=16
- Cauldron, bubbling green liquid, iron | x=32 y=144 w=48 h=48
- Stone wall/pillar segment, tall, gray, 2 wide sections | x=0 y=160 w=96 h=64
- Window pane, wooden frame, 4 panes, glass | x=112 y=160 w=48 h=48
- Old gray TV/box on stand | x=176 y=160 w=48 h=48
- Candy/treat bucket, orange, with handle | x=112 y=192 w=32 h=32
- Jack-o-lantern candy bucket with flowers, 2 color variants | x=144 y=192 w=48 h=32
- Witch hat, black, floating | x=224 y=176 w=32 h=32
- Ghost, white, round, 2 variants (plain and holding item) | x=224 y=176 w=32 h=32
- Cracked/damaged tombstone with blood, 2 variants | x=32 y=224 w=48 h=48
- Blood splatter drops on ground, 3 size variants | x=96 y=224 w=48 h=16
- Oval mirror, gold frame, empty, 4 in a row, 16px apart | x=160 y=224 w=64 h=32
- Oval mirror, gold frame, ghostly reflection, 4 in a row, 16px apart | x=160 y=256 w=64 h=32
- Gray tombstone, white cross, large, standing | x=240 y=224 w=16 h=48
- Wooden dresser/wardrobe front panel, dark brown, 2 variants | x=0 y=272 w=96 h=64
- Small wooden stool | x=96 y=288 w=32 h=32
- Oval mirror, silver frame, with reflection | x=160 y=288 w=32 h=32
- Rotary telephone, black/blue-gray color variants, 4 across, 16px apart | x=0 y=336 w=64 h=32
- Horror movie poster, red cover, framed | x=96 y=336 w=16 h=32
- Horror movie poster, ghost-face cover, framed | x=112 y=336 w=16 h=32
- Raven/crow figure, black | x=128 y=336 w=32 h=16
- Oval mirror, silver frame variant | x=160 y=320 w=32 h=32
- Rotary telephone, gray/red/cream color variants, 4 across, 16px apart | x=0 y=368 w=64 h=32
- Horror movie poster, bloody hand cover, framed | x=96 y=368 w=16 h=32
- Standing spellbook, open, purple pages, on legs | x=112 y=368 w=16 h=32
- Standing spellbook, open, red pages, on legs | x=128 y=368 w=16 h=32
- Skull mask / blank ghost mask, white | x=144 y=368 w=16 h=16
- Creepy mask, 3 variants (wolf, clown, blank), 16px apart | x=176 y=368 w=48 h=16
- Witch hat, brown, worn | x=144 y=384 w=16 h=16
- Bone, white, single | x=0 y=400 w=32 h=16
- Standing spellbook, closed, on legs, 4 color-pattern variants, 32px apart | x=32 y=400 w=128 h=32
- Goblin/zombie head, green | x=160 y=400 w=16 h=16
- Faint dreamcatcher circle decoration, 2 variants | x=176 y=400 w=64 h=32
- Candle, lit, orange flame, 2 identical, 16px apart | x=240 y=400 w=16 h=16
- Small white oval bead/item | x=240 y=416 w=16 h=16
- Red potion droplet, small | x=248 y=416 w=8 h=8
- Bed frame, single, wood, tan blanket | x=224 y=384 w=32 h=48
- Teddy bear plush, brown, 2 identical, 16px apart | x=0 y=368 w=32 h=16
- Voodoo doll character, red hair, sitting, holding item, 2 variants | x=32 y=368 w=48 h=16
- Framed portrait, red-haired figure | x=80 y=368 w=16 h=16
- Teddy bear with pins/voodoo needles, 2 more variants | x=0 y=400 w=32 h=16
- Wood crate, open, spilling cookies and gold | x=32 y=400 w=32 h=16
- Wood plank stack/shelf, dark brown | x=64 y=400 w=32 h=32
- Colorful candy/confetti scatter pile | x=96 y=416 w=48 h=16
- Halloween sticker/flag icon set, small, colorful | x=112 y=400 w=32 h=16
- Standing spellbook with red bookmark, 2 color variants | x=144 y=400 w=32 h=32
- Mechanical pipe/pump segment with red gauge and skull valve, repeats x3, 32px apart | x=0 y=432 w=96 h=48
- Wooden cross, brown, small, 3 identical, 16px apart | x=176 y=432 w=48 h=16
- Coffin, closed, dark gray, standing | x=0 y=496 w=48 h=64
- Coffin, open, showing skeleton, standing | x=48 y=496 w=48 h=64
- Coffin, open, showing skeleton with cross headstone, wide 2-part | x=96 y=496 w=64 h=64
- Backpack, orange jack-o-lantern pattern, gray flap | x=192 y=496 w=32 h=48
- Tiny black item/pouch | x=176 y=528 w=16 h=16
- Small yellow candy/item | x=176 y=544 w=16 h=16
- Rug, green/tan pattern, rectangular | x=224 y=496 w=32 h=32
- Rug, tan/blue pattern, rectangular | x=224 y=528 w=32 h=32
- Framed painting, lightning/storm scene | x=224 y=560 w=16 h=16
- Framed painting, orange abstract | x=240 y=560 w=16 h=16
- Framed painting, dark forest scene | x=224 y=576 w=16 h=16
- Prison cell / barred cage wall unit, metal bars, chained top, empty and occupied variants | x=224 y=592 w=32 h=112
- Wooden bookshelf, brown, filled with colorful books, large (3-door)/medium (2-door)/small (1-door) sizes, 7 row-variants (differing book color and jack-o-lantern topper), ~48px apart vertically | x=0 y=560 w=224 h=336
- Safe/vault, dark gray, closed | x=224 y=704 w=16 h=16
- Small dark cabinet/locker, closed | x=240 y=704 w=16 h=16
- Small gold coin pile | x=224 y=720 w=16 h=16
- Dark mysterious green swirl icon | x=240 y=720 w=16 h=16
- Chain garland with hanging red charms, evenly spaced | x=0 y=736 w=224 h=32
- Wooden door, closed, 4 color/style variants (light wood, worn wood, dark wood, red cross) | x=96 y=768 w=128 h=48
- Door frame with striped curtain/drape | x=64 y=768 w=32 h=32
- Ladder, wood, brown, 2 size variants | x=64 y=800 w=32 h=32
- Fireplace, black, empty, wall-mounted, large | x=0 y=784 w=96 h=64
- Loose book clutter (open books, colorful stack) | x=192 y=768 w=48 h=32
- Book on lectern/stand, open, tan pages, red ribbon, 2 variants | x=224 y=768 w=32 h=64
- Hanging censer/lantern on chain, orange, wall-mounted | x=192 y=800 w=32 h=48
- Red gem/ruby, small, 2 identical | x=0 y=848 w=32 h=16
- Green gem/emerald, small, 2 identical | x=32 y=848 w=32 h=16
- Wall sconce/candle holder, ornate | x=224 y=848 w=16 h=32

### 12_Kitchen_Shadowless.png
256x784px

- wall/floor color swatch chips, 8 variants, 16px apart | x=16 y=0 w=16 h=16
- tall cabinet door panel, plain color, 4 variants (lavender, orange, blue, red), 32px apart | x=0 y=16 w=32 h=96
- kitchen window with striped curtain/blinds, 2 color variants (yellow/red, blue/white stripes), facing front | x=64 y=16 w=48 h=96
- tall gray wall/cabinet panel | x=112 y=16 w=32 h=96
- small wall-mounted switch/spice-rack panel with knob, 3 variants, 16px apart | x=144 y=64 w=16 h=16
- wood plank wall paneling, tan, 2 variants, tall | x=192 y=16 w=32 h=48
- wood plank wall paneling, red-brown/dark brown, 2 variants, tall | x=192 y=64 w=32 h=48
- countertop slab, light lavender, long, top-down | x=0 y=112 w=64 h=16
- kitchen base cabinet, two doors, wood-tone, 3 color variants, 16px apart vertically | x=32 y=112 w=48 h=48
- cabinet drawer unit with dark handle, small | x=112 y=112 w=16 h=16
- kitchen sink with faucet, top-down, 3 color variants, 16px apart vertically | x=144 y=112 w=32 h=48
- wall-mounted utensil rack/pegboard | x=192 y=112 w=16 h=16
- small round grocery/food item (apple, potato, blueberry), 3 color variants, 16px apart | x=208 y=112 w=16 h=32
- small stove control panel, wood frame, dark burner knobs | x=176 y=142 w=16 h=16
- kitchen counter top, long, 2 color variants (tan, red-brown) | x=32 y=155 w=64 h=16
- bar stool, top-down view, wood-tone, 4 color variants, 16px apart | x=0 y=175 w=16 h=16
- dining chair, high-back, facing down, wood-tone, 4 color variants, 16px apart | x=64 y=175 w=16 h=16
- small refrigerator/vending unit, gray, front view, 2 color variants | x=136 y=175 w=16 h=32
- glass bottle, green, small, 2 orientations | x=164 y=175 w=8 h=16
- small wall picture frame | x=180 y=185 w=8 h=16
- bench/table, long, 2 color variants (orange-tan, white-lavender) | x=192 y=175 w=64 h=16
- bar stool, top-down view, wood-tone, second set, 4 color variants, 16px apart | x=0 y=210 w=16 h=16
- dining chair, low-back, facing down, wood-tone, 4 color variants, 16px apart | x=64 y=210 w=16 h=16
- small fridge/cooler unit, gray, single | x=128 y=210 w=16 h=20
- small wood table/stand | x=152 y=210 w=16 h=16
- decorative tile/rug swatch, small, red pattern | x=180 y=210 w=8 h=16
- beverage crate, bottled drinks, 3 color variants (blue x2, green), clustered | x=196 y=210 w=52 h=20
- cash register/kitchen scale, small | x=0 y=240 w=16 h=16
- small kitchen drawer unit | x=72 y=240 w=16 h=16
- stove knob/dial, gray, round | x=136 y=240 w=16 h=16
- rolling kitchen cart/chest of drawers, wood, on wheels, 2 color variants | x=64 y=240 w=64 h=48
- small end table, light tan, on legs | x=152 y=242 w=16 h=8
- small rolling cart, wood, 3 color variants, 16px apart | x=184 y=242 w=64 h=16
- potted plant leaf, small, green | x=0 y=260 w=16 h=10
- faucet fixture, small, standalone | x=34 y=262 w=16 h=12
- long counter/bench, tan, 2 color variants | x=144 y=270 w=112 h=16
- hanging utensil rack (ladle, whisk, tongs) | x=0 y=253 w=32 h=16
- stacked plates, gray, 2 sizes | x=32 y=253 w=16 h=32
- small food dish, round plate, multiple food variants (salad, pasta, stew, eggs), 6 variants | x=0 y=285 w=32 h=48
- beverage bottle/wine glass, small, 3 variants | x=0 y=333 w=32 h=32
- wood dresser, 2-drawer, tan, on legs, 2 stacked color variants | x=48 y=237 w=32 h=64
- wood china cabinet with glass door, red-brown/tan, 3 variants, 32px apart vertically | x=96 y=237 w=32 h=96
- small rolling wood cart, plain top, tan/red-brown variants | x=144 y=237 w=32 h=16
- long wood bench/table, tan and red-brown variants | x=176 y=237 w=96 h=16
- checkered tablecloth texture, red/white and purple/tan variants, tall swatch | x=48 y=285 w=32 h=64
- plain lavender/white curtain or tablecloth texture, tall swatch | x=96 y=285 w=32 h=64
- dark red curtain/tablecloth texture, tall swatch | x=96 y=333 w=32 h=48
- ornate rug/carpet swatch, blue and gold patterned, 4 variants | x=0 y=317 w=64 h=48
- dotted fabric/tablecloth texture, light blue and pink variants, 4 pieces | x=0 y=365 w=96 h=64
- gray ceramic pot/vase, top-down, 2 variants | x=0 y=430 w=32 h=16
- stainless steel fridge bank, 4-door, large appliance | x=144 y=317 w=64 h=48
- espresso/coffee maker, gray with plug cord, 2 variants | x=208 y=317 w=32 h=32
- ceramic vase/gourd, brown and gray tone, 6 variants | x=240 y=317 w=16 h=48
- refrigerator, open door showing groceries, 2 variants | x=144 y=365 w=32 h=48
- small pantry cabinet with wine bottle on top | x=192 y=365 w=16 h=32
- small wall picture frame, nature theme, 2 variants | x=160 y=413 w=16 h=16
- range hood with vent pipe, gray | x=176 y=413 w=16 h=32
- stove/cooktop unit, gray, 4 burners, with kettle | x=176 y=237 w=32 h=16
- kitchen counter with built-in sink/microwave combo, gray, 2 variants | x=144 y=253 w=32 h=32
- espresso machine with plug, gray, standing, 3 more variants | x=208 y=365 w=32 h=32
- small canister/jar, standalone | x=196 y=413 w=8 h=16
- pink/dotted fabric swatch, tall, matching set | x=144 y=430 w=16 h=32
- wall-mounted calendar/schedule board on counter unit | x=112 y=422 w=16 h=32
- wardrobe/tall cabinet, plain gray, 2-door | x=112 y=470 w=16 h=32
- wardrobe/tall cabinet, gray with drawer stripes | x=112 y=522 w=16 h=32
- pendant lamp, gray, hanging, 4 color/orientation variants | x=0 y=546 w=32 h=32
- pressure cooker/rice cooker, gray, with plug, 4 variants | x=0 y=594 w=32 h=16
- donut/pastry, round, 2-tone glaze, 4 variants | x=32 y=594 w=16 h=32
- backpack, small, colored straps, 4 color variants | x=0 y=626 w=16 h=64
- pastry display case, glass front, with donuts | x=48 y=626 w=32 h=16
- kitchen island counter unit with glass display, wood, 3 variants | x=48 y=658 w=48 h=32
- dining chair, side view, wood-tone, 3 color variants, 16px apart | x=96 y=658 w=16 h=16
- bakery display counter, wood with glass window, long, 2 variants | x=0 y=690 w=64 h=32
- napkin/towel swatch, dark red, white, red-checkered, pink-checkered, 4 variants | x=64 y=738 w=64 h=16
- small squeeze bottle, standalone | x=196 y=738 w=8 h=16
- large egg-shaped bread roll/loaf, tan, 4 variants | x=0 y=754 w=64 h=48
- hot dog/sandwich food item on plate, 2 variants | x=64 y=754 w=32 h=16
- pretzel/twisted bread, 2 variants | x=96 y=754 w=32 h=32
- round bread loaf, plain, 2 variants | x=128 y=754 w=32 h=16
- dessert cake/cupcake with cream topping, round, multiple color/topping variants (8+) | x=128 y=738 w=96 h=48
- meat/burger patty food item, round, 2 variants | x=192 y=754 w=32 h=16
- kitchen appliance bank (stove + oven + fridge combo), gray, built-in | x=160 y=498 w=48 h=32
- microwave/toaster oven, gray, small counter appliance | x=144 y=506 w=16 h=16
- built-in cabinet with wine rack, gray, striped bottles | x=112 y=546 w=16 h=32
- wall-mounted kitchen cabinet with 3 window panes, wood-orange | x=208 y=530 w=48 h=16
- fresh produce item (banana, orange, cherries), small, 4 variants | x=160 y=546 w=48 h=16
- kitchen prep item (tomato half, cutting board, carrots, ladle), small, 6 variants | x=160 y=562 w=64 h=16
- rolling pin and knife, kitchen tool, 2 items | x=176 y=578 w=48 h=16
- hanging kitchen scale, round dial | x=248 y=562 w=8 h=32
- dining chair, side view, wood-tone with backrest, 2 more variants | x=112 y=594 w=32 h=16
- refrigerator, tall, two-tone gray/lavender, front view with handle, 4 variants | x=160 y=546 w=16 h=48
- refrigerator, tall, split freezer-top design, gray/lavender, 4 variants | x=200 y=546 w=16 h=48
- wardrobe/cabinet, wood with mirror/glass front, orange-brown, on legs, 2 variants | x=96 y=594 w=32 h=32
- wardrobe/cabinet, wood plain plank front tan, on legs | x=64 y=610 w=16 h=32
- serving cart/display case with pastries, wood and glass, long | x=0 y=610 w=64 h=32
- napkin/towel swatch, maroon and white, 2 variants | x=64 y=642 w=32 h=16

### 13_Conference_Hall_Shadowless.png
256x192px

- L-shaped wall/ceiling corner molding trim | x=16 y=0 w=32 h=16
- ceiling light glow, 3 brightness variants (bright yellow, pale yellow, dim white), 16px apart | x=48 y=0 w=16 h=16
- office chair, grey, low back, facing up | x=96 y=0 w=16 h=16
- office chair, wood/orange, tall cushioned back, facing up | x=112 y=0 w=16 h=16
- office chair, grey, facing up | x=128 y=0 w=16 h=16
- office chair, grey, plain, facing up | x=144 y=0 w=16 h=16
- wardrobe/closet top rail with hanger pegs | x=160 y=8 w=64 h=8
- frosted glass wardrobe/closet doors (2 panels) with rounded glass corner accent | x=160 y=16 w=64 h=40
- wall-mounted telephone/speaker unit, dark grey, with antenna | x=224 y=0 w=16 h=32
- wall light switch, small oval, cream | x=80 y=16 w=16 h=8
- water dispenser, grey with green indicator light and control panel (already ported) | x=80 y=24 w=24 h=40
- large oval conference table top, wood grain, top-down view | x=16 y=32 w=64 h=32
- framed employee ID portrait, green frame | x=224 y=32 w=16 h=16
- framed employee ID portrait, blue frame | x=240 y=32 w=16 h=16
- trash bin, plain brown | x=112 y=48 w=16 h=16
- trash bin, brown with recycling/logo badge | x=128 y=48 w=16 h=16
- wood table/bench top, striped grain, rectangular | x=16 y=64 w=64 h=16
- vertical rug/mat, maroon with gold border | x=80 y=64 w=16 h=32
- vertical rug/mat, blue and maroon striped | x=96 y=64 w=16 h=32
- vertical rug/mat, blue with gold border | x=112 y=64 w=16 h=32
- blue accent fabric/cushion panel tile | x=224 y=64 w=16 h=16
- checkered transparency placeholder tile (unused) | x=240 y=64 w=16 h=16
- small wood side table/stool top | x=64 y=80 w=16 h=16
- long wooden reception desk front panel with circular emblem | x=144 y=80 w=48 h=16
- small grey pedestal/stand (mic or sign stand) | x=208 y=64 w=16 h=16
- round chair, top-down view, brown seat with grey armrests, 2 variants ~32px apart | x=176 y=96 w=16 h=16
- curved wood bench/arm piece | x=192 y=112 w=16 h=16
- round office chair, top-down view, dark grey, no armrests | x=176 y=112 w=16 h=32
- fire extinguisher, red, wall-mounted (already ported) | x=208 y=112 w=16 h=32
- small round stool, brown | x=192 y=128 w=16 h=16
- electrical panel/breaker box door, light grey with blue control display | x=224 y=112 w=32 h=48
- canopy/valance top piece, tan wood, split "M" peak | x=0 y=96 w=32 h=32
- canopy/valance top piece, tan wood, center-pole "A" peak | x=32 y=96 w=32 h=32
- large white presentation screen/board on floor stand, glowing panel | x=0 y=128 w=80 h=40
- stage curtain backdrop, gold checkered pattern with scalloped fringe border | x=80 y=96 w=80 h=64

### 14_Basement_Shadowless.png
256x800px

Note: this sheet's furniture cluster is densely packed with touching/overlapping
sofa, chair, and vase sprites — three cataloging passes were needed before a
grid-overlay approach resolved it cleanly (the list below). Coordinates are
slightly less grid-snapped than the other 23 sheets as a result; double-check
against `tools/asset-viewer.html` before porting.

- 3-seat and 2-seat sofa/loveseat sets, 3 color variants (blue-gray, gray-checkered, orange-checkered) spaced 48px apart | x=48 y=5 w=144 h=59
- small round side table, 3 wood-tone variants (light oak, walnut, orange), stacked 48px apart | x=20 y=8 w=24 h=23
- diamond throw pillow icons, 3 colors (yellow, blue-gray, gray) | x=193 y=11 w=45 h=13
- flower vase, 3 color variants (blue, purple, yellow flowers), spaced 32px vertically | x=243 y=37 w=9 h=17
- gray diamond throw pillow with overlapping gold/blue pillow pair | x=193 y=42 w=44 h=14
- tall wingback armchair, 3 colors (gray, lilac-blue, orange/tan) in facing pairs | x=57 y=70 w=176 h=41
- small footstool/ottoman matching gray armchair pair | x=57 y=112 w=46 h=16
- rolled-arm 3-seat sofa + loveseat cluster, 3 colors (gray, lilac, tan) | x=112 y=112 w=128 h=75
- second gray wingback armchair pair (alt tufting) with matching footstools | x=57 y=134 w=46 h=58
- tall wooden ladder shelf/rack | x=20 y=149 w=24 h=40
- wide cushioned bench (light blue) | x=192 y=182 w=48 h=20
- thin long ottoman/bench seat | x=112 y=192 w=48 h=9
- square glass/fabric accent table or pouf, teal and blue variants | x=7 y=195 w=81 h=52
- green plaid square pouf/ottoman | x=55 y=243 w=33 h=45
- pink fluffy square rug | x=0 y=258 w=48 h=44
- tall 2-door wardrobe/cabinet, 5 color variants (red, ice-blue glass, light tan, medium tan, dark wood), upper+lower panels in 2 stacked rows | x=108 y=220 w=146 h=112
- standalone tall dark wardrobe/closet unit | x=108 y=301 w=52 h=83
- billiards accessories: crossed cues, ball rack triangle, chalk, loose balls | x=25 y=306 w=72 h=25
- vertical cue rack (bundle of cues) | x=117 y=321 w=22 h=31
- narrow tall dark cabinet, single unit | x=240 y=328 w=16 h=72
- teal felt pool/billiards table | x=7 y=331 w=34 h=48
- green felt pool/billiards table | x=55 y=336 w=34 h=32
- tall glass-front dresser/wardrobe (light blue) | x=192 y=336 w=16 h=64
- wardrobe/dresser pair units flanking pool tables | x=117 y=337 w=118 h=63
- gold cue holder/brush with bristle base | x=50 y=382 w=13 h=32
- blue felt pool/billiards table | x=7 y=384 w=34 h=32
- green felt card/pool table (small) | x=72 y=409 w=48 h=37
- dresser drawer-front accents, repeating 5-wide across 2 rows | x=168 y=410 w=80 h=48
- foosball table end/handle bar accessory | x=2 y=417 w=62 h=13
- blue felt card/pool table (small) | x=8 y=441 w=48 h=37
- small vase/chalk accessory, repeats every 32px vertically | x=139 y=406 w=10 h=83
- tan felt card/pool table (small) | x=72 y=457 w=48 h=37
- light gray glass-front display cabinet, repeating 3-wide, 2 rows | x=162 y=472 w=93 h=51
- long striped runner rug with thin ledge below | x=96 y=502 w=80 h=19
- small floor stool/lamp base accessory | x=80 y=503 w=15 h=16
- thin vertical glass mirror panel pair | x=162 y=528 w=26 h=28
- small stool leg fragments/knobs cluster | x=194 y=506 w=65 h=30
- gray TV/monitor screens, 3 sizes ascending | x=216 y=552 w=40 h=24
- second gray TV/monitor screen row | x=162 y=560 w=10 h=28
- large flat-panel TV screens, 2 sizes | x=101 y=531 w=53 h=23
- decorative accent: moths fluttering above a round pouf ottoman | x=221 y=584 w=35 h=31
- diagonal wooden staircase railing, pair | x=173 y=601 w=83 h=59
- upholstered armchair, 2 styles (tub chair, tufted wingback) x 4 color variants (white, powder-blue, gold, red), repeating grid | x=34 y=531 w=123 h=164
- small fabric color-swatch key icons, repeating every 16px vertically | x=10 y=533 w=10 h=117
- round pouf/ottoman, tan and white variants | x=0 y=665 w=50 h=38
- wall sconce/lamp accessory | x=230 y=672 w=20 h=23
- large area rug (blue-green, tan center panel) beside paneled glass window unit | x=144 y=704 w=112 h=80
- narrow dark cabinet/closet door | x=0 y=705 w=16 h=30
- TV entertainment console with screen and game accessories on top | x=99 y=760 w=58 h=33
- small retro electronics accessories (game cartridges, controllers, CDs, cables, knobs) scattered cluster | x=1 y=698 w=140 h=92

### 15_Christmas_Shadowless.png
256x272px

- christmas tree, 4 color variants (green/dark green/blue-teal/dark teal), 32px apart | x=16 y=0 w=32 h=48
- wrapped gift box, 3 color variants (red+gold star/red-white stripe/blue+gold star), 16px apart, top row | x=0 y=48 w=16 h=16
- wrapped gift box, 3 color variants (red-white stripe/red stripe/green-red), 16px apart, second row | x=0 y=64 w=16 h=16
- tall thin wrapped gift box, 3-4 color variants (green/red-white/gold), 16px apart | x=0 y=80 w=16 h=32
- pile of wrapped gift boxes, mixed colors, overlapping | x=48 y=56 w=96 h=48
- small gray rock/pebble prop | x=128 y=48 w=16 h=16
- christmas stocking, red with white fur cuff, hanging | x=144 y=0 w=16 h=32
- christmas stocking, blue/white striped, hanging | x=160 y=0 w=16 h=32
- christmas wreath, red/gold ornaments, 3 variants (open/half/full ring), 16px apart | x=176 y=8 w=16 h=32
- fireplace mantel, unlit, gray stone | x=224 y=0 w=32 h=48
- christmas stocking, red variant 2, hanging | x=144 y=48 w=16 h=32
- christmas stocking, teal/green with fur cuff, hanging | x=160 y=48 w=16 h=32
- christmas wreath, dark teal/gold ornaments, 3 variants, 16px apart | x=176 y=48 w=16 h=32
- picture frame, snowman portrait, wood frame | x=112 y=64 w=16 h=32
- picture frame, santa portrait, wood frame | x=128 y=64 w=16 h=32
- christmas stocking, red, standalone hanging | x=144 y=64 w=16 h=32
- nutcracker soldier, back view, black bearskin hat, red uniform, 4 variants (one with gold crown hat), 16px apart | x=160 y=64 w=16 h=48
- fireplace mantel, lit, orange fire glow | x=224 y=64 w=32 h=48
- gold star ornament with hanging bead garland | x=16 y=96 w=48 h=48
- teal diamond ornament with hanging bead garland | x=64 y=96 w=48 h=48
- gold ornate garland arc ornament, crown-shaped | x=112 y=96 w=48 h=48
- small gold sparkle star ornament with garland | x=160 y=96 w=48 h=48
- nutcracker soldier, front view holding sword, 4 color variants (green/silver/red/blue), 16px apart | x=160 y=112 w=16 h=48
- mini christmas tree, small, 2 green shade variants, 16px apart | x=224 y=112 w=16 h=32
- red curtain/cloth panel, large, hanging | x=128 y=112 w=16 h=48
- red curtain/cloth panel, small, hanging | x=144 y=128 w=16 h=32
- small purple robed nutcracker/wizard figure | x=224 y=144 w=16 h=32
- small elf/guard figure, blue and gold uniform | x=240 y=144 w=16 h=32
- shield/banner ornament, christmas star emblem, 4 color variants (green/silver/red/blue), 16px apart | x=0 y=144 w=16 h=48
- fairy/angel ornament, small, gold wings | x=64 y=144 w=16 h=16
- fairy/angel ornament, small, blue wings variant | x=80 y=144 w=16 h=16
- reindeer head ornament, brown with red nose, 2 variants, 16px apart | x=96 y=144 w=16 h=16
- throne chair, red velvet with gold trim | x=128 y=144 w=32 h=64
- large pink patterned rug/blanket, X-quilt pattern | x=176 y=144 w=48 h=48
- reindeer plush toy, standing, 2 color variants, 32px apart | x=0 y=176 w=32 h=32
- wish list letter with quill pen, diagonal | x=80 y=176 w=16 h=16
- wish list letter with candy cane pen, diagonal | x=80 y=192 w=16 h=16
- small folded pink cloth swatch, same quilt pattern | x=192 y=192 w=16 h=16
- snow globe, round glass dome on base, 2 size variants, 16px apart | x=224 y=192 w=16 h=16
- gift sack, red with toys spilling out | x=128 y=208 w=16 h=16
- santa hat, red with white fur trim | x=160 y=208 w=16 h=16
- roast turkey/ham, whole, golden brown, 3-4 pose variants, 16px apart | x=0 y=208 w=16 h=32
- yule log cake, frosted chocolate roll, 2 variants | x=64 y=208 w=32 h=16
- gingerbread cookie/log piece, iced with candy, 3 variants | x=96 y=208 w=32 h=16
- bread roll/dumpling, round pale, 3-4 variants | x=0 y=224 w=16 h=16
- plate of roast food, various toppings, several variants | x=0 y=224 w=64 h=48
- cutting board with knife/food slice | x=176 y=224 w=16 h=16
- candy cane, red/white striped, small | x=96 y=240 w=16 h=16

### 16_Grocery_store_Shadowless.png
256x1248px

- customer NPC pushing produce cart, walking down, 3 color variants, ~32px apart | x=32 y=0 w=32 h=32
- customer NPC carrying box overhead, walking down, 3 color variants, ~32px apart | x=64 y=0 w=32 h=32
- empty metal shopping cart, front-facing, 5 color-accent variants, 32px apart | x=0 y=32 w=32 h=48
- large double-basket shopping cart, front-facing | x=176 y=32 w=48 h=48
- glass double door, closed, light blue tint | x=224 y=32 w=32 h=32
- shopping cart (no child seat), front-facing, 3 variants, 32px apart | x=0 y=64 w=32 h=48
- shopping cart with child seat, front-facing, 3 color-seat variants, 32px apart | x=112 y=64 w=32 h=48
- tall double-door freezer unit, dark gray, closed | x=192 y=64 w=32 h=64
- vertical glass door panel fragment, light blue tint | x=224 y=64 w=32 h=32
- dropped grocery bag icon with produce, small, 3 variants | x=0 y=96 w=32 h=32
- wood plank icon | x=48 y=96 w=16 h=16
- closed cardboard box icon, single and stacked-pair variant | x=80 y=96 w=32 h=32
- small colored price-tag icon, 3 color variants, stacked 16px apart | x=0 y=128 w=16 h=16
- empty wooden-frame display shelf/rack, 4 color variants, 32px apart, front-facing | x=32 y=128 w=32 h=48
- small multicolor pattern product box icon, 2 variants | x=160 y=128 w=16 h=16
- discount percentage sign, red text, values -10% to -50%, 5 variants, 24px apart | x=0 y=176 w=24 h=16
- round pastry/donut in package, 5 color variants, 32px apart | x=160 y=176 w=32 h=24
- small snack bag, striped pattern, 3 variants | x=152 y=192 w=16 h=16
- small juice/drink carton icon | x=160 y=192 w=16 h=16
- canned beverage, red label, row of 4 | x=0 y=200 w=16 h=16
- stocked shelf unit, cans/bottles multi-color, tall, 2 columns | x=0 y=224 w=32 h=112
- shelved product boxes, red/yellow pattern, grid arrangement | x=16 y=192 w=64 h=96
- canned beverage shelf row, red/blue variants | x=48 y=240 w=64 h=48
- rolled fabric bolt / curtain roll, cream, tall, 2 variants | x=96 y=240 w=16 h=64
- canned goods shelf column, striped label, multi-row | x=176 y=192 w=32 h=96
- shopping tote bag / backpack icon, 4 color variants (orange, gray, teal, green), stacked pairs | x=224 y=192 w=32 h=144
- small glass jar / spice bottle, several variants | x=0 y=304 w=16 h=32
- light gray display table/counter, small | x=96 y=312 w=32 h=24
- thin glass shelf ledge | x=128 y=312 w=32 h=16
- anti-theft security gate, pair, gray | x=96 y=352 w=32 h=32
- checkout counter with cash register and conveyor belt, gray, 2 variants | x=0 y=368 w=32 h=48
- self-checkout scanner pole, gray with red light | x=144 y=368 w=16 h=48
- handheld scanner/register unit | x=128 y=384 w=16 h=16
- floor mat, yellow-checkered or teal, 2 variants | x=144 y=392 w=16 h=16
- glass bakery/deli display counter, empty, angled top | x=176 y=352 w=64 h=32
- glass display cabinet, two-panel, tall | x=192 y=400 w=48 h=32
- diamond floor rug/tile icon, orange or green, 4 instances | x=24 y=368 w=16 h=16
- stacked yellow plastic crates | x=16 y=352 w=32 h=16
- floor tile swatch, tan checkered pattern | x=0 y=432 w=96 h=64
- floor tile swatch, light tan/blue variant | x=0 y=496 w=96 h=64
- floor tile swatch, orange | x=0 y=576 w=96 h=32
- bakery food tray icon, bread/pastry variety, grid of ~15 | x=96 y=432 w=64 h=48
- digital price display tile set, red LED numerals 01-09 | x=80 y=472 w=128 h=48
- wooden bakery display rack, curved crest top, 2 shelf tiers, 2 variants | x=176 y=432 w=64 h=96
- tall window/mirror panel, light blue tint, 4 variants | x=0 y=550 w=96 h=32
- card payment terminal on stand | x=240 y=496 w=16 h=48
- wall art picture frame, cat motif | x=176 y=584 w=16 h=16
- wall art picture frame, dark abstract | x=176 y=624 w=16 h=16
- toaster oven appliance, gray, 2 stacked variants | x=144 y=520 w=32 h=64
- white double-door refrigerator/freezer, tall | x=192 y=520 w=32 h=48
- bakery cart rack with round loaves, 2 tiers | x=112 y=520 w=32 h=64
- rolling metal utility cart with wheels, empty, several variants | x=0 y=568 w=32 h=48
- long gray metal prep table | x=224 y=624 w=32 h=16
- raw meat cut / steak, red, several shapes | x=96 y=648 w=80 h=16
- deli glass display counter, long, pink accent top | x=176 y=644 w=80 h=16
- ground meat / meat piece, pink-red, various shapes | x=96 y=680 w=80 h=16
- deli glass display counter, long, tan accent top | x=176 y=677 w=80 h=24
- digital weighing scale, gray, 2 variants | x=224 y=677 w=32 h=24
- wall electrical outlet, small | x=224 y=707 w=16 h=8
- hanging sausages on rack bar, row | x=96 y=708 w=80 h=16
- hanging whole ham/prosciutto with red ribbon, 3 variants | x=176 y=712 w=48 h=24
- spray/cleaning bottle | x=240 y=715 w=16 h=16
- hanging cured meat legs, whole, 3 variants | x=0 y=736 w=80 h=48
- small wall panel/switch box | x=64 y=744 w=8 h=16
- stainless steel meat-cutting table | x=88 y=752 w=32 h=16
- sliced meat piece, loose | x=128 y=748 w=24 h=8
- fish/seafood display case with ice, assorted fish icons | x=152 y=752 w=104 h=24
- OPEN/CLOSED hanging sign, double-sided | x=0 y=788 w=32 h=8
- small fish tank icon | x=32 y=788 w=16 h=16
- seafood/produce icon row (shellfish, crab, fish), mixed | x=48 y=788 w=96 h=16
- fish display case, second variant | x=176 y=784 w=80 h=16
- empty glass display case, small | x=0 y=816 w=40 h=24
- fresh fish icon row, 4 variants | x=48 y=816 w=64 h=16
- wooden crate with red produce/dried chili, 2 variants | x=160 y=824 w=32 h=16
- small yellow fish icon | x=232 y=824 w=16 h=8
- meat grinder / conveyor prep counter, long | x=0 y=860 w=150 h=16
- cooler bag, blue, 2 sizes | x=100 y=870 w=48 h=32
- kitchen knife icon | x=148 y=884 w=16 h=16
- tiled floor/wall pattern swatch, gray grid | x=0 y=880 w=48 h=32
- small vent/window panel | x=32 y=896 w=16 h=16
- stainless prep sink with faucet | x=176 y=880 w=48 h=32
- wooden counter/table, brown | x=0 y=920 w=48 h=16
- fish tank display case, live fish, 2 variants | x=48 y=916 w=96 h=16
- gold coin icon, several variants | x=148 y=900 w=64 h=24
- hanging garlic/onion string decoration | x=210 y=900 w=48 h=24
- wooden produce crate, brown, 3 slat-color variants | x=0 y=960 w=64 h=80
- crate of green leafy vegetables | x=64 y=960 w=32 h=80
- crate of yellow/orange citrus fruit | x=96 y=960 w=16 h=80
- crate of red fruit (apples/cherries), 2 variants | x=112 y=960 w=32 h=80
- crate of purple grapes / pink produce, 2 variants | x=128 y=960 w=24 h=64
- crate with yellow diagonal pattern produce | x=128 y=1000 w=24 h=32
- fruit market handcart, red, 2 variants | x=148 y=982 w=32 h=24
- small hanging price tag sign | x=146 y=1010 w=8 h=8
- potted lavender/purple flower bunch, 3 variants | x=190 y=978 w=32 h=32
- small potted flower icon, 2 color variants | x=224 y=982 w=32 h=24
- potted blue flower bunch | x=190 y=1010 w=32 h=16
- standing wheat/leaf bundle, green | x=224 y=912 w=32 h=16
- small wooden shelf/furniture piece, brown | x=0 y=1032 w=16 h=32
- clay flower pot, empty, 2 variants | x=48 y=1032 w=16 h=16
- large round cactus plant, potted, clustered variants | x=64 y=1032 w=64 h=32
- hanging heart string banner decoration | x=112 y=1080 w=48 h=8
- red heart icon, small, 6 variants | x=120 y=1090 w=8 h=8
- tall thin potted cactus, 5 variants | x=0 y=1112 w=80 h=32
- cactus cluster in pot, large, 2 variants | x=32 y=1130 w=48 h=32
- market stall counter, lavender with red-white striped skirt | x=116 y=1132 w=40 h=32
- market stall booth, red striped roof with heart sign | x=165 y=1127 w=35 h=38
- small heart charm icon | x=202 y=1132 w=16 h=8
- flower bouquet in glass vase, mixed-color arrangement, 8 variants, ~24px apart | x=0 y=1182 w=24 h=48
- flower bouquet in glass vase, alternate color set, 8 variants, ~24px apart | x=0 y=1230 w=24 h=48
- gray plant display bench/planter box, 2 sections | x=175 y=1194 w=50 h=20

### 18_Jail_Shadowless.png
256x720px

- Wall & floor texture tile variants (beige/gray stone, 8 tiles) | x=0 y=0 w=128 h=32
- Blue jail cell door with barred gate and center lock | x=128 y=0 w=64 h=32
- Small police/prisoner character badge icons, blue & pink poses (x8) | x=192 y=0 w=64 h=32
- Cracked plaster jail wall section with barred window | x=0 y=32 w=32 h=96
- Small grid/vent wall panel variants (2) | x=32 y=32 w=32 h=16
- Wooden bunk bed frame with ladder and tan mattress (3 stacking variants) | x=64 y=32 w=32 h=176
- Wooden baseball bat / club, diagonal (2 variants) | x=80 y=32 w=32 h=48
- White cabinet/wardrobe with shelves (2 stacked variants) | x=112 y=32 w=32 h=112
- Tall thin metal pole/lamp fixture | x=144 y=32 w=16 h=80
- Small yellow caution/warning sign | x=160 y=32 w=16 h=16
- Row of tall gray storage lockers (4 across) | x=192 y=32 w=64 h=48
- Wall-mounted first aid kit boxes — green cross, red cross, camo variants | x=192 y=64 w=64 h=16
- Small green square emblem/badge tiles (3 variants) | x=160 y=80 w=32 h=16
- Colored privacy/shower screen dividers (teal, gray, brown) | x=160 y=96 w=48 h=48
- Wall-mount medical supply boxes with vials | x=224 y=96 w=32 h=16
- Reception/service counter, teal top | x=208 y=112 w=48 h=32
- Wooden dresser/chest with drawers (tan, 2 variants) | x=64 y=128 w=32 h=48
- Rolled paper/scroll items, small (2) | x=96 y=128 w=16 h=16
- Small wooden accent table with framed pictures (2) | x=112 y=96 w=32 h=48
- Standing metal coat rack / IV-pole style fixture | x=128 y=144 w=32 h=48
- Cracked wall mirror shard icon | x=160 y=144 w=32 h=16
- Teal cleaning cart/trolley | x=192 y=144 w=32 h=48
- Small robot/security camera figure with blue indicator light | x=224 y=144 w=32 h=32
- Wall-mounted broken sink/toilet fixtures, gray (2) | x=0 y=160 w=32 h=48
- Metal handcuff/shackle restraint icons (2 pairs) | x=0 y=168 w=32 h=16
- Small gray cross/tombstone marker icon | x=32 y=160 w=32 h=32
- Caution/warning tape icons — yellow-black and orange-black variants | x=0 y=208 w=32 h=32
- White industrial machine unit with green blinking light (left pair, 2 units) | x=64 y=176 w=32 h=48
- Narrow teal vertical generator/machine unit | x=96 y=176 w=16 h=48
- White/gray industrial machine unit with green light (right pair, 2 units) | x=144 y=176 w=48 h=48
- Computer/CRT monitors on stands — blank, blue-screen, chart, spreadsheet, network-diagram screen variants, repeated across 3 rows | x=128 y=224 w=128 h=64
- Wall bank of small dark CCTV/security monitor screens, grid array | x=64 y=256 w=64 h=32
- Wide bed frame with olive/gray mattress (2 color variants) | x=0 y=240 w=64 h=48
- Control panel switchboard with red/green/blue indicator lights (2 units) | x=16 y=288 w=64 h=16
- Second bed frame variant, light gray/lavender | x=0 y=304 w=64 h=32
- Security monitor bank with photo/chart thumbnails | x=64 y=304 w=64 h=32
- Server rack cabinet, dark gray double-door | x=128 y=320 w=32 h=48
- Office swivel chairs — gray, blue, and green color variants, 3 rows each | x=160 y=320 w=96 h=96
- Player character standing sprites — red shirt and blue/gray shirt | x=128 y=368 w=32 h=16
- Rectangular table, light blue top with wood-tone base (2 variants) | x=0 y=416 w=64 h=32
- Storage bin/crate stack, orange-brown, 3 vertical stacking heights | x=64 y=416 w=64 h=32
- Glass room divider panel | x=128 y=416 w=32 h=32
- Long bench table, light blue top | x=160 y=416 w=96 h=32
- Small snack/food tray icons, assorted (row of 6) | x=0 y=448 w=64 h=32
- Bowl icons — empty, soup, and stew variants | x=0 y=480 w=64 h=16
- Tall storage crate/bin stacks and wooden table tops, tan/lavender/olive tones (multiple variants) | x=64 y=448 w=192 h=64
- Small framed wall art/painting icons (3 variants) | x=144 y=560 w=96 h=16
- Larger framed painting, tan/gold abstract pattern (2 size variants) | x=176 y=592 w=64 h=48
- Wooden cabinet with colored drawer fronts, blue/orange (2 units) | x=96 y=592 w=48 h=32
- Theater/auditorium seating — red and light blue/gray padded chairs, multiple poses | x=0 y=528 w=80 h=64
- Single red thin folding chair, 2 poses | x=96 y=544 w=48 h=48
- Empty colored serving trays — teal, lavender, yellow | x=0 y=592 w=96 h=16
- Food serving tray icons with plate of food (repeated rows, color variants) | x=0 y=608 w=96 h=96
- Assorted round food icons — roasted chicken, bread rolls, donuts, cookies (grid array, 6 rows x 3 cols) | x=192 y=608 w=64 h=96
- Tall refrigerator/cooler units — solid-door and glass-front variants (7 across) | x=0 y=672 w=256 h=48

### 19_Hospital_Shadowless.png
256x1760px

- Blank wall-mounted whiteboard | x=0 y=0 w=32 h=32
- Corkboard with pinned notes/schedule | x=32 y=0 w=32 h=32
- U-shaped hospital reception counter w/ monitor, tan variant (already ported — lobby check-in desk) | x=64 y=0 w=96 h=48
- U-shaped hospital reception counter w/ monitor, dark-tan variant | x=160 y=0 w=96 h=48
- U-shaped hospital reception counter w/ monitor, orange-red variant | x=64 y=48 w=96 h=48
- U-shaped hospital reception counter w/ monitor, olive/mustard variant | x=160 y=48 w=96 h=48
- ID badge/keycard on lanyard, yellow | x=0 y=48 w=16 h=16
- Small red/white wall sign | x=16 y=48 w=16 h=16
- Wall-mounted fire extinguisher, red | x=32 y=48 w=16 h=32
- Stack of blue/white clipboard folders | x=48 y=48 w=16 h=16
- Wall-mounted vitals/dispenser box, grey (2 stacked units) | x=0 y=80 w=16 h=64
- Wall phone, grey receiver hung | x=32 y=96 w=16 h=16
- Wall phone, grey receiver raised | x=48 y=96 w=16 h=16
- Clipboard/chart icons with colored tabs (green, blue x2, purple), 16px spacing | x=32 y=128 w=32 h=32
- Empty grey supply shelving unit, wide | x=64 y=96 w=32 h=48
- Supply shelving stocked with colored file boxes, 3 color-scheme variants | x=96 y=96 w=96 h=48
- Narrow supply shelf, empty | x=192 y=96 w=16 h=48
- Narrow supply shelves stocked with colored medicine bottles, 3 variants | x=208 y=96 w=48 h=48
- Stack of brown cardboard boxes (varied sizes) | x=64 y=192 w=48 h=48
- Plain lavender U-shaped front-desk counter w/ computer monitor | x=112 y=192 w=112 h=64
- Medicine cabinet w/ colored bottles, grey frame | x=192 y=192 w=32 h=48
- Tall privacy partition/room-divider panel, light grey (pair) | x=224 y=192 w=32 h=48
- Tall grey server rack / vending-style machine w/ colored buttons (2 variants) | x=224 y=240 w=32 h=96
- Small potted plants, terracotta pots, 2 sizes | x=0 y=208 w=48 h=32
- Wall light switch panel | x=0 y=256 w=16 h=32
- Small potted plants, silver pots, 2 sizes | x=16 y=256 w=48 h=32
- Office chair set (5 poses: front/3-4/back/side/cushion), color variants yellow, olive, green, blue, red — 5 rows | x=80 y=192 w=96 h=160
- Small framed dark wall monitor/TV screens, 2 rows of 3 | x=224 y=192 w=96 h=64
- Queue stanchion rope barriers, gold posts w/ blue/red/brown ropes, 3 color variants | x=224 y=0 w=32 h=352
- Small side table, white/grey rectangular | x=16 y=288 w=32 h=16
- Corner easel/display board with papers | x=48 y=288 w=32 h=32
- Small potted plants (yellow flower, pink flower, red flower, blue flower) row | x=0 y=304 w=64 h=32
- Small fridge/filing cabinet, grey | x=32 y=320 w=16 h=32
- Pink cushioned bench/loveseat | x=192 y=320 w=32 h=32
- Green wall-mounted cabinet w/ red/white sign | x=0 y=336 w=32 h=16
- Blue wall-mounted double door cabinet | x=48 y=336 w=32 h=16
- Wall-mounted color-scheme monitor bars (red, yellow, green, pink) 4 variants | x=112 y=354 w=64 h=32
- Long thin wall shelf, white/grey (2 variants) | x=80 y=380 w=96 h=16
- Metal rolling IV pole / drip stand, 2 variants | x=0 y=328 w=32 h=96
- Wall/floor window unit, silver frame, 2 sizes | x=64 y=344 w=96 h=64
- Wall/floor window unit, wood frame, 2 sizes | x=64 y=384 w=96 h=64
- Wheeled hospital bed frame w/ blue mattress | x=176 y=400 w=32 h=64
- Wall-mounted colored info monitors (blue, yellow, green, pink, grey) 5 variants | x=224 y=376 w=80 h=64
- Wheelchair, teal/blue seat | x=0 y=456 w=48 h=64
- Wheelchair, blue seat | x=48 y=456 w=48 h=64
- Tall metal storage locker, grey frame w/ light-blue/light-blue-green/light-green door colors, 3 variants | x=64 y=456 w=96 h=96
- Metal storage locker, glass window doors, silver frame 3-wide | x=80 y=520 w=48 h=48
- Metal storage locker, glass window doors, gold frame 3-wide | x=160 y=520 w=48 h=48
- Small vials/bottles/syringes on counter, misc medical supplies | x=208 y=488 w=48 h=64
- Wheeled medical cart w/ monitor, grey | x=144 y=536 w=16 h=16
- Small cabinet on wheels, grey/tan 2-tone | x=208 y=568 w=32 h=48
- Trash can, wire-mesh, 2 variants | x=192 y=608 w=64 h=32
- Hospital exam table/bench, white padded, 2 sizes | x=224 y=584 w=96 h=32
- Skeleton anatomy model, standing, 2 poses | x=0 y=584 w=32 h=64
- Small info icons (checklist, first-aid cross, warning triangle), row | x=0 y=632 w=48 h=16
- Framed nature/landscape wall art, small, 3 variants | x=0 y=664 w=96 h=32
- Warning triangle sign, wall-mounted | x=32 y=680 w=16 h=16
- MRI/CT scanner machine, large, 2 units | x=64 y=632 w=96 h=96
- Patient privacy curtain screen, light-blue and tan variants | x=176 y=680 w=96 h=32
- Wall-mounted color monitor panels, 4 variants | x=0 y=712 w=48 h=32
- Trash bins, grey and green | x=0 y=792 w=32 h=32
- Vending/ATM style machine, 4 color-panel variants | x=64 y=760 w=96 h=64
- Recycling bins, colored lids (red, blue, green, tan) | x=32 y=784 w=32 h=32
- Vending machine, snack/candy stocked, 2 variants | x=0 y=840 w=32 h=96
- ATM/cash machine, grey | x=64 y=888 w=32 h=48
- Sliding glass double doors, grey frame | x=176 y=872 w=48 h=64
- Emergency call button, red | x=96 y=888 w=16 h=16
- Long horizontal metal blinds/shutter wall panels, grey (4 sections) | x=64 y=880 w=96 h=48
- Wall-mounted TV screens, dark, small (2 variants) | x=192 y=920 w=32 h=16
- Long reception service counter, plain light-grey (glass front) | x=192 y=920 w=64 h=32
- Tan building/kiosk facade w/ awning, windows, double doors | x=0 y=976 w=80 h=88
- Grey building/kiosk facade w/ awning, windows, double doors | x=112 y=976 w=80 h=88
- Wall-mounted computer monitors on desk arms, 4 blue-screen variants | x=192 y=976 w=64 h=32
- Small reception desk, plain grey w/ drawers | x=192 y=1016 w=32 h=32
- Sink/wash basin counter w/ soap dispensers | x=224 y=1040 w=32 h=32
- Long horizontal metal shutter/blinds wall panel, tall (2 sections) | x=0 y=1080 w=64 h=96
- Small teal wash-basin sink counter, 2 variants | x=72 y=1088 w=24 h=64
- Small framed wall art (landscape), pinboard style, 3 variants | x=104 y=1088 w=48 h=64
- Grey filing cabinet, double door | x=176 y=1088 w=48 h=32
- Small food/drink icon signs (chips, coffee, cup) | x=224 y=1088 w=48 h=16
- Rows of school/office lockers, olive and tan colored, 6-wide | x=160 y=1120 w=96 h=32
- Vertical medical scanner/kiosk machine, grey, 2 poses | x=32 y=1200 w=64 h=112
- Small wall-mounted monitor screens, misc | x=0 y=1200 w=32 h=48
- Small standing robot/droid nurse assistant, grey, 3 poses | x=112 y=1200 w=96 h=112
- Small wheeled floor-cleaner robot | x=128 y=1216 w=32 h=48
- Reception desk w/ dual monitors, grey | x=224 y=1216 w=32 h=32
- Wall clocks, round and square, 5 color/style variants | x=224 y=1272 w=96 h=32
- Reception desk w/ monitor, cluttered with supplies/bottles | x=224 y=1240 w=64 h=32
- Tall storage cabinet, double-door, teal/lavender/light-blue variants (4 total) | x=0 y=1312 w=128 h=64
- Small drawer unit cabinets, various colors (blue-grey, purple, olive, tan), stacked pairs | x=176 y=1360 w=48 h=112
- Hospital bed row, curtained privacy dividers, pink/lavender/teal fabric variants | x=224 y=1344 w=32 h=96
- Wheelchair, light-blue and dark-grey wheel variants, multiple poses | x=0 y=1560 w=128 h=112
- Office/exam chair, wood-and-metal frame, multiple color variants (brown, olive, tan) | x=128 y=1560 w=128 h=112
- Small castle-shaped storage cabinet w/ red roof turrets, tan | x=192 y=1552 w=64 h=64
- Small castle-shaped storage cabinet w/ blue roof turrets, tan | x=64 y=1656 w=64 h=64
- Small crayon/pencil cup organizer, colored | x=128 y=1616 w=32 h=32
- Small crown and sun decorative icons | x=160 y=1608 w=32 h=16
- Small pink blob/creature plush toy | x=160 y=1680 w=32 h=32
- Small blue blob/creature plush toy | x=160 y=1704 w=32 h=32
- Row of colorful pediatric chairs (blue, green, yellow, red, pink), front/side views | x=0 y=1408 w=48 h=176
- Long wooden play-desk/counter w/ storage cubbies, tan | x=64 y=1408 w=112 h=32
- Small wooden step-stool/shelf unit | x=176 y=1408 w=32 h=32
- Small pediatric backpack toys (colorful, 5 variants) | x=64 y=1440 w=96 h=32
- Round ottoman/pouf seats, multiple colors (blue, orange, white, green, pink, brown) | x=192 y=1440 w=96 h=112
- Small round side tables, colorful (blue, orange, green, pink) matching poufs | x=224 y=1416 w=32 h=48
- Small plush blob toys, multi-color (green, grey, gold, pink) | x=0 y=1600 w=96 h=32
- Small teddy-bear-face plush toys, 4 colors | x=112 y=1704 w=96 h=32
- Playroom stacking toy rings, colorful | x=112 y=1520 w=32 h=32
- Small hazard/liquid-spill icon decal | x=144 y=1552 w=16 h=16
- Small drawer dresser w/ round handles, tan | x=0 y=1544 w=32 h=64
- Kids' bunk-bed frame, blue arch canopy | x=112 y=1512 w=48 h=32
- Row of colorful pediatric chairs, second set (blue/green/yellow/pink), ladder arrangement | x=176 y=1512 w=64 h=96
- Kids' bunk-bed frame, pink arch canopy | x=112 y=1584 w=48 h=32
- Whiteboard easel on wooden legs | x=224 y=1584 w=32 h=32
- Kids' cubby storage shelf, colorful bins, tall | x=224 y=1616 w=32 h=112
- Kids' colorful storybook/picture panel boards, framed | x=224 y=1560 w=32 h=64
- Small thermometer icons, 3 color variants | x=112 y=1656 w=48 h=16
- Small confetti/sparkle particle effect | x=160 y=1656 w=32 h=16
- Small paint-roller/brush icon in cup | x=224 y=1608 w=16 h=16
- Blue draped canopy/tent fabric top | x=224 y=1656 w=48 h=32
- Pink draped canopy/tent fabric top | x=224 y=1688 w=48 h=32
- Blood/injury splatter decal, 2 variants | x=176 y=1688 w=64 h=16
- Small syringe/needle icons, 4 color variants | x=224 y=1720 w=48 h=32
- Character portrait head icons (male, various hair/expressions), 8 variants | x=112 y=1720 w=64 h=48
- Small pink graffiti-style text decal ("A8C") | x=224 y=1704 w=48 h=32
- Rows of small metal lockers w/ number dials, grey, 2 stacked rows of 4 | x=0 y=1656 w=112 h=112

### 20_Japanese_interiors_Shadowless.png
256x512px

- folding screen / tatami wall panel, 3 color variants (red/brown/green trim), 48px apart, facing up | x=80 y=0 w=48 h=48
- hanging paper lantern with kanji text, 2 variants, 16px apart | x=224 y=0 w=32 h=32
- tatami floor tile, 3 variants (plain, corner seam, cross seam) | x=0 y=32 w=80 h=48
- orange cushioned sofa/loveseat, 2 backrest style variants, facing up | x=80 y=48 w=64 h=32
- round paper-lantern floor lamp on wooden tripod stand, white shade | x=144 y=48 w=32 h=48
- ceramic jar/vase, 5 color variants, 16px apart, facing down | x=176 y=48 w=80 h=16
- round stone stool/ottoman, gray | x=16 y=64 w=32 h=32
- small round stone, stacked pair | x=0 y=64 w=16 h=32
- dark navy low dresser/table, facing down | x=0 y=96 w=32 h=32
- small wooden wall shelf, 3 color variants, ~15px apart | x=48 y=64 w=16 h=48
- black round gong/drum, small stand | x=192 y=80 w=32 h=32
- small black stone orb, stacked pair | x=224 y=80 w=16 h=32
- blue/gray sofa, 2 pattern variants (plain / checkered), facing up | x=80 y=80 w=64 h=32
- potted plant, 2 size variants, facing down | x=96 y=112 w=32 h=32
- wall-mounted crank/hook fixture, 3 stacked, 7px apart | x=176 y=88 w=16 h=24
- black round bowl/gong, small | x=240 y=88 w=16 h=16
- large armchair, 3 color variants (plain navy / checkered), facing down | x=32 y=112 w=80 h=32
- low wooden bench, cushioned ends, facing down | x=112 y=112 w=32 h=16
- round black stone mortar bowl | x=192 y=112 w=32 h=16
- small dark round knob decor | x=240 y=112 w=16 h=16
- shoji lattice room-divider screen, wood frame | x=144 y=112 w=48 h=32
- single sliding-door wood divider post | x=112 y=128 w=16 h=32
- small round stone pair | x=0 y=128 w=32 h=16
- small kotatsu/heater box, 2 variants (mesh grille / fire glow), facing down | x=192 y=128 w=32 h=16
- round glass/water jug, pale | x=224 y=128 w=16 h=16
- shoji sliding door screen, wood frame, wide | x=0 y=144 w=112 h=32
- wooden chest of drawers / open storage cabinet, 2 variants (closed / open with contents) | x=128 y=160 w=80 h=32
- high-back armchair, 3 color variants (olive/brown/checkered blue), 2 cushion rows, facing down | x=0 y=176 w=112 h=64
- small locked storage chest | x=160 y=192 w=16 h=16
- tall wooden wardrobe cabinet with drawers | x=112 y=192 w=32 h=48
- floor cushion/pillow, 5 color variants, 16px apart | x=160 y=192 w=80 h=16
- small round bead/orb decor, orange, stacked pair | x=0 y=208 w=16 h=32
- small wooden offering stand | x=16 y=208 w=16 h=16
- woven storage basket/crate, 4 pattern variants, 16px apart | x=176 y=224 w=64 h=16
- narrow floor cushion/mat, 4 color pairs, 32px apart, facing down | x=0 y=240 w=128 h=16
- hanging wall scroll art, 2 pattern variants (red branch / pink blossom), 32px apart | x=128 y=256 w=16 h=64
- gemstone/egg decor, 4 color pairs, small, 2 rows | x=192 y=256 w=32 h=32
- stacked storage chest/dresser unit, multiple color tiers (blue/gold/purple), 2 columns | x=0 y=256 w=128 h=80
- tokonoma alcove wall corner segment, wood beam and tile floor | x=160 y=256 w=32 h=64
- rain-streaked window / sliding glass door, 2 panels | x=224 y=256 w=32 h=48
- bedside drawer chest, 3 color variants (checkered/plain top), 64px apart | x=192 y=288 w=32 h=32
- kotatsu low table with drawer accent, 3 color variants (blue/gold/green), facing down, 48-64px apart | x=224 y=304 w=32 h=48
- wooden chair with cushion, facing pair, 3 color variants, 64px apart | x=192 y=320 w=32 h=16

### 21_Clothing_Store_Shadowless.png
256x1072px

- mannequin bust (head+torso), gray, blank face, 2 identical side-by-side | x=0 y=0 w=32 h=48
- clothing tops/vests, flat-lay top-down, ~28 color/pattern variants across 4 rows x 7 cols, 16px grid | x=32 y=0 w=112 h=64
- knit beanie hat, tan/brown | x=144 y=0 w=16 h=16
- mannequin bust, tan/skin tone, 2 identical side-by-side | x=160 y=0 w=32 h=48
- sunglasses/eyewear icon, 8 color variants, 2 rows of 4, 16px apart | x=200 y=0 w=64 h=32
- newsboy cap, black | x=144 y=32 w=16 h=16
- plaid/checked shirt flat-lay, 4 pattern variants continuing main shirt row | x=32 y=64 w=224 h=16
- knit cap, dark maroon | x=144 y=64 w=16 h=32
- folded shirt/collar top-view icon, ~14 color variants x 5 rows, 16px grid | x=0 y=80 w=256 h=80
- mannequin bust pair, tan, small variant (inset within collar-icon grid) | x=112 y=80 w=32 h=32
- torso mannequin on stand, gray/tan color variants, 6 across, 16-64px grid | x=0 y=165 w=256 h=64
- mannequin head, round sphere, gray/tan/white variants, 6 across | x=0 y=230 w=256 h=32
- cluster of hooded mannequin figures with dark/red/green accessory accents, grouped display | x=0 y=200 w=112 h=48
- dark cap/hood icon, small, 2 stacked | x=0 y=196 w=16 h=32
- shoulder armor/cloak piece, color variants (green-gold, red-gold, blue-white, gray) | x=0 y=240 w=112 h=32
- long robe/dress torso icon, pattern variants (brown-green, checkered, blue) | x=0 y=272 w=48 h=32
- small glass pane/tile icon, pair | x=24 y=280 w=24 h=16
- large glass display window pane, 2 side-by-side | x=48 y=288 w=64 h=32
- stack of folded dark navy clothing, 2 columns | x=0 y=304 w=48 h=32
- wall label/price sign board, dark placard with pixel-icon text, 4 variants, 2x2 grid | x=64 y=320 w=80 h=48
- curtain, vertical-stripe pattern, 3 color variants (blue, green, pink), stacked | x=144 y=250 w=32 h=120
- stacked cardboard/wooden crates with small plant sprigs, multiple stack-height variants | x=176 y=240 w=80 h=140
- folded fabric pile, small, gray | x=176 y=196 w=16 h=24
- tall leaning mirror, gold frame | x=240 y=196 w=16 h=60
- framed character portrait poster, color variants (orange, yellow) | x=160 y=333 w=16 h=96
- tall clothing rack pole with hanging garments | x=0 y=352 w=24 h=29
- standing mirror in wood frame with curtain surround, fitting-room booth, closed | x=0 y=333 w=52 h=96
- round ottoman/stool, 2 color variants (gray, brown) | x=16 y=333 w=32 h=16
- wooden shelf/bench with shoe pairs displayed | x=64 y=397 w=64 h=32
- knit beanie cap, color variants (blue, gray, red) | x=96 y=385 w=48 h=48
- vending machine / cash kiosk, dark with screen | x=144 y=365 w=16 h=64
- changing-room stalls with curtain, occupants visible, 3 booths | x=176 y=389 w=48 h=24
- wooden shelf unit with folded shirts stacked, 2 shelves | x=224 y=349 w=32 h=32
- round gem/orb decoration, 5 color variants (green x2, red, silver, blue), 2 rows | x=176 y=421 w=80 h=56
- plain wooden bench and low table | x=0 y=469 w=48 h=16
- customer NPC sprite, tan/cream outfit, front-facing, repeated 3x per row, 2 rows | x=48 y=429 w=96 h=56
- curtain divider, vertical stripes, open/parted | x=0 y=437 w=48 h=16
- potted flower bouquet in vase on stand, 2 variants | x=0 y=501 w=48 h=16
- wooden desk with laptop and papers, small filing cabinet | x=0 y=517 w=48 h=32
- wooden barrel counter with cash register and flower accent | x=0 y=549 w=48 h=24
- oval standing mirror, wood frame, 2 repeats | x=144 y=429 w=32 h=64
- wicker laundry basket with folded fabric | x=96 y=485 w=48 h=16
- small striped curtain/fabric swatch | x=64 y=485 w=32 h=16
- area rug, brown ornate pattern, 2 sizes | x=176 y=485 w=48 h=40
- wooden dining chair, 2 facing variants | x=224 y=485 w=32 h=40
- round wooden coat rack stand | x=224 y=517 w=32 h=16
- cushioned ottoman/bench on wheels, color variants (red, blue, green), 2 rows | x=112 y=529 w=96 h=44
- decorative totem/lamp pole, colorful stripes | x=96 y=529 w=16 h=44
- small floor lamp | x=80 y=533 w=16 h=16
- framed landscape wall painting | x=208 y=529 w=16 h=20
- framed fish wall art, yellow frame | x=224 y=549 w=32 h=16
- gray waiting-area bench seat, 4-seat row | x=112 y=565 w=64 h=16
- reference customer NPC sprite, brown hair, gray outfit, facing away | x=240 y=589 w=16 h=16
- bald head icon, skin/hair-tone base color variant, one per row, 9 rows | x=0 y=593 w=16 h=260
- hairstyle icon (arch/mohawk shape), ~14 color variants per row x 9 rows, 16px grid | x=16 y=593 w=240 h=260
- animal-ear hood, color variants (pink, green, blue, yellow), ~14 across, 16px apart | x=16 y=858 w=224 h=24
- standing wooden coat rack pole with hook, 3 repeats | x=0 y=882 w=8 h=112
- fox-ear hood, red, 3 variants | x=16 y=882 w=40 h=40
- wooden wardrobe/dresser cabinet, 3 wood-tone variants | x=64 y=882 w=96 h=32
- folded fabric bolt/textile stack, color-paired variants (gray-brown, red-green) | x=160 y=882 w=96 h=48
- glass display counter panel, long, reflective | x=64 y=914 w=64 h=24
- wall coat hook with hanging garment, color variants | x=0 y=946 w=48 h=16
- mannequin torso on stand, color variants (white, tan, gray), front/back poses | x=48 y=946 w=64 h=48
- animal costume character sprite, tiger (orange) and frog (green) | x=112 y=946 w=32 h=16
- folded collar/vest icon, small, color variants (white, blue, green) | x=144 y=946 w=16 h=64
- mannequin head sphere on torso stand, color variants (white, tan, gray), 5 across | x=0 y=1010 w=240 h=62
- small animal head icon, tiger and frog | x=64 y=1010 w=32 h=16

### 22_Museum_Shadowless.png
256x1952px

- Closed ticket booth counter, wood base, glass window, door, "TICKET" sign | x=0 y=0 w=96 h=64
- Open ticket booth counter with papers, register panel, "TICKET" signage | x=112 y=0 w=96 h=96
- Turnstile gate posts, silver pillar with red/green indicator light, 2 stacked variants | x=208 y=0 w=48 h=128
- Ticket booth variant 2, wide gray awning roof with standing support pole | x=0 y=64 w=144 h=64
- Small gray counter table | x=144 y=80 w=32 h=32
- "WIP" yellow-striped construction warning sign plank | x=176 y=80 w=32 h=32
- Colorful control-panel kiosk cart (blue/yellow buttons) | x=144 y=112 w=32 h=32
- Snack-cart/register icon row (register, pretzel cart, cotton-candy cart), 3 variants at 16px spacing | x=176 y=112 w=48 h=32
- Museum info plaque paper, gold-bordered and blue-bordered variants | x=224 y=112 w=32 h=32
- Wooden bench seat, orange-brown wood | x=0 y=144 w=32 h=48
- Tan cushioned bench/ottoman | x=0 y=192 w=32 h=48
- Gray filing-cabinet drawer unit | x=32 y=160 w=32 h=32
- Gray pedestal side table | x=64 y=160 w=32 h=32
- Tall white empty display case (glass) | x=96 y=144 w=32 h=48
- Museum info card/plaque on stand with small artifact | x=0 y=240 w=32 h=48
- Ornate golden urns on museum pedestal, 3 size/angle variants | x=32 y=224 w=96 h=64
- Ornate urns on pedestal — gold, pink/red, blue color variants (row 1) | x=128 y=176 w=96 h=48
- Ornate urns on pedestal — gold, pink, blue variants (row 2) | x=128 y=224 w=96 h=48
- Museum artifact card, gold-crest and blue-crest variants | x=224 y=176 w=32 h=48
- Urns on pedestal, third row — gold, green/patina colorways | x=128 y=272 w=64 h=48
- Small vases without pedestal — blue, pink, gold, green variants, 4 in a row | x=192 y=272 w=64 h=48
- Museum pedestal displays with pink/white, pink, light-blue, gray, green urns, 5 across | x=0 y=304 w=160 h=48
- Blank white display pedestal slabs, 2 variants | x=160 y=304 w=64 h=48
- Queue divider velvet-rope barriers — gold-chain and gray-chain 3-post spans plus standalone posts, repeated 4x | x=0 y=272 w=256 h=32
- Ornate picture frames, empty — small square, small rectangle, large landscape sizes | x=0 y=304 w=256 h=48
- Museum security scanner/metal detector gate, red-light and green-light variants | x=0 y=336 w=64 h=64
- Wall-mounted motion sensor pad (gray dashed square, off state), 2 variants | x=0 y=400 w=64 h=64
- "3 tiles wall→" placement guide label decal (non-sprite reference marker, skip when porting) | x=128 y=400 w=64 h=64
- Glass museum display case, empty | x=0 y=464 w=64 h=64
- Glass museum display case with lit butterfly specimen | x=64 y=464 w=64 h=64
- Rope-barrier chain connector icons (small clip pieces) | x=0 y=528 w=128 h=64
- Ornate gold picture frames — portraits, seascape/wave paintings, landscapes, ~7 cols x 4 rows grid | x=64 y=326 w=192 h=256
- Mona Lisa framed portrait painting | x=192 y=464 w=32 h=64
- Starry-Night-style framed painting | x=224 y=560 w=32 h=48
- Museum glass display pillars (rounded top, translucent), 4 colorways: purple, light blue, blue-gray, gray-white | x=64 y=576 w=128 h=96
- Tall ornate pedestal column, gradient marble finish, 2 variants | x=192 y=560 w=32 h=128
- Wooden info stand with brochure/pamphlet icon, 2 variants | x=224 y=576 w=32 h=64
- Wooden museum display cabinet, glass-front, book/mineral/tool variants, stacked units | x=160 y=576 w=64 h=224
- Large ocean-exhibit glass display case with wave-painting backdrop | x=192 y=608 w=64 h=96
- Butterfly specimen frames — assorted wing colorways, tan mount boards, grid of ~8 | x=0 y=592 w=160 h=192
- Small square butterfly specimen frames (single/paired), assorted colors, grid | x=0 y=656 w=192 h=96
- Loose flying-butterfly sprites, orange/green/blue color variants | x=192 y=672 w=48 h=16
- Potted ivy/vine planter with wooden trellis fence, 2 variants | x=64 y=652 w=192 h=192
- Insect specimen frames (beetles, moths), tan mount boards, 3x2 grid | x=0 y=652 w=96 h=192
- Framed single-beetle specimen card | x=128 y=652 w=64 h=64
- Potted palm/ficus plant, 2 size variants | x=0 y=908 w=64 h=96
- Stone-block wall border enclosure forming pond/exhibit pen, with water pool variant | x=96 y=1032 w=160 h=192
- Small critters — turtle, frog, lily pad, crab, gold fish colorways | x=96 y=1240 w=160 h=64
- Buddha/stone statue, full seated figure, 3 size/pose variants | x=0 y=1256 w=96 h=128
- Stone statue bust-only variant, 3 copies | x=0 y=1384 w=96 h=48
- Stone statue row with colored-gem accents (blue/red/green), on register-counter pedestals | x=128 y=1400 w=128 h=64
- Statue/vendor bust row with small colored accents, 4 variants | x=128 y=1464 w=128 h=64
- Small vase pedestal grid — blue-gray metallic and gold/bronze colorways | x=0 y=1544 w=96 h=64
- Framed skull/fossil display case, edge preview | x=128 y=1560 w=128 h=96
- NPC/statue vendor row at museum checkout counter, mixed figure and gem-icon variants | x=0 y=978 w=256 h=192
- Glass display case with mammoth/tusk fossil exhibit, 2 variants | x=160 y=978 w=96 h=96
- Empty glass museum display case, tall upright, red-tag and no-tag variants | x=0 y=1170 w=256 h=192
- Glass display case with small fossil fragments exhibit | x=160 y=1170 w=96 h=96
- Wide glass display case, empty, with fossil-fragment variant | x=0 y=1362 w=160 h=96
- Bull-skull trophy mount in glass display case | x=192 y=1394 w=64 h=96
- Glass display case with rock/mineral specimens, 3 colorway variants | x=160 y=1266 w=96 h=96
- Blue exhibit signage tiles, small square icon set | x=192 y=1490 w=64 h=64
- Small quadruped fossil skeleton mount on wooden plinth, 3 poses | x=0 y=1554 w=192 h=96
- Wooden bench/pew with cushioned seat | x=192 y=1554 w=64 h=96
- Triceratops skull mount on wooden plinth, 3 angle variants | x=0 y=1304 w=96 h=128
- Full triceratops skeleton mounted on wooden plinth, with baby skeleton variant, 2 poses | x=0 y=1432 w=192 h=112
- Blank wooden display plinth (no mount) | x=192 y=1432 w=64 h=112
- Scenic backdrop painting — forest/tree landscape, 2 copies | x=0 y=1544 w=128 h=112
- Free-standing triceratops skeleton, no plinth, 2 poses | x=192 y=1544 w=64 h=224
- Triceratops skeleton mounted with baby skeleton, backdrop-painting variant | x=0 y=1656 w=128 h=112
- Long-necked sauropod skeleton mount on plinth, 3 poses | x=0 y=1848 w=192 h=104
- Small quadruped fossil skull display case | x=0 y=1758 w=64 h=96
- Velociraptor-type running skeleton mount | x=192 y=1758 w=64 h=96
- Wooden bench/pew row, lavender cushioned seat variants | x=64 y=1758 w=128 h=96
- Rock/mineral specimen wall-mount frames — blue, brown, starry colorways, grid | x=64 y=1854 w=96 h=96
- "SOUVENIRS" hanging shop sign, 3 border-color variants | x=160 y=1854 w=64 h=96
- Direction arrow signage, blue and green "→" icons, multiple copies | x=224 y=1854 w=32 h=96
- Pencil/pen cup with colored pencils | x=224 y=1830 w=32 h=32
- Souvenir rack shelf with hanging postcards/maps, 2 unit variants | x=0 y=1846 w=64 h=96
- Small ceramic mini-vase collectibles — pink, gold, blue, green colorways, grid | x=0 y=1942 w=64 h=10
- Plush dinosaur toy shelf row, 3 copies | x=192 y=1670 w=64 h=192
- Museum info sign/plaque with rhino/mammoth illustration | x=192 y=1918 w=64 h=34
- Small green exit/map icon tile | x=192 y=1878 w=32 h=32
- Rolled souvenir posters/maps in tall storage bin, green and tan variants | x=96 y=1918 w=96 h=34

### 23_Television_and_Film_Studio_Shadowless.png
256x224px

- film camera on tripod, dark grey, variant 1, facing right | x=0 y=0 w=32 h=32
- tripod stand alone (no camera head), dark grey | x=32 y=0 w=16 h=32
- film camera on tripod, narrow head variant | x=48 y=0 w=16 h=32
- film camera on tripod, dark grey, variant (row 2) | x=0 y=32 w=32 h=32
- tripod stand alone, variant 2 (row 2) | x=32 y=32 w=16 h=32
- film camera on tripod, narrow head variant (row 2) | x=48 y=32 w=16 h=32
- boom microphone stand on wheels, with blue light | x=64 y=32 w=16 h=32
- large softbox studio light on tripod, facing right | x=64 y=0 w=48 h=48
- large softbox studio light on tripod, facing left | x=112 y=0 w=48 h=48
- small softbox studio light on tripod, facing right, 2 rows, 32px apart | x=80 y=48 w=32 h=32
- small softbox studio light on tripod, facing left, 2 rows, 32px apart | x=112 y=48 w=32 h=32
- ceiling-mounted light rig bar with 4 hanging spotlights | x=160 y=0 w=96 h=16
- large dark TV/monitor screen, blank | x=160 y=16 w=48 h=32
- small dark monitor screen, blank | x=208 y=16 w=16 h=32
- wide dark monitor/screen panel, blank | x=160 y=48 w=80 h=32
- red trophy/cup on stand | x=224 y=16 w=16 h=32
- green ring/hoop decoration | x=240 y=16 w=16 h=16
- blue ring/hoop decoration | x=240 y=32 w=16 h=16
- green screen backdrop, solid dark green | x=0 y=64 w=48 h=64
- green screen backdrop, textured/gradient with fold lines | x=48 y=64 w=32 h=64
- framed photo, two people (candid selfie-style) | x=144 y=80 w=48 h=32
- framed photo, scenic/landscape (smaller frame) | x=192 y=80 w=32 h=32
- framed photo, person with city street background (large frame) | x=144 y=112 w=48 h=32
- curved backdrop/lighting stand base, 3 color trim variants (blue/red/green), 32px apart, vertical | x=0 y=128 w=48 h=96
- studio control panel/mixing desk with screen and dials, 3 color variants (blue/red/green), 32px apart | x=48 y=128 w=64 h=96
- small clipboard/document icon, 3 color variants (blue/red/green), 32px apart | x=112 y=128 w=16 h=96
- theater curtain, striped, 3 color variants (blue/red/green) x2 each, 16px apart, vertical | x=128 y=128 w=16 h=96

### 24_Ice_Cream_Shop_Shadowless.png
256x272px

- empty glass display case, gray body, 3-tier shelves, no product | x=0 y=0 w=32 h=48
- glass display case with built-in scoop wells, gray body, orange accents | x=32 y=0 w=32 h=48
- ice cream tub freezer, round scoop wells with colorful flavors (pastel pink/mint/cream) | x=0 y=48 w=32 h=48
- ice cream tub freezer, round scoop wells, different flavor colors (orange/tan) | x=32 y=48 w=32 h=48
- small ice cream scoop/cup icon | x=32 y=48 w=16 h=16
- soft-serve cone, red swirl with cherry topping, facing forward | x=48 y=48 w=16 h=32
- double soft-serve cone joined at base forming heart shape, cookie-dough color | x=64 y=48 w=32 h=32
- soft-serve cone, red swirl with cherry topping, mirrored | x=96 y=48 w=16 h=32
- long horizontal support bar/rod with bulbous rounded ends, orange | x=64 y=0 w=64 h=16
- long horizontal support bar/rod with bulbous rounded ends, pink | x=64 y=16 w=64 h=16
- long horizontal support bar/rod with bulbous rounded ends, blue | x=64 y=32 w=64 h=16
- arched-top menu/canopy board, pink with white grid pattern | x=128 y=0 w=32 h=32
- arched-top menu/canopy board, yellow with white grid pattern | x=160 y=0 w=32 h=32
- flat rectangular menu board, pink with white grid pattern | x=128 y=48 w=32 h=16
- flat rectangular menu board, yellow with white grid pattern | x=160 y=48 w=32 h=16
- storefront shutter unit, gray windows over pink striped awning, variant 1 | x=192 y=0 w=48 h=32
- storefront shutter unit, gray windows over pink striped awning, variant 2 | x=192 y=32 w=48 h=48
- vertical kiosk sign post with heart-shaped pretzel/ice-cream logo | x=240 y=0 w=16 h=48
- blue drip/splash effect, 2 variants, ~112px apart | x=224 y=64 w=16 h=16
- wooden barrel/tub, brown, cylindrical, upright | x=0 y=80 w=16 h=32
- small gray stool/end table, 2 identical, 16px apart | x=16 y=96 w=16 h=16
- topping/sauce squeeze bottle, multiple flavor color variants (orange, red, yellow, brown, green, blue), grid arrangement 16px apart | x=0 y=112 w=48 h=64
- folding stool/chair frame, gray metal, cross-brace legs, 2 variants | x=48 y=96 w=32 h=32
- high-top table, X-frame legs, square top, 2-seat arrangement | x=48 y=128 w=32 h=32
- counter trim/signage strip, 3 color variants (orange, blue, pink), stacked 16px apart | x=80 y=80 w=32 h=48
- soda-fountain dispenser machine, twisted barber-pole spouts, gray base, pink drawer front | x=48 y=128 w=32 h=48
- counter cabinet unit, bottle-topped, pink drawer front | x=80 y=128 w=32 h=48
- counter cabinet unit, plain gray top, pink drawer front | x=112 y=128 w=32 h=48
- flavor icon swatch, 10 color/pattern variants (yellow, orange, red, brown, cyan, tan, red-diagonal, green, spotted tan, blue-orange), single column 16px apart | x=144 y=112 w=16 h=160
- shelf display counter with matching product signage, 5 flavor variants per row, repeated across 4 rows, 16px apart | x=160 y=112 w=80 h=160
- checkout counter/shelving unit, gray shelves over pink striped base, wide | x=192 y=80 w=64 h=32
- partial shelf-grid overflow fragment (cropped duplicate of product shelving) | x=240 y=112 w=16 h=160

### 25_Shooting_Range_Shadowless.png
256x80px

- Long table, green felt top, wood legs, 2-segment repeat, top-down | x=0 y=16 w=64 h=32
- Long table, tan wood top, wood legs, 2-segment repeat, top-down | x=0 y=48 w=64 h=32
- Small end table, green felt top, top-down | x=64 y=16 w=16 h=32
- Small end table, tan wood top, top-down | x=64 y=48 w=16 h=32
- Wooden shooting-stall barrier/bench, olive-green seat, top-down | x=80 y=24 w=16 h=16
- Player character sprite, brown hair, facing down (range stance) | x=96 y=24 w=16 h=32
- Paper shooting target, gray concentric rings with red bullseye, hanging on wire pole, 4 identical copies, 16px apart, facing viewer | x=112 y=0 w=64 h=48
- CCTV/security monitor console, dark screen with red indicator dot, 2 near-identical variants, 16px apart | x=0 y=64 w=32 h=16
- Small black control/switch panel, blank screen | x=32 y=64 w=16 h=16
- Blue security camera, ceiling/wall mounted, facing down | x=0 y=68 w=16 h=12
- Vertical metal support pole (left), light gray-blue, full height | x=176 y=0 w=16 h=64
- Vertical metal support pole (right), light gray-blue, full height | x=208 y=0 w=16 h=64
- Automated target carrier unit, gray metal housing, no status light, top of rail | x=176 y=0 w=48 h=16
- Automated target carrier unit, gray metal housing, green status light, mid rail | x=176 y=16 w=48 h=16
- Automated target carrier unit, gray metal housing, red status light, mounted on horizontal crossbar bridging both poles | x=160 y=32 w=64 h=16
- Rail junction/crossbar connector, small gray cross piece | x=192 y=48 w=16 h=16
- Control panel box, dark screen with red dot, base of left pole | x=176 y=64 w=16 h=16
- Control panel box, dark blank screen, base of right pole | x=224 y=64 w=16 h=16

### 26_Condominium_Shadowless.png
256x304px

- Up arrow directional sign | x=64 y=0 w=16 h=16
- Down arrow directional sign | x=80 y=0 w=16 h=16
- Blue-gray wood-slat wall panel/bookshelf run, tileable, tall | x=0 y=0 w=48 h=64
- Cream-tan wood-slat wall panel run, tileable, tall | x=96 y=0 w=48 h=64
- Gold-brown wood-slat wall panel run, tileable, tall | x=144 y=0 w=48 h=64
- Red patterned area rug, tall, vertical weave | x=192 y=0 w=32 h=64
- Red patterned area rug, small, vertical weave | x=232 y=0 w=16 h=64
- Mixed-color short wall-slat panel run (gray/tan/gold segments) | x=0 y=64 w=192 h=32
- Red patterned area rug, medium | x=192 y=64 w=32 h=32
- Blue-gray wood-slat wall panel run, tileable, tall, variant 2 | x=0 y=96 w=48 h=64
- Gold-brown wood-slat wall panel run, tileable, tall, wide, variant 2 | x=96 y=96 w=96 h=64
- Red patterned area rug, tall, variant 2 | x=192 y=96 w=32 h=64
- Square placemat, 3 color variants (beige/tan/dark-brown), ~16px apart vertically | x=204 y=99 w=16 h=16
- Rectangular serving tray, 3 color variants, ~16px apart vertically | x=224 y=99 w=48 h=16
- Blue-gray wood-slat wall panel, edge/broken (partial) variant | x=0 y=160 w=48 h=64
- Tan wood-slat wall panel, edge/broken (partial) variant | x=96 y=160 w=96 h=64
- Red patterned area rug, medium, variant 3 | x=176 y=160 w=32 h=64
- Thin light-gray wood/metal trim strip, horizontal | x=225 y=147 w=32 h=16
- Shelving unit with small drawers, 4 color variants (gray/red/olive-gold/blue-gray), stacked ~32px apart | x=224 y=160 w=32 h=32
- Red patterned area rug, small | x=200 y=200 w=16 h=32
- Interaction prompt icon, blue envelope/note symbol | x=176 y=238 w=16 h=16
- Interaction prompt icon, red target symbol | x=196 y=238 w=16 h=16
- Wooden double-panel closet/wardrobe door, brown, round knobs | x=104 y=224 w=32 h=64
- Small wooden storage crate, 3 color variants, tan/brown, closely spaced | x=48 y=258 w=16 h=16
- Small picture frame, empty, tan/gold rim | x=143 y=258 w=32 h=16
- Small picture frame, empty, teal-green rim | x=143 y=278 w=32 h=16
- Metal clothing rack / open shelf frame, gray, with legs | x=216 y=270 w=40 h=32

### 3_Modern_Office_Shadowless/Modern_Office_Shadowless_16x16.png
256x848px

- beige wood cabinet, narrow single-door | x=0 y=0 w=16 h=48
- beige wood cabinet, wide checkered front | x=16 y=0 w=32 h=48
- beige wood cabinet, narrow, 2 variants side by side | x=48 y=0 w=32 h=48
- beige wood desk/cabinet, wide flat-top (no legs) | x=80 y=0 w=48 h=48
- beige wood cabinet, narrow | x=128 y=0 w=16 h=48
- dark gray metal cabinet, narrow | x=144 y=0 w=16 h=48
- dark gray metal cabinet, wide | x=160 y=0 w=32 h=48
- dark gray metal cabinet, narrow | x=192 y=0 w=16 h=48
- framed abstract art, red/orange geometric on blue mat | x=224 y=0 w=16 h=16
- framed abstract art, blue/orange geometric on tan mat | x=224 y=32 w=16 h=16
- beige wood cabinet, narrow | x=0 y=64 w=16 h=48
- beige wood cabinet, wide | x=16 y=64 w=32 h=48
- beige wood cabinet, narrow | x=48 y=64 w=16 h=48
- lavender/light-purple cabinet, narrow | x=64 y=64 w=16 h=48
- lavender/light-purple cabinet, wide | x=80 y=64 w=32 h=48
- lavender/light-purple cabinet, narrow | x=112 y=64 w=16 h=48
- floor tile swatch, olive/dark checkered pattern | x=160 y=64 w=16 h=32
- floor tile swatch, maroon checkered pattern | x=176 y=64 w=16 h=32
- floor tile swatch, gray checkered pattern | x=192 y=64 w=16 h=32
- floor tile swatch, light gray marble, 2 tiles | x=208 y=64 w=32 h=32
- office chair, dark gray/black, checkered seat pad, 4 variants (executive, headrest) | x=0 y=112 w=64 h=48
- office chair, dark gray/black, side-view slim backrest, 2 variants | x=64 y=112 w=32 h=48
- potted plant, green bushy in gray pot | x=96 y=104 w=16 h=32
- framed award/medal, gold medal on blue ribbon | x=112 y=112 w=16 h=32
- whiteboard/plain wall panel, light lavender | x=128 y=112 w=32 h=24
- wall-mounted sensor/thermostat device, dark gray, 2 variants | x=160 y=104 w=32 h=16
- small wall device, paired (badge reader/access panel), 2 variants | x=160 y=128 w=16 h=16
- desktop PC tower with cables, dark gray/black, 2 color variants | x=200 y=104 w=32 h=32
- desktop PC tower, dark gray, side profile | x=232 y=104 w=16 h=32
- office chair, orange/brown, checkered seat pad, 4 variants (executive, headrest) | x=0 y=160 w=64 h=48
- office chair, orange/brown, side-view slim backrest, 2 variants | x=64 y=160 w=32 h=48
- potted plant, green bushy, color variant | x=96 y=152 w=16 h=32
- framed award/medal, gold medal, 2 color variants | x=112 y=160 w=32 h=32
- wide-screen TV/monitor on stand, silver frame, mounted on cabinet | x=144 y=152 w=48 h=32
- printer/copier device, light gray, flatbed | x=200 y=160 w=32 h=16
- desktop monitor with cable, white/silver, 2 variants | x=232 y=152 w=32 h=32
- framed group photo, colorful (pink/blue portrait illustrations) | x=0 y=192 w=32 h=32
- small framed photo, colorful abstract | x=32 y=192 w=16 h=16
- wall clock, orange/red face, 4 rotation/angle variants | x=48 y=192 w=32 h=32
- small framed certificate, orange | x=80 y=192 w=16 h=16
- potted plant, tall green palm/cactus in gray pot | x=96 y=192 w=16 h=32
- bookshelf/display shelving unit with books and storage boxes | x=112 y=192 w=48 h=48
- whiteboard, mounted, with red line chart | x=160 y=192 w=48 h=32
- server rack / AV equipment stack, light gray units | x=208 y=192 w=32 h=48
- computer monitors, blue screen wallpaper, angled desk arrangement, 6 variants (3x2 grid) | x=240 y=192 w=16 h=48
- whiteboard, mounted, with pie chart and line graph | x=160 y=232 w=48 h=32
- desk lamp, silver/black articulated arm, 3 pose variants | x=208 y=232 w=32 h=48
- water cooler dispenser, light blue bottle on dark stand, 2 variants | x=240 y=232 w=16 h=48
- printer with red control panel, light gray | x=0 y=224 w=16 h=32
- stack of loose/bound papers and documents, gray, several arrangement variants | x=0 y=240 w=48 h=16
- reception/lobby armchair, rounded high-back, 4 color variants (light blue, gray, dark gray, tan) | x=48 y=248 w=64 h=32
- ladder-style bookcase/shelving unit, tall lavender-gray, 4 shelves | x=112 y=248 w=32 h=48
- laptop, silver, open with blue screen, 3 rotation variants | x=208 y=248 w=48 h=32
- sofa/couch, dark gray fabric, 2-seat and L-shaped sectional variants | x=0 y=288 w=80 h=48
- storage/file crate pair (striped front + plain top), tan/gold/orange, 3 color variants stacked | x=80 y=288 w=48 h=96
- desktop printer/scanner unit, gray body with color screen and paper tray, repeated units | x=128 y=288 w=48 h=112
- large storage crate/planter box, tan checkered & orange striped, 2 color variants | x=200 y=288 w=56 h=112
- adjustable desk lamp, silver articulated arm | x=176 y=304 w=16 h=96
- cardboard storage box, tan, 2 size variants | x=64 y=304 w=32 h=16
- small light gray box/pedestal | x=112 y=304 w=16 h=16
- server tower/computer case, gray with buttons | x=0 y=368 w=24 h=32
- vending machine, snacks visible behind glass, red/pink items | x=24 y=368 w=40 h=32
- small dark switch/vending panel | x=72 y=384 w=20 h=16
- reception counter/long conveyor desk, gray horizontal surface on two support posts | x=0 y=416 w=112 h=64
- desktop computer setup (CRT-style monitor, keyboard, mouse), blue screen, gray case, 3 repeated units | x=120 y=416 w=136 h=64
- office desk, plain rectangular, tan and dark-gray color variants | x=112 y=456 w=120 h=40
- office desk, plain rectangular, white/lavender and tan color variants | x=0 y=480 w=156 h=32
- IT support desk assemblage (printer, monitor w/ blue screen, desk phone, seated person figure), 2 side-by-side variants | x=160 y=480 w=96 h=52
- desk phone handset, gray, repeated units | x=204 y=480 w=52 h=52
- L-shaped cubicle desk, tan solid and tan checkered pattern, multiple variants | x=0 y=544 w=128 h=48
- office chair, dark gray and brown/orange, 2 color variants | x=128 y=552 w=24 h=32
- computer monitor on desk stand, blue screen, 3 repeated units | x=152 y=552 w=52 h=40
- wall-mounted security camera/robot device | x=224 y=536 w=32 h=40
- microphone stand, small | x=128 y=580 w=12 h=12
- keycard/badge or small decor icon, 2 color variants | x=224 y=576 w=32 h=16
- cubicle corner-desk (L-shaped) unit, wood/metal, 3 color variants (tan/lavender/olive), repeated in a stacked grid down the sheet | x=0 y=576 w=128 h=272
- desktop electronics cluster: floor lamp, handheld radio devices, black/gray CPU towers, blue-screen all-in-one PC | x=128 y=576 w=128 h=48
- coffee/vending machine station, brown counter, blue dispenser unit, cups, 3 color variants | x=128 y=616 w=128 h=56
- photocopier/printer unit, tall gray with paper tray, repeated instances | x=128 y=656 w=128 h=32
- blue-screen monitor setups, single + dual-monitor variants | x=128 y=704 w=96 h=48
- office chair, black, high-back | x=192 y=704 w=32 h=48
- office chair, orange/brown, high-back | x=224 y=704 w=32 h=48
- all-in-one PC with external monitor | x=224 y=752 w=32 h=48
- backpack, 4 color variants (blue/red/gray/tan), 2x2 grid | x=128 y=768 w=96 h=96
- small gray CPU towers, 2 variants | x=128 y=784 w=64 h=32
- scattered green cash/money pile | x=192 y=784 w=64 h=64

### 1_Room_Builder_Office/Room_Builder_Office_16x16.png
256x224px

- blueprint/schematic room-plan wall layouts (dark navy lines on white), multiple variants | x=0 y=0 w=256 h=80
- grey square-tile floor/carpet swatch, plain grey, 2 shades | x=176 y=48 w=48 h=32
- grey wood-plank floor tile, vertical plank pattern | x=224 y=48 w=32 h=32
- purple/lavender cloud-pattern carpet floor tiles, wall-bordered top edge, 3 variants | x=0 y=80 w=112 h=64
- grey cloud-pattern (marble/stone) carpet floor tiles, wall-bordered top edge, 2 variants | x=0 y=112 w=112 h=64
- grey checkerboard floor tile, small grid pattern, 2 shade variants | x=176 y=80 w=32 h=64
- wood-plank/bamboo floor tile, vertical grain, tan | x=208 y=80 w=48 h=32
- dark khaki/olive checkerboard floor tile | x=208 y=112 w=48 h=32
- tan brick-pattern wall/floor tiles, wall-bordered, 3 variants | x=0 y=160 w=112 h=48
- blue-grey checkerboard floor tile, small grid | x=176 y=144 w=32 h=48
- dark olive/brown checkerboard floor tile, larger grid | x=208 y=144 w=48 h=32
- lavender-white plain carpet/floor tiles, wall-bordered, 2 variants | x=0 y=192 w=112 h=32
- dark maroon/wine checkerboard floor tile, 2 shades | x=176 y=192 w=112 h=32

---

## Maintenance

After hand-porting a sprite from one of these sheets into `game/js/sprites.js`,
add it to the **Ported so far** table above (sheet + coords if still recoverable
+ the `sprites.js` constant/painter name), so this file stays a living record of
what's already spoken for and doesn't send a future session re-porting the same
sprite under a different name.
