package com.nanami.customer_management.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.nanami.customer_management.entity.Customer;
import com.nanami.customer_management.repository.CustomerRepository;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(
            CustomerRepository customerRepository) {

        this.customerRepository = customerRepository;
    }

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer update(
            Long id,
            Customer customer) {

        if (!customerRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "指定された顧客が見つかりません。"
            );
        }

        customer.setId(id);

        return customerRepository.save(customer);
    }

    public void delete(Long id) {

        if (!customerRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "指定された顧客が見つかりません。"
            );
        }

        customerRepository.deleteById(id);
    }
}