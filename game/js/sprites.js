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
  const PLAYER_FRAMES = { down: P_DOWN, up: P_UP, right: P_RIGHT, left: P_LEFT };

  /* seated back view for the desk stools — the pack's sit animations are
     side-facing only (see the pack's Spritesheet_animations_GUIDE), so for
     up-facing desks we derive one: the standing up-frame lowered 3px onto the
     seat, legs tucked behind the stool */
  const PLAYER_SIT_UP = ["................", "................", "................"]
    .concat(P_UP[0].slice(0, 23));

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
    a: "#e8d8cb", b: "#e1d1c5", c: "#bfb2a7", d: "#e9d8cc", e: "#ebdace",
    f: "#dfd0c3", g: "#d5c7bb", h: "#d9cabe", i: "#d7c9bc", j: "#dbccc0",
    k: "#e7d7ca", l: "#e0d1c4", m: "#ccbbb3",
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
    const x = tx * T, y = ty * T;
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
      if (tx < cols - 1 && open(ty, tx + 1)) ctx.fillRect(x + T - 1, y, 1, capH);
    } else {
      if (ty > 0 && open(ty - 1, tx)) ctx.fillRect(x, y, T, 1);
      if (ty < rows - 1 && open(ty + 1, tx)) ctx.fillRect(x, y + T - 1, T, 1);
    }
  }

  /* window on the lower face row (map '~' goes in row 1, under the strip) */
  function windowNight(ctx, tx, ty, t, map) {
    wall(ctx, tx, ty, map);
    const x = tx * T, y = ty * T;
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
    const x = tx * T, y = ty * T;
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

  const TILES = { floorLobbyCarpet, floorCarpetTiles, wall, windowNight, doorNorth, doorSide, doorSouth };

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
  const MUG_FRAMES = [
    [
      "................", "................", "................", "................",
      "................", "................", "................", "................",
      "................", "................", "................", "................",
      "................", "................", "................", "................",
      "................", "......eemb......", ".....ecffibe....", ".....efddfbce...",
      ".....bijjibdb...", "....baggggab....", "....bahhhhae....", "....bcaaaacb....",
      "....adccccda....", ".....aaaaaa.....", "................", "................",
      "................", "................", "................", "................",
    ],
    [
      "................", "................", "................", "................",
      "................", "................", "................", "................",
      "................", "................", "................", "................",
      "................", "................", ".........f......", "................",
      ".........f......", "......enff......", ".....ecfffbe....", ".....ecdddbce...",
      ".....bdjjdbdb...", "....baggggab....", "....bahhhhae....", "....bcaaaacb....",
      "....adccccda....", ".....aaaaaa.....", "................", "................",
      "................", "................", "................", "................",
    ],
    [
      "................", "................", "................", "................",
      "................", "................", "................", "................",
      "................", "................", "................", ".........f......",
      ".........f......", "........ff......", ".......fff......", ".......ff.......",
      ".......ff.......", "......eell......", ".....ecciibe....", ".....ecddibce...",
      ".....bdkkdbdb...", "....baggggab....", "....bahhhhae....", "....bcaaaacb....",
      "....adccccda....", ".....aaaaaa.....", "................", "................",
      "................", "................", "................", "................",
    ],
    [
      "................", "................", "................", "................",
      "................", "................", "................", "................",
      "................", "................", ".........f......", ".......fff......",
      ".......fff......", "........f.......", "................", "................",
      "................", "......eebb......", ".....eccddbe....", ".....ecggdbce...",
      ".....bdkkdbdb...", "....baggggab....", "....bahhhhae....", "....bcaaaacb....",
      "....adccccda....", ".....aaaaaa.....", "................", "................",
      "................", "................", "................", "................",
    ],
    [
      "................", "................", "................", "................",
      "................", "................", "................", "........f.......",
      "........ff......", "................", "................", "................",
      "................", "................", "................", "................",
      "................", "......eebb......", ".....eccddbe....", ".....ecggdbce...",
      ".....bdkkdbdb...", "....baggggab....", "....bahhhhae....", "....bcaaaacb....",
      "....adccccda....", ".....aaaaaa.....", "................", "................",
      "................", "................", "................", "................",
    ],
    [
      "................", "................", "................", "................",
      "................", "................", "................", "................",
      "................", "................", "................", "................",
      "................", "................", "................", "................",
      "................", "......eebb......", ".....eccddbe....", ".....ecdddbce...",
      ".....bdjjdbdb...", "....baggggab....", "....bahhhhae....", "....bcaaaacb....",
      "....adccccda....", ".....aaaaaa.....", "................", "................",
      "................", "................", "................", "................",
    ],
  ];

  function mug(ctx, px, py, w, h, t) {
    const frame = Math.floor(t * 3) % MUG_FRAMES.length;
    /* box hangs down to the counter's floor line so the interact probe
       can reach it (see world.js) — pull the sprite up so the cup's base
       rests on the counter's white top face instead of at the box's
       bottom */
    drawGrid(ctx, MUG_FRAMES[frame], px + (w - 16) / 2, py - 26, false, PAL_MUG);
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

  function plant(ctx, px, py, w, h) {
    ctx.fillStyle = "#8a4b32";
    ctx.fillRect(px + w / 2 - 3, py + h - 5, 6, 5);
    ctx.fillStyle = "#2ea043";
    ctx.fillRect(px + w / 2 - 1, py + 2, 2, h - 6);
    ctx.fillRect(px + w / 2 - 5, py + 4, 4, 2);
    ctx.fillRect(px + w / 2 + 1, py + 3, 4, 2);
    ctx.fillRect(px + w / 2 - 4, py + 8, 3, 2);
    ctx.fillRect(px + w / 2 + 2, py + 7, 3, 2);
    ctx.fillStyle = "#1f7a33";
    ctx.fillRect(px + w / 2 - 3, py + 5, 2, 1);
    ctx.fillRect(px + w / 2 + 2, py + 4, 2, 1);
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
    const gx = px + ((w - 32) >> 1), gy = py + h - 48;
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
    drawGrid(ctx, PLANT_POT_GRID, px + ((w - 16) >> 1), py + h - 29, false, PAL_PLANT_POT);
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
    drawGrid(ctx, PLANT_BUSH_GRID, px + ((w - 32) >> 1), py + h - 30, false, PAL_PLANT_BUSH);
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
    drawGrid(ctx, STOOL_GRID, px + ((w - 16) >> 1), py + h - 17, false, PAL_STOOL);
  }

  function deskStation(ctx, px, py, w, h, t, obj) {
    shadow(ctx, px, py + h, w);
    /* chair below desk */
    ctx.fillStyle = "#161b22";
    ctx.fillRect(px + w / 2 - 4, py + h - 4, 8, 4);
    /* desk */
    ctx.fillStyle = "#2b2117";
    ctx.fillRect(px, py + 6, w, h - 8);
    ctx.fillStyle = "#3a2d1f";
    ctx.fillRect(px, py + 6, w, 2);
    /* monitor with company accent */
    ctx.fillStyle = "#10141a";
    ctx.fillRect(px + w / 2 - 6, py, 12, 9);
    ctx.fillStyle = "#05070a";
    ctx.fillRect(px + w / 2 - 5, py + 1, 10, 7);
    ctx.fillStyle = obj.color || "#58a6ff";
    const blink = (Math.sin(t * 2.5 + px * 0.3) + 1) / 2;
    ctx.fillRect(px + w / 2 - 4, py + 2, blink > 0.4 ? 6 : 3, 1);
    ctx.fillRect(px + w / 2 - 4, py + 4, 4, 1);
    ctx.fillRect(px + w / 2 - 4, py + 6, blink > 0.6 ? 7 : 5, 1);
    /* papers */
    ctx.fillStyle = "#c9d1d9";
    ctx.fillRect(px + 2, py + 9, 4, 3);
    /* nameplate */
    ctx.fillStyle = obj.color || "#58a6ff";
    ctx.fillRect(px + w - 7, py + 10, 5, 2);
  }

  function waterCooler(ctx, px, py, w, h, t) {
    shadow(ctx, px, py + h, w);
    ctx.fillStyle = "#c9d1d9";
    ctx.fillRect(px + 2, py + 6, w - 4, h - 6);
    ctx.fillStyle = "#58a6ff";
    ctx.fillRect(px + 3, py, w - 6, 7);
    ctx.fillStyle = "#79c0ff";
    const bub = Math.floor(t * 2) % 4;
    ctx.fillRect(px + 4 + bub, py + 5 - bub, 1, 1);
    ctx.fillStyle = "#464f5d";
    ctx.fillRect(px + 3, py + 9, 2, 2);
  }

  function whiteboard(ctx, px, py, w, h) {
    ctx.fillStyle = "#10141a";
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = "#e6edf3";
    ctx.fillRect(px + 1, py + 1, w - 2, h - 2);
    ctx.fillStyle = "#f85149";
    ctx.fillRect(px + 3, py + 3, 10, 1);
    ctx.fillStyle = "#1f6feb";
    ctx.fillRect(px + 3, py + 6, 16, 1);
    ctx.fillRect(px + 3, py + 9, 7, 1);
    ctx.fillStyle = "#3fb950";
    ctx.fillRect(px + 22, py + 5, 6, 5); // green sticky
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
    drawGrid(ctx, BOOKSHELF_GRID, px + Math.round((w - 47) / 2), py + h - 39, false, PAL_BOOKSHELF);
  }

  function diploma(ctx, px, py, w, h, t, obj) {
    ctx.fillStyle = "#e3b341";
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = "#fdf6e3";
    ctx.fillRect(px + 1, py + 1, w - 2, h - 2);
    ctx.fillStyle = "#8b949e";
    ctx.fillRect(px + 3, py + 3, w - 6, 1);
    ctx.fillRect(px + 3, py + 5, w - 8, 1);
    ctx.fillStyle = obj.color || "#c93c35";
    ctx.fillRect(px + w / 2 - 1, py + h - 4, 3, 2); // seal
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
    drawGrid(ctx, BOOKSTAND_GRID, px + Math.round((w - 17) / 2), py + h - 29, false, PAL_BOOKSTAND);
  }

  function kiosk(ctx, px, py, w, h, t, obj) {
    shadow(ctx, px, py + h, w);
    ctx.fillStyle = "#10141a";
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = "#1c2530";
    ctx.fillRect(px + 1, py + 1, w - 2, h - 2);
    /* screen area */
    ctx.fillStyle = "#05070a";
    ctx.fillRect(px + 3, py + 3, w - 6, 12);
    const accent = obj.color || "#3fb950";
    ctx.fillStyle = accent;
    const icon = obj.icon;
    const cx = px + w / 2, cy = py + 9;
    if (icon === "mail") {
      ctx.fillRect(cx - 5, cy - 3, 10, 7);
      ctx.fillStyle = "#05070a";
      ctx.fillRect(cx - 4, cy - 2, 8, 1);
      ctx.fillStyle = accent;
      ctx.fillRect(cx - 3, cy - 1, 2, 1);
      ctx.fillRect(cx + 1, cy - 1, 2, 1);
      ctx.fillRect(cx - 1, cy, 2, 1);
    } else if (icon === "phone") {
      ctx.fillRect(cx - 4, cy - 4, 3, 3);
      ctx.fillRect(cx - 2, cy - 1, 2, 2);
      ctx.fillRect(cx, cy + 1, 2, 2);
      ctx.fillRect(cx + 2, cy + 2, 3, 3);
    } else if (icon === "in") {
      ctx.fillRect(cx - 5, cy - 4, 10, 9);
      ctx.fillStyle = "#05070a";
      ctx.fillRect(cx - 3, cy - 2, 1, 5);
      ctx.fillRect(cx - 1, cy - 2, 1, 1);
      ctx.fillRect(cx - 1, cy, 1, 3);
      ctx.fillRect(cx + 1, cy - 1, 2, 4);
    } else if (icon === "gh") {
      ctx.fillRect(cx - 4, cy - 4, 8, 7); // head
      ctx.fillRect(cx - 5, cy - 5, 2, 2); // ears
      ctx.fillRect(cx + 3, cy - 5, 2, 2);
      ctx.fillStyle = "#05070a";
      ctx.fillRect(cx - 2, cy - 2, 1, 1); // eyes
      ctx.fillRect(cx + 1, cy - 2, 1, 1);
    }
    /* blinking status led */
    const on = Math.floor(t * 2 + px) % 2 === 0;
    ctx.fillStyle = on ? accent : "#30363d";
    ctx.fillRect(px + w - 4, py + h - 5, 2, 2);
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

  function serverRack(ctx, px, py, w, h, t) {
    shadow(ctx, px, py + h, w);
    ctx.fillStyle = "#10141a";
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = "#1c2128";
    ctx.fillRect(px + 1, py + 1, w - 2, h - 2);
    for (let u = 0; u < 4; u++) {
      const uy = py + 3 + u * 6;
      ctx.fillStyle = "#0d1117";
      ctx.fillRect(px + 2, uy, w - 4, 4);
      for (let l = 0; l < 3; l++) {
        const on = hash2(u * 3 + l, Math.floor(t * 3)) < 55;
        ctx.fillStyle = on ? (l === 0 ? "#3fb950" : l === 1 ? "#e3b341" : "#f85149") : "#21262d";
        ctx.fillRect(px + 3 + l * 3, uy + 1, 2, 2);
      }
    }
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
    "bbaaaaaaaaaaahflbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblfaaaaaaaaaaahbbl",
    "abaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahaaaaaaaaaaaaaaaaaaahbaa",
    "abaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahaaaaaaaaaaaaaaaaaaahbaa",
    "abaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahbaa",
    "abaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahbaa",
    "abaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahbaa",
    "abaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahbaa",
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

  function receptionCounter(ctx, px, py) {
    drawGrid(ctx, RECEPTION_COUNTER_GRID, px, py, false, PAL_RECEPTION_COUNTER);
  }

  function receptionist(ctx, px, py, w, h, t) {
    const fr = Math.floor(t * 5) % RECEPTIONIST_FRAMES.length;
    drawGrid(ctx, RECEPTIONIST_FRAMES[fr], px + (w - 16) / 2, py + h - 26, false, PAL_RECEPTIONIST);
  }

  const PAINTERS = {
    rug, neonRug, doormat, mug, deskPhone, plant, palmPlant, wallMap, fireExtinguisher,
    computerDesk, pottedPlant, pottedBush, stool,
    deskStation, waterCooler, whiteboard, bookshelf,
    diploma, lectern, kiosk, printer, serverRack, trophyBig,
    receptionCounter, receptionist,
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

  return { PAL, PLAYER_FRAMES, PLAYER_SIT_UP, CAT_FRAMES, PAL_CAT, drawGrid, TILES, PAINTERS, glint, hash2, T };
})();
