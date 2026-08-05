package com.prescripto.backend.dto;

import lombok.Data;

@Data
public class RescheduleRequest {
    private String newDate;
    private String newTime;
}
