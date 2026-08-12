package com.bank.admin.entity;

import java.util.HashSet;
import java.util.Set;

import com.bank.admin.enums.PermissionName;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "permissions")
public class Permission extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "permission_name", nullable = false, unique = true)
    private PermissionName permissionName;

    @Column(length = 255)
    private String description;

    @ManyToMany(mappedBy = "permissions", fetch = FetchType.LAZY)
    private Set<Role> roles = new HashSet<>();

    public Permission() {
    }

    public PermissionName getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(PermissionName permissionName) {
        this.permissionName = permissionName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

}