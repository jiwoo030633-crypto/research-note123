// BatteryLab Research Hub - Dashboard View
import { store } from '../store.js';
import { QuickAddModal } from '../components/quickAdd.js';
import { ModalManager } from '../components/modal.js';

export class DashboardView {
  constructor(app) {
    this.app = app;
  }

  render(container) {
    const settings = store.getSettings();
    const projects = store.getProjects();
    const activeProjects = projects.filter(p => p.status === 'Active');
    const tasks = store.getTasks();
    const priorityTasks = tasks.filter(t => t.status !== 'Done' && (t.priority === 'High' || t.dueDate === new Date().toISOString().slice(0, 10))).slice(0, 5);
    const today = new Date().toISOString().slice(0, 10);
    const todayLogs = store.getDailyLogs().filter(l => l.date === today);
    const experiments = store.getExperiments();
    const literature = store.getLiterature();
    const ideas = store.getIdeas();

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in pb-12">
        <!-- Top Welcome & Focus Banner -->
        <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-emerald-900/10 relative overflow-hidden">
          <!-- Background decoration circles -->
          <div class="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div class="absolute right-40 top-0 w-32 h-32 rounded-full bg-teal-300/10 blur-xl pointer-events-none"></div>

          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-emerald-100 mb-3 border border-white/20">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-300"></i>
                <span>${settings.labName}</span>
              </div>
              <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight">안녕하세요, ${settings.researcherName}! 🔋</h1>
              <p class="text-emerald-100 text-sm mt-1 max-w-xl">
                오늘도 의미 있는 배터리 연구 데이터를 축적하고, 결과와 다음 행동을 유기적으로 연결해보세요.
              </p>
            </div>

            <!-- Quick Add Action Cluster -->
            <div class="flex flex-wrap gap-2 shrink-0">
              <button id="dash-quick-log" class="px-4 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-2xl font-bold text-sm shadow-md flex items-center gap-2 btn-press transition-all">
                <i data-lucide="edit-3" class="w-4 h-4 text-emerald-600"></i> 오늘의 일지 작성
              </button>
              <button id="dash-quick-task" class="px-3.5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur text-white rounded-2xl font-medium text-sm flex items-center gap-1.5 btn-press transition-all border border-white/20">
                <i data-lucide="check-square" class="w-4 h-4"></i> + Task
              </button>
              <button id="dash-quick-exp" class="px-3.5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur text-white rounded-2xl font-medium text-sm flex items-center gap-1.5 btn-press transition-all border border-white/20">
                <i data-lucide="flask-conical" class="w-4 h-4"></i> + 실험
              </button>
            </div>
          </div>

          <!-- Quick Metrics Bar -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
            <div class="bg-black/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div class="text-emerald-200 text-xs font-medium">진행 중 프로젝트</div>
              <div class="text-2xl font-bold mt-0.5">${activeProjects.length}개 <span class="text-xs font-normal text-emerald-200">/ 총 ${projects.length}개</span></div>
            </div>
            <div class="bg-black/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div class="text-emerald-200 text-xs font-medium">오늘 작성된 일지</div>
              <div class="text-2xl font-bold mt-0.5">${todayLogs.length}건</div>
            </div>
            <div class="bg-black/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div class="text-emerald-200 text-xs font-medium">누적 실험 및 시뮬</div>
              <div class="text-2xl font-bold mt-0.5">${experiments.length}건</div>
            </div>
            <div class="bg-black/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div class="text-emerald-200 text-xs font-medium">정리된 논문 및 아이디어</div>
              <div class="text-2xl font-bold mt-0.5">${literature.length + ideas.length}건</div>
            </div>
          </div>
        </div>

        <!-- Main Dashboard 2-Column Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left 2 Cols: Active Projects & Activity Heatmap -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Active Projects Section -->
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  <h2 class="text-lg font-bold text-slate-800">현재 집중 연구 프로젝트 (Active Projects)</h2>
                </div>
                <button id="view-all-projects-btn" class="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  전체 보기 (${projects.length}) <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${activeProjects.map(p => `
                  <div class="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-emerald-200 card-hover cursor-pointer project-card transition-all flex flex-col justify-between" data-id="${p.id}">
                    <div>
                      <div class="flex items-center justify-between gap-2 mb-2">
                        <span class="text-xs font-bold px-2.5 py-1 rounded-lg ${p.type === 'Main' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}">
                          ${p.type === 'Main' ? '주과제' : '서브'}
                        </span>
                        <span class="text-xs px-2.5 py-0.5 rounded-full badge-${p.priority.toLowerCase()} font-medium">
                          우선순위: ${p.priority === 'High' ? '높음' : p.priority === 'Medium' ? '보통' : '낮음'}
                        </span>
                      </div>
                      <h3 class="font-bold text-slate-800 text-base group-hover:text-emerald-600 mb-1 leading-snug">${p.name}</h3>
                      <p class="text-xs text-slate-500 line-clamp-2 mb-3">${p.researchGoal || p.description}</p>
                    </div>

                    <div class="space-y-3 pt-3 border-t border-slate-200/60">
                      <!-- Current Focus & Next Action Snippet -->
                      <div class="text-xs space-y-1 bg-white/80 p-2.5 rounded-xl border border-slate-100">
                        <div class="text-slate-600 font-medium truncate flex items-center gap-1.5">
                          <i data-lucide="target" class="w-3.5 h-3.5 text-amber-500 shrink-0"></i>
                          <span class="truncate font-semibold text-slate-700">집중:</span>
                          <span class="truncate text-slate-600">${p.currentFocus || '설정 필요'}</span>
                        </div>
                        <div class="text-slate-600 font-medium truncate flex items-center gap-1.5">
                          <i data-lucide="arrow-right-circle" class="w-3.5 h-3.5 text-emerald-500 shrink-0"></i>
                          <span class="truncate font-semibold text-slate-700">다음:</span>
                          <span class="truncate text-slate-600">${p.nextAction || '설정 필요'}</span>
                        </div>
                      </div>

                      <!-- Progress Bar -->
                      <div>
                        <div class="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                          <span>연구 진행률</span>
                          <span class="text-emerald-700">${p.progress}%</span>
                        </div>
                        <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div class="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-500" style="width: ${p.progress}%"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- 7-Day Research Activity Chart -->
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <i data-lucide="bar-chart-2" class="w-5 h-5 text-emerald-600"></i>
                  <h2 class="text-lg font-bold text-slate-800">최근 7일 연구 활동량 (Research Activity)</h2>
                </div>
                <span class="text-xs text-slate-400">일지 · 실험 · 완료 Task</span>
              </div>
              <div class="h-60 relative">
                <canvas id="activityChart"></canvas>
              </div>
            </div>

          </div>

          <!-- Right 1 Col: Priority Action Tasks & Recent Activity Stream -->
          <div class="space-y-6">
            
            <!-- Priority Tasks -->
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <i data-lucide="zap" class="w-5 h-5 text-amber-500"></i>
                  <h2 class="text-base font-bold text-slate-800">우선순위 연구 행동 (Action Tasks)</h2>
                </div>
                <button id="view-all-tasks-btn" class="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                  전체 (${tasks.filter(t => t.status !== 'Done').length})
                </button>
              </div>

              ${priorityTasks.length === 0 ? `
                <div class="text-center py-8 text-slate-400">
                  <i data-lucide="check-circle" class="w-8 h-8 mx-auto mb-2 text-emerald-400"></i>
                  <p class="text-xs">우선순위 할 일이 모두 완료되었습니다!</p>
                </div>
              ` : `
                <div class="space-y-2.5">
                  ${priorityTasks.map(t => {
                    const proj = store.getProject(t.projectId);
                    return `
                      <div class="p-3 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-emerald-200 transition-all flex items-start gap-3 group">
                        <button class="task-checkbox mt-0.5 w-5 h-5 rounded-lg border border-slate-300 flex items-center justify-center text-transparent hover:text-emerald-500 hover:border-emerald-500 transition-colors" data-id="${t.id}">
                          <i data-lucide="check" class="w-3.5 h-3.5"></i>
                        </button>
                        <div class="flex-1 min-w-0">
                          <div class="text-xs font-bold text-slate-800 group-hover:text-emerald-800 leading-snug truncate">${t.name}</div>
                          <div class="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                            <span class="text-slate-500 truncate max-w-[120px]">${proj ? proj.name : '프로젝트 미지정'}</span>
                            <span>•</span>
                            <span class="text-rose-500 font-medium">${t.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              `}
            </div>

            <!-- Recent Research Timeline Feed -->
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <i data-lucide="history" class="w-5 h-5 text-teal-600"></i>
                  <h2 class="text-base font-bold text-slate-800">최근 연구 타임라인 (Recent Feed)</h2>
                </div>
              </div>

              <div class="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                ${this.renderRecentTimeline()}
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.renderActivityChart();
    this.bindEvents(container);
  }

  renderRecentTimeline() {
    const logs = store.getDailyLogs().slice(0, 2);
    const exps = store.getExperiments().slice(0, 2);
    const papers = store.getLiterature().slice(0, 1);

    const items = [
      ...logs.map(l => ({ type: 'log', date: l.date, title: l.title, sub: l.results || l.workDone, entity: l })),
      ...exps.map(e => ({ type: 'exp', date: e.date, title: e.name, sub: `상태: ${e.status} · ${e.cellId || 'Cell'}`, entity: e })),
      ...papers.map(p => ({ type: 'paper', date: `${p.year}년`, title: p.title, sub: p.relevance || p.summary, entity: p }))
    ].sort((a, b) => (b.date > a.date ? 1 : -1)).slice(0, 4);

    return items.map(item => {
      const typeIcons = {
        log: { icon: 'calendar', color: 'bg-blue-100 text-blue-700', label: '업무일지' },
        exp: { icon: 'flask-conical', color: 'bg-purple-100 text-purple-700', label: '실험/시뮬' },
        paper: { icon: 'book-open', color: 'bg-amber-100 text-amber-700', label: '논문' }
      };
      const meta = typeIcons[item.type];
      return `
        <div class="relative group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
          <div class="absolute -left-[27px] top-2.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-sm"></div>
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${meta.color}">${meta.label}</span>
            <span class="text-[11px] text-slate-400">${item.date}</span>
          </div>
          <div class="text-xs font-bold text-slate-800 group-hover:text-emerald-700 truncate">${item.title}</div>
          <div class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">${item.sub}</div>
        </div>
      `;
    }).join('');
  }

  renderActivityChart() {
    const ctx = document.getElementById('activityChart');
    if (!ctx) return;

    // Generate last 7 days labels
    const days = [];
    const logCounts = [];
    const expCounts = [];
    const taskCounts = [];

    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const displayLabel = `${d.getMonth() + 1}/${d.getDate()}`;
      days.push(displayLabel);

      const logsOnDay = store.getDailyLogs().filter(l => l.date === dateStr).length;
      const expsOnDay = store.getExperiments().filter(e => e.date === dateStr).length;
      const tasksOnDay = store.getTasks().filter(t => t.dueDate === dateStr && t.status === 'Done').length;

      logCounts.push(logsOnDay);
      expCounts.push(expsOnDay);
      taskCounts.push(tasksOnDay);
    }

    if (window.Chart) {
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: days,
          datasets: [
            {
              label: '업무일지',
              data: logCounts,
              backgroundColor: 'rgba(52, 211, 153, 0.8)',
              borderRadius: 6
            },
            {
              label: '실험/시뮬',
              data: expCounts,
              backgroundColor: 'rgba(167, 139, 250, 0.8)',
              borderRadius: 6
            },
            {
              label: '완료 Task',
              data: taskCounts,
              backgroundColor: 'rgba(96, 165, 250, 0.8)',
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                boxWidth: 12,
                font: { family: 'Pretendard', size: 11 }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { family: 'Pretendard', size: 10 } }
            },
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1, font: { family: 'Pretendard', size: 10 } }
            }
          }
        }
      });
    }
  }

  bindEvents(container) {
    // Quick buttons
    container.querySelector('#dash-quick-log').onclick = () => QuickAddModal.open('dailyLog');
    container.querySelector('#dash-quick-task').onclick = () => QuickAddModal.open('task');
    container.querySelector('#dash-quick-exp').onclick = () => QuickAddModal.open('experiment');

    // Navigation links
    container.querySelector('#view-all-projects-btn').onclick = () => this.app.navigate('projects');
    container.querySelector('#view-all-tasks-btn').onclick = () => this.app.navigate('tasks');

    // Project cards click -> Navigate to Project workspace
    container.querySelectorAll('.project-card').forEach(card => {
      card.onclick = () => {
        const id = card.dataset.id;
        this.app.navigate('projects', { selectedProjectId: id });
      };
    });

    // Task quick check
    container.querySelectorAll('.task-checkbox').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        btn.classList.add('checkbox-pop');
        store.toggleTaskStatus(id);
        ModalManager.triggerCelebration();
        ModalManager.showToast('Task를 완료했습니다! 축하합니다 🎉', 'success');
        setTimeout(() => this.render(container), 250);
      };
    });
  }
}
