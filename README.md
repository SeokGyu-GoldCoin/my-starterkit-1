# 지도 Starter Kit

지도 중심 프로젝트를 빠르게 시작할 수 있는 완전한 Starter Kit입니다.

## 주요 특징

### 프론트엔드 (Next.js 15)
- **독립 실행 가능**: Next.js Route Handlers를 목 백엔드로 사용
- **GIS 유연성**: 환경변수 한 줄로 Kakao/Naver/VWORLD 지도 전환
- **모던 스택**: React 19, TypeScript, Tailwind CSS v4, shadcn/ui
- **상태 관리**: Zustand (클라이언트 상태), TanStack Query v5 (서버 상태)
- **폼 검증**: react-hook-form + zod

### 백엔드 (Spring Boot 3.2)
- **GIS 지원**: PostgreSQL 15 + PostGIS 3
- **마이그레이션**: Flyway 자동화
- **API 문서**: SpringDoc OpenAPI (Swagger UI)

## 프로젝트 구조

```
my-starterkit-1/
├── frontend/                          # Next.js 프로젝트
│   ├── app/
│   │   ├── (map)/map/                # 전체화면 지도
│   │   ├── (main)/examples/          # 예제 페이지
│   │   └── api/mock/                 # 목 API
│   ├── components/
│   │   ├── layout/                   # 레이아웃 컴포넌트
│   │   ├── map/                      # 지도 관련
│   │   └── ui/                       # shadcn/ui 컴포넌트
│   ├── lib/
│   │   ├── api/                      # Axios 클라이언트
│   │   ├── map/                      # GIS 어댑터
│   │   └── validations/              # Zod 스키마
│   ├── hooks/                        # React Hook (useMarkers 등)
│   ├── stores/                       # Zustand 스토어
│   └── middleware.ts                 # 프로덕션 목 API 차단
│
├── backend/                           # Spring Boot 프로젝트
│   ├── src/main/java/com/map/starterkit/
│   │   ├── config/                   # CORS, OpenAPI 설정
│   │   ├── domain/marker/            # 마커 도메인
│   │   └── common/                   # 공통 응답 구조
│   ├── src/main/resources/
│   │   ├── application.yml           # 설정 파일
│   │   └── db/migration/             # Flyway 마이그레이션
│   └── pom.xml                       # Maven 의존성
│
├── docker-compose.yml                # PostgreSQL + PostGIS
└── README.md                         # 이 파일
```

## 빠른 시작

### 1. 프론트엔드 설정

```bash
cd frontend

# 환경 변수 설정 (목 모드)
cp .env.example .env.local

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 2. 백엔드 설정 (선택)

```bash
# Docker로 PostgreSQL + PostGIS 시작
docker-compose up -d

cd backend

# Maven으로 빌드
mvn clean install

# Spring Boot 시작
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=local"
```

서버는 `http://localhost:8080` 에서 실행됨

**Swagger UI**: `http://localhost:8080/swagger-ui.html`

### 3. 지도 공급자 전환

#### Kakao Maps 사용
```env
NEXT_PUBLIC_MAP_PROVIDER=kakao
NEXT_PUBLIC_KAKAO_APP_KEY=YOUR_KAKAO_APP_KEY
```

#### Naver Maps 사용
```env
NEXT_PUBLIC_MAP_PROVIDER=naver
NEXT_PUBLIC_NAVER_CLIENT_ID=YOUR_NAVER_CLIENT_ID
```

#### VWORLD 사용
```env
NEXT_PUBLIC_MAP_PROVIDER=vworld
NEXT_PUBLIC_VWORLD_API_KEY=YOUR_VWORLD_API_KEY
```

### 4. 실 백엔드 연결

```env
# 기본값 (목 API)
NEXT_PUBLIC_API_BASE_URL=

# 실 백엔드 연결
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

## API 엔드포인트

### 마커 (Markers)

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/api/markers` | 모든 마커 조회 |
| GET | `/api/markers/:id` | 특정 마커 조회 |
| POST | `/api/markers` | 마커 생성 |
| PUT | `/api/markers/:id` | 마커 업데이트 |
| DELETE | `/api/markers/:id` | 마커 삭제 |

### 요청 예제

```bash
# 마커 생성
curl -X POST http://localhost:8080/api/markers \
  -H "Content-Type: application/json" \
  -d '{
    "title": "서울 시청",
    "lat": 37.5665,
    "lng": 126.9780,
    "description": "서울의 중심"
  }'

# 모든 마커 조회
curl http://localhost:8080/api/markers
```

## 개발 가이드

### 페이지 추가

새로운 페이지는 `/app/(main)/examples/` 아래에 추가하세요:

```bash
# /app/(main)/myfeature/page.tsx
export default function MyFeaturePage() {
  return <div>My Feature</div>
}
```

### 지도 관련 작업

지도 인스턴스는 `useMap()` hook으로 접근할 수 있습니다:

```tsx
const { map } = useMap()  // IMapAdapter 반환
```

## 환경 변수

### 프론트엔드

- `NEXT_PUBLIC_MAP_PROVIDER`: 지도 공급자 선택
- `NEXT_PUBLIC_KAKAO_APP_KEY`: Kakao API 키
- `NEXT_PUBLIC_NAVER_CLIENT_ID`: Naver API 키
- `NEXT_PUBLIC_VWORLD_API_KEY`: VWORLD API 키
- `NEXT_PUBLIC_API_BASE_URL`: 백엔드 API 주소

### 백엔드

- `SPRING_DATASOURCE_URL`: PostgreSQL 연결 URL
- `SPRING_DATASOURCE_USERNAME`: DB 사용자명
- `SPRING_DATASOURCE_PASSWORD`: DB 비밀번호
- `SPRING_PROFILES_ACTIVE`: 활성 프로필 (local, prod)

## 빌드 및 배포

### 프론트엔드 빌드

```bash
cd frontend
npm run build
npm start  # 프로덕션 서버
```

### 백엔드 빌드

```bash
cd backend
mvn clean package
java -jar target/starterkit-0.1.0.jar
```

## 주의사항

- **목 API**: 프로덕션에서는 자동으로 차단됨 (middleware.ts)
- **환경 변수**: `.env.local` 파일을 `.gitignore`에 포함시킬 것
- **PostGIS**: 배포 시 PostgreSQL 이미지는 `postgis/postgis`를 사용할 것

## 기술 스택

### 프론트엔드
- Next.js 15 (App Router, RSC)
- React 19 + TypeScript
- Tailwind CSS v4
- shadcn/ui
- Zustand (상태)
- TanStack Query v5 (서버 상태)
- react-hook-form + zod (폼)
- next-themes (다크모드)
- Axios (HTTP 클라이언트)

### 백엔드
- Spring Boot 3.2
- Spring Data JPA
- PostgreSQL 15
- PostGIS 3
- Flyway (마이그레이션)
- Lombok
- MapStruct
- SpringDoc OpenAPI

## 라이선스

MIT

## 지원

문제가 발생하면 GitHub Issues를 참고하세요.
