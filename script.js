// Layar Pembuka (Splash Screen)
// Bagian ini mengatur animasi layar pembuka saat halaman dimuat dan saat tombol diklik.
document.addEventListener("DOMContentLoaded", function () {
	document.body.classList.add("no-scroll"); // Disable scrolling initially

	let isAnimating = false; // Prevent multiple animations

	function changeSplashImage() {
		if (!isAnimating) {
			document.getElementById("splash-img").src = "Hamster_IP/splash/splash-anim.gif";
		}
	}

	function resetSplashImage() {
		if (!isAnimating) {
			document.getElementById("splash-img").src = "Hamster_IP/splash/splash-anim.png";
		}
	}

	document.getElementById("enter-site").addEventListener("click", function () {
		let image = document.getElementById("splash-img");
		let splashScreen = document.getElementById("splash-screen");

		isAnimating = true;
		image.src = "Hamster_IP/splash/splash-anim.gif"; // Switch to GIF animation

		setTimeout(() => {
			splashScreen.style.display = "none"; // Hide splash screen
			document.body.classList.remove("no-scroll"); // Enable scrolling
			isAnimating = false;
		}, 1750); // 1.75 seconds
	});
});

// Alamat Koin (Coin Address)
// Bagian ini mengatur fungsi untuk menyalin alamat koin ke clipboard dan menampilkan tooltip.
function copyToClipboard() {
	const text = "6DPir6seFE4ZxZTFa96tjLUosWTfGu4Cagc19JdMpump"; // Alamat koin yang akan disalin
	navigator.clipboard.writeText(text).then(() => {
		// Menyalin teks ke clipboard
		const tooltip = document.getElementById("tooltip");
		tooltip.classList.add("show-tooltip"); // Menampilkan tooltip "Coin address copied"

		setTimeout(() => {
			// Menyembunyikan tooltip setelah 1,5 detik
			tooltip.classList.remove("show-tooltip");
		}, 1500);
	});
}

// Menu Responsif
// Bagian ini mengatur fungsi untuk membuka/tutup menu sosial pada tampilan responsif.
function toggleMenu() {
	document.querySelector(".socials-list").classList.toggle("active"); // Mengaktifkan/menonaktifkan daftar sosial
	document.querySelector(".menu-toggle").classList.toggle("active"); // Mengaktifkan/menonaktifkan ikon toggle
}

// Frasa Acak (Random Phrase)
// Bagian ini menampilkan frasa acak di halaman saat halaman dimuat.
document.addEventListener("DOMContentLoaded", () => {
	const phrases = [
		"I’m not slow, I’m just calculating each step... very thoroughly!",
		"Why does everyone assume I’m lost? I’m just pacing myself!",
		"I may be slow, but at least I don’t miss the scenery!",
		"Help! I flipped over and now I live here!",
		"I swear I was fast in a past life... probably a squirrel.",
		"Can’t a turtle enjoy life without a pigeon trying to ride me?",
		"One minute I’m crossing the road, next minute it’s sunset!",
		"I’m not lazy, I’m aerodynamic... for naps.",
		"I wish I was faster... actually, no, I’d still nap halfway.",
		"Why run when I’ve got a built-in home to hide in?",
		"This is NOT a race, it’s a lifestyle!",
		"If I hide in my shell, maybe the world will chill out for a bit.",
		"My defense skill? Extreme hide mode activated!",
		"I need a snack... but it’s on the other side of the room...",
		"Paws off! I’m a limited-edition tortoise, not a stepping stone!",
		"I was born with a shell, not speed boots!",
		"If I stop moving, maybe no one will ask me to do stuff.",
		"I demand a rematch... just give me a 3-day head start!"
	];

	const randomIndex = Math.floor(Math.random() * phrases.length); // Memilih indeks acak dari daftar frasa
	document.getElementById("random-phrase").textContent =
		'"' + phrases[randomIndex] + '"'; // Menampilkan frasa acak dalam tanda kutip
});

