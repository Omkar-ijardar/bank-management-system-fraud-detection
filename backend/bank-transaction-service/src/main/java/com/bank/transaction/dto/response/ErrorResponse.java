package com.bank.transaction.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {
	
	private LocalDateTime timestamp;
	
	private int status;
	
	private String error;
	
	private String message;
	
	private String path;

}
