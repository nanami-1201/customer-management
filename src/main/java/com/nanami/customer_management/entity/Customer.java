package com.nanami.customer_management.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
@NotBlank
private String name;

private String phone;
@NotBlank
private String staff;

private String company;

private LocalDate firstVisitDate;

private String referrer;

private boolean businessCard;

private String memo;

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public String getPhone() {
    return phone;
}

public void setPhone(String phone) {
    this.phone = phone;
}

public String getStaff() {
    return staff;
}

public void setStaff(String staff) {
    this.staff = staff;
}

public String getCompany() {
    return company;
}

public void setCompany(String company) {
    this.company = company;
}

public LocalDate getFirstVisitDate() {
    return firstVisitDate;
}

public void setFirstVisitDate(LocalDate firstVisitDate) {
    this.firstVisitDate = firstVisitDate;
}

public String getReferrer() {
    return referrer;
}

public void setReferrer(String referrer) {
    this.referrer = referrer;
}

public boolean isBusinessCard() {
    return businessCard;
}

public void setBusinessCard(boolean businessCard) {
    this.businessCard = businessCard;
}

public String getMemo() {
    return memo;
}

public void setMemo(String memo) {
    this.memo = memo;
}

}