// Marquee
// Bagian ini mengatur animasi marquee (teks/gambar bergerak) dengan GSAP dan ScrollTrigger.
function initMarqueeScrollDirection() {
	document
		.querySelectorAll("[data-marquee-scroll-direction-target]")
		.forEach((marquee) => {
			// Mengambil semua elemen marquee
			const marqueeContent = marquee.querySelector(
				"[data-marquee-collection-target]"
			); // Konten dalam marquee
			const marqueeScroll = marquee.querySelector(
				"[data-marquee-scroll-target]"
			); // Kontainer gulir marquee
			if (!marqueeContent || !marqueeScroll) return; // Keluar jika elemen tidak ditemukan

			const {
				marqueeSpeed: speed,
				marqueeDirection: direction,
				marqueeDupligatore: dupligatore,
				marqueeScrollSpeed: scrollSpeed,
			} = marquee.dataset; // Mengambil atribut data dari elemen

			const marqueeSpeedAttr = parseFloat(speed); // Mengubah kecepatan ke tipe float
			const marqueeDirectionAttr = direction === "right" ? 1 : -1; // Menentukan arah (1 untuk kanan, -1 untuk kiri)
			const dupligatoreAmount = parseInt(dupligatore || 0); // Jumlah duplikat konten
			const scrollSpeedAttr = parseFloat(scrollSpeed); // Kecepatan gulir tambahan
			const speedMultiplier =
				window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1; // Pengali kecepatan berdasarkan lebar layar

			let marqueeSpeed =
				marqueeSpeedAttr *
				(marqueeContent.offsetWidth / window.innerWidth) *
				speedMultiplier; // Menghitung kecepatan marquee berdasarkan lebar konten dan layar

			marqueeScroll.style.marginLeft = `${scrollSpeedAttr * -1}%`; // Mengatur margin kiri untuk efek gulir
			marqueeScroll.style.width = `${scrollSpeedAttr * 2 + 100}%`; // Mengatur lebar kontainer gulir

			if (dupligatoreAmount > 0) {
				// Jika ada duplikat yang diminta
				const fragment = document.createDocumentFragment();
				for (let i = 0; i < dupligatoreAmount; i++) {
					fragment.appendChild(marqueeContent.cloneNode(true)); // Menduplikasi konten marquee
				}
				marqueeScroll.appendChild(fragment); // Menambahkan duplikat ke kontainer
			}

			const marqueeItems = marquee.querySelectorAll(
				"[data-marquee-collection-target]"
			); // Mengambil semua item dalam marquee
			const animation = gsap
				.to(marqueeItems, {
					// Membuat animasi GSAP untuk marquee
					xPercent: -100, // Menggerakkan item sepenuhnya keluar dari pandangan
					repeat: -1, // Mengulang animasi tanpa batas
					duration: marqueeSpeed, // Durasi animasi berdasarkan kecepatan
					ease: "linear", // Efek easing linear untuk pergerakan konstan
				})
				.totalProgress(0.5); // Memulai animasi dari tengah

			gsap.set(marqueeItems, {
				xPercent: marqueeDirectionAttr === 1 ? 100 : -100,
			}); // Mengatur posisi awal berdasarkan arah
			animation.timeScale(marqueeDirectionAttr); // Menyesuaikan arah animasi
			animation.play(); // Memulai animasi segera

			marquee.setAttribute("data-marquee-status", "normal"); // Mengatur status marquee awal

			ScrollTrigger.create({
				// Membuat ScrollTrigger untuk mengubah arah saat menggulir
				trigger: marquee, // Elemen pemicu
				start: "top bottom", // Mulai saat atas marquee mencapai bawah viewport
				end: "bottom top", // Berakhir saat bawah marquee mencapai atas viewport
				onUpdate: (self) => {
					const isInverted = self.direction === 1; // True jika menggulir ke bawah
					const currentDirection = isInverted
						? -marqueeDirectionAttr
						: marqueeDirectionAttr; // Menentukan arah saat ini

					animation.timeScale(currentDirection); // Memperbarui arah animasi
					marquee.setAttribute(
						"data-marquee-status",
						isInverted ? "normal" : "inverted"
					); // Memperbarui status marquee
				},
			});

			const tl = gsap.timeline({
				// Membuat timeline untuk efek kecepatan tambahan saat menggulir
				scrollTrigger: {
					trigger: marquee,
					start: "0% 100%", // Mulai saat marquee masuk ke viewport
					end: "100% 0%", // Berakhir saat marquee keluar dari viewport
					scrub: 0, // Sinkronisasi langsung dengan gulir
				},
			});

			const scrollStart =
				marqueeDirectionAttr === -1 ? scrollSpeedAttr : -scrollSpeedAttr; // Posisi awal gulir
			const scrollEnd = -scrollStart; // Posisi akhir gulir

			tl.fromTo(
				marqueeScroll,
				{ x: `${scrollStart}vw` },
				{ x: `${scrollEnd}vw`, ease: "none" }
			); // Animasi gulir tambahan
		});
}

