package com.map.starterkit.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
  @Bean
  public OpenAPI customOpenAPI() {
    return new OpenAPI()
      .info(new Info()
        .title("지도 Starter Kit API")
        .version("0.1.0")
        .description("지도 기반 프로젝트 스타터킷 백엔드 API"));
  }
}
