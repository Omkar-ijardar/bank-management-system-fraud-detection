//package com.bank.admin.client;
//
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.GetMapping;
//
//import com.bank.admin.config.FeignConfig;
//
//@FeignClient(
//        name = "IVR-SERVICE",
//        configuration = FeignConfig.class
//)
//public interface IvrServiceClient {
//
//	@GetMapping("/api/ivr/internal/dashboard/total-calls")
//	Long getTotalCalls();
//}