// BatteryLab Research Hub - Settings View (설정 및 데이터 백업/복원)
import { store } from '../store.js';
import { ModalManager } from '../components/modal.js';

export class SettingsView {
  constructor(app) {
    this.app = app;
  }

  render(container) {
    const settings = store.getSettings();
    const categories = store.getCategories();
    const workTypes = store.getWorkTypes();

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in pb-16 max-w-4xl mx-auto">
        <!-- Top Title Bar -->
        <div class="flex items-center gap-3">
          <span class="p-2.5 rounded-2xl bg-slate-200 text-slate-700">
            <i data-lucide="settings" class="w-6 h-6"></i>
          </span>
          <div>
            <h1 class="text-2xl font-bold text-slate-800">환경 설정 및 데이터 관리 (Settings)</h1>
            <p class="text-xs text-slate-500 mt-0.5">연구실 프로필, 연구 카테고리, 전체 데이터 백업(JSON) 및 초기화를 관리합니다.</p>
          </div>
        </div>

        <!-- 1. Researcher Profile Settings -->
        <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4">
          <div class="flex items-center gap-2 pb-3 border-b border-slate-100">
            <i data-lucide="user" class="w-5 h-5 text-emerald-600"></i>
            <h2 class="text-base font-bold text-slate-800">연구생 및 연구실 기본 정보</h2>
          </div>

          <form id="profile-settings-form" class="space-y-4 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block font-semibold text-slate-600 mb-1">연구생 이름</label>
                <input type="text" name="researcherName" value="${settings.researcherName || ''}" class="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500 font-bold">
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">연구실 명칭 (Lab Name)</label>
                <input type="text" name="labName" value="${settings.labName || ''}" class="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500">
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">지도교수님 성함</label>
                <input type="text" name="advisorName" value="${settings.advisorName || ''}" class="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:border-emerald-500">
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <button type="submit" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm btn-press transition-all">
                프로필 저장
              </button>
            </div>
          </form>
        </div>

        <!-- 2. Categories & Work Types Customization -->
        <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
          <div class="flex items-center gap-2 pb-3 border-b border-slate-100">
            <i data-lucide="tag" class="w-5 h-5 text-indigo-600"></i>
            <h2 class="text-base font-bold text-slate-800">연구 카테고리 및 업무 유형 커스텀</h2>
          </div>

          <!-- Categories List -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-slate-700">프로젝트 카테고리 (${categories.length})</span>
            </div>
            <div class="flex flex-wrap gap-2 mb-3">
              ${categories.map(c => `
                <span class="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span>${c.name}</span>
                </span>
              `).join('')}
            </div>

            <!-- Add Category Input -->
            <div class="flex gap-2 max-w-sm">
              <input type="text" id="new-cat-input" placeholder="새 카테고리명 (예: 전고체 배터리)" class="text-xs px-3 py-1.5 border rounded-xl border-slate-200 flex-1">
              <button id="btn-add-cat" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl btn-press">
                추가
              </button>
            </div>
          </div>

          <!-- Work Types List -->
          <div class="pt-4 border-t border-slate-100">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-slate-700">업무일지 활동 유형 (Work Types)</span>
            </div>
            <div class="flex flex-wrap gap-2 mb-3">
              ${workTypes.map(wt => `
                <span class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  ${wt}
                </span>
              `).join('')}
            </div>

            <!-- Add Work Type Input -->
            <div class="flex gap-2 max-w-sm">
              <input type="text" id="new-wt-input" placeholder="새 업무 유형 (예: 세미나)" class="text-xs px-3 py-1.5 border rounded-xl border-slate-200 flex-1">
              <button id="btn-add-wt" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl btn-press">
                추가
              </button>
            </div>
          </div>
        </div>

        <!-- 3. Data Backup, Restore & Reset -->
        <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4">
          <div class="flex items-center gap-2 pb-3 border-b border-slate-100">
            <i data-lucide="database" class="w-5 h-5 text-purple-600"></i>
            <h2 class="text-base font-bold text-slate-800">데이터 백업, 복원 및 초기화</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Backup JSON -->
            <div class="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2 flex flex-col justify-between">
              <div>
                <div class="font-bold text-xs text-slate-800">전체 데이터 백업 (JSON)</div>
                <p class="text-[11px] text-slate-500 mt-1">모든 프로젝트, 일지, 실험, 논문, 아이디어를 JSON 파일로 안전하게 다운로드합니다.</p>
              </div>
              <button id="btn-export-json" class="w-full mt-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 btn-press">
                <i data-lucide="download" class="w-3.5 h-3.5"></i> 백업 파일 다운로드
              </button>
            </div>

            <!-- Restore JSON -->
            <div class="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2 flex flex-col justify-between">
              <div>
                <div class="font-bold text-xs text-slate-800">데이터 복원 (JSON)</div>
                <p class="text-[11px] text-slate-500 mt-1">이전에 백업해둔 JSON 파일을 불러와 데이터를 복구합니다.</p>
              </div>
              <div>
                <input type="file" id="import-json-file" accept=".json" class="hidden">
                <button id="btn-import-json" class="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 btn-press">
                  <i data-lucide="upload" class="w-3.5 h-3.5"></i> JSON 파일 불러오기
                </button>
              </div>
            </div>

            <!-- Reset to Initial Sample Data -->
            <div class="p-5 rounded-2xl border border-rose-100 bg-rose-50/30 space-y-2 flex flex-col justify-between">
              <div>
                <div class="font-bold text-xs text-rose-800">초기 연구실 샘플로 리셋</div>
                <p class="text-[11px] text-rose-600 mt-1">배터리 연구실 5대 초기 프로젝트(Li morphology, AQ 등) 데이터 세트로 초기화합니다.</p>
              </div>
              <button id="btn-reset-sample" class="w-full mt-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 btn-press">
                <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> 초기 데이터로 리셋
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.bindEvents(container);
  }

