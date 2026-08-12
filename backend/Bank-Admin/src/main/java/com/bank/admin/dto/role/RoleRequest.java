package com.bank.admin.dto.role;

import com.bank.admin.enums.RoleName;

import jakarta.validation.constraints.NotBlank;

public class RoleRequest {

    @NotBlank(message = "Role name is required")
    private RoleName   roleName;

    private String description;

	public RoleRequest() {
		super();
	}

	public RoleName  getRoleName() {
		return roleName;
	}

	public void setRoleName(RoleName  roleName) {
		this.roleName = roleName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
    
    

}