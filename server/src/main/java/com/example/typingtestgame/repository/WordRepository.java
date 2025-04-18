package com.example.typingtestgame.repository;

import org.springframework.stereotype.Component;

import java.io.*;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class WordRepository {
    private final List<String> words;

    public WordRepository() throws IOException {
        InputStream inputStream = getClass().getResourceAsStream("/words.txt");
        if (inputStream == null) {
            throw new FileNotFoundException("words.txt not found in resources");
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            words = reader.lines().collect(Collectors.toList());
        }
    }

    public List<String> getAllWords() {
        return words;
    }
}
