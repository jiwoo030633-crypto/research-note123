// 배터리 연구실 학부연구생 맞춤형 초기 샘플 데이터 세트
// 모든 텍스트는 연구실 실무에 맞춘 자연스러운 한국어(전문 배터리 용어 병기)로 구성

export const INITIAL_CATEGORIES = [
  { id: 'cat-sim', name: 'COMSOL 시뮬레이션', color: 'blue' },
  { id: 'cat-material', name: '소재 및 전극 코팅', color: 'pink' },
  { id: 'cat-interface', name: 'SEI 및 계면 화학', color: 'mint' },
  { id: 'cat-electrolyte', name: '전해액 및 첨가제', color: 'lavender' },
  { id: 'cat-general', name: '기본 교육 및 스터디', color: 'slate' }
];

export const INITIAL_WORK_TYPES = [
  '실험',
  '시뮬레이션',
  '데이터 분석',
  '논문 / 문헌',
  '미팅',
  'Figure / 발표자료',
  '행정 업무',
  '기타'
];

export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    name: 'Li morphology adaptive protocol',
    category: 'COMSOL 시뮬레이션',
    type: 'Main', // Main | Sub
    status: 'Active', // Active | Planned | On Hold | Completed | Archived
    priority: 'High', // High | Medium | Low
    description: 'COMSOL Multiphysics를 활용한 리튬 음극의 전착 형태(Morphology) 해석 및 덴드라이트 억제를 위한 전류 적응형(Adaptive) 충전 프로토콜 설계 연구',
    researchGoal: '리튬 전착 시 발생하는 국소 과전압과 이온 농도 구배를 실시간 반영하여 덴드라이트 성장을 능동 억제하는 Adaptive 충전 프로토콜 수립 및 시뮬레이션 검증',
    progress: 45,
    currentFocus: 'COMSOL 2D Deformed Geometry 모듈에서 Adaptive 전류 밀도 피드백 알고리즘 파라미터 튜닝',
    nextAction: 'Mesh 해상도 의존성(Mesh dependency) 테스트 및 전류 밀도 구간별 Li+ 농도 프로파일 비교',
    startDate: '2026-07-01',
    targetDate: '2026-10-31',
    notes: '### 연구 배경 및 핵심 가설\n- 고정 전류밀도(Constant Current) 충전 시 팁(Tip) 부분의 전계 집중으로 인해 불균일 전착 발생\n- 표면 전위 구배에 따라 전류를 적응적으로 감쇠시키는 프로토콜 도입 시 평탄한 Li Deposition 유도 가능\n- 교수님 피드백: 시뮬레이션 결과와 실제 코인셀 전착 실험 Figure의 정량적 비교 필요'
  },
  {
    id: 'proj-2',
    name: 'Reflex 최적화 SEI 정량화',
    category: 'COMSOL 시뮬레이션',
    type: 'Sub',
    status: 'Planned',
    priority: 'Medium',
    description: 'Reflex 충전(펄스 충전 + 역펄스 방전) 프로토콜 적용 시 SEI 층의 파괴 및 재생성 거동을 수치해석적으로 정량화하는 연구',
    researchGoal: '역펄스(Depolarization pulse) 인가 조건이 SEI 내 무기물(LiF, Li2O) 및 유기물 층의 균일도와 이온 전도도에 미치는 영향 정량화',
    progress: 15,
    currentFocus: 'COMSOL 기초 교육 예제(Battery with Binary Electrolyte) 수강 및 전기화학 임피던스(EIS) 모델링 스터디',
    nextAction: 'COMSOL 기초교육 3-4차시 예제 실습 완료 및 Reflex 펄스 파형 함수 정의',
    startDate: '2026-08-10',
    targetDate: '2026-11-30',
    notes: 'COMSOL 본사 기초교육 수강 후 기본 예제 파일 기반으로 Reflex 파형(주파수 10Hz~1kHz, Duty cycle 80~95%) 파라미터 분석 예정'
  },
  {
    id: 'proj-3',
    name: 'Li deposition 위치 조절 시뮬레이션',
    category: 'COMSOL 시뮬레이션',
    type: 'Sub',
    status: 'On Hold',
    priority: 'Low',
    description: '3D 다공성 집전체 구조 내에서 리튬이 바닥면(Bottom-up)부터 우선 전착되도록 전계 및 굴절률(Tortuosity)을 제어하는 시뮬레이션 모델',
    researchGoal: '3D 호스트 기공 크기 구배(Pore gradient) 및 전도성 코팅층에 따른 Li 이온 플럭스 집중 위치 제어',
    progress: 20,
    currentFocus: '메쉬 분할 오류 해결 보류 및 선행 논문 지오메트리 파라미터 수집',
    nextAction: 'Li morphology adaptive protocol 본과제 집중 후 9월 중순 재개 예정',
    startDate: '2026-06-15',
    targetDate: '2026-12-15',
    notes: '현재 기공 내부 뾰족한 경계면에서 수렴성(Convergence) 에러 발생 중. 코너 필렛(Fillet) 처리 필요.'
  },
  {
    id: 'proj-4',
    name: 'AQ (anthraquinone) 음극 보호막',
    category: '소재 및 전극 코팅',
    type: 'Sub',
    status: 'Active',
    priority: 'High',
    description: '레독스 활성 유기 분자인 Anthraquinone(AQ)을 리튬 호일에 딥코팅/닥터블레이드로 도입하여 균일한 친리튬성(Lithiophilic) 인공 SEI 보호막 형성',
    researchGoal: '최적 유기 용매 및 코팅 농도 조건을 도출하여 Cu 기판 및 Li 호일 상에 100nm 이하 균일 AQ 유기 보호막 형성 및 대칭셀 수명 500시간 달성',
    progress: 55,
    currentFocus: 'AQ 용해용 무수 용매(DCM vs THF vs Toluene) 후보별 코팅 균일도 및 전극 계면 저항 측정',
    nextAction: 'DCM 용매 기반 AQ 2wt% 코팅 Cu 전극 SEM 단면 분석 및 Li|Li 대칭셀 1mA/cm² 사이클 테스트 조립',
    startDate: '2026-07-15',
    targetDate: '2026-09-30',
    notes: '### 현재 진행 상태 및 핵심 포인트\n- AQ 분말의 용해도: THF > DCM >> Toluene\n- 단, THF는 리튬 호일과 미세 부반응 가능성 있음. DCM에서 가장 건조 속도 빠르고 박막 형성 우수함.\n- 닥터블레이드 간극 50um, 60℃ 진공 건조 오븐 12시간 조건 최적화 중.'
  },
  {
    id: 'proj-5',
    name: 'Multi-anion',
    category: '전해액 및 첨가제',
    type: 'Sub',
    status: 'Planned',
    priority: 'Medium',
    description: 'FSI-, TFSI-, DFOB- 등 복합 음이온 조성을 전해액에 도입하여 고이온전도성 및 기계적 강도가 우수한 LiF/Li3N 복합 SEI 형성 유도',
    researchGoal: 'Dual-salt / Multi-anion 비율에 따른 리튬 쿨롱 효율(Coulombic Efficiency) 향상 메커니즘 규명',
    progress: 10,
    currentFocus: '교수님 추천 Nature Energy 및 Advanced Materials Multi-anion 핵심 논문 분석',
    nextAction: '교수님 추천 논문 2편 완독 후 요약 정리 및 랩미팅 때 예비 실험 계획 보고',
    startDate: '2026-08-01',
    targetDate: '2026-11-15',
    notes: '교수님께서 미팅 때 언급하신 Multi-anion 용매화 구조(Solvation sheath) 관련 논문 정독 필요.'
  }
];

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    name: 'COMSOL adaptive protocol parameter 설정 및 1차 해석',
    projectId: 'proj-1',
    status: 'Done', // Todo | In Progress | Done | Blocked
    priority: 'High',
    dueDate: '2026-08-18',
    relatedExpId: 'exp-sim-1',
    relatedLitId: 'lit-1',
    relatedIdeaId: 'idea-1',
    notes: '과전압 15mV 초과 시 전류를 20% 감쇠시키는 piecewise 함수 적용 완료.'
  },
  {
    id: 'task-2',
    name: 'COMSOL Mesh dependency 확인 및 격자 크기별 수렴도 비교',
    projectId: 'proj-1',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-08-20',
    relatedExpId: 'exp-sim-1',
    relatedLitId: 'lit-1',
    relatedIdeaId: '',
    notes: '경계면 근처 Extremely fine mesh 적용 시 계산 시간 및 Li+ 농도 구배 변화 검증 중.'
  },
  {
    id: 'task-3',
    name: 'COMSOL 기초교육 예제 수행 (전기화학 기초 모듈 3~4차시)',
    projectId: 'proj-2',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2026-08-22',
    relatedExpId: '',
    relatedLitId: '',
    relatedIdeaId: '',
    notes: '1D Butler-Volmer kinetics 예제 따라하기 완료. 2D Nernst-Planck 방정식 실습 중.'
  },
  {
    id: 'task-4',
    name: 'AQ coating solvent 후보 비교 (DCM vs THF 용해도 및 휘발성 테스트)',
    projectId: 'proj-4',
    status: 'Done',
    priority: 'High',
    dueDate: '2026-08-17',
    relatedExpId: 'exp-aq-1',
    relatedLitId: 'lit-2',
    relatedIdeaId: 'idea-2',
    notes: 'DCM이 실온 건조 속도가 가장 균일하며 잔여 용매가 적음을 확인.'
  },
  {
    id: 'task-5',
    name: 'AQ coating concentration 최적화 (0.5wt%, 1wt%, 2wt% 용액 제조)',
    projectId: 'proj-4',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-08-21',
    relatedExpId: 'exp-aq-2',
    relatedLitId: 'lit-2',
    relatedIdeaId: '',
    notes: '글러브박스 안에서 무수 DCM 사용하여 농도별 바이알 3개 제조 완료. Cu 기판 코팅 준비 중.'
  },
  {
    id: 'task-6',
    name: 'AQ coating condition 최적화 (닥터블레이드 속도 및 진공 건조 온도 설정)',
    projectId: 'proj-4',
    status: 'Todo',
    priority: 'Medium',
    dueDate: '2026-08-24',
    relatedExpId: 'exp-aq-2',
    relatedLitId: '',
    relatedIdeaId: '',
    notes: '속도 10mm/s, 20mm/s 비교 및 건조 온도 60℃ vs 80℃ 표면 조도 비교 예정.'
  },
  {
    id: 'task-7',
    name: '교수님 추천 Multi-anion 논문 읽기 및 요약 노트 작성',
    projectId: 'proj-5',
    status: 'Todo',
    priority: 'Medium',
    dueDate: '2026-08-23',
    relatedExpId: '',
    relatedLitId: 'lit-3',
    relatedIdeaId: '',
    notes: 'Nature Energy 2023 논문 읽고 우리 랩의 Ether 전해액 시스템과 접목 방안 도출하기.'
  },
  {
    id: 'task-8',
    name: 'Li morphology 논문 Figure 3 분석 (전류 프로토콜별 덴드라이트 억제 메커니즘)',
    projectId: 'proj-1',
    status: 'Done',
    priority: 'Medium',
    dueDate: '2026-08-16',
    relatedExpId: '',
    relatedLitId: 'lit-1',
    relatedIdeaId: 'idea-1',
    notes: 'Figure 3의 임피던스(EIS) Nyquist plot 반원 크기 변화 수치 추출 완료.'
  },
  {
    id: 'task-9',
    name: '교수님/선배 미팅 질문 정리 (Adaptive 함수 정의 및 실험 셀 파라미터)',
    projectId: 'proj-1',
    status: 'Todo',
    priority: 'High',
    dueDate: '2026-08-21',
    relatedExpId: '',
    relatedLitId: '',
    relatedIdeaId: '',
    notes: '수요일 랩미팅 때 질문할 COMSOL 수렴 오류 해결책 및 AQ 코팅셀 1차 데이터 보고 준비.'
  }
];

