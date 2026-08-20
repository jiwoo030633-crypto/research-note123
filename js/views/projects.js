// BatteryLab Research Hub - Projects & Research Workspace View
import { store } from '../store.js';
import { ModalManager } from '../components/modal.js';
import { QuickAddModal } from '../components/quickAdd.js';

export class ProjectsView {
  constructor(app) {
    this.app = app;
    this.selectedProjectId = null;
    this.activeWorkspaceTab = 'overview'; // overview | tasks | logs | experiments | literature | ideas | notes
    this.filterStatus = 'All';
    this.filterCategory = 'All';
    this.filterType = 'All';
    this.viewMode = 'grid'; // grid | table
  }

  setSelectedProject(id) {
    this.selectedProjectId = id;
  }

  render(container) {
    if (this.selectedProjectId) {
      this.renderProjectWorkspace(container);
    } else {
      this.renderProjectList(container);
    }
  }

  // --- 1. Project List View ---
  renderProjectList(container) {
    const projects = store.getProjects();
    const categories = store.getCategories();

    // Filtering
    let filtered = projects.filter(p => {
      if (this.filterStatus !== 'All' && p.status !== this.filterStatus) return false;
      if (this.filterCategory !== 'All' && p.category !== this.filterCategory) return false;
      if (this.filterType !== 'All' && p.type !== this.filterType) return false;
      return true;
    });

    const statusCounts = {
      Active: projects.filter(p => p.status === 'Active').length,
      Planned: projects.filter(p => p.status === 'Planned').length,
      OnHold: projects.filter(p => p.status === 'On Hold').length,
      Completed: projects.filter(p => p.status === 'Completed').length,
      Archived: projects.filter(p => p.status === 'Archived').length
    };

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in pb-16">
        <!-- Top Header Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="p-2.5 rounded-2xl bg-indigo-100 text-indigo-700">
              <i data-lucide="folder-kanban" class="w-6 h-6"></i>
            </span>
            <div>
              <h1 class="text-2xl font-bold text-slate-800">연구 프로젝트 (Projects)</h1>
              <p class="text-xs text-slate-500 mt-0.5">모든 연구 활동(일지, 실험, 논문, 아이디어, Task)의 중심이 되는 프로젝트 목록입니다.</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button id="btn-create-project" class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-semibold shadow-md flex items-center gap-2 btn-press transition-all">
              <i data-lucide="folder-plus" class="w-4 h-4"></i> 새 프로젝트 생성
            </button>
          </div>
        </div>

        <!-- Filter & Status Tabs -->
        <div class="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <!-- Status Pill Filter -->
            <div class="flex flex-wrap gap-1.5 text-xs font-semibold">
              <button class="status-filter-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'All' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}" data-status="All">
                전체 (${projects.length})
              </button>
              <button class="status-filter-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Active' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}" data-status="Active">
                진행 중 (${statusCounts.Active})
              </button>
              <button class="status-filter-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Planned' ? 'bg-blue-600 text-white shadow-sm' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}" data-status="Planned">
                계획됨 (${statusCounts.Planned})
              </button>
              <button class="status-filter-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'On Hold' ? 'bg-amber-600 text-white shadow-sm' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}" data-status="On Hold">
                보류 (${statusCounts.OnHold})
              </button>
              <button class="status-filter-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Completed' ? 'bg-purple-600 text-white shadow-sm' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}" data-status="Completed">
                완료 (${statusCounts.Completed})
              </button>
              <button class="status-filter-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Archived' ? 'bg-slate-700 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}" data-status="Archived">
                보관됨 (${statusCounts.Archived})
              </button>
            </div>

            <!-- Category & Type Dropdowns -->
            <div class="flex items-center gap-2 text-xs">
              <select id="proj-category-select" class="px-2.5 py-1.5 border rounded-xl border-slate-200 focus:outline-none focus:border-indigo-500">
                <option value="All">모든 카테고리</option>
                ${categories.map(c => `<option value="${c.name}" ${this.filterCategory === c.name ? 'selected' : ''}>${c.name}</option>`).join('')}
              </select>

              <select id="proj-type-select" class="px-2.5 py-1.5 border rounded-xl border-slate-200 focus:outline-none focus:border-indigo-500">
                <option value="All">모든 구분 (Main/Sub)</option>
                <option value="Main" ${this.filterType === 'Main' ? 'selected' : ''}>주과제 (Main)</option>
                <option value="Sub" ${this.filterType === 'Sub' ? 'selected' : ''}>서브과제 (Sub)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Project Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${filtered.length === 0 ? `
            <div class="col-span-full bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-100">
              <i data-lucide="folder-open" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
              <p class="text-sm font-semibold">해당 조건에 해당하는 연구 프로젝트가 없습니다.</p>
              <p class="text-xs text-slate-400 mt-1">새 프로젝트를 생성하거나 필터 조건을 변경해보세요.</p>
            </div>
          ` : filtered.map(p => {
            const rel = store.getProjectRelatedData(p.id);
            const taskCount = rel ? rel.tasks.length : 0;
            const logCount = rel ? rel.dailyLogs.length : 0;
            const expCount = rel ? rel.experiments.length : 0;
            const litCount = rel ? rel.literature.length : 0;

            return `
              <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-indigo-200 card-hover cursor-pointer project-item-card transition-all flex flex-col justify-between" data-id="${p.id}">
                <div>
                  <!-- Header Badges -->
                  <div class="flex items-center justify-between gap-2 mb-3">
                    <div class="flex items-center gap-1.5">
                      <span class="text-xs font-bold px-2.5 py-1 rounded-lg ${p.type === 'Main' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}">
                        ${p.type === 'Main' ? '주과제 (Main)' : '서브 (Sub)'}
                      </span>
                      <span class="text-xs font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 truncate max-w-[120px]">
                        ${p.category}
                      </span>
                    </div>
                    <span class="text-xs px-2.5 py-0.5 rounded-full badge-${p.status.toLowerCase().replace(/\s+/g, '')} font-semibold">
                      ${p.status}
                    </span>
                  </div>

                  <!-- Title & Description -->
                  <h3 class="font-bold text-slate-800 text-lg group-hover:text-indigo-600 mb-2 leading-snug">${p.name}</h3>
                  <p class="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">${p.researchGoal || p.description || '연구 목표가 등록되지 않았습니다.'}</p>
                </div>

                <div class="space-y-4 pt-4 border-t border-slate-100">
                  <!-- Current Focus & Next Action Snippet -->
                  <div class="bg-slate-50/70 p-3 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                    <div class="flex items-center gap-2 truncate text-slate-700">
                      <i data-lucide="target" class="w-3.5 h-3.5 text-amber-500 shrink-0"></i>
                      <span class="font-bold text-slate-800 shrink-0">집중:</span>
                      <span class="truncate text-slate-600">${p.currentFocus || '미입력'}</span>
                    </div>
                    <div class="flex items-center gap-2 truncate text-slate-700">
                      <i data-lucide="arrow-right-circle" class="w-3.5 h-3.5 text-emerald-500 shrink-0"></i>
                      <span class="font-bold text-slate-800 shrink-0">다음:</span>
                      <span class="truncate text-slate-600">${p.nextAction || '미입력'}</span>
                    </div>
                  </div>

                  <!-- Linked Counts Badges -->
                  <div class="grid grid-cols-4 gap-1 text-center text-[11px] font-semibold text-slate-600 bg-white p-2 rounded-xl border border-slate-100">
                    <div>
                      <div class="text-slate-400 text-[10px]">Task</div>
                      <div class="text-indigo-600">${taskCount}</div>
                    </div>
                    <div>
                      <div class="text-slate-400 text-[10px]">일지</div>
                      <div class="text-blue-600">${logCount}</div>
                    </div>
                    <div>
                      <div class="text-slate-400 text-[10px]">실험</div>
                      <div class="text-purple-600">${expCount}</div>
                    </div>
                    <div>
                      <div class="text-slate-400 text-[10px]">논문</div>
                      <div class="text-amber-600">${litCount}</div>
                    </div>
                  </div>

                  <!-- Progress Bar -->
                  <div>
                    <div class="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                      <span>진행률</span>
                      <span class="text-indigo-600 font-bold">${p.progress}%</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500" style="width: ${p.progress}%"></div>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.bindListEvents(container);
  }

  bindListEvents(container) {
    // Status filters
    container.querySelectorAll('.status-filter-btn').forEach(btn => {
      btn.onclick = () => {
        this.filterStatus = btn.dataset.status;
        this.render(container);
      };
    });

    // Category filter
    const catSelect = container.querySelector('#proj-category-select');
    if (catSelect) {
      catSelect.onchange = (e) => {
        this.filterCategory = e.target.value;
        this.render(container);
      };
    }

    // Type filter
    const typeSelect = container.querySelector('#proj-type-select');
    if (typeSelect) {
      typeSelect.onchange = (e) => {
        this.filterType = e.target.value;
        this.render(container);
      };
    }

    // Create project button
    container.querySelector('#btn-create-project').onclick = () => {
      QuickAddModal.open('project');
    };

    // Click project card -> open project workspace
    container.querySelectorAll('.project-item-card').forEach(card => {
      card.onclick = () => {
        this.selectedProjectId = card.dataset.id;
        this.activeWorkspaceTab = 'overview';
        this.render(container);
      };
    });
  }

  // --- 2. Project Detail Research Workspace View ---
  renderProjectWorkspace(container) {
    const project = store.getProject(this.selectedProjectId);
    if (!project) {
      this.selectedProjectId = null;
      this.render(container);
      return;
    }

    const rel = store.getProjectRelatedData(project.id);
    const { tasks, dailyLogs, experiments, literature, ideas } = rel;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in pb-16">
        <!-- Back Navigation & Top Actions -->
        <div class="flex items-center justify-between">
          <button id="btn-back-to-projects" class="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all btn-press">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> 프로젝트 목록으로
          </button>

          <div class="flex items-center gap-2">
            <button id="btn-edit-project" class="text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-1.5 transition-all">
              <i data-lucide="settings" class="w-3.5 h-3.5"></i> 프로젝트 설정
            </button>
            <button id="btn-quick-log-project" class="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2 rounded-xl shadow-sm flex items-center gap-1.5 btn-press transition-all">
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> 이 프로젝트 일지 작성
            </button>
          </div>
        </div>

        <!-- Project Hero Header Card -->
        <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <span class="text-xs font-bold px-2.5 py-1 rounded-lg ${project.type === 'Main' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}">
                  ${project.type === 'Main' ? '주과제 (Main)' : '서브 (Sub)'}
                </span>
                <span class="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                  ${project.category}
                </span>
                <span class="text-xs px-2.5 py-0.5 rounded-full badge-${project.status.toLowerCase().replace(/\s+/g, '')} font-bold">
                  ${project.status}
                </span>
                <span class="text-xs px-2.5 py-0.5 rounded-full badge-${project.priority.toLowerCase()} font-medium">
                  우선순위: ${project.priority}
                </span>
              </div>
              <h1 class="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-snug">${project.name}</h1>
              <p class="text-xs md:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">${project.description || project.researchGoal}</p>
            </div>

            <!-- Progress & Date Info Box -->
            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 shrink-0 min-w-[200px] space-y-2">
              <div class="flex justify-between text-xs font-semibold text-slate-600">
                <span>연구 진행률</span>
                <span class="text-indigo-600 font-bold">${project.progress}%</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div class="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full" style="width: ${project.progress}%"></div>
              </div>
              <div class="text-[11px] text-slate-500 pt-1 flex justify-between">
                <span>시작: ${project.startDate || '-'}</span>
                <span>목표: ${project.targetDate || '-'}</span>
              </div>
            </div>
          </div>

          <!-- Focus & Next Action Highlights -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div class="bg-amber-50/70 p-3 rounded-2xl border border-amber-100 flex items-start gap-2.5">
              <i data-lucide="target" class="w-4 h-4 text-amber-600 shrink-0 mt-0.5"></i>
              <div>
                <div class="font-bold text-amber-900">현재 집중 연구 과제 (Current Focus)</div>
                <div class="text-amber-800 mt-0.5">${project.currentFocus || '현재 집중 과제를 등록해주세요.'}</div>
              </div>
            </div>
            <div class="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 flex items-start gap-2.5">
              <i data-lucide="arrow-right-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <div class="font-bold text-emerald-900">다음 실행 행동 (Next Action)</div>
                <div class="text-emerald-800 mt-0.5">${project.nextAction || '다음 행동 계획을 등록해주세요.'}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Workspace Tabs Navigation -->
        <div class="bg-white rounded-2xl p-1.5 shadow-sm border border-slate-100 flex gap-1 overflow-x-auto text-xs font-semibold">
          <button class="ws-tab-btn px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${this.activeWorkspaceTab === 'overview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}" data-tab="overview">
            <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i> 개요 & 연구노트
          </button>
          <button class="ws-tab-btn px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${this.activeWorkspaceTab === 'tasks' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}" data-tab="tasks">
            <i data-lucide="check-square" class="w-3.5 h-3.5"></i> 과제 Task (${tasks.length})
          </button>
          <button class="ws-tab-btn px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${this.activeWorkspaceTab === 'logs' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}" data-tab="logs">
            <i data-lucide="calendar" class="w-3.5 h-3.5"></i> 연구 일지 (${dailyLogs.length})
          </button>
          <button class="ws-tab-btn px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${this.activeWorkspaceTab === 'experiments' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}" data-tab="experiments">
            <i data-lucide="flask-conical" class="w-3.5 h-3.5"></i> 배터리 실험/해석 (${experiments.length})
          </button>
          <button class="ws-tab-btn px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${this.activeWorkspaceTab === 'literature' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}" data-tab="literature">
            <i data-lucide="book-open" class="w-3.5 h-3.5"></i> 연관 논문 (${literature.length})
          </button>
          <button class="ws-tab-btn px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${this.activeWorkspaceTab === 'ideas' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}" data-tab="ideas">
            <i data-lucide="lightbulb" class="w-3.5 h-3.5"></i> 연구 가설/아이디어 (${ideas.length})
          </button>
        </div>

        <!-- Tab Content Body -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          ${this.renderWorkspaceTabContent(project, rel)}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.bindWorkspaceEvents(container, project);
  }

  renderWorkspaceTabContent(project, rel) {
    const { tasks, dailyLogs, experiments, literature, ideas } = rel;

    switch (this.activeWorkspaceTab) {
      case 'overview':
        const markedNotes = window.marked ? window.marked.parse(project.notes || '작성된 연구 메모가 없습니다.') : (project.notes || '');
        return `
          <div class="space-y-6">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 class="text-base font-bold text-slate-800 flex items-center gap-2">
                <i data-lucide="book-marked" class="w-4 h-4 text-indigo-600"></i> 연구 목표 및 종합 연구 메모 (Markdown)
              </h3>
              <button id="btn-edit-notes" class="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1">
                <i data-lucide="edit" class="w-3.5 h-3.5"></i> 연구 메모 편집
              </button>
            </div>

            <!-- Research Goal Box -->
            <div class="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-xs leading-relaxed">
              <div class="font-bold text-indigo-950 mb-1">🎯 최종 연구 목표 (Research Goal)</div>
              <div class="text-indigo-900">${project.researchGoal || '목표가 정의되지 않았습니다.'}</div>
            </div>

            <!-- Notes Body -->
            <div class="markdown-body p-4 bg-slate-50/60 rounded-2xl border border-slate-100 text-xs">
              ${markedNotes}
            </div>
          </div>
        `;

      case 'tasks':
        return `
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-800">이 프로젝트의 연구 Action Tasks</h3>
              <button id="btn-add-task-to-proj" class="text-xs font-semibold bg-indigo-600 text-white px-3 py-1.5 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-1">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i> 새 Task 추가
              </button>
            </div>

            ${tasks.length === 0 ? `
              <div class="py-12 text-center text-slate-400 text-xs">등록된 Task가 없습니다.</div>
            ` : `
              <div class="space-y-2">
                ${tasks.map(t => `
                  <div class="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3 min-w-0">
                      <button class="ws-task-toggle w-5 h-5 rounded-lg border flex items-center justify-center ${t.status === 'Done' ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-300 text-transparent hover:text-emerald-500'}" data-id="${t.id}">
                        <i data-lucide="check" class="w-3.5 h-3.5"></i>
                      </button>
                      <div class="min-w-0">
                        <div class="text-xs font-bold text-slate-800 ${t.status === 'Done' ? 'line-through text-slate-400' : ''} truncate">${t.name}</div>
                        <div class="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>기한: ${t.dueDate}</span>
                          ${t.notes ? `<span>· ${t.notes}</span>` : ''}
                        </div>
                      </div>
                    </div>
                    <span class="text-xs px-2 py-0.5 rounded-full badge-${t.status.toLowerCase().replace(/\s+/g, '')} shrink-0">${t.status}</span>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        `;

      case 'logs':
        return `
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-800">이 프로젝트와 연결된 업무일지 (${dailyLogs.length})</h3>
            </div>

            ${dailyLogs.length === 0 ? `
              <div class="py-12 text-center text-slate-400 text-xs">작성된 업무일지가 없습니다.</div>
            ` : `
              <div class="space-y-3">
                ${dailyLogs.map(log => `
                  <div class="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border">${log.date}</span>
                      <div class="flex gap-1">
                        ${(log.workTypes || []).map(wt => `<span class="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">${wt}</span>`).join('')}
                      </div>
                    </div>
                    <h4 class="text-xs font-bold text-slate-800">${log.title}</h4>
                    <div class="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                      <div><span class="font-bold text-slate-700">한 일:</span> ${log.workDone || '-'}</div>
                      ${log.results ? `<div><span class="font-bold text-emerald-700">결과:</span> ${log.results}</div>` : ''}
                      ${log.problems ? `<div><span class="font-bold text-rose-700">문제점:</span> ${log.problems}</div>` : ''}
                      ${log.nextAction ? `<div><span class="font-bold text-cyan-700">다음 행동:</span> ${log.nextAction}</div>` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        `;

      case 'experiments':
        return `
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-800">배터리 실험 및 COMSOL 시뮬레이션 로그 (${experiments.length})</h3>
              <button id="btn-add-exp-to-proj" class="text-xs font-semibold bg-purple-600 text-white px-3 py-1.5 rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-1">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i> 새 실험 기록
              </button>
            </div>

            ${experiments.length === 0 ? `
              <div class="py-12 text-center text-slate-400 text-xs">기록된 실험이 없습니다.</div>
            ` : `
              <div class="space-y-3">
                ${experiments.map(exp => `
                  <div class="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2.5">
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-lg">${exp.cellId || 'Cell'}</span>
                        <span class="text-xs text-slate-400">${exp.date}</span>
                      </div>
                      <span class="text-xs px-2.5 py-0.5 rounded-full badge-${exp.status.toLowerCase().replace(/\s+/g, '')} font-semibold">${exp.status}</span>
                    </div>

                    <h4 class="text-xs font-bold text-slate-800">${exp.name}</h4>
                    <p class="text-xs text-slate-500">${exp.purpose || ''}</p>

                    <!-- Battery Params -->
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-white p-2.5 rounded-xl border border-slate-100">
                      <div><span class="text-slate-400">전류밀도:</span> <span class="font-medium">${exp.conditions?.currentDensity || '-'}</span></div>
                      <div><span class="text-slate-400">면적용량:</span> <span class="font-medium">${exp.conditions?.capacity || '-'}</span></div>
                      <div><span class="text-slate-400">프로토콜:</span> <span class="font-medium">${exp.conditions?.chargingProtocol || '-'}</span></div>
                      <div><span class="text-slate-400">온도:</span> <span class="font-medium">${exp.conditions?.temperature || '-'}</span></div>
                    </div>

                    ${exp.result ? `
                      <div class="text-xs p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100">
                        <span class="font-bold">결과:</span> ${exp.result}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        `;

      case 'literature':
        return `
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-800">연관 논문 및 문헌 리서치 (${literature.length})</h3>
              <button id="btn-add-lit-to-proj" class="text-xs font-semibold bg-amber-600 text-white px-3 py-1.5 rounded-xl hover:bg-amber-700 transition-colors flex items-center gap-1">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i> 논문 등록
              </button>
            </div>

            ${literature.length === 0 ? `
              <div class="py-12 text-center text-slate-400 text-xs">연결된 논문이 없습니다.</div>
            ` : `
              <div class="space-y-3">
                ${literature.map(lit => `
                  <div class="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-lg">${lit.journal} (${lit.year})</span>
                      <span class="text-xs px-2.5 py-0.5 rounded-full badge-completed font-semibold">${lit.readingStatus}</span>
                    </div>
                    <h4 class="text-xs font-bold text-slate-800 leading-snug">${lit.title}</h4>
                    <p class="text-[11px] text-slate-400">${lit.authors}</p>
                    
                    <div class="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-950">
                      <div class="font-bold mb-0.5">★ 이 논문이 내 연구에 왜 중요한가?</div>
                      <div>${lit.relevance || '연관성 메모가 없습니다.'}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        `;

      case 'ideas':
        return `
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-800">이 프로젝트에서 도출된 연구 아이디어 (${ideas.length})</h3>
              <button id="btn-add-idea-to-proj" class="text-xs font-semibold bg-pink-600 text-white px-3 py-1.5 rounded-xl hover:bg-pink-700 transition-colors flex items-center gap-1">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i> 새 아이디어 등록
              </button>
            </div>

            ${ideas.length === 0 ? `
              <div class="py-12 text-center text-slate-400 text-xs">도출된 아이디어가 없습니다.</div>
            ` : `
              <div class="space-y-3">
                ${ideas.map(idea => `
                  <div class="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-pink-900 bg-pink-100 px-2.5 py-0.5 rounded-lg">가설/아이디어</span>
                      <span class="text-xs px-2 py-0.5 rounded-full badge-high font-semibold">${idea.status}</span>
                    </div>
                    <h4 class="text-xs font-bold text-slate-800">${idea.title}</h4>
                    <div class="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                      <div><span class="font-bold text-slate-700">관찰/배경:</span> ${idea.motivation || idea.observation || '-'}</div>
                      <div><span class="font-bold text-purple-700">연구 가설:</span> ${idea.hypothesis || '-'}</div>
                      <div><span class="font-bold text-emerald-700">제안 실험:</span> ${idea.proposedExperiment || '-'}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        `;
    }
  }

  bindWorkspaceEvents(container, project) {
    // Back button
    container.querySelector('#btn-back-to-projects').onclick = () => {
      this.selectedProjectId = null;
      this.render(container);
    };

    // Quick log for this project
    container.querySelector('#btn-quick-log-project').onclick = () => {
      QuickAddModal.open('dailyLog', project.id);
    };

    // Tabs navigation
    container.querySelectorAll('.ws-tab-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeWorkspaceTab = btn.dataset.tab;
        this.render(container);
      };
    });

    // Task toggle in workspace
    container.querySelectorAll('.ws-task-toggle').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        store.toggleTaskStatus(id);
        ModalManager.triggerCelebration();
        this.render(container);
      };
    });

    // Quick add buttons inside specific tabs
    const btnAddTask = container.querySelector('#btn-add-task-to-proj');
    if (btnAddTask) btnAddTask.onclick = () => QuickAddModal.open('task', project.id);

    const btnAddExp = container.querySelector('#btn-add-exp-to-proj');
    if (btnAddExp) btnAddExp.onclick = () => QuickAddModal.open('experiment', project.id);

    const btnAddLit = container.querySelector('#btn-add-lit-to-proj');
    if (btnAddLit) btnAddLit.onclick = () => QuickAddModal.open('literature', project.id);

    const btnAddIdea = container.querySelector('#btn-add-idea-to-proj');
    if (btnAddIdea) btnAddIdea.onclick = () => QuickAddModal.open('idea', project.id);

    // Edit Project Modal Trigger
    const btnEdit = container.querySelector('#btn-edit-project');
    if (btnEdit) {
      btnEdit.onclick = () => {
        this.openEditProjectModal(project);
      };
    }
  }

  openEditProjectModal(project) {
    const categories = store.getCategories();
    let modalEl = document.getElementById('project-edit-modal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'project-edit-modal';
      modalEl.className = 'fixed inset-0 z-50 modal-backdrop hidden items-center justify-center p-4';
      document.body.appendChild(modalEl);
    }

    modalEl.innerHTML = `
      <div class="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 animate-fade-in max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <h3 class="text-base font-bold text-slate-800">프로젝트 정보 수정 및 상태 관리</h3>
          <button id="close-proj-edit-modal" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>

        <form id="proj-edit-form" class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-slate-600 mb-1">프로젝트명</label>
            <input type="text" name="name" value="${project.name}" required class="w-full text-xs px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-indigo-500 font-bold">
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-semibold text-slate-600 mb-1">카테고리</label>
              <select name="category" class="w-full px-2 py-1.5 border rounded-xl border-slate-200">
                ${categories.map(c => `<option value="${c.name}" ${project.category === c.name ? 'selected' : ''}>${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">과제 구분</label>
              <select name="type" class="w-full px-2 py-1.5 border rounded-xl border-slate-200">
                <option value="Main" ${project.type === 'Main' ? 'selected' : ''}>주과제 (Main)</option>
                <option value="Sub" ${project.type === 'Sub' ? 'selected' : ''}>서브 (Sub)</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">상태</label>
              <select name="status" class="w-full px-2 py-1.5 border rounded-xl border-slate-200">
                <option value="Active" ${project.status === 'Active' ? 'selected' : ''}>진행 중 (Active)</option>
                <option value="Planned" ${project.status === 'Planned' ? 'selected' : ''}>계획됨 (Planned)</option>
                <option value="On Hold" ${project.status === 'On Hold' ? 'selected' : ''}>보류 (On Hold)</option>
                <option value="Completed" ${project.status === 'Completed' ? 'selected' : ''}>완료 (Completed)</option>
                <option value="Archived" ${project.status === 'Archived' ? 'selected' : ''}>보관됨 (Archived)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-600 mb-1">진행률 (0 ~ 100%)</label>
              <input type="number" name="progress" min="0" max="100" value="${project.progress || 0}" class="w-full px-3 py-1.5 border rounded-xl border-slate-200">
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">우선순위</label>
              <select name="priority" class="w-full px-2 py-1.5 border rounded-xl border-slate-200">
                <option value="High" ${project.priority === 'High' ? 'selected' : ''}>높음 (High)</option>
                <option value="Medium" ${project.priority === 'Medium' ? 'selected' : ''}>보통 (Medium)</option>
                <option value="Low" ${project.priority === 'Low' ? 'selected' : ''}>낮음 (Low)</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-600 mb-1">연구 목표 (Research Goal)</label>
            <textarea name="researchGoal" rows="2" class="w-full px-3 py-2 border rounded-xl border-slate-200">${project.researchGoal || ''}</textarea>
          </div>

          <div>
            <label class="block font-semibold text-slate-600 mb-1">현재 집중 과제 (Current Focus)</label>
            <input type="text" name="currentFocus" value="${project.currentFocus || ''}" class="w-full px-3 py-1.5 border rounded-xl border-slate-200">
          </div>

          <div>
            <label class="block font-semibold text-slate-600 mb-1">다음 행동 (Next Action)</label>
            <input type="text" name="nextAction" value="${project.nextAction || ''}" class="w-full px-3 py-1.5 border rounded-xl border-slate-200">
          </div>

          <div>
            <label class="block font-semibold text-slate-600 mb-1">자유 연구 메모 (Markdown 지원)</label>
            <textarea name="notes" rows="4" class="w-full px-3 py-2 border rounded-xl border-slate-200 font-mono">${project.notes || ''}</textarea>
          </div>

          <div class="pt-4 flex items-center justify-between border-t border-slate-100">
            <button type="button" id="btn-delete-proj" class="text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> 프로젝트 삭제
            </button>
            <div class="flex gap-2">
              <button type="button" id="btn-cancel-proj-edit" class="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-xl">취소</button>
              <button type="submit" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm">저장하기</button>
            </div>
          </div>
        </form>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    ModalManager.open('project-edit-modal');

    const close = () => ModalManager.close('project-edit-modal');
    modalEl.querySelector('#close-proj-edit-modal').onclick = close;
    modalEl.querySelector('#btn-cancel-proj-edit').onclick = close;

    // Delete
    modalEl.querySelector('#btn-delete-proj').onclick = () => {
      ModalManager.showConfirm(
        '프로젝트 삭제',
        `"${project.name}" 프로젝트를 정말 삭제하시겠습니까?`,
        () => {
          store.deleteProject(project.id);
          close();
          this.selectedProjectId = null;
          ModalManager.showToast('프로젝트가 삭제되었습니다.', 'info');
          const mainContainer = document.getElementById('main-content');
          if (mainContainer) this.render(mainContainer);
        }
      );
    };

    // Save
    modalEl.querySelector('#proj-edit-form').onsubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const updated = {
        name: formData.get('name'),
        category: formData.get('category'),
        type: formData.get('type'),
        status: formData.get('status'),
        priority: formData.get('priority'),
        progress: parseInt(formData.get('progress'), 10) || 0,
        researchGoal: formData.get('researchGoal'),
        currentFocus: formData.get('currentFocus'),
        nextAction: formData.get('nextAction'),
        notes: formData.get('notes')
      };
      store.updateProject(project.id, updated);
      close();
      ModalManager.showToast('프로젝트 정보가 수정되었습니다!', 'success');
      const mainContainer = document.getElementById('main-content');
      if (mainContainer) this.render(mainContainer);
    };
  }
}
