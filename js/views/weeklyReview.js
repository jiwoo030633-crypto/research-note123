// BatteryLab Research Hub - Weekly Review View (주간 연구 회고 & 랩미팅 준비)
import { store } from '../store.js';
import { ModalManager } from '../components/modal.js';

export class WeeklyReviewView {
  constructor(app) {
    this.app = app;
    this.selectedReviewId = null;
    
    // Default to current week range
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday
    const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diffToMonday));
    const sunday = new Date(now.setDate(diffToMonday + 6));
    
    this.currentStartDate = monday.toISOString().slice(0, 10);
    this.currentEndDate = sunday.toISOString().slice(0, 10);
  }

  render(container) {
    const reviews = store.getWeeklyReviews();
    const currentReview = this.selectedReviewId ? store.getWeeklyReview(this.selectedReviewId) : (reviews[0] || null);

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in pb-16">
        <!-- Top Title Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="p-2.5 rounded-2xl bg-teal-100 text-teal-700">
              <i data-lucide="calendar-range" class="w-6 h-6"></i>
            </span>
            <div>
              <h1 class="text-2xl font-bold text-slate-800">주간 연구 회고 및 랩미팅 보고서 (Weekly Review)</h1>
              <p class="text-xs text-slate-500 mt-0.5">한 주간의 업무일지, 실험 결과, 논문, 이슈를 집계하여 랩미팅 보고서로 정리합니다.</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button id="btn-copy-markdown-report" class="px-4 py-2.5 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold shadow-sm flex items-center gap-2 btn-press transition-all">
              <i data-lucide="copy" class="w-4 h-4 text-teal-600"></i> 랩미팅용 마크다운 복사
            </button>
            <button id="btn-new-review" class="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-bold shadow-md flex items-center gap-2 btn-press transition-all">
              <i data-lucide="plus" class="w-4 h-4"></i> 새 주간 회고 작성
            </button>
          </div>
        </div>

        <!-- Main Layout: Left Editor/Report, Right Past Reviews History -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Left 8 Cols: Structured Weekly Review Editor -->
          <div class="lg:col-span-8 space-y-4">
            <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
              
              <!-- Review Header & Auto-aggregate Control -->
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span class="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                    ${currentReview ? currentReview.weekNumber : '새 주간 회고'}
                  </span>
                  <h2 class="text-xl font-extrabold text-slate-800 mt-2">
                    ${currentReview ? currentReview.title : '주간 연구 진행 상황 종합 보고'}
                  </h2>
                </div>

                <!-- Auto-aggregate Button -->
                <div class="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                  <div class="text-[11px] text-slate-400">
                    기간: ${currentReview ? `${currentReview.startDate} ~ ${currentReview.endDate}` : `${this.currentStartDate} ~ ${this.currentEndDate}`}
                  </div>
                  <button id="btn-auto-aggregate" class="px-3.5 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 btn-press transition-all">
                    <i data-lucide="wand-2" class="w-3.5 h-3.5"></i> 이번 주 데이터 자동 집계
                  </button>
                </div>
              </div>

              <!-- Form for Weekly Review -->
              <form id="weekly-review-form" class="space-y-5 text-xs">
                <input type="hidden" name="reviewId" value="${currentReview ? currentReview.id : ''}">

                <!-- Week Title & Dates -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="sm:col-span-2">
                    <label class="block font-semibold text-slate-600 mb-1">회고 제목 / 주차 명칭</label>
                    <input type="text" name="title" value="${currentReview ? currentReview.title : '주간 연구 성과 및 차주 계획'}" required class="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-teal-500 font-bold text-sm">
                  </div>
                  <div>
                    <label class="block font-semibold text-slate-600 mb-1">주차 표시</label>
                    <input type="text" name="weekNumber" value="${currentReview ? currentReview.weekNumber : '2026년 33주차 (08.17 ~ 08.23)'}" class="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-teal-500">
                  </div>
                </div>

                <!-- Section 1: Completed Work -->
                <div class="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <label class="block font-bold text-slate-800 flex items-center gap-2">
                    <span class="p-1 rounded bg-blue-100 text-blue-700 text-xs">1</span>
                    <span>이번 주 완료한 업무 및 성과 (Completed Tasks & Milestones)</span>
                  </label>
                  <textarea name="completedWork" rows="3" class="w-full p-3 border rounded-xl border-slate-200 bg-white font-mono text-xs focus:outline-none focus:border-teal-500">${currentReview ? (currentReview.completedWork || '') : ''}</textarea>
                </div>

                <!-- Section 2: Experiments & Simulation Summary -->
                <div class="space-y-1.5 p-4 rounded-2xl bg-purple-50/40 border border-purple-100">
                  <label class="block font-bold text-purple-950 flex items-center gap-2">
                    <span class="p-1 rounded bg-purple-100 text-purple-700 text-xs">2</span>
                    <span>수행한 실험 / COMSOL Simulation 요약</span>
                  </label>
                  <textarea name="experimentsSummary" rows="3" class="w-full p-3 border rounded-xl border-purple-200 bg-white font-mono text-xs focus:outline-none focus:border-purple-500">${currentReview ? (currentReview.experimentsSummary || '') : ''}</textarea>
                </div>

                <!-- Section 3: Key Results -->
                <div class="space-y-1.5 p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100">
                  <label class="block font-bold text-emerald-950 flex items-center gap-2">
                    <span class="p-1 rounded bg-emerald-100 text-emerald-700 text-xs">3</span>
                    <span>주요 결과 및 정량적 데이터 (Key Results)</span>
                  </label>
                  <textarea name="keyResults" rows="3" class="w-full p-3 border rounded-xl border-emerald-200 bg-white text-xs focus:outline-none focus:border-emerald-500">${currentReview ? (currentReview.keyResults || '') : ''}</textarea>
                </div>

                <!-- Section 4: Literature & New Ideas -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-1.5 p-4 rounded-2xl bg-amber-50/40 border border-amber-100">
                    <label class="block font-bold text-amber-950 flex items-center gap-2">
                      <span class="p-1 rounded bg-amber-100 text-amber-700 text-xs">4</span>
                      <span>읽은 논문 및 문헌 인사이트</span>
                    </label>
                    <textarea name="literatureNotes" rows="3" class="w-full p-3 border rounded-xl border-amber-200 bg-white text-xs">${currentReview ? (currentReview.literatureNotes || '') : ''}</textarea>
                  </div>
                  <div class="space-y-1.5 p-4 rounded-2xl bg-pink-50/40 border border-pink-100">
                    <label class="block font-bold text-pink-950 flex items-center gap-2">
                      <span class="p-1 rounded bg-pink-100 text-pink-700 text-xs">5</span>
                      <span>새롭게 도출된 Research Ideas</span>
                    </label>
                    <textarea name="newIdeas" rows="3" class="w-full p-3 border rounded-xl border-pink-200 bg-white text-xs">${currentReview ? (currentReview.newIdeas || '') : ''}</textarea>
                  </div>
                </div>

                <!-- Section 5: Failed Experiments & Unresolved Bottlenecks -->
                <div class="space-y-1.5 p-4 rounded-2xl bg-rose-50/40 border border-rose-100">
                  <label class="block font-bold text-rose-950 flex items-center gap-2">
                    <span class="p-1 rounded bg-rose-100 text-rose-700 text-xs">6</span>
                    <span>실패한 실험 및 해결하지 못한 문제 (Bottlenecks & Post-Mortem)</span>
                  </label>
                  <textarea name="failedExpAndIssues" rows="3" class="w-full p-3 border rounded-xl border-rose-200 bg-white text-xs focus:outline-none focus:border-rose-500">${currentReview ? (currentReview.failedExpAndIssues || '') : ''}</textarea>
                </div>

                <!-- Section 6: Questions for Advisor / Senior -->
                <div class="space-y-1.5 p-4 rounded-2xl bg-cyan-50/40 border border-cyan-100">
                  <label class="block font-bold text-cyan-950 flex items-center gap-2">
                    <span class="p-1 rounded bg-cyan-100 text-cyan-700 text-xs">7</span>
                    <span>교수님 / 선배에게 질문할 내용 (랩미팅 아젠다)</span>
                  </label>
                  <textarea name="questionsForAdvisor" rows="3" class="w-full p-3 border rounded-xl border-cyan-200 bg-white text-xs focus:outline-none focus:border-cyan-500 font-medium">${currentReview ? (currentReview.questionsForAdvisor || '') : ''}</textarea>
                </div>

                <!-- Section 7: Next Week Goals -->
                <div class="space-y-1.5 p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100">
                  <label class="block font-bold text-indigo-950 flex items-center gap-2">
                    <span class="p-1 rounded bg-indigo-100 text-indigo-700 text-xs">8</span>
                    <span>다음 주 연구 목표 및 Action Plans</span>
                  </label>
                  <textarea name="nextWeekGoals" rows="3" class="w-full p-3 border rounded-xl border-indigo-200 bg-white text-xs focus:outline-none focus:border-indigo-500 font-semibold">${currentReview ? (currentReview.nextWeekGoals || '') : ''}</textarea>
                </div>

                <!-- Submit Button Bar -->
                <div class="pt-4 flex items-center justify-between border-t border-slate-100">
                  ${currentReview ? `
                    <button type="button" id="btn-delete-review" class="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> 이 회고 삭제
                    </button>
                  ` : '<div></div>'}
                  <div class="flex gap-2">
                    <button type="submit" class="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-bold shadow-md hover:shadow-lg flex items-center gap-2 btn-press transition-all">
                      <i data-lucide="check" class="w-4 h-4"></i> ${currentReview ? '회고 내용 저장' : '새 주간 회고 저장'}
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>

          <!-- Right 4 Cols: Past Reviews List -->
          <div class="lg:col-span-4 space-y-4">
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <i data-lucide="history" class="w-4 h-4 text-teal-600"></i> 주간 회고 목록 (${reviews.length})
                </h3>
              </div>

              <div class="space-y-3">
                ${reviews.length === 0 ? `
                  <div class="py-8 text-center text-slate-400 text-xs">작성된 주간 회고가 없습니다.</div>
                ` : reviews.map(r => {
                  const isSelected = currentReview && currentReview.id === r.id;
                  return `
                    <div class="p-4 rounded-2xl border cursor-pointer review-item-card transition-all ${isSelected ? 'border-teal-500 bg-teal-50/40 ring-2 ring-teal-100' : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-teal-200'}" data-id="${r.id}">
                      <div class="flex items-center justify-between gap-1 mb-1">
                        <span class="text-[11px] font-bold text-teal-800 bg-white px-2 py-0.5 rounded-md border">${r.weekNumber || '주간 회고'}</span>
                        <span class="text-[10px] text-slate-400">${r.createdAt || ''}</span>
                      </div>
                      <h4 class="text-xs font-bold text-slate-800 truncate">${r.title}</h4>
                      <p class="text-[11px] text-slate-500 line-clamp-2 mt-1">${r.keyResults || r.completedWork || '내용 없음'}</p>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.bindEvents(container, currentReview);
  }

  bindEvents(container, currentReview) {
    // Select review card
    container.querySelectorAll('.review-item-card').forEach(card => {
      card.onclick = () => {
        this.selectedReviewId = card.dataset.id;
        this.render(container);
      };
    });

    // New review button
    container.querySelector('#btn-new-review').onclick = () => {
      this.selectedReviewId = null;
      this.render(container);
    };

    // Auto Aggregate Button
    container.querySelector('#btn-auto-aggregate').onclick = () => {
      const agg = store.getWeeklyAggregatedData(this.currentStartDate, this.currentEndDate);
      const form = container.querySelector('#weekly-review-form');
      if (form && agg.templates) {
        form.querySelector('textarea[name="completedWork"]').value = agg.templates.completedWork;
        form.querySelector('textarea[name="experimentsSummary"]').value = agg.templates.experimentsSummary;
        form.querySelector('textarea[name="keyResults"]').value = agg.templates.keyResults;
        form.querySelector('textarea[name="failedExpAndIssues"]').value = agg.templates.failedExpAndIssues;
        form.querySelector('textarea[name="questionsForAdvisor"]').value = agg.templates.questionsForAdvisor;
        form.querySelector('textarea[name="nextWeekGoals"]').value = agg.templates.nextWeekGoals;
        ModalManager.showToast('이번 주 일지/실험/Task 데이터가 성공적으로 불러와졌습니다!', 'success');
      }
    };

    // Copy Markdown Report Button
    container.querySelector('#btn-copy-markdown-report').onclick = () => {
      const form = container.querySelector('#weekly-review-form');
      if (!form) return;
      const fd = new FormData(form);

      const reportMarkdown = `# [배터리 연구실 주간 회고 및 랩미팅 보고서]
## ${fd.get('weekNumber') || '주간 보고'} - ${fd.get('title')}

### 1. 이번 주 완료 업무 및 성과
${fd.get('completedWork')}

### 2. 수행한 배터리 실험 / COMSOL Simulation
${fd.get('experimentsSummary')}

### 3. 주요 결과 및 정량 데이터
${fd.get('keyResults')}

### 4. 참고 논문 및 문헌 인사이트
${fd.get('literatureNotes')}

### 5. 신규 연구 아이디어 & 가설
${fd.get('newIdeas')}

### 6. 실패한 실험 및 미해결 이슈 (Post-Mortem)
${fd.get('failedExpAndIssues')}

### 7. 교수님 / 선배 미팅 안건 및 질문
${fd.get('questionsForAdvisor')}

### 8. 다음 주 연구 목표 (Next Week Action Plans)
${fd.get('nextWeekGoals')}
`;

      navigator.clipboard.writeText(reportMarkdown).then(() => {
        ModalManager.triggerCelebration();
        ModalManager.showToast('랩미팅용 마크다운 보고서가 클립보드에 복사되었습니다!', 'success');
      }).catch(err => {
        ModalManager.showToast('클립보드 복사 실패: ' + err, 'error');
      });
    };

    // Delete review
    const btnDelete = container.querySelector('#btn-delete-review');
    if (btnDelete && currentReview) {
      btnDelete.onclick = () => {
        ModalManager.showConfirm('회고 삭제', '이 주간 회고를 삭제하시겠습니까?', () => {
          store.deleteWeeklyReview(currentReview.id);
          this.selectedReviewId = null;
          ModalManager.showToast('주간 회고가 삭제되었습니다.', 'info');
          this.render(container);
        });
      };
    }

    // Save Form
    const form = container.querySelector('#weekly-review-form');
    form.onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const reviewId = fd.get('reviewId');
      const data = {
        title: fd.get('title'),
        weekNumber: fd.get('weekNumber'),
        startDate: this.currentStartDate,
        endDate: this.currentEndDate,
        completedWork: fd.get('completedWork'),
        experimentsSummary: fd.get('experimentsSummary'),
        keyResults: fd.get('keyResults'),
        literatureNotes: fd.get('literatureNotes'),
        newIdeas: fd.get('newIdeas'),
        failedExpAndIssues: fd.get('failedExpAndIssues'),
        questionsForAdvisor: fd.get('questionsForAdvisor'),
        nextWeekGoals: fd.get('nextWeekGoals')
      };

      if (reviewId) {
        store.updateWeeklyReview(reviewId, data);
        ModalManager.showToast('주간 회고가 수정 저장되었습니다!', 'success');
      } else {
        const newRev = store.addWeeklyReview(data);
        this.selectedReviewId = newRev.id;
        ModalManager.showToast('새 주간 회고가 등록되었습니다!', 'success');
      }

      this.render(container);
    };
  }
}
