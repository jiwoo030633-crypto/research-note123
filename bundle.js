// BatteryLab Research Hub - Standalone Universal Bundle (file:// and http:// 100% 호환)
(function () {
  'use strict';

  // --- 1. INITIAL SAMPLE DATA ---
  const INITIAL_CATEGORIES = [
    { id: 'cat-sim', name: 'COMSOL 시뮬레이션', color: 'blue' },
    { id: 'cat-material', name: '소재 및 전극 코팅', color: 'pink' },
    { id: 'cat-interface', name: 'SEI 및 계면 화학', color: 'mint' },
    { id: 'cat-electrolyte', name: '전해액 및 첨가제', color: 'lavender' },
    { id: 'cat-general', name: '기본 교육 및 스터디', color: 'slate' }
  ];

  const INITIAL_WORK_TYPES = [
    '실험',
    '시뮬레이션',
    '데이터 분석',
    '논문 / 문헌',
    '미팅',
    'Figure / 발표자료',
    '행정 업무',
    '기타'
  ];

  const INITIAL_PROJECTS = [
    {
      id: 'proj-1',
      name: 'Li morphology adaptive protocol',
      category: 'COMSOL 시뮬레이션',
      type: 'Main',
      status: 'Active',
      priority: 'High',
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

  const INITIAL_TASKS = [
    {
      id: 'task-1',
      name: 'COMSOL adaptive protocol parameter 설정 및 1차 해석',
      projectId: 'proj-1',
      status: 'Done',
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

  const INITIAL_DAILY_LOGS = [
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

  const INITIAL_EXPERIMENTS = [
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
      status: 'Completed'
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

  const INITIAL_LITERATURE = [
    {
      id: 'lit-1',
      title: 'Adaptive current protocol for suppressing dendrite growth in lithium metal batteries',
      authors: 'J. Chen, H. Zhang, Y. Liu et al.',
      journal: 'Energy & Environmental Science',
      year: 2024,
      doi: '10.1039/D3EE01234K',
      url: 'https://doi.org/10.1039/D3EE01234K',
      projectId: 'proj-1',
      keywords: ['Lithium dendrite', 'Adaptive protocol', 'COMSOL simulation'],
      summary: '리튬 전착 시 발생하는 국소 과전압의 동적 변화를 감지하여 충전 전류를 실시간으로 조절하는 적응형 프로토콜을 제안함.',
      keyFinding: '국소 과전압 20mV 이상 급증 시 전류 30% 감쇠 피드백으로 평탄 전착 구현.',
      importantFigure: 'Figure 3 (전류 파형별 덴드라이트 높이 비교)',
      relevance: '★ [우리 연구와의 직접 연계] 우리 랩의 COMSOL Li morphology adaptive 모델의 지배방정식 및 과전압 피드백 룰(Rule)의 직접 레퍼런스임.',
      readingStatus: 'Important'
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
      keywords: ['Anthraquinone', 'Artificial SEI'],
      summary: 'Anthraquinone의 카보닐기가 리튬 이온과 가역적으로 결합하여 친리튬성 사이트를 제공함으로써 리튬 핵생성 균일도를 극대화함.',
      keyFinding: 'AQ 코팅 Cu 전극 1mA/cm²에서 99.4% 쿨롱 효율과 600사이클 달성.',
      importantFigure: 'Figure 2 (DFT 계산 Li-AQ 흡착 에너지)',
      relevance: '★ [우리 연구와의 연계] AQ 보호막의 작동 메커니즘인 친리튬성 유기 사이트 형성을 증명하는 핵심 논문.',
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
      keywords: ['Multi-anion', 'Solvation structure'],
      summary: 'FSI-와 DFOB- 음이온 상호작용으로 초밀도 LiF-B2O3 무기질 복합 SEI 형성 유도.',
      keyFinding: '4C 초고속 충전 조건에서도 1000사이클 동안 88% 용량 유지.',
      importantFigure: 'Figure 1 (MD 시뮬레이션 Solvation 구조)',
      relevance: '★ [교수님 추천 논문] 우리 랩 Multi-anion 프로젝트의 핵심 교과서 같은 논문.',
      readingStatus: 'To Read'
    }
  ];

  const INITIAL_RESEARCH_IDEAS = [
    {
      id: 'idea-1',
      title: '곡률 변화율(Curvature Rate) 기반 2차 미분 Adaptive 충전 알고리즘',
      projectId: 'proj-1',
      motivation: '기존 과전압 기반 적응형 충전은 덴드라이트가 어느 정도 자란 후 과전압이 튈 때 반응하므로 뒤늦은 감이 있음.',
      observation: 'COMSOL 시뮬레이션 관찰 결과, 돌기 첨단의 곡률 반경이 1um 이하로 급격히 뾰족해지는 시점에 전계 집중 폭발.',
      hypothesis: '표면 곡률의 시간 미분값(dκ/dt)을 모니터링하여 선제적으로 펄스 역전류를 주면 덴드라이트 핵생성을 원천 차단할 수 있을 것이다.',
      proposedExperiment: 'COMSOL 2D 모델에서 곡률 미분 피드백 루프를 수식화하여 일반 Adaptive 대비 전착 평탄도 30% 개선 검증.',
      expectedResult: '전착 표면 최대 거칠기 1.5um 이하 억제 및 충전 지연 10% 이내 최소화.',
      priority: 'High',
      status: 'Reviewing'
    },
    {
      id: 'idea-2',
      title: 'AQ 유기막 + LiF 나노분말 유·무기 복합 인공 SEI 설계',
      projectId: 'proj-4',
      motivation: '유기물 AQ 코팅막은 친리튬성은 우수하나 전단 탄성계수가 낮아 고전류밀도에서 관통 위험이 있음.',
      observation: '기존 논문에서 순수 AQ막은 3mA/cm² 이상에서 수명이 급감함.',
      hypothesis: '기계적 강도가 높은 무기 LiF 나노입자(50nm)를 AQ 용액에 10wt% 혼합 코팅하면 화학적 친리튬성과 기계적 억제력을 동시 확보할 수 있을 것이다.',
      proposedExperiment: 'DCM 용매에 AQ 2wt% + nano-LiF 0.2wt% 혼합 분산액 제조 후 Cu 포일 코팅.',
      expectedResult: '3mA/cm², 3mAh/cm² 가혹 조건에서 300시간 이상 단락 없이 안정적 수명 유지.',
      priority: 'Medium',
      status: 'Idea'
    }
  ];

  const INITIAL_WEEKLY_REVIEWS = [
    {
      id: 'rev-2026-w33',
      weekNumber: '2026년 33주차 (08.17 ~ 08.23)',
      startDate: '2026-08-17',
      endDate: '2026-08-23',
      title: 'COMSOL Adaptive 피드백 수렴 및 AQ 코팅 용매 선정 완료',
      completedWork: `- COMSOL Adaptive protocol 1차 수식 정의 및 1mA/cm² 2D 시뮬레이션 해석 완료
- AQ 유기 보호막용 용매 후보군(DCM, THF, Toluene) 용해도 및 박막 코팅성 비교 실험 완료 (DCM 최종 선정)
- Li 전착 메커니즘 핵심 논문(EES 2024) Figure 3 정밀 분석 및 i0 파라미터 매핑 완료`,
      experimentsSummary: `- exp-sim-1: COMSOL 2D Adaptive 시뮬레이션 완료 (CC 대비 농도 고갈 영역 42% 감소 확인)
- exp-aq-1: AQ 코팅 용매 적합성 평가 완료 (DCM 박막 거칠기 Rq = 14.2nm 우수)
- exp-aq-2: Li|Cu 코인셀 1차 조립 진행 중 (일부 조립 쇼트 발생으로 재실험 예정)`,
      keyResults: `1. 시뮬레이션 상에서 과전압 15mV 피드백 기반 전류 제어 시 덴드라이트 첨단 높이 편차 60% 이상 완화 입증
2. AQ 보호막 코팅 시 휘발성이 우수한 무수 DCM 용매가 균일 유기 박막 형성에 최적임을 확인`,
      literatureNotes: `- Energy & Environmental Science (2024): Adaptive 전류 프로토콜의 실험적 과전압 임계 기준 습득
- Nature Energy (2023): Multi-anion 전해액 Solvation 구조 및 XPS 분석 방법론 예습`,
      newIdeas: `- 곡률 변화율(dκ/dt) 기반 2차 미분 선제적 Adaptive 알고리즘 아이디어 도출
- AQ + nano-LiF 유·무기 하이브리드 인공 SEI 복합막 아이디어 도출`,
      failedExpAndIssues: `- exp-aq-2 코인셀 조립 중 스페이서 압력 불균일로 1개 셀 미세 쇼트 발생 -> 조립 지그 교체 필요
- COMSOL t = 1200s 이후 메쉬 역전 현상 발생 -> 자동 리메싱 파라미터 튜닝 필요`,
      questionsForAdvisor: `1. COMSOL Deformed Mesh에서 돌기 곡률이 급격해질 때 리메싱 인터벌을 어느 정도로 설정하는 것이 수렴성에 가장 안정적인지 조언 부탁드립니다.
2. 우리 랩의 1M LiTFSI DOL/DME 전해액 시스템에서 측정된 교환전류밀도(i0) 실험치 레퍼런스가 있는지 여쭙고 싶습니다.
3. AQ 코팅 Cu 전극 1차 사이클 결과 보고 및 SEM 표면 분석(FE-SEM) 예약 승인 요청의 건.`,
      nextWeekGoals: `1. COMSOL Adaptive 시뮬레이션 Mesh 의존성 테스트 및 리메싱 파라미터 안정화
2. AQ 코팅 농도별(0.5, 1, 2 wt%) Li|Cu 코인셀 재조립 및 50사이클 쿨롱 효율 데이터 확보
3. 교수님 추천 Multi-anion 논문 2편 요약 완료 및 랩미팅 발표 준비`,
      createdAt: '2026-08-19'
    }
  ];

  const INITIAL_SETTINGS = {
    researcherName: '이지우 (학부연구생)',
    labName: '차세대 배터리 소재 및 인터페이스 연구실',
    advisorName: '홍길동 교수님',
    themeAccent: 'mint',
    dateFormat: 'YYYY-MM-DD'
  };

  // --- 2. CENTRAL STORE ---
  const STORAGE_KEY_PREFIX = 'battery_hub_';

  class Store {
    constructor() {
      this.listeners = new Map();
      this.init();
    }

    init() {
      if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'initialized')) {
        this.resetToSampleData(false);
      }
    }

    subscribe(event, callback) {
      if (!this.listeners.has(event)) this.listeners.set(event, []);
      this.listeners.get(event).push(callback);
      return () => {
        const arr = this.listeners.get(event) || [];
        this.listeners.set(event, arr.filter(cb => cb !== callback));
      };
    }

    notify(event, data) {
      if (this.listeners.has(event)) {
        this.listeners.get(event).forEach(cb => { try { cb(data); } catch(e){} });
      }
      if (this.listeners.has('*')) {
        this.listeners.get('*').forEach(cb => { try { cb({ event, data }); } catch(e){} });
      }
    }

    getItem(key, defaultValue = []) {
      try {
        const val = localStorage.getItem(STORAGE_KEY_PREFIX + key);
        return val ? JSON.parse(val) : defaultValue;
      } catch (e) {
        return defaultValue;
      }
    }

    setItem(key, value) {
      try {
        localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
      } catch (e) {}
    }

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
      if (notifyAll) this.notify('*', { type: 'RESET_DATA' });
    }

    getProjects() { return this.getItem('projects', []); }
    getProject(id) { return this.getProjects().find(p => p.id === id) || null; }
    addProject(data) {
      const list = this.getProjects();
      const newProj = {
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
      list.unshift(newProj);
      this.setItem('projects', list);
      this.notify('projects', { action: 'add', item: newProj });
      return newProj;
    }
    updateProject(id, data) {
      const list = this.getProjects();
      const idx = list.findIndex(p => p.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
      this.setItem('projects', list);
      this.notify('projects', { action: 'update', item: list[idx] });
      return list[idx];
    }
    deleteProject(id) {
      let list = this.getProjects().filter(p => p.id !== id);
      this.setItem('projects', list);
      this.notify('projects', { action: 'delete', id });
    }

    getTasks() { return this.getItem('tasks', []); }
    getTask(id) { return this.getTasks().find(t => t.id === id) || null; }
    addTask(data) {
      const list = this.getTasks();
      const newTask = {
        id: 'task-' + Date.now(),
        name: data.name || '새 Task',
        projectId: data.projectId || '',
        status: data.status || 'Todo',
        priority: data.priority || 'Medium',
        dueDate: data.dueDate || new Date().toISOString().slice(0, 10),
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
      const idx = list.findIndex(t => t.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
      this.setItem('tasks', list);
      this.notify('tasks', { action: 'update', item: list[idx] });
      return list[idx];
    }
    toggleTaskStatus(id) {
      const task = this.getTask(id);
      if (!task) return null;
      return this.updateTask(id, { status: task.status === 'Done' ? 'Todo' : 'Done' });
    }
    deleteTask(id) {
      let list = this.getTasks().filter(t => t.id !== id);
      this.setItem('tasks', list);
      this.notify('tasks', { action: 'delete', id });
    }

    getDailyLogs() { return this.getItem('dailyLogs', []); }
    getDailyLog(id) { return this.getDailyLogs().find(l => l.id === id) || null; }
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
        createdAt: new Date().toISOString()
      };
      list.unshift(newLog);
      this.setItem('dailyLogs', list);
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
      const idx = list.findIndex(l => l.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
      this.setItem('dailyLogs', list);
      this.notify('dailyLogs', { action: 'update', item: list[idx] });
      return list[idx];
    }
    deleteDailyLog(id) {
      let list = this.getDailyLogs().filter(l => l.id !== id);
      this.setItem('dailyLogs', list);
      this.notify('dailyLogs', { action: 'delete', id });
    }

    getExperiments() { return this.getItem('experiments', []); }
    getExperiment(id) { return this.getExperiments().find(e => e.id === id) || null; }
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
          chargingProtocol: data.conditions?.chargingProtocol || 'CC'
        },
        protocol: data.protocol || '',
        result: data.result || '',
        problems: data.problems || '',
        conclusion: data.conclusion || '',
        nextAction: data.nextAction || '',
        status: data.status || 'Planned',
        createdAt: new Date().toISOString()
      };
      list.unshift(newExp);
      this.setItem('experiments', list);
      this.notify('experiments', { action: 'add', item: newExp });
      return newExp;
    }
    updateExperiment(id, data) {
      const list = this.getExperiments();
      const idx = list.findIndex(e => e.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
      this.setItem('experiments', list);
      this.notify('experiments', { action: 'update', item: list[idx] });
      return list[idx];
    }
    deleteExperiment(id) {
      let list = this.getExperiments().filter(e => e.id !== id);
      this.setItem('experiments', list);
      this.notify('experiments', { action: 'delete', id });
    }

    getLiterature() { return this.getItem('literature', []); }
    getPaper(id) { return this.getLiterature().find(l => l.id === id) || null; }
    addLiterature(data) {
      const list = this.getLiterature();
      const newPaper = {
        id: 'lit-' + Date.now(),
        title: data.title || '논문 제목',
        authors: data.authors || '',
        journal: data.journal || '',
        year: parseInt(data.year, 10) || 2024,
        doi: data.doi || '',
        url: data.url || (data.doi ? `https://doi.org/${data.doi}` : ''),
        projectId: data.projectId || '',
        summary: data.summary || '',
        keyFinding: data.keyFinding || '',
        importantFigure: data.importantFigure || '',
        relevance: data.relevance || '',
        readingStatus: data.readingStatus || 'To Read',
        createdAt: new Date().toISOString()
      };
      list.unshift(newPaper);
      this.setItem('literature', list);
      this.notify('literature', { action: 'add', item: newPaper });
      return newPaper;
    }
    updateLiterature(id, data) {
      const list = this.getLiterature();
      const idx = list.findIndex(l => l.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
      this.setItem('literature', list);
      this.notify('literature', { action: 'update', item: list[idx] });
      return list[idx];
    }
    deleteLiterature(id) {
      let list = this.getLiterature().filter(l => l.id !== id);
      this.setItem('literature', list);
      this.notify('literature', { action: 'delete', id });
    }

    getIdeas() { return this.getItem('ideas', []); }
    getIdea(id) { return this.getIdeas().find(i => i.id === id) || null; }
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
        expectedResult: data.expectedResult || '',
        priority: data.priority || 'Medium',
        status: data.status || 'Idea',
        createdAt: new Date().toISOString()
      };
      list.unshift(newIdea);
      this.setItem('ideas', list);
      this.notify('ideas', { action: 'add', item: newIdea });
      return newIdea;
    }
    updateIdea(id, data) {
      const list = this.getIdeas();
      const idx = list.findIndex(i => i.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
      this.setItem('ideas', list);
      this.notify('ideas', { action: 'update', item: list[idx] });
      return list[idx];
    }
    deleteIdea(id) {
      let list = this.getIdeas().filter(i => i.id !== id);
      this.setItem('ideas', list);
      this.notify('ideas', { action: 'delete', id });
    }

    getWeeklyReviews() { return this.getItem('weeklyReviews', []); }
    getWeeklyReview(id) { return this.getWeeklyReviews().find(r => r.id === id) || null; }
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
      const idx = list.findIndex(r => r.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
      this.setItem('weeklyReviews', list);
      this.notify('weeklyReviews', { action: 'update', item: list[idx] });
      return list[idx];
    }
    deleteWeeklyReview(id) {
      let list = this.getWeeklyReviews().filter(r => r.id !== id);
      this.setItem('weeklyReviews', list);
      this.notify('weeklyReviews', { action: 'delete', id });
    }

    getCategories() { return this.getItem('categories', INITIAL_CATEGORIES); }
    addCategory(name, color = 'blue') {
      const list = this.getCategories();
      list.push({ id: 'cat-' + Date.now(), name, color });
      this.setItem('categories', list);
      this.notify('categories', { action: 'add' });
    }

    getWorkTypes() { return this.getItem('workTypes', INITIAL_WORK_TYPES); }
    addWorkType(name) {
      const list = this.getWorkTypes();
      if (!list.includes(name)) {
        list.push(name);
        this.setItem('workTypes', list);
        this.notify('workTypes', { action: 'add' });
      }
    }

    getSettings() { return this.getItem('settings', INITIAL_SETTINGS); }
    updateSettings(data) {
      const updated = { ...this.getSettings(), ...data };
      this.setItem('settings', updated);
      this.notify('settings', { action: 'update', item: updated });
      return updated;
    }

    getProjectRelatedData(projectId) {
      const project = this.getProject(projectId);
      if (!project) return null;
      return {
        project,
        tasks: this.getTasks().filter(t => t.projectId === projectId),
        dailyLogs: this.getDailyLogs().filter(l => l.projectId === projectId),
        experiments: this.getExperiments().filter(e => e.projectId === projectId),
        literature: this.getLiterature().filter(lit => lit.projectId === projectId),
        ideas: this.getIdeas().filter(i => i.projectId === projectId)
      };
    }

    getWeeklyAggregatedData(startDate, endDate) {
      const logs = this.getDailyLogs().filter(l => l.date >= startDate && l.date <= endDate);
      const tasks = this.getTasks().filter(t => t.dueDate >= startDate && t.dueDate <= endDate);
      const doneTasks = tasks.filter(t => t.status === 'Done');
      const experiments = this.getExperiments().filter(e => e.date >= startDate && e.date <= endDate);
      const failedExps = experiments.filter(e => e.status === 'Failed' || e.status === 'Need Re-test');

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
        logs, tasks, doneTasks, experiments, failedExps,
        templates: { completedWork, experimentsSummary, keyResults, failedExpAndIssues, questionsForAdvisor, nextWeekGoals }
      };
    }

    globalSearch(query) {
      if (!query || !query.trim()) return [];
      const q = query.trim().toLowerCase();
      const results = [];
      this.getProjects().forEach(p => {
        if (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) {
          results.push({ type: 'Project', title: p.name, subtitle: `${p.category} · ${p.status}`, id: p.id });
        }
      });
      this.getDailyLogs().forEach(l => {
        if (l.title.toLowerCase().includes(q) || l.workDone.toLowerCase().includes(q) || l.results.toLowerCase().includes(q)) {
          const proj = this.getProject(l.projectId);
          results.push({ type: 'DailyLog', title: l.title, subtitle: `${l.date} · ${proj ? proj.name : ''}`, id: l.id });
        }
      });
      this.getTasks().forEach(t => {
        if (t.name.toLowerCase().includes(q) || (t.notes && t.notes.toLowerCase().includes(q))) {
          results.push({ type: 'Task', title: t.name, subtitle: `${t.status} · 마감: ${t.dueDate}`, id: t.id });
        }
      });
      this.getExperiments().forEach(e => {
        if (e.name.toLowerCase().includes(q) || e.purpose.toLowerCase().includes(q) || e.result.toLowerCase().includes(q)) {
          results.push({ type: 'Experiment', title: e.name, subtitle: `${e.status} · ${e.cellId || 'Cell'}`, id: e.id });
        }
      });
      this.getLiterature().forEach(lit => {
        if (lit.title.toLowerCase().includes(q) || lit.authors.toLowerCase().includes(q) || lit.relevance.toLowerCase().includes(q)) {
          results.push({ type: 'Literature', title: lit.title, subtitle: `${lit.journal} (${lit.year})`, id: lit.id });
        }
      });
      this.getIdeas().forEach(i => {
        if (i.title.toLowerCase().includes(q) || i.hypothesis.toLowerCase().includes(q)) {
          results.push({ type: 'ResearchIdea', title: i.title, subtitle: `상태: ${i.status}`, id: i.id });
        }
      });
      return results;
    }

    exportDataJSON() {
      return JSON.stringify({
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
      }, null, 2);
    }

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
        return { success: false, error: e.message };
      }
    }
  }

  const store = new Store();

  // --- 3. MODAL & TOAST MANAGER ---
  class ModalManager {
    static open(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      if (window.lucide) window.lucide.createIcons();
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
      toast.className = `flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium animate-fade-in pointer-events-auto transition-all ${bgColors[type] || bgColors.success}`;
      toast.innerHTML = `<span>${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }

    static showConfirm(title, message, onConfirm) {
      let confirmModal = document.getElementById('global-confirm-modal');
      if (!confirmModal) {
        confirmModal = document.createElement('div');
        confirmModal.id = 'global-confirm-modal';
        confirmModal.className = 'fixed inset-0 z-50 modal-backdrop hidden items-center justify-center p-4';
        document.body.appendChild(confirmModal);
      }

      confirmModal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-fade-in">
          <h3 class="text-lg font-bold text-slate-800 mb-2">${title}</h3>
          <p class="text-slate-600 text-sm mb-6 leading-relaxed">${message}</p>
          <div class="flex justify-end gap-2">
            <button id="confirm-cancel-btn" class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl">취소</button>
            <button id="confirm-ok-btn" class="px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm">확인</button>
          </div>
        </div>
      `;

      confirmModal.classList.remove('hidden');
      confirmModal.classList.add('flex');

      const close = () => {
        confirmModal.classList.add('hidden');
        confirmModal.classList.remove('flex');
      };
      confirmModal.querySelector('#confirm-cancel-btn').onclick = close;
      confirmModal.querySelector('#confirm-ok-btn').onclick = () => {
        close();
        if (onConfirm) onConfirm();
      };
    }

    static triggerCelebration() {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#81C784', '#64B5F6', '#B39DDB', '#F06292', '#FFD54F']
        });
      }
    }
  }

  // --- 4. QUICK ADD MODAL ---
  class QuickAddModal {
    static init() {
      let modalEl = document.getElementById('quick-add-modal');
      if (!modalEl) {
        modalEl = document.createElement('div');
        modalEl.id = 'quick-add-modal';
        modalEl.className = 'fixed inset-0 z-50 modal-backdrop hidden items-center justify-center p-4';
        document.body.appendChild(modalEl);
      }
      this.modalEl = modalEl;
    }

    static open(initialTab = 'dailyLog', defaultProjectId = '') {
      this.init();
      this.currentTab = initialTab;
      this.defaultProjectId = defaultProjectId;
      this.render();
      ModalManager.open('quick-add-modal');
      if (window.lucide) window.lucide.createIcons();
    }

    static close() {
      ModalManager.close('quick-add-modal');
    }

    static render() {
      const projects = store.getProjects();
      const categories = store.getCategories();
      const workTypes = store.getWorkTypes();

      this.modalEl.innerHTML = `
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 animate-fade-in overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                +
              </div>
              <h3 class="font-bold text-slate-800 text-lg">빠른 연구 기록 추가</h3>
            </div>
            <button id="quick-add-close" class="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100">✕</button>
          </div>

          <div class="px-6 pt-3 border-b border-slate-100 flex gap-2 overflow-x-auto text-sm font-medium">
            <button class="qa-tab-btn px-3.5 py-2 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${this.currentTab === 'dailyLog' ? 'border-emerald-500 text-emerald-700 bg-emerald-50/60 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}" data-tab="dailyLog">
              📝 업무일지
            </button>
            <button class="qa-tab-btn px-3.5 py-2 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${this.currentTab === 'task' ? 'border-blue-500 text-blue-700 bg-blue-50/60 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}" data-tab="task">
              ✅ Task
            </button>
            <button class="qa-tab-btn px-3.5 py-2 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${this.currentTab === 'experiment' ? 'border-purple-500 text-purple-700 bg-purple-50/60 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}" data-tab="experiment">
              🧪 실험/시뮬
            </button>
            <button class="qa-tab-btn px-3.5 py-2 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${this.currentTab === 'literature' ? 'border-amber-500 text-amber-700 bg-amber-50/60 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}" data-tab="literature">
              📚 논문
            </button>
            <button class="qa-tab-btn px-3.5 py-2 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${this.currentTab === 'idea' ? 'border-pink-500 text-pink-700 bg-pink-50/60 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}" data-tab="idea">
              💡 아이디어
            </button>
            <button class="qa-tab-btn px-3.5 py-2 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${this.currentTab === 'project' ? 'border-indigo-500 text-indigo-700 bg-indigo-50/60 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}" data-tab="project">
              📁 프로젝트
            </button>
          </div>

          <div class="p-6 overflow-y-auto flex-1">
            <form id="quick-add-form" class="space-y-4 text-xs">
              ${this.renderTabContent(projects, categories, workTypes)}
            </form>
          </div>

          <div class="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
            <button type="button" id="quick-add-cancel" class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-xl">취소</button>
            <button type="submit" form="quick-add-form" class="px-5 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm">
              저장하기
            </button>
          </div>
        </div>
      `;

      this.bindEvents();
    }

    static renderTabContent(projects, categories, workTypes) {
      const today = new Date().toISOString().slice(0, 10);
      const projectOptions = projects.map(p => `
        <option value="${p.id}" ${p.id === this.defaultProjectId ? 'selected' : ''}>[${p.type === 'Main' ? '주과제' : '서브'}] ${p.name}</option>
      `).join('');

      switch (this.currentTab) {
        case 'dailyLog':
          return `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-600 mb-1">날짜</label>
                <input type="date" name="date" value="${today}" required class="w-full px-3 py-2 border rounded-xl border-slate-200">
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">연관 프로젝트</label>
                <select name="projectId" required class="w-full px-3 py-2 border rounded-xl border-slate-200">
                  <option value="">-- 프로젝트 선택 --</option>
                  ${projectOptions}
                </select>
              </div>
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">오늘의 한 줄 제목 / 목표</label>
              <input type="text" name="title" placeholder="예: COMSOL adaptive protocol parameter 수정 및 해석" required class="w-full px-3 py-2 border rounded-xl border-slate-200 font-bold">
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">업무 유형</label>
              <div class="flex flex-wrap gap-2">
                ${workTypes.map(wt => `
                  <label class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-white cursor-pointer">
                    <input type="checkbox" name="workTypes" value="${wt}" ${wt === '실험' || wt === '시뮬레이션' ? 'checked' : ''}>
                    <span>${wt}</span>
                  </label>
                `).join('')}
              </div>
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">오늘 한 일 (Work Done)</label>
              <textarea name="workDone" rows="3" placeholder="- 파라미터 수치 변경&#10;- 코인셀 조립 및 충방전 시작" class="w-full px-3 py-2 border rounded-xl border-slate-200"></textarea>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-600 mb-1">주요 결과 (Results)</label>
                <textarea name="results" rows="2" placeholder="Li+ 농도 고갈 영역 42% 감소 확인" class="w-full px-3 py-2 border rounded-xl border-slate-200"></textarea>
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">문제점 (Problems)</label>
                <textarea name="problems" rows="2" placeholder="Mesh Inversion 에러 발생" class="w-full px-3 py-2 border rounded-xl border-slate-200"></textarea>
              </div>
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">다음 행동 (Next Action)</label>
              <div class="flex gap-2">
                <input type="text" name="nextAction" placeholder="Mesh 조건별 결과 비교 및 리메싱 인터벌 최적화" class="flex-1 px-3 py-2 border rounded-xl border-slate-200">
                <label class="flex items-center gap-1.5 text-xs text-slate-600 shrink-0">
                  <input type="checkbox" name="createTaskFromNextAction" value="true" checked>
                  <span>Task 자동 등록</span>
                </label>
              </div>
            </div>
          `;

        case 'task':
          return `
            <div>
              <label class="block font-semibold text-slate-600 mb-1">Task 이름</label>
              <input type="text" name="name" placeholder="예: AQ coating solvent 후보 비교" required class="w-full px-3 py-2 border rounded-xl border-slate-200 font-bold">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-600 mb-1">연관 프로젝트</label>
                <select name="projectId" required class="w-full px-3 py-2 border rounded-xl border-slate-200">
                  <option value="">-- 프로젝트 선택 --</option>
                  ${projectOptions}
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">마감 기한</label>
                <input type="date" name="dueDate" value="${today}" required class="w-full px-3 py-2 border rounded-xl border-slate-200">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-600 mb-1">상태</label>
                <select name="status" class="w-full px-3 py-2 border rounded-xl border-slate-200">
                  <option value="Todo">대기 (Todo)</option>
                  <option value="In Progress">진행 중 (In Progress)</option>
                  <option value="Done">완료 (Done)</option>
                  <option value="Blocked">보류 (Blocked)</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">우선순위</label>
                <select name="priority" class="w-full px-3 py-2 border rounded-xl border-slate-200">
                  <option value="High">높음 (High)</option>
                  <option value="Medium" selected>보통 (Medium)</option>
                  <option value="Low">낮음 (Low)</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">연구 메모</label>
              <textarea name="notes" rows="2" class="w-full px-3 py-2 border rounded-xl border-slate-200"></textarea>
            </div>
          `;

        case 'experiment':
          return `
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-600 mb-1">실험/시뮬레이션명</label>
                <input type="text" name="name" placeholder="AQ 2wt% 코팅 Cu 전극 사이클 테스트" required class="w-full px-3 py-2 border rounded-xl border-slate-200 font-bold">
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">연관 프로젝트</label>
                <select name="projectId" required class="w-full px-3 py-2 border rounded-xl border-slate-200">
                  <option value="">-- 프로젝트 선택 --</option>
                  ${projectOptions}
                </select>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block font-semibold text-slate-600 mb-1">일자</label>
                <input type="date" name="date" value="${today}" class="w-full px-2 py-1.5 border rounded-lg border-slate-200">
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">Sample ID</label>
                <input type="text" name="sampleId" placeholder="EXP-2026-01" class="w-full px-2 py-1.5 border rounded-lg border-slate-200">
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">Cell ID / 시스템</label>
                <input type="text" name="cellId" placeholder="CR2032 Coin Cell" class="w-full px-2 py-1.5 border rounded-lg border-slate-200">
              </div>
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">실험 목적</label>
              <input type="text" name="purpose" placeholder="Bare Cu 대비 AQ 코팅막의 초기 쿨롱 효율 비교" class="w-full px-3 py-2 border rounded-xl border-slate-200">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-600 mb-1">상태</label>
                <select name="status" class="w-full px-3 py-2 border rounded-xl border-slate-200">
                  <option value="Planned">계획됨 (Planned)</option>
                  <option value="In Progress">진행 중 (In Progress)</option>
                  <option value="Completed" selected>완료됨 (Completed)</option>
                  <option value="Need Re-test">재실험 필요 (Need Re-test)</option>
                  <option value="Failed">실패 (Failed - 보존)</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">다음 행동</label>
                <input type="text" name="nextAction" placeholder="결과 분석 후 사이클 재조립" class="w-full px-3 py-2 border rounded-xl border-slate-200">
              </div>
            </div>
          `;

        case 'literature':
          return `
            <div>
              <label class="block font-semibold text-slate-600 mb-1">논문 제목</label>
              <input type="text" name="title" placeholder="Adaptive current protocol for suppressing dendrite growth..." required class="w-full px-3 py-2 border rounded-xl border-slate-200 font-bold">
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block font-semibold text-slate-600 mb-1">저자</label>
                <input type="text" name="authors" placeholder="J. Chen et al." class="w-full px-2.5 py-1.5 border rounded-lg border-slate-200">
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">저널</label>
                <input type="text" name="journal" placeholder="Energy & Environ. Sci." class="w-full px-2.5 py-1.5 border rounded-lg border-slate-200">
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">출판년도</label>
                <input type="number" name="year" value="2024" class="w-full px-2.5 py-1.5 border rounded-lg border-slate-200">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-600 mb-1">DOI</label>
                <input type="text" name="doi" placeholder="10.1039/D3EE01234K" class="w-full px-3 py-2 border rounded-xl border-slate-200">
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">연관 프로젝트</label>
                <select name="projectId" required class="w-full px-3 py-2 border rounded-xl border-slate-200">
                  <option value="">-- 프로젝트 선택 --</option>
                  ${projectOptions}
                </select>
              </div>
            </div>
            <div class="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <label class="block font-bold text-amber-900 mb-1">★ 이 논문이 내 연구에 왜 중요한가?</label>
              <textarea name="relevance" rows="2" class="w-full px-3 py-2 border rounded-lg border-amber-300 bg-white"></textarea>
            </div>
          `;

        case 'idea':
          return `
            <div>
              <label class="block font-semibold text-slate-600 mb-1">연구 아이디어 제목</label>
              <input type="text" name="title" placeholder="곡률 변화율 기반 2차 미분 선제적 Adaptive 알고리즘" required class="w-full px-3 py-2 border rounded-xl border-slate-200 font-bold">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-600 mb-1">연관 프로젝트</label>
                <select name="projectId" class="w-full px-3 py-2 border rounded-xl border-slate-200">
                  <option value="">-- 프로젝트 선택 --</option>
                  ${projectOptions}
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">우선순위</label>
                <select name="priority" class="w-full px-3 py-2 border rounded-xl border-slate-200">
                  <option value="High">높음 (High)</option>
                  <option value="Medium" selected>보통 (Medium)</option>
                  <option value="Low">낮음 (Low)</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">연구 가설 (Hypothesis)</label>
              <textarea name="hypothesis" rows="2" placeholder="표면 곡률의 시간 미분값을 모니터링하여 가속 직전에 펄스를 주면 핵생성을 원천 차단할 수 있을 것이다" class="w-full px-3 py-2 border rounded-xl border-slate-200"></textarea>
            </div>
          `;

        case 'project':
          return `
            <div>
              <label class="block font-semibold text-slate-600 mb-1">프로젝트명</label>
              <input type="text" name="name" placeholder="전고체 배터리 리튬/고체전해질 계면 해석" required class="w-full px-3 py-2 border rounded-xl border-slate-200 font-bold">
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block font-semibold text-slate-600 mb-1">카테고리</label>
                <select name="category" class="w-full px-2 py-1.5 border rounded-lg border-slate-200">
                  ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                  <option value="기타">기타</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">구분</label>
                <select name="type" class="w-full px-2 py-1.5 border rounded-lg border-slate-200">
                  <option value="Main">주과제 (Main)</option>
                  <option value="Sub" selected>서브과제 (Sub)</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">상태</label>
                <select name="status" class="w-full px-2 py-1.5 border rounded-lg border-slate-200">
                  <option value="Active" selected>진행 중 (Active)</option>
                  <option value="Planned">계획됨 (Planned)</option>
                  <option value="On Hold">보류 (On Hold)</option>
                  <option value="Completed">완료 (Completed)</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block font-semibold text-slate-600 mb-1">연구 목표</label>
              <textarea name="researchGoal" rows="2" class="w-full px-3 py-2 border rounded-xl border-slate-200"></textarea>
            </div>
          `;
      }
    }

    static bindEvents() {
      this.modalEl.querySelector('#quick-add-close').onclick = () => this.close();
      this.modalEl.querySelector('#quick-add-cancel').onclick = () => this.close();

      this.modalEl.querySelectorAll('.qa-tab-btn').forEach(btn => {
        btn.onclick = (e) => {
          e.preventDefault();
          this.currentTab = btn.dataset.tab;
          this.render();
        };
      });

      const form = this.modalEl.querySelector('#quick-add-form');
      form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        switch (this.currentTab) {
          case 'dailyLog':
            data.workTypes = formData.getAll('workTypes');
            data.createTaskFromNextAction = formData.get('createTaskFromNextAction') === 'true';
            store.addDailyLog(data);
            ModalManager.showToast('오늘의 업무일지가 등록되었습니다!', 'success');
            break;
          case 'task':
            store.addTask(data);
            ModalManager.showToast('새 연구 Task가 등록되었습니다!', 'success');
            break;
          case 'experiment':
            store.addExperiment(data);
            ModalManager.showToast('배터리 실험/시뮬레이션이 등록되었습니다!', 'success');
            break;
          case 'literature':
            store.addLiterature(data);
            ModalManager.showToast('논문 기록이 추가되었습니다!', 'success');
            break;
          case 'idea':
            store.addIdea(data);
            ModalManager.showToast('연구 아이디어가 등록되었습니다!', 'success');
            break;
          case 'project':
            store.addProject(data);
            ModalManager.showToast('새 연구 프로젝트가 생성되었습니다!', 'success');
            break;
        }

        this.close();
      };
    }
  }

  // --- 5. SEARCH MODAL ---
  class SearchModal {
    static init(onNav) {
      this.onNav = onNav;
      let modalEl = document.getElementById('search-modal');
      if (!modalEl) {
        modalEl = document.createElement('div');
        modalEl.id = 'search-modal';
        modalEl.className = 'fixed inset-0 z-50 modal-backdrop hidden items-start justify-center pt-20 p-4';
        document.body.appendChild(modalEl);
      }
      this.modalEl = modalEl;
      this.render();

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
    }

    static close() {
      ModalManager.close('search-modal');
    }

    static render() {
      this.modalEl.innerHTML = `
        <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 animate-fade-in overflow-hidden flex flex-col">
          <div class="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <span class="text-slate-400">🔍</span>
            <input type="text" id="global-search-input" placeholder="프로젝트, 업무일지, 실험 데이터, 논문, 아이디어 검색... (Ctrl+K)" class="w-full bg-transparent text-sm text-slate-800 focus:outline-none">
            <kbd class="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono">ESC</kbd>
          </div>
          <div id="search-results-container" class="max-h-96 overflow-y-auto p-3 space-y-1"></div>
        </div>
      `;

      const input = this.modalEl.querySelector('#global-search-input');
      if (input) input.oninput = (e) => this.performSearch(e.target.value);
      this.modalEl.onclick = (e) => { if (e.target === this.modalEl) this.close(); };
    }

    static performSearch(query) {
      const container = this.modalEl.querySelector('#search-results-container');
      if (!container) return;
      if (!query || !query.trim()) {
        const projects = store.getProjects().slice(0, 3);
        container.innerHTML = `
          <div class="px-3 py-2 text-xs font-bold text-slate-400 uppercase">주요 프로젝트 바로가기</div>
          ${projects.map(p => `
            <div class="search-item flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 cursor-pointer" data-type="Project" data-id="${p.id}">
              <div class="text-sm font-semibold text-slate-800">${p.name}</div>
              <span class="text-xs px-2 py-0.5 rounded-full badge-${p.status.toLowerCase().replace(/\s+/g, '')}">${p.status}</span>
            </div>
          `).join('')}
        `;
      } else {
        const results = store.globalSearch(query);
        if (results.length === 0) {
          container.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs">검색 결과가 없습니다: "${query}"</div>`;
        } else {
          container.innerHTML = results.map(item => `
            <div class="search-item flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 cursor-pointer" data-type="${item.type}" data-id="${item.id}">
              <div>
                <div class="text-sm font-semibold text-slate-800">${item.title}</div>
                <div class="text-xs text-slate-500">${item.subtitle}</div>
              </div>
              <span class="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${item.type}</span>
            </div>
          `).join('');
        }
      }

      container.querySelectorAll('.search-item').forEach(el => {
        el.onclick = () => {
          const type = el.dataset.type;
          const id = el.dataset.id;
          this.close();
          if (this.onNav) this.onNav(type, id);
        };
      });
    }
  }

  // --- 6. APP MAIN CONTROLLER & VIEWS ---
  class App {
    constructor() {
      this.currentView = 'dashboard';
      this.selectedProjectId = null;
      this.selectedLogId = null;
      this.selectedReviewId = null;
    }

    init() {
      QuickAddModal.init();
      SearchModal.init((type, id) => this.handleSearchResult(type, id));
      this.bindGlobalEvents();
      store.subscribe('*', () => this.updateBadges());
      this.updateBadges();
      this.navigate('dashboard');
    }

    handleSearchResult(type, id) {
      if (type === 'Project') {
        this.selectedProjectId = id;
        this.navigate('projects');
      } else if (type === 'DailyLog') {
        this.selectedLogId = id;
        this.navigate('dailyLog');
      } else if (type === 'Task') {
        this.navigate('tasks');
      } else if (type === 'Experiment') {
        this.navigate('experiments');
      } else if (type === 'Literature') {
        this.navigate('literature');
      } else if (type === 'ResearchIdea') {
        this.navigate('ideas');
      }
    }

    updateBadges() {
      const projects = store.getProjects();
      const activeCount = projects.filter(p => p.status === 'Active').length;
      const tasks = store.getTasks();
      const pendingTasksCount = tasks.filter(t => t.status !== 'Done').length;
      const exps = store.getExperiments();

      const elProj = document.getElementById('badge-active-projects');
      if (elProj) elProj.textContent = activeCount;
      const elTask = document.getElementById('badge-pending-tasks');
      if (elTask) elTask.textContent = pendingTasksCount;
      const elExp = document.getElementById('badge-exps-count');
      if (elExp) elExp.textContent = exps.length;
    }

    navigate(viewName, params = {}) {
      this.currentView = viewName;
      if (params.selectedProjectId !== undefined) {
        this.selectedProjectId = params.selectedProjectId;
      }

      document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.view === viewName) {
          link.classList.add('bg-emerald-50', 'text-emerald-800', 'font-bold', 'shadow-sm');
          link.classList.remove('text-slate-600', 'hover:bg-slate-50');
        } else {
          link.classList.remove('bg-emerald-50', 'text-emerald-800', 'font-bold', 'shadow-sm');
          link.classList.add('text-slate-600', 'hover:bg-slate-50');
        }
      });

      const main = document.getElementById('main-content');
      if (!main) return;

      switch (viewName) {
        case 'dashboard': this.renderDashboard(main); break;
        case 'dailyLog': this.renderDailyLog(main); break;
        case 'projects': this.renderProjects(main); break;
        case 'tasks': this.renderTasks(main); break;
        case 'experiments': this.renderExperiments(main); break;
        case 'literature': this.renderLiterature(main); break;
        case 'ideas': this.renderIdeas(main); break;
        case 'weeklyReview': this.renderWeeklyReview(main); break;
        case 'settings': this.renderSettings(main); break;
      }

      if (window.lucide) window.lucide.createIcons();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- DASHBOARD RENDER ---
    renderDashboard(container) {
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
          <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-emerald-900/10 relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-medium text-emerald-100 mb-3 border border-white/20">
                  <span>✨ ${settings.labName}</span>
                </div>
                <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight">안녕하세요, ${settings.researcherName}! 🔋</h1>
                <p class="text-emerald-100 text-sm mt-1 max-w-xl">
                  오늘도 의미 있는 배터리 연구 데이터를 축적하고, 결과와 다음 행동을 유기적으로 연결해보세요.
                </p>
              </div>
              <div class="flex flex-wrap gap-2 shrink-0">
                <button id="dash-quick-log" class="px-4 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-2xl font-bold text-sm shadow-md flex items-center gap-2 btn-press transition-all">
                  📝 오늘의 일지 작성
                </button>
                <button id="dash-quick-task" class="px-3.5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur text-white rounded-2xl font-medium text-sm flex items-center gap-1.5 btn-press transition-all border border-white/20">
                  + Task
                </button>
                <button id="dash-quick-exp" class="px-3.5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur text-white rounded-2xl font-medium text-sm flex items-center gap-1.5 btn-press transition-all border border-white/20">
                  + 실험
                </button>
              </div>
            </div>

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
                <div class="text-emerald-200 text-xs font-medium">논문 및 아이디어</div>
                <div class="text-2xl font-bold mt-0.5">${literature.length + ideas.length}건</div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 space-y-6">
              <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-lg font-bold text-slate-800">현재 집중 연구 프로젝트 (Active Projects)</h2>
                  <button id="view-all-projects-btn" class="text-xs font-semibold text-emerald-600 hover:text-emerald-700">전체 보기 (${projects.length}) →</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  ${activeProjects.map(p => `
                    <div class="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-emerald-200 card-hover cursor-pointer project-card transition-all flex flex-col justify-between" data-id="${p.id}">
                      <div>
                        <div class="flex items-center justify-between gap-2 mb-2">
                          <span class="text-xs font-bold px-2.5 py-1 rounded-lg ${p.type === 'Main' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}">
                            ${p.type === 'Main' ? '주과제' : '서브'}
                          </span>
                          <span class="text-xs px-2.5 py-0.5 rounded-full badge-${p.priority.toLowerCase()} font-medium">우선순위: ${p.priority}</span>
                        </div>
                        <h3 class="font-bold text-slate-800 text-base mb-1">${p.name}</h3>
                        <p class="text-xs text-slate-500 line-clamp-2 mb-3">${p.researchGoal || p.description}</p>
                      </div>
                      <div class="space-y-3 pt-3 border-t border-slate-200/60 text-xs">
                        <div class="bg-white/80 p-2.5 rounded-xl border border-slate-100 space-y-1">
                          <div class="truncate text-slate-700"><span class="font-bold">🎯 집중:</span> ${p.currentFocus || '미입력'}</div>
                          <div class="truncate text-slate-700"><span class="font-bold">⏩ 다음:</span> ${p.nextAction || '미입력'}</div>
                        </div>
                        <div>
                          <div class="flex justify-between font-semibold text-slate-600 mb-1">
                            <span>진행률</span>
                            <span class="text-emerald-700 font-bold">${p.progress}%</span>
                          </div>
                          <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div class="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full" style="width: ${p.progress}%"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- 7-Day Activity Chart Container -->
              <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-lg font-bold text-slate-800">최근 7일 연구 활동량 (Research Activity)</h2>
                  <span class="text-xs text-slate-400">일지 · 실험 · 완료 Task</span>
                </div>
                <div class="h-60 relative">
                  <canvas id="activityChart"></canvas>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
              <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-base font-bold text-slate-800">우선순위 연구 행동 (Tasks)</h2>
                  <button id="view-all-tasks-btn" class="text-xs font-semibold text-emerald-600 hover:text-emerald-700">전체 (${tasks.filter(t=>t.status!=='Done').length})</button>
                </div>
                <div class="space-y-2.5">
                  ${priorityTasks.length === 0 ? `
                    <div class="text-center py-8 text-slate-400 text-xs">우선순위 Task가 모두 완료되었습니다!</div>
                  ` : priorityTasks.map(t => {
                    const proj = store.getProject(t.projectId);
                    return `
                      <div class="p-3 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-emerald-200 transition-all flex items-start gap-3">
                        <button class="task-checkbox mt-0.5 w-5 h-5 rounded-lg border border-slate-300 flex items-center justify-center text-transparent hover:text-emerald-500" data-id="${t.id}">✓</button>
                        <div class="flex-1 min-w-0">
                          <div class="text-xs font-bold text-slate-800 truncate">${t.name}</div>
                          <div class="text-[11px] text-slate-400 mt-0.5">${proj ? proj.name : '프로젝트 미지정'} · ${t.dueDate}</div>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Render chart
      this.renderActivityChart();

      // Bind events
      container.querySelector('#dash-quick-log').onclick = () => QuickAddModal.open('dailyLog');
      container.querySelector('#dash-quick-task').onclick = () => QuickAddModal.open('task');
      container.querySelector('#dash-quick-exp').onclick = () => QuickAddModal.open('experiment');
      container.querySelector('#view-all-projects-btn').onclick = () => this.navigate('projects');
      container.querySelector('#view-all-tasks-btn').onclick = () => this.navigate('tasks');

      container.querySelectorAll('.project-card').forEach(card => {
        card.onclick = () => {
          this.selectedProjectId = card.dataset.id;
          this.navigate('projects');
        };
      });

      container.querySelectorAll('.task-checkbox').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const id = btn.dataset.id;
          store.toggleTaskStatus(id);
          ModalManager.triggerCelebration();
          ModalManager.showToast('Task 완료!', 'success');
          this.renderDashboard(container);
        };
      });
    }

    renderActivityChart() {
      const ctx = document.getElementById('activityChart');
      if (!ctx || !window.Chart) return;
      const days = [];
      const logCounts = [];
      const expCounts = [];
      const taskCounts = [];
      const now = new Date();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(0, 10);
        days.push(`${d.getMonth() + 1}/${d.getDate()}`);
        logCounts.push(store.getDailyLogs().filter(l => l.date === dateStr).length);
        expCounts.push(store.getExperiments().filter(e => e.date === dateStr).length);
        taskCounts.push(store.getTasks().filter(t => t.dueDate === dateStr && t.status === 'Done').length);
      }

      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: days,
          datasets: [
            { label: '업무일지', data: logCounts, backgroundColor: 'rgba(52, 211, 153, 0.8)', borderRadius: 6 },
            { label: '실험/시뮬', data: expCounts, backgroundColor: 'rgba(167, 139, 250, 0.8)', borderRadius: 6 },
            { label: '완료 Task', data: taskCounts, backgroundColor: 'rgba(96, 165, 250, 0.8)', borderRadius: 6 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'top', labels: { boxWidth: 12, font: { family: 'Pretendard', size: 11 } } } },
          scales: { x: { grid: { display: false } }, y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
      });
    }

    // --- DAILY LOG RENDER ---
    renderDailyLog(container) {
      const logs = store.getDailyLogs();
      const projects = store.getProjects();
      const workTypes = store.getWorkTypes();
      const currentEditingLog = this.selectedLogId ? store.getDailyLog(this.selectedLogId) : null;
      const today = new Date().toISOString().slice(0, 10);

      container.innerHTML = `
        <div class="space-y-6 animate-fade-in pb-16">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 class="text-2xl font-bold text-slate-800">연구 업무일지 (Daily Log)</h1>
              <p class="text-xs text-slate-500 mt-0.5">매일 연구의 맥락(Work → Result → Problem → Next Action)을 연결하여 기록합니다.</p>
            </div>
            <button id="btn-new-log-top" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md">
              + 오늘 일지 새로 작성
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div class="lg:col-span-7">
              <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 class="text-sm font-bold text-slate-800">${currentEditingLog ? `일지 수정 (${currentEditingLog.date})` : '새 업무일지 작성'}</h2>
                  ${currentEditingLog ? `<button id="btn-cancel-edit" class="text-xs text-slate-500 px-2 py-1 border rounded-lg">새 작성 모드</button>` : ''}
                </div>

                <form id="daily-log-form" class="space-y-4 text-xs">
                  <input type="hidden" name="logId" value="${currentEditingLog ? currentEditingLog.id : ''}">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block font-semibold text-slate-600 mb-1">작성 일자</label>
                      <input type="date" name="date" value="${currentEditingLog ? currentEditingLog.date : today}" required class="w-full px-3 py-2 border rounded-xl border-slate-200">
                    </div>
                    <div>
                      <label class="block font-semibold text-slate-600 mb-1">연관 프로젝트</label>
                      <select name="projectId" required class="w-full px-3 py-2 border rounded-xl border-slate-200">
                        <option value="">-- 프로젝트 선택 --</option>
                        ${projects.map(p => `<option value="${p.id}" ${currentEditingLog && currentEditingLog.projectId === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block font-semibold text-slate-600 mb-1">오늘의 연구 핵심 주제 / 제목</label>
                    <input type="text" name="title" value="${currentEditingLog ? currentEditingLog.title : ''}" placeholder="예: COMSOL adaptive protocol parameter 수정 및 농도 구배 확인" required class="w-full px-3 py-2 border rounded-xl border-slate-200 font-bold">
                  </div>

                  <div>
                    <label class="block font-semibold text-slate-600 mb-1">활동 유형</label>
                    <div class="flex flex-wrap gap-2">
                      ${workTypes.map(wt => `
                        <label class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-white cursor-pointer">
                          <input type="checkbox" name="workTypes" value="${wt}" ${currentEditingLog && currentEditingLog.workTypes && currentEditingLog.workTypes.includes(wt) ? 'checked' : (wt==='실험'||wt==='시뮬레이션'?'checked':'')}>
                          <span>${wt}</span>
                        </label>
                      `).join('')}
                    </div>
                  </div>

                  <div class="space-y-3 pt-2">
                    <div class="p-3 rounded-2xl bg-amber-50/40 border border-amber-100">
                      <label class="block font-bold text-amber-900 mb-1">🎯 오늘의 연구 목표 (Goal)</label>
                      <textarea name="goal" rows="2" class="w-full px-3 py-1.5 border rounded-lg border-amber-200 bg-white">${currentEditingLog ? (currentEditingLog.goal || '') : ''}</textarea>
                    </div>
                    <div class="p-3 rounded-2xl bg-blue-50/40 border border-blue-100">
                      <label class="block font-bold text-blue-900 mb-1">🛠️ 오늘 한 일 (Work Done)</label>
                      <textarea name="workDone" rows="3" class="w-full px-3 py-1.5 border rounded-lg border-blue-200 bg-white font-mono">${currentEditingLog ? (currentEditingLog.workDone || '') : ''}</textarea>
                    </div>
                    <div class="p-3 rounded-2xl bg-emerald-50/40 border border-emerald-100">
                      <label class="block font-bold text-emerald-900 mb-1">📊 주요 결과 (Results)</label>
                      <textarea name="results" rows="2" class="w-full px-3 py-1.5 border rounded-lg border-emerald-200 bg-white">${currentEditingLog ? (currentEditingLog.results || '') : ''}</textarea>
                    </div>
                    <div class="p-3 rounded-2xl bg-rose-50/40 border border-rose-100">
                      <label class="block font-bold text-rose-900 mb-1">⚠️ 문제점 / 이슈 (Problems)</label>
                      <textarea name="problems" rows="2" class="w-full px-3 py-1.5 border rounded-lg border-rose-200 bg-white">${currentEditingLog ? (currentEditingLog.problems || '') : ''}</textarea>
                    </div>
                    <div class="p-3 rounded-2xl bg-purple-50/40 border border-purple-100">
                      <label class="block font-bold text-purple-900 mb-1">💡 배운 점 & 교수님 질문 안건</label>
                      <textarea name="questions" rows="2" class="w-full px-3 py-1.5 border rounded-lg border-purple-200 bg-white">${currentEditingLog ? (currentEditingLog.questions || '') : ''}</textarea>
                    </div>
                    <div class="p-3 rounded-2xl bg-cyan-50/40 border border-cyan-100">
                      <label class="block font-bold text-cyan-900 mb-1">⏩ 다음 행동 (Next Action)</label>
                      <input type="text" name="nextAction" value="${currentEditingLog ? (currentEditingLog.nextAction || '') : ''}" placeholder="다음 행동 입력 시 Task로 자동 연동" class="w-full px-3 py-1.5 border rounded-lg border-cyan-200 bg-white font-bold mb-2">
                      <label class="flex items-center gap-1.5 text-xs text-slate-600">
                        <input type="checkbox" name="createTaskFromNextAction" value="true" checked>
                        <span>Task 목록에 자동 추가하기</span>
                      </label>
                    </div>
                  </div>

                  <div class="pt-4 flex items-center justify-between border-t border-slate-100">
                    ${currentEditingLog ? `
                      <button type="button" id="btn-delete-log" class="text-rose-600 hover:text-rose-800 font-bold">삭제</button>
                    ` : '<div></div>'}
                    <button type="submit" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-sm">
                      ${currentEditingLog ? '수정 저장' : '업무일지 저장'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Right Column History -->
            <div class="lg:col-span-5">
              <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-3">
                <h2 class="text-sm font-bold text-slate-800 mb-3">지난 업무일지 이력 (${logs.length})</h2>
                <div class="space-y-3 max-h-[750px] overflow-y-auto">
                  ${logs.map(log => `
                    <div class="p-4 rounded-2xl border cursor-pointer log-card ${currentEditingLog && currentEditingLog.id === log.id ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-100' : 'border-slate-100 bg-slate-50/50 hover:bg-white'}" data-id="${log.id}">
                      <div class="flex items-center justify-between gap-2 mb-1">
                        <span class="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border">${log.date}</span>
                        <span class="text-[11px] text-emerald-700 font-semibold truncate max-w-[140px]">${store.getProject(log.projectId)?.name || '-'}</span>
                      </div>
                      <h3 class="text-xs font-bold text-slate-800 mb-1 leading-snug">${log.title}</h3>
                      ${log.results ? `<div class="text-[11px] text-emerald-800 line-clamp-2 mt-1">📊 ${log.results}</div>` : ''}
                      ${log.nextAction ? `<div class="text-[11px] text-cyan-800 line-clamp-1 mt-1">⏩ ${log.nextAction}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      container.querySelector('#btn-new-log-top').onclick = () => {
        this.selectedLogId = null;
        this.renderDailyLog(container);
      };

      const btnCancel = container.querySelector('#btn-cancel-edit');
      if (btnCancel) {
        btnCancel.onclick = () => {
          this.selectedLogId = null;
          this.renderDailyLog(container);
        };
      }

      container.querySelectorAll('.log-card').forEach(card => {
        card.onclick = () => {
          this.selectedLogId = card.dataset.id;
          this.renderDailyLog(container);
        };
      });

      const btnDel = container.querySelector('#btn-delete-log');
      if (btnDel && currentEditingLog) {
        btnDel.onclick = () => {
          ModalManager.showConfirm('일지 삭제', '이 업무일지를 삭제하시겠습니까?', () => {
            store.deleteDailyLog(currentEditingLog.id);
            this.selectedLogId = null;
            ModalManager.showToast('일지가 삭제되었습니다.', 'info');
            this.renderDailyLog(container);
          });
        };
      }

      const form = container.querySelector('#daily-log-form');
      form.onsubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const logId = fd.get('logId');
        const data = {
          date: fd.get('date'),
          projectId: fd.get('projectId'),
          title: fd.get('title'),
          workTypes: fd.getAll('workTypes'),
          goal: fd.get('goal'),
          workDone: fd.get('workDone'),
          results: fd.get('results'),
          problems: fd.get('problems'),
          questions: fd.get('questions'),
          nextAction: fd.get('nextAction'),
          createTaskFromNextAction: fd.get('createTaskFromNextAction') === 'true'
        };

        if (logId) {
          store.updateDailyLog(logId, data);
          ModalManager.showToast('업무일지가 수정되었습니다!', 'success');
        } else {
          const newLog = store.addDailyLog(data);
          this.selectedLogId = newLog.id;
          ModalManager.showToast('새 업무일지가 저장되었습니다!', 'success');
        }
        this.renderDailyLog(container);
      };
    }

    // --- PROJECTS RENDER ---
    renderProjects(container) {
      if (this.selectedProjectId) {
        this.renderProjectWorkspace(container);
      } else {
        this.renderProjectList(container);
      }
    }

    renderProjectList(container) {
      const projects = store.getProjects();
      container.innerHTML = `
        <div class="space-y-6 animate-fade-in pb-16">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-slate-800">연구 프로젝트 (Projects)</h1>
              <p class="text-xs text-slate-500 mt-0.5">모든 연구 활동(일지, 실험, 논문, 아이디어, Task)의 중심이 되는 프로젝트 목록입니다.</p>
            </div>
            <button id="btn-create-proj-top" class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-md">
              + 새 프로젝트 생성
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${projects.map(p => `
              <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-indigo-200 card-hover cursor-pointer project-item-card transition-all flex flex-col justify-between" data-id="${p.id}">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="text-xs font-bold px-2.5 py-1 rounded-lg ${p.type === 'Main' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}">
                      ${p.type === 'Main' ? '주과제' : '서브'}
                    </span>
                    <span class="text-xs px-2.5 py-0.5 rounded-full badge-${p.status.toLowerCase().replace(/\s+/g, '')} font-bold">${p.status}</span>
                  </div>
                  <h3 class="font-bold text-slate-800 text-lg mb-2 leading-snug">${p.name}</h3>
                  <p class="text-xs text-slate-500 line-clamp-3 mb-4">${p.researchGoal || p.description}</p>
                </div>
                <div class="space-y-3 pt-3 border-t border-slate-100 text-xs">
                  <div class="bg-slate-50 p-2.5 rounded-xl space-y-1">
                    <div class="truncate text-slate-700"><span class="font-bold">🎯 집중:</span> ${p.currentFocus || '미입력'}</div>
                    <div class="truncate text-slate-700"><span class="font-bold">⏩ 다음:</span> ${p.nextAction || '미입력'}</div>
                  </div>
                  <div>
                    <div class="flex justify-between font-semibold text-slate-600 mb-1">
                      <span>진행률</span>
                      <span class="text-indigo-600 font-bold">${p.progress}%</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style="width: ${p.progress}%"></div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      container.querySelector('#btn-create-proj-top').onclick = () => QuickAddModal.open('project');
      container.querySelectorAll('.project-item-card').forEach(card => {
        card.onclick = () => {
          this.selectedProjectId = card.dataset.id;
          this.renderProjects(container);
        };
      });
    }

    renderProjectWorkspace(container) {
      const project = store.getProject(this.selectedProjectId);
      if (!project) { this.selectedProjectId = null; this.renderProjects(container); return; }
      const rel = store.getProjectRelatedData(project.id);
      const { tasks, dailyLogs, experiments, literature, ideas } = rel;

      container.innerHTML = `
        <div class="space-y-6 animate-fade-in pb-16">
          <div class="flex items-center justify-between">
            <button id="btn-back-proj" class="text-xs font-semibold text-slate-600 bg-white px-3.5 py-2 rounded-xl border shadow-sm">
              ← 프로젝트 목록으로
            </button>
            <button id="btn-quick-log-proj" class="text-xs font-bold text-white bg-emerald-600 px-3.5 py-2 rounded-xl shadow-sm">
              📝 이 프로젝트 일지 작성
            </button>
          </div>

          <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4">
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-xs font-bold px-2.5 py-0.5 rounded-lg ${project.type === 'Main' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}">${project.type}</span>
                  <span class="text-xs px-2.5 py-0.5 rounded-full badge-${project.status.toLowerCase().replace(/\s+/g, '')} font-bold">${project.status}</span>
                </div>
                <h1 class="text-2xl font-extrabold text-slate-800">${project.name}</h1>
                <p class="text-xs text-slate-600 mt-2 max-w-2xl">${project.description || project.researchGoal}</p>
              </div>
              <div class="bg-slate-50 p-4 rounded-2xl border text-xs min-w-[180px] space-y-1">
                <div class="flex justify-between font-bold"><span>진행률</span><span class="text-indigo-600">${project.progress}%</span></div>
                <div class="w-full bg-slate-200 rounded-full h-2"><div class="bg-indigo-600 h-2 rounded-full" style="width: ${project.progress}%"></div></div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t text-xs">
              <div class="bg-amber-50 p-3 rounded-2xl"><span class="font-bold text-amber-900">🎯 현재 집중 과제:</span> ${project.currentFocus || '미입력'}</div>
              <div class="bg-emerald-50 p-3 rounded-2xl"><span class="font-bold text-emerald-900">⏩ 다음 실행 행동:</span> ${project.nextAction || '미입력'}</div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Tasks in Proj -->
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-3">
              <h3 class="font-bold text-sm text-slate-800">과제 Action Tasks (${tasks.length})</h3>
              <div class="space-y-2 text-xs">
                ${tasks.map(t => `
                  <div class="p-3 rounded-xl bg-slate-50 border flex items-center justify-between">
                    <span class="${t.status === 'Done' ? 'line-through text-slate-400' : 'font-bold text-slate-800'}">${t.name}</span>
                    <span class="px-2 py-0.5 rounded-full badge-${t.status.toLowerCase().replace(/\s+/g, '')}">${t.status}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Experiments in Proj -->
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-3">
              <h3 class="font-bold text-sm text-slate-800">배터리 실험/시뮬레이션 (${experiments.length})</h3>
              <div class="space-y-2 text-xs">
                ${experiments.map(e => `
                  <div class="p-3 rounded-xl bg-slate-50 border">
                    <div class="flex justify-between font-bold mb-1">
                      <span class="text-purple-900">${e.name}</span>
                      <span class="badge-${e.status.toLowerCase().replace(/\s+/g, '')} px-2 py-0.5 rounded-full">${e.status}</span>
                    </div>
                    <div class="text-[11px] text-slate-500">${e.conditions?.chargingProtocol || 'CC'} · ${e.cellId || 'Cell'}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;

      container.querySelector('#btn-back-proj').onclick = () => {
        this.selectedProjectId = null;
        this.renderProjects(container);
      };
      container.querySelector('#btn-quick-log-proj').onclick = () => {
        QuickAddModal.open('dailyLog', project.id);
      };
    }

    // --- TASKS RENDER ---
    renderTasks(container) {
      const tasks = store.getTasks();
      container.innerHTML = `
        <div class="space-y-6 animate-fade-in pb-16">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-slate-800">연구 Task 관리 (Actions)</h1>
              <p class="text-xs text-slate-500 mt-0.5">다음에 실제로 수행해야 하는 연구 행동을 관리합니다.</p>
            </div>
            <button id="btn-add-task-view" class="px-4 py-2 bg-blue-600 text-white rounded-2xl text-xs font-bold shadow-md">+ Task 추가</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            ${['Todo', 'In Progress', 'Blocked', 'Done'].map(status => {
              const colTasks = tasks.filter(t => t.status === status);
              return `
                <div class="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col min-h-[450px]">
                  <div class="font-bold text-xs text-slate-700 pb-3 mb-3 border-b flex justify-between">
                    <span>${status}</span>
                    <span class="px-2 py-0.5 bg-slate-100 rounded-full">${colTasks.length}</span>
                  </div>
                  <div class="space-y-3 flex-1 overflow-y-auto">
                    ${colTasks.map(t => `
                      <div class="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                        <div class="font-bold text-slate-800">${t.name}</div>
                        <div class="text-[11px] text-slate-400 flex justify-between">
                          <span>${store.getProject(t.projectId)?.name || '-'}</span>
                          <span>${t.dueDate}</span>
                        </div>
                        <div class="pt-2 border-t flex justify-end">
                          <select class="task-status-sel text-[10px] border rounded px-1" data-id="${t.id}">
                            <option value="Todo" ${t.status==='Todo'?'selected':''}>대기</option>
                            <option value="In Progress" ${t.status==='In Progress'?'selected':''}>진행</option>
                            <option value="Blocked" ${t.status==='Blocked'?'selected':''}>보류</option>
                            <option value="Done" ${t.status==='Done'?'selected':''}>완료</option>
                          </select>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      container.querySelector('#btn-add-task-view').onclick = () => QuickAddModal.open('task');
      container.querySelectorAll('.task-status-sel').forEach(sel => {
        sel.onchange = (e) => {
          store.updateTask(sel.dataset.id, { status: e.target.value });
          this.renderTasks(container);
        };
      });
    }

    // --- EXPERIMENTS RENDER ---
    renderExperiments(container) {
      const exps = store.getExperiments();
      container.innerHTML = `
        <div class="space-y-6 animate-fade-in pb-16">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-slate-800">배터리 실험 및 시뮬레이션 노트</h1>
              <p class="text-xs text-slate-500 mt-0.5">전기화학 데이터, 충전 프로토콜, 실패 원인 분석(Post-mortem)을 기록합니다.</p>
            </div>
            <button id="btn-add-exp-view" class="px-4 py-2 bg-purple-600 text-white rounded-2xl text-xs font-bold shadow-md">+ 새 실험 기록</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${exps.map(e => `
              <div class="bg-white rounded-3xl p-6 shadow-sm border ${e.status === 'Failed' ? 'border-rose-200 bg-rose-50/20' : 'border-slate-100'} space-y-3 text-xs">
                <div class="flex justify-between items-center">
                  <span class="font-bold px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-900">${e.cellId || 'Cell'}</span>
                  <span class="px-2.5 py-0.5 rounded-full badge-${e.status.toLowerCase().replace(/\s+/g, '')} font-bold">${e.status}</span>
                </div>
                <h3 class="font-bold text-sm text-slate-800">${e.name}</h3>
                <p class="text-slate-500">${e.purpose || ''}</p>
                <div class="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border text-[11px]">
                  <div>전류밀도: <b>${e.conditions?.currentDensity || '-'}</b></div>
                  <div>프로토콜: <b>${e.conditions?.chargingProtocol || '-'}</b></div>
                </div>
                ${e.result ? `<div class="p-2.5 bg-emerald-50 rounded-xl text-emerald-900"><b>결과:</b> ${e.result}</div>` : ''}
                ${e.problems ? `<div class="p-2.5 bg-rose-50 rounded-xl text-rose-900"><b>이슈/실패 원인:</b> ${e.problems}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
      container.querySelector('#btn-add-exp-view').onclick = () => QuickAddModal.open('experiment');
    }

    // --- LITERATURE RENDER ---
    renderLiterature(container) {
      const lits = store.getLiterature();
      container.innerHTML = `
        <div class="space-y-6 animate-fade-in pb-16">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-slate-800">연구 연계 논문 관리 (Literature)</h1>
              <p class="text-xs text-slate-500 mt-0.5">"이 논문이 내 연구에 왜 중요한가?"를 중심으로 관리합니다.</p>
            </div>
            <button id="btn-add-lit-view" class="px-4 py-2 bg-amber-600 text-white rounded-2xl text-xs font-bold shadow-md">+ 논문 등록</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${lits.map(l => `
              <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-3 text-xs">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">${l.journal} (${l.year})</span>
                  <span class="badge-completed px-2 py-0.5 rounded-full">${l.readingStatus}</span>
                </div>
                <h3 class="font-bold text-sm text-slate-800">${l.title}</h3>
                <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
                  <div class="font-bold mb-0.5">★ 이 논문이 내 연구에 왜 중요한가?</div>
                  <div>${l.relevance || '-'}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      container.querySelector('#btn-add-lit-view').onclick = () => QuickAddModal.open('literature');
    }

    // --- IDEAS RENDER ---
    renderIdeas(container) {
      const ideas = store.getIdeas();
      container.innerHTML = `
        <div class="space-y-6 animate-fade-in pb-16">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-slate-800">연구 아이디어 및 가설 (Ideas)</h1>
              <p class="text-xs text-slate-500 mt-0.5">실험이나 논문 공부 중 떠오른 가설과 제안 실험을 구체화합니다.</p>
            </div>
            <button id="btn-add-idea-view" class="px-4 py-2 bg-pink-600 text-white rounded-2xl text-xs font-bold shadow-md">+ 아이디어 등록</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${ideas.map(i => `
              <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-3 text-xs">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-pink-900 bg-pink-100 px-2 py-0.5 rounded">가설/아이디어</span>
                  <span class="badge-active px-2 py-0.5 rounded-full">${i.status}</span>
                </div>
                <h3 class="font-bold text-sm text-slate-800">${i.title}</h3>
                <div class="p-3 bg-pink-50 rounded-xl border border-pink-200 text-pink-950">
                  <b>연구 가설:</b> ${i.hypothesis || '-'}
                </div>
                ${i.proposedExperiment ? `<div class="p-2.5 bg-emerald-50 rounded-xl text-emerald-900"><b>제안 실험:</b> ${i.proposedExperiment}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
      container.querySelector('#btn-add-idea-view').onclick = () => QuickAddModal.open('idea');
    }

    // --- WEEKLY REVIEW RENDER ---
    renderWeeklyReview(container) {
      const reviews = store.getWeeklyReviews();
      const currentRev = this.selectedReviewId ? store.getWeeklyReview(this.selectedReviewId) : (reviews[0] || null);

      container.innerHTML = `
        <div class="space-y-6 animate-fade-in pb-16">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-slate-800">주간 연구 회고 (Weekly Review)</h1>
              <p class="text-xs text-slate-500 mt-0.5">한 주간의 연구를 자동 집계하여 랩미팅 보고서를 작성합니다.</p>
            </div>
            <button id="btn-copy-rev-md" class="px-4 py-2 bg-teal-600 text-white rounded-2xl text-xs font-bold shadow-md">
              📋 랩미팅용 마크다운 복사
            </button>
          </div>

          <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4">
            <h2 class="text-lg font-bold text-slate-800">${currentRev ? currentRev.title : '주간 보고서'}</h2>
            <div class="space-y-4 text-xs">
              <div class="p-4 bg-slate-50 rounded-2xl border">
                <b class="text-slate-800">1. 이번 주 완료 업무 및 성과:</b>
                <pre class="font-sans whitespace-pre-wrap mt-1 text-slate-700">${currentRev?.completedWork || '-'}</pre>
              </div>
              <div class="p-4 bg-purple-50/40 rounded-2xl border border-purple-100">
                <b class="text-purple-900">2. 수행한 배터리 실험 / COMSOL Simulation:</b>
                <pre class="font-sans whitespace-pre-wrap mt-1 text-purple-800">${currentRev?.experimentsSummary || '-'}</pre>
              </div>
              <div class="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100">
                <b class="text-emerald-900">3. 주요 결과 및 정량 데이터:</b>
                <pre class="font-sans whitespace-pre-wrap mt-1 text-emerald-800">${currentRev?.keyResults || '-'}</pre>
              </div>
              <div class="p-4 bg-rose-50/40 rounded-2xl border border-rose-100">
                <b class="text-rose-900">4. 실패한 실험 및 미해결 이슈 (Post-Mortem):</b>
                <pre class="font-sans whitespace-pre-wrap mt-1 text-rose-800">${currentRev?.failedExpAndIssues || '-'}</pre>
              </div>
              <div class="p-4 bg-cyan-50/40 rounded-2xl border border-cyan-100">
                <b class="text-cyan-900">5. 교수님 / 선배 미팅 안건 및 질문:</b>
                <pre class="font-sans whitespace-pre-wrap mt-1 text-cyan-800">${currentRev?.questionsForAdvisor || '-'}</pre>
              </div>
              <div class="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100">
                <b class="text-indigo-900">6. 다음 주 연구 목표:</b>
                <pre class="font-sans whitespace-pre-wrap mt-1 text-indigo-800">${currentRev?.nextWeekGoals || '-'}</pre>
              </div>
            </div>
          </div>
        </div>
      `;

      container.querySelector('#btn-copy-rev-md').onclick = () => {
        if (!currentRev) return;
        const text = `# [주간 랩미팅 보고서] ${currentRev.title}\n\n### 1. 완료 업무\n${currentRev.completedWork}\n\n### 2. 실험 및 시뮬레이션\n${currentRev.experimentsSummary}\n\n### 3. 주요 결과\n${currentRev.keyResults}\n\n### 4. 이슈 및 질문\n${currentRev.questionsForAdvisor}\n\n### 5. 차주 목표\n${currentRev.nextWeekGoals}`;
        navigator.clipboard.writeText(text).then(() => {
          ModalManager.triggerCelebration();
          ModalManager.showToast('보고서 텍스트가 클립보드에 복사되었습니다!', 'success');
        });
      };
    }

    // --- SETTINGS RENDER ---
    renderSettings(container) {
      const settings = store.getSettings();
      container.innerHTML = `
        <div class="space-y-6 animate-fade-in pb-16 max-w-4xl mx-auto">
          <h1 class="text-2xl font-bold text-slate-800">환경 설정 및 데이터 관리 (Settings)</h1>
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4 text-xs">
            <h2 class="text-sm font-bold text-slate-800">연구생 프로필</h2>
            <div class="grid grid-cols-3 gap-3">
              <div><label class="block mb-1 text-slate-500">연구생</label><input type="text" id="set-name" value="${settings.researcherName}" class="w-full px-3 py-2 border rounded-xl"></div>
              <div><label class="block mb-1 text-slate-500">연구실</label><input type="text" id="set-lab" value="${settings.labName}" class="w-full px-3 py-2 border rounded-xl"></div>
              <div><label class="block mb-1 text-slate-500">지도교수</label><input type="text" id="set-adv" value="${settings.advisorName}" class="w-full px-3 py-2 border rounded-xl"></div>
            </div>
            <div class="flex justify-end"><button id="btn-save-profile" class="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold">저장</button></div>
          </div>

          <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4 text-xs">
            <h2 class="text-sm font-bold text-slate-800">데이터 백업 및 초기화</h2>
            <div class="flex gap-3">
              <button id="btn-export-json" class="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold">JSON 백업 다운로드</button>
              <button id="btn-reset-sample" class="px-4 py-2 bg-rose-600 text-white rounded-xl font-bold">초기 5대 프로젝트로 리셋</button>
            </div>
          </div>
        </div>
      `;

      container.querySelector('#btn-save-profile').onclick = () => {
        store.updateSettings({
          researcherName: document.getElementById('set-name').value,
          labName: document.getElementById('set-lab').value,
          advisorName: document.getElementById('set-adv').value
        });
        ModalManager.showToast('프로필 정보가 저장되었습니다!', 'success');
      };

      container.querySelector('#btn-export-json').onclick = () => {
        const str = store.exportDataJSON();
        const blob = new Blob([str], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `BatteryLab_Backup_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      };

      container.querySelector('#btn-reset-sample').onclick = () => {
        ModalManager.showConfirm('초기화', '5대 배터리 연구실 초기 샘플 데이터로 복원하시겠습니까?', () => {
          store.resetToSampleData(true);
          ModalManager.showToast('초기 데이터로 복원되었습니다.', 'success');
          this.navigate('dashboard');
        });
      };
    }

    bindGlobalEvents() {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.onclick = (e) => {
          e.preventDefault();
          this.navigate(link.dataset.view);
          const sidebar = document.getElementById('sidebar');
          if (sidebar && !sidebar.classList.contains('hidden') && window.innerWidth < 1024) {
            sidebar.classList.add('hidden');
          }
        };
      });

      const searchBtn = document.getElementById('global-search-trigger');
      if (searchBtn) searchBtn.onclick = () => SearchModal.open();
      const topSearchInput = document.getElementById('top-search-bar');
      if (topSearchInput) topSearchInput.onclick = () => SearchModal.open();

      const quickAddBtn = document.getElementById('global-quick-add-btn');
      if (quickAddBtn) quickAddBtn.onclick = () => QuickAddModal.open('dailyLog');
      const floatingAddBtn = document.getElementById('floating-quick-add-btn');
      if (floatingAddBtn) floatingAddBtn.onclick = () => QuickAddModal.open('dailyLog');

      const menuToggleBtn = document.getElementById('mobile-menu-toggle');
      const sidebar = document.getElementById('sidebar');
      if (menuToggleBtn && sidebar) {
        menuToggleBtn.onclick = () => sidebar.classList.toggle('hidden');
      }
    }
  }

  // Auto start
  function start() {
    window.app = new App();
    window.app.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
