// BatteryLab Research Hub - Daily Log View (업무일지)
import { store } from '../store.js';
import { ModalManager } from '../components/modal.js';

export class DailyLogView {
  constructor(app) {
    this.app = app;
    this.currentDate = new Date().toISOString().slice(0, 10);
    this.selectedLogId = null;
    this.filterProjectId = '';
    this.filterWorkType = '';
    this.searchQuery = '';
    this.activeAccordion = {
      goal: true,
      workDone: true,
      results: true,
      problems: true,
      learnings: true,
      questions: true,
      nextAction: true
    };
  }

  render(container) {
    const logs = store.getDailyLogs();
    const projects = store.getProjects();
    const workTypes = store.getWorkTypes();

    // Filter logs
    let filteredLogs = logs.filter(l => {
      if (this.filterProjectId && l.projectId !== this.filterProjectId) return false;
      if (this.filterWorkType && (!l.workTypes || !l.workTypes.includes(this.filterWorkType))) return false;
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        const matchTitle = l.title && l.title.toLowerCase().includes(q);
        const matchWork = l.workDone && l.workDone.toLowerCase().includes(q);
        const matchResult = l.results && l.results.toLowerCase().includes(q);
        if (!matchTitle && !matchWork && !matchResult) return false;
      }
      return true;
    });

    // Sort by date desc
    filteredLogs.sort((a, b) => (b.date > a.date ? 1 : -1));

    // Active editing log or new form
    const currentEditingLog = this.selectedLogId ? store.getDailyLog(this.selectedLogId) : null;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in pb-16">
        <!-- Top Title Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="p-2 rounded-2xl bg-emerald-100 text-emerald-700">
                <i data-lucide="edit-3" class="w-6 h-6"></i>
              </span>
              <div>
                <h1 class="text-2xl font-bold text-slate-800">연구 업무일지 (Daily Log)</h1>
                <p class="text-xs text-slate-500 mt-0.5">매일 연구의 맥락(Work → Result → Problem → Next Action)을 연결하여 기록합니다.</p>
              </div>
            </div>
          </div>

          <!-- New Log Button -->
          <div class="flex items-center gap-2">
            <button id="btn-new-log" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-semibold shadow-md flex items-center gap-2 btn-press transition-all">
              <i data-lucide="plus-circle" class="w-4 h-4"></i> 오늘 일지 새로 작성
            </button>
          </div>
        </div>

        <!-- Main Workspace Grid: Left Editor (Form), Right History List -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Left 7 Cols: Structured Log Editor -->
          <div class="lg:col-span-7 space-y-4">
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <h2 class="text-base font-bold text-slate-800">
                    ${currentEditingLog ? `일지 수정 (${currentEditingLog.date})` : '새 업무일지 작성'}
                  </h2>
                </div>
                ${currentEditingLog ? `
                  <button id="btn-cancel-edit" class="text-xs text-slate-500 hover:text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                    새 작성 모드로 전환
                  </button>
                ` : ''}
              </div>

              <!-- Form -->
              <form id="daily-log-form" class="space-y-4">
                <input type="hidden" name="logId" value="${currentEditingLog ? currentEditingLog.id : ''}">

                <!-- Date & Project Selector Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">작성 일자</label>
                    <div class="flex items-center gap-2">
                      <input type="date" name="date" value="${currentEditingLog ? currentEditingLog.date : this.currentDate}" required class="w-full text-sm px-3.5 py-2.5 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-medium">
                      <button type="button" id="btn-set-today" class="text-xs px-2.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl shrink-0 font-medium">오늘</button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">관련 연구 프로젝트 <span class="text-rose-500">*</span></label>
                    <select name="projectId" required class="w-full text-sm px-3.5 py-2.5 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-medium">
                      <option value="">-- 프로젝트 선택 --</option>
                      ${projects.map(p => `
                        <option value="${p.id}" ${currentEditingLog && currentEditingLog.projectId === p.id ? 'selected' : ''}>
                          [${p.type === 'Main' ? '주과제' : '서브'}] ${p.name}
                        </option>
                      `).join('')}
                    </select>
                  </div>
                </div>

