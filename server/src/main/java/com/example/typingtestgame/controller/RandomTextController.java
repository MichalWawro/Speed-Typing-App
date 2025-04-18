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
            @RequestParam(defaultValue = "75") int count) {
        return ResponseEntity.ok(randomTextService.getRandomWords(count));
    }

    @GetMapping("/get-set-array")
    @CrossOrigin(origins = {"http://localhost:3000"})
    public ArrayList getArrayText() {
        return new ArrayList<>(Arrays.asList("car", "dog", "house", "milk",
                "chair", "window", "wisdom", "phone", "book", "shoe", "apple", "train", "school", "cat", "hat", "door",
                "glass", "bottle", "pen", "cup", "bed", "bread", "monkey", "clock", "banana", "couch", "floor", "cloud",
                "sun", "moon", "table", "tree", "family", "star", "river", "lake", "shirt", "pants", "sock", "ball", "cake",
                "flower", "mountain", "road", "bus", "farm", "field", "toothbrush", "pillow", "snow", "rain", "sunset", "sky", "house", "people", "think", "or", "no"));
    }
}
//    @CrossOrigin(origins = {"http://localhost:3000", "http://WebIP:Port"})
//        return ("bread monkey table tree family milk sunset sky house people think or no " +
//                "old fat wide before always never blue fly click echo empty whisper time strange " +
//                "smile mirror howl memory from promise shadow and one deer deep silent soft rain low cold hot" +
//                "bread monkey table tree family milk sunset sky house people think or no " +
//                "old fat wide before always never blue fly click echo empty whisper time strange " +
//                "smile mirror howl memory from promise shadow and one deer deep silent soft rain low cold hot");