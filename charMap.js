var charMap = {
    opt: {},
    init: function(opt){
        this.opt = opt;
        if ( typeof this.opt.target == 'undefined' ) {
            console.warn("No target element set for character map");
            this.opt.target = document.body;
        }

        if ( typeof this.opt.target == 'string' ) {
            this.opt.target = document.querySelector(this.opt.target);
        }

        // Minimum amount of times a char should be usd to be considered common
        if ( typeof this.opt.commonality ) {
            this.opt.commonality = 2;
        }

        // Load in commonly used symbols in a common category
        var charMapCommon = localStorage.getItem('charMapCommon');
        if ( charMapCommon ) {
            this.commonCategories = JSON.parse(charMapCommon);

            var sortable = [];
            for (var char in this.commonCategories) {
                if ( this.commonCategories[char] >= this.opt.commonality ) {
                    sortable.push({char: char, count: this.commonCategories[char]})
                    sortable.sort(
                        function(a, b) {
                            return a.count - b.count
                        }
                    ).reverse();
                }
            }

            this.categories.Common = sortable;
        }


        // Create the dialog element
        var container = document.createElement('div');
            container.id = 'charMapContainer';
            var li, cat, outputCommon = [];

            for ( var i in this.categories ) {
                catUL = document.createElement('ul');
                catUL.className = 'charMapCategory';
                catUL.setAttribute('data-category', i);

                for ( var c = 0; c < this.categories[i].length; ++c ) {
                    cat =  this.categories[i][c];

                    if ( i == 'Common' ) {
                        if ( outputCommon.indexOf(cat.char) > -1 ) {
                            continue;
                        }
                        outputCommon.push(cat.char);
                    }

                    li = document.createElement('li');
                    li.innerHTML = cat.char;
                    if ( cat.entity ) {
                        li.innerHTML = cat.entity;
                    }

                    li.setAttribute('data-char', li.innerHTML);

                    if ( cat.name ) {
                        li.setAttribute('data-name', cat.name);
                    }

                    if ( cat.entity ) {
                        li.setAttribute('data-entity', cat.entity);
                    }

                    li.addEventListener('click', this.onClick.bind(this));

                    catUL.appendChild(li);
                }

                container.appendChild(catUL);
            }

        // Append the chars to the target element
        this.opt.target.appendChild(container);

        if ( typeof this.opt.onLoad == 'function') {
            this.opt.onLoad(this);
        }

    },

    onClick: function(event){
        var char = event.target.getAttribute('data-char');
        var charMapCommon = JSON.parse((localStorage.getItem('charMapCommon') || '{}'));

        if ( !charMapCommon[char] ) {

            charMapCommon[char] = 1;
        }
        else {
            charMapCommon[char]++;
        }
        console.log(charMapCommon);
        console.log(JSON.stringify(charMapCommon));

        localStorage.setItem('charMapCommon', JSON.stringify(charMapCommon));
        console.log("SET THE ITEM");
        console.log(JSON.stringify(charMapCommon));
        if ( typeof this.opt.onClick == 'function' ) {
            this.opt.onClick(char);
        }
        else {
            console.warn("No callback specified");
        }
    },

    "categories": {
        "Common":{},
        "Misc": [
            {char: "☺" }
            ,{char: "☻" }
            ,{char: "☹" }
            ,{char: "☃" }
            ,{char: "☠" }

            ,{char: "⚠" }
            ,{char: "⚡" }
            ,{char: "✆" }
            ,{char: "♿" }

            ,{char: "✈" }
            ,{char: "☎" }
            ,{char: "☏" }
            ,{char: "☂" }
            ,{char: "☔" }
            ,{char: "✉" }
            ,{char: "☄" }
            ,{char: "☽" }
            ,{char: "☾" }
            ,{char: "☕" }
            ,{char: "✇" }
            ,{char: "❤" }

            ,{char: "☯" }
            ,{char: "✝" }
            ,{char: "✞" }
            ,{char: "✟" }
            ,{char: "☨" }
            ,{char: "☦" }
            ,{char: "☭" }
            ,{char: "☮" }
            ,{char: "☪" }
            ,{char: "☫" }
            ,{char: "☬" }
            ,{char: "☩" }
            ,{char: "✠" }
            ,{char: "☧" }
            ,{char: "✡" }

            ,{char: "♈" }
            ,{char: "♉" }
            ,{char: "♊" }
            ,{char: "♋" }
            ,{char: "♌" }
            ,{char: "♍" }
            ,{char: "♎" }
            ,{char: "♏" }
            ,{char: "♐" }
            ,{char: "♑" }
            ,{char: "♒" }
            ,{char: "♓" }

            ,{char: "♀" }
            ,{char: "♂" }
            ,{char: "☿" }
            ,{char: "♁" }
            ,{char: "⚢" }
            ,{char: "⚣" }
            ,{char: "⚤" }
            ,{char: "⚥" }
            ,{char: "⚦" }
            ,{char: "⚧" }
            ,{char: "⚨" }
            ,{char: "⚩" }

            ,{char: "❁" }
            ,{char: "❀" }
            ,{char: "✿" }
            ,{char: "✽" }
            ,{char: "✾" }
            ,{char: "❃" }
            ,{char: "⚘" }
            ,{char: "☘" }

            ,{char: "♚" }
            ,{char: "♔" }
            ,{char: "♛" }
            ,{char: "♕" }
            ,{char: "♜" }
            ,{char: "♖" }
            ,{char: "♝" }
            ,{char: "♗" }
            ,{char: "♞" }
            ,{char: "♘" }
            ,{char: "♟" }
            ,{char: "♙" }

            ,{char: "♥" }
            ,{char: "♡" }
            ,{char: "♠" }
            ,{char: "♤" }
            ,{char: "♦" }
            ,{char: "♢" }
            ,{char: "♣" }
            ,{char: "♧" }

            ,{char: "✩" }
            ,{char: "★" }
            ,{char: "☆" }
            ,{char: "✪" }
            ,{char: "✫" }
            ,{char: "✬" }
            ,{char: "✭" }
            ,{char: "✮" }
            ,{char: "✯" }
            ,{char: "✰" }
            ,{char: "☼" }
            ,{char: "☸" }
            ,{char: "☉" }
            ,{char: "❂" }

            ,{char: "♬" }
            ,{char: "♫" }
            ,{char: "♩" }

            ,{char: "♺" }
            ,{char: "♽" }
            ,{char: "♼" }
            ,{char: "♻" }
            ,{char: "♲" }
            ,{char: "♳" }
            ,{char: "♴" }
            ,{char: "♵" }
            ,{char: "♶" }
            ,{char: "♷" }
            ,{char: "♸" }
            ,{char: "♹" }

            ,{char: "✱" }
            ,{char: "✲" }
            ,{char: "✳" }
            ,{char: "✴" }
            ,{char: "✵" }
            ,{char: "✶" }
            ,{char: "✷" }
            ,{char: "✸" }
            ,{char: "✹" }
            ,{char: "✺" }
            ,{char: "✻" }
            ,{char: "✼" }
            ,{char: "❉" }
            ,{char: "❊" }
            ,{char: "❋" }

            ,{char: "❄" }
            ,{char: "❅" }
            ,{char: "❆" }

            ,{char: "☤" }
            ,{char: "⚕" }
            ,{char: "⚒" }
            ,{char: "⚓" }
            ,{char: "⚙" }
            ,{char: "⚜" }

            ,{char: "☢" }
            ,{char: "☣" }
            ,{char: "⚝" }
            ,{char: "⚛" }

            ,{char: "☐" }
            ,{char: "☑" }
            ,{char: "☒" }
            ,{char: "✓" }
            ,{char: "✔" }
            ,{char: "✕" }
            ,{char: "✖" }
            ,{char: "✗" }
            ,{char: "✘" }
            ,{char: "✚" }

            ,{char: "✌" }
            ,{char: "✍" }
            ,{char: "☟" }
            ,{char: "☝" }
            ,{char: "☜" }
            ,{char: "☚" }
            ,{char: "☞" }
            ,{char: "☛" }

            ,{char: "➘" }
            ,{char: "➙" }
            ,{char: "➚" }
            ,{char: "➝" }
            ,{char: "➜" }
            ,{char: "➟" }
            ,{char: "➡" }
            ,{char: "➢" }
            ,{char: "➤" }
            ,{char: "➩" }
            ,{char: "⟲" }
            ,{char: "⟳" }
            ,{char: "⟷" }
            ,{char: "⟵" }
            ,{char: "⟶" }
            ,{char: "⟿" }

            ,{char: "✂" }
            ,{char: "✄" }
            ,{char: "✏" }
            ,{char: "✎" }
            ,{char: "✐" }

            ,{char: "™" }

            ,{ entity: "&copy;", hex: "&#00A9;", name: "COPYRIGHT SIGN", char: "©" }
            ,{ entity: "&reg;", hex: "&#00AE;", name: "REGISTERED SIGN", char: "®" }
            ,{char: "$" }
            ,{char: "€" }
            ,{ entity: "&cent;", hex: "&#00A2;", name: "CENT SIGN", char: "¢" }
            ,{ entity: "&pound;", hex: "&#00A3;", name: "POUND SIGN", char: "£" }
            ,{ entity: "&curren;", hex: "&#00A4;", name: "CURRENCY SIGN", char: "¤" }
            ,{ entity: "&yen;", hex: "&#00A5;", name: "YEN SIGN", char: "¥" }
            ,{ entity: "&para;", hex: "&#00B6;", name: "PILCROW SIGN", char: "¶" }
            ,{ entity: "&sect;", hex: "&#00A7;", name: "SECTION SIGN", char: "§" }

            ,{ char: "❝" }
            ,{ char:"❞" }
            ,{ char:"∞" }
            ,{ char:"ø" }
            ,{ char:"≠" }
            ,{ char:"%" }
            ,{ char:"…" }
            ,{ char:"∫" }
            ,{ char:"≈" }
            ,{ char:"∴" }
            ,{ char:"∝" }
            ,{ char:"µ" }
            ,{ char:"∂" }
            ,{ char:"Ω" }
            ,{ char:"Φ" }
            ,{ char:"Ψ" }
            ,{ char:"λ" }
            ,{ char:"ϴ" }
            ,{ char:"ω" }
            ,{ char:"ꝏ" }
            ,{ char:"ᵠ" }
            ,{ char:"℃" }
            ,{ char:"℉" }
            ,{ char:"⚑" }
            ,{ char:"⚐" }
            ,{ char:"❦" }
            ,{ char:"☙" }
            ,{ char:"♨" }
            ,{ char:"☁" }
            ,{ char:"⚖" }

            ,{ entity: "&uml;", hex: "&#00A8;", name: "DIAERESIS", char: "¨" }
            ,{ entity: "&not;", hex: "&#00AC;", name: "NOT SIGN", char: "¬" }
            ,{ entity: "&macr;", hex: "&#00AF;", name: "MACRON", char: "¯" }
            ,{ entity: "&acute;", hex: "&#00B4;", name: "ACUTE ACCENT", char: "´" }
            ,{ entity: "&micro;", hex: "&#00B5;", name: "MICRO SIGN", char: "µ" }
            ,{ entity: "&middot;", hex: "&#00B7;", name: "MIDDLE DOT", char: "·" }
            ,{ entity: "&cedil;", hex: "&#00B8;", name: "CEDILLA", char: "¸" }
            ,{ entity: "&plusmn;", hex: "&#00B1;", name: "PLUS-MINUS SIGN", char: "±" }
            ,{ entity: "&sup1;", hex: "&#00B9;", name: "SUPERSCRIPT ONE", char: "¹" }
            ,{ entity: "&sup2;", hex: "&#00B2;", name: "SUPERSCRIPT TWO", char: "²" }
            ,{ entity: "&sup3;", hex: "&#00B3;", name: "SUPERSCRIPT THREE", char: "³" }
            ,{ entity: "&deg;", hex: "&#00B0;", name: "DEGREE SIGN", char: "°" }
            ,{ entity: "&ordf;", hex: "&#00AA;", name: "FEMININE ORDINAL INDICATOR", char: "ª" }
            ,{ entity: "&ordm;", hex: "&#00BA;", name: "MASCULINE ORDINAL INDICATOR", char: "º" }
            ,{ entity: "&frac14;", hex: "&#00BC;", name: "VULGAR FRACTION ONE QUARTER", char: "¼" }
            ,{ entity: "&frac12;", hex: "&#00BD;", name: "VULGAR FRACTION ONE HALF", char: "½" }
            ,{ entity: "&frac34;", hex: "&#00BE;", name: "VULGAR FRACTION THREE QUARTERS", char: "¾" }
            ,{ entity: "&iquest;", hex: "&#00BF;", name: "INVERTED QUESTION MARK", char: "¿" }
            ,{ entity: "&iexcl;", hex: "&#00A1;", name: "INVERTED EXCLAMATION MARK", char: "¡" }
            ,{ entity: "&brvbar;", hex: "&#00A6;", name: "BROKEN BAR", char: "¦" }

            ,{ entity: "&laquo;", hex: "&#00AB;", name: "LEFT-POINTING DOUBLE ANGLE QUOTATION MARK", char: "«" }
            ,{ entity: "&raquo;", hex: "&#00BB;", name: "RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK", char: "»" }

            ,{ hex: "&#25A0;", name: "BLACK SQUARE", char: "■" }
            ,{ hex: "&#25A1;", name: "WHITE SQUARE", char: "□" }
            ,{ hex: "&#25A2;", name: "WHITE SQUARE WITH ROUNDED CORNERS", char: "▢" }
            ,{ hex: "&#25A3;", name: "WHITE SQUARE CONTAINING BLACK SMALL SQUARE", char: "▣" }
            ,{ hex: "&#25A4;", name: "SQUARE WITH HORIZONTAL FILL", char: "▤" }
            ,{ hex: "&#25A5;", name: "SQUARE WITH VERTICAL FILL", char: "▥" }
            ,{ hex: "&#25A6;", name: "SQUARE WITH ORTHOGONAL CROSSHATCH FILL", char: "▦" }
            ,{ hex: "&#25A7;", name: "SQUARE WITH UPPER LEFT TO LOWER RIGHT FILL", char: "▧" }
            ,{ hex: "&#25A8;", name: "SQUARE WITH UPPER RIGHT TO LOWER LEFT FILL", char: "▨" }
            ,{ hex: "&#25A9;", name: "SQUARE WITH DIAGONAL CROSSHATCH FILL", char: "▩" }
            ,{ hex: "&#25AA;", name: "BLACK SMALL SQUARE", char: "▪" }
            ,{ hex: "&#25AB;", name: "WHITE SMALL SQUARE", char: "▫" }
            ,{ hex: "&#25AC;", name: "BLACK RECTANGLE", char: "▬" }
            ,{ hex: "&#25AD;", name: "WHITE RECTANGLE", char: "▭" }
            ,{ hex: "&#25AE;", name: "BLACK VERTICAL RECTANGLE", char: "▮" }
            ,{ hex: "&#25AF;", name: "WHITE VERTICAL RECTANGLE", char: "▯" }
            ,{ hex: "&#25B0;", name: "BLACK PARALLELOGRAM", char: "▰" }
            ,{ hex: "&#25B1;", name: "WHITE PARALLELOGRAM", char: "▱" }
            ,{ hex: "&#25B2;", name: "BLACK UP-POINTING TRIANGLE", char: "▲" }
            ,{ hex: "&#25B3;", name: "WHITE UP-POINTING TRIANGLE", char: "△" }
            ,{ hex: "&#25B4;", name: "BLACK UP-POINTING SMALL TRIANGLE", char: "▴" }
            ,{ hex: "&#25B5;", name: "WHITE UP-POINTING SMALL TRIANGLE", char: "▵" }
            ,{ hex: "&#25B6;", name: "BLACK RIGHT-POINTING TRIANGLE", char: "▶" }
            ,{ hex: "&#25B7;", name: "WHITE RIGHT-POINTING TRIANGLE", char: "▷" }
            ,{ hex: "&#25B8;", name: "BLACK RIGHT-POINTING SMALL TRIANGLE", char: "▸" }
            ,{ hex: "&#25B9;", name: "WHITE RIGHT-POINTING SMALL TRIANGLE", char: "▹" }
            ,{ hex: "&#25BA;", name: "BLACK RIGHT-POINTING POINTER", char: "►" }
            ,{ hex: "&#25BB;", name: "WHITE RIGHT-POINTING POINTER", char: "▻" }
            ,{ hex: "&#25BC;", name: "BLACK DOWN-POINTING TRIANGLE", char: "▼" }
            ,{ hex: "&#25BD;", name: "WHITE DOWN-POINTING TRIANGLE", char: "▽" }
            ,{ hex: "&#25BE;", name: "BLACK DOWN-POINTING SMALL TRIANGLE", char: "▾" }
            ,{ hex: "&#25BF;", name: "WHITE DOWN-POINTING SMALL TRIANGLE", char: "▿" }
            ,{ hex: "&#25C0;", name: "BLACK LEFT-POINTING TRIANGLE", char: "◀" }
            ,{ hex: "&#25C1;", name: "WHITE LEFT-POINTING TRIANGLE", char: "◁" }
            ,{ hex: "&#25C2;", name: "BLACK LEFT-POINTING SMALL TRIANGLE", char: "◂" }
            ,{ hex: "&#25C3;", name: "WHITE LEFT-POINTING SMALL TRIANGLE", char: "◃" }
            ,{ hex: "&#25C4;", name: "BLACK LEFT-POINTING POINTER", char: "◄" }
            ,{ hex: "&#25C5;", name: "WHITE LEFT-POINTING POINTER", char: "◅" }
            ,{ hex: "&#25C6;", name: "BLACK DIAMOND", char: "◆" }
            ,{ hex: "&#25C7;", name: "WHITE DIAMOND", char: "◇" }
            ,{ hex: "&#25C8;", name: "WHITE DIAMOND CONTAINING BLACK SMALL DIAMOND", char: "◈" }
            ,{ hex: "&#25C9;", name: "FISHEYE", char: "◉" }
            ,{ entity: "&loz;", hex: "&#25CA;", name: "LOZENGE", char: "◊" }
            ,{ hex: "&#25CB;", name: "WHITE CIRCLE", char: "○" }
            ,{ hex: "&#25CC;", name: "DOTTED CIRCLE", char: "◌" }
            ,{ hex: "&#25CD;", name: "CIRCLE WITH VERTICAL FILL", char: "◍" }
            ,{ hex: "&#25CE;", name: "BULLSEYE", char: "◎" }
            ,{ hex: "&#25CF;", name: "BLACK CIRCLE", char: "●" }
            ,{ hex: "&#25D0;", name: "CIRCLE WITH LEFT HALF BLACK", char: "◐" }
            ,{ hex: "&#25D1;", name: "CIRCLE WITH RIGHT HALF BLACK", char: "◑" }
            ,{ hex: "&#25D2;", name: "CIRCLE WITH LOWER HALF BLACK", char: "◒" }
            ,{ hex: "&#25D3;", name: "CIRCLE WITH UPPER HALF BLACK", char: "◓" }
            ,{ hex: "&#25D4;", name: "CIRCLE WITH UPPER RIGHT QUADRANT BLACK", char: "◔" }
            ,{ hex: "&#25D5;", name: "CIRCLE WITH ALL BUT UPPER LEFT QUADRANT BLACK", char: "◕" }
            ,{ hex: "&#25D6;", name: "LEFT HALF BLACK CIRCLE", char: "◖" }
            ,{ hex: "&#25D7;", name: "RIGHT HALF BLACK CIRCLE", char: "◗" }
            ,{ hex: "&#25D8;", name: "INVERSE BULLET", char: "◘" }
            ,{ hex: "&#25D9;", name: "INVERSE WHITE CIRCLE", char: "◙" }
            ,{ hex: "&#25DA;", name: "UPPER HALF INVERSE WHITE CIRCLE", char: "◚" }
            ,{ hex: "&#25DB;", name: "LOWER HALF INVERSE WHITE CIRCLE", char: "◛" }
            ,{ hex: "&#25DC;", name: "UPPER LEFT QUADRANT CIRCULAR ARC", char: "◜" }
            ,{ hex: "&#25DD;", name: "UPPER RIGHT QUADRANT CIRCULAR ARC", char: "◝" }
            ,{ hex: "&#25DE;", name: "LOWER RIGHT QUADRANT CIRCULAR ARC", char: "◞" }
            ,{ hex: "&#25DF;", name: "LOWER LEFT QUADRANT CIRCULAR ARC", char: "◟" }
            ,{ hex: "&#25E0;", name: "UPPER HALF CIRCLE", char: "◠" }
            ,{ hex: "&#25E1;", name: "LOWER HALF CIRCLE", char: "◡" }
            ,{ hex: "&#25E2;", name: "BLACK LOWER RIGHT TRIANGLE", char: "◢" }
            ,{ hex: "&#25E3;", name: "BLACK LOWER LEFT TRIANGLE", char: "◣" }
            ,{ hex: "&#25E4;", name: "BLACK UPPER LEFT TRIANGLE", char: "◤" }
            ,{ hex: "&#25E5;", name: "BLACK UPPER RIGHT TRIANGLE", char: "◥" }
            ,{ hex: "&#25E6;", name: "WHITE BULLET", char: "◦" }
            ,{ hex: "&#25E7;", name: "SQUARE WITH LEFT HALF BLACK", char: "◧" }
            ,{ hex: "&#25E8;", name: "SQUARE WITH RIGHT HALF BLACK", char: "◨" }
            ,{ hex: "&#25E9;", name: "SQUARE WITH UPPER LEFT DIAGONAL HALF BLACK", char: "◩" }
            ,{ hex: "&#25EA;", name: "SQUARE WITH LOWER RIGHT DIAGONAL HALF BLACK", char: "◪" }
            ,{ hex: "&#25EB;", name: "WHITE SQUARE WITH VERTICAL BISECTING LINE", char: "◫" }
            ,{ hex: "&#25EC;", name: "WHITE UP-POINTING TRIANGLE WITH DOT", char: "◬" }
            ,{ hex: "&#25ED;", name: "UP-POINTING TRIANGLE WITH LEFT HALF BLACK", char: "◭" }
            ,{ hex: "&#25EE;", name: "UP-POINTING TRIANGLE WITH RIGHT HALF BLACK", char: "◮" }
            ,{ hex: "&#25EF;", name: "LARGE CIRCLE", char: "◯" }
            ,{ hex: "&#25F0;", name: "WHITE SQUARE WITH UPPER LEFT QUADRANT", char: "◰" }
            ,{ hex: "&#25F1;", name: "WHITE SQUARE WITH LOWER LEFT QUADRANT", char: "◱" }
            ,{ hex: "&#25F2;", name: "WHITE SQUARE WITH LOWER RIGHT QUADRANT", char: "◲" }
            ,{ hex: "&#25F3;", name: "WHITE SQUARE WITH UPPER RIGHT QUADRANT", char: "◳" }
            ,{ hex: "&#25F4;", name: "WHITE CIRCLE WITH UPPER LEFT QUADRANT", char: "◴" }
            ,{ hex: "&#25F5;", name: "WHITE CIRCLE WITH LOWER LEFT QUADRANT", char: "◵" }
            ,{ hex: "&#25F6;", name: "WHITE CIRCLE WITH LOWER RIGHT QUADRANT", char: "◶" }
            ,{ hex: "&#25F7;", name: "WHITE CIRCLE WITH UPPER RIGHT QUADRANT", char: "◷" }
            ,{ hex: "&#25F8;", name: "UPPER LEFT TRIANGLE", char: "◸" }
            ,{ hex: "&#25F9;", name: "UPPER RIGHT TRIANGLE", char: "◹" }
            ,{ hex: "&#25FA;", name: "LOWER LEFT TRIANGLE", char: "◺" }
            ,{ hex: "&#25FB;", name: "WHITE MEDIUM SQUARE", char: "◻" }
            ,{ hex: "&#25FC;", name: "BLACK MEDIUM SQUARE", char: "◼" }
            ,{ hex: "&#25FD;", name: "WHITE MEDIUM SMALL SQUARE", char: "◽" }
            ,{ hex: "&#25FE;", name: "BLACK MEDIUM SMALL SQUARE", char: "◾" }
            ,{ hex: "&#25FF;", name: "LOWER RIGHT TRIANGLE", char: "◿" }


            ,{ hex: "&#2B12;", name: "SQUARE WITH TOP HALF BLACK", char: "⬒" }
            ,{ hex: "&#2B13;", name: "SQUARE WITH BOTTOM HALF BLACK", char: "⬓" }
            ,{ hex: "&#2B14;", name: "SQUARE WITH UPPER RIGHT DIAGONAL HALF BLACK", char: "⬔" }
            ,{ hex: "&#2B15;", name: "SQUARE WITH LOWER LEFT DIAGONAL HALF BLACK", char: "⬕" }
            ,{ hex: "&#2B16;", name: "DIAMOND WITH LEFT HALF BLACK", char: "⬖" }
            ,{ hex: "&#2B17;", name: "DIAMOND WITH RIGHT HALF BLACK", char: "⬗" }
            ,{ hex: "&#2B18;", name: "DIAMOND WITH TOP HALF BLACK", char: "⬘" }
            ,{ hex: "&#2B19;", name: "DIAMOND WITH BOTTOM HALF BLACK", char: "⬙" }
            ,{ hex: "&#2B1A;", name: "DOTTED SQUARE", char: "⬚" }
            ,{ hex: "&#2B1F;", name: "BLACK PENTAGON", char: "⬟" }
            ,{ hex: "&#2B20;", name: "WHITE PENTAGON", char: "⬠" }
            ,{ hex: "&#2B21;", name: "WHITE HEXAGON", char: "⬡" }
            ,{ hex: "&#2B22;", name: "BLACK HEXAGON", char: "⬢" }
            ,{ hex: "&#2B23;", name: "HORIZONTAL BLACK HEXAGON", char: "⬣" }
            ,{ hex: "&#2B24;", name: "BLACK LARGE CIRCLE", char: "⬤" }
            ,{ hex: "&#2B53;", name: "BLACK RIGHT-POINTING PENTAGON", char: "⭓" }
            ,{ hex: "&#2B54;", name: "WHITE RIGHT-POINTING PENTAGON", char: "⭔" }

            ,{ hex: "&#2600;", name: "BLACK SUN WITH RAYS", char: "☀" }
            ,{ hex: "&#2601;", name: "CLOUD", char: "☁" }
            ,{ hex: "&#2602;", name: "UMBRELLA", char: "☂" }
            ,{ hex: "&#2603;", name: "SNOWMAN", char: "☃" }
            ,{ hex: "&#2604;", name: "COMET", char: "☄" }
            ,{ hex: "&#2605;", name: "BLACK STAR", char: "★" }
            ,{ hex: "&#2606;", name: "WHITE STAR", char: "☆" }
            ,{ hex: "&#2607;", name: "LIGHTNING", char: "☇" }
            ,{ hex: "&#2608;", name: "THUNDERSTORM", char: "☈" }
            ,{ hex: "&#2609;", name: "SUN", char: "☉" }
            ,{ hex: "&#260A;", name: "ASCENDING NODE", char: "☊" }
            ,{ hex: "&#260B;", name: "DESCENDING NODE", char: "☋" }
            ,{ hex: "&#260C;", name: "CONJUNCTION", char: "☌" }
            ,{ hex: "&#260D;", name: "OPPOSITION", char: "☍" }
            ,{ hex: "&#260E;", name: "BLACK TELEPHONE", char: "☎" }
            ,{ hex: "&#260F;", name: "WHITE TELEPHONE", char: "☏" }
            ,{ hex: "&#2610;", name: "BALLOT BOX", char: "☐" }
            ,{ hex: "&#2611;", name: "BALLOT BOX WITH CHECK", char: "☑" }
            ,{ hex: "&#2612;", name: "BALLOT BOX WITH X", char: "☒" }
            ,{ hex: "&#2613;", name: "SALTIRE", char: "☓" }
            ,{ hex: "&#2614;", name: "UMBRELLA WITH RAIN DROPS", char: "☔" }
            ,{ hex: "&#2615;", name: "HOT BEVERAGE", char: "☕" }
            ,{ hex: "&#2616;", name: "WHITE SHOGI PIECE", char: "☖" }
            ,{ hex: "&#2617;", name: "BLACK SHOGI PIECE", char: "☗" }
            ,{ hex: "&#2618;", name: "SHAMROCK", char: "☘" }
            ,{ hex: "&#2619;", name: "REVERSED ROTATED FLORAL HEART BULLET", char: "☙" }
            ,{ hex: "&#261A;", name: "BLACK LEFT POINTING INDEX", char: "☚" }
            ,{ hex: "&#261B;", name: "BLACK RIGHT POINTING INDEX", char: "☛" }
            ,{ hex: "&#261C;", name: "WHITE LEFT POINTING INDEX", char: "☜" }
            ,{ hex: "&#261D;", name: "WHITE UP POINTING INDEX", char: "☝" }
            ,{ hex: "&#261E;", name: "WHITE RIGHT POINTING INDEX", char: "☞" }
            ,{ hex: "&#261F;", name: "WHITE DOWN POINTING INDEX", char: "☟" }
            ,{ hex: "&#2620;", name: "SKULL AND CROSSBONES", char: "☠" }
            ,{ hex: "&#2621;", name: "CAUTION SIGN", char: "☡" }
            ,{ hex: "&#2622;", name: "RADIOACTIVE SIGN", char: "☢" }
            ,{ hex: "&#2623;", name: "BIOHAZARD SIGN", char: "☣" }
            ,{ hex: "&#2624;", name: "CADUCEUS", char: "☤" }
            ,{ hex: "&#2625;", name: "ANKH", char: "☥" }
            ,{ hex: "&#2626;", name: "ORTHODOX CROSS", char: "☦" }
            ,{ hex: "&#2627;", name: "CHI RHO", char: "☧" }
            ,{ hex: "&#2628;", name: "CROSS OF LORRAINE", char: "☨" }
            ,{ hex: "&#2629;", name: "CROSS OF JERUSALEM", char: "☩" }
            ,{ hex: "&#262A;", name: "STAR AND CRESCENT", char: "☪" }
            ,{ hex: "&#262B;", name: "FARSI SYMBOL", char: "☫" }
            ,{ hex: "&#262C;", name: "ADI SHAKTI", char: "☬" }
            ,{ hex: "&#262D;", name: "HAMMER AND SICKLE", char: "☭" }
            ,{ hex: "&#262E;", name: "PEACE SYMBOL", char: "☮" }
            ,{ hex: "&#262F;", name: "YIN YANG", char: "☯" }
            ,{ hex: "&#2630;", name: "TRIGRAM FOR HEAVEN", char: "☰" }
            ,{ hex: "&#2631;", name: "TRIGRAM FOR LAKE", char: "☱" }
            ,{ hex: "&#2632;", name: "TRIGRAM FOR FIRE", char: "☲" }
            ,{ hex: "&#2633;", name: "TRIGRAM FOR THUNDER", char: "☳" }
            ,{ hex: "&#2634;", name: "TRIGRAM FOR WIND", char: "☴" }
            ,{ hex: "&#2635;", name: "TRIGRAM FOR WATER", char: "☵" }
            ,{ hex: "&#2636;", name: "TRIGRAM FOR MOUNTAIN", char: "☶" }
            ,{ hex: "&#2637;", name: "TRIGRAM FOR EARTH", char: "☷" }
            ,{ hex: "&#2638;", name: "WHEEL OF DHARMA", char: "☸" }
            ,{ hex: "&#2639;", name: "WHITE FROWNING FACE", char: "☹" }
            ,{ hex: "&#263A;", name: "WHITE SMILING FACE", char: "☺" }
            ,{ hex: "&#263B;", name: "BLACK SMILING FACE", char: "☻" }
            ,{ hex: "&#263C;", name: "WHITE SUN WITH RAYS", char: "☼" }
            ,{ hex: "&#263D;", name: "FIRST QUARTER MOON", char: "☽" }
            ,{ hex: "&#263E;", name: "LAST QUARTER MOON", char: "☾" }
            ,{ hex: "&#263F;", name: "MERCURY", char: "☿" }
            ,{ hex: "&#2640;", name: "FEMALE SIGN", char: "♀" }
            ,{ hex: "&#2641;", name: "EARTH", char: "♁" }
            ,{ hex: "&#2642;", name: "MALE SIGN", char: "♂" }
            ,{ hex: "&#2643;", name: "JUPITER", char: "♃" }
            ,{ hex: "&#2644;", name: "SATURN", char: "♄" }
            ,{ hex: "&#2645;", name: "URANUS", char: "♅" }
            ,{ hex: "&#2646;", name: "NEPTUNE", char: "♆" }
            ,{ hex: "&#2647;", name: "PLUTO", char: "♇" }
            ,{ hex: "&#2648;", name: "ARIES", char: "♈" }
            ,{ hex: "&#2649;", name: "TAURUS", char: "♉" }
            ,{ hex: "&#264A;", name: "GEMINI", char: "♊" }
            ,{ hex: "&#264B;", name: "CANCER", char: "♋" }
            ,{ hex: "&#264C;", name: "LEO", char: "♌" }
            ,{ hex: "&#264D;", name: "VIRGO", char: "♍" }
            ,{ hex: "&#264E;", name: "LIBRA", char: "♎" }
            ,{ hex: "&#264F;", name: "SCORPIUS", char: "♏" }
            ,{ hex: "&#2650;", name: "SAGITTARIUS", char: "♐" }
            ,{ hex: "&#2651;", name: "CAPRICORN", char: "♑" }
            ,{ hex: "&#2652;", name: "AQUARIUS", char: "♒" }
            ,{ hex: "&#2653;", name: "PISCES", char: "♓" }
            ,{ hex: "&#2654;", name: "WHITE CHESS KING", char: "♔" }
            ,{ hex: "&#2655;", name: "WHITE CHESS QUEEN", char: "♕" }
            ,{ hex: "&#2656;", name: "WHITE CHESS ROOK", char: "♖" }
            ,{ hex: "&#2657;", name: "WHITE CHESS BISHOP", char: "♗" }
            ,{ hex: "&#2658;", name: "WHITE CHESS KNIGHT", char: "♘" }
            ,{ hex: "&#2659;", name: "WHITE CHESS PAWN", char: "♙" }
            ,{ hex: "&#265A;", name: "BLACK CHESS KING", char: "♚" }
            ,{ hex: "&#265B;", name: "BLACK CHESS QUEEN", char: "♛" }
            ,{ hex: "&#265C;", name: "BLACK CHESS ROOK", char: "♜" }
            ,{ hex: "&#265D;", name: "BLACK CHESS BISHOP", char: "♝" }
            ,{ hex: "&#265E;", name: "BLACK CHESS KNIGHT", char: "♞" }
            ,{ hex: "&#265F;", name: "BLACK CHESS PAWN", char: "♟" }
            ,{ hex: "&#2660;" , entity: "&spades;", name: "BLACK SPADE SUIT", char: "♠" }
            ,{ hex: "&#2661;", name: "WHITE HEART SUIT", char: "♡" }
            ,{ hex: "&#2662;", name: "WHITE DIAMOND SUIT", char: "♢" }
            ,{ hex: "&#2663;" , entity: "&clubs;", name: "BLACK CLUB SUIT", char: "♣" }
            ,{ hex: "&#2664;", name: "WHITE SPADE SUIT", char: "♤" }
            ,{ hex: "&#2665;" , entity: "&hearts;", name: "BLACK HEART SUIT", char: "♥" }
            ,{ hex: "&#2666;" , entity: "&diams;", name: "BLACK DIAMOND SUIT", char: "♦" }
            ,{ hex: "&#2667;", name: "WHITE CLUB SUIT", char: "♧" }
            ,{ hex: "&#2668;", name: "HOT SPRINGS", char: "♨" }
            ,{ hex: "&#2669;", name: "QUARTER NOTE", char: "♩" }
            ,{ hex: "&#266A;", name: "EIGHTH NOTE", char: "♪" }
            ,{ hex: "&#266B;", name: "BEAMED EIGHTH NOTES", char: "♫" }
            ,{ hex: "&#266C;", name: "BEAMED SIXTEENTH NOTES", char: "♬" }
            ,{ hex: "&#266D;", name: "MUSIC FLAT SIGN", char: "♭" }
            ,{ hex: "&#266E;", name: "MUSIC NATURAL SIGN", char: "♮" }
            ,{ hex: "&#266F;", name: "MUSIC SHARP SIGN", char: "♯" }
            ,{ hex: "&#2670;", name: "WEST SYRIAC CROSS", char: "♰" }
            ,{ hex: "&#2671;", name: "EAST SYRIAC CROSS", char: "♱" }
            ,{ hex: "&#2672;", name: "UNIVERSAL RECYCLING SYMBOL", char: "♲" }
            ,{ hex: "&#2673;", name: "RECYCLING SYMBOL FOR TYPE-1 PLASTICS", char: "♳" }
            ,{ hex: "&#2674;", name: "RECYCLING SYMBOL FOR TYPE-2 PLASTICS", char: "♴" }
            ,{ hex: "&#2675;", name: "RECYCLING SYMBOL FOR TYPE-3 PLASTICS", char: "♵" }
            ,{ hex: "&#2676;", name: "RECYCLING SYMBOL FOR TYPE-4 PLASTICS", char: "♶" }
            ,{ hex: "&#2677;", name: "RECYCLING SYMBOL FOR TYPE-5 PLASTICS", char: "♷" }
            ,{ hex: "&#2678;", name: "RECYCLING SYMBOL FOR TYPE-6 PLASTICS", char: "♸" }
            ,{ hex: "&#2679;", name: "RECYCLING SYMBOL FOR TYPE-7 PLASTICS", char: "♹" }
            ,{ hex: "&#267A;", name: "RECYCLING SYMBOL FOR GENERIC MATERIALS", char: "♺" }
            ,{ hex: "&#267B;", name: "BLACK UNIVERSAL RECYCLING SYMBOL", char: "♻" }
            ,{ hex: "&#267C;", name: "RECYCLED PAPER SYMBOL", char: "♼" }
            ,{ hex: "&#267D;", name: "PARTIALLY-RECYCLED PAPER SYMBOL", char: "♽" }
            ,{ hex: "&#267E;", name: "PERMANENT PAPER SIGN", char: "♾" }
            ,{ hex: "&#267F;", name: "WHEELCHAIR SYMBOL", char: "♿" }
            ,{ hex: "&#2680;", name: "DIE FACE-1", char: "⚀" }
            ,{ hex: "&#2681;", name: "DIE FACE-2", char: "⚁" }
            ,{ hex: "&#2682;", name: "DIE FACE-3", char: "⚂" }
            ,{ hex: "&#2683;", name: "DIE FACE-4", char: "⚃" }
            ,{ hex: "&#2684;", name: "DIE FACE-5", char: "⚄" }
            ,{ hex: "&#2685;", name: "DIE FACE-6", char: "⚅" }
            ,{ hex: "&#2686;", name: "WHITE CIRCLE WITH DOT RIGHT", char: "⚆" }
            ,{ hex: "&#2687;", name: "WHITE CIRCLE WITH TWO DOTS", char: "⚇" }
            ,{ hex: "&#2688;", name: "BLACK CIRCLE WITH WHITE DOT RIGHT", char: "⚈" }
            ,{ hex: "&#2689;", name: "BLACK CIRCLE WITH TWO WHITE DOTS", char: "⚉" }
            ,{ hex: "&#268A;", name: "MONOGRAM FOR YANG", char: "⚊" }
            ,{ hex: "&#268B;", name: "MONOGRAM FOR YIN", char: "⚋" }
            ,{ hex: "&#268C;", name: "DIGRAM FOR GREATER YANG", char: "⚌" }
            ,{ hex: "&#268D;", name: "DIGRAM FOR LESSER YIN", char: "⚍" }
            ,{ hex: "&#268E;", name: "DIGRAM FOR LESSER YANG", char: "⚎" }
            ,{ hex: "&#268F;", name: "DIGRAM FOR GREATER YIN", char: "⚏" }
            ,{ hex: "&#2690;", name: "WHITE FLAG", char: "⚐" }
            ,{ hex: "&#2691;", name: "BLACK FLAG", char: "⚑" }
            ,{ hex: "&#2692;", name: "HAMMER AND PICK", char: "⚒" }
            ,{ hex: "&#2693;", name: "ANCHOR", char: "⚓" }
            ,{ hex: "&#2694;", name: "CROSSED SWORDS", char: "⚔" }
            ,{ hex: "&#2695;", name: "STAFF OF AESCULAPIUS", char: "⚕" }
            ,{ hex: "&#2696;", name: "SCALES", char: "⚖" }
            ,{ hex: "&#2697;", name: "ALEMBIC", char: "⚗" }
            ,{ hex: "&#2698;", name: "FLOWER", char: "⚘" }
            ,{ hex: "&#2699;", name: "GEAR", char: "⚙" }
            ,{ hex: "&#269A;", name: "STAFF OF HERMES", char: "⚚" }
            ,{ hex: "&#269B;", name: "ATOM SYMBOL", char: "⚛" }
            ,{ hex: "&#269C;", name: "FLEUR-DE-LIS", char: "⚜" }
            ,{ hex: "&#26A0;", name: "WARNING SIGN", char: "⚠" }
            ,{ hex: "&#26A1;", name: "HIGH VOLTAGE SIGN", char: "⚡" }
            ,{ hex: "&#26A2;", name: "DOUBLED FEMALE SIGN", char: "⚢" }
            ,{ hex: "&#26A3;", name: "DOUBLED MALE SIGN", char: "⚣" }
            ,{ hex: "&#26A4;", name: "INTERLOCKED FEMALE AND MALE SIGN", char: "⚤" }
            ,{ hex: "&#26A5;", name: "MALE AND FEMALE SIGN", char: "⚥" }
            ,{ hex: "&#26A6;", name: "MALE WITH STROKE SIGN", char: "⚦" }
            ,{ hex: "&#26A7;", name: "MALE WITH STROKE AND MALE AND FEMALE SIGN", char: "⚧" }
            ,{ hex: "&#26A8;", name: "VERTICAL MALE WITH STROKE SIGN", char: "⚨" }
            ,{ hex: "&#26A9;", name: "HORIZONTAL MALE WITH STROKE SIGN", char: "⚩" }
            ,{ hex: "&#26AA;", name: "MEDIUM WHITE CIRCLE", char: "⚪" }
            ,{ hex: "&#26AB;", name: "MEDIUM BLACK CIRCLE", char: "⚫" }
            ,{ hex: "&#26AC;", name: "MEDIUM SMALL WHITE CIRCLE", char: "⚬" }
            ,{ hex: "&#26AD;", name: "MARRIAGE SYMBOL", char: "⚭" }
            ,{ hex: "&#26AE;", name: "DIVORCE SYMBOL", char: "⚮" }
            ,{ hex: "&#26AF;", name: "UNMARRIED PARTNERSHIP SYMBOL", char: "⚯" }
            ,{ hex: "&#26B0;", name: "COFFIN", char: "⚰" }
            ,{ hex: "&#26B1;", name: "FUNERAL URN", char: "⚱" }
            ,{ hex: "&#26B2;", name: "NEUTER", char: "⚲" }
            ,{ hex: "&#26B3;", name: "CERES", char: "⚳" }
            ,{ hex: "&#26B4;", name: "PALLAS", char: "⚴" }
            ,{ hex: "&#26B5;", name: "JUNO", char: "⚵" }
            ,{ hex: "&#26B6;", name: "VESTA", char: "⚶" }
            ,{ hex: "&#26B7;", name: "CHIRON", char: "⚷" }
            ,{ hex: "&#26B8;", name: "BLACK MOON LILITH", char: "⚸" }

            ,{ hex: "&#2701;", name: "UPPER BLADE SCISSORS", char: "✁" }
            ,{ hex: "&#2702;", name: "BLACK SCISSORS", char: "✂" }
            ,{ hex: "&#2703;", name: "LOWER BLADE SCISSORS", char: "✃" }
            ,{ hex: "&#2704;", name: "WHITE SCISSORS", char: "✄" }
            ,{ hex: "&#2706;", name: "TELEPHONE LOCATION SIGN", char: "✆" }
            ,{ hex: "&#2707;", name: "TAPE DRIVE", char: "✇" }
            ,{ hex: "&#2708;", name: "AIRPLANE", char: "✈" }
            ,{ hex: "&#2709;", name: "ENVELOPE", char: "✉" }
            ,{ hex: "&#270C;", name: "VICTORY HAND", char: "✌" }
            ,{ hex: "&#270D;", name: "WRITING HAND", char: "✍" }
            ,{ hex: "&#270E;", name: "LOWER RIGHT PENCIL", char: "✎" }
            ,{ hex: "&#270F;", name: "PENCIL", char: "✏" }
            ,{ hex: "&#2710;", name: "UPPER RIGHT PENCIL", char: "✐" }
            ,{ hex: "&#2711;", name: "WHITE NIB", char: "✑" }
            ,{ hex: "&#2712;", name: "BLACK NIB", char: "✒" }
            ,{ hex: "&#2713;", name: "CHECK MARK", char: "✓" }
            ,{ hex: "&#2714;", name: "HEAVY CHECK MARK", char: "✔" }
            ,{ hex: "&#2715;", name: "MULTIPLICATION X", char: "✕" }
            ,{ hex: "&#2716;", name: "HEAVY MULTIPLICATION X", char: "✖" }
            ,{ hex: "&#2717;", name: "BALLOT X", char: "✗" }
            ,{ hex: "&#2718;", name: "HEAVY BALLOT X", char: "✘" }
            ,{ hex: "&#2719;", name: "OUTLINED GREEK CROSS", char: "✙" }
            ,{ hex: "&#271A;", name: "HEAVY GREEK CROSS", char: "✚" }
            ,{ hex: "&#271B;", name: "OPEN CENTRE CROSS", char: "✛" }
            ,{ hex: "&#271C;", name: "HEAVY OPEN CENTRE CROSS", char: "✜" }
            ,{ hex: "&#271D;", name: "LATIN CROSS", char: "✝" }
            ,{ hex: "&#271E;", name: "SHADOWED WHITE LATIN CROSS", char: "✞" }
            ,{ hex: "&#271F;", name: "OUTLINED LATIN CROSS", char: "✟" }
            ,{ hex: "&#2720;", name: "MALTESE CROSS", char: "✠" }
            ,{ hex: "&#2721;", name: "STAR OF DAVID", char: "✡" }
            ,{ hex: "&#2722;", name: "FOUR TEARDROP-SPOKED ASTERISK", char: "✢" }
            ,{ hex: "&#2723;", name: "FOUR BALLOON-SPOKED ASTERISK", char: "✣" }
            ,{ hex: "&#2724;", name: "HEAVY FOUR BALLOON-SPOKED ASTERISK", char: "✤" }
            ,{ hex: "&#2725;", name: "FOUR CLUB-SPOKED ASTERISK", char: "✥" }
            ,{ hex: "&#2726;", name: "BLACK FOUR POINTED STAR", char: "✦" }
            ,{ hex: "&#2727;", name: "WHITE FOUR POINTED STAR", char: "✧" }
            ,{ hex: "&#2729;", name: "STRESS OUTLINED WHITE STAR", char: "✩" }
            ,{ hex: "&#272A;", name: "CIRCLED WHITE STAR", char: "✪" }
            ,{ hex: "&#272B;", name: "OPEN CENTRE BLACK STAR", char: "✫" }
            ,{ hex: "&#272C;", name: "BLACK CENTRE WHITE STAR", char: "✬" }
            ,{ hex: "&#272D;", name: "OUTLINED BLACK STAR", char: "✭" }
            ,{ hex: "&#272E;", name: "HEAVY OUTLINED BLACK STAR", char: "✮" }
            ,{ hex: "&#272F;", name: "PINWHEEL STAR", char: "✯" }
            ,{ hex: "&#2730;", name: "SHADOWED WHITE STAR", char: "✰" }
            ,{ hex: "&#2731;", name: "HEAVY ASTERISK", char: "✱" }
            ,{ hex: "&#2732;", name: "OPEN CENTRE ASTERISK", char: "✲" }
            ,{ hex: "&#2733;", name: "EIGHT SPOKED ASTERISK", char: "✳" }
            ,{ hex: "&#2734;", name: "EIGHT POINTED BLACK STAR", char: "✴" }
            ,{ hex: "&#2735;", name: "EIGHT POINTED PINWHEEL STAR", char: "✵" }
            ,{ hex: "&#2736;", name: "SIX POINTED BLACK STAR", char: "✶" }
            ,{ hex: "&#2737;", name: "EIGHT POINTED RECTILINEAR BLACK STAR", char: "✷" }
            ,{ hex: "&#2738;", name: "HEAVY EIGHT POINTED RECTILINEAR BLACK STAR", char: "✸" }
            ,{ hex: "&#2739;", name: "TWELVE POINTED BLACK STAR", char: "✹" }
            ,{ hex: "&#273A;", name: "SIXTEEN POINTED ASTERISK", char: "✺" }
            ,{ hex: "&#273B;", name: "TEARDROP-SPOKED ASTERISK", char: "✻" }
            ,{ hex: "&#273C;", name: "OPEN CENTRE TEARDROP-SPOKED ASTERISK", char: "✼" }
            ,{ hex: "&#273D;", name: "HEAVY TEARDROP-SPOKED ASTERISK", char: "✽" }
            ,{ hex: "&#273E;", name: "SIX PETALLED BLACK AND WHITE FLORETTE", char: "✾" }
            ,{ hex: "&#273F;", name: "BLACK FLORETTE", char: "✿" }
            ,{ hex: "&#2740;", name: "WHITE FLORETTE", char: "❀" }
            ,{ hex: "&#2741;", name: "EIGHT PETALLED OUTLINED BLACK FLORETTE", char: "❁" }
            ,{ hex: "&#2742;", name: "CIRCLED OPEN CENTRE EIGHT POINTED STAR", char: "❂" }
            ,{ hex: "&#2743;", name: "HEAVY TEARDROP-SPOKED PINWHEEL ASTERISK", char: "❃" }
            ,{ hex: "&#2744;", name: "SNOWFLAKE", char: "❄" }
            ,{ hex: "&#2745;", name: "TIGHT TRIFOLIATE SNOWFLAKE", char: "❅" }
            ,{ hex: "&#2746;", name: "HEAVY CHEVRON SNOWFLAKE", char: "❆" }
            ,{ hex: "&#2747;", name: "SPARKLE", char: "❇" }
            ,{ hex: "&#2748;", name: "HEAVY SPARKLE", char: "❈" }
            ,{ hex: "&#2749;", name: "BALLOON-SPOKED ASTERISK", char: "❉" }
            ,{ hex: "&#274A;", name: "EIGHT TEARDROP-SPOKED PROPELLER ASTERISK", char: "❊" }
            ,{ hex: "&#274B;", name: "HEAVY EIGHT TEARDROP-SPOKED PROPELLER ASTERISK", char: "❋" }
            ,{ hex: "&#274D;", name: "SHADOWED WHITE CIRCLE", char: "❍" }
            ,{ hex: "&#274F;", name: "LOWER RIGHT DROP-SHADOWED WHITE SQUARE", char: "❏" }
            ,{ hex: "&#2750;", name: "UPPER RIGHT DROP-SHADOWED WHITE SQUARE", char: "❐" }
            ,{ hex: "&#2751;", name: "LOWER RIGHT SHADOWED WHITE SQUARE", char: "❑" }
            ,{ hex: "&#2752;", name: "UPPER RIGHT SHADOWED WHITE SQUARE", char: "❒" }
            ,{ hex: "&#2756;", name: "BLACK DIAMOND MINUS WHITE X", char: "❖" }
            ,{ hex: "&#2758;", name: "LIGHT VERTICAL BAR", char: "❘" }
            ,{ hex: "&#2759;", name: "MEDIUM VERTICAL BAR", char: "❙" }
            ,{ hex: "&#275A;", name: "HEAVY VERTICAL BAR", char: "❚" }
            ,{ hex: "&#275B;", name: "HEAVY SINGLE TURNED COMMA QUOTATION MARK ORNAMENT", char: "❛" }
            ,{ hex: "&#275C;", name: "HEAVY SINGLE COMMA QUOTATION MARK ORNAMENT", char: "❜" }
            ,{ hex: "&#275D;", name: "HEAVY DOUBLE TURNED COMMA QUOTATION MARK ORNAMENT", char: "❝" }
            ,{ hex: "&#275E;", name: "HEAVY DOUBLE COMMA QUOTATION MARK ORNAMENT", char: "❞" }
            ,{ hex: "&#2761;", name: "CURVED STEM PARAGRAPH SIGN ORNAMENT", char: "❡" }
            ,{ hex: "&#2762;", name: "HEAVY EXCLAMATION MARK ORNAMENT", char: "❢" }
            ,{ hex: "&#2763;", name: "HEAVY HEART EXCLAMATION MARK ORNAMENT", char: "❣" }
            ,{ hex: "&#2764;", name: "HEAVY BLACK HEART", char: "❤" }
            ,{ hex: "&#2765;", name: "ROTATED HEAVY BLACK HEART BULLET", char: "❥" }
            ,{ hex: "&#2766;", name: "FLORAL HEART", char: "❦" }
            ,{ hex: "&#2767;", name: "ROTATED FLORAL HEART BULLET", char: "❧" }
            ,{ hex: "&#2768;", name: "MEDIUM LEFT PARENTHESIS ORNAMENT", char: "❨" }
            ,{ hex: "&#2769;", name: "MEDIUM RIGHT PARENTHESIS ORNAMENT", char: "❩" }
            ,{ hex: "&#276A;", name: "MEDIUM FLATTENED LEFT PARENTHESIS ORNAMENT", char: "❪" }
            ,{ hex: "&#276B;", name: "MEDIUM FLATTENED RIGHT PARENTHESIS ORNAMENT", char: "❫" }
            ,{ hex: "&#276C;", name: "MEDIUM LEFT-POINTING ANGLE BRACKET ORNAMENT", char: "❬" }
            ,{ hex: "&#276D;", name: "MEDIUM RIGHT-POINTING ANGLE BRACKET ORNAMENT", char: "❭" }
            ,{ hex: "&#276E;", name: "HEAVY LEFT-POINTING ANGLE QUOTATION MARK ORNAMENT", char: "❮" }
            ,{ hex: "&#276F;", name: "HEAVY RIGHT-POINTING ANGLE QUOTATION MARK ORNAMENT", char: "❯" }
            ,{ hex: "&#2770;", name: "HEAVY LEFT-POINTING ANGLE BRACKET ORNAMENT", char: "❰" }
            ,{ hex: "&#2771;", name: "HEAVY RIGHT-POINTING ANGLE BRACKET ORNAMENT", char: "❱" }
            ,{ hex: "&#2772;", name: "LIGHT LEFT TORTOISE SHELL BRACKET ORNAMENT", char: "❲" }
            ,{ hex: "&#2773;", name: "LIGHT RIGHT TORTOISE SHELL BRACKET ORNAMENT", char: "❳" }
            ,{ hex: "&#2774;", name: "MEDIUM LEFT CURLY BRACKET ORNAMENT", char: "❴" }
            ,{ hex: "&#2775;", name: "MEDIUM RIGHT CURLY BRACKET ORNAMENT", char: "❵" }
            ,{ hex: "&#2776;", name: "DINGBAT NEGATIVE CIRCLED DIGIT ONE", char: "❶" }
            ,{ hex: "&#2777;", name: "DINGBAT NEGATIVE CIRCLED DIGIT TWO", char: "❷" }
            ,{ hex: "&#2778;", name: "DINGBAT NEGATIVE CIRCLED DIGIT THREE", char: "❸" }
            ,{ hex: "&#2779;", name: "DINGBAT NEGATIVE CIRCLED DIGIT FOUR", char: "❹" }
            ,{ hex: "&#277A;", name: "DINGBAT NEGATIVE CIRCLED DIGIT FIVE", char: "❺" }
            ,{ hex: "&#277B;", name: "DINGBAT NEGATIVE CIRCLED DIGIT SIX", char: "❻" }
            ,{ hex: "&#277C;", name: "DINGBAT NEGATIVE CIRCLED DIGIT SEVEN", char: "❼" }
            ,{ hex: "&#277D;", name: "DINGBAT NEGATIVE CIRCLED DIGIT EIGHT", char: "❽" }
            ,{ hex: "&#277E;", name: "DINGBAT NEGATIVE CIRCLED DIGIT NINE", char: "❾" }
            ,{ hex: "&#277F;", name: "DINGBAT NEGATIVE CIRCLED NUMBER TEN", char: "❿" }
            ,{ hex: "&#2780;", name: "DINGBAT CIRCLED SANS-SERIF DIGIT ONE", char: "➀" }
            ,{ hex: "&#2781;", name: "DINGBAT CIRCLED SANS-SERIF DIGIT TWO", char: "➁" }
            ,{ hex: "&#2782;", name: "DINGBAT CIRCLED SANS-SERIF DIGIT THREE", char: "➂" }
            ,{ hex: "&#2783;", name: "DINGBAT CIRCLED SANS-SERIF DIGIT FOUR", char: "➃" }
            ,{ hex: "&#2784;", name: "DINGBAT CIRCLED SANS-SERIF DIGIT FIVE", char: "➄" }
            ,{ hex: "&#2785;", name: "DINGBAT CIRCLED SANS-SERIF DIGIT SIX", char: "➅" }
            ,{ hex: "&#2786;", name: "DINGBAT CIRCLED SANS-SERIF DIGIT SEVEN", char: "➆" }
            ,{ hex: "&#2787;", name: "DINGBAT CIRCLED SANS-SERIF DIGIT EIGHT", char: "➇" }
            ,{ hex: "&#2788;", name: "DINGBAT CIRCLED SANS-SERIF DIGIT NINE", char: "➈" }
            ,{ hex: "&#2789;", name: "DINGBAT CIRCLED SANS-SERIF NUMBER TEN", char: "➉" }
            ,{ hex: "&#278A;", name: "DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT ONE", char: "➊" }
            ,{ hex: "&#278B;", name: "DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT TWO", char: "➋" }
            ,{ hex: "&#278C;", name: "DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT THREE", char: "➌" }
            ,{ hex: "&#278D;", name: "DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT FOUR", char: "➍" }
            ,{ hex: "&#278E;", name: "DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT FIVE", char: "➎" }
            ,{ hex: "&#278F;", name: "DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT SIX", char: "➏" }
            ,{ hex: "&#2790;", name: "DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT SEVEN", char: "➐" }
            ,{ hex: "&#2791;", name: "DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT EIGHT", char: "➑" }
            ,{ hex: "&#2792;", name: "DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT NINE", char: "➒" }
            ,{ hex: "&#2793;", name: "DINGBAT NEGATIVE CIRCLED SANS-SERIF NUMBER TEN", char: "➓" }
        ],


        "Math": [
         { hex: "&#2200;" , entity: "&forall;", name: "FOR ALL", char: "∀" }
        ,{ hex: "&#2201;", name: "COMPLEMENT", char: "∁" }
        ,{ hex: "&#2202;" , entity: "&part;", name: "PARTIAL DIFFERENTIAL", char: "∂" }
        ,{ hex: "&#2203;" , entity: "&exist;", name: "THERE EXISTS", char: "∃" }
        ,{ hex: "&#2204;", name: "THERE DOES NOT EXIST", char: "∄" }
        ,{ hex: "&#2205;" , entity: "&empty;", name: "EMPTY SET", char: "∅" }
        ,{ hex: "&#2206;", name: "INCREMENT", char: "∆" }
        ,{ hex: "&#2207;" , entity: "&nabla;", name: "NABLA", char: "∇" }
        ,{ hex: "&#2208;" , entity: "&isin;", name: "ELEMENT OF", char: "∈" }
        ,{ hex: "&#2209;" , entity: "&notin;", name: "NOT AN ELEMENT OF", char: "∉" }
        ,{ hex: "&#220A;", name: "SMALL ELEMENT OF", char: "∊" }
        ,{ hex: "&#220B;" , entity: "&ni;", name: "CONTAINS AS MEMBER", char: "∋" }
        ,{ hex: "&#220C;", name: "DOES NOT CONTAIN AS MEMBER", char: "∌" }
        ,{ hex: "&#220D;", name: "SMALL CONTAINS AS MEMBER", char: "∍" }
        ,{ hex: "&#220E;", name: "END OF PROOF", char: "∎" }
        ,{ hex: "&#220F;" , entity: "&prod;", name: "N-ARY PRODUCT", char: "∏" }
        ,{ hex: "&#2210;", name: "N-ARY COPRODUCT", char: "∐" }
        ,{ hex: "&#2211;" , entity: "&sum;", name: "N-ARY SUMMATION", char: "∑" }
        ,{ hex: "&#2212;" , entity: "&minus;", name: "MINUS SIGN", char: "−" }
        ,{ hex: "&#2213;", name: "MINUS-OR-PLUS SIGN", char: "∓" }
        ,{ hex: "&#2214;", name: "DOT PLUS", char: "∔" }
        ,{ hex: "&#2215;", name: "DIVISION SLASH", char: "∕" }
        ,{ hex: "&#2216;", name: "SET MINUS", char: "∖" }
        ,{ hex: "&#2217;" , entity: "&lowast;", name: "ASTERISK OPERATOR", char: "∗" }
        ,{ hex: "&#2218;", name: "RING OPERATOR", char: "∘" }
        ,{ hex: "&#2219;", name: "BULLET OPERATOR", char: "∙" }
        ,{ hex: "&#221A;" , entity: "&radic;", name: "SQUARE ROOT", char: "√" }
        ,{ hex: "&#221B;", name: "CUBE ROOT", char: "∛" }
        ,{ hex: "&#221C;", name: "FOURTH ROOT", char: "∜" }
        ,{ hex: "&#221D;" , entity: "&prop;", name: "PROPORTIONAL TO", char: "∝" }
        ,{ hex: "&#221E;" , entity: "&infin;", name: "INFINITY", char: "∞" }
        ,{ hex: "&#221F;", name: "RIGHT ANGLE", char: "∟" }
        ,{ hex: "&#2220;" , entity: "&ang;", name: "ANGLE", char: "∠" }
        ,{ hex: "&#2221;", name: "MEASURED ANGLE", char: "∡" }
        ,{ hex: "&#2222;", name: "SPHERICAL ANGLE", char: "∢" }
        ,{ hex: "&#2223;", name: "DIVIDES", char: "∣" }
        ,{ hex: "&#2224;", name: "DOES NOT DIVIDE", char: "∤" }
        ,{ hex: "&#2225;", name: "PARALLEL TO", char: "∥" }
        ,{ hex: "&#2226;", name: "NOT PARALLEL TO", char: "∦" }
        ,{ hex: "&#2227;" , entity: "&and;", name: "LOGICAL AND", char: "∧" }
        ,{ hex: "&#2228;" , entity: "&or;", name: "LOGICAL OR", char: "∨" }
        ,{ hex: "&#2229;" , entity: "&cap;", name: "INTERSECTION", char: "∩" }
        ,{ hex: "&#222A;" , entity: "&cup;", name: "UNION", char: "∪" }
        ,{ hex: "&#222B;" , entity: "&int;", name: "INTEGRAL", char: "∫" }
        ,{ hex: "&#222C;", name: "DOUBLE INTEGRAL", char: "∬" }
        ,{ hex: "&#222D;", name: "TRIPLE INTEGRAL", char: "∭" }
        ,{ hex: "&#222E;", name: "CONTOUR INTEGRAL", char: "∮" }
        ,{ hex: "&#222F;", name: "SURFACE INTEGRAL", char: "∯" }
        ,{ hex: "&#2230;", name: "VOLUME INTEGRAL", char: "∰" }
        ,{ hex: "&#2231;", name: "CLOCKWISE INTEGRAL", char: "∱" }
        ,{ hex: "&#2232;", name: "CLOCKWISE CONTOUR INTEGRAL", char: "∲" }
        ,{ hex: "&#2233;", name: "ANTICLOCKWISE CONTOUR INTEGRAL", char: "∳" }
        ,{ hex: "&#2234;" , entity: "&there4;", name: "THEREFORE", char: "∴" }
        ,{ hex: "&#2235;", name: "BECAUSE", char: "∵" }
        ,{ hex: "&#2236;", name: "RATIO", char: "∶" }
        ,{ hex: "&#2237;", name: "PROPORTION", char: "∷" }
        ,{ hex: "&#2238;", name: "DOT MINUS", char: "∸" }
        ,{ hex: "&#2239;", name: "EXCESS", char: "∹" }
        ,{ hex: "&#223A;", name: "GEOMETRIC PROPORTION", char: "∺" }
        ,{ hex: "&#223B;", name: "HOMOTHETIC", char: "∻" }
        ,{ hex: "&#223C;" , entity: "&sim;", name: "TILDE OPERATOR", char: "∼" }
        ,{ hex: "&#223D;", name: "REVERSED TILDE", char: "∽" }
        ,{ hex: "&#223E;", name: "INVERTED LAZY S", char: "∾" }
        ,{ hex: "&#223F;", name: "SINE WAVE", char: "∿" }
        ,{ hex: "&#2240;", name: "WREATH PRODUCT", char: "≀" }
        ,{ hex: "&#2241;", name: "NOT TILDE", char: "≁" }
        ,{ hex: "&#2242;", name: "MINUS TILDE", char: "≂" }
        ,{ hex: "&#2243;", name: "ASYMPTOTICALLY EQUAL TO", char: "≃" }
        ,{ hex: "&#2244;", name: "NOT ASYMPTOTICALLY EQUAL TO", char: "≄" }
        ,{ hex: "&#2245;" , entity: "&cong;", name: "APPROXIMATELY EQUAL TO", char: "≅" }
        ,{ hex: "&#2246;", name: "APPROXIMATELY BUT NOT ACTUALLY EQUAL TO", char: "≆" }
        ,{ hex: "&#2247;", name: "NEITHER APPROXIMATELY NOR ACTUALLY EQUAL TO", char: "≇" }
        ,{ hex: "&#2248;" , entity: "&asymp;", name: "ALMOST EQUAL TO", char: "≈" }
        ,{ hex: "&#2249;", name: "NOT ALMOST EQUAL TO", char: "≉" }
        ,{ hex: "&#224A;", name: "ALMOST EQUAL OR EQUAL TO", char: "≊" }
        ,{ hex: "&#224B;", name: "TRIPLE TILDE", char: "≋" }
        ,{ hex: "&#224C;", name: "ALL EQUAL TO", char: "≌" }
        ,{ hex: "&#224D;", name: "EQUIVALENT TO", char: "≍" }
        ,{ hex: "&#224E;", name: "GEOMETRICALLY EQUIVALENT TO", char: "≎" }
        ,{ hex: "&#224F;", name: "DIFFERENCE BETWEEN", char: "≏" }
        ,{ hex: "&#2250;", name: "APPROACHES THE LIMIT", char: "≐" }
        ,{ hex: "&#2251;", name: "GEOMETRICALLY EQUAL TO", char: "≑" }
        ,{ hex: "&#2252;", name: "APPROXIMATELY EQUAL TO OR THE IMAGE OF", char: "≒" }
        ,{ hex: "&#2253;", name: "IMAGE OF OR APPROXIMATELY EQUAL TO", char: "≓" }
        ,{ hex: "&#2254;", name: "COLON EQUALS", char: "≔" }
        ,{ hex: "&#2255;", name: "EQUALS COLON", char: "≕" }
        ,{ hex: "&#2256;", name: "RING IN EQUAL TO", char: "≖" }
        ,{ hex: "&#2257;", name: "RING EQUAL TO", char: "≗" }
        ,{ hex: "&#2258;", name: "CORRESPONDS TO", char: "≘" }
        ,{ hex: "&#2259;", name: "ESTIMATES", char: "≙" }
        ,{ hex: "&#225A;", name: "EQUIANGULAR TO", char: "≚" }
        ,{ hex: "&#225B;", name: "STAR EQUALS", char: "≛" }
        ,{ hex: "&#225C;", name: "DELTA EQUAL TO", char: "≜" }
        ,{ hex: "&#225D;", name: "EQUAL TO BY DEFINITION", char: "≝" }
        ,{ hex: "&#225E;", name: "MEASURED BY", char: "≞" }
        ,{ hex: "&#225F;", name: "QUESTIONED EQUAL TO", char: "≟" }
        ,{ hex: "&#2260;" , entity: "&ne;", name: "NOT EQUAL TO", char: "≠" }
        ,{ hex: "&#2261;" , entity: "&equiv;", name: "IDENTICAL TO", char: "≡" }
        ,{ hex: "&#2262;", name: "NOT IDENTICAL TO", char: "≢" }
        ,{ hex: "&#2263;", name: "STRICTLY EQUIVALENT TO", char: "≣" }
        ,{ hex: "&#2264;" , entity: "&le;", name: "LESS-THAN OR EQUAL TO", char: "≤" }
        ,{ hex: "&#2265;" , entity: "&ge;", name: "GREATER-THAN OR EQUAL TO", char: "≥" }
        ,{ hex: "&#2266;", name: "LESS-THAN OVER EQUAL TO", char: "≦" }
        ,{ hex: "&#2267;", name: "GREATER-THAN OVER EQUAL TO", char: "≧" }
        ,{ hex: "&#2268;", name: "LESS-THAN BUT NOT EQUAL TO", char: "≨" }
        ,{ hex: "&#2269;", name: "GREATER-THAN BUT NOT EQUAL TO", char: "≩" }
        ,{ hex: "&#226A;", name: "MUCH LESS-THAN", char: "≪" }
        ,{ hex: "&#226B;", name: "MUCH GREATER-THAN", char: "≫" }
        ,{ hex: "&#226C;", name: "BETWEEN", char: "≬" }
        ,{ hex: "&#226D;", name: "NOT EQUIVALENT TO", char: "≭" }
        ,{ hex: "&#226E;", name: "NOT LESS-THAN", char: "≮" }
        ,{ hex: "&#226F;", name: "NOT GREATER-THAN", char: "≯" }
        ,{ hex: "&#2270;", name: "NEITHER LESS-THAN NOR EQUAL TO", char: "≰" }
        ,{ hex: "&#2271;", name: "NEITHER GREATER-THAN NOR EQUAL TO", char: "≱" }
        ,{ hex: "&#2272;", name: "LESS-THAN OR EQUIVALENT TO", char: "≲" }
        ,{ hex: "&#2273;", name: "GREATER-THAN OR EQUIVALENT TO", char: "≳" }
        ,{ hex: "&#2274;", name: "NEITHER LESS-THAN NOR EQUIVALENT TO", char: "≴" }
        ,{ hex: "&#2275;", name: "NEITHER GREATER-THAN NOR EQUIVALENT TO", char: "≵" }
        ,{ hex: "&#2276;", name: "LESS-THAN OR GREATER-THAN", char: "≶" }
        ,{ hex: "&#2277;", name: "GREATER-THAN OR LESS-THAN", char: "≷" }
        ,{ hex: "&#2278;", name: "NEITHER LESS-THAN NOR GREATER-THAN", char: "≸" }
        ,{ hex: "&#2279;", name: "NEITHER GREATER-THAN NOR LESS-THAN", char: "≹" }
        ,{ hex: "&#227A;", name: "PRECEDES", char: "≺" }
        ,{ hex: "&#227B;", name: "SUCCEEDS", char: "≻" }
        ,{ hex: "&#227C;", name: "PRECEDES OR EQUAL TO", char: "≼" }
        ,{ hex: "&#227D;", name: "SUCCEEDS OR EQUAL TO", char: "≽" }
        ,{ hex: "&#227E;", name: "PRECEDES OR EQUIVALENT TO", char: "≾" }
        ,{ hex: "&#227F;", name: "SUCCEEDS OR EQUIVALENT TO", char: "≿" }
        ,{ hex: "&#2280;", name: "DOES NOT PRECEDE", char: "⊀" }
        ,{ hex: "&#2281;", name: "DOES NOT SUCCEED", char: "⊁" }
        ,{ hex: "&#2282;" , entity: "&sub;", name: "SUBSET OF", char: "⊂" }
        ,{ hex: "&#2283;" , entity: "&sup;", name: "SUPERSET OF", char: "⊃" }
        ,{ hex: "&#2284;" , entity: "&nsub;", name: "NOT A SUBSET OF", char: "⊄" }
        ,{ hex: "&#2285;", name: "NOT A SUPERSET OF", char: "⊅" }
        ,{ hex: "&#2286;" , entity: "&sube;", name: "SUBSET OF OR EQUAL TO", char: "⊆" }
        ,{ hex: "&#2287;" , entity: "&supe;", name: "SUPERSET OF OR EQUAL TO", char: "⊇" }
        ,{ hex: "&#2288;", name: "NEITHER A SUBSET OF NOR EQUAL TO", char: "⊈" }
        ,{ hex: "&#2289;", name: "NEITHER A SUPERSET OF NOR EQUAL TO", char: "⊉" }
        ,{ hex: "&#228A;", name: "SUBSET OF WITH NOT EQUAL TO", char: "⊊" }
        ,{ hex: "&#228B;", name: "SUPERSET OF WITH NOT EQUAL TO", char: "⊋" }
        ,{ hex: "&#228C;", name: "MULTISET", char: "⊌" }
        ,{ hex: "&#228D;", name: "MULTISET MULTIPLICATION", char: "⊍" }
        ,{ hex: "&#228E;", name: "MULTISET UNION", char: "⊎" }
        ,{ hex: "&#228F;", name: "SQUARE IMAGE OF", char: "⊏" }
        ,{ hex: "&#2290;", name: "SQUARE ORIGINAL OF", char: "⊐" }
        ,{ hex: "&#2291;", name: "SQUARE IMAGE OF OR EQUAL TO", char: "⊑" }
        ,{ hex: "&#2292;", name: "SQUARE ORIGINAL OF OR EQUAL TO", char: "⊒" }
        ,{ hex: "&#2293;", name: "SQUARE CAP", char: "⊓" }
        ,{ hex: "&#2294;", name: "SQUARE CUP", char: "⊔" }
        ,{ hex: "&#2295;" , entity: "&oplus;", name: "CIRCLED PLUS", char: "⊕" }
        ,{ hex: "&#2296;", name: "CIRCLED MINUS", char: "⊖" }
        ,{ hex: "&#2297;" , entity: "&otimes;", name: "CIRCLED TIMES", char: "⊗" }
        ,{ hex: "&#2298;", name: "CIRCLED DIVISION SLASH", char: "⊘" }
        ,{ hex: "&#2299;", name: "CIRCLED DOT OPERATOR", char: "⊙" }
        ,{ hex: "&#229A;", name: "CIRCLED RING OPERATOR", char: "⊚" }
        ,{ hex: "&#229B;", name: "CIRCLED ASTERISK OPERATOR", char: "⊛" }
        ,{ hex: "&#229C;", name: "CIRCLED EQUALS", char: "⊜" }
        ,{ hex: "&#229D;", name: "CIRCLED DASH", char: "⊝" }
        ,{ hex: "&#229E;", name: "SQUARED PLUS", char: "⊞" }
        ,{ hex: "&#229F;", name: "SQUARED MINUS", char: "⊟" }
        ,{ hex: "&#22A0;", name: "SQUARED TIMES", char: "⊠" }
        ,{ hex: "&#22A1;", name: "SQUARED DOT OPERATOR", char: "⊡" }
        ,{ hex: "&#22A2;", name: "RIGHT TACK", char: "⊢" }
        ,{ hex: "&#22A3;", name: "LEFT TACK", char: "⊣" }
        ,{ hex: "&#22A4;", name: "DOWN TACK", char: "⊤" }
        ,{ hex: "&#22A5;" , entity: "&perp;", name: "UP TACK", char: "⊥" }
        ,{ hex: "&#22A6;", name: "ASSERTION", char: "⊦" }
        ,{ hex: "&#22A7;", name: "MODELS", char: "⊧" }
        ,{ hex: "&#22A8;", name: "TRUE", char: "⊨" }
        ,{ hex: "&#22A9;", name: "FORCES", char: "⊩" }
        ,{ hex: "&#22AA;", name: "TRIPLE VERTICAL BAR RIGHT TURNSTILE", char: "⊪" }
        ,{ hex: "&#22AB;", name: "DOUBLE VERTICAL BAR DOUBLE RIGHT TURNSTILE", char: "⊫" }
        ,{ hex: "&#22AC;", name: "DOES NOT PROVE", char: "⊬" }
        ,{ hex: "&#22AD;", name: "NOT TRUE", char: "⊭" }
        ,{ hex: "&#22AE;", name: "DOES NOT FORCE", char: "⊮" }
        ,{ hex: "&#22AF;", name: "NEGATED DOUBLE VERTICAL BAR DOUBLE RIGHT TURNSTILE", char: "⊯" }
        ,{ hex: "&#22B0;", name: "PRECEDES UNDER RELATION", char: "⊰" }
        ,{ hex: "&#22B1;", name: "SUCCEEDS UNDER RELATION", char: "⊱" }
        ,{ hex: "&#22B2;", name: "NORMAL SUBGROUP OF", char: "⊲" }
        ,{ hex: "&#22B3;", name: "CONTAINS AS NORMAL SUBGROUP", char: "⊳" }
        ,{ hex: "&#22B4;", name: "NORMAL SUBGROUP OF OR EQUAL TO", char: "⊴" }
        ,{ hex: "&#22B5;", name: "CONTAINS AS NORMAL SUBGROUP OR EQUAL TO", char: "⊵" }
        ,{ hex: "&#22B6;", name: "ORIGINAL OF", char: "⊶" }
        ,{ hex: "&#22B7;", name: "IMAGE OF", char: "⊷" }
        ,{ hex: "&#22B8;", name: "MULTIMAP", char: "⊸" }
        ,{ hex: "&#22B9;", name: "HERMITIAN CONJUGATE MATRIX", char: "⊹" }
        ,{ hex: "&#22BA;", name: "INTERCALATE", char: "⊺" }
        ,{ hex: "&#22BB;", name: "XOR", char: "⊻" }
        ,{ hex: "&#22BC;", name: "NAND", char: "⊼" }
        ,{ hex: "&#22BD;", name: "NOR", char: "⊽" }
        ,{ hex: "&#22BE;", name: "RIGHT ANGLE WITH ARC", char: "⊾" }
        ,{ hex: "&#22BF;", name: "RIGHT TRIANGLE", char: "⊿" }
        ,{ hex: "&#22C0;", name: "N-ARY LOGICAL AND", char: "⋀" }
        ,{ hex: "&#22C1;", name: "N-ARY LOGICAL OR", char: "⋁" }
        ,{ hex: "&#22C2;", name: "N-ARY INTERSECTION", char: "⋂" }
        ,{ hex: "&#22C3;", name: "N-ARY UNION", char: "⋃" }
        ,{ hex: "&#22C4;", name: "DIAMOND OPERATOR", char: "⋄" }
        ,{ hex: "&#22C5;" , entity: "&sdot;", name: "DOT OPERATOR", char: "⋅" }
        ,{ hex: "&#22C6;", name: "STAR OPERATOR", char: "⋆" }
        ,{ hex: "&#22C7;", name: "DIVISION TIMES", char: "⋇" }
        ,{ hex: "&#22C8;", name: "BOWTIE", char: "⋈" }
        ,{ hex: "&#22C9;", name: "LEFT NORMAL FACTOR SEMIDIRECT PRODUCT", char: "⋉" }
        ,{ hex: "&#22CA;", name: "RIGHT NORMAL FACTOR SEMIDIRECT PRODUCT", char: "⋊" }
        ,{ hex: "&#22CB;", name: "LEFT SEMIDIRECT PRODUCT", char: "⋋" }
        ,{ hex: "&#22CC;", name: "RIGHT SEMIDIRECT PRODUCT", char: "⋌" }
        ,{ hex: "&#22CD;", name: "REVERSED TILDE EQUALS", char: "⋍" }
        ,{ hex: "&#22CE;", name: "CURLY LOGICAL OR", char: "⋎" }
        ,{ hex: "&#22CF;", name: "CURLY LOGICAL AND", char: "⋏" }
        ,{ hex: "&#22D0;", name: "DOUBLE SUBSET", char: "⋐" }
        ,{ hex: "&#22D1;", name: "DOUBLE SUPERSET", char: "⋑" }
        ,{ hex: "&#22D2;", name: "DOUBLE INTERSECTION", char: "⋒" }
        ,{ hex: "&#22D3;", name: "DOUBLE UNION", char: "⋓" }
        ,{ hex: "&#22D4;", name: "PITCHFORK", char: "⋔" }
        ,{ hex: "&#22D5;", name: "EQUAL AND PARALLEL TO", char: "⋕" }
        ,{ hex: "&#22D6;", name: "LESS-THAN WITH DOT", char: "⋖" }
        ,{ hex: "&#22D7;", name: "GREATER-THAN WITH DOT", char: "⋗" }
        ,{ hex: "&#22D8;", name: "VERY MUCH LESS-THAN", char: "⋘" }
        ,{ hex: "&#22D9;", name: "VERY MUCH GREATER-THAN", char: "⋙" }
        ,{ hex: "&#22DA;", name: "LESS-THAN EQUAL TO OR GREATER-THAN", char: "⋚" }
        ,{ hex: "&#22DB;", name: "GREATER-THAN EQUAL TO OR LESS-THAN", char: "⋛" }
        ,{ hex: "&#22DC;", name: "EQUAL TO OR LESS-THAN", char: "⋜" }
        ,{ hex: "&#22DD;", name: "EQUAL TO OR GREATER-THAN", char: "⋝" }
        ,{ hex: "&#22DE;", name: "EQUAL TO OR PRECEDES", char: "⋞" }
        ,{ hex: "&#22DF;", name: "EQUAL TO OR SUCCEEDS", char: "⋟" }
        ,{ hex: "&#22E0;", name: "DOES NOT PRECEDE OR EQUAL", char: "⋠" }
        ,{ hex: "&#22E1;", name: "DOES NOT SUCCEED OR EQUAL", char: "⋡" }
        ,{ hex: "&#22E2;", name: "NOT SQUARE IMAGE OF OR EQUAL TO", char: "⋢" }
        ,{ hex: "&#22E3;", name: "NOT SQUARE ORIGINAL OF OR EQUAL TO", char: "⋣" }
        ,{ hex: "&#22E4;", name: "SQUARE IMAGE OF OR NOT EQUAL TO", char: "⋤" }
        ,{ hex: "&#22E5;", name: "SQUARE ORIGINAL OF OR NOT EQUAL TO", char: "⋥" }
        ,{ hex: "&#22E6;", name: "LESS-THAN BUT NOT EQUIVALENT TO", char: "⋦" }
        ,{ hex: "&#22E7;", name: "GREATER-THAN BUT NOT EQUIVALENT TO", char: "⋧" }
        ,{ hex: "&#22E8;", name: "PRECEDES BUT NOT EQUIVALENT TO", char: "⋨" }
        ,{ hex: "&#22E9;", name: "SUCCEEDS BUT NOT EQUIVALENT TO", char: "⋩" }
        ,{ hex: "&#22EA;", name: "NOT NORMAL SUBGROUP OF", char: "⋪" }
        ,{ hex: "&#22EB;", name: "DOES NOT CONTAIN AS NORMAL SUBGROUP", char: "⋫" }
        ,{ hex: "&#22EC;", name: "NOT NORMAL SUBGROUP OF OR EQUAL TO", char: "⋬" }
        ,{ hex: "&#22ED;", name: "DOES NOT CONTAIN AS NORMAL SUBGROUP OR EQUAL", char: "⋭" }
        ,{ hex: "&#22EE;", name: "VERTICAL ELLIPSIS", char: "⋮" }
        ,{ hex: "&#22EF;", name: "MIDLINE HORIZONTAL ELLIPSIS", char: "⋯" }
        ,{ hex: "&#22F0;", name: "UP RIGHT DIAGONAL ELLIPSIS", char: "⋰" }
        ,{ hex: "&#22F1;", name: "DOWN RIGHT DIAGONAL ELLIPSIS", char: "⋱" }
        ,{ hex: "&#22F2;", name: "ELEMENT OF WITH LONG HORIZONTAL STROKE", char: "⋲" }
        ,{ hex: "&#22F3;", name: "ELEMENT OF WITH VERTICAL BAR AT END OF HORIZONTAL STROKE", char: "⋳" }
        ,{ hex: "&#22F4;", name: "SMALL ELEMENT OF WITH VERTICAL BAR AT END OF HORIZONTAL STROKE", char: "⋴" }
        ,{ hex: "&#22F5;", name: "ELEMENT OF WITH DOT ABOVE", char: "⋵" }
        ,{ hex: "&#22F6;", name: "ELEMENT OF WITH OVERBAR", char: "⋶" }
        ,{ hex: "&#22F7;", name: "SMALL ELEMENT OF WITH OVERBAR", char: "⋷" }
        ,{ hex: "&#22F8;", name: "ELEMENT OF WITH UNDERBAR", char: "⋸" }
        ,{ hex: "&#22F9;", name: "ELEMENT OF WITH TWO HORIZONTAL STROKES", char: "⋹" }
        ,{ hex: "&#22FA;", name: "CONTAINS WITH LONG HORIZONTAL STROKE", char: "⋺" }
        ,{ hex: "&#22FB;", name: "CONTAINS WITH VERTICAL BAR AT END OF HORIZONTAL STROKE", char: "⋻" }
        ,{ hex: "&#22FC;", name: "SMALL CONTAINS WITH VERTICAL BAR AT END OF HORIZONTAL STROKE", char: "⋼" }
        ,{ hex: "&#22FD;", name: "CONTAINS WITH OVERBAR", char: "⋽" }
        ,{ hex: "&#22FE;", name: "SMALL CONTAINS WITH OVERBAR", char: "⋾" }
        ,{ hex: "&#22FF;", name: "Z NOTATION BAG MEMBERSHIP", char: "⋿" }


        ,{ hex: "&#2153;", name: "VULGAR FRACTION ONE THIRD", char: "⅓" }
        ,{ hex: "&#2154;", name: "VULGAR FRACTION TWO THIRDS", char: "⅔" }
        ,{ hex: "&#2155;", name: "VULGAR FRACTION ONE FIFTH", char: "⅕" }
        ,{ hex: "&#2156;", name: "VULGAR FRACTION TWO FIFTHS", char: "⅖" }
        ,{ hex: "&#2157;", name: "VULGAR FRACTION THREE FIFTHS", char: "⅗" }
        ,{ hex: "&#2158;", name: "VULGAR FRACTION FOUR FIFTHS", char: "⅘" }
        ,{ hex: "&#2159;", name: "VULGAR FRACTION ONE SIXTH", char: "⅙" }
        ,{ hex: "&#215A;", name: "VULGAR FRACTION FIVE SIXTHS", char: "⅚" }
        ,{ hex: "&#215B;", name: "VULGAR FRACTION ONE EIGHTH (present in WGL4)", char: "⅛" }
        ,{ hex: "&#215C;", name: "VULGAR FRACTION THREE EIGHTHS (present in WGL4)", char: "⅜" }
        ,{ hex: "&#215D;", name: "VULGAR FRACTION FIVE EIGHTHS (present in WGL4)", char: "⅝" }
        ,{ hex: "&#215E;", name: "VULGAR FRACTION SEVEN EIGHTHS (present in WGL4)", char: "⅞" }
        ,{ hex: "&#215F;", name: "FRACTION NUMERATOR ONE", char: "⅟" }
        ,{ hex: "&#2160;", name: "ROMAN NUMERAL ONE", char: "Ⅰ" }
        ,{ hex: "&#2161;", name: "ROMAN NUMERAL TWO", char: "Ⅱ" }
        ,{ hex: "&#2162;", name: "ROMAN NUMERAL THREE", char: "Ⅲ" }
        ,{ hex: "&#2163;", name: "ROMAN NUMERAL FOUR", char: "Ⅳ" }
        ,{ hex: "&#2164;", name: "ROMAN NUMERAL FIVE", char: "Ⅴ" }
        ,{ hex: "&#2165;", name: "ROMAN NUMERAL SIX", char: "Ⅵ" }
        ,{ hex: "&#2166;", name: "ROMAN NUMERAL SEVEN", char: "Ⅶ" }
        ,{ hex: "&#2167;", name: "ROMAN NUMERAL EIGHT", char: "Ⅷ" }
        ,{ hex: "&#2168;", name: "ROMAN NUMERAL NINE", char: "Ⅸ" }
        ,{ hex: "&#2169;", name: "ROMAN NUMERAL TEN", char: "Ⅹ" }
        ,{ hex: "&#216A;", name: "ROMAN NUMERAL ELEVEN", char: "Ⅺ" }
        ,{ hex: "&#216B;", name: "ROMAN NUMERAL TWELVE", char: "Ⅻ" }
        ,{ hex: "&#216C;", name: "ROMAN NUMERAL FIFTY", char: "Ⅼ" }
        ,{ hex: "&#216D;", name: "ROMAN NUMERAL ONE HUNDRED", char: "Ⅽ" }
        ,{ hex: "&#216E;", name: "ROMAN NUMERAL FIVE HUNDRED", char: "Ⅾ" }
        ,{ hex: "&#216F;", name: "ROMAN NUMERAL ONE THOUSAND", char: "Ⅿ" }
        ,{ hex: "&#2170;", name: "SMALL ROMAN NUMERAL ONE", char: "ⅰ" }
        ,{ hex: "&#2171;", name: "SMALL ROMAN NUMERAL TWO", char: "ⅱ" }
        ,{ hex: "&#2172;", name: "SMALL ROMAN NUMERAL THREE", char: "ⅲ" }
        ,{ hex: "&#2173;", name: "SMALL ROMAN NUMERAL FOUR", char: "ⅳ" }
        ,{ hex: "&#2174;", name: "SMALL ROMAN NUMERAL FIVE", char: "ⅴ" }
        ,{ hex: "&#2175;", name: "SMALL ROMAN NUMERAL SIX", char: "ⅵ" }
        ,{ hex: "&#2176;", name: "SMALL ROMAN NUMERAL SEVEN", char: "ⅶ" }
        ,{ hex: "&#2177;", name: "SMALL ROMAN NUMERAL EIGHT", char: "ⅷ" }
        ,{ hex: "&#2178;", name: "SMALL ROMAN NUMERAL NINE", char: "ⅸ" }
        ,{ hex: "&#2179;", name: "SMALL ROMAN NUMERAL TEN", char: "ⅹ" }
        ,{ hex: "&#217A;", name: "SMALL ROMAN NUMERAL ELEVEN", char: "ⅺ" }
        ,{ hex: "&#217B;", name: "SMALL ROMAN NUMERAL TWELVE", char: "ⅻ" }
        ,{ hex: "&#217C;", name: "SMALL ROMAN NUMERAL FIFTY", char: "ⅼ" }
        ,{ hex: "&#217D;", name: "SMALL ROMAN NUMERAL ONE HUNDRED", char: "ⅽ" }
        ,{ hex: "&#217E;", name: "SMALL ROMAN NUMERAL FIVE HUNDRED", char: "ⅾ" }
        ,{ hex: "&#217F;", name: "SMALL ROMAN NUMERAL ONE THOUSAND", char: "ⅿ" }
        ,{ hex: "&#2180;", name: "ROMAN NUMERAL ONE THOUSAND C D", char: "ↀ" }
        ,{ hex: "&#2181;", name: "ROMAN NUMERAL FIVE THOUSAND", char: "ↁ" }
        ,{ hex: "&#2182;", name: "ROMAN NUMERAL TEN THOUSAND", char: "ↂ" }
        ,{ hex: "&#2183;", name: "ROMAN NUMERAL REVERSED ONE HUNDRED", char: "Ↄ" }
        ,{ hex: "&#2184;", name: "LATIN SMALL LETTER REVERSED C", char: "ↄ" }


        ,{ hex: "&#2A00;", name: "N-ARY CIRCLED DOT OPERATOR", char: "⨀" }
        ,{ hex: "&#2A01;", name: "N-ARY CIRCLED PLUS OPERATOR", char: "⨁" }
        ,{ hex: "&#2A02;", name: "N-ARY CIRCLED TIMES OPERATOR", char: "⨂" }
        ,{ hex: "&#2A0C;", name: "QUADRUPLE INTEGRAL OPERATOR", char: "⨌" }
        ,{ hex: "&#2A0D;", name: "FINITE PART INTEGRAL", char: "⨍" }
        ,{ hex: "&#2A0E;", name: "INTEGRAL WITH DOUBLE STROKE", char: "⨎" }
        ,{ hex: "&#2A0F;", name: "INTEGRAL AVERAGE WITH SLASH", char: "⨏" }
        ,{ hex: "&#2A10;", name: "CIRCULATION FUNCTION", char: "⨐" }
        ,{ hex: "&#2A11;", name: "ANTICLOCKWISE INTEGRATION", char: "⨑" }
        ,{ hex: "&#2A12;", name: "LINE INTEGRATION WITH RECTANGULAR PATH AROUND POLE", char: "⨒" }
        ,{ hex: "&#2A13;", name: "LINE INTEGRATION WITH SEMICIRCULAR PATH AROUND POLE", char: "⨓" }
        ,{ hex: "&#2A14;", name: "LINE INTEGRATION NOT INCLUDING THE POLE", char: "⨔" }
        ,{ hex: "&#2A15;", name: "INTEGRAL AROUND A POINT OPERATOR", char: "⨕" }
        ,{ hex: "&#2A16;", name: "QUATERNION INTEGRAL OPERATOR", char: "⨖" }
        ,{ hex: "&#2A17;", name: "INTEGRAL WITH LEFTWARDS ARROW WITH HOOK", char: "⨗" }
        ,{ hex: "&#2A18;", name: "INTEGRAL WITH TIMES SIGN", char: "⨘" }
        ,{ hex: "&#2A19;", name: "INTEGRAL WITH INTERSECTION", char: "⨙" }
        ,{ hex: "&#2A1A;", name: "INTEGRAL WITH UNION", char: "⨚" }
        ,{ hex: "&#2A1B;", name: "INTEGRAL WITH OVERBAR", char: "⨛" }
        ,{ hex: "&#2A1C;", name: "INTEGRAL WITH UNDERBAR", char: "⨜" }
        ,{ hex: "&#2A2F;", name: "VECTOR OR CROSS PRODUCT", char: "⨯" }
        ,{ hex: "&#2A7D;", name: "LESS-THAN OR SLANTED EQUAL TO", char: "⩽" }
        ,{ hex: "&#2A7E;", name: "GREATER-THAN OR SLANTED EQUAL TO", char: "⩾" }
        ,{ hex: "&#2A7F;", name: "LESS-THAN OR SLANTED EQUAL TO WITH DOT INSIDE", char: "⩿" }
        ,{ hex: "&#2A80;", name: "GREATER-THAN OR SLANTED EQUAL TO WITH DOT INSIDE", char: "⪀" }
        ,{ hex: "&#2A81;", name: "LESS-THAN OR SLANTED EQUAL TO WITH DOT ABOVE", char: "⪁" }
        ,{ hex: "&#2A82;", name: "GREATER-THAN OR SLANTED EQUAL TO WITH DOT ABOVE", char: "⪂" }
        ,{ hex: "&#2A83;", name: "LESS-THAN OR SLANTED EQUAL TO WITH DOT ABOVE RIGHT", char: "⪃" }
        ,{ hex: "&#2A84;", name: "GREATER-THAN OR SLANTED EQUAL TO WITH DOT ABOVE LEFT", char: "⪄" }
        ,{ hex: "&#2A85;", name: "LESS-THAN OR APPROXIMATE", char: "⪅" }
        ,{ hex: "&#2A86;", name: "GREATER-THAN OR APPROXIMATE", char: "⪆" }
        ,{ hex: "&#2A87;", name: "LESS-THAN AND SINGLE-LINE NOT EQUAL TO", char: "⪇" }
        ,{ hex: "&#2A88;", name: "GREATER-THAN AND SINGLE-LINE NOT EQUAL TO", char: "⪈" }
        ,{ hex: "&#2A89;", name: "LESS-THAN AND NOT APPROXIMATE", char: "⪉" }
        ,{ hex: "&#2A8A;", name: "GREATER-THAN AND NOT APPROXIMATE", char: "⪊" }
        ,{ hex: "&#2A8B;", name: "LESS-THAN ABOVE DOUBLE-LINE EQUAL ABOVE GREATER-THAN", char: "⪋" }
        ,{ hex: "&#2A8C;", name: "GREATER-THAN ABOVE DOUBLE-LINE EQUAL ABOVE LESS-THAN", char: "⪌" }
        ,{ hex: "&#2A8D;", name: "LESS-THAN ABOVE SIMILAR OR EQUAL", char: "⪍" }
        ,{ hex: "&#2A8E;", name: "GREATER-THAN ABOVE SIMILAR OR EQUAL", char: "⪎" }
        ,{ hex: "&#2A8F;", name: "LESS-THAN ABOVE SIMILAR ABOVE GREATER-THAN", char: "⪏" }
        ,{ hex: "&#2A90;", name: "GREATER-THAN ABOVE SIMILAR ABOVE LESS-THAN", char: "⪐" }
        ,{ hex: "&#2A91;", name: "LESS-THAN ABOVE GREATER-THAN ABOVE DOUBLE-LINE EQUAL", char: "⪑" }
        ,{ hex: "&#2A92;", name: "GREATER-THAN ABOVE LESS-THAN ABOVE DOUBLE-LINE EQUAL", char: "⪒" }
        ,{ hex: "&#2A93;", name: "LESS-THAN ABOVE SLANTED EQUAL ABOVE GREATER-THAN ABOVE SLANTED EQUAL", char: "⪓" }
        ,{ hex: "&#2A94;", name: "GREATER-THAN ABOVE SLANTED EQUAL ABOVE LESS-THAN ABOVE SLANTED EQUAL", char: "⪔" }
        ,{ hex: "&#2A95;", name: "SLANTED EQUAL TO OR LESS-THAN", char: "⪕" }
        ,{ hex: "&#2A96;", name: "SLANTED EQUAL TO OR GREATER-THAN", char: "⪖" }
        ,{ hex: "&#2A97;", name: "SLANTED EQUAL TO OR LESS-THAN WITH DOT INSIDE", char: "⪗" }
        ,{ hex: "&#2A98;", name: "SLANTED EQUAL TO OR GREATER-THAN WITH DOT INSIDE", char: "⪘" }
        ,{ hex: "&#2A99;", name: "DOUBLE-LINE EQUAL TO OR LESS-THAN", char: "⪙" }
        ,{ hex: "&#2A9A;", name: "DOUBLE-LINE EQUAL TO OR GREATER-THAN", char: "⪚" }
        ,{ hex: "&#2A9B;", name: "DOUBLE-LINE SLANTED EQUAL TO OR LESS-THAN", char: "⪛" }
        ,{ hex: "&#2A9C;", name: "DOUBLE-LINE SLANTED EQUAL TO OR GREATER-THAN", char: "⪜" }
        ,{ hex: "&#2A9D;", name: "SIMILAR OR LESS-THAN", char: "⪝" }
        ,{ hex: "&#2A9E;", name: "SIMILAR OR GREATER-THAN", char: "⪞" }
        ,{ hex: "&#2A9F;", name: "SIMILAR ABOVE LESS-THAN ABOVE EQUALS SIGN", char: "⪟" }
        ,{ hex: "&#2AA0;", name: "SIMILAR ABOVE GREATER-THAN ABOVE EQUALS SIGN", char: "⪠" }
        ,{ hex: "&#2AAE;", name: "EQUALS SIGN WITH BUMPY ABOVE", char: "⪮" }
        ,{ hex: "&#2AAF;", name: "PRECEDES ABOVE SINGLE-LINE EQUALS SIGN", char: "⪯" }
        ,{ hex: "&#2AB0;", name: "SUCCEEDS ABOVE SINGLE-LINE EQUALS SIGN", char: "⪰" }
        ,{ hex: "&#2AB1;", name: "PRECEDES ABOVE SINGLE-LINE NOT EQUAL TO", char: "⪱" }
        ,{ hex: "&#2AB2;", name: "SUCCEEDS ABOVE SINGLE-LINE NOT EQUAL TO", char: "⪲" }
        ,{ hex: "&#2AB3;", name: "PRECEDES ABOVE EQUALS SIGN", char: "⪳" }
        ,{ hex: "&#2AB4;", name: "SUCCEEDS ABOVE EQUALS SIGN", char: "⪴" }
        ,{ hex: "&#2AB5;", name: "PRECEDES ABOVE NOT EQUAL TO", char: "⪵" }
        ,{ hex: "&#2AB6;", name: "SUCCEEDS ABOVE NOT EQUAL TO", char: "⪶" }
        ,{ hex: "&#2AB7;", name: "PRECEDES ABOVE ALMOST EQUAL TO", char: "⪷" }
        ,{ hex: "&#2AB8;", name: "SUCCEEDS ABOVE ALMOST EQUAL TO", char: "⪸" }
        ,{ hex: "&#2AB9;", name: "PRECEDES ABOVE NOT ALMOST EQUAL TO", char: "⪹" }
        ,{ hex: "&#2ABA;", name: "SUCCEEDS ABOVE NOT ALMOST EQUAL TO", char: "⪺" }
        ,{ hex: "&#2AF9;", name: "DOUBLE-LINE SLANTED LESS-THAN OR EQUAL TO", char: "⫹" }
        ,{ hex: "&#2AFA;", name: "DOUBLE-LINE SLANTED GREATER-THAN OR EQUAL TO", char: "⫺" }

        ,{ hex: "&#2460;", name: "CIRCLED DIGIT ONE", char: "①" }
        ,{ hex: "&#2461;", name: "CIRCLED DIGIT TWO", char: "②" }
        ,{ hex: "&#2462;", name: "CIRCLED DIGIT THREE", char: "③" }
        ,{ hex: "&#2463;", name: "CIRCLED DIGIT FOUR", char: "④" }
        ,{ hex: "&#2464;", name: "CIRCLED DIGIT FIVE", char: "⑤" }
        ,{ hex: "&#2465;", name: "CIRCLED DIGIT SIX", char: "⑥" }
        ,{ hex: "&#2466;", name: "CIRCLED DIGIT SEVEN", char: "⑦" }
        ,{ hex: "&#2467;", name: "CIRCLED DIGIT EIGHT", char: "⑧" }
        ,{ hex: "&#2468;", name: "CIRCLED DIGIT NINE", char: "⑨" }
        ,{ hex: "&#2469;", name: "CIRCLED NUMBER TEN", char: "⑩" }
        ,{ hex: "&#246A;", name: "CIRCLED NUMBER ELEVEN", char: "⑪" }
        ,{ hex: "&#246B;", name: "CIRCLED NUMBER TWELVE", char: "⑫" }
        ,{ hex: "&#246C;", name: "CIRCLED NUMBER THIRTEEN", char: "⑬" }
        ,{ hex: "&#246D;", name: "CIRCLED NUMBER FOURTEEN", char: "⑭" }
        ,{ hex: "&#246E;", name: "CIRCLED NUMBER FIFTEEN", char: "⑮" }
        ,{ hex: "&#246F;", name: "CIRCLED NUMBER SIXTEEN", char: "⑯" }
        ,{ hex: "&#2470;", name: "CIRCLED NUMBER SEVENTEEN", char: "⑰" }
        ,{ hex: "&#2471;", name: "CIRCLED NUMBER EIGHTEEN", char: "⑱" }
        ,{ hex: "&#2472;", name: "CIRCLED NUMBER NINETEEN", char: "⑲" }
        ,{ hex: "&#2473;", name: "CIRCLED NUMBER TWENTY", char: "⑳" }
        ,{ hex: "&#2474;", name: "PARENTHESIZED DIGIT ONE", char: "⑴" }
        ,{ hex: "&#2475;", name: "PARENTHESIZED DIGIT TWO", char: "⑵" }
        ,{ hex: "&#2476;", name: "PARENTHESIZED DIGIT THREE", char: "⑶" }
        ,{ hex: "&#2477;", name: "PARENTHESIZED DIGIT FOUR", char: "⑷" }
        ,{ hex: "&#2478;", name: "PARENTHESIZED DIGIT FIVE", char: "⑸" }
        ,{ hex: "&#2479;", name: "PARENTHESIZED DIGIT SIX", char: "⑹" }
        ,{ hex: "&#247A;", name: "PARENTHESIZED DIGIT SEVEN", char: "⑺" }
        ,{ hex: "&#247B;", name: "PARENTHESIZED DIGIT EIGHT", char: "⑻" }
        ,{ hex: "&#247C;", name: "PARENTHESIZED DIGIT NINE", char: "⑼" }
        ,{ hex: "&#247D;", name: "PARENTHESIZED NUMBER TEN", char: "⑽" }
        ,{ hex: "&#247E;", name: "PARENTHESIZED NUMBER ELEVEN", char: "⑾" }
        ,{ hex: "&#247F;", name: "PARENTHESIZED NUMBER TWELVE", char: "⑿" }
        ,{ hex: "&#2480;", name: "PARENTHESIZED NUMBER THIRTEEN", char: "⒀" }
        ,{ hex: "&#2481;", name: "PARENTHESIZED NUMBER FOURTEEN", char: "⒁" }
        ,{ hex: "&#2482;", name: "PARENTHESIZED NUMBER FIFTEEN", char: "⒂" }
        ,{ hex: "&#2483;", name: "PARENTHESIZED NUMBER SIXTEEN", char: "⒃" }
        ,{ hex: "&#2484;", name: "PARENTHESIZED NUMBER SEVENTEEN", char: "⒄" }
        ,{ hex: "&#2485;", name: "PARENTHESIZED NUMBER EIGHTEEN", char: "⒅" }
        ,{ hex: "&#2486;", name: "PARENTHESIZED NUMBER NINETEEN", char: "⒆" }
        ,{ hex: "&#2487;", name: "PARENTHESIZED NUMBER TWENTY", char: "⒇" }
        ,{ hex: "&#2488;", name: "DIGIT ONE FULL STOP", char: "⒈" }
        ,{ hex: "&#2489;", name: "DIGIT TWO FULL STOP", char: "⒉" }
        ,{ hex: "&#248A;", name: "DIGIT THREE FULL STOP", char: "⒊" }
        ,{ hex: "&#248B;", name: "DIGIT FOUR FULL STOP", char: "⒋" }
        ,{ hex: "&#248C;", name: "DIGIT FIVE FULL STOP", char: "⒌" }
        ,{ hex: "&#248D;", name: "DIGIT SIX FULL STOP", char: "⒍" }
        ,{ hex: "&#248E;", name: "DIGIT SEVEN FULL STOP", char: "⒎" }
        ,{ hex: "&#248F;", name: "DIGIT EIGHT FULL STOP", char: "⒏" }
        ,{ hex: "&#2490;", name: "DIGIT NINE FULL STOP", char: "⒐" }
        ,{ hex: "&#2491;", name: "NUMBER TEN FULL STOP", char: "⒑" }
        ,{ hex: "&#2492;", name: "NUMBER ELEVEN FULL STOP", char: "⒒" }
        ,{ hex: "&#2493;", name: "NUMBER TWELVE FULL STOP", char: "⒓" }
        ,{ hex: "&#2494;", name: "NUMBER THIRTEEN FULL STOP", char: "⒔" }
        ,{ hex: "&#2495;", name: "NUMBER FOURTEEN FULL STOP", char: "⒕" }
        ,{ hex: "&#2496;", name: "NUMBER FIFTEEN FULL STOP", char: "⒖" }
        ,{ hex: "&#2497;", name: "NUMBER SIXTEEN FULL STOP", char: "⒗" }
        ,{ hex: "&#2498;", name: "NUMBER SEVENTEEN FULL STOP", char: "⒘" }
        ,{ hex: "&#2499;", name: "NUMBER EIGHTEEN FULL STOP", char: "⒙" }
        ,{ hex: "&#249A;", name: "NUMBER NINETEEN FULL STOP", char: "⒚" }
        ,{ hex: "&#249B;", name: "NUMBER TWENTY FULL STOP", char: "⒛" }
        ,{ hex: "&#249C;", name: "PARENTHESIZED LATIN SMALL LETTER A", char: "⒜" }
        ,{ hex: "&#249D;", name: "PARENTHESIZED LATIN SMALL LETTER B", char: "⒝" }
        ,{ hex: "&#249E;", name: "PARENTHESIZED LATIN SMALL LETTER C", char: "⒞" }
        ,{ hex: "&#249F;", name: "PARENTHESIZED LATIN SMALL LETTER D", char: "⒟" }
        ,{ hex: "&#24A0;", name: "PARENTHESIZED LATIN SMALL LETTER E", char: "⒠" }
        ,{ hex: "&#24A1;", name: "PARENTHESIZED LATIN SMALL LETTER F", char: "⒡" }
        ,{ hex: "&#24A2;", name: "PARENTHESIZED LATIN SMALL LETTER G", char: "⒢" }
        ,{ hex: "&#24A3;", name: "PARENTHESIZED LATIN SMALL LETTER H", char: "⒣" }
        ,{ hex: "&#24A4;", name: "PARENTHESIZED LATIN SMALL LETTER I", char: "⒤" }
        ,{ hex: "&#24A5;", name: "PARENTHESIZED LATIN SMALL LETTER J", char: "⒥" }
        ,{ hex: "&#24A6;", name: "PARENTHESIZED LATIN SMALL LETTER K", char: "⒦" }
        ,{ hex: "&#24A7;", name: "PARENTHESIZED LATIN SMALL LETTER L", char: "⒧" }
        ,{ hex: "&#24A8;", name: "PARENTHESIZED LATIN SMALL LETTER M", char: "⒨" }
        ,{ hex: "&#24A9;", name: "PARENTHESIZED LATIN SMALL LETTER N", char: "⒩" }
        ,{ hex: "&#24AA;", name: "PARENTHESIZED LATIN SMALL LETTER O", char: "⒪" }
        ,{ hex: "&#24AB;", name: "PARENTHESIZED LATIN SMALL LETTER P", char: "⒫" }
        ,{ hex: "&#24AC;", name: "PARENTHESIZED LATIN SMALL LETTER Q", char: "⒬" }
        ,{ hex: "&#24AD;", name: "PARENTHESIZED LATIN SMALL LETTER R", char: "⒭" }
        ,{ hex: "&#24AE;", name: "PARENTHESIZED LATIN SMALL LETTER S", char: "⒮" }
        ,{ hex: "&#24AF;", name: "PARENTHESIZED LATIN SMALL LETTER T", char: "⒯" }
        ,{ hex: "&#24B0;", name: "PARENTHESIZED LATIN SMALL LETTER U", char: "⒰" }
        ,{ hex: "&#24B1;", name: "PARENTHESIZED LATIN SMALL LETTER V", char: "⒱" }
        ,{ hex: "&#24B2;", name: "PARENTHESIZED LATIN SMALL LETTER W", char: "⒲" }
        ,{ hex: "&#24B3;", name: "PARENTHESIZED LATIN SMALL LETTER X", char: "⒳" }
        ,{ hex: "&#24B4;", name: "PARENTHESIZED LATIN SMALL LETTER Y", char: "⒴" }
        ,{ hex: "&#24B5;", name: "PARENTHESIZED LATIN SMALL LETTER Z", char: "⒵" }
        ,{ hex: "&#24B6;", name: "CIRCLED LATIN CAPITAL LETTER A", char: "Ⓐ" }
        ,{ hex: "&#24B7;", name: "CIRCLED LATIN CAPITAL LETTER B", char: "Ⓑ" }
        ,{ hex: "&#24B8;", name: "CIRCLED LATIN CAPITAL LETTER C", char: "Ⓒ" }
        ,{ hex: "&#24B9;", name: "CIRCLED LATIN CAPITAL LETTER D", char: "Ⓓ" }
        ,{ hex: "&#24BA;", name: "CIRCLED LATIN CAPITAL LETTER E", char: "Ⓔ" }
        ,{ hex: "&#24BB;", name: "CIRCLED LATIN CAPITAL LETTER F", char: "Ⓕ" }
        ,{ hex: "&#24BC;", name: "CIRCLED LATIN CAPITAL LETTER G", char: "Ⓖ" }
        ,{ hex: "&#24BD;", name: "CIRCLED LATIN CAPITAL LETTER H", char: "Ⓗ" }
        ,{ hex: "&#24BE;", name: "CIRCLED LATIN CAPITAL LETTER I", char: "Ⓘ" }
        ,{ hex: "&#24BF;", name: "CIRCLED LATIN CAPITAL LETTER J", char: "Ⓙ" }
        ,{ hex: "&#24C0;", name: "CIRCLED LATIN CAPITAL LETTER K", char: "Ⓚ" }
        ,{ hex: "&#24C1;", name: "CIRCLED LATIN CAPITAL LETTER L", char: "Ⓛ" }
        ,{ hex: "&#24C2;", name: "CIRCLED LATIN CAPITAL LETTER M", char: "Ⓜ" }
        ,{ hex: "&#24C3;", name: "CIRCLED LATIN CAPITAL LETTER N", char: "Ⓝ" }
        ,{ hex: "&#24C4;", name: "CIRCLED LATIN CAPITAL LETTER O", char: "Ⓞ" }
        ,{ hex: "&#24C5;", name: "CIRCLED LATIN CAPITAL LETTER P", char: "Ⓟ" }
        ,{ hex: "&#24C6;", name: "CIRCLED LATIN CAPITAL LETTER Q", char: "Ⓠ" }
        ,{ hex: "&#24C7;", name: "CIRCLED LATIN CAPITAL LETTER R", char: "Ⓡ" }
        ,{ hex: "&#24C8;", name: "CIRCLED LATIN CAPITAL LETTER S", char: "Ⓢ" }
        ,{ hex: "&#24C9;", name: "CIRCLED LATIN CAPITAL LETTER T", char: "Ⓣ" }
        ,{ hex: "&#24CA;", name: "CIRCLED LATIN CAPITAL LETTER U", char: "Ⓤ" }
        ,{ hex: "&#24CB;", name: "CIRCLED LATIN CAPITAL LETTER V", char: "Ⓥ" }
        ,{ hex: "&#24CC;", name: "CIRCLED LATIN CAPITAL LETTER W", char: "Ⓦ" }
        ,{ hex: "&#24CD;", name: "CIRCLED LATIN CAPITAL LETTER X", char: "Ⓧ" }
        ,{ hex: "&#24CE;", name: "CIRCLED LATIN CAPITAL LETTER Y", char: "Ⓨ" }
        ,{ hex: "&#24CF;", name: "CIRCLED LATIN CAPITAL LETTER Z", char: "Ⓩ" }
        ,{ hex: "&#24D0;", name: "CIRCLED LATIN SMALL LETTER A", char: "ⓐ" }
        ,{ hex: "&#24D1;", name: "CIRCLED LATIN SMALL LETTER B", char: "ⓑ" }
        ,{ hex: "&#24D2;", name: "CIRCLED LATIN SMALL LETTER C", char: "ⓒ" }
        ,{ hex: "&#24D3;", name: "CIRCLED LATIN SMALL LETTER D", char: "ⓓ" }
        ,{ hex: "&#24D4;", name: "CIRCLED LATIN SMALL LETTER E", char: "ⓔ" }
        ,{ hex: "&#24D5;", name: "CIRCLED LATIN SMALL LETTER F", char: "ⓕ" }
        ,{ hex: "&#24D6;", name: "CIRCLED LATIN SMALL LETTER G", char: "ⓖ" }
        ,{ hex: "&#24D7;", name: "CIRCLED LATIN SMALL LETTER H", char: "ⓗ" }
        ,{ hex: "&#24D8;", name: "CIRCLED LATIN SMALL LETTER I", char: "ⓘ" }
        ,{ hex: "&#24D9;", name: "CIRCLED LATIN SMALL LETTER J", char: "ⓙ" }
        ,{ hex: "&#24DA;", name: "CIRCLED LATIN SMALL LETTER K", char: "ⓚ" }
        ,{ hex: "&#24DB;", name: "CIRCLED LATIN SMALL LETTER L", char: "ⓛ" }
        ,{ hex: "&#24DC;", name: "CIRCLED LATIN SMALL LETTER M", char: "ⓜ" }
        ,{ hex: "&#24DD;", name: "CIRCLED LATIN SMALL LETTER N", char: "ⓝ" }
        ,{ hex: "&#24DE;", name: "CIRCLED LATIN SMALL LETTER O", char: "ⓞ" }
        ,{ hex: "&#24DF;", name: "CIRCLED LATIN SMALL LETTER P", char: "ⓟ" }
        ,{ hex: "&#24E0;", name: "CIRCLED LATIN SMALL LETTER Q", char: "ⓠ" }
        ,{ hex: "&#24E1;", name: "CIRCLED LATIN SMALL LETTER R", char: "ⓡ" }
        ,{ hex: "&#24E2;", name: "CIRCLED LATIN SMALL LETTER S", char: "ⓢ" }
        ,{ hex: "&#24E3;", name: "CIRCLED LATIN SMALL LETTER T", char: "ⓣ" }
        ,{ hex: "&#24E4;", name: "CIRCLED LATIN SMALL LETTER U", char: "ⓤ" }
        ,{ hex: "&#24E5;", name: "CIRCLED LATIN SMALL LETTER V", char: "ⓥ" }
        ,{ hex: "&#24E6;", name: "CIRCLED LATIN SMALL LETTER W", char: "ⓦ" }
        ,{ hex: "&#24E7;", name: "CIRCLED LATIN SMALL LETTER X", char: "ⓧ" }
        ,{ hex: "&#24E8;", name: "CIRCLED LATIN SMALL LETTER Y", char: "ⓨ" }
        ,{ hex: "&#24E9;", name: "CIRCLED LATIN SMALL LETTER Z", char: "ⓩ" }
        ,{ hex: "&#24EA;", name: "CIRCLED DIGIT ZERO", char: "⓪" }

        ,{ hex: "&#2070;", name: "SUPERSCRIPT ZERO", char: "⁰" }
        ,{ hex: "&#2071;", name: "SUPERSCRIPT LATIN SMALL LETTER I", char: "ⁱ" }
        ,{ hex: "&#2074;", name: "SUPERSCRIPT FOUR", char: "⁴" }
        ,{ hex: "&#2075;", name: "SUPERSCRIPT FIVE", char: "⁵" }
        ,{ hex: "&#2076;", name: "SUPERSCRIPT SIX", char: "⁶" }
        ,{ hex: "&#2077;", name: "SUPERSCRIPT SEVEN", char: "⁷" }
        ,{ hex: "&#2078;", name: "SUPERSCRIPT EIGHT", char: "⁸" }
        ,{ hex: "&#2079;", name: "SUPERSCRIPT NINE", char: "⁹" }
        ,{ hex: "&#207A;", name: "SUPERSCRIPT PLUS SIGN", char: "⁺" }
        ,{ hex: "&#207B;", name: "SUPERSCRIPT MINUS", char: "⁻" }
        ,{ hex: "&#207C;", name: "SUPERSCRIPT EQUALS SIGN", char: "⁼" }
        ,{ hex: "&#207D;", name: "SUPERSCRIPT LEFT PARENTHESIS", char: "⁽" }
        ,{ hex: "&#207E;", name: "SUPERSCRIPT RIGHT PARENTHESIS", char: "⁾" }
        ,{ hex: "&#207F;", name: "SUPERSCRIPT LATIN SMALL LETTER N (present in WGL4)", char: "ⁿ" }
        ,{ hex: "&#2080;", name: "SUBSCRIPT ZERO", char: "₀" }
        ,{ hex: "&#2081;", name: "SUBSCRIPT ONE", char: "₁" }
        ,{ hex: "&#2082;", name: "SUBSCRIPT TWO", char: "₂" }
        ,{ hex: "&#2083;", name: "SUBSCRIPT THREE", char: "₃" }
        ,{ hex: "&#2084;", name: "SUBSCRIPT FOUR", char: "₄" }
        ,{ hex: "&#2085;", name: "SUBSCRIPT FIVE", char: "₅" }
        ,{ hex: "&#2086;", name: "SUBSCRIPT SIX", char: "₆" }
        ,{ hex: "&#2087;", name: "SUBSCRIPT SEVEN", char: "₇" }
        ,{ hex: "&#2088;", name: "SUBSCRIPT EIGHT", char: "₈" }
        ,{ hex: "&#2089;", name: "SUBSCRIPT NINE", char: "₉" }
        ,{ hex: "&#208A;", name: "SUBSCRIPT PLUS SIGN", char: "₊" }
        ,{ hex: "&#208B;", name: "SUBSCRIPT MINUS", char: "₋" }
        ,{ hex: "&#208C;", name: "SUBSCRIPT EQUALS SIGN", char: "₌" }
        ,{ hex: "&#208D;", name: "SUBSCRIPT LEFT PARENTHESIS", char: "₍" }
        ,{ hex: "&#208E;", name: "SUBSCRIPT RIGHT PARENTHESIS", char: "₎" }
        ,{ hex: "&#2090;", name: "LATIN SUBSCRIPT SMALL LETTER A", char: "ₐ" }
        ,{ hex: "&#2091;", name: "LATIN SUBSCRIPT SMALL LETTER E", char: "ₑ" }
        ,{ hex: "&#2092;", name: "LATIN SUBSCRIPT SMALL LETTER O", char: "ₒ" }
        ,{ hex: "&#2093;", name: "LATIN SUBSCRIPT SMALL LETTER X", char: "ₓ" }
        ,{ hex: "&#2094;", name: "LATIN SUBSCRIPT SMALL LETTER SCHWA", char: "ₔ" }],


        "Latin": [
        { entity: "&Agrave;", hex: "&#00C0;", name: "LATIN CAPITAL LETTER A WITH GRAVE", char: "À" }
        ,{ entity: "&Aacute;", hex: "&#00C1;", name: "LATIN CAPITAL LETTER A WITH ACUTE", char: "Á" }
        ,{ entity: "&Acirc;", hex: "&#00C2;", name: "LATIN CAPITAL LETTER A WITH CIRCUMFLEX", char: "Â" }
        ,{ entity: "&Atilde;", hex: "&#00C3;", name: "LATIN CAPITAL LETTER A WITH TILDE", char: "Ã" }
        ,{ entity: "&Auml;", hex: "&#00C4;", name: "LATIN CAPITAL LETTER A WITH DIAERESIS", char: "Ä" }
        ,{ entity: "&Aring;", hex: "&#00C5;", name: "LATIN CAPITAL LETTER A WITH RING ABOVE", char: "Å" }
        ,{ entity: "&AElig;", hex: "&#00C6;", name: "LATIN CAPITAL LETTER AE", char: "Æ" }
        ,{ entity: "&Ccedil;", hex: "&#00C7;", name: "LATIN CAPITAL LETTER C WITH CEDILLA", char: "Ç" }
        ,{ entity: "&Egrave;", hex: "&#00C8;", name: "LATIN CAPITAL LETTER E WITH GRAVE", char: "È" }
        ,{ entity: "&Eacute;", hex: "&#00C9;", name: "LATIN CAPITAL LETTER E WITH ACUTE", char: "É" }
        ,{ entity: "&Ecirc;", hex: "&#00CA;", name: "LATIN CAPITAL LETTER E WITH CIRCUMFLEX", char: "Ê" }
        ,{ entity: "&Euml;", hex: "&#00CB;", name: "LATIN CAPITAL LETTER E WITH DIAERESIS", char: "Ë" }
        ,{ entity: "&Igrave;", hex: "&#00CC;", name: "LATIN CAPITAL LETTER I WITH GRAVE", char: "Ì" }
        ,{ entity: "&Iacute;", hex: "&#00CD;", name: "LATIN CAPITAL LETTER I WITH ACUTE", char: "Í" }
        ,{ entity: "&Icirc;", hex: "&#00CE;", name: "LATIN CAPITAL LETTER I WITH CIRCUMFLEX", char: "Î" }
        ,{ entity: "&Iuml;", hex: "&#00CF;", name: "LATIN CAPITAL LETTER I WITH DIAERESIS", char: "Ï" }
        ,{ entity: "&ETH;", hex: "&#00D0;", name: "LATIN CAPITAL LETTER ETH", char: "Ð" }
        ,{ entity: "&Ntilde;", hex: "&#00D1;", name: "LATIN CAPITAL LETTER N WITH TILDE", char: "Ñ" }
        ,{ entity: "&Ograve;", hex: "&#00D2;", name: "LATIN CAPITAL LETTER O WITH GRAVE", char: "Ò" }
        ,{ entity: "&Oacute;", hex: "&#00D3;", name: "LATIN CAPITAL LETTER O WITH ACUTE", char: "Ó" }
        ,{ entity: "&Ocirc;", hex: "&#00D4;", name: "LATIN CAPITAL LETTER O WITH CIRCUMFLEX", char: "Ô" }
        ,{ entity: "&Otilde;", hex: "&#00D5;", name: "LATIN CAPITAL LETTER O WITH TILDE", char: "Õ" }
        ,{ entity: "&Ouml;", hex: "&#00D6;", name: "LATIN CAPITAL LETTER O WITH DIAERESIS", char: "Ö" }
        ,{ entity: "&times;", hex: "&#00D7;", name: "MULTIPLICATION SIGN", char: "×" }
        ,{ entity: "&Oslash;", hex: "&#00D8;", name: "LATIN CAPITAL LETTER O WITH STROKE", char: "Ø" }
        ,{ entity: "&Ugrave;", hex: "&#00D9;", name: "LATIN CAPITAL LETTER U WITH GRAVE", char: "Ù" }
        ,{ entity: "&Uacute;", hex: "&#00DA;", name: "LATIN CAPITAL LETTER U WITH ACUTE", char: "Ú" }
        ,{ entity: "&Ucirc;", hex: "&#00DB;", name: "LATIN CAPITAL LETTER U WITH CIRCUMFLEX", char: "Û" }
        ,{ entity: "&Uuml;", hex: "&#00DC;", name: "LATIN CAPITAL LETTER U WITH DIAERESIS", char: "Ü" }
        ,{ entity: "&Yacute;", hex: "&#00DD;", name: "LATIN CAPITAL LETTER Y WITH ACUTE", char: "Ý" }
        ,{ entity: "&THORN;", hex: "&#00DE;", name: "LATIN CAPITAL LETTER THORN", char: "Þ" }
        ,{ entity: "&szlig;", hex: "&#00DF;", name: "LATIN SMALL LETTER SHARP S", char: "ß" }
        ,{ entity: "&agrave;", hex: "&#00E0;", name: "LATIN SMALL LETTER A WITH GRAVE", char: "à" }
        ,{ entity: "&aacute;", hex: "&#00E1;", name: "LATIN SMALL LETTER A WITH ACUTE", char: "á" }
        ,{ entity: "&acirc;", hex: "&#00E2;", name: "LATIN SMALL LETTER A WITH CIRCUMFLEX", char: "â" }
        ,{ entity: "&atilde;", hex: "&#00E3;", name: "LATIN SMALL LETTER A WITH TILDE", char: "ã" }
        ,{ entity: "&auml;", hex: "&#00E4;", name: "LATIN SMALL LETTER A WITH DIAERESIS", char: "ä" }
        ,{ entity: "&aring;", hex: "&#00E5;", name: "LATIN SMALL LETTER A WITH RING ABOVE", char: "å" }
        ,{ entity: "&aelig;", hex: "&#00E6;", name: "LATIN SMALL LETTER AE", char: "æ" }
        ,{ entity: "&ccedil;", hex: "&#00E7;", name: "LATIN SMALL LETTER C WITH CEDILLA", char: "ç" }
        ,{ entity: "&egrave;", hex: "&#00E8;", name: "LATIN SMALL LETTER E WITH GRAVE", char: "è" }
        ,{ entity: "&eacute;", hex: "&#00E9;", name: "LATIN SMALL LETTER E WITH ACUTE", char: "é" }
        ,{ entity: "&ecirc;", hex: "&#00EA;", name: "LATIN SMALL LETTER E WITH CIRCUMFLEX", char: "ê" }
        ,{ entity: "&euml;", hex: "&#00EB;", name: "LATIN SMALL LETTER E WITH DIAERESIS", char: "ë" }
        ,{ entity: "&igrave;", hex: "&#00EC;", name: "LATIN SMALL LETTER I WITH GRAVE", char: "ì" }
        ,{ entity: "&iacute;", hex: "&#00ED;", name: "LATIN SMALL LETTER I WITH ACUTE", char: "í" }
        ,{ entity: "&icirc;", hex: "&#00EE;", name: "LATIN SMALL LETTER I WITH CIRCUMFLEX", char: "î" }
        ,{ entity: "&iuml;", hex: "&#00EF;", name: "LATIN SMALL LETTER I WITH DIAERESIS", char: "ï" }
        ,{ entity: "&eth;", hex: "&#00F0;", name: "LATIN SMALL LETTER ETH", char: "ð" }
        ,{ entity: "&ntilde;", hex: "&#00F1;", name: "LATIN SMALL LETTER N WITH TILDE", char: "ñ" }
        ,{ entity: "&ograve;", hex: "&#00F2;", name: "LATIN SMALL LETTER O WITH GRAVE", char: "ò" }
        ,{ entity: "&oacute;", hex: "&#00F3;", name: "LATIN SMALL LETTER O WITH ACUTE", char: "ó" }
        ,{ entity: "&ocirc;", hex: "&#00F4;", name: "LATIN SMALL LETTER O WITH CIRCUMFLEX", char: "ô" }
        ,{ entity: "&otilde;", hex: "&#00F5;", name: "LATIN SMALL LETTER O WITH TILDE", char: "õ" }
        ,{ entity: "&ouml;", hex: "&#00F6;", name: "LATIN SMALL LETTER O WITH DIAERESIS", char: "ö" }
        ,{ entity: "&divide;", hex: "&#00F7;", name: "DIVISION SIGN", char: "÷" }
        ,{ entity: "&oslash;", hex: "&#00F8;", name: "LATIN SMALL LETTER O WITH STROKE", char: "ø" }
        ,{ entity: "&ugrave;", hex: "&#00F9;", name: "LATIN SMALL LETTER U WITH GRAVE", char: "ù" }
        ,{ entity: "&uacute;", hex: "&#00FA;", name: "LATIN SMALL LETTER U WITH ACUTE", char: "ú" }
        ,{ entity: "&ucirc;", hex: "&#00FB;", name: "LATIN SMALL LETTER U WITH CIRCUMFLEX", char: "û" }
        ,{ entity: "&uuml;", hex: "&#00FC;", name: "LATIN SMALL LETTER U WITH DIAERESIS", char: "ü" }
        ,{ entity: "&yacute;", hex: "&#00FD;", name: "LATIN SMALL LETTER Y WITH ACUTE", char: "ý" }
        ,{ entity: "&thorn;", hex: "&#00FE;", name: "LATIN SMALL LETTER THORN", char: "þ" }
        ,{ entity: "&yuml;", hex: "&#00FF;", name: "LATIN SMALL LETTER Y WITH DIAERESIS", char: "ÿ" }

        ,{ hex: "&#0100;", name: "LATIN CAPITAL LETTER A WITH MACRON", char: "Ā" }
        ,{ hex: "&#0101;", name: "LATIN SMALL LETTER A WITH MACRON", char: "ā" }
        ,{ hex: "&#0102;", name: "LATIN CAPITAL LETTER A WITH BREVE", char: "Ă" }
        ,{ hex: "&#0103;", name: "LATIN SMALL LETTER A WITH BREVE", char: "ă" }
        ,{ hex: "&#0104;", name: "LATIN CAPITAL LETTER A WITH OGONEK", char: "Ą" }
        ,{ hex: "&#0105;", name: "LATIN SMALL LETTER A WITH OGONEK", char: "ą" }
        ,{ hex: "&#0106;", name: "LATIN CAPITAL LETTER C WITH ACUTE", char: "Ć" }
        ,{ hex: "&#0107;", name: "LATIN SMALL LETTER C WITH ACUTE", char: "ć" }
        ,{ hex: "&#0108;", name: "LATIN CAPITAL LETTER C WITH CIRCUMFLEX", char: "Ĉ" }
        ,{ hex: "&#0109;", name: "LATIN SMALL LETTER C WITH CIRCUMFLEX", char: "ĉ" }
        ,{ hex: "&#010A;", name: "LATIN CAPITAL LETTER C WITH DOT ABOVE", char: "Ċ" }
        ,{ hex: "&#010B;", name: "LATIN SMALL LETTER C WITH DOT ABOVE", char: "ċ" }
        ,{ hex: "&#010C;", name: "LATIN CAPITAL LETTER C WITH CARON", char: "Č" }
        ,{ hex: "&#010D;", name: "LATIN SMALL LETTER C WITH CARON", char: "č" }
        ,{ hex: "&#010E;", name: "LATIN CAPITAL LETTER D WITH CARON", char: "Ď" }
        ,{ hex: "&#010F;", name: "LATIN SMALL LETTER D WITH CARON", char: "ď" }
        ,{ hex: "&#0110;", name: "LATIN CAPITAL LETTER D WITH STROKE", char: "Đ" }
        ,{ hex: "&#0111;", name: "LATIN SMALL LETTER D WITH STROKE", char: "đ" }
        ,{ hex: "&#0112;", name: "LATIN CAPITAL LETTER E WITH MACRON", char: "Ē" }
        ,{ hex: "&#0113;", name: "LATIN SMALL LETTER E WITH MACRON", char: "ē" }
        ,{ hex: "&#0114;", name: "LATIN CAPITAL LETTER E WITH BREVE", char: "Ĕ" }
        ,{ hex: "&#0115;", name: "LATIN SMALL LETTER E WITH BREVE", char: "ĕ" }
        ,{ hex: "&#0116;", name: "LATIN CAPITAL LETTER E WITH DOT ABOVE", char: "Ė" }
        ,{ hex: "&#0117;", name: "LATIN SMALL LETTER E WITH DOT ABOVE", char: "ė" }
        ,{ hex: "&#0118;", name: "LATIN CAPITAL LETTER E WITH OGONEK", char: "Ę" }
        ,{ hex: "&#0119;", name: "LATIN SMALL LETTER E WITH OGONEK", char: "ę" }
        ,{ hex: "&#011A;", name: "LATIN CAPITAL LETTER E WITH CARON", char: "Ě" }
        ,{ hex: "&#011B;", name: "LATIN SMALL LETTER E WITH CARON", char: "ě" }
        ,{ hex: "&#011C;", name: "LATIN CAPITAL LETTER G WITH CIRCUMFLEX", char: "Ĝ" }
        ,{ hex: "&#011D;", name: "LATIN SMALL LETTER G WITH CIRCUMFLEX", char: "ĝ" }
        ,{ hex: "&#011E;", name: "LATIN CAPITAL LETTER G WITH BREVE", char: "Ğ" }
        ,{ hex: "&#011F;", name: "LATIN SMALL LETTER G WITH BREVE", char: "ğ" }
        ,{ hex: "&#0120;", name: "LATIN CAPITAL LETTER G WITH DOT ABOVE", char: "Ġ" }
        ,{ hex: "&#0121;", name: "LATIN SMALL LETTER G WITH DOT ABOVE", char: "ġ" }
        ,{ hex: "&#0122;", name: "LATIN CAPITAL LETTER G WITH CEDILLA", char: "Ģ" }
        ,{ hex: "&#0123;", name: "LATIN SMALL LETTER G WITH CEDILLA", char: "ģ" }
        ,{ hex: "&#0124;", name: "LATIN CAPITAL LETTER H WITH CIRCUMFLEX", char: "Ĥ" }
        ,{ hex: "&#0125;", name: "LATIN SMALL LETTER H WITH CIRCUMFLEX", char: "ĥ" }
        ,{ hex: "&#0126;", name: "LATIN CAPITAL LETTER H WITH STROKE", char: "Ħ" }
        ,{ hex: "&#0127;", name: "LATIN SMALL LETTER H WITH STROKE", char: "ħ" }
        ,{ hex: "&#0128;", name: "LATIN CAPITAL LETTER I WITH TILDE", char: "Ĩ" }
        ,{ hex: "&#0129;", name: "LATIN SMALL LETTER I WITH TILDE", char: "ĩ" }
        ,{ hex: "&#012A;", name: "LATIN CAPITAL LETTER I WITH MACRON", char: "Ī" }
        ,{ hex: "&#012B;", name: "LATIN SMALL LETTER I WITH MACRON", char: "ī" }
        ,{ hex: "&#012C;", name: "LATIN CAPITAL LETTER I WITH BREVE", char: "Ĭ" }
        ,{ hex: "&#012D;", name: "LATIN SMALL LETTER I WITH BREVE", char: "ĭ" }
        ,{ hex: "&#012E;", name: "LATIN CAPITAL LETTER I WITH OGONEK", char: "Į" }
        ,{ hex: "&#012F;", name: "LATIN SMALL LETTER I WITH OGONEK", char: "į" }
        ,{ hex: "&#0130;", name: "LATIN CAPITAL LETTER I WITH DOT ABOVE", char: "İ" }
        ,{ hex: "&#0131;", name: "LATIN SMALL LETTER DOTLESS I", char: "ı" }
        ,{ hex: "&#0132;", name: "LATIN CAPITAL LIGATURE IJ", char: "Ĳ" }
        ,{ hex: "&#0133;", name: "LATIN SMALL LIGATURE IJ", char: "ĳ" }
        ,{ hex: "&#0134;", name: "LATIN CAPITAL LETTER J WITH CIRCUMFLEX", char: "Ĵ" }
        ,{ hex: "&#0135;", name: "LATIN SMALL LETTER J WITH CIRCUMFLEX", char: "ĵ" }
        ,{ hex: "&#0136;", name: "LATIN CAPITAL LETTER K WITH CEDILLA", char: "Ķ" }
        ,{ hex: "&#0137;", name: "LATIN SMALL LETTER K WITH CEDILLA", char: "ķ" }
        ,{ hex: "&#0138;", name: "LATIN SMALL LETTER KRA", char: "ĸ" }
        ,{ hex: "&#0139;", name: "LATIN CAPITAL LETTER L WITH ACUTE", char: "Ĺ" }
        ,{ hex: "&#013A;", name: "LATIN SMALL LETTER L WITH ACUTE", char: "ĺ" }
        ,{ hex: "&#013B;", name: "LATIN CAPITAL LETTER L WITH CEDILLA", char: "Ļ" }
        ,{ hex: "&#013C;", name: "LATIN SMALL LETTER L WITH CEDILLA", char: "ļ" }
        ,{ hex: "&#013D;", name: "LATIN CAPITAL LETTER L WITH CARON", char: "Ľ" }
        ,{ hex: "&#013E;", name: "LATIN SMALL LETTER L WITH CARON", char: "ľ" }
        ,{ hex: "&#013F;", name: "LATIN CAPITAL LETTER L WITH MIDDLE DOT", char: "Ŀ" }
        ,{ hex: "&#0140;", name: "LATIN SMALL LETTER L WITH MIDDLE DOT", char: "ŀ" }
        ,{ hex: "&#0141;", name: "LATIN CAPITAL LETTER L WITH STROKE", char: "Ł" }
        ,{ hex: "&#0142;", name: "LATIN SMALL LETTER L WITH STROKE", char: "ł" }
        ,{ hex: "&#0143;", name: "LATIN CAPITAL LETTER N WITH ACUTE", char: "Ń" }
        ,{ hex: "&#0144;", name: "LATIN SMALL LETTER N WITH ACUTE", char: "ń" }
        ,{ hex: "&#0145;", name: "LATIN CAPITAL LETTER N WITH CEDILLA", char: "Ņ" }
        ,{ hex: "&#0146;", name: "LATIN SMALL LETTER N WITH CEDILLA", char: "ņ" }
        ,{ hex: "&#0147;", name: "LATIN CAPITAL LETTER N WITH CARON", char: "Ň" }
        ,{ hex: "&#0148;", name: "LATIN SMALL LETTER N WITH CARON", char: "ň" }
        ,{ hex: "&#0149;", name: "LATIN SMALL LETTER N PRECEDED BY APOSTROPHE", char: "ŉ" }
        ,{ hex: "&#014A;", name: "LATIN CAPITAL LETTER ENG", char: "Ŋ" }
        ,{ hex: "&#014B;", name: "LATIN SMALL LETTER ENG", char: "ŋ" }
        ,{ hex: "&#014C;", name: "LATIN CAPITAL LETTER O WITH MACRON", char: "Ō" }
        ,{ hex: "&#014D;", name: "LATIN SMALL LETTER O WITH MACRON", char: "ō" }
        ,{ hex: "&#014E;", name: "LATIN CAPITAL LETTER O WITH BREVE", char: "Ŏ" }
        ,{ hex: "&#014F;", name: "LATIN SMALL LETTER O WITH BREVE", char: "ŏ" }
        ,{ hex: "&#0150;", name: "LATIN CAPITAL LETTER O WITH DOUBLE ACUTE", char: "Ő" }
        ,{ hex: "&#0151;", name: "LATIN SMALL LETTER O WITH DOUBLE ACUTE", char: "ő" }
        ,{ entity: "&OElig;", hex: "&#0152;", name: "LATIN CAPITAL LIGATURE OE", char: "Œ" }
        ,{ entity: "&oelig;", hex: "&#0153;", name: "LATIN SMALL LIGATURE OE", char: "œ" }
        ,{ hex: "&#0154;", name: "LATIN CAPITAL LETTER R WITH ACUTE", char: "Ŕ" }
        ,{ hex: "&#0155;", name: "LATIN SMALL LETTER R WITH ACUTE", char: "ŕ" }
        ,{ hex: "&#0156;", name: "LATIN CAPITAL LETTER R WITH CEDILLA", char: "Ŗ" }
        ,{ hex: "&#0157;", name: "LATIN SMALL LETTER R WITH CEDILLA", char: "ŗ" }
        ,{ hex: "&#0158;", name: "LATIN CAPITAL LETTER R WITH CARON", char: "Ř" }
        ,{ hex: "&#0159;", name: "LATIN SMALL LETTER R WITH CARON", char: "ř" }
        ,{ hex: "&#015A;", name: "LATIN CAPITAL LETTER S WITH ACUTE", char: "Ś" }
        ,{ hex: "&#015B;", name: "LATIN SMALL LETTER S WITH ACUTE", char: "ś" }
        ,{ hex: "&#015C;", name: "LATIN CAPITAL LETTER S WITH CIRCUMFLEX", char: "Ŝ" }
        ,{ hex: "&#015D;", name: "LATIN SMALL LETTER S WITH CIRCUMFLEX", char: "ŝ" }
        ,{ hex: "&#015E;", name: "LATIN CAPITAL LETTER S WITH CEDILLA", char: "Ş" }
        ,{ hex: "&#015F;", name: "LATIN SMALL LETTER S WITH CEDILLA", char: "ş" }
        ,{ entity: "&Scaron;", hex: "&#0160;", name: "LATIN CAPITAL LETTER S WITH CARON", char: "Š" }
        ,{ entity: "&scaron;", hex: "&#0161;", name: "LATIN SMALL LETTER S WITH CARON", char: "š" }
        ,{ hex: "&#0162;", name: "LATIN CAPITAL LETTER T WITH CEDILLA", char: "Ţ" }
        ,{ hex: "&#0163;", name: "LATIN SMALL LETTER T WITH CEDILLA", char: "ţ" }
        ,{ hex: "&#0164;", name: "LATIN CAPITAL LETTER T WITH CARON", char: "Ť" }
        ,{ hex: "&#0165;", name: "LATIN SMALL LETTER T WITH CARON", char: "ť" }
        ,{ hex: "&#0166;", name: "LATIN CAPITAL LETTER T WITH STROKE", char: "Ŧ" }
        ,{ hex: "&#0167;", name: "LATIN SMALL LETTER T WITH STROKE", char: "ŧ" }
        ,{ hex: "&#0168;", name: "LATIN CAPITAL LETTER U WITH TILDE", char: "Ũ" }
        ,{ hex: "&#0169;", name: "LATIN SMALL LETTER U WITH TILDE", char: "ũ" }
        ,{ hex: "&#016A;", name: "LATIN CAPITAL LETTER U WITH MACRON", char: "Ū" }
        ,{ hex: "&#016B;", name: "LATIN SMALL LETTER U WITH MACRON", char: "ū" }
        ,{ hex: "&#016C;", name: "LATIN CAPITAL LETTER U WITH BREVE", char: "Ŭ" }
        ,{ hex: "&#016D;", name: "LATIN SMALL LETTER U WITH BREVE", char: "ŭ" }
        ,{ hex: "&#016E;", name: "LATIN CAPITAL LETTER U WITH RING ABOVE", char: "Ů" }
        ,{ hex: "&#016F;", name: "LATIN SMALL LETTER U WITH RING ABOVE", char: "ů" }
        ,{ hex: "&#0170;", name: "LATIN CAPITAL LETTER U WITH DOUBLE ACUTE", char: "Ű" }
        ,{ hex: "&#0171;", name: "LATIN SMALL LETTER U WITH DOUBLE ACUTE", char: "ű" }
        ,{ hex: "&#0172;", name: "LATIN CAPITAL LETTER U WITH OGONEK", char: "Ų" }
        ,{ hex: "&#0173;", name: "LATIN SMALL LETTER U WITH OGONEK", char: "ų" }
        ,{ hex: "&#0174;", name: "LATIN CAPITAL LETTER W WITH CIRCUMFLEX", char: "Ŵ" }
        ,{ hex: "&#0175;", name: "LATIN SMALL LETTER W WITH CIRCUMFLEX", char: "ŵ" }
        ,{ hex: "&#0176;", name: "LATIN CAPITAL LETTER Y WITH CIRCUMFLEX", char: "Ŷ" }
        ,{ hex: "&#0177;", name: "LATIN SMALL LETTER Y WITH CIRCUMFLEX", char: "ŷ" }
        ,{ entity: "&Yuml;", hex: "&#0178;", name: "LATIN CAPITAL LETTER Y WITH DIAERESIS", char: "Ÿ" }
        ,{ hex: "&#0179;", name: "LATIN CAPITAL LETTER Z WITH ACUTE", char: "Ź" }
        ,{ hex: "&#017A;", name: "LATIN SMALL LETTER Z WITH ACUTE", char: "ź" }
        ,{ hex: "&#017B;", name: "LATIN CAPITAL LETTER Z WITH DOT ABOVE", char: "Ż" }
        ,{ hex: "&#017C;", name: "LATIN SMALL LETTER Z WITH DOT ABOVE", char: "ż" }
        ,{ hex: "&#017D;", name: "LATIN CAPITAL LETTER Z WITH CARON", char: "Ž" }
        ,{ hex: "&#017E;", name: "LATIN SMALL LETTER Z WITH CARON", char: "ž" }
        ,{ hex: "&#017F;", name: "LATIN SMALL LETTER LONG S", char: "ſ" }


        ,{ hex: "&#0180;", name: "LATIN SMALL LETTER B WITH STROKE", char: "ƀ" }
        ,{ hex: "&#0181;", name: "LATIN CAPITAL LETTER B WITH HOOK", char: "Ɓ" }
        ,{ hex: "&#0182;", name: "LATIN CAPITAL LETTER B WITH TOPBAR", char: "Ƃ" }
        ,{ hex: "&#0183;", name: "LATIN SMALL LETTER B WITH TOPBAR", char: "ƃ" }
        ,{ hex: "&#0184;", name: "LATIN CAPITAL LETTER TONE SIX", char: "Ƅ" }
        ,{ hex: "&#0185;", name: "LATIN SMALL LETTER TONE SIX", char: "ƅ" }
        ,{ hex: "&#0186;", name: "LATIN CAPITAL LETTER OPEN O", char: "Ɔ" }
        ,{ hex: "&#0187;", name: "LATIN CAPITAL LETTER C WITH HOOK", char: "Ƈ" }
        ,{ hex: "&#0188;", name: "LATIN SMALL LETTER C WITH HOOK", char: "ƈ" }
        ,{ hex: "&#0189;", name: "LATIN CAPITAL LETTER AFRICAN D", char: "Ɖ" }
        ,{ hex: "&#018A;", name: "LATIN CAPITAL LETTER D WITH HOOK", char: "Ɗ" }
        ,{ hex: "&#018B;", name: "LATIN CAPITAL LETTER D WITH TOPBAR", char: "Ƌ" }
        ,{ hex: "&#018C;", name: "LATIN SMALL LETTER D WITH TOPBAR", char: "ƌ" }
        ,{ hex: "&#018D;", name: "LATIN SMALL LETTER TURNED DELTA", char: "ƍ" }
        ,{ hex: "&#018E;", name: "LATIN CAPITAL LETTER REVERSED E", char: "Ǝ" }
        ,{ hex: "&#018F;", name: "LATIN CAPITAL LETTER SCHWA", char: "Ə" }
        ,{ hex: "&#0190;", name: "LATIN CAPITAL LETTER OPEN E", char: "Ɛ" }
        ,{ hex: "&#0191;", name: "LATIN CAPITAL LETTER F WITH HOOK", char: "Ƒ" }
        ,{ entity: "&fnof;", hex: "&#0192;", name: "LATIN SMALL LETTER F WITH HOOK", char: "ƒ" }
        ,{ hex: "&#0193;", name: "LATIN CAPITAL LETTER G WITH HOOK", char: "Ɠ" }
        ,{ hex: "&#0194;", name: "LATIN CAPITAL LETTER GAMMA", char: "Ɣ" }
        ,{ hex: "&#0195;", name: "LATIN SMALL LETTER HV", char: "ƕ" }
        ,{ hex: "&#0196;", name: "LATIN CAPITAL LETTER IOTA", char: "Ɩ" }
        ,{ hex: "&#0197;", name: "LATIN CAPITAL LETTER I WITH STROKE", char: "Ɨ" }
        ,{ hex: "&#0198;", name: "LATIN CAPITAL LETTER K WITH HOOK", char: "Ƙ" }
        ,{ hex: "&#0199;", name: "LATIN SMALL LETTER K WITH HOOK", char: "ƙ" }
        ,{ hex: "&#019A;", name: "LATIN SMALL LETTER L WITH BAR", char: "ƚ" }
        ,{ hex: "&#019B;", name: "LATIN SMALL LETTER LAMBDA WITH STROKE", char: "ƛ" }
        ,{ hex: "&#019C;", name: "LATIN CAPITAL LETTER TURNED M", char: "Ɯ" }
        ,{ hex: "&#019D;", name: "LATIN CAPITAL LETTER N WITH LEFT HOOK", char: "Ɲ" }
        ,{ hex: "&#019E;", name: "LATIN SMALL LETTER N WITH LONG RIGHT LEG", char: "ƞ" }
        ,{ hex: "&#019F;", name: "LATIN CAPITAL LETTER O WITH MIDDLE TILDE", char: "Ɵ" }
        ,{ hex: "&#01A0;", name: "LATIN CAPITAL LETTER O WITH HORN", char: "Ơ" }
        ,{ hex: "&#01A1;", name: "LATIN SMALL LETTER O WITH HORN", char: "ơ" }
        ,{ hex: "&#01A2;", name: "LATIN CAPITAL LETTER OI", char: "Ƣ" }
        ,{ hex: "&#01A3;", name: "LATIN SMALL LETTER OI", char: "ƣ" }
        ,{ hex: "&#01A4;", name: "LATIN CAPITAL LETTER P WITH HOOK", char: "Ƥ" }
        ,{ hex: "&#01A5;", name: "LATIN SMALL LETTER P WITH HOOK", char: "ƥ" }
        ,{ hex: "&#01A6;", name: "LATIN LETTER YR", char: "Ʀ" }
        ,{ hex: "&#01A7;", name: "LATIN CAPITAL LETTER TONE TWO", char: "Ƨ" }
        ,{ hex: "&#01A8;", name: "LATIN SMALL LETTER TONE TWO", char: "ƨ" }
        ,{ hex: "&#01A9;", name: "LATIN CAPITAL LETTER ESH", char: "Ʃ" }
        ,{ hex: "&#01AA;", name: "LATIN LETTER REVERSED ESH LOOP", char: "ƪ" }
        ,{ hex: "&#01AB;", name: "LATIN SMALL LETTER T WITH PALATAL HOOK", char: "ƫ" }
        ,{ hex: "&#01AC;", name: "LATIN CAPITAL LETTER T WITH HOOK", char: "Ƭ" }
        ,{ hex: "&#01AD;", name: "LATIN SMALL LETTER T WITH HOOK", char: "ƭ" }
        ,{ hex: "&#01AE;", name: "LATIN CAPITAL LETTER T WITH RETROFLEX HOOK", char: "Ʈ" }
        ,{ hex: "&#01AF;", name: "LATIN CAPITAL LETTER U WITH HORN", char: "Ư" }
        ,{ hex: "&#01B0;", name: "LATIN SMALL LETTER U WITH HORN", char: "ư" }
        ,{ hex: "&#01B1;", name: "LATIN CAPITAL LETTER UPSILON", char: "Ʊ" }
        ,{ hex: "&#01B2;", name: "LATIN CAPITAL LETTER V WITH HOOK", char: "Ʋ" }
        ,{ hex: "&#01B3;", name: "LATIN CAPITAL LETTER Y WITH HOOK", char: "Ƴ" }
        ,{ hex: "&#01B4;", name: "LATIN SMALL LETTER Y WITH HOOK", char: "ƴ" }
        ,{ hex: "&#01B5;", name: "LATIN CAPITAL LETTER Z WITH STROKE", char: "Ƶ" }
        ,{ hex: "&#01B6;", name: "LATIN SMALL LETTER Z WITH STROKE", char: "ƶ" }
        ,{ hex: "&#01B7;", name: "LATIN CAPITAL LETTER EZH", char: "Ʒ" }
        ,{ hex: "&#01B8;", name: "LATIN CAPITAL LETTER EZH REVERSED", char: "Ƹ" }
        ,{ hex: "&#01B9;", name: "LATIN SMALL LETTER EZH REVERSED", char: "ƹ" }
        ,{ hex: "&#01BA;", name: "LATIN SMALL LETTER EZH WITH TAIL", char: "ƺ" }
        ,{ hex: "&#01BB;", name: "LATIN LETTER TWO WITH STROKE", char: "ƻ" }
        ,{ hex: "&#01BC;", name: "LATIN CAPITAL LETTER TONE FIVE", char: "Ƽ" }
        ,{ hex: "&#01BD;", name: "LATIN SMALL LETTER TONE FIVE", char: "ƽ" }
        ,{ hex: "&#01BE;", name: "LATIN LETTER INVERTED GLOTTAL STOP WITH STROKE", char: "ƾ" }
        ,{ hex: "&#01BF;", name: "LATIN LETTER WYNN", char: "ƿ" }
        ,{ hex: "&#01C0;", name: "LATIN LETTER DENTAL CLICK", char: "ǀ" }
        ,{ hex: "&#01C1;", name: "LATIN LETTER LATERAL CLICK", char: "ǁ" }
        ,{ hex: "&#01C2;", name: "LATIN LETTER ALVEOLAR CLICK", char: "ǂ" }
        ,{ hex: "&#01C3;", name: "LATIN LETTER RETROFLEX CLICK", char: "ǃ" }
        ,{ hex: "&#01C4;", name: "LATIN CAPITAL LETTER DZ WITH CARON", char: "Ǆ" }
        ,{ hex: "&#01C5;", name: "LATIN CAPITAL LETTER D WITH SMALL LETTER Z WITH CARON", char: "ǅ" }
        ,{ hex: "&#01C6;", name: "LATIN SMALL LETTER DZ WITH CARON", char: "ǆ" }
        ,{ hex: "&#01C7;", name: "LATIN CAPITAL LETTER LJ", char: "Ǉ" }
        ,{ hex: "&#01C8;", name: "LATIN CAPITAL LETTER L WITH SMALL LETTER J", char: "ǈ" }
        ,{ hex: "&#01C9;", name: "LATIN SMALL LETTER LJ", char: "ǉ" }
        ,{ hex: "&#01CA;", name: "LATIN CAPITAL LETTER NJ", char: "Ǌ" }
        ,{ hex: "&#01CB;", name: "LATIN CAPITAL LETTER N WITH SMALL LETTER J", char: "ǋ" }
        ,{ hex: "&#01CC;", name: "LATIN SMALL LETTER NJ", char: "ǌ" }
        ,{ hex: "&#01CD;", name: "LATIN CAPITAL LETTER A WITH CARON", char: "Ǎ" }
        ,{ hex: "&#01CE;", name: "LATIN SMALL LETTER A WITH CARON", char: "ǎ" }
        ,{ hex: "&#01CF;", name: "LATIN CAPITAL LETTER I WITH CARON", char: "Ǐ" }
        ,{ hex: "&#01D0;", name: "LATIN SMALL LETTER I WITH CARON", char: "ǐ" }
        ,{ hex: "&#01D1;", name: "LATIN CAPITAL LETTER O WITH CARON", char: "Ǒ" }
        ,{ hex: "&#01D2;", name: "LATIN SMALL LETTER O WITH CARON", char: "ǒ" }
        ,{ hex: "&#01D3;", name: "LATIN CAPITAL LETTER U WITH CARON", char: "Ǔ" }
        ,{ hex: "&#01D4;", name: "LATIN SMALL LETTER U WITH CARON", char: "ǔ" }
        ,{ hex: "&#01D5;", name: "LATIN CAPITAL LETTER U WITH DIAERESIS AND MACRON", char: "Ǖ" }
        ,{ hex: "&#01D6;", name: "LATIN SMALL LETTER U WITH DIAERESIS AND MACRON", char: "ǖ" }
        ,{ hex: "&#01D7;", name: "LATIN CAPITAL LETTER U WITH DIAERESIS AND ACUTE", char: "Ǘ" }
        ,{ hex: "&#01D8;", name: "LATIN SMALL LETTER U WITH DIAERESIS AND ACUTE", char: "ǘ" }
        ,{ hex: "&#01D9;", name: "LATIN CAPITAL LETTER U WITH DIAERESIS AND CARON", char: "Ǚ" }
        ,{ hex: "&#01DA;", name: "LATIN SMALL LETTER U WITH DIAERESIS AND CARON", char: "ǚ" }
        ,{ hex: "&#01DB;", name: "LATIN CAPITAL LETTER U WITH DIAERESIS AND GRAVE", char: "Ǜ" }
        ,{ hex: "&#01DC;", name: "LATIN SMALL LETTER U WITH DIAERESIS AND GRAVE", char: "ǜ" }
        ,{ hex: "&#01DD;", name: "LATIN SMALL LETTER TURNED E", char: "ǝ" }
        ,{ hex: "&#01DE;", name: "LATIN CAPITAL LETTER A WITH DIAERESIS AND MACRON", char: "Ǟ" }
        ,{ hex: "&#01DF;", name: "LATIN SMALL LETTER A WITH DIAERESIS AND MACRON", char: "ǟ" }
        ,{ hex: "&#01E0;", name: "LATIN CAPITAL LETTER A WITH DOT ABOVE AND MACRON", char: "Ǡ" }
        ,{ hex: "&#01E1;", name: "LATIN SMALL LETTER A WITH DOT ABOVE AND MACRON", char: "ǡ" }
        ,{ hex: "&#01E2;", name: "LATIN CAPITAL LETTER AE WITH MACRON", char: "Ǣ" }
        ,{ hex: "&#01E3;", name: "LATIN SMALL LETTER AE WITH MACRON", char: "ǣ" }
        ,{ hex: "&#01E4;", name: "LATIN CAPITAL LETTER G WITH STROKE", char: "Ǥ" }
        ,{ hex: "&#01E5;", name: "LATIN SMALL LETTER G WITH STROKE", char: "ǥ" }
        ,{ hex: "&#01E6;", name: "LATIN CAPITAL LETTER G WITH CARON", char: "Ǧ" }
        ,{ hex: "&#01E7;", name: "LATIN SMALL LETTER G WITH CARON", char: "ǧ" }
        ,{ hex: "&#01E8;", name: "LATIN CAPITAL LETTER K WITH CARON", char: "Ǩ" }
        ,{ hex: "&#01E9;", name: "LATIN SMALL LETTER K WITH CARON", char: "ǩ" }
        ,{ hex: "&#01EA;", name: "LATIN CAPITAL LETTER O WITH OGONEK", char: "Ǫ" }
        ,{ hex: "&#01EB;", name: "LATIN SMALL LETTER O WITH OGONEK", char: "ǫ" }
        ,{ hex: "&#01EC;", name: "LATIN CAPITAL LETTER O WITH OGONEK AND MACRON", char: "Ǭ" }
        ,{ hex: "&#01ED;", name: "LATIN SMALL LETTER O WITH OGONEK AND MACRON", char: "ǭ" }
        ,{ hex: "&#01EE;", name: "LATIN CAPITAL LETTER EZH WITH CARON", char: "Ǯ" }
        ,{ hex: "&#01EF;", name: "LATIN SMALL LETTER EZH WITH CARON", char: "ǯ" }
        ,{ hex: "&#01F0;", name: "LATIN SMALL LETTER J WITH CARON", char: "ǰ" }
        ,{ hex: "&#01F1;", name: "LATIN CAPITAL LETTER DZ", char: "Ǳ" }
        ,{ hex: "&#01F2;", name: "LATIN CAPITAL LETTER D WITH SMALL LETTER Z", char: "ǲ" }
        ,{ hex: "&#01F3;", name: "LATIN SMALL LETTER DZ", char: "ǳ" }
        ,{ hex: "&#01F4;", name: "LATIN CAPITAL LETTER G WITH ACUTE", char: "Ǵ" }
        ,{ hex: "&#01F5;", name: "LATIN SMALL LETTER G WITH ACUTE", char: "ǵ" }
        ,{ hex: "&#01F6;", name: "LATIN CAPITAL LETTER HWAIR", char: "Ƕ" }
        ,{ hex: "&#01F7;", name: "LATIN CAPITAL LETTER WYNN", char: "Ƿ" }
        ,{ hex: "&#01F8;", name: "LATIN CAPITAL LETTER N WITH GRAVE", char: "Ǹ" }
        ,{ hex: "&#01F9;", name: "LATIN SMALL LETTER N WITH GRAVE", char: "ǹ" }
        ,{ hex: "&#01FA;", name: "LATIN CAPITAL LETTER A WITH RING ABOVE AND ACUTE (present in WGL4)", char: "Ǻ" }
        ,{ hex: "&#01FB;", name: "LATIN SMALL LETTER A WITH RING ABOVE AND ACUTE (present in WGL4)", char: "ǻ" }
        ,{ hex: "&#01FC;", name: "LATIN CAPITAL LETTER AE WITH ACUTE (present in WGL4)", char: "Ǽ" }
        ,{ hex: "&#01FD;", name: "LATIN SMALL LETTER AE WITH ACUTE (present in WGL4)", char: "ǽ" }
        ,{ hex: "&#01FE;", name: "LATIN CAPITAL LETTER O WITH STROKE AND ACUTE (present in WGL4)", char: "Ǿ" }
        ,{ hex: "&#01FF;", name: "LATIN SMALL LETTER O WITH STROKE AND ACUTE (present in WGL4)", char: "ǿ" }
        ,{ hex: "&#0200;", name: "LATIN CAPITAL LETTER A WITH DOUBLE GRAVE", char: "Ȁ" }
        ,{ hex: "&#0201;", name: "LATIN SMALL LETTER A WITH DOUBLE GRAVE", char: "ȁ" }
        ,{ hex: "&#0202;", name: "LATIN CAPITAL LETTER A WITH INVERTED BREVE", char: "Ȃ" }
        ,{ hex: "&#0203;", name: "LATIN SMALL LETTER A WITH INVERTED BREVE", char: "ȃ" }
        ,{ hex: "&#0204;", name: "LATIN CAPITAL LETTER E WITH DOUBLE GRAVE", char: "Ȅ" }
        ,{ hex: "&#0205;", name: "LATIN SMALL LETTER E WITH DOUBLE GRAVE", char: "ȅ" }
        ,{ hex: "&#0206;", name: "LATIN CAPITAL LETTER E WITH INVERTED BREVE", char: "Ȇ" }
        ,{ hex: "&#0207;", name: "LATIN SMALL LETTER E WITH INVERTED BREVE", char: "ȇ" }
        ,{ hex: "&#0208;", name: "LATIN CAPITAL LETTER I WITH DOUBLE GRAVE", char: "Ȉ" }
        ,{ hex: "&#0209;", name: "LATIN SMALL LETTER I WITH DOUBLE GRAVE", char: "ȉ" }
        ,{ hex: "&#020A;", name: "LATIN CAPITAL LETTER I WITH INVERTED BREVE", char: "Ȋ" }
        ,{ hex: "&#020B;", name: "LATIN SMALL LETTER I WITH INVERTED BREVE", char: "ȋ" }
        ,{ hex: "&#020C;", name: "LATIN CAPITAL LETTER O WITH DOUBLE GRAVE", char: "Ȍ" }
        ,{ hex: "&#020D;", name: "LATIN SMALL LETTER O WITH DOUBLE GRAVE", char: "ȍ" }
        ,{ hex: "&#020E;", name: "LATIN CAPITAL LETTER O WITH INVERTED BREVE", char: "Ȏ" }
        ,{ hex: "&#020F;", name: "LATIN SMALL LETTER O WITH INVERTED BREVE", char: "ȏ" }
        ,{ hex: "&#0210;", name: "LATIN CAPITAL LETTER R WITH DOUBLE GRAVE", char: "Ȑ" }
        ,{ hex: "&#0211;", name: "LATIN SMALL LETTER R WITH DOUBLE GRAVE", char: "ȑ" }
        ,{ hex: "&#0212;", name: "LATIN CAPITAL LETTER R WITH INVERTED BREVE", char: "Ȓ" }
        ,{ hex: "&#0213;", name: "LATIN SMALL LETTER R WITH INVERTED BREVE", char: "ȓ" }
        ,{ hex: "&#0214;", name: "LATIN CAPITAL LETTER U WITH DOUBLE GRAVE", char: "Ȕ" }
        ,{ hex: "&#0215;", name: "LATIN SMALL LETTER U WITH DOUBLE GRAVE", char: "ȕ" }
        ,{ hex: "&#0216;", name: "LATIN CAPITAL LETTER U WITH INVERTED BREVE", char: "Ȗ" }
        ,{ hex: "&#0217;", name: "LATIN SMALL LETTER U WITH INVERTED BREVE", char: "ȗ" }
        ,{ hex: "&#0218;", name: "LATIN CAPITAL LETTER S WITH COMMA BELOW", char: "Ș" }
        ,{ hex: "&#0219;", name: "LATIN SMALL LETTER S WITH COMMA BELOW", char: "ș" }
        ,{ hex: "&#021A;", name: "LATIN CAPITAL LETTER T WITH COMMA BELOW", char: "Ț" }
        ,{ hex: "&#021B;", name: "LATIN SMALL LETTER T WITH COMMA BELOW", char: "ț" }
        ,{ hex: "&#021C;", name: "LATIN CAPITAL LETTER YOGH", char: "Ȝ" }
        ,{ hex: "&#021D;", name: "LATIN SMALL LETTER YOGH", char: "ȝ" }
        ,{ hex: "&#021E;", name: "LATIN CAPITAL LETTER H WITH CARON", char: "Ȟ" }
        ,{ hex: "&#021F;", name: "LATIN SMALL LETTER H WITH CARON", char: "ȟ" }
        ,{ hex: "&#0220;", name: "LATIN CAPITAL LETTER N WITH LONG RIGHT LEG", char: "Ƞ" }
        ,{ hex: "&#0221;", name: "LATIN SMALL LETTER D WITH CURL", char: "ȡ" }
        ,{ hex: "&#0222;", name: "LATIN CAPITAL LETTER OU", char: "Ȣ" }
        ,{ hex: "&#0223;", name: "LATIN SMALL LETTER OU", char: "ȣ" }
        ,{ hex: "&#0224;", name: "LATIN CAPITAL LETTER Z WITH HOOK", char: "Ȥ" }
        ,{ hex: "&#0225;", name: "LATIN SMALL LETTER Z WITH HOOK", char: "ȥ" }
        ,{ hex: "&#0226;", name: "LATIN CAPITAL LETTER A WITH DOT ABOVE", char: "Ȧ" }
        ,{ hex: "&#0227;", name: "LATIN SMALL LETTER A WITH DOT ABOVE", char: "ȧ" }
        ,{ hex: "&#0228;", name: "LATIN CAPITAL LETTER E WITH CEDILLA", char: "Ȩ" }
        ,{ hex: "&#0229;", name: "LATIN SMALL LETTER E WITH CEDILLA", char: "ȩ" }
        ,{ hex: "&#022A;", name: "LATIN CAPITAL LETTER O WITH DIAERESIS AND MACRON", char: "Ȫ" }
        ,{ hex: "&#022B;", name: "LATIN SMALL LETTER O WITH DIAERESIS AND MACRON", char: "ȫ" }
        ,{ hex: "&#022C;", name: "LATIN CAPITAL LETTER O WITH TILDE AND MACRON", char: "Ȭ" }
        ,{ hex: "&#022D;", name: "LATIN SMALL LETTER O WITH TILDE AND MACRON", char: "ȭ" }
        ,{ hex: "&#022E;", name: "LATIN CAPITAL LETTER O WITH DOT ABOVE", char: "Ȯ" }
        ,{ hex: "&#022F;", name: "LATIN SMALL LETTER O WITH DOT ABOVE", char: "ȯ" }
        ,{ hex: "&#0230;", name: "LATIN CAPITAL LETTER O WITH DOT ABOVE AND MACRON", char: "Ȱ" }
        ,{ hex: "&#0231;", name: "LATIN SMALL LETTER O WITH DOT ABOVE AND MACRON", char: "ȱ" }
        ,{ hex: "&#0232;", name: "LATIN CAPITAL LETTER Y WITH MACRON", char: "Ȳ" }
        ,{ hex: "&#0233;", name: "LATIN SMALL LETTER Y WITH MACRON", char: "ȳ" }
        ,{ hex: "&#0234;", name: "LATIN SMALL LETTER L WITH CURL", char: "ȴ" }
        ,{ hex: "&#0235;", name: "LATIN SMALL LETTER N WITH CURL", char: "ȵ" }
        ,{ hex: "&#0236;", name: "LATIN SMALL LETTER T WITH CURL", char: "ȶ" }
        ,{ hex: "&#0237;", name: "LATIN SMALL LETTER DOTLESS J", char: "ȷ" }
        ,{ hex: "&#0238;", name: "LATIN SMALL LETTER DB DIGRAPH", char: "ȸ" }
        ,{ hex: "&#0239;", name: "LATIN SMALL LETTER QP DIGRAPH", char: "ȹ" }
        ,{ hex: "&#023A;", name: "LATIN CAPITAL LETTER A WITH STROKE", char: "Ⱥ" }
        ,{ hex: "&#023B;", name: "LATIN CAPITAL LETTER C WITH STROKE", char: "Ȼ" }
        ,{ hex: "&#023C;", name: "LATIN SMALL LETTER C WITH STROKE", char: "ȼ" }
        ,{ hex: "&#023D;", name: "LATIN CAPITAL LETTER L WITH BAR", char: "Ƚ" }
        ,{ hex: "&#023E;", name: "LATIN CAPITAL LETTER T WITH DIAGONAL STROKE", char: "Ⱦ" }
        ,{ hex: "&#023F;", name: "LATIN SMALL LETTER S WITH SWASH TAIL", char: "ȿ" }
        ,{ hex: "&#0240;", name: "LATIN SMALL LETTER Z WITH SWASH TAIL", char: "ɀ" }
        ,{ hex: "&#0241;", name: "LATIN CAPITAL LETTER GLOTTAL STOP", char: "Ɂ" }
        ,{ hex: "&#0242;", name: "LATIN SMALL LETTER GLOTTAL STOP", char: "ɂ" }
        ,{ hex: "&#0243;", name: "LATIN CAPITAL LETTER B WITH STROKE", char: "Ƀ" }
        ,{ hex: "&#0244;", name: "LATIN CAPITAL LETTER U BAR", char: "Ʉ" }
        ,{ hex: "&#0245;", name: "LATIN CAPITAL LETTER TURNED V", char: "Ʌ" }
        ,{ hex: "&#0246;", name: "LATIN CAPITAL LETTER E WITH STROKE", char: "Ɇ" }
        ,{ hex: "&#0247;", name: "LATIN SMALL LETTER E WITH STROKE", char: "ɇ" }
        ,{ hex: "&#0248;", name: "LATIN CAPITAL LETTER J WITH STROKE", char: "Ɉ" }
        ,{ hex: "&#0249;", name: "LATIN SMALL LETTER J WITH STROKE", char: "ɉ" }
        ,{ hex: "&#024A;", name: "LATIN CAPITAL LETTER SMALL Q WITH HOOK TAIL", char: "Ɋ" }
        ,{ hex: "&#024B;", name: "LATIN SMALL LETTER Q WITH HOOK TAIL", char: "ɋ" }
        ,{ hex: "&#024C;", name: "LATIN CAPITAL LETTER R WITH STROKE", char: "Ɍ" }
        ,{ hex: "&#024D;", name: "LATIN SMALL LETTER R WITH STROKE", char: "ɍ" }
        ,{ hex: "&#024E;", name: "LATIN CAPITAL LETTER Y WITH STROKE", char: "Ɏ" }
        ,{ hex: "&#024F;", name: "LATIN SMALL LETTER Y WITH STROKE", char: "ɏ" }


        ,{ hex: "&#2C60;", name: "LATIN CAPITAL LETTER L WITH DOUBLE BAR", char: "Ⱡ" }
        ,{ hex: "&#2C61;", name: "LATIN SMALL LETTER L WITH DOUBLE BAR", char: "ⱡ" }
        ,{ hex: "&#2C62;", name: "LATIN CAPITAL LETTER L WITH MIDDLE TILDE", char: "Ɫ" }
        ,{ hex: "&#2C63;", name: "LATIN CAPITAL LETTER P WITH STROKE", char: "Ᵽ" }
        ,{ hex: "&#2C64;", name: "LATIN CAPITAL LETTER R WITH TAIL", char: "Ɽ" }
        ,{ hex: "&#2C65;", name: "LATIN SMALL LETTER A WITH STROKE", char: "ⱥ" }
        ,{ hex: "&#2C66;", name: "LATIN SMALL LETTER T WITH DIAGONAL STROKE", char: "ⱦ" }
        ,{ hex: "&#2C67;", name: "LATIN CAPITAL LETTER H WITH DESCENDER", char: "Ⱨ" }
        ,{ hex: "&#2C68;", name: "LATIN SMALL LETTER H WITH DESCENDER", char: "ⱨ" }
        ,{ hex: "&#2C69;", name: "LATIN CAPITAL LETTER K WITH DESCENDER", char: "Ⱪ" }
        ,{ hex: "&#2C6A;", name: "LATIN SMALL LETTER K WITH DESCENDER", char: "ⱪ" }
        ,{ hex: "&#2C6B;", name: "LATIN CAPITAL LETTER Z WITH DESCENDER", char: "Ⱬ" }
        ,{ hex: "&#2C6C;", name: "LATIN SMALL LETTER Z WITH DESCENDER", char: "ⱬ" }
        ,{ hex: "&#2C6D;", name: "LATIN CAPITAL LETTER ALPHA", char: "Ɑ" }
        ,{ hex: "&#2C6E;", name: "LATIN CAPITAL LETTER M WITH HOOK", char: "Ɱ" }
        ,{ hex: "&#2C6F;", name: "LATIN CAPITAL LETTER TURNED A", char: "Ɐ" }
        ,{ hex: "&#2C70;", name: "LATIN CAPITAL LETTER TURNED ALPHA", char: "Ɒ" }
        ,{ hex: "&#2C71;", name: "LATIN SMALL LETTER V WITH RIGHT HOOK", char: "ⱱ" }
        ,{ hex: "&#2C72;", name: "LATIN CAPITAL LETTER W WITH HOOK", char: "Ⱳ" }
        ,{ hex: "&#2C73;", name: "LATIN SMALL LETTER W WITH HOOK", char: "ⱳ" }
        ,{ hex: "&#2C74;", name: "LATIN SMALL LETTER V WITH CURL", char: "ⱴ" }
        ,{ hex: "&#2C75;", name: "LATIN CAPITAL LETTER HALF H", char: "Ⱶ" }
        ,{ hex: "&#2C76;", name: "LATIN SMALL LETTER HALF H", char: "ⱶ" }
        ,{ hex: "&#2C77;", name: "LATIN SMALL LETTER TAILLESS PHI", char: "ⱷ" }
        ,{ hex: "&#2C78;", name: "LATIN SMALL LETTER E WITH NOTCH", char: "ⱸ" }
        ,{ hex: "&#2C79;", name: "LATIN SMALL LETTER TURNED R WITH TAIL", char: "ⱹ" }
        ,{ hex: "&#2C7A;", name: "LATIN SMALL LETTER O WITH LOW RING INSIDE", char: "ⱺ" }
        ,{ hex: "&#2C7B;", name: "LATIN LETTER SMALL CAPITAL TURNED E", char: "ⱻ" }
        ,{ hex: "&#2C7C;", name: "LATIN SUBSCRIPT SMALL LETTER J", char: "ⱼ" }
        ,{ hex: "&#2C7D;", name: "MODIFIER LETTER CAPITAL V", char: "ⱽ" }
        ,{ hex: "&#2C7E;", name: "LATIN CAPITAL LETTER S WITH SWASH TAIL", char: "Ȿ" }
        ,{ hex: "&#2C7F;", name: "LATIN CAPITAL LETTER Z WITH SWASH TAIL", char: "Ɀ" }


        ,{ hex: "&#A720;", name: "MODIFIER LETTER STRESS AND HIGH TONE", char: "꜠" }
        ,{ hex: "&#A721;", name: "MODIFIER LETTER STRESS AND LOW TONE", char: "꜡" }
        ,{ hex: "&#A722;", name: "LATIN CAPITAL LETTER EGYPTOLOGICAL ALEF", char: "Ꜣ" }
        ,{ hex: "&#A723;", name: "LATIN SMALL LETTER EGYPTOLOGICAL ALEF", char: "ꜣ" }
        ,{ hex: "&#A724;", name: "LATIN CAPITAL LETTER EGYPTOLOGICAL AIN", char: "Ꜥ" }
        ,{ hex: "&#A725;", name: "LATIN SMALL LETTER EGYPTOLOGICAL AIN", char: "ꜥ" }
        ,{ hex: "&#A726;", name: "LATIN CAPITAL LETTER HENG", char: "Ꜧ" }
        ,{ hex: "&#A727;", name: "LATIN SMALL LETTER HENG", char: "ꜧ" }
        ,{ hex: "&#A728;", name: "LATIN CAPITAL LETTER TZ", char: "Ꜩ" }
        ,{ hex: "&#A729;", name: "LATIN SMALL LETTER TZ", char: "ꜩ" }
        ,{ hex: "&#A72A;", name: "LATIN CAPITAL LETTER TRESILLO", char: "Ꜫ" }
        ,{ hex: "&#A72B;", name: "LATIN SMALL LETTER TRESILLO", char: "ꜫ" }
        ,{ hex: "&#A72C;", name: "LATIN CAPITAL LETTER CUATRILLO", char: "Ꜭ" }
        ,{ hex: "&#A72D;", name: "LATIN SMALL LETTER CUATRILLO", char: "ꜭ" }
        ,{ hex: "&#A72E;", name: "LATIN CAPITAL LETTER CUATRILLO WITH COMMA", char: "Ꜯ" }
        ,{ hex: "&#A72F;", name: "LATIN SMALL LETTER CUATRILLO WITH COMMA", char: "ꜯ" }
        ,{ hex: "&#A730;", name: "LATIN LETTER SMALL CAPITAL F", char: "ꜰ" }
        ,{ hex: "&#A731;", name: "LATIN LETTER SMALL CAPITAL S", char: "ꜱ" }
        ,{ hex: "&#A732;", name: "LATIN CAPITAL LETTER AA", char: "Ꜳ" }
        ,{ hex: "&#A733;", name: "LATIN SMALL LETTER AA", char: "ꜳ" }
        ,{ hex: "&#A734;", name: "LATIN CAPITAL LETTER AO", char: "Ꜵ" }
        ,{ hex: "&#A735;", name: "LATIN SMALL LETTER AO", char: "ꜵ" }
        ,{ hex: "&#A736;", name: "LATIN CAPITAL LETTER AU", char: "Ꜷ" }
        ,{ hex: "&#A737;", name: "LATIN SMALL LETTER AU", char: "ꜷ" }
        ,{ hex: "&#A738;", name: "LATIN CAPITAL LETTER AV", char: "Ꜹ" }
        ,{ hex: "&#A739;", name: "LATIN SMALL LETTER AV", char: "ꜹ" }
        ,{ hex: "&#A73A;", name: "LATIN CAPITAL LETTER AV WITH HORIZONTAL BAR", char: "Ꜻ" }
        ,{ hex: "&#A73B;", name: "LATIN SMALL LETTER AV WITH HORIZONTAL BAR", char: "ꜻ" }
        ,{ hex: "&#A73C;", name: "LATIN CAPITAL LETTER AY", char: "Ꜽ" }
        ,{ hex: "&#A73D;", name: "LATIN SMALL LETTER AY", char: "ꜽ" }
        ,{ hex: "&#A73E;", name: "LATIN CAPITAL LETTER REVERSED C WITH DOT", char: "Ꜿ" }
        ,{ hex: "&#A73F;", name: "LATIN SMALL LETTER REVERSED C WITH DOT", char: "ꜿ" }
        ,{ hex: "&#A740;", name: "LATIN CAPITAL LETTER K WITH STROKE", char: "Ꝁ" }
        ,{ hex: "&#A741;", name: "LATIN SMALL LETTER K WITH STROKE", char: "ꝁ" }
        ,{ hex: "&#A742;", name: "LATIN CAPITAL LETTER K WITH DIAGONAL STROKE", char: "Ꝃ" }
        ,{ hex: "&#A743;", name: "LATIN SMALL LETTER K WITH DIAGONAL STROKE", char: "ꝃ" }
        ,{ hex: "&#A744;", name: "LATIN CAPITAL LETTER K WITH STROKE AND DIAGONAL STROKE", char: "Ꝅ" }
        ,{ hex: "&#A745;", name: "LATIN SMALL LETTER K WITH STROKE AND DIAGONAL STROKE", char: "ꝅ" }
        ,{ hex: "&#A746;", name: "LATIN CAPITAL LETTER BROKEN L", char: "Ꝇ" }
        ,{ hex: "&#A747;", name: "LATIN SMALL LETTER BROKEN L", char: "ꝇ" }
        ,{ hex: "&#A748;", name: "LATIN CAPITAL LETTER L WITH HIGH STROKE", char: "Ꝉ" }
        ,{ hex: "&#A749;", name: "LATIN SMALL LETTER L WITH HIGH STROKE", char: "ꝉ" }
        ,{ hex: "&#A74A;", name: "LATIN CAPITAL LETTER O WITH LONG STROKE OVERLAY", char: "Ꝋ" }
        ,{ hex: "&#A74B;", name: "LATIN SMALL LETTER O WITH LONG STROKE OVERLAY", char: "ꝋ" }
        ,{ hex: "&#A74C;", name: "LATIN CAPITAL LETTER O WITH LOOP", char: "Ꝍ" }
        ,{ hex: "&#A74D;", name: "LATIN SMALL LETTER O WITH LOOP", char: "ꝍ" }
        ,{ hex: "&#A74E;", name: "LATIN CAPITAL LETTER OO", char: "Ꝏ" }
        ,{ hex: "&#A74F;", name: "LATIN SMALL LETTER OO", char: "ꝏ" }
        ,{ hex: "&#A750;", name: "LATIN CAPITAL LETTER P WITH STROKE THROUGH DESCENDER", char: "Ꝑ" }
        ,{ hex: "&#A751;", name: "LATIN SMALL LETTER P WITH STROKE THROUGH DESCENDER", char: "ꝑ" }
        ,{ hex: "&#A752;", name: "LATIN CAPITAL LETTER P WITH FLOURISH", char: "Ꝓ" }
        ,{ hex: "&#A753;", name: "LATIN SMALL LETTER P WITH FLOURISH", char: "ꝓ" }
        ,{ hex: "&#A754;", name: "LATIN CAPITAL LETTER P WITH SQUIRREL TAIL", char: "Ꝕ" }
        ,{ hex: "&#A755;", name: "LATIN SMALL LETTER P WITH SQUIRREL TAIL", char: "ꝕ" }
        ,{ hex: "&#A756;", name: "LATIN CAPITAL LETTER Q WITH STROKE THROUGH DESCENDER", char: "Ꝗ" }
        ,{ hex: "&#A757;", name: "LATIN SMALL LETTER Q WITH STROKE THROUGH DESCENDER", char: "ꝗ" }
        ,{ hex: "&#A758;", name: "LATIN CAPITAL LETTER Q WITH DIAGONAL STROKE", char: "Ꝙ" }
        ,{ hex: "&#A759;", name: "LATIN SMALL LETTER Q WITH DIAGONAL STROKE", char: "ꝙ" }
        ,{ hex: "&#A75A;", name: "LATIN CAPITAL LETTER R ROTUNDA", char: "Ꝛ" }
        ,{ hex: "&#A75B;", name: "LATIN SMALL LETTER R ROTUNDA", char: "ꝛ" }
        ,{ hex: "&#A75C;", name: "LATIN CAPITAL LETTER RUM ROTUNDA", char: "Ꝝ" }
        ,{ hex: "&#A75D;", name: "LATIN SMALL LETTER RUM ROTUNDA", char: "ꝝ" }
        ,{ hex: "&#A75E;", name: "LATIN CAPITAL LETTER V WITH DIAGONAL STROKE", char: "Ꝟ" }
        ,{ hex: "&#A75F;", name: "LATIN SMALL LETTER V WITH DIAGONAL STROKE", char: "ꝟ" }
        ,{ hex: "&#A760;", name: "LATIN CAPITAL LETTER VY", char: "Ꝡ" }
        ,{ hex: "&#A761;", name: "LATIN SMALL LETTER VY", char: "ꝡ" }
        ,{ hex: "&#A762;", name: "LATIN CAPITAL LETTER VISIGOTHIC Z", char: "Ꝣ" }
        ,{ hex: "&#A763;", name: "LATIN SMALL LETTER VISIGOTHIC Z", char: "ꝣ" }
        ,{ hex: "&#A764;", name: "LATIN CAPITAL LETTER THORN WITH STROKE", char: "Ꝥ" }
        ,{ hex: "&#A765;", name: "LATIN SMALL LETTER THORN WITH STROKE", char: "ꝥ" }
        ,{ hex: "&#A766;", name: "LATIN CAPITAL LETTER THORN WITH STROKE THROUGH DESCENDER", char: "Ꝧ" }
        ,{ hex: "&#A767;", name: "LATIN SMALL LETTER THORN WITH STROKE THROUGH DESCENDER", char: "ꝧ" }
        ,{ hex: "&#A768;", name: "LATIN CAPITAL LETTER VEND", char: "Ꝩ" }
        ,{ hex: "&#A769;", name: "LATIN SMALL LETTER VEND", char: "ꝩ" }
        ,{ hex: "&#A76A;", name: "LATIN CAPITAL LETTER ET", char: "Ꝫ" }
        ,{ hex: "&#A76B;", name: "LATIN SMALL LETTER ET", char: "ꝫ" }
        ,{ hex: "&#A76C;", name: "LATIN CAPITAL LETTER IS", char: "Ꝭ" }
        ,{ hex: "&#A76D;", name: "LATIN SMALL LETTER IS", char: "ꝭ" }
        ,{ hex: "&#A76E;", name: "LATIN CAPITAL LETTER CON", char: "Ꝯ" }
        ,{ hex: "&#A76F;", name: "LATIN SMALL LETTER CON", char: "ꝯ" }
        ,{ hex: "&#A770;", name: "MODIFIER LETTER US", char: "ꝰ" }
        ,{ hex: "&#A771;", name: "LATIN SMALL LETTER DUM", char: "ꝱ" }
        ,{ hex: "&#A772;", name: "LATIN SMALL LETTER LUM", char: "ꝲ" }
        ,{ hex: "&#A773;", name: "LATIN SMALL LETTER MUM", char: "ꝳ" }
        ,{ hex: "&#A774;", name: "LATIN SMALL LETTER NUM", char: "ꝴ" }
        ,{ hex: "&#A775;", name: "LATIN SMALL LETTER RUM", char: "ꝵ" }
        ,{ hex: "&#A776;", name: "LATIN LETTER SMALL CAPITAL RUM", char: "ꝶ" }
        ,{ hex: "&#A777;", name: "LATIN SMALL LETTER TUM", char: "ꝷ" }
        ,{ hex: "&#A778;", name: "LATIN SMALL LETTER UM", char: "ꝸ" }
        ,{ hex: "&#A779;", name: "LATIN CAPITAL LETTER INSULAR D", char: "Ꝺ" }
        ,{ hex: "&#A77A;", name: "LATIN SMALL LETTER INSULAR D", char: "ꝺ" }
        ,{ hex: "&#A77B;", name: "LATIN CAPITAL LETTER INSULAR F", char: "Ꝼ" }
        ,{ hex: "&#A77C;", name: "LATIN SMALL LETTER INSULAR F", char: "ꝼ" }
        ,{ hex: "&#A77D;", name: "LATIN CAPITAL LETTER INSULAR G", char: "Ᵹ" }
        ,{ hex: "&#A77E;", name: "LATIN CAPITAL LETTER TURNED INSULAR G", char: "Ꝿ" }
        ,{ hex: "&#A77F;", name: "LATIN SMALL LETTER TURNED INSULAR G", char: "ꝿ" }
        ,{ hex: "&#A780;", name: "LATIN CAPITAL LETTER TURNED L", char: "Ꞁ" }
        ,{ hex: "&#A781;", name: "LATIN SMALL LETTER TURNED L", char: "ꞁ" }
        ,{ hex: "&#A782;", name: "LATIN CAPITAL LETTER INSULAR R", char: "Ꞃ" }
        ,{ hex: "&#A783;", name: "LATIN SMALL LETTER INSULAR R", char: "ꞃ" }
        ,{ hex: "&#A784;", name: "LATIN CAPITAL LETTER INSULAR S", char: "Ꞅ" }
        ,{ hex: "&#A785;", name: "LATIN SMALL LETTER INSULAR S", char: "ꞅ" }
        ,{ hex: "&#A786;", name: "LATIN CAPITAL LETTER INSULAR T", char: "Ꞇ" }
        ,{ hex: "&#A787;", name: "LATIN SMALL LETTER INSULAR T", char: "ꞇ" }
        ,{ hex: "&#A788;", name: "MODIFIER LETTER LOW CIRCUMFLEX ACCENT", char: "ꞈ" }
        ,{ hex: "&#A789;", name: "MODIFIER LETTER COLON", char: "꞉" }
        ,{ hex: "&#A78A;", name: "MODIFIER LETTER SHORT EQUALS SIGN", char: "꞊" }
        ,{ hex: "&#A78B;", name: "LATIN CAPITAL LETTER SALTILLO", char: "Ꞌ" }
        ,{ hex: "&#A78C;", name: "LATIN SMALL LETTER SALTILLO", char: "ꞌ" }
        ,{ hex: "&#A78D;", name: "LATIN CAPITAL LETTER TURNED H", char: "Ɥ" }
        ,{ hex: "&#A78E;", name: "LATIN SMALL LETTER L WITH RETROFLEX HOOK AND BELT", char: "ꞎ" }
        ,{ hex: "&#A790;", name: "LATIN CAPITAL LETTER N WITH DESCENDER", char: "Ꞑ" }
        ,{ hex: "&#A791;", name: "LATIN SMALL LETTER N WITH DESCENDER", char: "ꞑ" }
        ,{ hex: "&#A7A0;", name: "LATIN CAPITAL LETTER G WITH OBLIQUE STROKE", char: "Ꞡ" }
        ,{ hex: "&#A7A1;", name: "LATIN SMALL LETTER G WITH OBLIQUE STROKE", char: "ꞡ" }
        ,{ hex: "&#A7A2;", name: "LATIN CAPITAL LETTER K WITH OBLIQUE STROKE", char: "Ꞣ" }
        ,{ hex: "&#A7A3;", name: "LATIN SMALL LETTER K WITH OBLIQUE STROKE", char: "ꞣ" }
        ,{ hex: "&#A7A4;", name: "LATIN CAPITAL LETTER N WITH OBLIQUE STROKE", char: "Ꞥ" }
        ,{ hex: "&#A7A5;", name: "LATIN SMALL LETTER N WITH OBLIQUE STROKE", char: "ꞥ" }
        ,{ hex: "&#A7A6;", name: "LATIN CAPITAL LETTER R WITH OBLIQUE STROKE", char: "Ꞧ" }
        ,{ hex: "&#A7A7;", name: "LATIN SMALL LETTER R WITH OBLIQUE STROKE", char: "ꞧ" }
        ,{ hex: "&#A7A8;", name: "LATIN CAPITAL LETTER S WITH OBLIQUE STROKE", char: "Ꞩ" }
        ,{ hex: "&#A7A9;", name: "LATIN SMALL LETTER S WITH OBLIQUE STROKE", char: "ꞩ" }
        ,{ hex: "&#A7FA;", name: "LATIN LETTER SMALL CAPITAL TURNED M", char: "ꟺ" }
        ,{ hex: "&#A7FB;", name: "LATIN EPIGRAPHIC LETTER REVERSED F", char: "ꟻ" }
        ,{ hex: "&#A7FC;", name: "LATIN EPIGRAPHIC LETTER REVERSED P", char: "ꟼ" }
        ,{ hex: "&#A7FD;", name: "LATIN EPIGRAPHIC LETTER INVERTED M", char: "ꟽ" }
        ,{ hex: "&#A7FE;", name: "LATIN EPIGRAPHIC LETTER I LONGA", char: "ꟾ" }
        ,{ hex: "&#A7FF;", name: "LATIN EPIGRAPHIC LETTER ARCHAIC M", char: "ꟿ" }


        ,{ hex: "&#1E00;", name: "LATIN CAPITAL LETTER A WITH RING BELOW", char: "Ḁ" }
        ,{ hex: "&#1E01;", name: "LATIN SMALL LETTER A WITH RING BELOW", char: "ḁ" }
        ,{ hex: "&#1E02;", name: "LATIN CAPITAL LETTER B WITH DOT ABOVE", char: "Ḃ" }
        ,{ hex: "&#1E03;", name: "LATIN SMALL LETTER B WITH DOT ABOVE", char: "ḃ" }
        ,{ hex: "&#1E04;", name: "LATIN CAPITAL LETTER B WITH DOT BELOW", char: "Ḅ" }
        ,{ hex: "&#1E05;", name: "LATIN SMALL LETTER B WITH DOT BELOW", char: "ḅ" }
        ,{ hex: "&#1E06;", name: "LATIN CAPITAL LETTER B WITH LINE BELOW", char: "Ḇ" }
        ,{ hex: "&#1E07;", name: "LATIN SMALL LETTER B WITH LINE BELOW", char: "ḇ" }
        ,{ hex: "&#1E08;", name: "LATIN CAPITAL LETTER C WITH CEDILLA AND ACUTE", char: "Ḉ" }
        ,{ hex: "&#1E09;", name: "LATIN SMALL LETTER C WITH CEDILLA AND ACUTE", char: "ḉ" }
        ,{ hex: "&#1E0A;", name: "LATIN CAPITAL LETTER D WITH DOT ABOVE", char: "Ḋ" }
        ,{ hex: "&#1E0B;", name: "LATIN SMALL LETTER D WITH DOT ABOVE", char: "ḋ" }
        ,{ hex: "&#1E0C;", name: "LATIN CAPITAL LETTER D WITH DOT BELOW", char: "Ḍ" }
        ,{ hex: "&#1E0D;", name: "LATIN SMALL LETTER D WITH DOT BELOW", char: "ḍ" }
        ,{ hex: "&#1E0E;", name: "LATIN CAPITAL LETTER D WITH LINE BELOW", char: "Ḏ" }
        ,{ hex: "&#1E0F;", name: "LATIN SMALL LETTER D WITH LINE BELOW", char: "ḏ" }
        ,{ hex: "&#1E10;", name: "LATIN CAPITAL LETTER D WITH CEDILLA", char: "Ḑ" }
        ,{ hex: "&#1E11;", name: "LATIN SMALL LETTER D WITH CEDILLA", char: "ḑ" }
        ,{ hex: "&#1E12;", name: "LATIN CAPITAL LETTER D WITH CIRCUMFLEX BELOW", char: "Ḓ" }
        ,{ hex: "&#1E13;", name: "LATIN SMALL LETTER D WITH CIRCUMFLEX BELOW", char: "ḓ" }
        ,{ hex: "&#1E14;", name: "LATIN CAPITAL LETTER E WITH MACRON AND GRAVE", char: "Ḕ" }
        ,{ hex: "&#1E15;", name: "LATIN SMALL LETTER E WITH MACRON AND GRAVE", char: "ḕ" }
        ,{ hex: "&#1E16;", name: "LATIN CAPITAL LETTER E WITH MACRON AND ACUTE", char: "Ḗ" }
        ,{ hex: "&#1E17;", name: "LATIN SMALL LETTER E WITH MACRON AND ACUTE", char: "ḗ" }
        ,{ hex: "&#1E18;", name: "LATIN CAPITAL LETTER E WITH CIRCUMFLEX BELOW", char: "Ḙ" }
        ,{ hex: "&#1E19;", name: "LATIN SMALL LETTER E WITH CIRCUMFLEX BELOW", char: "ḙ" }
        ,{ hex: "&#1E1A;", name: "LATIN CAPITAL LETTER E WITH TILDE BELOW", char: "Ḛ" }
        ,{ hex: "&#1E1B;", name: "LATIN SMALL LETTER E WITH TILDE BELOW", char: "ḛ" }
        ,{ hex: "&#1E1C;", name: "LATIN CAPITAL LETTER E WITH CEDILLA AND BREVE", char: "Ḝ" }
        ,{ hex: "&#1E1D;", name: "LATIN SMALL LETTER E WITH CEDILLA AND BREVE", char: "ḝ" }
        ,{ hex: "&#1E1E;", name: "LATIN CAPITAL LETTER F WITH DOT ABOVE", char: "Ḟ" }
        ,{ hex: "&#1E1F;", name: "LATIN SMALL LETTER F WITH DOT ABOVE", char: "ḟ" }
        ,{ hex: "&#1E20;", name: "LATIN CAPITAL LETTER G WITH MACRON", char: "Ḡ" }
        ,{ hex: "&#1E21;", name: "LATIN SMALL LETTER G WITH MACRON", char: "ḡ" }
        ,{ hex: "&#1E22;", name: "LATIN CAPITAL LETTER H WITH DOT ABOVE", char: "Ḣ" }
        ,{ hex: "&#1E23;", name: "LATIN SMALL LETTER H WITH DOT ABOVE", char: "ḣ" }
        ,{ hex: "&#1E24;", name: "LATIN CAPITAL LETTER H WITH DOT BELOW", char: "Ḥ" }
        ,{ hex: "&#1E25;", name: "LATIN SMALL LETTER H WITH DOT BELOW", char: "ḥ" }
        ,{ hex: "&#1E26;", name: "LATIN CAPITAL LETTER H WITH DIAERESIS", char: "Ḧ" }
        ,{ hex: "&#1E27;", name: "LATIN SMALL LETTER H WITH DIAERESIS", char: "ḧ" }
        ,{ hex: "&#1E28;", name: "LATIN CAPITAL LETTER H WITH CEDILLA", char: "Ḩ" }
        ,{ hex: "&#1E29;", name: "LATIN SMALL LETTER H WITH CEDILLA", char: "ḩ" }
        ,{ hex: "&#1E2A;", name: "LATIN CAPITAL LETTER H WITH BREVE BELOW", char: "Ḫ" }
        ,{ hex: "&#1E2B;", name: "LATIN SMALL LETTER H WITH BREVE BELOW", char: "ḫ" }
        ,{ hex: "&#1E2C;", name: "LATIN CAPITAL LETTER I WITH TILDE BELOW", char: "Ḭ" }
        ,{ hex: "&#1E2D;", name: "LATIN SMALL LETTER I WITH TILDE BELOW", char: "ḭ" }
        ,{ hex: "&#1E2E;", name: "LATIN CAPITAL LETTER I WITH DIAERESIS AND ACUTE", char: "Ḯ" }
        ,{ hex: "&#1E2F;", name: "LATIN SMALL LETTER I WITH DIAERESIS AND ACUTE", char: "ḯ" }
        ,{ hex: "&#1E30;", name: "LATIN CAPITAL LETTER K WITH ACUTE", char: "Ḱ" }
        ,{ hex: "&#1E31;", name: "LATIN SMALL LETTER K WITH ACUTE", char: "ḱ" }
        ,{ hex: "&#1E32;", name: "LATIN CAPITAL LETTER K WITH DOT BELOW", char: "Ḳ" }
        ,{ hex: "&#1E33;", name: "LATIN SMALL LETTER K WITH DOT BELOW", char: "ḳ" }
        ,{ hex: "&#1E34;", name: "LATIN CAPITAL LETTER K WITH LINE BELOW", char: "Ḵ" }
        ,{ hex: "&#1E35;", name: "LATIN SMALL LETTER K WITH LINE BELOW", char: "ḵ" }
        ,{ hex: "&#1E36;", name: "LATIN CAPITAL LETTER L WITH DOT BELOW", char: "Ḷ" }
        ,{ hex: "&#1E37;", name: "LATIN SMALL LETTER L WITH DOT BELOW", char: "ḷ" }
        ,{ hex: "&#1E38;", name: "LATIN CAPITAL LETTER L WITH DOT BELOW AND MACRON", char: "Ḹ" }
        ,{ hex: "&#1E39;", name: "LATIN SMALL LETTER L WITH DOT BELOW AND MACRON", char: "ḹ" }
        ,{ hex: "&#1E3A;", name: "LATIN CAPITAL LETTER L WITH LINE BELOW", char: "Ḻ" }
        ,{ hex: "&#1E3B;", name: "LATIN SMALL LETTER L WITH LINE BELOW", char: "ḻ" }
        ,{ hex: "&#1E3C;", name: "LATIN CAPITAL LETTER L WITH CIRCUMFLEX BELOW", char: "Ḽ" }
        ,{ hex: "&#1E3D;", name: "LATIN SMALL LETTER L WITH CIRCUMFLEX BELOW", char: "ḽ" }
        ,{ hex: "&#1E3E;", name: "LATIN CAPITAL LETTER M WITH ACUTE", char: "Ḿ" }
        ,{ hex: "&#1E3F;", name: "LATIN SMALL LETTER M WITH ACUTE", char: "ḿ" }
        ,{ hex: "&#1E40;", name: "LATIN CAPITAL LETTER M WITH DOT ABOVE", char: "Ṁ" }
        ,{ hex: "&#1E41;", name: "LATIN SMALL LETTER M WITH DOT ABOVE", char: "ṁ" }
        ,{ hex: "&#1E42;", name: "LATIN CAPITAL LETTER M WITH DOT BELOW", char: "Ṃ" }
        ,{ hex: "&#1E43;", name: "LATIN SMALL LETTER M WITH DOT BELOW", char: "ṃ" }
        ,{ hex: "&#1E44;", name: "LATIN CAPITAL LETTER N WITH DOT ABOVE", char: "Ṅ" }
        ,{ hex: "&#1E45;", name: "LATIN SMALL LETTER N WITH DOT ABOVE", char: "ṅ" }
        ,{ hex: "&#1E46;", name: "LATIN CAPITAL LETTER N WITH DOT BELOW", char: "Ṇ" }
        ,{ hex: "&#1E47;", name: "LATIN SMALL LETTER N WITH DOT BELOW", char: "ṇ" }
        ,{ hex: "&#1E48;", name: "LATIN CAPITAL LETTER N WITH LINE BELOW", char: "Ṉ" }
        ,{ hex: "&#1E49;", name: "LATIN SMALL LETTER N WITH LINE BELOW", char: "ṉ" }
        ,{ hex: "&#1E4A;", name: "LATIN CAPITAL LETTER N WITH CIRCUMFLEX BELOW", char: "Ṋ" }
        ,{ hex: "&#1E4B;", name: "LATIN SMALL LETTER N WITH CIRCUMFLEX BELOW", char: "ṋ" }
        ,{ hex: "&#1E4C;", name: "LATIN CAPITAL LETTER O WITH TILDE AND ACUTE", char: "Ṍ" }
        ,{ hex: "&#1E4D;", name: "LATIN SMALL LETTER O WITH TILDE AND ACUTE", char: "ṍ" }
        ,{ hex: "&#1E4E;", name: "LATIN CAPITAL LETTER O WITH TILDE AND DIAERESIS", char: "Ṏ" }
        ,{ hex: "&#1E4F;", name: "LATIN SMALL LETTER O WITH TILDE AND DIAERESIS", char: "ṏ" }
        ,{ hex: "&#1E50;", name: "LATIN CAPITAL LETTER O WITH MACRON AND GRAVE", char: "Ṑ" }
        ,{ hex: "&#1E51;", name: "LATIN SMALL LETTER O WITH MACRON AND GRAVE", char: "ṑ" }
        ,{ hex: "&#1E52;", name: "LATIN CAPITAL LETTER O WITH MACRON AND ACUTE", char: "Ṓ" }
        ,{ hex: "&#1E53;", name: "LATIN SMALL LETTER O WITH MACRON AND ACUTE", char: "ṓ" }
        ,{ hex: "&#1E54;", name: "LATIN CAPITAL LETTER P WITH ACUTE", char: "Ṕ" }
        ,{ hex: "&#1E55;", name: "LATIN SMALL LETTER P WITH ACUTE", char: "ṕ" }
        ,{ hex: "&#1E56;", name: "LATIN CAPITAL LETTER P WITH DOT ABOVE", char: "Ṗ" }
        ,{ hex: "&#1E57;", name: "LATIN SMALL LETTER P WITH DOT ABOVE", char: "ṗ" }
        ,{ hex: "&#1E58;", name: "LATIN CAPITAL LETTER R WITH DOT ABOVE", char: "Ṙ" }
        ,{ hex: "&#1E59;", name: "LATIN SMALL LETTER R WITH DOT ABOVE", char: "ṙ" }
        ,{ hex: "&#1E5A;", name: "LATIN CAPITAL LETTER R WITH DOT BELOW", char: "Ṛ" }
        ,{ hex: "&#1E5B;", name: "LATIN SMALL LETTER R WITH DOT BELOW", char: "ṛ" }
        ,{ hex: "&#1E5C;", name: "LATIN CAPITAL LETTER R WITH DOT BELOW AND MACRON", char: "Ṝ" }
        ,{ hex: "&#1E5D;", name: "LATIN SMALL LETTER R WITH DOT BELOW AND MACRON", char: "ṝ" }
        ,{ hex: "&#1E5E;", name: "LATIN CAPITAL LETTER R WITH LINE BELOW", char: "Ṟ" }
        ,{ hex: "&#1E5F;", name: "LATIN SMALL LETTER R WITH LINE BELOW", char: "ṟ" }
        ,{ hex: "&#1E60;", name: "LATIN CAPITAL LETTER S WITH DOT ABOVE", char: "Ṡ" }
        ,{ hex: "&#1E61;", name: "LATIN SMALL LETTER S WITH DOT ABOVE", char: "ṡ" }
        ,{ hex: "&#1E62;", name: "LATIN CAPITAL LETTER S WITH DOT BELOW", char: "Ṣ" }
        ,{ hex: "&#1E63;", name: "LATIN SMALL LETTER S WITH DOT BELOW", char: "ṣ" }
        ,{ hex: "&#1E64;", name: "LATIN CAPITAL LETTER S WITH ACUTE AND DOT ABOVE", char: "Ṥ" }
        ,{ hex: "&#1E65;", name: "LATIN SMALL LETTER S WITH ACUTE AND DOT ABOVE", char: "ṥ" }
        ,{ hex: "&#1E66;", name: "LATIN CAPITAL LETTER S WITH CARON AND DOT ABOVE", char: "Ṧ" }
        ,{ hex: "&#1E67;", name: "LATIN SMALL LETTER S WITH CARON AND DOT ABOVE", char: "ṧ" }
        ,{ hex: "&#1E68;", name: "LATIN CAPITAL LETTER S WITH DOT BELOW AND DOT ABOVE", char: "Ṩ" }
        ,{ hex: "&#1E69;", name: "LATIN SMALL LETTER S WITH DOT BELOW AND DOT ABOVE", char: "ṩ" }
        ,{ hex: "&#1E6A;", name: "LATIN CAPITAL LETTER T WITH DOT ABOVE", char: "Ṫ" }
        ,{ hex: "&#1E6B;", name: "LATIN SMALL LETTER T WITH DOT ABOVE", char: "ṫ" }
        ,{ hex: "&#1E6C;", name: "LATIN CAPITAL LETTER T WITH DOT BELOW", char: "Ṭ" }
        ,{ hex: "&#1E6D;", name: "LATIN SMALL LETTER T WITH DOT BELOW", char: "ṭ" }
        ,{ hex: "&#1E6E;", name: "LATIN CAPITAL LETTER T WITH LINE BELOW", char: "Ṯ" }
        ,{ hex: "&#1E6F;", name: "LATIN SMALL LETTER T WITH LINE BELOW", char: "ṯ" }
        ,{ hex: "&#1E70;", name: "LATIN CAPITAL LETTER T WITH CIRCUMFLEX BELOW", char: "Ṱ" }
        ,{ hex: "&#1E71;", name: "LATIN SMALL LETTER T WITH CIRCUMFLEX BELOW", char: "ṱ" }
        ,{ hex: "&#1E72;", name: "LATIN CAPITAL LETTER U WITH DIAERESIS BELOW", char: "Ṳ" }
        ,{ hex: "&#1E73;", name: "LATIN SMALL LETTER U WITH DIAERESIS BELOW", char: "ṳ" }
        ,{ hex: "&#1E74;", name: "LATIN CAPITAL LETTER U WITH TILDE BELOW", char: "Ṵ" }
        ,{ hex: "&#1E75;", name: "LATIN SMALL LETTER U WITH TILDE BELOW", char: "ṵ" }
        ,{ hex: "&#1E76;", name: "LATIN CAPITAL LETTER U WITH CIRCUMFLEX BELOW", char: "Ṷ" }
        ,{ hex: "&#1E77;", name: "LATIN SMALL LETTER U WITH CIRCUMFLEX BELOW", char: "ṷ" }
        ,{ hex: "&#1E78;", name: "LATIN CAPITAL LETTER U WITH TILDE AND ACUTE", char: "Ṹ" }
        ,{ hex: "&#1E79;", name: "LATIN SMALL LETTER U WITH TILDE AND ACUTE", char: "ṹ" }
        ,{ hex: "&#1E7A;", name: "LATIN CAPITAL LETTER U WITH MACRON AND DIAERESIS", char: "Ṻ" }
        ,{ hex: "&#1E7B;", name: "LATIN SMALL LETTER U WITH MACRON AND DIAERESIS", char: "ṻ" }
        ,{ hex: "&#1E7C;", name: "LATIN CAPITAL LETTER V WITH TILDE", char: "Ṽ" }
        ,{ hex: "&#1E7D;", name: "LATIN SMALL LETTER V WITH TILDE", char: "ṽ" }
        ,{ hex: "&#1E7E;", name: "LATIN CAPITAL LETTER V WITH DOT BELOW", char: "Ṿ" }
        ,{ hex: "&#1E7F;", name: "LATIN SMALL LETTER V WITH DOT BELOW", char: "ṿ" }
        ,{ hex: "&#1E80;", name: "LATIN CAPITAL LETTER W WITH GRAVE (present in WGL4)", char: "Ẁ" }
        ,{ hex: "&#1E81;", name: "LATIN SMALL LETTER W WITH GRAVE (present in WGL4)", char: "ẁ" }
        ,{ hex: "&#1E82;", name: "LATIN CAPITAL LETTER W WITH ACUTE (present in WGL4)", char: "Ẃ" }
        ,{ hex: "&#1E83;", name: "LATIN SMALL LETTER W WITH ACUTE (present in WGL4)", char: "ẃ" }
        ,{ hex: "&#1E84;", name: "LATIN CAPITAL LETTER W WITH DIAERESIS (present in WGL4)", char: "Ẅ" }
        ,{ hex: "&#1E85;", name: "LATIN SMALL LETTER W WITH DIAERESIS (present in WGL4)", char: "ẅ" }
        ,{ hex: "&#1E86;", name: "LATIN CAPITAL LETTER W WITH DOT ABOVE", char: "Ẇ" }
        ,{ hex: "&#1E87;", name: "LATIN SMALL LETTER W WITH DOT ABOVE", char: "ẇ" }
        ,{ hex: "&#1E88;", name: "LATIN CAPITAL LETTER W WITH DOT BELOW", char: "Ẉ" }
        ,{ hex: "&#1E89;", name: "LATIN SMALL LETTER W WITH DOT BELOW", char: "ẉ" }
        ,{ hex: "&#1E8A;", name: "LATIN CAPITAL LETTER X WITH DOT ABOVE", char: "Ẋ" }
        ,{ hex: "&#1E8B;", name: "LATIN SMALL LETTER X WITH DOT ABOVE", char: "ẋ" }
        ,{ hex: "&#1E8C;", name: "LATIN CAPITAL LETTER X WITH DIAERESIS", char: "Ẍ" }
        ,{ hex: "&#1E8D;", name: "LATIN SMALL LETTER X WITH DIAERESIS", char: "ẍ" }
        ,{ hex: "&#1E8E;", name: "LATIN CAPITAL LETTER Y WITH DOT ABOVE", char: "Ẏ" }
        ,{ hex: "&#1E8F;", name: "LATIN SMALL LETTER Y WITH DOT ABOVE", char: "ẏ" }
        ,{ hex: "&#1E90;", name: "LATIN CAPITAL LETTER Z WITH CIRCUMFLEX", char: "Ẑ" }
        ,{ hex: "&#1E91;", name: "LATIN SMALL LETTER Z WITH CIRCUMFLEX", char: "ẑ" }
        ,{ hex: "&#1E92;", name: "LATIN CAPITAL LETTER Z WITH DOT BELOW", char: "Ẓ" }
        ,{ hex: "&#1E93;", name: "LATIN SMALL LETTER Z WITH DOT BELOW", char: "ẓ" }
        ,{ hex: "&#1E94;", name: "LATIN CAPITAL LETTER Z WITH LINE BELOW", char: "Ẕ" }
        ,{ hex: "&#1E95;", name: "LATIN SMALL LETTER Z WITH LINE BELOW", char: "ẕ" }
        ,{ hex: "&#1E96;", name: "LATIN SMALL LETTER H WITH LINE BELOW", char: "ẖ" }
        ,{ hex: "&#1E97;", name: "LATIN SMALL LETTER T WITH DIAERESIS", char: "ẗ" }
        ,{ hex: "&#1E98;", name: "LATIN SMALL LETTER W WITH RING ABOVE", char: "ẘ" }
        ,{ hex: "&#1E99;", name: "LATIN SMALL LETTER Y WITH RING ABOVE", char: "ẙ" }
        ,{ hex: "&#1E9A;", name: "LATIN SMALL LETTER A WITH RIGHT HALF RING", char: "ẚ" }
        ,{ hex: "&#1E9B;", name: "LATIN SMALL LETTER LONG S WITH DOT ABOVE", char: "ẛ" }
        ,{ hex: "&#1E9C;", name: "LATIN SMALL LETTER LONG S WITH DIAGONAL STROKE", char: "ẜ" }
        ,{ hex: "&#1E9D;", name: "LATIN SMALL LETTER LONG S WITH HIGH STROKE", char: "ẝ" }
        ,{ hex: "&#1E9E;", name: "LATIN CAPITAL LETTER SHARP S", char: "ẞ" }
        ,{ hex: "&#1E9F;", name: "LATIN SMALL LETTER DELTA", char: "ẟ" }
        ,{ hex: "&#1EA0;", name: "LATIN CAPITAL LETTER A WITH DOT BELOW", char: "Ạ" }
        ,{ hex: "&#1EA1;", name: "LATIN SMALL LETTER A WITH DOT BELOW", char: "ạ" }
        ,{ hex: "&#1EA2;", name: "LATIN CAPITAL LETTER A WITH HOOK ABOVE", char: "Ả" }
        ,{ hex: "&#1EA3;", name: "LATIN SMALL LETTER A WITH HOOK ABOVE", char: "ả" }
        ,{ hex: "&#1EA4;", name: "LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND ACUTE", char: "Ấ" }
        ,{ hex: "&#1EA5;", name: "LATIN SMALL LETTER A WITH CIRCUMFLEX AND ACUTE", char: "ấ" }
        ,{ hex: "&#1EA6;", name: "LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND GRAVE", char: "Ầ" }
        ,{ hex: "&#1EA7;", name: "LATIN SMALL LETTER A WITH CIRCUMFLEX AND GRAVE", char: "ầ" }
        ,{ hex: "&#1EA8;", name: "LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND HOOK ABOVE", char: "Ẩ" }
        ,{ hex: "&#1EA9;", name: "LATIN SMALL LETTER A WITH CIRCUMFLEX AND HOOK ABOVE", char: "ẩ" }
        ,{ hex: "&#1EAA;", name: "LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND TILDE", char: "Ẫ" }
        ,{ hex: "&#1EAB;", name: "LATIN SMALL LETTER A WITH CIRCUMFLEX AND TILDE", char: "ẫ" }
        ,{ hex: "&#1EAC;", name: "LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND DOT BELOW", char: "Ậ" }
        ,{ hex: "&#1EAD;", name: "LATIN SMALL LETTER A WITH CIRCUMFLEX AND DOT BELOW", char: "ậ" }
        ,{ hex: "&#1EAE;", name: "LATIN CAPITAL LETTER A WITH BREVE AND ACUTE", char: "Ắ" }
        ,{ hex: "&#1EAF;", name: "LATIN SMALL LETTER A WITH BREVE AND ACUTE", char: "ắ" }
        ,{ hex: "&#1EB0;", name: "LATIN CAPITAL LETTER A WITH BREVE AND GRAVE", char: "Ằ" }
        ,{ hex: "&#1EB1;", name: "LATIN SMALL LETTER A WITH BREVE AND GRAVE", char: "ằ" }
        ,{ hex: "&#1EB2;", name: "LATIN CAPITAL LETTER A WITH BREVE AND HOOK ABOVE", char: "Ẳ" }
        ,{ hex: "&#1EB3;", name: "LATIN SMALL LETTER A WITH BREVE AND HOOK ABOVE", char: "ẳ" }
        ,{ hex: "&#1EB4;", name: "LATIN CAPITAL LETTER A WITH BREVE AND TILDE", char: "Ẵ" }
        ,{ hex: "&#1EB5;", name: "LATIN SMALL LETTER A WITH BREVE AND TILDE", char: "ẵ" }
        ,{ hex: "&#1EB6;", name: "LATIN CAPITAL LETTER A WITH BREVE AND DOT BELOW", char: "Ặ" }
        ,{ hex: "&#1EB7;", name: "LATIN SMALL LETTER A WITH BREVE AND DOT BELOW", char: "ặ" }
        ,{ hex: "&#1EB8;", name: "LATIN CAPITAL LETTER E WITH DOT BELOW", char: "Ẹ" }
        ,{ hex: "&#1EB9;", name: "LATIN SMALL LETTER E WITH DOT BELOW", char: "ẹ" }
        ,{ hex: "&#1EBA;", name: "LATIN CAPITAL LETTER E WITH HOOK ABOVE", char: "Ẻ" }
        ,{ hex: "&#1EBB;", name: "LATIN SMALL LETTER E WITH HOOK ABOVE", char: "ẻ" }
        ,{ hex: "&#1EBC;", name: "LATIN CAPITAL LETTER E WITH TILDE", char: "Ẽ" }
        ,{ hex: "&#1EBD;", name: "LATIN SMALL LETTER E WITH TILDE", char: "ẽ" }
        ,{ hex: "&#1EBE;", name: "LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND ACUTE", char: "Ế" }
        ,{ hex: "&#1EBF;", name: "LATIN SMALL LETTER E WITH CIRCUMFLEX AND ACUTE", char: "ế" }
        ,{ hex: "&#1EC0;", name: "LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND GRAVE", char: "Ề" }
        ,{ hex: "&#1EC1;", name: "LATIN SMALL LETTER E WITH CIRCUMFLEX AND GRAVE", char: "ề" }
        ,{ hex: "&#1EC2;", name: "LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND HOOK ABOVE", char: "Ể" }
        ,{ hex: "&#1EC3;", name: "LATIN SMALL LETTER E WITH CIRCUMFLEX AND HOOK ABOVE", char: "ể" }
        ,{ hex: "&#1EC4;", name: "LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND TILDE", char: "Ễ" }
        ,{ hex: "&#1EC5;", name: "LATIN SMALL LETTER E WITH CIRCUMFLEX AND TILDE", char: "ễ" }
        ,{ hex: "&#1EC6;", name: "LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND DOT BELOW", char: "Ệ" }
        ,{ hex: "&#1EC7;", name: "LATIN SMALL LETTER E WITH CIRCUMFLEX AND DOT BELOW", char: "ệ" }
        ,{ hex: "&#1EC8;", name: "LATIN CAPITAL LETTER I WITH HOOK ABOVE", char: "Ỉ" }
        ,{ hex: "&#1EC9;", name: "LATIN SMALL LETTER I WITH HOOK ABOVE", char: "ỉ" }
        ,{ hex: "&#1ECA;", name: "LATIN CAPITAL LETTER I WITH DOT BELOW", char: "Ị" }
        ,{ hex: "&#1ECB;", name: "LATIN SMALL LETTER I WITH DOT BELOW", char: "ị" }
        ,{ hex: "&#1ECC;", name: "LATIN CAPITAL LETTER O WITH DOT BELOW", char: "Ọ" }
        ,{ hex: "&#1ECD;", name: "LATIN SMALL LETTER O WITH DOT BELOW", char: "ọ" }
        ,{ hex: "&#1ECE;", name: "LATIN CAPITAL LETTER O WITH HOOK ABOVE", char: "Ỏ" }
        ,{ hex: "&#1ECF;", name: "LATIN SMALL LETTER O WITH HOOK ABOVE", char: "ỏ" }
        ,{ hex: "&#1ED0;", name: "LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND ACUTE", char: "Ố" }
        ,{ hex: "&#1ED1;", name: "LATIN SMALL LETTER O WITH CIRCUMFLEX AND ACUTE", char: "ố" }
        ,{ hex: "&#1ED2;", name: "LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND GRAVE", char: "Ồ" }
        ,{ hex: "&#1ED3;", name: "LATIN SMALL LETTER O WITH CIRCUMFLEX AND GRAVE", char: "ồ" }
        ,{ hex: "&#1ED4;", name: "LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND HOOK ABOVE", char: "Ổ" }
        ,{ hex: "&#1ED5;", name: "LATIN SMALL LETTER O WITH CIRCUMFLEX AND HOOK ABOVE", char: "ổ" }
        ,{ hex: "&#1ED6;", name: "LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND TILDE", char: "Ỗ" }
        ,{ hex: "&#1ED7;", name: "LATIN SMALL LETTER O WITH CIRCUMFLEX AND TILDE", char: "ỗ" }
        ,{ hex: "&#1ED8;", name: "LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND DOT BELOW", char: "Ộ" }
        ,{ hex: "&#1ED9;", name: "LATIN SMALL LETTER O WITH CIRCUMFLEX AND DOT BELOW", char: "ộ" }
        ,{ hex: "&#1EDA;", name: "LATIN CAPITAL LETTER O WITH HORN AND ACUTE", char: "Ớ" }
        ,{ hex: "&#1EDB;", name: "LATIN SMALL LETTER O WITH HORN AND ACUTE", char: "ớ" }
        ,{ hex: "&#1EDC;", name: "LATIN CAPITAL LETTER O WITH HORN AND GRAVE", char: "Ờ" }
        ,{ hex: "&#1EDD;", name: "LATIN SMALL LETTER O WITH HORN AND GRAVE", char: "ờ" }
        ,{ hex: "&#1EDE;", name: "LATIN CAPITAL LETTER O WITH HORN AND HOOK ABOVE", char: "Ở" }
        ,{ hex: "&#1EDF;", name: "LATIN SMALL LETTER O WITH HORN AND HOOK ABOVE", char: "ở" }
        ,{ hex: "&#1EE0;", name: "LATIN CAPITAL LETTER O WITH HORN AND TILDE", char: "Ỡ" }
        ,{ hex: "&#1EE1;", name: "LATIN SMALL LETTER O WITH HORN AND TILDE", char: "ỡ" }
        ,{ hex: "&#1EE2;", name: "LATIN CAPITAL LETTER O WITH HORN AND DOT BELOW", char: "Ợ" }
        ,{ hex: "&#1EE3;", name: "LATIN SMALL LETTER O WITH HORN AND DOT BELOW", char: "ợ" }
        ,{ hex: "&#1EE4;", name: "LATIN CAPITAL LETTER U WITH DOT BELOW", char: "Ụ" }
        ,{ hex: "&#1EE5;", name: "LATIN SMALL LETTER U WITH DOT BELOW", char: "ụ" }
        ,{ hex: "&#1EE6;", name: "LATIN CAPITAL LETTER U WITH HOOK ABOVE", char: "Ủ" }
        ,{ hex: "&#1EE7;", name: "LATIN SMALL LETTER U WITH HOOK ABOVE", char: "ủ" }
        ,{ hex: "&#1EE8;", name: "LATIN CAPITAL LETTER U WITH HORN AND ACUTE", char: "Ứ" }
        ,{ hex: "&#1EE9;", name: "LATIN SMALL LETTER U WITH HORN AND ACUTE", char: "ứ" }
        ,{ hex: "&#1EEA;", name: "LATIN CAPITAL LETTER U WITH HORN AND GRAVE", char: "Ừ" }
        ,{ hex: "&#1EEB;", name: "LATIN SMALL LETTER U WITH HORN AND GRAVE", char: "ừ" }
        ,{ hex: "&#1EEC;", name: "LATIN CAPITAL LETTER U WITH HORN AND HOOK ABOVE", char: "Ử" }
        ,{ hex: "&#1EED;", name: "LATIN SMALL LETTER U WITH HORN AND HOOK ABOVE", char: "ử" }
        ,{ hex: "&#1EEE;", name: "LATIN CAPITAL LETTER U WITH HORN AND TILDE", char: "Ữ" }
        ,{ hex: "&#1EEF;", name: "LATIN SMALL LETTER U WITH HORN AND TILDE", char: "ữ" }
        ,{ hex: "&#1EF0;", name: "LATIN CAPITAL LETTER U WITH HORN AND DOT BELOW", char: "Ự" }
        ,{ hex: "&#1EF1;", name: "LATIN SMALL LETTER U WITH HORN AND DOT BELOW", char: "ự" }
        ,{ hex: "&#1EF2;", name: "LATIN CAPITAL LETTER Y WITH GRAVE (present in WGL4)", char: "Ỳ" }
        ,{ hex: "&#1EF3;", name: "LATIN SMALL LETTER Y WITH GRAVE (present in WGL4)", char: "ỳ" }
        ,{ hex: "&#1EF4;", name: "LATIN CAPITAL LETTER Y WITH DOT BELOW", char: "Ỵ" }
        ,{ hex: "&#1EF5;", name: "LATIN SMALL LETTER Y WITH DOT BELOW", char: "ỵ" }
        ,{ hex: "&#1EF6;", name: "LATIN CAPITAL LETTER Y WITH HOOK ABOVE", char: "Ỷ" }
        ,{ hex: "&#1EF7;", name: "LATIN SMALL LETTER Y WITH HOOK ABOVE", char: "ỷ" }
        ,{ hex: "&#1EF8;", name: "LATIN CAPITAL LETTER Y WITH TILDE", char: "Ỹ" }
        ,{ hex: "&#1EF9;", name: "LATIN SMALL LETTER Y WITH TILDE", char: "ỹ" }
        ,{ hex: "&#1EFA;", name: "LATIN CAPITAL LETTER MIDDLE-WELSH LL", char: "Ỻ" }
        ,{ hex: "&#1EFB;", name: "LATIN SMALL LETTER MIDDLE-WELSH LL", char: "ỻ" }
        ,{ hex: "&#1EFC;", name: "LATIN CAPITAL LETTER MIDDLE-WELSH V", char: "Ỽ" }
        ,{ hex: "&#1EFD;", name: "LATIN SMALL LETTER MIDDLE-WELSH V", char: "ỽ" }
        ,{ hex: "&#1EFE;", name: "LATIN CAPITAL LETTER Y WITH LOOP", char: "Ỿ" }
        ,{ hex: "&#1EFF;", name: "LATIN SMALL LETTER Y WITH LOOP", char: "ỿ" }],
        "Arrows": [
            { entity: "&larr;", hex: "&#2190;", name: "LEFTWARDS ARROW", char: "←" }
            ,{ entity: "&uarr;", hex: "&#2191;", name: "UPWARDS ARROW", char: "↑" }
            ,{ entity: "&rarr;", hex: "&#2192;", name: "RIGHTWARDS ARROW", char: "→" }
            ,{ entity: "&darr;", hex: "&#2193;", name: "DOWNWARDS ARROW", char: "↓" }
            ,{ entity: "&harr;", hex: "&#2194;", name: "LEFT RIGHT ARROW", char: "↔" }
            ,{ hex: "&#2195;", name: "UP DOWN ARROW", char: "↕" }
            ,{ hex: "&#2196;", name: "NORTH WEST ARROW", char: "↖" }
            ,{ hex: "&#2197;", name: "NORTH EAST ARROW", char: "↗" }
            ,{ hex: "&#2198;", name: "SOUTH EAST ARROW", char: "↘" }
            ,{ hex: "&#2199;", name: "SOUTH WEST ARROW", char: "↙" }
            ,{ hex: "&#219A;", name: "LEFTWARDS ARROW WITH STROKE", char: "↚" }
            ,{ hex: "&#219B;", name: "RIGHTWARDS ARROW WITH STROKE", char: "↛" }
            ,{ hex: "&#219C;", name: "LEFTWARDS WAVE ARROW", char: "↜" }
            ,{ hex: "&#219D;", name: "RIGHTWARDS WAVE ARROW", char: "↝" }
            ,{ hex: "&#219E;", name: "LEFTWARDS TWO HEADED ARROW", char: "↞" }
            ,{ hex: "&#219F;", name: "UPWARDS TWO HEADED ARROW", char: "↟" }
            ,{ hex: "&#21A0;", name: "RIGHTWARDS TWO HEADED ARROW", char: "↠" }
            ,{ hex: "&#21A1;", name: "DOWNWARDS TWO HEADED ARROW", char: "↡" }
            ,{ hex: "&#21A2;", name: "LEFTWARDS ARROW WITH TAIL", char: "↢" }
            ,{ hex: "&#21A3;", name: "RIGHTWARDS ARROW WITH TAIL", char: "↣" }
            ,{ hex: "&#21A4;", name: "LEFTWARDS ARROW FROM BAR", char: "↤" }
            ,{ hex: "&#21A5;", name: "UPWARDS ARROW FROM BAR", char: "↥" }
            ,{ hex: "&#21A6;", name: "RIGHTWARDS ARROW FROM BAR", char: "↦" }
            ,{ hex: "&#21A7;", name: "DOWNWARDS ARROW FROM BAR", char: "↧" }
            ,{ hex: "&#21A8;", name: "UP DOWN ARROW WITH BASE", char: "↨" }
            ,{ hex: "&#21A9;", name: "LEFTWARDS ARROW WITH HOOK", char: "↩" }
            ,{ hex: "&#21AA;", name: "RIGHTWARDS ARROW WITH HOOK", char: "↪" }
            ,{ hex: "&#21AB;", name: "LEFTWARDS ARROW WITH LOOP", char: "↫" }
            ,{ hex: "&#21AC;", name: "RIGHTWARDS ARROW WITH LOOP", char: "↬" }
            ,{ hex: "&#21AD;", name: "LEFT RIGHT WAVE ARROW", char: "↭" }
            ,{ hex: "&#21AE;", name: "LEFT RIGHT ARROW WITH STROKE", char: "↮" }
            ,{ hex: "&#21AF;", name: "DOWNWARDS ZIGZAG ARROW", char: "↯" }
            ,{ hex: "&#21B0;", name: "UPWARDS ARROW WITH TIP LEFTWARDS", char: "↰" }
            ,{ hex: "&#21B1;", name: "UPWARDS ARROW WITH TIP RIGHTWARDS", char: "↱" }
            ,{ hex: "&#21B2;", name: "DOWNWARDS ARROW WITH TIP LEFTWARDS", char: "↲" }
            ,{ hex: "&#21B3;", name: "DOWNWARDS ARROW WITH TIP RIGHTWARDS", char: "↳" }
            ,{ hex: "&#21B4;", name: "RIGHTWARDS ARROW WITH CORNER DOWNWARDS", char: "↴" }
            ,{ entity: "&crarr;", hex: "&#21B5;", name: "DOWNWARDS ARROW WITH CORNER LEFTWARDS", char: "↵" }
            ,{ hex: "&#21B6;", name: "ANTICLOCKWISE TOP SEMICIRCLE ARROW", char: "↶" }
            ,{ hex: "&#21B7;", name: "CLOCKWISE TOP SEMICIRCLE ARROW", char: "↷" }
            ,{ hex: "&#21B8;", name: "NORTH WEST ARROW TO LONG BAR", char: "↸" }
            ,{ hex: "&#21B9;", name: "LEFTWARDS ARROW TO BAR OVER RIGHTWARDS ARROW TO BAR", char: "↹" }
            ,{ hex: "&#21BA;", name: "ANTICLOCKWISE OPEN CIRCLE ARROW", char: "↺" }
            ,{ hex: "&#21BB;", name: "CLOCKWISE OPEN CIRCLE ARROW", char: "↻" }
            ,{ hex: "&#21BC;", name: "LEFTWARDS HARPOON WITH BARB UPWARDS", char: "↼" }
            ,{ hex: "&#21BD;", name: "LEFTWARDS HARPOON WITH BARB DOWNWARDS", char: "↽" }
            ,{ hex: "&#21BE;", name: "UPWARDS HARPOON WITH BARB RIGHTWARDS", char: "↾" }
            ,{ hex: "&#21BF;", name: "UPWARDS HARPOON WITH BARB LEFTWARDS", char: "↿" }
            ,{ hex: "&#21C0;", name: "RIGHTWARDS HARPOON WITH BARB UPWARDS", char: "⇀" }
            ,{ hex: "&#21C1;", name: "RIGHTWARDS HARPOON WITH BARB DOWNWARDS", char: "⇁" }
            ,{ hex: "&#21C2;", name: "DOWNWARDS HARPOON WITH BARB RIGHTWARDS", char: "⇂" }
            ,{ hex: "&#21C3;", name: "DOWNWARDS HARPOON WITH BARB LEFTWARDS", char: "⇃" }
            ,{ hex: "&#21C4;", name: "RIGHTWARDS ARROW OVER LEFTWARDS ARROW", char: "⇄" }
            ,{ hex: "&#21C5;", name: "UPWARDS ARROW LEFTWARDS OF DOWNWARDS ARROW", char: "⇅" }
            ,{ hex: "&#21C6;", name: "LEFTWARDS ARROW OVER RIGHTWARDS ARROW", char: "⇆" }
            ,{ hex: "&#21C7;", name: "LEFTWARDS PAIRED ARROWS", char: "⇇" }
            ,{ hex: "&#21C8;", name: "UPWARDS PAIRED ARROWS", char: "⇈" }
            ,{ hex: "&#21C9;", name: "RIGHTWARDS PAIRED ARROWS", char: "⇉" }
            ,{ hex: "&#21CA;", name: "DOWNWARDS PAIRED ARROWS", char: "⇊" }
            ,{ hex: "&#21CB;", name: "LEFTWARDS HARPOON OVER RIGHTWARDS HARPOON", char: "⇋" }
            ,{ hex: "&#21CC;", name: "RIGHTWARDS HARPOON OVER LEFTWARDS HARPOON", char: "⇌" }
            ,{ hex: "&#21CD;", name: "LEFTWARDS DOUBLE ARROW WITH STROKE", char: "⇍" }
            ,{ hex: "&#21CE;", name: "LEFT RIGHT DOUBLE ARROW WITH STROKE", char: "⇎" }
            ,{ hex: "&#21CF;", name: "RIGHTWARDS DOUBLE ARROW WITH STROKE", char: "⇏" }
            ,{ entity: "&lArr;", hex: "&#21D0;", name: "LEFTWARDS DOUBLE ARROW", char: "⇐" }
            ,{ entity: "&uArr;", hex: "&#21D1;", name: "UPWARDS DOUBLE ARROW", char: "⇑" }
            ,{ entity: "&rArr;", hex: "&#21D2;", name: "RIGHTWARDS DOUBLE ARROW", char: "⇒" }
            ,{ entity: "&dArr;", hex: "&#21D3;", name: "DOWNWARDS DOUBLE ARROW", char: "⇓" }
            ,{ entity: "&hArr;", hex: "&#21D4;", name: "LEFT RIGHT DOUBLE ARROW", char: "⇔" }
            ,{ hex: "&#21D5;", name: "UP DOWN DOUBLE ARROW", char: "⇕" }
            ,{ hex: "&#21D6;", name: "NORTH WEST DOUBLE ARROW", char: "⇖" }
            ,{ hex: "&#21D7;", name: "NORTH EAST DOUBLE ARROW", char: "⇗" }
            ,{ hex: "&#21D8;", name: "SOUTH EAST DOUBLE ARROW", char: "⇘" }
            ,{ hex: "&#21D9;", name: "SOUTH WEST DOUBLE ARROW", char: "⇙" }
            ,{ hex: "&#21DA;", name: "LEFTWARDS TRIPLE ARROW", char: "⇚" }
            ,{ hex: "&#21DB;", name: "RIGHTWARDS TRIPLE ARROW", char: "⇛" }
            ,{ hex: "&#21DC;", name: "LEFTWARDS SQUIGGLE ARROW", char: "⇜" }
            ,{ hex: "&#21DD;", name: "RIGHTWARDS SQUIGGLE ARROW", char: "⇝" }
            ,{ hex: "&#21DE;", name: "UPWARDS ARROW WITH DOUBLE STROKE", char: "⇞" }
            ,{ hex: "&#21DF;", name: "DOWNWARDS ARROW WITH DOUBLE STROKE", char: "⇟" }
            ,{ hex: "&#21E0;", name: "LEFTWARDS DASHED ARROW", char: "⇠" }
            ,{ hex: "&#21E1;", name: "UPWARDS DASHED ARROW", char: "⇡" }
            ,{ hex: "&#21E2;", name: "RIGHTWARDS DASHED ARROW", char: "⇢" }
            ,{ hex: "&#21E3;", name: "DOWNWARDS DASHED ARROW", char: "⇣" }
            ,{ hex: "&#21E4;", name: "LEFTWARDS ARROW TO BAR", char: "⇤" }
            ,{ hex: "&#21E5;", name: "RIGHTWARDS ARROW TO BAR", char: "⇥" }
            ,{ hex: "&#21E6;", name: "LEFTWARDS WHITE ARROW", char: "⇦" }
            ,{ hex: "&#21E7;", name: "UPWARDS WHITE ARROW", char: "⇧" }
            ,{ hex: "&#21E8;", name: "RIGHTWARDS WHITE ARROW", char: "⇨" }
            ,{ hex: "&#21E9;", name: "DOWNWARDS WHITE ARROW", char: "⇩" }
            ,{ hex: "&#21EA;", name: "UPWARDS WHITE ARROW FROM BAR", char: "⇪" }
            ,{ hex: "&#21EB;", name: "UPWARDS WHITE ARROW ON PEDESTAL", char: "⇫" }
            ,{ hex: "&#21EC;", name: "UPWARDS WHITE ARROW ON PEDESTAL WITH HORIZONTAL BAR", char: "⇬" }
            ,{ hex: "&#21ED;", name: "UPWARDS WHITE ARROW ON PEDESTAL WITH VERTICAL BAR", char: "⇭" }
            ,{ hex: "&#21EE;", name: "UPWARDS WHITE DOUBLE ARROW", char: "⇮" }
            ,{ hex: "&#21EF;", name: "UPWARDS WHITE DOUBLE ARROW ON PEDESTAL", char: "⇯" }
            ,{ hex: "&#21F0;", name: "RIGHTWARDS WHITE ARROW FROM WALL", char: "⇰" }
            ,{ hex: "&#21F1;", name: "NORTH WEST ARROW TO CORNER", char: "⇱" }
            ,{ hex: "&#21F2;", name: "SOUTH EAST ARROW TO CORNER", char: "⇲" }
            ,{ hex: "&#21F3;", name: "UP DOWN WHITE ARROW", char: "⇳" }
            ,{ hex: "&#21F4;", name: "RIGHT ARROW WITH SMALL CIRCLE", char: "⇴" }
            ,{ hex: "&#21F5;", name: "DOWNWARDS ARROW LEFTWARDS OF UPWARDS ARROW", char: "⇵" }
            ,{ hex: "&#21F6;", name: "THREE RIGHTWARDS ARROWS", char: "⇶" }
            ,{ hex: "&#21F7;", name: "LEFTWARDS ARROW WITH VERTICAL STROKE", char: "⇷" }
            ,{ hex: "&#21F8;", name: "RIGHTWARDS ARROW WITH VERTICAL STROKE", char: "⇸" }
            ,{ hex: "&#21F9;", name: "LEFT RIGHT ARROW WITH VERTICAL STROKE", char: "⇹" }
            ,{ hex: "&#21FA;", name: "LEFTWARDS ARROW WITH DOUBLE VERTICAL STROKE", char: "⇺" }
            ,{ hex: "&#21FB;", name: "RIGHTWARDS ARROW WITH DOUBLE VERTICAL STROKE", char: "⇻" }
            ,{ hex: "&#21FC;", name: "LEFT RIGHT ARROW WITH DOUBLE VERTICAL STROKE", char: "⇼" }
            ,{ hex: "&#21FD;", name: "LEFTWARDS OPEN-HEADED ARROW", char: "⇽" }
            ,{ hex: "&#21FE;", name: "RIGHTWARDS OPEN-HEADED ARROW", char: "⇾" }
            ,{ hex: "&#21FF;", name: "", char: "⇿" }
            ,{ hex: "&#2B00;", name: "NORTH EAST WHITE ARROW", char: "⬀" }
            ,{ hex: "&#2B01;", name: "NORTH WEST WHITE ARROW", char: "⬁" }
            ,{ hex: "&#2B02;", name: "SOUTH EAST WHITE ARROW", char: "⬂" }
            ,{ hex: "&#2B03;", name: "SOUTH WEST WHITE ARROW", char: "⬃" }
            ,{ hex: "&#2B04;", name: "LEFT RIGHT WHITE ARROW", char: "⬄" }
            ,{ hex: "&#2B05;", name: "LEFTWARDS BLACK ARROW", char: "⬅" }
            ,{ hex: "&#2B06;", name: "UPWARDS BLACK ARROW", char: "⬆" }
            ,{ hex: "&#2B07;", name: "DOWNWARDS BLACK ARROW", char: "⬇" }
            ,{ hex: "&#2B08;", name: "NORTH EAST BLACK ARROW", char: "⬈" }
            ,{ hex: "&#2B09;", name: "NORTH WEST BLACK ARROW", char: "⬉" }
            ,{ hex: "&#2B0A;", name: "SOUTH EAST BLACK ARROW", char: "⬊" }
            ,{ hex: "&#2B0B;", name: "SOUTH WEST BLACK ARROW", char: "⬋" }
            ,{ hex: "&#2B0C;", name: "LEFT RIGHT BLACK ARROW", char: "⬌" }
            ,{ hex: "&#2B0D;", name: "UP DOWN BLACK ARROW", char: "⬍" }
            ,{ hex: "&#2B0E;", name: "RIGHTWARDS ARROW WITH TIP DOWNWARDS", char: "⬎" }
            ,{ hex: "&#2B0F;", name: "RIGHTWARDS ARROW WITH TIP UPWARDS", char: "⬏" }
            ,{ hex: "&#2B10;", name: "LEFTWARDS ARROW WITH TIP DOWNWARDS", char: "⬐" }
            ,{ hex: "&#2B11;", name: "LEFTWARDS ARROW WITH TIP UPWARDS", char: "⬑" }

            ,{ hex: "&#2794;", name: "HEAVY WIDE-HEADED RIGHTWARDS ARROW", char: "➔" }
            ,{ hex: "&#2798;", name: "HEAVY SOUTH EAST ARROW", char: "➘" }
            ,{ hex: "&#2799;", name: "HEAVY RIGHTWARDS ARROW", char: "➙" }
            ,{ hex: "&#279A;", name: "HEAVY NORTH EAST ARROW", char: "➚" }
            ,{ hex: "&#279B;", name: "DRAFTING POINT RIGHTWARDS ARROW", char: "➛" }
            ,{ hex: "&#279C;", name: "HEAVY ROUND-TIPPED RIGHTWARDS ARROW", char: "➜" }
            ,{ hex: "&#279D;", name: "TRIANGLE-HEADED RIGHTWARDS ARROW", char: "➝" }
            ,{ hex: "&#279E;", name: "HEAVY TRIANGLE-HEADED RIGHTWARDS ARROW", char: "➞" }
            ,{ hex: "&#279F;", name: "DASHED TRIANGLE-HEADED RIGHTWARDS ARROW", char: "➟" }
            ,{ hex: "&#27A0;", name: "HEAVY DASHED TRIANGLE-HEADED RIGHTWARDS ARROW", char: "➠" }
            ,{ hex: "&#27A1;", name: "BLACK RIGHTWARDS ARROW", char: "➡" }
            ,{ hex: "&#27A2;", name: "THREE-D TOP-LIGHTED RIGHTWARDS ARROWHEAD", char: "➢" }
            ,{ hex: "&#27A3;", name: "THREE-D BOTTOM-LIGHTED RIGHTWARDS ARROWHEAD", char: "➣" }
            ,{ hex: "&#27A4;", name: "BLACK RIGHTWARDS ARROWHEAD", char: "➤" }
            ,{ hex: "&#27A5;", name: "HEAVY BLACK CURVED DOWNWARDS AND RIGHTWARDS ARROW", char: "➥" }
            ,{ hex: "&#27A6;", name: "HEAVY BLACK CURVED UPWARDS AND RIGHTWARDS ARROW", char: "➦" }
            ,{ hex: "&#27A7;", name: "SQUAT BLACK RIGHTWARDS ARROW", char: "➧" }
            ,{ hex: "&#27A8;", name: "HEAVY CONCAVE-POINTED BLACK RIGHTWARDS ARROW", char: "➨" }
            ,{ hex: "&#27A9;", name: "RIGHT-SHADED WHITE RIGHTWARDS ARROW", char: "➩" }
            ,{ hex: "&#27AA;", name: "LEFT-SHADED WHITE RIGHTWARDS ARROW", char: "➪" }
            ,{ hex: "&#27AB;", name: "BACK-TILTED SHADOWED WHITE RIGHTWARDS ARROW", char: "➫" }
            ,{ hex: "&#27AC;", name: "FRONT-TILTED SHADOWED WHITE RIGHTWARDS ARROW", char: "➬" }
            ,{ hex: "&#27AD;", name: "HEAVY LOWER RIGHT-SHADOWED WHITE RIGHTWARDS ARROW", char: "➭" }
            ,{ hex: "&#27AE;", name: "HEAVY UPPER RIGHT-SHADOWED WHITE RIGHTWARDS ARROW", char: "➮" }
            ,{ hex: "&#27AF;", name: "NOTCHED LOWER RIGHT-SHADOWED WHITE RIGHTWARDS ARROW", char: "➯" }
            ,{ hex: "&#27B1;", name: "NOTCHED UPPER RIGHT-SHADOWED WHITE RIGHTWARDS ARROW", char: "➱" }
            ,{ hex: "&#27B2;", name: "CIRCLED HEAVY WHITE RIGHTWARDS ARROW", char: "➲" }
            ,{ hex: "&#27B3;", name: "WHITE-FEATHERED RIGHTWARDS ARROW", char: "➳" }
            ,{ hex: "&#27B4;", name: "BLACK-FEATHERED SOUTH EAST ARROW", char: "➴" }
            ,{ hex: "&#27B5;", name: "BLACK-FEATHERED RIGHTWARDS ARROW", char: "➵" }
            ,{ hex: "&#27B6;", name: "BLACK-FEATHERED NORTH EAST ARROW", char: "➶" }
            ,{ hex: "&#27B7;", name: "HEAVY BLACK-FEATHERED SOUTH EAST ARROW", char: "➷" }
            ,{ hex: "&#27B8;", name: "HEAVY BLACK-FEATHERED RIGHTWARDS ARROW", char: "➸" }
            ,{ hex: "&#27B9;", name: "HEAVY BLACK-FEATHERED NORTH EAST ARROW", char: "➹" }
            ,{ hex: "&#27BA;", name: "TEARDROP-BARBED RIGHTWARDS ARROW", char: "➺" }
            ,{ hex: "&#27BB;", name: "HEAVY TEARDROP-SHANKED RIGHTWARDS ARROW", char: "➻" }
            ,{ hex: "&#27BC;", name: "WEDGE-TAILED RIGHTWARDS ARROW", char: "➼" }
            ,{ hex: "&#27BD;", name: "HEAVY WEDGE-TAILED RIGHTWARDS ARROW", char: "➽" }
            ,{ hex: "&#27BE;", name: "OPEN-OUTLINED RIGHTWARDS ARROW", char: "➾" }

            ,{ hex: "&#27F0;", name: "UPWARDS QUADRUPLE ARROW", char: "⟰" }
            ,{ hex: "&#27F1;", name: "DOWNWARDS QUADRUPLE ARROW", char: "⟱" }
            ,{ hex: "&#27F2;", name: "ANTICLOCKWISE GAPPED CIRCLE ARROW", char: "⟲" }
            ,{ hex: "&#27F3;", name: "CLOCKWISE GAPPED CIRCLE ARROW", char: "⟳" }
            ,{ hex: "&#27F4;", name: "RIGHT ARROW WITH CIRCLED PLUS", char: "⟴" }
            ,{ hex: "&#27F5;", name: "LONG LEFTWARDS ARROW", char: "⟵" }
            ,{ hex: "&#27F6;", name: "LONG RIGHTWARDS ARROW", char: "⟶" }
            ,{ hex: "&#27F7;", name: "LONG LEFT RIGHT ARROW", char: "⟷" }
            ,{ hex: "&#27F8;", name: "LONG LEFTWARDS DOUBLE ARROW", char: "⟸" }
            ,{ hex: "&#27F9;", name: "LONG RIGHTWARDS DOUBLE ARROW", char: "⟹" }
            ,{ hex: "&#27FA;", name: "LONG LEFT RIGHT DOUBLE ARROW", char: "⟺" }
            ,{ hex: "&#27FB;", name: "LONG LEFTWARDS ARROW FROM BAR", char: "⟻" }
            ,{ hex: "&#27FC;", name: "LONG RIGHTWARDS ARROW FROM BAR", char: "⟼" }
            ,{ hex: "&#27FD;", name: "LONG LEFTWARDS DOUBLE ARROW FROM BAR", char: "⟽" }
            ,{ hex: "&#27FE;", name: "LONG RIGHTWARDS DOUBLE ARROW FROM BAR", char: "⟾" }
            ,{ hex: "&#27FF;", name: "LONG RIGHTWARDS SQUIGGLE ARROW", char: "⟿" }
            ,{ hex: "&#2900;", name: "RIGHTWARDS TWO-HEADED ARROW WITH VERTICAL STROKE", char: "⤀" }
            ,{ hex: "&#2901;", name: "RIGHTWARDS TWO-HEADED ARROW WITH DOUBLE VERTICAL STROKE", char: "⤁" }
            ,{ hex: "&#2902;", name: "LEFTWARDS DOUBLE ARROW WITH VERTICAL STROKE", char: "⤂" }
            ,{ hex: "&#2903;", name: "RIGHTWARDS DOUBLE ARROW WITH VERTICAL STROKE", char: "⤃" }
            ,{ hex: "&#2904;", name: "LEFT RIGHT DOUBLE ARROW WITH VERTICAL STROKE", char: "⤄" }
            ,{ hex: "&#2905;", name: "RIGHTWARDS TWO-HEADED ARROW FROM BAR", char: "⤅" }
            ,{ hex: "&#2906;", name: "LEFTWARDS DOUBLE ARROW FROM BAR", char: "⤆" }
            ,{ hex: "&#2907;", name: "RIGHTWARDS DOUBLE ARROW FROM BAR", char: "⤇" }
            ,{ hex: "&#2908;", name: "DOWNWARDS ARROW WITH HORIZONTAL STROKE", char: "⤈" }
            ,{ hex: "&#2909;", name: "UPWARDS ARROW WITH HORIZONTAL STROKE", char: "⤉" }
            ,{ hex: "&#290A;", name: "UPWARDS TRIPLE ARROW", char: "⤊" }
            ,{ hex: "&#290B;", name: "DOWNWARDS TRIPLE ARROW", char: "⤋" }
            ,{ hex: "&#290C;", name: "LEFTWARDS DOUBLE DASH ARROW", char: "⤌" }
            ,{ hex: "&#290D;", name: "RIGHTWARDS DOUBLE DASH ARROW", char: "⤍" }
            ,{ hex: "&#290E;", name: "LEFTWARDS TRIPLE DASH ARROW", char: "⤎" }
            ,{ hex: "&#290F;", name: "RIGHTWARDS TRIPLE DASH ARROW", char: "⤏" }
            ,{ hex: "&#2910;", name: "RIGHTWARDS TWO-HEADED TRIPLE DASH ARROW", char: "⤐" }
            ,{ hex: "&#2911;", name: "RIGHTWARDS ARROW WITH DOTTED STEM", char: "⤑" }
            ,{ hex: "&#2912;", name: "UPWARDS ARROW TO BAR", char: "⤒" }
            ,{ hex: "&#2913;", name: "DOWNWARDS ARROW TO BAR", char: "⤓" }
            ,{ hex: "&#2914;", name: "RIGHTWARDS ARROW WITH TAIL WITH VERTICAL STROKE", char: "⤔" }
            ,{ hex: "&#2915;", name: "RIGHTWARDS ARROW WITH TAIL WITH DOUBLE VERTICAL STROKE", char: "⤕" }
            ,{ hex: "&#2916;", name: "RIGHTWARDS TWO-HEADED ARROW WITH TAIL", char: "⤖" }
            ,{ hex: "&#2917;", name: "RIGHTWARDS TWO-HEADED ARROW WITH TAIL WITH VERTICAL STROKE", char: "⤗" }
            ,{ hex: "&#2918;", name: "RIGHTWARDS TWO-HEADED ARROW WITH TAIL WITH DOUBLE VERTICAL STROKE", char: "⤘" }
            ,{ hex: "&#2919;", name: "LEFTWARDS ARROW-TAIL", char: "⤙" }
            ,{ hex: "&#291A;", name: "RIGHTWARDS ARROW-TAIL", char: "⤚" }
            ,{ hex: "&#291B;", name: "LEFTWARDS DOUBLE ARROW-TAIL", char: "⤛" }
            ,{ hex: "&#291C;", name: "RIGHTWARDS DOUBLE ARROW-TAIL", char: "⤜" }
            ,{ hex: "&#291D;", name: "LEFTWARDS ARROW TO BLACK DIAMOND", char: "⤝" }
            ,{ hex: "&#291E;", name: "RIGHTWARDS ARROW TO BLACK DIAMOND", char: "⤞" }
            ,{ hex: "&#291F;", name: "LEFTWARDS ARROW FROM BAR TO BLACK DIAMOND", char: "⤟" }
            ,{ hex: "&#2920;", name: "RIGHTWARDS ARROW FROM BAR TO BLACK DIAMOND", char: "⤠" }
            ,{ hex: "&#2921;", name: "NORTH WEST AND SOUTH EAST ARROW", char: "⤡" }
            ,{ hex: "&#2922;", name: "NORTH EAST AND SOUTH WEST ARROW", char: "⤢" }
            ,{ hex: "&#2923;", name: "NORTH WEST ARROW WITH HOOK", char: "⤣" }
            ,{ hex: "&#2924;", name: "NORTH EAST ARROW WITH HOOK", char: "⤤" }
            ,{ hex: "&#2925;", name: "SOUTH EAST ARROW WITH HOOK", char: "⤥" }
            ,{ hex: "&#2926;", name: "SOUTH WEST ARROW WITH HOOK", char: "⤦" }
            ,{ hex: "&#2927;", name: "NORTH WEST ARROW AND NORTH EAST ARROW", char: "⤧" }
            ,{ hex: "&#2928;", name: "NORTH EAST ARROW AND SOUTH EAST ARROW", char: "⤨" }
            ,{ hex: "&#2929;", name: "SOUTH EAST ARROW AND SOUTH WEST ARROW", char: "⤩" }
            ,{ hex: "&#292A;", name: "SOUTH WEST ARROW AND NORTH WEST ARROW", char: "⤪" }
            ,{ hex: "&#292B;", name: "RISING DIAGONAL CROSSING FALLING DIAGONAL", char: "⤫" }
            ,{ hex: "&#292C;", name: "FALLING DIAGONAL CROSSING RISING DIAGONAL", char: "⤬" }
            ,{ hex: "&#292D;", name: "SOUTH EAST ARROW CROSSING NORTH EAST ARROW", char: "⤭" }
            ,{ hex: "&#292E;", name: "NORTH EAST ARROW CROSSING SOUTH EAST ARROW", char: "⤮" }
            ,{ hex: "&#292F;", name: "FALLING DIAGONAL CROSSING NORTH EAST ARROW", char: "⤯" }
            ,{ hex: "&#2930;", name: "RISING DIAGONAL CROSSING SOUTH EAST ARROW", char: "⤰" }
            ,{ hex: "&#2931;", name: "NORTH EAST ARROW CROSSING NORTH WEST ARROW", char: "⤱" }
            ,{ hex: "&#2932;", name: "NORTH WEST ARROW CROSSING NORTH EAST ARROW", char: "⤲" }
            ,{ hex: "&#2933;", name: "WAVE ARROW POINTING DIRECTLY RIGHT", char: "⤳" }
            ,{ hex: "&#2934;", name: "ARROW POINTING RIGHTWARDS THEN CURVING UPWARDS", char: "⤴" }
            ,{ hex: "&#2935;", name: "ARROW POINTING RIGHTWARDS THEN CURVING DOWNWARDS", char: "⤵" }
            ,{ hex: "&#2936;", name: "ARROW POINTING DOWNWARDS THEN CURVING LEFTWARDS", char: "⤶" }
            ,{ hex: "&#2937;", name: "ARROW POINTING DOWNWARDS THEN CURVING RIGHTWARDS", char: "⤷" }
            ,{ hex: "&#2938;", name: "RIGHT-SIDE ARC CLOCKWISE ARROW", char: "⤸" }
            ,{ hex: "&#2939;", name: "LEFT-SIDE ARC ANTICLOCKWISE ARROW", char: "⤹" }
            ,{ hex: "&#293A;", name: "TOP ARC ANTICLOCKWISE ARROW", char: "⤺" }
            ,{ hex: "&#293B;", name: "BOTTOM ARC ANTICLOCKWISE ARROW", char: "⤻" }
            ,{ hex: "&#293C;", name: "TOP ARC CLOCKWISE ARROW WITH MINUS", char: "⤼" }
            ,{ hex: "&#293D;", name: "TOP ARC ANTICLOCKWISE ARROW WITH PLUS", char: "⤽" }
            ,{ hex: "&#293E;", name: "LOWER RIGHT SEMICIRCULAR CLOCKWISE ARROW", char: "⤾" }
            ,{ hex: "&#293F;", name: "LOWER LEFT SEMICIRCULAR ANTICLOCKWISE ARROW", char: "⤿" }
            ,{ hex: "&#2940;", name: "ANTICLOCKWISE CLOSED CIRCLE ARROW", char: "⥀" }
            ,{ hex: "&#2941;", name: "CLOCKWISE CLOSED CIRCLE ARROW", char: "⥁" }
            ,{ hex: "&#2942;", name: "RIGHTWARDS ARROW ABOVE SHORT LEFTWARDS ARROW", char: "⥂" }
            ,{ hex: "&#2943;", name: "LEFTWARDS ARROW ABOVE SHORT RIGHTWARDS ARROW", char: "⥃" }
            ,{ hex: "&#2944;", name: "SHORT RIGHTWARDS ARROW ABOVE LEFTWARDS ARROW", char: "⥄" }
            ,{ hex: "&#2945;", name: "RIGHTWARDS ARROW WITH PLUS BELOW", char: "⥅" }
            ,{ hex: "&#2946;", name: "LEFTWARDS ARROW WITH PLUS BELOW", char: "⥆" }
            ,{ hex: "&#2947;", name: "RIGHTWARDS ARROW THROUGH X", char: "⥇" }
            ,{ hex: "&#2948;", name: "LEFT RIGHT ARROW THROUGH SMALL CIRCLE", char: "⥈" }
            ,{ hex: "&#2949;", name: "UPWARDS TWO-HEADED ARROW FROM SMALL CIRCLE", char: "⥉" }
            ,{ hex: "&#294A;", name: "LEFT BARB UP RIGHT BARB DOWN HARPOON", char: "⥊" }
            ,{ hex: "&#294B;", name: "LEFT BARB DOWN RIGHT BARB UP HARPOON", char: "⥋" }
            ,{ hex: "&#294C;", name: "UP BARB RIGHT DOWN BARB LEFT HARPOON", char: "⥌" }
            ,{ hex: "&#294D;", name: "UP BARB LEFT DOWN BARB RIGHT HARPOON", char: "⥍" }
            ,{ hex: "&#294E;", name: "LEFT BARB UP RIGHT BARB UP HARPOON", char: "⥎" }
            ,{ hex: "&#294F;", name: "UP BARB RIGHT DOWN BARB RIGHT HARPOON", char: "⥏" }
            ,{ hex: "&#2950;", name: "LEFT BARB DOWN RIGHT BARB DOWN HARPOON", char: "⥐" }
            ,{ hex: "&#2951;", name: "UP BARB LEFT DOWN BARB LEFT HARPOON", char: "⥑" }
            ,{ hex: "&#2952;", name: "LEFTWARDS HARPOON WITH BARB UP TO BAR", char: "⥒" }
            ,{ hex: "&#2953;", name: "RIGHTWARDS HARPOON WITH BARB UP TO BAR", char: "⥓" }
            ,{ hex: "&#2954;", name: "UPWARDS HARPOON WITH BARB RIGHT TO BAR", char: "⥔" }
            ,{ hex: "&#2955;", name: "DOWNWARDS HARPOON WITH BARB RIGHT TO BAR", char: "⥕" }
            ,{ hex: "&#2956;", name: "LEFTWARDS HARPOON WITH BARB DOWN TO BAR", char: "⥖" }
            ,{ hex: "&#2957;", name: "RIGHTWARDS HARPOON WITH BARB DOWN TO BAR", char: "⥗" }
            ,{ hex: "&#2958;", name: "UPWARDS HARPOON WITH BARB LEFT TO BAR", char: "⥘" }
            ,{ hex: "&#2959;", name: "DOWNWARDS HARPOON WITH BARB LEFT TO BAR", char: "⥙" }
            ,{ hex: "&#295A;", name: "LEFTWARDS HARPOON WITH BARB UP FROM BAR", char: "⥚" }
            ,{ hex: "&#295B;", name: "RIGHTWARDS HARPOON WITH BARB UP FROM BAR", char: "⥛" }
            ,{ hex: "&#295C;", name: "UPWARDS HARPOON WITH BARB RIGHT FROM BAR", char: "⥜" }
            ,{ hex: "&#295D;", name: "DOWNWARDS HARPOON WITH BARB RIGHT FROM BAR", char: "⥝" }
            ,{ hex: "&#295E;", name: "LEFTWARDS HARPOON WITH BARB DOWN FROM BAR", char: "⥞" }
            ,{ hex: "&#295F;", name: "RIGHTWARDS HARPOON WITH BARB DOWN FROM BAR", char: "⥟" }
            ,{ hex: "&#2960;", name: "UPWARDS HARPOON WITH BARB LEFT FROM BAR", char: "⥠" }
            ,{ hex: "&#2961;", name: "DOWNWARDS HARPOON WITH BARB LEFT FROM BAR", char: "⥡" }
            ,{ hex: "&#2962;", name: "LEFTWARDS HARPOON WITH BARB UP ABOVE LEFTWARDS HARPOON WITH BARB DOWN", char: "⥢" }
            ,{ hex: "&#2963;", name: "UPWARDS HARPOON WITH BARB LEFT BESIDE UPWARDS HARPOON WITH BARB RIGHT", char: "⥣" }
            ,{ hex: "&#2964;", name: "RIGHTWARDS HARPOON WITH BARB UP ABOVE RIGHTWARDS HARPOON WITH BARB DOWN", char: "⥤" }
            ,{ hex: "&#2965;", name: "DOWNWARDS HARPOON WITH BARB LEFT BESIDE DOWNWARDS HARPOON WITH BARB RIGHT", char: "⥥" }
            ,{ hex: "&#2966;", name: "LEFTWARDS HARPOON WITH BARB UP ABOVE RIGHTWARDS HARPOON WITH BARB UP", char: "⥦" }
            ,{ hex: "&#2967;", name: "LEFTWARDS HARPOON WITH BARB DOWN ABOVE RIGHTWARDS HARPOON WITH BARB DOWN", char: "⥧" }
            ,{ hex: "&#2968;", name: "RIGHTWARDS HARPOON WITH BARB UP ABOVE LEFTWARDS HARPOON WITH BARB UP", char: "⥨" }
            ,{ hex: "&#2969;", name: "RIGHTWARDS HARPOON WITH BARB DOWN ABOVE LEFTWARDS HARPOON WITH BARB DOWN", char: "⥩" }
            ,{ hex: "&#296A;", name: "LEFTWARDS HARPOON WITH BARB UP ABOVE LONG DASH", char: "⥪" }
            ,{ hex: "&#296B;", name: "LEFTWARDS HARPOON WITH BARB DOWN BELOW LONG DASH", char: "⥫" }
            ,{ hex: "&#296C;", name: "RIGHTWARDS HARPOON WITH BARB UP ABOVE LONG DASH", char: "⥬" }
            ,{ hex: "&#296D;", name: "RIGHTWARDS HARPOON WITH BARB DOWN BELOW LONG DASH", char: "⥭" }
            ,{ hex: "&#296E;", name: "UPWARDS HARPOON WITH BARB LEFT BESIDE DOWNWARDS HARPOON WITH BARB RIGHT", char: "⥮" }
            ,{ hex: "&#296F;", name: "DOWNWARDS HARPOON WITH BARB LEFT BESIDE UPWARDS HARPOON WITH BARB RIGHT", char: "⥯" }
            ,{ hex: "&#2970;", name: "RIGHT DOUBLE ARROW WITH ROUNDED HEAD", char: "⥰" }
            ,{ hex: "&#2971;", name: "EQUALS SIGN ABOVE RIGHTWARDS ARROW", char: "⥱" }
            ,{ hex: "&#2972;", name: "TILDE OPERATOR ABOVE RIGHTWARDS ARROW", char: "⥲" }
            ,{ hex: "&#2973;", name: "LEFTWARDS ARROW ABOVE TILDE OPERATOR", char: "⥳" }
            ,{ hex: "&#2974;", name: "RIGHTWARDS ARROW ABOVE TILDE OPERATOR", char: "⥴" }
            ,{ hex: "&#2975;", name: "RIGHTWARDS ARROW ABOVE ALMOST EQUAL TO", char: "⥵" }
            ,{ hex: "&#2976;", name: "LESS-THAN ABOVE LEFTWARDS ARROW", char: "⥶" }
            ,{ hex: "&#2977;", name: "LEFTWARDS ARROW THROUGH LESS-THAN", char: "⥷" }
            ,{ hex: "&#2978;", name: "GREATER-THAN ABOVE RIGHTWARDS ARROW", char: "⥸" }
            ,{ hex: "&#2979;", name: "SUBSET ABOVE RIGHTWARDS ARROW", char: "⥹" }
            ,{ hex: "&#297A;", name: "LEFTWARDS ARROW THROUGH SUBSET", char: "⥺" }
            ,{ hex: "&#297B;", name: "SUPERSET ABOVE LEFTWARDS ARROW", char: "⥻" }
            ,{ hex: "&#297C;", name: "LEFT FISH TAIL", char: "⥼" }
            ,{ hex: "&#297D;", name: "RIGHT FISH TAIL", char: "⥽" }
            ,{ hex: "&#297E;", name: "UP FISH TAIL", char: "⥾" }
            ,{ hex: "&#297F;", name: "DOWN FISH TAIL", char: "⥿" }
        ]
    }
};

if ( typeof modules != 'undefined' ) {
    modules.exports = charMap;
}
