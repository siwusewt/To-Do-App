        const taskInput = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');
        const taskList = document.getElementById('taskList');
        const totalTasksEl = document.getElementById('totalTasks');
        const completedTasksEl = document.getElementById('completedTasks');

        let tasks = [];

        function addTask() {
            const text = taskInput.value.trim();
            if (text === '') return;

            const task = {
                id: Date.now(),
                text: text,
                completed: false
            };

            tasks.push(task);
            taskInput.value = '';
            renderTasks();
        }

        function toggleTask(id) {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                renderTasks();
            }
        }

        function deleteTask(id) {
            tasks = tasks.filter(t => t.id !== id);
            renderTasks();
        }

        function renderTasks() {
            taskList.innerHTML = '';

            if (tasks.length === 0) {
                taskList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
            } else {
                tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.className = `task-item ${task.completed ? 'completed' : ''}`;
                    
                    li.innerHTML = `
                        <div class="checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
                        <span class="task-text">${task.text}</span>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                    `;
                    
                    taskList.appendChild(li);
                });
            }

            updateStats();
        }

        function updateStats() {
            const total = tasks.length;
            const completed = tasks.filter(t => t.completed).length;
            
            totalTasksEl.textContent = `${total} ${total === 1 ? 'task' : 'tasks'}`;
            completedTasksEl.textContent = `${completed} completed`;
        }

        addBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });

        renderTasks();