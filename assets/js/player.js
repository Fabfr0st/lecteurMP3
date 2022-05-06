const prev = document.getElementById("prev");
const plause = document.getElementById("plause");
const next = document.getElementById("next");
const playerApp = document.getElementById("playerApp");
const cover = document.querySelector("#cover>img");
const coverBox = document.getElementById("cover");
const logo = document.getElementById("logo");
const tbPlaylist = [{
        mp3: "its-bigger-than-hip-hop-dead-prez.mp3",
        cover: "coverDeadPrez.jpg",
        title: "It's bigger than Hip Hop",
        artiste: "Dead Prez",
        genre: "Hip Hop",
        annee: 1998,
        desc: "blblablablbl qsdgkq",
        prix: 20
    },
    {
        mp3: "soul-of-mischief-93-til-infinity.mp3",
        cover: "coverSoulOf.jpg",
        title: "93 til infinity",
        artiste: "Soul Of Mischief",
        genre: "Hip Hop",
        annee: 1993,
        desc: "blblablablbl qsdgkq",
        prix: 30
    },
    {
        mp3: "the-pharcyde-passin-me-by.mp3",
        cover: "coverPharcyde.jpg",
        title: "Passin me by",
        artiste: "The Pharcyde",
        genre: "Hip Hop",
        annee: 1993,
        desc: "blblablablbl qsdgkq",
        prix: 40
    }
];
let currentTrack = 0;
const audio = new Audio("./assets/audio/" + tbPlaylist[currentTrack].mp3);
let mc = new Hammer(playerApp);

/* function trackSuiv(trackToPlay) {
    trackToPlay++;
    if (trackToPlay > tbPlaylist.length - 1) {
        trackToPlay = 0;
    }
    audio.src = "./assets/audio/" + tbPlaylist[trackToPlay].mp3;
    cover.src = "./assets/cover/" + tbPlaylist[trackToPlay].cover;
    console.log(currentTrack);
    console.log(audio);
    return trackToPlay;
};

function trackPrec(trackToPlay) {
    trackToPlay--;
    if (trackToPlay < 0) {
        trackToPlay = tbPlaylist.length - 1;
    }
    audio.src = "./assets/audio/" + tbPlaylist[trackToPlay].mp3;
    cover.src = "./assets/cover/" + tbPlaylist[trackToPlay].cover;
    console.log(currentTrack);
    console.log(audio);
    return trackToPlay;
}; */

function chgtTrack(trackToPlay, ordre) {
    if (ordre === 's') {
        trackToPlay++;
        if (trackToPlay > tbPlaylist.length - 1) {
            trackToPlay = 0;
        }
    } else if (ordre === 'p') {
        trackToPlay--;
        if (trackToPlay < 0) {
            trackToPlay = tbPlaylist.length - 1;
        }
    }
    audio.src = "./assets/audio/" + tbPlaylist[trackToPlay].mp3;
    changeCover(trackToPlay);
    cover.alt = tbPlaylist[trackToPlay].title;
    plause.src = "./assets/img/pause-circle-regular.svg";
    audio.play();
    logo.classList.add("tourne");
    return trackToPlay;
};

function playpause() {
    logo.classList.toggle("tourne");
    if (audio.paused) {
        audio.play();
        plause.src = "./assets/img/pause-circle-regular.svg";
    } else {
        audio.pause();
        plause.src = "./assets/img/play-circle-solid.svg";
    };
};

function changeCover(track) {
    /*     let newImage = document.createElement('img');
        coverBox.append(newImage);
        newImage.style.position = "absolute";
        newImage.src = "./assets/cover/" + tbPlaylist[track].cover; */
    gsap.to(cover, {
        duration: .5,
        ease: "circ.out",
        x: -400,
        onComplete: ()=> {
            cover.src = "./assets/cover/" + tbPlaylist[track].cover;
            gsap.to(cover, {
                duration: .5,
                ease: "circ.out",
                x: 0
            });
        }
    });
    //cover.src = "./assets/cover/" + tbPlaylist[track].cover;
    /*     cover.classList.add("coverSuiv");
        cover.addEventListener("animationend", function(){
            cover.classList.remove("coverSuiv"); 
        }); */
    //cover.style.position = "absolute";
};

cover.src = "./assets/cover/" + tbPlaylist[currentTrack].cover;
cover.alt = tbPlaylist[currentTrack].title;

/* mc.get('pan').set({
    direction: Hammer.Direction_ALL
});
 */
mc.on("swiperight swipeleft swipeup swipedown", function (event) {
    if (event.type === "swiperight") {
        currentTrack = chgtTrack(currentTrack, 's');
    };
    if (event.type === "swipeleft") {
        currentTrack = chgtTrack(currentTrack, 'p');
    };
});

plause.addEventListener("click", () => {
    playpause();
});

next.addEventListener("click", () => {
    currentTrack = chgtTrack(currentTrack, 's');
});

prev.addEventListener("click", () => {
    currentTrack = chgtTrack(currentTrack, 'p');
});



document.body.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowRight":
            currentTrack = chgtTrack(currentTrack, 's');
            break;
        case "ArrowLeft":
            currentTrack = chgtTrack(currentTrack, 'p');
            break;
        case " ":
            playpause();
            break;
        default:
            break;
    }
});