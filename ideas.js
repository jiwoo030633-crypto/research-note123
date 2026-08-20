// BatteryLab Research Hub - Research Ideas View (연구 아이디어 & 가설)
import { store } from '../store.js';
import { ModalManager } from '../components/modal.js';
import { QuickAddModal } from '../components/quickAdd.js';

export class IdeasView {
  constructor(app) {
    this.app = app;
    this.filterProjectId = 'All';
    this.filterStatus = 'All';
    this.searchQuery = '';
  }

  render(container) {
    const ideas = store.getIdeas();
    const projects = store.getProjects();

    // Filter
    let filtered = ideas.filter(i => {
      if (this.filterProjectId !== 'All' && i.projectId !== this.filterProjectId) return false;
      if (this.filterStatus !== 'All' && i.status !== this.filterStatus) return false;
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        const matchTitle = i.title && i.title.toLowerCase().includes(q);
        const matchHypo = i.hypothesis && i.hypothesis.toLowerCase().includes(q);
        const matchMotiv = i.motivation && i.motivation.toLowerCase().includes(q);
        if (!matchTitle && !matchHypo && !matchMotiv) return false;
      }
      return true;
    });

    const statusCounts = {
      Idea: ideas.filter(i => i.status === 'Idea').length,
      Reviewing: ideas.filter(i => i.status === 'Reviewing').length,
      Testing: ideas.filter(i => i.status === 'Testing').length,
      Validated: ideas.filter(i => i.status === 'Validated').length,
      Rejected: ideas.filter(i => i.status === 'Rejected').length
    };

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in pb-16">
        <!-- Top Title Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="p-2.5 rounded-2xl bg-pink-100 text-pink-700">
              <i data-lucide="lightbulb" class="w-6 h-6"></i>
            </span>
            <div>
              <h1 class="text-2xl font-bold text-slate-800">연구 아이디어 및 가설 (Research Ideas)</h1>
              <p class="text-xs text-slate-500 mt-0.5">실험이나 논문 공부 중 떠오른 번뜩이는 아이디어를 가설과 제안 실험으로 구체화합니다.</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button id="btn-add-idea-top" class="px-4 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl text-sm font-semibold shadow-md flex items-center gap-2 btn-press transition-all">
              <i data-lucide="plus-circle" class="w-4 h-4"></i> + 아이디어 등록
            </button>
          </div>
        </div>

        <!-- Filter Navigation -->
        <div class="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
            <!-- Status Pills -->
            <div class="flex flex-wrap gap-1.5 font-semibold">
              <button class="idea-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'All' ? 'bg-pink-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}" data-status="All">
                전체 (${ideas.length})
              </button>
              <button class="idea-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Idea' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}" data-status="Idea">
                아이디어 (${statusCounts.Idea})
              </button>
              <button class="idea-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Reviewing' ? 'bg-amber-600 text-white shadow-sm' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}" data-status="Reviewing">
                검토/구체화 (${statusCounts.Reviewing})
              </button>
              <button class="idea-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Testing' ? 'bg-purple-600 text-white shadow-sm' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}" data-status="Testing">
                실험 검증 중 (${statusCounts.Testing})
              </button>
              <button class="idea-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Validated' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}" data-status="Validated">
                검증 성공 (${statusCounts.Validated})
              </button>
              <button class="idea-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Rejected' ? 'bg-slate-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}" data-status="Rejected">
                보류/반려 (${statusCounts.Rejected})
              </button>
            </div>

