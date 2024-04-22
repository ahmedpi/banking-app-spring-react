package com.ahmedproject.banking.service.impl;

import com.ahmedproject.banking.dto.AccountDto;
import com.ahmedproject.banking.entity.Account;
import com.ahmedproject.banking.mapper.AccountMapper;
import com.ahmedproject.banking.repository.AccountRepository;
import com.ahmedproject.banking.service.AccountService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    private AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public AccountDto createAccount(AccountDto accountDto) {
        Account account = AccountMapper.mapToAccount(accountDto);
        Account savedAccount = accountRepository.save(account);
        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public AccountDto getAccountById(Long id) {
        Account account = getAccount(id);
        return AccountMapper.mapToAccountDto(account);
    }

    private Account getAccount(Long id) {
        return accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account does not exist"));
    }

    @Override
    public AccountDto deposit(Long id, double amount) {
        Account account = getAccount(id);

        double total = account.getBalance() + amount;
        account.setBalance(total);

        Account savedAccount = accountRepository.save(account);
        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public AccountDto withdraw(Long id, double amount) {
        Account account = getAccount(id);

        if (account.getBalance() < amount) {
            throw new RuntimeException("Insufficient Amount");
        }
        double total = account.getBalance() - amount;
        account.setBalance(total);
        Account savedAccount = accountRepository.save(account);

        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public List<AccountDto> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();

        return accounts.stream().map(account -> AccountMapper.mapToAccountDto(account))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAccount(Long id) {
        //check if account exists
        Account account = getAccount(id);

        accountRepository.deleteById(id);
    }
}
