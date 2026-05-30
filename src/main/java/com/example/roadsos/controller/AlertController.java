package com.example.roadsos.controller;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AlertController {

    private String status = "WAITING";

    private double latitude;
    private double longitude;

    private String accidentTime = "--";

    @PostMapping("/alert")
    public String receiveAlert(
            @RequestBody Map<String,Object> data) {

        status = "ACCIDENT";

        latitude =
            Double.parseDouble(
                data.get("latitude").toString());

        longitude =
            Double.parseDouble(
                data.get("longitude").toString());

        accidentTime =
            LocalDateTime.now()
            .format(
                DateTimeFormatter.ofPattern(
                    "dd-MM-yyyy HH:mm:ss"));

        System.out.println("🚨 ALERT RECEIVED");

        return "SUCCESS";
    }

    @GetMapping("/status")
    public Map<String,Object> getStatus() {

        Map<String,Object> response =
            new HashMap<>();

        response.put("status", status);
        response.put("latitude", latitude);
        response.put("longitude", longitude);
        response.put("time", accidentTime);

        return response;
    }

    @PostMapping("/reset")
    public String reset() {

        status = "WAITING";

        latitude = 0;
        longitude = 0;

        accidentTime = "--";

        return "RESET";
    }
}