package com.example.dao;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.model.UserRole;

@RepositoryRestResource(collectionResourceRel = "userRoles", path = "userRoles")
public interface UserRoleRepository extends PagingAndSortingRepository<UserRole, Long> {

}
