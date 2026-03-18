-- 마커 테이블 생성
CREATE TABLE marker (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(50) NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  description VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_marker_created_at ON marker(created_at);
