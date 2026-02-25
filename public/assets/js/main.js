// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    orderBy, 
    limit, 
    startAfter, 
    serverTimestamp,
    getCountFromServer
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// TODO: Replace with your actual Firebase config from FIREBASE_SETUP.md
const firebaseConfig = {
    apiKey: "AIzaSyB_33gDoMfvxHUML4NAugG-F7u0bQIS3bg",
    authDomain: "hung-trang-wedding.firebaseapp.com",
    projectId: "hung-trang-wedding",
    storageBucket: "hung-trang-wedding.firebasestorage.app",
    messagingSenderId: "104909916588",
    appId: "1:104909916588:web:b6b633145bb9764db45209"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const wishesCol = collection(db, "wishes");

const main = () => {
    // init interval to reload background image
    intervalBgImg(20_000);
}

const POOL_IMG_BG = [
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939760/IMG_2446_f6mz4k.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939757/IMG_2769_vgonpp.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939682/IMG_2681_mrfvri.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939667/IMG_1724_jo9fwx.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939847/IMG_1735_owmgi8.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939846/IMG_1676_etvdzy.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939845/IMG_1816_wuxtwe.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939844/IMG_2391_b1glk6.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939843/IMG_2818_euv8wn.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939843/IMG_2833_mah1yc.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939842/IMG_2573_sfe46i.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939840/IMG_2726_dhnm08.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939840/IMG_2647_xaai3w.webp',
    // 'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939839/IMG_2521_ssiibv.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939838/IMG_2632_zs9a7u.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939838/IMG_2690_sgznqt.webp',
    // 'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939837/IMG_2586_d9cybq.webp',
    'https://res.cloudinary.com/dyddjhxa3/image/upload/v1771939837/IMG_2660_nocvvh.webp',
];

const intervalBgImg = (loopTime) => {
    const bgImage = document.getElementById('bg-img');
    if (!bgImage || POOL_IMG_BG.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * POOL_IMG_BG.length);
    const imageUrl = POOL_IMG_BG[randomIndex];
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
        bgImage.style.opacity = 0;
        setTimeout(() => {
            bgImage.src = imageUrl;
            bgImage.style.opacity = 1;
        }, 500);
    };
    setTimeout(() => intervalBgImg(loopTime), loopTime);
}

const timeOut = (callback, delay = 0) => {
    let clear = null;
    const c = () => {
        callback();
        clearTimeout(clear);
        clear = null;
    };

    clear = setTimeout(c, delay);
};

const countDownDate = () => {
    const count = (new Date('2026/03/30').getTime());
    const pad = (num) => num < 10 ? `0${num}` : `${num}`;

    const day = document.getElementById('day');
    const hour = document.getElementById('hour');
    const minute = document.getElementById('minute');
    const second = document.getElementById('second');

    if (!day || !hour || !minute || !second) return;

    const updateCountdown = () => {
        const distance = Math.abs(count - Date.now());

        day.textContent = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
        hour.textContent = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        minute.textContent = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        second.textContent = pad(Math.floor((distance % (1000 * 60)) / 1000));

        timeOut(updateCountdown, 1000 - (Date.now() % 1000));
    };

    timeOut(updateCountdown);
}

const audioLoad = async () => {
    const statePlay = '<i class="fa-solid fa-circle-pause spin-button"></i>';
    const statePause = '<i class="fa-solid fa-circle-play"></i>';
    const dataAudio = './assets/music/sound-mp3.mp3';

    let audioEl = null;
    try {
        audioEl = new Audio(dataAudio);
        audioEl.loop = true;
    } catch (err) {
        console.error('Error on play audio ' + err);
        return;
    }
    
    let isPlay = false;
    const music = document.getElementById('button-music');
    if (!music) return;

    const play = async () => {
        if (!navigator.onLine) return;
        music.disabled = true;
        try {
            await audioEl.play();
            isPlay = true;
            music.disabled = false;
            music.innerHTML = statePlay;
        } catch (err) {
            isPlay = false;
            music.disabled = false;
        }
    };

    const pause = () => {
        isPlay = false;
        audioEl.pause();
        music.innerHTML = statePause;
    };

    music.addEventListener('click', () => isPlay ? pause() : play());
}

