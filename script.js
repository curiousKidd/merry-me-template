/* ═══════════════════════════════════════════════════════════════
   script.js — merry-me proposal website

   ✏️  개인화 방법:
   아래 데이터 객체들만 수정하면 문구·이미지를 쉽게 바꿀 수 있습니다.
   ═══════════════════════════════════════════════════════════════ */


/* ──────────────────────────────────────────────────────────────
   0. 비밀번호 설정 (여기를 수정하세요)
   ────────────────────────────────────────────────────────────── */

/**
 * ✏️  비밀번호는 .env 파일의 VITE_PW 에서 관리합니다.
 * 소스코드에 직접 노출되지 않으며, git에도 올라가지 않습니다.
 *
 * 변경 방법:
 *   1. .env 파일의 VITE_PW 값을 원하는 숫자로 교체
 *   2. Netlify → Site configuration → Environment variables 에서도 동일하게 업데이트
 */
const PASSWORD = import.meta.env.VITE_PW;

/** 비밀번호 화면 문구 */
const pwData = {
  label:    '우리만 아는 숫자',
  title:    '기억하고 있나요?',
  desc:     '우리가 처음 만난 그 날을\n숫자로 입력해줘요.',
  hint:     '형식: YYMMDD  (예: 20230115)',
  errorMsg: '틀렸네....?',
};


/* ──────────────────────────────────────────────────────────────
   1. 콘텐츠 데이터 (여기를 수정하세요)
   ────────────────────────────────────────────────────────────── */

/** 첫 화면 (히어로) */
const heroData = {
  title:  '우리의 이야기',
  sub:    '처음부터 지금까지,\n그리고 앞으로의 시간을 담아봤어요.',
  btn:    '천천히 시작해볼까요?',
  bgImg:  'images/hero.jpg',       // 배경 이미지 경로
};

/**
 * 스토리 장면 3개 — 각 장면에 사진 2장을 넣어주세요
 *
 * - main: 상단 큰 텍스트 (\n 으로 줄바꿈)
 * - hint: 선택 유도 힌트 문구 (작은 글씨)
 * - imgA / imgB: 좌·우 사진 경로 및 alt
 */
const storyData = [
  // 장면 2 — Q1: 첫 설렘
  {
    main:  '처음엔 그냥 좋은 사람이었어요.',
    hint:  '처음 만났을 때, 어느 순간부터 마음이 움직이기 시작했나요?',
    imgA:  { src: 'images/memory1a.jpg', alt: '첫 만남의 추억 A' },
    imgB:  { src: 'images/memory1b.jpg', alt: '첫 만남의 추억 B' },
  },
  // 장면 3 — Q2: 소소한 일상
  {
    main:  '평범한 하루도 특별했어요.',
    hint:  '우리의 평범한 하루 중, 더 오래 기억하고 싶은 순간은요?',
    imgA:  { src: 'images/memory2a.jpg', alt: '소소한 일상 A' },
    imgB:  { src: 'images/memory2b.jpg', alt: '소소한 일상 B' },
  },
  // 장면 4 — Q3: 가장 행복했던 순간
  {
    main:  '함께 웃었던 모든 순간이 소중해요.',
    hint:  '둘이 함께 웃었던 순간들, 더 자주 떠오르는 건 어느 쪽인가요?',
    imgA:  { src: 'images/memory3a.jpg', alt: '행복했던 순간 A' },
    imgB:  { src: 'images/memory3b.jpg', alt: '행복했던 순간 B' },
  },
  // 장면 5 — Q4: 함께하고 싶은 미래
  {
    main:  '앞으로의 시간도 함께하고 싶어요.',
    hint:  '앞으로도 꼭 함께하고 싶은 순간, 어느 쪽에 더 마음이 가나요?',
    imgA:  { src: 'images/memory4a.jpg', alt: '함께하고 싶은 미래 A' },
    imgB:  { src: 'images/memory4b.jpg', alt: '함께하고 싶은 미래 B' },
  },
  // 장면 6 — Q5: 오늘 이 순간
  {
    main:  '그리고 오늘,',
    hint:  '오늘 이 자리에서, 지금 마음속에 더 크게 느껴지는 건 어느 쪽인가요?',
    imgA:  { src: 'images/memory5a.jpg', alt: '오늘의 순간 A' },
    imgB:  { src: 'images/memory5b.jpg', alt: '오늘의 순간 B' },
  },
];

