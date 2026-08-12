package com.bank.admin.specification;

import org.springframework.data.jpa.domain.Specification;

import com.bank.admin.entity.Admin;

public final class AdminSpecification {

    private AdminSpecification() {

    }

    public static Specification<Admin> hasKeyword(String keyword) {

        return (root, query, criteriaBuilder) -> {

            if (keyword == null || keyword.trim().isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            String searchKeyword = "%" + keyword.toLowerCase() + "%";

            return criteriaBuilder.or(

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("username")),
                            searchKeyword),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("email")),
                            searchKeyword),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("firstName")),
                            searchKeyword),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("lastName")),
                            searchKeyword)

            );

        };

    }

    public static Specification<Admin> hasRole(Integer roleId) {

        return (root, query, criteriaBuilder) -> {

            if (roleId == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(
                    root.get("role").get("id"),
                    roleId);

        };

    }

    public static Specification<Admin> isActive(Boolean active) {

        return (root, query, criteriaBuilder) -> {

            if (active == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(
                    root.get("active"),
                    active);

        };

    }

}