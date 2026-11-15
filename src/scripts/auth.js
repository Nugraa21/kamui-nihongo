// =======================================================
// Kamui NihonGo (神威日本語) - Authentication & User Profile
// Register • Login • Profile Management • Password Change
// Factory Reset (Password Protected) • App Info
// Credit: nugra21.web.app
// =======================================================

const AUTH_STORAGE_KEY = 'kamui_auth_user';
const SESSION_STORAGE_KEY = 'kamui_auth_session';

let currentAuthUser = null;
let activeProfileTab = 'overview';

// Initialize Authentication on application boot
function initAuthSystem() {
    const savedUserJson = localStorage.getItem(AUTH_STORAGE_KEY);
    const sessionJson = localStorage.getItem(SESSION_STORAGE_KEY);

    const overlay = document.getElementById('auth-overlay');
    if (!overlay) return;

    if (!savedUserJson) {
        // Step 1: No user registered yet -> show Register Screen
        currentAuthUser = null;
        renderRegisterScreen();
        overlay.style.display = 'flex';
    } else {
        try {
            currentAuthUser = JSON.parse(savedUserJson);
            const session = sessionJson ? JSON.parse(sessionJson) : null;
            if (session && session.isLoggedIn && session.email === currentAuthUser.email) {
                // User is already logged in
                overlay.style.display = 'none';
                updateTopBarProfile();
            } else {
                // User exists, but not logged in -> show Login Screen
                renderLoginScreen();
                overlay.style.display = 'flex';
            }
        } catch (e) {
            console.error('Error loading auth data:', e);
            renderRegisterScreen();
            overlay.style.display = 'flex';
        }
    }
}

// 1. RENDER REGISTER SCREEN (FIRST TIME ONLY)
function renderRegisterScreen() {
    const overlay = document.getElementById('auth-overlay');
    if (!overlay) return;

    overlay.innerHTML = `
        <div class="auth-card">
            <div class="auth-header">
                <div class="auth-brand-logo">神</div>
                <h2 class="auth-title">Kamui NihonGo</h2>
                <div class="auth-subtitle">神威日本語 • Pro Japanese Mastery Suite (N5 • N4 • N3)</div>
                <div class="auth-badge-first">Pendaftaran Pengguna Baru</div>
            </div>

            <form class="auth-form" id="register-form" onsubmit="submitRegister(event)">
                <div class="auth-field">
                    <label for="reg-name">Nama Lengkap / Username</label>
                    <div class="auth-input-wrapper">
                        <span class="auth-input-icon">${icon('user', 16)}</span>
                        <input type="text" id="reg-name" placeholder="Contoh: nugra" value="nugra" required autofocus>
                    </div>
                </div>

                <div class="auth-field">
                    <label for="reg-email">Alamat Email</label>
                    <div class="auth-input-wrapper">
                        <span class="auth-input-icon">${icon('mail', 16)}</span>
                        <input type="email" id="reg-email" placeholder="Contoh: nugra@web.app" value="nugra@web.app" required>
                    </div>
                </div>

                <div class="auth-field">
                    <label for="reg-password">Kata Sandi (Password)</label>
                    <div class="auth-input-wrapper">
                        <span class="auth-input-icon">${icon('lock', 16)}</span>
                        <input type="password" id="reg-password" placeholder="Minimal 4 karakter" required>
                    </div>
                </div>

                <div class="auth-field">
                    <label for="reg-confirm-password">Konfirmasi Kata Sandi</label>
                    <div class="auth-input-wrapper">
                        <span class="auth-input-icon">${icon('lock', 16)}</span>
                        <input type="password" id="reg-confirm-password" placeholder="Ulangi kata sandi" required>
                    </div>
                </div>

                <div id="auth-error-msg" class="auth-error-banner" style="display:none"></div>

                <button type="submit" class="auth-btn-primary">
                    ${icon('checkCircle', 16)}
                    <span>Daftar Akun Baru & Masuk</span>
                </button>
            </form>

            <div class="auth-footer">
                <span>Developer: <strong>nugra21.web.app</strong> • Built with Rust & Tauri 2.0</span>
            </div>
        </div>
    `;
}

