package com.myapp.demo.controller;

import com.myapp.demo.model.Stock;
import com.myapp.demo.repository.StockRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    private final StockRepository stockRepository;

    public StockController(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    @GetMapping("/search")
    public List<Stock> searchStocks(@RequestParam String q) {
        return stockRepository.findBySymbolContainingIgnoreCaseOrNameContainingIgnoreCase(q, q);
    }

    @GetMapping("/{id}")
    public Stock getStock(@PathVariable Long id) {
        return stockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock nicht gefunden"));
    }
}
