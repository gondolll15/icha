/* =========================================
   BIRTHDAY WEBSITE
   MAIN JAVASCRIPT - FULL VERSION
   DARK ROMANTIC + 3D PHOTO COLLAGE
========================================= */


/* =========================================
   1. NAVIGASI SCREEN
========================================= */

const screens = document.querySelectorAll(".screen");

function showScreen(id) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active");
    }

}


/* =========================================
   2. LOVE MODE
========================================= */

const loveToggle = document.getElementById("loveToggle");

if (loveToggle) {

    loveToggle.addEventListener("click", function () {

        if (loveToggle.classList.contains("on")) return;

        loveToggle.classList.add("on");

        const toggleText =
            loveToggle.querySelector(".toggle-text");

        if (toggleText) {
            toggleText.textContent = "ON";
        }

        loveToggle.disabled = true;

        setTimeout(() => {

            showScreen("gameScreen");

            loveToggle.disabled = false;

        }, 900);

    });

}


/* =========================================
   3. TIC TAC TOE
========================================= */

let gameOver = false;

let board = Array(9).fill("");

const cells = document.querySelectorAll(".cell");

const gameStatus =
    document.getElementById("gameStatus");

const replayBtn =
    document.getElementById("replayBtn");


const winningPatterns = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


function getWinner(player) {

    return winningPatterns.find(pattern =>
        pattern.every(index => board[index] === player)
    );

}


function renderBoard() {

    cells.forEach((cell, index) => {

        cell.innerHTML = "";

        if (board[index] === "X") {

            cell.innerHTML =
                '<span class="x-symbol">×</span>';

        } else if (board[index] === "O") {

            cell.innerHTML =
                '<span class="o-symbol">○</span>';

        }

        cell.disabled =
            board[index] !== "" || gameOver;

    });

}


/* GILIRAN PEMAIN */

function playerMove(index) {

    if (gameOver || board[index] !== "") return;

    board[index] = "X";

    renderBoard();

    const xWin = getWinner("X");

    if (xWin) {

        finishGame(xWin);

        return;

    }

    if (gameStatus) {
        gameStatus.textContent = "O is thinking...";
    }

    setTimeout(computerMove, 650);

}


/* =========================================
   KOMPUTER BERMAIN O
   SENGAJA MEMBERI KESEMPATAN X MENANG
========================================= */

function computerMove() {

    if (gameOver) return;

    const available = board
        .map((value, index) =>
            value === "" ? index : null
        )
        .filter(index => index !== null);


    if (available.length === 0) {

        if (gameStatus) {
            gameStatus.textContent = "Try again ❤️";
        }

        return;

    }


    const safeMoves = available.filter(index => {

        const trial = [...board];

        trial[index] = "O";


        // Hindari langkah yang membuat O menang.

        const oWins = winningPatterns.some(pattern =>
            pattern.every(i => trial[i] === "O")
        );

        if (oWins) return false;


        // Jangan menghalangi kemenangan X.

        const blocksX = winningPatterns.some(pattern => {

            const xCount = pattern.filter(
                i => board[i] === "X"
            ).length;

            const emptyCount = pattern.filter(
                i => board[i] === ""
            ).length;

            return (
                xCount === 2 &&
                emptyCount === 1 &&
                pattern.includes(index)
            );

        });

        return !blocksX;

    });


    const choices = safeMoves.length > 0
        ? safeMoves
        : available;


    const selected = choices[
        Math.floor(Math.random() * choices.length)
    ];


    board[selected] = "O";

    renderBoard();

    if (gameStatus) {
        gameStatus.textContent = "Your turn";
    }

}


cells.forEach((cell, index) => {

    cell.addEventListener("click", () => {
        playerMove(index);
    });

});


/* =========================================
   4. MENANG
========================================= */

function finishGame(pattern) {

    gameOver = true;

    cells.forEach(cell => {
        cell.disabled = true;
    });


    pattern.forEach(index => {
        cells[index].classList.add("winner-cell");
    });


    if (gameStatus) {
        gameStatus.textContent =
            "You won !!";
    }


    if (replayBtn) {
        replayBtn.style.display = "none";
    }


    setTimeout(() => {

        showScreen("winnerScreen");

        setTimeout(() => {
            startIntensity();
        }, 2200);

    }, 1000);

}


function resetGame() {

    board = Array(9).fill("");

    gameOver = false;


    cells.forEach(cell => {
        cell.classList.remove("winner-cell");
    });


    if (gameStatus) {
        gameStatus.textContent = "Your turn";
    }


    if (replayBtn) {
        replayBtn.style.display = "none";
    }


    renderBoard();

}