// 2. RENDER LOGIN SCREEN (SUBSEQUENT SESSIONS)
function renderLoginScreen() {
    const overlay = document.getElementById('auth-overlay');
    if (!overlay) return;

    const savedUser = currentAuthUser || {};

    overlay.innerHTML = `
        <div class="auth-card">
            <div class="auth-header">
                <div class="auth-brand-logo">神</div>
                <h2 class="auth-title">Kamui NihonGo</h2>
                <div class="auth-subtitle">神威日本語 • Pro Japanese Mastery Suite</div>
                <div class="auth-badge-welcome">Selamat Datang Kembali</div>
            </div>

            <form class="auth-form" id="login-form" onsubmit="submitLogin(event)">
                <div class="auth-field">
                    <label for="login-email">Alamat Email</label>
                    <div class="auth-input-wrapper">
                        <span class="auth-input-icon">${icon('mail', 16)}</span>
                        <input type="email" id="login-email" placeholder="nama@email.com" value="${savedUser.email || ''}" required autofocus>
                    </div>
                </div>

                <div class="auth-field">
                    <label for="login-password">Kata Sandi (Password)</label>
                    <div class="auth-input-wrapper">
                        <span class="auth-input-icon">${icon('lock', 16)}</span>
                        <input type="password" id="login-password" placeholder="Masukkan password akun" required>
                    </div>
                </div>

                <div id="auth-error-msg" class="auth-error-banner" style="display:none"></div>

                <button type="submit" class="auth-btn-primary">
                    ${icon('play', 15)}
                    <span>Masuk ke Aplikasi</span>
                </button>
            </form>

            <div class="auth-footer" style="display:flex;justify-content:space-between;align-items:center">
                <button type="button" class="auth-text-link" onclick="promptResetForgottenPassword()">Lupa Password?</button>
                <span>Author: <strong>nugra21.web.app</strong></span>
            </div>
        </div>
    `;
}

// 3. SUBMIT REGISTER
function submitRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const errorBox = document.getElementById('auth-error-msg');

    if (!name || !email || !password) {
        showAuthError('Semua kolom wajib diisi.');
        return;
    }
    if (password.length < 4) {
        showAuthError('Kata sandi minimal 4 karakter.');
        return;
    }
    if (password !== confirmPassword) {
        showAuthError('Konfirmasi kata sandi tidak cocok.');
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
        role: 'Pro Member'
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ isLoggedIn: true, email: email }));
    currentAuthUser = newUser;

    const overlay = document.getElementById('auth-overlay');
    if (overlay) overlay.style.display = 'none';

    updateTopBarProfile();
    showToast(`Selamat datang di Kamui NihonGo, ${name}!`, 'success');
}

// 4. SUBMIT LOGIN
function submitLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    const savedUserJson = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!savedUserJson) {
        renderRegisterScreen();
        return;
    }

    const user = JSON.parse(savedUserJson);
    if (user.email.toLowerCase() !== email || user.password !== password) {
        showAuthError('Email atau kata sandi tidak sesuai. Silakan coba lagi.');
        return;
    }

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ isLoggedIn: true, email: email }));
    currentAuthUser = user;

    const overlay = document.getElementById('auth-overlay');
    if (overlay) overlay.style.display = 'none';

    updateTopBarProfile();
    showToast(`Selamat datang kembali, ${user.name}!`, 'success');
}

function showAuthError(msg) {
    const errorBox = document.getElementById('auth-error-msg');
    if (errorBox) {
        errorBox.textContent = msg;
        errorBox.style.display = 'block';
    }
}

// 5. UPDATE TOP BAR WITH CURRENT USER
function updateTopBarProfile() {
    const nameEl = document.getElementById('top-profile-name');
    const avatarEl = document.getElementById('top-user-avatar');
    if (currentAuthUser) {
        if (nameEl) nameEl.textContent = currentAuthUser.name || 'nugra';
        if (avatarEl) avatarEl.textContent = (currentAuthUser.name ? currentAuthUser.name.charAt(0) : 'N').toUpperCase();
    }
}