  bindEvents(container) {
    // Profile save
    const profileForm = container.querySelector('#profile-settings-form');
    profileForm.onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(profileForm);
      store.updateSettings({
        researcherName: fd.get('researcherName'),
        labName: fd.get('labName'),
        advisorName: fd.get('advisorName')
      });
      ModalManager.showToast('연구실 프로필 정보가 저장되었습니다!', 'success');
    };

    // Add category
    const catInput = container.querySelector('#new-cat-input');
    const btnAddCat = container.querySelector('#btn-add-cat');
    btnAddCat.onclick = () => {
      const val = catInput.value.trim();
      if (val) {
        store.addCategory(val);
        catInput.value = '';
        ModalManager.showToast(`카테고리 "${val}"가 추가되었습니다.`, 'success');
        this.render(container);
      }
    };

    // Add work type
    const wtInput = container.querySelector('#new-wt-input');
    const btnAddWt = container.querySelector('#btn-add-wt');
    btnAddWt.onclick = () => {
      const val = wtInput.value.trim();
      if (val) {
        store.addWorkType(val);
        wtInput.value = '';
        ModalManager.showToast(`업무 유형 "${val}"가 추가되었습니다.`, 'success');
        this.render(container);
      }
    };

    // Export JSON
    container.querySelector('#btn-export-json').onclick = () => {
      const jsonStr = store.exportDataJSON();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BatteryLab_Backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      ModalManager.showToast('백업 파일이 다운로드되었습니다!', 'success');
    };

    // Import JSON
    const fileInput = container.querySelector('#import-json-file');
    const btnImport = container.querySelector('#btn-import-json');
    btnImport.onclick = () => fileInput.click();

    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = store.importDataJSON(event.target.result);
        if (res.success) {
          ModalManager.triggerCelebration();
          ModalManager.showToast('데이터 복원이 완료되었습니다!', 'success');
          this.render(container);
        } else {
          ModalManager.showToast('복원 실패: 올바른 JSON 형식이 아닙니다.', 'error');
        }
      };
      reader.readAsText(file);
    };

    // Reset to Sample Data
    container.querySelector('#btn-reset-sample').onclick = () => {
      ModalManager.showConfirm(
        '초기 샘플 데이터 리셋',
        '현재 데이터가 배터리 연구실 5대 초기 프로젝트 및 샘플 데이터로 복원됩니다. 계속하시겠습니까?',
        () => {
          store.resetToSampleData(true);
          ModalManager.showToast('초기 배터리 연구 샘플 데이터로 복원되었습니다.', 'success');
          this.render(container);
        }
      );
    };
  }
}
