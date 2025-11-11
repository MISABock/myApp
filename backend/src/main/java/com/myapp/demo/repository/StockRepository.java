package com.myapp.demo.repository;

import com.myapp.demo.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Long> {

    List<Stock> findBySymbolContainingIgnoreCaseOrNameContainingIgnoreCase(String symbol, String name);

    Optional<Stock> findBySymbol(String symbol);
}
