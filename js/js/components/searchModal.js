// BatteryLab Research Hub - Global Search & Command Palette (Ctrl+K)
import { store } from '../store.js';
import { ModalManager } from './modal.js';

export class SearchModal {
  static init(onNavigateCallback) {
    this.onNavigate = onNavigateCallback;
    let modalEl = document.getElementById('search-modal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'search-modal';
      modalEl.className = 'fixed inset-0 z-50 modal-backdrop hidden items-start justify-center pt-20 p-4';
      document.body.appendChild(modalEl);
    }
    this.modalEl = modalEl;
    this.render();

    // Bind Ctrl+K shortcut
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.open();
      }
      if (e.key === 'Escape' && !this.modalEl.classList.contains('hidden')) {
        this.close();
      }
    });
  }

  static open() {
    this.render();
    ModalManager.open('search-modal');
    const input = this.modalEl.querySelector('#global-search-input');
    if (input) {
      input.value = '';
      input.focus();
    }
    this.performSearch('');
    if (window.lucide) window.lucide.createIcons();
  }

  static close() {
    ModalManager.close('search-modal');
  }

  static render() {
    this.modalEl.innerHTML = `
      <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 animate-fade-in overflow-hidden flex flex-col">
        <!-- Search Input Bar -->
        <div class="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <i data-lucide="search" class="w-5 h-5 text-slate-400 shrink-0"></i>
          <input 
            type="text" 
            id="global-search-input" 
            placeholder="연구 프로젝트, 업무일지, 실험 데이터, 논문, 아이디어 검색... (Ctrl+K)" 
            class="w-full bg-transparent text-sm text-slate-800 focus:outline-none placeholder:text-slate-400"
            autocomplete="off"
          />
          <kbd class="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono shrink-0">ESC</kbd>
        </div>

        <!-- Search Results / Quick Actions List -->
        <div id="search-results-container" class="max-h-96 overflow-y-auto p-3 space-y-1">
          <!-- Populated dynamically -->
        </div>

        <!-- Footer Shortcuts Info -->
        <div class="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div class="flex items-center gap-2">
            <span>단축키:</span>
            <span class="bg-white px-1.5 py-0.5 rounded border text-[11px]">↑↓ 이동</span>
            <span class="bg-white px-1.5 py-0.5 rounded border text-[11px]">Enter 선택</span>
          </div>
          <span class="text-slate-400">BatteryLab Research Hub Search</span>
        </div>
      </div>
    `;

    const input = this.modalEl.querySelector('#global-search-input');
    input.oninput = (e) => {
      this.performSearch(e.target.value);
    };

    // Close on backdrop click
    this.modalEl.onclick = (e) => {
      if (e.target === this.modalEl) this.close();
    };
  }

  static performSearch(query) {
    const container = this.modalEl.querySelector('#search-results-container');
    if (!container) return;

    if (!query || !query.trim()) {
      // Default recent or quick suggestions
      const projects = store.getProjects().slice(0, 3);
      container.innerHTML = `
        <div class="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">주요 프로젝트 바로가기</div>
        ${projects.map(p => `
          <div class="search-item flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors group" data-type="Project" data-id="${p.id}">
            <div class="flex items-center gap-3">
              <span class="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs"><i data-lucide="folder" class="w-4 h-4"></i></span>
              <div>
                <div class="text-sm font-semibold text-slate-800 group-hover:text-emerald-900">${p.name}</div>
                <div class="text-xs text-slate-500">${p.category} · ${p.type === 'Main' ? '주과제' : '서브'}</div>
              </div>
            </div>
            <span class="text-xs px-2 py-0.5 rounded-full badge-${p.status.toLowerCase().replace(/\s+/g, '')}">${p.status}</span>
          </div>
        `).join('')}
        <div class="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">검색 팁</div>
        <div class="text-xs text-slate-500 px-3 pb-2 space-y-1">
          <p>• "Li morphology", "COMSOL", "SEI", "DCM", "AQ" 등 키워드로 전체 검색이 가능합니다.</p>
        </div>
      `;
    } else {
      const results = store.globalSearch(query);
      if (results.length === 0) {
        container.innerHTML = `
          <div class="p-8 text-center text-slate-400">
            <i data-lucide="help-circle" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
            <p class="text-sm font-medium">검색 결과가 없습니다: "${query}"</p>
            <p class="text-xs mt-1 text-slate-400">다른 배터리 연구 키워드로 검색해보세요.</p>
          </div>
        `;
      } else {
        const typeLabels = {
          Project: { label: '프로젝트', color: 'bg-emerald-100 text-emerald-800', icon: 'folder' },
          DailyLog: { label: '업무일지', color: 'bg-blue-100 text-blue-800', icon: 'calendar' },
          Task: { label: 'Task', color: 'bg-purple-100 text-purple-800', icon: 'check-square' },
          Experiment: { label: '실험/시뮬', color: 'bg-amber-100 text-amber-800', icon: 'flask-conical' },
          Literature: { label: '논문', color: 'bg-rose-100 text-rose-800', icon: 'book-open' },
          ResearchIdea: { label: '아이디어', color: 'bg-indigo-100 text-indigo-800', icon: 'lightbulb' }
        };

        container.innerHTML = results.map(item => {
          const meta = typeLabels[item.type] || { label: item.type, color: 'bg-slate-100 text-slate-800', icon: 'file' };
          return `
            <div class="search-item flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors group" data-type="${item.type}" data-id="${item.id}">
              <div class="flex items-center gap-3 overflow-hidden">
                <span class="p-2 rounded-lg ${meta.color} shrink-0">
                  <i data-lucide="${meta.icon}" class="w-4 h-4"></i>
                </span>
                <div class="truncate">
                  <div class="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 truncate">${item.title}</div>
                  <div class="text-xs text-slate-500 truncate">${item.subtitle}</div>
                </div>
              </div>
              <span class="text-[11px] font-medium px-2 py-0.5 rounded ${meta.color} shrink-0 ml-2">${meta.label}</span>
            </div>
          `;
        }).join('');
      }
    }

    if (window.lucide) window.lucide.createIcons();

    // Click handler for items
    container.querySelectorAll('.search-item').forEach(item => {
      item.onclick = () => {
        const type = item.dataset.type;
        const id = item.dataset.id;
        this.close();
        if (this.onNavigate) {
          this.onNavigate(type, id);
        }
      };
    });
  }
}