export const INITIAL_DAILY_LOGS = [
  {
    id: 'log-1',
    date: '2026-08-19',
    projectId: 'proj-1',
    title: 'COMSOL adaptive protocol parameter 수정 및 농도 구배 확인',
    workTypes: ['시뮬레이션', '데이터 분석'],
    goal: 'Adaptive protocol 파라미터 수정 후 전극 표면 Li+ concentration distribution 안정화 여부 확인',
    workDone: '- COMSOL Tertiary Current Distribution 인터페이스에서 Adaptive 피드백 수식 파라미터 수정\n- 1mA/cm² 기준 초기 5분간 램프(Ramp) 후 국소 과전압에 비례하여 전류 감쇠 루틴 실행\n- 2D 표면 전착 프로파일 시간에 따른 시각화 데이터 렌더링',
    results: '- 과전압 임계값(Threshold)을 15mV로 설정했을 때 Li+ 이온 농도 고갈(Depletion) 영역이 기존 CC 충전 대비 42% 감소함\n- 표면 최대 전착 높이 편차가 8.4um에서 3.1um로 대폭 완화됨',
    problems: '- 돌기(Tip) 첨단부의 급격한 변형으로 인해 t = 1200s 부근에서 Mesh Inversion 에러 발생\n- 자동 리메싱(Automatic Remeshing) 옵션 튜닝 필요',
    learnings: '- COMSOL Deformed Geometry 사용 시 Boundary smoothing 파라미터가 수렴성에 결정적 영향을 준다는 것을 배움\n- 이온 농도가 0에 가까워지면 비선형 과전압이 급증하므로 완충 로그 함수 적용이 유리함',
    questions: '- 랩 선배님께: Deformed Mesh에서 국소 영역 곡률이 클 때 이동 속도 스케일링을 어떻게 잡으시나요?\n- 교수님께: 실제 셀 테스트 시 프로토콜 스위칭 인터벌을 몇 초 단위로 설정하는 것이 potentiostat 하드웨어에 무리가 없는지 여쭙기',
    nextAction: 'Mesh 조건별(Fine vs Coarse) 결과 비교 및 리메싱 인터벌 최적화 테스트',
    linkedTaskIds: ['task-1', 'task-2'],
    linkedExpIds: ['exp-sim-1'],
    linkedLitIds: ['lit-1'],
    linkedIdeaIds: ['idea-1']
  },
  {
    id: 'log-2',
    date: '2026-08-18',
    projectId: 'proj-4',
    title: 'AQ 코팅 용매 후보군 용해도 및 박막 코팅성 평가',
    workTypes: ['실험', '데이터 분석'],
    goal: 'Anthraquinone 분말의 무수 용매(DCM, THF, Toluene)별 완전 용해 한계 농도 및 Cu 포일 도포 상태 비교',
    workDone: '- 아르곤 글러브박스 내에서 DCM, THF, Toluene 각 5mL에 AQ 50mg, 100mg, 150mg 투입 후 1시간 볼텍싱\n- Cu 포일에 닥터블레이드(갭 50um)로 캐스팅 후 핫플레이트 실온/60℃ 건조 거동 관찰\n- 광학현미경(OM)으로 코팅 표면 크랙 및 결정 석출 여부 관찰',
    results: '- DCM: 상온에서 2.5wt%까지 투명하게 용해, 3분 내 균일하게 건조되며 거울 같은 매끄러운 막 형성\n- THF: 3wt% 이상 고용해도를 보이나 건조 속도가 느려 림(Rim) 현상(커피링 효과) 발생\n- Toluene: 0.5wt%에서도 완전 용해 안 되고 침전 발생',
    problems: '- DCM의 높은 휘발성으로 인해 닥터블레이드 코팅 중 블레이드 가장자리에 급격한 용매 증발로 약간의 두께 불균일 발생',
    learnings: '- 저비점 용매(DCM) 사용 시 코팅 챔버 내부 용매 포화 증기압(Vapor Chamber) 분위기 조성이 균일막 형성에 필수적임',
    questions: '- 선배님께: 글러브박스 내에서 코팅 시 용매 증발 속도 조절용 커버 박스 사용법 문의',
    nextAction: 'DCM 기반 AQ 2wt% 용액으로 Cu 포일 5장 정밀 코팅 및 두께(alpha-step) 측정',
    linkedTaskIds: ['task-4', 'task-5'],
    linkedExpIds: ['exp-aq-1'],
    linkedLitIds: ['lit-2'],
    linkedIdeaIds: ['idea-2']
  },
  {
    id: 'log-3',
    date: '2026-08-17',
    projectId: 'proj-1',
    title: 'Li 전착 관련 핵심 논문 Figure 3 심층 분석 및 수식 모델링',
    workTypes: ['논문 / 문헌', '시뮬레이션'],
    goal: 'Energy & Environmental Science 논문의 펄스/적응형 프로토콜 실험 결과와 우리 시뮬레이션 지배방정식 매핑',
    workDone: '- 논문(EES 2024, Adaptive Li Protocol) 원문 정독 및 Supplementary 정보 분석\n- 논문 Figure 3에 제시된 전류 밀도별 SEI 임피던스 $R_{SEI}$와 전하전달저항 $R_{ct}$ 분리 모델링 수식 추출\n- COMSOL의 Surface Charge Reaction 인터페이스에 해당 수식 입력',
    results: '- 전류 감쇠 기울기가 0.15 mA/s 이상일 때 덴드라이트 핵생성 밀도가 60% 이상 억제됨을 논문 데이터에서 확인\n- 우리 COMSOL 모델의 전위 파라미터와 논문의 OCV 커브가 오차 3% 이내로 일치함',
    problems: '- 논문에서는 1M LiPF6 EC/DMC를 사용했으나, 우리 랩은 1M LiTFSI DOL/DME 에테르계를 사용하므로 교환전류밀도($i_0$) 파라미터 보정 필요',
    learnings: '- 카보네이트계와 에테르계 전해액은 Li 이온 탈용매화 에너지(Desolvation energy)가 달라 $i_0$가 약 3배 차이 남',
    questions: '- 교수님께: 우리 랩 에테르 전해액의 정확한 $i_0$ 측정치(지난 번 선배님 논문 데이터) 공유 요청드리기',
    nextAction: '에테르 전해액 파라미터로 수정하여 COMSOL 2차 런 수행',
    linkedTaskIds: ['task-8'],
    linkedExpIds: [],
    linkedLitIds: ['lit-1'],
    linkedIdeaIds: ['idea-1']
  }
];

