package com.bank.admin.security.user;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.bank.admin.entity.Admin;
import com.bank.admin.entity.Permission;
import com.bank.admin.entity.Role;

public class UserPrincipal implements UserDetails {

    private static final long serialVersionUID = 1L;

    private final Integer id;
    private final String username;
    private final String password;
    private final boolean enabled;
    private final Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Admin admin) {

        this.id = admin.getId();
        this.username = admin.getUsername();
        this.password = admin.getPassword();

        // Adjust this according to your AdminStatus enum if needed
        this.enabled = true;

        this.authorities = buildAuthorities(admin.getRole());
    }

    private Collection<? extends GrantedAuthority> buildAuthorities(Role role) {

        Set<SimpleGrantedAuthority> authorities = role.getPermissions()
                .stream()
                .map(Permission::getPermissionName)
                .map(Enum::name)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());

        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName().name()));

        return authorities;
    }

    public Integer getId() {
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
        // Example:
        // return admin.getStatus() != AdminStatus.LOCKED;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
        // Example:
        // return admin.getStatus() == AdminStatus.ACTIVE;
    }
}