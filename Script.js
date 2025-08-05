const addBtn = document.getElementById('add-btn');
const input = document.getElementById('goal-input');
const list = document.getElementById('goal-list');

// Load from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
  savedGoals.forEach(goal => renderGoal(goal.text, goal.completed));
});

// Add new goal
addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text) {
    renderGoal(text, false);
    saveGoals();
    input.value = '';
  }
});

// Render goal to UI
function renderGoal(text, completed) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  // Toggle completed on click
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveGoals();
  });

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.className = 'delete-btn';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveGoals();
  });

  li.appendChild(delBtn);
  list.appendChild(li);
}

// Save all goals to localStorage
function saveGoals() {
  const goals = [];
  list.querySelectorAll('li').forEach(li => {
    goals.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed'),
    });
  });
  localStorage.setItem('goals', JSON.stringify(goals));
}
