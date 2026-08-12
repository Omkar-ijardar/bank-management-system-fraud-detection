package com.bank.account.dto.response;

public class ApiResponse<T> {

	private boolean success;
	private T data;
	private String message;

	public ApiResponse() {}

	public ApiResponse(boolean success, T data, String message) {
		this.success = success;
		this.data = data;
		this.message = message;
	}

	public boolean isSuccess() { return success; }
	public void setSuccess(boolean success) { this.success = success; }
	public T getData() { return data; }
	public void setData(T data) { this.data = data; }
	public String getMessage() { return message; }
	public void setMessage(String message) { this.message = message; }
	
	public static<T> ApiResponse<T> success(T data, String message){
		return new ApiResponse<>(true, data, message);
	}
	
	public static<T> ApiResponse<T> error(String message){
		return new ApiResponse<>(false, null, message);
	}
	
	public static <T> ApiResponse<T> failure(String message) {
	    return new ApiResponse<>(false, null, message);
	}
}
