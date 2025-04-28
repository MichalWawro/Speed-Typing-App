package com.example.typingtestgame.controller;

import com.example.typingtestgame.service.RandomTextService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RandomTextController {

    private final RandomTextService randomTextService;

    @Autowired
    public RandomTextController(RandomTextService randomTextService) {
        this.randomTextService = randomTextService;
    }

    @GetMapping("/get-random-array")
    @CrossOrigin(origins = {"http://localhost:3000"})
    public ResponseEntity<List<String>> getRandomWords(
            @RequestParam(defaultValue = "200") int count) {
        return ResponseEntity.ok(randomTextService.getRandomWords(count));
    }
}