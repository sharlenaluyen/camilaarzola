const form = document.querySelector('#friend-form');
const result = document.querySelector('#result');

const reports = {
  blueberries: 'You are willing to trust the blueberry scientist’s latest experiment. Extremely promising.',
  cookies: 'You believe dessert is a valid dinner course. I respect your clarity of purpose.',
  lasagna: 'You are prepared to feed a small gathering at a moment’s notice. We may be unstoppable.',
  market: 'You have excellent instincts: wandering, buying too many herbs, and making lunch last forever.',
  hike: 'You know that every good adventure needs snacks. Truman is ready when you are.',
  home: 'You can share silence without making it weird. This is a rare and beautiful skill.',
  crunch: 'You bring essential texture to a friendship.',
  sweet: 'You contain multitudes, and at least one of them is probably salted caramel.',
  surprise: 'You are delightfully trusting. I will curate responsibly.',
  research: 'You are the kind of person who can rescue a drooping fern and a conversation.',
  talk: 'You understand that plants need encouragement and friends need the same.',
  propagate: 'You see possibility everywhere. Also, you probably have excellent windowsill real estate.',
  herbal: 'You appreciate a quiet cup and a thoughtful steep. Very good signs.',
  iced: 'You have a strong point of view about tea, and I respect the commitment.'
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name').trim() || 'mysterious friend';
  const answers = ['food', 'day', 'snack', 'tea'].map((question) => data.get(question));
  const score = answers.filter((answer, index) => answer === ['blueberries', 'market', 'surprise', 'surprise'][index]).length;
  const verdict = score >= 3 ? 'Very compatible, on paper.' : score === 2 ? 'Promising, with room for snack-based research.' : 'Intriguingly different. Let’s investigate over dinner.';

  result.hidden = false;
  result.innerHTML = `<h3>${name}, your results are in.</h3><p><strong>${verdict}</strong> ${reports[answers[0]]} ${reports[answers[1]]}</p>`;
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});