// Inisialisasi Marquee dengan Arah Gulir
document.addEventListener("DOMContentLoaded", () => {
	initMarqueeScrollDirection(); // Memulai fungsi marquee saat halaman dimuat
});

// Permainan (Game)
// Bagian ini mengatur permainan interaktif untuk "memukul" hamster dengan senjata.
const weapons = document.querySelectorAll(".game_weapon"); // Mengambil semua elemen senjata
const hamster = document.getElementById("hamster"); // Elemen hamster
const gameContainer = document.querySelector(".game"); // Kontainer permainan
const customCursor = document.getElementById("custom-cursor"); // Kursor khusus

let selectedWeapon = null; // Senjata yang sedang dipilih
let phase = 0; // Fase animasi hamster (0-4)

weapons.forEach((weapon) => {
	// Menambahkan event listener untuk setiap senjata
	weapon.addEventListener("click", (event) => {
		event.stopPropagation(); // Mencegah klik menyebar ke elemen lain

		if (selectedWeapon && selectedWeapon !== weapon.dataset.weapon) {
			// Jika senjata lain sudah dipilih
			resetHamster(); // Reset hamster ke keadaan awal
		}

		weapons.forEach((w) => w.classList.remove("selected")); // Menghapus kelas "selected" dari semua senjata
		weapon.classList.add("selected"); // Menandai senjata yang diklik sebagai dipilih
		weapon.querySelector("img").src = weapon.dataset.selected; // Mengubah gambar senjata ke versi berwarna
		selectedWeapon = weapon.dataset.weapon; // Menyimpan senjata yang dipilih

		updateCursorImage(1); // Memperbarui kursor ke gambar senjata (state 1)
		customCursor.style.display = "block"; // Menampilkan kursor khusus
		document.body.style.cursor = "none"; // Menyembunyikan kursor default

		weapons.forEach((w) => (w.style.cursor = "default")); // Menonaktifkan pointer pada senjata
	});
});

window.addEventListener("mousemove", (event) => {
	// Memperbarui posisi kursor khusus saat mouse bergerak
	if (selectedWeapon) {
		customCursor.style.left = `${event.clientX}px`; // Mengatur posisi horizontal kursor
		customCursor.style.top = `${event.clientY}px`; // Mengatur posisi vertikal kursor
	}
});

window.addEventListener("mousedown", () => {
	// Mengubah gambar kursor saat mouse ditekan
	if (selectedWeapon) {
		updateCursorImage(2); // Mengubah kursor ke state 2 (aktif)
		hamster.classList.add("squeeze"); // Menambahkan animasi "tertekan" pada hamster
	}
});

window.addEventListener("mouseup", () => {
	// Mengembalikan gambar kursor saat mouse dilepas
	if (selectedWeapon) {
		updateCursorImage(1); // Mengembalikan kursor ke state 1 (normal)
		hamster.classList.remove("squeeze"); // Menghapus animasi "tertekan" dari hamster
	}
});

hamster.addEventListener("click", (event) => {
	// Menangani klik pada hamster
	event.stopPropagation();

	if (selectedWeapon) {
		// Jika ada senjata yang dipilih
		if (phase < 4) {
			// Jika fase belum maksimum (4)
			phase++; // Menambah fase
			hamster.style.backgroundImage = `url('/Hamster_IP/Game/${selectedWeapon}/Hamster_game_${selectedWeapon}-${phase}.png')`; // Mengubah gambar hamster sesuai fase
		}
	}
});

document.body.addEventListener("click", () => {
	// Reset hamster saat klik di luar area permainan
	resetHamster();
});

// gameContainer.addEventListener("mouseleave", resetHamster); // Reset hamster saat mouse keluar dari area permainan

function updateCursorImage(state) {
	// Fungsi untuk memperbarui gambar kursor khusus
	customCursor.src = `/Hamster_IP/Game/Icons/Hamster_game_${selectedWeapon}-${state}.png`; // Mengubah sumber gambar kursor
}

