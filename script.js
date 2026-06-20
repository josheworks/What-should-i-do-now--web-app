 
alert('JS is running!');
console.log('JS loaded');      
      
      const tasks = [
            { text: "Learn JavaScript for 20 minutes", icon: "💻" },
            { text: "Go for a 10-minute walk", icon: "🚶" },
            { text: "Drink a glass of water", icon: "💧" },
            { text: "Read 5 pages of a book", icon: "📚" },
            { text: "Clean your desk for 5 minutes", icon: "🧹" },
            { text: "Watch a programming tutorial", icon: "🎥" },
            { text: "Do 20 pushups", icon: "💪" },
            { text: "Plan tomorrow's tasks", icon: "📝" },
            { text: "Practice typing for 10 minutes", icon: "⌨️" },
            { text: "Work on a mini project", icon: "🚀" },
            { text: "Meditate for 5 minutes", icon: "🧘" },
            { text: "Call a friend or family member", icon: "📱" },
            { text: "Write down 3 things you're grateful for", icon: "✨" },
            { text: "Stretch for 5 minutes", icon: "🤸" },
            { text: "Organize your phone's home screen", icon: "📱" },
            { text: "Learn a new word in a foreign language", icon: "🌍" },
            { text: "Listen to a podcast episode", icon: "🎧" },
            { text: "Draw or doodle for 10 minutes", icon: "🎨" },
            { text: "Make your bed", icon: "🛏️" },
            { text: "Write a journal entry", icon: "📓" }
        ];

        let history = [];
        let streak = 0;
        let lastTaskIndex = -1;

        function task() {
            const btn = document.getElementById('taskBtn');
            const taskCard = document.getElementById('taskCard');
            const taskDisplay = document.getElementById('taskDisplay');
            
            btn.disabled = true;
            btn.textContent = 'Choosing...';
            
            // Animation effect
            taskCard.classList.remove('active');
            
            // Core to build an random tasks
            let shuffleCount = 0;
            const shuffleInterval = setInterval(() => {
                const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
                taskDisplay.innerHTML = `<span class="task-icon">${randomTask.icon}</span><br>${randomTask.text}`;
                taskDisplay.classList.add('fade-in');
                shuffleCount++;

                // to stop the suffle and display the result
                if (shuffleCount >= 8) {
                    clearInterval(shuffleInterval);
                    
                    // Pick final task (avoid immediate repeat)
                    let newIndex;
                    do {
                        newIndex = Math.floor(Math.random() * tasks.length);
                    } while (newIndex === lastTaskIndex && tasks.length > 1);
                    
                    lastTaskIndex = newIndex;
                    const finalTask = tasks[newIndex];
                    
                    taskDisplay.innerHTML = `<span class="task-icon">${finalTask.icon}</span><br>${finalTask.text}`;
                    taskCard.classList.add('active');
                    
                    // Update history
                    addToHistory(finalTask);
                    
                    // Update streak
                    streak++;
                    updateStreak();
                    
                    btn.disabled = false;
                    btn.textContent = 'What Should I Do Now?';
                }
            }, 100);
        }

        function addToHistory(task) {
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            history.unshift({ ...task, time: timestamp });
            if (history.length > 5) history.pop();
            
            updateHistoryDisplay();
        }

        function updateHistoryDisplay() {
            const historySection = document.getElementById('historySection');
            const historyList = document.getElementById('historyList');
            
            if (history.length > 0) {
                historySection.style.display = 'block';
                historyList.innerHTML = history.map(item => `
                    <div class="history-item">
                        <span class="history-icon">${item.icon}</span>
                        <span>${item.text}</span>
                        <span style="margin-left: auto; color: #a0aec0; font-size: 12px;">${item.time}</span>
                    </div>
                `).join('');
            }
        }

        function updateStreak() {
            const streakDisplay = document.getElementById('streakDisplay');
            if (streak > 1) {
                streakDisplay.textContent = `🔥 ${streak} tasks completed!`;
            } else if (streak === 1) {
                streakDisplay.textContent = `🎉 First task! Keep going!`;
            }
        }

        // Keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                const btn = document.getElementById('taskBtn');
                if (!btn.disabled) {
                    task();
                }
            }
        });