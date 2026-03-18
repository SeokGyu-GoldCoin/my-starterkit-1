package com.map.starterkit.domain.marker;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarkerResponse {
  private String id;
  private String title;
  private Double lat;
  private Double lng;
  private String description;

  public static MarkerResponse fromEntity(Marker marker) {
    return MarkerResponse.builder()
      .id(marker.getId())
      .title(marker.getTitle())
      .lat(marker.getLatitude())
      .lng(marker.getLongitude())
      .description(marker.getDescription())
      .build();
  }
}