// --- WISHES LOGIC ---

let lastDoc = null;
const PAGE_SIZE = 5;

const renderWishes = (wishes) => {
    const container = document.getElementById('comments');
    if (!container) return;

    if (wishes.length === 0) {
        container.innerHTML = '<div class="text-center text-secondary py-3">Chưa có lời chúc nào. Hãy là người đầu tiên!</div>';
        return;
    }

    const html = wishes.map(wish => `
        <div class="bg-theme-auto rounded-4 shadow-sm p-3 mb-3 border animate-love" data-aos="fade-up">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="m-0 fw-bold text-primary"><i class="fa-solid fa-user-circle me-2"></i>${wish.name}</h6>
                <small class="text-secondary" style="font-size: 0.75rem;">${wish.createdAt ? new Date(wish.createdAt.toDate()).toLocaleDateString('vi-VN') : 'Vừa xong'}</small>
            </div>
            <p class="m-0 text-secondary" style="font-size: 0.9rem; line-height: 1.5;">${wish.message}</p>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

const renderPagination = (totalCount, currentPage) => {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="btn btn-sm mx-1 rounded-circle ${i === currentPage ? 'btn-primary shadow' : 'btn-outline-secondary'}" 
                 onclick="fetchWishes(${i})">${i}</button>`;
    }
    pagination.innerHTML = html;
}

const fetchWishes = async (page = 1) => {
    const container = document.getElementById('comments');
    container.innerHTML = '<div class="text-center text-secondary py-3">Đang tải lời chúc...</div>';

    try {
        // Get total count for pagination
        const snapshotCount = await getCountFromServer(wishesCol);
        const totalCount = snapshotCount.data().count;

        // Fetch wishes
        let q = query(wishesCol, orderBy("createdAt", "desc"), limit(PAGE_SIZE));
        
        // Handle pagination logic (simplified for small data)
        const snapshot = await getDocs(q);
        const wishes = snapshot.docs.map(doc => doc.data());
        
        renderWishes(wishes);
        renderPagination(totalCount, page);
    } catch (error) {
        console.error("Error fetching wishes: ", error);
        container.innerHTML = '<div class="text-center text-danger py-3">Không thể tải lời chúc. Vui lòng thử lại sau!</div>';
    }
}

const sendWish = async () => {
    const nameInput = document.getElementById('form-name');
    const messageInput = document.getElementById('form-comment');
    const btnSend = document.getElementById('btn-send-wish');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        alert("Vui lòng nhập tên và lời chúc của bạn!");
        return;
    }

    btnSend.disabled = true;
    btnSend.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Đang gửi...';

    try {
        await addDoc(wishesCol, {
            name: name,
            message: message,
            createdAt: serverTimestamp()
        });

        nameInput.value = '';
        messageInput.value = '';
        alert("Cảm ơn bạn đã gửi lời chúc!");
        fetchWishes(1); // Reload first page
    } catch (error) {
        console.error("Error sending wish: ", error);
        alert("Có lỗi xảy ra khi gửi lời chúc. Vui lòng thử lại!");
    } finally {
        btnSend.disabled = false;
        btnSend.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Gửi';
    }
}

window.addEventListener("DOMContentLoaded", () => {
    main();
    countDownDate();
    audioLoad();
    
    // Init Wishes
    fetchWishes(1);

    const btnSend = document.getElementById('btn-send-wish');
    if (btnSend) {
        btnSend.addEventListener('click', sendWish);
    }

    const modalElement = document.getElementById('modal-image');
    if (modalElement) {
        const imageModal = new bootstrap.Modal(modalElement);
        window.openModal = function (img) {
            document.getElementById('button-modal-click').href = img.src;
            document.getElementById('show-modal-image').src = img.src;
            imageModal.show();
        };
    }
});

// To handle onclick in pagination (since we are in a module)
window.fetchWishes = fetchWishes;
