package com.ahmedproject.banking.repository;

import com.ahmedproject.banking.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {

}
