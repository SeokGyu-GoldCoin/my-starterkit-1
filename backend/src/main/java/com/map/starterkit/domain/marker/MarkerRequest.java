package com.map.starterkit.domain.marker;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarkerRequest {
  private String title;
  private Double lat;
  private Double lng;
  private String description;
}
