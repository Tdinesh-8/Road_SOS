package com.example.roadsos.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AlertController {

    private String status = "WAITING";

    private double latitude;
    private double longitude;

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

        System.out.println("🚨 ALERT RECEIVED");

        System.out.println(
            "Latitude : " + latitude);

        System.out.println(
            "Longitude : " + longitude);

        return "SUCCESS";
    }

    @GetMapping("/status")
    public Map<String,Object> getStatus() {

        Map<String,Object> response =
            new HashMap<>();

        response.put("status", status);
        response.put("latitude", latitude);
        response.put("longitude", longitude);

        return response;
    }
}