// 6. LOGOUT
function performLogout() {
    showConfirmModal({
        title: 'Keluar dari Akun?',
        message: 'Anda akan keluar dari sesi ini dan kembali ke menu login.',
        confirmText: 'Ya, Keluar',
        cancelText: 'Batal',
        isDanger: false,
        iconType: 'user',
        onConfirm: () => {
            localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ isLoggedIn: false }));
            closeProfileModal();
            renderLoginScreen();
            const overlay = document.getElementById('auth-overlay');
            if (overlay) overlay.style.display = 'flex';
            showToast('Anda telah keluar dari aplikasi.', 'info');
        }
    });
}

// 7. OPEN PROFILE MODAL
function openProfileModal(tab = 'overview') {
    activeProfileTab = tab;
    const modal = document.getElementById('profile-modal');
    if (!modal) return;

    renderProfileModalContent();
    modal.style.display = 'flex';
}

function closeProfileModal() {
    const modal = document.getElementById('profile-modal');
    if (modal) modal.style.display = 'none';
}

function closeProfileModalOnBackdrop(e) {
    if (e.target.id === 'profile-modal') {
        closeProfileModal();
    }
}

// 8. RENDER PROFILE MODAL CONTENT
function renderProfileModalContent() {
    const container = document.getElementById('profile-modal-body');
    if (!container) return;

    const user = currentAuthUser || { name: 'nugra', email: 'nugra@web.app', createdAt: '15 Nov 2026', role: 'Pro Member' };
    const progress = typeof getProgress === 'function' ? getProgress() : { xp: 0, streak: 0, completedKana: [], masteredKanji: [] };

    container.innerHTML = `
        <div class="profile-layout">
            <!-- Sidebar Nav -->
            <div class="profile-sidebar">
                <div class="profile-user-summary">
                    <div class="profile-avatar-large">${(user.name ? user.name.charAt(0) : 'N').toUpperCase()}</div>
                    <div class="profile-summary-name">${user.name}</div>
                    <div class="profile-summary-email">${user.email}</div>
                    <span class="gh-tab-badge" style="background:var(--accent-primary);color:#ffffff;margin-top:4px">
                        ${icon('sparkles', 12)} PRO MEMBER
                    </span>
                </div>

                <div class="profile-nav-menu">
                    <button class="profile-nav-item ${activeProfileTab === 'overview' ? 'active' : ''}" onclick="switchProfileTab('overview')">
                        ${icon('user', 16)} <span>Ringkasan & Skor</span>
                    </button>
                    <button class="profile-nav-item ${activeProfileTab === 'edit' ? 'active' : ''}" onclick="switchProfileTab('edit')">
                        ${icon('penTool', 16)} <span>Ubah Profil & Sandi</span>
                    </button>
                    <button class="profile-nav-item ${activeProfileTab === 'info' ? 'active' : ''}" onclick="switchProfileTab('info')">
                        ${icon('book', 16)} <span>Informasi Aplikasi</span>
                    </button>
                    <button class="profile-nav-item danger ${activeProfileTab === 'danger' ? 'active' : ''}" onclick="switchProfileTab('danger')">
                        ${icon('alertTriangle', 16)} <span>Zona Berbahaya</span>
                    </button>
                </div>

                <button class="profile-logout-btn" onclick="performLogout()">
                    ${icon('x', 14)} <span>Keluar (Logout)</span>
                </button>
            </div>

            <!-- Content Area -->
            <div class="profile-content-area">
                ${renderTabBody(activeProfileTab, user, progress)}
            </div>
        </div>
    `;
}

function switchProfileTab(tab) {
    activeProfileTab = tab;
    renderProfileModalContent();
}