function resetHamster() {
	// Fungsi untuk mengembalikan hamster dan kursor ke keadaan awal
	phase = 0; // Reset fase ke 0
	hamster.style.backgroundImage =
		"url('/Hamster_IP/Game/Hamster_game_Base.png')"; // Kembalikan gambar hamster ke dasar
	customCursor.style.display = "none"; // Sembunyikan kursor khusus
	document.body.style.cursor = "auto"; // Kembalikan kursor default
	selectedWeapon = null; // Hapus senjata yang dipilih
	weapons.forEach((w) => {
		// Reset semua senjata
		w.classList.remove("selected"); // Hapus kelas "selected"
		w.style.cursor = "pointer"; // Kembalikan pointer pada senjata
		w.querySelector("img").src = w.dataset.default; // Kembalikan gambar senjata ke versi awal
	});
}

// Generator PFP (Profile Picture Generator)
// Bagian ini mengatur pembuatan gambar profil Poki yang dapat disesuaikan.
const assetPaths = {
	// Objek yang menyimpan daftar aset untuk setiap lapisan PFP
	body: [
		"purple",
		"orange",
		"blue-yellow",
		"blue",
		"brown",
		"dark-purple",
		"gray",
		"green",
		"light-blue",
		"yellow",
		"pink",
		"purple",
		"yellow",
		"yellow",
		"red",
		"yellow",
	],
	face: [
		"basic",
		"beaten-1",
		"beaten-2",
		"beaten-3",
		"cute",
		"drooling",
		"happy",
		"scared",
		"shadow",
		"side-eye",
		"smile",
		"sus",
		"tired",
	],
	eyewear: [
		"glasses-square-blue",
		"glasses-square-gray",
		"glasses-square-green",
		"glasses-square-pink",
		"glasses-square-yellow",
		"laser-green",
		"laser-red",
		"mog-glasses",
		"monocle",
		"none",
		"pirate-patch",
		"round-glasses-blue",
		"round-glasses-gray",
		"round-glasses-green",
		"round-glasses-pink",
		"round-glasses-yellow",
		"star-glasses",
		"stars",
		"swag-glasses",
		"tear",
	],
	hat: [
		"none",
		"apple-green",
		"apple-pink",
		"apple-yellow",
		"bandaid",
		"bandana-blue",
		"bandana-gray",
		"bandana-green",
		"bandana-pink",
		"bandana-yellow",
		"bucket-blue",
		"bucket-gray",
		"bucket-green",
		"bucket-pink",
		"bucket-yellow",
		"bump",
		"candle",
		"cap-blue",
		"cap-gray",
		"cap-green",
		"cap-pink",
		"cap-yellow",
		"chef",
		"clover",
		"crown",
		"earring",
		"evil-halo",
		"fire",
		"firefighter",
		"flower",
		"halo",
		"horns-beige",
		"horns-red",
		"leaf",
		"mcd",
		"pirate",
		"sailor",
	],
	clothing: [
		"none",
		"angle-wing",
		"arrow",
		"chef",
		"collar-blue",
		"collar-gray",
		"collar-green",
		"collar-pink",
		"collar-red",
		"devil-wing",
		"doctor",
		"firefighter",
		"hoodie-blue",
		"hoodie-gray",
		"hoodie-green",
		"hoodie-pink",
		"hoodie-yellow",
		"inmate",
		"king",
		"mcd",
		"pirate",
		"robe",
		"sailor",
		"scarf-blue",
		"scarf-gray",
		"scarf-green",
		"scarf-pink",
		"scarf-yellow",
		"shirt-blue",
		"shirt-gray",
		"shirt-green",
		"shirt-pink",
		"shirt-yellow",
	],
	bg: [
		"fire",
		"grass",
		"green",
		"night",
		"pink",
		"sea",
		"sky",
		"white",
		"yellow",
	],
};

function getAssetPath(layer, index) {
	// Fungsi untuk mendapatkan jalur aset berdasarkan lapisan dan indeks
	return `/Hamster_IP/PFP/${layer}/Poki-PFP_${layer}-${assetPaths[layer][index]}.png`;
}

