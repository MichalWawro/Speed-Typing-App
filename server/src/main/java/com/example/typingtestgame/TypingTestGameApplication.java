package com.example.typingtestgame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.http.converter.json.GsonBuilderUtils;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class TypingTestGameApplication {

	public static void main(String[] args) {
		SpringApplication.run(TypingTestGameApplication.class, args);
		System.out.println("Hello");
	}
}