/** AI 분석 시작 화면 */
const analyzerData = {
  badge:  '궁합도 AI 분석',
  title:  '우리의 시간을\n한번 분석해볼까요?',
  desc:   '지금까지의 모든 순간을\n조용히 들여다볼게요.',
  btn:    '분석 시작',
};

/**
 * AI 분석 로딩 단계 문구
 * 순서대로 화면에 나타납니다.
 */
const analysisSteps = [
  '사진 속 웃음 분석 중...',
  '추억 데이터 정리 중...',
  '행복도 계산 중...',
  '함께하고 싶은 미래 예측 중...',
];

/**
 * AI 분석 결과 카드
 * - label: 항목 이름
 * - value: 표시 수치 또는 텍스트
 */
const analysisResults = [
  { label: '함께 웃은 횟수',     value: '∞' },
  { label: '행복 지수',          value: '100%' },
  { label: '함께하고 싶은 미래', value: '평생' },
];

/** 분석 결과 화면 */
const resultData = {
  badge:      '결과가 나왔어요',
  conclusion: '궁합도 AI 분석 결과. 이 관계는 평생 함께해야 해요.',
};

/** 프로포즈 화면 */
const proposalData = {
  lead:     '그래서',
  bridge:   '이 질문을 드리고 싶어요.',
  context:  '지금까지의 모든 순간이 소중했고,\n앞으로의 시간은 더 소중하게 만들고 싶어요.',
  question: '저와 결혼해줄래요?',
  yesBtn:   '좋아요! 💍',
  noBtn:    '싫어요..',
};

/** 재고 모달 문구 + 사진 */
const reconsiderData = {
  img: 'images/reconsider.jpg', // ← 사용할 사진 경로 (없으면 숨김 처리됨)
  imgAlt: '다시 생각해봐요',
  msg: '조금만 더 생각해봐요.',
  sub: '이 마음, 꽤 오래 준비했거든요. 🥺\n다시 한번 눌러봐요.',
};

/** 마지막 오버레이 */
const finalData = {
  line1: '사랑해요',
  line2: '이 말은 이제\n화면이 아니라 직접 전할게요.',
};


/* ──────────────────────────────────────────────────────────────
   2. 장면 상태 관리
   ────────────────────────────────────────────────────────────── */

let currentScene = 1;
const TOTAL_SCENES = 10;


/* ──────────────────────────────────────────────────────────────
   3. 초기화 — DOM 준비 후 콘텐츠를 채운다
   ────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', initContent);

/** 모든 장면의 텍스트·이미지를 데이터로 채운다 */
function initContent() {

  // 비밀번호 화면
  setText('pw-label', pwData.label);
  setText('pw-title', pwData.title);
  setLines('pw-desc',  pwData.desc);
  setText('pw-hint',  pwData.hint);

  // 히어로 화면
  setText('hero-title', heroData.title);
  setLines('hero-sub',  heroData.sub);
  setText('start-btn',  heroData.btn);
  setHeroBg(heroData.bgImg);

  // 스토리 장면 1–5
  storyData.forEach((data, i) => initStory(data, i + 1));

  // AI 분석 시작
  setText('analyzer-badge',      analyzerData.badge);
  setLines('analyzer-title',     analyzerData.title);
  setLines('analyzer-desc',      analyzerData.desc);
  setText('analysis-start-btn',  analyzerData.btn);

  // 분석 결과
  setText('result-badge',       resultData.badge);
  setText('result-conclusion',  resultData.conclusion);
  buildResultGrid();

  // 프로포즈
  setText('proposal-lead',     proposalData.lead);
  setText('proposal-bridge',   proposalData.bridge);
  setLines('proposal-context', proposalData.context);
  setText('proposal-question', proposalData.question);
  setText('proposal-yes',      proposalData.yesBtn);
  setText('proposal-no',       proposalData.noBtn);

  // 재고 모달
  const rcImg = document.getElementById('reconsider-img');
  if (rcImg) { rcImg.src = reconsiderData.img; rcImg.alt = reconsiderData.imgAlt; }
  setText('reconsider-msg', reconsiderData.msg);
  setLines('reconsider-sub', reconsiderData.sub);

  // 마지막 오버레이
  setText('final-line-1',  finalData.line1);
  setLines('final-line-2', finalData.line2);
}

/** 히어로 배경 이미지 설정 */
function setHeroBg(src) {
  const el = document.getElementById('hero-bg');
  if (el) el.style.backgroundImage = `url('${src}')`;
}

