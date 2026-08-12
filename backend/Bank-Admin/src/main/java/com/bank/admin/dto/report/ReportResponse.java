package com.bank.admin.dto.report;

import java.time.LocalDateTime;

import com.bank.admin.enums.ReportFormat;
import com.bank.admin.enums.ReportType;

public class ReportResponse {

    private Integer id;

    private ReportType reportType;

    private ReportFormat reportFormat;

    private String fileName;

    private String filePath;

    private String generatedBy;

    private LocalDateTime generatedAt;

	public ReportResponse() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public ReportType getReportType() {
		return reportType;
	}

	public void setReportType(ReportType reportType) {
		this.reportType = reportType;
	}

	public ReportFormat getReportFormat() {
		return reportFormat;
	}

	public void setReportFormat(ReportFormat reportFormat) {
		this.reportFormat = reportFormat;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getGeneratedBy() {
		return generatedBy;
	}

	public void setGeneratedBy(String generatedBy) {
		this.generatedBy = generatedBy;
	}

	public LocalDateTime getGeneratedAt() {
		return generatedAt;
	}

	public void setGeneratedAt(LocalDateTime generatedAt) {
		this.generatedAt = generatedAt;
	}
    
    

}