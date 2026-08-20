// BatteryLab Research Hub - Reusable Modal & Toast System

export class ModalManager {
  static open(modalId, onOpenCallback = null) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    if (onOpenCallback) onOpenCallback(modal);
  }

  static close(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  static showToast(message, type = 'success', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgColors = {
      success: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      info: 'bg-blue-50 text-blue-800 border-blue-300',
      warning: 'bg-amber-50 text-amber-800 border-amber-300',
      error: 'bg-rose-50 text-rose-800 border-rose-300'
    };
    const iconNames = {
      success: 'check-circle-2',
      info: 'info',
      warning: 'alert-triangle',
      error: 'x-circle'
    };

    toast.className = `flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium animate-fade-in pointer-events-auto transition-all ${bgColors[type] || bgColors.success}`;
    toast.innerHTML = `
      <i data-lucide="${iconNames[type] || 'check'}" class="w-4 h-4 shrink-0"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  static showConfirm(title, message, onConfirm, confirmText = '확인', cancelText = '취소') {
    let confirmModal = document.getElementById('global-confirm-modal');
    if (!confirmModal) {
      confirmModal = document.createElement('div');
      confirmModal.id = 'global-confirm-modal';
      confirmModal.className = 'fixed inset-0 z-50 modal-backdrop hidden items-center justify-center p-4';
      document.body.appendChild(confirmModal);
    }

    confirmModal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-fade-in">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <i data-lucide="alert-circle" class="w-5 h-5"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-800">${title}</h3>
        </div>
        <p class="text-slate-600 text-sm mb-6 leading-relaxed">${message}</p>
        <div class="flex justify-end gap-2">
          <button id="confirm-cancel-btn" class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">${cancelText}</button>
          <button id="confirm-ok-btn" class="px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-colors">${confirmText}</button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    confirmModal.classList.remove('hidden');
    confirmModal.classList.add('flex');

    const close = () => {
      confirmModal.classList.add('hidden');
      confirmModal.classList.remove('flex');
    };

    confirmModal.querySelector('#confirm-cancel-btn').onclick = () => close();
    confirmModal.querySelector('#confirm-ok-btn').onclick = () => {
      close();
      if (onConfirm) onConfirm();
    };
  }

  static triggerCelebration() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#81C784', '#64B5F6', '#B39DDB', '#F06292', '#FFD54F']
      });
    }
  }
}
