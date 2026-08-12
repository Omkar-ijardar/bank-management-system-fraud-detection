package com.bank.ivr.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.ivr.dto.IVRCallRequest;
import com.bank.ivr.dto.IVRResponseDto;
import com.bank.ivr.entity.IVRCallLog;
import com.bank.ivr.service.IVRService;

@RestController
@RequestMapping("/api/ivr")
public class IVRController {

    private final IVRService ivrService;

    public IVRController(IVRService ivrService) {
        this.ivrService = ivrService;
    }

    @PostMapping(value = "/welcome", produces = MediaType.APPLICATION_XML_VALUE)
    public String welcomeCall() {
        IVRResponseDto response = ivrService.handleWelcomeCall();
        return response.getTwimlXml();
    }

    @PostMapping(value = "/menu", produces = MediaType.APPLICATION_XML_VALUE)
    public String handleMenu(
            @RequestParam(value = "Digits", required = false) String digits,
            @RequestParam(value = "customerId", required = false, defaultValue = "1") Integer customerId) {
        IVRResponseDto response = ivrService.handleMenuOption(customerId, digits);
        return response.getTwimlXml();
    }

    @GetMapping("/balance/{customerId}")
    public ResponseEntity<IVRResponseDto> getBalance(@PathVariable Integer customerId) {
        return ResponseEntity.ok(ivrService.getAccountBalanceResponse(customerId));
    }

    @GetMapping("/mini-statement/{customerId}")
    public ResponseEntity<IVRResponseDto> getMiniStatement(@PathVariable Integer customerId) {
        return ResponseEntity.ok(ivrService.getMiniStatementResponse(customerId));
    }

    @PostMapping("/log")
    public ResponseEntity<IVRCallLog> logCall(@RequestBody IVRCallRequest request) {
        return ResponseEntity.ok(ivrService.logCall(request));
    }

    @GetMapping("/logs/customer/{customerId}")
    public ResponseEntity<List<IVRCallLog>> getLogsByCustomer(@PathVariable Integer customerId) {
        return ResponseEntity.ok(ivrService.getCallLogsByCustomer(customerId));
    }

    @GetMapping("/logs")
    public ResponseEntity<List<IVRCallLog>> getAllLogs() {
        return ResponseEntity.ok(ivrService.getAllCallLogs());
    }
}