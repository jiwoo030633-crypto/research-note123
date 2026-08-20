# 🔋 BatteryLab Research Hub (배터리 연구실 개인 연구관리 시스템)

배터리 연구실에서 연구를 수행하는 학부연구생을 위해 특별히 맞춤 설계된 **개인 연구관리 및 업무일지 웹 어플리케이션**입니다.

단순한 To-do 앱이나 직장용 업무관리 툴을 넘어서,
$$\textbf{Project} \longrightarrow \textbf{Task} \longleftrightarrow \textbf{Daily Log} \longleftrightarrow \begin{cases} \textbf{Experiments / COMSOL} \\ \textbf{Literature (Papers)} \\ \textbf{Research Ideas} \end{cases} \longrightarrow \textbf{Result} \longrightarrow \textbf{Next Action}$$
의 연구 흐름을 유기적으로 연결하여 장기적인 연구 맥락과 데이터를 안전하게 추적할 수 있도록 구현되었습니다.

---

## 🌟 주요 기능 소개

1. 📊 **대시보드 (Dashboard)**: 오늘의 집중 연구 과제, 진행 중인 프로젝트 진행률, 최근 7일 연구 활동량 시각화 차트(Chart.js), 우선순위 액션 Task
2. 📝 **연구 업무일지 (Daily Log)**: **Work $\rightarrow$ Result $\rightarrow$ Problem $\rightarrow$ Next Action** 구조화된 아코디언 일지 작성 및 원클릭 Task 자동 등록
3. 📁 **연구 프로젝트 워크스페이스 (Projects)**: 프로젝트별 개요/메모, 전용 Task, 일지, 실험, 논문, 아이디어를 한곳에서 모아보는 Workspace
4. ✅ **연구 Task 관리 (Tasks)**: `Todo`, `In Progress`, `Done`, `Blocked` 4단계 연구 액션 칸반/목록 보드
5. 🧪 **배터리 실험/시뮬레이션 노트 (Experiments)**: 전류밀도($mA/cm^2$), 용량, 전압, 충전 프로토콜, Cell ID 기록 및 **실패한 실험(Failed) 원인 분석(Post-Mortem) 보존**
6. 📚 **연구 연계 논문 관리 (Literature)**: **"★ 이 논문이 내 연구에 왜 중요한가? (Relevance to My Research)"** 및 1클릭 아이디어 도출
7. 💡 **연구 아이디어 및 가설 (Research Ideas)**: 관찰 $\rightarrow$ 가설(Hypothesis) $\rightarrow$ 제안 실험 구조화 및 1클릭 Task/실험 전환
8. 📅 **주간 회고 & 랩미팅 (Weekly Review)**: **"이번 주 데이터 자동 집계"** 및 **"랩미팅용 마크다운 복사"** 기능
9. 🔍 **글로벌 통합 검색 (`Ctrl+K`)**: 프로젝트, 일지, Task, 실험, 논문, 아이디어 실시간 검색
10. ⚙️ **데이터 백업 및 설정 (Settings)**: **JSON 전체 백업/복원** 및 초기 5대 배터리 연구실 샘플 데이터 리셋

---

## 💻 로컬 실행 방법

### 방법 1: 배치 파일 더블클릭 (Windows 사용자 추천)
1. 프로젝트 폴더 내 `run_app.bat` 파일을 더블클릭합니다.
2. 기본 브라우저(Chrome / Edge 등)에서 웹앱이 즉시 실행됩니다.

### 방법 2: 브라우저에서 직접 열기
- `index.html` 파일을 더블클릭하거나 웹 브라우저 창으로 드래그하여 엽니다.

### 방법 3: 로컬 개발 서버 구동 (선택 사항)
```bash
# Node.js가 설치되어 있는 경우
npm run dev
# 또는
npx serve .
```

---

## 🚀 GitHub Push & Vercel 배포 가이드

### 1. Git Push 명령어 (터미널에서 순서대로 실행)

```bash
# 1) 프로젝트 디렉토리로 이동
cd C:\Users\jiwoo\.gemini\antigravity\scratch\battery-research-hub

# 2) Git 초기화 및 파일 스테이징
git init
git add .

# 3) 첫 번째 커밋 생성
git commit -m "feat: 배터리 연구실 개인 연구관리 웹앱 완성 (BatteryLab Research Hub)"

# 4) 기본 브랜치를 main으로 설정
git branch -M main

# 5) 원격 GitHub Repository 연결
git remote add origin https://github.com/jiwoo030633-crypto/research-note.git

# 6) GitHub로 푸시
git push -u origin main --force
```

---

## ✅ Vercel 배포 전 체크리스트

Vercel에서 GitHub Repository를 Import하여 배포할 때 아래 항목을 확인하세요:

- [x] **GitHub Push 완료**: 위의 Git 명령어를 통해 `https://github.com/jiwoo030633-crypto/research-note.git`의 `main` 브랜치에 코드가 정상 푸시되었는지 확인
- [x] **Vercel 설정 파일 준비 완료**: `vercel.json` 및 `package.json`이 프로젝트 루트에 정상 포함되어 있어 빌드 에러 없이 100% 즉시 배포 가능
- [ ] **Vercel 로그인 & Import**:
  1. [Vercel](https://vercel.com)에 로그인합니다.
  2. **Add New...** $\rightarrow$ **Project**를 클릭합니다.
  3. GitHub 계정을 연동하고 **`research-note`** 저장소를 선택(Import)합니다.
- [ ] **Deploy 클릭**:
  - Framework Preset: **Other** (또는 기본값 자동 감지)
  - Root Directory: `./` (기본값)
  - **Deploy** 버튼을 클릭하면 10~20초 내에 전 세계 어디서나 접속 가능한 고유 URL이 생성됩니다.
