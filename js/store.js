// BatteryLab Research Hub - Central Data Store
import {
  INITIAL_CATEGORIES,
  INITIAL_WORK_TYPES,
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_DAILY_LOGS,
  INITIAL_EXPERIMENTS,
  INITIAL_LITERATURE,
  INITIAL_RESEARCH_IDEAS,
  INITIAL_WEEKLY_REVIEWS,
  INITIAL_SETTINGS
} from './sampleData.js';

const STORAGE_KEY_PREFIX = 'battery_hub_';

class Store {
  constructor() {
    this.listeners = new Map();
    this.init();
  }

  init() {
    // Check if initial load is needed
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'initialized')) {
      this.resetToSampleData(false);
    }
  }

  // Subscribe to changes
  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    return () => {
      const arr = this.listeners.get(event) || [];
      this.listeners.set(event, arr.filter(cb => cb !== callback));
    };
  }

  notify(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => {
        try {
          cb(data);
        } catch (e) {
          console.error(`Error in listener for ${event}:`, e);
        }
      });
    }
    // Also notify global wildcard
    if (this.listeners.has('*')) {
      this.listeners.get('*').forEach(cb => {
        try {
          cb({ event, data });
        } catch (e) {
          console.error(`Error in wildcard listener:`, e);
        }
      });
    }
  }

  // Generic local storage helpers
  getItem(key, defaultValue = []) {
    try {
      const val = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      return val ? JSON.parse(val) : defaultValue;
    } catch (e) {
      console.error(`Failed to load ${key} from storage:`, e);
      return defaultValue;
    }
  }

  setItem(key, value) {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to save ${key} to storage:`, e);
    }
  }

  // Reset to initial sample data
  resetToSampleData(notifyAll = true) {
    this.setItem('projects', INITIAL_PROJECTS);
    this.setItem('tasks', INITIAL_TASKS);
    this.setItem('dailyLogs', INITIAL_DAILY_LOGS);
    this.setItem('experiments', INITIAL_EXPERIMENTS);
    this.setItem('literature', INITIAL_LITERATURE);
    this.setItem('ideas', INITIAL_RESEARCH_IDEAS);
    this.setItem('weeklyReviews', INITIAL_WEEKLY_REVIEWS);
    this.setItem('categories', INITIAL_CATEGORIES);
    this.setItem('workTypes', INITIAL_WORK_TYPES);
    this.setItem('settings', INITIAL_SETTINGS);
    localStorage.setItem(STORAGE_KEY_PREFIX + 'initialized', 'true');

    if (notifyAll) {
      this.notify('*', { type: 'RESET_DATA' });
    }
  }

  // --- PROJECTS ---
  getProjects() {
    return this.getItem('projects', []);
  }

  getProject(id) {
    return this.getProjects().find(p => p.id === id) || null;
  }

  addProject(data) {
    const list = this.getProjects();
    const newProject = {
      id: 'proj-' + Date.now(),
      name: data.name || '새 프로젝트',
      category: data.category || '기타',
      type: data.type || 'Sub',
      status: data.status || 'Active',
      priority: data.priority || 'Medium',
      description: data.description || '',
      researchGoal: data.researchGoal || '',
      progress: parseInt(data.progress, 10) || 0,
      currentFocus: data.currentFocus || '',
      nextAction: data.nextAction || '',
      startDate: data.startDate || new Date().toISOString().slice(0, 10),
      targetDate: data.targetDate || '',
      notes: data.notes || '',
      createdAt: new Date().toISOString()
    };
    list.unshift(newProject);
    this.setItem('projects', list);
    this.notify('projects', { action: 'add', item: newProject });
    return newProject;
  }

  updateProject(id, data) {
    const list = this.getProjects();
    const index = list.findIndex(p => p.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...data, updatedAt: new Date().toISOString() };
    this.setItem('projects', list);
    this.notify('projects', { action: 'update', item: list[index] });
    return list[index];
  }

  deleteProject(id) {
    let list = this.getProjects();
    list = list.filter(p => p.id !== id);
    this.setItem('projects', list);
    this.notify('projects', { action: 'delete', id });
  }

  // --- TASKS ---
  getTasks() {
    return this.getItem('tasks', []);
  }

  getTask(id) {
    return this.getTasks().find(t => t.id === id) || null;
  }

  addTask(data) {
    const list = this.getTasks();
    const newTask = {
      id: 'task-' + Date.now(),
      name: data.name || '새 Task',
      projectId: data.projectId || '',
      status: data.status || 'Todo', // Todo | In Progress | Done | Blocked
      priority: data.priority || 'Medium', // High | Medium | Low
      dueDate: data.dueDate || new Date().toISOString().slice(0, 10),
      relatedExpId: data.relatedExpId || '',
      relatedLitId: data.relatedLitId || '',
      relatedIdeaId: data.relatedIdeaId || '',
      notes: data.notes || '',
      createdAt: new Date().toISOString()
    };
    list.unshift(newTask);
    this.setItem('tasks', list);
    this.notify('tasks', { action: 'add', item: newTask });
    return newTask;
  }

  updateTask(id, data) {
    const list = this.getTasks();
    const index = list.findIndex(t => t.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...data, updatedAt: new Date().toISOString() };
    this.setItem('tasks', list);
    this.notify('tasks', { action: 'update', item: list[index] });
    return list[index];
  }

  toggleTaskStatus(id) {
    const task = this.getTask(id);
    if (!task) return null;
    const newStatus = task.status === 'Done' ? 'Todo' : 'Done';
    return this.updateTask(id, { status: newStatus });
  }

  deleteTask(id) {
    let list = this.getTasks();
    list = list.filter(t => t.id !== id);
    this.setItem('tasks', list);
    this.notify('tasks', { action: 'delete', id });
  }

  // --- DAILY LOGS ---
  getDailyLogs() {
    return this.getItem('dailyLogs', []);
  }

  getDailyLog(id) {
    return this.getDailyLogs().find(l => l.id === id) || null;
  }

  addDailyLog(data) {
    const list = this.getDailyLogs();
    const newLog = {
      id: 'log-' + Date.now(),
      date: data.date || new Date().toISOString().slice(0, 10),
      projectId: data.projectId || '',
      title: data.title || '오늘의 연구 일지',
      workTypes: Array.isArray(data.workTypes) ? data.workTypes : ['기타'],
      goal: data.goal || '',
      workDone: data.workDone || '',
      results: data.results || '',
      problems: data.problems || '',
      learnings: data.learnings || '',
      questions: data.questions || '',
      nextAction: data.nextAction || '',
      linkedTaskIds: Array.isArray(data.linkedTaskIds) ? data.linkedTaskIds : [],
      linkedExpIds: Array.isArray(data.linkedExpIds) ? data.linkedExpIds : [],
      linkedLitIds: Array.isArray(data.linkedLitIds) ? data.linkedLitIds : [],
      linkedIdeaIds: Array.isArray(data.linkedIdeaIds) ? data.linkedIdeaIds : [],
      createdAt: new Date().toISOString()
    };
    list.unshift(newLog);
    this.setItem('dailyLogs', list);

    // If next action is provided and user requested auto-task, we can optionally create a task
    if (data.createTaskFromNextAction && data.nextAction && data.projectId) {
      this.addTask({
        name: data.nextAction,
        projectId: data.projectId,
        priority: 'High',
        dueDate: data.date,
        notes: `[일지 ${newLog.date} 연계 Action]`
      });
    }

    this.notify('dailyLogs', { action: 'add', item: newLog });
    return newLog;
  }

  updateDailyLog(id, data) {
    const list = this.getDailyLogs();
    const index = list.findIndex(l => l.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...data, updatedAt: new Date().toISOString() };
    this.setItem('dailyLogs', list);
    this.notify('dailyLogs', { action: 'update', item: list[index] });
    return list[index];
  }

  deleteDailyLog(id) {
    let list = this.getDailyLogs();
    list = list.filter(l => l.id !== id);
    this.setItem('dailyLogs', list);
    this.notify('dailyLogs', { action: 'delete', id });
  }

  // --- EXPERIMENTS ---
  getExperiments() {
    return this.getItem('experiments', []);
  }

  getExperiment(id) {
    return this.getExperiments().find(e => e.id === id) || null;
  }

  addExperiment(data) {
    const list = this.getExperiments();
    const newExp = {
      id: 'exp-' + Date.now(),
      name: data.name || '새 실험/시뮬레이션',
      projectId: data.projectId || '',
      date: data.date || new Date().toISOString().slice(0, 10),
      sampleId: data.sampleId || '',
      cellId: data.cellId || 'CR2032 Coin Cell',
      purpose: data.purpose || '',
      conditions: {
        currentDensity: data.conditions?.currentDensity || '-',
        capacity: data.conditions?.capacity || '-',
        voltageRange: data.conditions?.voltageRange || '-',
        temperature: data.conditions?.temperature || '25 ℃',
        chargingProtocol: data.conditions?.chargingProtocol || 'CC',
        electrolyte: data.conditions?.electrolyte || '1M LiTFSI DOL/DME',
        restTime: data.conditions?.restTime || '-',
        pulseCondition: data.conditions?.pulseCondition || '-'
      },
      protocol: data.protocol || '',
      result: data.result || '',
      problems: data.problems || '',
      conclusion: data.conclusion || '',
      nextAction: data.nextAction || '',
      status: data.status || 'Planned', // Planned | In Progress | Completed | Failed | Need Re-test
      createdAt: new Date().toISOString()
    };
    list.unshift(newExp);
    this.setItem('experiments', list);
    this.notify('experiments', { action: 'add', item: newExp });
    return newExp;
  }

  updateExperiment(id, data) {
    const list = this.getExperiments();
    const index = list.findIndex(e => e.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...data, updatedAt: new Date().toISOString() };
    this.setItem('experiments', list);
    this.notify('experiments', { action: 'update', item: list[index] });
    return list[index];
  }

  deleteExperiment(id) {
    let list = this.getExperiments();
    list = list.filter(e => e.id !== id);
    this.setItem('experiments', list);
    this.notify('experiments', { action: 'delete', id });
  }

  // --- LITERATURE ---
  getLiterature() {
    return this.getItem('literature', []);
  }

  getPaper(id) {
    return this.getLiterature().find(l => l.id === id) || null;
  }

  addLiterature(data) {
    const list = this.getLiterature();
    const newPaper = {
      id: 'lit-' + Date.now(),
      title: data.title || '논문 제목',
      authors: data.authors || '',
      journal: data.journal || '',
      year: parseInt(data.year, 10) || new Date().getFullYear(),
      doi: data.doi || '',
      url: data.url || (data.doi ? `https://doi.org/${data.doi}` : ''),
      projectId: data.projectId || '',
      keywords: Array.isArray(data.keywords) ? data.keywords : (data.keywords ? data.keywords.split(',').map(k => k.trim()) : []),
      summary: data.summary || '',
      keyFinding: data.keyFinding || '',
      importantFigure: data.importantFigure || '',
      relevance: data.relevance || '',
      researchIdea: data.researchIdea || '',
      readingStatus: data.readingStatus || 'To Read', // To Read | Reading | Read | Important
      createdAt: new Date().toISOString()
    };
    list.unshift(newPaper);
    this.setItem('literature', list);
    this.notify('literature', { action: 'add', item: newPaper });
    return newPaper;
  }

  updateLiterature(id, data) {
    const list = this.getLiterature();
    const index = list.findIndex(l => l.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...data, updatedAt: new Date().toISOString() };
    this.setItem('literature', list);
    this.notify('literature', { action: 'update', item: list[index] });
    return list[index];
  }

  deleteLiterature(id) {
    let list = this.getLiterature();
    list = list.filter(l => l.id !== id);
    this.setItem('literature', list);
    this.notify('literature', { action: 'delete', id });
  }

  // --- RESEARCH IDEAS ---
  getIdeas() {
    return this.getItem('ideas', []);
  }

  getIdea(id) {
    return this.getIdeas().find(i => i.id === id) || null;
  }

  addIdea(data) {
    const list = this.getIdeas();
    const newIdea = {
      id: 'idea-' + Date.now(),
      title: data.title || '새 연구 아이디어',
      projectId: data.projectId || '',
      motivation: data.motivation || '',
      observation: data.observation || '',
      hypothesis: data.hypothesis || '',
      proposedExperiment: data.proposedExperiment || '',
      proposedSimulation: data.proposedSimulation || '',
      expectedResult: data.expectedResult || '',
      relatedPaper: data.relatedPaper || '',
      priority: data.priority || 'Medium',
      status: data.status || 'Idea', // Idea | Reviewing | Testing | Validated | Rejected
      createdAt: new Date().toISOString()
    };
    list.unshift(newIdea);
    this.setItem('ideas', list);
    this.notify('ideas', { action: 'add', item: newIdea });
    return newIdea;
  }

  updateIdea(id, data) {
    const list = this.getIdeas();
    const index = list.findIndex(i => i.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...data, updatedAt: new Date().toISOString() };
    this.setItem('ideas', list);
    this.notify('ideas', { action: 'update', item: list[index] });
    return list[index];
  }

  deleteIdea(id) {
    let list = this.getIdeas();
    list = list.filter(i => i.id !== id);
    this.setItem('ideas', list);
    this.notify('ideas', { action: 'delete', id });
  }

  // --- WEEKLY REVIEWS ---
  getWeeklyReviews() {
    return this.getItem('weeklyReviews', []);
  }

  getWeeklyReview(id) {
    return this.getWeeklyReviews().find(r => r.id === id) || null;
  }

  addWeeklyReview(data) {
    const list = this.getWeeklyReviews();
    const newRev = {
      id: 'rev-' + Date.now(),
      weekNumber: data.weekNumber || '주간 회고',
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      title: data.title || '주간 연구 회고',
      completedWork: data.completedWork || '',
      experimentsSummary: data.experimentsSummary || '',
      keyResults: data.keyResults || '',
      literatureNotes: data.literatureNotes || '',
      newIdeas: data.newIdeas || '',
      failedExpAndIssues: data.failedExpAndIssues || '',
      questionsForAdvisor: data.questionsForAdvisor || '',
      nextWeekGoals: data.nextWeekGoals || '',
      createdAt: new Date().toISOString().slice(0, 10)
    };
    list.unshift(newRev);
    this.setItem('weeklyReviews', list);
    this.notify('weeklyReviews', { action: 'add', item: newRev });
    return newRev;
  }

  updateWeeklyReview(id, data) {
    const list = this.getWeeklyReviews();
    const index = list.findIndex(r => r.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...data, updatedAt: new Date().toISOString() };
    this.setItem('weeklyReviews', list);
    this.notify('weeklyReviews', { action: 'update', item: list[index] });
    return list[index];
  }

  deleteWeeklyReview(id) {
    let list = this.getWeeklyReviews();
    list = list.filter(r => r.id !== id);
    this.setItem('weeklyReviews', list);
    this.notify('weeklyReviews', { action: 'delete', id });
  }

  // --- CATEGORIES & WORK TYPES ---
  getCategories() {
    return this.getItem('categories', INITIAL_CATEGORIES);
  }

  addCategory(name, color = 'blue') {
    const list = this.getCategories();
    const id = 'cat-' + Date.now();
    list.push({ id, name, color });
    this.setItem('categories', list);
    this.notify('categories', { action: 'add', item: { id, name, color } });
  }

  getWorkTypes() {
    return this.getItem('workTypes', INITIAL_WORK_TYPES);
  }

  addWorkType(name) {
    const list = this.getWorkTypes();
    if (!list.includes(name)) {
      list.push(name);
      this.setItem('workTypes', list);
      this.notify('workTypes', { action: 'add', name });
    }
  }

  // --- SETTINGS ---
  getSettings() {
    return this.getItem('settings', INITIAL_SETTINGS);
  }

  updateSettings(data) {
    const current = this.getSettings();
    const updated = { ...current, ...data };
    this.setItem('settings', updated);
    this.notify('settings', { action: 'update', item: updated });
    return updated;
  }

  // --- ADVANCED AGGREGATIONS & GRAPH LINKING ---
  getProjectRelatedData(projectId) {
    const project = this.getProject(projectId);
    if (!project) return null;

    const tasks = this.getTasks().filter(t => t.projectId === projectId);
    const dailyLogs = this.getDailyLogs().filter(l => l.projectId === projectId);
    const experiments = this.getExperiments().filter(e => e.projectId === projectId);
    const literature = this.getLiterature().filter(lit => lit.projectId === projectId);
    const ideas = this.getIdeas().filter(i => i.projectId === projectId);

    return {
      project,
      tasks,
      dailyLogs,
      experiments,
      literature,
      ideas
    };
  }

  // Aggregate weekly data automatically for the Weekly Review screen
  getWeeklyAggregatedData(startDate, endDate) {
    const logs = this.getDailyLogs().filter(l => l.date >= startDate && l.date <= endDate);
    const tasks = this.getTasks().filter(t => t.dueDate >= startDate && t.dueDate <= endDate);
    const doneTasks = tasks.filter(t => t.status === 'Done');
    const experiments = this.getExperiments().filter(e => e.date >= startDate && e.date <= endDate);
    const completedExps = experiments.filter(e => e.status === 'Completed');
    const failedExps = experiments.filter(e => e.status === 'Failed' || e.status === 'Need Re-test');
    
    // Aggregated strings
    const completedWork = doneTasks.length > 0 
      ? doneTasks.map(t => `- [완료] ${t.name} (${this.getProject(t.projectId)?.name || '기타'})`).join('\n')
      : logs.map(l => `- ${l.title} (${this.getProject(l.projectId)?.name || '기타'})`).join('\n') || '- 이번 주 완료 항목 없음';

    const experimentsSummary = experiments.length > 0
      ? experiments.map(e => `- [${e.status}] ${e.name} (${e.cellId || 'Cell'}): ${e.purpose || ''}`).join('\n')
      : '- 이번 주 수행한 실험/시뮬레이션 없음';

    const keyResults = logs.filter(l => l.results).map(l => `[${l.date}] ${l.title}:\n${l.results}`).join('\n\n') || '- 기록된 주요 결과 없음';

    const failedExpAndIssues = [
      ...failedExps.map(e => `[실험 이슈] ${e.name} (${e.status}):\n- 원인/문제: ${e.problems}\n- 교훈/대책: ${e.conclusion}`),
      ...logs.filter(l => l.problems).map(l => `[일지 이슈] ${l.title}:\n- ${l.problems}`)
    ].join('\n\n') || '- 특별한 이슈 없음';

    const questionsForAdvisor = logs.filter(l => l.questions).map(l => `[${l.date}] ${l.questions}`).join('\n') || '- 질문 및 안건 없음';

    const nextWeekGoals = logs.filter(l => l.nextAction).map(l => `- ${l.nextAction}`).slice(0, 5).join('\n') || '- 차주 목표를 입력하세요.';

    return {
      logs,
      tasks,
      doneTasks,
      experiments,
      completedExps,
      failedExps,
      templates: {
        completedWork,
        experimentsSummary,
        keyResults,
        failedExpAndIssues,
        questionsForAdvisor,
        nextWeekGoals
      }
    };
  }

  // Global Search across all entities
  globalSearch(query) {
    if (!query || !query.trim()) return [];
    const q = query.trim().toLowerCase();
    const results = [];

    // Projects
    this.getProjects().forEach(p => {
      if (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) {
        results.push({ type: 'Project', title: p.name, subtitle: `${p.category} · ${p.status}`, id: p.id, entity: p });
      }
    });

    // Daily Logs
    this.getDailyLogs().forEach(l => {
      if (l.title.toLowerCase().includes(q) || l.workDone.toLowerCase().includes(q) || l.results.toLowerCase().includes(q) || l.problems.toLowerCase().includes(q)) {
        const proj = this.getProject(l.projectId);
        results.push({ type: 'DailyLog', title: l.title, subtitle: `${l.date} · ${proj ? proj.name : '프로젝트 미지정'}`, id: l.id, entity: l });
      }
    });

    // Tasks
    this.getTasks().forEach(t => {
      if (t.name.toLowerCase().includes(q) || (t.notes && t.notes.toLowerCase().includes(q))) {
        const proj = this.getProject(t.projectId);
        results.push({ type: 'Task', title: t.name, subtitle: `${t.status} · 마감: ${t.dueDate} · ${proj ? proj.name : ''}`, id: t.id, entity: t });
      }
    });

    // Experiments
    this.getExperiments().forEach(e => {
      if (e.name.toLowerCase().includes(q) || e.purpose.toLowerCase().includes(q) || e.result.toLowerCase().includes(q) || (e.sampleId && e.sampleId.toLowerCase().includes(q))) {
        results.push({ type: 'Experiment', title: e.name, subtitle: `${e.status} · ${e.cellId || 'Cell'} · ${e.date}`, id: e.id, entity: e });
      }
    });

    // Literature
    this.getLiterature().forEach(lit => {
      if (lit.title.toLowerCase().includes(q) || lit.authors.toLowerCase().includes(q) || lit.summary.toLowerCase().includes(q) || lit.relevance.toLowerCase().includes(q)) {
        results.push({ type: 'Literature', title: lit.title, subtitle: `${lit.journal} (${lit.year}) · ${lit.readingStatus}`, id: lit.id, entity: lit });
      }
    });

    // Ideas
    this.getIdeas().forEach(i => {
      if (i.title.toLowerCase().includes(q) || i.hypothesis.toLowerCase().includes(q) || i.motivation.toLowerCase().includes(q)) {
        results.push({ type: 'ResearchIdea', title: i.title, subtitle: `상태: ${i.status} · 우선순위: ${i.priority}`, id: i.id, entity: i });
      }
    });

    return results;
  }

  // Export JSON
  exportDataJSON() {
    const data = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      projects: this.getProjects(),
      tasks: this.getTasks(),
      dailyLogs: this.getDailyLogs(),
      experiments: this.getExperiments(),
      literature: this.getLiterature(),
      ideas: this.getIdeas(),
      weeklyReviews: this.getWeeklyReviews(),
      categories: this.getCategories(),
      workTypes: this.getWorkTypes(),
      settings: this.getSettings()
    };
    return JSON.stringify(data, null, 2);
  }

  // Import JSON
  importDataJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.projects) this.setItem('projects', data.projects);
      if (data.tasks) this.setItem('tasks', data.tasks);
      if (data.dailyLogs) this.setItem('dailyLogs', data.dailyLogs);
      if (data.experiments) this.setItem('experiments', data.experiments);
      if (data.literature) this.setItem('literature', data.literature);
      if (data.ideas) this.setItem('ideas', data.ideas);
      if (data.weeklyReviews) this.setItem('weeklyReviews', data.weeklyReviews);
      if (data.categories) this.setItem('categories', data.categories);
      if (data.workTypes) this.setItem('workTypes', data.workTypes);
      if (data.settings) this.setItem('settings', data.settings);
      this.notify('*', { type: 'IMPORT_DATA' });
      return { success: true };
    } catch (e) {
      console.error('Import error:', e);
      return { success: false, error: e.message };
    }
  }
}

export const store = new Store();
