package com.map.starterkit.domain.marker;

import com.map.starterkit.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/markers")
@RequiredArgsConstructor
public class MarkerController {
  private final MarkerService markerService;

  // 모든 마커 조회
  @GetMapping
  public ResponseEntity<ApiResponse<List<MarkerResponse>>> getAllMarkers() {
    List<MarkerResponse> markers = markerService.getAllMarkers();
    return ResponseEntity.ok(ApiResponse.ok(markers));
  }

  // 특정 마커 조회
  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<MarkerResponse>> getMarker(@PathVariable String id) {
    MarkerResponse marker = markerService.getMarkerById(id);
    return ResponseEntity.ok(ApiResponse.ok(marker));
  }

  // 마커 생성
  @PostMapping
  public ResponseEntity<ApiResponse<MarkerResponse>> createMarker(
    @RequestBody MarkerRequest request) {
    MarkerResponse marker = markerService.createMarker(request);
    return ResponseEntity.status(201).body(ApiResponse.ok(marker, "마커가 생성되었습니다"));
  }

  // 마커 업데이트
  @PutMapping("/{id}")
  public ResponseEntity<ApiResponse<MarkerResponse>> updateMarker(
    @PathVariable String id,
    @RequestBody MarkerRequest request) {
    MarkerResponse marker = markerService.updateMarker(id, request);
    return ResponseEntity.ok(ApiResponse.ok(marker, "마커가 업데이트되었습니다"));
  }

  // 마커 삭제
  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Void>> deleteMarker(@PathVariable String id) {
    markerService.deleteMarker(id);
    return ResponseEntity.ok(ApiResponse.ok(null, "마커가 삭제되었습니다"));
  }
}
