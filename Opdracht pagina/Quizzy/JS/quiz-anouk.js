//images array
//dictionary van de vragen en antwoorden
//array van variabelen dictionaries ([vraag1, vraag2])
//variabelen elements
//forloop i < length array
//in de forloop ifstatements voor checken goed antwoord



const imagesArray = ["vraag1_neurodiversiteit.jpg", "vraag2_positivo.jpg", "vraag3_nietneuro.jpeg", "vraag4_acoustic.jpg", "vraag5_handjes.jpg", "vraag6_ondersteuning.jpg", "vraag7_audhd.png", "vraag8_generaties.jpg", "vraag9_praxis.jpg", "vraag10_para.jpg"];

const vraag1 = {vraag:"Wat is de definitie van neurodiversiteit?", a:"Dat zijn mensen met ADHD en Autisme", b:"Alle manieren waarop een brein anders kan zijn dan gemiddeld", c:"Het betekend gewoon dat je een dom kindje bent", goed:"b"};
const vraag2 = {vraag:"Welke van de volgende is een positieve uitkomst van neurodiversiteit?", a:"Je bent je sterk bewust van alles wat er om je heen gebeurd", b:"Je hebt moeite met sociale contacten opbouwen", c:"Je kunt op een unieke manier oplossingen bedenken", goed:"c"};
const vraag3 = {vraag:"Welke van de volgende is NIET een neurodiversiteit?", a:"Dementie", b:"Depressie", c:"Dyslexie", goed:"a"};
const vraag4 = {vraag:"Hoe kun je autisme herkennen?", a:"Hij/zij is heel erg goed in wiskunde", b:"Hij/zij is verstorend in de les", c:"Hij/zij is terughoudend in sociale interacties", goed:"c"};
const vraag5 = {vraag:"Welke van de volgende is NIET een neurodiversiteit?", a:"Hoog IQ", b:"Tourettes", c:"Syndroom van Down", goed:"a"};
const vraag6 = {vraag:"Wat is een simpele manier om mensen met een neurodiversiteit te ondersteunen?", a:"Samen een planning maken", b:"Een rustige werkomgeving bieden", c:"Straffen als ze hun werk niet op tijd af hebben", goed:"b"};
const vraag7 = {vraag:"Welke van de volgende is een overlappend symptoom van ADHD en Autisme?", a:"Aandachtsproblemen", b:"Sterk gevoel van rechtvaardigheid", c:"Behoefte aan voorspelbaarheid", goed:"b"};
const vraag8 = {vraag:"Is neurodiversiteit erfelijk?", a:"Ja", b:"Niet allemaal", c:"Nee", goed:"b"};
const vraag9 = {vraag:"Wat is dyspraxie?", a:"Een stoornis die lichamelijke motoriek moeilijker maakt", b:"Een stoornis die het moeilijk maakt om naar de praxis te gaan", c:"Een stoornis die het begrijpen van taal moeilijker maakt", goed:"a"};
const vraag10 = {vraag:"Welke van de volgende wordt gekarakteriseerd door obsessief, repetitief gedrag?", a:"Depressie", b:"Schizofrenie", c:"OCD", goed:"c"};

const vraaginhoud = [vraag1, vraag2, vraag3, vraag4, vraag5, vraag6, vraag7, vraag8, vraag9, vraag10];

let vraagNummer = 0;

function laadVraagIn(){
    const image = document.getElementById("plaatje");
    const vraagbox = document.getElementById("vraag");
    const buttonA = document.getElementById("antwoord1");
    const buttonB = document.getElementById("antwoord2");
    const buttonC = document.getElementById("antwoord3");

    let imgurl = imagesArray[vraagNummer];
    image.setAttribute("src", "media/images/" + imgurl);

    vraagbox.textContent = vraaginhoud[vraagNummer].vraag
    buttonA.textContent = vraaginhoud[vraagNummer].a
    buttonB.textContent = vraaginhoud[vraagNummer].b
    buttonC.textContent = vraaginhoud[vraagNummer].c

    hideButton();
    hideText();
}

function checkAntwoord(gebruikerAntwoord){
    let controle = document.getElementById("controle");
    let correct = vraaginhoud[vraagNummer].goed;
    if (gebruikerAntwoord === correct){
        controle.textContent = "Dat is correct!";
        showButton();
    }
    else if (gebruikerAntwoord != correct){
        controle.textContent = "Dat is helaas fout";
    }
}

function showButton(){
    const verder = document.getElementById("verder");
    verder.style.display = "block"
}

function hideButton(){
    const verder = document.getElementById("verder");
    verder.style.display = "none"
}

function hideText(){
    let controle = document.getElementById("controle");
    controle.textContent = ""
}

function volgendeVraag(){
    if (vraagNummer < 9){
        vraagNummer += 1;
        laadVraagIn();
    }
    else{
        laadEindeQuizIn();
        hideButton();
        hideText();
    }
}

function laadEindeQuizIn(){
    const image = document.getElementById("plaatje");
    const vraagbox = document.getElementById("vraag");
    const buttonA = document.getElementById("button1");
    const buttonB = document.getElementById("button2");
    const buttonC = document.getElementById("button3");
    const naarInfo = document.getElementById("naar_info");

    image.setAttribute("src", "media/images/thanks_for_playing.jpg");

    vraagbox.textContent = "Bedankt voor het spelen van mijn quiz!";

    naarInfo.style.display = "block";

    buttonA.style.display = "none";
    buttonB.style.display = "none";
    buttonC.style.display = "none";
}

window.addEventListener('load', () => {
    laadVraagIn();
});
