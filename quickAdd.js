// BatteryLab Research Hub - Quick Add Modal (빠른 추가 모달)
import { store } from '../store.js';
import { ModalManager } from './modal.js';

export class QuickAddModal {
  static init() {
    let modalEl = document.getElementById('quick-add-modal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'quick-add-modal';
      modalEl.className = 'fixed inset-0 z-50 modal-backdrop hidden items-center justify-center p-4';
      document.body.appendChild(modalEl);
    }
    this.modalEl = modalEl;
  }

  static open(initialTab = 'dailyLog', defaultProjectId = '') {
    this.init();
    this.currentTab = initialTab;
    this.defaultProjectId = defaultProjectId;
    this.render();
    ModalManager.open('quick-add-modal');
    if (window.lucide) window.lucide.createIcons();
  }

  static close() {
    ModalManager.close('quick-add-modal');
  }

  static render() {
    const projects = store.getProjects();
    const categories = store.getCategories();
    const workTypes = store.getWorkTypes();

    this.modalEl.innerHTML = `
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 animate-fade-in overflow-hidden">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <i data-lucide="plus" class="w-4 h-4"></i>
            </div>
            <h3 class="font-bold text-slate-800 text-lg">빠른 연구 기록 추가</h3>
          </div>
          <button id="quick-add-close" class="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Tab Selector -->
        <div class="px-6 pt-3 border-b border-slate-100 flex gap-2 overflow-x-auto text-sm font-medium">
          <button class="qa-tab-btn px-3.5 py-2 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${this.currentTab === 'dailyLog' ? 'border-emerald-500 text-emerald-700 bg-emerald-50/60 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}" data-tab="dailyLog">
            <i data-lucide="calendar" class="w-4 h-4"></i> 업무일지
          </button>
          <button class="qa-tab-btn px-3.5 py-2 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${this.currentTab === 'task' ? 'border-blue-500 text-blue-700 bg-blue-50/60 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}" data-tab="task">
            <i data-lucide="check-square" class="w-4 h-4"></i> Task
          </button>
          <button class="qa-tab-btn px-3.5 py-2 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${this.currentTab === 'experiment' ? 'border-purple-500 text-purple-700 bg-purple-50/60 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}" data-tab="experiment">
            <i data-lucide="flask-conical" class="w-4 h-4"></i> 실험/시뮬레이션
          </button>
          <button class="qa-tab-btn px-3.5 py-2 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${this.currentTab === 'literature' ? 'border-amber-500 text-amber-700 bg-amber-50/60 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}" data-tab="literature">
            <i data-lucide="book-open" class="w-4 h-4"></i> 논문
          </button>
          <button class="qa-tab-btn px-3.5 py-2 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${this.currentTab === 'idea' ? 'border-pink-500 text-pink-700 bg-pink-50/60 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}" data-tab="idea">
            <i data-lucide="lightbulb" class="w-4 h-4"></i> 아이디어
          </button>
          <button class="qa-tab-btn px-3.5 py-2 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${this.currentTab === 'project' ? 'border-indigo-500 text-indigo-700 bg-indigo-50/60 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}" data-tab="project">
            <i data-lucide="folder-plus" class="w-4 h-4"></i> 프로젝트
          </button>
        </div>

        <!-- Form Body (Scrollable) -->
        <div class="p-6 overflow-y-auto flex-1">
          <form id="quick-add-form" class="space-y-4">
            ${this.renderTabContent(projects, categories, workTypes)}
          </form>
        </div>

        <!-- Footer -->
        <div class="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
          <button type="button" id="quick-add-cancel" class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">취소</button>
          <button type="submit" form="quick-add-form" class="px-5 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5 btn-press">
            <i data-lucide="save" class="w-4 h-4"></i> 저장하기
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  static renderTabContent(projects, categories, workTypes) {
    const today = new Date().toISOString().slice(0, 10);
    const projectOptions = projects.map(p => `
      <option value="${p.id}" ${p.id === this.defaultProjectId ? 'selected' : ''}>[${p.type === 'Main' ? '주과제' : '서브'}] ${p.name}</option>
    `).join('');

    switch (this.currentTab) {
      case 'dailyLog':
        return `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">날짜</label>
              <input type="date" name="date" value="${today}" required class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">연관 프로젝트</label>
              <select name="projectId" required class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                <option value="">-- 프로젝트 선택 --</option>
                ${projectOptions}
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">오늘의 한 줄 제목 / 목표</label>
            <input type="text" name="title" placeholder="예: COMSOL adaptive protocol parameter 수정 및 해석" required class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">업무 유형 (다중 선택 가능)</label>
            <div class="flex flex-wrap gap-2 text-xs">
              ${workTypes.map(wt => `
                <label class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-slate-700">
                  <input type="checkbox" name="workTypes" value="${wt}" class="rounded text-emerald-600 focus:ring-emerald-500" ${wt === '실험' || wt === '시뮬레이션' ? 'checked' : ''}>
                  <span>${wt}</span>
                </label>
              `).join('')}
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">오늘 한 일 (Work Done)</label>
            <textarea name="workDone" rows="3" placeholder="- 파라미터 수치 변경&#10;- 코인셀 조립 및 충방전 시작" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"></textarea>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">주요 결과 (Results)</label>
              <textarea name="results" rows="2" placeholder="Li+ 농도 고갈 영역 42% 감소 확인" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"></textarea>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">문제점 / 이슈 (Problems)</label>
              <textarea name="problems" rows="2" placeholder="Mesh Inversion 에러 발생" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"></textarea>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">다음 행동 (Next Action)</label>
            <div class="flex gap-2">
              <input type="text" name="nextAction" placeholder="Mesh 조건별 결과 비교 및 리메싱 인터벌 최적화" class="flex-1 text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
              <label class="flex items-center gap-1.5 text-xs text-slate-600 shrink-0">
                <input type="checkbox" name="createTaskFromNextAction" value="true" checked class="rounded text-emerald-600">
                <span>Task 자동 등록</span>
              </label>
            </div>
          </div>
        `;

      case 'task':
        return `
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">Task 이름 (연구 행동)</label>
            <input type="text" name="name" placeholder="예: AQ coating solvent 후보 비교" required class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">연관 프로젝트</label>
              <select name="projectId" required class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option value="">-- 프로젝트 선택 --</option>
                ${projectOptions}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">마감 기한 (Due Date)</label>
              <input type="date" name="dueDate" value="${today}" required class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">상태 (Status)</label>
              <select name="status" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-blue-500">
                <option value="Todo">대기 (Todo)</option>
                <option value="In Progress">진행 중 (In Progress)</option>
                <option value="Done">완료 (Done)</option>
                <option value="Blocked">보류/차단 (Blocked)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">우선순위 (Priority)</label>
              <select name="priority" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-blue-500">
                <option value="High">높음 (High)</option>
                <option value="Medium" selected>보통 (Medium)</option>
                <option value="Low">낮음 (Low)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">연구 메모 / 참고 사항</label>
            <textarea name="notes" rows="2" placeholder="참고할 논문이나 실험 조건 등을 간단히 메모하세요" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-blue-500"></textarea>
          </div>
        `;

      case 'experiment':
        return `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">실험/시뮬레이션명</label>
              <input type="text" name="name" placeholder="예: AQ 2wt% 코팅 Cu 전극 코인셀 사이클 테스트" required class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">연관 프로젝트</label>
              <select name="projectId" required class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-purple-500">
                <option value="">-- 프로젝트 선택 --</option>
                ${projectOptions}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">일자</label>
              <input type="date" name="date" value="${today}" class="w-full text-xs px-2.5 py-1.5 border rounded-lg border-slate-200">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Sample ID</label>
              <input type="text" name="sampleId" placeholder="EXP-2026-01" class="w-full text-xs px-2.5 py-1.5 border rounded-lg border-slate-200">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Cell ID / 시스템</label>
              <input type="text" name="cellId" placeholder="CR2032 Coin Cell" class="w-full text-xs px-2.5 py-1.5 border rounded-lg border-slate-200">
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">실험/해석 목적</label>
            <input type="text" name="purpose" placeholder="Bare Cu 대비 AQ 코팅막의 초기 쿨롱 효율 및 수명 비교" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
          </div>
          <!-- Battery Conditions -->
          <div class="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-2">
            <span class="text-xs font-bold text-purple-800 flex items-center gap-1">
              <i data-lucide="activity" class="w-3.5 h-3.5"></i> 배터리 실험/시뮬레이션 파라미터
            </span>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div>
                <label class="text-[11px] text-slate-500">전류밀도 (mA/cm²)</label>
                <input type="text" name="cond_currentDensity" placeholder="1.0 mA/cm²" class="w-full px-2 py-1 border rounded bg-white">
              </div>
              <div>
                <label class="text-[11px] text-slate-500">면적당 용량 (mAh/cm²)</label>
                <input type="text" name="cond_capacity" placeholder="1.0 mAh/cm²" class="w-full px-2 py-1 border rounded bg-white">
              </div>
              <div>
                <label class="text-[11px] text-slate-500">전압 범위 (V)</label>
                <input type="text" name="cond_voltageRange" placeholder="0 ~ 1.0 V" class="w-full px-2 py-1 border rounded bg-white">
              </div>
              <div>
                <label class="text-[11px] text-slate-500">충전 프로토콜</label>
                <input type="text" name="cond_chargingProtocol" placeholder="CC / Adaptive" class="w-full px-2 py-1 border rounded bg-white">
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">실험 상태</label>
              <select name="status" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
                <option value="Planned">계획됨 (Planned)</option>
                <option value="In Progress">진행 중 (In Progress)</option>
                <option value="Completed" selected>완료됨 (Completed)</option>
                <option value="Need Re-test">재실험 필요 (Need Re-test)</option>
                <option value="Failed">실패 (Failed - 보존)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">다음 행동 (Next Action)</label>
              <input type="text" name="nextAction" placeholder="결과 분석 후 사이클 재조립" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">결과 및 결론</label>
            <textarea name="result" rows="2" placeholder="실험 결과 및 도출된 결론을 입력하세요" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200"></textarea>
          </div>
        `;

      case 'literature':
        return `
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">논문 제목 (Title)</label>
            <input type="text" name="title" placeholder="Adaptive current protocol for suppressing dendrite growth..." required class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-amber-500">
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">저자 (Authors)</label>
              <input type="text" name="authors" placeholder="J. Chen et al." class="w-full text-xs px-2.5 py-1.5 border rounded-lg border-slate-200">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">저널명 (Journal)</label>
              <input type="text" name="journal" placeholder="Energy & Environ. Sci." class="w-full text-xs px-2.5 py-1.5 border rounded-lg border-slate-200">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">출판년도 (Year)</label>
              <input type="number" name="year" value="2024" class="w-full text-xs px-2.5 py-1.5 border rounded-lg border-slate-200">
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">DOI</label>
              <input type="text" name="doi" placeholder="10.1039/D3EE01234K" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">연관 프로젝트</label>
              <select name="projectId" required class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
                <option value="">-- 프로젝트 선택 --</option>
                ${projectOptions}
              </select>
            </div>
          </div>
          <div class="p-3 bg-amber-50/50 rounded-xl border border-amber-200">
            <label class="block text-xs font-bold text-amber-900 mb-1">★ 이 논문이 내 연구에 왜 중요한가? (Relevance)</label>
            <textarea name="relevance" rows="2" placeholder="우리 COMSOL 모델의 지배방정식 및 과전압 피드백 룰의 직접 레퍼런스로 활용함" class="w-full text-sm px-3 py-2 border rounded-lg border-amber-300 bg-white focus:ring-2 focus:ring-amber-200"></textarea>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">핵심 발견 (Key Finding)</label>
              <textarea name="keyFinding" rows="2" placeholder="과전압 20mV 피드백 제어로 덴드라이트 억제" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200"></textarea>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">읽기 상태</label>
              <select name="readingStatus" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
                <option value="To Read">읽을 예정 (To Read)</option>
                <option value="Reading">읽는 중 (Reading)</option>
                <option value="Read">완독 (Read)</option>
                <option value="Important" selected>매우 중요 (Important)</option>
              </select>
            </div>
          </div>
        `;

      case 'idea':
        return `
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">연구 아이디어 제목</label>
            <input type="text" name="title" placeholder="예: 곡률 변화율 기반 2차 미분 선제적 Adaptive 알고리즘" required class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-pink-500">
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">연관 프로젝트</label>
              <select name="projectId" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
                <option value="">-- 프로젝트 선택 (선택) --</option>
                ${projectOptions}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">우선순위</label>
              <select name="priority" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
                <option value="High">높음 (High)</option>
                <option value="Medium" selected>보통 (Medium)</option>
                <option value="Low">낮음 (Low)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">발생 배경 및 관찰 (Observation / Motivation)</label>
            <textarea name="motivation" rows="2" placeholder="기존 적응형 충전은 덴드라이트가 자란 후 반응하므로 선제 제어가 필요함을 시뮬레이션에서 관찰함" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200"></textarea>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">연구 가설 (Hypothesis)</label>
            <textarea name="hypothesis" rows="2" placeholder="표면 곡률의 시간 미분값을 모니터링하여 가속 직전에 펄스를 주면 핵생성을 원천 차단할 수 있을 것이다" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200"></textarea>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">제안 실험/시뮬레이션</label>
              <input type="text" name="proposedExperiment" placeholder="COMSOL 2D 곡률 미분 피드백 검증" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">예상 결과</label>
              <input type="text" name="expectedResult" placeholder="전착 표면 거칠기 1.5um 이하 달성" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
            </div>
          </div>
        `;

      case 'project':
        return `
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">프로젝트명</label>
            <input type="text" name="name" placeholder="예: 전고체 배터리 리튬/고체전해질 계면 해석" required class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-indigo-500">
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">카테고리</label>
              <select name="category" class="w-full text-xs px-2.5 py-2 border rounded-lg border-slate-200">
                ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                <option value="기타">기타</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">과제 구분 (Type)</label>
              <select name="type" class="w-full text-xs px-2.5 py-2 border rounded-lg border-slate-200">
                <option value="Main">주과제 (Main)</option>
                <option value="Sub" selected>서브과제 (Sub)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">상태 (Status)</label>
              <select name="status" class="w-full text-xs px-2.5 py-2 border rounded-lg border-slate-200">
                <option value="Active" selected>진행 중 (Active)</option>
                <option value="Planned">계획됨 (Planned)</option>
                <option value="On Hold">보류 (On Hold)</option>
                <option value="Completed">완료 (Completed)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">연구 목표 (Research Goal)</label>
            <textarea name="researchGoal" rows="2" placeholder="프로젝트의 핵심 목표 및 기대 성과를 작성하세요" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200"></textarea>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">현재 집중 과제 (Current Focus)</label>
              <input type="text" name="currentFocus" placeholder="예: 코팅 조건 최적화" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">다음 행동 (Next Action)</label>
              <input type="text" name="nextAction" placeholder="예: 셀 조립 및 쿨롱효율 측정" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">시작일</label>
              <input type="date" name="startDate" value="${today}" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">목표 완료일</label>
              <input type="date" name="targetDate" class="w-full text-sm px-3 py-2 border rounded-xl border-slate-200">
            </div>
          </div>
        `;
    }
  }

  static bindEvents() {
    this.modalEl.querySelector('#quick-add-close').onclick = () => this.close();
    this.modalEl.querySelector('#quick-add-cancel').onclick = () => this.close();

    // Tab buttons
    this.modalEl.querySelectorAll('.qa-tab-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        this.currentTab = btn.dataset.tab;
        this.render();
        if (window.lucide) window.lucide.createIcons();
      };
    });

    // Form submit
    const form = this.modalEl.querySelector('#quick-add-form');
    form.onsubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      switch (this.currentTab) {
        case 'dailyLog':
          data.workTypes = formData.getAll('workTypes');
          data.createTaskFromNextAction = formData.get('createTaskFromNextAction') === 'true';
          store.addDailyLog(data);
          ModalManager.showToast('오늘의 업무일지가 등록되었습니다!', 'success');
          break;

        case 'task':
          store.addTask(data);
          ModalManager.showToast('새 연구 Task가 등록되었습니다!', 'success');
          break;

        case 'experiment':
          data.conditions = {
            currentDensity: data.cond_currentDensity,
            capacity: data.cond_capacity,
            voltageRange: data.cond_voltageRange,
            chargingProtocol: data.cond_chargingProtocol,
            temperature: '25 ℃'
          };
          store.addExperiment(data);
          ModalManager.showToast('배터리 실험/시뮬레이션이 등록되었습니다!', 'success');
          break;

        case 'literature':
          store.addLiterature(data);
          ModalManager.showToast('논문 기록이 추가되었습니다!', 'success');
          break;

        case 'idea':
          store.addIdea(data);
          ModalManager.showToast('새로운 연구 아이디어가 보관함에 등록되었습니다!', 'success');
          break;

        case 'project':
          store.addProject(data);
          ModalManager.showToast('새 연구 프로젝트가 생성되었습니다!', 'success');
          break;
      }

      this.close();
    };
  }
}
