package com.bank.admin.dto.report;

import java.time.LocalDate;

import com.bank.admin.enums.ReportFormat;
import com.bank.admin.enums.ReportType;


public class ReportRequest {

    private ReportType reportType;

    private ReportFormat reportFormat;

    private LocalDate fromDate;

    private LocalDate toDate;

	public ReportRequest() {
		super();
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

	public LocalDate getFromDate() {
		return fromDate;
	}

	public void setFromDate(LocalDate fromDate) {
		this.fromDate = fromDate;
	}

	public LocalDate getToDate() {
		return toDate;
	}

	public void setToDate(LocalDate toDate) {
		this.toDate = toDate;
	}
    
    

}