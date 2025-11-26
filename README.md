# 웨딩가드 계약서 분석기

웨딩 계약서 AI 분석 서비스 - 간소화 버전

## 기능

- 홈 페이지: 서비스 소개 및 통계
- 계약서 분석: AI 기반 계약서 업로드 및 분석

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드된 앱 미리보기
npm run preview
```

## 기술 스택

- React 19
- Vite
- Tailwind CSS
- Lucide React (아이콘)

## API 엔드포인트

계약서 분석 API: `https://n8n.dpgtestbed.kr/webhook-test/analyzeContract`

## 디렉토리 구조

```
contract-analyzer/
├── src/
│   ├── components/
│   │   ├── AnalyzeSection.jsx
│   │   ├── HomeSection.jsx
│   │   ├── Modal.jsx
│   │   ├── Navigation.jsx
│   │   └── Toast.jsx
│   ├── data/
│   │   └── contractRisks.js
│   ├── styles/
│   │   └── components.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```
