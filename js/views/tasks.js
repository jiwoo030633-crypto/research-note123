// BatteryLab Research Hub - Tasks View (연구 행동 관리)
import { store } from '../store.js';
import { ModalManager } from '../components/modal.js';
import { QuickAddModal } from '../components/quickAdd.js';

export class TasksView {
  constructor(app) {
    this.app = app;
    this.viewMode = 'kanban'; // kanban | list
    this.filterProjectId = 'All';
    this.filterPriority = 'All';
  }

  render(container) {
    const tasks = store.getTasks();
    const projects = store.getProjects();

    // Filter tasks
    let filtered = tasks.filter(t => {
      if (this.filterProjectId !== 'All' && t.projectId !== this.filterProjectId) return false;
      if (this.filterPriority !== 'All' && t.priority !== this.filterPriority) return false;
      return true;
    });

    const columns = [
      { id: 'Todo', title: '대기 (Todo)', color: 'border-slate-300 bg-slate-50/80 text-slate-700', badge: 'bg-slate-200 text-slate-700' },
      { id: 'In Progress', title: '진행 중 (In Progress)', color: 'border-blue-300 bg-blue-50/50 text-blue-800', badge: 'bg-blue-200 text-blue-800' },
      { id: 'Blocked', title: '보류/차단 (Blocked)', color: 'border-rose-300 bg-rose-50/50 text-rose-800', badge: 'bg-rose-200 text-rose-800' },
      { id: 'Done', title: '완료 (Done)', color: 'border-emerald-300 bg-emerald-50/50 text-emerald-800', badge: 'bg-emerald-200 text-emerald-800' }
    ];

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in pb-16">
        <!-- Top Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="p-2.5 rounded-2xl bg-blue-100 text-blue-700">
              <i data-lucide="check-square" class="w-6 h-6"></i>
            </span>
            <div>
              <h1 class="text-2xl font-bold text-slate-800">연구 Task 관리 (Actions)</h1>
              <p class="text-xs text-slate-500 mt-0.5">단순 할 일이 아닌, 다음에 실제로 수행해야 하는 연구 행동을 체계적으로 추적합니다.</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <!-- View Mode Switch -->
            <div class="bg-white p-1 rounded-xl border border-slate-200 flex gap-1 text-xs">
              <button id="mode-kanban-btn" class="px-3 py-1.5 rounded-lg font-semibold transition-all ${this.viewMode === 'kanban' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
                <i data-lucide="columns" class="w-3.5 h-3.5 inline mr-1"></i> 칸반
              </button>
              <button id="mode-list-btn" class="px-3 py-1.5 rounded-lg font-semibold transition-all ${this.viewMode === 'list' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
                <i data-lucide="list" class="w-3.5 h-3.5 inline mr-1"></i> 목록
              </button>
            </div>

            <button id="btn-add-task-top" class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-semibold shadow-md flex items-center gap-2 btn-press transition-all">
              <i data-lucide="plus" class="w-4 h-4"></i> + Task 추가
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold text-slate-600">필터:</span>
            <select id="task-filter-project" class="px-3 py-1.5 border rounded-xl border-slate-200">
              <option value="All">모든 프로젝트 (${tasks.length})</option>
              ${projects.map(p => `<option value="${p.id}" ${this.filterProjectId === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
            </select>

            <select id="task-filter-priority" class="px-3 py-1.5 border rounded-xl border-slate-200">
              <option value="All">모든 우선순위</option>
              <option value="High" ${this.filterPriority === 'High' ? 'selected' : ''}>높음 (High)</option>
              <option value="Medium" ${this.filterPriority === 'Medium' ? 'selected' : ''}>보통 (Medium)</option>
              <option value="Low" ${this.filterPriority === 'Low' ? 'selected' : ''}>낮음 (Low)</option>
            </select>
          </div>

          <div class="text-slate-400 font-medium">
            전체 ${tasks.length}개 중 <span class="text-blue-600 font-bold">${filtered.length}</span>개 표시
          </div>
        </div>

        <!-- Content: Kanban vs List -->
        ${this.viewMode === 'kanban' ? this.renderKanban(filtered, columns) : this.renderList(filtered)}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.bindEvents(container);
  }

  renderKanban(tasks, columns) {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        ${columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return `
            <div class="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col min-h-[500px]">
              <!-- Column Header -->
              <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div class="flex items-center gap-2">
                  <h3 class="font-bold text-xs text-slate-800">${col.title}</h3>
                  <span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${col.badge}">${colTasks.length}</span>
                </div>
                <button class="btn-quick-add-to-col text-slate-400 hover:text-blue-600 p-1 rounded-lg hover:bg-slate-100" data-status="${col.id}">
                  <i data-lucide="plus" class="w-4 h-4"></i>
                </button>
              </div>

              <!-- Task Cards Container -->
              <div class="space-y-3 flex-1 overflow-y-auto pr-1">
                ${colTasks.length === 0 ? `
                  <div class="py-12 text-center text-slate-300 text-xs">
                    비어 있음
                  </div>
                ` : colTasks.map(t => {
                  const proj = store.getProject(t.projectId);
                  return `
                    <div class="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-blue-200 card-hover transition-all space-y-2 group" data-id="${t.id}">
                      <!-- Priority & Project -->
                      <div class="flex items-center justify-between gap-1">
                        <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md badge-${t.priority.toLowerCase()}">
                          ${t.priority}
                        </span>
                        <span class="text-[11px] font-medium text-slate-400 truncate max-w-[120px]">
                          ${proj ? proj.name : '프로젝트 미지정'}
                        </span>
                      </div>

                      <!-- Task Name -->
                      <div class="text-xs font-bold text-slate-800 group-hover:text-blue-700 leading-snug">
                        ${t.name}
                      </div>

                      <!-- Notes or Due Date -->
                      ${t.notes ? `<p class="text-[11px] text-slate-500 line-clamp-2">${t.notes}</p>` : ''}

                      <!-- Footer Date & Quick Status Action -->
                      <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                        <span class="flex items-center gap-1">
                          <i data-lucide="calendar" class="w-3 h-3 text-slate-400"></i> ${t.dueDate}
                        </span>

                        <select class="task-status-select text-[10px] font-semibold bg-white border border-slate-200 rounded-lg px-1.5 py-0.5 text-slate-700 focus:outline-none" data-id="${t.id}">
                          <option value="Todo" ${t.status === 'Todo' ? 'selected' : ''}>대기</option>
                          <option value="In Progress" ${t.status === 'In Progress' ? 'selected' : ''}>진행</option>
                          <option value="Blocked" ${t.status === 'Blocked' ? 'selected' : ''}>보류</option>
                          <option value="Done" ${t.status === 'Done' ? 'selected' : ''}>완료</option>
                        </select>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  renderList(tasks) {
    return `
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <th class="py-3 px-3">완료</th>
              <th class="py-3 px-3">Task명</th>
              <th class="py-3 px-3">프로젝트</th>
              <th class="py-3 px-3">상태</th>
              <th class="py-3 px-3">우선순위</th>
              <th class="py-3 px-3">기한</th>
              <th class="py-3 px-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${tasks.length === 0 ? `
              <tr><td colspan="7" class="py-8 text-center text-slate-400">등록된 Task가 없습니다.</td></tr>
            ` : tasks.map(t => {
              const proj = store.getProject(t.projectId);
              const isDone = t.status === 'Done';
              return `
                <tr class="hover:bg-slate-50 transition-colors">
                  <td class="py-3 px-3">
                    <button class="list-task-toggle w-5 h-5 rounded-lg border flex items-center justify-center ${isDone ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-300 text-transparent hover:text-emerald-500'}" data-id="${t.id}">
                      <i data-lucide="check" class="w-3.5 h-3.5"></i>
                    </button>
                  </td>
                  <td class="py-3 px-3 font-bold text-slate-800 ${isDone ? 'line-through text-slate-400' : ''}">
                    ${t.name}
                    ${t.notes ? `<div class="text-[11px] font-normal text-slate-400 mt-0.5">${t.notes}</div>` : ''}
                  </td>
                  <td class="py-3 px-3 font-medium text-slate-600">${proj ? proj.name : '-'}</td>
                  <td class="py-3 px-3">
                    <span class="px-2 py-0.5 rounded-full badge-${t.status.toLowerCase().replace(/\s+/g, '')} font-semibold">${t.status}</span>
                  </td>
                  <td class="py-3 px-3">
                    <span class="px-2 py-0.5 rounded-md badge-${t.priority.toLowerCase()} font-medium">${t.priority}</span>
                  </td>
                  <td class="py-3 px-3 text-slate-500 font-medium">${t.dueDate}</td>
                  <td class="py-3 px-3 text-right">
                    <button class="btn-delete-task text-slate-400 hover:text-rose-600 p-1 rounded-lg" data-id="${t.id}">
                      <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  bindEvents(container) {
    // Mode Switch
    container.querySelector('#mode-kanban-btn').onclick = () => {
      this.viewMode = 'kanban';
      this.render(container);
    };
    container.querySelector('#mode-list-btn').onclick = () => {
      this.viewMode = 'list';
      this.render(container);
    };

    // Add task
    container.querySelector('#btn-add-task-top').onclick = () => {
      QuickAddModal.open('task', this.filterProjectId !== 'All' ? this.filterProjectId : '');
    };

    // Quick add to column
    container.querySelectorAll('.btn-quick-add-to-col').forEach(btn => {
      btn.onclick = () => {
        QuickAddModal.open('task');
      };
    });

    // Filters
    const projFilter = container.querySelector('#task-filter-project');
    if (projFilter) {
      projFilter.onchange = (e) => {
        this.filterProjectId = e.target.value;
        this.render(container);
      };
    }

    const priFilter = container.querySelector('#task-filter-priority');
    if (priFilter) {
      priFilter.onchange = (e) => {
        this.filterPriority = e.target.value;
        this.render(container);
      };
    }

    // Status change in kanban
    container.querySelectorAll('.task-status-select').forEach(sel => {
      sel.onchange = (e) => {
        const id = sel.dataset.id;
        const newStatus = e.target.value;
        store.updateTask(id, { status: newStatus });
        if (newStatus === 'Done') ModalManager.triggerCelebration();
        this.render(container);
      };
    });

    // Toggle in list
    container.querySelectorAll('.list-task-toggle').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        store.toggleTaskStatus(id);
        ModalManager.triggerCelebration();
        this.render(container);
      };
    });

    // Delete in list
    container.querySelectorAll('.btn-delete-task').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        ModalManager.showConfirm('Task 삭제', '이 Task를 삭제하시겠습니까?', () => {
          store.deleteTask(id);
          ModalManager.showToast('Task가 삭제되었습니다.', 'info');
          this.render(container);
        });
      };
    });
  }
}