                <!-- Title / Today's Headline -->
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">오늘의 연구 핵심 주제 / 제목 <span class="text-rose-500">*</span></label>
                  <input type="text" name="title" value="${currentEditingLog ? (currentEditingLog.title || '') : ''}" placeholder="예: COMSOL adaptive protocol parameter 수정 및 농도 구배 확인" required class="w-full text-sm px-3.5 py-2.5 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-semibold">
                </div>

                <!-- Work Types Selection (Tags) -->
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1.5">연구 활동 유형 (Work Types)</label>
                  <div class="flex flex-wrap gap-2">
                    ${workTypes.map(wt => {
                      const isChecked = currentEditingLog 
                        ? (currentEditingLog.workTypes && currentEditingLog.workTypes.includes(wt))
                        : (wt === '실험' || wt === '시뮬레이션');
                      return `
                        <label class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs cursor-pointer select-none transition-all hover:bg-emerald-50 ${isChecked ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold' : 'bg-white text-slate-600'}">
                          <input type="checkbox" name="workTypes" value="${wt}" ${isChecked ? 'checked' : ''} class="rounded text-emerald-600 focus:ring-emerald-500">
                          <span>${wt}</span>
                        </label>
                      `;
                    }).join('')}
                  </div>
                </div>

                <!-- Accordion Sections for Structured Thinking -->
                <div class="space-y-3 pt-2">
                  
