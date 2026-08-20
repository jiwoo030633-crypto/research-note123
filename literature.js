// BatteryLab Research Hub - Literature View (논문 및 문헌 관리)
import { store } from '../store.js';
import { ModalManager } from '../components/modal.js';
import { QuickAddModal } from '../components/quickAdd.js';

export class LiteratureView {
  constructor(app) {
    this.app = app;
    this.filterProjectId = 'All';
    this.filterStatus = 'All';
    this.searchQuery = '';
  }

  render(container) {
    const literature = store.getLiterature();
    const projects = store.getProjects();

    // Filter
    let filtered = literature.filter(lit => {
      if (this.filterProjectId !== 'All' && lit.projectId !== this.filterProjectId) return false;
      if (this.filterStatus !== 'All' && lit.readingStatus !== this.filterStatus) return false;
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        const matchTitle = lit.title && lit.title.toLowerCase().includes(q);
        const matchAuthors = lit.authors && lit.authors.toLowerCase().includes(q);
        const matchSummary = lit.summary && lit.summary.toLowerCase().includes(q);
        const matchRel = lit.relevance && lit.relevance.toLowerCase().includes(q);
        if (!matchTitle && !matchAuthors && !matchSummary && !matchRel) return false;
      }
      return true;
    });

    const statusCounts = {
      Important: literature.filter(l => l.readingStatus === 'Important').length,
      Read: literature.filter(l => l.readingStatus === 'Read').length,
      Reading: literature.filter(l => l.readingStatus === 'Reading').length,
      ToRead: literature.filter(l => l.readingStatus === 'To Read').length
    };

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in pb-16">
        <!-- Top Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="p-2.5 rounded-2xl bg-amber-100 text-amber-800">
              <i data-lucide="book-open" class="w-6 h-6"></i>
            </span>
            <div>
              <h1 class="text-2xl font-bold text-slate-800">연구 연계 논문 관리 (Literature)</h1>
              <p class="text-xs text-slate-500 mt-0.5">단순 서지 정보 저장이 아닌, "이 논문이 내 연구에 왜 중요한가?"를 중심으로 관리합니다.</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button id="btn-add-lit-top" class="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-sm font-semibold shadow-md flex items-center gap-2 btn-press transition-all">
              <i data-lucide="plus-circle" class="w-4 h-4"></i> + 논문 등록
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
            <!-- Status Pills -->
            <div class="flex flex-wrap gap-1.5 font-semibold">
              <button class="lit-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'All' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}" data-status="All">
                전체 (${literature.length})
              </button>
              <button class="lit-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Important' ? 'bg-pink-600 text-white shadow-sm' : 'bg-pink-50 text-pink-700 hover:bg-pink-100'}" data-status="Important">
                ★ 핵심 논문 (${statusCounts.Important})
              </button>
              <button class="lit-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Reading' ? 'bg-blue-600 text-white shadow-sm' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}" data-status="Reading">
                읽는 중 (${statusCounts.Reading})
              </button>
              <button class="lit-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'To Read' ? 'bg-purple-600 text-white shadow-sm' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}" data-status="To Read">
                읽을 예정 (${statusCounts.ToRead})
              </button>
              <button class="lit-status-btn px-3 py-1.5 rounded-xl transition-all ${this.filterStatus === 'Read' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}" data-status="Read">
                완독 (${statusCounts.Read})
              </button>
            </div>

