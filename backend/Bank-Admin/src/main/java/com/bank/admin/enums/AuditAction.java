package com.bank.admin.enums;

public enum AuditAction {
	LOGIN,
    LOGOUT,

    CREATE,
    UPDATE,
    DELETE,

    VIEW,

    FREEZE_ACCOUNT,
    UNFREEZE_ACCOUNT,
    CLOSE_ACCOUNT,

    APPROVE_FRAUD,
    REJECT_FRAUD,

    EXPORT_REPORT,

    CHANGE_SETTINGS,

    RESET_PASSWORD
}