function randomizePFP() {
	// Fungsi untuk mengacak semua aset PFP saat halaman dimuat atau tombol randomize diklik
	document.querySelectorAll(".pfp_generator_canva img").forEach((img) => {
		const layer = img.dataset.layer; // Mengambil nama lapisan dari data-layer
		const randomIndex = Math.floor(Math.random() * assetPaths[layer].length); // Memilih indeks acak
		img.src = getAssetPath(layer, randomIndex); // Mengatur sumber gambar secara acak
		document.getElementById(`${layer}-name`).textContent =
			assetPaths[layer][randomIndex]; // Memperbarui nama aset
	});
}

function changeAsset(layer, direction) {
	// Fungsi untuk mengubah aset secara manual (maju/mundur)
	const img = document.querySelector(`img[data-layer='${layer}']`);
	const currentSrc = img.src;
	const currentAsset = currentSrc
		.split(`Poki-PFP_${layer}-`)[1]
		.split(".png")[0]; // Mengekstrak nama aset saat ini
	const currentIndex = assetPaths[layer].indexOf(currentAsset); // Mendapatkan indeks aset saat ini
	const nextIndex =
		(currentIndex + direction + assetPaths[layer].length) %
		assetPaths[layer].length; // Menghitung indeks berikutnya
	img.src = getAssetPath(layer, nextIndex); // Mengubah gambar ke aset berikutnya
	document.getElementById(`${layer}-name`).textContent =
		assetPaths[layer][nextIndex]; // Memperbarui nama aset
}

function downloadPFP() {
	// Fungsi untuk mengunduh PFP yang telah dibuat
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const layersOrder = ["bg", "body", "face", "clothing", "eyewear", "hat"]; // Urutan lapisan untuk digambar

	ctx.clearRect(0, 0, canvas.width, canvas.height); // Membersihkan canvas sebelum menggambar

	function loadImage(src) {
		// Fungsi untuk memuat gambar ke dalam Promise
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = "anonymous"; // Mengizinkan penggunaan gambar lintas domain
			img.src = src;
			img.onload = () => resolve(img); // Resolusi saat gambar dimuat
			img.onerror = (err) => reject(err); // Penolakan saat ada kesalahan
		});
	}

	Promise.all(
		layersOrder.map((layer) => {
			// Memuat semua gambar lapisan secara berurutan
			const img = document.querySelector(`img[data-layer='${layer}']`);
			return loadImage(img.src);
		})
	)
		.then((images) => {
			images.forEach((img, index) => {
				// Menggambar setiap gambar ke canvas
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			});
			finalizeDownload(); // Memulai proses pengunduhan
		})
		.gatorch((err) => {
			console.error("Kesalahan saat memuat gambar:", err); // Menampilkan kesalahan jika ada
		});
}

function finalizeDownload() {
	// Fungsi untuk menyelesaikan pengunduhan PFP
	const canvas = document.getElementById("canvas");
	const link = document.createElement("a"); // Membuat elemen tautan untuk unduhan
	link.download = "puki_PFP.png"; // Nama file yang akan diunduh
	link.href = canvas.toDataURL("image/png"); // Mengubah canvas menjadi URL gambar PNG
	link.click(); // Memulai pengunduhan
}

// Anvil Jatuh (Falling Anvil)
// Bagian ini mengatur animasi anvil yang jatuh saat pengguna menggulir ke bawah halaman.
window.addEventListener("scroll", () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
		// Memeriksa apakah sudah di bagian bawah halaman
		let anvil = document.getElementById("anvil");
		let hamster = document.getElementById("squished-hamster");

		anvil.style.transform = "translateY(100svh)"; // Menggerakkan anvil ke bawah
		anvil.style.opacity = 1; // Membuat anvil terlihat

		setTimeout(() => {
			// Mengganti gambar hamster setelah 0,5 detik untuk efek "terhantam"
			hamster.src = "/Hamster_IP/Anvil/Hamster_Squished.png";
		}, 500);
	}
});

// Pembaruan Tahun Dinamis (Dynamic Update Current Year)
// Bagian ini secara otomatis memperbarui tahun di footer saat halaman dimuat.
document.addEventListener("DOMContentLoaded", () => {
	const currentYear = new Date().getFullYear(); // Mendapatkan tahun saat ini
	const currentYearElements = document.querySelectorAll("[data-current-year]"); // Mengambil semua elemen dengan atribut data-current-year
	currentYearElements.forEach((currentYearElement) => {
		currentYearElement.textContent = currentYear; // Memperbarui teks dengan tahun saat ini
	});
});
