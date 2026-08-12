package com.bank.admin.service.impl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.admin.client.AccountServiceClient;
import com.bank.admin.client.AuthServiceClient;
import com.bank.admin.client.FraudServiceClient;
//import com.bank.admin.client.IvrServiceClient;
import com.bank.admin.client.TransactionServiceClient;
import com.bank.admin.dto.dashboard.DashboardResponse;
import com.bank.admin.repository.AdminRepository;
import com.bank.admin.service.DashboardService;


@Service
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(DashboardServiceImpl.class);

    private final AuthServiceClient authServiceClient;
    private final AccountServiceClient accountServiceClient;
    private final TransactionServiceClient transactionServiceClient;
    private final FraudServiceClient fraudServiceClient;
    //private final IvrServiceClient ivrServiceClient;
    private final AdminRepository adminRepository;

    public DashboardServiceImpl(
            AuthServiceClient authServiceClient,
            AccountServiceClient accountServiceClient,
            TransactionServiceClient transactionServiceClient,
            FraudServiceClient fraudServiceClient,
            //IvrServiceClient ivrServiceClient,
            AdminRepository adminRepository) {

        this.authServiceClient = authServiceClient;
        this.accountServiceClient = accountServiceClient;
        this.transactionServiceClient = transactionServiceClient;
        this.fraudServiceClient = fraudServiceClient;
        //this.ivrServiceClient = ivrServiceClient;
        this.adminRepository = adminRepository;
    }

//    @Override
    public DashboardResponse getDashboard() {

        LOGGER.info("Loading dashboard statistics.");

        DashboardResponse response = new DashboardResponse();

        response.setTotalCustomers(
                authServiceClient.getTotalCustomers());

        response.setActiveCustomers(
                authServiceClient.getActiveCustomers());

        response.setTotalAccounts(
                accountServiceClient.getTotalAccounts());

        response.setActiveAccounts(
                accountServiceClient.getActiveAccounts());

        response.setTotalTransactions(
                transactionServiceClient.getTotalTransactions());

        response.setSuccessfulTransactions(
                transactionServiceClient.getSuccessfulTransactions());

        response.setFailedTransactions(
                transactionServiceClient.getFailedTransactions());

        response.setTotalTransactionAmount(
                transactionServiceClient.getTotalTransactionAmount());

        response.setTotalFraudCases(
                fraudServiceClient.getTotalFraudCases());

        response.setPendingFraudCases(
                fraudServiceClient.getPendingFraudCases());

//        response.setTotalIvrCalls(
//                ivrServiceClient.getTotalCalls());

        response.setTotalAdmins(
                adminRepository.count());

        LOGGER.info("Dashboard loaded successfully.");

        return response;
    }
}