package com.nanami.customer_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nanami.customer_management.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}