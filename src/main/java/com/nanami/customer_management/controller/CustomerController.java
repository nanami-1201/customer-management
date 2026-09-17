package com.nanami.customer_management.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.nanami.customer_management.entity.Customer;
import com.nanami.customer_management.service.CustomerService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/customers")
    public List<Customer> getCustomers() {
        return customerService.findAll();
    }

    @PostMapping("/customers")
public Customer createCustomer(@RequestBody Customer customer) {
    return customerService.save(customer);
}

@PutMapping("/customers/{id}")
public Customer updateCustomer(
        @PathVariable Long id,
        @RequestBody Customer customer) {

    return customerService.update(id, customer);
}

@DeleteMapping("/customers/{id}")
public void deleteCustomer(@PathVariable Long id) {
    customerService.delete(id);
}

}