/** 스토리 장면 초기화 (idx: 1, 2, 3) */
function initStory(data, idx) {
  setLines(`story-${idx}-main`, data.main);
  setText(`story-${idx}-hint`,  data.hint);

  const imgA = document.getElementById(`story-${idx}-img-a`);
  const imgB = document.getElementById(`story-${idx}-img-b`);
  if (imgA) {
    imgA.alt = data.imgA.alt;
    imgA.src = data.imgA.src;
    imgA.onerror = () => { imgA.style.opacity = '0'; };
  }
  if (imgB) {
    imgB.alt = data.imgB.alt;
    imgB.src = data.imgB.src;
    imgB.onerror = () => { imgB.style.opacity = '0'; };
  }
}

/** 결과 카드들을 동적으로 생성 */
function buildResultGrid() {
  const grid = document.getElementById('result-grid');
  if (!grid) return;
  grid.innerHTML = '';
  analysisResults.forEach(item => {
    const card = document.createElement('div');
    card.className = 'result-card';
    // 텍스트만 사용하므로 XSS 위험 없음
    const label = document.createElement('span');
    label.className = 'result-label';
    label.textContent = item.label;
    const value = document.createElement('span');
    value.className = 'result-value';
    value.textContent = item.value;
    card.append(label, value);
    grid.appendChild(card);
  });
}


/* ──────────────────────────────────────────────────────────────
   4. 비밀번호 처리
   ────────────────────────────────────────────────────────────── */

/** 비밀번호 확인 */
function checkPassword() {
  const input     = document.getElementById('pw-input');
  const errorEl   = document.getElementById('pw-error');
  const screen    = document.getElementById('password-screen');

  if (!input) return;

  const entered = input.value.trim();

  if (entered === PASSWORD) {
    // 정답: 오류 숨기고 화면 페이드아웃 후 제거
    errorEl.classList.remove('show');
    screen.classList.add('hide');
    screen.addEventListener('animationend', () => {
      screen.style.display = 'none';
      input.blur();
    }, { once: true });
  } else {
    // 오답: 흔들기 + 오류 메시지
    errorEl.textContent = pwData.errorMsg;
    errorEl.classList.add('show');

    input.classList.remove('shake');
    void input.offsetWidth; // 애니메이션 재실행을 위한 리플로우
    input.classList.add('shake');
    input.addEventListener('animationend', () => {
      input.classList.remove('shake');
    }, { once: true });

    input.value = '';
    input.focus();
  }
}


/* ──────────────────────────────────────────────────────────────
   5. 장면 전환
   ────────────────────────────────────────────────────────────── */

/** 다음 장면으로 */
function goNext() {
  if (currentScene >= TOTAL_SCENES) return;
  transitionTo(currentScene + 1);
}

/**
 * 사진 선택 처리
 * @param {HTMLElement} el  - 클릭된 .photo-opt 버튼
 * @param {number}      idx - 스토리 장면 번호 (1, 2, 3)
 */
function selectPhoto(el, idx) {
  // 이미 선택 진행 중이면 무시
  const choices = document.getElementById(`story-${idx}-choices`);
  if (!choices || choices.dataset.choosing) return;
  choices.dataset.choosing = '1';

  // 선택된 사진 강조, 나머지 흐리기
  choices.querySelectorAll('.photo-opt').forEach(btn => {
    btn.classList.toggle('selected', btn === el);
    btn.classList.toggle('dimmed',   btn !== el);
    btn.disabled = true;
  });

  // 잠시 후 다음 장면으로 이동
  setTimeout(goNext, 750);
}

/** 특정 장면 번호로 전환 */
function transitionTo(targetIndex) {
  const fromEl = document.getElementById(`scene-${currentScene}`);
  const toEl   = document.getElementById(`scene-${targetIndex}`);
  if (!fromEl || !toEl) return;

  // 현재 장면 나가기
  fromEl.classList.remove('active');
  fromEl.classList.add('exit');
  setTimeout(() => fromEl.classList.remove('exit'), 900);

  // 다음 장면 들어오기
  toEl.classList.add('active');
  currentScene = targetIndex;
}


/* ──────────────────────────────────────────────────────────────
   6. AI 분석 로딩 시퀀스
   ────────────────────────────────────────────────────────────── */

/** "분석 시작" 버튼 클릭 */
function startAnalysis() {
  transitionTo(8);
  // 장면 전환 후 시작
  setTimeout(runLoadingSequence, 450);
}

