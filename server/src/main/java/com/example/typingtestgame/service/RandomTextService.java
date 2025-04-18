package com.example.typingtestgame.service;

import com.example.typingtestgame.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
public class RandomTextService {

    private final WordRepository wordRepository;
    private final Random random = new Random();

    @Autowired
    public RandomTextService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    public List<String> getRandomWords(int count) {
        List<String> allWords = wordRepository.getAllWords();
        List<String> shuffled = new ArrayList<>(allWords);
        Collections.shuffle(shuffled);
        return shuffled.subList(0, Math.min(count, shuffled.size()));
    }
}
