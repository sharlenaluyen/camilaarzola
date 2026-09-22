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

const legMasks = Array.from({ length: 7 }, (_, i) => document.querySelector(`#reveal-leg-${i}-path`));
const plane = document.querySelector('#plane');
const flyButton = document.querySelector('#fly-route');

if (legMasks.every(Boolean) && plane && flyButton) {
  const mapTip = document.querySelector('#map-tip');
  const mapTipLabel = document.querySelector('#map-tip-label');
  const cityDots = Array.from(document.querySelectorAll('#map .city-dot'));

  let activeStop = null;

  const showTipFor = (index) => {
    const dot = cityDots[index];
    const circle = dot.querySelector('circle');
    const x = parseFloat(circle.getAttribute('cx'));
    const y = parseFloat(circle.getAttribute('cy'));
    mapTipLabel.textContent = dot.getAttribute('aria-label');
    mapTip.setAttribute('x', String(x - 100));
    mapTip.setAttribute('y', String(y - 46));
    mapTip.classList.add('visible');
  };

  const showActiveTip = () => {
    if (activeStop === null) {
      mapTip.classList.remove('visible');
    } else {
      showTipFor(activeStop);
    }
  };

  const setActiveStop = (index) => {
    if (activeStop !== null) cityDots[activeStop].classList.remove('active');
    activeStop = index;
    if (activeStop !== null) cityDots[activeStop].classList.add('active');
    showActiveTip();
  };

  cityDots.forEach((dot, index) => {
    dot.addEventListener('mouseenter', () => showTipFor(index));
    dot.addEventListener('mouseleave', showActiveTip);
    dot.addEventListener('focus', () => showTipFor(index));
    dot.addEventListener('blur', showActiveTip);
  });

  const stops = Array.from(document.querySelectorAll('#map .city-dot circle')).map((circle) => ({
    x: parseFloat(circle.getAttribute('cx')),
    y: parseFloat(circle.getAttribute('cy')),
  }));

  const legLengths = stops.slice(1).map((stop, i) => Math.hypot(stop.x - stops[i].x, stop.y - stops[i].y));

  legMasks.forEach((mask, i) => {
    mask.style.strokeDasharray = String(legLengths[i]);
    mask.style.strokeDashoffset = String(legLengths[i]);
  });

  const msPerLeg = 900;
  let currentStop = 0;
  let isAnimating = false;

  const setLegRevealed = (legIndex, length) => {
    legMasks[legIndex].style.strokeDashoffset = String(legLengths[legIndex] - length);
  };

  const placeAtStop = (index) => {
    plane.setAttribute('transform', `translate(${stops[index].x} ${stops[index].y})`);
    legMasks.forEach((_, i) => setLegRevealed(i, i < index ? legLengths[i] : 0));
    setActiveStop(index);
  };

  placeAtStop(0);

  const flyLeg = (index) => new Promise((resolve) => {
    const from = stops[index];
    const to = stops[index + 1];
    const legLength = legLengths[index];
    const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);
    const duration = msPerLeg;
    const start = performance.now();

    setActiveStop(null);

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const x = from.x + (to.x - from.x) * t;
      const y = from.y + (to.y - from.y) * t;
      plane.setAttribute('transform', `translate(${x} ${y}) rotate(${angle})`);
      setLegRevealed(index, legLength * t);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        setActiveStop(index + 1);
        resolve();
      }
    };

    requestAnimationFrame(step);
  });

  const flyNextLeg = async () => {
    if (isAnimating) return;
    if (currentStop >= stops.length - 1) {
      currentStop = 0;
      placeAtStop(0);
      return;
    }
    isAnimating = true;
    await flyLeg(currentStop);
    currentStop += 1;
    isAnimating = false;
  };

  const flyFullRoute = async () => {
    if (isAnimating) return;
    isAnimating = true;
    flyButton.disabled = true;
    currentStop = 0;
    placeAtStop(0);
    for (let i = 0; i < stops.length - 1; i += 1) {
      await flyLeg(i);
      currentStop = i + 1;
    }
    isAnimating = false;
    flyButton.disabled = false;
  };

  flyButton.addEventListener('click', flyFullRoute);
  document.querySelector('.map-frame').addEventListener('click', flyNextLeg);
  plane.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      flyNextLeg();
    }
  });
}