            <!-- Project & Search -->
            <div class="flex items-center gap-2">
              <select id="lit-filter-project" class="px-2.5 py-1.5 border rounded-xl border-slate-200">
                <option value="All">모든 프로젝트</option>
                ${projects.map(p => `<option value="${p.id}" ${this.filterProjectId === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
              </select>
              <input type="text" id="lit-search-input" value="${this.searchQuery}" placeholder="제목, 저자, 내용 검색..." class="px-3 py-1.5 border rounded-xl border-slate-200 focus:outline-none focus:border-amber-500">
            </div>
          </div>
        </div>

        <!-- Papers Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${filtered.length === 0 ? `
            <div class="col-span-full bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-100">
              <i data-lucide="book-dashed" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
              <p class="text-sm font-semibold">조건에 맞는 논문 기록이 없습니다.</p>
            </div>
          ` : filtered.map(lit => {
            const proj = store.getProject(lit.projectId);
            const isImportant = lit.readingStatus === 'Important';
            return `
              <div class="bg-white rounded-3xl p-6 shadow-sm border ${isImportant ? 'border-amber-300 ring-1 ring-amber-100' : 'border-slate-100'} hover:border-amber-300 card-hover transition-all flex flex-col justify-between space-y-4">
                <div>
                  <!-- Badges -->
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-900">
                        ${lit.journal || 'Journal'} (${lit.year || '2024'})
                      </span>
                      ${proj ? `<span class="text-[11px] font-semibold text-slate-500 truncate max-w-[130px]">${proj.name}</span>` : ''}
                    </div>
                    <span class="text-xs px-2.5 py-0.5 rounded-full ${isImportant ? 'bg-pink-100 text-pink-800 font-extrabold' : 'badge-completed'}">
                      ${lit.readingStatus}
                    </span>
                  </div>

                  <!-- Title & Authors -->
                  <h3 class="font-bold text-slate-800 text-base mb-1 leading-snug">
                    ${lit.url ? `<a href="${lit.url}" target="_blank" class="hover:text-amber-700 hover:underline inline-flex items-center gap-1">${lit.title} <i data-lucide="external-link" class="w-3.5 h-3.5 shrink-0 opacity-60"></i></a>` : lit.title}
                  </h3>
                  <p class="text-xs text-slate-400 mb-3">${lit.authors || '-'}</p>

                  <!-- Crucial Relevance Section -->
                  <div class="p-3.5 bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-2xl border border-amber-200 text-xs text-amber-950 mb-3 space-y-1">
                    <div class="font-extrabold text-amber-900 flex items-center gap-1.5">
                      <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-600"></i> ★ 이 논문이 내 연구에 왜 중요한가?
                    </div>
                    <div class="leading-relaxed">${lit.relevance || '내 연구와의 연관성 메모를 작성해주세요.'}</div>
                  </div>

                  <!-- Key Finding / Summary -->
                  ${lit.keyFinding ? `
                    <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 mb-2">
                      <span class="font-bold text-slate-800">💡 핵심 발견:</span> ${lit.keyFinding}
                    </div>
                  ` : ''}

                  <!-- Important Figure Note -->
                  ${lit.importantFigure ? `
                    <div class="text-[11px] text-slate-500 bg-white p-2 rounded-xl border border-slate-100">
                      <span class="font-semibold text-slate-700">🖼️ 중요 Figure:</span> ${lit.importantFigure}
                    </div>
                  ` : ''}
                </div>

                <!-- Footer: DOI Link, Convert to Idea, Edit -->
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2">
                    ${lit.doi ? `<span class="text-[11px] font-mono text-slate-400">DOI: ${lit.doi}</span>` : ''}
                  </div>

                  <div class="flex items-center gap-1.5">
                    <button class="btn-lit-to-idea text-xs font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 px-2.5 py-1 rounded-xl transition-colors flex items-center gap-1" data-id="${lit.id}">
                      <i data-lucide="lightbulb" class="w-3.5 h-3.5"></i> 아이디어 도출
                    </button>
                    <button class="btn-edit-lit text-amber-700 hover:text-amber-900 p-1.5 rounded-lg hover:bg-amber-50" data-id="${lit.id}">
                      <i data-lucide="edit" class="w-4 h-4"></i>
                    </button>
                    <button class="btn-delete-lit text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50" data-id="${lit.id}">
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
    container.querySelector('#btn-add-lit-top').onclick = () => {
      QuickAddModal.open('literature', this.filterProjectId !== 'All' ? this.filterProjectId : '');
    };

    // Status filter
    container.querySelectorAll('.lit-status-btn').forEach(btn => {
      btn.onclick = () => {
        this.filterStatus = btn.dataset.status;
        this.render(container);
      };
    });

    // Project filter
    const projFilter = container.querySelector('#lit-filter-project');
    if (projFilter) {
      projFilter.onchange = (e) => {
        this.filterProjectId = e.target.value;
        this.render(container);
      };
    }

    // Search input
    const searchInput = container.querySelector('#lit-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.searchQuery = e.target.value;
        this.render(container);
      };
    }

    // Convert to idea button
    container.querySelectorAll('.btn-lit-to-idea').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const lit = store.getPaper(id);
        if (lit) {
          QuickAddModal.open('idea', lit.projectId);
          setTimeout(() => {
            const titleInput = document.querySelector('#quick-add-modal input[name="title"]');
            const motivInput = document.querySelector('#quick-add-modal textarea[name="motivation"]');
            if (titleInput) titleInput.value = `[논문 연계 아이디어] ${lit.title.slice(0, 35)}...`;
            if (motivInput) motivInput.value = `참고 논문: ${lit.title} (${lit.journal}, ${lit.year})\n\n논문 핵심 내용: ${lit.keyFinding || lit.summary}\n\n연관성: ${lit.relevance}`;
          }, 100);
        }
      };
    });

    // Delete literature
    container.querySelectorAll('.btn-delete-lit').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        ModalManager.showConfirm('논문 삭제', '이 논문 기록을 삭제하시겠습니까?', () => {
          store.deleteLiterature(id);
          ModalManager.showToast('논문 기록이 삭제되었습니다.', 'info');
          this.render(container);
        });
      };
    });

    // Edit literature
    container.querySelectorAll('.btn-edit-lit').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        this.openEditLitModal(id);
      };
    });
  }

  openEditLitModal(litId) {
    const lit = store.getPaper(litId);
    if (!lit) return;
    const projects = store.getProjects();

    let modalEl = document.getElementById('lit-edit-modal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'lit-edit-modal';
      modalEl.className = 'fixed inset-0 z-50 modal-backdrop hidden items-center justify-center p-4';
      document.body.appendChild(modalEl);
    }

    modalEl.innerHTML = `
      <div class="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 animate-fade-in max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <h3 class="text-base font-bold text-slate-800">논문 정보 및 연구 연관성 수정</h3>
          <button id="close-lit-edit-modal" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>

        <form id="lit-edit-form" class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-slate-600 mb-1">논문 제목</label>
            <input type="text" name="title" value="${lit.title}" required class="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-amber-500 font-bold">
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-semibold text-slate-600 mb-1">저자</label>
              <input type="text" name="authors" value="${lit.authors || ''}" class="w-full px-2.5 py-1.5 border rounded-lg border-slate-200">
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">저널명</label>
              <input type="text" name="journal" value="${lit.journal || ''}" class="w-full px-2.5 py-1.5 border rounded-lg border-slate-200">
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">출판년도</label>
              <input type="number" name="year" value="${lit.year || 2024}" class="w-full px-2.5 py-1.5 border rounded-lg border-slate-200">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-600 mb-1">DOI / URL</label>
              <input type="text" name="doi" value="${lit.doi || ''}" class="w-full px-3 py-2 border rounded-xl border-slate-200">
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">연관 프로젝트</label>
              <select name="projectId" class="w-full px-2 py-2 border rounded-xl border-slate-200">
                ${projects.map(p => `<option value="${p.id}" ${lit.projectId === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
            <label class="block font-bold text-amber-900 mb-1">★ 이 논문이 내 연구에 왜 중요한가? (Relevance to My Research)</label>
            <textarea name="relevance" rows="3" class="w-full px-3 py-2 border rounded-xl border-amber-300 bg-white">${lit.relevance || ''}</textarea>
          </div>

          <div>
            <label class="block font-semibold text-slate-600 mb-1">핵심 발견 (Key Finding)</label>
            <textarea name="keyFinding" rows="2" class="w-full px-3 py-2 border rounded-xl border-slate-200">${lit.keyFinding || ''}</textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-600 mb-1">중요 Figure 메모</label>
              <input type="text" name="importantFigure" value="${lit.importantFigure || ''}" class="w-full px-3 py-2 border rounded-xl border-slate-200">
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">읽기 상태</label>
              <select name="readingStatus" class="w-full px-2 py-2 border rounded-xl border-slate-200">
                <option value="To Read" ${lit.readingStatus === 'To Read' ? 'selected' : ''}>읽을 예정 (To Read)</option>
                <option value="Reading" ${lit.readingStatus === 'Reading' ? 'selected' : ''}>읽는 중 (Reading)</option>
                <option value="Read" ${lit.readingStatus === 'Read' ? 'selected' : ''}>완독 (Read)</option>
                <option value="Important" ${lit.readingStatus === 'Important' ? 'selected' : ''}>★ 핵심 논문 (Important)</option>
              </select>
            </div>
          </div>

          <div class="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button type="button" id="btn-cancel-lit-edit" class="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl">취소</button>
            <button type="submit" class="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-sm">수정 저장</button>
          </div>
        </form>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    ModalManager.open('lit-edit-modal');

    const close = () => ModalManager.close('lit-edit-modal');
    modalEl.querySelector('#close-lit-edit-modal').onclick = close;
    modalEl.querySelector('#btn-cancel-lit-edit').onclick = close;

    modalEl.querySelector('#lit-edit-form').onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const updated = {
        title: fd.get('title'),
        authors: fd.get('authors'),
        journal: fd.get('journal'),
        year: parseInt(fd.get('year'), 10) || 2024,
        doi: fd.get('doi'),
        projectId: fd.get('projectId'),
        relevance: fd.get('relevance'),
        keyFinding: fd.get('keyFinding'),
        importantFigure: fd.get('importantFigure'),
        readingStatus: fd.get('readingStatus')
      };
      store.updateLiterature(litId, updated);
      close();
      ModalManager.showToast('논문 정보가 수정되었습니다!', 'success');
      const mainContainer = document.getElementById('main-content');
      if (mainContainer) this.render(mainContainer);
    };
  }
}
