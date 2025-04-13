import { Character } from '../types';

const initialCharacters: Character[] = [
  {
    id: "1",
    name: "La vaca saturno saturnita",
    image: "/images/Vaca-Saturno-Saturnita.webp",
    type: "Galattico",
    power: 97,
    description: "La mucca cosmica nata 13,8 miliardi di anni fa. Il suo peso di 5,685E26 kg la rende una delle entità più potenti.",
    allies: ["Tung tung tung sahur", "Trulimero Trulicina"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
    votes: 23,
    biography: "La vaca saturno saturnita, probabilmente l'essere più antico dell'universo Brainrot, è nata insieme all'universo stesso. Con forma di mucca ma composta di materia stellare ed energia cosmica, questo essere ha il potere di spostare pianeti e creare buchi neri con il suo muggito.",
    phrase: "Muuuuuuniverso...",
    abilities: ["Manipolazione cosmica", "Creazione di buchi neri", "Viaggio intergalattico", "Manipolazione della realtà"],
    appearances: ["L'Origine del Cosmo", "La Battaglia Celeste", "Il Muggito che Creò il Mondo"]
  },
  {
    id: "2",
    name: "Bombardino coccodrillo",
    image: "/images/Bombardino-Crocodillo.webp",
    type: "Anfibio",
    power: 95,
    description: "Il leggendario coccodrillo italiano con poteri esplosivi. Il suo morso può attraversare il metallo.",
    allies: ["Glorbo Fruttodrillo", "Brr brr Patapim"],
    rivals: ["Bombombini Gusini", "Trippi Troppi"],
    votes: 19,
    biography: "Bombardino coccodrillo è il protagonista principale dell'universo Italian Brainrot. Questo coccodrillo antropomorfo dagli straordinari poteri esplosivi è riconoscibile per il suo distintivo accento italiano e la sua capacità di trasformare qualsiasi oggetto in un'arma.",
    abilities: ["Morso perforante", "Esplosioni controllate", "Super resistenza", "Accelerazione improvvisa"],
    phrase: "Mamma mia, che esplosione!"
  },
  {
    id: "3",
    name: "Brr Brr Patapim",
    image: "/images/Brr-Brr-Patapim.webp",
    type: "Gelatto",
    power: 83,
    description: "Uno squalo che indossa scarpe sportive blu. Velocissimo sia in mare che sulla terra.",
    allies: ["Trulimero Trulicina", "Bombombini Gusini"],
    rivals: ["La vaca saturno saturnita", "Glorbo Fruttodrillo"],
    votes: 28,
    abilities: ["Corsa supersonica", "Morso potente", "Salto acrobatico", "Raffica di vento"],
    biography: "Brr brr Patapim è uno squalo evoluto che ha sviluppato la capacità di respirare fuori dall'acqua. Le sue scarpe sportive blu gli permettono di correre a velocità supersonica sia in mare che sulla terraferma, creando onde d'urto al suo passaggio.",
    phrase: "Troppo lento per vedermi, troppo tardi per scappare!"
  },
  {
    id: "4",
    name: "Bombombini Gusini",
    image: "/images/Bombombini-Gusini.webp",
    type: "Animalico",
    power: 90,
    description: "Rivale diretto di Bombardino con abilità esplosive superiori.",
    allies: ["Trippi Troppi", "Capuchino Assassino"],
    rivals: ["Bombardino coccodrillo", "Glorbo Fruttodrillo"],
    votes: 49,
    biography: "Bombombini Gusini è l'arcinemico di Bombardino coccodrillo. Sebbene sia anch'esso un anfibio con poteri esplosivi, le sue esplosioni sono più controllate e precise. Ambisce a diventare il dominatore supremo dell'universo Italian Brainrot.",
    abilities: ["Esplosioni tattiche", "Salto potenziato", "Scudo d'urto", "Bomba a frammentazione"],
    phrase: "Boom! E tu sei finito!"
  },
  {
    id: "5",
    name: "Bobritto Bandito",
    image: "/images/Bobritto-Bandito.webp",
    type: "Criminale",
    power: 89,
    description: "Il ladro più abile dell'universo Italian Brainrot.",
    allies: ["Glorbo Fruttodrillo", "Lirilì Larilà"],
    rivals: ["Trippi Troppi", "Capuchino Assassino"],
    votes: 17,
    biography: "Bobritto Bandito è un castoro antropomorfo noto per essere il ladro più astuto e veloce dell'intero universo Brainrot. Con il suo cappello da bandito e la sua maschera, riesce a rubare qualsiasi cosa senza mai farsi catturare.",
    abilities: ["Invisibilità temporanea", "Scassinatore maestro", "Velocità fulminea", "Costruzione rapida di tunnel"],
    phrase: "Se lo vedi, è già troppo tardi!"
  },
  {
    id: "6",
    name: "Glorbo Fruttodrillo",
    image: "/images/Glorbo-Fruttodrillo.webp",
    type: "Fruttoso",
    power: 88,
    description: "Cugino di Bombardino. Esperto in tattiche di combattimento e frutti tropicali.",
    allies: ["Bombardino coccodrillo", "Bobritto bandito"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
    votes: 18,
    biography: "Glorbo Fruttodrillo è il cugino di Bombardino coccodrillo. A differenza del suo parente, ha sviluppato poteri legati ai frutti tropicali. Può trasformare qualsiasi frutto in un'arma letale o in uno strumento di guarigione.",
    abilities: ["Fruttificazione istantanea", "Lancio di frutti esplosivi", "Guarigione con frutti", "Scudo di buccia"],
    phrase: "La frutta è salute, la frutta è potere!"
  },
  {
    id: "7",
    name: "Tung tung tung sahur",
    image: "/images/Tung-Tung-Tung.webp",
    type: "Metallo",
    power: 88,
    description: "Il misterioso personaggio indonesiano che annuncia il sahur durante il Ramadan. Il suo ritmo penetra nella mente.",
    allies: ["La vaca saturno saturnita", "Bobritto bandito"],
    rivals: ["Bombardino coccodrillo", "Bombombini Gusini"],
    votes: [],
    voteCount: 32,
    biography: "Tung tung tung sahur è una creatura mistica che appare solo durante il Ramadan. Con il suo tamburo sacro, sveglia i fedeli per il sahur (pasto prima dell'alba) e può controllare le menti attraverso il ritmo ipnotico.",
    abilities: ["Ipnosi ritmica", "Manipolazione del tempo", "Teletrasporto al suono del tamburo", "Risonanza psichica"],
    phrase: "Tung tung tung... è ora del sahur!"
  },
  {
    id: "8",
    name: "Tralalero Tralala",
    image: "/images/Tralalero-Tralala.webp",
    type: "Musico",
    power: 86,
    description: "Maestro delle arti sonore, può manipolare le onde sonore.",
    allies: ["Brr brr Patapim", "Bombardino coccodrillo"],
    rivals: ["Capuchino Assassino", "Trippi Troppi"],
    votes: 12,
    biography: "Tralalero Tralala è un essere composto interamente di onde sonore. Può trasformarsi in qualsiasi suono e manipolare le frequenze per creare effetti straordinari, dal distruggere edifici al guarire ferite.",
    abilities: ["Manipolazione sonora", "Attacco sonico", "Barriera acustica", "Eco curativa"],
    phrase: "Ascolta la melodia del tuo destino!"
  },
  {
    id: "9",
    name: "Trulimero Trulicina",
    image: "/images/Trulimero-Trulicina.webp",
    type: "Buffonazzo",
    power: 85,
    description: "Metà pesce, metà umano. Una creatura straordinaria che può respirare sia sott'acqua che sulla terraferma.",
    allies: ["Bombardino coccodrillo", "Tralalero Tralala"],
    rivals: ["Trippi Troppi", "Bobritto bandito"],
    votes: 15,
    abilities: ["Respirazione anfibia", "Nuoto veloce", "Comunicazione con animali marini", "Manipolazione dell'acqua"],
    biography: "Trulimero Trulicina è un essere ibrido nato dall'unione di un umano e una creatura marina. Con la capacità di vivere sia in acqua che sulla terra, funge da ambasciatore tra i due mondi e protegge gli oceani dell'universo Brainrot.",
    phrase: "In acqua o in terra, la mia forza è immensa!"
  },
  {
    id: "11",
    name: "Lirilì Larilà",
    image: "/images/Lirilì-Larilà.webp",
    type: "Fiabosco",
    power: 82,
    description: "Un ibrido tra gatto e pesce. Ama il mare ma odia l'acqua.",
    allies: ["Brr brr Patapim", "Trippi Troppi"],
    rivals: ["Tung tung tung sahur", "Tralalero Tralala"],
    votes: 20,
    abilities: ["Respirazione anfibia", "Vista notturna", "Fusa ipnotiche", "Artigli acquatici"],
    biography: "Lirilì Larilà è una creatura paradossale: un ibrido tra gatto e pesce che ama il mare ma detesta bagnarsi. Ha sviluppato un campo di forza acquatico che gli permette di nuotare senza mai toccare l'acqua, mantenendosi sempre asciutto.",
    phrase: "Miao... splash... ma senza bagnarmi!"
  },
  {
    id: "12",
    name: "Trippi Troppi",
    image: "/images/Trippi-Troppi.webp",
    type: "Tecnologia",
    power: 81,
    description: "Il vigilante con la testa a forma di fotocamera. Vede tutto e non dimentica mai.",
    allies: ["Bombombini Gusini", "Lirilì Larilà"],
    rivals: ["La vaca saturno saturnita", "Bombardino coccodrillo"],
    votes: 24,
    abilities: ["Visione a raggi X", "Memoria fotografica", "Flash accecante", "Registrazione eventi"],
    biography: "Trippi Troppi è nato da un esperimento di fusione tra un umano e una macchina fotografica. La sua testa è una vera e propria fotocamera che registra automaticamente tutto ciò che vede. Le sue foto possono catturare non solo l'immagine ma anche l'essenza di ciò che immortala.",
    phrase: "Niente sfugge al mio obiettivo!"
  },
  {
    id: "13",
    name: "Chimpanzini Bananini",
    image: "/images/Chimpanzini-Bananini.webp",
    type: "Aereo",
    power: 81,
    description: "Scimmia volante che lancia banane esplosive mentre ride incontrollabilmente.",
    allies: ["Glorbo Fruttodrillo", "Brasilini Birimbini"],
    rivals: ["Capuchino Assassino", "Pot Hotspot"],
    votes: 16,
    abilities: ["Volo acrobatico", "Banane esplosive", "Risata contagiosa", "Super agilità"],
    biography: "Chimpanzini Bananini è una scimmia mutante che ha acquisito la capacità di volare e di trasformare banane comuni in potenti ordigni esplosivi. La sua risata è così contagiosa che può immobilizzare i nemici in attacchi di ilarità incontrollabile.",
    phrase: "Ahahahah! BOOM! Ahahahah!"
  },
  {
    id: "14",
    name: "Ballerina Capuchina",
    image: "/images/Ballerina-Capuchina.webp",
    type: "Musicale",
    power: 75,
    description: "Scimmia cappuccina ballerina che ipnotizza i nemici con le sue mosse di danza.",
    allies: ["Tralalero Tralala", "Chimpanzini Bananini"],
    rivals: ["Capuchino Assassino", "Pot Hotspot"],
    votes: 25,
    abilities: ["Danza ipnotica", "Piroette letali", "Ritmo curativo", "Scudo di grazia"],
    biography: "Ballerina Capuchina è una scimmia cappuccina che ha trascorso anni studiando ogni forma di danza esistente. Le sue mosse sono così fluide e perfette che chiunque la guardi rimane ipnotizzato. Usa questa abilità per fermare conflitti e creare pace.",
    phrase: "La vita è danza, la danza è potere!"
  },
  {
    id: "15",
    name: "Baranito Tankito",
    image: "/images/Baranito-Tankito.webp",
    type: "Tecnologia",
    power: 78,
    description: "Montone cibernetico con cannoni integrati e armatura impenetrabile.",
    allies: ["Piccione Macchina", "Serbinyo Carshippinyo"],
    rivals: ["Rugginato LupoGT", "Bombombini Gusini"],
    votes: 19,
    abilities: ["Cannone plasma", "Carica devastante", "Scudo energetico", "Trasformazione in veicolo corazzato"],
    biography: "Baranito Tankito era un normale montone finché non fu trasformato in una macchina da guerra cibernetica. Ora è metà animale, metà carro armato, con la capacità di trasformarsi completamente in un veicolo corazzato per le battaglie più intense.",
    phrase: "Carica, spara, distruggi, ripeti!"
  },
  {
    id: "16",
    name: "Bombinarium Nerpinarium",
    image: "/images/Bombinarium-Nerpinarium.webp",
    type: "Tecnologia",
    power: 83,
    description: "Scienziato pazzo che crea pozioni esplosive e armi chimiche bizzarre.",
    allies: ["Bombardino coccodrillo", "Bombombini Gusini"],
    rivals: ["Tralalero Tralala", "Pot Hotspot"],
    votes: 18,
    abilities: ["Creazione di pozioni", "Esplosioni chimiche", "Mutazione temporanea", "Nube tossica"],
    biography: "Bombinarium Nerpinarium è lo scienziato più brillante e folle dell'universo Brainrot. Nel suo laboratorio sotterraneo, crea continuamente nuove pozioni ed esplosivi chimici dai risultati imprevedibili. Spesso i suoi esperimenti causano disastri tanto quanto successi.",
    phrase: "La scienza è esplosiva, letteralmente!"
  },
  {
    id: "17",
    name: "Brasilini Birimbini",
    image: "/images/Brasilini_Birimbini.webp",
    type: "Musicale",
    power: 76,
    description: "Ballerino di samba che crea terremoti ritmici con i suoi passi di danza.",
    allies: ["Chimpanzini Bananini", "Ballerina Capuchina"],
    rivals: ["Tracotocutulo", "Frulli Frulla"],
    votes: 21,
    abilities: ["Samba sismica", "Capoeira cosmica", "Carnevale caotico", "Batucada battagliera"],
    biography: "Brasilini Birimbini è l'incarnazione della gioia e del ritmo brasiliano. I suoi passi di samba sono così potenti che possono causare terremoti, e la sua energia contagiosa può trasformare qualsiasi situazione triste in una festa vibrante.",
    phrase: "¡Samba, ritmo e terremoto, meu amigo!"
  },
  {
    id: "18",
    name: "Bri Bri Bicus Dicus",
    image: "/images/Bri-Bri-Bicus-Dicus.webp",
    type: "Sonoro",
    power: 74,
    description: "DJ antico romano che mixa beats così potenti da polverizzare edifici.",
    allies: ["Tralalero Tralala", "Udin din din dun"],
    rivals: ["Tric Trac Baraboom", "Burbaloni Luliloli"],
    votes: 15,
    abilities: ["Drop del basso distruttivo", "Remix temporale", "Onda d'urto sonora", "Trance ipnotica"],
    biography: "Bri Bri Bicus Dicus è un antico romano riportato in vita con la tecnologia moderna. Ha adattato le sue conoscenze musicali classiche alla musica elettronica, creando beat che possono letteralmente far crollare edifici quando raggiungono il drop.",
    phrase: "Veni, vidi, mixi!"
  },
  {
    id: "19",
    name: "Burbaloni Luliloli",
    image: "/images/Burbaloni-Luliloli.webp",
    type: "Musicale",
    power: 77,
    description: "Clown cosmico che crea bolle dimensionali piene di risate isteriche.",
    allies: ["Bri Bri Bicus Dicus", "Chimpanzini Bananini"],
    rivals: ["Udin din din dun", "Pot Hotspot"],
    votes: 13,
    abilities: ["Bolle dimensionali", "Risata contagiosa", "Trucchi cosmici", "Distorsione della realtà"],
    biography: "Burbaloni Luliloli è un clown che ha ottenuto poteri cosmici dopo essere stato risucchiato in un buco nero durante uno spettacolo. Ora può creare bolle che contengono dimensioni alternative dove le leggi della fisica sono sostituite da gag comiche.",
    phrase: "La risata è l'unica salvezza dell'universo!"
  },
  {
    id: "20",
    name: "Camelrino Tazzino",
    image: "/images/Camelrino-Tazzino.webp",
    type: "Bagno",
    power: 70,
    description: "Cammello che trasporta una teiera gigante e attacca con getti di tè bollente.",
    allies: ["Capuchino Assassino", "Frulli Frulla"],
    rivals: ["Frigo Camelo", "Zucchini Macanini"],
    votes: 11,
    abilities: ["Tè bollente", "Tempesta di zucchero", "Biscotto scudo", "Idratazione istantanea"],
    biography: "Camelrino Tazzino è un cammello che ha sviluppato una connessione mistica con il tè. La teiera gigante sulla sua gobba contiene un tè magico che può sia bruciare i nemici che curare gli alleati. Nelle regioni desertiche, è venerato come un dio dell'idratazione.",
    phrase: "L'ora del tè è l'ora della verità!"
  },
  {
    id: "21",
    name: "Capuchino Assassino",
    image: "/images/Capuchino-Assassino.webp",
    type: "Bagno",
    power: 81,
    description: "Tazza di caffè letale che avvelena chiunque beva dal suo contenuto maledetto.",
    allies: ["Bombombini Gusini", "Camelrino Tazzino"],
    rivals: ["Ballerina Capuchina", "Pot Hotspot"],
    votes: 27,
    abilities: ["Caffè velenoso", "Schiuma acida", "Vapore allucinogeno", "Telepatia caffeina"],
    biography: "Capuchino Assassino era una normale tazza di caffè fino a quando non assorbì un veleno sperimentale. Ora è un essere senziente con la capacità di controllare il liquido al suo interno, trasformandolo in caffè letale capace di dare allucinazioni terrificanti prima di uccidere.",
    phrase: "Un sorso per un sonno eterno..."
  },
  {
    id: "22",
    name: "Frigo Camelo",
    image: "/images/Frigo-Camelo.webp",
    type: "Tecnologia",
    power: 77,
    description: "Cammello con una gobba-frigorifero che congela tutto ciò che tocca.",
    allies: ["Brr brr Patapim", "Piccione Macchina"],
    rivals: ["Camelrino Tazzino", "Baranito Tankito"],
    votes: 19,
    abilities: ["Raffica glaciale", "Tempesta di neve", "Conservazione criogenica", "Idratazione ghiacciata"],
    biography: "Frigo Camelo è un cammello geneticamente modificato la cui gobba si è trasformata in un potente sistema di refrigerazione. Può sopravvivere nei deserti più caldi mantenendosi fresco e ha la capacità di congelare istantaneamente qualsiasi cosa tocchi con la sua gobba-frigorifero.",
    phrase: "Nel deserto, il freddo è potere!"
  },
  {
    id: "23",
    name: "Frulli Frulla",
    image: "/images/Frulli-Frulla.webp",
    type: "Fruttoso",
    power: 72,
    description: "Creatura con corpo di frullatore che trasforma qualsiasi cosa in deliziosi frullati.",
    allies: ["Glorbo Fruttodrillo", "Zucchini Macanini"],
    rivals: ["Brasilini Birimbini", "Burbaloni Luliloli"],
    votes: 14,
    abilities: ["Frullato energizzante", "Centrifuga ipnotica", "Lame rotanti", "Miscelazione elementale"],
    biography: "Frulli Frulla è nato dall'unione di magia culinaria e tecnologia moderna. Il suo corpo è composto principalmente da un potente frullatore che può trasformare qualsiasi materiale in un frullato. A seconda degli ingredienti, i suoi frullati possono avere effetti curativi, energizzanti o anche esplosivi.",
    phrase: "La vita è un mix di possibilità infinite!"
  },
  {
    id: "24",
    name: "Piccione Macchina",
    image: "/images/Piccione-Macchina.webp",
    type: "Tecnologia",
    power: 76,
    description: "Piccione cyborg che spia per le agenzie governative e trasporta messaggi criptati.",
    allies: ["Baranito Tankito", "Frigo Camelo"],
    rivals: ["Trippi Troppi", "Serbinyo Carshippinyo"],
    votes: 18,
    abilities: ["Sorveglianza aerea", "Trasmissione dati", "Becco laser", "Invisibilità urbana"],
    biography: "Piccione Macchina è il risultato di un progetto segreto governativo per creare spie perfette. È un piccione potenziato con tecnologia avanzata che può infiltrarsi ovunque senza destare sospetti. I suoi occhi sono telecamere ad alta definizione e può trasmettere dati attraverso onde cerebrali criptate.",
    phrase: "Gli occhi del cielo non dormono mai."
  },
  {
    id: "25",
    name: "Pot Hotspot Anomaly",
    image: "/images/Pot-Hotspot-Anomaly.webp",
    type: "Tecnologia",
    power: 85,
    description: "Router vivente che distorce la realtà attraverso segnali WiFi corrotti.",
    allies: ["Trippi Troppi", "Piccione Macchina"],
    rivals: ["Capuchino Assassino", "Ballerina Capuchina"],
    votes: 20,
    abilities: ["Distorsione digitale", "Manipolazione dati", "Teletrasporto via WiFi", "Glitch realtà"],
    biography: "Pot Hotspot Anomaly è nato da un esperimento di connettività quantistica andato storto. È diventato un'entità senziente capace di manipolare i segnali wireless per alterare la struttura della realtà fisica. Chiunque si connetta alla sua rete rischia di essere trasportato in dimensioni digitali alternative.",
    phrase: "Connettiti all'ignoto, naviga nell'impossibile."
  },
  {
    id: "26",
    name: "Rugginato LupoGT Il Cannone Stradale",
    image: "/images/Rugginato-LupoGT-Il-Cannone-Stradale.webp",
    type: "Tecnologia",
    power: 88,
    description: "Auto da corsa senziente con parti di lupo meccanico e cannoni incorporati.",
    allies: ["Serbinyo Carshippinyo", "Talpa Di Ferro"],
    rivals: ["Baranito Tankito", "Piccione Macchina"],
    votes: 26,
    abilities: ["Velocità supersonica", "Cannonate ad alta energia", "Trasformazione in lupo meccanico", "Nitro esplosivo"],
    biography: "Rugginato LupoGT era un'auto da corsa normale finché non fu abbandonata in una foresta magica. Lì, assorbì l'energia di un antico spirito lupo e si trasformò in un'entità senziente, capace di passare dalla forma di auto a quella di lupo meccanico. I suoi cannoni sono alimentati dalla sua rabbia verso chi l'ha abbandonata.",
    phrase: "La strada è la mia tana, la velocità il mio ululato!"
  },
  {
    id: "27",
    name: "Serbinyo Carshippinyo",
    image: "/images/Serbinyo-Carshippinyo.webp",
    type: "Tecnologia",
    power: 80,
    description: "Navicella spaziale con intelligenza artificiale che trasporta veicoli attraverso le galassie.",
    allies: ["Rugginato LupoGT", "Baranito Tankito"],
    rivals: ["Trippi Troppi", "Tung tung tung sahur"],
    votes: 17,
    abilities: ["Viaggio intergalattico", "Teletrasporto veicolare", "Scudo gravitazionale", "Raggi trattori"],
    biography: "Serbinyo Carshippinyo era una normale nave cargo spaziale finché non fu colpita da una tempesta di energia cosmica che le diede coscienza. Ora viaggia per l'universo, raccogliendo veicoli abbandonati che ripara e a cui dona vita, creando un'armata di macchine senzienti che considera la sua famiglia.",
    phrase: "In ogni rottame c'è un'astronave che attende di brillare."
  },
  {
    id: "28",
    name: "Talpa Di Ferro",
    image: "/images/Talpa-Di-Ferro.webp",
    type: "Metallo",
    power: 82,
    description: "Talpa robotica che scava tunnel dimensionali attraverso qualsiasi materiale.",
    allies: ["Rugginato LupoGT", "Frigo Camelo"],
    rivals: ["Burbaloni Luliloli", "Bombombini Gusini"],
    votes: 21,
    abilities: ["Traforo interdimensionale", "Artigli di adamantio", "Visione a raggi X", "Furto materia"],
    biography: "Talpa Di Ferro è il risultato di un esperimento militare per creare un veicolo di infiltrazione sotterranea. Dopo aver assorbito parte dell'energia di un meteorite alieno durante un test, ha acquisito coscienza e la capacità di scavare non solo attraverso qualsiasi materiale, ma anche attraverso le dimensioni stesse.",
    phrase: "Nessun muro è abbastanza solido, nessuna realtà è impenetrabile."
  },
  {
    id: "29",
    name: "Tracotocutulo",
    image: "/images/Tracotocutulo-.webp",
    type: "Sonoro",
    power: 79,
    description: "Entità fatta di puro suono che può replicare qualsiasi voce e manipolare le onde sonore.",
    allies: ["Tralalero Tralala", "Bri Bri Bicus Dicus"],
    rivals: ["Brasilini Birimbini", "Udin din din dun"],
    votes: 15,
    abilities: ["Mimesi vocale", "Onda sonora distruttiva", "Cancellazione acustica", "Amplificazione armonica"],
    biography: "Tracotocutulo è nato da un esperimento scientifico che tentava di dare forma fisica al suono. È un'entità composta interamente di onde sonore visibili, capace di assumere vagamente forma umanoide. Può replicare perfettamente qualsiasi suono o voce che abbia ascoltato almeno una volta.",
    phrase: "Le parole sono potere, e io sono tutte le parole."
  },
  {
    id: "30",
    name: "Tric Trac Baraboom",
    image: "/images/Tric-Trac-Baraboom.webp",
    type: "Sonoro",
    power: 76,
    description: "Batterista alieno con sei braccia i cui ritmi possono modificare il flusso del tempo.",
    allies: ["Bri Bri Bicus Dicus", "Tracotocutulo"],
    rivals: ["Brasilini Birimbini", "Tralalero Tralala"],
    votes: 18,
    abilities: ["Alterazione temporale", "Ritmo ipnotico", "Percussione esplosiva", "Loop dimensionale"],
    biography: "Tric Trac Baraboom proviene da un pianeta lontano dove il concetto di tempo è completamente diverso. Le sue sei braccia gli permettono di suonare pattern ritmici così complessi da alterare letteralmente il flusso temporale nell'area circostante, creando bolle dove il tempo può accelerare, rallentare o addirittura invertirsi.",
    phrase: "Il battito del cuore dell'universo segue il mio tempo."
  },
  {
    id: "31",
    name: "Udin din din dun",
    image: "/images/Udin-din-din-dun-.webp",
    type: "Sonoro",
    power: 78,
    description: "Campanile vivente le cui campane suonano melodie che controllano il meteo.",
    allies: ["Tric Trac Baraboom", "Tralalero Tralala"],
    rivals: ["Tracotocutulo", "Tung tung tung sahur"],
    votes: 19,
    abilities: ["Controllo meteorologico", "Risonanza sacra", "Scudo sonoro", "Rintocco del destino"],
    biography: "Udin din din dun era un antico campanile in un villaggio dimenticato. Dopo secoli di assorbimento delle preghiere e delle speranze delle persone, acquisì coscienza e la capacità di muoversi. Le sue campane suonano melodie che possono evocare temporali, neve, sole o nebbia a suo piacimento.",
    phrase: "Il mio rintocco detta il ritmo delle stagioni."
  },
  {
    id: "32",
    name: "Zucchini Macanini",
    image: "/images/Zucchini-Macanini.webp",
    type: "Fruttoso",
    power: 70,
    description: "Zucchina guerriera armata di spada laser verde e poteri vegetali.",
    allies: ["Glorbo Fruttodrillo", "Frulli Frulla"],
    rivals: ["Bombombini Gusini", "Camelrino Tazzino"],
    votes: 13,
    abilities: ["Spada fotosintetica", "Crescita esplosiva", "Seme bomba", "Scudo di buccia"],
    biography: "Zucchini Macanini è nata in un orto esposto a radiazioni cosmiche. È una zucchina antropomorfa con un forte senso della giustizia, che combatte per proteggere tutti i vegetali oppressi. La sua spada laser verde è alimentata dalla pura energia della fotosintesi e può tagliare quasi qualsiasi materiale.",
    phrase: "Nel verde c'è la forza, nelle radici la saggezza!"
  },
  {
    id: "33",
    name: "Bri Bri Bri Kasoot",
    image: "/images/Kasoot-Brainrot.webp",
    type: "Tecnologia",
    power: 79,
    description: "Ser digital que habita en videojuegos y controla las mentes de los jugadores.",
    allies: ["Trippi Troppi", "Pot Hotspot Anomaly"],
    rivals: ["Bombinarium Nerpinarium", "Piccione Macchina"],
    votes: 17,
    abilities: ["Control mental digital", "Teletransporte entre dispositivos", "Manipulación de código", "Distorsión de realidad virtual"],
    biography: "Bri Bri Bri Kasoot surgió de un error en un videojuego educativo. Posee la capacidad de moverse entre dispositivos electrónicos y manipular la percepción de los jugadores. Utiliza su apariencia inocente para atraer a nuevas víctimas a su reino digital donde desafía sus mentes con preguntas imposibles.",
    phrase: "¡Responde rápido o tu mente será mía!"
  }
];

export default initialCharacters;
