package com.map.starterkit.domain.marker;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MarkerService {
  private final MarkerRepository markerRepository;

  // 모든 마커 조회
  public List<MarkerResponse> getAllMarkers() {
    return markerRepository.findAll()
      .stream()
      .map(MarkerResponse::fromEntity)
      .collect(Collectors.toList());
  }

  // 특정 마커 조회
  public MarkerResponse getMarkerById(String id) {
    return markerRepository.findById(id)
      .map(MarkerResponse::fromEntity)
      .orElseThrow(() -> new RuntimeException("마커를 찾을 수 없습니다: " + id));
  }

  // 마커 생성
  @Transactional
  public MarkerResponse createMarker(MarkerRequest request) {
    Marker marker = Marker.builder()
      .title(request.getTitle())
      .latitude(request.getLat())
      .longitude(request.getLng())
      .description(request.getDescription())
      .build();

    Marker savedMarker = markerRepository.save(marker);
    return MarkerResponse.fromEntity(savedMarker);
  }

  // 마커 업데이트
  @Transactional
  public MarkerResponse updateMarker(String id, MarkerRequest request) {
    Marker marker = markerRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("마커를 찾을 수 없습니다: " + id));

    if (request.getTitle() != null) {
      marker.setTitle(request.getTitle());
    }
    if (request.getLat() != null) {
      marker.setLatitude(request.getLat());
    }
    if (request.getLng() != null) {
      marker.setLongitude(request.getLng());
    }
    if (request.getDescription() != null) {
      marker.setDescription(request.getDescription());
    }

    Marker updatedMarker = markerRepository.save(marker);
    return MarkerResponse.fromEntity(updatedMarker);
  }

  // 마커 삭제
  @Transactional
  public void deleteMarker(String id) {
    if (!markerRepository.existsById(id)) {
      throw new RuntimeException("마커를 찾을 수 없습니다: " + id);
    }
    markerRepository.deleteById(id);
  }
}
