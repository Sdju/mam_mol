namespace $ { $mol_style_attach( "mol/book2/book2.view.css",
 "[mol_book2] {\n\tdisplay: flex;\n\tflex-flow: row nowrap;\n\talign-items: stretch;\n\tflex: 1 1 auto;\n\talign-self: stretch;\n\tmargin: 0;\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_line); */\n\t/* transform: translateZ(0); */\n\ttransition: none;\n\toverflow: overlay;\n\tscroll-snap-type: x mandatory;\n}\n\n[mol_book2] > * {\n/* \tflex: none; */\n\tscroll-snap-stop: always;\n\tscroll-snap-align: end;\n\tposition: relative;\n\tmin-height: 100%;\n\tmax-height: 100%;\n\tmax-width: 100%;\n\tflex-shrink: 0;\n}\n[mol_book2] > * + *:not([mol_book2_placeholder]):before {\n\tdisplay: block;\n\tcontent: '-';\n\topacity: .5;\n\tposition: absolute;\n\ttop: -.5rem;\n\tleft: 0;\n}\n[mol_book2] > *:not([mol_book2_placeholder]):not(:last-of-type):after {\n\tdisplay: block;\n\tcontent: '-';\n\topacity: .5;\n\tposition: absolute;\n\ttop: -.5rem;\n\tright: 0;\n}\n\n[mol_book2] > * {\n\tbackground-color: var(--mol_theme_card);\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_back);\n}\n\n[mol_book2] > [mol_book2] {\n\tdisplay: contents;\n}\n\n[mol_book2] > *:first-child {\n\tscroll-snap-align: start;\n}\n\n[mol_book2] > [mol_view] {\n\ttransform: none; /* prevent content clipping */\n}\n\n[mol_book2_placeholder] {\n\tflex: 1 1 0;\n\t/* background: var(--mol_theme_back); */\n}\n"
) }