export const INITIAL_EXPERIMENTS = [
  {
    id: 'exp-sim-1',
    name: 'COMSOL 2D Li Morphology Adaptive 충전 시뮬레이션 Case-01',
    projectId: 'proj-1',
    date: '2026-08-19',
    sampleId: 'SIM-20260819-01',
    cellId: '2D Micro-domain (50um x 100um)',
    purpose: '표면 미세 돌기(높이 2um)가 존재하는 리튬 음극에서 고정 전류(CC) vs Adaptive Protocol 간 Li+ 농도 구배 및 형태 변화 비교',
    conditions: {
      currentDensity: '1.0 mA/cm²',
      capacity: '2.0 mAh/cm²',
      voltageRange: '0 ~ 0.5 V vs Li/Li+',
      temperature: '25 ℃',
      chargingProtocol: 'Adaptive Feedback (Ramp + Overpotential scaling)',
      electrolyte: '1M LiTFSI in DOL/DME (1:1 vol) + 1wt% LiNO3',
      restTime: '10 s',
      pulseCondition: 'Threshold: 15mV, Decay rate: 0.1 mA/s'
    },
    protocol: '1) 0~300s: 1.0 mA/cm² 인가\n2) 300s 이후: 돌기 첨단 과전압 모니터링하여 기준값 초과 시 전류 스케일링\n3) 총 전하량 2.0 mAh/cm² 도달 시 종료',
    result: 'CC 모드에서는 900s 시점에 첨단 전류밀도가 3.8 mA/cm²까지 집중되며 덴드라이트 급성장 발생.\n반면 Adaptive 모드에서는 첨단 전류밀도가 1.4 mA/cm² 이하로 억제되며 평탄한 전착 프로파일 유지.',
    problems: '돌기 첨단 곡률 반경이 작아지면서 이동 경계면 메쉬가 꼬이는 현상(Mesh inversion) 발생.',
    conclusion: 'Adaptive 프로토콜이 전계 집중에 의한 덴드라이트 성장을 효과적으로 완화함을 2D 수치해석으로 입증.',
    nextAction: 'Boundary smoothing 튜닝 및 메쉬 해상도 2배 증가 후 Case-02 해석 수행',
    status: 'Completed' // Planned | In Progress | Completed | Failed | Need Re-test
  },
  {
    id: 'exp-aq-1',
    name: 'AQ 유기 보호막 코팅 용매 적합성 평가 및 박막 모폴로지 분석',
    projectId: 'proj-4',
    date: '2026-08-18',
    sampleId: 'EXP-AQ-SOL-01',
    cellId: 'Cu Foil Substrate (20um thickness)',
    purpose: 'DCM, THF, Toluene 중 리튬 및 구리 기판에 결함 없는 균일 박막을 형성하는 최적 용매 선정',
    conditions: {
      currentDensity: '-',
      capacity: '-',
      voltageRange: '-',
      temperature: '25 ℃ (상온) / 60 ℃ (건조)',
      chargingProtocol: '닥터블레이드 캐스팅 (50um gap, 10mm/s)',
      electrolyte: '무수 DCM / THF / Toluene (with AQ 2wt%)',
      restTime: '진공 건조 12시간',
      pulseCondition: '-'
    },
    protocol: '1) 아르곤 분위기에서 용매별 AQ 2wt% 용액 제조\n2) 세척된 Cu 포일 상에 닥터블레이드로 균일 코팅\n3) 60℃ 진공 오븐에서 12시간 용매 제거\n4) 광학현미경 및 AFM 표면 거칠기(Rq) 측정',
    result: 'DCM 용매 사용 시 표면 거칠기 Rq = 14.2 nm로 매우 균일한 박막 형성 확인.\nTHF는 림 현상으로 Rq = 68.5 nm, Toluene은 미용해 입자 잔류.',
    problems: 'DCM 용매는 건조가 너무 빨라 대면적 코팅 시 가장자리 두께 편차 발생.',
    conclusion: 'AQ 코팅 주 용매로 DCM을 최종 선정함. 증발 속도 제어 챔버 도입 필요.',
    nextAction: 'DCM 기반 코팅 농도(0.5, 1, 2 wt%)별 Li|Cu 비대칭셀 쿨롱효율 테스트 셀 조립',
    status: 'Completed'
  },
  {
    id: 'exp-aq-2',
    name: 'AQ 2wt% 코팅 Cu 전극 Li|Cu 코인셀 쿨롱 효율 평가 (1차)',
    projectId: 'proj-4',
    date: '2026-08-19',
    sampleId: 'CELL-AQ-0819-A',
    cellId: 'CR2032 Coin Cell (Li | Cu)',
    purpose: 'Bare Cu 대비 AQ 코팅 Cu 전극의 초기 쿨롱 효율(ICE) 및 50사이클 쿨롱 효율 유지력 평가',
    conditions: {
      currentDensity: '1.0 mA/cm²',
      capacity: '1.0 mAh/cm²',
      voltageRange: '0 ~ 1.0 V (Cut-off 1.0V vs Li/Li+ for strip)',
      temperature: '25 ℃',
      chargingProtocol: 'CC (Plating 1.0 mAh/cm² -> Stripping to 1.0V)',
      electrolyte: '1M LiTFSI DOL/DME + 1% LiNO3 (40 uL)',
      restTime: '6 시간 (Aging)',
      pulseCondition: '-'
    },
    protocol: '1) CR2032 코인셀 조립 (Bare Cu 2개, AQ-Cu 2개)\n2) 25℃ 챔버에서 6시간 휴지\n3) 0.5 mA/cm² 1사이클 전처리 후 1.0 mA/cm² 연속 사이클링',
    result: '조립 중 셀 1개(A-2)에서 내부 미세 쇼트 발생하여 전압 0.05V에서 멈춤. A-1 셀은 현재 5사이클 정상 진행 중 (초기 CE 97.8% 기록).',
    problems: '코인셀 조립 시 스페이서 압력 불균일로 인한 단락 의심.',
    conclusion: 'AQ 코팅막 자체의 CE 향상 효과는 긍정적이나, 셀 조립 재현성 확보 필요.',
    nextAction: '셀 조립 지그 교체 후 동일 조건 재실험 (A-3, A-4 추가 조립)',
    status: 'Need Re-test'
  },
  {
    id: 'exp-fail-1',
    name: '고농도 AQ (5wt%) THF 용액 고온 딥코팅 평가 (실패 기록 보존)',
    projectId: 'proj-4',
    date: '2026-08-12',
    sampleId: 'EXP-AQ-FAIL-01',
    cellId: 'Li Metal Foil (100um thickness)',
    purpose: 'AQ 고농도 용액에 리튬 호일을 직접 딥코팅하여 두꺼운 보호막을 빠르게 형성 가능한지 확인',
    conditions: {
      currentDensity: '-',
      capacity: '-',
      voltageRange: '-',
      temperature: '50 ℃',
      chargingProtocol: 'Dip coating (침지 30초 후 인출)',
      electrolyte: 'THF with 5wt% AQ',
      restTime: '-',
      pulseCondition: '-'
    },
    protocol: '1) 50℃ 가열된 THF/AQ 용액에 리튬 호일 침지\n2) 30초 후 핀셋으로 인출하여 건조',
    result: '리튬 표면이 검붉은 색으로 급격히 변색되며 거친 찌꺼기 형성. SEM 확인 결과 비가역적 유기 착물 반응으로 호일 표면 심각한 침식 발생.',
    problems: 'THF 용매가 고온에서 리튬과 급격히 반응하며 AQ 라디칼 음이온의 과도한 리튬화로 호일 손상.',
    conclusion: '[원인 분석 및 교훈] 딥코팅 시 40℃ 이상의 가온은 금물이며, 리튬 호일 직접 침지보다는 Cu 기판 선코팅 또는 실온 DCM 스프레이 방식이 적합함을 규명함.',
    nextAction: '직접 침지 방식 폐기, Cu 기판 닥터블레이드 선코팅 방식으로 연구 경로 수정',
    status: 'Failed'
  }
];

