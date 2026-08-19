document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const list = document.getElementById('messages');

  function appendMessage(who, text) {
    const li = document.createElement('li');
    li.className = who === 'user' ? 'msg user' : 'msg bot';
    li.textContent = text;
    list.appendChild(li);
    list.scrollTop = list.scrollHeight;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    appendMessage('user', text);
    input.value = '';
    input.disabled = true;

    try {
      const resp = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await resp.json();
      appendMessage('bot', data.reply || 'No reply');
    } catch (err) {
      appendMessage('bot', 'Error: ' + err.message);
    } finally {
      input.disabled = false;
      input.focus();
    }
  });
});