            <!-- Project & Search -->
            <div class="flex items-center gap-2">
              <select id="idea-filter-project" class="px-2.5 py-1.5 border rounded-xl border-slate-200">
                <option value="All">모든 프로젝트</option>
                ${projects.map(p => `<option value="${p.id}" ${this.filterProjectId === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
              </select>
              <input type="text" id="idea-search-input" value="${this.searchQuery}" placeholder="가설, 내용 검색..." class="px-3 py-1.5 border rounded-xl border-slate-200 focus:outline-none focus:border-pink-500">
            </div>
          </div>
        </div>

        <!-- Ideas Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${filtered.length === 0 ? `
            <div class="col-span-full bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-100">
              <i data-lucide="sparkles" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
              <p class="text-sm font-semibold">조건에 맞는 연구 아이디어가 없습니다.</p>
            </div>
          ` : filtered.map(idea => {
            const proj = store.getProject(idea.projectId);
            return `
              <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-pink-200 card-hover transition-all flex flex-col justify-between space-y-4">
                <div>
                  <!-- Badges -->
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-pink-100 text-pink-800">
                        아이디어
                      </span>
                      ${proj ? `<span class="text-[11px] font-semibold text-slate-500 truncate max-w-[130px]">${proj.name}</span>` : ''}
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="text-xs px-2.5 py-0.5 rounded-md badge-${idea.priority.toLowerCase()} font-medium">
                        ${idea.priority}
                      </span>
                      <span class="text-xs px-2.5 py-0.5 rounded-full badge-active font-semibold">
                        ${idea.status}
                      </span>
                    </div>
                  </div>

                  <!-- Title -->
                  <h3 class="font-bold text-slate-800 text-base mb-3 leading-snug">${idea.title}</h3>

                  <!-- Observation / Motivation -->
                  ${idea.motivation || idea.observation ? `
                    <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 mb-2.5">
                      <span class="font-bold text-slate-800">🔍 발생 배경 및 관찰:</span>
                      <div class="mt-1 leading-relaxed">${idea.motivation || idea.observation}</div>
                    </div>
                  ` : ''}

                  <!-- Hypothesis -->
                  <div class="p-3.5 bg-gradient-to-br from-pink-50 to-purple-50/40 rounded-2xl border border-pink-200 text-xs text-pink-950 mb-2.5 space-y-1">
                    <div class="font-bold text-pink-900 flex items-center gap-1.5">
                      <i data-lucide="target" class="w-3.5 h-3.5 text-pink-600"></i> 연구 가설 (Hypothesis)
                    </div>
                    <div class="leading-relaxed font-medium">${idea.hypothesis || '가설을 구체화해주세요.'}</div>
                  </div>

                  <!-- Proposed Experiment / Simulation -->
                  ${idea.proposedExperiment || idea.proposedSimulation ? `
                    <div class="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs text-emerald-950 mb-2">
                      <span class="font-bold text-emerald-900">🧪 제안 실험/시뮬레이션:</span>
                      <div class="mt-0.5">${idea.proposedExperiment || idea.proposedSimulation}</div>
                    </div>
                  ` : ''}

                  <!-- Expected Result -->
                  ${idea.expectedResult ? `
                    <div class="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
                      <span class="font-semibold text-slate-800">📈 예상 결과:</span> ${idea.expectedResult}
                    </div>
                  ` : ''}
                </div>

                <!-- Footer Actions: Convert to Task, Convert to Exp, Edit -->
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div class="flex items-center gap-1.5">
                    <button class="btn-idea-to-task text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-xl transition-colors flex items-center gap-1" data-id="${idea.id}">
                      <i data-lucide="check-square" class="w-3.5 h-3.5"></i> Task 전환
                    </button>
                    <button class="btn-idea-to-exp text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-xl transition-colors flex items-center gap-1" data-id="${idea.id}">
                      <i data-lucide="flask-conical" class="w-3.5 h-3.5"></i> 실험 전환
                    </button>
                  </div>

                  <div class="flex items-center gap-1">
                    <button class="btn-edit-idea text-pink-700 hover:text-pink-900 p-1.5 rounded-lg hover:bg-pink-50" data-id="${idea.id}">
                      <i data-lucide="edit" class="w-4 h-4"></i>
                    </button>
                    <button class="btn-delete-idea text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50" data-id="${idea.id}">
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
    container.querySelector('#btn-add-idea-top').onclick = () => {
      QuickAddModal.open('idea', this.filterProjectId !== 'All' ? this.filterProjectId : '');
    };

    // Status filter
    container.querySelectorAll('.idea-status-btn').forEach(btn => {
      btn.onclick = () => {
        this.filterStatus = btn.dataset.status;
        this.render(container);
      };
    });

    // Project filter
    const projFilter = container.querySelector('#idea-filter-project');
    if (projFilter) {
      projFilter.onchange = (e) => {
        this.filterProjectId = e.target.value;
        this.render(container);
      };
    }

    // Search input
    const searchInput = container.querySelector('#idea-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.searchQuery = e.target.value;
        this.render(container);
      };
    }

    // Convert Idea to Task
    container.querySelectorAll('.btn-idea-to-task').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const idea = store.getIdea(id);
        if (idea) {
          store.addTask({
            name: `[가설 검증] ${idea.title}`,
            projectId: idea.projectId,
            priority: idea.priority,
            dueDate: new Date().toISOString().slice(0, 10),
            notes: `가설: ${idea.hypothesis}\n제안 실험: ${idea.proposedExperiment || '-'}`
          });
          store.updateIdea(id, { status: 'Testing' });
          ModalManager.triggerCelebration();
          ModalManager.showToast('아이디어가 연구 Task로 전환 등록되었습니다!', 'success');
          this.render(container);
        }
      };
    });

    // Convert Idea to Experiment
    container.querySelectorAll('.btn-idea-to-exp').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const idea = store.getIdea(id);
        if (idea) {
          QuickAddModal.open('experiment', idea.projectId);
          setTimeout(() => {
            const nameInput = document.querySelector('#quick-add-modal input[name="name"]');
            const purposeInput = document.querySelector('#quick-add-modal input[name="purpose"]');
            if (nameInput) nameInput.value = `[아이디어 검증] ${idea.title}`;
            if (purposeInput) purposeInput.value = `가설 검증: ${idea.hypothesis} (예상: ${idea.expectedResult})`;
          }, 100);
        }
      };
    });

    // Delete idea
    container.querySelectorAll('.btn-delete-idea').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        ModalManager.showConfirm('아이디어 삭제', '이 연구 아이디어를 삭제하시겠습니까?', () => {
          store.deleteIdea(id);
          ModalManager.showToast('아이디어가 삭제되었습니다.', 'info');
          this.render(container);
        });
      };
    });

    // Edit idea
    container.querySelectorAll('.btn-edit-idea').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        this.openEditIdeaModal(id);
      };
    });
  }

  openEditIdeaModal(ideaId) {
    const idea = store.getIdea(ideaId);
    if (!idea) return;
    const projects = store.getProjects();

    let modalEl = document.getElementById('idea-edit-modal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'idea-edit-modal';
      modalEl.className = 'fixed inset-0 z-50 modal-backdrop hidden items-center justify-center p-4';
      document.body.appendChild(modalEl);
    }

    modalEl.innerHTML = `
      <div class="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 animate-fade-in max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <h3 class="text-base font-bold text-slate-800">연구 아이디어 및 가설 수정</h3>
          <button id="close-idea-edit-modal" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>

        <form id="idea-edit-form" class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-slate-600 mb-1">아이디어 제목</label>
            <input type="text" name="title" value="${idea.title}" required class="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-pink-500 font-bold">
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-semibold text-slate-600 mb-1">연관 프로젝트</label>
              <select name="projectId" class="w-full px-2 py-2 border rounded-xl border-slate-200">
                <option value="">-- 미지정 --</option>
                ${projects.map(p => `<option value="${p.id}" ${idea.projectId === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">상태</label>
              <select name="status" class="w-full px-2 py-2 border rounded-xl border-slate-200">
                <option value="Idea" ${idea.status === 'Idea' ? 'selected' : ''}>아이디어 (Idea)</option>
                <option value="Reviewing" ${idea.status === 'Reviewing' ? 'selected' : ''}>검토 중 (Reviewing)</option>
                <option value="Testing" ${idea.status === 'Testing' ? 'selected' : ''}>실험 검증 중 (Testing)</option>
                <option value="Validated" ${idea.status === 'Validated' ? 'selected' : ''}>검증 성공 (Validated)</option>
                <option value="Rejected" ${idea.status === 'Rejected' ? 'selected' : ''}>보류/반려 (Rejected)</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">우선순위</label>
              <select name="priority" class="w-full px-2 py-2 border rounded-xl border-slate-200">
                <option value="High" ${idea.priority === 'High' ? 'selected' : ''}>높음 (High)</option>
                <option value="Medium" ${idea.priority === 'Medium' ? 'selected' : ''}>보통 (Medium)</option>
                <option value="Low" ${idea.priority === 'Low' ? 'selected' : ''}>낮음 (Low)</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-600 mb-1">발생 배경 및 관찰</label>
            <textarea name="motivation" rows="2" class="w-full px-3 py-2 border rounded-xl border-slate-200">${idea.motivation || idea.observation || ''}</textarea>
          </div>

          <div class="p-3.5 bg-pink-50 rounded-2xl border border-pink-200">
            <label class="block font-bold text-pink-950 mb-1">연구 가설 (Hypothesis)</label>
            <textarea name="hypothesis" rows="2" class="w-full px-3 py-2 border rounded-xl border-pink-300 bg-white font-medium">${idea.hypothesis || ''}</textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-600 mb-1">제안 실험/시뮬레이션</label>
              <input type="text" name="proposedExperiment" value="${idea.proposedExperiment || ''}" class="w-full px-3 py-2 border rounded-xl border-slate-200">
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">예상 결과</label>
              <input type="text" name="expectedResult" value="${idea.expectedResult || ''}" class="w-full px-3 py-2 border rounded-xl border-slate-200">
            </div>
          </div>

          <div class="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button type="button" id="btn-cancel-idea-edit" class="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl">취소</button>
            <button type="submit" class="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl shadow-sm">수정 저장</button>
          </div>
        </form>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    ModalManager.open('idea-edit-modal');

    const close = () => ModalManager.close('idea-edit-modal');
    modalEl.querySelector('#close-idea-edit-modal').onclick = close;
    modalEl.querySelector('#btn-cancel-idea-edit').onclick = close;

    modalEl.querySelector('#idea-edit-form').onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const updated = {
        title: fd.get('title'),
        projectId: fd.get('projectId'),
        status: fd.get('status'),
        priority: fd.get('priority'),
        motivation: fd.get('motivation'),
        hypothesis: fd.get('hypothesis'),
        proposedExperiment: fd.get('proposedExperiment'),
        expectedResult: fd.get('expectedResult')
      };
      store.updateIdea(ideaId, updated);
      close();
      ModalManager.showToast('아이디어가 수정되었습니다!', 'success');
      const mainContainer = document.getElementById('main-content');
      if (mainContainer) this.render(mainContainer);
    };
  }
}