export const INITIAL_LITERATURE = [
  {
    id: 'lit-1',
    title: 'Adaptive current protocol for suppressing dendrite growth in lithium metal batteries',
    authors: 'J. Chen, H. Zhang, Y. Liu et al.',
    journal: 'Energy & Environmental Science',
    year: 2024,
    doi: '10.1039/D3EE01234K',
    url: 'https://doi.org/10.1039/D3EE01234K',
    projectId: 'proj-1',
    keywords: ['Lithium dendrite', 'Adaptive protocol', 'COMSOL simulation', 'Electrochemical overpotential'],
    summary: '리튬 전착 시 발생하는 국소 과전압의 동적 변화를 감지하여 충전 전류를 실시간으로 조절하는 적응형 프로토콜을 제안함. 시뮬레이션 및 광학 현미경 실시간 관찰을 통해 덴드라이트 억제 효과를 검증함.',
    keyFinding: '국소 과전압이 20mV 이상 급증할 때 전류를 30% 낮추는 피드백 제어를 통해 3mA/cm² 고전류밀도에서도 덴드라이트 없는 평탄 전착 구현.',
    importantFigure: 'Figure 3 (전류 파형별 덴드라이트 높이 비교), Figure 5 (COMSOL 2D 이온 농도 시뮬레이션 등고선)',
    relevance: '★ [우리 연구와의 직접 연계] 우리 랩의 COMSOL Li morphology adaptive 모델의 지배방정식 및 과전압 피드백 룰(Rule)의 직접적인 이론적 레퍼런스임. 본 논문의 피드백 계수를 벤치마킹하여 우리 시뮬레이션 파라미터를 최적화 중임.',
    researchIdea: '기존 고정 과전압 임계값 대신, 표면 곡률 변화율(Curvature rate)을 함께 고려하는 2차 미분 적응형 알고리즘을 만들면 어떨까?',
    readingStatus: 'Important' // To Read | Reading | Read | Important
  },
  {
    id: 'lit-2',
    title: 'Molecular-level artificial SEI using redox-active anthraquinone for ultra-stable lithium anodes',
    authors: 'K. Park, M. Kim, S. Lee et al.',
    journal: 'Advanced Energy Materials',
    year: 2023,
    doi: '10.1002/aenm.202300987',
    url: 'https://doi.org/10.1002/aenm.202300987',
    projectId: 'proj-4',
    keywords: ['Anthraquinone', 'Artificial SEI', 'Lithiophilic coating', 'Coulombic efficiency'],
    summary: 'Anthraquinone의 카보닐기(C=O)가 리튬 이온과 가역적으로 결합하여 친리튬성 사이트를 제공함으로써 리튬 핵생성 균일도를 극대화하고 전착 과전압을 감소시킴.',
    keyFinding: 'AQ 코팅층이 도입된 Cu 전극은 1mA/cm² 조건에서 99.4%의 높은 쿨롱 효율과 600사이클 이상의 안정성을 보임.',
    importantFigure: 'Figure 2 (DFT 계산을 통한 Li-AQ 흡착 에너지), Figure 4 (SEM 표면 morphology)',
    relevance: '★ [우리 연구와의 연계] AQ 보호막의 작동 메커니즘인 친리튬성 유기 사이트 형성을 증명하는 핵심 논문. 본 논문에서 제시된 코팅 용매와 닥터블레이드 조건을 기초로 우리 실험실 환경에 맞추어 DCM 조건으로 최적화 중임.',
    researchIdea: 'AQ 단독 코팅 대신 무기 LiF 나노입자를 10% 블렌딩한 유-무기 하이브리드 보호막을 만들면 기계적 강도까지 보완될 것 같음.',
    readingStatus: 'Read'
  },
  {
    id: 'lit-3',
    title: 'Multi-anion solvation chemistry enabling fast-charging and long-life lithium metal batteries',
    authors: 'X. Wang, Y. Zhao, Q. Zhang et al.',
    journal: 'Nature Energy',
    year: 2023,
    doi: '10.1038/s41560-023-01345-w',
    url: 'https://doi.org/10.1038/s41560-023-01345-w',
    projectId: 'proj-5',
    keywords: ['Multi-anion', 'Solvation structure', 'Fast charging', 'Inorganic SEI'],
    summary: 'FSI-와 DFOB- 음이온의 상호 작용을 통해 리튬 이온 제1 용매화 껍질(1st Solvation Sheath) 내 음이온 참여도를 높여 초밀도 LiF-B2O3 무기질 복합 SEI 형성을 유도함.',
    keyFinding: '복합 음이온 전해액 적용 시 4C 초고속 충전 조건에서도 1000사이클 동안 88% 용량 유지.',
    importantFigure: 'Figure 1 (MD 시뮬레이션 Solvation 구조), Figure 3 (XPS 깊이 프로파일)',
    relevance: '★ [교수님 추천 논문] 우리 랩 Multi-anion 프로젝트의 핵심 교과서 같은 논문. 향후 전해액 배합 및 XPS 분석 시 SEI 층 조성 해석의 기준 데이터로 활용 예정.',
    researchIdea: '우리 랩의 Ether계 저농도 전해액에 Multi-anion 조성을 소량(5mol%) 첨가했을 때의 계면 저항 변화 측정해보기.',
    readingStatus: 'To Read'
  }
];

