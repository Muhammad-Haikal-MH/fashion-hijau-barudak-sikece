// Accordion functionality
const topicHeaders = document.querySelectorAll('.topic-header');
const topicContents = document.querySelectorAll('.topic-content');

topicHeaders.forEach((header, index) => {
  header.addEventListener('click', () => {
    const content = topicContents[index];
    const arrow = header.querySelector('svg');
    
    // Toggle current section
    const isExpanded = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
    
    if (!isExpanded) {
      content.style.maxHeight = `${content.scrollHeight}px`;
      arrow.classList.add('rotate-180');
    } else {
      content.style.maxHeight = '0px';
      arrow.classList.remove('rotate-180');
    }
  });
});

// Impact Tabs
const impactTabs = document.querySelectorAll('.impact-tab');
const impactPanels = document.querySelectorAll('.impact-panel');

impactTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Remove active states
    impactTabs.forEach(t => {
      t.classList.remove('active');
      t.classList.remove('border-nature');
      t.classList.add('border-transparent');
    });
    impactPanels.forEach(p => p.classList.add('hidden'));
    
    // Set active states
    tab.classList.add('active');
    tab.classList.add('border-nature');
    tab.classList.remove('border-transparent');
    impactPanels[index].classList.remove('hidden');
  });
});

// 3D Card Rotation
const cards = document.querySelectorAll('.card-3d');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.querySelector('.card-inner').style.transform = 
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.querySelector('.card-inner').style.transform = 
      'rotateX(0deg) rotateY(0deg)';
  });
});

// Quiz System
const questions = [
  {
    question: 'Berapa persen emisi karbon global yang disumbangkan oleh industri fashion?',
    options: ['5%', '10%', '15%', '20%'],
    correct: 1
  },
  {
    question: 'Berapa liter air yang dibutuhkan untuk memproduksi satu kaos katun?',
    options: ['1,000 liter', '1,500 liter', '2,700 liter', '3,000 liter'],
    correct: 2
  },
  {
    question: 'Berapa persen tekstil bekas yang dapat didaur ulang?',
    options: ['75%', '85%', '95%', '100%'],
    correct: 2
  },
  {
    question: 'Manakah yang bukan merupakan material berkelanjutan?',
    options: ['Hemp', 'Katun Organik', 'Polyester Murni', 'Tencel'],
    correct: 2
  },
  {
    question: 'Apa dampak positif dari fashion berkelanjutan?',
    options: [
      'Meningkatkan konsumsi air',
      'Mengurangi emisi karbon',
      'Mempercepat produksi',
      'Menurunkan kualitas'
    ],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

function showQuestion(index) {
  const quizContainer = document.querySelector('.quiz-container');
  const question = questions[index];
  
  quizContainer.innerHTML = `
    <div class="question-container animate-fade-in">
      <h3 class="text-xl font-bold text-gray-800 mb-6">${question.question}</h3>
      <div class="space-y-4">
        ${question.options.map((option, i) => `
          <button class="option-btn w-full p-4 text-left bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors" data-index="${i}">
            ${option}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Update progress
  document.querySelector('.quiz-progress-bar').style.width = `${(index + 1) * 20}%`;
  document.querySelector('.quiz-score').textContent = `Skor: ${score}`;
  
  // Add click handlers to options
  const optionBtns = document.querySelectorAll('.option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedIndex = parseInt(btn.dataset.index);
      checkAnswer(selectedIndex);
    });
  });
}

function checkAnswer(selectedIndex) {
  const question = questions[currentQuestion];
  const optionBtns = document.querySelectorAll('.option-btn');
  
  optionBtns.forEach(btn => {
    btn.disabled = true;
    const index = parseInt(btn.dataset.index);
    
    if (index === question.correct) {
      btn.classList.add('bg-green-100');
    } else if (index === selectedIndex) {
      btn.classList.add('bg-red-100');
    }
  });
  
  if (selectedIndex === question.correct) {
    score += 20;
    document.querySelector('.quiz-score').textContent = `Skor: ${score}`;
  }
}

document.getElementById('nextQuestion').addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `
      <div class="text-center">
        <h3 class="text-2xl font-bold text-emerald-800 mb-4">Selamat!</h3>
        <p class="text-xl text-gray-600">Skor akhir Anda: ${score}</p>
        <button class="mt-8 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors" onclick="location.reload()">
          Mulai Ulang
        </button>
      </div>
    `;
    document.getElementById('nextQuestion').style.display = 'none';
  }
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  showQuestion(0);
});