                  <!-- 1. Today's Goal -->
                  <div class="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/40">
                    <button type="button" class="accordion-toggle w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-100/80 transition-colors" data-target="sec-goal">
                      <span class="flex items-center gap-2">
                        <span class="p-1 rounded bg-amber-100 text-amber-700">🎯</span>
                        <span>오늘의 연구 목표 (Today's Goal)</span>
                      </span>
                      <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400"></i>
                    </button>
                    <div id="sec-goal" class="p-4 pt-0">
                      <textarea name="goal" rows="2" placeholder="오늘 달성하고자 하는 구체적 목표 (예: Adaptive 조건에서 덴드라이트 첨단 과전압 15mV 이하 안정화 여부 확인)" class="w-full text-xs px-3 py-2 border rounded-xl border-slate-200 bg-white focus:outline-none focus:border-emerald-500">${currentEditingLog ? (currentEditingLog.goal || '') : ''}</textarea>
                    </div>
                  </div>

                  <!-- 2. Work Done -->
                  <div class="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/40">
                    <button type="button" class="accordion-toggle w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-100/80 transition-colors" data-target="sec-work">
                      <span class="flex items-center gap-2">
                        <span class="p-1 rounded bg-blue-100 text-blue-700">🛠️</span>
                        <span>오늘 한 일 (Work Done) — Markdown 지원</span>
                      </span>
                      <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400"></i>
                    </button>
                    <div id="sec-work" class="p-4 pt-0">
                      <textarea name="workDone" rows="4" placeholder="- COMSOL Tertiary Current Distribution 인터페이스 파라미터 튜닝&#10;- 닥터블레이드로 Cu 기판에 AQ 2wt% 코팅 및 60℃ 진공 건조" class="w-full text-xs px-3 py-2 border rounded-xl border-slate-200 bg-white font-mono focus:outline-none focus:border-emerald-500">${currentEditingLog ? (currentEditingLog.workDone || '') : ''}</textarea>
                    </div>
                  </div>

                  <!-- 3. Key Results -->
                  <div class="border border-slate-200 rounded-2xl overflow-hidden bg-emerald-50/30 border-emerald-100">
                    <button type="button" class="accordion-toggle w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-emerald-900 hover:bg-emerald-100/50 transition-colors" data-target="sec-results">
                      <span class="flex items-center gap-2">
                        <span class="p-1 rounded bg-emerald-100 text-emerald-700">📊</span>
                        <span>주요 결과 및 정량 데이터 (Key Results)</span>
                      </span>
                      <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400"></i>
                    </button>
                    <div id="sec-results" class="p-4 pt-0">
                      <textarea name="results" rows="3" placeholder="- 과전압 15mV 임계값 적용 시 이온 농도 고갈 영역 42% 감소&#10;- DCM 용매 코팅 시 표면 거칠기 Rq = 14.2nm로 우수한 박막 형성" class="w-full text-xs px-3 py-2 border rounded-xl border-emerald-200 bg-white focus:outline-none focus:border-emerald-500">${currentEditingLog ? (currentEditingLog.results || '') : ''}</textarea>
                    </div>
                  </div>

                  <!-- 4. Problems & Bottlenecks -->
                  <div class="border border-slate-200 rounded-2xl overflow-hidden bg-rose-50/30 border-rose-100">
                    <button type="button" class="accordion-toggle w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-rose-900 hover:bg-rose-100/50 transition-colors" data-target="sec-problems">
                      <span class="flex items-center gap-2">
                        <span class="p-1 rounded bg-rose-100 text-rose-700">⚠️</span>
                        <span>문제점 및 발생 이슈 (Problems & Bottlenecks)</span>
                      </span>
                      <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400"></i>
                    </button>
                    <div id="sec-problems" class="p-4 pt-0">
                      <textarea name="problems" rows="2" placeholder="- t = 1200s에서 메쉬 역전(Mesh Inversion) 현상 발생&#10;- 코인셀 조립 중 스페이서 압력 불균일로 인한 단락 발생" class="w-full text-xs px-3 py-2 border rounded-xl border-rose-200 bg-white focus:outline-none focus:border-rose-500">${currentEditingLog ? (currentEditingLog.problems || '') : ''}</textarea>
                    </div>
                  </div>

                  <!-- 5. Key Learnings -->
                  <div class="border border-slate-200 rounded-2xl overflow-hidden bg-purple-50/30 border-purple-100">
                    <button type="button" class="accordion-toggle w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-purple-900 hover:bg-purple-100/50 transition-colors" data-target="sec-learnings">
                      <span class="flex items-center gap-2">
                        <span class="p-1 rounded bg-purple-100 text-purple-700">💡</span>
                        <span>새롭게 배운 점 및 인사이트 (Key Learnings)</span>
                      </span>
                      <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400"></i>
                    </button>
                    <div id="sec-learnings" class="p-4 pt-0">
                      <textarea name="learnings" rows="2" placeholder="- COMSOL Deformed Geometry의 Boundary Smoothing 파라미터가 수렴성에 핵심임" class="w-full text-xs px-3 py-2 border rounded-xl border-purple-200 bg-white focus:outline-none focus:border-purple-500">${currentEditingLog ? (currentEditingLog.learnings || '') : ''}</textarea>
                    </div>
                  </div>

                  <!-- 6. Questions for Advisor / Senior -->
                  <div class="border border-slate-200 rounded-2xl overflow-hidden bg-amber-50/30 border-amber-100">
                    <button type="button" class="accordion-toggle w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-amber-900 hover:bg-amber-100/50 transition-colors" data-target="sec-questions">
                      <span class="flex items-center gap-2">
                        <span class="p-1 rounded bg-amber-100 text-amber-700">❓</span>
                        <span>교수님 / 선배 미팅 질문 및 논의 안건</span>
                      </span>
                      <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400"></i>
                    </button>
                    <div id="sec-questions" class="p-4 pt-0">
                      <textarea name="questions" rows="2" placeholder="랩미팅이나 개인 면담 때 질문할 내용 (예: 에테르계 전해액의 정확한 교환전류밀도 i0 데이터 여쭙기)" class="w-full text-xs px-3 py-2 border rounded-xl border-amber-200 bg-white focus:outline-none focus:border-amber-500">${currentEditingLog ? (currentEditingLog.questions || '') : ''}</textarea>
                    </div>
                  </div>

                  <!-- 7. Next Action -->
                  <div class="border border-slate-200 rounded-2xl overflow-hidden bg-cyan-50/30 border-cyan-100">
                    <button type="button" class="accordion-toggle w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-cyan-900 hover:bg-cyan-100/50 transition-colors" data-target="sec-next">
                      <span class="flex items-center gap-2">
                        <span class="p-1 rounded bg-cyan-100 text-cyan-700">⏩</span>
                        <span>다음 행동 (Next Action) — 내일 또는 차주 실행 계획</span>
                      </span>
                      <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400"></i>
                    </button>
                    <div id="sec-next" class="p-4 pt-0 space-y-2">
                      <input type="text" name="nextAction" value="${currentEditingLog ? (currentEditingLog.nextAction || '') : ''}" placeholder="예: Mesh 조건별 결과 비교 및 리메싱 인터벌 최적화 테스트" class="w-full text-xs px-3 py-2 border rounded-xl border-cyan-200 bg-white focus:outline-none focus:border-cyan-500 font-semibold">
                      <label class="flex items-center gap-1.5 text-xs text-slate-600">
                        <input type="checkbox" name="createTaskFromNextAction" value="true" checked class="rounded text-cyan-600">
                        <span>저장 시 이 Next Action을 연구 Task 목록에 자동 생성하기</span>
                      </label>
                    </div>
                  </div>

                </div>

                <!-- Submit Button Bar -->
                <div class="pt-4 flex items-center justify-between border-t border-slate-100">
                  ${currentEditingLog ? `
                    <button type="button" id="btn-delete-log" class="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> 이 일지 삭제
                    </button>
                  ` : '<div></div>'}
                  <div class="flex gap-2">
                    <button type="submit" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-bold shadow-md hover:shadow-lg flex items-center gap-2 btn-press transition-all">
                      <i data-lucide="check" class="w-4 h-4"></i> ${currentEditingLog ? '수정사항 저장' : '업무일지 기록 저장'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Right 5 Cols: Past Daily Logs Feed & Search Filter -->
          <div class="lg:col-span-5 space-y-4">
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <i data-lucide="calendar" class="w-5 h-5 text-emerald-600"></i>
                  <h2 class="text-base font-bold text-slate-800">지난 업무일지 이력 (${filteredLogs.length})</h2>
                </div>
              </div>

              <!-- Filter Bar -->
              <div class="space-y-2 mb-4">
                <input type="text" id="log-search-input" value="${this.searchQuery}" placeholder="일지 내용 및 결과 검색..." class="w-full text-xs px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500">
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <select id="log-project-filter" class="w-full px-2 py-1.5 border rounded-xl border-slate-200">
                    <option value="">모든 프로젝트</option>
                    ${projects.map(p => `<option value="${p.id}" ${this.filterProjectId === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
                  </select>
                  <select id="log-type-filter" class="w-full px-2 py-1.5 border rounded-xl border-slate-200">
                    <option value="">모든 활동 유형</option>
                    ${workTypes.map(wt => `<option value="${wt}" ${this.filterWorkType === wt ? 'selected' : ''}>${wt}</option>`).join('')}
                  </select>
                </div>
              </div>

              <!-- Logs List Container -->
              <div class="space-y-3 max-h-[750px] overflow-y-auto pr-1">
                ${filteredLogs.length === 0 ? `
                  <div class="text-center py-12 text-slate-400">
                    <i data-lucide="clipboard-list" class="w-10 h-10 mx-auto mb-2 opacity-40"></i>
                    <p class="text-xs">해당 조건에 맞는 업무일지가 없습니다.</p>
                  </div>
                ` : filteredLogs.map(log => {
                  const proj = store.getProject(log.projectId);
                  const isSelected = this.selectedLogId === log.id;
                  return `
                    <div class="p-4 rounded-2xl border transition-all cursor-pointer log-card ${isSelected ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-100' : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-emerald-200'}" data-id="${log.id}">
                      <div class="flex items-center justify-between gap-2 mb-1.5">
                        <span class="text-xs font-bold text-slate-700 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">${log.date}</span>
                        <span class="text-[11px] font-semibold text-emerald-700 truncate max-w-[140px]">${proj ? proj.name : '프로젝트 미지정'}</span>
                      </div>

                      <h3 class="text-xs font-bold text-slate-800 mb-1.5 leading-snug">${log.title}</h3>

                      <!-- Work Type Badges -->
                      <div class="flex flex-wrap gap-1 mb-2">
                        ${(log.workTypes || []).map(wt => `
                          <span class="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-medium">${wt}</span>
                        `).join('')}
                      </div>

                      <!-- Key Result / Next Action Snippets -->
                      ${log.results ? `
                        <div class="text-[11px] text-emerald-800 bg-emerald-100/50 p-2 rounded-xl mb-1.5 line-clamp-2">
                          <span class="font-bold">📊 결과:</span> ${log.results}
                        </div>
                      ` : ''}
                      
                      ${log.nextAction ? `
                        <div class="text-[11px] text-cyan-900 bg-cyan-100/50 p-2 rounded-xl line-clamp-1">
                          <span class="font-bold">⏩ 다음:</span> ${log.nextAction}
                        </div>
                      ` : ''}
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
    this.bindEvents(container);
  }

  bindEvents(container) {
    // Accordion toggle buttons
    container.querySelectorAll('.accordion-toggle').forEach(btn => {
      btn.onclick = () => {
        const targetId = btn.dataset.target;
        const targetEl = container.querySelector('#' + targetId);
        if (targetEl) {
          targetEl.classList.toggle('hidden');
          const icon = btn.querySelector('[data-lucide="chevron-down"]');
          if (icon) {
            icon.classList.toggle('rotate-180');
          }
        }
      };
    });

    // Set today button
    const btnToday = container.querySelector('#btn-set-today');
    if (btnToday) {
      btnToday.onclick = () => {
        const dateInput = container.querySelector('input[name="date"]');
        if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
      };
    }

    // New log button
    container.querySelector('#btn-new-log').onclick = () => {
      this.selectedLogId = null;
      this.render(container);
    };

    const btnCancel = container.querySelector('#btn-cancel-edit');
    if (btnCancel) {
      btnCancel.onclick = () => {
        this.selectedLogId = null;
        this.render(container);
      };
    }

    // Card click -> select log for viewing/editing
    container.querySelectorAll('.log-card').forEach(card => {
      card.onclick = () => {
        this.selectedLogId = card.dataset.id;
        this.render(container);
      };
    });

    // Filter events
    const searchInput = container.querySelector('#log-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.searchQuery = e.target.value;
        this.render(container);
      };
    }

    const projectFilter = container.querySelector('#log-project-filter');
    if (projectFilter) {
      projectFilter.onchange = (e) => {
        this.filterProjectId = e.target.value;
        this.render(container);
      };
    }

    const typeFilter = container.querySelector('#log-type-filter');
    if (typeFilter) {
      typeFilter.onchange = (e) => {
        this.filterWorkType = e.target.value;
        this.render(container);
      };
    }

    // Delete button
    const btnDelete = container.querySelector('#btn-delete-log');
    if (btnDelete && this.selectedLogId) {
      btnDelete.onclick = () => {
        ModalManager.showConfirm(
          '업무일지 삭제',
          '이 업무일지를 정말 삭제하시겠습니까? 삭제된 일지는 복구할 수 없습니다.',
          () => {
            store.deleteDailyLog(this.selectedLogId);
            this.selectedLogId = null;
            ModalManager.showToast('업무일지가 삭제되었습니다.', 'info');
            this.render(container);
          }
        );
      };
    }

    // Form Submit
    const form = container.querySelector('#daily-log-form');
    form.onsubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const logId = formData.get('logId');
      const logData = {
        date: formData.get('date'),
        projectId: formData.get('projectId'),
        title: formData.get('title'),
        workTypes: formData.getAll('workTypes'),
        goal: formData.get('goal'),
        workDone: formData.get('workDone'),
        results: formData.get('results'),
        problems: formData.get('problems'),
        learnings: formData.get('learnings'),
        questions: formData.get('questions'),
        nextAction: formData.get('nextAction'),
        createTaskFromNextAction: formData.get('createTaskFromNextAction') === 'true'
      };

      if (logId) {
        store.updateDailyLog(logId, logData);
        ModalManager.showToast('업무일지가 수정되었습니다!', 'success');
      } else {
        const newLog = store.addDailyLog(logData);
        this.selectedLogId = newLog.id;
        ModalManager.showToast('새 업무일지가 저장되었습니다!', 'success');
      }

      this.render(container);
    };
  }
}
