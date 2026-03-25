// ---------------------------------------------------------
// INICIALIZAÇÃO IMEDIATA DO TEMA
// ---------------------------------------------------------
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
    } else {
        document.documentElement.classList.remove('dark-mode');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // SISTEMA DE NOTIFICAÇÕES E PROMPT CUSTOMIZADO
    // ---------------------------------------------------------
    const showToast = (title, message, type = 'success') => {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="toast-content">
                <strong class="toast-title">${title}</strong>
                <p class="toast-message">${message}</p>
            </div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    };

    const showCustomPrompt = (title, message, callback) => {
        let overlay = document.querySelector('.custom-prompt-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'custom-prompt-overlay';
            overlay.innerHTML = `
                <div class="custom-prompt-modal">
                    <h3 class="custom-prompt-title"></h3>
                    <p class="custom-prompt-message"></p>
                    <input type="text" class="custom-prompt-input" placeholder="Digite aqui...">
                    <div class="custom-prompt-actions">
                        <button class="btn-prompt cancel">Cancelar</button>
                        <button class="btn-prompt confirm">Confirmar</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
        }

        const titleEl = overlay.querySelector('.custom-prompt-title');
        const messageEl = overlay.querySelector('.custom-prompt-message');
        const inputEl = overlay.querySelector('.custom-prompt-input');
        const cancelBtn = overlay.querySelector('.btn-prompt.cancel');
        const confirmBtn = overlay.querySelector('.btn-prompt.confirm');

        titleEl.textContent = title;
        messageEl.textContent = message;
        inputEl.value = '';
        
        overlay.classList.add('active');
        setTimeout(() => inputEl.focus(), 100);

        const close = () => overlay.classList.remove('active');

        const handleConfirm = () => {
            const value = inputEl.value.trim();
            if (value) {
                close();
                callback(value);
            }
        };

        confirmBtn.onclick = handleConfirm;
        cancelBtn.onclick = close;
        inputEl.onkeyup = (e) => { if (e.key === 'Enter') handleConfirm(); };
        overlay.onclick = (e) => { if (e.target === overlay) close(); };
    };

    // ---------------------------------------------------------
    // ELEMENTOS DA TELA DE LOGIN
    // ---------------------------------------------------------
    const loginForm = document.querySelector('#loginForm');
    const userInput = document.querySelector('#user-id');
    const passwordInput = document.querySelector('#password');
    const togglePassword = document.querySelector('#togglePassword');
    const submitBtn = document.querySelector('#submitBtn');
    const forgotForm = document.querySelector('#forgotPasswordForm');
    const forgotMessageContainer = document.querySelector('#forgotMessageContainer');

    if (loginForm) {
        const btnText = submitBtn.querySelector('.btn-text');
        const loader = submitBtn.querySelector('.loader');

        // Máscara de CPF
        userInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            }
            e.target.value = value;
            clearError(userInput, 'user-error');
        });

        // Mostrar/Ocultar Senha
        const handleTogglePassword = () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            togglePassword.classList.toggle('fa-eye-slash');
            togglePassword.classList.toggle('fa-eye');
            togglePassword.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
        };

        togglePassword.addEventListener('click', handleTogglePassword);

        // Lógica de Redirecionamento ao "Entrar"
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (userInput.value.trim().length < 4) {
                showError(userInput, 'user-error');
                return;
            }

            const rawCpf = userInput.value.replace(/\D/g, '');
            
            // Lógica específica para a Amanda
            if (rawCpf === '11492829919') {
                const amandaProfile = {
                    userType: 'student',
                    name: 'Amanda',
                    email: 'amanda@fazendavelha.edu.br',
                    school: 'Colégio Fazenda Velha',
                    course: 'Técnico em Estética',
                    class: '1º Ano C - Ensino Médio',
                    registration: '2024009919',
                    event: '⚠️ A <strong>Feira de Estética</strong> do Fazenda Velha acontece em 15 de Maio.'
                };
                localStorage.setItem('userProfile', JSON.stringify(amandaProfile));
            } 
            // Lógica específica para o Antônio
            else if (rawCpf === '11346834530') {
                const antonioProfile = {
                    userType: 'teacher',
                    name: 'Antônio',
                    email: 'antonio.ds@educ.gov.br',
                    subject: 'Desenvolvimento de Sistemas',
                    schools: ['Colégio Helena Wysocki'],
                    registration: 'PROF2024001',
                    event: '📋 O próximo <strong>Conselho de Classe</strong> do Helena Wysocki será em 28 de Abril.'
                };
                localStorage.setItem('userProfile', JSON.stringify(antonioProfile));
            } 
            // Lógica específica para o Isaac
            else if (rawCpf === '11532036930') {
                const isaacProfile = {
                    userType: 'student',
                    name: 'Isaac Szymanski Betin',
                    email: 'isaac.ds@educ.gov.br',
                    school: 'Colégio Helena Wysocki',
                    course: 'Desenvolvimento de Sistemas',
                    class: '3º Ano B - Ensino Médio',
                    registration: '2024003693',
                    event: '🎓 O <strong>Trote do Terceirão</strong> do Helena Wysocki foi marcado para 24 de Abril!'
                };
                localStorage.setItem('userProfile', JSON.stringify(isaacProfile));
            } 
            // Lógica específica para a Inspetora (Delia)
            else if (rawCpf === '58923625730') {
                const inspetoraProfile = {
                    userType: 'colaborador',
                    name: 'Delia',
                    email: 'delia@educ.gov.br',
                    role: 'Colaborador',
                    schools: ['Colégio Helena Wysocki'],
                    registration: 'COLAB2026001',
                    event: '🔔 Atenção aos novos horários de intervalo do Helena Wysocki!'
                };
                localStorage.setItem('userProfile', JSON.stringify(inspetoraProfile));
            } 
            // Lógica específica para a Fabiana (Bibliotecária)
            else if (rawCpf === '11345794619') {
                const fabianaProfile = {
                    userType: 'bibliotecaria',
                    name: 'Fabiana',
                    email: 'fabiana.biblio@educ.gov.br',
                    role: 'Bibliotecária',
                    schools: ['Colégio Helena Wysocki'],
                    registration: 'BIB2026045',
                    event: '📚 A <strong>Semana Literária</strong> começa no dia 10 de Abril!'
                };
                localStorage.setItem('userProfile', JSON.stringify(fabianaProfile));
            } else {
                // CPF que não está na lista -> Aluno RAE Genérico
                const genericStudentProfile = {
                    userType: 'student',
                    name: 'Estudante RAE',
                    email: 'estudante@rae.com.br',
                    school: 'Escola Estadual RAE',
                    course: 'Ensino Médio Regular',
                    class: '3º Ano A',
                    registration: '202400' + Math.floor(1000 + Math.random() * 9000),
                    event: '✨ Bem-vindo ao portal da Rede de Apoio Escolar!'
                };
                localStorage.setItem('userProfile', JSON.stringify(genericStudentProfile));
            }

            setLoading(true);
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });

        function setLoading(isLoading) {
            if (isLoading) {
                submitBtn.classList.add('loading');
                btnText.style.display = 'none';
                loader.style.display = 'block';
            }
        }

        function showError(input, errorId) {
            input.classList.add('input-error');
            const err = document.getElementById(errorId);
            if(err) err.style.display = 'flex';
        }

        function clearError(input, errorId) {
            input.classList.remove('input-error');
            const err = document.getElementById(errorId);
            if(err) err.style.display = 'none';
        }

        passwordInput.addEventListener('input', () => clearError(passwordInput, 'password-error'));
    }

    if (forgotForm && forgotMessageContainer) {
        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const recoveryInput = document.querySelector('#recovery-id').value.trim();
            const rawInput = recoveryInput.replace(/\D/g, '');
            
            let userName = '';
            let isSuccess = true;

            if (rawInput === '11532036930') userName = 'Isaac';
            else if (rawInput === '11492829919') userName = 'Amanda';
            else if (rawInput === '11346834530') userName = 'Antônio';
            else if (rawInput === '58923625730') userName = 'Delia';
            else if (rawInput === '11345794619') userName = 'Fabiana';

            if (userName) {
                forgotMessageContainer.innerHTML = `
                    <div class="banner-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="banner-content">
                        <strong class="banner-title">E-mail Enviado!</strong>
                        <span class="banner-text">Olá <strong>${userName}</strong>, as instruções foram enviadas para o seu e-mail cadastrado.</span>
                    </div>
                `;
            } else if (recoveryInput) {
                forgotMessageContainer.innerHTML = `
                    <div class="banner-icon"><i class="fas fa-paper-plane"></i></div>
                    <div class="banner-content">
                        <strong class="banner-title">Instruções Enviadas</strong>
                        <span class="banner-text">As instruções de recuperação foram enviadas para: <strong>${recoveryInput}</strong>.</span>
                    </div>
                `;
            } else {
                forgotMessageContainer.innerHTML = `
                    <div class="banner-icon"><i class="fas fa-exclamation-circle"></i></div>
                    <div class="banner-content">
                        <strong class="banner-title">Erro no Envio</strong>
                        <span class="banner-text">Por favor, insira um CPF ou e-mail válido.</span>
                    </div>
                `;
                isSuccess = false;
            }

            forgotMessageContainer.className = `message-banner ${isSuccess ? 'success' : 'error'}`;
            forgotMessageContainer.style.display = 'flex';
        });
    }

    // ---------------------------------------------------------
    // LÓGICA DE SOLICITAÇÃO DE ACESSO
    // ---------------------------------------------------------
    const requestForm = document.querySelector('#requestAccessForm');
    const requestMessageContainer = document.querySelector('#requestMessageContainer');

    if (requestForm && requestMessageContainer) {
        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const regId = document.querySelector('#reg-id').value.trim();
            const rawRegId = regId.replace(/\D/g, '');

            const existingCpfs = ['11532036930', '11492829919', '11346834530', '58923625730', '11345794619'];

            if (existingCpfs.includes(rawRegId)) {
                requestMessageContainer.innerHTML = `
                    <div class="banner-icon"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="banner-content">
                        <strong class="banner-title">Cadastro Existente</strong>
                        <span class="banner-text">Este CPF já está cadastrado. Tente recuperar sua senha ou entrar diretamente.</span>
                    </div>
                `;
                requestMessageContainer.className = 'message-banner error';
            } else if (regId) {
                requestMessageContainer.innerHTML = `
                    <div class="banner-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="banner-content">
                        <strong class="banner-title">Solicitação Enviada!</strong>
                        <span class="banner-text">Solicitação de acesso enviada com sucesso para: <strong>${regId}</strong>. Aguarde a análise.</span>
                    </div>
                `;
                requestMessageContainer.className = 'message-banner success';
            } else {
                requestMessageContainer.innerHTML = `
                    <div class="banner-icon"><i class="fas fa-exclamation-circle"></i></div>
                    <div class="banner-content">
                        <strong class="banner-title">Erro no Cadastro</strong>
                        <span class="banner-text">Por favor, preencha todos os campos obrigatórios.</span>
                    </div>
                `;
                requestMessageContainer.className = 'message-banner error';
            }
            
            requestMessageContainer.style.display = 'flex';
        });
    }

    // ---------------------------------------------------------
    // ELEMENTOS DO DASHBOARD
    // ---------------------------------------------------------
    const todoForm = document.querySelector('#todoForm');
    const todoInput = document.querySelector('#todoInput');
    const todoList = document.querySelector('#todoList');
    const logoutBtn = document.querySelector('#logoutBtn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0) {
        // --- DADOS COMUNS E UTILITÁRIOS ---
        const brazilianFirstNames = ['Ana', 'Bruno', 'Carlos', 'Daniela', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena', 'Isaac', 'Julia', 'Lucas', 'Mariana', 'Nicolas', 'Olivia', 'Pedro', 'Rafaela', 'Samuel', 'Tatiana', 'Vitor', 'Yasmin', 'Andre', 'Beatriz', 'Diego', 'Eliana', 'Felipe', 'Giovanna', 'Hugo', 'Isabela', 'Joao', 'Larissa'];
        const brazilianLastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa'];

        const bookTitles = [
            'Dom Casmurro', 'Memórias Póstumas de Brás Cubas', 'O Alquimista', 'A Hora da Estrela', 
            'Capitães da Areia', 'Grande Sertão: Veredas', 'O Guarani', 'Iracema', 
            'A Moreninha', 'O Cortiço', 'Senhora', 'Lucíola', 'Til', 'Ubirajara',
            'O Ateneu', 'Os Sertões', 'Macunaíma', 'Vidas Secas', 'Angústia', 'São Bernardo'
        ];

        const generateRandomName = () => {
            const first = brazilianFirstNames[Math.floor(Math.random() * brazilianFirstNames.length)];
            const last = brazilianLastNames[Math.floor(Math.random() * brazilianLastNames.length)];
            return `${first} ${last}`;
        };

        const generateClassStudents = (className) => {
            const storageKey = `absences_${className}`;
            let storedData = JSON.parse(localStorage.getItem(storageKey));
            
            // Migração: Se for 3B e os nomes estiverem em CAIXA ALTA, limpa para carregar o formato normal
            if (className === '3B' && storedData && storedData[0] && storedData[0].name === storedData[0].name.toUpperCase()) {
                localStorage.removeItem(storageKey);
                storedData = null;
            }
            
            // Lista específica para a sala 3B (Formatada e com Rafael/Rafaela invertidos)
            const class3B_Students = [
                'Agatha Chaves de Souza', 'Allan Patrick de Souza Vieira', 'Ana Beatriz Silveira Pires',
                'Antonio Gabriel Erzinger da Silva Santos', 'Aron Jose Cordeiro', 'Arthur da Silveira Zampieri',
                'Caua Matheus Ribeiro Panek', 'Daniel Bernardes Marques', 'David Ribeiro Muller',
                'Eduardo Gardin Varano', 'Esdras Berehulka da Silva', 'Felipe Morais',
                'Gustavo Sperka Palacio', 'Isaac Szymanski Betin', 'Isabelly Moreira Filho',
                'Joao Felipe Lima dos Santos', 'Julia Schenigoski Rosa da Silva', 'Kaue Ribeiro Cardoso',
                'Luan Marcos Ferreira da Silva', 'Lucas Eduardo Ribeiro Skraba', 'Lucas Henrique Liberato dos Santos Leite',
                'Luiz Gustavo Czarnik', 'Matheus Henrique Maso Setim', 'Matheus Rafael Kosloski',
                'Murilo Henrique de Lima', 'Nicolas Rafael Cortes Moises', 'Pedro Henrique Orchel',
                'Rafaela Silva Correa', 'Rafael dos Santos de Lima', 'Rita de Cassia dos Santos Santana',
                'Thiago Alves Barbosa', 'Victor Henrique Tiburcio Dias', 'Vinicius Santana Mayer', 'Vitor Schadek'
            ];

            if (!storedData) {
                storedData = [];
                const namesToUse = className === '3B' ? class3B_Students : Array.from({length: 30}, () => generateRandomName());
                
                namesToUse.forEach((name, index) => {
                    const randomBooks = [];
                    const numBooks = Math.floor(Math.random() * 3);
                    for(let j=0; j<numBooks; j++) {
                        randomBooks.push({
                            title: bookTitles[Math.floor(Math.random() * bookTitles.length)],
                            date: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleDateString('pt-BR')
                        });
                    }

                    storedData.push({
                        number: index + 1,
                        name: name,
                        status: 'presente',
                        books: randomBooks
                    });
                });
                localStorage.setItem(storageKey, JSON.stringify(storedData));
            } else {
                let updated = false;
                storedData.forEach(student => {
                    if (!student.books) { student.books = []; updated = true; }
                    if (!student.status) { student.status = 'presente'; updated = true; }
                });
                if (updated) localStorage.setItem(storageKey, JSON.stringify(storedData));
            }
            return storedData;
        };

        // --- LOGICA DE ABAS ---
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
                
                // Atualiza o resumo se for para a home
                if (targetTab === 'home') updateHomeSummary();

                // Se for aluno e clicar na aba biblioteca, atualiza os livros
                const currentUser = JSON.parse(localStorage.getItem('userProfile'));
                if (targetTab === 'library' && currentUser && currentUser.userType === 'student') {
                    renderStudentLoans(currentUser);
                }
            });
        });

        // --- LOGICA DO TODO LIST ---
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        
        // Personalização: Troca "Tarefas" por "Observações" para Delia, Antônio e Fabiana
        const isColaboradorOuBibliotecaria = userProfile && (userProfile.name === 'Delia' || userProfile.name === 'Antônio' || userProfile.userType === 'bibliotecaria');
        if (isColaboradorOuBibliotecaria) {
            const todoTabTitle = document.querySelector('#todo h2');
            const todoSummaryTitle = document.querySelector('#todoSummary h3');
            const todoInputPlaceholder = document.querySelector('#todoInput');
            const todoNavBtnText = document.querySelector('.tab-btn[data-tab="todo"] span');
            
            if (todoTabTitle) todoTabTitle.textContent = 'Minhas Observações';
            if (todoSummaryTitle) todoSummaryTitle.textContent = 'Suas Observações';
            if (todoInputPlaceholder) todoInputPlaceholder.placeholder = 'Adicionar nova observação...';
            if (todoNavBtnText) todoNavBtnText.textContent = 'Observações';
        }

        const taskKey = userProfile ? `tasks_${userProfile.registration}` : 'tasks_generic';
        
        // Observações padrão solicitadas
        const defaultTasks = [
            { id: 1, text: 'Organizar materiais escolares', completed: false },
            { id: 2, text: 'Verificar avisos no mural', completed: true }
        ];

        let tasks = JSON.parse(localStorage.getItem(taskKey));

        // Se for a primeira vez do Antônio ou Delia, insere as observações solicitadas
        if (!tasks && userProfile) {
            if (userProfile.name === 'Antônio') {
                tasks = [
                    { id: Date.now(), text: 'Aluno Matheus Setim se encontra atrapalhando a aula e seus colegas', completed: true }
                ];
            } else if (userProfile.name === 'Delia') {
                tasks = [
                    { id: Date.now(), text: 'Aluno Antônio chegou na entrada com a sua calça rasgada', completed: true }
                ];
            } else {
                tasks = defaultTasks;
            }
            localStorage.setItem(taskKey, JSON.stringify(tasks));
        } else if (!tasks) {
            tasks = defaultTasks;
        }

        const saveTasks = () => {
            localStorage.setItem(taskKey, JSON.stringify(tasks));
            updateHomeSummary(); // Atualiza contador na home
        };

        const renderTasks = () => {
            if (!todoList) return;
            todoList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `todo-item ${task.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                    <span>${task.text}</span>
                    <button class="btn-delete-todo" data-id="${task.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                todoList.appendChild(li);
            });
        };

        if (todoForm) {
            todoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const text = todoInput.value.trim();
                if (text) {
                    tasks.push({ id: Date.now(), text, completed: false });
                    todoInput.value = '';
                    saveTasks();
                    renderTasks();
                }
            });
        }

        if (todoList) {
            todoList.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('[data-id]')?.dataset.id);
                if (!id) return;
                if (e.target.type === 'checkbox') {
                    const task = tasks.find(t => t.id === id);
                    if (task) {
                        task.completed = e.target.checked;
                        saveTasks();
                        renderTasks();
                    }
                } else if (e.target.closest('.btn-delete-todo')) {
                    tasks = tasks.filter(t => t.id !== id);
                    saveTasks();
                    renderTasks();
                }
            });
        }

        // --- LOGICA DE DIA REAL E RESUMO DA HOME ---
        const defaultMenu = {
            1: "Arroz, Feijão, Frango Grelhado e Salada",
            2: "Macarronada à Bolonhesa e Fruta",
            3: "Feijoada Light, Arroz e Couve",
            4: "Iscas de Carne, Purê de Batata e Legumes",
            5: "Peixe Assado, Arroz Integral e Mix de Folhas"
        };

        const amandaMenu = {
            1: "Salada Caesar com Croutons e Suco Natural",
            2: "Sopa de Legumes com Pão Integral",
            3: "Quiche de Alho Poró e Mix de Folhas Verde",
            4: "Sanduíche Natural de Frango e Iogurte",
            5: "Omelete de Ervas com Tomate Cereja"
        };

        const getMenu = () => {
            const userProfile = JSON.parse(localStorage.getItem('userProfile'));
            if (!userProfile) return defaultMenu;

            const school = userProfile.school || (userProfile.schools && userProfile.schools[0]) || 'default';
            const menuKey = `schoolMenu_${school.replace(/\s+/g, '_')}`;
            
            if (school === 'Colégio Fazenda Velha') {
                return JSON.parse(localStorage.getItem(menuKey)) || amandaMenu;
            }
            return JSON.parse(localStorage.getItem(menuKey)) || defaultMenu;
        };

        const renderMenu = () => {
            const menuGrid = document.querySelector('#menuGrid');
            if (!menuGrid) return;
            
            const menu = getMenu();
            const now = new Date();
            const dayOfWeek = now.getDay();

            menuGrid.innerHTML = '';
            const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
            
            days.forEach((dayName, index) => {
                const dayNum = index + 1;
                const isToday = dayNum === dayOfWeek;
                const card = document.createElement('div');
                card.className = `menu-card ${isToday ? 'active' : ''}`;
                card.dataset.day = dayNum;
                card.innerHTML = `
                    <span class="day">${dayName}${isToday ? ' (Hoje)' : ''}</span>
                    <p class="meal">${menu[dayNum]}</p>
                `;
                menuGrid.appendChild(card);
            });
        };

        const updateHomeSummary = () => {
            const menu = getMenu();
            const now = new Date();
            const dayOfWeek = now.getDay();
            const mealToday = menu[dayOfWeek] || "Sem cardápio para hoje.";
            
            const todayMealText = document.getElementById('todayMealText');
            if (todayMealText) todayMealText.textContent = mealToday;

            const pendingTasks = tasks.filter(t => !t.completed).length;
            const todoCountText = document.getElementById('todoCountText');
            const todoSummaryTitle = document.querySelector('#todoSummary h3');
            
            if (todoCountText) {
                const label = (todoSummaryTitle && todoSummaryTitle.textContent.includes('Observações')) ? 'observação' : 'tarefa';
                const labelPlural = (todoSummaryTitle && todoSummaryTitle.textContent.includes('Observações')) ? 'observações' : 'tarefas';

                todoCountText.textContent = pendingTasks === 0 
                    ? `Tudo pronto! Nenhuma ${label} pendente.` 
                    : `Você tem ${pendingTasks} ${pendingTasks === 1 ? label : labelPlural} ${pendingTasks === 1 ? 'pendente' : 'pendentes'}.`;
            }

            // Atualiza o banner de eventos
            const userProfile = JSON.parse(localStorage.getItem('userProfile'));
            const eventText = document.getElementById('eventText');
            if (eventText && userProfile && userProfile.event) {
                eventText.innerHTML = userProfile.event;
            }

            // Se for aluno, renderiza seus empréstimos na aba biblioteca
            if (userProfile && userProfile.userType === 'student') {
                renderStudentLoans(userProfile);
                
                // Força a exibição da visualização de aluno se estiver na aba biblioteca
                const libraryTab = document.querySelector('#library');
                if (libraryTab && libraryTab.classList.contains('active')) {
                    const libraryStudentView = document.querySelector('#libraryStudentView');
                    const libraryLibrarianView = document.querySelector('#libraryLibrarianView');
                    if (libraryStudentView) libraryStudentView.style.display = 'block';
                    if (libraryLibrarianView) libraryLibrarianView.style.display = 'none';
                }
            }
        };

        const renderStudentLoans = (profile) => {
            const loanHistoryList = document.querySelector('#loanHistoryList');
            const libraryStudentView = document.querySelector('#libraryStudentView');
            if (!loanHistoryList || !libraryStudentView) return;

            // Busca os livros do aluno em todas as salas (simulação realista)
            // Para simplificar, vamos assumir que ele está na turma salva no perfil
            const className = profile.class.split(' ')[0]; // Ex: "3º" -> precisa de ajuste
            // Vamos tentar encontrar a sala correta baseada no perfil
            // No nosso sistema, as salas são 1A, 1B, etc.
            let classCode = "";
            if (profile.class.includes("1º")) classCode = "1";
            else if (profile.class.includes("2º")) classCode = "2";
            else if (profile.class.includes("3º")) classCode = "3";
            
            if (profile.class.includes("A")) classCode += "A";
            else if (profile.class.includes("B")) classCode += "B";
            else if (profile.class.includes("C")) classCode += "C";
            else if (profile.class.includes("D")) classCode += "D";
            else if (profile.class.includes("E")) classCode += "E";
            else if (profile.class.includes("F")) classCode += "F";
            else classCode += "A"; // Default

            const students = generateClassStudents(classCode);
            if (!students) {
                loanHistoryList.innerHTML = '<p style="text-align: center; color: #64748b; font-style: italic; margin-top: 20px;">Nenhum dado encontrado para sua sala.</p>';
                return;
            }

            // Procura o aluno pelo nome (busca flexível para garantir sincronia)
            const studentData = students.find(s => 
                s.name.toLowerCase().includes(profile.name.toLowerCase()) || 
                profile.name.toLowerCase().includes(s.name.toLowerCase())
            );
            
            loanHistoryList.innerHTML = '';
            if (studentData && studentData.books && studentData.books.length > 0) {
                studentData.books.forEach(book => {
                    const item = document.createElement('div');
                    item.className = 'summary-card';
                    item.style.cursor = 'default';
                    item.innerHTML = `
                        <i class="fas fa-book" style="color: #2563eb;"></i>
                        <div>
                            <h3>${book.title}</h3>
                            <p>Retirado em: ${book.date}</p>
                        </div>
                    `;
                    loanHistoryList.appendChild(item);
                });
            } else {
                loanHistoryList.innerHTML = '<p style="text-align: center; color: #64748b; font-style: italic; margin-top: 20px;">Você não possui empréstimos ativos.</p>';
            }
        };

        // --- LOGICA DE EDIÇÃO DE CARDÁPIO (PROFESSOR) ---
        const btnEditMenu = document.querySelector('#btnEditMenu');
        const editMenuModal = document.querySelector('#editMenuModal');
        const closeMenuModalBtn = document.querySelector('#closeMenuModalBtn');
        const editMenuForm = document.querySelector('#editMenuForm');

        if (btnEditMenu && editMenuModal) {
            btnEditMenu.addEventListener('click', () => {
                const menu = getMenu();
                document.querySelector('#editSeg').value = menu[1];
                document.querySelector('#editTer').value = menu[2];
                document.querySelector('#editQua').value = menu[3];
                document.querySelector('#editQui').value = menu[4];
                document.querySelector('#editSex').value = menu[5];
                editMenuModal.classList.add('active');
            });

            const closeMenuModal = () => editMenuModal.classList.remove('active');
            closeMenuModalBtn.addEventListener('click', closeMenuModal);
            editMenuModal.addEventListener('click', (e) => {
                if (e.target === editMenuModal) closeMenuModal();
            });

            editMenuForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const newMenu = {
                    1: document.querySelector('#editSeg').value,
                    2: document.querySelector('#editTer').value,
                    3: document.querySelector('#editQua').value,
                    4: document.querySelector('#editQui').value,
                    5: document.querySelector('#editSex').value
                };
                
                const userProfile = JSON.parse(localStorage.getItem('userProfile'));
                if (userProfile) {
                    const school = userProfile.school || (userProfile.schools && userProfile.schools[0]) || 'default';
                    const menuKey = `schoolMenu_${school.replace(/\s+/g, '_')}`;
                    localStorage.setItem(menuKey, JSON.stringify(newMenu));
                } else {
                    localStorage.setItem('schoolMenu_default', JSON.stringify(newMenu));
                }

                renderMenu();
                updateHomeSummary();
                closeMenuModal();
                showToast('Cardápio Atualizado', 'As alterações foram salvas com sucesso!', 'success');
            });
        }

        // --- LOGICA DE LOGOUT ---
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }

        // --- LÓGICA DE EDIÇÃO DE PERFIL ---
        const editProfileBtn = document.querySelector('#openEditProfileBtn');
        const editModal = document.querySelector('#editProfileModal');
        const closeModalBtn = document.querySelector('#closeModalBtn');
        const editForm = document.querySelector('#editProfileForm');

        const profileName = document.querySelector('#profileName');
        const profileEmail = document.querySelector('#profileEmail');
        const profileClass = document.querySelector('#profileClass');
        const profileSchool = document.querySelector('#profileSchool');
        const profileCourse = document.querySelector('#profileCourse');
        const profileRegistration = document.querySelector('#profileRegistration');
        const profileImageDisplay = document.querySelector('#profileImageDisplay');
        const defaultAvatarIcon = document.querySelector('#defaultAvatarIcon');

        const avatarInput = document.querySelector('#avatarInput');
        const editAvatarPreview = document.querySelector('#editAvatarPreview');
        const editAvatarIcon = document.querySelector('#editAvatarIcon');

        if (editProfileBtn && editModal) {
            // Abrir Modal
            editProfileBtn.addEventListener('click', () => {
                document.querySelector('#editName').value = profileName.textContent;
                document.querySelector('#editEmail').value = profileEmail.textContent;
                document.querySelector('#editClass').value = profileClass.textContent;
                
                // Prepara preview da foto no modal
                if (profileImageDisplay.src && profileImageDisplay.style.display !== 'none') {
                    editAvatarPreview.src = profileImageDisplay.src;
                    editAvatarPreview.style.display = 'block';
                    editAvatarIcon.style.display = 'none';
                } else {
                    editAvatarPreview.style.display = 'none';
                    editAvatarIcon.style.display = 'block';
                }
                
                editModal.classList.add('active');
            });

            // Lógica de Preview da Foto ao selecionar arquivo
            if (avatarInput) {
                avatarInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            editAvatarPreview.src = event.target.result;
                            editAvatarPreview.style.display = 'block';
                            editAvatarIcon.style.display = 'none';
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }

            // Fechar Modal (Botão X ou Clicar fora)
            const closeModal = () => {
                editModal.classList.remove('active');
                const profileMessageContainer = document.querySelector('#profileMessageContainer');
                if (profileMessageContainer) profileMessageContainer.style.display = 'none';
            };
            closeModalBtn.addEventListener('click', closeModal);
            editModal.addEventListener('click', (e) => {
                if (e.target === editModal) closeModal();
            });

            // Salvar Alterações
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const newName = document.querySelector('#editName').value;
                const newEmail = document.querySelector('#editEmail').value;
                const newClass = document.querySelector('#editClass').value;
                const newAvatar = editAvatarPreview.style.display === 'block' ? editAvatarPreview.src : null;

                // Atualiza na tela
                profileName.textContent = newName;
                profileEmail.textContent = newEmail;
                profileClass.textContent = newClass;
                
                if (newAvatar) {
                    profileImageDisplay.src = newAvatar;
                    profileImageDisplay.style.display = 'block';
                    defaultAvatarIcon.style.display = 'none';
                }

                // Atualiza na Home (Welcome Message)
                const welcomeMsg = document.querySelector('#welcomeMessage');
                if (welcomeMsg) welcomeMsg.textContent = `Olá, ${newName.split(' ')[0]}!`;

                // Salva no LocalStorage mantendo os outros campos
                const currentProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
                const updatedProfile = {
                    ...currentProfile,
                    name: newName,
                    email: newEmail,
                    class: newClass,
                    avatar: newAvatar
                };
                localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

                // Feedback visual melhorado
                const profileMessageContainer = document.querySelector('#profileMessageContainer');
                if (profileMessageContainer) {
                    profileMessageContainer.innerHTML = `
                        <div class="banner-icon"><i class="fas fa-check-circle"></i></div>
                        <div class="banner-content">
                            <strong class="banner-title">Perfil Atualizado!</strong>
                            <span class="banner-text">Suas alterações foram salvas com sucesso.</span>
                        </div>
                    `;
                    profileMessageContainer.className = 'message-banner success';
                    profileMessageContainer.style.display = 'flex';
                    
                    setTimeout(() => {
                        closeModal();
                    }, 2000);
                } else {
                    closeModal();
                }
            });

            // Carregar perfil salvo ao iniciar
            const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
            if (savedProfile) {
                // Preenche os dados comuns
                profileName.textContent = savedProfile.name || 'Usuário';
                profileEmail.textContent = savedProfile.email || 'email@nao.definido';
                
                // Carrega avatar se existir
                if (savedProfile.avatar) {
                    profileImageDisplay.src = savedProfile.avatar;
                    profileImageDisplay.style.display = 'block';
                    defaultAvatarIcon.style.display = 'none';
                }

                const welcomeMsg = document.querySelector('#welcomeMessage');
                if (welcomeMsg && savedProfile.name) {
                    welcomeMsg.textContent = `Olá, ${savedProfile.name.split(' ')[0]}!`;
                } else if (welcomeMsg) {
                    welcomeMsg.textContent = 'Rede de Apoio Escolar';
                }

                // Esconde todos os campos específicos
                document.querySelectorAll('.student-field, .teacher-field, .colaborador-field, .bibliotecaria-field').forEach(f => f.style.display = 'none');

                // Mostra os campos de acordo com o tipo de usuário
                if (savedProfile.userType === 'teacher') {
                    document.querySelectorAll('.teacher-field').forEach(f => f.style.display = 'flex');
                    document.querySelector('#teacherId').textContent = savedProfile.registration;
                    document.querySelector('#teacherSubject').textContent = savedProfile.subject;
                    const schoolsList = document.querySelector('#teacherSchools');
                    schoolsList.innerHTML = ''; // Limpa a lista
                    savedProfile.schools.forEach(school => {
                        const schoolEl = document.createElement('span');
                        schoolEl.textContent = school;
                        schoolsList.appendChild(schoolEl);
                    });
                    // Esconde o card de frequência para professores
                    const frequencyCard = document.querySelector('#frequencySummary');
                    if (frequencyCard) frequencyCard.style.display = 'none';
                } else if (savedProfile.userType === 'colaborador') {
                    document.querySelectorAll('.colaborador-field').forEach(f => f.style.display = 'flex');
                    document.querySelectorAll('.teacher-field').forEach(f => f.style.display = 'flex');
                    
                    const teacherIdEl = document.querySelector('#teacherId');
                    if (teacherIdEl) {
                        teacherIdEl.parentElement.querySelector('.info-label').textContent = 'ID Funcional:';
                        teacherIdEl.textContent = savedProfile.registration;
                    }
                    
                    const teacherSubjectEl = document.querySelector('#teacherSubject');
                    if (teacherSubjectEl) {
                        teacherSubjectEl.parentElement.style.display = 'none';
                    }
                    
                    const schoolsList = document.querySelector('#teacherSchools');
                    if (schoolsList) {
                        schoolsList.innerHTML = '';
                        savedProfile.schools.forEach(school => {
                            const schoolEl = document.createElement('span');
                            schoolEl.textContent = school;
                            schoolsList.appendChild(schoolEl);
                        });
                    }
                    
                    const frequencyCard = document.querySelector('#frequencySummary');
                    if (frequencyCard) frequencyCard.style.display = 'none';
                } else if (savedProfile.userType === 'bibliotecaria') {
                    document.querySelectorAll('.bibliotecaria-field').forEach(f => f.style.display = 'flex');
                    // NÃO mostra teacher-field para não aparecer aba de faltas
                    
                    const teacherIdEl = document.querySelector('#teacherId');
                    if (teacherIdEl) {
                        teacherIdEl.parentElement.querySelector('.info-label').textContent = 'ID Bibliotecária:';
                        teacherIdEl.textContent = savedProfile.registration;
                        teacherIdEl.parentElement.style.display = 'flex'; // Mostra apenas este campo
                    }
                    
                    const schoolsList = document.querySelector('#teacherSchools');
                    if (schoolsList) {
                        schoolsList.innerHTML = '';
                        savedProfile.schools.forEach(school => {
                            const schoolEl = document.createElement('span');
                            schoolEl.textContent = school;
                            schoolsList.appendChild(schoolEl);
                        });
                        schoolsList.parentElement.style.display = 'flex'; // Mostra este campo
                    }
                    
                    const frequencyCard = document.querySelector('#frequencySummary');
                    if (frequencyCard) frequencyCard.style.display = 'none';
                } else {
                    // Assume que é aluno se não for professor
                    document.querySelectorAll('.student-field').forEach(f => f.style.display = 'flex');
                    profileClass.textContent = savedProfile.class || 'Não definida';
                    if (profileSchool) profileSchool.textContent = savedProfile.school || 'Não definida';
                    if (profileCourse) profileCourse.textContent = savedProfile.course || 'Não definido';
                    if (profileRegistration) profileRegistration.textContent = savedProfile.registration || 'Não definida';
                }
            }
        }

        // Inicialização
        renderTasks();
        renderMenu();
        updateHomeSummary();

        // --- LÓGICA DE FALTAS/LIVROS (COLABORADOR/INSPETORA/BIBLIOTECÁRIA) ---
        const absencesSummary = document.querySelector('#absencesSummary');
        const booksSummary = document.querySelector('#booksSummary');
        
        const handleTabClick = (e) => {
            e.preventDefault();
            const userProfile = JSON.parse(localStorage.getItem('userProfile'));
            const isBibliotecaria = userProfile && userProfile.userType === 'bibliotecaria';
            
            if (isBibliotecaria) {
                const libraryTabBtn = document.querySelector('.tab-btn[data-tab="library"]');
                if (libraryTabBtn) libraryTabBtn.click();
            } else {
                const absencesTabBtn = document.querySelector('.tab-btn[data-tab="absences"]');
                if (absencesTabBtn) absencesTabBtn.click();
            }
        };

        if (absencesSummary) absencesSummary.addEventListener('click', handleTabClick);
        if (booksSummary) booksSummary.addEventListener('click', handleTabClick);

        // --- LÓGICA DA BIBLIOTECA (FABIANA) ---
        const libraryLibrarianView = document.querySelector('#libraryLibrarianView');
        const libraryStudentView = document.querySelector('#libraryStudentView');
        const libraryClassroomSelection = document.querySelector('#libraryClassroomSelection');
        const libraryStudentListPanel = document.querySelector('#libraryStudentListPanel');
        const libraryStudentCatalog = document.querySelector('#libraryStudentCatalog');
        const libraryCurrentClassTitle = document.querySelector('#libraryCurrentClassTitle');
        const backToLibraryClasses = document.querySelector('#backToLibraryClasses');
        const librarySearchInput = document.querySelector('#librarySearchInput');

        // Configura visibilidade inicial da aba biblioteca
        const setupLibraryTab = () => {
            const userProfile = JSON.parse(localStorage.getItem('userProfile'));
            if (!userProfile) return;

            const libraryLibrarianView = document.querySelector('#libraryLibrarianView');
            const libraryStudentView = document.querySelector('#libraryStudentView');
            const libraryClassroomSelection = document.querySelector('#libraryClassroomSelection');
            const libraryStudentListPanel = document.querySelector('#libraryStudentListPanel');

            if (userProfile.userType === 'bibliotecaria') {
                if (libraryLibrarianView) libraryLibrarianView.style.display = 'block';
                if (libraryStudentView) libraryStudentView.style.display = 'none';
                if (libraryClassroomSelection) libraryClassroomSelection.style.display = 'block';
                if (libraryStudentListPanel) libraryStudentListPanel.style.display = 'none';
            } else if (userProfile.userType === 'student') {
                if (libraryLibrarianView) libraryLibrarianView.style.display = 'none';
                if (libraryStudentView) libraryStudentView.style.display = 'block';
                renderStudentLoans(userProfile);
            }
        };

        // Chama ao clicar na aba biblioteca
        document.querySelector('.tab-btn[data-tab="library"]')?.addEventListener('click', setupLibraryTab);

        if (libraryClassroomSelection) {
            libraryClassroomSelection.addEventListener('click', (e) => {
                const card = e.target.closest('.clickable-library-class');
                if (card) {
                    const className = card.dataset.class;
                    libraryCurrentClassTitle.innerHTML = `<i class="fas fa-users"></i> Gestão de Livros - Sala ${className}`;
                    
                    const students = generateClassStudents(className);
                    renderLibraryStudents(students);

                    libraryClassroomSelection.style.display = 'none';
                    libraryStudentListPanel.style.display = 'block';
                }
            });
        }

        const renderLibraryStudents = (students) => {
            if (!libraryStudentCatalog) return;
            libraryStudentCatalog.innerHTML = '';
            
            students.forEach(student => {
                const item = document.createElement('div');
                item.className = 'student-absence-item';
                item.style.display = 'flex';
                item.style.flexDirection = 'column';
                item.style.padding = '12px';
                item.style.background = 'var(--bg-card)';
                item.style.borderRadius = '8px';
                item.style.marginBottom = '12px';
                item.style.border = '1px solid var(--border-color)';
                
                const hasBooks = student.books && student.books.length > 0;
                const loanStatusClass = hasBooks ? 'active' : 'none';
                const loanStatusText = hasBooks ? `${student.books.length} LIVRO(S)` : 'SEM LIVROS';

                const booksHtml = hasBooks 
                    ? student.books.map((b, index) => `
                        <div class="book-item-ui" style="margin-top: 8px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 8px;">
                            <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                                <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                                    <div style="color: var(--primary-color); font-size: 14px;">
                                        <i class="fas fa-book"></i>
                                    </div>
                                    <div style="min-width: 0;">
                                        <span style="font-weight: 700; display: block; font-size: 13px; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${b.title}</span>
                                        <span style="font-size: 11px; color: var(--text-muted); white-space: nowrap;">Retirado em: ${b.date}</span>
                                    </div>
                                </div>
                                <button class="btn-loan-action return" data-student="${student.number}" data-index="${index}" title="Registrar Devolução" style="background: transparent; border: none; color: #dc2626; cursor: pointer; padding: 4px;">
                                    <i class="fas fa-undo"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')
                    : `<div style="text-align: center; padding: 10px; color: var(--text-muted); font-style: italic; font-size: 12px;">Nenhum empréstimo ativo</div>`;

                item.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span class="student-number" style="font-weight: 700; color: var(--primary-color);">${student.number}</span>
                            <span class="student-name" style="font-weight: 600;">${student.name}</span>
                        </div>
                        <span class="loan-badge ${loanStatusClass}" style="font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 8px; border-radius: 4px; ${
                            hasBooks ? 'background: #dcfce7; color: #166534;' : 'background: #f1f5f9; color: #475569;'
                        }">
                            ${loanStatusText}
                        </span>
                    </div>
                    <div class="library-controls" style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <button class="btn-new-loan-ui" data-student="${student.number}" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 8px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-main); font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                            <i class="fas fa-plus-circle" style="color: var(--primary-color);"></i> Novo Empréstimo
                        </button>
                    </div>
                    <div class="student-books-list" style="border-top: 1px solid var(--border-color); padding-top: 5px;">
                        ${booksHtml}
                    </div>
                `;
                libraryStudentCatalog.appendChild(item);
            });

            // Lógica de Devolução (Mantida)
            libraryStudentCatalog.querySelectorAll('.btn-loan-action.return').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const studentNum = parseInt(btn.dataset.student);
                    const bookIndex = parseInt(btn.dataset.index);
                    const className = libraryCurrentClassTitle.textContent.replace('Gestão de Livros - Sala ', '').trim();
                    
                    let allStudents = JSON.parse(localStorage.getItem(`absences_${className}`));
                    const student = allStudents.find(s => s.number === studentNum);
                    if (student && student.books) {
                        const removedBook = student.books.splice(bookIndex, 1)[0];
                        localStorage.setItem(`absences_${className}`, JSON.stringify(allStudents));
                        renderLibraryStudents(allStudents);
                        showToast('Devolução Registrada', `O livro "${removedBook.title}" foi devolvido com sucesso.`, 'success');
                    }
                });
            });

            // Lógica de Novo Empréstimo (Mantida)
            libraryStudentCatalog.querySelectorAll('.btn-new-loan-ui').forEach(btn => {
                btn.addEventListener('click', () => {
                    const studentNum = parseInt(btn.dataset.student);
                    const className = libraryCurrentClassTitle.textContent.replace('Gestão de Livros - Sala ', '').trim();
                    
                    showCustomPrompt('Novo Empréstimo', 'Qual o título do livro para empréstimo?', (bookName) => {
                        let allStudents = JSON.parse(localStorage.getItem(`absences_${className}`));
                        const student = allStudents.find(s => s.number === studentNum);
                        if (student) {
                            if (!student.books) student.books = [];
                            student.books.push({
                                title: bookName.trim(),
                                date: new Date().toLocaleDateString('pt-BR')
                            });
                            localStorage.setItem(`absences_${className}`, JSON.stringify(allStudents));
                            renderLibraryStudents(allStudents);
                            showToast('Empréstimo Realizado', `O livro "${bookName}" foi registrado para o aluno.`, 'success');
                        }
                    });
                });
            });
        };

        if (backToLibraryClasses) {
            backToLibraryClasses.addEventListener('click', () => {
                libraryStudentListPanel.style.display = 'none';
                libraryClassroomSelection.style.display = 'block';
            });
        }

        // Lógica de Busca na Biblioteca
        if (librarySearchInput) {
            librarySearchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                const cards = libraryClassroomSelection.querySelectorAll('.clickable-library-class');
                cards.forEach(card => {
                    const className = card.dataset.class.toLowerCase();
                    card.style.display = className.includes(term) ? 'flex' : 'none';
                });
            });
        }

        // --- LÓGICA DE FALTAS (DELIA/ANTÔNIO) ---
        const studentListPanel = document.querySelector('#studentListPanel');
        const classroomSelection = document.querySelector('#classroomSelection');
        const studentCatalog = document.querySelector('#studentCatalog');
        const currentClassTitle = document.querySelector('#currentClassTitle');
        const backToClasses = document.querySelector('#backToClasses');
        const saveAbsencesBtn = document.querySelector('#saveAbsencesBtn');
        const absencesMessageContainer = document.querySelector('#absencesMessageContainer');

        // Garante visibilidade inicial
        if (studentListPanel) studentListPanel.style.display = 'none';
        if (classroomSelection) classroomSelection.style.display = 'block';

        if (classroomSelection) {
            classroomSelection.addEventListener('click', (e) => {
                const card = e.target.closest('.clickable-class');
                if (card) {
                    const className = card.dataset.class;
                    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
                    const isAntonio = userProfile && userProfile.name === 'Antônio';
                    
                    currentClassTitle.textContent = `Sala ${className}`;
                    
                    const students = generateClassStudents(className);
                    studentCatalog.innerHTML = '';
                    
                    students.forEach(student => {
                        const item = document.createElement('div');
                        item.className = 'student-absence-item';
                        item.style.display = 'flex';
                        item.style.flexDirection = 'column';
                        item.style.padding = '12px';
                        item.style.background = 'var(--bg-card)';
                        item.style.borderRadius = '8px';
                        item.style.marginBottom = '12px';
                        item.style.border = '1px solid var(--border-color)';
                        
                        const isAbsent = student.status === 'falta';
                        const isSecondPeriod = student.status === 'segunda_aula';

                        item.innerHTML = `
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <span class="student-number" style="font-weight: 700; color: var(--primary-color);">${student.number}</span>
                                    <span class="student-name" style="font-weight: 600;">${student.name}</span>
                                </div>
                                <span class="status-badge ${student.status}" style="font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 8px; border-radius: 4px; ${
                                    student.status === 'presente' ? 'background: #dcfce7; color: #166534;' : 
                                    student.status === 'falta' ? 'background: #fef2f2; color: #991b1b;' : 
                                    'background: #eff6ff; color: #1e40af;'
                                }">
                                    ${student.status.replace('_', ' ')}
                                </span>
                            </div>
                            <div class="student-controls" style="display: ${isAntonio ? 'flex' : 'none'}; gap: 8px;">
                                <button class="btn-status absent ${isAbsent ? 'active' : ''}" data-number="${student.number}" data-status="falta">
                                    <i class="fas fa-user-times"></i> Falta no dia
                                </button>
                                <button class="btn-status second-period ${isSecondPeriod ? 'active' : ''}" data-number="${student.number}" data-status="segunda_aula">
                                    <i class="fas fa-clock"></i> Entrou na 2ª aula
                                </button>
                                <button class="btn-status present ${student.status === 'presente' ? 'active' : ''}" data-number="${student.number}" data-status="presente" style="flex: 0.5;">
                                    <i class="fas fa-check"></i>
                                </button>
                            </div>
                        `;
                        studentCatalog.appendChild(item);
                    });

                    // Lógica de clique nos botões de status (apenas para Antônio)
                    if (isAntonio) {
                        studentCatalog.querySelectorAll('.btn-status').forEach(btn => {
                            btn.addEventListener('click', (ev) => {
                                ev.stopPropagation();
                                const btnClicked = ev.currentTarget;
                                const num = parseInt(btnClicked.dataset.number);
                                const newStatus = btnClicked.dataset.status;
                                
                                const parent = btnClicked.closest('.student-controls');
                                parent.querySelectorAll('.btn-status').forEach(b => b.classList.remove('active'));
                                btnClicked.classList.add('active');

                                const item = btnClicked.closest('.student-absence-item');
                                const badge = item.querySelector('.status-badge');
                                badge.className = `status-badge ${newStatus}`;
                                badge.textContent = newStatus.replace('_', ' ');
                                badge.style.background = newStatus === 'presente' ? '#dcfce7' : newStatus === 'falta' ? '#fef2f2' : '#eff6ff';
                                badge.style.color = newStatus === 'presente' ? '#166534' : newStatus === 'falta' ? '#991b1b' : '#1e40af';
                            });
                        });
                    }

                    if (saveAbsencesBtn) {
                        saveAbsencesBtn.style.display = isAntonio ? 'block' : 'none';
                    }

                    classroomSelection.style.display = 'none';
                    studentListPanel.style.display = 'block';
                }
            });
        }

        if (backToClasses) {
            backToClasses.addEventListener('click', () => {
                studentListPanel.style.display = 'none';
                classroomSelection.style.display = 'block';
            });
        }

        if (saveAbsencesBtn) {
            saveAbsencesBtn.addEventListener('click', () => {
                const className = currentClassTitle.textContent.replace('Sala ', '').trim();
                const students = JSON.parse(localStorage.getItem(`absences_${className}`));
                
                studentCatalog.querySelectorAll('.student-absence-item').forEach(item => {
                    const btnStatus = item.querySelector('.btn-status');
                    if (!btnStatus) return;

                    const num = parseInt(btnStatus.dataset.number);
                    const activeBtn = item.querySelector('.btn-status.active');
                    const status = activeBtn ? activeBtn.dataset.status : 'presente';
                    
                    const student = students.find(s => s.number === num);
                    if (student) student.status = status;
                });

                localStorage.setItem(`absences_${className}`, JSON.stringify(students));
                
                if (absencesMessageContainer) {
                    absencesMessageContainer.innerHTML = `
                        <div class="banner-icon"><i class="fas fa-check-circle"></i></div>
                        <div class="banner-content">
                            <strong class="banner-title">Chamada Salva!</strong>
                            <span class="banner-text">A presença da sala <strong>${className}</strong> foi registrada com sucesso.</span>
                        </div>
                    `;
                    absencesMessageContainer.className = 'message-banner success';
                    absencesMessageContainer.style.display = 'flex';
                    
                    setTimeout(() => {
                        absencesMessageContainer.style.display = 'none';
                        studentListPanel.style.display = 'none';
                        classroomSelection.style.display = 'block';
                    }, 2000);
                }
            });
        }

        // --- INICIALIZAÇÃO DO DASHBOARD ---
        if (userProfile) {
            updateHomeSummary();
            renderTasks();
            renderMenu();
            
            // Se for aluno, garante que os empréstimos sejam carregados na aba biblioteca
            if (userProfile.userType === 'student') {
                const libraryTab = document.querySelector('#library');
                const libraryStudentView = document.querySelector('#libraryStudentView');
                const libraryLibrarianView = document.querySelector('#libraryLibrarianView');
                
                if (libraryStudentView) libraryStudentView.style.display = 'block';
                if (libraryLibrarianView) libraryLibrarianView.style.display = 'none';
                
                renderStudentLoans(userProfile);
            }
        }
    }

    // ---------------------------------------------------------
    // LÓGICA DE TEMA (CLARO/ESCURO) - PERSISTENTE E SINCRONIZADA
    // ---------------------------------------------------------
    const themeToggleBtn = document.querySelector('#themeToggleBtn');
    const htmlElement = document.documentElement;

    const updateThemeUI = (isDark) => {
        const icon = themeToggleBtn?.querySelector('i');
        if (isDark) {
            htmlElement.classList.add('dark-mode');
            if (icon) icon.className = 'fas fa-sun';
        } else {
            htmlElement.classList.remove('dark-mode');
            if (icon) icon.className = 'fas fa-moon';
        }
    };

    // Inicializa a interface com base no estado atual (que pode ter vindo da inicialização imediata)
    updateThemeUI(htmlElement.classList.contains('dark-mode'));

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isNowDark = htmlElement.classList.toggle('dark-mode');
            localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
            updateThemeUI(isNowDark);
        });
    }

    // Sincroniza o tema entre diferentes abas em tempo real
    window.addEventListener('storage', (e) => {
        if (e.key === 'theme') {
            updateThemeUI(e.newValue === 'dark');
        }
    });
});