function renderTabBody(tab, user, progress) {
    const kanaCount = (progress.completedKana ? progress.completedKana.length : 0);
    const kanjiCount = (progress.masteredKanji ? progress.masteredKanji.length : 0);

    if (tab === 'overview') {
        return `
            <div class="profile-tab-header">
                <h3>Ringkasan Statistik & Pencapaian Belajar</h3>
                <p>Data aktivitas, perolehan XP, dan skor latihan Anda tersimpan aman secara lokal di perangkat.</p>
            </div>

            <div class="profile-stats-grid">
                <div class="profile-stat-box">
                    <div class="stat-icon-wrapper" style="color:var(--status-warning)">${icon('flame', 22)}</div>
                    <div class="stat-number">${progress.streak || 0} Hari</div>
                    <div class="stat-label">Streak Belajar Harian</div>
                </div>

                <div class="profile-stat-box">
                    <div class="stat-icon-wrapper" style="color:var(--accent-secondary)">${icon('zap', 22)}</div>
                    <div class="stat-number">${progress.xp || 0} XP</div>
                    <div class="stat-label">Total Poin Pengalaman</div>
                </div>

                <div class="profile-stat-box">
                    <div class="stat-icon-wrapper" style="color:var(--accent-primary)">${icon('layers', 22)}</div>
                    <div class="stat-number">${kanaCount} Huruf</div>
                    <div class="stat-label">Hiragana & Katakana Dikuasai</div>
                </div>

                <div class="profile-stat-box">
                    <div class="stat-icon-wrapper" style="color:#d29922">${icon('bookOpen', 22)}</div>
                    <div class="stat-number">${kanjiCount} Kanji</div>
                    <div class="stat-label">Kanji N5-N3 Ditandai</div>
                </div>

                <div class="profile-stat-box">
                    <div class="stat-icon-wrapper" style="color:#a371f7">${icon('sparkles', 22)}</div>
                    <div class="stat-number">25 Bab</div>
                    <div class="stat-label">Minna no Nihongo Siap Dipelajari</div>
                </div>

                <div class="profile-stat-box">
                    <div class="stat-icon-wrapper" style="color:#3fb950">${icon('target', 22)}</div>
                    <div class="stat-number">N5 • N4 • N3</div>
                    <div class="stat-label">Standar Ujian Resmi JLPT</div>
                </div>
            </div>

            <div class="profile-account-detail-card">
                <h4>Detail Akun Terdaftar</h4>
                <div class="detail-row">
                    <span class="detail-key">Nama Pengguna:</span>
                    <strong class="detail-val">${user.name}</strong>
                </div>
                <div class="detail-row">
                    <span class="detail-key">Email:</span>
                    <strong class="detail-val">${user.email}</strong>
                </div>
                <div class="detail-row">
                    <span class="detail-key">Status Lisensi:</span>
                    <span class="detail-val" style="color:var(--accent-primary)">Aktif (Pro Native Suite)</span>
                </div>
                <div class="detail-row">
                    <span class="detail-key">Tanggal Terdaftar:</span>
                    <span class="detail-val">${user.createdAt || '15 November 2026'}</span>
                </div>
            </div>
        `;
    }

    if (tab === 'edit') {
        return `
            <div class="profile-tab-header">
                <h3>Ubah Data Profil & Ganti Kata Sandi</h3>
                <p>Perbarui nama akun atau ganti kata sandi login Anda sewaktu-waktu.</p>
            </div>

            <!-- Edit Name / Email Form -->
            <form class="profile-form-section" onsubmit="saveProfileChanges(event)">
                <h4 style="margin-bottom:12px;font-size:14px;color:var(--text-primary)">Informasi Dasar</h4>
                <div class="auth-field">
                    <label>Nama Lengkap</label>
                    <input type="text" id="edit-profile-name" value="${user.name}" required>
                </div>
                <div class="auth-field">
                    <label>Alamat Email</label>
                    <input type="email" id="edit-profile-email" value="${user.email}" required>
                </div>
                <button type="submit" class="btn-primary" style="margin-top:6px">
                    ${icon('checkCircle', 15)} Simpan Profil
                </button>
            </form>

            <div style="height:1px;background:var(--border-default);margin:24px 0"></div>

            <!-- Change Password Form -->
            <form class="profile-form-section" onsubmit="changePassword(event)">
                <h4 style="margin-bottom:12px;font-size:14px;color:var(--text-primary)">Ganti Kata Sandi</h4>
                <div class="auth-field">
                    <label>Kata Sandi Lama</label>
                    <input type="password" id="old-password" placeholder="Masukkan kata sandi saat ini" required>
                </div>
                <div class="auth-field">
                    <label>Kata Sandi Baru</label>
                    <input type="password" id="new-password" placeholder="Minimal 4 karakter" required>
                </div>
                <div class="auth-field">
                    <label>Konfirmasi Kata Sandi Baru</label>
                    <input type="password" id="confirm-new-password" placeholder="Ulangi kata sandi baru" required>
                </div>
                <button type="submit" class="btn-secondary" style="margin-top:6px">
                    ${icon('lock', 15)} Perbarui Kata Sandi
                </button>
            </form>

            <div style="height:1px;background:var(--border-default);margin:24px 0"></div>

            <!-- Audio & Sound FX Toggle -->
            <div class="profile-form-section" style="display:flex;flex-direction:row;justify-content:space-between;align-items:center">
                <div>
                    <h4 style="margin:0 0 4px;font-size:13.5px;color:var(--text-primary)">
                        ${icon('volume2', 15)} Efek Suara Interaktif (UI Sound FX)
                    </h4>
                    <p style="margin:0;font-size:12px;color:var(--text-secondary)">
                        Bunyikan suara klik halus saat berinteraksi dengan tombol & navigasi.
                    </p>
                </div>
                <label class="switch-control">
                    <input type="checkbox" id="profile-sound-toggle" ${typeof isSoundEnabled === 'function' && isSoundEnabled() ? 'checked' : ''} onchange="setSoundEnabled(this.checked)">
                    <span class="switch-slider"></span>
                </label>
            </div>
        `;
    }

    if (tab === 'info') {
        return `
            <div class="profile-tab-header">
                <h3>Informasi Aplikasi & Sistem</h3>
                <p>Spesifikasi perangkat lunak, arsitektur backend, dan lisensi pengembangan.</p>
            </div>

            <div class="profile-info-grid">
                <div class="info-card">
                    <div class="info-card-header">
                        <div class="auth-brand-logo" style="width:36px;height:36px;font-size:18px">神</div>
                        <div>
                            <div style="font-size:16px;font-weight:700;color:var(--text-primary)">Kamui NihonGo (神威日本語)</div>
                            <div style="font-size:12px;color:var(--text-secondary)">Professional Japanese Language Mastery Suite</div>
                        </div>
                    </div>
                    <div class="info-card-body">
                        Aplikasi pembelajaran bahasa Jepang native berkecepatan tinggi yang dibangun khusus untuk menguasai standar JLPT N5, N4, N3, serta tata bahasa buku Minna no Nihongo (Bab 1–25) dengan antarmuka Developer GitHub & GitLab.
                    </div>
                </div>

                <div class="profile-account-detail-card" style="margin-top:16px">
                    <div class="detail-row">
                        <span class="detail-key">Versi Software:</span>
                        <strong class="detail-val">v2.1.0-release</strong>
                    </div>
                    <div class="detail-row">
                        <span class="detail-key">Desktop Engine:</span>
                        <span class="detail-val">Rust 1.70+ • Tauri 2.0 Webview</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-key">Desain & Tema:</span>
                        <span class="detail-val">GitHub Dark / GitLab Tanuki Multi-Theme</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-key">Standar Kurikulum:</span>
                        <span class="detail-val">JLPT N5 • N4 • N3 & Minna no Nihongo I</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-key">Pemilik & Pembuat (Author):</span>
                        <strong class="detail-val" style="color:var(--text-primary)">Ludang Prasetyo Nugroho (nugra21)</strong>
                    </div>
                    <div class="detail-row">
                        <span class="detail-key">Website Resmi:</span>
                        <a href="https://nugra21.web.app" target="_blank" class="detail-val" style="color:var(--accent-secondary);text-decoration:none">
                            nugra21.web.app
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    if (tab === 'danger') {
        return `
            <div class="profile-tab-header">
                <h3 style="color:var(--status-danger)">Zona Berbahaya: Setelan Pabrik & Hapus Akun</h3>
                <p>Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan.</p>
            </div>

            <div class="danger-box">
                <div class="danger-box-content">
                    <div class="danger-icon">${icon('alertTriangle', 28)}</div>
                    <div>
                        <div class="danger-box-title">Kembalikan ke Setelan Pabrik (Factory Reset)</div>
                        <div class="danger-box-desc">
                            Menghapus seluruh akun pengguna, data password, riwayat simulasi ujian JLPT, rekor permainan kata, dan seluruh progres XP. Setelah diklik, aplikasi akan kembali ke layar pendaftaran awal.
                        </div>
                    </div>
                </div>

                <button class="danger-btn-trigger" onclick="promptFactoryReset()">
                    ${icon('alertTriangle', 16)} Hapus Semua Data & Setelan Pabrik
                </button>
            </div>
        `;
    }

    return '';
}

// 9. SAVE PROFILE CHANGES
function saveProfileChanges(e) {
    e.preventDefault();
    const newName = document.getElementById('edit-profile-name').value.trim();
    const newEmail = document.getElementById('edit-profile-email').value.trim().toLowerCase();

    if (!newName || !newEmail) {
        showToast('Nama dan email tidak boleh kosong.', 'danger');
        return;
    }

    currentAuthUser.name = newName;
    currentAuthUser.email = newEmail;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentAuthUser));
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ isLoggedIn: true, email: newEmail }));

    updateTopBarProfile();
    renderProfileModalContent();
    showToast('Profil berhasil diperbarui!', 'success');
}

// 10. CHANGE PASSWORD
function changePassword(e) {
    e.preventDefault();
    const oldPw = document.getElementById('old-password').value;
    const newPw = document.getElementById('new-password').value;
    const confirmNewPw = document.getElementById('confirm-new-password').value;

    if (currentAuthUser.password !== oldPw) {
        showToast('Kata sandi lama tidak tepat.', 'danger');
        return;
    }
    if (newPw.length < 4) {
        showToast('Kata sandi baru minimal 4 karakter.', 'danger');
        return;
    }
    if (newPw !== confirmNewPw) {
        showToast('Konfirmasi kata sandi baru tidak cocok.', 'danger');
        return;
    }

    currentAuthUser.password = newPw;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentAuthUser));

    document.getElementById('old-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-new-password').value = '';

    showToast('Kata sandi berhasil diubah! Gunakan sandi baru ini saat login.', 'success');
}

// 11. FACTORY RESET (REQUIRES PASSWORD CONFIRMATION)
function promptFactoryReset() {
    showPasswordPromptModal({
        title: 'Konfirmasi Sandi untuk Setelan Pabrik',
        message: 'Masukkan kata sandi akun Anda untuk memverifikasi tindakan reset setelan pabrik:',
        onConfirm: (enteredPassword) => {
            if (enteredPassword !== currentAuthUser.password) {
                showToast('Kata sandi salah. Tindakan setelan pabrik dibatalkan.', 'danger');
                return;
            }

            // Password correct! Perform factory reset
            localStorage.clear();
            currentAuthUser = null;
            closeProfileModal();

            // Re-render register screen
            renderRegisterScreen();
            const overlay = document.getElementById('auth-overlay');
            if (overlay) overlay.style.display = 'flex';

            showToast('Aplikasi berhasil dikembalikan ke setelan pabrik.', 'info');
        }
    });
}

function promptResetForgottenPassword() {
    showConfirmModal({
        title: 'Reset Akun Lupa Sandi?',
        message: 'Jika Anda lupa kata sandi akun, Anda dapat mereset setelan pabrik aplikasi untuk membuat akun baru.',
        confirmText: 'Ya, Reset ke Setelan Pabrik',
        cancelText: 'Kembali',
        isDanger: true,
        iconType: 'alertTriangle',
        onConfirm: () => {
            localStorage.clear();
            currentAuthUser = null;
            renderRegisterScreen();
            showToast('Aplikasi direset. Silakan daftarkan akun baru Anda.', 'info');
        }
    });
}

// Global hook
window.initAuthSystem = initAuthSystem;
window.openProfileModal = openProfileModal;
window.closeProfileModal = closeProfileModal;
window.closeProfileModalOnBackdrop = closeProfileModalOnBackdrop;
