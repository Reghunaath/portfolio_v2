/* ─── REGHU.EXE — pixel sprites & procedural painters ───────────────────── */
/* global window */

window.Sprites = (function () {
  /* 16x26 player — generator composite (Body_02 + Outfit_10_05 hoodie recolored
     yellow + Eyes_01 + Hairstyle_08_07 darkened black), idle + 6-frame walk per
     direction (frames are rows 6-31 of the sheets' 16x32 cells) */
  const PAL = {
    a: "#333340",
    b: "#3a3a50",
    c: "#2b2b36",
    d: "#ffcbb0",
    e: "#46465e",
    f: "#444452",
    g: "#f5aa14",
    h: "#f6ae9f",
    i: "#a86f12",
    j: "#ffd45e",
    k: "#d98d13",
    l: "#c95446",
    m: "#f69784",
    n: "#e59a18",
    o: "#674d49",
    p: "#6e4a0c",
  };

  const P_DOWN = [
    [
      "................",
      "................",
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaaaaae.",
      ".baafffaaaaaaab.",
      "eaaaacaaaaaaacae",
      "bacaaccaaaaaccab",
      "bcccaaaaaacaaacb",
      "bcaaaaaaaccaaacb",
      "bcaddddaaddddacb",
      ".bddddddddddddb.",
      ".ehddddddddddhe.",
      ".edddbddddbddde.",
      "..ehdoddddodhe..",
      "..ehmmhhhhmmhe..",
      ".bgeeeeeeeeeege.",
      ".bjgggbggbgggje.",
      "edbjjjpjjpjjjbde",
      "edhbeggggggebhde",
      ".ebbieeeeeeibbe.",
      "...bkkkkkkkkb...",
      "...bkkeeeekkb...",
      "...bllb..bllb...",
      "....bb....bb....",
    ],
    [
      "................",
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaaaaae.",
      ".baafffaaaaaaab.",
      "eaaaacaaaaaaacae",
      "bacaaccaaaaaccab",
      "bcccaaaaaacaaacb",
      "bcaaaaaaaccaaacb",
      "bcaddddaaddddacb",
      ".bddddddddddddb.",
      ".ehddddddddddhe.",
      ".edddbddddbddde.",
      "..ehdoddddodhe..",
      "..ehmmhhhhmmhe..",
      ".bgeeeeeeeeeegb.",
      ".bjjggbggbgggdde",
      ".eddjjpjjpjjjhde",
      ".edheggggggebbe.",
      "..ebieeeeeeib...",
      "...biiiiiiiib...",
      "...bllbeeekkb...",
      "....bb...bllb...",
      "..........bb....",
      "................",
    ],
    [
      "................",
      "................",
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaaaaae.",
      ".baafffaaaaaaab.",
      "eaaaacaaaaaaacae",
      "bacaaccaaaaaccab",
      "bcccaaaaaacaaacb",
      "bcaaaaaaaccaaacb",
      "bcaddddaaddddacb",
      ".bddddddddddddb.",
      ".ehddddddddddhe.",
      ".edddbddddbddde.",
      "..ehdoddddodhe..",
      "..ehmmhhhhmmhee.",
      ".bgeeeeeeeeeebde",
      ".bggggbggbggghde",
      ".bgjjgpjjpjggbe.",
      ".bjddggggggeb...",
      "..edheeeeeeib...",
      "...ebiiiikkb....",
      ".....bbeekkb....",
      "........bllb....",
      ".........bb.....",
    ],
    [
      "................",
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaaaaae.",
      ".baafffaaaaaaab.",
      "eaaaacaaaaaaacae",
      "bacaaccaaaaaccab",
      "bcccaaaaaacaaacb",
      "bcaaaaaaaccaaacb",
      "bcaddddaaddddacb",
      ".bddddddddddddb.",
      ".ehddddddddddhe.",
      ".edddbddddbddde.",
      "..ehdoddddodhe..",
      "..ehmmhhhhmmhe..",
      ".bgeeeeeeeeeegb.",
      ".bjjggbggbggggb.",
      ".bjddjpjjpjjgdde",
      ".egdhggggggebhde",
      "..eeieeeeeeibbe.",
      "...biiiiiiiib...",
      "...bllbeeekkb...",
      "....bb...bllb...",
      "..........bb....",
      "................",
    ],
    [
      "................",
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaaaaae.",
      ".baafffaaaaaaab.",
      "eaaaacaaaaaaacae",
      "bacaaccaaaaaccab",
      "bcccaaaaaacaaacb",
      "bcaaaaaaaccaaacb",
      "bcaddddaaddddacb",
      ".bddddddddddddb.",
      ".ehddddddddddhe.",
      ".edddbddddbddde.",
      "..ehdoddddodhe..",
      "..ehmmhhhhmmhe..",
      ".bgeeeeeeeeeegb.",
      "eddgggbggbggjjb.",
      "edhjjjpjjpjjdde.",
      ".ebbeggggggehde.",
      "...bieeeeeeibe..",
      "...biiiiiiiib...",
      "...bkkeeebllb...",
      "...bllb...bb....",
      "....bb..........",
      "................",
    ],
    [
      "................",
      "................",
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaaaaae.",
      ".baafffaaaaaaab.",
      "eaaaacaaaaaaacae",
      "bacaaccaaaaaccab",
      "bcccaaaaaacaaacb",
      "bcaaaaaaaccaaacb",
      "bcaddddaaddddacb",
      ".bddddddddddddb.",
      ".ehddddddddddhe.",
      ".edddbddddbddde.",
      "..ehdoddddodhe..",
      ".eehmmhhhhmmhe..",
      "edbeeeeeeeeeegb.",
      "edhgggbggbggggb.",
      ".ebggjpjjpgjjgb.",
      "...beggggggddjb.",
      "...bieeeeeehde..",
      "....bkkiiiibe...",
      "....bkkeebb.....",
      "....bllb........",
      ".....bb.........",
    ],
    [
      "................",
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaaaaae.",
      ".baafffaaaaaaab.",
      "eaaaacaaaaaaacae",
      "bacaaccaaaaaccab",
      "bcccaaaaaacaaacb",
      "bcaaaaaaaccaaacb",
      "bcaddddaaddddacb",
      ".bddddddddddddb.",
      ".ehddddddddddhe.",
      ".edddbddddbddde.",
      "..ehdoddddodhe..",
      "..ehmmhhhhmmhe..",
      ".bgeeeeeeeeeegb.",
      ".bggggbggbggjjb.",
      "eddgjjpjjpjddjb.",
      "edhbegggggghdge.",
      ".ebbieeeeeeiee..",
      "...biiiiiiiib...",
      "...bkkeeebllb...",
      "...bllb...bb....",
      "....bb..........",
      "................",
    ],
  ];
  const P_UP = [
    [
      "................",
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaacaae.",
      ".baacafaaaccaab.",
      "eaaaccaaaaaaaaae",
      "baaaaaaaaaaaaaab",
      "bcaaaaaaaaaaaacb",
      "bcaaaaaaacaaaacb",
      "bccaaaaaccaaaccb",
      ".bcccaaaaaacccb.",
      ".bccccccccccccb.",
      ".bccccccccccccb.",
      "..bccccccccccb..",
      "...bccccccccb...",
      "..bgbbbbbbbbgb..",
      ".bgpggnnnnggpge.",
      ".bggebggggbegge.",
      "bdbbjjbbbbjjbbde",
      "bdhbeggggggebhde",
      ".bbbieeeeeeibbb.",
      "...biiiiiiiib...",
      "...bkkeeeekkb...",
      "...bllb..bllb...",
      "....bb....bb....",
    ],
    [
      "................",
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaacaae.",
      ".baacafaaaccaab.",
      "eaaaccaaaaaaaaae",
      "baaaaaaaaaaaaaab",
      "bcaaaaaaaaaaaacb",
      "bcaaaaaaacaaaacb",
      "bccaaaaaccaaaccb",
      ".bcccaaaaaacccb.",
      ".bccccccccccccb.",
      ".bccccccccccccb.",
      "..bccccccccccb..",
      "...bccccccccb...",
      "..bgbbbbbbbbgb..",
      ".bgpggnnnnggpge.",
      "bdbgebggggbegge.",
      "bdhbjjbbbbjjbe..",
      ".bbbeggggggeb...",
      "...bieeeeeeib...",
      "...biiiiiiiib...",
      "...bkkeeeekkb...",
      "....bbb..bllb...",
      "..........bb....",
    ],
    [
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaacaae.",
      ".baacafaaaccaab.",
      "eaaaccaaaaaaaaae",
      "baaaaaaaaaaaaaab",
      "bcaaaaaaaaaaaacb",
      "bcaaaaaaacaaaacb",
      "bccaaaaaccaaaccb",
      ".bcccaaaaaacccb.",
      ".bccccccccccccb.",
      ".bccccccccccccb.",
      "..bccccccccccbe.",
      "...bccccccccbhde",
      "..bgbbbbbbbbgbhe",
      ".bgpggnnnnggpge.",
      "bdbgebggggbegge.",
      "bdhbjjbbbbjjee..",
      ".bbbeggggggeb...",
      "...bieeeeeeib...",
      "...biiiiiiiib...",
      "....bbeeeekkb...",
      ".........bllb...",
      ".........bllb...",
      "..........bb....",
    ],
    [
      "................",
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaacaae.",
      ".baacafaaaccaab.",
      "eaaaccaaaaaaaaae",
      "baaaaaaaaaaaaaab",
      "bcaaaaaaaaaaaacb",
      "bcaaaaaaacaaaacb",
      "bccaaaaaccaaaccb",
      ".bcccaaaaaacccb.",
      ".bccccccccccccb.",
      ".bccccccccccccb.",
      "..bccccccccccb..",
      "...bccccccccb...",
      "..bgbbbbbbbbgb..",
      ".bgpggnnnnggpge.",
      ".bggebggggbegge.",
      "bdbbjjbbbbjjbe..",
      "bdhbeggggggeb...",
      ".bbbieeeeeeib...",
      "...biiiiiiiib...",
      "...bkkeeeekkb...",
      "....bbb..bllb...",
      "..........bb....",
    ],
    [
      "................",
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaacaae.",
      ".baacafaaaccaab.",
      "eaaaccaaaaaaaaae",
      "baaaaaaaaaaaaaab",
      "bcaaaaaaaaaaaacb",
      "bcaaaaaaacaaaacb",
      "bccaaaaaccaaaccb",
      ".bcccaaaaaacccb.",
      ".bccccccccccccb.",
      ".bccccccccccccb.",
      "..bccccccccccb..",
      "...bccccccccb...",
      "..bgbbbbbbbbgb..",
      ".egpggnnnnggpgb.",
      ".eggebggggbegbdb",
      "..ebjjbbbbjjbhdb",
      "...beggggggebbb.",
      "...bieeeeeeib...",
      "...biiiiiiiib...",
      "...bkkeeeekkb...",
      "...bllb..bbb....",
      "....bb..........",
    ],
    [
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaacaae.",
      ".baacafaaaccaab.",
      "eaaaccaaaaaaaaae",
      "baaaaaaaaaaaaaab",
      "bcaaaaaaaaaaaacb",
      "bcaaaaaaacaaaacb",
      "bccaaaaaccaaaccb",
      ".bcccaaaaaacccb.",
      ".bccccccccccccb.",
      ".bccccccccccccb.",
      ".ebccccccccccb..",
      "edhbccccccccb...",
      "ehbgbbbbbbbbgb..",
      ".egpggnnnnggpgb.",
      ".eggebggggbegbdb",
      "..eejjbbbbjjbhdb",
      "...beggggggebbb.",
      "...bieeeeeeib...",
      "...biiiiiiiib...",
      "...bkkeeeebb....",
      "...bllb.........",
      "...bllb.........",
      "....bb..........",
    ],
    [
      "................",
      "................",
      "....eebbbbbe....",
      "..ebffffffaabe..",
      ".eaffffffaacaae.",
      ".baacafaaaccaab.",
      "eaaaccaaaaaaaaae",
      "baaaaaaaaaaaaaab",
      "bcaaaaaaaaaaaacb",
      "bcaaaaaaacaaaacb",
      "bccaaaaaccaaaccb",
      ".bcccaaaaaacccb.",
      ".bccccccccccccb.",
      ".bccccccccccccb.",
      "..bccccccccccb..",
      "...bccccccccb...",
      "..bgbbbbbbbbgb..",
      ".egpggnnnnggpgb.",
      ".eggebggggbeggb.",
      "..ebjjbbbbjjbbdb",
      "...beggggggebhdb",
      "...bieeeeeeibbb.",
      "...biiiiiiiib...",
      "...bkkeeeekkb...",
      "...bllb..bbb....",
      "....bb..........",
    ],
  ];
  const P_RIGHT = [
    [
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "..bbaaafffffb...",
      ".bcaaaafffffab..",
      ".bacaaaafffaab..",
      "baaccaaaaaaaacb.",
      "bcaaaaacaaaaccb.",
      "bcaaaaaccaaaaab.",
      "bccaaaaaaaaaaab.",
      "bccaaaaadddddab.",
      "bcccccddddddde..",
      "bcccccddddddde..",
      ".bccchdddddbde..",
      "..bcchhddddodb..",
      "...bhhdddhmmb...",
      "...ebbbbbeee....",
      "...bngbggegb....",
      "...bnbbjjejb....",
      "...ebgeddejb....",
      "....bgehdejb....",
      ".....bbeeib.....",
      ".....bikkkb.....",
      ".....blllb......",
      "......bbb.......",
    ],
    [
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "..bbaaafffffb...",
      ".bcaaaafffffab..",
      ".bacaaaafffaab..",
      "baaccaaaaaaaacb.",
      "bcaaaaacaaaaccb.",
      "bcaaaaaccaaaaab.",
      "bccaaaaaaaaaaab.",
      "bccaaaaadddddab.",
      "bcccccddddddde..",
      "bcccccddddddde..",
      ".bccchdddddbde..",
      "..bcchhddddodb..",
      "...bhhdddhmmb...",
      "...ebbbbbeee....",
      "...bngbggegbe...",
      "...bnbgjejjbde..",
      "...ebeddejjbhe..",
      "....behdejjbe...",
      "....ebeeikkib...",
      ".....eiiikkklb..",
      ".....beeeekllb..",
      "..........ebb...",
    ],
    [
      "................",
      "................",
      "....bbbbbbbb....",
      "..bbaaafffffb...",
      ".bcaaaafffffab..",
      ".bacaaaafffaab..",
      "baaccaaaaaaaacb.",
      "bcaaaaacaaaaccb.",
      "bcaaaaaccaaaaab.",
      "bccaaaaaaaaaaab.",
      "bccaaaaadddddab.",
      "bcccccddddddde..",
      "bcccccddddddde..",
      ".bccchdddddbde..",
      "..bcchhddddodb..",
      "...bhhdddhmmb...",
      "...ebbbbbeeee...",
      "...bngbggegbde..",
      "...bnbgjejjbhe..",
      "...ebeddejjbe...",
      "....behdejjbb...",
      "...blbeekkkkib..",
      "...bliiiikkkklb.",
      "....bbeeeeeillb.",
      "...........ebb..",
      "................",
    ],
    [
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "..bbaaafffffb...",
      ".bcaaaafffffab..",
      ".bacaaaafffaab..",
      "baaccaaaaaaaacb.",
      "bcaaaaacaaaaccb.",
      "bcaaaaaccaaaaab.",
      "bccaaaaaaaaaaab.",
      "bccaaaaadddddab.",
      "bcccccddddddde..",
      "bcccccddddddde..",
      ".bccchdddddbde..",
      "..bcchhddddodb..",
      "...bhhdddhmmb...",
      "...ebbbbbeee....",
      "...bngbggegb....",
      "...bnbbjjejb....",
      "...ebgeddejb....",
      "....bgehdejb....",
      ".....bbeeib.....",
      ".....bikkkb.....",
      ".....blllb......",
      "......bbb.......",
    ],
    [
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "..bbaaafffffb...",
      ".bcaaaafffffab..",
      ".bacaaaafffaab..",
      "baaccaaaaaaaacb.",
      "bcaaaaacaaaaccb.",
      "bcaaaaaccaaaaab.",
      "bccaaaaaaaaaaab.",
      "bccaaaaadddddab.",
      "bcccccddddddde..",
      "bcccccddddddde..",
      ".bccchdddddbde..",
      "..bcchhddddodb..",
      "...bhhdddhmmb...",
      "...ebbbbbeee....",
      "...bngbggegb....",
      "...bnbbjedde....",
      "...ebgbgehde....",
      "....bggbbeebe...",
      "....bbeekkkklb..",
      "...eliikkkkllb..",
      "...blleeeebbb...",
      "....bb..........",
    ],
    [
      "................",
      "................",
      "....bbbbbbbb....",
      "..bbaaafffffb...",
      ".bcaaaafffffab..",
      ".bacaaaafffaab..",
      "baaccaaaaaaaacb.",
      "bcaaaaacaaaaccb.",
      "bcaaaaaccaaaaab.",
      "bccaaaaaaaaaaab.",
      "bccaaaaadddddab.",
      "bcccccddddddde..",
      "bcccccddddddde..",
      ".bccchdddddbde..",
      "..bcchhddddodb..",
      "...bhhdddhmmb...",
      "...ebbbbbeee....",
      "...bngbggegb....",
      "...bnbbjedde....",
      "...ebgbgehde....",
      "...ebggbbeeb....",
      "..elibeeiiiib...",
      "..bllkkkkiiilb..",
      "...bbbeeeebllb..",
      "...........bb...",
      "................",
    ],
    [
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "..bbaaafffffb...",
      ".bcaaaafffffab..",
      ".bacaaaafffaab..",
      "baaccaaaaaaaacb.",
      "bcaaaaacaaaaccb.",
      "bcaaaaaccaaaaab.",
      "bccaaaaaaaaaaab.",
      "bccaaaaadddddab.",
      "bcccccddddddde..",
      "bcccccddddddde..",
      ".bccchdddddbde..",
      "..bcchhddddodb..",
      "...bhhdddhmmb...",
      "...ebbbbbeee....",
      "...bngbggegb....",
      "...bnbbjjejb....",
      "...ebgeddejb....",
      "....bgehdejb....",
      ".....bbeeib.....",
      ".....bikkkb.....",
      ".....blllb......",
      "......bbb.......",
    ],
  ];
  const P_LEFT = [
    [
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "...bfffffaaabb..",
      "..bafffffaaaacb.",
      "..baafffaaaacab.",
      ".bcaaaaaaaaccaab",
      ".bccaaaacaaaaacb",
      ".baaaaaccaaaaacb",
      ".baaaaaaaaaaaccb",
      ".badddddaaaaaccb",
      "..edddddddcccccb",
      "..edddddddcccccb",
      "..edbdddddhcccb.",
      "..bdoddddhhccb..",
      "...bmmhdddhhb...",
      "....eeebbbbbe...",
      "....bgeggbgnb...",
      "....bjejjbbnb...",
      "....bjeddegbe...",
      "....bjedhegb....",
      ".....bieebb.....",
      ".....bkkkib.....",
      "......blllb.....",
      ".......bbb......",
    ],
    [
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "...bfffffaaabb..",
      "..bafffffaaaacb.",
      "..baafffaaaacab.",
      ".bcaaaaaaaaccaab",
      ".bccaaaacaaaaacb",
      ".baaaaaccaaaaacb",
      ".baaaaaaaaaaaccb",
      ".badddddaaaaaccb",
      "..edddddddcccccb",
      "..edddddddcccccb",
      "..edbdddddhcccb.",
      "..bdoddddhhccb..",
      "...bmmhdddhhb...",
      "....eeebbbbbe...",
      "...ebgeggbgnb...",
      "..edbjjejgbnb...",
      "..ehbjjeddebe...",
      "...ebjjedheb....",
      "...bikkieebe....",
      "..blkkkiiie.....",
      "..bllkeeeeb.....",
      "...bbe..........",
    ],
    [
      "................",
      "................",
      "....bbbbbbbb....",
      "...bfffffaaabb..",
      "..bafffffaaaacb.",
      "..baafffaaaacab.",
      ".bcaaaaaaaaccaab",
      ".bccaaaacaaaaacb",
      ".baaaaaccaaaaacb",
      ".baaaaaaaaaaaccb",
      ".badddddaaaaaccb",
      "..edddddddcccccb",
      "..edddddddcccccb",
      "..edbdddddhcccb.",
      "..bdoddddhhccb..",
      "...bmmhdddhhb...",
      "...eeeebbbbbe...",
      "..edbgeggbgnb...",
      "..ehbjjejgbnb...",
      "...ebjjeddebe...",
      "...bbjjedheb....",
      "..bikkkkeeblb...",
      ".blkkkkiiiilb...",
      ".bllieeeeebb....",
      "..bbe...........",
      "................",
    ],
    [
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "...bfffffaaabb..",
      "..bafffffaaaacb.",
      "..baafffaaaacab.",
      ".bcaaaaaaaaccaab",
      ".bccaaaacaaaaacb",
      ".baaaaaccaaaaacb",
      ".baaaaaaaaaaaccb",
      ".badddddaaaaaccb",
      "..edddddddcccccb",
      "..edddddddcccccb",
      "..edbdddddhcccb.",
      "..bdoddddhhccb..",
      "...bmmhdddhhb...",
      "....eeebbbbbe...",
      "....bgeggbgnb...",
      "....bjejjbbnb...",
      "....bjeddegbe...",
      "....bjedhegb....",
      ".....bieebb.....",
      ".....bkkkib.....",
      "......blllb.....",
      ".......bbb......",
    ],
    [
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "...bfffffaaabb..",
      "..bafffffaaaacb.",
      "..baafffaaaacab.",
      ".bcaaaaaaaaccaab",
      ".bccaaaacaaaaacb",
      ".baaaaaccaaaaacb",
      ".baaaaaaaaaaaccb",
      ".badddddaaaaaccb",
      "..edddddddcccccb",
      "..edddddddcccccb",
      "..edbdddddhcccb.",
      "..bdoddddhhccb..",
      "...bmmhdddhhb...",
      "....eeebbbbbe...",
      "....bgeggbgnb...",
      "....eddejbbnb...",
      "....edhegbgbe...",
      "...ebeebbggb....",
      "..blkkkkeebb....",
      "..bllkkkkiile...",
      "...bbbeeeellb...",
      "..........bb....",
    ],
    [
      "................",
      "................",
      "....bbbbbbbb....",
      "...bfffffaaabb..",
      "..bafffffaaaacb.",
      "..baafffaaaacab.",
      ".bcaaaaaaaaccaab",
      ".bccaaaacaaaaacb",
      ".baaaaaccaaaaacb",
      ".baaaaaaaaaaaccb",
      ".badddddaaaaaccb",
      "..edddddddcccccb",
      "..edddddddcccccb",
      "..edbdddddhcccb.",
      "..bdoddddhhccb..",
      "...bmmhdddhhb...",
      "....eeebbbbbe...",
      "....bgeggbgnb...",
      "....eddejbbnb...",
      "....edhegbgbe...",
      "....beebbggbe...",
      "...biiiieebile..",
      "..bliiikkkkllb..",
      "..bllbeeeebbb...",
      "...bb...........",
      "................",
    ],
    [
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "...bfffffaaabb..",
      "..bafffffaaaacb.",
      "..baafffaaaacab.",
      ".bcaaaaaaaaccaab",
      ".bccaaaacaaaaacb",
      ".baaaaaccaaaaacb",
      ".baaaaaaaaaaaccb",
      ".badddddaaaaaccb",
      "..edddddddcccccb",
      "..edddddddcccccb",
      "..edbdddddhcccb.",
      "..bdoddddhhccb..",
      "...bmmhdddhhb...",
      "....eeebbbbbe...",
      "....bgeggbgnb...",
      "....bjejjbbnb...",
      "....bjeddegbe...",
      "....bjedhegb....",
      ".....bieebb.....",
      ".....bkkkib.....",
      "......blllb.....",
      ".......bbb......",
    ],
  ];

  /* frames[0] = standing, frames[1..6] = walk cycle (native left frames — no flip) */
  const PLAYER_FRAMES = {
    down: P_DOWN,
    up: P_UP,
    right: P_RIGHT,
    left: P_LEFT,
  };

  /* seated back view for the desk stools — the pack's sit animations are
     side-facing only (see the pack's Spritesheet_animations_GUIDE), so for
     up-facing desks we derive one: the standing up-frame lowered 3px onto the
     seat, legs tucked behind the stool */
  const PLAYER_SIT_UP = [
    "................",
    "................",
    "................",
  ].concat(P_UP[0].slice(0, 23));

  /* 28x15 lounging gray cat, ported from the pack's animated_cat.png
     (12-frame tail-sweep loop, 48x16 per frame, trimmed to the union bbox).
     The pack bakes an opaque warm-gray floor shadow ('e') tuned to its light
     wood floors — remapped to translucent black so it sits on any carpet. */
  const CAT_FRAMES = [
    [
      ".................aaa........",
      ".................afba.......",
      ".................dfcdad.....",
      "..........dadadadadbcccdadaa",
      ".......dadcccccccdbcbcbcbcbd",
      "......acccbcbcbcbacbcbbbbfga",
      ".....dcbbbgfcbcbcaddbcbbfga.",
      "....dcbfddccbffcbafbcbddade.",
      "...dcbadfccbgbgbcbaggfbbade.",
      "...dba.dcccdffdbbcbaaaaafae.",
      "...dfa.afcaeddagfcadgffbbae.",
      "...dfa.eaaeeeeeagbcadbbbae..",
      "....a..eeeeeeeeeabbadccaee..",
      "................eaaaedaee...",
      ".................eeeeeee....",
    ],
    [
      ".................aaa........",
      ".................afba.......",
      ".................dfcdad.....",
      "..........dadadadadbcccdadaa",
      "......adadcccccccdbcbcbcbcbd",
      ".....dccccbcbcbcbacbcbbbbfga",
      "..dddcbbbbgfcbcbcaddbcbbfga.",
      ".dffbbafddccbffcbafbcbddade.",
      "..aaaa.dfccbgbgbcbaggfbbade.",
      ".......dcccdffdbbcbaaaaafae.",
      ".......afcaeddagfcadgffbbae.",
      ".......eaaeeeeeagbcadbbbae..",
      ".......eeeeeeeeeabbadccaee..",
      "................eaaaedaee...",
      ".................eeeeeee....",
    ],
    [
      ".................aaa........",
      ".................afba.......",
      ".................dfcdad.....",
      "..........dadadadadbcccdadaa",
      ".dddddddadcccccccdbcbcbcbcbd",
      "dbbcccccccbcbcbcbacbcbbbbfga",
      ".aaabbbbbbgfcbcbcaddbcbbfga.",
      "....aaafddccbffcbafbcbddade.",
      ".......dfccbgbgbcbaggfbbade.",
      ".......dcccdffdbbcbaaaaafae.",
      ".......afcaeddagfcadgffbbae.",
      ".......eaaeeeeeagbcadbbbae..",
      ".......eeeeeeeeeabbadccaee..",
      "................eaaaedaee...",
      ".................eeeeeee....",
    ],
    [
      ".................aaa........",
      ".................afba.......",
      ".................dfcdad.....",
      "..dddd...ddadadadadbcccdadaa",
      ".abbccddaccccccccdbcbcbcbcbd",
      "..aabbccccbcbcbcbacbcbbbbfga",
      "....aabbbbgfcbcbcaddbcbbfga.",
      "......afddccbffcbafbcbddade.",
      ".......dfccbgbgbcbaggfbbade.",
      ".......dcccdffdbbcbaaaaafae.",
      ".......afcaeddagfcadgffbbae.",
      ".......eaaeeeeeagbcadbbbae..",
      ".......eeeeeeeeeabbadccaee..",
      "................eaaaedaee...",
      ".................eeeeeee....",
    ],
    [
      "..a..............aaa........",
      ".afa.............afba.......",
      ".abfa............dfcdad.....",
      "..dba..aaadadadadadbcccdadaa",
      "..abbaaccccccccccdbcbcbcbcbd",
      "...abbccccbcbcbcbacbcbbbbfga",
      "....abbbbbgfcbcbcaddbcbbfga.",
      ".....aafddccbffcbafbcbddade.",
      ".......dfccbgbgbcbaggfbbade.",
      ".......dcccdffdbbcbaaaaafae.",
      ".......afcaeddagfcadgffbbae.",
      ".......eaaeeeeeagbcadbbbae..",
      ".......eeeeeeeeeabbadccaee..",
      "................eaaaedaee...",
      ".................eeeeeee....",
    ],
    [
      ".................aaa........",
      ".................afba.......",
      ".................dfcdad.....",
      "..dddd...ddadadadadbcccdadaa",
      ".abbccddaccccccccdbcbcbcbcbd",
      "..aabbccccbcbcbcbacbcbbbbfga",
      "....aabbbbgfcbcbcaddbcbbfga.",
      "......afddccbffcbafbcbddade.",
      ".......dfccbgbgbcbaggfbbade.",
      ".......dcccdffdbbcbaaaaafae.",
      ".......afcaeddagfcadgffbbae.",
      ".......eaaeeeeeagbcadbbbae..",
      ".......eeeeeeeeeabbadccaee..",
      "................eaaaedaee...",
      ".................eeeeeee....",
    ],
    [
      ".................aaa........",
      ".................afba.......",
      ".................dfcdad.....",
      "..........dadadadadbcccdadaa",
      ".....dadadcccccccdbcbcbcbcbd",
      "..dddcccccbcbcbcbacbcbbbbfga",
      ".dffbbbbbbgfcbcbcaddbcbbfga.",
      "..aaaaafddccbffcbafbcbddade.",
      ".......dfccbgbgbcbaggfbbade.",
      ".......dcccdffdbbcbaaaaafae.",
      ".......afcaeddagfcadgffbbae.",
      ".......eaaeeeeeagbcadbbbae..",
      ".......eeeeeeeeeabbadccaee..",
      "................eaaaedaee...",
      ".................eeeeeee....",
    ],
    [
      ".................aaa........",
      ".................afba.......",
      ".................dfcdad.....",
      "..........dadadadadbcccdadaa",
      ".......dadcccccccdbcbcbcbcbd",
      "......acccbcbcbcbacbcbbbbfga",
      ".....dcbbbgfcbcbcaddbcbbfga.",
      "....dcbfddccbffcbafbcbddade.",
      "...dcbadfccbgbgbcbaggfbbade.",
      "...dba.dcccdffdbbcbaaaaafae.",
      "..dffa.afcaeddagfcadgffbbae.",
      "...aa..eaaeeeeeagbcadbbbae..",
      ".......eeeeeeeeeabbadccaee..",
      "................eaaaedaee...",
      ".................eeeeeee....",
    ],
    [
      ".................aaa........",
      ".................afba.......",
      ".................dfcdad.....",
      "..........dadadadadbcccdadaa",
      ".......dadcccccccdbcbcbcbcbd",
      "......acccbcbcbcbacbcbbbbfga",
      ".....dcbbbgfcbcbcaddbcbbfga.",
      "....dcbfddccbffcbafbcbddade.",
      "...dcbadfccbgbgbcbaggfbbade.",
      "...dba.dcccdffdbbcbaaaaafae.",
      "...dfa.afcaeddagfcadgffbbae.",
      "...dfa.eaaeeeeeagbcadbbbae..",
      "....a..eeeeeeeeeabbadccaee..",
      "................eaaaedaee...",
      ".................eeeeeee....",
    ],
    [
      ".................aaa........",
      ".................afba.......",
      ".................dfcdad.....",
      "..........dadadadadbcccdadaa",
      ".......dadcccccccdbcbcbcbcbd",
      "......acccbcbcbcbacbcbbbbfga",
      ".....dcbbbgfcbcbcaddbcbbfga.",
      "....dcbfddccbffcbafbcbddade.",
      "...dcbadfccbgbgbcbaggfbbade.",
      "...dba.dcccdffdbbcbaaaaafae.",
      "...dfa.afcaeddagfcadgffbbae.",
      "...dfa.eaaeeeeeagbcadbbbae..",
      "....a..eeeeeeeeeabbadccaee..",
      "................eaaaedaee...",
      ".................eeeeeee....",
    ],
    [
      ".................aaa........",
      ".................afba.......",
      ".................dfcdad.....",
      "..........dadadadadbcccdadaa",
      ".......dadcccccccdbcbcbcbcbd",
      "......acccbcbcbcbacbcbbbbfga",
      ".....dcbbbgfcbcbcaddbcbbfga.",
      "....dcbfddccbffcbafbcbddade.",
      "...dcbadfccbgbgbcbaggfbbade.",
      "...dba.dcccdffdbbcbaaaaafae.",
      "...dfa.afcaeddagfcadgffbbae.",
      "...dfa.eaaeeeeeagbcadbbbae..",
      "....a..eeeeeeeeeabbadccaee..",
      "................eaaaedaee...",
      ".................eeeeeee....",
    ],
    [
      ".................aaa........",
      ".................afba.......",
      ".................dfcdad.....",
      "..........dadadadadbcccdadaa",
      ".......dadcccccccdbcbcbcbcbd",
      "......acccbcbcbcbacbcbbbbfga",
      ".....dcbbbgfcbcbcaddbcbbfga.",
      "....dcbfddccbffcbafbcbddade.",
      "...dcbadfccbgbgbcbaggfbbade.",
      "...dba.dcccdffdbbcbaaaaafae.",
      "...dfa.afcaeddagfcadgffbbae.",
      "...dfa.eaaeeeeeagbcadbbbae..",
      "....a..eeeeeeeeeabbadccaee..",
      "................eaaaedaee...",
      ".................eeeeeee....",
    ],
  ];
  const PAL_CAT = {
    a: "#3a3a50",
    b: "#8b8bab",
    c: "#9da3b7",
    d: "#46465e",
    e: "rgba(0,0,0,0.22)",
    f: "#6c6e85",
    g: "#565972",
  };

  /* 16x26 lobby receptionist — generator composite (Body_02 + Outfit_06_01
     navy suit + Eyes_01 + Hairstyle_01_01), 6-frame down idle */
  const PAL_RECEPTIONIST = {
    a: "#ffcbb0",
    b: "#46465e",
    c: "#3a3a50",
    d: "#ab6736",
    e: "#cc9659",
    f: "#b37b3f",
    g: "#6c6e85",
    h: "#565972",
    i: "#f6ae9f",
    j: "#f69784",
    k: "#d8d0e0",
    l: "#d93232",
    m: "#a82b2d",
    n: "#674d49",
    o: "#d3a38d",
    p: "#6c5981",
  };
  const RECEPTIONIST_FRAMES = [
    [
      "................",
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "...heeeeeefdb...",
      "..heeeeeeffedb..",
      "..bfddddddfdfb..",
      ".beddededfdefdb.",
      ".cedfffffffdfdc.",
      ".cddeaaaaaaefdc.",
      ".cdfaaaaaaaafdc.",
      ".cdaaaaaaaaaadc.",
      ".biaaaaaaaaaaib.",
      ".baaacaaaacaaab.",
      "..bianaaaanaib..",
      "..bijjiiiijjib..",
      ".chbbbbbbbbbbhb.",
      ".cghchkllkhchgb.",
      "bacgbgbmmbgbgcab",
      "baichbbbbbbhciab",
      ".bccgggbhgggccb.",
      "...chhcccchhc...",
      "...ccchbbhccc...",
      "...cggc..cggc...",
      "....cc....cc....",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "...heeeeeefdb...",
      "..heeeeeeffedb..",
      "..bfddddddfdfb..",
      ".beddededfdefdb.",
      ".cedfffffffdfdc.",
      ".cddeaaaaaaefdc.",
      ".cdfaaaaaaaafdc.",
      ".cdaaaaaaaaaadc.",
      ".biaaaaaaaaaaib.",
      ".baaacaaaacaaab.",
      "..bianaaaanaib..",
      "..bijjiiiijjib..",
      ".chbbbbbbbbbbhb.",
      ".cghchkllkhchgb.",
      "bacgbgbmmbgbgcab",
      "baichbbbbbbhciab",
      ".bccgggbhgggccb.",
      "...chhcccchhc...",
      "...ccchbbhccc...",
      "...cggc..cggc...",
      "....cc....cc....",
    ],
    [
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "...heeeeeefdb...",
      "..heeeeeeffedb..",
      "..bfddddddfdfb..",
      ".beddededfdefdb.",
      ".cedfffffffdfdc.",
      ".cddeaaaaaaefdc.",
      ".cdfaaaaaaaafdc.",
      ".cdaaaaaaaaaadc.",
      ".biaaaaaaaaaaib.",
      ".baaacaaaacaaab.",
      "..bianaaaanaib..",
      "..bijjiiiijjib..",
      ".chbbbbbbbbbbhb.",
      ".cghchkllkhchgb.",
      ".cggbgbmmbgbggb.",
      "bacghbbbbbbhgcab",
      "baicgggbhgggciab",
      ".bccgggbhgggccb.",
      "...chhcccchhc...",
      "...ccchbbhccc...",
      "...cggc..cggc...",
      "....cc....cc....",
    ],
    [
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "...heeeeeefdb...",
      "..heeeeeeffedb..",
      "..bfddddddfdfb..",
      ".beddededfdefdb.",
      ".cedfffffffdfdc.",
      ".cddeaaaaaaefdc.",
      ".cdfaaaaaaaafdc.",
      ".cdaaaaaaaaaadc.",
      ".biaaaaaaaaaaib.",
      ".baaacaaaacaaab.",
      "..bianaaaanaib..",
      "..bijjiiiijjib..",
      ".chbbbbbbbbbbhb.",
      ".cghchkllkhchgb.",
      "bacgbgbmmbgbgcab",
      "baighbbbbbbhgiab",
      ".bccgggbhgggccb.",
      "...cgggbhgggc...",
      "...chhcccchhc...",
      "...ccchbbhccc...",
      "...cggc..cggc...",
      "....cc....cc....",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "...heeeeeefdb...",
      "..heeeeeeffedb..",
      "..bfddddddfdfb..",
      ".beddededfdefdb.",
      ".cedfffffffdfdc.",
      ".cddeaaaaaaefdc.",
      ".cdfaaaaaaaafdc.",
      ".cdaaaaaaaaaadc.",
      ".biaaaaaaaaaaib.",
      ".baaaoaaaaoaaab.",
      "..biacaaaacaib..",
      "..bijjiiiijjib..",
      ".chbbbbbbbbbbhb.",
      ".cghchkllkhchgb.",
      "bacgbgbmmbgbgcab",
      "baichbbbbbbhciab",
      ".bccgggbhgggccb.",
      "...chhcccchhc...",
      "...ccchbbhccc...",
      "...cggc..cggc...",
      "....cc....cc....",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "....bbbbbbbb....",
      "...heeeeeefdb...",
      "..heeeeeeffedb..",
      "..bfddddddfdfb..",
      ".beddededfdefdb.",
      ".cedfffffffdfdc.",
      ".cddeaaaaaaefdc.",
      ".cdfaaaaaaaafdc.",
      ".cdaaaaaaaaaadc.",
      ".biaaaaaaaaaaib.",
      ".baaapaaaapaaab.",
      "..bianaaaanaib..",
      "..bijjiiiijjib..",
      ".chbbbbbbbbbbhb.",
      ".cghchkllkhchgb.",
      "bacgbgbmmbgbgcab",
      "baichbbbbbbhciab",
      ".bccgggbhgggccb.",
      "...chhcccchhc...",
      "...ccchbbhccc...",
      "...cggc..cggc...",
      "....cc....cc....",
    ],
  ];

  const PAL_RECEPTIONIST_WALK = {
    a: "#3a3a50",
    b: "#46465e",
    c: "#ffcbb0",
    d: "#ab6736",
    e: "#b37b3f",
    f: "#cc9659",
    g: "#565972",
    h: "#6c6e85",
    i: "#f6ae9f",
    j: "#464660",
    k: "#f69784",
    l: "#4b516c",
    m: "#674d49",
    n: "#d8d0e0",
    o: "#a82b2d",
    p: "#d93232",
  };
  /* [idle, walk1..walk6] per direction — same layout as PLAYER_FRAMES,
     composited Body_02 + Eyes_01 + Outfit_06_01 + Hairstyle_01_01 (walk row
     y=64 of the Character_Generator sheets, ported via tools/composite.js) */
  const RECEPTIONIST_WALK = {
    down: [
      [
        "................",
        "................",
        "................",
        "................",
        "....bbbbbbbb....",
        "...gffffffedb...",
        "..gffffffeefdb..",
        "..beddddddedeb..",
        ".bfddfdfdedfedb.",
        ".afdeeeeeeededa.",
        ".addfccccccfeda.",
        ".adecccccccceda.",
        ".adccccccccccda.",
        ".biccccccccccib.",
        ".bcccaccccacccb.",
        "..bicmccccmcib..",
        "..bikkiiiikkib..",
        ".agbbbbbbbbbbgb.",
        ".ahgagnppngaghb.",
        "bcahbhboobhbhacb",
        "bciagbbbbbbgaicb",
        ".baahhhbghhhaab.",
        "...aggaaaagga...",
        "...aaagbbgaaa...",
        "...ahha..ahha...",
        "....aa....aa....",
      ],
      [
        "................",
        "................",
        "................",
        "....bbbbbbbb....",
        "...gffffffedb...",
        "..gffffffeefdb..",
        "..beddddddedeb..",
        ".bfddfdfdedfedb.",
        ".afdeeeeeeededa.",
        ".addfccccccfeda.",
        ".adecccccccceda.",
        ".adccccccccccda.",
        ".biccccccccccib.",
        ".bcccaccccacccb.",
        "..bicmccccmcib..",
        "..bikkiiiikkib..",
        ".agbbbbbbbbbbga.",
        ".ahhagnppngagccb",
        ".bccbhboobhbhicb",
        ".bcigbbbbbbgaab.",
        "..bahhhbghhha...",
        "...aggaaaagga...",
        "...aaagbbgaaa...",
        "....bb...ahha...",
        "..........aa....",
        "................",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        "....bbbbbbbb....",
        "...gffffffedb...",
        "..gffffffeefdb..",
        "..beddddddedeb..",
        ".bfddfdfdedfedb.",
        ".afdeeeeeeededa.",
        ".addfccccccfeda.",
        ".adecccccccceda.",
        ".adccccccccccda.",
        ".biccccccccccib.",
        ".bcccaccccacccb.",
        "..bicmccccmcib..",
        "..bikkiiiikkibb.",
        ".agbbbbbbbbbbacb",
        ".aggagnppngagicb",
        ".aghbhboobhbgab.",
        ".ahccbbbbbbga...",
        "..bcihhbghhga...",
        "...bagaaaagga...",
        "...aaabbggaaa...",
        "........ahha....",
        ".........aa.....",
      ],
      [
        "................",
        "................",
        "................",
        "....bbbbbbbb....",
        "...gffffffedb...",
        "..gffffffeefdb..",
        "..beddddddedeb..",
        ".bfddfdfdedfedb.",
        ".afdeeeeeeededa.",
        ".addfccccccfeda.",
        ".adecccccccceda.",
        ".adccccccccccda.",
        ".biccccccccccib.",
        ".bcccaccccacccb.",
        "..bicmccccmcib..",
        "..bikkiiiikkib..",
        ".agbbbbbbbbbbgb.",
        ".ahhagnppngaggb.",
        ".bhcchboobhbgccb",
        ".bgcibbbbbbgaicb",
        "..bahhhbghhhaab.",
        "...aggaaaagga...",
        "...aaagbbgaaa...",
        "....bb...ahha...",
        "..........aa....",
        "................",
      ],
      [
        "................",
        "................",
        "................",
        "....bbbbbbbb....",
        "...gffffffedb...",
        "..gffffffeefdb..",
        "..beddddddedeb..",
        ".bfddfdfdedfedb.",
        ".afdeeeeeeededa.",
        ".addfccccccfeda.",
        ".adecccccccceda.",
        ".adccccccccccda.",
        ".biccccccccccib.",
        ".bcccaccccacccb.",
        "..bicmccccmcib..",
        "..bikkiiiikkib..",
        ".agbbbbbbbbbbga.",
        "bccgagnppngahha.",
        "bcihbhboobhbccb.",
        ".baagbbbbbbgicb.",
        "...ahhhgbhhhab..",
        "...aggaaaagga...",
        "...aaagbbgaaa...",
        "...ahha...bb....",
        "....aa..........",
        "................",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        "....bbbbbbbb....",
        "...gffffffedb...",
        "..gffffffeefdb..",
        "..beddddddedeb..",
        ".bfddfdfdedfedb.",
        ".afdeeeeeeededa.",
        ".addfccccccfeda.",
        ".adecccccccceda.",
        ".adccccccccccda.",
        ".biccccccccccib.",
        ".bcccaccccacccb.",
        "..bicmccccmcib..",
        ".bbikkiiiikkib..",
        "bcabbbbbbbbbbga.",
        "bcigagnppngagga.",
        ".bagbhboobhbhga.",
        "...agbbbbbbccha.",
        "...aghhgbhhicb..",
        "...aggaaaagab...",
        "...aaaggbbaaa...",
        "....ahha........",
        ".....aa.........",
      ],
      [
        "................",
        "................",
        "................",
        "....bbbbbbbb....",
        "...gffffffedb...",
        "..gffffffeefdb..",
        "..beddddddedeb..",
        ".bfddfdfdedfedb.",
        ".afdeeeeeeededa.",
        ".addfccccccfeda.",
        ".adecccccccceda.",
        ".adccccccccccda.",
        ".biccccccccccib.",
        ".bcccaccccacccb.",
        "..bicmccccmcib..",
        "..bikkiiiikkib..",
        ".bgbbbbbbbbbbga.",
        ".bggagnppngahha.",
        "bccgbhboobhcchb.",
        "bciagbbbbbbicgb.",
        ".baahhhgbhhhab..",
        "...aggaaaagga...",
        "...aaagbbgaaa...",
        "...ahha...bb....",
        "....aa..........",
        "................",
      ],
    ],
    up: [
      [
        "................",
        "................",
        "................",
        "................",
        "....ggbbbbbb....",
        "...gffffffeeb...",
        "..gffffffffeeb..",
        "..bffffffffeeb..",
        ".bdeffffffeeedb.",
        ".adeeeeeeeeeeda.",
        ".adeeeeeeeeeeda.",
        ".addeeeeeeeedda.",
        ".adddddddddddda.",
        ".bddddddddddddb.",
        "..bddddddddddb..",
        "...adddddddda...",
        "..agaaaaaaaaga..",
        ".ahhgggggggghhb.",
        ".ahhhhhhhhhhhhb.",
        "acaahhhhhhhhaacb",
        "aciaghhhhhhgaicb",
        ".aaabggggggbaaa.",
        "...alaaaaaala...",
        "...aggbbbbgga...",
        "...ahha..ahha...",
        "....aa....aa....",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        "....ggbbbbbb....",
        "...gffffffeeb...",
        "..gffffffffeeb..",
        "..bffffffffeeb..",
        ".bdeffffffeeedb.",
        ".adeeeeeeeeeeda.",
        ".adeeeeeeeeeeda.",
        ".addeeeeeeeedda.",
        ".adddddddddddda.",
        ".bddddddddddddb.",
        "..bddddddddddb..",
        "...adddddddda...",
        "..agaaaaaaaaga..",
        ".ahhggggggggggb.",
        "acahhhhhhhhhggb.",
        "aciahhhhhhhhab..",
        ".aaaghhhhhhga...",
        "...abggggggba...",
        "...agaaaaaaga...",
        "...agggjjggga...",
        "....aaa..ahha...",
        "..........aa....",
      ],
      [
        "................",
        "................",
        "................",
        "....ggbbbbbb....",
        "...gffffffeeb...",
        "..gffffffffeeb..",
        "..bffffffffeeb..",
        ".bdeffffffeeedb.",
        ".adeeeeeeeeeeda.",
        ".adeeeeeeeeeeda.",
        ".addeeeeeeeedda.",
        ".adddddddddddda.",
        ".bddddddddddddb.",
        "..bddddddddddbb.",
        "...addddddddaicb",
        "..agaaaaaaaagaib",
        ".ahhggggggggggb.",
        "acahhhhhhhhhggb.",
        "aciahhhhhhhhab..",
        ".aaaghhhhhhga...",
        "...abggggggba...",
        "...agaaaaaaga...",
        "....aaajjggga...",
        ".........ahha...",
        ".........ahha...",
        "..........aa....",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        "....ggbbbbbb....",
        "...gffffffeeb...",
        "..gffffffffeeb..",
        "..bffffffffeeb..",
        ".bdeffffffeeedb.",
        ".adeeeeeeeeeeda.",
        ".adeeeeeeeeeeda.",
        ".addeeeeeeeedda.",
        ".adddddddddddda.",
        ".bddddddddddddb.",
        "..bddddddddddb..",
        "...adddddddda...",
        "..agaaaaaaaaga..",
        ".ahhggggggggggb.",
        ".ahhhhhhhhhhggb.",
        "acaahhhhhhhhab..",
        "aciaghhhhhhga...",
        ".aaajggggggja...",
        "...agaaaaaaga...",
        "...agggjjggga...",
        "....aaa..ahha...",
        "..........aa....",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        "....ggbbbbbb....",
        "...gffffffeeb...",
        "..gffffffffeeb..",
        "..bffffffffeeb..",
        ".bdeffffffeeedb.",
        ".adeeeeeeeeeeda.",
        ".adeeeeeeeeeeda.",
        ".addeeeeeeeedda.",
        ".adddddddddddda.",
        ".bddddddddddddb.",
        "..bddddddddddb..",
        "...adddddddda...",
        "..agaaaaaaaaga..",
        ".bgggggggggghha.",
        ".bgghhhhhhhhhcca",
        "..bahhhhhhhhaica",
        "...aghhhhhhgaaa.",
        "...ajggggggja...",
        "...agaaaaaaga...",
        "...agggjjggga...",
        "...ahha..aaa....",
        "....aa..........",
      ],
      [
        "................",
        "................",
        "................",
        "....ggbbbbbb....",
        "...gffffffeeb...",
        "..gffffffffeeb..",
        "..bffffffffeeb..",
        ".bdeffffffeeedb.",
        ".adeeeeeeeeeeda.",
        ".adeeeeeeeeeeda.",
        ".addeeeeeeeedda.",
        ".adddddddddddda.",
        ".bddddddddddddb.",
        ".bbddddddddddb..",
        "bciadddddddda...",
        "biagaaaaaaaaga..",
        ".bgggggggggghha.",
        ".bgghhhhhhhhhcca",
        "..bahhhhhhhhaica",
        "...aghhhhhhgaaa.",
        "...abggggggba...",
        "...agaaaaaaga...",
        "...agggjjaaa....",
        "...ahha.........",
        "...ahha.........",
        "....aa..........",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        "....ggbbbbbb....",
        "...gffffffeeb...",
        "..gffffffffeeb..",
        "..bffffffffeeb..",
        ".bdeffffffeeedb.",
        ".adeeeeeeeeeeda.",
        ".adeeeeeeeeeeda.",
        ".addeeeeeeeedda.",
        ".adddddddddddda.",
        ".bddddddddddddb.",
        "..bddddddddddb..",
        "...adddddddda...",
        "..agaaaaaaaaga..",
        ".bgggggggggghha.",
        ".bgghhhhhhhhhha.",
        "..bahhhhhhhhacca",
        "...aghhhhhhgaica",
        "...ajggggggjaaa.",
        "...agaaaaaaga...",
        "...agggjjggga...",
        "...ahha..aaa....",
        "....aa..........",
      ],
    ],
    left: [
      [
        "................",
        "................",
        "................",
        "................",
        ".....ggbbbbb....",
        "....gfffffeeb...",
        "...geefffffdfb..",
        "..abeeeefffeeb..",
        ".adfeeedeffeedb.",
        ".aeeeefeeeeedda.",
        ".afccfeeeeeddda.",
        "..bccccccedddda.",
        "..bccccccddddda.",
        "..bcccccccddddb.",
        "..bcaccccciddb..",
        "..acmcccciidda..",
        "...akkiccciia...",
        "....bbbaaaaa....",
        "....anbggaga....",
        "....ohbhhaga....",
        "....abbccbga....",
        "....ahbcibga....",
        ".....aabbaa.....",
        ".....agggla.....",
        "......ahhha.....",
        ".......aaa......",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        ".....ggbbbbb....",
        "....gfffffeeb...",
        "...geefffffdfb..",
        "..abeeeefffeeb..",
        ".adfeeedeffeedb.",
        ".aeeeefeeeeedda.",
        ".afccfeeeeeddda.",
        "..bccccccedddda.",
        "..bccccccddddda.",
        "..bcccccccddddb.",
        "..bcaccccciddb..",
        "..acmcccciidda..",
        "...akkiccciia...",
        "....bbbaaaaa....",
        "...banbggaga....",
        "..bcohbbhgaa....",
        "..biabhbccba....",
        "...bahhbciba....",
        "...aaaaabbab....",
        "..ahggglllj.....",
        "..ahhgjjjja.....",
        "...aag..........",
      ],
      [
        "................",
        "................",
        "................",
        ".....ggbbbbb....",
        "....gfffffeeb...",
        "...geefffffdfb..",
        "..abeeeefffeeb..",
        ".adfeeedeffeedb.",
        ".aeeeefeeeeedda.",
        ".afccfeeeeeddda.",
        "..bccccccedddda.",
        "..bccccccddddda.",
        "..bcccccccddddb.",
        "..bcaccccciddb..",
        "..acmcccciidda..",
        "...akkiccciia...",
        "...bbbbaaaaa....",
        "..bcanbggaga....",
        "..biohbbhgaa....",
        "...babhbccba....",
        "...aahhbciba....",
        "..abaaaabbaba...",
        ".ahggggllllha...",
        ".ahhjjjjjjaa....",
        "..aaj...........",
        "................",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        ".....ggbbbbb....",
        "....gfffffeeb...",
        "...geefffffdfb..",
        "..abeeeefffeeb..",
        ".adfeeedeffeedb.",
        ".aeeeefeeeeedda.",
        ".afccfeeeeeddda.",
        "..bccccccedddda.",
        "..bccccccddddda.",
        "..bcccccccddddb.",
        "..bcaccccciddb..",
        "..acmcccciidda..",
        "...akkiccciia...",
        "....bbbaaaaa....",
        "....anbggaga....",
        "....ohbhhaga....",
        "....abbccbga....",
        "....ahbcibga....",
        ".....aabbaa.....",
        ".....agggga.....",
        "......ahhha.....",
        ".......aaa......",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        ".....ggbbbbb....",
        "....gfffffeeb...",
        "...geefffffdfb..",
        "..abeeeefffeeb..",
        ".adfeeedeffeedb.",
        ".aeeeefeeeeedda.",
        ".afccfeeeeeddda.",
        "..bccccccedddda.",
        "..bccccccddddda.",
        "..bcccccccddddb.",
        "..bcaccccciddb..",
        "..acmcccciidda..",
        "...akkiccciia...",
        "....bbbaaaaa....",
        "....anbggaga....",
        "....bccbhaga....",
        "....bcibgaga....",
        "...jabbaagga....",
        "..ahjjjjjjaa....",
        "..ahhllllgghj...",
        "...aaajjjjhha...",
        "..........aa....",
      ],
      [
        "................",
        "................",
        "................",
        ".....ggbbbbb....",
        "....gfffffeeb...",
        "...geefffffdfb..",
        "..abeeeefffeeb..",
        ".adfeeedeffeedb.",
        ".aeeeefeeeeedda.",
        ".afccfeeeeeddda.",
        "..bccccccedddda.",
        "..bccccccddddda.",
        "..bcccccccddddb.",
        "..bcaccccciddb..",
        "..acmcccciidda..",
        "...akkiccciia...",
        "....bbbaaaaa....",
        "....agbggaga....",
        "....bccbhaga....",
        "....bcibgaga....",
        "....abbaaggaj...",
        "...ajjjjjjaghj..",
        "..ahlllgggghha..",
        "..ahhajjjjaaa...",
        "...aa...........",
        "................",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        ".....ggbbbbb....",
        "....gfffffeeb...",
        "...geefffffdfb..",
        "..abeeeefffeeb..",
        ".adfeeedeffeedb.",
        ".aeeeefeeeeedda.",
        ".afccfeeeeeddda.",
        "..bccccccedddda.",
        "..bccccccddddda.",
        "..bcccccccddddb.",
        "..bcaccccciddb..",
        "..acmcccciidda..",
        "...akkiccciia...",
        "....bbbaaaaa....",
        "....anbggaga....",
        "....ohbhhaga....",
        "....abbccbga....",
        "....ahbcibga....",
        ".....aabbaa.....",
        ".....agggga.....",
        "......ahhha.....",
        ".......aaa......",
      ],
    ],
    right: [
      [
        "................",
        "................",
        "................",
        "................",
        "....bbbbbgg.....",
        "...beefffffg....",
        "..beefffffeeg...",
        "..beefffeeeeb...",
        ".bdeeffeeeeeeb..",
        ".addeeeeeeeeeb..",
        ".adddeeeeefccb..",
        ".addddeccccccb..",
        ".adddddccccccb..",
        ".bddddcccccccb..",
        "..bddicccccacb..",
        "..addiiccccmca..",
        "...aiicccikka...",
        "....aaaaabbb....",
        "....agaggbna....",
        "....agahhbho....",
        "....agbccbba....",
        "....agbicbha....",
        ".....aabbaa.....",
        ".....alggga.....",
        ".....ahhha......",
        "......aaa.......",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        "....bbbbbgg.....",
        "...beefffffg....",
        "..beefffffeeg...",
        "..beefffeeeeb...",
        ".bdeeffeeeeeeb..",
        ".addeeeeeeeeeb..",
        ".adddeeeeefccb..",
        ".addddeccccccb..",
        ".adddddccccccb..",
        ".bddddcccccccb..",
        "..bddicccccacb..",
        "..addiiccccmca..",
        "...aiicccikka...",
        "....aaaaabbb....",
        "....agaggbnab...",
        "....aaghbbhocb..",
        "....abccbhbaib..",
        "....abicbhhab...",
        "....babbaaaaa...",
        ".....jlllgggha..",
        ".....ajjjjghha..",
        "..........gaa...",
      ],
      [
        "................",
        "................",
        "................",
        "....bbbbbgg.....",
        "...beefffffg....",
        "..beefffffeeg...",
        "..beefffeeeeb...",
        ".bdeeffeeeeeeb..",
        ".addeeeeeeeeeb..",
        ".adddeeeeefccb..",
        ".addddeccccccb..",
        ".adddddccccccb..",
        ".bddddcccccccb..",
        "..bddicccccacb..",
        "..addiiccccmca..",
        "...aiicccikka...",
        "....aaaaabbbb...",
        "....agaggbnacb..",
        "....aaghbbhoib..",
        "....abccbhbab...",
        "....abicbhhaa...",
        "...ababbaaaaba..",
        "...ahllllggggha.",
        "....aajjjjjjhha.",
        "...........jaa..",
        "................",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        "....bbbbbgg.....",
        "...beefffffg....",
        "..beefffffeeg...",
        "..beefffeeeeb...",
        ".bdeeffeeeeeeb..",
        ".addeeeeeeeeeb..",
        ".adddeeeeefccb..",
        ".addddeccccccb..",
        ".adddddccccccb..",
        ".bddddcccccccb..",
        "..bddicccccacb..",
        "..addiiccccmca..",
        "...aiicccikka...",
        "....aaaaabbb....",
        "....agaggbna....",
        "....agahhbho....",
        "....agbccbba....",
        "....agbicbha....",
        ".....aabbaa.....",
        ".....agggga.....",
        ".....ahhha......",
        "......aaa.......",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        "....bbbbbgg.....",
        "...beefffffg....",
        "..beefffffeeg...",
        "..beefffeeeeb...",
        ".bdeeffeeeeeeb..",
        ".addeeeeeeeeeb..",
        ".adddeeeeefccb..",
        ".addddeccccccb..",
        ".adddddccccccb..",
        ".bddddcccccccb..",
        "..bddicccccacb..",
        "..addiiccccmca..",
        "...aiicccikka...",
        "....aaaaabbb....",
        "....agaggbna....",
        "....agahbccb....",
        "....agagbicb....",
        "....aggaabbab...",
        "....aajjjjjjha..",
        "...jhggllllhha..",
        "...ahhjjjjaaa...",
        "....aa..........",
      ],
      [
        "................",
        "................",
        "................",
        "....bbbbbgg.....",
        "...beefffffg....",
        "..beefffffeeg...",
        "..beefffeeeeb...",
        ".bdeeffeeeeeeb..",
        ".addeeeeeeeeeb..",
        ".adddeeeeefccb..",
        ".addddeccccccb..",
        ".adddddccccccb..",
        ".bddddcccccccb..",
        "..bddicccccacb..",
        "..addiiccccmca..",
        "...aiicccikka...",
        "....aaaaabbb....",
        "....agaggbga....",
        "....agahbccb....",
        "....agagbicb....",
        "...baggaabba....",
        "..bhgajjjjjja...",
        "..ahhgggglllha..",
        "...aaajjjjahha..",
        "...........aa...",
        "................",
      ],
      [
        "................",
        "................",
        "................",
        "................",
        "....bbbbbgg.....",
        "...beefffffg....",
        "..beefffffeeg...",
        "..beefffeeeeb...",
        ".bdeeffeeeeeeb..",
        ".addeeeeeeeeeb..",
        ".adddeeeeefccb..",
        ".addddeccccccb..",
        ".adddddccccccb..",
        ".bddddcccccccb..",
        "..bddicccccacb..",
        "..addiiccccmca..",
        "...aiicccikka...",
        "....aaaaabbb....",
        "....agaggbna....",
        "....agahhbho....",
        "....agbccbba....",
        "....agbicbha....",
        ".....aabbaa.....",
        ".....agggga.....",
        ".....ahhha......",
        "......aaa.......",
      ],
    ],
  };

  function drawGrid(ctx, grid, px, py, flipX, pal) {
    const colors = pal || PAL;
    for (let r = 0; r < grid.length; r++) {
      const row = grid[r];
      for (let c = 0; c < row.length; c++) {
        const ch = flipX ? row[row.length - 1 - c] : row[c];
        if (ch === ".") continue;
        const col = colors[ch];
        if (!col) continue;
        ctx.fillStyle = col;
        ctx.fillRect(px + c, py + r, 1, 1);
      }
    }
  }

  /* deterministic pseudo-random 0..99 from two ints */
  function hash2(i, j) {
    let h = (i * 374761393 + j * 668265263) | 0;
    h = (h ^ (h >> 13)) * 1274126177;
    return Math.abs(h % 100);
  }

  /* ── tiles ─────────────────────────────────────────────────────────── */
  const T = 16;

  /* floor tiles hand-ported from the Modern Interiors "Room Builder" floor
     sheet via tools/png-to-grid.js (see game/CLAUDE.md) */
  const PAL_FLOOR_LOBBY = { a: "#b99e86", b: "#d0be9c" };
  const FLOOR_LOBBY_GRID = [
    "abababababababab",
    "babababababababa",
    "abaaaaaaaaaaaaab",
    "baabbbbbbbbbbaba",
    "ababaaaaaaaabaab",
    "baabaaaaaaaababa",
    "ababaabbbbaabaab",
    "baabaabbbbaababa",
    "ababaabbbbaabaab",
    "baabaabbbbaababa",
    "ababaaaaaaaabaab",
    "baabaaaaaaaababa",
    "ababbbbbbbbbbaab",
    "baaaaaaaaaaaaaba",
    "abababababababab",
    "babababababababa",
  ];

  const PAL_FLOOR_ROOM = {
    a: "#e8d8cb",
    b: "#e1d1c5",
    c: "#bfb2a7",
    d: "#e9d8cc",
    e: "#ebdace",
    f: "#dfd0c3",
    g: "#d5c7bb",
    h: "#d9cabe",
    i: "#d7c9bc",
    j: "#dbccc0",
    k: "#e7d7ca",
    l: "#e0d1c4",
    m: "#ccbbb3",
  };
  const FLOOR_ROOM_GRID = [
    "aaaaaaaaaaaaaaam",
    "fhigffhiglfhigfc",
    "abbjaabbjaabbjac",
    "deekddeekddeekdc",
    "fhiglfhiglfhigfc",
    "abbjaabbjaabbjac",
    "deekddeekddeekdc",
    "fhiglfhiglfhigfc",
    "abbjaabbjaabbjac",
    "deekddeekddeekdc",
    "fhiglfhiglfhigfc",
    "abbjaabbjaabbjac",
    "deekddeekddeekdc",
    "fhiglfhiglfhigfc",
    "abbjaabbjaabbjam",
    "mcccccccccccccmg",
  ];

  /* basement: chessboard floor built from the Room Builder floor sheet's
     stone checker swatch (@192,64 — 8px cells); each cell's face/edge layout
     is kept but scaled to a full 16px tile so the squares alternate per tile
     (same stretch-the-pack-art approach as the reception counter). */
  /* classic black-and-white chessboard tones: white lights, near-black darks
     (recolor of the pack's grayscale checker — cell layout unchanged) */
  const PAL_CHESS = {
    b: "#f4f4f4", // light square face
    g: "#dcdcdc", // light square left edge
    h: "#c4c4c4", // light square right edge
    e: "#e4e4e4", // light square bottom seam
    f: "#bdbdbd", // light square bottom-right corner
    d: "#161616", // dark square face
    i: "#000000", // dark square bottom seam
  };
  const CHESS_LIGHT_GRID = [
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "gbbbbbbbbbbbbbbh",
    "eeeeeeeeeeeeeeef",
  ];
  const CHESS_DARK_GRID = [
    "dddddddddddddddd",
    "dddddddddddddddd",
    "dddddddddddddddd",
    "dddddddddddddddd",
    "dddddddddddddddd",
    "dddddddddddddddd",
    "dddddddddddddddd",
    "dddddddddddddddd",
    "dddddddddddddddd",
    "dddddddddddddddd",
    "dddddddddddddddd",
    "dddddddddddddddd",
    "dddddddddddddddd",
    "dddddddddddddddd",
    "dddddddddddddddd",
    "iiiiiiiiiiiiiiii",
  ];

  /* walls hand-ported from the pack's Generic_Home_1 (6_Home_Designs):
     white wall-top strips with navy outlines, light-gray face on the top
     wall, shaded top-of-wall bands running down the sides, white strip +
     void along the bottom. wall() picks the grid from the tile's border
     position and closes runs with a 1px outline cap beside door gaps. */
  const PAL_WALL = {
    o: "#3a3a50", // navy outline
    W: "#fdfdfd", // horizontal top-strip white
    w: "#f8f8f8", // vertical-strip / south-strip white
    F: "#cccccc", // face
    L: "#c6c6c6", // face light row under the cap
    T: "#b4b4b4", // face shadow row
    D: "#a1a1a1", // side band / corner bevel / face bottom shade
    V: "#10141a", // void outside the south wall
  };
  function wallRows(row) {
    const g = [];
    for (let i = 0; i < 16; i++) g.push(row);
    return g;
  }
  /* the top wall is two tiles tall, like the pack's reference design:
     row 0 = white top strip + start of the face, row 1 = rest of the face */
  const WALL_N_GRID = [
    "oooooooooooooooo",
    "WWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWW",
    "oooooooooooooooo",
    "TTTTTTTTTTTTTTTT",
    "LLLLLLLLLLLLLLLL",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
  ];
  const WALL_N2_GRID = [
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "TTTTTTTTTTTTTTTT",
    "DDDDDDDDDDDDDDDD",
    "oooooooooooooooo",
  ];
  const WALL_S_GRID = [
    "oooooooooooooooo",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "oooooooooooooooo",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
  ];
  /* side walls: white top strip outside, shaded band inside — the right
     side is this grid mirrored (flipX), same for the corners below */
  const WALL_SIDE_GRID = wallRows("owwwwwoDDDDDDDDo");
  /* the face's edge shading widens diagonally toward the interior corner,
     one step every ~3 rows (staircase measured off the reference design) */
  const CORNER_TL_GRID = [
    "oooooooooooooooo",
    "owwwwwoWWWWWWWWW",
    "owwwwwoWWWWWWWWW",
    "owwwwwoWWWWWWWWW",
    "owwwwwoWWWWWWWWW",
    "oooooooooooooooo",
    "owwwwwoTTTTTTTTT",
    "owwwwwoDLLLLLLLL",
    "owwwwwoDFFFFFFFF",
    "owwwwwoDDFFFFFFF",
    "owwwwwoDDFFFFFFF",
    "owwwwwoDDFFFFFFF",
    "owwwwwoDDDFFFFFF",
    "owwwwwoDDDFFFFFF",
    "owwwwwoDDDFFFFFF",
    "owwwwwoDDDDFFFFF",
  ];
  const CORNER_TL2_GRID = [
    "owwwwwoDDDDFFFFF",
    "owwwwwoDDDDFFFFF",
    "owwwwwoDDDDFFFFF",
    "owwwwwoDDDDDFFFF",
    "owwwwwoDDDDDFFFF",
    "owwwwwoDDDDDFFFF",
    "owwwwwoDDDDDDFFF",
    "owwwwwoDDDDDDFFF",
    "owwwwwoDDDDDDFFF",
    "owwwwwoDDDDDDDFF",
    "owwwwwoDDDDDDDFF",
    "owwwwwoDDDDDDDFF",
    "owwwwwoDDDDDDDDF",
    "owwwwwoDDDDDDDDT",
    "owwwwwoDDDDDDDDD",
    "owwwwwoDDDDDDDDo",
  ];
  const CORNER_BL_GRID = [
    "owwwwwoooooooooo",
    "owwwwwwwwwwwwwww",
    "owwwwwwwwwwwwwww",
    "owwwwwwwwwwwwwww",
    "owwwwwwwwwwwwwww",
    "oooooooooooooooo",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
  ];

  function wall(ctx, tx, ty, map) {
    const x = tx * T,
      y = ty * T;
    const rows = map ? map.length : 13;
    const cols = map ? map[0].length : 20;
    const edge = tx === 0 || tx === cols - 1;
    const flip = tx === cols - 1; // right side mirrors the left grids
    let grid;
    if (ty === 0) grid = edge ? CORNER_TL_GRID : WALL_N_GRID;
    else if (ty === 1) grid = edge ? CORNER_TL2_GRID : WALL_N2_GRID;
    else if (ty === rows - 1) grid = edge ? CORNER_BL_GRID : WALL_S_GRID;
    else grid = WALL_SIDE_GRID;
    drawGrid(ctx, grid, x, y, flip, PAL_WALL);
    if (!map) return;
    /* door caps: close the wall run with a 1px outline beside a gap */
    function open(r, c) {
      const ch = map[r][c];
      return "#~".indexOf(ch) === -1;
    }
    ctx.fillStyle = PAL_WALL.o;
    if (ty <= 1 || ty === rows - 1) {
      const capH = ty === rows - 1 ? 6 : T; // south strip is only 6px tall
      if (tx > 0 && open(ty, tx - 1)) ctx.fillRect(x, y, 1, capH);
      if (tx < cols - 1 && open(ty, tx + 1))
        ctx.fillRect(x + T - 1, y, 1, capH);
    } else {
      if (ty > 0 && open(ty - 1, tx)) ctx.fillRect(x, y, T, 1);
      if (ty < rows - 1 && open(ty + 1, tx)) ctx.fillRect(x, y + T - 1, T, 1);
    }
  }

  /* window on the lower face row (map '~' goes in row 1, under the strip) */
  function windowNight(ctx, tx, ty, t, map) {
    wall(ctx, tx, ty, map);
    const x = tx * T,
      y = ty * T;
    ctx.fillStyle = PAL_WALL.o;
    ctx.fillRect(x + 1, y + 1, 14, 12);
    ctx.fillStyle = "#0b1524";
    ctx.fillRect(x + 2, y + 2, 12, 10);
    for (let i = 0; i < 5; i++) {
      const sx = x + 2 + (hash2(tx * 7 + i, ty) % 12);
      const sy = y + 2 + (hash2(i, ty * 5 + tx) % 10);
      const tw = (Math.sin(t * 2 + i * 1.7 + tx) + 1) / 2;
      ctx.fillStyle = tw > 0.55 ? "#9ecbff" : "#40506b";
      ctx.fillRect(sx, sy, 1, 1);
    }
    ctx.fillStyle = PAL_WALL.o;
    ctx.fillRect(x + 7, y + 2, 1, 10); // mullion
    ctx.fillRect(x + 2, y + 6, 12, 1); // transom
  }

  /* lobby: Modern Interiors tan/cream diamond-weave carpet tile */
  function floorLobbyCarpet(ctx, tx, ty) {
    drawGrid(ctx, FLOOR_LOBBY_GRID, tx * T, ty * T, false, PAL_FLOOR_LOBBY);
  }

  /* section rooms: Modern Interiors warm herringbone-weave floor tile */
  function floorCarpetTiles(ctx, tx, ty) {
    drawGrid(ctx, FLOOR_ROOM_GRID, tx * T, ty * T, false, PAL_FLOOR_ROOM);
  }

  /* hidden basement: stone squares alternating per tile like a chessboard */
  function floorChessboard(ctx, tx, ty) {
    drawGrid(
      ctx,
      (tx + ty) % 2 ? CHESS_LIGHT_GRID : CHESS_DARK_GRID,
      tx * T,
      ty * T,
      false,
      PAL_CHESS,
    );
  }

  /* north door: gold lintel + jambs hand-ported from Generic_Home_1's
     furniture layer (16x32 per tile, mirrored pair over the two-tile gap),
     with a dark opening where its leaf used to be. The leaves are now
     animated_door_4's swing frames 0-4 (same tan-wood-with-glass family),
     hinged at the outer jamb so the pair opens outward from the center. */
  const PAL_DOOR = {
    a: "#ca8854",
    b: "#3a3a50",
    c: "#c4dae8",
    d: "#b5754d",
    e: "#e0b870",
    f: "#565972",
    g: "#b5cdcf",
    h: "#ffffff",
    i: "#46465e",
    j: "#a85f46",
    k: "#b35e3f",
    l: "#d18f5b",
    V: "#05070a",
  };
  const DOOR_FRAME_GRID = [
    "................",
    "................",
    "................",
    "bbbbbbbbbbbbbbbb",
    "aaeeeeeeeeeeeeee",
    "aaeeeeeeeeeeeeee",
    "bbiiiiiiiiiiiiii",
    "ddaaaaaaaaaaaaaa",
    "ddaaaaaaaaaaaaaa",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "jjVVVVVVVVVVVVVV",
    "bbVVVVVVVVVVVVVV",
    "................",
  ];
  const DOOR_NORTH_FRAMES = [
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      ".bbbbbbbbbbbbbb.",
      ".baaaaaaaaaaaab.",
      ".babbbbbbbbbiab.",
      ".babcccchcccfab.",
      ".babccccchccfab.",
      ".babhccccchcfab.",
      ".babhhccccchfab.",
      ".babghhcccccfab.",
      ".baifffffffffab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaekab.",
      ".baaaaaaaaadkab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaaaab.",
      ".bjjjjjjjjjjjjb.",
      ".bbbbbbbbbbbbbb.",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      ".bbbbbbbbbbbbbb.",
      ".baabcccchhcfdb.",
      ".babccccccchfdb.",
      ".babccccccccfdb.",
      ".babhcccccffddb.",
      ".babhhhcffaaddb.",
      ".babghffaaaekdb.",
      ".babffaaaaadkdb.",
      ".babaaaaaaaaddb.",
      ".baaaaaaaaaaddb.",
      ".baaaaaaaaaaddb.",
      ".baaaaaaaaaaddb.",
      ".baaaaaaaaaaddb.",
      ".baaaaaaaaaaddb.",
      ".baaaaaaaaaadjb.",
      ".baaaaaaaadjbbb.",
      ".baaaaaadjbb..b.",
      ".baaaadjbb....b.",
      ".baadjbb......b.",
      ".bdjbb........b.",
      ".bbb..........b.",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      ".bbbbbbbbbbbbbb.",
      ".bllbcghhhfdb.b.",
      ".blbcccggfddb.b.",
      ".blbhhccfddab.b.",
      ".blbghhfadddb.b.",
      ".babcgfaadddb.b.",
      ".babcfaaadddb.b.",
      ".babfaaaadddb.b.",
      ".babaaaaadddb.b.",
      ".baaaaaaadddb.b.",
      ".baaaaaaadddb.b.",
      ".baaaaaaaddjb.b.",
      ".baaaaaaadjb..b.",
      ".baaaaaaajb...b.",
      ".baaaaaajb....b.",
      ".baaaaajb.....b.",
      ".baaaajb......b.",
      ".baaajb.......b.",
      ".baajb........b.",
      ".bjjb.........b.",
      ".bbb..........b.",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      ".bbbbbbbbbbbbbb.",
      ".babcggfjb....b.",
      ".babcgfdjb....b.",
      ".babcgfdjb....b.",
      ".babcfddjb....b.",
      ".babcfddjb....b.",
      ".babfdddjb....b.",
      ".bafadddjb....b.",
      ".baaadddjb....b.",
      ".baaadddjb....b.",
      ".baaadddb.....b.",
      ".baaaddjb.....b.",
      ".baaaddb......b.",
      ".baaadjb......b.",
      ".baaadb.......b.",
      ".baaajb.......b.",
      ".baadb........b.",
      ".baajb........b.",
      ".baab.........b.",
      ".bjjb.........b.",
      ".bbb..........b.",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      ".bbbbbbbbbbbbbb.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".bjjb.........b.",
      ".bbb..........b.",
    ],
  ];
  /* k: swing step 0 (closed) .. 4 (fully open) */
  function doorNorth(ctx, tx, ty, k) {
    const x = tx * T,
      y = ty * T;
    drawGrid(ctx, DOOR_FRAME_GRID, x, y, false, PAL_DOOR);
    drawGrid(ctx, DOOR_FRAME_GRID, x + T, y, true, PAL_DOOR);
    /* leaves sit 1px in from each tile's outer edge, flush with the jambs */
    const leaf = DOOR_NORTH_FRAMES[Math.max(0, Math.min(4, k | 0))];
    drawGrid(ctx, leaf, x + 1, y, false, PAL_DOOR);
    drawGrid(ctx, leaf, x + T - 1, y, true, PAL_DOOR);
  }

  /* south door: the BACK of the same double door, seen from inside the
     room — following the pack's back-door convention (see the museum
     ticket-office door), only a top slice of the leaves peeks out below
     the south wall's strip. The closed leaves FILL the whole tile: top
     outline flush with the wall top, then wood and each leaf's glass
     band stretched to the screen edge — no void, the door itself runs
     off the bottom of the frame. One 16x16 grid per tile, mirrored for
     the right leaf (seam shade meets at the pair's center). Static on
     purpose — a leaf swinging away from the camera shows nothing from
     behind. */
  const DOOR_SOUTH_GRID = [
    "bbbbbbbbbbbbbbbb",
    "baaaaaaaaaaaaaad",
    "baaaaaaaaaaaaaad",
    "babccccccccccfad",
    "babccccccccccfad",
    "babhcccccccccfad",
    "babhcccccccccfad",
    "babccccccccccfad",
    "babccccccccccfad",
    "baifffffffffffad",
    "baaaaaaaaaaaaaad",
    "baaaaaaaaaaaaaad",
    "baaaaaaaaaaaaaad",
    "baaaaaaaaaaaaaad",
    "bjjjjjjjjjjjjjjd",
    "bjjjjjjjjjjjjjjd",
  ];
  function doorSouth(ctx, tx, ty) {
    drawGrid(ctx, DOOR_SOUTH_GRID, tx * T, ty * T, false, PAL_DOOR);
    drawGrid(ctx, DOOR_SOUTH_GRID, (tx + 1) * T, ty * T, true, PAL_DOOR);
  }

  /* side door: animated_door_vertical_left_1, the pack's swing frames 0-4
     (closed -> ajar -> fully open) remapped onto PAL_DOOR. Each frame is
     the pack's full 32x48 cell: edge-on the leaf shows its full standing
     height, which is why side doors run taller than the face-on north
     door — the pack pairs them this way. The leaf swings LEFT, so the
     unflipped frames fit the east wall (opening into the room); flip
     mirrors them for the west. Drawn two rows above the gap so the closed
     leaf's base sits on the gap's bottom edge, inset 2px sideways so the
     closed sliver hugs the wall's inner face. */
  const DOOR_SIDE_FRAMES = [
    [
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "...................bbbb.........",
      "...................baab.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................bddb.........",
      "...................bddb.........",
      "...................bddb.........",
      "...................bddb.........",
      "...................bddb.........",
      "...................bddb.........",
      "...................bddb.........",
      "...................bddb.........",
    ],
    [
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      ".....................bb.........",
      "....................bab.........",
      "....................bab.........",
      "...................iaab.........",
      "...................iaib.........",
      "..................ieadb.........",
      "..................ieidb.........",
      ".................ieeddb.........",
      ".................ieijdb.........",
      "................ieeajdb.........",
      "................ieiajdb.........",
      "...............ieeajjdb.........",
      "...............ieiajjdb.........",
      "..............ieeajajdb.........",
      "..............ieiajajdb.........",
      ".............ieeajaajdb.........",
      ".............iejajaajdb.........",
      ".............iijeaaaddb.........",
      ".............bjjeaaeddb.........",
      ".............bjjeaaeddb.........",
      ".............bjjeaeaddb.........",
      ".............bjjeaeaddb.........",
      ".............bjjeeaaddb.........",
      ".............bjjeeaaddb.........",
      ".............bjjeaaaddb.........",
      ".............bjjeaaaddb.........",
      ".............bjjaaaadjb.........",
      ".............bjjaaaadb..........",
      ".............bjjeaaaj...........",
      ".............bjjdaaab...........",
      ".............bjjaaaj............",
      ".............bjjaaab............",
      ".............bjjaaj.............",
      ".............bjjaab.............",
      ".............bjjaj..............",
      ".............bjjab..............",
      ".............bjjj...............",
      ".............bjjb...............",
      ".............bjj................",
      ".............bbb................",
      "................................",
    ],
    [
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      ".....................bb.........",
      "....................bab.........",
      "...................iaab.........",
      "..................ieabb.........",
      ".................ieebdb.........",
      "................ieeiddb.........",
      "...............ieeiaddb.........",
      "..............ieeiaajdb.........",
      ".............ieeiaajjdb.........",
      "............ieeiaajajdb.........",
      "...........ieeiaajaajdb.........",
      "..........ieeiaajaaajdb.........",
      ".........ieeiaajaaaajdb.........",
      "........ieeiaajaaaaajdb.........",
      "........ieiaajaaaaaajdb.........",
      "........iijaaaaaaaaajdb.........",
      "........bjjaeaaaaaaaddb.........",
      "........bjjaeaaaaaaeddb.........",
      "........bjjaeaaaaaeaddb.........",
      "........bjjaeaaaaeaaddb.........",
      "........bjjaeaaaeaaaddb.........",
      "........bjjaeaaeaaaaddb.........",
      "........bjjaeaeaaaaaddb.........",
      "........bjjaeeaaaaaaddb.........",
      "........bjjaeaaaaaaaddb.........",
      "........bjjaaaaaaaaaddb.........",
      "........bjjaaaaaaaaadjb.........",
      "........bjjaeaaaaaaajb..........",
      "........bjjjdaaaaaajb...........",
      "........bjjjaaaaaajb............",
      "........bjjaaaaaajb.............",
      "........bjjaaaaajb..............",
      "........bjjaaaajb...............",
      "........bjjaaajb................",
      "........bjjaajb.................",
      "........bjjajb..................",
      "........bjjjb...................",
      "........bjjb....................",
      "........bbb.....................",
      "................................",
      "................................",
    ],
    [
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "....................bbb.........",
      "..................iiaab.........",
      "................iieeaab.........",
      "..............iieeeebbb.........",
      "............iieeeeiiddb.........",
      "..........iieeeeiiaaddb.........",
      "........iieeeeiiaaaaddb.........",
      "......iieeeeiiaaaajjddb.........",
      ".....ieeeeiiaaaajjajddb.........",
      ".....ieeiiaaaajjaaajddb.........",
      ".....iiiaaaajjaaaaajddb.........",
      ".....bjaaajjaaaaaaajddb.........",
      ".....bjaajaaaaaaaaajddb.........",
      ".....bjaeaaaaaaaaaajddb.........",
      ".....bjaeaaaaaaaaaajddb.........",
      ".....bjaeaaaaaaaaaajddb.........",
      ".....bjaeaaaaaaaaaeaddb.........",
      ".....bjaeaaaaaaaeeaaddb.........",
      ".....bjaeaaaaaeeaaaaddb.........",
      ".....bjaeaaaeeaaaaaaddb.........",
      ".....bjaeaeeaaaaaaaaddb.........",
      ".....bjaeeaaaaaaaaaaddb.........",
      ".....bjaaaaaaaaaaaaaddb.........",
      ".....bjaaaaaaaaaaaaaddb.........",
      ".....bjaeaaaaaaaaaaaddb.........",
      ".....bjjdaaaaaaaaaaaddb.........",
      ".....bjjaaaaaaaaaaaajjb.........",
      ".....bjaaaaaaaaaaajjbbb.........",
      ".....bjaaaaaaaaajjbb............",
      ".....bjaaaaaaajjbb..............",
      ".....bjaaaaajjbb................",
      ".....bjaaajjbb..................",
      ".....bjajjbb....................",
      ".....bjjbb......................",
      ".....bbb........................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
    ],
    [
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      ".....iiiiiiiiiiiiiiibbb.........",
      ".....ieeeeeeeeeeeeeeaab.........",
      ".....ieeeeeeeeeeeeeeaab.........",
      ".....iiiiiiiiiiiiiiibbb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaakkkkkkkkkkkddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeeeeeeeeeeeaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....bakeaaaaaaaaaaaddb.........",
      ".....bakdaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....bjjjjjjjjjjjjjjjjb.........",
      ".....bbbbbbbbbbbbbbbbbb.........",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
    ],
  ];
  /* k: swing step 0 (closed) .. 4 (fully open); gapRow = door tile's row */
  function doorSide(ctx, tx, gapRow, flip, k) {
    const frame = DOOR_SIDE_FRAMES[Math.max(0, Math.min(4, k | 0))];
    const x = flip ? tx * T + 2 : tx * T + T - 34;
    drawGrid(ctx, frame, x, (gapRow - 2) * T, flip, PAL_DOOR);
  }

  const TILES = {
    floorLobbyCarpet,
    floorCarpetTiles,
    floorChessboard,
    wall,
    windowNight,
    doorNorth,
    doorSide,
    doorSouth,
  };

  /* ── furniture painters ────────────────────────────────────────────── */
  /* each painter: (ctx, px, py, w, h, t, obj) — px/py/w/h in pixels     */

  function shadow(ctx, px, py, w) {
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.fillRect(px + 1, py - 2, w - 2, 3);
  }

  function rug(ctx, px, py, w, h, t, obj) {
    const c1 = (obj && obj.c1) || "#1e3a2f";
    const c2 = (obj && obj.c2) || "#2a5240";
    ctx.fillStyle = c1;
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = c2;
    ctx.fillRect(px + 3, py + 3, w - 6, h - 6);
    ctx.fillStyle = c1;
    ctx.fillRect(px + 6, py + 6, w - 12, h - 12);
  }

  function neonRug(ctx, px, py, w, h, t) {
    ctx.fillStyle = "#171226";
    ctx.fillRect(px, py, w, h);
    const glow = (Math.sin(t * 2.2) + 1) / 2;
    ctx.fillStyle = glow > 0.5 ? "#6e40c9" : "#553098";
    ctx.fillRect(px + 2, py + 2, w - 4, 1);
    ctx.fillRect(px + 2, py + h - 3, w - 4, 1);
    ctx.fillRect(px + 2, py + 2, 1, h - 4);
    ctx.fillRect(px + w - 3, py + 2, 1, h - 4);
  }

  function doormat(ctx, px, py, w, h) {
    ctx.fillStyle = "#5b4632";
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = "#6d5540";
    ctx.fillRect(px + 2, py + 2, w - 4, h - 4);
  }

  /* coffee mug hand-ported from 3_Animated_objects/16x16/animated_coffee.png
     — a 6-frame 16x32 strip (cup in the bottom rows, steam trail rising and
     dissipating above it). Drawn near the top of its box so the cup sits on
     a counter even when the box is stretched tall for hit-testing; the
     steam trail draws above the box, which is fine since the mug is
     overhead-flagged anyway. */
  const PAL_MUG = {
    a: "#3a3a50",
    b: "#46465e",
    c: "#dad4e0",
    d: "#cac3d5",
    e: "#565972",
    f: "#d9d9d9",
    g: "#b8b5cb",
    h: "#a2a6be",
    i: "#d1cdd6",
    j: "#9f8f7e",
    k: "#6b4c2c",
    l: "#cacacc",
    m: "#8c8c98",
    n: "#9496a3",
  };
  const MUG_CUP_ROWS = [
    "......eebb......",
    ".....eccddbe....",
    ".....ecggdbce...",
    ".....bdkkdbdb...",
    "....baggggab....",
    "....bahhhhae....",
    "....bcaaaacb....",
    "....adccccda....",
    ".....aaaaaa.....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
  ];

  const MUG_STEAM_ROWS = [
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      ".........f......",
      "................",
      ".........f......",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      ".........f......",
      ".........f......",
      "........ff......",
      ".......fff......",
      ".......ff.......",
      ".......ff.......",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      ".........f......",
      ".......fff......",
      ".......fff......",
      "........f.......",
      "................",
      "................",
      "................",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "........f.......",
      "........ff......",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
    ],
  ];

  const MUG_FRAMES = MUG_STEAM_ROWS.map((steam) => steam.concat(MUG_CUP_ROWS));

  function mug(ctx, px, py, w, h, t) {
    const frame = Math.floor(t * 3) % MUG_FRAMES.length;
    /* box hangs down to the counter's floor line so the interact probe
       can reach it (see world.js) — pull the sprite up so the cup's base
       rests on the counter's white top face instead of at the box's
       bottom */
    drawGrid(
      ctx,
      MUG_FRAMES[frame],
      px + (w - 16) / 2,
      py - 26,
      false,
      PAL_MUG,
    );
  }

  /* desk telephone hand-ported from 1_Interiors/16x16 Generic sheet (the
     navy/gray set — same palette family as the reception counter). Sits on
     the counter's left run; like the mug, its box hangs down to the
     counter's floor line for the interact probe and the painter pulls the
     sprite up onto the white top face. */
  const PAL_PHONE = {
    a: "#3a3a50",
    b: "#6c6e85",
    c: "#8b8bab",
    d: "#9da3b7",
    e: "#565972",
    f: "#a79796",
    g: "#46465e",
    h: "#b1bac8",
  };
  const PHONE_GRID = [
    ".................",
    ".....aaaaaaaa....",
    "...aahhhdddccaa..",
    "..addddddddcccca.",
    ".aabddcbbbbcccba.",
    "a.acccaaaaaabbba.",
    "a..aaabceebbaaa..",
    "a...acdeccebba...",
    "a..gacdeccebbaa..",
    ".aaggbbbeebbbaa..",
    "..fgeaaaaaaaagaf.",
    "..fgebbbbbbeegaf.",
    "..ffaaaaaaaaaaff.",
  ];
  function deskPhone(ctx, px, py, w, h) {
    drawGrid(ctx, PHONE_GRID, px - 1, py - 11, false, PAL_PHONE);
  }

  /* small desk printer (red control panel) that sits beside the desk phone —
     hand-ported from 3_Modern_Office_Shadowless/Modern_Office_Shadowless_16x16.png
     @ (0,224) 16x32 (empty top/bottom rows trimmed to the 17-tall body). */
  const PAL_DESKPRINTER = {
    a: "#3a3a50",
    b: "#ebe4f2",
    c: "#46465e",
    d: "#d8d0e0",
    e: "#8b8bab",
    f: "#565972",
    g: "#6c6e85",
    h: "#afacc8",
    i: "#568d61",
    j: "#e63f38",
    k: "#d93232",
    l: "#50a7e8",
    m: "#4995e3",
    n: "#f2b22b",
    o: "#ed931e",
  };
  const DESKPRINTER_GRID = [
    "....fcaaaaacf...",
    ".fcacbbbbbbbc...",
    ".cbdcbdddddba...",
    ".abhcbdhhhdba...",
    ".cbhcbbbbbbba...",
    "afbdcbdddddbcf..",
    "afbdchhhhhihcc..",
    "afbdfgggggigfaf.",
    "achheeeeeeefgaf.",
    "acaaaaaaaaacgaf.",
    "acddldddddhfgac.",
    "afddmdddjdhfgac.",
    "afggggggkggfgcc.",
    "fceeeeeeeeeeecc.",
    ".ahbbjbbbbnbbfa.",
    ".ceeekeeeeoeeea.",
    ".fcaaaaaaaaaacf.",
  ];

  /* contact-room "direct line" station: draws ONE long continuous tan desk
     (DESK_TAN_84 — the 42px pack desk widened to 84px, so the phone/printer
     half and the resume-copier half below read as a single table, no seam)
     and seats the desk phone (PHONE_GRID) + a small desk printer
     (DESKPRINTER_GRID) on its left half (base line dy+15, as cubicles do). The
     right half's resume copier is drawn by the separate `resumeCopier` painter
     (its own interactable) so this desk is drawn only once. Left edge is kept
     where the old 42px desk sat (dx = px + 3) so the run grows rightward. */
  function contactDesk(ctx, px, py, w, h) {
    const deskW = 42;
    const dx = px + Math.round((w - deskW) / 2);
    const dy = py + h - 23;
    shadow(ctx, dx, py + h, DESK_TAN_84[0].length);
    drawGrid(ctx, DESK_TAN_84, dx, dy, false, PAL_DESK_TAN);
    /* items sit on the desktop surface (base line dy+15, as in cubicle) */
    drawGrid(ctx, PHONE_GRID, dx + 2, dy + 15 - PHONE_GRID.length, false, PAL_PHONE);
    drawGrid(ctx, DESKPRINTER_GRID, dx + 22, dy + 15 - DESKPRINTER_GRID.length, false, PAL_DESKPRINTER);
  }

  /* potted palm hand-ported from 1_Generic_16x16.png's Theme Sorter sheet
     (32x48 — two tiles wide, three tall); lobby corner accent */
  const PAL_PALM = {
    a: "#3a3a50",
    b: "#4e6e61",
    c: "#a9764f",
    d: "#568d61",
    e: "#6b4c2c",
    f: "#9bc246",
    g: "#a79796",
    h: "#916e41",
    i: "#455c5b",
    j: "#f2bd7a",
  };
  const PALM_GRID = [
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "...................aaa..........",
    "......aaaa........affda.........",
    ".....aabffa..aaa.affbaba........",
    "....abaabdfaabbbafdbaaaba.......",
    "....aa..abddaiiiadda...aa.......",
    ".........aaddaiiiaaaaaaa........",
    "........aaaaaiaaaiiddffba.......",
    ".......adfffdbaaaabbbbdfba......",
    "......afffddbaiiiiaaaaadfba.....",
    ".....afdbbbbaabbbba....adda.....",
    "....afdbaaaaaaaddba.....ada.....",
    "....adba....aeadfdba....ada.....",
    "....ada.....aeabffba.....aa.....",
    "....aba.....aheadfba......a.....",
    "....aa......ahhabdfa............",
    "............aehhabfa............",
    "............aheehada............",
    "............ahcchaaa............",
    "............aeccea..............",
    "..........aaaheehaaa............",
    ".........ajeahcchaeca...........",
    ".........ajeaecceaeca...........",
    ".........ajeeeeeeeeca...........",
    ".........ajeeeeeeeeca...........",
    ".........ajjjjjjcjcca...........",
    "........gaaaaaaaaaaaag..........",
    "........gahhhhhhhhhhag..........",
    "........gaccccccccchag..........",
    "........gaccccccccchag..........",
    "........ggaaaaaaaaaagg..........",
    "........gggggggggggggg..........",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
  ];
  function palmPlant(ctx, px, py) {
    drawGrid(ctx, PALM_GRID, px, py, false, PAL_PALM);
  }

  /* framed world map hand-ported from 2_LivingRoom_Black_Shadow_16x16.png
     (32x32 — two tiles wide and tall, navy frame matches PAL_WALL.o); wall art */
  const PAL_MAP = {
    a: "#a4dc77",
    b: "#53aedb",
    c: "#3a3a50",
    d: "#e8dbdd",
    e: "#b9e881",
    f: "#f8f8f8",
    g: "#7ebddd",
    h: "#6fd7ec",
    i: "#5dc4e8",
  };
  const MAP_GRID = [
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "cccccccccccccccccccccccccccccccc",
    "cffffffffffffffffffffffffffffffc",
    "cdhhhheeehaahhhheeeeeehhhhhhhhdc",
    "cdbbbaaabaaabbbaaaaaaaaaaaaaaadc",
    "cdeeeeeieeeeiieeeeeeeeeeeeeeeedc",
    "cdaaaaaabaaabaaaaaaaaaaaaaaaabdc",
    "cdieeeeeiaiiieeeeeeeeeeeeeeeiidc",
    "cdbaaaaaabbbbaaaaaaaaaaaaaaabbdc",
    "cdbbbaaaaabbbababbaaaaaaaaaaabdc",
    "cdbbbaaaabbbbbbbbbbbbbaaaaaaabdc",
    "cdbbbbaabbbbaabbbbabbaaaaaaaabdc",
    "cdbbbbbbbbbbaaaaaaabgbbbbaaaabdc",
    "cdbbbbaaaabbaaaaaabgggbbbbbbbbdc",
    "cdbgbbaaaabbbbaaaabbgggbaaaabbdc",
    "cdbgbbbaaabbgbaaabbbggbbaaabbbdc",
    "cdggbbbaabbbbbaabbbgggbbbbbbbbdc",
    "cdggbbaabbbbbbbbbbbbbbbbbbbbbbdc",
    "cddddddddddddddddddddddddddddddc",
    "cccccccccccccccccccccccccccccccc",
    "................................",
    "................................",
    "................................",
    "................................",
  ];
  function wallMap(ctx, px, py) {
    drawGrid(ctx, MAP_GRID, px, py, false, PAL_MAP);
  }

  /* fire extinguisher hand-ported from 13_Conference_Hall_Black_Shadow_16x16.png
     (16x32 — one tile wide, two tall) */
  const PAL_EXTINGUISHER = {
    a: "#3a3a50",
    b: "#46465e",
    c: "#8b8bab",
    d: "#ebe4f2",
    e: "#e63f38",
    f: "#fc5c46",
    g: "#d93232",
    h: "#a82b2d",
    i: "#50a7e8",
    j: "#f8f8f8",
    k: "#565972",
    l: "#9acaef",
    m: "#6c6e85",
    n: "#b95e64",
    o: "#ff8575",
  };
  const EXTINGUISHER_GRID = [
    "................",
    "................",
    "................",
    "................",
    "........baa.....",
    "......abcccab...",
    ".....accjdaccb..",
    "....acbafnmaaa..",
    "...acbafeebma...",
    "...acbagfffba...",
    "...acbageogha...",
    "...bcbagefgha...",
    "...kckagefgha...",
    "..kck.adefgda...",
    "..bdb.aijjdia...",
    "..aeb.adllida...",
    "...a..aijjdia...",
    "......adllida...",
    "......aedddea...",
    "......ahhhhha...",
    ".......aaaaa....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
  ];
  function fireExtinguisher(ctx, px, py) {
    drawGrid(ctx, EXTINGUISHER_GRID, px, py, false, PAL_EXTINGUISHER);
  }

  /* projects-room exhibit: retro computer lab desk hand-ported from
     5_Classroom_and_library_16x16.png — beige CRT terminal on a wooden desk,
     green phosphor screen with a blinking cursor */
  const PAL_EXHIBIT_PC = {
    a: "#3a3a50",
    b: "#c78c59",
    c: "#c89264",
    d: "#42425a",
    e: "#b6a8a2",
    f: "#a79796",
    g: "#d7cdbc",
    h: "#c5b7ae",
    i: "#bb7550",
    j: "#e8c078",
    k: "#e0b870",
    l: "#cdbeaf",
    m: "#59a063",
  };
  const EXHIBIT_PC_GRID = [
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "...........aaaaaaaaaa...........",
    "..........aallllllllaa..........",
    "..........alggggggggla..........",
    "..........agggggggggga..........",
    "..........adddddddddda..........",
    "..........aeeeeeeeeeea..........",
    "..........aeddddddddea..........",
    "........aaaemmdmdmmdeaaa........",
    "........aededdddddddedea........",
    "........aedemmdmdmmdedea........",
    "........ahdeeeeeeeeeedea........",
    ".....aaaagddddddddddddeaaaa.....",
    ".....akjaggggggggggggggajba.....",
    ".....akjaddddddddddddddafba.....",
    ".....akjaehehehllllllllafba.....",
    ".....akjaehehehlheeeehlafba.....",
    ".....akjaehehehlhddddhlafba.....",
    ".....akjaehehehlheeeehlafba.....",
    ".....akjaaaaaaaaaaaaaaaafba.....",
    ".....akjkjkjkjkjkjkkjkjkjba.....",
    ".....akjaaaaaaaaaaakaaakjba.....",
    ".....akjahghghghghaaghgajba.....",
    ".....akjaghghhhghgaagggajba.....",
    ".....akjaeeeeeeeeeaaeeeajba.....",
    ".....akjaaaaaaaaaaakaaakjba.....",
    ".....aaaaaaaaaaaaaaaaaaaaaa.....",
    ".....aiiiiiiiiiiiiiiiiiiiia.....",
    ".....abcbcbcbcbcbcbcbcbbcia.....",
    ".....abcbcbcbcbcbcbcbcbbcia.....",
    ".....abcbcbcbcbcbcbcbcbbcia.....",
    ".....abcbcbcbcbcbcbcbcbbcia.....",
    ".....abcbcbcbcbcbcbcbcbbcia.....",
    ".....abcbcbcbcbcbcbcbcbbcia.....",
    ".....abcbcbcbcbcbcbcbcbbcia.....",
    ".....abcbcbcbcbcbcbcbcbbcia.....",
    ".....aaaaaaaaaaaaaaaaaaaaaa.....",
    ".....ffffffffffffffffffffff.....",
    ".....ffffffffffffffffffffff.....",
  ];

  function computerDesk(ctx, px, py, w, h, t, obj) {
    const gx = px + ((w - 32) >> 1),
      gy = py + h - 48;
    drawGrid(ctx, EXHIBIT_PC_GRID, gx, gy, false, PAL_EXHIBIT_PC);
    /* blinking cursor on the CRT */
    if (Math.floor(t * 2) % 2 === 0) {
      ctx.fillStyle = PAL_EXHIBIT_PC.m;
      ctx.fillRect(gx + 14, gy + 18, 1, 1);
    }
  }

  /* potted plants hand-ported from 1_Generic_16x16.png — a single-tile plant
     and a two-tile bush */
  const PAL_PLANT_POT = {
    a: "#3a3a50",
    b: "#465e62",
    c: "#4e6e61",
    d: "#568d61",
    e: "#6b5052",
    f: "#538261",
    g: "#529760",
    h: "#da9f7b",
    i: "#74b453",
    j: "#63a650",
    k: "#c57f68",
    l: "#b57462",
    m: "#9bc246",
    n: "#916e41",
    o: "#6b4c2c",
    p: "#e0b186",
    q: "#a79796",
    r: "#46465e",
    s: "#a9764f",
  };
  const PLANT_POT_GRID = [
    ".........bba....",
    "...baa.bbiija...",
    "..cmjgbgdggdda..",
    ".bijddjmifccbc..",
    ".baaabciiiaabda.",
    "..bgcajmigjjib..",
    "..acajggcdgjjdb.",
    "...aaidfafdddfa.",
    "..abcaacnbcaaba.",
    ".bfijfcgfcacga..",
    ".acmdbbijgdaca..",
    "..baaabafddaab..",
    "..acbaffaaabgga.",
    "...acbaaoadffda.",
    "...cffdcnbcaabc.",
    "..bijfcgfcacga..",
    "..cmdbbijgdaca..",
    "..baacbafddaa...",
    ".....acfaaaca...",
    "....rlbbocfa....",
    "...rpeannbahr...",
    "...apeosnoeha...",
    "...ehkeeeekhe...",
    "...alhhphhhla...",
    "...aeekhkkeea...",
    "....aleleela....",
    "....ekhphkle....",
    "....qehhhkeq....",
    ".....qaeaaq.....",
  ];
  function pottedPlant(ctx, px, py, w, h) {
    drawGrid(
      ctx,
      PLANT_POT_GRID,
      px + ((w - 16) >> 1),
      py + h - 29,
      false,
      PAL_PLANT_POT,
    );
  }

  const PAL_PLANT_BUSH = {
    a: "#3a3a50",
    b: "#465e62",
    c: "#4e6e61",
    d: "#568d61",
    e: "#63a650",
    f: "#529760",
    g: "#74b453",
    h: "#538261",
    i: "#6b5052",
    j: "#da9f7b",
    k: "#9bc246",
    l: "#c57f68",
    m: "#b57462",
    n: "#6b4c2c",
    o: "#916e41",
    p: "#e0b186",
    q: "#a79796",
    r: "#46465e",
    s: "#a9764f",
  };
  const PLANT_BUSH_GRID = [
    ".............bba................",
    ".......baa..bkgea....bba........",
    "......ckgeccdffbaacbbkgea.......",
    ".....bggeefbaackefbfdffdda......",
    ".....baaabckebkgggekghbbbc......",
    "......bfcbgednbbabcegeaab.......",
    "......acbaaabokggaedchfgeb......",
    ".......ckefbfdggddadahdfffa.....",
    "......bgeddekghbbbcanadhhda.....",
    "......baaabcegeaabdcsbcaabc.....",
    "......cbfcaedchfgebfocacfa......",
    "......bacbagdahdfffaefdaca......",
    "........acbaanadhhdahddaa.......",
    "........chhdcobcaabcabbc........",
    ".......bgehcfhcacfaachadb.......",
    ".......ckdbbgefdacbhbdbdc.......",
    ".......baa.bahddabcbab.ab.......",
    "..........bgehcfhcacca..........",
    "..........ckdbbgefdaegb.........",
    "..........baacbahddadec.........",
    "............rachaaacaab.........",
    "...........rpmbbnchar...........",
    "...........apinsobija...........",
    "...........ijliiiilji...........",
    "...........amjjpjjjma...........",
    "...........aiiljlliia...........",
    "............amimiima............",
    "............iljpjlmi............",
    "............qijjjliq............",
    ".............qaiaaq.............",
  ];
  function pottedBush(ctx, px, py, w, h) {
    drawGrid(
      ctx,
      PLANT_BUSH_GRID,
      px + ((w - 32) >> 1),
      py + h - 30,
      false,
      PAL_PLANT_BUSH,
    );
  }

  /* wooden stool hand-ported from 14_Basement_16x16.png; sits in front of
     the computer desks, non-solid */
  const PAL_STOOL = {
    a: "#3a3a50",
    b: "#ca8854",
    c: "#a79796",
    d: "#46465e",
    e: "#8b8bab",
    f: "#b35e3f",
    g: "#d9a16a",
    h: "#6c6e85",
  };
  const STOOL_GRID = [
    "....dddddddd....",
    "...dggbbbbbbd...",
    "..dbgbbbbbbbbd..",
    "..dbbbbbbbbbbd..",
    "..dbbbbbbbbbbd..",
    "..afbbbbbbbbfa..",
    "...affffffffa...",
    "...aaaaaaaaaa...",
    "...aha....aha...",
    "...aea....aea...",
    "...aea....aea...",
    "...aea....aea...",
    "...aea....aea...",
    "...aea....aea...",
    "...aeaccccaea...",
    "...caccccccac...",
    "....cccccccc....",
  ];
  function stool(ctx, px, py, w, h) {
    drawGrid(
      ctx,
      STOOL_GRID,
      px + ((w - 16) >> 1),
      py + h - 17,
      false,
      PAL_STOOL,
    );
  }

  /* office workstation (dark monitor on a white desk) hand-ported from
     1_Generic_16x16.png — 17x38, bottom-anchored; the screen gets
     company-colored UI lines + a nameplate on the desk front */
  const PAL_DESK_STATION = {
    a: "#3a3a50",
    b: "#faf6ee",
    c: "#787878",
    d: "#ccc2bc",
    e: "#b0b0a0",
    f: "#505068",
    g: "#615f5f",
    h: "#d8d0e0",
    i: "#f8f8f8",
  };
  const DESK_STATION_GRID = [
    ".aaaaaaaaaaaaa...",
    ".ahhhheeeeeeca...",
    ".agcccccccccga...",
    ".agcccccccccga...",
    ".agcccccccccga...",
    ".agcccchccccgaaaa",
    ".agcccihecccgahca",
    ".agccehiheccgacha",
    ".agcccccccccgagga",
    ".agcccccccccgaaaa",
    ".aaaaaaaaaaaaaddd",
    ".dddagggggadddbbb",
    ".bbbaaaaaaadddbbb",
    ".bbbdddddddbbbbbb",
    ".dddddddddddddddd",
    ".dddddddddddddddd",
    ".ffffffffffffffff",
    ".cccccccccccccccc",
    ".cccccccccccccccc",
    ".eeeeeeeeeeeeeeee",
    ".eeeeeeeeeeeeeeee",
    ".ffffffffffffffff",
    "aaaaaaaaaaaaaaaaa",
    "aabbbbbbbbbbbbbba",
    "ddbbbbbbbbbbbbbbd",
    "ddbbbbbbbbbbbbbbd",
    "ddbbbbbbbbbbbbbbd",
    "ddbbbbbbbbbbbbbbd",
    "ddbbbbbbbbbbbbbbd",
    "ddbbbbbbbbbbbbbbd",
    "aadddddddddddddda",
    "aaaaaaaaaaaaaaaaa",
    "aa..............a",
    "aa..............a",
    "aa..............a",
    "aa..............a",
    "aa..............a",
    "aa..............a",
  ];
  function deskStation(ctx, px, py, w, h, t, obj) {
    const gx = px + Math.round((w - 17) / 2),
      gy = py + h - 38;
    drawGrid(ctx, DESK_STATION_GRID, gx, gy, false, PAL_DESK_STATION);
    /* company-colored UI lines on the dark screen (avoid the cursor arrow) */
    ctx.fillStyle = (obj && obj.color) || "#58a6ff";
    const blink = (Math.sin(t * 2.5 + px * 0.3) + 1) / 2;
    ctx.fillRect(gx + 3, gy + 3, blink > 0.4 ? 6 : 3, 1);
    ctx.fillRect(gx + 3, gy + 5, 3, 1);
    ctx.fillRect(gx + 3, gy + 8, blink > 0.6 ? 7 : 5, 1);
    /* nameplate on the desk front */
    ctx.fillRect(gx + 10, gy + 25, 5, 2);
  }

  /* water dispenser hand-ported from the Modern Office sheet — round bottle
     on a dark dispenser stand, 13x30, bottom-anchored */
  const PAL_WATER_COOLER = {
    a: "#6c6e85",
    b: "#565972",
    c: "#46465e",
    d: "#3a3a50",
    e: "#91a5cf",
    f: "#8b8bab",
    g: "#3e3e50",
    h: "#bad2e0",
    i: "#e5f2f3",
    j: "#d2e7ec",
    k: "#4b4b5e",
    l: "#c2d5e0",
    m: "#5c5e72",
    n: "#717385",
    o: "#b9c3d5",
    p: "#acafbf",
    q: "#aec0d5",
    r: "#738ca8",
    s: "#9da3b7",
    t: "#7e92a8",
  };
  const WATER_COOLER_GRID = [
    "....bbkkk....",
    "...biijijk...",
    "..bieeeeejk..",
    ".bieiieeeejk.",
    ".kieihhhhejk.",
    ".kjhhhhhhhjk.",
    ".gbjhhhhhjbg.",
    ".gtmjjjjjmqg.",
    "ckqlnernneqgc",
    "cbqlliileeqbg",
    "camnliilemmag",
    "cfclnernnegag",
    "cfacliilegaag",
    "csfammmccaaag",
    "csffffffffffg",
    "bccbbbccbcggb",
    "caaaaaaaaaabd",
    "cabcccccccbbd",
    "bfcooooooocbd",
    "bfdpppppppdbd",
    "bfdbgbbbgbdbd",
    "cfdbbbbbbbdbd",
    "cacaaaaaaacbd",
    "dabcdddddcbbd",
    "daaaaaaaaaabd",
    "cddcbbcddcccc",
    "dfaaaaaaaccbd",
    "dfaaaaaaacaad",
    "daabababadcbd",
    "cbbbbbbbbdaad",
  ];
  function waterCooler(ctx, px, py, w, h) {
    drawGrid(
      ctx,
      WATER_COOLER_GRID,
      px + Math.round((w - 13) / 2),
      py + h - 30,
      false,
      PAL_WATER_COOLER,
    );
  }

  /* mounted whiteboard/dashboard (pie chart + line graph), hand-ported from
     the pack's Modern Office sheet — 30x23, hung on the top wall face
     (wallMounted, top-anchored) */
  const PAL_WHITEBOARD_CHART = {
    a: "#ebe4f2",
    b: "#3a3a50",
    c: "#c6bdd5",
    d: "#46465e",
    e: "#565972",
    f: "#8b8bab",
    g: "#fc5c46",
    h: "#50a7e8",
    i: "#b2aecb",
    j: "#689183",
    k: "#d8d0e0",
    l: "#588278",
    m: "#92cdf9",
    n: "#fca69b",
    o: "#6c6e85",
    p: "#568d61",
    q: "#4995e3",
    r: "#cb2a2a",
  };
  const WHITEBOARD_CHART_GRID = [
    "...bb....................bb...",
    "eddeebbddddddddddddddddddeebbe",
    "daaaaaaaaaaaaaaaaaaaaaaaaaaakd",
    "bccccccccccccccccccccccccccccb",
    "bcoedddbbbddeeedddbbbbbbbbdecb",
    "dceaaaaaaaaaaaaaaaaaaaaaaaadcb",
    "dceaaaaaaaaaiiaiaaaaaaaaaaabcb",
    "eceaaaaaaaaaaaacjlljlljljlabcb",
    "eceaaagggghaaaaiaahaamaaaaabcb",
    "eceaagggghhhaaacahaaaamhhmabcb",
    "dcdagggghhhhhaaiamagnaaaaaabcb",
    "bcdacccgjhhhhaacmagaanaaaaabcb",
    "bcbaccccjjjjjaaihnaaaagaagabcb",
    "bcbaacccjjjjaaacgaaaaaagnaabcb",
    "bcbaaacccjjaaiigciciciciciabcb",
    "bcbaaaaaaaaaaaaiaaaaaaaaaaadcb",
    "bcdaaaaaaaaaaaaiaeaaaeaaieadcb",
    "bcebbebbbbebbbbbepbbeqbberbecb",
    "dccccbffffbkkkkkdabkdabkdabkcd",
    "edbbbbeeeebbbbdddkbddkbbdkbbde",
    "daaaaebbbbeaaaaadebabebabebaad",
    "bffffffffffffffffffffffffffffb",
    "ddbbbbbbbbbbbbbbbbbbbbbbbbbbde",
  ];
  function whiteboard(ctx, px, py, w, h) {
    drawGrid(
      ctx,
      WHITEBOARD_CHART_GRID,
      px + Math.round((w - 30) / 2),
      py,
      false,
      PAL_WHITEBOARD_CHART,
    );
  }

  /* pack library bookshelf (Classroom_and_library, warm red-brown variant) —
     47x39 px drawn bottom-anchored on a 3x2-tile footprint; the extra 7 px of
     height overlap the wall face when placed against the top wall, like the
     pack's reference rooms */
  const PAL_BOOKSHELF = {
    a: "#3a3a50",
    b: "#46465e",
    c: "#ca8854",
    d: "#b35e3f",
    e: "#ab4a36",
    f: "#e86419",
    g: "#b95d72",
    h: "#ed931e",
    i: "#a13a30",
    j: "#f2b22b",
    k: "#a17f6c",
    l: "#6b4b30",
    m: "#3d56d2",
    n: "#e0d0b2",
    o: "#e07070",
    p: "#b99e86",
    q: "#d9a16a",
    r: "#ab9078",
    s: "#568d61",
    t: "#b8d040",
    u: "#deb2bc",
    v: "#8e595c",
    w: "#b2977e",
    x: "#e7c378",
    y: "#9bc246",
    z: "#4280dd",
    A: "#d0be9c",
    B: "#565972",
    C: "#887044",
    D: "#8b8bab",
  };
  const BOOKSHELF_GRID = [
    "bbb.........................................bbb",
    "bqbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqb",
    "bqbdcqqqqqcqcccccccccccccccccccccccccccccccdbqb",
    "bcadcccccccccccccccccccccccccccccccccccccccdbca",
    "bqadcccccccccccccccccccccccccccccccccccccccdbqa",
    "bcadcccccccccccccccccccccccccccccccccccccccdbca",
    "bdadcccccccccccccccccccccccccccccccccccccccdada",
    "bdaedddddddddddddddddddddddddddddddddddddddeada",
    "bdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaada",
    "bdahbAbhhbhbeayyarraiibeaooaooaiibeahbhboobhada",
    "bdajbAbffbjbcassakkaiibcaggaggaiibdajbjbggbjada",
    "adafbpbffbfbdassbkkbeebcaggbggbeebdafbfbnubfada",
    "adafbpbytbfbdajhbvvbeebdanubnubeebdafbfbnubfada",
    "bdatbtbffbtbdajhbvvbeebcanubnubeebdatbtbggbtada",
    "adafbpbaabfbdassbkkbdcbdaggbggbdcbdafbfbaabfada",
    "adabbbbdcbbbdaaaaaaadcbdaaaaaaadcbdabbbbdcbbada",
    "adadcccccccbdadcccccccbdadcccccccbdadcccccccada",
    "adaabbbbbbbbdaabbbbbbbbdaabbbbbbbbdaabbbbbbbaca",
    "adazzazzaiibdaobzbiaCCbdahbhbhhbhbdappppazaiaca",
    "adammammaiibdaobzbibllbdajbjbffbjbdaDDDDamaiaca",
    "adammbmmbeebdaggbmbBllbdafbfbffbfbcappppbmbeaca",
    "adajhbjhbeebdabhbhbbjhbdafbfbytbfbcaAAAAbjbeaca",
    "adajhbjhbeebcablhlhBjhbdatbtbffbtbcannnpbjbeada",
    "adammbmmbdcbcadbgbmbllbdafbfbaabfbdannnpbmbdaca",
    "adaaaaaaadcbcadbbbbBaabdabbbbdcbbbdaaaaaaaadada",
    "adaccccccccbcadcccccccbdadcccccccbdadcccccccada",
    "adaabbbbbbbbdaabbbbbbbbcaabbbbbbbbcaabbbbbbbada",
    "adaooaooaiibdarrrbrrrabdaybybiaCCbcaobiibrrrada",
    "adaggaggaiibdawwwbwwwabcaybybibllbdaobiibwwwada",
    "adaggbggbeebdakvkakvkabcassbsbBllbdaggbebkvkada",
    "adanubnubeebdajjjajjjabdabhbhbbjhbdabhbebjjjada",
    "adanubnubeebdaxxxaxxxabdablhlhBjhbdablhlaxxxada",
    "adaggbggbdcbdakvkakvkabdadbsbsbllbdadbgbakvkada",
    "adaaaaaaadcbdaaaaaaaaabdadbbbbBaabdadbbbaaaaada",
    "adadcccccccbdadcccccccbdadcccccccbdadcccccccada",
    "adaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaada",
    "adaieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeada",
    "aiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaia",
    "aaa.........................................aaa",
  ];
  function bookshelf(ctx, px, py, w, h) {
    drawGrid(
      ctx,
      BOOKSHELF_GRID,
      px + Math.round((w - 47) / 2),
      py + h - 39,
      false,
      PAL_BOOKSHELF,
    );
  }

  /* framed award/certificate icons hand-ported from
     Modern_Office_Shadowless_16x16.png — one per school, ribbon-colored to
     match each dialog's crestColor (blue @ 112,128 for VIT, red @ 128,160
     for NEU); 16x32 crop with the icon sitting in the bottom 16 rows */
  const PAL_DIPLOMA_VIT = {
    a: "#d8d0e0",
    b: "#3a3a50",
    c: "#c6bdd5",
    d: "#8b8bab",
    e: "#46465e",
    f: "#9da3b7",
    g: "#b1bac8",
    h: "#565972",
    i: "#d0c7db",
    j: "#db8641",
    k: "#4280dd",
    l: "#4995e3",
    m: "#f2b22b",
    n: "#ed931e",
    o: "#f8d239",
    p: "#fff59a",
  };
  const DIPLOMA_VIT_GRID = [
    ".heehhheeheeeeh.",
    ".egggggggggggge.",
    ".bfaaaaaaaaaafb.",
    ".bficcccccciafb.",
    ".efaaaaaaaaaafb.",
    ".hfaklaaccccafb.",
    ".hfalkaaaaaaadb.",
    ".hfaklaaccccadb.",
    ".efamnaaaaaaadb.",
    ".bfmpojaccccadb.",
    ".bfnomjaaaaaadb.",
    ".bfajjaaaaaaadb.",
    ".bfaaaacicicadb.",
    ".bfaaaaccaciadb.",
    ".edddddddddddde.",
    ".hebbbbbbbbbbeh.",
  ];
  const PAL_DIPLOMA_NEU = {
    a: "#d8d0e0",
    b: "#3a3a50",
    c: "#c6bdd5",
    d: "#8b8bab",
    e: "#46465e",
    f: "#9da3b7",
    g: "#b1bac8",
    h: "#565972",
    i: "#d0c7db",
    j: "#db8641",
    k: "#e63f38",
    l: "#fc5c46",
    m: "#f2b22b",
    n: "#ed931e",
    o: "#f8d239",
    p: "#fff59a",
  };
  const DIPLOMA_NEU_GRID = [
    ".heehhheeheeeeh.",
    ".egggggggggggge.",
    ".bfaaaaaaaaaafb.",
    ".bficcccccccifb.",
    ".efaaaaaaaaaafb.",
    ".hfaklaacccicfb.",
    ".hfalkaaaaaaadb.",
    ".hfaklaacccicdb.",
    ".efamnaaaaaaadb.",
    ".bfmpojacccicdb.",
    ".bfnomjaaaaaadb.",
    ".bfajjaaaaaaadb.",
    ".bfaaaacicicidb.",
    ".bfaaaaccacicdb.",
    ".edddddddddddde.",
    ".hebbbbbbbbbbeh.",
  ];
  function diploma(ctx, px, py, w, h, t, obj) {
    const vit = obj && obj.school === "vit";
    drawGrid(
      ctx,
      vit ? DIPLOMA_VIT_GRID : DIPLOMA_NEU_GRID,
      px + Math.round((w - 16) / 2),
      py + h - 16,
      false,
      vit ? PAL_DIPLOMA_VIT : PAL_DIPLOMA_NEU,
    );
  }

  /* pack open-book display stand (Classroom_and_library) — 17x29 px,
     bottom-anchored; replaces the procedural glowing lectern for the paper */
  const PAL_BOOKSTAND = {
    a: "#3a3a50",
    b: "#ebe4f2",
    c: "#b99e86",
    d: "#9c786b",
    e: "#d0be9c",
    f: "#46465e",
    g: "#916662",
    h: "#565972",
    i: "#c6bdd5",
    j: "#b2aecb",
    k: "#d8d0e0",
    l: "#e63f38",
    m: "#e0d0b2",
    n: "#d93232",
    o: "#ca8854",
    p: "#a82b52",
    q: "#fc5c46",
  };
  const BOOKSTAND_GRID = [
    "...ffaaa.aaaff...",
    ".haibbbbqbbbbiaa.",
    "hmaijbjblkbjbiada",
    "hmaibbbbljbkjiada",
    "fmaikbjblbbbbiada",
    "feaikbjbnkjkbiada",
    "heaibbbbnbbbbiada",
    "feaohhfgnohhfoaga",
    "ahffeeelafeeeffha",
    "accccccpcccccccda",
    "aaaaaaapaaaaaaaaa",
    ".......aga.......",
    ".......aga.......",
    "......fedea......",
    "......accca......",
    ".......aga.......",
    ".......aca.......",
    "......hedea......",
    "......fccca......",
    "......adcda......",
    ".....aadddaa.....",
    "....acagdgaca....",
    "....acagggaca....",
    "...afcgaaagcaa...",
    "..adheeeeeeeada..",
    "..aaadddddddaaa..",
    "....aafcdgaaa....",
    ".......fda.......",
    "........a........",
  ];
  function lectern(ctx, px, py, w, h) {
    drawGrid(
      ctx,
      BOOKSTAND_GRID,
      px + Math.round((w - 17) / 2),
      py + h - 29,
      false,
      PAL_BOOKSTAND,
    );
  }

  function printer(ctx, px, py, w, h, t) {
    shadow(ctx, px, py + h, w);
    ctx.fillStyle = "#464f5d";
    ctx.fillRect(px, py + 3, w, h - 3);
    ctx.fillStyle = "#30363d";
    ctx.fillRect(px + 2, py + 5, w - 4, 3);
    /* paper feeding out */
    const feed = Math.floor(t * 2) % 4;
    ctx.fillStyle = "#e6edf3";
    ctx.fillRect(px + 3, py - feed, w - 6, 3 + feed);
    ctx.fillStyle = "#8b949e";
    ctx.fillRect(px + 4, py - feed + 1, w - 9, 1);
  }

  /* lobby resume copier — a desktop multifunction printer/copier hand-ported
     from the pack's Modern Office sheet (Modern_Office_Shadowless_16x16.png
     @ 130,297, "desktop printer/scanner unit"). Bottom-anchored, centered on
     its furniture rect so it stands on the floor against the north wall. */
  const PAL_COPIER = {
    a: "#ebe4f2",
    b: "#46465e",
    c: "#3a3a50",
    d: "#8b8bab",
    e: "#565972",
    f: "#7e7f94",
    g: "#d8d0e0",
    h: "#c6bdd5",
    i: "#b2aecb",
    j: "#6c6e85",
    k: "#b1bac8",
    l: "#9da3b7",
    m: "#54467f",
    n: "#568d61",
    o: "#50a7e8",
    p: "#4c4e8f",
    q: "#cb2a2a",
    r: "#64b63b",
    s: "#46756a",
    t: "#f2b22b",
  };
  const COPIER_GRID = [
    "............................",
    "..............ebbbbbbbe.....",
    "..............baaaaaaab.....",
    "..............cgggggggc.....",
    "..............cgggggggc.....",
    "...........ebcbgggggggbcbe..",
    "...........bdfehhhhhhhejfb..",
    "...........bldfffffffffddb..",
    "...........blddddddddddddb..",
    ".ebbbbbbbe.bdddddddddddddb..",
    ".baaaaaaaeebjdddddddddddjb..",
    ".baaaaaaaebebejjjjjjjjjebe..",
    ".baaaaaaaecbefffpmbbfakaeb..",
    ".baaaaaaaecceqrfmcccfkakec..",
    ".baaaaaaaeccefffffffffffec..",
    ".baaaaaaaeccbcbbeebbbbbcbc..",
    ".baaaaaaaecbcecgnsngdgcecb..",
    ".ehhhhhhhec..ccaotoadacc....",
    "..biiiiiiic...caaaaaaac.....",
    "..biiiiiiic...bcccccccb.....",
    "..ebccccccb.................",
  ];
  /* the copier sits on the pack's tan office desk (DESK_TAN_GRID) used as a
     table, mirroring contactDesk — desk bottom-anchored on the rect, copier
     centered on the tabletop with its base resting on the desk surface
     (base line dy+15, as cubicle/contactDesk deskItems do). */
  function copier(ctx, px, py, w, h) {
    const deskW = 42;
    const dx = px + Math.round((w - deskW) / 2);
    const dy = py + h - 23;
    shadow(ctx, dx, py + h, deskW);
    drawGrid(ctx, DESK_TAN_GRID, dx, dy, false, PAL_DESK_TAN);
    drawGrid(
      ctx,
      COPIER_GRID,
      dx + Math.round((deskW - 28) / 2),
      dy + 15 - COPIER_GRID.length,
      false,
      PAL_COPIER,
    );
  }

  /* copier machine ONLY (no desk) — for the contact room, where it sits on the
     right half of contactDesk's shared long desk. Centered on its rect at the
     same desktop base line (dy+15) so it lines up with that desk's phone/
     printer. game.js maps this painter to resume mode, same as `copier`. */
  function resumeCopier(ctx, px, py, w, h) {
    const dy = py + h - 23;
    drawGrid(
      ctx,
      COPIER_GRID,
      px + Math.round((w - 28) / 2),
      dy + 15 - COPIER_GRID.length,
      false,
      PAL_COPIER,
    );
  }

  /* ─── server rack ────────────────────────────────────────────────────────
     Double-door server cabinet hand-ported from 18_Jail_Shadowless.png
     (32x34 @ 128,330), drawn ~1.6x scale (crisp nearest-neighbor) so it reads
     as a floor-standing rack in the contact room. */
  const PAL_SERVER_RACK_JAIL = {
    a: "#3a3a50",
    b: "#acafbf",
    c: "#626976",
    d: "#838897",
    e: "#6c737d",
    f: "#46465e",
    g: "#7e8791",
    h: "#565972",
    i: "#6c6e85",
    j: "#5a606e",
    k: "#945656",
    l: "#5f8657",
    m: "#76808c",
    n: "#57809e",
    o: "#838f9a",
    p: "#7d8791",
    q: "#545668",
    r: "#8f9ca6",
    s: "#88949e",
    t: "#87909c",
  };
  const SERVER_RACK_JAIL_GRID = [
    "hfaaaaaaaaaaaafhhfaaaaaaaaaaaafh",
    "fbbbbbbbbbbbbbbffbbbbbbbbbbbbbbf",
    "fbbbbbbbbbbbbbbafbbbbbbbbbbbbbba",
    "abbbbbbbbbbbbbbaabbbbbbbbbbbbbba",
    "abbbbbbbbbbbbbbaabbbbbbbbbbbbbba",
    "abbbbbbbbbbbbbbaabbbbbbbbbbbbbba",
    "abbbbbbbbbbbbbbaabbbbbbbbbbbbbba",
    "abbbbbbbbbbbbbbaabbbbbbbbbbbbbba",
    "ffhihfffhfffffffffhihfffhfffffff",
    "addddddddddddddaadddddddddddddda",
    "adhfaaaaaaaafhdaadhfaaaaaaaafhda",
    "adfnekekelegefdaadfnekekelegefda",
    "adajommccccccadaadajommccccccada",
    "fdflekegelekeadafdflekegelekeada",
    "fdfjmccccccccadafdfjmccccccccada",
    "hdfgeneleleneadahdfgeneleleneada",
    "hdfjcccccccccadahdfjcccccccccada",
    "hdfgenelenektadahdfgenelenektada",
    "fdfjccccccccqhdafdfjccccccccqhda",
    "fdfnekeleleehdiafdfnekeleleehdia",
    "hdfjccccccccfdhahdfjccccccccfdha",
    "fdfgekegeleefdhafdfgekegeleefdha",
    "fdfjcccccccchdiafdfjcccccccchdia",
    "adfgegekegekehdaadfgegekegekehda",
    "adfjcccccccccfdaadfjcccccccccfda",
    "adfgekekelekeadaadfgekekelekeada",
    "adajccccccccmadaadajccccccccmada",
    "adalekegenegpadaadalekegenegpada",
    "adajccccccccoadaadajccccccccoada",
    "adalekekelprsadaadalekekelprsada",
    "adajcccccccccadaadajcccccccccada",
    "adfaaaaaaaaaafdaadfaaaaaaaaaafda",
    "aiiiiiiiiiiiiiiaaiiiiiiiiiiiiiia",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  ];
  const SERVER_RACK_SCALE = 1.6;

  /* nearest-neighbor scale of a string-grid — each source cell becomes an
     integer-pixel block (rounded edges) so it stays crisp under the canvas's
     outer pixelated scaling. `override(ch, r, c)` may return a replacement
     color string per cell (falsy → use the palette). `flipX` mirrors the grid
     horizontally (source column read right-to-left). */
  function drawGridScaled(ctx, grid, px, py, pal, s, override, flipX) {
    const colors = pal || PAL;
    for (let r = 0; r < grid.length; r++) {
      const row = grid[r];
      const y0 = py + Math.round(r * s);
      const y1 = py + Math.round((r + 1) * s);
      for (let c = 0; c < row.length; c++) {
        const sc = flipX ? row.length - 1 - c : c;
        const ch = row[sc];
        if (ch === ".") continue;
        const col = (override && override(ch, r, sc)) || colors[ch];
        if (!col) continue;
        const x0 = px + Math.round(c * s);
        const x1 = px + Math.round((c + 1) * s);
        ctx.fillStyle = col;
        ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
      }
    }
  }

  /* the rack's colored LED chars → bright "on" / dim "off" colors, flickered
     randomly. On uses the site's GitHub-dark accents so the lit LEDs pop. */
  const RACK_LED_ON = { n: "#58a6ff", k: "#ff5f56", l: "#3fb950" };
  const RACK_LED_OFF = { n: "#2f3d4a", k: "#3d2f2f", l: "#2f3d2f" };

  /* server rack — bottom-anchored & centered on its furniture rect. The blue/
     red/green LED cells (n/k/l) flicker independently, ~6 changes/sec, so the
     rack reads as live. Frozen on its lit frame under reduced motion. */
  function serverRack(ctx, px, py, w, h, t, obj) {
    const s = SERVER_RACK_SCALE;
    const gw = Math.round(SERVER_RACK_JAIL_GRID[0].length * s);
    const gh = Math.round(SERVER_RACK_JAIL_GRID.length * s);
    const gx = px + Math.round((w - gw) / 2);
    const gy = py + h - gh;
    const still = window.UI && window.UI.reduceMotion;
    const frame = still ? 0 : Math.floor(t * 6);
    /* seed the flicker with px+py so multiple cabinets blink independently */
    const seed = Math.round(px) * 1000 + Math.round(py);
    const ledOverride = function (ch, r, c) {
      if (!RACK_LED_ON[ch]) return null;
      return hash2(seed + r * 40 + c, frame) < 60 ? RACK_LED_ON[ch] : RACK_LED_OFF[ch];
    };
    shadow(ctx, gx, py + h, gw);
    drawGridScaled(ctx, SERVER_RACK_JAIL_GRID, gx, gy, PAL_SERVER_RACK_JAIL, s, ledOverride, obj && obj.flip);
  }

  function trophyBig(ctx, px, py, w, h, t) {
    const pulse = (Math.sin(t * 3) + 1) / 2;
    ctx.fillStyle = "#e3b341";
    ctx.fillRect(px + w / 2 - 4, py + 2, 8, 6); // cup
    ctx.fillRect(px + w / 2 - 6, py + 3, 2, 3); // handles
    ctx.fillRect(px + w / 2 + 4, py + 3, 2, 3);
    ctx.fillRect(px + w / 2 - 2, py + 8, 4, 2); // stem
    ctx.fillRect(px + w / 2 - 4, py + 10, 8, 2); // base
    ctx.fillStyle = "#fff8c5";
    ctx.fillRect(px + w / 2 - 3, py + 3, 2, 2); // shine
    if (pulse > 0.6) {
      ctx.fillRect(px + w / 2 + 5, py, 1, 1);
      ctx.fillRect(px + w / 2 - 7, py + 6, 1, 1);
    }
  }

  /* lobby reception counter hand-ported from 19_Hospital_16x16.png (central
     U without the outer wings), then reworked: the back monitor-desk strip
     is removed (open behind the receptionist), the counter is stretched to
     96x37 px (6 tiles wide), and the tan ramp is remapped to the pack's
     whites. One piece: the receptionist inside the U never overlaps the
     arms, and the front counter (bottom of the rect) sorts over her feet. */
  const PAL_RECEPTION_COUNTER = {
    a: "#ebe4f2",
    b: "#3a3a50",
    c: "#46465e",
    d: "#cac3d5",
    e: "#565972",
    f: "#918dae",
    g: "#a79796",
    h: "#d8d0e0",
    i: "#b8b5cb",
    j: "#d4dee6",
    k: "#b9c3d5",
    l: "#525269",
    m: "#6c6e85",
    p: "#8b8bab",
    q: "#838897",
  };
  const RECEPTION_COUNTER_GRID = [
    ".lcbbbbbbbbbbcl.................................................................lcbbbbbbbbbbcl..",
    ".caaaaaaaaaaahc.................................................................caaaaaaaaaaadc..",
    ".baaaaaaaaaaahb.................................................................baaaaaaaaaaahb..",
    ".baaaaaaaaaaahb.................................................................baaaaaaaaaaahb..",
    ".baaaaaaaaaaahb.................................................................baaaaaaaaaaahb..",
    ".baaaaaaaaaaahb.................................................................baaaaaaaaaaahb..",
    ".baaaaaaaaaaahb.................................................................laaaaaaaaaaahb..",
    ".laaaaaaaaaaahb.................................................................laaaaaaaaaaahb..",
    ".laaaaaaaaaaahb.................................................................laaaaaaaaaaahb..",
    ".laaaaaaaaaaahb.................................................................baaaaaaaaaaahb..",
    ".laaaaaaaaaaahb.................................................................baaaaaaaaaaahb..",
    ".laaaaaaaaaaahb.................................................................lhaaaaaaaaaahb..",
    ".baaaaaaaaaaahb.................................................................baaaaaaaaaaahb..",
    ".baaaaaaaaaaahb.................................................................baaaaaaaaaaahb..",
    ".laaaaaaaaaaahb.................................................................baaaaaaaaaaahb..",
    ".baaaaaaaaaaahl.................................................................laaaaaaaaaaahb..",
    ".baaaaaaaaaaahflbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblfaaaaaaaaaaahb..",
    ".baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahaaaaaaaaaaaaaaaaaaahb..",
    ".baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahaaaaaaaaaaaaaaaaaaahb..",
    ".baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahb..",
    ".baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahb..",
    ".baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahb..",
    ".baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahb..",
    ".baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahb..",
    ".baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahb..",
    ".faaaaaaahaaaaaaaaaaaahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahaaaaaahf..",
    ".bddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddib..",
    ".lbbbbbbbbbbblfflblbbbbllbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblbbbbbbbbllblfflbbbbbbbbbbbl..",
    "..biiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiib...",
    "..bdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddb...",
    "..ceeeeeeeeeeeeemeeeemmeeemeeeeeemmpppmeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeemeeeeeeeeeeeeec...",
    "..ejjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjq...",
    "..ekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkke...",
    "..ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc...",
    "..gbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbg...",
    "..geccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceg...",
    "..ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg...",
  ];

  /* ── office cubicles — hand-ported from Modern_Office_Shadowless_16x16.png
     (the pack's partition rail @ (13,420), plain desks @ (114,457)/(162,457),
     monitor+keyboard set @ (224,450), dual-monitor arm rig @ (160,560),
     office chair back view @ (0,137), paper tray scraps @ (0,238)) ───────── */

  /* partition colors: dark outline, light post top, shadowed post, rail
     highlight, panel body + light stripe */
  const PAL_PARTITION = {
    outline: "#3a3a50",
    outline2: "#46465e",
    postLite: "#dad4e0",
    postDark: "#9da3b7",
    joint: "#565972",
    rail: "#b9c3d5",
    panel: "#b1bac8",
    shadow: "#9da3b7",
  };

  const PAL_DESK_TAN = {
    a: "#d0be9c",
    b: "#3a3a50",
    c: "#9c786b",
    d: "#46465e",
    e: "#caab8b",
    f: "#565972",
    g: "#e0d0b2",
    h: "#838897",
    i: "#acafbf",
  };
  const DESK_TAN_GRID = [
    "ffdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbd.",
    "daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baggaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baggaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baggaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeb.",
    "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaed.",
    "ddbbbbbbdddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbd.",
    "bcccccccccccccccccccccccccccccccccccccccb.",
    "ddffdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdffdd.",
    ".bhhb...............................bhhb..",
    ".biib...............................biib..",
    ".dffd...............................dffd..",
  ];
  /* widen the 42-col tan desk into one continuous run of `targetW` columns:
     keep the capped/legged left (12 cols) and right (8 cols) and repeat the
     plain middle column between them — a single long desk with legs only at the
     ends, no internal edge or seam. Used by contactDesk (84px) so its phone/
     printer half and the resume-copier half read as one table. */
  function deskRun(grid, targetW) {
    const W0 = grid[0].length;
    const L = 12,
      R = 8;
    return grid.map(function (row) {
      const fill = row[Math.floor(W0 / 2)];
      return row.slice(0, L) + fill.repeat(targetW - L - R) + row.slice(W0 - R);
    });
  }
  const DESK_TAN_84 = deskRun(DESK_TAN_GRID, 84);

  /* contact-room computer: a compact monitor+tower+keyboard workstation
     hand-ported from Interiors_16x16.png @ (112,752) — 16x32. It sits on a
     short tan office table (the DESK_TAN run narrowed to 32px, same table as
     contactDesk) so it reads as a computer on a desk; replaces the wider
     exhibit PC. Opens the links terminal (see game.js painter check). */
  const PAL_CONTACT_PC = {
    a: "#3a3a50",
    b: "#42425a",
    c: "#b6a8a2",
    d: "#d7cdbc",
    e: "#c5b7ae",
    f: "#cdbeaf",
    g: "#59a063",
  };
  const CONTACT_PC_GRID = [
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "...aaaaaaaaaa...",
    "..aaffffffffaa..",
    "..afddddddddfa..",
    "..adddddddddda..",
    "..abbbbbbbbbba..",
    "..acccccccccca..",
    "..acbbbbbbbbca..",
    "aaacggbgbggbcaaa",
    "acbcbbbbbbbbcbca",
    "acbcggbgbggbcbca",
    "aebccccccccccbca",
    "adbbbbbbbbbbbbca",
    "adddddddddddddda",
    "abbbbbbbbbbbbbba",
    "acececeffffffffa",
    "acececefeccccefa",
    "acececefebbbbefa",
    "acececefeccccefa",
    "aaaaaaaaaaaaaaaa",
    "................",
    "aaaaaaaaaaa.aaa.",
    "aededededeaadeda",
    "adedeeededaaddda",
    "acccccccccaaccca",
    "aaaaaaaaaaa.aaa.",
  ];
  const CONTACT_PC_TABLE = deskRun(DESK_TAN_GRID, 32);
  function contactPC(ctx, px, py, w, h) {
    const tableW = 32;
    const dx = px + Math.round((w - tableW) / 2);
    const dy = py + h - 23;
    shadow(ctx, dx, py + h, tableW);
    drawGrid(ctx, CONTACT_PC_TABLE, dx, dy, false, PAL_DESK_TAN);
    /* computer base (keyboard) resting on the desktop surface (dy+15) */
    const cx = px + Math.round((w - CONTACT_PC_GRID[0].length) / 2);
    drawGrid(
      ctx,
      CONTACT_PC_GRID,
      cx,
      dy + 15 - CONTACT_PC_GRID.length,
      false,
      PAL_CONTACT_PC,
    );
  }

  const PAL_DESK_GRAY = {
    a: "#787878",
    b: "#808079",
    c: "#3a3a50",
    d: "#615f5f",
    e: "#46465e",
    f: "#6d6b6b",
    g: "#565972",
    h: "#838897",
    i: "#acafbf",
    j: "#8c8d83",
    k: "#888882",
  };
  const DESK_GRAY_GRID = [
    "ggeccccccccccccccccccccccccccccccccccccce.",
    "eabababababababababababababababababababfc.",
    "gbababababababababababababababababababafc.",
    "cajkbabababababababababababababababababfc.",
    "cbkjabababababababababababababababababafc.",
    "cabababababababababababababababababababfc.",
    "cbkjabababababababababababababababababafc.",
    "cabababababababababababababababababababfc.",
    "cbababababababababababababababababababafc.",
    "cabababababababababababababababababababfc.",
    "cbababababababababababababababababababafc.",
    "cabababababababababababababababababababfc.",
    "cbababababababababababababababababababafc.",
    "cabababababababababababababababababababfc.",
    "cbababababababababababababababababababafc.",
    "cabababababababababababababababababababfc.",
    "cbababababababababababababababababababafe.",
    "eecccccceeeccccccccccccccccccccccccccccce.",
    "cdddddddddddddddddddddddddddddddddddddddc.",
    "eeggeccccccccccccccccccccccccccccccceggee.",
    ".chhc...............................chhc..",
    ".ciic...............................ciic..",
    ".egge...............................egge..",
  ];

  /* single monitor (blue browser screen) + keyboard + mouse */
  const PAL_MONSET = {
    a: "#4280dd",
    b: "#3a3a50",
    c: "#acafbf",
    d: "#46465e",
    e: "#dde4eb",
    f: "#6c6e85",
    g: "#565972",
    h: "#1652b9",
    i: "#8b8bab",
    j: "#d8d0e0",
    k: "#50a7e8",
    l: "#717491",
    m: "#d4dee6",
    n: "#838897",
    o: "#b9c3d5",
    p: "#cb2a2a",
    q: "#f8d239",
  };
  const MONSET_GRID = [
    "gddggddddddddddg",
    "deeeeeeeeeeeeeed",
    "bccccccccccccccb",
    "bckapaaaaajajacb",
    "bcaaaaaaaaaaaacb",
    "bckaqaaaaajajacb",
    "bcaaaaaaaaaaaacb",
    "bckakaaaaajajacb",
    "bcahahhhhhhhhhcb",
    "dccccccccccccccd",
    "gdbbbbddbbbbbbdg",
    "....bmbnnbmb..di",
    "....doccccod...d",
    ".....dbbbbd.....",
    "................",
    "................",
    "................",
    ".............dg.",
    ".dggddgddd..dlid",
    "dfififififd.dffd",
    "bifilllifib.bffb",
    ".bbbbbbbbb...bb.",
  ];

  /* dual angled monitors on an arm stand */
  const PAL_DUALRIG = {
    a: "#3a3a50",
    b: "#565972",
    c: "#46465e",
    d: "#6c6e85",
    e: "#4280dd",
    f: "#60637d",
    g: "#1652b9",
    h: "#d8d0e0",
    i: "#50a7e8",
    j: "#8b8bab",
    k: "#4c4c66",
    l: "#cb2a2a",
  };
  const DUALRIG_GRID = [
    ".bccb............",
    ".cfddccb.........",
    ".abbfdddbccb.....",
    ".abhebbfddddccb..",
    ".abeeheebbbfdddc.",
    ".abheeebcbeebbfc.",
    ".afeehecdceieefc.",
    ".abggeeajaeeeifa.",
    ".afbbggadaeleedc.",
    "..accfbajaeeeidb.",
    ".....aaajabgggfc.",
    "....akaadaacbbfa.",
    "....abdadabcaaac.",
    ".....abadaka.....",
    "......cadaa......",
    ".......ada.......",
    ".......ccc.......",
    ".......aba.......",
    ".......aba.......",
    "......cabac......",
    "......aabaa......",
    "......aaa........",
  ];

  /* flat paper pile with colored tabs (bottom rows of the pack's doc tray) */
  const PAL_PAPERS = {
    a: "#3a3a50",
    b: "#ebe4f2",
    d: "#8b8bab",
    e: "#46465e",
    f: "#565972",
    h: "#afacc8",
    j: "#e63f38",
    k: "#d93232",
    n: "#f2b22b",
    o: "#ed931e",
  };
  const PAPERS_GRID = ["ahbbjbbbbnbbfa", "edddkddddoddda", "feaaaaaaaaaaef"];

  /* per-cubicle desktop clutter (PC tower/filing unit + monitor + a coworker
     peeking over the top), hand-ported from the pack's "IT support desk
     assemblage" row — one distinct crop per experience entry, replacing the
     generic monitor rig + paper pile on that desk */
  const PAL_DESKSET_QUANTU = {
    a: "#3a3a50",
    b: "#46465e",
    c: "#b9c3d5",
    d: "#acafbf",
    e: "#838897",
    f: "#565972",
    g: "#4280dd",
    h: "#d8d0e0",
    i: "#6c6e85",
    j: "#d4dee6",
    k: "#afacc8",
    l: "#dde4eb",
    m: "#1652b9",
    n: "#a79796",
    o: "#fdfcfd",
    p: "#8b8bab",
    q: "#60637d",
    r: "#50a7e8",
    s: "#cb2a2a",
    t: "#f8f8f8",
    u: "#64b63b",
    v: "#f8d239",
  };
  const DESKSET_QUANTU_GRID = [
    ".........................bbf........",
    "........................adjcba......",
    "......................afjojdfea.....",
    ".....................bjjoodeaada....",
    ".....................aeocdea..aja...",
    ".....................btfeea.a..aja..",
    "......................bjbeb..a..aja.",
    ".......................faf....a..afa",
    "............fbbbbbbbbbbf.......aaiea",
    "............bccccccccccb........afa.",
    "............adggggggggda.......ada..",
    ".bbb........adrgsggghgda...abbfdb...",
    "bcccabfb....adggggggggda..accfdfa...",
    "blccbciua...adrgvggghgda.addbebdda..",
    "alccbqlia...adgmgmmmmmda.aijdddjia..",
    "acccbcisa...bddddddddddb.naiiebaa...",
    "blccbqiia...fbfbbbbbbfbf..naabhha...",
    "fcccbclla...bcdccccccdcbn...bhhhha..",
    "beeeaqiia...acejejejejcan..bhkpkhha.",
    "abbbbbbba...acjejejejecan.fhhhkpkhka",
    "faaaaaaaf...accciificccanfhkphhkhkia",
    "............acjjffffcccaaihhkphhkia.",
    "............beeeeeeeeeeb.aihhkhkia..",
    "............fbaaaaaaaabf..aihhkia...",
    "...........................aikia....",
    "............................aaa.....",
  ];

  const PAL_DESKSET_NEUTA = {
    a: "#3a3a50",
    b: "#46465e",
    c: "#4280dd",
    d: "#565972",
    e: "#6c6e85",
    f: "#60637d",
    g: "#b9c3d5",
    h: "#1652b9",
    i: "#acafbf",
    j: "#d8d0e0",
    k: "#8b8bab",
    l: "#50a7e8",
    m: "#d4dee6",
    n: "#f2b22b",
    o: "#f69784",
    p: "#dde4eb",
    q: "#ffb893",
    r: "#717491",
    s: "#cb2a2a",
    t: "#f8d239",
    u: "#e63f38",
    v: "#838897",
    w: "#4c4c66",
    x: "#ed931e",
    y: "#64b63b",
    z: "#e07070",
  };
  const DESKSET_NEUTA_GRID = [
    "...........dbbd...........................",
    "........dbbeefb.dbbddbbbbbbbbbbd..........",
    "....dbbdeeefdda.beeeeeeeeeeeeeeb..........",
    ".dbbeeeefddcjda.affffffffffffffa..........",
    "beeefdddccjccda.aflcscccccjcjcda..........",
    "bfddccccjcccjda.afccccccccccccda..........",
    "bfcclcccccjccfa.aflctcccccjcjcda..........",
    "aflcccccjcchhda.afccccccccccccda..........",
    "beccscccchhddfa.aflclcccccjcjcdadb........",
    "delccchhhdfbba..afchchhhhhhhhhdabmd.......",
    "bfhhhdddbaa.....bddddddddddddddbaimd......",
    "afddbaabdawa....dbaaaabbaaaaaabdaitmd.....",
    "baaabdbeeeda........aeaddaea....aitnmd....",
    "....awbbbda.........bddddddb....ainnnmd...",
    ".....bgggabdb........baaaab.....aionnxmd..",
    ".....bpggbgeya..................aiaqqxgb..",
    ".....apggbfpea..................aiqqaogb..",
    ".....agggbgesa..................aioqqogb..",
    ".....bpggbfeea...............bd..aioozgbb.",
    ".....dgggbgppa...bddbbdbbb..brkb..aiuugbib",
    ".....bvvvafeea..bekekekekeb.beeb...aiugbad",
    ".....abbbbbbba..akekrrrkeka.aeea....aigb..",
    ".....daaaaaaad...aaaaaaaaa...aa......abd..",
  ];

  const PAL_DESKSET_INFOSYS = {
    a: "#3a3a50",
    b: "#46465e",
    c: "#6c6e85",
    d: "#8b8bab",
    e: "#565972",
    f: "#ebe4f2",
    g: "#d8d0e0",
    h: "#4280dd",
    i: "#ab4a36",
    j: "#b9c3d5",
    k: "#afacc8",
    l: "#acafbf",
    m: "#838897",
    n: "#d4dee6",
    o: "#b1bac8",
    p: "#4e6e61",
    q: "#ffb893",
    r: "#1652b9",
    s: "#dde4eb",
    t: "#b35e3f",
    u: "#e07070",
    v: "#50a7e8",
    w: "#60637d",
    x: "#568d61",
    y: "#f69784",
    z: "#cb2a2a",
    A: "#e63f38",
    B: "#d93232",
    C: "#4995e3",
    D: "#f8d239",
    E: "#f2b22b",
    F: "#ed931e",
    G: "#64b63b",
  };
  const DESKSET_INFOSYS_GRID = [
    "....ebaaaaabe.......................",
    ".ebabfffffffb.......................",
    ".bfgbfgggggfa.......................",
    ".afkbfgkkkgfa.......................",
    ".bfkbfffffffa.......................",
    "aefgbfgggggfbe......................",
    "aefgbkkkkkxkbb......................",
    "aefgecccccxceaebbbbbbbbbbe..........",
    "abkkdddddddecabddddddddddb..........",
    "abaaaaaaaaabcaachhhhhhhhca..........",
    "abggvgggggkecaacvhzhhhghca..........",
    "aeggCgggAgkecaachhhhhhhhca..........",
    "aeccccccBccecbacvhDhhhghca..........",
    "ebdddddddddddbachrhrrrrrca..........",
    ".akffAffffEffebcdccccccdcb..........",
    ".bdddBddddFdddebebbbbbbebe..........",
    ".ebaaaaaaaaaabbdcddddddcdb..........",
    "..............admomomomoda.ajjjbjcza",
    ".........eb...adomomomomda.bsjjbwcca",
    "........eccb..adddccecddda.ejjjbjssa",
    "........bccb..adooeeeeddda.bmmmawcca",
    "........acda..bccccccccccb.abbbbbbba",
    ".........aa...ebaaaaaaaabe.eaaaaaaae",
  ];

  const PAL_DESKSET_DANSKESE = {
    a: "#3a3a50",
    b: "#46465e",
    c: "#4280dd",
    d: "#565972",
    e: "#acafbf",
    f: "#6c6e85",
    g: "#d8d0e0",
    h: "#b9c3d5",
    i: "#8b8bab",
    j: "#dde4eb",
    k: "#1652b9",
    l: "#afacc8",
    m: "#60637d",
    n: "#d4dee6",
    o: "#50a7e8",
    p: "#f69784",
    q: "#ab4a36",
    r: "#838897",
    s: "#ffb893",
    t: "#b35e3f",
    u: "#717491",
    v: "#cb2a2a",
    w: "#f8f8f8",
    x: "#4e6e61",
    y: "#4c4c66",
    z: "#f8d239",
    A: "#64b63b",
    B: "#e07070",
  };
  const DESKSET_DANSKESE_GRID = [
    "...........dbbd...............................",
    "........dbbffmb.dbbddbbbbbbbbbbd..............",
    "....dbbdfffmdda.bjjjjjjjjjjjjjjb..............",
    ".dbbffffmddcgda.aeeeeeeeeeeeeeea..............",
    "bfffmdddccgccda.aeocvcccccgcgcea.......ba.....",
    "bmddccccgcccgda.aeccccccccccccea....bdbgga....",
    "bmccocccccgccma.aeoczcccccgcgcea...bwbgggga...",
    "amocccccgcckkda.aeccccccccccccea..bwbglilgga..",
    "bfccvcccckkddma.aeococccccgcgcea.bwdggglilglb.",
    "dfoccckkkdmbba..aeckckkkkkkkkkeadbdgligglglfb.",
    "bmkkkdddbaa.....beeeeeeeeeeeeeebbndggligglfb..",
    "amddbaabdaya....dbaaaabbaaaaaabdaendgglglfbia.",
    "baaabdbfffda........anarrana..biaetndgglfbiila",
    "....aybbbda.........bheeeehb...baeqqndlfbiilfa",
    ".....bhhhabdb........baaaab.....aeqttndbiilfa.",
    ".....bjhhbhfAa..................aeptqqndilfa..",
    ".....ajhhbmjfa..................aeaspqhblfa...",
    ".....ahhhbhfva..................aessaphbfa....",
    ".....bjhhbmffa...............bd.aepssphba.....",
    ".....dhhhbhjja...bddbbdbbb..buib.aeppBhbb.....",
    ".....brrramffa..bfififififb.bffb..aexxhbeb....",
    ".....abbbbbbba..aifiuuuifia.affa...aexhbad....",
    ".....daaaaaaad...aaaaaaaaa...aa.....aehb......",
    ".....................................abd......",
  ];

  const PAL_DESKSET_DANSKEAPP = {
    a: "#3a3a50",
    b: "#46465e",
    c: "#b9c3d5",
    d: "#565972",
    e: "#ebe4f2",
    f: "#6c6e85",
    g: "#acafbf",
    h: "#d8d0e0",
    i: "#8b8bab",
    j: "#4280dd",
    k: "#838897",
    l: "#d4dee6",
    m: "#afacc8",
    n: "#e63f38",
    o: "#f8d239",
    p: "#f2b22b",
    q: "#ffb893",
    r: "#ed931e",
    s: "#1652b9",
    t: "#dde4eb",
    u: "#e07070",
    v: "#50a7e8",
    w: "#60637d",
    x: "#568d61",
    y: "#f69784",
    z: "#cb2a2a",
    A: "#4e6e61",
    B: "#d93232",
    C: "#4995e3",
    D: "#64b63b",
  };
  const DESKSET_DANSKEAPP_GRID = [
    "....dbaaaaabd.......................",
    ".dbabeeeeeeeb.......................",
    ".behbehhhhhea.......................",
    ".aembehmmmhea.......................",
    ".bembeeeeeeea.......................",
    "adehbehhhhhebd......................",
    "adehbmmmmmxmbb......................",
    "adehdfffffxfdadbbbbbbbbbbd..........",
    "abmmiiiiiiidfabccccccccccb..........",
    "abaaaaaaaaabfaagjjjjjjjjga..........",
    "abhhvhhhhhmdfaagvjzjjjhjga..........",
    "adhhChhhnhmdfaagjjjjjjjjga..........",
    "adffffffBffdfbagvjojjjhjga..........",
    "dbiiiiiiiiiiibagjsjsssssga..........",
    ".ameeneeeepeedbggggggggggb..........",
    ".biiiBiiiiriiidbdbbbbbbdbd..........",
    ".dbaaaaaaaaaabbcgccccccgcb..........",
    "..............acklklklklca.acccbcfza",
    ".........db...aclklklklkca.btccbwffa",
    "........dffb..acccffdfccca.dcccbctta",
    "........bffb..acllddddccca.bkkkawffa",
    "........afia..bkkkkkkkkkkb.abbbbbbba",
    ".........aa...dbaaaaaaaabd.daaaaaaaa",
  ];

  const DESK_ITEMS = {
    quantu: { grid: DESKSET_QUANTU_GRID, pal: PAL_DESKSET_QUANTU },
    neuta: { grid: DESKSET_NEUTA_GRID, pal: PAL_DESKSET_NEUTA },
    infosys: { grid: DESKSET_INFOSYS_GRID, pal: PAL_DESKSET_INFOSYS },
    danskeSe: { grid: DESKSET_DANSKESE_GRID, pal: PAL_DESKSET_DANSKESE },
    danskeApp: { grid: DESKSET_DANSKEAPP_GRID, pal: PAL_DESKSET_DANSKEAPP },
  };

  /* office swivel chair, back view (mesh back, armrests, star base) */
  const PAL_OFFICE_CHAIR = {
    a: "#3a3a50",
    b: "#565972",
    c: "#46465e",
    d: "#666982",
    e: "#6c6e85",
  };
  const OFFICE_CHAIR_GRID = [
    "...ccaaaaaaaa....",
    "..cdededededba...",
    ".cbededededebca..",
    ".abacbcbccccaca..",
    ".aabbbbbbbbbbaa..",
    ".acbeccccccdbca..",
    ".abecb.b.b.cdba..",
    ".abda.b.b.baeba..",
    ".abeab.b.b.adba..",
    ".cadadbdbdbaeac..",
    "aeabbaaaaaabbadaa",
    "aeacbbbbbbbbcadaa",
    "aeabbdededebbadaa",
    "aecbdedededebcbaa",
    "abbbededededbbcaa",
    "ababbedededbbacaa",
    ".acbbbbbbbbbbca..",
    "..acccccccccca...",
    "...aaaaaaaaaa....",
    "...abca..acba....",
    "...caa....aac....",
  ];

  /* contact-room desk chair: an orange office chair hand-ported from
     Modern_Office_Shadowless_16x16.png @ (0,160) — 16x32 (content in rows
     9-29). Drawn bottom-anchored like officeChair; idling on it seats the
     player (see game.js seated check). Replaces the contact-room stool. */
  const PAL_CONTACT_CHAIR = {
    a: "#3a3a50",
    b: "#c7754b",
    c: "#b35e3f",
    d: "#ca8854",
    e: "#46465e",
    f: "#ab4a36",
    g: "#a13a30",
    h: "#565972",
  };
  const CONTACT_CHAIR_GRID = [
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "...eeaaaaaaaa...",
    "..ebdbdbdbdbba..",
    ".ecdbdbdbdbdbfa.",
    ".acagbgbggggafa.",
    ".aabbbbbbbbbbaa.",
    ".aebceeeeeecbea.",
    ".acdeh.h.h.ebca.",
    ".acba.h.h.hadca.",
    ".acdah.h.h.abca.",
    ".gababebebeadag.",
    "adacfaaaaaafcaba",
    "adafccccccccfaba",
    "adaccbdbdbdccaba",
    "adfcbdbdbdbdcfca",
    "acccdbdbdbdbccga",
    "afaccdbdbdbccaga",
    ".agccccccccccga.",
    "..affffffffffa..",
    "...aaaaaaaaaa...",
    "...ahea..aeha...",
    "...eaa....aae...",
    "................",
    "................",
  ];

  /* company-colored screen: clone a rig palette with the pack's blue screen
     ramp (#4280dd / #50a7e8 / #1652b9) swapped for shades of the color */
  function shadeHex(hex, f) {
    const n = parseInt(hex.slice(1), 16);
    const ch = function (v) {
      return Math.max(0, Math.min(255, Math.round(v * f)))
        .toString(16)
        .padStart(2, "0");
    };
    return "#" + ch((n >> 16) & 255) + ch((n >> 8) & 255) + ch(n & 255);
  }
  const rigPalCache = {};
  function rigPal(base, bodyKey, liteKey, darkKey, color) {
    const key = bodyKey + color;
    if (!rigPalCache[key]) {
      const pal = {};
      for (const k in base) pal[k] = base[k];
      pal[bodyKey] = shadeHex(color, 0.8);
      pal[liteKey] = color;
      pal[darkKey] = shadeHex(color, 0.5);
      rigPalCache[key] = pal;
    }
    return rigPalCache[key];
  }

  /* tiny 5px-tall pixel font for the cubicle nameplates — canvas fillText()
     anti-aliases at these sizes and reads as a blurry smudge once the
     game's native 320x208 canvas gets scaled up with pixelated rendering,
     so labels are hand-drawn pixel-by-pixel like every other sprite here.
     Variable-width: a glyph's width is its row-string length — diagonal
     letters (M/N/W) get the 4-5 columns a real diagonal needs, I slims to
     a 1px stem — so labels read as drawn type instead of a monospace
     smudge, and the widest label (QUANTUNIVERSITY) still fits between the
     partition posts. Full A-Z + 0-9 so future company names can't
     silently drop letters. */
  const FONT_5 = {
    " ": ["00", "00", "00", "00", "00"],
    "-": ["00", "00", "11", "00", "00"],
    ".": ["0", "0", "0", "0", "1"],
    "(": ["01", "10", "10", "10", "01"],
    ")": ["10", "01", "01", "01", "10"],
    A: ["010", "101", "111", "101", "101"],
    B: ["110", "101", "110", "101", "110"],
    C: ["011", "100", "100", "100", "011"],
    D: ["110", "101", "101", "101", "110"],
    E: ["111", "100", "110", "100", "111"],
    F: ["111", "100", "110", "100", "100"],
    G: ["0110", "1000", "1011", "1001", "0110"],
    H: ["101", "101", "111", "101", "101"],
    I: ["1", "1", "1", "1", "1"],
    J: ["001", "001", "001", "101", "010"],
    K: ["101", "110", "100", "110", "101"],
    L: ["100", "100", "100", "100", "111"],
    M: ["10001", "11011", "10101", "10001", "10001"],
    N: ["1001", "1101", "1011", "1001", "1001"],
    O: ["010", "101", "101", "101", "010"],
    P: ["110", "101", "110", "100", "100"],
    /* 4-row ring with the tail on the baseline row, continuing the ring's
       bottom-right diagonal — a 5-row ring leaves no room for a tail and
       reads as an O */
    Q: ["0110", "1001", "1001", "0110", "0001"],
    R: ["110", "101", "110", "101", "101"],
    S: ["011", "100", "010", "001", "110"],
    T: ["111", "010", "010", "010", "010"],
    U: ["101", "101", "101", "101", "111"],
    V: ["101", "101", "101", "101", "010"],
    W: ["10001", "10001", "10101", "10101", "01010"],
    X: ["101", "101", "010", "101", "101"],
    Y: ["101", "101", "010", "010", "010"],
    Z: ["111", "001", "010", "100", "111"],
    0: ["111", "101", "101", "101", "111"],
    1: ["010", "110", "010", "010", "111"],
    2: ["110", "001", "010", "100", "111"],
    3: ["110", "001", "010", "001", "110"],
    4: ["101", "101", "111", "001", "001"],
    5: ["111", "100", "110", "001", "110"],
    6: ["011", "100", "110", "101", "010"],
    7: ["111", "001", "010", "010", "010"],
    8: ["010", "101", "010", "101", "010"],
    9: ["010", "101", "011", "001", "110"],
  };
  /* per-glyph width + 1px spacing; unsupported chars are skipped (both
     here and in drawPixelText, so measuring and drawing always agree) */
  function pixelTextWidth(text) {
    let w = 0;
    for (let i = 0; i < text.length; i++) {
      const glyph = FONT_5[text[i]];
      if (glyph) w += glyph[0].length + 1;
    }
    return w > 0 ? w - 1 : 0;
  }
  /* picked from a 10-color test cycle against the partition/carpet
     background — cool white read clearest of the set */
  const NAMEPLATE_COLOR = "#f0f6fc";
  function drawPixelText(ctx, text, x, y) {
    let cx = x;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const glyph = FONT_5[ch];
      if (!glyph) continue;
      const gw = glyph[0].length;
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < gw; col++) {
          if (glyph[row][col] === "1") ctx.fillRect(cx + col, y + row, 1, 1);
        }
      }
      cx += gw + 1;
    }
  }

  /* wall title: a single word of the pixel nameplate font (same FONT_5 as the
     cubicle company signs) centered in its rect, painted in the wall's own
     navy outline color so it reads as engraved signage on the light-gray wall
     face. Placed as a wallMounted rect on the top wall above a station.
     obj.text = the label; obj.color overrides the default navy. */
  function wallLabel(ctx, px, py, w, h, t, obj) {
    const label = ((obj && obj.text) || "").toUpperCase();
    if (!label) return;
    const tw = pixelTextWidth(label);
    const lx = px + Math.round((w - tw) / 2);
    const ly = py + Math.round((h - 5) / 2);
    ctx.fillStyle = (obj && obj.color) || PAL_WALL.o;
    drawPixelText(ctx, label, lx, ly);
  }

  /* 3px partition post column: light face above the panel line, shadowed
     below, dark caps at both ends */
  function partitionPost(ctx, x, yTop, yPanelBot, yBot) {
    const P = PAL_PARTITION;
    ctx.fillStyle = P.outline;
    ctx.fillRect(x, yTop, 1, yBot - yTop);
    ctx.fillRect(x + 2, yTop, 1, yBot - yTop);
    ctx.fillStyle = P.postLite;
    ctx.fillRect(x + 1, yTop, 1, yPanelBot - yTop);
    ctx.fillStyle = P.postDark;
    ctx.fillRect(x + 1, yPanelBot, 1, yBot - yPanelBot);
    /* caps */
    ctx.fillStyle = P.joint;
    ctx.fillRect(x, yTop, 3, 1);
    ctx.fillRect(x, yBot - 1, 3, 1);
    ctx.fillStyle = P.outline2;
    ctx.fillRect(x + 1, yTop, 1, 1);
    ctx.fillRect(x + 1, yBot - 1, 1, 1);
  }

  /* full cubicle: back partition (rail on the rect's top edge, posts poking
     11px above it), desk tucked under the panel, monitor rig + clutter.
     obj extras: color (screen), rig ("dual"), desk ("gray"), papers,
     deskItem (key into DESK_ITEMS — hand-ported desktop clutter that
     replaces the papers/rig entirely when set), noLeftPost/noRightPost (skip
     that corner post — set on the right-hand cubicle of an adjoining pair so
     two cubicles sharing a wall don't each draw their own stub post 3px
     apart; the neighbor's full post + cubicleSide strip is the only divider
     drawn at that boundary) */
  function cubicle(ctx, px, py, w, h, t, obj) {
    const P = PAL_PARTITION;
    const color = (obj && obj.color) || "#58a6ff";
    const noLeftPost = obj && obj.noLeftPost;
    const noRightPost = obj && obj.noRightPost;
    /* desk position — computed up front so the panel fill below can stretch
       to fill whatever extra height the cubicle rect has (world.js adds
       0.5 tile over the pack's original proportions to give the nameplate
       room), instead of leaving a gap between the panel and the desk */
    const deskGray = obj && obj.desk === "gray";
    const dx = px + Math.round((w - 42) / 2),
      dy = py + h - 23;
    /* back panel between the posts — extends flush to the rect edge on any
       side with no post to butt against; the flat mid-section (fixed 13px
       tall in the pack's original proportions) now stretches to whatever
       height sits between the header band and the desk, so taller cubicles
       gain panel, not blank floor */
    const bx = px + (noLeftPost ? 0 : 3),
      bw = px + w - (noRightPost ? 0 : 3) - bx;
    ctx.fillStyle = P.outline;
    ctx.fillRect(bx, py, bw, 1);
    ctx.fillStyle = P.rail;
    ctx.fillRect(bx, py + 1, bw, 1);
    ctx.fillStyle = P.outline2;
    ctx.fillRect(bx, py + 2, bw, 1);
    ctx.fillStyle = P.panel;
    ctx.fillRect(bx, py + 3, bw, Math.max(1, dy - py - 3));
    ctx.fillStyle = P.shadow;
    ctx.fillRect(bx, dy, bw, 1);
    ctx.fillStyle = P.outline;
    ctx.fillRect(bx, dy + 1, bw, 1);
    /* corner posts, tips rising above the rail like the pack's segment —
       the light/dark split tracks the panel's (now dynamic) bottom edge */
    if (!noLeftPost) partitionPost(ctx, px, py - 11, dy + 2, py + h);
    if (!noRightPost) partitionPost(ctx, px + w - 3, py - 11, dy + 2, py + h);
    /* company nameplate, on the panel itself just under the header rail —
       fully inside the cubicle's own rect (not floating above it in the
       posts' overhang) now that the taller rect gives it room; the
       variable-width font keeps most names (QuantUniversity included)
       on one line within the posts' inner edges, but a suffix like
       "(Intern)" can push a name past that, so it wraps onto a second
       centered line instead of overflowing past the partition. One color
       for every cubicle so the row reads as a uniform sign set. */
    if (obj && obj.company) {
      const label = obj.company.toUpperCase();
      const maxW = w - 6;
      ctx.fillStyle = NAMEPLATE_COLOR;
      if (pixelTextWidth(label) <= maxW) {
        const lx = px + Math.round((w - pixelTextWidth(label)) / 2);
        drawPixelText(ctx, label, lx, py + 5);
      } else {
        const words = label.split(" ");
        let line1 = words[0],
          i = 1;
        while (
          i < words.length &&
          pixelTextWidth(line1 + " " + words[i]) <= maxW
        ) {
          line1 += " " + words[i];
          i++;
        }
        const line2 = words.slice(i).join(" ");
        drawPixelText(
          ctx,
          line1,
          px + Math.round((w - pixelTextWidth(line1)) / 2),
          py + 5,
        );
        drawPixelText(
          ctx,
          line2,
          px + Math.round((w - pixelTextWidth(line2)) / 2),
          py + 11,
        );
      }
    }
    drawGrid(
      ctx,
      deskGray ? DESK_GRAY_GRID : DESK_TAN_GRID,
      dx,
      dy,
      false,
      deskGray ? PAL_DESK_GRAY : PAL_DESK_TAN,
    );
    const item = obj && obj.deskItem && DESK_ITEMS[obj.deskItem];
    if (item) {
      /* hand-ported desktop clutter, base aligned with the monitor rig's */
      drawGrid(
        ctx,
        item.grid,
        px + Math.round((w - item.grid[0].length) / 2),
        dy + 15 - item.grid.length,
        false,
        item.pal,
      );
      return;
    }
    /* paper pile on the desk's left half */
    if (obj && obj.papers) {
      drawGrid(ctx, PAPERS_GRID, dx + 4, dy + 11, false, PAL_PAPERS);
    }
    /* monitor rig, base resting on the desk surface */
    if (obj && obj.rig === "dual") {
      drawGrid(
        ctx,
        DUALRIG_GRID,
        px + Math.round((w - 17) / 2),
        dy - 5,
        false,
        rigPal(PAL_DUALRIG, "e", "i", "g", color),
      );
    } else {
      drawGrid(
        ctx,
        MONSET_GRID,
        px + Math.round((w - 16) / 2),
        dy - 6,
        false,
        rigPal(PAL_MONSET, "a", "k", "h", color),
      );
    }
  }

  /* short side-wall strip continuing a cubicle post toward the open front */
  function cubicleSide(ctx, px, py, w, h) {
    partitionPost(ctx, px, py, py, py + h);
  }

  function officeChair(ctx, px, py, w, h) {
    drawGrid(
      ctx,
      OFFICE_CHAIR_GRID,
      px + Math.round((w - 17) / 2),
      py + h - 21,
      false,
      PAL_OFFICE_CHAIR,
    );
  }

  /* bottom-anchored so the chair's feet (grid row 29) sit at the rect bottom,
     matching officeChair's anchoring */
  function contactChair(ctx, px, py, w, h) {
    drawGrid(
      ctx,
      CONTACT_CHAIR_GRID,
      px + Math.round((w - 16) / 2),
      py + h - 30,
      false,
      PAL_CONTACT_CHAIR,
    );
  }

  /* drinks vending machine hand-ported from Modern_Office_Shadowless_16x16.png
     @ (32,368) — 32x48 (content in cols 5-26, rows 5-38). Bottom-anchored so
     the cabinet base sits on the floor line; decorative (education room). */
  const PAL_VENDING = {
    a: "#3a3a50",
    b: "#6c6e85",
    c: "#565972",
    d: "#838897",
    e: "#46465e",
    f: "#727a8c",
    g: "#c6c7da",
    h: "#9099ab",
    i: "#9aa7b6",
    j: "#798194",
    k: "#cad4e4",
    l: "#838ca0",
    m: "#abb9c9",
    n: "#e58e86",
    o: "#d1757a",
    p: "#ad7177",
    q: "#b9c3d5",
    r: "#9da3b7",
    s: "#8b8bab",
    t: "#d0d2e1",
    u: "#9eabbb",
    v: "#e7b6bb",
    w: "#dbdfec",
    x: "#d2a4ac",
    y: "#dfcad2",
    z: "#d8e3ef",
    A: "#9da8b6",
    B: "#deb3b3",
    C: "#d1dbe8",
    D: "#d87d7e",
    E: "#a3b2c2",
    F: "#b3c2cf",
    G: "#d6a9ae",
    H: "#cb2a2a",
    I: "#568d61",
    J: "#bca2aa",
  };
  const VENDING_GRID = [
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    ".....ceaaaaaaaaaaaaaaaaaaec.....",
    ".....errrdrdrrdddddddddddde.....",
    ".....adddddddddddddddddddda.....",
    ".....adddddddddddddddddddda.....",
    ".....adddddddddddddddddddda.....",
    ".....adddddddddddddddddddda.....",
    ".....abbbbbbbbbbbbbbbbbbbba.....",
    ".....eaaebbeeaaaaaaaaaaaaae.....",
    ".....acccccccccccccccccccca.....",
    ".....acbeaaaaaaaaaedbbbbbca.....",
    ".....acefffjfiijfffebbbbbca.....",
    ".....abanDopBGxpnDoabbbbbca.....",
    ".....ebanvopByopnvoacbbbcea.....",
    ".....ebagwgEkzglgwgabsqsbca.....",
    ".....ebagtguktgjgtgabqsqbca.....",
    ".....acaffuFuffAjfiabsqsbca.....",
    ".....aballmmhhhhhmmabqsqbca.....",
    ".....ebafiiifffffiiabHqIbca.....",
    ".....acanyxpnvopByxacbbbcea.....",
    ".....acakzklgwglkzgabbbbbca.....",
    ".....acakCgjgtgukCgabeebaca.....",
    ".....acaifjAjffFuffabeebaca.....",
    ".....acaElhhhhmmmhhabccbcca.....",
    ".....acaffffffiifffabbbbbca.....",
    ".....acanvopnyxJnvoaeccccea.....",
    ".....acagwglgzklgwgabbbbbca.....",
    ".....acagtgjkCkjgtgabcccbca.....",
    ".....acaffjAuifAjffabaaabca.....",
    ".....acellhmmmhhhhhebeeebca.....",
    ".....acdeaaaaaaaaaedcccccca.....",
    ".....acbbbbbbbbbbbbbbbbbbca.....",
    ".....acbbbbbbbbbcbcbcbcbbca.....",
    ".....accccccccccececececcca.....",
    ".....eaaaaaaaaaaaaaaaaaaaae.....",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
  ];
  function vendingMachine(ctx, px, py, w, h) {
    const gx = px + Math.round((w - 32) / 2);
    shadow(ctx, gx + 5, py + h, 22);
    drawGrid(ctx, VENDING_GRID, gx, py + h - 39, false, PAL_VENDING);
  }

  function receptionCounter(ctx, px, py) {
    drawGrid(ctx, RECEPTION_COUNTER_GRID, px, py, false, PAL_RECEPTION_COUNTER);
  }

  function receptionist(ctx, px, py, w, h, t) {
    const fr = Math.floor(t * 5) % RECEPTIONIST_FRAMES.length;
    drawGrid(
      ctx,
      RECEPTIONIST_FRAMES[fr],
      px + (w - 16) / 2,
      py + h - 26,
      false,
      PAL_RECEPTIONIST,
    );
  }

  /* hidden staircase down to the basement — composed from the Room Builder
     Floor_Connectors sheet's dark-stone stairs (rails @0,176; the rail
     columns' own dd→ff→cc depth shading is kept, nearest rows lightest) and
     its navy step strips (@64,438), stacked as treads that darken into the
     engine's door-void black as they descend. */
  const PAL_STAIRWELL = {
    v: "#05070a",
    b: "#3a3a50",
    h: "#353549",
    d: "#46465e",
    f: "#565972",
    c: "#6c6e85",
    a: "#b1bac8",
    e: "#9da3b7",
  };
  const STAIRWELL_GRID = [
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "bddbvvvvvvvvvvvvvvvvvvvvvvvvbddb",
    "bddbvvvvvvvvvvvvvvvvvvvvvvvvbddb",
    "bddbvvvvvvvvvvvvvvvvvvvvvvvvbddb",
    "bddbvvvvvvvvvvvvvvvvvvvvvvvvbddb",
    "bddbvvvvvvvvvvvvvvvvvvvvvvvvbddb",
    "bddbvvvvvvvvvvvvvvvvvvvvvvvvbddb",
    "bddbvvvvvvvvvvvvvvvvvvvvvvvvbddb",
    "bddbhhhhhhhhhhhhhhhhhhhhhhhhbddb",
    "bddbbbbbbbbbbbbbbbbbbbbbbbbbbddb",
    "bffbbbbbbbbbbbbbbbbbbbbbbbbbbffb",
    "bffbhhhhhhhhhhhhhhhhhhhhhhhhbffb",
    "bffbbbbbbbbbbbbbbbbbbbbbbbbbbffb",
    "bffbddddddddddddddddddddddddbffb",
    "bffbddddddddddddddddddddddddbffb",
    "bffbhhhhhhhhhhhhhhhhhhhhhhhhbffb",
    "bffbddddddddddddddddddddddddbffb",
    "bffbffffffffffffffffffffffffbffb",
    "bffbffffffffffffffffffffffffbffb",
    "bffbbbbbbbbbbbbbbbbbbbbbbbbbbffb",
    "bccbffffffffffffffffffffffffbccb",
    "bccbccccccccccccccccccccccccbccb",
    "bccbccccccccccccccccccccccccbccb",
    "bccbbbbbbbbbbbbbbbbbbbbbbbbbbccb",
    "bccbffffffffffffffffffffffffbccb",
    "bccbccccccccccccccccccccccccbccb",
    "bccbccccccccccccccccccccccccbccb",
    "bccbbbbbbbbbbbbbbbbbbbbbbbbbbccb",
    "bccbaaaaaaaaaaaaaaaaaaaaaaaabccb",
    "bccbeeeeeeeeeeeeeeeeeeeeeeeebccb",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    ".bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.",
  ];
  function stairsDown(ctx, px, py, w, h) {
    drawGrid(
      ctx,
      STAIRWELL_GRID,
      px + Math.round((w - 32) / 2),
      py + h - 32,
      false,
      PAL_STAIRWELL,
    );
  }

  /* seated stone statue with an engraved plaque set into its pedestal —
     the basement's "Finders' Ledger" (26x48, 22_Museum shadowless sheet). */
  const PAL_STATUE = {
    a: "#3a3a50",
    b: "#a29087",
    c: "#8d736d",
    d: "#ad9f94",
    e: "#6b5052",
    f: "#97837c",
    g: "#b8ada2",
    h: "#c3baaf",
    i: "#b9c3d5",
    j: "#46465e",
    k: "#d4cec2",
    l: "#d4dee6",
    m: "#838897",
    p: "#565972",
    q: "#acafbf",
  };
  const STATUE_GRID = [
    ".........aaaaaaa..........",
    "........adgggggba.........",
    ".......adkkgdddbba........",
    ".......egkkddddbbe........",
    "......cegggddddbbea.......",
    "......adggddddbbbdaa......",
    "......abdddddbbbbdaga.....",
    "......abdddddbbbbbage.....",
    ".....eebccebfbeccecgca....",
    ".....aebeecfffceeebdfa....",
    ".....aecggdcbcdggabffa....",
    ".....afafbdeeedbfaceea....",
    ".....ageafdfffbfaeaea.....",
    ".....eaaadcccccbaaaca.....",
    "......aeeabbbbbaeeafa.....",
    ".....abceceeeeececaba.....",
    "....akgdcbcccccbcbabae....",
    "...cegddgcdcbcdcbdadaa....",
    "...aggdggdcgggcbddabaa....",
    "...agdbcggdcbcbddfafaa....",
    "...adbbegggdfbdddcabae....",
    "...eaaaeccfddbfcceaaaca...",
    "..ecgegafbbdddbbbackdfa...",
    "..adgdgefbdddddbbeebdba...",
    "..ecbbcgafdddddffacdbbe...",
    "..agdbedaccffcccceecfca...",
    "..abffcaeffbbffffcaaae....",
    "..eaaaadgggggggddfaea.....",
    ".....adgdddddddbbdaca.....",
    ".eacaaaffffffcccccecaaae..",
    ".adhhheaaaaaaaaaaaebahda..",
    ".ahhhhhaeeeahaeeeaebahha..",
    "eahhhhdabccadaccbaedaddae.",
    "eahhhdebcccabacccbabaddae.",
    "aahhbaggddcebacddgabaddaa.",
    "aahhbafcccabbbafccabaddaa.",
    "aahhdeaaaabbbbbaaaabaddaa.",
    "aadhhdbbbbbbbbbbbbeaeddaa.",
    "aacccccccccccccccccccccaa.",
    "aaaccccaaaaaaapjjjjjjpaaa.",
    "aebdddbbbbbbbdjlllllljbea.",
    "aebbddbbbdbbbdaiiiiiiafea.",
    "aebbdbbbbdbbbbaqmmmmqafea.",
    "acbbbbbbbddbbbaiiiiiiafca.",
    "afffffffffffffjaaaaaajcca.",
    "aaeeeeeeaaaaaaaaaaaaaaaaa.",
    "accccccccccccccccccccccca.",
    "eaaaaaaaaaaaaaaaaaaaaaaae.",
  ];
  function basementStatue(ctx, px, py, w, h) {
    drawGrid(
      ctx,
      STATUE_GRID,
      px + Math.round((w - 26) / 2),
      py + h - 48,
      false,
      PAL_STATUE,
    );
  }

  const PAINTERS = {
    rug,
    neonRug,
    doormat,
    mug,
    deskPhone,
    contactDesk,
    palmPlant,
    wallMap,
    fireExtinguisher,
    computerDesk,
    pottedPlant,
    pottedBush,
    stool,
    deskStation,
    waterCooler,
    whiteboard,
    bookshelf,
    cubicle,
    cubicleSide,
    officeChair,
    diploma,
    lectern,
    printer,
    copier,
    resumeCopier,
    serverRack,
    contactPC,
    contactChair,
    vendingMachine,
    wallLabel,
    trophyBig,
    receptionCounter,
    receptionist,
    stairsDown,
    basementStatue,
  };

  /* bobbing "!" glint above an interactable */
  function glint(ctx, cx, py, t) {
    const bob = Math.floor(((Math.sin(t * 4) + 1) / 2) * 3);
    const y = py - 10 - bob;
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(cx - 2, y - 1, 5, 9);
    ctx.fillStyle = "#3fb950";
    ctx.fillRect(cx - 1, y, 3, 5);
    ctx.fillRect(cx - 1, y + 6, 3, 2);
  }

  return {
    PAL,
    PLAYER_FRAMES,
    PLAYER_SIT_UP,
    RECEPTIONIST_WALK,
    PAL_RECEPTIONIST_WALK,
    CAT_FRAMES,
    PAL_CAT,
    drawGrid,
    TILES,
    PAINTERS,
    glint,
    hash2,
    T,
  };
})();
