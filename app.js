        const creators = {
            'creator1': { 
                id: 'creator1', name: 'Cô Lan Dệt Lụa', role: 'Nghệ nhân Lụa Vạn Phúc', avatar: '47', cover: '1018',
                bio: 'Gắn bó với khung cửi hơn 40 năm tại Vạn Phúc, gìn giữ kỹ thuật dệt lụa vân truyền thống.' 
            }
        };

        const profiles = {
            explorer: { id: 'exp1', name: 'Hải Đăng', role: 'Du khách', avatar: '11' },
            creator1: creators['creator1'],
            admin: { id: 'adm1', name: 'Trần Duy', role: 'Admin', avatar: '32' }
        };

        // Mảng bài viết mẫu
        let posts = [
            { id: 'CT-1001', authorId: 'creator1', status: 'approved', tag: 'Làng nghề', title: 'Đèn lồng phố Hội', image: 'https://picsum.photos/id/1018/800/600', content: 'Tự tay làm nên chiếc đèn lồng truyền thống giữa lòng phố cổ thanh bình. Kỹ thuật vót tre, dán lụa tỉ mỉ...' },
            { id: 'CT-1002', authorId: 'creator1', status: 'approved', tag: 'Thủ công', title: 'Nhuộm Chàm Tây Bắc', image: 'https://picsum.photos/id/1036/800/600', content: 'Bí quyết nhuộm vải tự nhiên của đồng bào H\'Mông tại Sapa mờ sương. Cây chàm được ngâm ủ kỹ lưỡng...' },
            { id: 'CT-1003', authorId: 'creator1', status: 'approved', tag: 'Làng nghề', title: 'Vuốt gốm Bát Tràng', image: 'https://picsum.photos/id/106/800/600', content: 'Bát Tràng không chỉ là tên một ngôi làng, mà là tên của một miền ký ức đất nung. Lớn lên bên dòng sông Hồng...' },
            { id: 'CT-1004', authorId: 'creator1', status: 'approved', tag: 'Nghệ thuật', title: 'Kiến trúc Cố đô Huế', image: 'https://picsum.photos/id/1040/800/600', content: 'Dấu ấn vàng son của triều đại phong kiến qua lăng tẩm, đền đài. Những nét chạm trổ tinh xảo...' },
            { id: 'CT-1005', authorId: 'creator1', status: 'approved', tag: 'Ẩm thực', title: 'Chợ nổi Cái Răng', image: 'https://picsum.photos/id/1043/800/600', content: 'Nhịp sống lênh đênh trên sông nước miền Tây đậm đà tình quê. Tiếng rao vẳng trên sóng nước sớm mai...' },
            { id: 'CT-1006', authorId: 'creator1', status: 'approved', tag: 'Làng nghề', title: 'Nón lá Xứ Thanh', image: 'https://picsum.photos/id/1044/800/600', content: 'Tìm hiểu nghệ thuật đan nón lá chằm tinh tế qua bàn tay nghệ nhân. Những lớp lá cọ phơi sương mỏng manh...' },
            { id: 'CT-9999', authorId: 'creator1', status: 'pending', tag: 'Làng nghề', title: 'Bí mật men rạn', image: 'https://picsum.photos/id/1074/800/600', content: 'Kỹ thuật tạo rạn độc đáo từ lửa và đất...' }
        ];

        let currentUser = null;
        let currentReviewPostId = null;

        function showToast(message, type = 'success') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            
            let colorClass = 'bg-emerald-500';
            if(type === 'error') colorClass = 'bg-red-500';
            if(type === 'warning') colorClass = 'bg-yellow-500';
            if(type === 'info') colorClass = 'bg-blue-500';

            toast.className = `toast-animate flex items-center gap-3 px-6 py-3 rounded-full text-white font-bold shadow-xl ${colorClass}`;
            toast.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>${message}</span>
            `;
            
            container.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(100%)';
                toast.style.transition = 'all 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        const sidebar = document.getElementById('app-sidebar');
        const views = document.querySelectorAll('.view-section');
        const publicHeader = document.getElementById('public-header');
        const globalFooter = document.getElementById('global-footer');
        const appMain = document.getElementById('app-main');

        const publicViews = ['view-home', 'view-login', 'view-exp-discover', 'view-exp-detail', 'view-exp-trail', 'view-cre-profile', 'view-cre-list'];
        const noFooterViews = ['view-login'];
        const noPublicHeaderViews = ['view-home', 'view-login', 'view-cre-story', 'view-cre-create', 'view-cur-review', 'view-adm-dash'];

        const menus = {
            explorer: [
                { id: 'view-exp-discover', icon: '🔍', label: 'Khám phá Địa phương' },
                { id: 'view-exp-trail', icon: '✨', label: 'Lịch trình AI' },
                { id: 'view-cre-list', icon: '🏺', label: 'Gặp gỡ Nghệ nhân' },
            ],
            creator: [
                { id: 'view-cre-profile', icon: '👤', label: 'Hồ sơ của tôi' },
                { id: 'view-cre-story', icon: '📝', label: 'Quản lý Bài viết' },
            ],
            admin: [
                { id: 'view-adm-dash', icon: '📊', label: 'Bảng điều khiển' },
            ]
        };

        function switchView(targetId) {
            views.forEach(v => v.classList.remove('active'));
            const targetView = document.getElementById(targetId);
            if(targetView) {
                targetView.classList.add('active');
                appMain.scrollTop = 0;
            }

            if(publicViews.includes(targetId)) {
                sidebar.classList.add('hidden');
                sidebar.classList.remove('md:flex');
            } else {
                sidebar.classList.remove('hidden');
                sidebar.classList.add('md:flex');
                document.querySelectorAll('#sidebar-menu button').forEach(btn => {
                    if(btn.getAttribute('data-target') === targetId) {
                        btn.classList.add('bg-brand-50', 'text-brand-800');
                    } else {
                        btn.classList.remove('bg-brand-50', 'text-brand-800');
                    }
                });
            }
            
            globalFooter.style.display = noFooterViews.includes(targetId) ? 'none' : 'block';
            if(noPublicHeaderViews.includes(targetId)) publicHeader.classList.add('hidden');
            else publicHeader.classList.remove('hidden');

            // Dynamic Hook Renders
            if(targetId === 'view-exp-discover') renderPublicPosts();
            if(targetId === 'view-cre-list') renderCreatorList();
            if(targetId === 'view-cre-story') renderCreatorManagePosts();
            if(targetId === 'view-adm-dash') renderAdminDashboard();
            if(targetId === 'view-cre-profile' && currentUser && currentUser.id.startsWith('creator')) {
                renderCreatorProfile(currentUser.id);
            }
        }

        function openAuth(type) { switchView('view-login'); toggleAuthTab(type); }

        function toggleAuthTab(tab) {
            const loginForm = document.getElementById('form-login');
            const regForm = document.getElementById('form-register');
            const tabLogin = document.getElementById('tab-login');
            const tabReg = document.getElementById('tab-register');
            
            if(tab === 'login') {
                loginForm.classList.remove('hidden'); regForm.classList.add('hidden');
                tabLogin.classList.replace('border-transparent', 'border-brand-600');
                tabLogin.classList.replace('text-gray-400', 'text-brand-700');
                tabReg.classList.replace('border-brand-600', 'border-transparent');
                tabReg.classList.replace('text-brand-700', 'text-gray-400');
                document.getElementById('auth-title').innerText = 'Mừng bạn trở lại';
            } else {
                loginForm.classList.add('hidden'); regForm.classList.remove('hidden');
                tabReg.classList.replace('border-transparent', 'border-brand-600');
                tabReg.classList.replace('text-gray-400', 'text-brand-700');
                tabLogin.classList.replace('border-brand-600', 'border-transparent');
                tabLogin.classList.replace('text-brand-700', 'text-gray-400');
                document.getElementById('auth-title').innerText = 'Tạo tài khoản mới';
            }
        }

        function handleDemoLogin(e) {
            e.preventDefault();
            document.getElementById('auth-form-container').classList.add('hidden');
            document.getElementById('role-modal').classList.remove('hidden');
            document.getElementById('role-modal').classList.add('flex');
        }

        function loginAs(roleKey) {
            currentUser = profiles[roleKey];
            const menuType = roleKey.startsWith('creator') ? 'creator' : roleKey;
            
            document.getElementById('sidebar-name').textContent = currentUser.name;
            document.getElementById('sidebar-role').textContent = currentUser.role;
            document.getElementById('sidebar-avatar').src = `https://i.pravatar.cc/150?img=${currentUser.avatar}`;

            const menuContainer = document.getElementById('sidebar-menu');
            menuContainer.innerHTML = `<h3 class="px-4 text-xs font-bold text-gray-400 uppercase mb-3 mt-4">Menu Hệ thống</h3>`;
            
            menus[menuType].forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'w-full flex items-center gap-4 px-4 py-3 text-sm font-bold rounded-2xl text-gray-600 hover:bg-brand-50 hover:text-brand-700 text-left transition-colors';
                btn.setAttribute('data-target', item.id);
                btn.innerHTML = `<span class="text-xl">${item.icon}</span> ${item.label}`;
                btn.onclick = () => switchView(item.id);
                menuContainer.appendChild(btn);
            });

            document.getElementById('public-auth-buttons').innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?img=${currentUser.avatar}" class="w-8 h-8 rounded-full border border-gray-200">
                    <button onclick="logout()" class="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors">Đăng xuất</button>
                </div>
            `;

            document.getElementById('auth-form-container').classList.remove('hidden');
            document.getElementById('role-modal').classList.add('hidden');
            document.getElementById('role-modal').classList.remove('flex');
            
            showToast(`Đăng nhập thành công: ${currentUser.name}`);
            switchView(menus[menuType][0].id);
        }

        function logout() {
            currentUser = null;
            document.getElementById('public-auth-buttons').innerHTML = `
                <button onclick="openAuth('login')" class="text-gray-600 font-semibold hover:text-brand-600 transition-colors hidden sm:block">Đăng nhập</button>
                <button onclick="openAuth('register')" class="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-2 rounded-full shadow-sm">Đăng ký</button>
            `;
            switchView('view-home');
            showToast('Đã đăng xuất', 'info');
        }

        function renderPublicPosts() {
            const container = document.getElementById('public-posts-container');
            container.innerHTML = '';
            const approvedPosts = posts.filter(p => p.status === 'approved');
            approvedPosts.forEach(post => {
                container.innerHTML += `
                    <article class="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100 cursor-pointer group" onclick="openPostDetail('${post.id}')">
                        <figure class="h-56 bg-gray-200 overflow-hidden relative">
                            <img src="${post.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            <span class="absolute top-4 left-4 bg-white/90 text-brand-700 px-3 py-1 rounded-full text-xs font-bold">${post.tag}</span>
                        </figure>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600">${post.title}</h3>
                            <p class="text-gray-600 text-sm line-clamp-2">${post.content}</p>
                        </div>
                    </article>
                `;
            });
        }

        window.filterCategory = function(buttonElement) {
            const container = document.getElementById('filter-buttons');
            const buttons = container.querySelectorAll('button');
            buttons.forEach(btn => btn.className = 'px-6 py-2.5 rounded-full text-sm font-semibold bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors');
            buttonElement.className = 'active-filter px-6 py-2.5 rounded-full text-sm font-bold bg-brand-700 text-white transition-colors';
            
            const filterValue = buttonElement.innerText;
            const postContainer = document.getElementById('public-posts-container');
            postContainer.innerHTML = '';
            
            const filteredPosts = posts.filter(p => p.status === 'approved' && (filterValue === 'Tất cả' || p.tag === filterValue));
            filteredPosts.forEach(post => {
                postContainer.innerHTML += `
                    <article class="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100 cursor-pointer group" onclick="openPostDetail('${post.id}')">
                        <figure class="h-56 bg-gray-200 overflow-hidden relative">
                            <img src="${post.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            <span class="absolute top-4 left-4 bg-white/90 text-brand-700 px-3 py-1 rounded-full text-xs font-bold">${post.tag}</span>
                        </figure>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600">${post.title}</h3>
                            <p class="text-gray-600 text-sm line-clamp-2">${post.content}</p>
                        </div>
                    </article>
                `;
            });
            if(filteredPosts.length === 0) postContainer.innerHTML = '<p class="col-span-full text-center text-gray-500 py-10">Chưa có bài viết nào.</p>';
        }

        function renderCreatorList() {
            const container = document.getElementById('creator-list-container');
            container.innerHTML = '';
            Object.values(creators).forEach(creator => {
                container.innerHTML += `
                    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md cursor-pointer transition-shadow" onclick="openCreatorProfile('${creator.id}')">
                        <img src="https://i.pravatar.cc/150?img=${creator.avatar}" class="w-24 h-24 rounded-full border-4 border-brand-50 mb-4 shadow-sm">
                        <h3 class="text-xl font-bold text-gray-900 mb-1">${creator.name}</h3>
                        <p class="text-brand-600 text-sm font-bold mb-3">${creator.role}</p>
                        <p class="text-gray-500 text-sm line-clamp-2 mb-4">${creator.bio}</p>
                        <button class="px-6 py-2 bg-gray-50 text-brand-700 font-bold rounded-full hover:bg-brand-50 transition-colors w-full border border-gray-200">Xem hồ sơ</button>
                    </div>
                `;
            });
        }

        window.openCreatorProfile = function(creatorId) {
            renderCreatorProfile(creatorId);
            switchView('view-cre-profile');
        }

        function renderCreatorProfile(creatorId) {
            const creator = creators[creatorId];
            if(!creator) return;
            const container = document.getElementById('creator-profile-container');
            const creatorPosts = posts.filter(p => p.authorId === creatorId && p.status === 'approved');
            
            let postsHTML = creatorPosts.map(post => `
                <article class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow group" onclick="openPostDetail('${post.id}')">
                    <img src="${post.image}" class="w-full h-56 object-cover bg-gray-200 group-hover:scale-105 transition-transform">
                    <div class="p-6">
                        <h3 class="font-bold text-xl mb-2 group-hover:text-brand-600 transition-colors">${post.title}</h3>
                        <p class="text-sm text-gray-500 line-clamp-2">${post.content}</p>
                    </div>
                </article>
            `).join('');
            if(creatorPosts.length === 0) postsHTML = '<p class="text-gray-500">Chưa có bài viết nào được xuất bản.</p>';

            container.innerHTML = `
                <div class="w-full h-64 bg-gray-300 relative shadow-inner">
                    <img src="https://picsum.photos/id/${creator.cover}/1920/400" class="w-full h-full object-cover">
                </div>
                <div class="max-w-5xl mx-auto px-4 sm:px-6 relative -mt-16">
                    <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-10">
                        <div class="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                            <img src="https://i.pravatar.cc/150?img=${creator.avatar}" class="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white">
                            <div class="flex-grow pt-2">
                                <h1 class="text-3xl font-bold text-gray-900 flex flex-col md:flex-row items-center gap-2 justify-center md:justify-start">
                                    ${creator.name} 
                                    <span class="bg-brand-50 text-brand-700 text-xs px-2 py-1 rounded-full border border-brand-200 mt-2 md:mt-0 font-bold flex items-center gap-1">
                                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Verified
                                    </span>
                                </h1>
                                <p class="text-gray-600 mt-2 max-w-xl mx-auto md:mx-0">${creator.bio}</p>
                            </div>
                            <div class="flex-shrink-0 pt-2 text-center border-t md:border-t-0 md:border-l border-gray-100 mt-4 md:mt-0 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                                <p class="text-3xl font-bold text-gray-900">${creatorPosts.length}</p>
                                <p class="text-xs text-gray-500 uppercase font-bold">Bài viết</p>
                            </div>
                        </div>
                    </div>
                    <h3 class="text-2xl font-bold mb-6 text-gray-900">Bài viết của Nghệ nhân</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">${postsHTML}</div>
                </div>
            `;
        }

        window.openPostDetail = function(postId) {
            const post = posts.find(p => p.id === postId);
            if(!post) return;
            const author = creators[post.authorId];
            switchView('view-exp-detail');
            document.getElementById('detail-container').innerHTML = `
                <button onclick="switchView('view-exp-discover')" class="mb-6 font-bold text-gray-500 hover:text-brand-600 flex items-center gap-2 transition-colors">&larr; Trở lại danh sách</button>
                <div class="w-full h-64 md:h-96 rounded-3xl overflow-hidden relative mb-10 bg-gray-200 shadow-sm">
                    <img src="${post.image}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div class="absolute bottom-10 left-10 text-white pr-10">
                        <span class="bg-brand-600 px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block shadow-sm">${post.tag}</span>
                        <h1 class="text-3xl md:text-5xl font-bold drop-shadow-md leading-tight">${post.title}</h1>
                    </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-10">
                    <div class="lg:col-span-2 space-y-6">
                        <article class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <div class="flex items-center gap-4 pb-6 mb-6 border-b border-gray-100 cursor-pointer hover:bg-brand-50 p-4 rounded-2xl transition-colors group" onclick="openCreatorProfile('${author.id}')">
                                <img src="https://i.pravatar.cc/150?img=${author.avatar}" class="w-14 h-14 rounded-full border border-gray-200">
                                <div>
                                    <p class="text-xs font-bold text-gray-500 uppercase">Nghệ nhân kể chuyện</p>
                                    <h4 class="font-bold text-lg text-gray-900 group-hover:text-brand-700">${author.name}</h4>
                                </div>
                                <span class="ml-auto text-brand-600 font-bold text-sm">Xem hồ sơ &rarr;</span>
                            </div>
                            <div class="text-lg text-gray-700 leading-relaxed space-y-4 whitespace-pre-line">${post.content}</div>
                        </article>
                    </div>
                    <div class="lg:col-span-1">
                        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                            <div class="bg-gradient-to-r from-brand-700 to-brand-600 p-6 rounded-2xl text-white text-center shadow-md">
                                <h4 class="font-bold mb-3 text-lg">Hứng thú với câu chuyện?</h4>
                                <p class="text-sm text-brand-100 mb-4">Sử dụng AI để đưa địa điểm này vào lịch trình chuyến đi của bạn.</p>
                                <button onclick="switchView('view-exp-trail'); document.getElementById('ai-input').value = 'Đưa tôi đến thăm ${post.title}';" class="w-full bg-white text-brand-800 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-sm flex items-center justify-center gap-2">
                                    <svg class="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    Tạo lịch trình AI
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderCreatorManagePosts() {
            if(!currentUser) return;
            const container = document.getElementById('creator-posts-container');
            container.innerHTML = '';
            const myPosts = posts.filter(p => p.authorId === currentUser.id);
            myPosts.forEach(post => {
                let statusHtml = post.status === 'approved' 
                    ? '<span class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">Đã xuất bản</span>'
                    : post.status === 'pending'
                    ? '<span class="bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">Chờ duyệt</span>'
                    : '<span class="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">Bị từ chối</span>';

                container.innerHTML += `
                    <div class="post-item bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:shadow-md transition-shadow cursor-pointer" onclick="openPostDetail('${post.id}')">
                        <img src="${post.image}" class="w-full sm:w-28 h-40 sm:h-28 object-cover rounded-2xl bg-gray-200">
                        <div class="flex-grow">
                            <h3 class="font-bold text-xl text-gray-900 mb-1 hover:text-brand-700">${post.title}</h3>
                            ${statusHtml}
                        </div>
                        <div class="flex gap-2 w-full sm:w-auto justify-end border-t sm:border-none pt-4 sm:pt-0 border-gray-100 mt-2 sm:mt-0" onclick="event.stopPropagation()">
                            <button onclick="deletePost('${post.id}', this)" class="p-2.5 bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors" title="Xóa bài"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                `;
            });
            if(myPosts.length === 0) container.innerHTML = '<p class="text-gray-500 text-center py-10">Bạn chưa tạo bài viết nào.</p>';
        }

        window.deletePost = function(postId, btnElement) {
            posts = posts.filter(p => p.id !== postId);
            const postItem = btnElement.closest('.post-item');
            if(postItem) {
                postItem.style.opacity = '0';
                setTimeout(() => postItem.remove(), 300);
                showToast('Đã xóa bài viết thành công');
            }
        }

        window.submitNewPost = function(e) {
            e.preventDefault();
            const newPost = {
                id: 'CT-' + Math.floor(Math.random() * 9000 + 1000),
                authorId: currentUser.id, status: 'pending',
                tag: document.getElementById('post-tag').value,
                title: document.getElementById('post-title').value,
                image: document.getElementById('post-image').value,
                content: document.getElementById('post-content').value,
            };
            posts.unshift(newPost);
            showToast('Bài viết đã được gửi để kiểm duyệt!');
            document.getElementById('form-create-post').reset();
            switchView('view-cre-story');
        }

        function renderAdminDashboard() {
            const pending = posts.filter(p => p.status === 'pending');
            const approved = posts.filter(p => p.status === 'approved');
            document.getElementById('stat-pending').innerText = pending.length;
            document.getElementById('stat-approved').innerText = approved.length;

            const queueContainer = document.getElementById('admin-queue-container');
            queueContainer.innerHTML = '';
            pending.forEach(post => {
                const author = creators[post.authorId];
                queueContainer.innerHTML += `
                    <div onclick="openReviewMode('${post.id}')" class="flex flex-col sm:flex-row justify-between sm:items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors border border-gray-100 mb-3 cursor-pointer group">
                        <div class="flex gap-4 items-center mb-2 sm:mb-0">
                            <img src="${post.image}" class="w-16 h-12 object-cover rounded-lg border border-gray-200">
                            <div>
                                <p class="text-base font-bold text-gray-900 group-hover:text-brand-600">${post.title}</p>
                                <p class="text-sm text-gray-500">Tác giả: ${author.name}</p>
                            </div>
                        </div>
                        <span class="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 whitespace-nowrap">Chờ duyệt</span>
                    </div>
                `;
            });
            if(pending.length === 0) queueContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Không có bài viết nào cần duyệt.</p>';
        }

        window.openReviewMode = function(postId) {
            currentReviewPostId = postId;
            const post = posts.find(p => p.id === postId);
            if(!post) return;
            switchView('view-cur-review');
            document.getElementById('review-container').innerHTML = `
                <h2 class="text-3xl font-bold mb-8">Duyệt bài: #${post.id}</h2>
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
                    <div class="lg:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <span class="bg-yellow-50 text-yellow-700 px-4 py-1.5 rounded-full text-xs font-bold border border-yellow-200 mb-6 inline-block">Trạng thái: Chờ duyệt</span>
                        <h2 class="text-4xl font-bold mb-6 text-gray-900 leading-snug">${post.title}</h2>
                        <img src="${post.image}" class="w-full h-72 object-cover rounded-2xl mb-8 bg-gray-200 shadow-sm">
                        <div class="text-lg text-gray-700 leading-relaxed whitespace-pre-line">${post.content}</div>
                    </div>
                    <div class="lg:col-span-5 space-y-6">
                        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <h3 class="font-bold text-gray-900 mb-4 px-2">Quyết định</h3>
                            <button onclick="approvePost()" class="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl mb-3 shadow-md hover:bg-emerald-600 transition-colors text-lg">Phê duyệt Xuất bản</button>
                            <button onclick="rejectPost()" class="w-full py-4 bg-white border-2 border-red-200 text-red-600 font-bold rounded-2xl hover:bg-red-50 transition-colors text-lg flex items-center justify-center gap-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> Từ chối & Xóa bài</button>
                        </div>
                    </div>
                </div>
            `;
        }

        window.approvePost = function() {
            if(!currentReviewPostId) return;
            const post = posts.find(p => p.id === currentReviewPostId);
            if(post) post.status = 'approved';
            showToast('Đã phê duyệt bài viết!');
            switchView('view-adm-dash');
        }

        window.rejectPost = function() {
            if(!currentReviewPostId) return;
            posts = posts.filter(p => p.id !== currentReviewPostId);
            showToast('Đã từ chối và xóa bài viết khỏi hệ thống', 'error');
            switchView('view-adm-dash');
        }

        const chatHeader = document.getElementById('chat-header');
        const chatWidget = document.getElementById('chat-widget-container');
        let isDragging = false;
        let startX = 0, startY = 0, currentX = 0, currentY = 0;

        chatHeader.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - currentX; startY = e.clientY - currentY;
            chatWidget.style.transition = 'none'; 
            document.addEventListener('mousemove', dragMove); document.addEventListener('mouseup', dragEnd);
        });
        function dragMove(e) {
            if (!isDragging) return; e.preventDefault(); 
            currentX = e.clientX - startX; currentY = e.clientY - startY;
            chatWidget.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
        function dragEnd() {
            isDragging = false; chatWidget.style.transition = 'transform 0.3s ease'; 
            document.removeEventListener('mousemove', dragMove); document.removeEventListener('mouseup', dragEnd);
        }
        window.toggleChat = function() {
            const w = document.getElementById('chat-window');
            w.classList.toggle('hidden'); w.classList.toggle('flex');
            if(!w.classList.contains('hidden')) document.getElementById('chat-input').focus();
        };
        
        window.sendChatMessage = async function() {
            const input = document.getElementById('chat-input');
            const msg = input.value.trim();
            if(!msg) return;
            const box = document.getElementById('chat-messages');
            
            // Hiển thị tin nhắn của người dùng
            box.innerHTML += `<div class="bg-brand-600 text-white p-3 rounded-2xl rounded-tr-none self-end max-w-[85%] ml-auto shadow-sm">${msg}</div>`;
            input.value = ''; box.scrollTop = box.scrollHeight;
            
            // Hiển thị trạng thái đang tải
            const loadingId = 'chat-loading-' + Date.now();
            box.innerHTML += `
                <div id="${loadingId}" class="flex gap-2">
                    <div class="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 flex-shrink-0 border border-brand-200">✨</div>
                    <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-gray-500 border border-gray-100 flex items-center gap-2 text-sm">
                        <svg class="animate-spin h-4 w-4 text-brand-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Đang phân tích...
                    </div>
                </div>`;
            box.scrollTop = box.scrollHeight;

            try {
                const systemPrompt = "Bạn là một trợ lý ảo am hiểu về văn hóa, du lịch, lịch sử và các làng nghề truyền thống của Việt Nam. Tên của bạn là Trợ lý Văn hóa AI. Hãy trả lời ngắn gọn, thân thiện và hữu ích, sử dụng tiếng Việt.";
                const payload = {
                    contents: [{ parts: [{ text: msg }] }],
                    systemInstruction: { parts: [{ text: systemPrompt }] }
                };
                const apiKey = "AQ.Ab8RN6L52TxquN7Cs4vFw033ZK8-bCdRtg5k5TU11fK72McJIQ"; // API Key được Canvas tự động truyền vào
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if(!response.ok) throw new Error('Lỗi kết nối tới AI');
                const result = await response.json();
                let reply = result.candidates[0].content.parts[0].text;
                
                // Format markdown cơ bản sang HTML
                reply = reply.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>');

                document.getElementById(loadingId).outerHTML = `
                    <div class="flex gap-2">
                        <div class="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 flex-shrink-0 border border-brand-200">✨</div>
                        <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-gray-700 border border-gray-100 max-w-[85%] leading-relaxed">${reply}</div>
                    </div>`;
            } catch (error) {
                document.getElementById(loadingId).outerHTML = `
                    <div class="flex gap-2">
                        <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 flex-shrink-0 border border-red-200">!</div>
                        <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-red-600 border border-red-100 max-w-[85%]">Xin lỗi, tôi đang gặp sự cố kết nối tới máy chủ AI. Vui lòng thử lại sau!</div>
                    </div>`;
            }
            box.scrollTop = box.scrollHeight;
        };

        window.runGeminiAiGenerator = async function() {
            const input = document.getElementById('ai-input').value;
            const btn = document.getElementById('btn-generate-ai');
            const load = document.getElementById('ai-loading');
            const res = document.getElementById('ai-results');
            const timelineList = document.getElementById('ai-timeline-list');
            
            if(!input.trim()) return showToast('Vui lòng nhập mong muốn của bạn!', 'warning');

            btn.innerHTML = 'Đang tạo...'; btn.disabled = true;
            res.classList.add('hidden'); load.classList.remove('hidden');

            const systemPrompt = `Bạn là một chuyên gia thiết kế tour du lịch văn hóa Việt Nam. 
            Nhiệm vụ của bạn là nhận yêu cầu của người dùng và tạo ra một lịch trình chi tiết (timeline).
            TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON MẢNG (Array of Objects), KHÔNG BAO GỒM VĂN BẢN NÀO KHÁC BÊN NGOÀI JSON.
            Mỗi Object có cấu trúc:
            {
                "time": "khoảng thời gian (ví dụ 08:00 - 10:00)",
                "title": "Tiêu đề hoạt động ngắn gọn",
                "desc": "Mô tả chi tiết và hấp dẫn về hoạt động"
            }`;

            const payload = {
                contents: [{ parts: [{ text: `Yêu cầu lịch trình: ${input}` }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
                generationConfig: { responseMimeType: "application/json" }
            };

            const apiKey = "AQ.Ab8RN6L52TxquN7Cs4vFw033ZK8-bCdRtg5k5TU11fK72McJIQ"; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if(!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                const jsonText = result.candidates[0].content.parts[0].text;
                const schedule = JSON.parse(jsonText);

                timelineList.innerHTML = '';
                schedule.forEach((item, index) => {
                    timelineList.innerHTML += `
                        <li class="relative pl-8 animate-fade-in" style="animation-delay: ${index * 0.1}s">
                            <span class="absolute flex items-center justify-center w-5 h-5 bg-brand-500 rounded-full -left-[11px] top-1 ring-4 ring-slate-50 text-white text-[10px] font-bold">${index + 1}</span>
                            <time class="mb-3 text-sm font-bold text-brand-700 bg-brand-50 px-4 py-1.5 rounded-full border border-brand-100 inline-block shadow-sm">${item.time}</time>
                            <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mt-2 hover:shadow-md transition-shadow">
                                <h4 class="text-xl font-bold text-gray-900 mb-2">${item.title}</h4>
                                <p class="text-gray-600 text-sm">${item.desc}</p>
                            </div>
                        </li>
                    `;
                });
            } catch (error) {
                console.log("Gemini API Feedback: Missing API Key, using mock data as fallback.");
                timelineList.innerHTML = `
                    <div class="bg-red-50 p-6 rounded-3xl border border-red-200 text-red-700 font-semibold text-center">
                        Có lỗi xảy ra hoặc không tìm thấy API Key hợp lệ. (Để gọi AI thực tế, cần điền apiKey vào mã nguồn).<br>
                        Mô phỏng kết quả...
                    </div>
                    <li class="relative pl-8 mt-6">
                        <span class="absolute flex items-center justify-center w-5 h-5 bg-brand-500 rounded-full -left-[11px] top-1 ring-4 ring-slate-50 text-white text-[10px] font-bold">1</span>
                        <time class="mb-3 text-sm font-bold text-brand-700 bg-brand-50 px-4 py-1.5 rounded-full border border-brand-100 inline-block shadow-sm">08:00 - 10:30</time>
                        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mt-2">
                            <h4 class="text-xl font-bold text-gray-900 mb-2">Thăm quan làng nghề</h4>
                            <p class="text-gray-600 text-sm">Đi dạo quanh làng cổ và ngắm nhìn các xưởng chế tác.</p>
                        </div>
                    </li>
                `;
            } finally {
                load.classList.add('hidden'); res.classList.remove('hidden');
                btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Tạo lại'; 
                btn.disabled = false;
            }
        };

        // Khởi tạo
        document.addEventListener("DOMContentLoaded", () => switchView('view-home'));

        /* ==========================================================================
           [V2] MỞ RỘNG: THÊM NGHỆ NHÂN + QUY TRÌNH DUYỆT BÀI + KHU QUẢN TRỊ ADMIN
           --------------------------------------------------------------------------
           Toàn bộ khối bên dưới là CODE MỚI, được THÊM VÀO CUỐI file. Không một dòng
           code gốc nào bị sửa hay bị xoá. Những hàm gốc cần nâng cấp sẽ được gán đè
           theo dạng  tenHam = function () {...}  ngay trong khối này (binding của
           function declaration ở global scope nên gán đè có hiệu lực với mọi lời gọi).
           ========================================================================== */

        /* ---------- A. BỔ SUNG NGHỆ NHÂN MỚI ---------- */
        Object.assign(creators['creator1'], {
            craft: 'Dệt lụa', village: 'Vạn Phúc, Hà Đông, Hà Nội', experience: 42,
            phone: '0912 345 678', email: 'lan.lua@culturetrail.vn',
            joinedAt: '2021-03-14', verified: true, active: true
        });

        Object.assign(creators, {
            'creator2': {
                id: 'creator2', name: 'Chú Hùng Gốm Sứ', role: 'Nghệ nhân Gốm Bát Tràng', avatar: '59', cover: '1060',
                bio: 'Ba đời làm gốm bên sông Hồng, chuyên men lam cổ và kỹ thuật vuốt tay trên bàn xoay gỗ.',
                craft: 'Gốm sứ', village: 'Bát Tràng, Gia Lâm, Hà Nội', experience: 35,
                phone: '0903 222 111', email: 'hung.gom@culturetrail.vn',
                joinedAt: '2021-07-02', verified: true, active: true
            },
            'creator3': {
                id: 'creator3', name: 'Cô Mai Mây Tre', role: 'Nghệ nhân Mây tre đan Phú Vinh', avatar: '45', cover: '1080',
                bio: 'Đưa sản phẩm mây tre đan Phú Vinh ra thị trường quốc tế, dạy nghề miễn phí cho thanh niên trong làng.',
                craft: 'Mây tre đan', village: 'Phú Vinh, Phú Nghĩa, Hà Nội', experience: 28,
                phone: '0915 777 888', email: 'mai.maytre@culturetrail.vn',
                joinedAt: '2022-01-19', verified: true, active: true
            },
            'creator4': {
                id: 'creator4', name: 'Bác Tám Đờn Ca', role: 'Nghệ nhân Đờn ca tài tử', avatar: '60', cover: '1056',
                bio: 'Nghệ nhân ưu tú, hơn 50 năm giữ lửa đờn ca tài tử Nam Bộ và truyền nghề đàn kìm cho lớp trẻ.',
                craft: 'Âm nhạc dân gian', village: 'TP. Bạc Liêu', experience: 52,
                phone: '0908 555 444', email: 'tam.donca@culturetrail.vn',
                joinedAt: '2022-05-30', verified: true, active: true
            },
            'creator5': {
                id: 'creator5', name: 'Chị Hoa Tranh Dân Gian', role: 'Nghệ nhân Tranh Đông Hồ', avatar: '44', cover: '1074',
                bio: 'In tranh Đông Hồ từ ván gỗ thị trăm tuổi, tự tay làm giấy dó và quét màu điệp óng ánh.',
                craft: 'Tranh dân gian', village: 'Đông Hồ, Thuận Thành, Bắc Ninh', experience: 21,
                phone: '0977 333 222', email: 'hoa.tranh@culturetrail.vn',
                joinedAt: '2023-02-11', verified: false, active: true
            },
            'creator6': {
                id: 'creator6', name: 'Anh Khang Bếp Huế', role: 'Nghệ nhân Ẩm thực cung đình', avatar: '53', cover: '1082',
                bio: 'Đầu bếp cung đình Huế đời thứ tư, phục dựng các món ngự thiện và bánh trái dân gian xứ Huế.',
                craft: 'Ẩm thực', village: 'Kim Long, TP. Huế', experience: 19,
                phone: '0934 666 999', email: 'khang.bephue@culturetrail.vn',
                joinedAt: '2023-09-08', verified: true, active: true
            }
        });

        /* Mỗi nghệ nhân đều có tài khoản demo để đăng nhập thử */
        Object.assign(profiles, {
            creator2: creators['creator2'],
            creator3: creators['creator3'],
            creator4: creators['creator4'],
            creator5: creators['creator5'],
            creator6: creators['creator6']
        });

        /* ---------- B. BỔ SUNG BÀI VIẾT CỦA CÁC NGHỆ NHÂN MỚI ---------- */
        const ctPostDates = {
            'CT-1001': '2026-01-12', 'CT-1002': '2026-01-20', 'CT-1003': '2026-02-02',
            'CT-1004': '2026-02-08', 'CT-1005': '2026-02-15', 'CT-1006': '2026-02-22',
            'CT-9999': '2026-03-02'
        };
        posts.forEach(p => { if (!p.createdAt) p.createdAt = ctPostDates[p.id] || '2026-01-05'; });

        /* Bài "Vuốt gốm Bát Tràng" hợp với nghệ nhân gốm hơn */
        const ctPost1003 = posts.find(p => p.id === 'CT-1003');
        if (ctPost1003) ctPost1003.authorId = 'creator2';

        posts.push(
            { id: 'CT-1007', authorId: 'creator2', status: 'approved', tag: 'Làng nghề', title: 'Men lam hoa nâu – hồn đất Bát Tràng', image: 'https://picsum.photos/id/1050/800/600', content: 'Màu men lam được pha từ tro trấu và đá trường thạch, nung ở 1.300 độ suốt 36 giờ. Mỗi mẻ gốm ra lò đều mang một sắc độ riêng, không lần nào giống lần nào...', createdAt: '2026-02-25' },
            { id: 'CT-1008', authorId: 'creator3', status: 'approved', tag: 'Thủ công', title: 'Giỏ mây Phú Vinh đi ra thế giới', image: 'https://picsum.photos/id/1084/800/600', content: 'Sợi mây được chẻ mỏng như lá lúa, phơi đủ ba nắng rồi mới đan. Một chiếc giỏ cỡ trung cần tới 1.200 mũi đan và gần hai ngày làm việc liên tục...', createdAt: '2026-02-27' },
            { id: 'CT-1009', authorId: 'creator4', status: 'approved', tag: 'Nghệ thuật', title: 'Dạ cổ hoài lang giữa đêm trăng Bạc Liêu', image: 'https://picsum.photos/id/1041/800/600', content: 'Tiếng đàn kìm ngân lên trong đêm trăng, sáu câu vọng cổ kể chuyện người chinh phu. Đờn ca tài tử không diễn trên sân khấu, mà sống trong hơi thở xóm làng...', createdAt: '2026-03-03' },
            { id: 'CT-1010', authorId: 'creator5', status: 'approved', tag: 'Nghệ thuật', title: 'Tranh Đông Hồ in từ ván gỗ thị trăm tuổi', image: 'https://picsum.photos/id/1080/800/600', content: 'Giấy dó quét màu điệp óng ánh, ván khắc gỗ thị, màu in lấy từ hoa hòe, lá chàm, quả gấc. Bức "Đám cưới chuột" đã đi qua hơn năm thế kỷ như thế...', createdAt: '2026-03-05' },
            { id: 'CT-1011', authorId: 'creator6', status: 'approved', tag: 'Ẩm thực', title: 'Bún bò Huế – bí mật của nồi nước dùng', image: 'https://picsum.photos/id/1082/800/600', content: 'Ninh xương ống suốt sáu tiếng, thêm mắm ruốc Huế khuấy tan đúng độ, điểm màu điều và sả đập dập. Bát bún chuẩn vị cung đình phải trong mà đậm, cay mà thanh...', createdAt: '2026-03-06' },
            { id: 'CT-1012', authorId: 'creator2', status: 'pending', tag: 'Di tích', title: 'Lò nung cổ 500 tuổi còn đỏ lửa', image: 'https://picsum.photos/id/1053/800/600', content: 'Chiếc lò bầu cổ nhất Bát Tràng vẫn được giữ nguyên vẹn. Tôi muốn kể lại cách cha ông xếp gốm vào lò và canh lửa bằng kinh nghiệm dân gian...', createdAt: '2026-03-08' },
            { id: 'CT-1013', authorId: 'creator3', status: 'pending', tag: 'Lễ hội', title: 'Hội làng Phú Vinh mùa tháng Giêng', image: 'https://picsum.photos/id/1062/800/600', content: 'Mỗi dịp tháng Giêng, làng nghề lại mở hội tri ân tổ nghề. Phần rước kiệu và thi đan nhanh thu hút hàng nghìn du khách thập phương...', createdAt: '2026-03-09' },
            { id: 'CT-1014', authorId: 'creator5', status: 'pending', tag: 'Thủ công', title: 'Tự tay làm giấy dó cùng nghệ nhân', image: 'https://picsum.photos/id/1074/800/600', content: 'Hướng dẫn trải nghiệm trọn một ngày trong xưởng: seo giấy, bóc phơi, quét điệp và in tranh từ ván khắc cổ...', createdAt: '2026-03-10' },
            { id: 'CT-1015', authorId: 'creator6', status: 'pending', tag: 'Ẩm thực', title: 'Mâm ngự thiện mười hai món của vua triều Nguyễn', image: 'https://picsum.photos/id/1060/800/600', content: 'Phục dựng mâm cơm cung đình với nem công chả phượng, bát trân và các loại bánh trái tạo hình tinh xảo...', createdAt: '2026-03-11' },
            { id: 'CT-1016', authorId: 'creator4', status: 'rejected', tag: 'Nghệ thuật', title: 'Quảng bá lớp học đàn miễn phí', image: 'https://picsum.photos/id/1025/800/600', content: 'Lớp học mở cửa mỗi tối thứ Bảy tại nhà riêng, học viên đóng phí tự nguyện...', createdAt: '2026-03-04', rejectReason: 'Nội dung mang tính quảng cáo dịch vụ riêng, chưa phù hợp tiêu chí cộng đồng.' }
        );

        /* ---------- C. CẤU HÌNH ĐIỀU HƯỚNG CHO CÁC VIEW QUẢN TRỊ MỚI ---------- */
        noPublicHeaderViews.push('view-adm-posts', 'view-adm-creators', 'view-adm-reports');

        menus.admin = [
            { id: 'view-adm-dash', icon: '📊', label: 'Tổng quan' },
            { id: 'view-adm-posts', icon: '📝', label: 'Quản lý Bài viết' },
            { id: 'view-adm-creators', icon: '🏺', label: 'Quản lý Nghệ nhân' },
            { id: 'view-adm-reports', icon: '📈', label: 'Báo cáo & Thống kê' }
        ];

        /* Mở rộng switchView: tự render dữ liệu khi vào các khu quản trị mới */
        const _switchViewV1 = switchView;
        switchView = function (targetId) {
            _switchViewV1(targetId);
            if (targetId === 'view-adm-posts') renderAdminPosts();
            if (targetId === 'view-adm-creators') renderAdminCreators();
            if (targetId === 'view-adm-reports') renderAdminReports();
            if (targetId === 'view-cre-create') {
                /* Người dùng chủ động mở trang soạn bài -> thoát chế độ chỉnh sửa.
                   (editPost() sẽ gọi ctLoadPostIntoForm() ngay sau đó để bật lại) */
                window.ctEditingPostId = null;
                if (typeof ctSetPostFormMode === 'function') ctSetPostFormMode(false, null);
            }
        };

        /* ---------- D. HÀM TIỆN ÍCH CHUNG ---------- */
        function ctEscape(value) {
            return String(value == null ? '' : value)
                .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        }
        function ctAuthor(post) {
            return creators[post.authorId] || { id: post.authorId, name: 'Nghệ nhân không xác định', role: '—', avatar: '12' };
        }
        function ctStatusMeta(status) {
            if (status === 'approved') return { label: 'Đã xuất bản', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
            if (status === 'pending') return { label: 'Chờ duyệt', pill: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
            if (status === 'rejected') return { label: 'Bị từ chối', pill: 'bg-red-50 text-red-700 border-red-200' };
            return { label: 'Bản nháp', pill: 'bg-gray-100 text-gray-600 border-gray-200' };
        }
        function ctFormatDate(iso) {
            if (!iso) return '—';
            const parts = String(iso).split('-');
            return parts.length === 3 ? parts[2] + '/' + parts[1] + '/' + parts[0] : iso;
        }
        function ctToday() {
            const d = new Date();
            return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        }
        function ctNewPostId() {
            let max = 1000;
            posts.forEach(p => {
                const n = parseInt(String(p.id).replace('CT-', ''), 10);
                /* bỏ qua mã 9999 (bài mẫu đặc biệt của dữ liệu gốc) */
                if (!isNaN(n) && n > max && n < 9000) max = n;
            });
            return 'CT-' + (max + 1);
        }
        function ctCountBy(status) { return posts.filter(p => p.status === status).length; }

        /* Ghi trạng thái xuống sessionStorage (các hàm lưu nằm trong page-nav.js) */
        function ctPersist() {
            if (typeof ctSavePosts === 'function') ctSavePosts();
            if (typeof ctSaveCreators === 'function') ctSaveCreators();
        }

        /* ---------- E. DANH SÁCH NGHỆ NHÂN CÔNG KHAI (ẩn tài khoản bị khoá) ---------- */
        renderCreatorList = function () {
            const container = document.getElementById('creator-list-container');
            if (!container) return;
            container.innerHTML = '';
            const list = Object.values(creators).filter(c => c.active !== false);
            list.forEach(creator => {
                const published = posts.filter(p => p.authorId === creator.id && p.status === 'approved').length;
                container.innerHTML += `
                    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md cursor-pointer transition-shadow" onclick="openCreatorProfile('${creator.id}')">
                        <div class="relative mb-4">
                            <img src="https://i.pravatar.cc/150?img=${creator.avatar}" class="w-24 h-24 rounded-full border-4 border-brand-50 shadow-sm">
                            ${creator.verified ? '<span class="absolute bottom-1 right-1 w-6 h-6 bg-brand-600 rounded-full border-2 border-white flex items-center justify-center" title="Đã xác minh"><svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></span>' : ''}
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-1">${creator.name}</h3>
                        <p class="text-brand-600 text-sm font-bold mb-1">${creator.role}</p>
                        <p class="text-gray-400 text-xs mb-3">📍 ${creator.village || 'Việt Nam'} · ${published} bài viết</p>
                        <p class="text-gray-500 text-sm line-clamp-2 mb-4">${creator.bio}</p>
                        <button class="px-6 py-2 bg-gray-50 text-brand-700 font-bold rounded-full hover:bg-brand-50 transition-colors w-full border border-gray-200">Xem hồ sơ</button>
                    </div>
                `;
            });
            if (list.length === 0) container.innerHTML = '<p class="col-span-full text-center text-gray-500 py-10">Chưa có nghệ nhân nào.</p>';
        };

        /* ---------- F. HỒ SƠ NGHỆ NHÂN (bổ sung nghề, làng, liên hệ cho admin) ---------- */
        renderCreatorProfile = function (creatorId) {
            const creator = creators[creatorId];
            if (!creator) return;
            const container = document.getElementById('creator-profile-container');
            if (!container) return;
            const creatorPosts = posts.filter(p => p.authorId === creatorId && p.status === 'approved');
            const isAdmin = currentUser && currentUser.role === 'Admin';

            let postsHTML = creatorPosts.map(post => `
                <article class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow group" onclick="openPostDetail('${post.id}')">
                    <img src="${post.image}" class="w-full h-56 object-cover bg-gray-200 group-hover:scale-105 transition-transform">
                    <div class="p-6">
                        <span class="inline-block bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full mb-3">${post.tag}</span>
                        <h3 class="font-bold text-xl mb-2 group-hover:text-brand-600 transition-colors">${post.title}</h3>
                        <p class="text-sm text-gray-500 line-clamp-2">${post.content}</p>
                    </div>
                </article>
            `).join('');
            if (creatorPosts.length === 0) postsHTML = '<p class="text-gray-500">Chưa có bài viết nào được xuất bản.</p>';

            let badgesHTML = '';
            if (creator.verified) badgesHTML += '<span class="bg-brand-50 text-brand-700 text-xs px-2 py-1 rounded-full border border-brand-200 mt-2 md:mt-0 font-bold flex items-center gap-1"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Verified</span>';
            else badgesHTML += '<span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200 mt-2 md:mt-0 font-bold">Chờ xác minh</span>';
            if (creator.active === false) badgesHTML += '<span class="bg-red-50 text-red-600 text-xs px-2 py-1 rounded-full border border-red-200 mt-2 md:mt-0 font-bold">Đã khoá</span>';

            let contactHTML = '';
            if (isAdmin) {
                contactHTML = '<div class="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">'
                    + '<div><p class="text-gray-400 font-bold uppercase text-xs mb-1">Điện thoại</p><p class="font-bold text-gray-800">' + (creator.phone || '—') + '</p></div>'
                    + '<div><p class="text-gray-400 font-bold uppercase text-xs mb-1">Email</p><p class="font-bold text-gray-800 break-all">' + (creator.email || '—') + '</p></div>'
                    + '<div><p class="text-gray-400 font-bold uppercase text-xs mb-1">Tham gia</p><p class="font-bold text-gray-800">' + ctFormatDate(creator.joinedAt) + '</p></div>'
                    + '<div><p class="text-gray-400 font-bold uppercase text-xs mb-1">Mã nghệ nhân</p><p class="font-bold text-gray-800">' + creator.id + '</p></div>'
                    + '</div>';
            }

            container.innerHTML = `
                <div class="w-full h-64 bg-gray-300 relative shadow-inner">
                    <img src="https://picsum.photos/id/${creator.cover}/1920/400" class="w-full h-full object-cover">
                </div>
                <div class="max-w-5xl mx-auto px-4 sm:px-6 relative -mt-16">
                    <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
                        <div class="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                            <img src="https://i.pravatar.cc/150?img=${creator.avatar}" class="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white">
                            <div class="flex-grow pt-2">
                                <h1 class="text-3xl font-bold text-gray-900 flex flex-col md:flex-row items-center gap-2 justify-center md:justify-start">
                                    ${creator.name}
                                    ${badgesHTML}
                                </h1>
                                <p class="text-brand-600 font-bold mt-2">${creator.role}</p>
                                <p class="text-gray-600 mt-2 max-w-xl mx-auto md:mx-0">${creator.bio}</p>
                                <div class="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
                                    <span class="bg-gray-50 border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full">🎨 ${creator.craft || 'Thủ công truyền thống'}</span>
                                    <span class="bg-gray-50 border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full">📍 ${creator.village || 'Việt Nam'}</span>
                                    <span class="bg-gray-50 border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full">⏳ ${creator.experience || 0} năm kinh nghiệm</span>
                                </div>
                            </div>
                            <div class="flex-shrink-0 pt-2 text-center border-t md:border-t-0 md:border-l border-gray-100 mt-4 md:mt-0 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                                <p class="text-3xl font-bold text-gray-900">${creatorPosts.length}</p>
                                <p class="text-xs text-gray-500 uppercase font-bold">Bài viết</p>
                                <button onclick="switchView('view-exp-trail')" class="mt-4 w-full bg-brand-700 hover:bg-brand-800 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors">Lịch trình AI</button>
                            </div>
                        </div>
                        ${contactHTML}
                    </div>
                    <h3 class="text-2xl font-bold mb-6 text-gray-900">Bài viết của Nghệ nhân</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">${postsHTML}</div>
                </div>
            `;
        };

        /* ---------- G. NGHỆ NHÂN: DANH SÁCH BÀI VIẾT + THỐNG KÊ TRẠNG THÁI ---------- */
        renderCreatorManagePosts = function () {
            if (!currentUser) return;
            const container = document.getElementById('creator-posts-container');
            if (!container) return;
            const myPosts = posts.filter(p => p.authorId === currentUser.id);

            const setStat = (id, value) => { const el = document.getElementById(id); if (el) el.innerText = value; };
            setStat('cre-stat-total', myPosts.length);
            setStat('cre-stat-approved', myPosts.filter(p => p.status === 'approved').length);
            setStat('cre-stat-pending', myPosts.filter(p => p.status === 'pending').length);
            setStat('cre-stat-rejected', myPosts.filter(p => p.status === 'rejected' || p.status === 'draft').length);

            const rejectedCount = myPosts.filter(p => p.status === 'rejected').length;
            const notice = document.getElementById('cre-notice');
            if (notice) {
                if (rejectedCount > 0) {
                    notice.className = 'mb-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm font-semibold';
                    notice.innerHTML = '⚠️ Bạn có ' + rejectedCount + ' bài viết bị từ chối. Mở bài viết để xem lý do, sau đó bấm "Sửa &amp; gửi lại".';
                } else {
                    notice.className = 'mb-6 bg-brand-50 border border-brand-200 text-brand-800 rounded-2xl p-4 text-sm font-semibold';
                    notice.innerHTML = '✅ Bài viết mới gửi sẽ ở trạng thái <b>Chờ duyệt</b> và chỉ hiển thị công khai sau khi Quản trị viên phê duyệt.';
                }
            }

            container.innerHTML = '';
            myPosts.forEach(post => {
                const meta = ctStatusMeta(post.status);
                const reasonHTML = (post.status === 'rejected' && post.rejectReason)
                    ? '<p class="mt-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">Lý do từ chối: ' + ctEscape(post.rejectReason) + '</p>'
                    : '';
                const editBtn = (post.status === 'rejected' || post.status === 'draft')
                    ? '<button onclick="editPost(\'' + post.id + '\')" class="px-4 py-2.5 bg-brand-50 text-brand-700 hover:bg-brand-100 font-bold rounded-xl transition-colors text-sm">Sửa &amp; gửi lại</button>'
                    : '';
                container.innerHTML += `
                    <div class="post-item bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:shadow-md transition-shadow cursor-pointer" onclick="openPostDetail('${post.id}')">
                        <img src="${post.image}" class="w-full sm:w-28 h-40 sm:h-28 object-cover rounded-2xl bg-gray-200">
                        <div class="flex-grow">
                            <h3 class="font-bold text-xl text-gray-900 mb-1 hover:text-brand-700">${post.title}</h3>
                            <span class="${meta.pill} border px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">${meta.label}</span>
                            <p class="text-xs text-gray-400 font-semibold">${post.id} · ${post.tag} · Gửi ngày ${ctFormatDate(post.createdAt || post.updatedAt)}</p>
                            ${reasonHTML}
                        </div>
                        <div class="flex gap-2 w-full sm:w-auto justify-end border-t sm:border-none pt-4 sm:pt-0 border-gray-100 mt-2 sm:mt-0" onclick="event.stopPropagation()">
                            ${editBtn}
                            <button onclick="deletePost('${post.id}', this)" class="p-2.5 bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors" title="Xóa bài"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                `;
            });
            if (myPosts.length === 0) container.innerHTML = '<p class="text-gray-500 text-center py-10">Bạn chưa tạo bài viết nào.</p>';
        };

        window.deletePost = function (postId, btnElement) {
            posts = posts.filter(p => p.id !== postId);
            const item = btnElement && btnElement.closest ? btnElement.closest('.post-item') : null;
            if (item) item.remove();
            ctPersist();
            showToast('Đã xoá bài viết!');
            renderCreatorManagePosts();
        };

        /* ---------- H. NGHỆ NHÂN: FORM SOẠN BÀI VIẾT (kiểm tra dữ liệu, nháp, sửa lại) ---------- */
        function ctFormError(message) {
            const box = document.getElementById('post-form-error');
            if (box) { box.innerHTML = '⚠️ ' + message; box.className = 'bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm font-bold'; }
            showToast(message, 'error');
        }
        function ctFormClearError() {
            const box = document.getElementById('post-form-error');
            if (box) { box.innerHTML = ''; box.className = 'hidden'; }
        }
        function ctReadPostForm() {
            return {
                title: (document.getElementById('post-title').value || '').trim(),
                image: (document.getElementById('post-image').value || '').trim(),
                tag: document.getElementById('post-tag').value,
                content: (document.getElementById('post-content').value || '').trim()
            };
        }
        function ctValidatePostForm(data) {
            if (data.title.length < 5) return 'Tiêu đề cần ít nhất 5 ký tự.';
            if (!/^https?:\/\//i.test(data.image)) return 'Link hình ảnh phải bắt đầu bằng http:// hoặc https://';
            if (data.content.length < 30) return 'Nội dung cần tối thiểu 30 ký tự (hiện tại: ' + data.content.length + ').';
            return null;
        }
        function ctSetPostFormMode(isEdit, postId) {
            const heading = document.querySelector('#view-cre-create h2');
            if (heading) heading.innerText = isEdit ? ('Chỉnh sửa bài viết ' + postId) : 'Soạn bài viết mới';
            const originalSubmit = document.querySelector('#form-create-post button[type="submit"]:not([id])');
            const editSubmit = document.getElementById('btn-submit-post');
            if (originalSubmit) originalSubmit.className = originalSubmit.className.replace(/\bhidden\b/g, '').trim() + (isEdit ? ' hidden' : '');
            if (editSubmit) editSubmit.className = editSubmit.className.replace(/\bhidden\b/g, '').trim() + (isEdit ? '' : ' hidden');
        }
        function ctResetPostFormUI() {
            window.ctEditingPostId = null;
            try { sessionStorage.removeItem('ct_editPostId'); } catch (err) { /* sessionStorage có thể bị chặn */ }
            ctSetPostFormMode(false, null);
            const notice = document.getElementById('edit-notice');
            if (notice) { notice.className = 'hidden'; notice.innerHTML = ''; }
            ctUpdateImagePreview();
            ctUpdateContentCounter();
            ctFormClearError();
        }

        window.submitNewPost = function (e) {
            if (e && e.preventDefault) e.preventDefault();
            if (!currentUser) { ctFormError('Vui lòng đăng nhập bằng tài khoản Nghệ nhân để gửi bài viết.'); return false; }
            if (currentUser.role === 'Du khách') { ctFormError('Tài khoản Du khách không có quyền đăng bài. Hãy đăng nhập vai Nghệ nhân.'); return false; }

            const data = ctReadPostForm();
            const error = ctValidatePostForm(data);
            if (error) { ctFormError(error); return false; }

            if (window.ctEditingPostId) {
                const post = posts.find(p => p.id === window.ctEditingPostId);
                if (post) Object.assign(post, { title: data.title, image: data.image, tag: data.tag, content: data.content, status: 'pending', rejectReason: null, updatedAt: ctToday() });
                showToast('Đã cập nhật và gửi lại bài viết để kiểm duyệt!');
            } else {
                posts.unshift({ id: ctNewPostId(), authorId: currentUser.id, status: 'pending', tag: data.tag, title: data.title, image: data.image, content: data.content, createdAt: ctToday() });
                showToast('Đã gửi bài viết. Quản trị viên sẽ kiểm duyệt trong thời gian sớm nhất!');
            }

            const form = document.getElementById('form-create-post');
            if (form) form.reset();
            ctResetPostFormUI();
            ctPersist();
            switchView('view-cre-story');
            return false;
        };

        window.saveDraftPost = function () {
            if (!currentUser) { ctFormError('Vui lòng đăng nhập bằng tài khoản Nghệ nhân.'); return false; }
            const data = ctReadPostForm();
            if (data.title.length < 3) { ctFormError('Cần nhập tiêu đề trước khi lưu bản nháp.'); return false; }
            if (window.ctEditingPostId) {
                const post = posts.find(p => p.id === window.ctEditingPostId);
                if (post) Object.assign(post, data, { status: 'draft', rejectReason: null, updatedAt: ctToday() });
            } else {
                posts.unshift({ id: ctNewPostId(), authorId: currentUser.id, status: 'draft', tag: data.tag, title: data.title, image: data.image || 'https://picsum.photos/id/1015/800/600', content: data.content, createdAt: ctToday() });
            }
            const form = document.getElementById('form-create-post');
            if (form) form.reset();
            ctResetPostFormUI();
            ctPersist();
            showToast('Đã lưu bản nháp. Bạn có thể chỉnh sửa và gửi duyệt sau.', 'info');
            switchView('view-cre-story');
            return false;
        };

        window.editPost = function (postId) {
            const post = posts.find(p => p.id === postId);
            if (!post) return false;
            if (!currentUser || post.authorId !== currentUser.id) { showToast('Bạn không có quyền sửa bài viết này.', 'error'); return false; }
            try { sessionStorage.setItem('ct_editPostId', postId); } catch (err) { /* bỏ qua */ }
            switchView('view-cre-create');
            ctLoadPostIntoForm(postId);
            return false;
        };

        window.ctLoadPostIntoForm = function (postId) {
            const post = posts.find(p => p.id === postId);
            if (!post || !document.getElementById('post-title')) return;
            document.getElementById('post-title').value = post.title;
            document.getElementById('post-image').value = post.image;
            const tagSelect = document.getElementById('post-tag');
            if (tagSelect) tagSelect.value = post.tag;
            document.getElementById('post-content').value = post.content;
            window.ctEditingPostId = post.id;
            ctSetPostFormMode(true, post.id);
            const notice = document.getElementById('edit-notice');
            if (notice) {
                notice.className = 'mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-2xl p-4 text-sm font-semibold';
                notice.innerHTML = 'Bạn đang chỉnh sửa bài <b>' + post.id + '</b> (' + ctStatusMeta(post.status).label + ').'
                    + (post.rejectReason ? '<br>Lý do bị từ chối: ' + ctEscape(post.rejectReason) : '')
                    + '<br>Sau khi gửi lại, bài viết sẽ trở về trạng thái <b>Chờ duyệt</b>.';
            }
            ctUpdateImagePreview();
            ctUpdateContentCounter();
        };

        function ctUpdateImagePreview() {
            const input = document.getElementById('post-image');
            const preview = document.getElementById('post-image-preview');
            if (!input || !preview) return;
            const url = (input.value || '').trim();
            if (/^https?:\/\//i.test(url)) { preview.src = url; preview.className = 'w-full h-56 object-cover rounded-2xl border border-gray-200 bg-gray-100 mt-3'; }
            else { preview.removeAttribute('src'); preview.className = 'hidden'; }
        }
        function ctUpdateContentCounter() {
            const area = document.getElementById('post-content');
            const counter = document.getElementById('post-content-counter');
            if (!area || !counter) return;
            const len = area.value.length;
            counter.innerText = len + ' ký tự' + (len < 30 ? ' (tối thiểu 30)' : ' · hợp lệ');
            counter.className = 'text-xs font-bold mt-2 block ' + (len < 30 ? 'text-gray-400' : 'text-emerald-600');
        }
        function ctInitPostForm() {
            if (!document.getElementById('form-create-post')) return;
            const image = document.getElementById('post-image');
            const content = document.getElementById('post-content');
            if (image && !image.dataset.bound) { image.addEventListener('input', ctUpdateImagePreview); image.dataset.bound = '1'; }
            if (content && !content.dataset.bound) { content.addEventListener('input', ctUpdateContentCounter); content.dataset.bound = '1'; }
            ctUpdateImagePreview();
            ctUpdateContentCounter();
        }

        /* ---------- I. ADMIN: TỔNG QUAN HỆ THỐNG (mở rộng) ---------- */
        renderAdminDashboard = function () {
            const pending = posts.filter(p => p.status === 'pending');
            const approved = posts.filter(p => p.status === 'approved');
            const rejected = posts.filter(p => p.status === 'rejected');

            const setText = (id, value) => { const el = document.getElementById(id); if (el) el.innerText = value; };
            setText('stat-pending', pending.length);
            setText('stat-approved', approved.length);
            setText('stat-rejected', rejected.length);
            setText('stat-total', posts.length);
            setText('stat-creators', Object.keys(creators).length);
            setText('quick-pending-count', pending.length);
            const judged = approved.length + rejected.length;
            setText('stat-approval-rate', judged === 0 ? '—' : Math.round(approved.length / judged * 100) + '%');

            const queue = document.getElementById('admin-queue-container');
            if (queue) {
                queue.innerHTML = pending.map(p => {
                    const author = ctAuthor(p);
                    return `
                    <div class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                        <img src="${p.image}" class="w-full sm:w-24 h-32 sm:h-20 object-cover rounded-xl bg-gray-100">
                        <div class="flex-grow">
                            <p class="font-bold text-gray-900 text-lg hover:text-brand-700 cursor-pointer" onclick="openReviewMode('${p.id}')">${ctEscape(p.title)}</p>
                            <p class="text-sm text-gray-500">${author.name} · ${p.tag} · Gửi ngày ${ctFormatDate(p.createdAt)}</p>
                        </div>
                        <div class="flex gap-2 w-full sm:w-auto">
                            <button onclick="openReviewMode('${p.id}')" class="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold rounded-xl transition-colors text-sm">Xem</button>
                            <button onclick="adminApprove('${p.id}')" class="px-4 py-2 bg-emerald-500 text-white hover:bg-emerald-600 font-bold rounded-xl transition-colors text-sm">Duyệt</button>
                            <button onclick="adminReject('${p.id}')" class="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl transition-colors text-sm">Từ chối</button>
                        </div>
                    </div>`;
                }).join('');
                if (pending.length === 0) queue.innerHTML = '<p class="text-gray-500 text-center py-6 bg-gray-50 rounded-2xl">🎉 Không còn bài viết nào chờ duyệt.</p>';
            }

            const recent = document.getElementById('admin-recent-container');
            if (recent) {
                const items = posts.slice().sort((a, b) => String(b.updatedAt || b.createdAt || '').localeCompare(String(a.updatedAt || a.createdAt || ''))).slice(0, 6);
                recent.innerHTML = items.map(p => {
                    const meta = ctStatusMeta(p.status);
                    const target = p.status === 'pending' ? "openReviewMode('" + p.id + "')" : "openPostDetail('" + p.id + "')";
                    return `
                    <div class="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer" onclick="${target}">
                        <img src="${p.image}" class="w-12 h-12 rounded-xl object-cover bg-gray-100">
                        <div class="flex-grow min-w-0">
                            <p class="font-bold text-gray-800 truncate">${ctEscape(p.title)}</p>
                            <p class="text-xs text-gray-400 font-semibold">${ctAuthor(p).name} · ${ctFormatDate(p.updatedAt || p.createdAt)}</p>
                        </div>
                        <span class="${meta.pill} border px-3 py-1 rounded-full text-xs font-bold flex-shrink-0">${meta.label}</span>
                    </div>`;
                }).join('');
            }
        };

        /* ---------- J. ADMIN: DUYỆT / TỪ CHỐI / XOÁ BÀI VIẾT ---------- */
        window.adminApprove = function (postId) {
            const post = posts.find(p => p.id === postId);
            if (!post) { showToast('Không tìm thấy bài viết.', 'error'); return false; }
            post.status = 'approved';
            post.rejectReason = null;
            post.reviewedAt = ctToday();
            post.reviewer = currentUser ? currentUser.name : 'Admin';
            currentReviewPostId = null;
            ctPersist();
            showToast('Đã phê duyệt và xuất bản: ' + post.title);
            ctRefreshAdminViews();
            return false;
        };

        window.adminReject = function (postId) {
            const post = posts.find(p => p.id === postId);
            if (!post) { showToast('Không tìm thấy bài viết.', 'error'); return false; }
            const fallback = 'Nội dung chưa phù hợp với tiêu chí cộng đồng.';
            let reason = post.rejectReason || fallback;
            try {
                const input = window.prompt('Lý do từ chối bài "' + post.title + '":', reason);
                if (input === null) return false;            // người dùng bấm Huỷ
                reason = input.trim() || fallback;
            } catch (err) { /* prompt bị chặn thì dùng lý do mặc định */ }
            post.status = 'rejected';
            post.rejectReason = reason;
            post.reviewedAt = ctToday();
            post.reviewer = currentUser ? currentUser.name : 'Admin';
            currentReviewPostId = null;
            ctPersist();
            showToast('Đã từ chối bài viết: ' + post.title, 'warning');
            ctRefreshAdminViews();
            return false;
        };

        window.adminDeletePost = function (postId) {
            const post = posts.find(p => p.id === postId);
            if (!post) return false;
            try { if (!window.confirm('Xoá vĩnh viễn bài "' + post.title + '" khỏi hệ thống?')) return false; } catch (err) { /* bỏ qua */ }
            posts = posts.filter(p => p.id !== postId);
            ctPersist();
            showToast('Đã xoá bài viết khỏi hệ thống.', 'info');
            ctRefreshAdminViews();
            return false;
        };

        /* Giữ nguyên tên hàm gốc để trang curator-review.html tiếp tục hoạt động */
        window.approvePost = function () { if (currentReviewPostId) adminApprove(currentReviewPostId); };
        window.rejectPost = function () { if (currentReviewPostId) adminReject(currentReviewPostId); };

        function ctRefreshAdminViews() {
            renderAdminDashboard();
            if (document.getElementById('admin-posts-container')) renderAdminPosts();
            if (document.getElementById('admin-creators-container')) renderAdminCreators();
            if (document.getElementById('report-tag-container')) renderAdminReports();
            const reviewView = document.getElementById('view-cur-review');
            if (reviewView && reviewView.classList.contains('active')) switchView('view-adm-dash');
        }

        /* ---------- K. ADMIN: QUẢN LÝ TOÀN BỘ BÀI VIẾT ---------- */
        let ctAdminPostFilter = 'all';
        let ctAdminPostQuery = '';

        function renderAdminPosts() {
            const container = document.getElementById('admin-posts-container');
            if (!container) return;

            const filterBar = document.getElementById('admin-post-filters');
            if (filterBar) {
                filterBar.querySelectorAll('button').forEach(btn => {
                    const isActive = btn.getAttribute('data-filter') === ctAdminPostFilter;
                    btn.className = isActive
                        ? 'px-5 py-2.5 rounded-full text-sm font-bold bg-brand-700 text-white transition-colors'
                        : 'px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors';
                });
            }

            const list = posts
                .filter(p => ctAdminPostFilter === 'all' || p.status === ctAdminPostFilter)
                .filter(p => !ctAdminPostQuery || (p.title + ' ' + p.content + ' ' + p.tag + ' ' + p.id + ' ' + ctAuthor(p).name).toLowerCase().includes(ctAdminPostQuery))
                .slice()
                .sort((a, b) => String(b.updatedAt || b.createdAt || '').localeCompare(String(a.updatedAt || a.createdAt || '')));

            const countEl = document.getElementById('admin-posts-count');
            if (countEl) countEl.innerText = list.length;

            container.innerHTML = list.map(p => {
                const meta = ctStatusMeta(p.status);
                const author = ctAuthor(p);
                const viewCall = p.status === 'pending' ? "openReviewMode('" + p.id + "')" : "openPostDetail('" + p.id + "')";
                const reasonHTML = (p.status === 'rejected' && p.rejectReason)
                    ? '<p class="mt-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">Lý do từ chối: ' + ctEscape(p.rejectReason) + '</p>'
                    : '';
                return `
                <div class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row items-start lg:items-center gap-4 hover:shadow-md transition-shadow">
                    <img src="${p.image}" class="w-full lg:w-24 h-32 lg:h-20 object-cover rounded-xl bg-gray-100 flex-shrink-0">
                    <div class="flex-grow min-w-0">
                        <div class="flex items-center gap-3 flex-wrap">
                            <p class="font-bold text-gray-900 text-lg hover:text-brand-700 cursor-pointer" onclick="${viewCall}">${ctEscape(p.title)}</p>
                            <span class="${meta.pill} border px-3 py-1 rounded-full text-xs font-bold">${meta.label}</span>
                        </div>
                        <p class="text-sm text-gray-500 mt-1">${p.id} · ${p.tag} · ${author.name} · ${ctFormatDate(p.createdAt)}${p.reviewedAt ? ' · Duyệt: ' + ctFormatDate(p.reviewedAt) + ' bởi ' + ctEscape(p.reviewer || 'Admin') : ''}</p>
                        <p class="text-xs text-gray-400 mt-1 line-clamp-1">${ctEscape(p.content)}</p>
                        ${reasonHTML}
                    </div>
                    <div class="flex gap-2 flex-shrink-0 flex-wrap w-full lg:w-auto">
                        <button onclick="${viewCall}" class="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold rounded-xl transition-colors text-sm">Xem</button>
                        ${p.status !== 'approved' ? '<button onclick="adminApprove(\'' + p.id + '\')" class="px-4 py-2 bg-emerald-500 text-white hover:bg-emerald-600 font-bold rounded-xl transition-colors text-sm">Duyệt</button>' : ''}
                        ${p.status === 'pending' || p.status === 'approved' ? '<button onclick="adminReject(\'' + p.id + '\')" class="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl transition-colors text-sm">Từ chối</button>' : ''}
                        <button onclick="adminDeletePost('${p.id}')" class="px-4 py-2 bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 font-bold rounded-xl transition-colors text-sm border border-gray-200">Xoá</button>
                    </div>
                </div>`;
            }).join('');

            if (list.length === 0) container.innerHTML = '<p class="text-center text-gray-500 py-12 bg-white rounded-3xl border border-gray-100">Không có bài viết nào khớp với bộ lọc.</p>';
        }

        window.filterAdminPosts = function (status) { ctAdminPostFilter = status; renderAdminPosts(); };
        window.searchAdminPosts = function (input) { ctAdminPostQuery = (input.value || '').trim().toLowerCase(); renderAdminPosts(); };

        /* ---------- L. ADMIN: QUẢN LÝ NGHỆ NHÂN ---------- */
        function renderAdminCreators() {
            const container = document.getElementById('admin-creators-container');
            if (!container) return;
            const list = Object.values(creators);
            const setText = (id, value) => { const el = document.getElementById(id); if (el) el.innerText = value; };
            setText('admin-creator-count', list.length);
            setText('admin-creator-active', list.filter(c => c.active !== false).length);
            setText('admin-creator-verified', list.filter(c => c.verified).length);

            container.innerHTML = list.map(c => {
                const cPosts = posts.filter(p => p.authorId === c.id);
                const approved = cPosts.filter(p => p.status === 'approved').length;
                const pending = cPosts.filter(p => p.status === 'pending').length;
                const rejected = cPosts.filter(p => p.status === 'rejected').length;
                const locked = c.active === false;
                const lockBtnClass = locked ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-red-50 text-red-600 hover:bg-red-100';
                const verifyLabel = c.verified ? 'Bỏ xác minh' : 'Xác minh';
                const lockLabel = locked ? 'Mở khoá' : 'Khoá';
                return `
                <div class="bg-white p-5 rounded-2xl border ${locked ? 'border-red-200' : 'border-gray-100'} shadow-sm flex flex-col md:flex-row items-start md:items-center gap-5 hover:shadow-md transition-shadow">
                    <img src="https://i.pravatar.cc/150?img=${c.avatar}" class="w-16 h-16 rounded-full border-2 border-brand-50 bg-gray-100 ${locked ? 'grayscale opacity-60' : ''}">
                    <div class="flex-grow min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                            <p class="font-bold text-gray-900 text-lg">${c.name}</p>
                            ${c.verified ? '<span class="bg-brand-50 text-brand-700 border border-brand-200 px-2 py-0.5 rounded-full text-xs font-bold">Verified</span>' : '<span class="bg-gray-100 text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full text-xs font-bold">Chờ xác minh</span>'}
                            ${locked ? '<span class="bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full text-xs font-bold">Đã khoá</span>' : '<span class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-bold">Đang hoạt động</span>'}
                        </div>
                        <p class="text-sm text-gray-500">${c.role} · ${c.craft || 'Thủ công truyền thống'} · 📍 ${c.village || 'Việt Nam'}</p>
                        <p class="text-xs text-gray-400 mt-1">${c.email || '—'} · ${c.phone || '—'} · Tham gia ${ctFormatDate(c.joinedAt)} · ${c.experience || 0} năm kinh nghiệm</p>
                        <div class="flex gap-2 mt-3 flex-wrap">
                            <span class="text-xs font-bold bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">Tổng ${cPosts.length}</span>
                            <span class="text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-full">Xuất bản ${approved}</span>
                            <span class="text-xs font-bold bg-yellow-50 border border-yellow-200 text-yellow-700 px-2.5 py-1 rounded-full">Chờ duyệt ${pending}</span>
                            <span class="text-xs font-bold bg-red-50 border border-red-200 text-red-600 px-2.5 py-1 rounded-full">Từ chối ${rejected}</span>
                        </div>
                    </div>
                    <div class="flex gap-2 flex-wrap w-full md:w-auto md:flex-col md:items-stretch">
                        <button onclick="openCreatorProfile('${c.id}')" class="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold rounded-xl text-sm transition-colors">Xem hồ sơ</button>
                        <button onclick="toggleCreatorVerified('${c.id}')" class="px-4 py-2 bg-brand-50 text-brand-700 hover:bg-brand-100 font-bold rounded-xl text-sm transition-colors">${verifyLabel}</button>
                        <button onclick="toggleCreatorActive('${c.id}')" class="px-4 py-2 ${lockBtnClass} font-bold rounded-xl text-sm transition-colors">${lockLabel}</button>
                    </div>
                </div>`;
            }).join('');
            if (list.length === 0) container.innerHTML = '<p class="text-center text-gray-500 py-12 bg-white rounded-3xl border border-gray-100">Chưa có nghệ nhân nào.</p>';
        }

        window.toggleCreatorActive = function (creatorId) {
            const creator = creators[creatorId];
            if (!creator) return false;
            creator.active = creator.active === false;
            ctPersist();
            showToast(creator.active ? 'Đã mở khoá tài khoản: ' + creator.name : 'Đã khoá tài khoản: ' + creator.name + ' (ẩn khỏi trang công khai)', creator.active ? 'success' : 'warning');
            renderAdminCreators();
            return false;
        };

        window.toggleCreatorVerified = function (creatorId) {
            const creator = creators[creatorId];
            if (!creator) return false;
            creator.verified = !creator.verified;
            ctPersist();
            showToast(creator.verified ? 'Đã xác minh hồ sơ: ' + creator.name : 'Đã bỏ xác minh: ' + creator.name, 'info');
            renderAdminCreators();
            return false;
        };

        /* ---------- M. ADMIN: BÁO CÁO & THỐNG KÊ ---------- */
        function renderAdminReports() {
            const setText = (id, value) => { const el = document.getElementById(id); if (el) el.innerText = value; };
            const total = posts.length;
            const approved = posts.filter(p => p.status === 'approved').length;
            const pending = posts.filter(p => p.status === 'pending').length;
            const rejected = posts.filter(p => p.status === 'rejected').length;
            const draft = posts.filter(p => p.status === 'draft').length;
            const judged = approved + rejected;
            const pct = n => total === 0 ? 0 : Math.round(n / total * 100);

            setText('report-total-posts', total);
            setText('report-total-creators', Object.keys(creators).length);
            setText('report-approval-rate', judged === 0 ? '—' : Math.round(approved / judged * 100) + '%');
            setText('report-avg-posts', Object.keys(creators).length === 0 ? '0' : (total / Object.keys(creators).length).toFixed(1));

            const funnelBox = document.getElementById('report-funnel-container');
            if (funnelBox) {
                funnelBox.innerHTML = [
                    { label: 'Đã xuất bản', value: approved, bar: 'bg-emerald-500' },
                    { label: 'Chờ duyệt', value: pending, bar: 'bg-yellow-400' },
                    { label: 'Bị từ chối', value: rejected, bar: 'bg-red-400' },
                    { label: 'Bản nháp', value: draft, bar: 'bg-gray-300' }
                ].map(item => `
                    <div>
                        <div class="flex justify-between text-sm font-bold text-gray-600 mb-1.5"><span>${item.label}</span><span>${item.value} bài · ${pct(item.value)}%</span></div>
                        <div class="h-3 bg-gray-100 rounded-full overflow-hidden"><div class="${item.bar} h-full rounded-full transition-all duration-500" style="width:${pct(item.value)}%"></div></div>
                    </div>`).join('');
            }

            const tagBox = document.getElementById('report-tag-container');
            if (tagBox) {
                const tags = {};
                posts.forEach(p => { tags[p.tag] = (tags[p.tag] || 0) + 1; });
                const keys = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
                const max = keys.length ? tags[keys[0]] : 1;
                tagBox.innerHTML = keys.map(tag => `
                    <div>
                        <div class="flex justify-between text-sm font-bold text-gray-600 mb-1.5"><span>${tag}</span><span>${tags[tag]} bài</span></div>
                        <div class="h-3 bg-brand-50 rounded-full overflow-hidden"><div class="bg-brand-600 h-full rounded-full transition-all duration-500" style="width:${Math.round(tags[tag] / max * 100)}%"></div></div>
                    </div>`).join('');
            }

            const creatorBox = document.getElementById('report-creator-container');
            if (creatorBox) {
                const rows = Object.values(creators).map(c => ({
                    creator: c,
                    approved: posts.filter(p => p.authorId === c.id && p.status === 'approved').length,
                    total: posts.filter(p => p.authorId === c.id).length
                })).sort((a, b) => b.approved - a.approved);
                const max = rows.length ? Math.max(1, rows[0].approved) : 1;
                creatorBox.innerHTML = rows.map(row => `
                    <div class="flex items-center gap-4">
                        <img src="https://i.pravatar.cc/150?img=${row.creator.avatar}" class="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0">
                        <div class="flex-grow min-w-0">
                            <div class="flex justify-between text-sm font-bold text-gray-700 mb-1.5"><span class="truncate">${row.creator.name}</span><span class="flex-shrink-0 ml-2">${row.approved}/${row.total}</span></div>
                            <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden"><div class="bg-brand-500 h-full rounded-full transition-all duration-500" style="width:${Math.round(row.approved / max * 100)}%"></div></div>
                        </div>
                    </div>`).join('');
            }
        }

        /* ---------- N. TRANG ĐĂNG NHẬP: CHỌN NGHỆ NHÂN DEMO BẤT KỲ ---------- */
        window.ctRenderDemoCreators = function () {
            const select = document.getElementById('demo-creator-select');
            if (!select) return;
            select.innerHTML = Object.values(creators).map(c =>
                '<option value="' + c.id + '">' + c.name + ' — ' + c.role + '</option>').join('');
        };
        window.loginAsSelectedCreator = function () {
            const select = document.getElementById('demo-creator-select');
            if (!select || !select.value) { showToast('Không tìm thấy tài khoản nghệ nhân.', 'error'); return; }
            loginAs(select.value);
        };

        /* Khởi tạo các thành phần mở rộng khi trang sẵn sàng */
        document.addEventListener('DOMContentLoaded', function () {
            ctRenderDemoCreators();
            ctInitPostForm();
        });

