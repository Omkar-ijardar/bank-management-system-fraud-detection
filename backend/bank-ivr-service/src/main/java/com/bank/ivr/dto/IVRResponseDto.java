package com.bank.ivr.dto;

public class IVRResponseDto {
    private boolean success;
    private String message;
    private String twimlXml;
    private Object data;

    public IVRResponseDto() {}

    public IVRResponseDto(boolean success, String message, String twimlXml, Object data) {
        this.success = success;
        this.message = message;
        this.twimlXml = twimlXml;
        this.data = data;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getTwimlXml() { return twimlXml; }
    public void setTwimlXml(String twimlXml) { this.twimlXml = twimlXml; }
    public Object getData() { return data; }
    public void setData(Object data) { this.data = data; }

    public static IVRResponseDtoBuilder builder() {
        return new IVRResponseDtoBuilder();
    }

    public static class IVRResponseDtoBuilder {
        private boolean success;
        private String message;
        private String twimlXml;
        private Object data;

        public IVRResponseDtoBuilder success(boolean success) {
            this.success = success;
            return this;
        }
        public IVRResponseDtoBuilder message(String message) {
            this.message = message;
            return this;
        }
        public IVRResponseDtoBuilder twimlXml(String twimlXml) {
            this.twimlXml = twimlXml;
            return this;
        }
        public IVRResponseDtoBuilder data(Object data) {
            this.data = data;
            return this;
        }
        public IVRResponseDto build() {
            return new IVRResponseDto(success, message, twimlXml, data);
        }
    }
}