export const INITIAL_RESEARCH_IDEAS = [
  {
    id: 'idea-1',
    title: '곡률 변화율(Curvature Rate) 기반 2차 미분 Adaptive 충전 알고리즘',
    projectId: 'proj-1',
    motivation: '기존 과전압 기반 적응형 충전은 덴드라이트가 어느 정도 자란 후 과전압이 튈 때 반응하므로 뒤늦은 감이 있음.',
    observation: 'COMSOL 시뮬레이션 관찰 결과, 덴드라이트 돌기 첨단의 곡률 반경(Radius of curvature)이 1um 이하로 급격히 뾰족해지는 시점에 전계 집중이 폭발적으로 일어남.',
    hypothesis: '표면 곡률의 시간 미분값($d\kappa/dt$)을 실시간 모니터링하여 가속 팽창 직전에 선제적으로 펄스 역전류를 주면 덴드라이트 핵생성 자체를 원천 차단할 수 있을 것이다.',
    proposedExperiment: 'COMSOL 2D 모델에서 곡률 미분 피드백 루프를 수식화하여 일반 Adaptive 대비 전착 평탄도 30% 개선 검증.',
    proposedSimulation: '2D Deformed geometry에서 Boundary curvature export 후 ODE 피드백 결합.',
    expectedResult: '전착 표면 최대 거칠기가 1.5um 이하로 억제되고 전류 감쇠로 인한 충전 시간 지연이 10% 이내로 최소화됨.',
    relatedPaper: 'Energy & Environmental Science (Chen et al., 2024)',
    priority: 'High',
    status: 'Reviewing' // Idea | Reviewing | Testing | Validated | Rejected
  },
  {
    id: 'idea-2',
    title: 'AQ 유기막 + LiF 나노분말 유·무기 복합 인공 SEI 설계',
    projectId: 'proj-4',
    motivation: '유기물 AQ 코팅막은 친리튬성은 매우 우수하나 전단 탄성계수(Shear modulus)가 낮아 고전류밀도에서 물리적 관통 위험이 있음.',
    observation: '기존 논문(Adv. Energy Mater. 2023)에서 순수 AQ막은 1mA/cm²에서는 안정하나 3mA/cm² 이상에서 수명이 급감함.',
    hypothesis: '기계적 강도가 높은 무기 LiF 나노입자(50nm)를 AQ 용액에 10wt% 초음파 분산하여 코팅하면 화학적 친리튬성과 기계적 억제력을 동시에 확보할 수 있을 것이다.',
    proposedExperiment: 'DCM 용매에 AQ 2wt% + nano-LiF 0.2wt% 혼합 분산액 제조 후 Cu 포일에 코팅, 3mA/cm² 고전류밀도 대칭셀 수명 평가.',
    proposedSimulation: '-',
    expectedResult: '3mA/cm², 3mAh/cm² 가혹 조건에서 300시간 이상 단락 없이 안정적 전착/탈리 유지.',
    relatedPaper: 'Advanced Energy Materials (Park et al., 2023)',
    priority: 'Medium',
    status: 'Idea'
  }
];

