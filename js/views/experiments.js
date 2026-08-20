// BatteryLab Research Hub - Experiments & Simulation View
import { store } from '../store.js';
import { ModalManager } from '../components/modal.js';
import { QuickAddModal } from '../components/quickAdd.js';

export class ExperimentsView {
  constructor(app) {
    this.app = app;
    this.filterProjectId = 'All';
    this.filterStatus = 'All';
    this.searchQuery = '';
    this.selectedExpId = null;
  }

  render(container) {
    const experiments = store.getExperiments();
    const projects = store.getProjects();

    // Filter
    let filtered = experiments.filter(e => {
      if (this.filterProjectId !== 'All' && e.projectId !== this.filterProjectId) return false;
      if (this.filterStatus !== 'All' && e.status !== this.filterStatus) return false;
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        const matchName = e.name && e.name.toLowerCase().includes(q);
        const matchPurpose = e.purpose && e.purpose.toLowerCase().includes(q);
        const matchSample = e.sampleId && e.sampleId.toLowerCase().includes(q);
        const matchResult = e.result && e.result.toLowerCase().includes(q);
        if (!matchName && !matchPurpose && !matchSample && !matchResult) return false;
      }
      return true;
    });

    // Sort by date desc
    filtered.sort((a, b) => (b.date > a.date ? 1 : -1));

    const statusCounts = {
      Completed: experiments.filter(e => e.status === 'Completed').length,
      InProgress: experiments.filter(e => e.status === 'In Progress').length,
      Planned: experiments.filter(e => e.status === 'Planned').length,
      Failed: experiments.filter(e => e.status === 'Failed').length,
      NeedRetest: experiments.filter(e => e.status === 'Need Re-test').length
    };

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in pb-16">
        <!-- Top Title Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="p-2.5 rounded-2xl bg-purple-100 text-purple-700">
              <i data-lucide="flask-conical" class="w-6 h-6"></i>
            </span>
            <div>
              <h1 class="text-2xl font-bold text-slate-800">배터리 실험 및 시뮬레이션 노트 (Experiments)</h1>
              <p class="text-xs text-slate-500 mt-0.5">전기화학 데이터, 충전 프로토콜, 실패 원인 분석(Post-mortem) 및 다음 행동을 정밀 기록합니다.</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button id="btn-add-exp-top" class="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-sm font-semibold shadow-md flex items-center gap-2 btn-press transition-all">
              <i data-lucide="plus-circle" class="w-4 h-4"></i> + 새 실험/시뮬 기록
            </button>
          </div>
        </div>

        <!-- Filter & Status Navigation -->
        <div class="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
            <!-- Status Pills -->
            <div class="flex flex-wrap gap-1.5 font-semibold">
              <button class="exp-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'All' ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}" data-status="All">
                전체 (${experiments.length})
              </button>
              <button class="exp-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Completed' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}" data-status="Completed">
                완료 (${statusCounts.Completed})
              </button>
              <button class="exp-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'In Progress' ? 'bg-blue-600 text-white shadow-sm' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}" data-status="In Progress">
                진행 중 (${statusCounts.InProgress})
              </button>
              <button class="exp-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Need Re-test' ? 'bg-amber-600 text-white shadow-sm' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}" data-status="Need Re-test">
                재실험 필요 (${statusCounts.NeedRetest})
              </button>
              <button class="exp-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Failed' ? 'bg-rose-600 text-white shadow-sm' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'}" data-status="Failed">
                실패 기록 보존 (${statusCounts.Failed})
              </button>
            </div>

