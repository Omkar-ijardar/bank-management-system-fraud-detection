package com.bank.admin.enums;

public enum PermissionName {
	  // Admin
    VIEW_ADMIN,
    CREATE_ADMIN,
    UPDATE_ADMIN,
    DELETE_ADMIN,

    // Auth Service (Customer)
    VIEW_CUSTOMER,
    ACTIVATE_CUSTOMER,
    DEACTIVATE_CUSTOMER,
    RESET_CUSTOMER_PASSWORD,

    // Account Service
    VIEW_ACCOUNT,
    FREEZE_ACCOUNT,
    UNFREEZE_ACCOUNT,
    CLOSE_ACCOUNT,

    // Transaction Service
    VIEW_TRANSACTION,
    REVERSE_TRANSACTION,
    EXPORT_TRANSACTION,

    // Fraud Service
    VIEW_FRAUD,
    APPROVE_FRAUD,
    REJECT_FRAUD,
    MARK_GENUINE,

    // IVR Service
    VIEW_IVR,
    RETRY_IVR,

    // Reports
    VIEW_REPORT,
    EXPORT_REPORT,

    // Dashboard
    VIEW_DASHBOARD,

    // Settings
    MANAGE_SETTINGS
}