if (replayBtn) {
    replayBtn.addEventListener("click", resetGame);
}


/* =========================================
   5. LOVE INTENSITY
========================================= */

function startIntensity() {

    showScreen("intensityScreen");

    const percentage = 100;

    const number =
        document.getElementById("percentage");

    const progress =
        document.getElementById("progressFill");

    const gauge =
        document.getElementById("gaugeProgress");

    const pointer =
        document.getElementById("gaugePointer");


    const circumference = 424.1;

    let count = 0;


    if (number) {

        number.textContent = "0";

        const interval = setInterval(() => {

            count++;

            number.textContent = count;

            if (count >= percentage) {
                clearInterval(interval);
            }

        }, 4000 / percentage);

    }


    setTimeout(() => {

        if (gauge) {

            gauge.style.strokeDashoffset =
                circumference * (1 - percentage / 100);

        }


        if (progress) {
            progress.style.width = percentage + "%";
        }


        if (pointer) {

            pointer.style.transform =
                `translateX(-50%) rotate(${-90 + percentage * 1.8}deg)`;

            pointer.style.transformOrigin = "50% 0%";

        }

    }, 100);


    setTimeout(() => {
        showGreeting();
    }, 5000);

}


/* =========================================
   6. HAPPY BIRTHDAY
========================================= */

function showGreeting() {

    showScreen("greetingScreen");

    const greeting = "Happy\nBirthday Icha";

    const element =
        document.getElementById("greetingText");


    if (!element) {

        showGallery();

        return;

    }


    element.textContent = "";

    let index = 0;


    function typeText() {

        if (index < greeting.length) {

            element.textContent += greeting[index];

            index++;

            setTimeout(typeText, 110);

        } else {

            setTimeout(() => {
                showGallery();
            }, 3500);

        }

    }


    typeText();

}


/* =========================================
   7. KONFIGURASI FOTO DAN MUSIK
   EDIT BAGIAN INI SAJA
========================================= */

const CONFIG = {

    photos: [

        "1.jpeg",
        "2.jpeg",
        "3.jpeg",
        "4.jpeg",
        "5.jpeg",
        "6.jpeg",
        "7.jpeg",
        "8.jpeg",
        "9.jpeg",
        "10.jpeg",
        "11.jpeg",
        "12.jpeg",
        "13.jpeg",
        "14.jpeg",
        "15.jpeg",
        "16.jpeg",
        "17.jpeg",
        "18.jpeg",
        "19.jpeg",
        "20.jpeg",
        "21.jpeg",
        "22.jpeg",
        "23.jpeg",
        "24.jpeg"

    ],

    // GANTI DENGAN LOKASI FILE MUSIK KAMU
    music: "music/fe.mp3"

};


/* =========================================
   8. MEMBUAT GALERI FOTO
   COLLAGE + 3D ROTATION
========================================= */

const photoGallery =
    document.getElementById("photoGallery");


let photoCarousel = null;


function buildGallery() {

    if (!photoGallery) return;


    // Hapus galeri sebelumnya.

    photoGallery.innerHTML = "";


    // Buat pembungkus foto.

    photoCarousel = document.createElement("div");

    photoCarousel.className = "photo-carousel";


    // Buat semua foto.

    CONFIG.photos.forEach((photo, index) => {

        const frame = document.createElement("div");

        frame.className = "polaroid";


        const img = document.createElement("img");

        img.src = photo;

        img.alt = `Memory ${index + 1}`;

        img.loading = "lazy";


        // Sembunyikan foto jika file tidak ditemukan.

        img.onerror = () => {
            frame.style.display = "none";
        };


        frame.appendChild(img);


        // Klik foto untuk membuka lightbox.

        frame.addEventListener("click", () => {

            openLightbox(photo);

        });


        photoCarousel.appendChild(frame);

    });


    photoGallery.appendChild(photoCarousel);

}


// Jalankan galeri satu kali.

buildGallery();


/* =========================================
   9. LIGHTBOX FOTO
========================================= */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");


function openLightbox(src) {

    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = src;

    lightbox.classList.add("show");


    // Hentikan animasi saat foto dibuka.

    if (photoCarousel) {
        photoCarousel.style.animationPlayState = "paused";
    }

}


function closeLightbox() {

    if (lightbox) {
        lightbox.classList.remove("show");
    }


    // Lanjutkan animasi galeri.

    if (photoCarousel) {
        photoCarousel.style.animationPlayState = "running";
    }

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

}


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeLightbox();
    }

});


/* =========================================
   10. TOMBOL MUSIK
========================================= */

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");