/** 단계별 로딩 연출 (총 ~5초) */
function runLoadingSequence() {
  const stepList  = document.getElementById('step-list');
  const fillEl    = document.getElementById('progress-fill');
  const pctEl     = document.getElementById('progress-pct');

  if (!stepList) return;
  stepList.innerHTML = '';

  const total    = analysisSteps.length;
  const stepGap  = 1100; // 단계 간격 (ms)

  // li 요소 미리 생성
  const items = analysisSteps.map(text => {
    const li = document.createElement('li');
    li.className = 'step-item';
    li.textContent = text;
    stepList.appendChild(li);
    return li;
  });

  // 단계별 순서 표시 + 진행률 업데이트
  items.forEach((li, i) => {
    setTimeout(() => {
      li.classList.add('show');
      const pct = Math.round(((i + 1) / total) * 88);
      setProgress(fillEl, pctEl, pct);
    }, stepGap * (i + 1));
  });

  // 완료: 100% → 결과 화면 이동
  const finishAt = stepGap * (total + 1);
  setTimeout(() => {
    setProgress(fillEl, pctEl, 100);
    setTimeout(() => transitionTo(9), 650);
  }, finishAt);
}

/** 진행률 바와 텍스트 업데이트 */
function setProgress(barEl, pctEl, pct) {
  if (barEl) {
    barEl.style.width = pct + '%';
    barEl.setAttribute('aria-valuenow', pct);
  }
  if (pctEl) pctEl.textContent = pct + '%';
}


/* ──────────────────────────────────────────────────────────────
   6. 재고 모달 (부정 버튼)
   ────────────────────────────────────────────────────────────── */

/** "싫어요" 버튼 → 재고 모달 표시 */
function showReconsiderModal() {
  const backdrop = document.getElementById('reconsider-backdrop');
  if (!backdrop) return;
  backdrop.hidden = false;
}

/** 모달 닫기 → 프로포즈 장면 복귀 */
function closeReconsiderModal() {
  const backdrop = document.getElementById('reconsider-backdrop');
  if (!backdrop) return;
  backdrop.hidden = true;
}


/* ──────────────────────────────────────────────────────────────
   7. 최종 오버레이 + 하트 애니메이션
   ────────────────────────────────────────────────────────────── */

/** "좋아요" 버튼 → 최종 오버레이 표시 */
function showFinalOverlay() {
  const overlay = document.getElementById('final-overlay');
  if (!overlay) return;
  overlay.hidden = false;
  spawnHearts();
}

/** 하트 파티클 생성 */
function spawnHearts() {
  const container = document.getElementById('hearts-container');
  if (!container) return;

  const SYMBOLS = ['♥', '❤', '♡'];
  const COUNT   = 20;

  for (let i = 0; i < COUNT; i++) {
    setTimeout(() => {
      const el = document.createElement('span');
      el.className   = 'heart';
      el.textContent = SYMBOLS[i % SYMBOLS.length];
      el.style.left            = (Math.random() * 96 + 2) + 'vw';
      el.style.fontSize        = (0.7 + Math.random() * 1.3) + 'rem';
      el.style.animationDuration = (4.5 + Math.random() * 4) + 's';
      container.appendChild(el);
      // 애니메이션 종료 후 제거
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }, i * 180);
  }
}


/* ──────────────────────────────────────────────────────────────
   7. 유틸리티
   ────────────────────────────────────────────────────────────── */

/* ──────────────────────────────────────────────────────────────
   8. 전역 함수 노출 — HTML onclick 대응 (type="module" 스코프)
   ────────────────────────────────────────────────────────────── */
window.checkPassword        = checkPassword;
window.goNext               = goNext;
window.selectPhoto          = selectPhoto;
window.startAnalysis        = startAnalysis;
window.showFinalOverlay     = showFinalOverlay;
window.showReconsiderModal  = showReconsiderModal;
window.closeReconsiderModal = closeReconsiderModal;


/* ──────────────────────────────────────────────────────────────
   9. 유틸리티
   ────────────────────────────────────────────────────────────── */

/** 단일 텍스트 설정 */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/**
 * 줄바꿈 문자(\n)를 <br>로 변환하여 설정
 * 데이터는 모두 내부 상수이므로 XSS 위험 없음
 */
function setLines(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = text.replace(/\n/g, '<br>');
}
