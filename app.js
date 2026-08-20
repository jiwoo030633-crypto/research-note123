// BatteryLab Research Hub - Main Application Controller
import { store } from './store.js';
import { QuickAddModal } from './components/quickAdd.js';
import { SearchModal } from './components/searchModal.js';
import { DashboardView } from './views/dashboard.js';
import { DailyLogView } from './views/dailyLog.js';
import { ProjectsView } from './views/projects.js';
import { TasksView } from './views/tasks.js';
import { ExperimentsView } from './views/experiments.js';
import { LiteratureView } from './views/literature.js';
import { IdeasView } from './views/ideas.js';
import { WeeklyReviewView } from './views/weeklyReview.js';
import { SettingsView } from './views/settings.js';

class App {
  constructor() {
    this.currentView = 'dashboard';
    this.views = {
      dashboard: new DashboardView(this),
      dailyLog: new DailyLogView(this),
      projects: new ProjectsView(this),
      tasks: new TasksView(this),
      experiments: new ExperimentsView(this),
      literature: new LiteratureView(this),
      ideas: new IdeasView(this),
      weeklyReview: new WeeklyReviewView(this),
      settings: new SettingsView(this)
    };
  }

  init() {
    // Initialize modals
    QuickAddModal.init();
    SearchModal.init((type, id) => this.handleSearchResultNavigation(type, id));

    // Bind sidebar and global events
    this.bindGlobalEvents();

    // Listen to store updates to update sidebar badges
    store.subscribe('*', () => this.updateSidebarBadges());
    this.updateSidebarBadges();

    // Initial render
    this.navigate('dashboard');
  }

  navigate(viewName, params = {}) {
    if (!this.views[viewName]) return;
    this.currentView = viewName;

    // Handle view specific params
    if (viewName === 'projects' && params.selectedProjectId !== undefined) {
      this.views.projects.setSelectedProject(params.selectedProjectId);
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.dataset.view === viewName) {
        link.classList.add('bg-emerald-50', 'text-emerald-800', 'font-bold', 'shadow-sm');
        link.classList.remove('text-slate-600', 'hover:bg-slate-50');
      } else {
        link.classList.remove('bg-emerald-50', 'text-emerald-800', 'font-bold', 'shadow-sm');
        link.classList.add('text-slate-600', 'hover:bg-slate-50');
      }
    });

    // Render view
    const mainContainer = document.getElementById('main-content');
    if (mainContainer) {
      this.views[viewName].render(mainContainer);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.updateSidebarBadges();
  }

  handleSearchResultNavigation(type, id) {
    switch (type) {
      case 'Project':
        this.navigate('projects', { selectedProjectId: id });
        break;
      case 'DailyLog':
        this.views.dailyLog.selectedLogId = id;
        this.navigate('dailyLog');
        break;
      case 'Task':
        this.navigate('tasks');
        break;
      case 'Experiment':
        this.views.experiments.searchQuery = id;
        this.navigate('experiments');
        break;
      case 'Literature':
        this.views.literature.searchQuery = id;
        this.navigate('literature');
        break;
      case 'ResearchIdea':
        this.views.ideas.searchQuery = id;
        this.navigate('ideas');
        break;
    }
  }

  updateSidebarBadges() {
    const projects = store.getProjects();
    const activeCount = projects.filter(p => p.status === 'Active').length;
    const tasks = store.getTasks();
    const pendingTasksCount = tasks.filter(t => t.status !== 'Done').length;
    const exps = store.getExperiments();

    const badgeActiveProjects = document.getElementById('badge-active-projects');
    if (badgeActiveProjects) badgeActiveProjects.textContent = activeCount;

    const badgePendingTasks = document.getElementById('badge-pending-tasks');
    if (badgePendingTasks) badgePendingTasks.textContent = pendingTasksCount;

    const badgeExps = document.getElementById('badge-exps-count');
    if (badgeExps) badgeExps.textContent = exps.length;
  }

  bindGlobalEvents() {
    // Sidebar nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        this.navigate(view);
        // On mobile, close sidebar
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.classList.contains('hidden') && window.innerWidth < 1024) {
          sidebar.classList.add('hidden');
        }
      };
    });

    // Global Search triggers
    const searchBtn = document.getElementById('global-search-trigger');
    if (searchBtn) searchBtn.onclick = () => SearchModal.open();

    const topSearchInput = document.getElementById('top-search-bar');
    if (topSearchInput) topSearchInput.onclick = () => SearchModal.open();

    // Global Quick Add button
    const quickAddBtn = document.getElementById('global-quick-add-btn');
    if (quickAddBtn) quickAddBtn.onclick = () => QuickAddModal.open('dailyLog');

    const floatingAddBtn = document.getElementById('floating-quick-add-btn');
    if (floatingAddBtn) floatingAddBtn.onclick = () => QuickAddModal.open('dailyLog');

    // Mobile menu toggle
    const menuToggleBtn = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggleBtn && sidebar) {
      menuToggleBtn.onclick = () => {
        sidebar.classList.toggle('hidden');
      };
    }
  }
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
  window.app.init();
});