            <!-- Project Filter & Search -->
            <div class="flex items-center gap-2">
              <select id="exp-filter-project" class="px-2.5 py-1.5 border rounded-xl border-slate-200">
                <option value="All">모든 프로젝트</option>
                ${projects.map(p => `<option value="${p.id}" ${this.filterProjectId === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
              </select>
              <input type="text" id="exp-search-input" value="${this.searchQuery}" placeholder="실험명, Sample ID 검색..." class="px-3 py-1.5 border rounded-xl border-slate-200 focus:outline-none focus:border-purple-500">
            </div>
          </div>
        </div>

        <!-- Experiment Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${filtered.length === 0 ? `
            <div class="col-span-full bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-100">
              <i data-lucide="flask-round" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
              <p class="text-sm font-semibold">조건에 맞는 배터리 실험/시뮬레이션 기록이 없습니다.</p>
            </div>
          ` : filtered.map(e => {
            const proj = store.getProject(e.projectId);
            const isFailed = e.status === 'Failed';
            return `
              <div class="bg-white rounded-3xl p-6 shadow-sm border ${isFailed ? 'border-rose-200 bg-rose-50/20' : 'border-slate-100'} hover:border-purple-200 card-hover transition-all flex flex-col justify-between space-y-4">
                <div>
                  <!-- Top Badges -->
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-800">
                        ${e.cellId || 'Cell'}
                      </span>
                      ${e.sampleId ? `<span class="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">${e.sampleId}</span>` : ''}
                    </div>
                    <span class="text-xs px-2.5 py-0.5 rounded-full badge-${e.status.toLowerCase().replace(/\s+/g, '')} font-bold">
                      ${e.status === 'Failed' ? '⚠️ 실패 (원인 분석 보존)' : e.status}
                    </span>
                  </div>

                  <!-- Name & Project -->
                  <h3 class="font-bold text-slate-800 text-base mb-1 leading-snug">${e.name}</h3>
                  <div class="text-xs text-slate-500 mb-3 flex items-center gap-2">
                    <span class="font-semibold text-purple-700">${proj ? proj.name : '프로젝트 미지정'}</span>
                    <span>·</span>
                    <span>${e.date}</span>
                  </div>

                  <!-- Purpose -->
                  ${e.purpose ? `<p class="text-xs text-slate-600 leading-relaxed mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100"><span class="font-semibold text-slate-700">목적:</span> ${e.purpose}</p>` : ''}

                  <!-- Battery Parameters Matrix -->
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-slate-50/80 p-3 rounded-2xl border border-slate-100 mb-3">
                    <div>
                      <span class="text-slate-400 block text-[10px]">전류밀도</span>
                      <span class="font-semibold text-slate-700">${e.conditions?.currentDensity || '-'}</span>
                    </div>
                    <div>
                      <span class="text-slate-400 block text-[10px]">면적당 용량</span>
                      <span class="font-semibold text-slate-700">${e.conditions?.capacity || '-'}</span>
                    </div>
                    <div>
                      <span class="text-slate-400 block text-[10px]">전압 범위</span>
                      <span class="font-semibold text-slate-700">${e.conditions?.voltageRange || '-'}</span>
                    </div>
                    <div>
                      <span class="text-slate-400 block text-[10px]">충전 프로토콜</span>
                      <span class="font-semibold text-purple-700">${e.conditions?.chargingProtocol || '-'}</span>
                    </div>
                  </div>

                  <!-- Result or Failure Post-Mortem -->
                  ${isFailed ? `
                    <div class="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-950 space-y-1.5">
                      <div class="font-bold text-rose-800 flex items-center gap-1.5">
                        <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-rose-600"></i> 실패 원인 분석 (Post-Mortem)
                      </div>
                      <div><span class="font-semibold text-rose-900">문제 현상:</span> ${e.problems || e.result}</div>
                      <div><span class="font-semibold text-rose-900">도출된 교훈:</span> ${e.conclusion || '대책 수립 필요'}</div>
                    </div>
                  ` : `
                    ${e.result ? `
                      <div class="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-xs text-emerald-950">
                        <span class="font-bold text-emerald-800">📊 결과:</span> ${e.result}
                      </div>
                    ` : ''}
                  `}
                </div>

                <!-- Footer Next Action & Edit Button -->
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div class="truncate max-w-[260px] text-slate-600">
                    ${e.nextAction ? `<span class="font-bold text-cyan-800">⏩ 다음:</span> ${e.nextAction}` : '<span class="text-slate-400">다음 행동 미입력</span>'}
                  </div>
                  <div class="flex gap-1">
                    <button class="btn-edit-exp text-purple-600 hover:text-purple-800 p-1.5 rounded-lg hover:bg-purple-50 transition-colors" data-id="${e.id}">
                      <i data-lucide="edit" class="w-4 h-4"></i>
                    </button>
                    <button class="btn-delete-exp text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors" data-id="${e.id}">
                      <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.bindEvents(container);
  }

  bindEvents(container) {
    // Add top
    container.querySelector('#btn-add-exp-top').onclick = () => {
      QuickAddModal.open('experiment', this.filterProjectId !== 'All' ? this.filterProjectId : '');
    };

    // Status filter
    container.querySelectorAll('.exp-status-btn').forEach(btn => {
      btn.onclick = () => {
        this.filterStatus = btn.dataset.status;
        this.render(container);
      };
    });

    // Project filter
    const projFilter = container.querySelector('#exp-filter-project');
    if (projFilter) {
      projFilter.onchange = (e) => {
        this.filterProjectId = e.target.value;
        this.render(container);
      };
    }

    // Search input
    const searchInput = container.querySelector('#exp-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.searchQuery = e.target.value;
        this.render(container);
      };
    }

    // Delete exp
    container.querySelectorAll('.btn-delete-exp').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        ModalManager.showConfirm('실험 기록 삭제', '이 실험/시뮬레이션 기록을 삭제하시겠습니까?', () => {
          store.deleteExperiment(id);
          ModalManager.showToast('실험 기록이 삭제되었습니다.', 'info');
          this.render(container);
        });
      };
    });

    // Edit exp modal
    container.querySelectorAll('.btn-edit-exp').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        this.openEditExpModal(id);
      };
    });
  }

  openEditExpModal(expId) {
    const exp = store.getExperiment(expId);
    if (!exp) return;
    const projects = store.getProjects();

    let modalEl = document.getElementById('exp-edit-modal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'exp-edit-modal';
      modalEl.className = 'fixed inset-0 z-50 modal-backdrop hidden items-center justify-center p-4';
      document.body.appendChild(modalEl);
    }

    modalEl.innerHTML = `
      <div class="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 animate-fade-in max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <h3 class="text-base font-bold text-slate-800">배터리 실험/시뮬레이션 상세 수정</h3>
          <button id="close-exp-edit-modal" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>

        <form id="exp-edit-form" class="space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-600 mb-1">실험명</label>
              <input type="text" name="name" value="${exp.name}" required class="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-purple-500 font-bold">
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">연관 프로젝트</label>
              <select name="projectId" class="w-full px-2 py-2 border rounded-xl border-slate-200">
                ${projects.map(p => `<option value="${p.id}" ${exp.projectId === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-semibold text-slate-600 mb-1">일자</label>
              <input type="date" name="date" value="${exp.date}" class="w-full px-2.5 py-1.5 border rounded-lg border-slate-200">
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">Sample ID</label>
              <input type="text" name="sampleId" value="${exp.sampleId || ''}" class="w-full px-2.5 py-1.5 border rounded-lg border-slate-200">
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">Cell ID / 시스템</label>
              <input type="text" name="cellId" value="${exp.cellId || ''}" class="w-full px-2.5 py-1.5 border rounded-lg border-slate-200">
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-600 mb-1">실험/해석 목적</label>
            <input type="text" name="purpose" value="${exp.purpose || ''}" class="w-full px-3 py-2 border rounded-xl border-slate-200">
          </div>

          <!-- Conditions -->
          <div class="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-2">
            <span class="font-bold text-purple-900">배터리 실험 조건</span>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label class="text-[11px] text-slate-500">전류밀도</label>
                <input type="text" name="currentDensity" value="${exp.conditions?.currentDensity || ''}" class="w-full px-2 py-1 border rounded bg-white">
              </div>
              <div>
                <label class="text-[11px] text-slate-500">면적당 용량</label>
                <input type="text" name="capacity" value="${exp.conditions?.capacity || ''}" class="w-full px-2 py-1 border rounded bg-white">
              </div>
              <div>
                <label class="text-[11px] text-slate-500">전압 범위</label>
                <input type="text" name="voltageRange" value="${exp.conditions?.voltageRange || ''}" class="w-full px-2 py-1 border rounded bg-white">
              </div>
              <div>
                <label class="text-[11px] text-slate-500">충전 프로토콜</label>
                <input type="text" name="chargingProtocol" value="${exp.conditions?.chargingProtocol || ''}" class="w-full px-2 py-1 border rounded bg-white">
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-600 mb-1">실험 상태</label>
              <select name="status" class="w-full px-2 py-2 border rounded-xl border-slate-200">
                <option value="Planned" ${exp.status === 'Planned' ? 'selected' : ''}>계획됨 (Planned)</option>
                <option value="In Progress" ${exp.status === 'In Progress' ? 'selected' : ''}>진행 중 (In Progress)</option>
                <option value="Completed" ${exp.status === 'Completed' ? 'selected' : ''}>완료됨 (Completed)</option>
                <option value="Need Re-test" ${exp.status === 'Need Re-test' ? 'selected' : ''}>재실험 필요 (Need Re-test)</option>
                <option value="Failed" ${exp.status === 'Failed' ? 'selected' : ''}>실패 (Failed - 보존)</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">다음 행동 (Next Action)</label>
              <input type="text" name="nextAction" value="${exp.nextAction || ''}" class="w-full px-3 py-2 border rounded-xl border-slate-200">
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-600 mb-1">결과 및 결론</label>
            <textarea name="result" rows="2" class="w-full px-3 py-2 border rounded-xl border-slate-200">${exp.result || ''}</textarea>
          </div>

          <div>
            <label class="block font-semibold text-slate-600 mb-1">문제점 / 실패 원인 (Problems / Post-Mortem)</label>
            <textarea name="problems" rows="2" class="w-full px-3 py-2 border rounded-xl border-slate-200">${exp.problems || ''}</textarea>
          </div>

          <div class="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button type="button" id="btn-cancel-exp-edit" class="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl">취소</button>
            <button type="submit" class="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-sm">수정 저장</button>
          </div>
        </form>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    ModalManager.open('exp-edit-modal');

    const close = () => ModalManager.close('exp-edit-modal');
    modalEl.querySelector('#close-exp-edit-modal').onclick = close;
    modalEl.querySelector('#btn-cancel-exp-edit').onclick = close;

    modalEl.querySelector('#exp-edit-form').onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const updated = {
        name: fd.get('name'),
        projectId: fd.get('projectId'),
        date: fd.get('date'),
        sampleId: fd.get('sampleId'),
        cellId: fd.get('cellId'),
        purpose: fd.get('purpose'),
        conditions: {
          currentDensity: fd.get('currentDensity'),
          capacity: fd.get('capacity'),
          voltageRange: fd.get('voltageRange'),
          chargingProtocol: fd.get('chargingProtocol')
        },
        status: fd.get('status'),
        nextAction: fd.get('nextAction'),
        result: fd.get('result'),
        problems: fd.get('problems')
      };
      store.updateExperiment(expId, updated);
      close();
      ModalManager.showToast('실험 기록이 수정되었습니다!', 'success');
      const mainContainer = document.getElementById('main-content');
      if (mainContainer) this.render(mainContainer);
    };
  }
}
