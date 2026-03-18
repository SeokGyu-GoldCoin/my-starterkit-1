package com.map.starterkit.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
  private T data;
  private String message;
  private int status;
  private long timestamp = System.currentTimeMillis();

  public static <T> ApiResponse<T> ok(T data) {
    return ApiResponse.<T>builder()
      .data(data)
      .status(200)
      .message("성공")
      .build();
  }

  public static <T> ApiResponse<T> ok(T data, String message) {
    return ApiResponse.<T>builder()
      .data(data)
      .status(200)
      .message(message)
      .build();
  }

  public static <T> ApiResponse<T> error(String message, int status) {
    return ApiResponse.<T>builder()
      .status(status)
      .message(message)
      .build();
  }
}