function updateMusicButton(isPlaying) {

    if (!musicButton) return;

    musicButton.innerHTML = isPlaying
        ? '♫ <span>Pause Music</span>'
        : '♫ <span>Play Music</span>';

}


/* =========================================
   11. MENAMPILKAN GALERI
========================================= */

function showGallery() {

    showScreen("galleryScreen");


    if (!backgroundMusic) return;


    if (CONFIG.music) {

        backgroundMusic.src = CONFIG.music;

        backgroundMusic.loop = true;


        backgroundMusic.play()

            .then(() => {

                updateMusicButton(true);

            })

            .catch(() => {

                updateMusicButton(false);

            });

    }

}


/* =========================================
   12. KONTROL PLAY DAN PAUSE MUSIK
========================================= */

if (musicButton && backgroundMusic) {

    musicButton.addEventListener(
        "click",
        async () => {

            if (backgroundMusic.paused) {

                try {

                    await backgroundMusic.play();

                    updateMusicButton(true);

                } catch (error) {

                    updateMusicButton(false);

                }

            } else {

                backgroundMusic.pause();

                updateMusicButton(false);

            }

        }
    );

}


/* =========================================
   13. SELESAI
========================================= */

renderBoard();
// =========================================
// EXTRA DESIGN - PERSONAL BIRTHDAY MESSAGE
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const galleryHeading = document.querySelector(".gallery-heading");

    if (!galleryHeading) return;

    // Hindari membuat pesan dua kali.
    if (document.querySelector(".birthday-note")) return;

    const note = document.createElement("div");

    note.className = "birthday-note";

    note.innerHTML = `
        <span class="note-decoration">୨୧ ♡ ୨୧</span>

        <p>
            Happy Birthday, Icha
            <br>
            Semoga hari-harimu selalu dipenuhi
            kebahagiaan, tawa, dan hal-hal indah.
            <br>
            Jangan pernah berhenti menjadi dirimu
            yang luar biasa. Semoga semua impian
            dan harapanmu perlahan menjadi nyata.
            <br>
            Semoga dilancarkan rezekinya,
            tetap jadi orang baik dan sukses selalu
            perjalanan hidupmu.
        </p>

        <span class="note-signature">
            HAPPY BIRTHDAY ICHA
        </span>
    `;

    galleryHeading.insertAdjacentElement("afterend", note);

});
/* =========================================
   HAPPY BIRTHDAY CLICK SURPRISE
========================================= */

const birthdayTitle = document.getElementById("greetingText");

// Membuat popup otomatis.
const birthdayPopup = document.createElement("div");

birthdayPopup.className = "birthday-popup";

birthdayPopup.innerHTML = `
    <div class="popup-card">
        <div class="popup-heart">♡</div>

        <h2>Happy Birthday, Icha!</h2>

        <p>
            Hari ini adalah hari spesialmu.
            Semoga kebahagiaan selalu menemanimu,
            impianmu menjadi nyata, dan setiap
            langkahmu dipenuhi hal-hal baik.

            <br><br>

            Keep shining, Icha!
            You deserve all the beautiful things
            in this world. ♡
        </p>

        <button class="popup-close" type="button">
            Thank You ♡
        </button>
    </div>
`;

document.body.appendChild(birthdayPopup);

const closeBirthdayPopup =
    birthdayPopup.querySelector(".popup-close");

// Ketika tulisan diklik.
if (birthdayTitle) {
    birthdayTitle.setAttribute("role", "button");
    birthdayTitle.setAttribute("tabindex", "0");
    birthdayTitle.setAttribute("aria-label", "Open birthday surprise");

    birthdayTitle.addEventListener("click", showBirthdaySurprise);

    birthdayTitle.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            showBirthdaySurprise();
        }
    });
}

function showBirthdaySurprise() {
    birthdayPopup.classList.add("show");
    createFloatingHearts();
}

function createFloatingHearts() {
    for (let i = 0; i < 18; i++) {
        const heart = document.createElement("span");

        heart.className = "floating-heart";
        heart.textContent = ["♡", "♥", "✿", "✧"][i % 4];

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = (55 + Math.random() * 35) + "vh";
        heart.style.animationDelay = Math.random() * .7 + "s";

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 3500);
    }
}

// Tombol tutup.
closeBirthdayPopup.addEventListener("click", () => {
    birthdayPopup.classList.remove("show");
});

// Klik bagian luar popup untuk menutup.
birthdayPopup.addEventListener("click", event => {
    if (event.target === birthdayPopup) {
        birthdayPopup.classList.remove("show");
    }
});

// Tombol Escape.
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        birthdayPopup.classList.remove("show");
    }
});