export const INITIAL_WEEKLY_REVIEWS = [
  {
    id: 'rev-2026-w33',
    weekNumber: '2026년 33주차 (08.17 ~ 08.23)',
    startDate: '2026-08-17',
    endDate: '2026-08-23',
    title: 'COMSOL Adaptive 피드백 수렴 및 AQ 코팅 용매 선정 완료',
    completedWork: `- COMSOL Adaptive protocol 1차 수식 정의 및 1mA/cm² 2D 시뮬레이션 해석 완료
- AQ 유기 보호막용 용매 후보군(DCM, THF, Toluene) 용해도 및 박막 코팅성 비교 실험 완료 (DCM 최종 선정)
- Li 전착 메커니즘 핵심 논문(EES 2024) Figure 3 정밀 분석 및 $i_0$ 파라미터 매핑 완료`,
    experimentsSummary: `- exp-sim-1: COMSOL 2D Adaptive 시뮬레이션 완료 (CC 대비 농도 고갈 영역 42% 감소 확인)
- exp-aq-1: AQ 코팅 용매 적합성 평가 완료 (DCM 박막 거칠기 Rq = 14.2nm 우수)
- exp-aq-2: Li|Cu 코인셀 1차 조립 진행 중 (일부 조립 쇼트 발생으로 재실험 예정)`,
    keyResults: `1. 시뮬레이션 상에서 과전압 15mV 피드백 기반 전류 제어 시 덴드라이트 첨단 높이 편차 60% 이상 완화 입증
2. AQ 보호막 코팅 시 휘발성이 우수한 무수 DCM 용매가 균일 유기 박막 형성에 최적임을 확인`,
    literatureNotes: `- Energy & Environmental Science (2024): Adaptive 전류 프로토콜의 실험적 과전압 임계 기준(15~20mV) 습득
- Nature Energy (2023): Multi-anion 전해액 Solvation 구조 및 XPS 분석 방법론 예습`,
    newIdeas: `- 곡률 변화율($d\kappa/dt$) 기반 2차 미분 선제적 Adaptive 알고리즘 아이디어 도출
- AQ + nano-LiF 유·무기 하이브리드 인공 SEI 복합막 아이디어 도출`,
    failedExpAndIssues: `- exp-aq-2 코인셀 조립 중 스페이서 압력 불균일로 1개 셀 미세 쇼트 발생 -> 조립 지그 교체 필요
- COMSOL t = 1200s 이후 메쉬 역전(Mesh Inversion) 현상 발생 -> 자동 리메싱 파라미터 튜닝 필요`,
    questionsForAdvisor: `1. COMSOL Deformed Mesh에서 돌기 곡률이 급격해질 때 리메싱 인터벌을 어느 정도로 설정하는 것이 수렴성에 가장 안정적인지 조언 부탁드립니다.
2. 우리 랩의 1M LiTFSI DOL/DME 전해액 시스템에서 측정된 교환전류밀도($i_0$) 실험치 레퍼런스가 있는지 여쭙고 싶습니다.
3. AQ 코팅 Cu 전극 1차 사이클 결과 보고 및 SEM 표면 분석(FE-SEM) 예약 승인 요청의 건.`,
    nextWeekGoals: `1. COMSOL Adaptive 시뮬레이션 Mesh 의존성 테스트 및 리메싱 파라미터 안정화
2. AQ 코팅 농도별(0.5, 1, 2 wt%) Li|Cu 코인셀 재조립 및 50사이클 쿨롱 효율 데이터 확보
3. 교수님 추천 Multi-anion 논문 2편 요약 완료 및 랩미팅 발표 준비`,
    createdAt: '2026-08-19'
  }
];

export const INITIAL_SETTINGS = {
  researcherName: '이지우 (학부연구생)',
  labName: '차세대 배터리 소재 및 인터페이스 연구실',
  advisorName: '홍길동 교수님',
  themeAccent: 'mint', // mint | blue | lavender | pink
  dateFormat: 'YYYY-MM-DD'
};
