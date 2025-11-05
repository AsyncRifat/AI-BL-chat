const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

const offers = {
  internet: [
    '৪৫ জিবি | ৬৯৮ টাকা | ৩০ দিন',
    '৩০ জিবি | ৫৯৮ টাকা | ৩০ দিন',
    '১৫০ জিবি | ৯৯৯ টাকা | ৩০ দিন',
  ],
  minute: [
    '৫০০ মিনিট | ৩৫৭ টাকা | ৩০ দিন',
    '৩০০ মিনিট | ২৫৭ টাকা | ৩০ দিন',
    '৬৫০ মিনিট | ৪১৯ টাকা | ৩০ দিন',
  ],
  sms: [
    '১০০০ SMS | ৯৫ টাকা | ২০ দিন',
    '৫০০ SMS | ৭৫ টাকা | ৩০ দিন',
    '১০০ SMS | ৩৩ টাকা | ৭ দিন',
  ],
};

// Button click & Enter key event
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSend();
});

function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;
  appendUserMsg(text);
  userInput.value = '';
  const keyword = detectKeyword(text);

  showTyping();

  setTimeout(() => {
    removeTyping();
    if (keyword) showOffers(keyword);
    else
      appendBotMsg(
        'দুঃখিত, আমি মিনিট / ইন্টারনেট / এসএমএস ছাড়া কিছু বুঝতে পারছি না 😅'
      );
  }, 300);
}

function detectKeyword(text) {
  const t = text.toLowerCase();
  if (t.includes('মিনিট') || t.includes('minute') || t.includes('min'))
    return 'minute';
  if (t.includes('ইন্টারনেট') || t.includes('internet') || t.includes('net'))
    return 'internet';
  if (t.includes('sms') || t.includes('এসএমএস')) return 'sms';
  return null;
}

function appendUserMsg(msg) {
  const div = document.createElement('div');
  div.className = 'user-msg';
  div.textContent = msg;
  chatBox.appendChild(div);
  scrollToBottom();
}

function appendBotMsg(msg) {
  const div = document.createElement('div');
  div.className = 'bot-msg';
  div.textContent = msg;
  chatBox.appendChild(div);
  scrollToBottom();
}

function showTyping() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'bot-msg typing';
  typingDiv.id = 'typing';
  typingDiv.innerHTML =
    '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
  chatBox.appendChild(typingDiv);
  scrollToBottom();
}

function removeTyping() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

function showOffers(type) {
  appendBotMsg('আপনার জন্য অফারঃ');
  offers[type].forEach(offer => {
    const card = document.createElement('div');
    card.className = 'offer-card bot-msg';
    card.textContent = offer;
    chatBox.appendChild(card);
  });
  scrollToBottom();
}

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}
